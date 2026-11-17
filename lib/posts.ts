import "server-only";
import { unstable_cache } from "next/cache";
import { query, queryOne, toIso } from "./db";
import type { CustomSchema, Faq } from "./post-schema";
import { snapshotRows } from "./posts-snapshot";

export type PostType = "blog";
export type PostStatus = "draft" | "published";

export const POST_TYPES: PostType[] = ["blog"];

export type { CustomSchema, Faq };

export type Term = { name: string; slug: string };

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
  featured_image_width: number | null;
  featured_image_height: number | null;
  featured_image_srcset: string;
  categories: Term[];
  tags: Term[];
  word_count: number;
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
  author_name: string;
  featured_image_url: string | null;
  featured_image_alt: string;
  featured_image_width: number | null;
  featured_image_height: number | null;
  featured_image_srcset: string;
  categories: Term[];
  tags: Term[];
  word_count: number;
  noindex: boolean;
  published_at: string;
  updated_at: string;
};

export const SITE_URL = "https://www.emsphere.com";

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
    featured_image_width: r.featured_image_width == null ? null : Number(r.featured_image_width),
    featured_image_height: r.featured_image_height == null ? null : Number(r.featured_image_height),
    featured_image_srcset: String(r.featured_image_srcset ?? ""),
    categories: parseJson<Term[]>(r.categories, []),
    tags: parseJson<Term[]>(r.tags, []),
    word_count: Number(r.word_count ?? 0),
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

// --- Public reads ---------------------------------------------------------
// Cached with unstable_cache and tagged "posts". The admin calls revalidateTag
// after every save (refreshPublicSite in app/admin/_actions/posts.ts), so an
// edited post shows on the site within seconds. The cache also expires on its
// own every 5 minutes. Only light "card" rows are cached as a list (no post
// bodies), so no cache entry gets near the 2 MB limit.

const REVALIDATE = 300;

const plain = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/s+/g, " ")
    .trim();

function toCard(r: PostRow): PostCard {
  const excerpt = String(r.excerpt ?? "").trim() || plain(String(r.body_start ?? "")).slice(0, 150);
  return {
    id: String(r.id),
    slug: String(r.slug),
    title: String(r.title),
    excerpt,
    author_name: String(r.author_name ?? ""),
    featured_image_url: (r.featured_image_url as string | null) || null,
    featured_image_alt: String(r.featured_image_alt ?? ""),
    featured_image_width: r.featured_image_width == null ? null : Number(r.featured_image_width),
    featured_image_height: r.featured_image_height == null ? null : Number(r.featured_image_height),
    featured_image_srcset: String(r.featured_image_srcset ?? ""),
    categories: parseJson<Term[]>(r.categories, []),
    tags: parseJson<Term[]>(r.tags, []),
    word_count: Number(r.word_count ?? 0),
    noindex: Boolean(r.noindex),
    published_at: toIso(r.published_at as string | null) ?? toIso(r.created_at as string) ?? new Date().toISOString(),
    updated_at: toIso(r.updated_at as string) ?? toIso(r.published_at as string | null) ?? new Date().toISOString(),
  };
}

const CARD_COLUMNS =
  "id, slug, title, excerpt, SUBSTRING(content_html, 1, 1200) AS body_start, author_name, featured_image_url, featured_image_alt, " +
  "featured_image_width, featured_image_height, featured_image_srcset, categories, tags, word_count, noindex, published_at, created_at, updated_at";

// Every published post as a light card, newest first. The blog listing,
// related posts, previous/next links and the home page all derive from this.
// Database reads are cached; a failed read throws inside the cache so the
// failure itself is never stored. The wrappers below fall back to the bundled
// snapshot (uncached) so a database problem cannot blank the blog, and the
// blog recovers on the very next request once the database is back.
const cachedCards = unstable_cache(
  async (): Promise<PostCard[]> => {
    const rows = await query<PostRow>(
      `SELECT ${CARD_COLUMNS} FROM posts
        WHERE status = 'published' AND post_type = 'blog' AND (published_at IS NULL OR published_at <= ?)
        ORDER BY published_at DESC, id ASC`,
      [new Date()],
    );
    return rows.map(toCard);
  },
  ["published-cards"],
  { tags: ["posts"], revalidate: REVALIDATE },
);

export async function getPublishedCards(): Promise<PostCard[]> {
  try {
    return await cachedCards();
  } catch (error) {
    console.error("[posts] database unavailable, serving the blog snapshot:", (error as Error)?.message || error);
    return snapshotRows()
      .map((r) => toCard({ ...r, body_start: String(r.content_html ?? "").slice(0, 1200) }))
      .sort((a, b) => b.published_at.localeCompare(a.published_at));
  }
}

// Full post (with body) for the public post page.
export async function getPublishedPost(slug: string): Promise<Post | null> {
  try {
    return await unstable_cache(
      async () => {
        const row = await queryOne<PostRow>(
          "SELECT * FROM posts WHERE status = 'published' AND post_type = 'blog' AND slug = ? LIMIT 1",
          [slug],
        );
        return row ? mapPost(row) : null;
      },
      ["published-post", slug],
      { tags: ["posts", `post:${slug}`], revalidate: REVALIDATE },
    )();
  } catch (error) {
    console.error("[posts] database unavailable, serving the blog snapshot:", (error as Error)?.message || error);
    const row = snapshotRows().find((r) => r.slug === slug);
    return row ? mapPost(row) : null;
  }
}

export async function getPublishedSlugs() {
  const cards = await getPublishedCards();
  return cards.map((c) => ({ slug: c.slug, updated_at: c.updated_at, noindex: c.noindex }));
}

// Where an old (renamed) slug now lives, if anywhere.
export async function getRedirectTarget(oldSlug: string): Promise<string | null> {
  return unstable_cache(
    async () => {
      try {
        const row = await queryOne<{ slug: string }>(
          `SELECT p.slug FROM post_redirects r JOIN posts p ON p.id = r.post_id
            WHERE r.post_type = 'blog' AND r.old_slug = ? AND p.status = 'published' LIMIT 1`,
          [oldSlug],
        );
        return row ? postPath("blog", row.slug) : null;
      } catch {
        return null;
      }
    },
    ["post-redirect", oldSlug],
    { tags: ["posts", `post:${oldSlug}`], revalidate: REVALIDATE },
  )();
}
