import BlogIndex, { blogMetadata } from "./BlogIndex";
import JsonLd from "@/components/JsonLd";

export const metadata = blogMetadata(1);

// Refreshed instantly when a post is saved in /admin (revalidatePath);
// hourly as a fallback for edits made directly in Supabase.
export const revalidate = 3600;

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd path="/blog/" />
      <BlogIndex page={1} />
    </>
  );
}
