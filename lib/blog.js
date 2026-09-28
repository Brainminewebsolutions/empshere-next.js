import blogData from "@/data/blog-posts.json";

/* --------------------------------------------------------------------
   Read-only access to the WordPress snapshot written by
   scripts/fetch-blog-posts.mjs. Every /blog page is generated from this
   at build time, so the static export needs no server.
   -------------------------------------------------------------------- */

export const SITE_URL = "https://www.emsphere.com";
export const SITE_NAME = "Emsphere Technologies";

// Page 1 shows one featured post above the grid, later pages show a full grid.
export const FIRST_PAGE_GRID = 12;
export const POSTS_PER_PAGE = 12;

const POSTS = [...blogData.posts].sort((a, b) => new Date(b.date) - new Date(a.date));

export function getBlogIndexSeo() {
  return blogData.blogIndexSeo || null;
}

export function getAllPosts() {
  return POSTS;
}

export function getPostBySlug(slug) {
  return POSTS.find((post) => post.slug === slug) || null;
}

export function getTotalPages() {
  const rest = Math.max(0, POSTS.length - 1 - FIRST_PAGE_GRID);
  return 1 + Math.ceil(rest / POSTS_PER_PAGE);
}

// Returns the posts for a listing page. Page 1 → { featured, posts },
// page N → { featured: null, posts }.
export function getPage(page) {
  if (page === 1) {
    return { featured: POSTS[0] || null, posts: POSTS.slice(1, 1 + FIRST_PAGE_GRID) };
  }
  const start = 1 + FIRST_PAGE_GRID + (page - 2) * POSTS_PER_PAGE;
  return { featured: null, posts: POSTS.slice(start, start + POSTS_PER_PAGE) };
}

export function getPageHref(page) {
  return page <= 1 ? "/blog/" : `/blog/page/${page}/`;
}

export function getPostHref(post) {
  return `/blog/${post.slug}/`;
}

export function getPostUrl(post) {
  return `${SITE_URL}${getPostHref(post)}`;
}

// Posts sharing the most categories/tags with `post`, newest first on ties.
export function getRelatedPosts(post, limit = 3) {
  const terms = new Set([...post.categories, ...post.tags].map((t) => t.slug).filter((s) => s !== "uncategorized"));
  return POSTS.filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score: [...p.categories, ...p.tags].filter((t) => terms.has(t.slug)).length,
    }))
    .sort((a, b) => b.score - a.score || new Date(b.post.date) - new Date(a.post.date))
    .slice(0, limit)
    .map(({ post: p }) => p);
}

// Neighbouring posts in date order, for the "previous / next" links.
export function getAdjacentPosts(post) {
  const index = POSTS.findIndex((p) => p.slug === post.slug);
  return {
    newer: index > 0 ? POSTS[index - 1] : null,
    older: index < POSTS.length - 1 ? POSTS[index + 1] : null,
  };
}

export function getTopCategories(limit = 8) {
  const counts = new Map();
  for (const post of POSTS) {
    if (post.primaryCategory && post.primaryCategory.slug !== "uncategorized") {
      const { slug, name } = post.primaryCategory;
      counts.set(slug, { name, count: (counts.get(slug)?.count || 0) + 1 });
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count).slice(0, limit);
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export function formatDate(iso) {
  return DATE_FORMAT.format(new Date(iso));
}

// Page numbers to render, with "…" gaps: 1 … 4 5 6 … 10
export function getPaginationRange(current, total, siblings = 1) {
  const pages = new Set([1, total]);
  for (let p = current - siblings; p <= current + siblings; p++) {
    if (p > 1 && p < total) pages.add(p);
  }
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const range = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] === 2) range.push(p - 1);
    else if (i > 0 && p - sorted[i - 1] > 2) range.push(`gap-${p}`);
    range.push(p);
  });
  return range;
}

export function jsonLdScript(data) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
