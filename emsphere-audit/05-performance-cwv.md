# 05 - Performance and Core Web Vitals (LCP, INP, CLS)

Date: 2026-10-23. Auditor: Web Performance specialist.
Scope: live WordPress baseline (https://www.emsphere.com) vs new Next.js 16 static export (`out/`).

## Overall Performance score (new build): 55 / 100

Basis: local Lighthouse mobile lab scores of 58-60 on every page, with pages served by python http.server (no compression, no caching). The score is then lowered for production-independent defects: 20 MB of unoptimised PNG/WebP, a Google Fonts `@import` on the home page, and external blog images on a temporary domain. Applying the Critical and High fixes below should bring lab scores to roughly 85-95. The live WordPress baseline scores 30-33 on PSI mobile.

Core Web Vitals status:

| Metric | Live (CrUX field, p75, mobile+desktop origin) | Status | New build |
|---|---|---|---|
| LCP | 3.08 s origin, 3.20 s home URL (limit 2.5 s) | FAIL (needs improvement) | No field data yet. Lab 9.1-11.9 s throttled. Not yet safe to predict a pass. |
| INP | 179 ms origin, 180 ms home URL (limit 200 ms) | PASS, close to the limit | Lab TBT 120-210 ms. Low risk. Re-check after Lenis/hydration changes. |
| CLS | 0 | PASS | Lab CLS 0 on all 5 pages. Every `<img>` in the HTML has width/height (0 of 295 home images lack them). |

The 75th-percentile rule applies. Live site overall: FAIL on LCP, pass on INP and CLS. Live TTFB p75 is 1.15-1.22 s, above the 0.8 s "good" level (slow WordPress/PHP origin; static export fixes this).

## Per-page metrics: live vs new

Live = PSI API v5, Lighthouse 13.5.0, mobile. New = local Lighthouse CLI, mobile emulation, simulated throttling, localhost server (lab only).

| Page | Live perf | Live FCP | Live LCP (lab) | Live TBT | Live field LCP / INP / CLS | New perf | New FCP | New LCP (lab) | New TBT | New CLS | New page weight |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 33 | 5.0 s | 21.4 s | 1,140 ms | 3.20 s / 180 ms / 0 | 60 | 4.4 s | 11.9 s | 150 ms | 0 | 9.3 MB |
| `/human-resource-management-system/` | 30 | 4.6 s | 23.2 s | 1,910 ms | origin fallback 3.08 s / 179 ms / 0 | 60 | 3.6 s | 10.3 s | 160 ms | 0 | 1.7 MB |
| `/contract-labour-management-system-software/` | 32-33 (2 runs) | 5.0 s | 5.0-5.6 s (varies by run) | 2,660-3,280 ms | origin fallback 3.08 s / 179 ms / 0 | 59 | 5.1 s | 11.5 s | 130 ms | 0 | 2.0 MB |
| `/empay-management-solution/` | not measured | - | - | - | - | 58 | 5.1 s | 11.2 s | 120 ms | 0 | 1.9 MB |
| `/blogs/` | not measured | - | - | - | - | 60 | 4.1 s | 9.1 s | 210 ms | 0 | 1.5 MB |

Notes:
- The live pages weigh about 7.2 MB (CLMS). Live TBT of 1.1-3.3 s means heavy main-thread work. The new build cuts TBT by 85-95%.
- The new build's lab LCP is driven by the throttled network model (1.6 Mbps) loading uncompressed bytes. Local lab LCP is not comparable to production. Compression and long cache headers are not applied locally.
- Live CLMS lab LCP differed between runs (5.0 s and 5.6 s here, against 21-23 s for the other two). Treat live lab LCP as noisy and rely on the field data (3.1-3.2 s).
- Only the home URL had its own CrUX record. The two product pages fell back to origin-level data.
- LCP element on all 5 new pages is the 36 px header logo (`header.sticky img.h-9`), not the hero. See H2.
- Observed (unthrottled) LCP subparts: TTFB 7-19 ms, load delay 22-35 ms, load duration 48-196 ms, element render delay 1.15 s (home), 2.04 s (HRMS), 2.13 s (CLMS), 2.21 s (Empay), 1.30 s (blog). Render delay dominates, so the cause is paint blocking, not network.

## Static asset inventory (`out/`)

| Item | Size | Comment |
|---|---|---|
| Total `out/` | 76 MB | Includes `_next/static/media` 20 MB |
| JS (all chunks) | 1.26 MB raw | Home loads 11 chunks: 767 KB raw, about 224 KB gzip. Product pages 531-591 KB raw, about 156-173 KB gzip. |
| CSS | 177 KB in one global sheet (190 KB per page including route CSS) | About 30 KB gzip. Loaded on every page, render-blocking. |
| HTML | Home 312 KB, HRMS 315 KB, CLMS 550 KB, Empay 487 KB, our-clients 513 KB | Gzip: 38 KB, 52 KB, 74 KB. Large because of inlined RSC payload and 276-295 `<img>` tags (logo marquee repeated 4x). |
| Raster images in `_next/static/media` | 162 files, 19.5 MB | |
| Fonts | 20 woff2 files, 406 KB total | 4 preloaded on the home page |

Largest files:
- `shop-floor-workforce-management-team` PNG: 2.67 MB
- `blog-visitor-management-system-security` PNG: 1.99 MB
- `blog-payroll-management-automation` PNG: 1.95 MB
- `blog-contract-labour-management-guide` PNG: 1.92 MB
- `hero-adaptive-integrated-industrial-workers` PNG: 1.49 MB
- `hero-hr-tech-reimagined-ai-hologram` PNG (home LCP/hero slide 1): 1.36 MB
- `hero-connected-hr-team-collaboration` PNG: 866 KB
- `emsphere-corporate-office-building` PNG: 667 KB
- `emsphere-site-engineers-reviewing-plans` PNG: 551 KB
- `visitor-analytics-mobile-app-dashboard` WebP: 326 KB

Client logo PNGs are 37-60 KB each (e.g. `logo-yashaswi-wide` 60 KB, `logo-tata-autocomp` 54 KB), while displayed at about 72x34 CSS px.

Images referenced by the home page HTML total 8.9 MB across 81 unique files. CLMS references 1.47 MB, Empay 1.60 MB, HRMS 0.77 MB.

## Findings

### Critical

**C1. Oversized PNG images, home page weighs 9.3 MB**
- Evidence: Lighthouse `image-delivery-insight` estimates 5,291 KiB of savings on `/`. The `cache-insight` and byte-weight audits report 9,343 KiB total transfer. `images.unoptimized: true` means `next/image` does no resizing or format conversion. The same 1440x631 PNG is sent to a 390 px phone.
- Fix: convert all PNG photos and heroes to AVIF/WebP at build time. `sharp` is already a dependency. Targets: hero 1440 px wide at 60-120 KB; 800 px mobile variant at 30-60 KB. Serve with `srcset`/`sizes` or `<picture>`.
- Starter command for a one-off pass (run outside `app/`, review output before replacing): `npx sharp-cli -i "app/images/**/*.png" -o ... -f webp -q 78`, or a `scripts/optimize-images.mjs` using `sharp(input).resize({width:1440}).webp({quality:78})`.
- Also resize logos to 2x display size (about 150x70 px) and convert to WebP. Expected saving: logo weight from about 450 KB to under 60 KB.
- Expected impact: home weight 9.3 MB to roughly 1.3 MB. Largest improvement to LCP, FCP and Speed Index on slow mobile.

**C2. Google Fonts `@import` inside the home page inline CSS**
- Evidence: `app/page.jsx` line 173, inside `PAGE_CSS`: `@import url("https://fonts.googleapis.com/css2?family=Instrument+Sans...&family=Inter...&display=swap")`. It is present in `out/index.html`. Also in `app/about-us/page.jsx` and `app/not-found.jsx`. An `@import` in a `<style>` block is render-blocking and starts only after the HTML is parsed. It adds a chain: HTML, fonts.googleapis.com CSS, gstatic font files, with extra DNS/TLS to two third-party origins. It also duplicates fonts already self-hosted by `next/font` (the home HTML already preloads 4 woff2 files and references `--font-inter` and `--font-instrument-sans`).
- Fix: delete the `@import` line from `PAGE_CSS`, `about-us` and `not-found`. Declare `Instrument_Sans` and `Inter` with `next/font/google` (`display: "swap"`, needed weights only) in `app/layout.js` or the page and use the CSS variables. Confirm the variables resolve on `.home-page`.
- Expected impact: removes about 300-800 ms of mobile FCP/LCP delay and a GDPR/third-party dependency.

### High

**H1. Home page preloads 11 images with no priority hint; hero is not `fetchpriority=high`**
- Evidence: home `<head>` has 11 `rel="preload" as="image"` tags: header logo, the 1.36 MB hero PNG and 9 client-logo PNGs, plus the logo preload. `lcp-discovery-insight` scored 0 on all five pages with "fetchpriority=high should be applied to the image preload request" = false. The home page has 23 `loading="eager"` images (logo marquee items). Only `human-resource-management-system` sets `fetchPriority="high"` (hero dashboard, correct there).
- Fix: in `app/page.jsx`, add `fetchPriority="high"` to hero slide 1 only. Make logo marquee images `loading="lazy"` (or render only the visible set eagerly) so they stop generating preloads. Slides 2 and 3 are already lazy (good).
- Expected impact: hero fetch no longer shares bandwidth with 9 logos; LCP gain about 0.5-1.5 s on mobile.

**H2. LCP element is the tiny header logo and paint is delayed 1.1-2.2 s**
- Evidence: LCP element on `/`, HRMS, CLMS, Empay and `/blogs/` is `header.sticky > div.relative > a.flex > img.h-9` (36 px tall, `emsphere-technologies-logo.webp`). Element render delay is 1.15-2.21 s of the observed LCP. The hero and page body paint later than the header, so the header logo is the "largest" at first paint, which means content is appearing after JS. `render-blocking-insight` scored 0 (est. 370 ms on `/`, 960-1,090 ms on other pages) because of the single 177 KB global stylesheet plus route CSS. The home page also wraps content in a `pageEntranceFade` animation starting at `opacity: 0` (0.65 s) and hero slides start `opacity:0; visibility:hidden` until JS activates them (`app/page.jsx` lines 175-187, 410-415).
- Fix: (a) make hero slide 1 visible in the server HTML (no opacity-0 start; set `heroSlideActive` on slide 1 server-side) and drop or shorten the entrance fade on the home wrapper; (b) split the global stylesheet; (c) enable gzip/brotli so CSS drops from 190 KB to 30 KB (see Apache section); (d) after fixing, re-measure so the LCP is the hero image or heading, with target total under 2.5 s.
- Expected impact: LCP down by 1-2 s; the entrance animation alone costs 650 ms of invisible content.

**H3. Blog listing images load from a temporary hosting domain**
- Evidence: `out/blogs/index.html` has 17 of its 21 images pointing to `https://olivedrab-dove-173337.hostingersite.com/blog/wp-content/uploads/...`. Home HTML also references that host (schema/blog data). It is a cross-origin connection (extra DNS+TLS), and those URLs break when the temporary domain is retired. The first two cards use `fetchPriority="high"` (good, via `BlogCard.jsx`).
- Fix: re-run `scripts/fetch-blog-posts.mjs` against the final production blog URL (https://www.emsphere.com/blog/wp-content/uploads/...) before the final build, or download the images into the export. Add `<link rel="preconnect">` only if a separate origin must remain. Serve WebP versions.
- Expected impact: removes a third-party connection from LCP; avoids broken images after launch.

**H4. Large JavaScript on first load**
- Evidence: home loads 11 chunks, 767 KB raw (224 KB gzip). `unused-javascript` lists 149-154 KB of unused JS (est. LCP savings 700-1,100 ms). Lighthouse bootup time is 0.7-1.1 s of main-thread JS (TBT 120-210 ms, acceptable). Home is one 71 KB `"use client"` file; `lenis` and the full header/footer are hydrated on every page.
- Fix: split `app/page.jsx` into a server component with small client islands (hero slider, testimonials slider). Lazy-load `SmoothScroll` after first interaction/idle with `next/dynamic` and `ssr:false`, and skip it on touch devices (it is mainly a wheel-smoothing feature). Import Phosphor icons from `@phosphor-icons/react/ssr` (already done on home; check the other pages).
- Expected impact: 100-200 KB less parse/execute on mobile, better INP margin.

### Medium

**M1. HTML documents are very large (312-550 KB)**
- Evidence: `/contract-labour-management-system-software/` is 550 KB with 280 `<img>` tags and the logo marquee duplicated 4x; `/our-clients/` 513 KB; `/empay-management-solution/` 487 KB. The route also ships `index.txt` / `__next._full.txt` RSC payloads of 230-257 KB. Compressed it is 74 KB. DOM node count for the CLMS page is around 1,080 elements by tag count, fine for INP (Lighthouse `dom-size-insight` passes).
- Fix: render the marquee once and duplicate with CSS (or two copies at most). Remove repeated inline SVG. Keep the client logo list in one component.

**M2. One 177 KB global stylesheet on every page**
- Evidence: `out/_next/static/chunks/2-ldrk7k_v44s.css` is referenced by every page (722 rules, 208 `.blog*` selectors). Gzip size is 30 KB. `unused-css-rules` flags 10-11 KB on `/` and `/blogs/`.
- Fix: move `.blog*` styles into the blog route CSS (CSS modules or route-level import), and check `@source` scanning in Tailwind v4 is not pulling in `scratch/`, `design-reference/` or `emsphere-audit/`.

**M3. Apache config gaps (details in the next section)**
- Brotli is not configured, HTML is sent with `no-cache, no-store`, and the immutable rule also covers non-hashed images in `/universal-images`.

**M4. 20 woff2 files shipped, 4 preloaded on home**
- Evidence: 406 KB of fonts in `_next/static/media`. Only latin subsets should be needed. Font-display insight passed (score 1), so CLS risk from fonts is low.
- Fix: limit weights to those used (for example Inter 400/500/600/700 only if they appear in the CSS) and preload at most 2 fonts per page.

### Low

- **L1. CLS is clean today (0 on all five pages).** Keep it that way: the logo `<img>` has `width="550" height="143"`; hero slides use `width="1440" height="631"`. For the blog, `BlogCard` images should keep explicit dimensions or `aspect-ratio`. The Google Fonts `swap` flash from C2 can also cause minor CLS on the live-style typography.
- **L2. `trailingSlash: true` plus Apache rewrite rules.** Each page request goes through several `RewriteCond` file checks. Cheap, but in `public/.htaccess` put the "existing file" check (rule 1) before the `/blog` rewrites for faster static asset handling.
- **L3. Orphan duplicate payload files** (`__next._full.txt`, `__next.*.txt`, `index.txt` per route) are not needed unless client-side navigation uses them. They are small relative to the page, but make sure `Cache-Control` is not `immutable` for them (they are not hashed).
- **L4. `out/` contains the `.htaccess`** (5,690 bytes, same as `public/.htaccess`), which is correct for upload. `out.zip` and root-level files (`analyze_sections.js`, `contract-labour-management-india.html`, `scratch/`) are outside `out/` so they do not ship.

## LCP element and preload summary (new build)

| Page | LCP element | Preloaded? | Lazy? | Priority hint |
|---|---|---|---|---|
| `/` | Header logo (WebP, 36 px). Real hero is slide 1 PNG 1.36 MB. | Yes (logo + hero + 9 client logos) | No | None (`fetchpriority` false) |
| `/human-resource-management-system/` | Header logo; hero dashboard WebP (70 KB) is `fetchPriority="high"`, `loading="eager"` | Yes (2 image preloads) | No | Hero: high |
| `/contract-labour-management-system-software/` | Header logo | Header logo only (1 preload) | No | None |
| `/empay-management-solution/` | Header logo | Header logo only | No | None |
| `/blogs/` | Header logo; first 2 blog card images are high priority | 2 preloads | No | Cards 1-2: high |

CLS risks: no `<img>` lacks width/height in any of the five pages. Residual risks are the `heroSlide` opacity/visibility swap and late-loading external blog images (fixed-dimension cards prevent shifts).

INP risks: `SmoothScroll` (Lenis with `autoRaf`) runs a requestAnimationFrame loop on every page; testimonials and hero sliders use timers. Lab TBT is acceptable (120-210 ms). The live site's field INP is already 179 ms, so do not regress it. Test real interactions (menu open, slider controls, form submit) with Chrome DevTools or a RUM snippet after launch.

## Apache production configuration

Hosting appears to be Hostinger Apache/LiteSpeed (see `deploy/wordpress-blog.htaccess` and `public/.htaccess`). The existing `public/.htaccess` already enables `mod_deflate`, `mod_expires` and an immutable header rule. Recommended changes (do not edit source in this audit; apply when you next touch `public/.htaccess`):

```apache
# 1. Compression: Brotli first (if mod_brotli or LiteSpeed Brotli is enabled), gzip as fallback
<IfModule mod_brotli.c>
  AddOutputFilterByType BROTLI_COMPRESS text/html text/plain text/css text/xml text/javascript application/javascript application/json application/xml image/svg+xml font/ttf font/otf
</IfModule>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/xml text/javascript application/javascript application/json application/xml image/svg+xml font/ttf font/otf
  # woff/woff2 are already compressed; remove them from DEFLATE to save CPU
</IfModule>
# On LiteSpeed (Hostinger hPanel): also enable Brotli in the Hostinger control panel or Cloudflare.

# 2. Long-term caching for hashed Next.js assets only
<IfModule mod_headers.c>
  <FilesMatch "\.(js|css|woff2|woff)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
# Put this in public/.htaccess scoped to /_next/static, or a RewriteRule-based Header, so un-hashed files are not frozen.
<LocationMatch "^/_next/static/">
  Header set Cache-Control "public, max-age=31536000, immutable"
</LocationMatch>

# 3. Un-hashed images and icons (in /universal-images, favicons, og images): cache 30 days, revalidate
<FilesMatch "\.(webp|png|jpg|jpeg|avif|gif|svg|ico)$">
  Header set Cache-Control "public, max-age=2592000, stale-while-revalidate=86400"
</FilesMatch>
# Hashed images under /_next/static/media will still match LocationMatch above because it is applied later (or add a separate rule with 1 year).

# 4. HTML and RSC payload files: revalidate each visit but allow bfcache and ETag validation
<FilesMatch "\.(html|htm|txt)$">
  Header set Cache-Control "no-cache"
</FilesMatch>
# Replace the current 'no-cache, no-store, must-revalidate' + 'Pragma: no-cache': no-store disables back/forward cache (bfcache) and conditional requests.

# 5. Make sure ETag/Last-Modified are on and add Vary for compressed content
FileETag MTime Size
<IfModule mod_headers.c>
  Header append Vary Accept-Encoding
</IfModule>
```

Additional notes:
- The current rule `^(?!.*\.html$).*\.(js|css|woff2|webp|png|jpg|svg)$` marks every image, including un-hashed `/universal-images/**` and `/favicon.ico`, as `immutable` for a year. Replacing a logo under the same filename would then not reach returning visitors for a year. Keep `immutable` for `/_next/static/` only.
- Add `image/avif`, `font/woff2` and `application/wasm` to `ExpiresByType` if you adopt AVIF.
- Consider HTTP/2/3 and a CDN (Cloudflare free tier) for TTFB; live TTFB p75 is 1.15-1.22 s on WordPress, and static HTML from LiteSpeed should be under 300 ms.
- Verify after deploy: `curl -sI -H "Accept-Encoding: br,gzip" https://www.emsphere.com/_next/static/chunks/<file>.js` should show `content-encoding: br` (or `gzip`) and `cache-control: public, max-age=31536000, immutable`; the HTML response should show `cache-control: no-cache` and an `etag`.

## Prioritised action list

| # | Action | Effort | Expected impact |
|---|---|---|---|
| 1 | Convert PNG heroes/blog/logo images to WebP/AVIF with mobile sizes (C1) | 0.5-1 day | Home 9.3 MB to about 1.3 MB; LCP -3 to -6 s on throttled mobile |
| 2 | Remove Google Fonts `@import` from home, about-us, not-found; use `next/font` (C2) | 1-2 h | FCP/LCP -0.3 to -0.8 s |
| 3 | Add `fetchPriority="high"` on hero slide 1; stop eager-loading and preloading 9 client logos (H1) | 1 h | LCP -0.5 to -1.5 s |
| 4 | Show hero slide 1 and content in server HTML (no opacity-0 start / entrance fade) (H2) | 2-3 h | LCP -0.7 to -2 s; LCP element becomes the hero |
| 5 | Enable Brotli/gzip and fix cache headers (Apache section) | 1 h | JS 767 KB to about 224 KB, CSS 190 KB to 30 KB, HTML 312 KB to 38 KB |
| 6 | Re-run blog fetch against production blog URL (H3) | 30 min | Avoid broken images, remove cross-origin cost |
| 7 | Split client JS; lazy-load Lenis (H4) | 0.5-1 day | -100 to -200 KB JS; protects INP |
| 8 | Reduce HTML size by de-duplicating logo marquee (M1) | 2 h | -100 to -300 KB HTML on CLMS/Empay/our-clients |
| 9 | Re-measure on production with PSI and CrUX after 28 days | - | Confirm LCP p75 under 2.5 s, INP under 200 ms, CLS under 0.1 |

Realistic target after items 1-5: Lighthouse mobile 85-95, lab LCP about 2.0-2.8 s, CLS 0, TBT under 200 ms. Field LCP p75 on the new static site should beat the current 3.1-3.2 s because TTFB drops by about 0.8 s.

## Method and caveats

- Live: `pagespeed_check.py` (PSI API, Lighthouse 13.5.0), mobile, 2026-10-23. HRMS and CLMS pages have no own CrUX data, so field values shown are origin-level.
- New: `npx lighthouse` (mobile emulation, default simulated throttling, performance category only) against http://127.0.0.1:4173/. One run per page; expect plus or minus 5 points of variance. No compression or caching was applied by python http.server, so lab LCP/FCP are pessimistic.
- Static inspection of `out/`, `public/.htaccess`, `app/layout.js`, `app/page.jsx`, `next.config.mjs` (`output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`).
- No project source files were modified.
