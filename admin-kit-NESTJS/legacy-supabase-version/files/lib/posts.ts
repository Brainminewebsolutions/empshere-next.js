import "server-only";
import { createPublicClient } from "./supabase/server";
import type { CustomSchema, Faq } from "./schema";

export type PostType = "blog" | "inspiration";
export type PostStatus = "draft" | "published";

export const POST_TYPES: PostType[] = ["blog", "inspiration"];

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
  faqs: Faq[] | null;
  // Structured data (null/undefined until supabase/schema.sql adds the columns)
  auto_article_schema?: boolean | null;
  auto_faq_schema?: boolean | null;
  custom_schemas?: CustomSchema[] | null;
  created_at: string;
  updated_at: string;
};

export const SITE_URL = "https://secure-house.co.uk";

export function postPath(type: PostType, slug: string) {
  return `/${type}/${slug}/`;
}

export function postUrl(post: Pick<Post, "post_type" | "slug">) {
  return `${SITE_URL}${postPath(post.post_type, post.slug)}`;
}

// --- Public reads (anon key, published only via RLS) -------------------

export async function getPublishedPosts(type: PostType) {
  const { data, error } = await createPublicClient()
    .from("posts")
    .select("*")
    .eq("post_type", type)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw new Error(`Failed to load ${type} posts: ${error.message}`);
  return (data ?? []) as Post[];
}

// One page of the /blog listing: every published post (blog + the older
// inspiration posts, shown as one list), newest first, plus the total
// count for pagination.
export async function getPublishedPostsPage(page: number, perPage: number) {
  const from = (page - 1) * perPage;
  const { data, error, count } = await createPublicClient()
    .from("posts")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .order("id", { ascending: true }) // stable order for equal dates
    .range(from, from + perPage - 1);
  if (error) throw new Error(`Failed to load posts: ${error.message}`);
  return { posts: (data ?? []) as Post[], total: count ?? 0 };
}

export async function countPublishedPosts() {
  const { count, error } = await createPublicClient()
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("status", "published");
  if (error) throw new Error(`Failed to count posts: ${error.message}`);
  return count ?? 0;
}

export async function getPublishedPost(type: PostType, slug: string) {
  const { data, error } = await createPublicClient()
    .from("posts")
    .select("*")
    .eq("post_type", type)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`Failed to load post ${slug}: ${error.message}`);
  return data as Post | null;
}

export async function getPublishedSlugs(type: PostType) {
  const { data, error } = await createPublicClient()
    .from("posts")
    .select("slug, updated_at, noindex")
    .eq("post_type", type)
    .eq("status", "published");
  if (error) throw new Error(`Failed to load ${type} slugs: ${error.message}`);
  return (data ?? []) as { slug: string; updated_at: string; noindex: boolean }[];
}

// Where an old (renamed) slug now lives, if anywhere.
export async function getRedirectTarget(type: PostType, oldSlug: string) {
  const supabase = createPublicClient();
  const { data: redirectRow } = await supabase
    .from("post_redirects")
    .select("post_id")
    .eq("post_type", type)
    .eq("old_slug", oldSlug)
    .maybeSingle();
  if (!redirectRow) return null;

  const { data: post } = await supabase
    .from("posts")
    .select("slug, post_type")
    .eq("id", redirectRow.post_id)
    .eq("status", "published")
    .maybeSingle();
  return post ? postPath(post.post_type as PostType, post.slug) : null;
}
