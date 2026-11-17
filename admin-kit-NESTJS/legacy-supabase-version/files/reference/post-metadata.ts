import "server-only";
import type { Metadata } from "next";
import { postUrl, type Post } from "./posts";
import { DEFAULT_OG_IMAGE } from "./seo";

// Turns a post's SEO fields (edited in /admin) into Next.js metadata.
// Every SEO field is optional and falls back the way Yoast does:
// SEO title -> post title, meta description -> excerpt, social fields ->
// SEO fields, social image -> featured image -> site default.
export function buildPostMetadata(post: Post): Metadata {
  const url = postUrl(post);
  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const ogTitle = post.og_title || title;
  const ogDescription = post.og_description || description;
  const ogImage = post.og_image_url || post.featured_image_url;
  const images = ogImage ? [{ url: ogImage }] : [DEFAULT_OG_IMAGE];

  return {
    title,
    description,
    keywords: post.meta_keywords
      ? post.meta_keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : undefined,
    alternates: {
      canonical: post.canonical_url || url,
    },
    robots: post.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: images.map((i) => i.url),
    },
  };
}
