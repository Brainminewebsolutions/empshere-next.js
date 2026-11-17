"use client";

import Link from "next/link";
import { useState } from "react";
import type { PostCard } from "@/lib/posts";

const PER = 9;
const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

// Blog cards for /blogs. The first page is rendered on the server (good for
// SEO); "Load more" fetches the next pages from /api/posts.
export default function BlogGrid({ initial, total }: { initial: PostCard[]; total: number }) {
  const [posts, setPosts] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const more = posts.length < total;

  const loadMore = async () => {
    setStatus("loading");
    try {
      const page = Math.floor(posts.length / PER) + 1;
      const r = await fetch(`/api/posts?page=${page}&per=${PER}`);
      if (!r.ok) throw new Error(String(r.status));
      const data: { posts: PostCard[] } = await r.json();
      setPosts((prev) => [...prev, ...data.posts.filter((d) => !prev.some((p) => p.id === d.id))]);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  if (posts.length === 0) return <p className="blogs__end">No posts yet. Please check back soon.</p>;

  return (
    <>
      <div className="blogs__grid" data-reveal>
        {posts.map((b, i) => (
          <Link key={b.id} href={`/blogs/${b.slug}`} className="blog blog--link reveal" style={{ transitionDelay: `${(i % PER) * 70}ms` }}>
            <div className="blog__img" role="img" aria-label={b.featured_image_alt || b.title} style={b.featured_image_url ? { backgroundImage: `url("${b.featured_image_url}")` } : undefined} />
            <div className="blog__date"><img src="/images/calendar.svg" alt="" width={20} height={22} />{fmt(b.published_at)}</div>
            <h3>{b.title}</h3>
            {b.excerpt && <p className="blog__excerpt">{b.excerpt}{b.excerpt.length >= 150 ? "…" : ""}</p>}
            <span className="blog__read">Read more →</span>
          </Link>
        ))}
      </div>

      {status === "error" && (
        <div className="blogs__msg" role="alert">
          <p>We couldn’t load more blogs right now.</p>
          <button className="btn btn--ghost" onClick={loadMore}>Try again</button>
        </div>
      )}
      {more && status !== "error" && (
        <div className="blogs__more">
          <button className="btn btn--pink" onClick={loadMore} disabled={status === "loading"}>
            {status === "loading" ? "Loading…" : "Load more posts"}
          </button>
        </div>
      )}
      {!more && <p className="blogs__end">You’ve reached the end · {posts.length} {posts.length === 1 ? "post" : "posts"}</p>}
    </>
  );
}
