import fs from "node:fs";
import path from "node:path";
import { getAllPosts, getTotalPages, getPageHref } from "@/lib/blog";
import { absoluteUrl } from "@/lib/siteUrl";
import { SITE_PAGES } from "@/lib/sitePages";

// Built on request so new/deleted posts show up without a rebuild.
export const dynamic = "force-dynamic";

// If the database is unreachable, fall back to the WordPress snapshot so the sitemap is never empty.
function snapshotPosts() {
  try {
    const file = path.join(process.cwd(), "data", "blog-posts.json");
    return JSON.parse(fs.readFileSync(file, "utf8")).posts.map((p) => ({
      slug: p.slug,
      modified: p.modified,
      seo: { index: !(p.seo && p.seo.index === false) },
    }));
  } catch {
    return [];
  }
}

export default async function sitemap() {
  let posts;
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error("[sitemap] database unavailable, using data/blog-posts.json:", error.message);
    posts = snapshotPosts();
  }
  const indexable = posts.filter((p) => p.seo?.index !== false);
  const toDate = (v) => {
    const d = v ? new Date(v) : null;
    return d && !Number.isNaN(d.getTime()) ? d : undefined;
  };
  const latest = indexable.map((p) => toDate(p.modified)).filter(Boolean).sort((a, b) => a - b).pop();

  const entries = SITE_PAGES.map((p) => ({
    url: absoluteUrl(p),
    changeFrequency: p === "/" ? "daily" : "monthly",
    priority: p === "/" ? 1 : 0.8,
  }));

  const totalPages = getTotalPages(indexable);
  for (let page = 1; page <= totalPages; page++) {
    entries.push({ url: absoluteUrl(getPageHref(page)), lastModified: latest, changeFrequency: page === 1 ? "daily" : "weekly", priority: page === 1 ? 0.8 : 0.4 });
  }
  for (const p of indexable) {
    entries.push({ url: absoluteUrl(`/blog/${p.slug}/`), lastModified: toDate(p.modified), changeFrequency: "monthly", priority: 0.7 });
  }
  return entries;
}
