import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";

// Safety net for the public blog: if the database cannot be reached (wrong
// credentials, host down, missing environment variables) the pages fall back
// to the WordPress snapshot in data/blog-posts.json instead of returning a
// server error. Rows are shaped like database rows so lib/posts.ts can map
// them with the same functions.

type Row = Record<string, unknown>;
let cache: Row[] | null = null;

const sqlDate = (iso: string) => new Date(iso).toISOString().slice(0, 19).replace("T", " ");

export function snapshotRows(): Row[] {
  if (cache) return cache;
  try {
    const file = path.join(process.cwd(), "data", "blog-posts.json");
    const posts = (JSON.parse(readFileSync(file, "utf8")) as { posts: Record<string, any>[] }).posts;
    cache = posts.map((p) => {
      const seo = p.seo || {};
      const f = p.featuredImage;
      return {
        id: String(p.id),
        status: "published",
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || "",
        content_html: p.contentHtml,
        author_name: /^(admin|administrator|)$/i.test((p.author || "").trim()) ? "Emsphere" : p.author,
        featured_image_url: f?.src || null,
        featured_image_alt: f?.alt || "",
        featured_image_width: f?.width || null,
        featured_image_height: f?.height || null,
        featured_image_srcset: f?.srcSet || "",
        categories: JSON.stringify(p.categories || []),
        tags: JSON.stringify(p.tags || []),
        word_count: p.wordCount || 0,
        published_at: sqlDate(p.date),
        focus_keyphrase: seo.keywords?.[0] || "",
        meta_title: seo.title || "",
        meta_description: seo.description || "",
        meta_keywords: (seo.keywords || []).join(", "),
        noindex: seo.index === false ? 1 : 0,
        og_title: seo.ogTitle || "",
        og_description: seo.ogDescription || "",
        og_image_url: seo.ogImage && seo.ogImage !== f?.src ? seo.ogImage : null,
        faqs: "[]",
        auto_article_schema: 1,
        auto_faq_schema: 1,
        custom_schemas: "[]",
        created_at: sqlDate(p.date),
        updated_at: sqlDate(p.modified || p.date),
      };
    });
  } catch (error) {
    console.error("[posts] blog snapshot unavailable:", (error as Error)?.message || error);
    cache = [];
  }
  return cache;
}
