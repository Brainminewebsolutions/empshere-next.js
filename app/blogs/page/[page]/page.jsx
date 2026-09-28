import { notFound } from "next/navigation";
import BlogListing, { getListingMetadata } from "@/components/blog/BlogListing";
import { getTotalPages } from "@/lib/blog";

// Static export: only the pages listed here exist. Page 1 lives at /blog/.
export const dynamicParams = false;

export function generateStaticParams() {
  const total = getTotalPages();
  // A static export needs at least one param; with a single page of posts,
  // /blog/page/2/ just renders the not-found page.
  if (total < 2) return [{ page: "2" }];
  return Array.from({ length: total - 1 }, (_, i) => ({ page: String(i + 2) }));
}

function parsePage(value) {
  const page = Number(value);
  return Number.isInteger(page) && page >= 2 && page <= getTotalPages() ? page : null;
}

export async function generateMetadata({ params }) {
  const page = parsePage((await params).page);
  return page ? getListingMetadata(page) : {};
}

export default async function BlogPaginatedPage({ params }) {
  const page = parsePage((await params).page);
  if (!page) notFound();
  return <BlogListing page={page} />;
}
