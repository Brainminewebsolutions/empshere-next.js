"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { createSessionClient } from "@/lib/supabase/server";
import { sanitizePostHtml } from "@/lib/sanitize";
import { SLUG_PATTERN } from "@/lib/slug";
import { POST_TYPES, postPath, type CustomSchema, type Faq, type PostStatus, type PostType } from "@/lib/posts";
import { MAX_CUSTOM_SCHEMAS, SCHEMA_TYPES, validateSchemaJson } from "@/lib/schema";
import { isHttpsUrl, isUuid } from "./validation";

export type PostInput = {
  id?: string;
  post_type: PostType;
  status: PostStatus;
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  author_name: string;
  featured_image_url: string;
  featured_image_alt: string;
  published_at: string; // ISO string or ""
  focus_keyphrase: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url: string;
  noindex: boolean;
  og_title: string;
  og_description: string;
  og_image_url: string;
  faqs: Faq[];
  auto_article_schema: boolean;
  auto_faq_schema: boolean;
  custom_schemas: CustomSchema[];
};

const MAX_FAQS = 30;
const MAX_FAQ_QUESTION = 300;
const MAX_FAQ_ANSWER = 3000;

export type SaveResult =
  | { ok: true; id: string; slug: string; warning?: string }
  | { ok: false; error: string };

// Columns added after the first release. Saves still work on a database
// that hasn't had supabase/schema.sql re-run yet: the missing columns are
// dropped from the write and the editor shows a warning, instead of the
// whole save failing.
const OPTIONAL_COLUMNS: Record<string, string> = {
  faqs: "FAQs",
  auto_article_schema: "schema settings",
  auto_faq_schema: "schema settings",
  custom_schemas: "custom schema blocks",
};

type DbError = { code?: string; message?: string } | null;

function missingOptionalColumn(error: DbError): string | null {
  if (!error || (error.code !== "PGRST204" && error.code !== "42703")) return null;
  // e.g. "Could not find the 'faqs' column of 'posts' in the schema cache"
  return Object.keys(OPTIONAL_COLUMNS).find((col) => (error.message ?? "").includes(`'${col}'`) || (error.message ?? "").includes(`"${col}"`) || (error.message ?? "").includes(`.${col} `)) ?? null;
}

async function writeWithFallback<T>(
  write: (values: Record<string, unknown>) => PromiseLike<{ data: T | null; error: DbError }>,
  row: Record<string, unknown>,
) {
  const values = { ...row };
  const dropped: string[] = [];
  for (;;) {
    const result = await write(values);
    const col = missingOptionalColumn(result.error);
    if (!col || !(col in values)) return { ...result, dropped };
    delete values[col];
    dropped.push(col);
  }
}

function droppedWarning(dropped: string[], row: PostInput | Record<string, unknown>) {
  const r = row as Record<string, unknown>;
  const lost = dropped.filter((col) =>
    col === "faqs" || col === "custom_schemas" ? (r[col] as unknown[]).length > 0 : r[col] === false,
  );
  if (lost.length === 0) return undefined;
  const what = [...new Set(lost.map((c) => OPTIONAL_COLUMNS[c]))].join(" and ");
  return `Post saved, but the ${what} were NOT saved: the database needs updating. In Supabase -> SQL Editor, run supabase/schema.sql (safe to re-run), then save again.`;
}

const LIMITS: Partial<Record<keyof PostInput, number>> = {
  title: 200,
  slug: 100,
  excerpt: 500,
  content_html: 500_000,
  author_name: 100,
  featured_image_alt: 300,
  focus_keyphrase: 100,
  meta_title: 120,
  meta_description: 320,
  meta_keywords: 300,
  canonical_url: 500,
  og_title: 120,
  og_description: 320,
};

function str(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validate(raw: PostInput): { data: PostInput } | { error: string } {
  const data: PostInput = {
    id: raw.id,
    post_type: raw.post_type,
    status: raw.status,
    title: str(raw.title),
    slug: str(raw.slug),
    excerpt: str(raw.excerpt),
    content_html: typeof raw.content_html === "string" ? raw.content_html : "",
    author_name: str(raw.author_name) || "Secure House",
    featured_image_url: str(raw.featured_image_url),
    featured_image_alt: str(raw.featured_image_alt),
    published_at: str(raw.published_at),
    focus_keyphrase: str(raw.focus_keyphrase),
    meta_title: str(raw.meta_title),
    meta_description: str(raw.meta_description),
    meta_keywords: str(raw.meta_keywords),
    canonical_url: str(raw.canonical_url),
    noindex: raw.noindex === true,
    og_title: str(raw.og_title),
    og_description: str(raw.og_description),
    og_image_url: str(raw.og_image_url),
    // Plain text only (rendered escaped by React). Fully empty rows are
    // dropped so an unused "Add FAQ" click doesn't block saving.
    faqs: (Array.isArray(raw.faqs) ? raw.faqs : [])
      .map((f) => ({ question: str(f?.question), answer: str(f?.answer) }))
      .filter((f) => f.question || f.answer),
    auto_article_schema: raw.auto_article_schema !== false,
    auto_faq_schema: raw.auto_faq_schema !== false,
    // Empty blocks are dropped; JSON text is kept as typed (validated below).
    custom_schemas: (Array.isArray(raw.custom_schemas) ? raw.custom_schemas : [])
      .map((b) => ({
        type: SCHEMA_TYPES.includes(b?.type as (typeof SCHEMA_TYPES)[number]) ? String(b.type) : "Other",
        json: typeof b?.json === "string" ? b.json.trim() : "",
      }))
      .filter((b) => b.json),
  };

  if (data.id !== undefined && !isUuid(data.id)) return { error: "Invalid post id." };
  if (!POST_TYPES.includes(data.post_type)) return { error: "Invalid post type." };
  if (data.status !== "draft" && data.status !== "published") return { error: "Invalid status." };
  if (!data.title) return { error: "Title is required." };
  if (!SLUG_PATTERN.test(data.slug)) {
    return { error: "Slug may only contain lowercase letters, numbers and single hyphens (e.g. my-new-post)." };
  }
  for (const [field, max] of Object.entries(LIMITS)) {
    const value = data[field as keyof PostInput];
    if (typeof value === "string" && value.length > max) {
      return { error: `${field.replace(/_/g, " ")} is too long (max ${max} characters).` };
    }
  }
  for (const field of ["featured_image_url", "og_image_url", "canonical_url"] as const) {
    if (data[field] && !isHttpsUrl(data[field])) {
      return { error: `${field.replace(/_/g, " ")} must be a full https:// URL.` };
    }
  }
  if (data.faqs.length > MAX_FAQS) return { error: `Too many FAQs (max ${MAX_FAQS}).` };
  for (const [i, faq] of data.faqs.entries()) {
    if (!faq.question || !faq.answer) return { error: `FAQ ${i + 1} needs both a question and an answer.` };
    if (faq.question.length > MAX_FAQ_QUESTION) return { error: `FAQ ${i + 1}: question is too long (max ${MAX_FAQ_QUESTION} characters).` };
    if (faq.answer.length > MAX_FAQ_ANSWER) return { error: `FAQ ${i + 1}: answer is too long (max ${MAX_FAQ_ANSWER} characters).` };
  }
  if (data.custom_schemas.length > MAX_CUSTOM_SCHEMAS) {
    return { error: `Too many custom schema blocks (max ${MAX_CUSTOM_SCHEMAS}).` };
  }
  for (const [i, block] of data.custom_schemas.entries()) {
    const check = validateSchemaJson(block.json);
    if (!check.ok) return { error: `Schema block ${i + 1} (${block.type}): ${check.error}` };
    // Store normalised, pretty-printed JSON.
    block.json = JSON.stringify(check.value, null, 2);
  }
  if (data.published_at && Number.isNaN(Date.parse(data.published_at))) {
    return { error: "Invalid publish date." };
  }
  if (data.status === "published" && !data.featured_image_url) {
    return { error: "Add a featured image before publishing - the blog list needs one." };
  }

  return { data };
}

function revalidatePostPaths(type: PostType, ...slugs: string[]) {
  // The /blog listing and all its paginated pages (order/count may change).
  revalidatePath("/blog");
  revalidatePath("/blog/page/[page]", "page");
  for (const slug of slugs) revalidatePath(postPath(type, slug));
  revalidatePath("/sitemap.xml");
  revalidatePath("/post-sitemap.xml");
}

export async function savePost(raw: PostInput): Promise<SaveResult> {
  const staff = await requireStaff();
  const result = validate(raw);
  if ("error" in result) return { ok: false, error: result.error };
  const { id, ...fields } = result.data;

  const supabase = await createSessionClient();
  const row = {
    ...fields,
    content_html: sanitizePostHtml(fields.content_html),
    featured_image_url: fields.featured_image_url || null,
    og_image_url: fields.og_image_url || null,
    published_at:
      fields.published_at
        ? new Date(fields.published_at).toISOString()
        : fields.status === "published"
          ? new Date().toISOString()
          : null,
    updated_by: staff.id,
  };

  if (!id) {
    const { data, error, dropped } = await writeWithFallback<{ id: string; slug: string }>(
      (values) => supabase.from("posts").insert({ ...values, created_by: staff.id }).select("id, slug").single(),
      row,
    );
    if (error || !data) return { ok: false, error: friendlyDbError(error ?? { message: "Save failed." }) };
    revalidatePostPaths(row.post_type, data.slug);
    return { ok: true, id: data.id, slug: data.slug, warning: droppedWarning(dropped, row) };
  }

  const { data: existing, error: loadError } = await supabase
    .from("posts")
    .select("slug, post_type, status")
    .eq("id", id)
    .maybeSingle();
  if (loadError || !existing) return { ok: false, error: "Post not found." };

  const { data, error, dropped } = await writeWithFallback<{ id: string; slug: string }>(
    (values) => supabase.from("posts").update(values).eq("id", id).select("id, slug").single(),
    row,
  );
  const warning = droppedWarning(dropped, row);
  if (error || !data) return { ok: false, error: friendlyDbError(error ?? { message: "Save failed." }) };

  const urlChanged = existing.slug !== row.slug || existing.post_type !== row.post_type;
  if (urlChanged && existing.status === "published") {
    // Old URL keeps working: 301 to the new one (like Yoast Premium's
    // redirect manager). The new URL must not itself be a redirect.
    await supabase
      .from("post_redirects")
      .upsert(
        { post_type: existing.post_type, old_slug: existing.slug, post_id: id },
        { onConflict: "post_type,old_slug" },
      );
  }
  await supabase
    .from("post_redirects")
    .delete()
    .eq("post_type", row.post_type)
    .eq("old_slug", row.slug);

  revalidatePostPaths(existing.post_type, existing.slug);
  revalidatePostPaths(row.post_type, row.slug);
  return { ok: true, id: data.id, slug: data.slug, warning };
}

export async function deletePost(id: string): Promise<{ ok: boolean; error?: string }> {
  await requireStaff();
  if (!isUuid(id)) return { ok: false, error: "Invalid post id." };

  const supabase = await createSessionClient();
  const { data: existing } = await supabase
    .from("posts")
    .select("slug, post_type")
    .eq("id", id)
    .maybeSingle();
  if (!existing) return { ok: false, error: "Post not found." };

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { ok: false, error: friendlyDbError(error) };

  revalidatePostPaths(existing.post_type, existing.slug);
  return { ok: true };
}

// --- Image upload --------------------------------------------------------

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

// Identify the real file type from its first bytes - the browser-supplied
// MIME type and file extension are attacker-controlled and not trusted.
function sniffImage(bytes: Uint8Array): { ext: string; mime: string } | null {
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { ext: "jpg", mime: "image/jpeg" };
  if (bytes[0] === 0x89 && ascii(1, 4) === "PNG") return { ext: "png", mime: "image/png" };
  if (ascii(0, 4) === "GIF8") return { ext: "gif", mime: "image/gif" };
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return { ext: "webp", mime: "image/webp" };
  if (ascii(4, 8) === "ftyp" && ["avif", "avis"].includes(ascii(8, 12))) return { ext: "avif", mime: "image/avif" };
  return null;
}

export async function uploadImage(
  formData: FormData,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await requireStaff();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "No file received." };
  if (file.size > MAX_IMAGE_BYTES) return { ok: false, error: "Image is larger than 4 MB. Compress it (e.g. squoosh.app) and try again." };

  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = sniffImage(bytes);
  if (!kind) return { ok: false, error: "Only JPG, PNG, WebP, GIF or AVIF images are allowed." };

  const now = new Date();
  const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}.${kind.ext}`;

  const supabase = await createSessionClient();
  const { error } = await supabase.storage.from("blog-images").upload(path, bytes, {
    contentType: kind.mime,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) return { ok: false, error: `Upload failed: ${error.message}` };

  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}

function friendlyDbError(error: { code?: string; message?: string }) {
  if (error.code === "PGRST204" || error.code === "42703") {
    return "The database is missing a column. Open Supabase -> SQL Editor, run supabase/schema.sql again, then save.";
  }
  if (error.code === "23505") return "Another post of this type already uses that slug. Choose a different one.";
  if (error.code === "42501") return "You don't have permission to do that.";
  return error.message ?? "Save failed.";
}
