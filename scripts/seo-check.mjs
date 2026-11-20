// Usage: node scripts/seo-check.mjs [baseUrl]   (default http://localhost:3000)
// For every URL in /sitemap.xml: 200, one canonical equal to the production URL, no noindex,
// one H1, title + description, valid JSON-LD.
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const PROD = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.emsphere.com").replace(/\/$/, "");

const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`${urls.length} sitemap URLs`);
let failed = 0;
const rows = [];
for (const url of urls) {
  const local = base + new URL(url).pathname;
  const res = await fetch(local, { redirect: "manual" });
  const html = await res.text();
  const problems = [];
  if (res.status !== 200) problems.push(`status ${res.status}`);
  const canon = [...html.matchAll(/<link[^>]+rel="canonical"[^>]*>/g)].map((m) => (m[0].match(/href="([^"]*)"/) || [])[1]);
  if (canon.length !== 1) problems.push(`${canon.length} canonicals`);
  else if (canon[0] !== url) problems.push(`canonical ${canon[0]}`);
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html) || /noindex/i.test(res.headers.get("x-robots-tag") || "")) problems.push("noindex");
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${h1} h1`);
  if (!/<title>[^<]+<\/title>/.test(html)) problems.push("no title");
  if (!/<meta[^>]+name="description"[^>]+content="[^"]+"/.test(html)) problems.push("no description");
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { problems.push("bad JSON-LD"); }
  }
  if (problems.length) failed++;
  rows.push({ url: local.replace(base, ""), result: problems.length ? "FAIL: " + problems.join(", ") : "pass" });
}
console.table(rows.filter((r) => r.result !== "pass"));
console.log(`${rows.length - failed}/${rows.length} pass (expected host ${PROD})`);
process.exit(failed ? 1 : 0);
