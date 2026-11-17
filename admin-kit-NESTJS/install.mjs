#!/usr/bin/env node
// Admin Kit installer. Copies admin-kit/files into another Next.js project,
// rebrands it, checks dependencies, and prints the remaining manual steps.
//
//   node admin-kit/install.mjs --target ../my-site --name "Acme" --domain acme.com \
//        [--site-url https://www.acme.com] [--logo /acme-logo.png] \
//        [--no-leads] [--no-reference] [--force] [--dry-run]
//
// It never overwrites an existing file unless --force is passed, and it
// never edits next.config.ts / app/layout.tsx / .env (those are merged by
// hand or by your AI agent, see AI-INSTALL-GUIDE.md section 4).
import { readdirSync, statSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, "files");

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};

const target = opt("target");
const name = opt("name");
const domain = opt("domain");
const siteUrl = (opt("site-url") || (domain ? `https://${domain}` : "")).replace(/\/$/, "");
const logoArg = opt("logo");
const logo = logoArg || "/admin-logo.svg";
if (!target || !name || !domain) {
  console.error(
    'Usage: node admin-kit/install.mjs --target <project dir> --name "Site Name" --domain example.com [--site-url https://www.example.com] [--logo /logo.png] [--no-leads] [--no-reference] [--force] [--dry-run]',
  );
  process.exit(1);
}
const dest = resolve(target);
if (!existsSync(join(dest, "package.json"))) {
  console.error(`No package.json in ${dest}. Is --target a Next.js project root?`);
  process.exit(1);
}
const dry = flag("dry-run");
const force = flag("force");

// Text replaced inside the copied files. Order matters (longest/most specific first).
const replacements = [
  ["https://www.winsquare.in", siteUrl],
  ["dhiraj@winsquare.in", `info@${domain}`],
  ["winsquare\\.in", domain.replace(/\./g, "\\.")], // the regex literal in RichTextEditor
  ["winsquare.in", domain],
  ["/images/logo.png", logo],
  ["database/winsquare_admin.sql", "database/mysql.sql (MySQL) or database/postgres.sql (Postgres)"],
  ['|| "WS"', `|| "${name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "AD"}"`],
  ["Winsquare", name],
];
const textExt = new Set([".ts", ".tsx", ".mts", ".mjs", ".css", ".sql", ".md", ".txt"]);

// Files that belong to the optional Leads feature.
const leadsPaths = ["app/admin/(panel)/leads", "app/admin/_actions/leads.ts", "app/api/enquiry"];
const skipLeads = flag("no-leads");
const skipRef = flag("no-reference");

const copied = [];
const skipped = [];
function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else place(p);
  }
}
function place(p) {
  const rel = relative(SRC, p).split("\\").join("/");
  if (rel.startsWith("snippets/")) return; // handled separately
  if (skipRef && rel.startsWith("reference/")) return;
  if (skipLeads && leadsPaths.some((l) => rel.startsWith(l))) return;
  // Reference files land in <target>/admin-kit-reference/ so they never collide.
  // (They are examples to adapt, not drop-ins. "slug" stands for the [slug] folder.)
  const outRel = rel.startsWith("reference/") ? "admin-kit-reference/" + rel.slice("reference/".length) : rel;
  const out = join(dest, outRel);
  if (existsSync(out) && !force) {
    skipped.push(outRel);
    return;
  }
  copied.push(outRel);
  if (dry) return;
  mkdirSync(dirname(out), { recursive: true });
  if (textExt.has(extname(p))) {
    let t = readFileSync(p, "utf8");
    for (const [a, b] of replacements) t = t.split(a).join(b);
    writeFileSync(out, t);
  } else copyFileSync(p, out);
}
walk(SRC);

// Placeholder logo (text SVG) only when the caller did not point at their own.
if (!logoArg && !dry) {
  const lp = join(dest, "public", "admin-logo.svg");
  if (!existsSync(lp)) {
    mkdirSync(dirname(lp), { recursive: true });
    const esc = name.replace(/[<>&"]/g, "");
    writeFileSync(
      lp,
      `<svg xmlns="http://www.w3.org/2000/svg" width="247" height="85" viewBox="0 0 247 85"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#7a7a8c">${esc}</text></svg>\n`,
    );
  }
}

// Copy the env template next to the project (never overwrites).
if (!dry) {
  const ex = join(dest, ".env.example");
  const snip = join(SRC, "snippets", "env.example.txt");
  if (!existsSync(ex) && existsSync(snip)) copyFileSync(snip, ex);
}

// Which dependencies still need installing?
const pkg = JSON.parse(readFileSync(join(dest, "package.json"), "utf8"));
const have = { ...pkg.dependencies, ...pkg.devDependencies };
const needDeps = ["mysql2", "pg", "@tiptap/react", "@tiptap/pm", "@tiptap/starter-kit", "@tiptap/extension-image", "@tiptap/extension-text-style", "sanitize-html", "server-only"].filter((d) => !have[d]);
const needDev = ["@types/pg", "@types/sanitize-html"].filter((d) => !have[d]);

if (skipLeads) console.log("Leads feature skipped. Remove the Leads nav link in app/admin/(panel)/NavLinks.tsx and the leads queries in app/admin/(panel)/page.tsx.");
console.log(`\n${dry ? "[dry run] would copy" : "Copied"} ${copied.length} files into ${dest}`);
if (skipped.length) console.log(`Skipped ${skipped.length} existing files (use --force to overwrite, or merge by hand):\n  ` + skipped.join("\n  "));
console.log("\nStill to do (see AI-INSTALL-GUIDE.md section 4):");
if (needDeps.length) console.log(`  npm i ${needDeps.join(" ")}`);
if (needDev.length) console.log(`  npm i -D ${needDev.join(" ")}`);
console.log("  - next.config.ts: bodySizeLimit, admin headers, serverExternalPackages, cacheComponents (section 4.2)");
console.log("  - app/layout.tsx: wrap public header/footer in <SiteOnly> (section 4.3)");
console.log("  - set DB env vars, run the SQL file for your database, create the first admin (README steps 1-5)");
