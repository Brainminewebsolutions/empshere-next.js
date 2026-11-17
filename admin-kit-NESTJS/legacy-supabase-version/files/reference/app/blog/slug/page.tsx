import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import BlogPostTemplate from "@/components/BlogPostTemplate";
import { getPublishedPost, getPublishedSlugs, getRedirectTarget } from "@/lib/posts";
import { buildPostMetadata } from "@/lib/post-metadata";

type Params = { slug: string };

// Pages are pre-rendered and refreshed instantly by the admin's save
// action (revalidatePath). The hourly revalidate is only a safety net for
// edits made directly in the Supabase dashboard.
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs("blog");
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost("blog", slug);
  return post ? buildPostMetadata(post) : {};
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPublishedPost("blog", slug);

  if (!post) {
    // Renamed in the admin? 301 the old slug to the new one.
    const target = await getRedirectTarget("blog", slug);
    if (target) permanentRedirect(target);
    notFound();
  }

  return <BlogPostTemplate post={post} />;
}
