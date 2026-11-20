/* --------------------------------------------------------------------
   Pure helpers for the public blog (no database, no server-only imports),
   so both server and client components can use them. The data layer is
   lib/blog.js (reads the posts table that the /admin dashboard edits).
   -------------------------------------------------------------------- */

import { SITE_URL as ENV_SITE_URL } from "@/lib/siteUrl";
export const SITE_URL = ENV_SITE_URL;
export const SITE_NAME = "Emsphere Technologies";

// Page 1 shows one featured post above the grid, later pages show a full grid.
export const FIRST_PAGE_GRID = 12;
export const POSTS_PER_PAGE = 12;

export function getPageHref(page) {
  return page <= 1 ? "/blog/" : `/blog/page/${page}/`;
}

export function getPostHref(post) {
  return `/blog/${post.slug}/`;
}

export function getPostUrl(post) {
  return `${SITE_URL}${getPostHref(post)}`;
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

/* ----------------------- listing helpers (pure) ----------------------- */

export function getTotalPages(posts) {
  const rest = Math.max(0, posts.length - 1 - FIRST_PAGE_GRID);
  return 1 + Math.ceil(rest / POSTS_PER_PAGE);
}

// Returns the posts for a listing page. Page 1 → { featured, posts },
// page N → { featured: null, posts }.
export function getPage(posts, page) {
  if (page === 1) {
    return { featured: posts[0] || null, posts: posts.slice(1, 1 + FIRST_PAGE_GRID) };
  }
  const start = 1 + FIRST_PAGE_GRID + (page - 2) * POSTS_PER_PAGE;
  return { featured: null, posts: posts.slice(start, start + POSTS_PER_PAGE) };
}

// Posts sharing the most categories/tags with `post`, newest first on ties.
export function getRelatedPosts(posts, post, limit = 3) {
  const terms = new Set([...post.categories, ...post.tags].map((t) => t.slug).filter((s) => s !== "uncategorized"));
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score: [...p.categories, ...p.tags].filter((t) => terms.has(t.slug)).length,
    }))
    .sort((a, b) => b.score - a.score || new Date(b.post.date) - new Date(a.post.date))
    .slice(0, limit)
    .map(({ post: p }) => p);
}

// Neighbouring posts in date order, for the "previous / next" links.
export function getAdjacentPosts(posts, post) {
  const index = posts.findIndex((p) => p.slug === post.slug);
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getTopCategories(posts, limit = 8) {
  const counts = new Map();
  for (const post of posts) {
    if (post.primaryCategory && post.primaryCategory.slug !== "uncategorized") {
      const { slug, name } = post.primaryCategory;
      counts.set(slug, { name, count: (counts.get(slug)?.count || 0) + 1 });
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count).slice(0, limit);
}

/* ------------------------- post body preparation ------------------------- */

const stripTags = (html) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

function headingSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

// Makes a post body safe and consistent for the article page: a single <h1>
// (the page title), lazy images, ids on every <h2> for the table of contents,
// and external links opening in a new tab. Posts imported from WordPress are
// already processed, so this is idempotent for them.
export function prepareContent(html = "") {
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>");

  out = out.replace(/<img\b([^>]*?)\/?>/gi, (tag, attrs) => {
    let a = attrs;
    if (!/\sloading=/i.test(a)) a += ' loading="lazy"';
    if (!/\sdecoding=/i.test(a)) a += ' decoding="async"';
    return `<img${a}>`;
  });

  out = out.replace(/<a\b([^>]*?)href="([^"]+)"([^>]*)>/gi, (tag, before, href, after) => {
    const isExternal = /^https?:\/\//i.test(href) && !href.includes("emsphere.com");
    if (!isExternal || /\starget=/i.test(before + after)) return tag;
    return `<a${before}href="${href}"${after} target="_blank" rel="noopener">`;
  });

  const toc = [];
  const used = new Set();
  out = out.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (tag, attrs = "", inner) => {
    const text = stripTags(inner);
    if (!text) return tag;
    const existing = attrs.match(/\sid="([^"]+)"/i);
    let id = existing ? existing[1] : headingSlug(text) || `section-${toc.length + 1}`;
    while (used.has(id)) id += "-2";
    used.add(id);
    toc.push({ id, text });
    return existing ? tag : `<h2${attrs} id="${id}">${inner}</h2>`;
  });

  out = out.replace(/<p[^>]*>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "").trim();
  return { html: out, toc };
}
