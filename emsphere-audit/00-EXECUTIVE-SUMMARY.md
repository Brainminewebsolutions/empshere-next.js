# emSphere SEO Audit: Executive Summary

**Site:** emsphere.com (Emsphere Technologies, Pune). B2B enterprise HR software.
**Audited:** the new Next.js static build (`out/`, before go-live), compared against the live WordPress site, which is the version that ranks today.
**Date:** 23 Oct 2026
**Goal:** get the product pages to the top of Google India (and AI answers) for their buying keywords.

> **Snapshot note:** the specialist audits ran against the build made at the start of the audit. Code was edited during the audit: the forms were replaced by `components/LeadForm.jsx` and `components/DemoModal.jsx`, and pages were renamed to `/about-us/`, `/our-clients/` and `/testimonial/`. Re-check any finding that touches those files before acting on it.

---

## 1. SEO Health Score: **52 / 100**

| Category | Weight | Score | Report |
|---|---|---|---|
| Technical SEO | 22% | 58 | [01-technical-seo.md](01-technical-seo.md) |
| Content quality & E-E-A-T | 23% | 48 | [02-content-eeat.md](02-content-eeat.md) |
| On-page SEO (titles, H1s, keyword targeting)* | 20% | 52 | 01, 02, 08 |
| Schema / structured data | 10% | 58 | [03-schema.md](03-schema.md) |
| Performance (Core Web Vitals) | 10% | 55 | [05-performance-cwv.md](05-performance-cwv.md) |
| AI search readiness (GEO) | 10% | 50 | [07-ai-search-geo.md](07-ai-search-geo.md) |
| Images* | 5% | 40 | 05, 06 |

\* Not scored by a single report. Derived from the title, H1 and keyword findings (01, 02, 08) and the image weight and alt-text findings (05, 06).

Supporting reports (not part of the score):
- [04-sitemap.md](04-sitemap.md)
- [06-visual-mobile.md](06-visual-mobile.md), with screenshots in `screenshots/`
- [08-sxo-search-experience.md](08-sxo-search-experience.md)
- [09-agent-readiness.md](09-agent-readiness.md)
- [10-backlinks-authority.md](10-backlinks-authority.md)
- [11-keyword-clusters-content-plan.md](11-keyword-clusters-content-plan.md)

**For comparison:** the live WordPress site scores 30-33 on PageSpeed mobile. The new build scores 58-60 even on an uncompressed local server, so the rebuild is a real improvement. The risk is losing what already ranks during the switch.

---

## 2. Why the site doesn't rank at the top today

Five problems hold the rankings back. Most audits only fix part of one.

1. **Authority is the biggest gap.** In Common Crawl's link graph, emsphere.com ranks about 18.2M, against keka 38K, greytHR 65K, factoHR 117K, PocketHRMS 324K and Qandle 883K. On-page work alone won't beat sites with this many more links. The plan in report 10 (software directories, client case-study links, HR press, compliance tools people link to) is essential, not optional.
2. **Several pages target the wrong intent or keyword.**
   - The payroll page never says "payroll". Every instance was replaced with "emPay" (18 → 0).
   - "Headcount management software" means HR headcount *planning* to Google. emCount is emergency mustering.
   - The HRMS title says "SAP HRMS Software".
   - The home page has 3 H1s and none contains a keyword.
   - "Best HRMS / WFM software India" results are 70-90% listicles, which a single product page can't win.
3. **Your own pages compete with each other.**
   - Old CLMS blog posts rank in place of the CLMS product page.
   - 14 posts reuse a product page's main keyword.
   - There are 2 pairs of duplicate posts.
   - About 200 internal blog links are broken (`/blog/<product>/`), so the blog passes almost no link value to the product pages.
4. **The content is out of date for the topic you're strongest in.** The four Labour Codes have been in force since 21 Nov 2025. The site mentions the OSH Code or Code on Wages on 0 pages. CLMS competitors lead with this, and AI "best CLMS software" lists name Savvy HRMS, agnihr, BiOKnox, Quikchex, TeamLease RegTech and others. emSphere isn't in any of the 4 lists checked.
5. **Trust signals are weak or contradictory.**
   - Client count: 500+ vs 120+.
   - Experience: 15+ years vs "inception 2015".
   - Users: 10 lakh vs 20 lakh.
   - "ISO 27001:2022 achieved in 2021", which is impossible because that edition was published in 2022.
   - "GDPR Certified": no official GDPR certification exists.
   - The Privacy and Terms pages are missing.
   - G2 has 2 reviews.

**What already works and must be protected:** the live site ranks about **#1 for "visitor management system India"** and about **#5 for "canteen management system"**. emsphere.com also appears 4-5 times for the generic CLMS query, through blog guides.

---

## 3. Launch blockers: fix before switching DNS from WordPress

Each item lists the reason, how to check it worked, and which report has the detail.

| # | Issue | Fix | Verify | Report |
|---|---|---|---|---|
| B1 | **39 live URLs have no page or redirect.** Several are keyword URLs: `/contract-labour-management-software/`, `/contract-labour-management-india/`, `/labour-management-system-software/`, `/attendance-management-system/`, `/pricing/`, `/integrations/`, `/clms-contract-employee-masters/` | Add the 301/410 map from report 01 to `public/.htaccess`. Use real 301s, not meta refresh. Also 301 WordPress `?p=<id>` shortlinks (17 are indexed) and `/About-us/` | `curl -I` each old URL and get 301 to a 200 page. GSC "Not found (404)" doesn't grow in the 4 weeks after launch | 01, 02, 04 |
| B2 | **Payroll URL and keyword change.** The ranking URL `/payroll-management-solution/` becomes a noindex meta refresh, and the new `/empay-management-solution/` has no history and no "payroll" | **Decision needed:** (a) recommended: make `/payroll-management-solution/` the canonical page again and 301 `/empay-…` to it, or (b) keep `/empay-…` with a server 301 from the old URL. Either way, put "Payroll Management Software" back in the title, H1 and body, and use "emPay" only as the product name | Title and H1 contain "payroll". GSC impressions for "payroll software" don't fall after launch | 02, 08 |
| B3 | **Unknown URLs return 200 (soft 404)** | Change `.htaccess` rule `RewriteRule ^ /404.html [L]` to use `ErrorDocument 404 /404.html` | `curl -I /random-xyz/` returns 404 | 01 |
| B4 | **Footer links to `/privacy-policy/` and `/terms-of-use/` return 404 on every page** | Publish both, with DPDP Act 2023 sections | Both return 200 | 01, 02 |
| B5 | **Lead forms don't send leads.** The new `LeadForm.jsx` posts only if `NEXT_PUBLIC_FORM_ENDPOINT` is set. No `.env` sets it, so it shows "sent" after 700 ms and drops the lead | Set the endpoint in the production build (Formspree, Web3Forms, CRM webhook). Show an error, not success, when it's missing | A test submission arrives in the inbox | 09 |
| B6 | **`/sitemap_index.xml`, which Google already knows, will 404** | Copy `sitemap.xml` to `sitemap_index.xml` in `scripts/sync-sitemap.js`, or 301 it | Both URLs return 200 and are submitted in GSC | 04 |
| B7 | **Blog images point at the staging host** `olivedrab-dove-173337.hostingersite.com`. Two newer posts are missing | Re-run `npm run fetch:blog` against production and re-host the images on www.emsphere.com | `grep -r hostingersite out/` returns nothing | 03, 05 |
| B8 | **No www redirect:** `http://emsphere.com` stays on the bare domain | Add a forced 301 to `https://www.emsphere.com` in `.htaccess` | `curl -I http://emsphere.com/` returns 301 to www | 01 |
| B9 | **Cloudflare blocks bot user-agents on the live site.** It may also block real crawlers after launch | Check the Cloudflare Bot Fight Mode and AI-bot settings. Allow verified bots | GSC URL Inspection "Live test" succeeds | 07, 10 |

---

## 4. Action plan by priority

### Week 1-2: on-page fixes (high)

| Action | Why | Depends on | Failure check / leading indicator |
|---|---|---|---|
| Single keyword H1 on home ("HRMS, Payroll & Contract Labour Management Software for Indian Enterprises"). Slides become `<p>`/`<h2>`. Add `<main>` | 3 non-keyword H1s now | — | One `<h1>` in `out/index.html` / GSC home impressions for "hrms software india" |
| Retitle: HRMS (remove "SAP"), CLMS (no truncation), emPay (payroll), Careers (no double brand), clms-* ("Technologies") | Truncated, misleading or keyword-less titles | B2 | Titles ≤ 60 chars, keyword first / CTR per page in GSC |
| Retarget `/headcount-management-software/` to "emergency headcount / mustering system". Expand to 1,000+ words. Fix the counter H2 | Wrong intent (SXO score 37). The mustering SERP is winnable | — | Ranks for "emergency mustering system" within 8 weeks |
| Fix about 200 broken blog links at build time in `lib/blog.js` (`/blog/<product>/` → `/<product>/`) | Blog link value doesn't reach the product pages | B1 | 0 internal 404s in a crawl / product-page impressions rise |
| Link the CLMS hub to its 8 module pages and back. Add them to header or footer | Module pages are orphans | — | Each module has ≥ 3 internal links in |
| Reveal animations: visible by default, hidden only once JS adds a class, plus a `<noscript>` fallback | Most content is `opacity:0` in the first render | — | Screenshot before JS runs shows the text |
| Make company facts one source of truth (`lib/company.js`). Remove "GDPR Certified". Fix the ISO year, "87M", "OSHAS", "Muster Role", "TDF" | Contradictions hurt trust and AI citation | — | One value per fact sitewide (grep) |

### Week 2-4: performance and schema (high/medium)

- Convert hero and large PNGs to WebP/AVIF with mobile sizes (about 5.3 MB saved on home). Preload only hero slide 1 with `fetchPriority="high"`. Lazy-load the logos.
- Remove the duplicate Google Fonts `@import` from `app/page.jsx`, `about-us` and `not-found`.
- Apache: Brotli, HTML `no-cache` with ETag instead of `no-store`, `immutable` only on `/_next/static/`. Add HSTS.
  - Target: PSI mobile 85+, LCP < 2.5 s, INP < 200 ms in CrUX 28 days after launch.
- Expand the Organization schema in `lib/schema.js`: `sameAs` (LinkedIn etc.), Pune `address`, `contactPoint`, `foundingDate`. Have the blog import `organizationNode`. Move headcount and the CLMS modules to `productPageJsonLd`. Add AboutPage and ContactPage schema. Code is in report 03.
- **Don't** add fake ratings or `price: 0` to get the Software App rich result. Add `offers` only with real published pricing, and `aggregateRating` only from genuine third-party reviews.

### Month 1-3: content that can rank (high)

1. **Rebuild the CLMS pillar around the Labour Codes:**
   - Lead with a definition.
   - Cover principal-employer duties, registers and returns (current plus Labour Code equivalents), PF/ESIC contractor checks and the 50% wage rule.
   - Replace about 900 words of generic "LMS" filler.
   - Add a case study (M&M, Yazaki, Varroc).
   - Legal claims must be checked by labour-law counsel.
2. **Expand the 8 CLMS module pages** to 900-1,200 words each with statutory detail (report 02 §5.3).
3. **Publish P1 pages** (reports 08 and 11):
   - Best CLMS Software in India (2026)
   - Contract labour under the Labour Codes
   - HRMS vs CLMS
   - Form XIII / CLRA register templates
   - Best HRMS for manufacturing
   - Code on Wages 50% rule for payroll
   - Evacuation drill headcount guide
   - `/pricing/`, which also rebuilds a lost live URL
4. **Blog consolidation** (report 11): keep 41, merge 53 into stronger posts, 301 24 to product pages. Move the content first, then redirect. Add named authors and "updated" dates.
5. **Trust on every product page:** `TrustedLogos`, the related testimonials from `lib/testimonials.js`, ISO 27001 with certificate number, and a price-range or "plans from" signal for CFO and procurement buyers.

### Ongoing: authority (critical for top-3)

- **Weeks 1-4:**
  - Claim and complete G2, Capterra, SoftwareSuggest, Techjockey and GoodFirms listings, linking to the matching product page.
  - Run a review drive with existing clients.
  - Set up LinkedIn, Crunchbase, Google Business Profile (Pune), IndiaMART and Justdial.
  - Create a Wikidata entity for Emsphere Technologies. Today "EmSphere" resolves to a Bangkok mall.
- **Months 1-3:**
  - Join NHRDN, CII, MCCIA and NASSCOM.
  - Pitch People Matters, ETHRWorld and HRKatha.
  - Build linkable assets: a Labour Codes compliance guide and PF/ESI/gratuity calculators.
- **Target:** 25-40 new referring domains in 6 months, mostly branded anchors.
- **Avoid:** paid link packages, PBNs and mass directory submission.

---

## 5. Keyword → page ownership (summary)

One page owns each keyword. Blog posts support it and link to it; they don't compete with it. The full matrix is in report 11.

| Primary keyword | Owner page | Current status |
|---|---|---|
| contract labour management system / software | `/contract-labour-management-system-software/` | Strongest topic, but blog posts outrank it |
| hrms software india | `/human-resource-management-system/` | Listicle-dominated SERP. Needs a supporting listicle and comparison pages |
| payroll management software india | payroll page (B2 decision) | Keyword removed. Restore it |
| workforce management system india | `/workforce-management-system/` | Reposition as time, attendance and shift rostering |
| visitor management system | `/visitor-management-system/` | About #1 live. Protect it |
| canteen management system | `/canteen-management-system/` | About #5 live. Rewrite the FAQ for employers |
| emergency headcount / mustering system | `/headcount-management-software/` | Retarget (see above) |

---

## 6. Measuring success (no re-audit needed)

- **Before launch:** set up Google Search Console and Bing Webmaster Tools for the www property. Submit the sitemap and export the current top queries and pages as a baseline.
- **First 4 weeks after launch:**
  - Watch GSC Pages → "Not found" and "Page with redirect" daily.
  - Compare impressions for each owner page against the baseline. A drop of more than 30% on a protected query (visitor, canteen, CLMS) points to a redirect gap.
- **Monthly:** compare positions for the 7 owner keywords in an India rank tracker against competitors, along with new referring domains, review counts, and leads received through the forms.
- **Quarterly:**
  - Re-run `/seo audit`.
  - Run `/seo drift baseline https://www.emsphere.com/` right after launch so later changes can be compared.

---

## 7. Audit limits

- No Google Search Console, GA4, Moz or DataForSEO access. Rankings come from web search snapshots (US-located, with "india" added to queries), not an India rank tracker. There's no search-volume data.
- Performance for the new build is lab-only on an uncompressed local server. Live numbers are PSI and CrUX.
- Lighthouse Agentic and the JS renderer refuse localhost. Re-run them against production after launch.
- AI-answer visibility was inferred from the "best of" articles those engines cite. ChatGPT and Perplexity weren't queried directly.
- Legal and statutory content (Labour Codes, forms) and the rewritten passages in reports 07 and 02 contain [bracketed] claims that the product team and labour-law counsel must verify.
