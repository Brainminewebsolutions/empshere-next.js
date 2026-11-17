import Link from "next/link";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { createSessionClient } from "@/lib/supabase/server";
import { POST_TYPES, postPath, type PostType } from "@/lib/posts";
import DeletePostButton from "./DeletePostButton";
import Pagination, { PAGE_SIZE, pageParam } from "../Pagination";
import styles from "../../admin.module.css";

type Search = { type?: string; status?: string; q?: string; page?: string };

export default async function AdminPostsPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireStaff();
  const params = await searchParams;
  // All posts are one "Blog" list (everything here is what /blog shows).
  // ?type= still works as a hidden filter for old links.
  const type: PostType | "all" = POST_TYPES.includes(params.type as PostType) ? (params.type as PostType) : "all";
  const status = params.status === "published" || params.status === "draft" ? params.status : "";
  const q = (params.q ?? "").trim().slice(0, 100);
  const page = pageParam(params.page);

  const supabase = await createSessionClient();
  let query = supabase
    .from("posts")
    .select("id, title, slug, post_type, status, featured_image_url, published_at, updated_at, focus_keyphrase, meta_description", {
      count: "exact",
    })
    .order("published_at", { ascending: false, nullsFirst: true })
    .order("id")
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (type !== "all") query = query.eq("post_type", type);
  if (status) query = query.eq("status", status);
  if (q) query = query.ilike("title", `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`);

  // Totals for the All / Published / Drafts tabs (ignore the search box).
  const countStatus = async (s: string) => {
    let c = supabase.from("posts").select("id", { count: "exact", head: true });
    if (type !== "all") c = c.eq("post_type", type);
    if (s) c = c.eq("status", s);
    const { count } = await c;
    return count ?? 0;
  };

  const [{ data: posts, error, count: total }, allCount, publishedCount, draftCount] = await Promise.all([
    query,
    countStatus(""),
    countStatus("published"),
    countStatus("draft"),
  ]);

  const href = (t: string, s: string, p = 1) =>
    `/admin/posts/?type=${t}${s ? `&status=${s}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}${p > 1 ? `&page=${p}` : ""}`;
  const tabHref = (s: string) => href(type, s);
  const pageHref = (p: number) => href(type, status, p);
  const newType = "blog";

  // Past the last page (e.g. after deleting the last post on it).
  if (error?.code === "PGRST103" && page > 1) redirect(pageHref(1));

  const pagination = <Pagination page={page} total={total ?? 0} noun={["post", "posts"]} hrefFor={pageHref} />;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Blog posts</h1>
        <Link href={`/admin/posts/new/?type=${newType}`} className={styles.buttonPrimary}>
          + Add new
        </Link>
      </div>

      <p className={styles.pageIntro}>
        Every published post here appears on the public <a href="/blog/" target="_blank" rel="noopener">/blog</a> page.
      </p>

      <div className={styles.listToolbar}>
        <div className={styles.tabs} style={{ margin: 0 }}>
          {(
            [
              ["", "All", allCount],
              ["published", "Published", publishedCount],
              ["draft", "Drafts", draftCount],
            ] as const
          ).map(([value, text, n]) => (
            <Link key={value} href={tabHref(value)} className={`${styles.tab} ${status === value ? styles.tabActive : ""}`}>
              {text} <span className={styles.tabCount}>{n}</span>
            </Link>
          ))}
        </div>
        <div className={styles.listTools}>
          {pagination}
          <form className={styles.row} action="/admin/posts/">
            <input type="hidden" name="type" value={type} />
            {status && <input type="hidden" name="status" value={status} />}
            <input name="q" type="search" defaultValue={q} placeholder="Search titles" aria-label="Search titles" className={styles.input} style={{ width: 240 }} />
            <button className={styles.button} type="submit">Search</button>
          </form>
        </div>
      </div>

      {error && <p className={styles.error}>Could not load posts: {error.message}</p>}

      <div className={styles.tableWrap}>
        <table className={`${styles.table} ${styles.tableStack}`}>
          <thead>
            <tr>
              <th style={{ width: 88 }}>Image</th>
              <th>Title</th>
              <th>Status</th>
              <th>SEO</th>
              <th>Date</th>
              <th style={{ width: 200 }}>
                <span className={styles.srOnly}>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {(posts ?? []).map((post) => (
              <tr key={post.id}>
                <td className={styles.thumbCell}>
                  {post.featured_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.featured_image_url} alt="" className={styles.thumb} />
                  ) : (
                    <div className={styles.thumb} />
                  )}
                </td>
                <td>
                  <div style={{ minWidth: 0 }}>
                    <Link href={`/admin/posts/${post.id}/`} className={styles.cellTitle}>
                      {post.title}
                    </Link>
                    <div className={styles.cellSub}>{postPath(post.post_type as PostType, post.slug)}</div>
                  </div>
                </td>
                <td data-label="Status">
                  <span className={`${styles.badge} ${post.status === "published" ? styles.badgePublished : styles.badgeDraft}`}>
                    {post.status}
                  </span>
                </td>
                <td data-label="SEO">
                  <span
                    title={post.focus_keyphrase ? `Keyphrase: ${post.focus_keyphrase}` : "No focus keyphrase"}
                    className={`${styles.dot} ${
                      post.focus_keyphrase && post.meta_description ? styles.dotgood : post.focus_keyphrase || post.meta_description ? styles.dotok : styles.dotbad
                    }`}
                  />
                </td>
                <td data-label="Date" className={`${styles.muted} ${styles.nowrap}`}>
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("en-GB")
                    : `Edited ${new Date(post.updated_at).toLocaleDateString("en-GB")}`}
                </td>
                <td>
                  <div className={styles.row} style={{ gap: 2, flexWrap: "nowrap" }}>
                    <Link href={`/admin/posts/${post.id}/`} className={styles.buttonLink}>Edit</Link>
                    {post.status === "published" ? (
                      <a href={postPath(post.post_type as PostType, post.slug)} target="_blank" rel="noopener" className={styles.buttonLink}>View</a>
                    ) : (
                      <a href={`/admin/preview/${post.id}/`} target="_blank" rel="noopener" className={styles.buttonLink}>Preview</a>
                    )}
                    <DeletePostButton id={post.id} title={post.title} />
                  </div>
                </td>
              </tr>
            ))}
            {posts && posts.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 12 }}>{pagination}</div>
    </>
  );
}
