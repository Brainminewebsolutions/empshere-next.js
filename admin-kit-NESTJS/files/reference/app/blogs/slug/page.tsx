import { notFound, permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import BlogArticle from "../../components/BlogArticle";
import { getPublishedPost, getRedirectTarget, type Post } from "@/lib/posts";
import { buildPostMetadata } from "@/lib/post-metadata";

type Props = { params: Promise<{ slug: string }> };

async function loadPost(slug: string): Promise<{ post: Post | null; failed: boolean }> {
  try {
    return { post: await getPublishedPost(slug), failed: false };
  } catch (err) {
    console.error("[blogs/slug] could not load post", err);
    return { post: null, failed: true };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await loadPost(slug);
  return post ? buildPostMetadata(post) : { title: "Blog | Winsquare" };
}

async function PostContent({ params }: Props) {
  const { slug } = await params;
  const { post, failed } = await loadPost(slug);

  if (failed) {
    return (
      <section className="page-hero"><div className="wrap"><h1>Temporarily unavailable</h1><p className="page-hero__sub">We couldn’t load this post right now. Please try again shortly.</p></div></section>
    );
  }
  if (!post) {
    // A renamed post: send the old URL to the new one.
    const target = await getRedirectTarget(slug).catch(() => null);
    if (target) permanentRedirect(target);
    notFound();
  }
  return <BlogArticle post={post} />;
}

export default function BlogPost({ params }: Props) {
  return (
    <main>
      <Suspense fallback={<section className="page-hero"><div className="wrap"><h1>Loading…</h1></div></section>}>
        <PostContent params={params} />
      </Suspense>
    </main>
  );
}
