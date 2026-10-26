# emSphere Technical SEO Audit (Next.js static export, pre-migration)

Audited: 2026-10-23. Source dir plus built `out/` (151 HTML routes: 21 marketing, ~128 blog incl. pagination pages, 404/_not-found, one noindex alias). Live WordPress site was not re-crawled; migration data comes from `emsphere-audit/.missing.txt`. No source files were modified.

## Technical SEO score: 58 / 100

| Category | Status | Notes |
|---|---|---|
| Crawlability | PASS with issues | robots.txt open, sitemap matches built routes. But 39 live URLs will 404, and the 404 returns HTTP 200 (C2) |
| Indexability | WARN | Canonicals correct on every page; 404 template canonicals to home; home has 3 H1s |
| Security | WARN | HTTPS forced; no HSTS, no www/apex redirect, no CSP/Permissions-Policy |
| URL structure | PASS | Clean lowercase slugs, trailing slash consistent |
| Mobile | PASS | viewport meta on all pages |
| Core Web Vitals risk | WARN | 295 images on home, 288 on About; `no-store` on HTML; unoptimized PNG hero |
| Structured data | PASS/partial | JSON-LD on home, product pages, blog; none on contact, clients, testimonial, careers |
| JS rendering | PASS | Static HTML has full content; home metadata IS in `<head>` (verified) |
| IndexNow | Not implemented | Optional (Bing/Yandex/Naver) |

---

## CRITICAL

### C1. 39 live URLs have no page and no redirect: lost rankings and 404s at cutover
- Evidence: `emsphere-audit/.missing.txt` (39 URLs). `public/.htaccess` has no redirect rules other than HTTPS and `/blogs/` to `/blog/`; unmatched URLs fall to rule 5 (404.html).
- Several carry real equity for target keywords: `/contract-labour-management-software/`, `/contract-labour-management-india/`, `/labour-management-system-software/`, `/attendance-management-system/`, `/pricing/`, `/integrations/`.
- Fix: deploy the redirect map below in `public/.htaccess`, ABOVE the blog rules and the "serve existing files" rules. For the 5 to 6 keyword-bearing URLs, build real pages rather than redirecting (a redirect to a differently-targeted page loses the keyword match). A stray 59k-line `contract-labour-management-india.html` sits in the project root and looks like an unfinished page for exactly that URL; finish it as `app/contract-labour-management-india/page.jsx`.
- Verify: `curl -sI -A "Mozilla/5.0" https://www.emsphere.com/<old-url>/` returns `301` with the intended `Location` (or `410`).

### C2. Unknown URLs return HTTP 200 (soft 404), not 404
- Evidence: `public/.htaccess` rule 5: `RewriteRule ^ /404.html [L]` is an internal rewrite, so status is 200 and `ErrorDocument 404` never fires. The page has `noindex`, but Google will report soft 404s and every junk URL answers 200.
- Fix: replace rule 5 with
  ```
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ - [R=404,L]
  ```
  (or delete rule 5; line 2 `ErrorDocument 404 /404.html` handles it).
- Verify: `curl -sI https://www.emsphere.com/zzz/` returns `HTTP/1.1 404` and body shows the custom page.

### C3. Sitewide footer links to pages that do not exist
- Evidence: `components/Footer.jsx:179,182` link `/privacy-policy` and `/terms-of-use`; neither exists in `out/`, and the footer is on every page. `app/human-resource-management-system/page.jsx` lines 320, 330, 340, 790, 808 link `/products/emworkforce` (404).
- Fix: create `app/privacy-policy/page.jsx` and `app/terms-of-use/page.jsx` (reuse live privacy text), add to sitemap; point `/products/emworkforce` links to `/workforce-management-system/`.
- Verify: internal link crawl of `out/` returns 0 broken hrefs (my crawl found exactly these 4 targets).

---

## HIGH

### H1. No www/apex canonical host redirect
- Evidence: HTTPS rule uses `%{HTTP_HOST}`, so `http://emsphere.com` goes to `https://emsphere.com`, a duplicate host. Canonicals say `https://www.emsphere.com/`.
- Fix (replace the HTTPS rule):
  ```
  RewriteCond %{HTTP_HOST} !^www\.emsphere\.com$ [NC,OR]
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://www.emsphere.com/$1 [R=301,L]
  ```
- Verify: all four variants (http/https x www/apex) reach `https://www.emsphere.com/` in one hop.

### H2. Home page has 3 H1 elements
- Evidence: `out/index.html` H1s: "HR Tech Re-imagined", "Connected HR", "Adaptive & Integrated" (hero slides in `app/page.jsx`). Every other page has exactly 1.
- Fix: one H1 with the primary keyword (e.g. "HRMS and Contract Labour Management Software for Indian Enterprises"); render slide headings as `<p>` or `<h2>`.
- Verify: `grep -o "<h1" out/index.html | wc -l` returns 1.

### H3. Home title/meta are generic, not keyword-targeted
- Evidence: `<title>Workforce and Labor Management System - Emsphere</title>`; this is also the layout default (`app/layout.js`), which leaks into the 404 page (M1).
- Verified OK: although `app/page.jsx` is `"use client"`, `out/index.html` has exactly one `<title>`, one description, one canonical, all inside `<head>`; no duplicates in the body. No rendering fix needed.
- Fix: e.g. "HRMS, CLMS and Payroll Software in India | Emsphere Technologies" (<=60 chars) plus a 150-160 char description naming HRMS, CLMS, payroll, visitor and canteen management.

### H4. Several product-page titles are truncated or weak for target keywords
- Evidence (head titles): "Contract Labour Management System, Contract Worker" (cut off); "Human Resource Management System, SAP HRMS Software" (SAP term is off-brand); "Workforce Management System India | Workforce Management" (repetitive); "Visitor Management System, Software, Solution" (no brand); "Careers | Emsphere Technologies - Join Our HR Tech Team | Emsphere Technologies" (brand twice, 79 chars); several clms-* titles end "Emsphere Technology" vs "Emsphere Technologies".
- Fix: pattern `Primary Keyword | Qualifier | Emsphere`, 30-60 chars, one primary keyword per URL. Example: "Contract Labour Management System (CLMS) Software India | Emsphere".
- Verify: title lengths all 30-60.

### H5. Security headers incomplete
- Evidence: `public/.htaccess` section 7 sets only X-Content-Type-Options, X-Frame-Options, Referrer-Policy.
- Fix (all possible with mod_headers on Apache/LiteSpeed):
  ```
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header set Content-Security-Policy-Report-Only "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-ancestors 'self'"
  ```
  Enable HSTS only after H1 works; keep CSP report-only until tested (add your analytics/domains first).
- Verify: securityheaders.com grade A.

### H6. HTML served with `Cache-Control: no-cache, no-store, must-revalidate`
- Evidence: `.htaccess` section 7 FilesMatch for html. `no-store` disables back/forward cache and slows repeat visits.
- Fix: `Header set Cache-Control "no-cache"` for HTML (revalidates via ETag); drop `Pragma` and `Expires: 0`. Limit `immutable` to `/_next/static/`; un-hashed `/universal-images/*` should be ~1 month (the current FilesMatch applies immutable to every png/webp/js/css/svg).

### H7. Heavy image/DOM load on Home and About
- Evidence: `out/index.html` has 295 `<img>`, `out/about-us/index.html` 288; 204 on each have `alt=""` (carousel/marquee duplicates, logos). 272 are lazy (good), all have width/height (good). `images.unoptimized: true` in `next.config.mjs` means hero PNGs ship unconverted (home preloads a `.png` hero).
- Fix: render each carousel set once and duplicate via CSS or `aria-hidden` clones; give real client logos alt text ("JK Cement logo"); convert hero/large PNGs to WebP/AVIF at build; mark the LCP hero `fetchpriority="high"`.
- Verify: Lighthouse mobile DOM < 1500 nodes, LCP < 2.5s.

---

## MEDIUM

### M1. 404 page head inherits home metadata
- Evidence: `out/404.html`, `out/404/index.html`, `out/_not-found/index.html` contain two `<title>` tags (home title then "404 - Page Not Found | ..."), the home description, and `canonical=https://www.emsphere.com/` (robots is noindex, which mitigates).
- Fix: in `app/not-found.jsx` set a single title, `robots: { index: false }`, and no canonical.

### M2. Obsolete `/payroll-management-solution/` page
- Evidence: `out/payroll-management-solution/index.html`: `noindex, follow`, canonical to `/empay-management-solution/`, 0 H1, no inlinks, excluded from sitemap (`next-sitemap.config.js`).
- Fix: replace with a server 301 (included in snippet below) and delete the route so a real 301 passes signals.

### M3. Sitemap quality
- Evidence: `public/sitemap.xml` and `out/sitemap.xml` are identical, 149 URLs, all matching built routes (0 missing, 0 extra; only `/404/` and the payroll alias are intentionally excluded); https, trailing slash, `/blog/` paths (not `/blogs/`). Issues: all marketing `lastmod` equal the build timestamp (2026-10-23T06:43Z), so Google learns to distrust it; `changefreq`/`priority` are ignored by Google; `Host:` line in robots.txt is non-standard.
- Fix: set lastmod per page from real change date; optional cleanup of changefreq/priority and `Host:`.
- Verify: Search Console Sitemaps report "Success", discovered URLs = 149.

### M4. Duplicate metadata and keyword cannibalisation (blog)
- Evidence: identical titles on `/blog/leave-management-system/` and `/blog/emspheres-leave-management-system-streamline-your-workforce/` ("Leave Management System - Emsphere Technologies"); identical descriptions on `/blog/attendance-management-system-and-its-features/` and `/blog/benefits-of-attendance-management-system/`. Across the 21 marketing pages: no duplicate titles or descriptions. ~20 near-duplicate CLMS/labour/"-pune" posts compete with product pages for the same queries.
- Fix: rewrite the duplicated titles/descriptions; consolidate overlapping posts (301 to strongest); link each cluster to its pillar page with keyword anchors.

### M5. `og:locale` is en_US
- Evidence: `<meta property="og:locale" content="en_US">`. Fix: `en_IN`; consider `<html lang="en-IN">`. No hreflang is present, which is right for a single-market site (do not add hreflang without alternates; defer to seo-hreflang if that changes).

### M6. Internal linking
- Evidence: all marketing pages receive inbound links; no orphans except `/payroll-management-solution/` and `/404/`. Weakest blog posts have only 2 to 3 inlinks (e.g. `/blog/benefits-of-attendance-management-system/`). Dead internal links listed in C3.
- Fix: add "Related product" CTAs from each post to its product page and a Resources block on each product page linking 3 to 5 relevant posts.

### M7. Structured data coverage
- Evidence: Organization, WebSite, WebPage, BreadcrumbList, SoftwareApplication on home/About/HRMS/CLMS; Article-type data on blog posts. None on contact-us, our-clients, testimonial, careers.
- Fix: Organization/LocalBusiness with Pune address and phone on contact-us, `JobPosting` on careers, `FAQPage` only where FAQs are visible, `Review` only for genuine visible reviews. Validate with Rich Results Test.

### M8. One insecure outbound link
- Evidence: `http://www.pwc.com/.../reshaping-the-workplace.pdf` in `/blog/what-do-the-millennials-want-in-their-workforce-management-system/`. No http resources are loaded otherwise (no mixed content). Change to https or remove.

---

## LOW
- L1. Case: folder renamed `app/About-us` to `app/about-us` (git shows RM). Output and canonical are `/about-us/`. Linux is case-sensitive, so `/About-us/` will 404 unless redirected (included in snippet). `.htaccess` comments in rules 3/4 still mention `/About-us`. Make sure the rename is committed so a case-insensitive Windows checkout does not revert it.
- L2. `<meta name="keywords">` still emitted on home; ignored by Google, remove.
- L3. Careers page emits no robots meta while others emit `index, follow`; harmless.
- L4. `.htaccess` rule 3 `^(.*)/?$ $1/index.html` can double-slash; DirectoryIndex already covers it.
- L5. No brotli; enable `mod_brotli` if Hostinger allows.
- L6. Do not upload stray root files (`contract-labour-management-india.html`, `out.zip`, `analyze_sections.js`, xlsx/pptx) to public_html.
- L7. IndexNow: place a key file in `public/` and ping Bing/Yandex on deploy (optional).

---

## What passed (verified in `out/`)
- robots.txt: `User-agent: * / Allow: /`, sitemap declared, `/_next/` not blocked. AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are currently allowed; keep that if AI-search visibility is wanted.
- Canonicals: every marketing and blog page is self-canonical, absolute, https, lowercase, trailing slash; blog canonicals use `/blog/` not `/blogs/`. `.htaccess` 301s direct `/blogs/` hits to `/blog/`.
- noindex only on 404/_not-found and the payroll alias; none on money pages.
- 1 H1 on every page except home (3) and the payroll alias (0).
- Titles unique across all 21 marketing pages; descriptions 115 to 173 chars (our-clients 173, canteen 169, clms-onboarding 167 a bit long; contact-us 115 short).
- `lang="en"`, viewport, charset on all pages; images have width/height; most are lazy-loaded.
- Home `<head>` contains exactly one title/description/canonical/OG set (client component does not duplicate them).

---

## Redirect map (39 missing live URLs plus renamed routes)

| # | Old URL (live) | Action | Target / reason |
|---|---|---|---|
| 1 | /ai-led-onboarding/ | 301 | /clms-onboarding-gatepass-management/ |
| 2 | /attendance-management-system/ | 301 now, build page later | /workforce-management-system/ (high-value keyword: create dedicated attendance page, then repoint) |
| 3 | /blog/canteen-management-system-biometric-vs-rfid-authentication-guide/ | Restore post (preferred); else 301 | /canteen-management-system/ |
| 4 | /blog/contract-labour-management-software-multi-site-wage-errors/ | Restore post (preferred); else 301 | /clms-wages-contractor-billing/ |
| 5 | /blog/footers/ | 410 | template junk |
| 6 | /blog/footers/crypto-currency/ | 410 | template junk |
| 7 | /blog/footers/footer-cyber-security/ | 410 | template junk |
| 8 | /blog/footers/game-solutions-footer/ | 410 | template junk |
| 9 | /blog/job/jr-frontend-developer/ | 301 | /careers/ |
| 10 | /blog/job/senior-backend-developer/ | 301 | /careers/ |
| 11 | /blog/job/senior-office-manager/ | 301 | /careers/ |
| 12 | /blog/job/ui-ux-and-product-designer/ | 301 | /careers/ |
| 13 | /blog/portfolio/branding-corporate-identity/ | 410 | template junk |
| 14 | /blog/portfolio/information-architencure/ | 410 | template junk |
| 15 | /blog/portfolio/information-architencure-2/ | 410 | template junk |
| 16 | /blog/portfolio/leafery-branding/ | 410 | template junk |
| 17 | /blog/portfolio/user-interface-design/ | 410 | template junk |
| 18 | /blog/portfolio/website-design-project/ | 410 | template junk |
| 19 | /blog/portfolio/website-design-project-2/ | 410 | template junk |
| 20 | /blog/portfolio/website-design-project-3/ | 410 | template junk |
| 21 | /clms-contract-employee-masters/ | 301 | /clms-contractor-contract-employee-masters/ (renamed slug) |
| 22 | /contract-labour-management-india/ | 301 now, build page later | /contract-labour-management-system-software/ |
| 23 | /contract-labour-management-software/ | 301 | /contract-labour-management-system-software/ |
| 24 | /contract-labour-management-software-natcon2023/ | 301 | /contract-labour-management-system-software/ |
| 25 | /contract-labour-management-softwares-copy/ | 301 | /contract-labour-management-system-software/ (WP duplicate) |
| 26 | /cyber-security/ | 410 | template junk |
| 27 | /game-solutions/ | 410 | template junk |
| 28 | /help-center/ | 301 | /contact-us/ |
| 29 | /integrations/ | 301 now, build page later | /human-resource-management-system/ |
| 30 | /labour-management-system-software/ | 301 | /contract-labour-management-system-software/ |
| 31 | /landing-page/ | 410 | template junk |
| 32 | /landing-page-2/ | 410 | template junk |
| 33 | /mobilepolicy/ | 301 | /privacy-policy/ (after C3 page exists) |
| 34 | /our-team/ | 301 | /about-us/ |
| 35 | /portfolio/ | 410 | template junk |
| 36 | /pricing/ | 301 (or build) | /contact-us/ |
| 37 | /privacy-policy/ | NO redirect: create page | same URL (C3) |
| 38 | /service/ | 410 | template junk |
| 39 | /service/service-details/ | 410 | template junk |

Extra: `/payroll-management-solution/` to `/empay-management-solution/` (301); `/About-us/` to `/about-us/` (301); `/clients/` to `/our-clients/` and `/testimonials/` to `/testimonial/` (301; routes renamed in this build per git status).

### Apache snippet
Place inside the existing `<IfModule mod_rewrite.c>` in `public/.htaccess`, right after the HTTPS rule and BEFORE the blog rules a) to d).

```apache
# --- 410 Gone: WordPress theme demo junk ---
RewriteRule ^blog/(footers|portfolio)(/.*)?$ - [G,L]
RewriteRule ^(cyber-security|game-solutions|landing-page|landing-page-2|portfolio|service)/?$ - [G,L]
RewriteRule ^service/service-details/?$ - [G,L]

# --- 301 redirects (trailing slash optional) ---
RewriteRule ^blog/job/.+$ /careers/ [R=301,L]
RewriteRule ^ai-led-onboarding/?$ /clms-onboarding-gatepass-management/ [R=301,L]
RewriteRule ^attendance-management-system/?$ /workforce-management-system/ [R=301,L]
RewriteRule ^clms-contract-employee-masters/?$ /clms-contractor-contract-employee-masters/ [R=301,L]
RewriteRule ^(contract-labour-management-india|contract-labour-management-software|contract-labour-management-software-natcon2023|contract-labour-management-softwares-copy|labour-management-system-software)/?$ /contract-labour-management-system-software/ [R=301,L]
RewriteRule ^(help-center|pricing)/?$ /contact-us/ [R=301,L]
RewriteRule ^integrations/?$ /human-resource-management-system/ [R=301,L]
RewriteRule ^mobilepolicy/?$ /privacy-policy/ [R=301,L]
RewriteRule ^our-team/?$ /about-us/ [R=301,L]
RewriteRule ^payroll-management-solution/?$ /empay-management-solution/ [R=301,L]
RewriteRule ^About-us/?$ /about-us/ [R=301,L]
RewriteRule ^clients/?$ /our-clients/ [R=301,L]
RewriteRule ^testimonials/?$ /testimonial/ [R=301,L]
```

Notes:
1. The `[G]` and job rules must precede rule d) (`/blog` to `/blogs` rewrite) or they never match.
2. `/blog/` has its own `.htaccess` (`deploy/wordpress-blog.htaccess`, because WordPress lives there). If LiteSpeed hands `/blog/...` to that file, the root rules do not run, so also add at the top of its Next.js block (RewriteBase is `/blog/`): `RewriteRule ^(footers|portfolio)(/.*)?$ - [G,L]` and `RewriteRule ^job/.+$ /careers/ [R=301,L]`. Test both paths.
3. For the 2 missing blog posts, re-run `scripts/fetch-blog-posts.mjs` and rebuild instead of redirecting.
4. Bulk check: `while read u; do curl -s -o /dev/null -w "%{http_code} $u -> %{redirect_url}\n" -A "Mozilla/5.0" "https://www.emsphere.com$u"; done < paths.txt`.

---

## Cutover checklist
1. Fix C1 to C3 and H1, deploy `.htaccess`, test redirects and a 404 status.
2. Confirm `/robots.txt` and `/sitemap.xml` at the root; submit in Google Search Console and Bing Webmaster Tools.
3. Keep Rank Math titles/descriptions for blog posts (already ported in `app/blogs/[slug]/page.jsx`).
4. After launch: crawl with Screaming Frog; watch Pages report for 404 and soft 404 for 4 weeks; track CrUX LCP <=2.5s, INP <=200ms, CLS <=0.1.
