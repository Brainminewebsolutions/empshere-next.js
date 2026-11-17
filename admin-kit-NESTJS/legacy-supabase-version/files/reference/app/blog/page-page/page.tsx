import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { countPublishedPosts } from "@/lib/posts";
import BlogIndex, { blogMetadata, POSTS_PER_PAGE } from "../../BlogIndex";

type Params = { page: string };

// Same caching as /blog: rebuilt on every admin save, hourly otherwise.
// Pages beyond those pre-built (new posts pushed the count up) render on
// first request.
export const revalidate = 3600;

export async function generateStaticParams() {
  const totalPages = Math.ceil((await countPublishedPosts()) / POSTS_PER_PAGE);
  // Page 1 lives at /blog/ itself.
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({ page: String(i + 2) }));
}

function parsePage(value: string) {
  return /^[1-9][0-9]{0,4}$/.test(value) ? Number(value) : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = parsePage((await params).page);
  return page ? blogMetadata(page) : {};
}

export default async function BlogPagedPage({ params }: { params: Promise<Params> }) {
  const page = parsePage((await params).page);
  if (!page) notFound();
  if (page === 1) permanentRedirect("/blog/");

  const totalPages = Math.ceil((await countPublishedPosts()) / POSTS_PER_PAGE);
  if (page > totalPages) notFound();

  return <BlogIndex page={page} />;
}
