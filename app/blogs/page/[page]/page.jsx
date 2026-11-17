import { notFound } from "next/navigation";
import BlogListing, { getListingMetadata } from "@/components/blog/BlogListing";
import { getAllPosts } from "@/lib/blog";
import { getTotalPages } from "@/lib/blog-shared";

// Posts come from the database (edited in /admin), so these pages are
// rendered on request. Page 1 lives at /blog/.
export const dynamic = "force-dynamic";

async function parsePage(value) {
  const page = Number(value);
  if (!Number.isInteger(page) || page < 2) return null;
  const total = getTotalPages(await getAllPosts());
  return page <= total ? page : null;
}

export async function generateMetadata({ params }) {
  const page = await parsePage((await params).page);
  return page ? getListingMetadata(page) : {};
}

export default async function BlogPaginatedPage({ params }) {
  const page = await parsePage((await params).page);
  if (!page) notFound();
  return <BlogListing page={page} />;
}
