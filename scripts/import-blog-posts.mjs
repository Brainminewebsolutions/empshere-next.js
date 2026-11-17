#!/usr/bin/env node
// One-time (re-runnable) import of the WordPress blog snapshot
// (data/blog-posts.json) into the admin database, so every article, its
// meta title / description, social tags, keywords and schema are editable in
// /admin -> Blogs.
//
//   node --env-file=.env.local scripts/import-blog-posts.mjs [--dry-run] [--overwrite]
//
// Also (unless --no-media / --no-schema):
//   - downloads every image the posts use (featured, social, in-article and the
//     ones inside the schema) into the media table, so the site keeps working
//     when the old WordPress host goes away. Images are served from /media/<id>.
//   - reads each post's live page and copies its JSON-LD schema (Rank Math)
//     into the post's "Custom schema" block, editable in /admin.
//   - with --prune, removes posts that are no longer in the snapshot.
//
// Without --overwrite, posts whose slug already exists are skipped, so edits
// made in the admin are never lost. With --overwrite they are replaced.
import { randomUUID } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import mysql from "mysql2/promise";
import sharp from "sharp";

const execFileAsync = promisify(execFile);
const SITE = "https://www.emsphere.com";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";
const noMedia = process.argv.includes("--no-media");
const noSchema = process.argv.includes("--no-schema");
const prune = process.argv.includes("--prune");
const MAP_FILE = new URL("./.media-map.json", import.meta.url);

const dryRun = process.argv.includes("--dry-run");
const overwrite = process.argv.includes("--overwrite");

const snapshot = JSON.parse(readFileSync(new URL("../data/blog-posts.json", import.meta.url), "utf8"));
const posts = snapshot.posts;

const decode = (t) =>
  t
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#x2019;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const text = (html) => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

// The posts print their FAQ as "Q1: question" (bold) followed by the answer
// paragraphs. Turn those into the FAQ list so the FAQPage schema matches what
// readers see on the page.
function extractFaqs(html) {
  const re = /<p[^>]*>\s*<strong>\s*Q\s*\d+\s*[:.)-]\s*([\s\S]*?)<\/strong>\s*<\/p>/gi;
  const hits = [];
  let m;
  while ((m = re.exec(html))) hits.push({ question: text(m[1]), start: m.index, end: re.lastIndex });
  const faqs = [];
  hits.forEach((hit, i) => {
    const stop = i + 1 < hits.length ? hits[i + 1].start : html.length;
    const chunk = html.slice(hit.end, stop);
    // Answer = the paragraphs up to the next heading or bold-only paragraph.
    const paras = [...chunk.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((p) => p[1])
      .filter((p) => !/^\s*<strong>[\s\S]*<\/strong>\s*$/i.test(p));
    const firstBlock = chunk.search(/<h[1-6][\s>]/i);
    const scoped = firstBlock >= 0 ? chunk.slice(0, firstBlock) : chunk;
    const answerParas = [...scoped.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((p) => p[1])
      .filter((p) => !/^\s*<strong>[\s\S]*<\/strong>\s*$/i.test(p));
    const answer = text((answerParas.length ? answerParas : paras).slice(0, 3).join(" "));
    if (hit.question && answer) faqs.push({ question: hit.question.slice(0, 300), answer: answer.slice(0, 3000) });
  });
  return faqs.slice(0, 30);
}

const sqlDate = (iso) => new Date(iso).toISOString().slice(0, 19).replace("T", " ");

function toRow(p) {
  const seo = p.seo || {};
  const faqs = extractFaqs(p.contentHtml);
  const keywords = (seo.keywords || []).join(", ");
  const featured = p.featuredImage;
  return {
    title: p.title.slice(0, 200),
    slug: p.slug,
    excerpt: (p.excerpt || "").slice(0, 500),
    content_html: p.contentHtml,
    author_name: /^(admin|administrator|)$/i.test((p.author || "").trim()) ? "Emsphere" : p.author,
    featured_image_url: featured?.src || null,
    featured_image_alt: (featured?.alt || "").slice(0, 300),
    featured_image_width: featured?.width || null,
    featured_image_height: featured?.height || null,
    featured_image_srcset: featured?.srcSet || "",
    categories: JSON.stringify(p.categories || []),
    tags: JSON.stringify(p.tags || []),
    word_count: p.wordCount || 0,
    published_at: sqlDate(p.date),
    focus_keyphrase: (seo.keywords?.[0] || "").slice(0, 100),
    meta_title: (seo.title || "").slice(0, 120),
    meta_description: (seo.description || "").slice(0, 320),
    meta_keywords: keywords.slice(0, 300),
    canonical_url: "",
    noindex: seo.index === false ? 1 : 0,
    og_title: (seo.ogTitle || "").slice(0, 120),
    og_description: (seo.ogDescription || "").slice(0, 320),
    og_image_url: seo.ogImage && seo.ogImage !== featured?.src ? seo.ogImage.slice(0, 500) : null,
    faqs: JSON.stringify(faqs),
    auto_article_schema: 1,
    auto_faq_schema: 1,
    custom_schemas: "[]",
    created_at: sqlDate(p.date),
    updated_at: sqlDate(p.modified || p.date),
  };
}

const rows = posts.map(toRow);
const withFaq = rows.filter((r) => JSON.parse(r.faqs).length > 0).length;
console.log(`${rows.length} posts in the snapshot; FAQ blocks found in ${withFaq}.`);
if (dryRun) {
  console.log("[dry run] nothing written.");
  process.exit(0);
}

for (const name of ["DB_NAME", "DB_USER", "DB_PASSWORD"]) {
  if (!process.env[name]) throw new Error(`Missing environment variable ${name} (run with --env-file=.env.local)`);
}
const conn = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  charset: "utf8mb4",
  connectTimeout: 15000,
});
// Large post bodies in one statement
await conn.query("SET SESSION max_allowed_packet = 67108864").catch(() => {});

/* ------------------------- images + schema ------------------------- */

const mediaMap = existsSync(MAP_FILE) ? JSON.parse(readFileSync(MAP_FILE, "utf8")) : {};
const IMG_RE = /^https?:\/\/[^\s"]+\.(png|jpe?g|webp|gif|avif)(\?[^\s"]*)?$/i;
const MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif", avif: "image/avif" };

async function httpGet(url, asBuffer) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(60000) });
    if (res.ok) return asBuffer ? Buffer.from(await res.arrayBuffer()) : await res.text();
    if (![403, 429, 503].includes(res.status)) return null;
  } catch {
    // fall through to curl
  }
  try {
    const { stdout } = await execFileAsync("curl", ["-sSfL", "--compressed", "-m", "90", "-A", UA, url], {
      encoding: "buffer",
      maxBuffer: 64 * 1024 * 1024,
      windowsHide: true,
    });
    return asBuffer ? stdout : stdout.toString("utf8");
  } catch {
    return null;
  }
}

// Downloads an image once and returns its absolute site URL (/media/<id>), or null.
async function storeImage(url) {
  if (noMedia || !url || !IMG_RE.test(url)) return null;
  const cached = mediaMap[url];
  if (cached) {
    const [r] = await conn.query("SELECT id FROM media WHERE id = ?", [cached]);
    if (r.length) return `${SITE}/media/${cached}/`;
  }
  let data = await httpGet(url, true);
  if (!data || data.length < 100) return null;
  let mime = MIME[url.split("?")[0].split(".").pop().toLowerCase()] || "image/jpeg";
  if (data.length > 4 * 1024 * 1024) {
    data = await sharp(data).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
    mime = "image/webp";
  }
  const [res] = await conn.query("INSERT INTO media (mime, size, data, created_at) VALUES (?, ?, ?, ?)", [mime, data.length, data, new Date()]);
  mediaMap[url] = res.insertId;
  writeFileSync(MAP_FILE, JSON.stringify(mediaMap));
  return `${SITE}/media/${res.insertId}/`;
}

const relMedia = (abs) => (abs ? abs.replace(SITE, "") : abs);

function collectImageUrls(value, out) {
  if (typeof value === "string") {
    if (IMG_RE.test(value)) out.add(value);
  } else if (Array.isArray(value)) value.forEach((v) => collectImageUrls(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => collectImageUrls(v, out));
}
function replaceStrings(value, map) {
  if (typeof value === "string") return map.get(value) || value;
  if (Array.isArray(value)) return value.map((v) => replaceStrings(v, map));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, replaceStrings(v, map)]));
  return value;
}

// The post page's own JSON-LD (Rank Math), merged into one @graph.
async function fetchSchema(post) {
  const html = await httpGet(post.wpLink, false);
  if (!html) return null;
  const nodes = [];
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const j = JSON.parse(m[1]);
      for (const item of Array.isArray(j) ? j : [j]) {
        if (Array.isArray(item["@graph"])) nodes.push(...item["@graph"]);
        else if (item["@type"]) {
          const { ["@context"]: _ctx, ...rest } = item;
          nodes.push(rest);
        }
      }
    } catch {
      // ignore a malformed block
    }
  }
  return nodes.length ? { "@context": "https://schema.org", "@graph": nodes } : null;
}

async function enrich(post, row) {
  // images used by the post
  const urls = new Set();
  if (post.featuredImage?.src) urls.add(post.featuredImage.src);
  if (post.seo?.ogImage) urls.add(post.seo.ogImage);
  for (const m of post.contentHtml.matchAll(/<img\b[^>]*?\ssrc="([^"]+)"/gi)) urls.add(m[1]);

  const schema = noSchema ? null : await fetchSchema(post);
  if (schema) collectImageUrls(schema, urls);

  const swap = new Map();
  for (const u of urls) {
    const stored = await storeImage(u);
    if (stored) swap.set(u, stored);
  }

  if (swap.size) {
    const feat = swap.get(post.featuredImage?.src);
    if (feat) {
      row.featured_image_url = relMedia(feat);
      row.featured_image_srcset = "";
    }
    const og = swap.get(post.seo?.ogImage);
    row.og_image_url = og && og !== feat ? relMedia(og) : null;
    let html = row.content_html;
    for (const [from, to] of swap) {
      html = html.split(from).join(relMedia(to));
    }
    // Body images lose their WordPress size variants (srcset); the stored original is used.
    html = html.replace(/\s(srcset|sizes)="[^"]*"/gi, "");
    row.content_html = html;
  }
  if (schema) {
    const final = replaceStrings(schema, swap);
    let json = JSON.stringify(final, null, 2);
    if (json.length > 19500) json = JSON.stringify(final);
    row.custom_schemas = JSON.stringify([{ type: "Other", json }]);
    // The stored graph already holds the article, breadcrumb and FAQ nodes.
    row.auto_article_schema = 0;
    row.auto_faq_schema = 0;
  }
  return { images: swap.size, schema: Boolean(schema), missing: [...urls].filter((u) => !swap.has(u) && !noMedia) };
}

let imagesDone = 0;
let schemasDone = 0;
const problems = [];
const queue = posts.map((p, i) => [p, rows[i]]);
async function worker() {
  while (queue.length) {
    const [p, r] = queue.shift();
    const res = await enrich(p, r);
    imagesDone += res.images;
    if (res.schema) schemasDone++;
    else if (!noSchema) problems.push(`no schema found: ${p.slug}`);
    for (const m of res.missing) problems.push(`image not downloaded (${p.slug}): ${m}`);
  }
}
await Promise.all([worker(), worker(), worker()]);
console.log(`Images stored/linked: ${imagesDone}. Posts with schema: ${schemasDone}/${rows.length}.`);
if (problems.length) console.log(problems.slice(0, 30).join("\n"));

let inserted = 0;
let updated = 0;
let skipped = 0;
for (const r of rows) {
  const [found] = await conn.query("SELECT id FROM posts WHERE post_type = 'blog' AND slug = ? LIMIT 1", [r.slug]);
  if (found.length && !overwrite) {
    skipped++;
    continue;
  }
  const cols = Object.keys(r);
  if (found.length) {
    await conn.query(`UPDATE posts SET ${cols.map((c) => `\`${c}\` = ?`).join(", ")}, status = 'published' WHERE id = ?`, [
      ...cols.map((c) => r[c]),
      found[0].id,
    ]);
    updated++;
  } else {
    await conn.query(
      `INSERT INTO posts (id, post_type, status, ${cols.map((c) => `\`${c}\``).join(", ")}) VALUES (?, 'blog', 'published', ${cols.map(() => "?").join(", ")})`,
      [randomUUID(), ...cols.map((c) => r[c])],
    );
    inserted++;
  }
}
if (prune) {
  const keep = rows.map((r) => r.slug);
  const [stale] = await conn.query(
    `SELECT id, slug FROM posts WHERE post_type = 'blog' AND slug NOT IN (${keep.map(() => "?").join(",")})`,
    keep,
  );
  for (const row of stale) await conn.query("DELETE FROM posts WHERE id = ?", [row.id]);
  console.log(`Pruned ${stale.length} post(s) not in the snapshot: ${stale.map((x) => x.slug).join(", ")}`);
}
const [[{ n }]] = await conn.query("SELECT COUNT(*) AS n FROM posts WHERE status = 'published'");
console.log(`Inserted ${inserted}, updated ${updated}, skipped ${skipped}. Published posts in the database: ${n}.`);
await conn.end();
