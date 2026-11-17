import "server-only";
import { getPublishedCards, getPublishedPost } from "@/lib/posts";
import { SITE_URL, prepareContent } from "@/lib/blog-shared";

/* --------------------------------------------------------------------
   Data layer for the public /blog pages. Posts live in the database and are
   edited in /admin (Blogs). This file turns database rows into the post
   shape the blog components were built for, so their design is untouched.
   Pure helpers (dates, pagination, related posts...) are in lib/blog-shared.js.
   -------------------------------------------------------------------- */

export * from "@/lib/blog-shared";

const readingMinutes = (words) => Math.max(1, Math.round((words || 0) / 220));

function absolute(url) {
  if (!url) return undefined;
  return url.startsWith("/") ? `${SITE_URL}${url}` : url;
}

function toFeaturedImage(row) {
  if (!row.featured_image_url) return null;
  return {
    src: row.featured_image_url,
    width: row.featured_image_width || 1200,
    height: row.featured_image_height || 800,
    alt: row.featured_image_alt || row.title,
    srcSet: row.featured_image_srcset || undefined,
  };
}

// Light shape (listing cards, related posts, home page).
function toListPost(row) {
  const categories = row.categories || [];
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.published_at,
    modified: row.updated_at,
    author: row.author_name || "Emsphere Team",
    categories,
    tags: row.tags || [],
    primaryCategory: categories.find((c) => c.slug !== "uncategorized") || categories[0] || null,
    wordCount: row.word_count || 0,
    readingMinutes: readingMinutes(row.word_count),
    featuredImage: toFeaturedImage(row),
    seo: { index: !row.noindex },
  };
}

// Every published post, newest first (light shape, no body).
export async function getAllPosts() {
  const cards = await getPublishedCards();
  return cards.map(toListPost);
}

export async function getLatestPosts(limit = 3) {
  return (await getAllPosts()).slice(0, limit);
}

// Full post with body, SEO fields and schema inputs. null when unknown.
export async function getPostBySlug(slug) {
  const row = await getPublishedPost(slug);
  if (!row) return null;
  const { html, toc } = prepareContent(row.content_html);
  const base = toListPost(row);
  const keywords = row.meta_keywords
    ? row.meta_keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [];
  return {
    ...base,
    contentHtml: html,
    toc,
    wordCount: row.word_count || base.wordCount,
    seo: {
      title: row.meta_title || "",
      description: row.meta_description || "",
      ogTitle: row.og_title || "",
      ogDescription: row.og_description || "",
      ogImage: absolute(row.og_image_url) || "",
      ogImageAlt: row.featured_image_alt || "",
      keywords,
      index: !row.noindex,
      follow: true,
      canonical: row.canonical_url || "",
    },
    // Inputs for lib/schema.ts (shared with the admin editor preview).
    schemaSource: {
      post_type: "blog",
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      meta_title: row.meta_title,
      meta_description: row.meta_description,
      meta_keywords: row.meta_keywords,
      canonical_url: row.canonical_url,
      author_name: row.author_name,
      featured_image_url: row.featured_image_url,
      featured_image_width: row.featured_image_width,
      featured_image_height: row.featured_image_height,
      published_at: row.published_at,
      updated_at: row.updated_at,
      category_name: base.primaryCategory?.name,
      word_count: row.word_count,
      faqs: row.faqs,
      auto_article_schema: row.auto_article_schema,
      auto_faq_schema: row.auto_faq_schema,
    },
    customSchemas: row.custom_schemas,
  };
}

// The blog index (/blog/) has no per-page SEO fields in the admin; the listing
// uses its built-in title and description.
export function getBlogIndexSeo() {
  return null;
}
