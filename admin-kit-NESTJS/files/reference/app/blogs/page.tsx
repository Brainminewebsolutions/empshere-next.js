import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import type { Metadata } from "next";
import BlogGrid from "../components/BlogGrid";
import { getPublishedPostsPage } from "@/lib/posts";

const IMG = "/images/";
const PER = 9;

export const metadata: Metadata = {
  title: "Blogs | Winsquare",
  description: "A curated collection of ideas and stories for homes that value design and style: modular kitchens, windows, doors and more.",
  alternates: { canonical: "/blogs" },
};

async function Posts() {
  await connection(); // read the database at request time, never at build time
  let data: Awaited<ReturnType<typeof getPublishedPostsPage>> | null = null;
  try {
    data = await getPublishedPostsPage(1, PER);
  } catch (err) {
    console.error("[blogs] could not load posts", err);
  }
  if (!data) {
    return <div className="blogs__msg" role="alert"><p>We couldn’t load the blogs right now. Please try again shortly.</p></div>;
  }
  return <BlogGrid initial={data.posts} total={data.total} />;
}

export default function BlogsPage() {
  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: `linear-gradient(rgba(83,68,102,.92),rgba(0,0,0,.78)),url(${IMG}blogs-bg.webp)` }}>
        <div className="wrap">
          <p className="crumbs"><Link href="/">Home</Link> / Blogs</p>
          <h1>Our Blogs</h1>
          <p className="page-hero__sub">A curated collection of ideas and stories for homes that value design and style</p>
        </div>
      </section>

      <section className="blogs blogs--page" style={{ backgroundImage: `url(${IMG}blogs-bg.webp)` }}>
        <div className="wrap">
          <Suspense fallback={<div className="blogs__grid" aria-busy="true">{[0, 1, 2].map((i) => <div key={i} className="blog blog--skel" aria-hidden="true" />)}</div>}>
            <Posts />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
