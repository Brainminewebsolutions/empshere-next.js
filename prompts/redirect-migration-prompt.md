# Universal Old Site to New Site Redirect Migration Prompt

Works with any project and any agent: Claude Code, Antigravity IDE, Antigravity Agent Manager, Cursor, Codex, Windsurf and others. Not tied to one framework, host or website.

## How to use (3 steps)

1. Copy this file and `redirect-old-to-new-for-ranking.csv` into the root of the new project.
2. Put your Screaming Frog export(s) of the OLD site in the same folder. Optional but recommended: a Google Search Console export and a backlinks export.
3. Paste everything between BEGIN PROMPT and END PROMPT into the agent. Fill in only the INPUTS block. Leave a line as `auto` and the agent will try to find it itself.

## Files to have ready

| File | Required | Source |
|------|----------|--------|
| Old site crawl CSV (Screaming Frog > Internal > All > Export) | Yes | Crawl the OLD live site before cutover |
| Old site URL and new site URL | Yes | Write in INPUTS |
| New site sitemap or a running staging or local URL | Yes | `/sitemap.xml`, staging link, or run the app locally |
| `redirect-old-to-new-for-ranking.csv` (mapping sheet) | Optional | Template included. Pre-fill rows you already decided. |
| Search Console export (clicks, impressions per page) | Recommended | GSC > Performance > Pages > Export |
| Backlinks export (Ahrefs, Semrush, Moz, GSC Links) | Recommended | Shows which old URLs have external links |
| Existing redirect rules (`.htaccess`, `vercel.json`, `_redirects`, config file) | If any | Already in repo or old server |

---

## BEGIN PROMPT

You are an SEO migration engineer. Task: create every redirect needed so each old URL that has search value lands on the single best matching new page, in one hop, with a permanent redirect. Work in whatever project this is. Do not assume the framework, host or domain: detect them. Do not guess. Verify every claim by reading files, reading docs, or running commands.

### 1. INPUTS (the user fills this block, `auto` means find it yourself)

```
OLD_SITE_URL:          auto | https://www.old-example.com
NEW_SITE_PROD_URL:     auto | https://www.new-example.com
NEW_SITE_STAGING_URL:  auto | https://staging.new-example.com | http://localhost:3000
DOMAIN_CHANGING:       auto | yes | no
TRAILING_SLASH_POLICY: auto | with | without
OLD_CRAWL_CSV_FILES:   auto | ./crawl1.csv, ./crawl2.csv
GSC_EXPORT_CSV:        auto | none | ./gsc-pages.csv
BACKLINKS_CSV:         auto | none | ./backlinks.csv
MAPPING_CSV:           ./redirect-old-to-new-for-ranking.csv
EXISTING_REDIRECTS:    auto | none | ./path/to/file
NOTES:                 (anything special, for example "keep /pricing exactly", "blog moved to /resources")
```

How to resolve `auto`:
- Crawl CSVs: search the project root and subfolders (skip `node_modules`, `.git`, build folders) for CSVs whose header contains `"Address"` and `"Status Code"`. Skip files over 100KB only if they are not crawl exports. List what you found and which you will use.
- Old site URL: take the most common host in the `Address` column.
- New site URL: read the framework config, env files, sitemap code or `README`.
- Domain changing: compare old host and new host. If you cannot tell, ask.
- Trailing slash: read the framework or host config, then compare with how the old site's URLs end. State which you chose and why.
- If a required value cannot be found, ask me one short question for all missing values together, then continue.

### 2. PRE-FLIGHT (report this before changing anything)

1. Read project instruction files first: `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `.cursorrules`, `.cursor/rules`, `README`, `CONTRIBUTING`. Follow them. If they warn that the framework has breaking changes or point to bundled docs (for example `node_modules/<framework>/docs/`), read those docs before writing code.
2. Detect the stack from `package.json`, `composer.json`, `requirements.txt`, `Gemfile`, `go.mod`, config files and lockfiles. State the framework, its version, the package manager and the hosting target (Vercel, Netlify, Cloudflare, Apache, Nginx, other).
3. Decide where redirects belong for that stack. Typical places, which you must confirm in the real docs or project before use: framework config redirects, host config file (`vercel.json`, `netlify.toml`, `_redirects`, `wrangler` or Cloudflare bulk redirects), web server config (`.htaccess`, nginx `conf`), or a framework-native middleware or router. Read the official or bundled docs for exact syntax, status codes, wildcard support and the maximum rule count. Do not rely on memory for option names or limits.
4. Read any existing redirect rules. Keep valid ones. List them.
5. Read the mapping CSV. Rows with `reviewed = yes` are final and must not be changed.
6. Run `git status` if the project is a git repo. Do not touch unrelated files.

### 3. INGEST THE OLD SITE DATA

1. Read each crawl CSV with a real CSV parser (titles contain commas). Handle a UTF-8 BOM on the first header.
2. Use these columns when present: `Address`, `Content Type`, `Status Code`, `Indexability`, `Indexability Status`, `Title 1`, `H1-1`, `Canonical Link Element 1`, `Meta Robots 1`, `Redirect URL`, `Redirect Type`, `Inlinks`, `Unique Inlinks`, `Word Count`. If the file comes from another crawler, map the equivalent columns and say so.
3. Merge multiple files and de-duplicate by normalised URL.
4. Normalise: lowercase host, strip fragment, keep path case as crawled, record the query string separately. Use path-only sources when the domain is not changing.
5. Split into groups and report counts:
   - A. Indexable HTML pages with status 200 (highest value)
   - B. HTML pages with 3xx (old redirects, flatten them)
   - C. 404 or 410 pages that have inlinks, backlinks or search clicks (recover if a close match exists)
   - D. Non-indexable pages (noindex, or canonical points elsewhere). Redirect to the canonical target.
   - E. Assets (images, css, js, pdf, fonts, upload folders)
   - F. Platform URLs (feeds, API paths, admin, login, search `?s=`, pagination, attachments, tag, category, author and date archives, comment parameters)
6. If Search Console or backlink files exist, join them by URL and set priority: HIGH (any clicks, or any referring domain), MEDIUM (impressions only, or 3+ inlinks), LOW (the rest).

### 4. BUILD THE NEW SITE INVENTORY

1. Collect every live path on the new site from the sitemap, the route files, and requests to the staging or local URL. For dynamic content (blog, products, docs), read the data source, not only the sitemap.
2. For each new URL record: status, indexable or not (meta robots and `X-Robots-Tag`), canonical URL, title, H1.
3. Only URLs that return 200, are indexable and are self-canonical are valid destinations.
4. If the new site cannot be run or reached, say so and ask me for a staging URL. Do not mark destinations as verified without checking.

### 5. MATCH OLD TO NEW (strict order)

1. **Same path exists on the new site:** no redirect. Record `keep-same-url`. If only trailing slash or case differs, rely on the slash setting and say so.
2. **Renamed or merged page:** match by slug similarity, then H1 and title, then topic. Redirect to the one best page.
3. **Article or product:** match by slug, then title, using the real data source.
4. **Archive or platform URL with no equivalent:** one wildcard rule per pattern to the closest hub page (for example the blog index). Never one rule per archive URL.
5. **Content removed with no close topical match:** do NOT redirect to the homepage. Leave as 404, or 410 only if I say so. Record `no-equivalent` with the reason.
6. **Old redirect chains:** point the old source straight at the final new destination.

Never invent a destination. Every `new_url` must exist in the inventory and return 200. Give each row a confidence: `exact`, `high`, `medium`, `low`. `low` rows are flagged for my review and are NOT added to the live redirect rules until I approve.

### 6. REDIRECT RULES (non-negotiable)

1. One hop only. No chains (A to B to C). No loops. Never redirect to a URL that itself redirects.
2. Permanent redirects only. Name the exact status the stack emits (301, 308 or other) after checking the docs. Google treats both 301 and 308 as permanent.
3. A source must not be a live 200 page on the new site.
4. No catch-all redirect to the homepage. No global `/(.*)` to `/`.
5. Keep tracking parameters (`gclid`, `utm_*`, `fbclid`) when the host supports it. Drop junk parameters (`?replytocom`, `?s=`, `?p=`).
6. Follow TRAILING_SLASH_POLICY. Both slash forms of an old URL must resolve in a single hop to the same destination.
7. `http` to `https` and `www` to non-`www` (or the reverse) belong at the host or domain level, not in the list. Check they are configured and report.
8. If DOMAIN_CHANGING is yes, rules map path to full absolute URL on the new domain. If no, path to path.
9. Assets: map image or file URLs only if they have backlinks or image-search traffic. Otherwise report and skip. Do not add thousands of per-file rules without approval.
10. Respect the host's rule limit. If exceeded, use wildcards, a data-driven lookup, or the host's bulk redirect feature, and explain the choice.
11. Specific rules come before wildcard rules.
12. Keep all rules in one dedicated file or module, imported by the framework or host config, with a short header comment explaining the format.

### 7. OUTPUT FILES (create or update)

1. **Mapping sheet** at MAPPING_CSV with exactly these columns:
   `old_url,new_url,status_code,match_type,confidence,reason,old_status,old_indexable,gsc_clicks,gsc_impressions,referring_domains,inlinks,priority,reviewed`
   - `match_type` values: keep-same-url, exact-slug, renamed, merged, content-item, archive-wildcard, canonical-target, no-equivalent
   - Every old URL from groups A to D appears once, including `keep-same-url` and `no-equivalent`, so completeness can be audited.
   - Sort by priority HIGH first, then clicks descending.
2. **Redirect rules file** in the stack's native format, generated from `exact` and `high` rows (and `medium` rows only if no review is needed). Reuse and extend the existing file if there is one.
3. **Verification script** in the project's own language (for example `scripts/redirects-check.*`) that:
   - reads the mapping sheet
   - requests each old URL on a base URL passed as an argument, without following redirects
   - passes only if there is exactly one permanent redirect, `Location` equals the intended new URL, and the destination answers 200 with no further redirect
   - prints a table and exits non-zero on any failure
   - also reports chains, loops and 5xx
4. **Migration report** `redirect-migration-report.md`: counts per group, rules added, rules skipped and why, low-confidence rows needing my decision, URLs left as 404 on purpose, assets skipped, host and slash settings found, risks.

### 8. VERIFY (actually run these)

1. Start the new site locally or use the staging URL.
2. Run the verification script and show the output. Fix every failure.
3. Spot check at least 10 HIGH priority redirects with `curl -sI` and show status and `Location`.
4. Confirm destinations are indexable, self-canonical and in the sitemap.
5. Confirm no sitemap URL is itself a redirect source.
6. Run the project's build and lint if they exist. Report results honestly, with output if anything fails.

### 9. RULES FOR YOU

- Do not commit, push, deploy or change DNS. Stop after verification and ask.
- Never delete or overwrite the crawl CSVs, or mapping rows marked `reviewed = yes`.
- Never redirect to a page you have not verified returns 200.
- Never put secrets, private emails or personal data in files or outside requests.
- Do not state versions, flags, status codes, package names or APIs you have not verified in code or docs.
- Keep output concise. No filler, no emojis, no em-dashes.

### 10. FINAL MESSAGE FORMAT

Reply with: stack and host found, what was changed (file list), verification result as pass and fail counts, the low-confidence and unmatched URLs that need my decision, and the exact next steps for launch day (deploy, re-run the check script against production, submit the new sitemap in Search Console, use Change of Address if the domain changed).

## END PROMPT

---

## Launch day checklist (for you, not the agent)

1. Deploy the new site with redirects live on the old domain or host.
2. Run the verification script against production. Zero failures expected.
3. Submit the new sitemap in Google Search Console. If the domain changed, use Change of Address.
4. Re-crawl the old URL list in Screaming Frog List Mode. Every HIGH priority URL should show one permanent redirect to a 200.
5. Watch the Search Console Pages report and Crawl Stats for 404 spikes for 2 weeks.
6. Keep redirects for at least 12 months.
