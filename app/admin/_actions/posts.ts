"use server";

import { randomUUID } from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { exec, queryOne, isDuplicateError, isMissingTableError } from "@/lib/db";
import { sanitizePostHtml } from "@/lib/sanitize";
import { SLUG_PATTERN, slugify } from "@/lib/slug";
import { POST_TYPES, type CustomSchema, type Faq, type PostStatus, type PostType, type Term } from "@/lib/posts";
import { MAX_CUSTOM_SCHEMAS, SCHEMA_TYPES, validateSchemaJson } from "@/lib/post-schema";
import { isHttpsUrl, isImageUrl, isUuid } from "./validation";

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
  categories_text: string; // comma separated names
  tags_text: string; // comma separated names
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

const LIMITS: Partial<Record<keyof PostInput, number>> = {
  title: 200,
  slug: 190,
  excerpt: 500,
  content_html: 500_000,
  author_name: 100,
  featured_image_alt: 300,
  focus_keyphrase: 100,
  meta_title: 120,
  meta_description: 320,
  meta_keywords: 300,
  canonical_url: 500,
  featured_image_url: 500,
  og_image_url: 500,
  og_title: 120,
  og_description: 320,
};

function str(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

// "Payroll, HR Tech" -> [{ name, slug }]; duplicates and blanks dropped.
function parseTerms(text: string): Term[] {
  const seen = new Set<string>();
  const out: Term[] = [];
  for (const part of text.split(",")) {
    const name = part.trim().replace(/s+/g, " ").slice(0, 80);
    const slug = slugify(name);
    if (!name || !slug || seen.has(slug)) continue;
    seen.add(slug);
    out.push({ name, slug });
    if (out.length >= 20) break;
  }
  return out;
}

// Same word count the public blog uses for "N min read".
function countWords(html: string) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/s+/g, " ").trim();
  return text ? text.split(" ").length : 0;
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
    author_name: str(raw.author_name) || "Emsphere",
    featured_image_url: str(raw.featured_image_url),
    featured_image_alt: str(raw.featured_image_alt),
    categories_text: str(raw.categories_text),
    tags_text: str(raw.tags_text),
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
  for (const field of ["featured_image_url", "og_image_url"] as const) {
    if (data[field] && !isImageUrl(data[field])) {
      return { error: `${field.replace(/_/g, " ")} must be an uploaded image or a full https:// URL.` };
    }
  }
  if (data.canonical_url && !isHttpsUrl(data.canonical_url)) {
    return { error: "canonical url must be a full https:// URL." };
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

// Public pages read through cached queries tagged "posts" (lib/posts.ts).
// { expire: 0 } drops them immediately, so a saved post shows on the site at once.
function refreshPublicSite(...slugs: string[]) {
  revalidateTag("posts", { expire: 0 });
  for (const slug of slugs) revalidateTag(`post:${slug}`, { expire: 0 });
  revalidatePath("/blogs", "layout");
  revalidatePath("/");
}


function friendlyDbError(err: unknown) {
  if (isDuplicateError(err)) return "Another post already uses that slug. Choose a different one.";
  if (isMissingTableError(err)) return "Database tables are missing. Run the SQL file for your database (see admin-kit/README.md).";
  const code = (err as { code?: string })?.code;
  if (code === "ER_NET_PACKET_TOO_LARGE") return "The post is too large for the database. Remove some content and try again.";
  console.error("[admin posts]", err);
  return "Save failed. Please try again.";
}

export async function savePost(raw: PostInput): Promise<SaveResult> {
  const staff = await requireStaff();
  const result = validate(raw);
  if ("error" in result) return { ok: false, error: result.error };
  const { id, ...fields } = result.data;

  const now = new Date();
  const publishedAt = fields.published_at
    ? new Date(fields.published_at)
    : fields.status === "published"
      ? now
      : null;

  const cleanHtml = sanitizePostHtml(fields.content_html);
  const values = [
    fields.post_type,
    fields.status,
    fields.title,
    fields.slug,
    fields.excerpt,
    cleanHtml,
    fields.author_name,
    fields.featured_image_url || null,
    fields.featured_image_alt,
    JSON.stringify(parseTerms(fields.categories_text)),
    JSON.stringify(parseTerms(fields.tags_text)),
    countWords(cleanHtml),
    publishedAt,
    fields.focus_keyphrase,
    fields.meta_title,
    fields.meta_description,
    fields.meta_keywords,
    fields.canonical_url,
    fields.noindex ? 1 : 0,
    fields.og_title,
    fields.og_description,
    fields.og_image_url || null,
    JSON.stringify(fields.faqs),
    fields.auto_article_schema ? 1 : 0,
    fields.auto_faq_schema ? 1 : 0,
    JSON.stringify(fields.custom_schemas),
  ];
  const columns =
    "post_type, status, title, slug, excerpt, content_html, author_name, featured_image_url, featured_image_alt, categories, tags, word_count, published_at, " +
    "focus_keyphrase, meta_title, meta_description, meta_keywords, canonical_url, noindex, og_title, og_description, og_image_url, " +
    "faqs, auto_article_schema, auto_faq_schema, custom_schemas";

  if (!id) {
    const newId = randomUUID();
    try {
      await exec(
        `INSERT INTO posts (id, ${columns}, created_at, updated_at, created_by, updated_by)
         VALUES (?, ${columns.split(",").map(() => "?").join(", ")}, ?, ?, ?, ?)`,
        [newId, ...values, now, now, staff.id, staff.id],
      );
    } catch (err) {
      return { ok: false, error: friendlyDbError(err) };
    }
    refreshPublicSite(fields.slug);
    return { ok: true, id: newId, slug: fields.slug };
  }

  const existing = await queryOne<{ slug: string; status: PostStatus; featured_image_url: string | null }>(
    "SELECT slug, status, featured_image_url FROM posts WHERE id = ?",
    [id],
  );
  if (!existing) return { ok: false, error: "Post not found." };

  try {
    await exec(
      `UPDATE posts SET ${columns.split(", ").map((c) => `${c} = ?`).join(", ")}, updated_at = ?, updated_by = ? WHERE id = ?`,
      [...values, now, staff.id, id],
    );
    // A replaced featured image no longer has the old image's size / srcset.
    if ((existing.featured_image_url || "") !== (fields.featured_image_url || "")) {
      await exec(
        "UPDATE posts SET featured_image_width = NULL, featured_image_height = NULL, featured_image_srcset = '' WHERE id = ?",
        [id],
      );
    }
  } catch (err) {
    return { ok: false, error: friendlyDbError(err) };
  }

  if (existing.slug !== fields.slug && existing.status === "published") {
    // Old URL keeps working: it redirects to the new one.
    // Delete-then-insert instead of an upsert so the same SQL runs on MySQL and Postgres.
    await exec("DELETE FROM post_redirects WHERE post_type = 'blog' AND old_slug = ?", [existing.slug]);
    await exec("INSERT INTO post_redirects (post_type, old_slug, post_id, created_at) VALUES ('blog', ?, ?, ?)", [
      existing.slug,
      id,
      now,
    ]);
  }
  // The new URL must not itself be a redirect.
  await exec("DELETE FROM post_redirects WHERE post_type = 'blog' AND old_slug = ?", [fields.slug]);

  refreshPublicSite(existing.slug, fields.slug);
  return { ok: true, id, slug: fields.slug };
}

export async function deletePost(id: string): Promise<{ ok: boolean; error?: string }> {
  await requireStaff();
  if (!isUuid(id)) return { ok: false, error: "Invalid post id." };

  const existing = await queryOne<{ slug: string }>("SELECT slug FROM posts WHERE id = ?", [id]);
  if (!existing) return { ok: false, error: "Post not found." };

  try {
    await exec("DELETE FROM posts WHERE id = ?", [id]); // redirects cascade
  } catch (err) {
    return { ok: false, error: friendlyDbError(err) };
  }
  refreshPublicSite(existing.slug);
  return { ok: true };
}

// --- Image upload --------------------------------------------------------
// Images are stored in the database (table "media") and served from
// /media/<id>, so they survive redeploys of the website.

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

// Identify the real file type from its first bytes - the browser-supplied
// MIME type and file extension are attacker-controlled and not trusted.
function sniffImage(bytes: Uint8Array): { mime: string } | null {
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { mime: "image/jpeg" };
  if (bytes[0] === 0x89 && ascii(1, 4) === "PNG") return { mime: "image/png" };
  if (ascii(0, 4) === "GIF8") return { mime: "image/gif" };
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return { mime: "image/webp" };
  if (ascii(4, 8) === "ftyp" && ["avif", "avis"].includes(ascii(8, 12))) return { mime: "image/avif" };
  return null;
}

export async function uploadImage(
  formData: FormData,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const staff = await requireStaff();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "No file received." };
  if (file.size > MAX_IMAGE_BYTES) return { ok: false, error: "Image is larger than 4 MB. Compress it (e.g. squoosh.app) and try again." };

  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = sniffImage(bytes);
  if (!kind) return { ok: false, error: "Only JPG, PNG, WebP, GIF or AVIF images are allowed." };

  try {
    const res = await exec("INSERT INTO media (mime, size, data, created_by, created_at) VALUES (?, ?, ?, ?, ?)", [
      kind.mime,
      bytes.length,
      Buffer.from(bytes),
      staff.id,
      new Date(),
    ]);
    return { ok: true, url: `/media/${res.insertId}/` };
  } catch (err) {
    console.error("[admin uploadImage]", err);
    return { ok: false, error: "Upload failed (database error). Check that the media table exists." };
  }
}
