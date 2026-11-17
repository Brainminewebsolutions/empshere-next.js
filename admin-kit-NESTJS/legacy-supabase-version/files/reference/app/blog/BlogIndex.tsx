import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPostsPage, postPath } from "@/lib/posts";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "./page.module.css";

// 3 cards per row x 4 rows.
export const POSTS_PER_PAGE = 12;

const TITLE = "Security Tips & Guides | Secure House Blog";
const DESCRIPTION =
  "Expert advice on high security doors, windows, shutters and keeping your property safe, from the Secure House team.";

export function pageHref(page: number) {
  return page <= 1 ? "/blog/" : `/blog/page/${page}/`;
}

export function blogMetadata(page: number): Metadata {
  const url = `https://secure-house.co.uk${pageHref(page)}`;
  const title = page > 1 ? `${TITLE} - Page ${page}` : TITLE;
  return {
    title,
    description: DESCRIPTION,
    alternates: { canonical: url },
    openGraph: { title, description: DESCRIPTION, url, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
  };
}

// Page numbers to show: always first/last, a window around the current
// page, and "…" for the gaps - e.g. 1 … 4 5 6 … 12.
function pageList(current: number, total: number): (number | "gap")[] {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap");
    out.push(p);
  });
  return out;
}

// Shared by /blog (page 1) and /blog/page/[page]. Every post published in
// /admin -> Blog posts is listed here, as one section.
export default async function BlogIndex({ page }: { page: number }) {
  const { posts, total } = await getPublishedPostsPage(page, POSTS_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  return (
    <>
      {/* Every Avada-scraped page loads its own compiled fusion-styles
         bundle, which - besides page-specific rules - carries the base
         theme CSS the shared <Header/>/<Footer/> components depend on
         (menu layout, image resets, etc; confirmed by comparing rule
         counts: this page loaded ~100 rules total vs several thousand on
         every other page). This hand-built page never included any such
         link, so the header rendered as an unstyled bullet list and a
         plain <img> overflowed unclamped (see theme-globals.css's img
         reset, added earlier for the same reason). Reusing the
         homepage's bundle here restores the missing base styling -
         confirmed these bundles are near-duplicate global CSS across
         pages, not page-locked, so this carries no page-specific risk. */}
      <link
        rel="stylesheet"
        href="/legacy-assets/uploads/fusion-styles/3978f22170001630860f0711fbc80184.min.css"
      />
      <div className={styles.wrapper}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Insights &amp; Guides</p>
          <h1 className={styles.heading}>Blog</h1>
          <p className={styles.lead}>{DESCRIPTION}</p>
        </header>

        {posts.length === 0 ? (
          <p className={styles.empty}>New articles are coming soon.</p>
        ) : (
          <ul className={styles.grid}>
            {posts.map((post) => {
              const dateIso = post.published_at ?? post.updated_at;
              const dateLabel = new Date(dateIso).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <li key={post.id} className={styles.item}>
                  <Link href={postPath(post.post_type, post.slug)} className={styles.card}>
                    <div className={styles.media}>
                      {post.featured_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.featured_image_url}
                          alt={post.featured_image_alt || post.title}
                          className={styles.image}
                          loading="lazy"
                        />
                      ) : (
                        <span className={styles.imageFallback}>Secure House</span>
                      )}
                    </div>
                    <div className={styles.body}>
                      <div className={styles.meta}>
                        <span className={styles.category}>Blog</span>
                        <time dateTime={dateIso}>{dateLabel}</time>
                      </div>
                      <h2 className={styles.cardTitle}>{post.title}</h2>
                      {post.excerpt && <p className={styles.cardExcerpt}>{post.excerpt}</p>}
                      <span className={styles.readMore}>
                        Read article <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Blog pages">
            {page > 1 ? (
              <Link href={pageHref(page - 1)} className={styles.pageLink} rel="prev">
                <span aria-hidden="true">‹</span> Prev
              </Link>
            ) : (
              <span className={`${styles.pageLink} ${styles.pageDisabled}`} aria-hidden="true">
                <span>‹</span> Prev
              </span>
            )}

            {pageList(page, totalPages).map((p, i) =>
              p === "gap" ? (
                <span key={`gap-${i}`} className={styles.pageGap} aria-hidden="true">
                  …
                </span>
              ) : p === page ? (
                <span key={p} className={`${styles.pageLink} ${styles.pageCurrent}`} aria-current="page">
                  {p}
                </span>
              ) : (
                <Link key={p} href={pageHref(p)} className={styles.pageLink} aria-label={`Page ${p}`}>
                  {p}
                </Link>
              ),
            )}

            {page < totalPages ? (
              <Link href={pageHref(page + 1)} className={styles.pageLink} rel="next">
                Next <span aria-hidden="true">›</span>
              </Link>
            ) : (
              <span className={`${styles.pageLink} ${styles.pageDisabled}`} aria-hidden="true">
                Next <span>›</span>
              </span>
            )}
          </nav>
        )}
      </div>
    </>
  );
}
