import BlogListing, { getListingMetadata } from "@/components/blog/BlogListing";

export const metadata = getListingMetadata(1);

export default function BlogPage() {
  return <BlogListing page={1} />;
}
