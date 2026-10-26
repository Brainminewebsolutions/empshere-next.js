# 07 - AI Search / GEO Readiness Audit (emSphere)

Date: 2026-10-23
Scope: new Next.js static export (`out/`, served at http://127.0.0.1:4173/), `public/robots.txt`, live WordPress site https://www.emsphere.com, and off-site brand signals.
Platforms covered: Google AI Overviews and AI Mode, ChatGPT Search, Perplexity, Microsoft Copilot.

## Method and limits
- Raw HTML of `out/*.html` was parsed directly (no JS execution) to see what a non-rendering AI crawler receives.
- Live site checks used curl with a browser User-Agent and with official bot User-Agent strings.
- Off-site checks used DuckDuckGo HTML results, WebFetch on ranking articles, and the Wikipedia, Wikidata and YouTube public endpoints. DuckDuckGo started rate-limiting partway through. G2 and Capterra returned 403 to WebFetch, so their figures come from search snippets.
- **No live ChatGPT, Perplexity or Copilot answers were captured** (no DataForSEO or LLM API access). The competitor visibility table therefore uses the pages those engines most often cite for these queries (top web results and "best X in India" listicles) as a proxy. Re-check with real prompts after launch (see Monitoring).

---

## AI Search Readiness Score: 50 / 100

| Dimension | Weight | Score | Weighted | Main reason |
|---|---|---|---|---|
| Citability | 25% | 45 | 11.3 | FAQs and some definitions exist, but they sit at the bottom of the page, are generic, have no stats or tables, and say nothing about the 2025 Labour Codes |
| Structural readability | 20% | 58 | 11.6 | Good H2/H3 hierarchy and FAQ `<details>` in HTML. Carousels are duplicated, mock-UI text is mixed into content, and the brand and product naming is inconsistent |
| Multi-modal | 15% | 45 | 6.8 | Dashboard images are present. No embedded video, 195 of 280 `<img>` on the CLMS page have empty alt, and screenshots have no captions |
| Authority & brand | 20% | 28 | 5.6 | A Bangkok mall owns the "EmSphere" Wikipedia/Wikidata entity. Review profiles are thin (G2: 2 reviews, SoftwareSuggest: 0). emSphere is absent from every "best CLMS India" list checked. Company stats contradict each other |
| Technical accessibility | 20% | 75 | 15.0 | Static HTML with all content in the source, robots allows every crawler, JSON-LD present. Cloudflare on the live domain returns 403 to bot UAs (needs checking). About and Contact have no schema, and Organization has no `sameAs` |
| **Total** | | | **50** | |

### Platform-specific estimates
| Platform | Score | Notes |
|---|---|---|
| Google AI Overviews / AI Mode | 48 | Indexable SSR content and Googlebot is allowed. Weak because the passages are not quotable and there is no Labour Code content, and that is where 2026 "contract labour compliance" queries are heading |
| ChatGPT Search | 35 | Leans on Bing's index plus listicles and review sites. emSphere is in none of the listicles checked and has 2 G2 reviews |
| Perplexity | 40 | Cites fresh, specific, statistic-dense pages and Reddit/YouTube. emSphere has no Reddit footprint and only a few old YouTube videos |
| Microsoft Copilot | 38 | Uses Bing. Needs Bing Webmaster Tools verification, IndexNow and LinkedIn signals. LinkedIn exists (3,227 followers) but the footer links a non-canonical slug |

---

## AI crawler access

### New site (`public/robots.txt`)
```
User-agent: *
Allow: /
Host: https://www.emsphere.com
Sitemap: https://www.emsphere.com/sitemap.xml
```
There are no bot-specific groups, so every crawler below is allowed implicitly.

| Crawler | Governs | Status (new site) |
|---|---|---|
| Googlebot | Google Search, AI Overviews and AI Mode inclusion | Allowed |
| Google-Extended | Gemini/Vertex training and grounding, plus training of the models behind Search gen-AI features. Has no effect on AI Overviews inclusion | Allowed |
| Bingbot | Bing index, which feeds Copilot and much of ChatGPT Search | Allowed |
| OAI-SearchBot | ChatGPT Search citations | Allowed |
| GPTBot | OpenAI model training only. Says nothing about ChatGPT Search visibility | Allowed |
| Claude-SearchBot | Claude search citations | Allowed |
| ClaudeBot | Anthropic training only | Allowed |
| PerplexityBot | Perplexity search index | Allowed |
| Applebot / Applebot-Extended | Siri/Spotlight discoverability / Apple Intelligence training | Allowed |
| CCBot, cohere-ai | Training | Allowed |

For a B2B lead-gen site this is the right default. Blocking the training bots (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended) is optional and does not affect search citations. Keep every search crawler allowed. The `Host:` line is Yandex-only, so remove it.

### Live site (https://www.emsphere.com)
- WordPress robots.txt only disallows `/wp-admin/`, so all bots are allowed at the robots level.
- **Cloudflare returns 403** to requests carrying GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, bingbot and Googlebot UA strings, and to curl. A browser UA gets 200. Spoofed UAs from non-verified IPs are normally blocked by Cloudflare Bot Fight Mode, so this does **not** prove that the real bots are blocked. It does show that bot filtering is active. Cloudflare's "Block AI bots" / AI Crawl Control can block the genuine OAI-SearchBot, PerplexityBot and Claude-SearchBot even when robots.txt allows them. See finding H1.

### llms.txt / RSL
- `/llms.txt`: missing on the live site (404) and in `out/` (404). Google ignores it and it is not a ranking or citation factor. Low priority (see L4).
- RSL 1.0 licensing: none. Not needed for a lead-gen site.

### Server-side rendering check (new site)
Passes. The static export puts all body copy, H1–H3 and FAQ answers into the raw HTML:
- CLMS page: 13 FAQ Q&As inside `<details>/<summary>` with full answer text in the source; all 12 module cards; compliance section.
- HRMS page: 5 FAQs, all module sections, emSkills stats.
- FAQ blocks are also in raw HTML on the VMS (10), Canteen (11) and Workforce (5) pages. emPay, emCount and the CLMS sub-module pages have **no FAQs**.
- Animated counters ("500+", "15+", "10,00,000+", "10+") have `sr-only` text and an `aria-label`, so the number is in the HTML. The digit-reel spans ("0 1 2 3 4 5 6 7 8 9 ...") still leak into text extraction (trafilatura and similar tools), so mark the reels `aria-hidden="true"` (and check the extractor output).
- JSON-LD: Organization, WebSite, WebPage, BreadcrumbList and SoftwareApplication on product pages; BlogPosting on posts.

---

## Competitor visibility (proxy for AI answers)

Query: **"best contract labour management software India"**, plus "top CLMS software India principal employer compliance". Sources are the top-10 web results and the ranking articles inside them, which are what ChatGPT/Perplexity/AIO typically cite for "best X" prompts.

| Vendor | Appears in | Owns a "best CLMS" listicle? | emSphere mentioned alongside? |
|---|---|---|---|
| Savvy HRMS | #1 in its own "Top 5 CLMS India 2026", plus 2 more ranking posts; ranks for both queries | Yes | No |
| agnihr | Savvy list #2; own CLMS product page ranks for the compliance query | No | No |
| StaffingGo | Savvy list #3 | No | No |
| BeeForce (BlueTree) | Savvy list #4 | No | No |
| BiOKnox CLMS | Savvy list #5; own page ranks for the compliance query | No | No |
| BizHRS | #1 in its own "Top 5 CLMS India" | Yes | No |
| Quikchex | BizHRS list #2 | No | No |
| TeamLease RegTech | BizHRS list #3 | No | No |
| ZingHR | BizHRS list #4; own "7 Best Labour Law Compliance Software" post | Yes | No |
| Keka HR | BizHRS list #5; ZingHR list | No | No |
| SalaryBox | Two long 2026 "buyer's guide" pages with INR pricing and Labour Code coverage | Yes | No |
| InOps | CLRA compliance checklist 2026 | Yes | No |
| Darshan Infosoft | CLMS page ranks for the compliance query | No | No |
| Darwinbox, PeopleStrong, greytHR, SAP SuccessFactors, Oracle HCM | ZingHR compliance list | No | No |
| **emSphere** | **Absent from every listicle checked (Savvy, BizHRS, ZingHR, Wisemonk).** Ranks only for branded queries ("emSphere contract labour management"), where it holds about 6 of 10 results: own pages, SoftwareSuggest, SaaSCounter, LinkedIn, SlideShare, Blogspot | No | n/a |

Takeaways:
1. Every competitor that shows up in AI-cited lists publishes its **own** "best CLMS in India" or buyer's-guide page. Self-published comparison content is currently the main way in.
2. SalaryBox's buyer's guide opens with the **2025 Labour Codes**: CLRA and 28 other laws repealed and replaced by the OSH Code, Code on Wages, Code on Social Security and IR Code, in force since **21 November 2025**. emSphere's CLMS page still speaks in CLRA-era terms ("20+ State and central laws", Form B / Form D). The new-site HTML never mentions the OSH Code or the Code on Wages (0 pages); "Labour Code" appears on 1 page.
3. "Contractor management" queries are dominated by freelancer/EOR tools (Deel, Rippling, Wisemonk), and "contract management" by CLM tools (SpotDraft, Volody). emSphere's pages should define the category explicitly: blue-collar contract labour under the principal-employer model, not freelancers and not contract documents.

---

## Brand and entity signals

| Signal | Finding | Impact |
|---|---|---|
| Wikipedia | The "EmSphere" article is a **shopping mall in Bangkok** (The Mall Group, opened Dec 2023). No article exists for Emsphere Technologies | High: models resolve "EmSphere" to the mall |
| Wikidata | Q114431291 "EMSPHERE", a shopping mall. No item for Emsphere Technologies | High: same collision. Creating an item is feasible (MCA CIN U74900PN2015PTC156602, incorporated 29 Sep 2015) |
| YouTube | A handful of brand videos ("emSphere Contract Labour Management & emWorkforce Product Profile", "emsphere Employee Self Service KIOSK", "Session presented by Emsphere Technologies"). Results are mixed with many Bangkok mall videos. `@emsphere` belongs to someone else | High: YouTube mentions correlate most strongly with AI citations (~0.74) |
| Reddit | No presence found | Medium |
| LinkedIn | in.linkedin.com/company/emspheretechnologies, 3,227 followers, good blue-collar positioning line. Footer links `/company/emsphere-technologies/`, which redirects | Medium |
| Facebook | Search shows facebook.com/emsphere (7,112 followers). Footer links facebook.com/emspheretechnologies/ (could not verify) | Low |
| G2 | Seller page with **2 reviews**. Listed as "Emsphere Time and Attendance" and "emSphere" (Core HR) | High: review platforms are heavily cited for "best X" prompts |
| Capterra | Listed as "emSphere" under an old **/140024/eMpower/** URL slug | Medium: legacy name "eMpower" adds a third name variant |
| SoftwareSuggest | "Emsphere Contract and Labor Management System (emContract)", **0 reviews**. Alternatives shown: xFlow, SAP Ariba, Ironclad (wrong category) | Medium |
| Directories | Tracxn, ZaubaCorp and TheCompanyCheck show incorporation 2015. Justdial says "Established 2018" and has **two listings with different addresses** (Baner, Kothrud) | Medium: NAP and founding-year conflicts |
| Login pages | emscloud.emsphere.com/CLMS and ecloud.emsphere.com/CLMS_MLL are indexed | Low: add `noindex` |

### On-site entity consistency (new site, text occurrences across marketing pages)
- Brand: "Emsphere" 563, "Emsphere Technologies" 255, "emSphere" 162, "EMSPHERE" 2. Organization schema uses "Emsphere Technologies", WebSite uses "Emsphere".
- CLMS product: "emCLMS" 131 vs "emContract" 51. The SoftwareApplication schema says "emContract Labour Management System". The CLMS page also says "LMS" (7 times) and "Emsphere's LMS", which reads as a learning management system.
- Workforce: "emWorkForce" 137 vs "emWorkforce" 55.
- CLMS FAQ: "emSphere HRMS is ready to use the Contract Labour Management System (CLMS) platform", which blurs two products.
- Company facts contradict each other:
  - Users: home "10,00,000+ users", About "2,000,000+ satisfied users" and "over 10 million frontline and corporate workers".
  - Experience: home "15+ years of experience", but incorporation was 2015 (11 years), the CLMS FAQ says the product "evolved over the last 5 years", and Justdial says 2018.
  - Clients: "500+ clients" is used for the whole company (home) and for CLMS alone (CLMS H1 intro).

When sources disagree, AI systems either skip the number or cite the wrong one.

---

## Findings

### Critical

**C1. emSphere is invisible in non-branded AI answers for its core category.**
- Evidence: not present in any of the 4 "best CLMS / compliance software India" lists checked. About 15 competitors are named instead (table above). Branded queries work.
- Why it matters: AI engines put together "best X in India" answers from listicles, review sites and vendor comparison pages. With no third-party or first-party comparison content, emSphere cannot be retrieved for these prompts.
- Fix (effort: L, ongoing):
  1. Publish a first-party pillar page, "Contract Labour Management Software in India: 2026 Buyer's Guide (Labour Codes edition)". Include a criteria table (Labour Code formats, principal-employer registers, PF/ESIC ECR validation, gate-pass/biometric integration, SAP integration, on-prem vs cloud, implementation time) and an honest vendor comparison that includes emSphere.
  2. Pitch inclusion in the listicles that already rank (BizHRS, Savvy, ZingHR, SalaryBox, SoftwareSuggest category pages, SourceForge "contractor management India").
  3. Get 15–30 G2/Capterra reviews from named clients already on the site (Mahindra & Mahindra, Nerolac, Kores, Varroc, Yazaki, Vishay, Yashaswi).

**C2. Core CLMS content is out of date with the 2025 Labour Codes.**
- Evidence: the Labour Codes took effect on 21 November 2025, consolidating 29 central laws (CLRA 1970 is subsumed into the OSH Code 2020). The new-site HTML has 0 mentions of "OSH Code" or "Code on Wages". The CLMS page lists CLRA-era forms (Form B, Form D, "Annual return of principal employer") and "20+ State and central laws". Competitors (SalaryBox) lead with Labour Code content.
- Why it matters: AI engines strongly prefer fresh, specific compliance answers. "Contract labour compliance India 2026" prompts will cite pages that explain the Codes.
- Fix (effort: M): add a "Labour Codes and contract labour" section to the CLMS page and the `/clms-compliances-statutory-reports/` page (see the rewritten passage below). State exactly which Code-era registers and returns emContract produces and the transition status of state rules. **The product team and labour-law counsel must confirm product capability and the legal details before publishing.**

### High

**H1. Confirm that Cloudflare lets the real AI search crawlers through.**
- Evidence: the live domain is behind Cloudflare and returns 403 to every bot UA tested, including curl. robots.txt allows everything.
- Fix (effort: S): in Cloudflare > Security > Bots / AI Crawl Control, check that OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, Bingbot, Googlebot and Applebot are **allowed** (verified bots). Turn off "Block AI bots" for search bots, or apply it only to training bots if you want. Check the Cloudflare bot analytics for 403s to these agents. Re-test after the new static site goes live on whichever host or CDN is chosen.

**H2. Entity collision with the Bangkok "EmSphere" mall, and no own knowledge-graph entity.**
- Fix (effort: M):
  - Create a Wikidata item "Emsphere Technologies Private Limited". Include instance of business, country India, HQ Pune, inception 2015-09-29, official website, CIN, LinkedIn ID, and products as separate items or "product or material produced" values.
  - Always pair the name with a disambiguator on-site and off-site: "emSphere (Emsphere Technologies Pvt. Ltd., Pune)".
  - Extend the Organization JSON-LD with `legalName`, `alternateName` ["emSphere", "Emsphere"], `foundingDate`, `address` (Baner, Pune 411045), `contactPoint`, `sameAs` (LinkedIn canonical URL, verified Facebook, X, YouTube, G2, Capterra, Wikidata), and `identifier` (CIN). Add Organization/ContactPage schema to `/about-us/` and `/contact-us/`, which currently have **no JSON-LD**.

**H3. Brand, product and company facts conflict with each other.**
- Fix (effort: S):
  1. Choose one display brand ("emSphere"), one legal name ("Emsphere Technologies Pvt. Ltd.") and one name per product: emContract, emHRMS, emPay, emWorkForce, emVisit, emMeal, emCount. Retire "emCLMS" as a product name, or keep it only as "emContract (CLMS)".
  2. Replace "LMS" with "CLMS" on the CLMS page.
  3. Agree one figure each for users, clients, years and founding year, and use it on every page, in schema, on LinkedIn, G2, Capterra and Justdial.
  4. Fix the Justdial duplicate address and the "Established 2018" entry. Ask Capterra to rename the legacy "eMpower" listing.

**H4. Passages are not quotable: no definition at the top, no Q&A in the first screen, no numbers with sources.**
- Evidence:
  - CLMS: the best definition ("A contract labor management system is a structured approach...") is FAQ #11 of 13, near the bottom. It uses US spelling ("labor") and describes freelancers and independent contractors, which is the wrong category for Indian principal employers.
  - The H1 intro is a 50-word run-on sentence ("helping industrials teams..."). The 7 feature and 7 "Why choose" blocks are generic text that would fit any vendor ("cutting-edge technology", "tailored solutions").
  - HRMS: there is no definition of HRMS on the page at all. The H1 intro does not name the product or the company.
- Fix (effort: M): see the rewritten passages below. Pattern for every section:
  1. A 40–60 word direct answer first.
  2. Then specifics: forms, laws, integrations, time-frames, customer proof.
  3. Phrase H2/H3 headings as the buyer's question.

**H5. No review or third-party proof on high-intent platforms.**
- Evidence: G2 has 2 reviews, SoftwareSuggest has 0, Reddit has nothing, YouTube has a few dated videos.
- Fix (effort: M, ongoing):
  - Run a review campaign.
  - Publish 3–5 short YouTube demos with chapters and transcripts, embedded on product pages with VideoObject schema. Suggested topics: "emContract: Form XIII/Code-era registers in 3 minutes", "PF/ESIC ECR validation", "Contractor billing".
  - Post named case studies (for example, the Mahindra 40,000+ contract labourers deployment) as standalone pages that state the customer, the scale, the problem, and outcomes in numbers.

### Medium

**M1. HRMS page metadata calls the product "SAP HRMS Software".** The title is "Human Resource Management System, SAP HRMS Software". emSphere is not SAP. This sends the wrong entity signal and AI engines may treat emSphere as an SAP module. Use "emHRMS: HRMS Software for Indian Enterprises (SAP-integrable) | emSphere". (Effort: S)

**M2. Statistic error on the HRMS page.** "87M of McKinsey Global Survey respondents" should be "87%". The Korn Ferry, McKinsey and LinkedIn stats have no links. Add source links and years, and update the 2018 LinkedIn stat. Wrong numbers damage the trustworthiness of the whole page. (Effort: S)

**M3. Mock-UI text is mixed into the extracted content.** Hero illustrations are built from live HTML text, for example:
- emPay: "NET DISBURSABLE ₹ 84,520"
- emWorkForce: "TOTAL STAFF 24,580 ● 98.6% SHIFT COVERAGE"
- emCount: "TOTAL ACTIVE HEADCOUNT 1,428"
- CLMS sub-pages: "UAN validated ... PF amount mismatch"

An AI engine can quote these as real statistics. Mark the mock panels `aria-hidden="true"`, render them as SVG/images with alt text, or wrap them in `<figure>` with a `<figcaption>` "Illustrative dashboard". (Effort: S–M)

**M4. Duplicated carousel content.** On the CLMS page, modules 09–12 and 01–04 appear twice (infinite-loop clones), so the same H3s are repeated. Render the clones with `aria-hidden` and without heading tags, or clone only on the client side. (Effort: S)

**M5. No comparison tables anywhere on product pages** (0 `<table>` elements). Add a "CLMS vs HRMS vs Payroll: which do you need?" table and a "Manual registers vs emContract" table. Tables are among the most-extracted formats in AI Overviews and Perplexity. (Effort: S)

**M6. emPay, emCount and the 8 CLMS sub-module pages have no FAQs.** Add 4–6 buyer questions per page with direct 40–80 word answers. FAQPage schema no longer earns rich results for most sites, so the visible Q&A text is what matters. (Effort: M)

**M7. Blog authority is thin.** Posts are bylined "Emsphere Team", and BlogPosting `author` points to the Organization. About 20 near-duplicate CLMS and "-pune" posts compete with the product pages (see 01-technical-seo). Use named authors with a Person page, role and LinkedIn link (for example the founder, who has 18+ years in HR tech, or a compliance lead). Add "Reviewed by" for legal topics. Merge duplicate posts into the pillar page. (Effort: M)

**M8. Images.** 195 of 280 `<img>` on the CLMS page have `alt=""`, mostly duplicated client logos. That is fine for decorative clones, but the first instance of each client logo and every dashboard screenshot needs descriptive alt text. Dashboard screenshots should also have a visible caption ("Contractor-wise headcount and OT report, emContract"). (Effort: S)

### Low

**L1.** Footer social links point to non-canonical or possibly wrong profiles (LinkedIn `/company/emsphere-technologies/` redirects to `/company/emspheretechnologies/`; Facebook `/emspheretechnologies/` vs `/emsphere/`). Use the canonical URLs in both the footer and `sameAs`. (S)

**L2.** Indexed client login pages on emscloud.emsphere.com and ecloud.emsphere.com should send `X-Robots-Tag: noindex`. (S)

**L3.** Remove the `Host:` line from robots.txt. Optionally add per-bot groups if the business wants to opt out of training (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended, cohere-ai) while keeping OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot and Bingbot allowed. (S)

**L4.** `/llms.txt` is optional. Google ignores it and there is no evidence it increases citations. If added, keep it short: one line per product with its canonical URL, plus the company fact sheet and contact. (S)

**L5.** After launch, verify the site in Bing Webmaster Tools and enable IndexNow (for example via the deploy pipeline). This speeds up Copilot and ChatGPT discovery of the new URLs. (S)

---

## Top 5 highest-impact changes

| # | Change | Platforms helped | Effort |
|---|---|---|---|
| 1 | Rewrite the CLMS page for the Labour Codes, with a definition first and question-headed sections (C2, H4) | AIO, AI Mode, Perplexity, ChatGPT | M (3–5 days including legal review) |
| 2 | Publish an "Contract labour management software in India: 2026 buyer's guide" with a comparison table, and pitch the existing listicles (C1) | ChatGPT, Perplexity, Copilot | L (2–3 weeks) |
| 3 | Run a review drive (G2, Capterra, SoftwareSuggest), publish 3–5 YouTube demos with transcripts, and add named case-study pages (H5) | ChatGPT, Perplexity, AIO | M (ongoing, 6–8 weeks) |
| 4 | Entity cleanup: one brand and one name per product, consistent stats, Wikidata item, expanded Organization schema with `sameAs`, schema on About and Contact (H2, H3) | All | S–M (2–4 days) |
| 5 | Confirm the Cloudflare / host bot settings allow the search crawlers, then set up Bing Webmaster Tools and IndexNow at launch (H1, L5) | ChatGPT, Copilot, Perplexity, Claude | S (half a day) |

---

## Rewritten example passages

Note: statements in [brackets] need confirmation by the product team or labour-law counsel before publishing. Everything else is taken from facts already on the site.

### CLMS page: `/contract-labour-management-system-software/`

**Suggested H1:** emContract: Contract Labour Management System (CLMS) for Indian Principal Employers

**Opening passage (directly under H1, ~120 words):**
> emContract is a contract labour management system (CLMS) from emSphere (Emsphere Technologies Pvt. Ltd., Pune) for principal employers that engage contract workers through labour contractors. It takes each contract worker from manpower request and onboarding through gate pass, biometric attendance, shifts and overtime, wage calculation and contractor billing. It also tracks contractor licences, PF/ESIC challans and statutory registers in one place. Manufacturers such as Mahindra & Mahindra use emContract to govern more than 40,000 contract labourers across multiple plants. emContract integrates with SAP and other ERPs and with existing biometric and face-recognition devices, runs on-premise or in the cloud, and typically goes live in 6–8 weeks.

**H2: What is a contract labour management system?**
> A contract labour management system is software that a principal employer uses to control and prove compliance for workers supplied by third-party contractors. In India, the principal employer shares liability for contract workers' wages, PF, ESIC, working hours and safety. A CLMS therefore checks contractor licences and work orders, records attendance and overtime at the gate or on the shop floor, verifies that contractors have paid wages and statutory dues, and generates the registers and returns that labour inspectors ask for. It is different from freelancer or "contractor management" tools (which pay independent contractors) and from contract lifecycle management tools (which manage legal agreements).

**H2: How does emContract handle the new Labour Codes?**
> India's four Labour Codes came into force on 21 November 2025, replacing 29 central laws. They include the Contract Labour (Regulation and Abolition) Act, 1970, whose provisions now sit in the Occupational Safety, Health and Working Conditions (OSH) Code, 2020, with wages governed by the Code on Wages, 2019 and PF/ESIC by the Code on Social Security, 2020. emContract [has been updated to] generate Code-era registers and returns [list exact forms], alongside state-specific formats where state rules are still in transition. It also continues to block gate entry automatically when a contractor licence or work order expires, when a worker exceeds overtime limits, or when a worker has worked continuously without a weekly off. [Confirm OSH Code applicability threshold and licence validity with counsel before stating them.]

**H2: Which compliance tasks does emContract automate?**
| Task | What emContract does |
|---|---|
| Contractor licence and work-order validity | Alerts before expiry; blocks gate pass after expiry |
| PF/ESIC verification | Contractors upload ECR challans in the contractor portal; AI compares PF/ESIC amounts against attendance and wages and flags mismatches |
| Working-hours limits | Flags overtime-limit breaches and continuous working without a weekly off |
| Statutory registers and returns | Generates central and state formats: registers of contractors, overtime, wages and muster roll, wage slips, employment cards, annual return of principal employer, inter-state migrant worker records [update to Code-era names] |
| Safety (OSH) records | Background check, police verification, medical fitness, induction, training and PPE issue per worker |

**H3 (FAQ) rewrite: How long does emContract take to implement?**
> Most emContract deployments go live in 6–8 weeks. The exact time depends on the number of plants, contractors and biometric devices, and on whether SAP or ERP integration is in scope. emContract is a configurable product rather than a custom build. Statutory formats, shift rules, overtime policies and contractor billing rates are set up during implementation, not coded from scratch.

Also remove or rewrite on this page:
- Drop "Emsphere's LMS" throughout.
- Drop the generic "Why choose" cards (tailored solutions, cutting-edge technology).
- Drop "Employee Self-Service Portal: request time off". Contract workers do not usually apply for leave in the principal employer's system, so this weakens category clarity.
- Fix the FAQ answer that says "emSphere HRMS is ready to use the CLMS platform".

### HRMS page: `/human-resource-management-system/`

**Suggested title:** emHRMS: HRMS Software for Indian Enterprises | emSphere, Pune
**Suggested H1:** emHRMS: One HRMS for the Full Employee Lifecycle, Built for Indian Enterprises

**Opening passage (~110 words):**
> emHRMS is a human resource management system (HRMS) from emSphere (Emsphere Technologies Pvt. Ltd., Pune) that runs the full employee lifecycle on one platform. It covers recruitment, onboarding, employee records, attendance, leave and shifts, payroll, performance, learning, expenses, HR helpdesk and exit. Payroll handles Indian statutory deductions (PF, ESIC, professional tax and TDS), and the emMobile app gives employees self-service on Android and iOS, including GPS and geo-fenced attendance. emHRMS is licensed on-premise or as a cloud subscription on Microsoft Azure. It typically goes live in 6–10 weeks, and for companies that also use contract labour it connects with emContract.

**H2: What is an HRMS?**
> A human resource management system (HRMS) is software that stores employee data and automates HR processes such as hiring, onboarding, attendance and leave, payroll, appraisals and exits, so HR teams stop working from spreadsheets and paper files. A full HRMS combines a core employee database with payroll and talent modules, plus self-service for employees and managers. In India, the payroll and attendance modules also have to apply statutory rules: PF, ESIC, professional tax, TDS and state leave and holiday rules.

**H2: Which modules does emHRMS include?**
| Module | What it does |
|---|---|
| emRecruit | Manpower requisition, resume parsing, interview scheduling, offers, background verification, agency management |
| emWelcome | Digital offer acceptance, document upload, e-signature, orientation and asset alerts |
| Employee information | Employee master, history, skills, promotions and ratings |
| emWorkForce | Attendance (biometric, mobile GPS, geo-fence), shifts (flexi, night, break), overtime rules, leave and comp-off |
| emPay (add-on) | Salary, arrears, reimbursements, loans, payslips; PF, ESIC, PT and TDS |
| emMobile ESS | Attendance, leave, payslips, tax and investment declarations on Android and iOS |
| emPerformance | Goal tracking, self and reviewer appraisal, gap and training-need analysis |
| emSkills | Personalised learning paths |
| emExpense / emHelpDesk | Travel and expense claims; HR query ticketing with escalation |
| emExit | Resignation workflow, clearance, full-and-final settlement, Form 16 and relieving letter |
| Workforce analytics | Leadership dashboards for attrition, overtime cost, attendance and demographics |

**H2: HRMS vs CLMS vs payroll software: which do you need?**
| | emHRMS | emContract (CLMS) | emPay |
|---|---|---|---|
| Who it covers | Your own (on-roll) employees | Contract workers supplied by contractors | On-roll employees' salaries |
| Main job | Full employee lifecycle | Contractor compliance, gate pass, attendance and billing | Salary processing and statutory deductions |
| Typical buyer | HR head | Plant HR / IR and compliance teams | Payroll and finance |
| Go-live | 6–10 weeks | 6–8 weeks | [confirm] |

Also fix on this page:
- "87M" should be "87%" (McKinsey). Link the Korn Ferry, McKinsey and LinkedIn sources with their years, and replace the 2018 LinkedIn stat with a current one.
- Remove "SAP HRMS" from the title and meta. Say "integrates with SAP" in the body instead.
- Back up or remove "reduce day-to-day work effort by 40%" (homepage product card) with a named customer or method.

---

## Monitoring (post-launch)
- Run a monthly prompt panel in ChatGPT (search on), Perplexity, Copilot, and Google AI Mode/AIO. Suggested prompts: "best contract labour management software India", "CLMS software for manufacturing plants", "how to manage contract labour compliance under the OSH Code", "HRMS software Pune", "canteen management system India", "visitor management system India". Log whether emSphere is mentioned or cited, which URL, and which competitors appear.
- Watch Cloudflare and server logs for OAI-SearchBot, PerplexityBot, Claude-SearchBot, Bingbot and Googlebot hits on the product pages, and ChatGPT-User and Perplexity-User hits (these are live user fetches).
- In GA4, track referral traffic from chatgpt.com, perplexity.ai and copilot.microsoft.com.
