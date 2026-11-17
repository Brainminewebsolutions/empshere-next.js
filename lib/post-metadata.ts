import "server-only";
import type { Metadata } from "next";
import { absoluteUrl, postUrl, type Post } from "./posts";

// Turns a post's SEO fields (edited in /admin) into Next.js metadata.
// Every field is optional and falls back the way Yoast does:
// SEO title -> post title, meta description -> excerpt, social fields -> SEO
// fields, social image -> featured image.
export function buildPostMetadata(post: Post): Metadata {
  const url = postUrl(post);
  const title = post.meta_title || `${post.title} | Emsphere Blog`;
  const description = post.meta_description || post.excerpt || undefined;
  const ogTitle = post.og_title || post.meta_title || post.title;
  const ogDescription = post.og_description || description;
  const ogImage = absoluteUrl(post.og_image_url || post.featured_image_url);

  return {
    title,
    description,
    keywords: post.meta_keywords ? post.meta_keywords.split(",").map((k) => k.trim()).filter(Boolean) : undefined,
    alternates: { canonical: post.canonical_url || url },
    robots: post.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
