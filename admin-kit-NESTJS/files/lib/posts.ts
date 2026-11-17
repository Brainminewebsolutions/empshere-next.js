import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { count, query, queryOne, toIso } from "./db";
import type { CustomSchema, Faq } from "./schema";

export type PostType = "blog";
export type PostStatus = "draft" | "published";

export const POST_TYPES: PostType[] = ["blog"];

export type { CustomSchema, Faq };

export type Post = {
  id: string;
  post_type: PostType;
  status: PostStatus;
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  author_name: string;
  featured_image_url: string | null;
  featured_image_alt: string;
  published_at: string | null;
  focus_keyphrase: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url: string;
  noindex: boolean;
  og_title: string;
  og_description: string;
  og_image_url: string | null;
  faqs: Faq[];
  auto_article_schema: boolean;
  auto_faq_schema: boolean;
  custom_schemas: CustomSchema[];
  created_at: string;
  updated_at: string;
};

// What the blog listing / home page cards need (no body, so it stays light).
export type PostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featured_image_url: string | null;
  featured_image_alt: string;
  published_at: string;
};

export const SITE_URL = "https://www.winsquare.in";

export function postPath(_type: PostType, slug: string) {
  return `/blogs/${slug}`;
}

export function postUrl(post: Pick<Post, "post_type" | "slug">) {
  return `${SITE_URL}${postPath(post.post_type, post.slug)}`;
}

// Uploaded images are stored as relative /media/<id> paths.
export function absoluteUrl(url: string | null | undefined) {
  if (!url) return undefined;
  return url.startsWith("/") ? `${SITE_URL}${url}` : url;
}

type PostRow = Record<string, unknown>;

function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(fallback) && !Array.isArray(parsed) ? fallback : (parsed as T);
  } catch {
    return fallback;
  }
}

export function mapPost(r: PostRow): Post {
  return {
    id: String(r.id),
    post_type: "blog",
    status: r.status as PostStatus,
    title: String(r.title ?? ""),
    slug: String(r.slug ?? ""),
    excerpt: String(r.excerpt ?? ""),
    content_html: String(r.content_html ?? ""),
    author_name: String(r.author_name ?? ""),
    featured_image_url: (r.featured_image_url as string | null) || null,
    featured_image_alt: String(r.featured_image_alt ?? ""),
    published_at: toIso(r.published_at as string | null),
    focus_keyphrase: String(r.focus_keyphrase ?? ""),
    meta_title: String(r.meta_title ?? ""),
    meta_description: String(r.meta_description ?? ""),
    meta_keywords: String(r.meta_keywords ?? ""),
    canonical_url: String(r.canonical_url ?? ""),
    noindex: Boolean(r.noindex),
    og_title: String(r.og_title ?? ""),
    og_description: String(r.og_description ?? ""),
    og_image_url: (r.og_image_url as string | null) || null,
    faqs: parseJson<Faq[]>(r.faqs, []),
    auto_article_schema: Boolean(r.auto_article_schema),
    auto_faq_schema: Boolean(r.auto_faq_schema),
    custom_schemas: parseJson<CustomSchema[]>(r.custom_schemas, []),
    created_at: toIso(r.created_at as string) ?? new Date().toISOString(),
    updated_at: toIso(r.updated_at as string) ?? new Date().toISOString(),
  };
}

// --- Admin reads (never cached) -----------------------------------------

export async function getPostById(id: string): Promise<Post | null> {
  const row = await queryOne<PostRow>("SELECT * FROM posts WHERE id = ? LIMIT 1", [id]);
  return row ? mapPost(row) : null;
}

// --- Public reads (cached, tagged "posts"; admin saves call updateTag) --

const CACHE_PROFILE = { stale: 60, revalidate: 300, expire: 3600 };

const plain = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

function toCard(r: PostRow): PostCard {
  const excerpt = String(r.excerpt ?? "").trim() || plain(String(r.body_start ?? "")).slice(0, 150);
  return {
    id: String(r.id),
    slug: String(r.slug),
    title: String(r.title),
    excerpt,
    featured_image_url: (r.featured_image_url as string | null) || null,
    featured_image_alt: String(r.featured_image_alt ?? ""),
    published_at: toIso(r.published_at as string | null) ?? toIso(r.created_at as string) ?? new Date().toISOString(),
  };
}

const CARD_COLUMNS =
  "id, slug, title, excerpt, SUBSTRING(content_html, 1, 1200) AS body_start, featured_image_url, featured_image_alt, published_at, created_at";

// One page of the /blogs listing, newest first, plus the total for paging.
export async function getPublishedPostsPage(page: number, perPage: number) {
  "use cache";
  cacheTag("posts");
  cacheLife(CACHE_PROFILE);
  const offset = (Math.max(1, page) - 1) * perPage;
  const now = new Date();
  const [rows, total] = await Promise.all([
    query<PostRow>(
      `SELECT ${CARD_COLUMNS} FROM posts
        WHERE status = 'published' AND (published_at IS NULL OR published_at <= ?)
        ORDER BY published_at DESC, id ASC LIMIT ? OFFSET ?`,
      [now, perPage, offset],
    ),
    count("SELECT COUNT(*) AS n FROM posts WHERE status = 'published' AND (published_at IS NULL OR published_at <= ?)", [now]),
  ]);
  return { posts: rows.map(toCard), total };
}

export async function getPublishedPost(slug: string): Promise<Post | null> {
  "use cache";
  cacheTag("posts", `post:${slug}`);
  cacheLife(CACHE_PROFILE);
  const row = await queryOne<PostRow>(
    "SELECT * FROM posts WHERE status = 'published' AND post_type = 'blog' AND slug = ? LIMIT 1",
    [slug],
  );
  return row ? mapPost(row) : null;
}

export async function getPublishedSlugs() {
  "use cache";
  cacheTag("posts");
  cacheLife(CACHE_PROFILE);
  const rows = await query<{ slug: string; updated_at: string; noindex: number }>(
    "SELECT slug, updated_at, noindex FROM posts WHERE status = 'published' AND post_type = 'blog'",
  );
  return rows.map((r) => ({ slug: r.slug, updated_at: toIso(r.updated_at) ?? "", noindex: Boolean(r.noindex) }));
}

// Where an old (renamed) slug now lives, if anywhere.
export async function getRedirectTarget(oldSlug: string): Promise<string | null> {
  "use cache";
  cacheTag("posts", `post:${oldSlug}`);
  cacheLife(CACHE_PROFILE);
  const row = await queryOne<{ slug: string }>(
    `SELECT p.slug FROM post_redirects r JOIN posts p ON p.id = r.post_id
      WHERE r.post_type = 'blog' AND r.old_slug = ? AND p.status = 'published' LIMIT 1`,
    [oldSlug],
  );
  return row ? postPath("blog", row.slug) : null;
}
