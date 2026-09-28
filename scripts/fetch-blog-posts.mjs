/* --------------------------------------------------------------------
   Pulls every published post from the WordPress backend (public_html/blog)
   plus its Rank Math SEO data, and writes one JSON snapshot that the
   /blog pages read at build time. The site is a static export, so this
   runs before `next build` / `next dev` (see package.json) — publish a new
   post in WordPress, then rebuild + redeploy to put it live.

   Usage:
     node scripts/fetch-blog-posts.mjs                 (fails if nothing fetched)
     node scripts/fetch-blog-posts.mjs --allow-empty   (dev: never blocks)

   Env:
     WORDPRESS_URL   WordPress install root — its "WordPress Address" setting
                     (default: the Hostinger install below)
     SITE_URL        Public Next.js site (default https://www.emsphere.com)

   SEO comes from Rank Math's headless API, which returns exactly what the
   Rank Math snippet editor shows. Turn it on once in WordPress:
     Rank Math → General Settings → Others → Headless CMS Support
   -------------------------------------------------------------------- */

import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WORDPRESS_URL = (process.env.WORDPRESS_URL || "https://olivedrab-dove-173337.hostingersite.com/blog").replace(
  /\/+$/,
  ""
);
const SITE_URL = (process.env.SITE_URL || "https://www.emsphere.com").replace(/\/+$/, "");
const BRAND_NAME = "Emsphere";
const OUT_FILE = path.join(__dirname, "..", "data", "blog-posts.json");
const ALLOW_EMPTY = process.argv.includes("--allow-empty");

// "pretty" = /blog/wp-json/…, "query" = /blog/index.php?rest_route=…
// Chosen by detectApi(): the host may route /blog/ away from WordPress, so which
// form reaches WordPress depends on the host's rewrite rules.
let apiMode = "pretty";

function apiUrl(route, params = {}) {
  const qs = new URLSearchParams(params).toString();
  if (apiMode === "pretty") return `${WORDPRESS_URL}/wp-json${route}${qs ? `?${qs}` : ""}`;
  return `${WORDPRESS_URL}/index.php?rest_route=${route}${qs ? `&${qs}` : ""}`;
}

// Cloudflare in front of emsphere.com rejects Node's TLS fingerprint but
// accepts curl, so every request falls back to curl on a block.
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";

async function httpGet(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": BROWSER_UA, Accept: "application/json,text/html;q=0.9" },
      signal: AbortSignal.timeout(45000),
    });
    const body = await res.text();
    if (![403, 429, 503].includes(res.status)) return { status: res.status, body };
  } catch {
    // network error — try curl below
  }

  const { stdout } = await execFileAsync(
    "curl",
    ["-sS", "-L", "--compressed", "-m", "60", "-A", BROWSER_UA, "-w", "\n__STATUS__%{http_code}", url],
    { maxBuffer: 64 * 1024 * 1024, windowsHide: true }
  );
  const marker = stdout.lastIndexOf("\n__STATUS__");
  return { status: Number(stdout.slice(marker + 11)), body: stdout.slice(0, marker) };
}

async function getJson(route, params) {
  const { status, body } = await httpGet(apiUrl(route, params));
  let data;
  try {
    data = JSON.parse(body);
  } catch {
    throw new Error(`Non-JSON response (${status}) from ${route}: ${body.slice(0, 160).replace(/\s+/g, " ")}`);
  }
  return { status, data };
}

// Finds a REST entry point that WordPress (not the static site) answers, and
// returns the API index so we can see which routes are enabled.
async function detectApi() {
  const errors = [];
  for (const mode of ["pretty", "query"]) {
    apiMode = mode;
    try {
      const { status, data } = await getJson("/");
      if (status === 200 && data?.routes) return data;
      errors.push(`${apiUrl("/")} → ${status}`);
    } catch (err) {
      errors.push(`${apiUrl("/")} → ${err.message}`);
    }
  }
  throw new Error(`WordPress REST API not reachable:\n  ${errors.join("\n  ")}`);
}

/* ---------------------------- text helpers ---------------------------- */

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…",
  ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
  laquo: "«", raquo: "»", copy: "©", reg: "®", trade: "™", middot: "·", bull: "•",
};

function decodeEntities(str = "") {
  return str.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

function stripTags(html = "") {
  return decodeEntities(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ") > max * 0.6 ? cut.lastIndexOf(" ") : max).replace(/[\s,.;:–—-]+$/, "") + "…";
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/* --------------------------- content cleanup --------------------------- */

// Makes WordPress post HTML safe to drop into the Next.js article: removes
// document-level tags, scripts and styles, keeps a single <h1> on the page,
// lazy-loads images and gives every <h2> an id for the table of contents.
function processContent(html = "") {
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?(html|head|body)(\s[^>]*)?>/gi, "")
    .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>");

  out = out.replace(/<img\b([^>]*?)\/?>/gi, (tag, attrs) => {
    let a = attrs;
    if (!/\sloading=/i.test(a)) a += ' loading="lazy"';
    if (!/\sdecoding=/i.test(a)) a += ' decoding="async"';
    return `<img${a}>`;
  });

  // Links to other posts on the WordPress host point at the public site
  // instead; media (wp-content) stays on the WordPress host.
  const wpHost = new URL(WORDPRESS_URL).host;
  out = out.replace(/(<a\b[^>]*?href=")([^"]+)"/gi, (tag, start, href) => {
    if (href.startsWith(WORDPRESS_URL) && !href.startsWith(`${WORDPRESS_URL}/wp-`)) {
      return `${start}${SITE_URL}/blog${href.slice(WORDPRESS_URL.length)}"`;
    }
    return tag;
  });

  // External links open in a new tab; internal links stay put.
  out = out.replace(/<a\b([^>]*?)href="([^"]+)"([^>]*)>/gi, (tag, before, href, after) => {
    const isExternal =
      /^https?:\/\//i.test(href) && !href.startsWith(SITE_URL) && !href.includes("emsphere.com") && !href.includes(wpHost);
    if (!isExternal || /\starget=/i.test(before + after)) return tag;
    return `<a${before}href="${href}"${after} target="_blank" rel="noopener">`;
  });

  const toc = [];
  const used = new Set();
  out = out.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (tag, attrs = "", inner) => {
    const text = stripTags(inner);
    if (!text) return tag;
    const existing = attrs.match(/\sid="([^"]+)"/i);
    let id = existing ? existing[1] : slugify(text) || `section-${toc.length + 1}`;
    while (used.has(id)) id += "-2";
    used.add(id);
    toc.push({ id, text });
    return existing ? tag : `<h2${attrs} id="${id}">${inner}</h2>`;
  });

  // Paragraphs that are empty after cleanup only add stray whitespace.
  out = out.replace(/<p[^>]*>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "").trim();

  return { html: out, toc };
}

/* ------------------------------ Rank Math ------------------------------ */

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"));
  return m ? decodeEntities(m[2]) : undefined;
}

function metaContent(head, key) {
  for (const tag of head.match(/<meta\b[^>]*>/gi) || []) {
    if (attr(tag, "name") === key || attr(tag, "property") === key) return attr(tag, "content");
  }
  return undefined;
}

// Parses the <head> markup Rank Math produces (from its headless API or the
// WordPress page) into the fields the Next.js metadata API needs.
function parseRankMathHead(head) {
  if (!head || !/<title>|<meta\b/i.test(head)) return null;

  const titleMatch = head.match(/<title>([\s\S]*?)<\/title>/i);
  const robots = (metaContent(head, "robots") || "").toLowerCase();

  const keywords = new Set();
  let schemaTitle;
  (metaContent(head, "keywords") || "").split(",").forEach((k) => k.trim() && keywords.add(k.trim()));
  for (const block of head.match(/<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) || []) {
    try {
      const json = JSON.parse(block.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, ""));
      const nodes = json["@graph"] || [json];
      for (const node of nodes) {
        // Rank Math names the WebPage node with the resolved SEO title.
        if (!schemaTitle && [].concat(node["@type"]).includes("WebPage") && typeof node.name === "string") {
          schemaTitle = decodeEntities(node.name).trim();
        }
        if (typeof node.keywords === "string") {
          node.keywords.split(",").forEach((k) => k.trim() && keywords.add(decodeEntities(k.trim())));
        }
      }
    } catch {
      // ignore malformed schema
    }
  }

  return {
    // The headless API omits <title> (WordPress core prints it), so fall back
    // to the schema's WebPage name, then og:title — all the same SEO title.
    title: (titleMatch && decodeEntities(titleMatch[1]).trim()) || schemaTitle || metaContent(head, "og:title"),
    description: metaContent(head, "description"),
    ogTitle: metaContent(head, "og:title"),
    ogDescription: metaContent(head, "og:description"),
    ogImage: metaContent(head, "og:image"),
    ogImageAlt: metaContent(head, "og:image:alt"),
    twitterTitle: metaContent(head, "twitter:title"),
    twitterDescription: metaContent(head, "twitter:description"),
    keywords: [...keywords],
    index: !robots.includes("noindex"),
    follow: !robots.includes("nofollow"),
  };
}

let headlessApiAvailable = false;

// `wpUrl` must be the post's WordPress permalink (post.link from the REST
// API) — that is the URL Rank Math resolves the post from.
async function fetchRankMath(wpUrl) {
  // 1) Rank Math headless API — the exact title / description / robots /
  //    focus keyword from the Rank Math snippet editor, variables resolved.
  if (headlessApiAvailable) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const { status, data } = await getJson("/rankmath/v1/getHead", { url: wpUrl });
        if (status === 200 && data?.success && data.head) {
          const seo = parseRankMathHead(data.head);
          if (seo) return { ...seo, source: "rankmath-api" };
        }
        if (status < 500) break;
      } catch {
        // retry
      }
    }
  }

  // 2) The WordPress-rendered page — only usable while WordPress (not the
  //    Next.js export) still answers at that URL, i.e. Rank Math's own tags
  //    are in the markup.
  try {
    const { status, body } = await httpGet(wpUrl);
    if (status === 200 && /class="rank-math-schema/.test(body)) {
      const seo = parseRankMathHead(body.slice(0, body.search(/<\/head>/i) + 7));
      if (seo) return { ...seo, source: "wordpress-html" };
    }
  } catch {
    // fall through
  }

  return null;
}

/* ------------------------------- images ------------------------------- */

const NULL_DEVICE = process.platform === "win32" ? "NUL" : "/dev/null";
const urlStatusCache = new Map();

// True when the URL answers with a non-error status (HEAD, curl fallback).
function urlExists(url) {
  if (!urlStatusCache.has(url)) {
    urlStatusCache.set(
      url,
      (async () => {
        try {
          const res = await fetch(url, {
            method: "HEAD",
            headers: { "User-Agent": BROWSER_UA },
            signal: AbortSignal.timeout(20000),
          });
          if (res.status < 400) return true;
          if (![403, 405, 429, 503].includes(res.status)) return false;
        } catch {
          // try curl
        }
        try {
          const { stdout } = await execFileAsync(
            "curl",
            ["-sS", "-L", "-I", "-o", NULL_DEVICE, "-w", "%{http_code}", "-m", "30", "-A", BROWSER_UA, url],
            { windowsHide: true }
          );
          return Number(stdout) > 0 && Number(stdout) < 400;
        } catch {
          return false;
        }
      })()
    );
  }
  return urlStatusCache.get(url);
}

// Old NitroPack CDN copies (cdn-xxxx.nitrocdn.com/…/wp-content/uploads/…)
// no longer exist — point them at the WordPress uploads folder instead.
function rewriteDeadCdn(html) {
  return html.replace(
    /https?:\/\/cdn-[a-z0-9-]+\.nitrocdn\.com\/[^"'\s,]*?\/(wp-content\/uploads\/[^"'\s,]+)/gi,
    (match, uploadPath) => `${WORDPRESS_URL}/${uploadPath}`
  );
}

// WordPress's generated sizes as a srcset, so cards download a ~400–800px
// copy instead of the full-size original.
function buildSrcSet(media) {
  const details = media?.media_details;
  if (!details?.sizes) return undefined;
  const seen = new Set();
  const entries = [...Object.values(details.sizes), { source_url: media.source_url, width: details.width }]
    .filter((s) => s?.source_url && s.width && !seen.has(s.width) && seen.add(s.width))
    // Only same-ratio sizes (skip square thumbnails / crops).
    .filter((s) => !details.height || !s.height || Math.abs(s.width / s.height - details.width / details.height) < 0.05)
    .sort((a, b) => a.width - b.width)
    .map((s) => `${s.source_url} ${s.width}w`);
  return entries.length > 1 ? entries.join(", ") : undefined;
}

const IMG_TAG = /<img\b[^>]*?\ssrc="([^"]+)"[^>]*>/gi;

function imageFromTag(tag, fallbackAlt) {
  const src = tag.match(/\ssrc="([^"]+)"/i)[1];
  const width = Number(tag.match(/\swidth="(\d+)"/i)?.[1]) || 1200;
  const height = Number(tag.match(/\sheight="(\d+)"/i)?.[1]) || 800;
  const alt = decodeEntities(tag.match(/\salt="([^"]*)"/i)?.[1] || "") || fallbackAlt;
  return { src, width, height, alt };
}

async function getAttachedImage(postId, alt) {
  // Retried: a transient failure here would otherwise leave the post with
  // the placeholder cover until the next build.
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const { status, data } = await getJson("/wp/v2/media", {
        parent: postId,
        media_type: "image",
        orderby: "id",
        order: "desc",
        per_page: 5,
        _fields: "source_url,alt_text,media_details",
      });
      if (status >= 500 || status === 429) continue;
      if (status !== 200 || !Array.isArray(data)) return [];
      return data.map((m) => ({
        src: m.source_url,
        width: m.media_details?.width || 1200,
        height: m.media_details?.height || 800,
        alt: decodeEntities(m.alt_text || "") || alt,
        srcSet: buildSrcSet(m),
      }));
    } catch {
      // retry
    }
  }
  return [];
}

// Removes images that no longer load from the article body, and gives every
// post a working featured image: WordPress featured image → Rank Math
// og:image → image attached to the post → first image in the article.
async function repairImages(posts, previous) {
  for (const post of posts) post.contentHtml = rewriteDeadCdn(post.contentHtml);

  const contentSrcs = new Set();
  for (const post of posts) for (const m of post.contentHtml.matchAll(IMG_TAG)) contentSrcs.add(m[1]);
  await mapLimit([...contentSrcs], 8, urlExists);

  let removed = 0;
  for (const post of posts) {
    const checks = await Promise.all([...post.contentHtml.matchAll(IMG_TAG)].map((m) => urlExists(m[1])));
    let i = 0;
    post.contentHtml = post.contentHtml
      .replace(IMG_TAG, (tag) => {
        if (checks[i++]) return tag;
        removed++;
        return "";
      })
      // Tidy wrappers the removed image leaves behind.
      .replace(/<a\b[^>]*>\s*<\/a>/gi, "")
      .replace(/<figure\b[^>]*>\s*(<figcaption[\s\S]*?<\/figcaption>)?\s*<\/figure>/gi, "");
  }

  let recovered = 0;
  const stillMissing = [];
  await mapLimit(posts, 6, async (post) => {
    if (post.featuredImage && (await urlExists(post.featuredImage.src))) return;

    const candidates = [];
    if (post.seo?.ogImage) {
      candidates.push({ src: post.seo.ogImage, width: 1200, height: 630, alt: post.seo.ogImageAlt || post.title });
    }
    candidates.push(...(await getAttachedImage(post.id, post.title)));
    for (const m of post.contentHtml.matchAll(IMG_TAG)) candidates.push(imageFromTag(m[0], post.title));

    for (const candidate of candidates) {
      if (await urlExists(candidate.src)) {
        post.featuredImage = { ...candidate, recovered: true };
        recovered++;
        return;
      }
    }
    // Nothing reachable this run — keep the image from the last snapshot
    // rather than dropping to the placeholder over a network hiccup.
    const prevImage = previous.get(post.slug)?.featuredImage;
    if (prevImage) {
      post.featuredImage = prevImage;
      return;
    }
    post.featuredImage = null;
    stillMissing.push(post.slug);
  });

  console.log(
    `▶ [blog] Images: checked ${urlStatusCache.size}, removed ${removed} broken from articles, recovered ${recovered} featured image(s).`
  );
  if (stillMissing.length) {
    console.warn(
      `⚠ [blog] No usable image for ${stillMissing.length} post(s) — set a Featured Image in WordPress:\n           ${stillMissing.join("\n           ")}`
    );
  }
}

function readPreviousSnapshot() {
  try {
    const data = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
    return new Map((data.posts || []).map((p) => [p.slug, p]));
  } catch {
    return new Map();
  }
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i], i);
      }
    })
  );
  return results;
}

/* -------------------------------- main -------------------------------- */

async function fetchAllPosts() {
  const posts = [];
  for (let page = 1; page < 100; page++) {
    const { status, data } = await getJson("/wp/v2/posts", {
      per_page: 100,
      page,
      status: "publish",
      orderby: "date",
      order: "desc",
      _embed: "author,wp:featuredmedia,wp:term",
    });
    if (status === 400 && data?.code === "rest_post_invalid_page_number") break;
    if (status !== 200 || !Array.isArray(data)) {
      throw new Error(`WordPress returned ${status} for posts page ${page}: ${JSON.stringify(data).slice(0, 200)}`);
    }
    posts.push(...data);
    if (data.length < 100) break;
  }
  return posts;
}

function normalizePost(raw) {
  const embedded = raw._embedded || {};
  const media = embedded["wp:featuredmedia"]?.[0];
  const terms = embedded["wp:term"] || [];
  const categories = (terms[0] || []).map((t) => ({ name: decodeEntities(t.name), slug: t.slug }));
  const tags = (terms[1] || []).map((t) => ({ name: decodeEntities(t.name), slug: t.slug }));
  const primaryCategory = categories.find((c) => c.slug !== "uncategorized") || categories[0] || null;

  const { html, toc } = processContent(raw.content?.rendered);
  const plain = stripTags(html);
  const wordCount = plain ? plain.split(" ").length : 0;
  const title = decodeEntities(stripTags(raw.title?.rendered || "")) || raw.slug;
  const excerpt = truncate(stripTags(raw.excerpt?.rendered || "").replace(/\s*\[…\]\s*$/, "") || plain, 220);

  return {
    id: raw.id,
    slug: raw.slug,
    wpLink: raw.link,
    title,
    excerpt,
    contentHtml: html,
    toc,
    date: `${raw.date_gmt}Z`,
    modified: `${raw.modified_gmt}Z`,
    author: embedded.author?.[0]?.name || "Emsphere Team",
    categories,
    tags,
    primaryCategory,
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / 220)),
    featuredImage:
      media?.source_url && !media.code
        ? {
            src: media.source_url,
            width: media.media_details?.width || 1200,
            height: media.media_details?.height || 800,
            alt: decodeEntities(media.alt_text || "") || title,
            srcSet: buildSrcSet(media),
          }
        : null,
    sticky: Boolean(raw.sticky),
  };
}

async function main() {
  console.log(`▶ [blog] Connecting to ${WORDPRESS_URL} …`);
  const index = await detectApi();
  console.log(`  REST API: ${apiUrl("/")}`);

  const previous = readPreviousSnapshot();
  const rawPosts = await fetchAllPosts();

  // Probe Rank Math's headless route with a real post rather than trusting
  // the API index, which hosts sometimes serve from cache.
  headlessApiAvailable = true;
  headlessApiAvailable = Boolean(rawPosts[0] && (await fetchRankMath(rawPosts[0].link))?.source === "rankmath-api");
  if (!headlessApiAvailable) {
    console.warn(
      "\n⚠ [blog] Rank Math's headless API is OFF, so Rank Math titles/descriptions cannot be read.\n" +
        "         Enable it: WordPress → Rank Math → General Settings → Others → Headless CMS Support → Save.\n"
    );
  }

  const posts = rawPosts
    .map(normalizePost)
    // "page" would collide with the /blog/page/N pagination routes.
    .filter((p) => p.slug && p.slug !== "page");

  console.log(`▶ [blog] ${posts.length} posts — loading Rank Math SEO data …`);
  const seoList = await mapLimit(posts, 6, (p) => fetchRankMath(p.wpLink));
  posts.forEach((p, i) => {
    // Keep the last known Rank Math data rather than silently dropping to
    // plain WordPress fields when Rank Math is temporarily unreachable.
    const prev = previous.get(p.slug)?.seo;
    p.seo = seoList[i] || (prev ? { ...prev, source: `${prev.source} (cached)` } : null);
  });

  await repairImages(posts, previous);

  // The WordPress home's Rank Math data titles /blog/ — only when it is
  // actually filled in (a bare "blog -" with no description is ignored).
  let blogIndexSeo = (await fetchRankMath(`${WORDPRESS_URL}/`)) || null;
  if (!blogIndexSeo?.description || (blogIndexSeo.title || "").replace(/[\s\-–—|·•»:]/g, "").length < 8) {
    blogIndexSeo = null;
  }

  // Rank Math's default title template is "%title% %sep% %sitename%". If the
  // WordPress Site Title is still the generic "blog", swap that suffix for the
  // brand so search results never show "… - blog".
  const siteName = decodeEntities(index.name || "").trim();
  if (/^blog$/i.test(siteName)) {
    const suffix = new RegExp(`(\\s[-–—|·•»:]\\s)${siteName}$`, "i");
    let fixed = 0;
    for (const seo of [...posts.map((p) => p.seo), blogIndexSeo]) {
      if (!seo) continue;
      for (const key of ["title", "ogTitle", "twitterTitle"]) {
        if (seo[key] && suffix.test(seo[key])) {
          seo[key] = seo[key].replace(suffix, `$1${BRAND_NAME}`);
          fixed++;
        }
      }
    }
    console.warn(
      `⚠ [blog] WordPress Site Title is "${siteName}" — replaced "${siteName}" with "${BRAND_NAME}" in ${fixed} Rank Math title(s).\n` +
        `         Fix it at the source: WordPress → Settings → General → Site Title → "${BRAND_NAME}".`
    );
  }

  const bySource = posts.reduce((acc, p) => {
    const key = p.seo?.source || "wordpress-fields (no Rank Math data)";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const missing = posts.filter((p) => !p.seo).map((p) => p.slug);

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(
    OUT_FILE,
    JSON.stringify({ generatedAt: new Date().toISOString(), source: WORDPRESS_URL, blogIndexSeo, posts }, null, 0)
  );

  console.log(`✔ [blog] Saved ${posts.length} posts to data/blog-posts.json`);
  console.log(`  SEO source: ${Object.entries(bySource).map(([k, v]) => `${k}: ${v}`).join(", ")}`);
  if (missing.length) {
    console.warn(`⚠ [blog] No Rank Math data for ${missing.length} post(s): ${missing.slice(0, 5).join(", ")}${missing.length > 5 ? " …" : ""}`);
  }
}

main().catch((err) => {
  const hasSnapshot = fs.existsSync(OUT_FILE);
  console.error(`✖ [blog] Could not fetch posts from WordPress: ${err.message}`);

  if (hasSnapshot) {
    console.warn("⚠ [blog] Building with the previous data/blog-posts.json snapshot.");
    return;
  }
  if (ALLOW_EMPTY) {
    fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
    fs.writeFileSync(OUT_FILE, JSON.stringify({ generatedAt: null, blogIndexSeo: null, posts: [] }));
    console.warn("⚠ [blog] Wrote an empty snapshot so the dev server can start.");
    return;
  }
  // Never ship a build where every blog URL disappears.
  process.exit(1);
});
