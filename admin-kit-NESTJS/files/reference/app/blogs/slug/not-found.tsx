import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="page-hero"><div className="wrap"><h1>Post not found</h1><p className="page-hero__sub">This blog post may have been moved or removed.</p><Link href="/blogs" className="btn btn--pink" style={{ marginTop: "1.5rem" }}>Back to all blogs</Link></div></main>
    </>
  );
}
