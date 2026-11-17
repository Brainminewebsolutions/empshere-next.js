import BlogListing, { getListingMetadata } from "@/components/blog/BlogListing";

// Posts come from the database (edited in /admin), so the page is rendered on
// request; the post list itself is cached and refreshed when a post is saved.
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getListingMetadata(1);
}

export default function BlogPage() {
  return <BlogListing page={1} />;
}
