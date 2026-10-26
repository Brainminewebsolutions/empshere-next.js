# 11 - Keyword Clusters and Hub-and-Spoke Content Plan (emSphere)

**Site:** https://www.emsphere.com (Emsphere Technologies, Pune - B2B HR / workforce software)
**Date:** 2026-10-23
**Inputs:** 7 seed keywords, 7 product hubs + 8 `/clms-*` module pages (`app/`), 118 blog posts (`data/blog-posts.json`), about 45 SERP lookups
**Scope:** analysis only. No project source files were changed.

---

## 0. Executive summary

| # | Finding | Severity |
|---|---|---|
| 1 | **196 broken internal links in 89 of 118 blog posts.** Body links point to `/blog/contract-labour-management-system-software/`, `/blog/headcount-management-software/` and similar paths. `deploy/wordpress-blog.htaccess` rewrites everything under `/blog/` to `/blogs/`, so these links 404. Only **13 working blog-to-product links exist, in 8 posts**, and there are **3** blog-to-blog links. So the blog passes almost no internal equity to the product pages. | Critical |
| 2 | **Heavy self-cannibalization.** The query "contract labour management system benefits features" returned **5 emSphere URLs in one SERP**. "contract labour management system India" returned **2 competing emSphere posts**. The CLMS hub page did not appear in any CLMS SERP checked; old blog posts rank in its place. There are 39 CLMS/labour posts, and about 20 target the same "benefits / why you need a CLMS" intent. | Critical |
| 3 | **Google indexes WordPress shortlinks (`/?p=10200`, `/?p=16264`, `/?p=27034`, ...) rather than the canonical `/blog/<slug>/` URLs.** 17 different `?p=` URLs appeared in the SERPs. The root rewrite hands `?p=` requests to WordPress, so these URLs split signals. (Fix belongs in 01-technical-seo: 301 each `?p=<id>` to its slug. The id-to-slug map is in `data/blog-posts.json` `id`.) | High |
| 4 | **The 8 CLMS module pages are orphans.** The hub's `modules` cards (`app/contract-labour-management-system-software/page.jsx` around L226) have no `href`. The module pages do not link back to the hub. The Header and Footer do not list them. The sitemap is the only path to them. | High |
| 5 | **Product-page keyword mismatches.** (a) The payroll page title and H1 say "emPay Management System" and never "payroll software", but the seed term is "payroll software india". (b) The SERP for "headcount management software" is about HR headcount *planning* (Factorial, Workday, Abacum). emSphere's product does real-time on-premise people counting and emergency mustering, and that SERP is winnable: emSphere already holds 4 of 9 results. (c) The HRMS title leads with "SAP HRMS Software". (d) The HRMS page links to `/products/emworkforce` 5 times, and that route does not exist. | High |
| 6 | **Head-term clashes between blog and product pages.** 14 posts copy a product page's head term or title. Examples: `workforce-management-system-scheduling` reuses the WFM product title "Workforce Management System India". `canteen-management-simplify-with-the-emmeal-system` reuses the canteen H1. `headcount-and-staffing-management-system` reuses the headcount title. | High |
| 7 | **Content gaps cluster around the Labour Codes (in force since 21-Nov-2025).** Topics include principal-employer liability under the OSH Code, the 50% wage rule for payroll, the CLRA/OSH compliance checklist, and contractor PF/ESIC verification. Competitors (myndsolution, pockethrms, aparajitha, taxguru) hold these SERPs, and emSphere has nothing published on them. | High (opportunity) |

**Plan in one line:** 7 product hubs, each owning its commercial head term, plus 7 informational blog pillars and 19 cluster spokes. 41 existing posts are kept. 77 thin or duplicate posts are consolidated (53 merged, 24 redirected to product pages). 16 new posts are planned (P1: 5, P2: 8, P3: 3). Every blog post links to its product hub and every hub links back.

---

## 1. Method and caveats

- **SERP source:** the built-in WebSearch tool returns about 9 organic results per query and is **US-geolocated**, so it cannot be set to google.co.in. To approximate Indian SERPs, I added "india" and Indian statutory terms (CLRA, PF/ESI, DPDP) to the variants. **Read the overlap scores as directional.** Re-check the P1 pairs in an India-located rank tracker (Semrush or Ahrefs, database "IN") before the 301s go live.
- **Overlap scoring:** count of URLs shared in the top results of both queries. Thresholds: 7-10 = same post, 4-6 = same cluster, 2-3 = interlink, 0-1 = separate. A domain-level count (same domain, different URL) is shown in brackets where it helps.
- **No search-volume data** was available. Pillar choice is based on SERP breadth and commercial value, not volume.
- **Intent:** Navigational keywords ("labour management system login", brand queries) are excluded from clustering.

---

## 2. Keyword universe and intent (48 keywords)

| Seed family | Keyword | Intent | SERP format observed | Owner (see section 4) |
|---|---|---|---|---|
| CLMS | contract labour management system software | Commercial/Transactional | Vendor product pages, Capterra, IndiaMART | `/contract-labour-management-system-software/` |
| CLMS | contract labour management software | Commercial/Transactional | Same as above (overlap 6-7) | same product hub |
| CLMS | contract labour management system india | Informational | Guides, PSU portal (NALCO), Ramco case, emSphere blogs | Blog pillar `contract-labour-management-indian-principal-employers` |
| CLMS | contract labour management system benefits / features | Commercial-investigation | Listicles (oneflow + **5 emSphere URLs**) | `top-5-benefits-of-implementing-a-contract-labour-management-system` |
| CLMS | how to choose CLMS / CLMS features checklist | Commercial-investigation | Thin; no strong owner | `5-essential-features-to-look-for-in-a-clms...` (re-angled) |
| CLMS | HRMS vs CLMS | Commercial-investigation | Glossaries (asanify), techjockey; emSphere x2 | NEW (P1) |
| CLMS | CLRA compliance checklist principal employer | Informational | Compliance guides (myndsolution x3, CAG, registerkaro) | `contract-labour-management-system-india-compliance-guide` (re-angled) |
| CLMS | contract labour under new labour codes / OSH Code principal employer | Informational | Law-firm alerts (EY, KPMG, LKS, aparajitha) | NEW (P1) |
| CLMS | contract labour compliance software | Commercial | eSparsh, Iddion, EHS | `/clms-compliances-statutory-reports/` |
| CLMS | contractor management system india | Commercial | Wisemonk (freelancer intent), mynd, emSphere | `/clms-contractor-portal/` + interlink |
| CLMS | gate pass management system for contract workers | Commercial | Odoo apps, Frenzin, Chevron portal | `/clms-onboarding-gatepass-management/` + NEW spoke |
| CLMS | labour attendance app for contractors | Commercial | Truein, HajariBook, emSphere `?p=27065` | `your-factory-in-your-pocket...` |
| CLMS | contract labour shift and overtime management | Commercial | (module intent) | `/clms-attendance-shift-overtime-management/` |
| CLMS | contractor billing / wage reconciliation | Commercial | Construction billing tools; no CLMS owner yet | `/clms-wages-contractor-billing/` + NEW spoke |
| CLMS | contract labour payroll / minimum wages | Informational | mynd, greytHR notifications, UKG docs | NEW (P3) |
| CLMS | contractor PF ESIC ECR verification | Informational | (gap; matches emSphere's "AI PF/ESIC comparison" feature) | NEW (P2) |
| CLMS | manpower planning for contract labour | Commercial | (module intent) | `/clms-manpower-planning/` |
| CLMS | labour management system | Informational (global, warehouse LMS) | Glossaries, US/warehouse vendors | `comprehensive-labour-management-system` (re-angled as LMS vs CLMS) |
| CLMS | inter-state migrant workmen compliance | Informational | (gap) | NEW (P3) |
| HRMS | hrms software india | Commercial (best-of) | Competitor "best HRMS" listicles | `/human-resource-management-system/` + NEW best-of |
| HRMS | best hr software india | Commercial (best-of) | Competitor listicles (greytHR, Keka, ZingHR) | NEW best-of (same post as above, overlap 0 URL but same format) |
| HRMS | human resource management system | Informational (definition) | Wikipedia, glossaries | `/human-resource-management-system/` (product) + `benefits-of-human-resource-management-system` |
| HRMS | hrms for manufacturing industry india | Commercial | Hono, Pocket HRMS x5, Fuzen | NEW (P1) |
| HRMS | benefits of hrms | Informational | listicles | `benefits-of-human-resource-management-system` |
| HRMS | performance management system | Informational | (glossary/listicle) | `performance-management-system-adapting-times` |
| Payroll | payroll software india | Commercial (best-of) | Competitor listicles (pockethrms, factoHR, Darwinbox, Capterra IN) | `/empay-management-solution/` (needs retitle) |
| Payroll | payroll management system | Informational (definition) | ADP, SAP, Zoho, Rippling explainers | Blog pillar `payroll-management-system-and-everything-you-need-to-know` |
| Payroll | payroll software for manufacturing india | Commercial | Kredily, INDPayroll, LEDGERS | NEW (P2) |
| Payroll | payroll compliance checklist india PF ESI PT LWF | Informational | Checklists (petpooja, mynd, paybooks) | `payroll-management-system-compliance-india` (re-angled) |
| Payroll | labour codes 50% wage rule payroll | Informational | taxguru, freefincal, embee | NEW (P1) |
| Payroll | benefits of payroll software | Informational | - | `pros-of-payroll-software-for-competitive-businesses` (re-angled) |
| WFM | workforce management system india | Commercial | ZingHR, HROne listicles, emSphere `?p=31020` | `/workforce-management-system/` |
| WFM | workforce management software | Informational (global) | UKG, ADP glossaries | Blog pillar `workforce-management-system-scheduling` (re-angled) |
| WFM | benefits of workforce management system | Informational | - | `benefits-of-effective-automated-workforce-management-system` |
| WFM | attendance management system india / biometric | Commercial | Keka, sumHR, quikchex listicles | `attendance-management-system-and-its-features` |
| WFM | biometric attendance system how it works | Informational | explainers | `what-is-a-biometric-attendance-system-and-how-does-it-work` |
| WFM | time and attendance software for shift workers | Commercial | Keka, factoHR, TimeCheck | `can-cloud-based-time-and-attendance-...` (re-angled) |
| WFM | shift scheduling / overtime rules factory india | Informational | mynd, Pocket HRMS | NEW (P2) |
| WFM | leave management system india | Commercial (best-of) | listicles | `leave-management-system` |
| VMS | visitor management system | Informational (definition) | Wikipedia, glossaries, buyer guides | Blog pillar `visitor-management-system-vms-and-how-it-works` + product |
| VMS | visitor management system india | Commercial | studiomatrx guides, SourceForge, emSphere `?p=10236` | `/visitor-management-system/` |
| VMS | visitor management software | Commercial (best-of) | Capterra/SoftwareAdvice/G2 | `/visitor-management-system/` |
| VMS | visitor management system for factories | Commercial | acre, vizito, friendlyway | `digital-visitor-management-system-manufacturing` |
| VMS | visitor data DPDP Act | Informational | studiomatrx, miniorange | NEW (P2) |
| Canteen | canteen management system | Commercial | Mantra, Matrix, **emsphere product page**, eSparsh | `/canteen-management-system/` |
| Canteen | canteen management system software india | Commercial (best-of) | MealPe x6, emSphere blog `?p=28603` | Blog pillar `how-canteen-management-system-corporate-dining-india` |
| Canteen | industrial canteen / biometric coupon / payroll deduction | Commercial | SpaceBasic x6, Mantra | `canteen-management-solution-replacement-printing-canteen-coupons` (re-angled) |
| Headcount | headcount management software | Commercial (**HR planning intent, mismatch**) | Factorial, Workday, Abacum | secondary target only |
| Headcount | real-time headcount / people count factory | Commercial | **emSphere holds 4 of 9 results**, APS | `/headcount-management-software/` (retitle) |
| Headcount | emergency evacuation headcount / mustering software | Commercial | **emSphere x3**, Softdesigners, friendlyway | `headcount-software-helps-track-employees-emergency` |

Navigational, excluded: "labour management system login" (kept at `personalizing-the-labour-management-system-login...`), "emsphere", "emcontract", "empay login".

---

## 3. SERP overlap matrix (URL-level; domain-level in brackets)

### 3.1 Within-family pairs

| Keyword A | Keyword B | Shared URLs | Decision |
|---|---|---|---|
| contract labour management software | contract labour management system software | **6-7** (Capterra, SoftwareAdvice, IndiaMART, emSphere `?p=12845`, `?p=14613`, five-ways/`?p=10200`) | **Same page**: product hub owns both |
| contract labour management software | CLMS benefits features | 3 (`?p=14613`, `?p=10233`, `?p=10200`) | Interlink; separate post (benefits listicle) |
| contract labour management system india | contract labour management system software | 0 [mynd domain 0] | Separate: "india" switches the SERP to informational/compliance, so a **blog pillar** is needed |
| contract labour management system india | contractor management system india | 1 (`?p=27034`) | Separate |
| CLMS principal employer CLRA | CLRA compliance checklist | 3 (3 myndsolution URLs) | Interlink; checklist is a spoke under the compliance cluster |
| CLRA compliance checklist | labour codes contract labour | 0 [taxguru 1] | Separate spokes in the same compliance cluster (topical link) |
| contract labour compliance software | contract labour management system software | 2 (eSparsh x2) [Iddion domain] | Interlink: compliance module page |
| contract labour payroll / minimum wages | contractor billing reconciliation | 1 (petpooja) | Separate spokes, same Wages cluster |
| labour management system | contract labour management system software | **0** | **Different intent.** Stop targeting "labour management system" with about 15 posts; keep one bridge explainer |
| labour attendance app | gate pass for contract workers | 0 | Separate spokes, same Operations cluster |
| HRMS vs CLMS | CLRA principal employer | 1 (`?p=10182`) | Separate |
| hrms software india | best hr software india | 0 [0] - both are best-of listicles | One NEW best-of post covers both (same format; differentiate by H2s) |
| hrms software india | hrms for manufacturing india | 0 [pockethrms, gshrm = 2] | Interlink |
| hrms software india | human resource management system | 0 [quikchex 1] | Separate (definition vs best-of) |
| payroll software india | payroll management system | 0 | Separate: product (commercial) vs blog pillar (definition) |
| payroll software india | payroll software manufacturing | 0 [kredily 1] | Separate spoke |
| payroll compliance checklist | labour codes 50% wage | 0 [pockethrms 1] | Separate spokes, same compliance cluster |
| labour codes 50% wage | labour codes contract labour | 1 (taxguru 50% article) | Cross-cluster interlink (CLMS-compliance to Payroll-compliance) |
| workforce management system india | workforce management software | 0 | Separate: product (india, commercial) vs blog pillar (global, informational) |
| attendance mgmt india biometric | time & attendance shift workers | 0-1 [keka 2] | Same cluster, separate posts |
| attendance mgmt india biometric | leave management india | 0 [quikchex 1] | Separate clusters |
| shift scheduling / OT factory | time & attendance shift workers | 0 [sourceforge 1] | Same cluster (Shift/Leave), interlink |
| visitor management system india | visitor data DPDP | 2 (studiomatrx x2) | Interlink, same Industry/Compliance cluster |
| visitor management system india | visitor management software | 0 | Product page owns both commercial terms; the SERPs differ (directories vs guides) |
| visitor management system | VMS for factories | 0 | Separate (pillar vs spoke) |
| canteen management system | canteen mgmt software india | 1 (Mantra) [openeducat 1] | Separate: product owns head term; blog pillar owns "india/best" guide |
| canteen mgmt software india | industrial canteen biometric coupon | 1 (`?p=28603`) | Separate spoke |
| real-time headcount factory | emergency mustering headcount | **3** (emSphere `?p=10209`, `?p=7756`, `?p=10247`) | Interlink: pillar + spoke under one hub |
| headcount management software | real-time headcount factory | **0** | **Intent mismatch**: retitle product page to the real-time / mustering intent |

### 3.2 Cross-family (pillar vs pillar)
Every pair of the seven seed head terms has 0 shared URLs (for example "hrms software india" vs "payroll software india", "workforce management system india" vs "contract labour management system software", "visitor management system india" vs "canteen management system"). **Each product line needs its own hub.** One "HR software" mega-pillar would not work. Cross-hub links are optional and topical (section 7.3).

---

## 4. Architecture: 7 hubs (product page = commercial owner, blog pillar = informational owner)

Rule: the product page owns the commercial/transactional head term. One blog pillar per hub owns the informational "guide / what is" term and links up to the product page. Spokes own one long-tail keyword each and link to the pillar and the product page.

### Hub 1 - Contract Labour Management (largest; 4 clusters)
- **Commercial owner:** `/contract-labour-management-system-software/`. Keywords: contract labour management system software, contract labour management software, CLMS software. Suggested title: "Contract Labour Management System (CLMS) Software India | Emsphere" (the current title "...Contract Worker" reads as truncated).
- **Informational pillar:** `/blog/contract-labour-management-indian-principal-employers/`. Keyword: contract labour management in India. 1,632 words now; expand to 3,000-3,500 by absorbing 2 merged posts. Template: `ultimate-guide`.
- **Module pages (commercial spokes of the hub):** the 8 `/clms-*` pages.

| Cluster | Spoke (URL / status) | Primary keyword | Template | Words | Module page it supports |
|---|---|---|---|---|---|
| C1 Evaluation | `top-5-benefits-of-implementing-a-contract-labour-management-system` (owner, expand) | contract labour management system benefits | listicle | 1,500 | hub |
| C1 Evaluation | `5-essential-features-to-look-for-in-a-clms...` (re-angle) | how to choose a CLMS / CLMS features checklist | how-to (buyer checklist) | 1,500 | hub |
| C1 Evaluation | **NEW** `hrms-vs-clms-contract-labour` (P1) | HRMS vs CLMS | comparison | 1,500 | hub + `/human-resource-management-system/` |
| C2 Compliance | `contract-labour-management-system-india-compliance-guide` (re-angle; keep slug) | CLRA compliance checklist for principal employers | how-to/checklist | 1,600 | `/clms-compliances-statutory-reports/` |
| C2 Compliance | **NEW** `contract-labour-labour-codes-principal-employer-obligations` (P1) | contract labour under labour codes / OSH Code principal employer | explainer | 1,800 | `/clms-compliances-statutory-reports/` |
| C2 Compliance | **NEW** `clra-registers-forms-principal-employer` (P2) | CLRA registers and forms (Form XII, XIII, muster roll, wages register) | listicle | 1,400 | `/clms-compliances-statutory-reports/` |
| C2 Compliance | **NEW** `inter-state-migrant-workers-compliance` (P3) | inter-state migrant workmen compliance | explainer | 1,200 | `/clms-contractor-contract-employee-masters/` |
| C3 Operations | `your-factory-in-your-pocket-...labour-attendance-app...` (owner) | labour attendance app | explainer | 1,500 | `/clms-attendance-shift-overtime-management/` |
| C3 Operations | `attendance-leave-and-shift-management-...emcontract...` (re-angle) | shift and overtime management for contract workers | how-to | 1,400 | `/clms-attendance-shift-overtime-management/` |
| C3 Operations | **NEW** `gate-pass-management-system-contract-workers` (P2) | gate pass management system for contract workers | how-to | 1,400 | `/clms-onboarding-gatepass-management/`, `/clms-contractor-portal/` |
| C4 Wages and Billing | **NEW** `contractor-bill-verification-attendance-reconciliation` (P2) | contractor billing / wage reconciliation | how-to | 1,500 | `/clms-wages-contractor-billing/` |
| C4 Wages and Billing | **NEW** `verify-contractor-pf-esic-ecr-challan` (P2) | contractor PF ESIC compliance verification | how-to | 1,400 | `/clms-wages-contractor-billing/`, `/clms-compliances-statutory-reports/` |
| C4 Wages and Billing | **NEW** `minimum-wages-contract-workers-state-wise` (P3) | minimum wages for contract workers | explainer | 1,400 | `/clms-wages-contractor-billing/` |
| Bridge | `comprehensive-labour-management-system` (re-angle; absorbs 10 LMS posts) | labour management system vs contract labour management system | explainer | 1,400 | hub, `/clms-manpower-planning/` |

### Hub 2 - HRMS (2 clusters)
- **Commercial owner:** `/human-resource-management-system/`. Keywords: hrms software india, human resource management system. Suggested title: "HRMS Software India | Human Resource Management System - Emsphere". Drop "SAP HRMS" from the lead unless SAP is the actual positioning. Fix the dead `/products/emworkforce` links.
- **Informational pillar:** **NEW** `best-hrms-software-india-manufacturing` (P1). Keywords: best HRMS software in India / HRMS for manufacturing. Template: `best-of`, 2,800 words. The SERP is entirely listicles, and a vendor list that includes emSphere is the standard play. Absorbs `traditional-hris-tools-dont-work-blue-collar-workers-2018`.

| Cluster | Spoke | Primary keyword | Template | Words |
|---|---|---|---|---|
| H1 Evaluation | `benefits-of-human-resource-management-system` (owner, absorbs 3) | benefits of HRMS | listicle | 1,500 |
| H1 Evaluation | NEW `hrms-vs-clms-contract-labour` (shared with CLMS C1; canonical home = CLMS) | HRMS vs CLMS | comparison | - |
| H2 Talent and HR ops | `performance-management-system-adapting-times` (owner, absorbs 3) | performance management system | explainer | 1,300 |
| H2 Talent and HR ops | `how-does-ai-in-hr-impact-business-in-2022` (refresh, retitle to 2026; keep URL) | AI in HR | explainer | 1,200 |
| Support (no cluster) | moving-from-operational..., rpa-in-hr-automation, top-5-expectations..., benefits-of-hr-software-for-the-healthcare-sector..., why-investing-in-technology... | - | - | keep, fix links |

### Hub 3 - Payroll (2 clusters)
- **Commercial owner:** `/empay-management-solution/`. **Retitle required:** "Payroll Software India | emPay Payroll Management System - Emsphere", and put "payroll software" in the H1. The page currently ranks for none of the payroll seed terms. `/payroll-management-solution/` already meta-refreshes to it; make that a server 301 in `.htaccess`.
- **Informational pillar:** `payroll-management-system-and-everything-you-need-to-know` (expand to 2,800). Keyword: payroll management system. Template: `ultimate-guide`. Absorbs 2 posts.

| Cluster | Spoke | Primary keyword | Template | Words |
|---|---|---|---|---|
| P1 Evaluation | `pros-of-payroll-software-for-competitive-businesses` (re-angle) | benefits of payroll software | listicle | 1,300 |
| P1 Evaluation | **NEW** `payroll-software-manufacturing-india` (P2) | payroll software for manufacturing companies india | best-of / landing hybrid | 1,600 |
| P2 Compliance | `payroll-management-system-compliance-india` (re-angle to checklist) | payroll compliance checklist India | how-to/checklist | 1,600 |
| P2 Compliance | **NEW** `labour-codes-50-percent-wage-rule-payroll` (P1) | labour codes 50% wage rule / salary structure | explainer | 1,800 |

### Hub 4 - Workforce Management, Attendance and Leave (3 clusters)
- **Commercial owner:** `/workforce-management-system/`. Keyword: workforce management system india. The title is fine.
- **Informational pillar:** `workforce-management-system-scheduling` (2,431 words). **Retitle**: "Workforce Management in India: Scheduling, Attendance, Compliance & Payroll (Guide)". The current title copies the product title. Primary keyword: workforce management guide / what is workforce management.

| Cluster | Spoke | Primary keyword | Template | Words |
|---|---|---|---|---|
| W0 Evaluation | `benefits-of-effective-automated-workforce-management-system` (owner, absorbs 4) | benefits of workforce management system | listicle | 1,400 |
| W1 Attendance | `attendance-management-system-and-its-features` (owner, absorbs 5) | attendance management system | explainer | 1,500 |
| W1 Attendance | `what-is-a-biometric-attendance-system-and-how-does-it-work` (owner) | biometric attendance system | explainer | 1,300 |
| W1 Attendance | `can-cloud-based-time-and-attendance-work-for-manufacturing-industry` (re-angle) | time and attendance software for shift workers | how-to | 1,400 |
| W2 Shift and Leave | `leave-management-system` (owner, absorbs 4) | leave management system | explainer | 1,300 |
| W2 Shift and Leave | `manual-vs-automated-leave-management...` (keep) | manual vs automated leave management | comparison | 1,200 |
| W2 Shift and Leave | **NEW** `overtime-rules-factories-india-labour-codes` (P2) | overtime rules for factories in India / shift scheduling | explainer | 1,500 |

Note: there is no attendance or leave product page. Point W1/W2 spokes at `/workforce-management-system/` (and `/human-resource-management-system/` as secondary). A dedicated attendance page is a product decision for later.

### Hub 5 - Visitor Management (2 clusters)
- **Commercial owner:** `/visitor-management-system/`. Keywords: visitor management system india, visitor management software. Suggested title: "Visitor Management System for Factories & Offices in India | emVisit - Emsphere".
- **Informational pillar:** `visitor-management-system-vms-and-how-it-works` (expand to 2,500). Keyword: what is a visitor management system. Template: `ultimate-guide`.

| Cluster | Spoke | Primary keyword | Template | Words |
|---|---|---|---|---|
| V1 Evaluation | `visitor-management-system-business-security-investment` (owner, absorbs 3) | visitor management system benefits | listicle | 1,400 |
| V1 Evaluation | `best-practices-of-visitor-management-system` (owner, expand) | visitor management best practices | listicle | 1,300 |
| V2 Industry and Compliance | `digital-visitor-management-system-manufacturing` (owner) | visitor management system for factories | explainer | 2,560 (trim to about 1,800 or keep) |
| V2 Industry and Compliance | **NEW** `visitor-data-dpdp-act-compliance` (P2) | visitor data DPDP Act | explainer | 1,400 |
| Support | `future-trends-in-visitor-management-systems...` | trends | - | keep |

### Hub 6 - Canteen Management (2 clusters)
- **Commercial owner:** `/canteen-management-system/`. It already ranks for "canteen management system", the only product page seen ranking in this study. Suggested title: "Canteen Management System for Industrial & Corporate Canteens | emMeal".
- **Informational pillar:** `how-canteen-management-system-corporate-dining-india` (expand to 2,500). Keyword: canteen management system India / software guide. Absorbs `introduction-to-canteen-management-systems`.

| Cluster | Spoke | Primary keyword | Template | Words |
|---|---|---|---|---|
| K1 Evaluation | `top-7-benefits-of-implementing-a-canteen-management-system...` (owner) | canteen management system benefits | listicle | 1,300 |
| K2 Industrial | `canteen-management-solution-replacement-printing-canteen-coupons` (re-angle) | canteen coupon system / biometric canteen | how-to | 1,300 |
| K2 Industrial | `benefits-of-implementing-a-contractor-canteen-system` (re-angle) | contractor canteen management | explainer | 1,300 |
| K2 Industrial | `how-a-canteen-management-system-cuts-food-costs-and-closes-compliance-gaps` (re-angle) | factory canteen rules (Factories Act / OSH Code canteen obligation) | explainer | 1,400 |
| K2 Industrial | **NEW** `canteen-payroll-deduction-subsidy` (P2) | canteen payroll deduction / meal subsidy | how-to | 1,200 |

### Hub 7 - Headcount and Emergency Mustering (2 clusters)
- **Commercial owner:** `/headcount-management-software/`. **Retitle** to match the intent emSphere actually wins: "Real-Time Headcount & Emergency Mustering System | emCount - Emsphere". Keep "headcount management software" as a secondary term in the body. Its SERP is HR planning tools and cannot be won with this product.
- **Informational pillar:** `headcount-management-drive-operation` (expand to 2,500). Keyword: real-time headcount management system.

| Cluster | Spoke | Primary keyword | Template | Words |
|---|---|---|---|---|
| HC1 Emergency | `headcount-software-helps-track-employees-emergency` (owner, absorbs 2) | emergency mustering / evacuation headcount system | explainer | 1,600 |
| HC1 Emergency | **NEW** `emergency-evacuation-drill-headcount-factory` (P1) | emergency evacuation plan / mock drill headcount for factories | how-to | 1,500 |
| HC2 Occupancy | **NEW** `real-time-occupancy-contractor-heavy-plants` (P3) | real-time people count / zone occupancy in plants | explainer | 1,200 |
| HC2 Occupancy | cross-link to CLMS C3 gate pass spoke and VMS V2 factories spoke | - | - | - |

---

## 5. Gap topics to write (16 new posts, prioritized)

Priority rule. **P1** = timely or high-commercial topic where emSphere has no URL and the product fit is direct. **P2** = supports a module page that has no informational feeder. **P3** = long-tail or completeness topic.

| Pri | Proposed slug (/blog/...) | Primary keyword | Hub / cluster | Template | Words | Why (SERP evidence) | Links to (product) |
|---|---|---|---|---|---|---|---|
| P1 | `contract-labour-labour-codes-principal-employer-obligations` | contract labour under labour codes / OSH Code principal employer | CLMS / C2 | explainer | 1,800 | The codes have been in force since 21-Nov-2025. The SERP is law-firm alerts (EY, KPMG, LKS, aparajitha) with no vendor how-to. Welfare duties such as canteens have moved to the principal employer, which bridges to the Canteen hub. | `/clms-compliances-statutory-reports/`, hub |
| P1 | `labour-codes-50-percent-wage-rule-payroll` | 50% wage rule / salary restructuring | Payroll / P2 | explainer | 1,800 | The SERP is advisory blogs (taxguru, freefincal, embee, pockethrms). Every payroll buyer is asking this question. | `/empay-management-solution/` |
| P1 | `hrms-vs-clms-contract-labour` | HRMS vs CLMS | CLMS / C1 (cross-listed HRMS H1) | comparison | 1,500 | The SERP is weak (glossaries, techjockey), and emSphere already appears twice with thin posts. Two of emSphere's products sell into the same buyer. | CLMS hub + HRMS |
| P1 | `best-hrms-software-india-manufacturing` (HRMS **pillar**) | best HRMS software India / HRMS for manufacturing | HRMS / pillar | best-of | 2,800 | Both "hrms software india" and "best hr software india" are 100% listicles, so the product page cannot rank there. Hono, ZingHR and Pocket HRMS hold the manufacturing variant. | `/human-resource-management-system/` |
| P1 | `emergency-evacuation-drill-headcount-factory` | evacuation drill / emergency headcount in factories | Headcount / HC1 | how-to | 1,500 | emSphere holds 3-4 of 9 results with thin 457-word posts. This post would lock the SERP and give the retitled product page a feeder. | `/headcount-management-software/` |
| P2 | `clra-registers-forms-principal-employer` | CLRA registers and forms | CLMS / C2 | listicle | 1,400 | myndsolution, registerkaro and corpbiz rank. emSphere's compliance module generates these registers. | `/clms-compliances-statutory-reports/` |
| P2 | `gate-pass-management-system-contract-workers` | gate pass management system for contract workers | CLMS / C3 | how-to | 1,400 | The SERP is Odoo apps, Frenzin and a Chevron portal, with no strong India B2B article. The module title already targets "Gate Pass Management System". | `/clms-onboarding-gatepass-management/` |
| P2 | `contractor-bill-verification-attendance-reconciliation` | contractor billing / wage reconciliation | CLMS / C4 | how-to | 1,500 | No CLMS vendor ranks; construction billing tools fill the SERP. | `/clms-wages-contractor-billing/` |
| P2 | `verify-contractor-pf-esic-ecr-challan` | contractor PF/ESIC verification | CLMS / C4 | how-to | 1,400 | Joint-liability content is everywhere, but no one explains *how* to verify. This is emSphere's differentiator ("AI PF/ESIC comparison"). | `/clms-wages-contractor-billing/`, `/clms-contractor-portal/` |
| P2 | `payroll-software-manufacturing-india` | payroll software for manufacturing companies india | Payroll / P1 | best-of/landing | 1,600 | Kredily, INDPayroll and LEDGERS rank with thin pages. It fits emSphere's shop-floor customer base. | `/empay-management-solution/` |
| P2 | `overtime-rules-factories-india-labour-codes` | overtime rules factories India / shift scheduling | WFM / W2 | explainer | 1,500 | mynd and Pocket HRMS rank. It absorbs `eliminate-overtime-minimize-noncompliance-risks`. | `/workforce-management-system/`, `/clms-attendance-shift-overtime-management/` |
| P2 | `visitor-data-dpdp-act-compliance` | visitor data DPDP Act | VMS / V2 | explainer | 1,400 | Only studiomatrx and miniorange rank. Low competition, and the topic signals trust. | `/visitor-management-system/` |
| P2 | `canteen-payroll-deduction-subsidy` | canteen payroll deduction / meal subsidy | Canteen / K2 | how-to | 1,200 | SpaceBasic owns this SERP. It bridges Canteen and Payroll. | `/canteen-management-system/`, `/empay-management-solution/` |
| P3 | `minimum-wages-contract-workers-state-wise` | minimum wages contract workers | CLMS / C4 | explainer | 1,400 | Needs regular updates. greytHR notifications and Core Integra rank. | `/clms-wages-contractor-billing/` |
| P3 | `inter-state-migrant-workers-compliance` | inter-state migrant workmen compliance | CLMS / C2 | explainer | 1,200 | Mentioned in CLMS guides with no dedicated page. | `/clms-contractor-contract-employee-masters/` |
| P3 | `real-time-occupancy-contractor-heavy-plants` | real-time people count / zone occupancy | Headcount / HC2 | explainer | 1,200 | Completes HC2. | `/headcount-management-software/` |

**High-priority work on existing URLs (do this alongside the P1 posts):**
- Expand or rewrite the 7 pillars (section 4). The CLMS and Payroll pillars come first.
- Re-angle the 10 posts marked RE-ANGLE (section 8).
- Retitle the product pages: `/empay-management-solution/`, `/headcount-management-software/`, `/human-resource-management-system/`, `/contract-labour-management-system-software/`.

---

## 6. Cannibalization conflicts

### 6.1 Blog vs product page (head-term clashes). Resolve with a 301 to the product page, or retitle.

| Conflict | Competing URLs | Evidence | Resolution |
|---|---|---|---|
| "Workforce Management System India" | `/workforce-management-system/` (title "Workforce Management System India \| Workforce Management") vs `/blog/workforce-management-system-scheduling/` (title "Workforce Management System India: Scheduling, Compliance & Payroll") | The blog ranks as `?p=31020` for "workforce management system india"; the product page did not appear | Retitle the blog to guide intent (section 4, Hub 4) and link it to the product with the anchor "workforce management system" |
| "Simplify Canteen Management (System) with emMeal" | `/canteen-management-system/` H1 vs `/blog/canteen-management-simplify-with-the-emmeal-system/` | Near-identical title and H1 | 301 the blog to the product |
| "Headcount & Staffing Management" | `/headcount-management-software/` title vs `/blog/headcount-and-staffing-management-system/` and `/blog/staffing-headcount-management-system-in-pune/` | Same terms | 301 both to the product |
| "Contract labour management (system) software" | hub vs `five-ways-contract-labor-management-software...` (`?p=10200`), `how-a-contract-labour-management-system-can-improve...` (`?p=12845`), `clms-end-end-process...` (`?p=10242`), `?p=14613` | 3-4 emSphere blog URLs rank for the commercial term; the hub does not | 301 all of them to the hub |
| "Compliance Management System" | `/clms-compliances-statutory-reports/` (title "Compliance Management System & CLMS Statutory Reports") vs `/blog/compliance-management-system-in-india/` | Same head term | 301 the blog to the module |
| "Human resource management system" | product vs `/blog/human-resource-management-system-in-india/` | Same head term | 301 to the product |
| "Payroll management system in India" | `/empay-management-solution/` vs `/blog/payroll-management-system-in-india/` + 3 brand-promo posts | Same head term | 301 to the product |
| "Visitor management system" | product vs `introducting-emspheres-visitor-management-system`, `emspheres-visitor-management-system-elevate...`, `visitor-management-system-pune` | Same head term | 301 to the product |
| "Contract management software" | `/blog/contract-management-software-pune/` | That SERP is legal contract lifecycle management, so the intent does not match | 301 to the CLMS hub |

### 6.2 Blog vs blog (same intent). Resolve by merging into one owner and adding a 301.

| Intent | Competing posts | Owner | Count merged |
|---|---|---|---|
| CLMS benefits / reasons | top-5, top-6, top-7, important-implement, 6-ways, tips-for-effortless (+ 8 brand-promo posts sent to the hub) | `top-5-benefits-of-implementing-a-contract-labour-management-system` (Google already prefers it, `?p=16264`) | 5 merged + 9 to hub |
| "Labour management system" (global warehouse intent, 0 overlap with CLMS) | 11 posts | `comprehensive-labour-management-system` (re-angle to LMS vs CLMS) | 10 |
| CLMS India guide | `contract-labour-management-indian-principal-employers` (`?p=29476`) vs `contract-labour-management-system-india-compliance-guide` (`?p=27034`), both ranking for "contract labour management system india" | Pillar = principal-employers; re-angle the other to the CLRA checklist | 0 (re-angle) |
| Labour attendance app | `your-factory-in-your-pocket...` vs `choosing-the-right-labour-attendance-app...` | your-factory-in-your-pocket | 1 |
| Attendance management system | 6 posts, incl. **exact duplicates** `benefits-of-attendance-management-system` = `attendance-management-system-and-its-features` (same title, 437 words each) | `attendance-management-system-and-its-features` | 5 |
| Leave management | 5 posts | `leave-management-system` | 4 |
| Biometric attendance | 2 posts | `what-is-a-biometric-attendance-system...` | 1 |
| Headcount emergency | **exact duplicates** `headcount-management-software-the-real-time-headcount-display-2` = `headcount-software-helps-track-employees-emergency` (same title, 457 words), + emergency-response | `headcount-software-helps-track-employees-emergency` | 2 |
| Headcount general | 3 posts | `headcount-management-drive-operation` | 2 |
| HRMS benefits / need | 4 posts | `benefits-of-human-resource-management-system` | 3 |
| Performance management | 4 posts | `performance-management-system-adapting-times` | 3 |
| WFM benefits / need | 5 posts | `benefits-of-effective-automated-workforce-management-system` | 4 |
| VMS benefits | 4 posts | `visitor-management-system-business-security-investment` | 3 |
| Payroll general | 7 posts | pillar `payroll-management-system-and-everything-you-need-to-know` (2 merged), 4 to product | 6 |

**Merge procedure (the order matters).** First move any unique paragraphs, FAQs and images into the owner. Then add the 301 in the root `.htaccess` *above* the `/blog/` to `/blogs/` rewrite. Then remove the source entry from `data/blog-posts.json` and from the sitemap. Finally, update internal links to point straight at the owner. Do not 301 anything before the owner page has been expanded.

---

## 7. Internal link matrix

### 7.1 Mandatory fixes before adding new links
1. **Rewrite the 196 broken body links** in `data/blog-posts.json` `contentHtml`:

| Broken href | Count | Replace with |
|---|---|---|
| `/blog/contract-labour-management-system-software/`, `/blog/contract-labour-management-software/`, `/blog/contract-labor-management-software/`, `/blog/contract-labour-employee-management-system-software/` | 47 | `/contract-labour-management-system-software/` |
| `/blog/labour-management-system-software/`, `/labour-management-system-software/` | 36 | `/contract-labour-management-system-software/` (or the relevant `/clms-*` module) |
| `/blog/headcount-management-software/` | 21 | `/headcount-management-software/` |
| `/blog/workforce-management-system/`, `/blog/time-and-attendance-management-software/` | 22 | `/workforce-management-system/` |
| `/blog/visitor-management-system/`, `/blog/visitor-management-software/` | 24 | `/visitor-management-system/` |
| `/blog/canteen-management-system/`, `/blog/canteen-management-solution/` | 14 | `/canteen-management-system/` |
| `/blog/human-resource-management-system/`, `/blog/hrms/`, `/blog/leave-management-system/` | 13 | `/human-resource-management-system/` |
| `/blog/payroll-management-solution/` (and root `/payroll-management-solution/`) | 8 (+3) | `/empay-management-solution/` |
| `/blog/contact-us/` | 9 | `/contact-us/` |
| `/blog/blog/...` (3) | 3 | strip the doubled `/blog/` |

   A build-time rewrite in `lib/blog.js` (map `/blog/<product-slug>/` to `/<product-slug>/`) gives the same result without editing the JSON.
2. **CLMS hub to modules:** add `href` to the 12 `modules` cards. Eight map to pages: Masters, Shift/OT, Dashboards, Wages/Billing, Manpower Planning, Contractor Module, Statutory Reports, and Onboarding/Gatepass (no card yet; add one). **Each module page** should link back to the hub (breadcrumb + body) and to 2 sibling modules (7.2).
3. **HRMS page:** replace the 5 `/products/emworkforce` hrefs with `/workforce-management-system/`.
4. Add a **"Related in this cluster"** block to `app/blogs/[slug]/page.jsx`, driven by a cluster map: 1 hub product, 1 pillar, 2-3 siblings. The template currently shows only older/newer links.
5. Add a **"Guides and resources"** strip to each product page linking to its pillar plus the top 3 spokes.

### 7.2 Hub <-> spoke adjacency (mandatory = M, recommended = R)

**CLMS**

| From | To | Type | Anchor (vary; max 40% exact) |
|---|---|---|---|
| CLMS hub | 8 `/clms-*` modules | M | module names |
| CLMS hub | pillar `contract-labour-management-indian-principal-employers` | M | "contract labour management guide for principal employers" |
| each `/clms-*` module | CLMS hub | M | "contract labour management system" |
| `/clms-compliances-statutory-reports/` | `/clms-wages-contractor-billing/`, `/clms-contractor-contract-employee-masters/` | R | - |
| `/clms-onboarding-gatepass-management/` | `/clms-contractor-portal/`, `/clms-attendance-shift-overtime-management/` | R | - |
| `/clms-attendance-shift-overtime-management/` | `/clms-wages-contractor-billing/`, `/clms-realtime-dashboards/` | R | - |
| `/clms-wages-contractor-billing/` | `/clms-compliances-statutory-reports/`, `/clms-contractor-portal/` | R | - |
| `/clms-manpower-planning/` | `/clms-realtime-dashboards/`, `/clms-contractor-contract-employee-masters/` | R | - |
| CLMS pillar | every C1-C4 spoke + bridge (12) | M | spoke keyword |
| every C1-C4 spoke | CLMS pillar + CLMS hub + its module page (table in section 4) | M | - |
| C1 spokes | each other (benefits <-> buyer checklist <-> HRMS vs CLMS) | R | - |
| C2 spokes | each other (checklist <-> labour codes <-> registers <-> migrant) | R | - |
| C3 spokes | each other (attendance app <-> shift/OT <-> gate pass) | R | - |
| C4 spokes | each other (bill verification <-> PF/ESIC <-> minimum wages) | R | - |

**Other hubs (same pattern)**

| Hub product page | <-> Pillar | Spokes (each links pillar + product; pillar links each) |
|---|---|---|
| `/human-resource-management-system/` | NEW `best-hrms-software-india-manufacturing` | benefits-of-HRMS, performance-mgmt, AI-in-HR, HRMS-vs-CLMS |
| `/empay-management-solution/` | `payroll-management-system-and-everything-you-need-to-know` | benefits-of-payroll-software, payroll-software-manufacturing, payroll-compliance-checklist, 50%-wage-rule |
| `/workforce-management-system/` | `workforce-management-system-scheduling` (retitled) | WFM-benefits, attendance-mgmt, biometric, time-&-attendance-shift, leave-mgmt, manual-vs-automated-leave, overtime-rules |
| `/visitor-management-system/` | `visitor-management-system-vms-and-how-it-works` | VMS-benefits, best-practices, VMS-for-factories, DPDP visitor data |
| `/canteen-management-system/` | `how-canteen-management-system-corporate-dining-india` | benefits, coupon/biometric, contractor-canteen, canteen-compliance, payroll-deduction |
| `/headcount-management-software/` | `headcount-management-drive-operation` | emergency-mustering, evacuation-drill, real-time-occupancy |

### 7.3 Cross-hub links (optional, topical bridges only; 0-1 per post)

| From | To | Bridge |
|---|---|---|
| CLMS hub / `/clms-attendance-shift-overtime-management/` | `/workforce-management-system/` | attendance |
| `/clms-wages-contractor-billing/` | `/empay-management-solution/` | wages / payroll |
| `/clms-onboarding-gatepass-management/` | `/visitor-management-system/`, `/headcount-management-software/` | gate entry / on-premise count |
| `/headcount-management-software/` | `/visitor-management-system/`, CLMS hub | count of employees + contractors + visitors |
| `/canteen-management-system/` | `/empay-management-solution/`, CLMS hub | payroll deduction / contractor canteen |
| `/human-resource-management-system/` | `/empay-management-solution/`, `/workforce-management-system/` | suite |
| Blog: labour-codes contract labour | Blog: 50%-wage-rule payroll; canteen-compliance | Labour Codes |
| Blog: HRMS vs CLMS | HRMS product + CLMS hub | comparison |
| Blog: gate pass spoke | VMS-for-factories spoke | plant entry |
| Blog: emergency mustering spoke | VMS-for-factories spoke | evacuation |

### 7.4 Incoming-link check (after the plan)
- Every spoke gets at least 3 inbound links: pillar (M), product hub "Guides" strip or module page, and at least 1 sibling (R). The "Related in this cluster" block adds 2-3 more.
- Every module page gets at least 3: the hub, plus 2 sibling modules and spokes.
- No orphans: every page is within 2 clicks of its product hub. The `/clms-*` pages are fixed once the hub cards are linked.

---

## 8. Existing-post mapping (all 118 posts)

Summary: 19 owner, 10 re-angle, 11 keep (support/navigational), 1 refresh, 53 merge (301 to the owner post), 24 redirected to a product page. That leaves 41 indexable posts plus 16 new = 57 posts, each with its own keyword.

#### CLMS

| Post slug (/blog/...) | Words | Cluster | Action | Primary keyword it should own | Must link to |
|---|---|---|---|---|---|
| `contract-labour-management-indian-principal-employers` | 1632 | CLMS-PILLAR | OWNER (pillar) - expand to 3,000+ words | contract labour management in India (guide) | `/contract-labour-management-system-software/` |
| `contract-labour-management-system-india-compliance-guide` | 1032 | CLMS-C2 Compliance | RE-ANGLE - retitle to CLRA/OSH Code compliance checklist | CLRA compliance checklist for principal employers | `/clms-compliances-statutory-reports/` |
| `your-factory-in-your-pocket-why-a-labour-attendance-app-is-now-essential-for-multi-location-workforce-management` | 1081 | CLMS-C3 Operations | OWNER - expand to 1,500 | labour attendance app | `/clms-attendance-shift-overtime-management/` |
| `attendance-leave-and-shift-management-for-large-enterprises-with-emcontract-labour-management-system` | 530 | CLMS-C3 Operations | RE-ANGLE - expand to 1,400 | shift and overtime management for contract workers | `/clms-attendance-shift-overtime-management/` |
| `choosing-the-right-labour-attendance-app-for-your-company` | 605 | CLMS-C3 Operations | MERGE -> your-factory-in-your-pocket... (301) | (dup: labour attendance app) | `/clms-attendance-shift-overtime-management/` |
| `top-5-benefits-of-implementing-a-contract-labour-management-system` | 429 | CLMS-C1 Evaluation | OWNER - expand to 1,500; Google already picks this URL (?p=16264) | contract labour management system benefits | `/contract-labour-management-system-software/` |
| `top-6-benefits-of-contract-labour-management-system` | 467 | CLMS-C1 Evaluation | MERGE -> top-5-benefits... (301) | (dup: CLMS benefits) | `/contract-labour-management-system-software/` |
| `top-7-reasons-to-have-a-contract-labour-management-system` | 736 | CLMS-C1 Evaluation | MERGE -> top-5-benefits... (301) | (dup: CLMS benefits) | `/contract-labour-management-system-software/` |
| `important-implement-contract-labor-management-system` | 338 | CLMS-C1 Evaluation | MERGE -> top-5-benefits... (301) | (dup: CLMS benefits) | `/contract-labour-management-system-software/` |
| `6-ways-emcontract-labour-management-software-accelerates-business-efficiency` | 609 | CLMS-C1 Evaluation | MERGE -> top-5-benefits... (301) | (dup: CLMS benefits) | `/contract-labour-management-system-software/` |
| `tips-for-effortless-contract-labour-management-system` | 655 | CLMS-C1 Evaluation | MERGE -> top-5-benefits... (301) | (dup: CLMS benefits) | `/contract-labour-management-system-software/` |
| `emspheres-integrated-system-for-effective-contractual-labor-management` | 421 | CLMS-C1 Evaluation | 301 -> product hub | (brand promo, head term) | `/contract-labour-management-system-software/` |
| `management-of-contract-labor-management` | 637 | CLMS-C1 Evaluation | 301 -> product hub | (brand promo, head term) | `/contract-labour-management-system-software/` |
| `emspheres-contract-worker-management-syste-a-blueprint-for-productivity` | 493 | CLMS-C1 Evaluation | 301 -> product hub | (brand promo, head term) | `/contract-labour-management-system-software/` |
| `manage-contractual-labour-efficiently-with-emspheres-comprehensive-system` | 420 | CLMS-C1 Evaluation | 301 -> product hub | (brand promo, head term) | `/contract-labour-management-system-software/` |
| `contract-labor-through-seamless-automation-process` | 247 | CLMS-C1 Evaluation | 301 -> product hub | (thin, head term) | `/contract-labour-management-system-software/` |
| `five-ways-contract-labor-management-software-benefits-fulfillment-operations` | 459 | CLMS-C1 Evaluation | 301 -> product hub (ranks for "contract labour management software") | (competes with hub) | `/contract-labour-management-system-software/` |
| `how-a-contract-labour-management-system-can-improve-commercial-productivity` | 344 | CLMS-C1 Evaluation | 301 -> product hub (ranks for "...system software", ?p=12845) | (competes with hub) | `/contract-labour-management-system-software/` |
| `clms-end-end-process-workforce-planning-contract-billing-summary` | 350 | CLMS-C1 Evaluation | 301 -> product hub (ranks ?p=10242) | (competes with hub) | `/contract-labour-management-system-software/` |
| `8-reasons-to-choose-clms` | 12 | CLMS-C1 Evaluation | 301 -> product hub (12 words, empty) | (empty) | `/contract-labour-management-system-software/` |
| `5-essential-features-to-look-for-in-a-clms-for-effective-labour-management` | 321 | CLMS-C1 Evaluation | RE-ANGLE - expand to 1,500 buyer checklist | how to choose a CLMS (features checklist) | `/contract-labour-management-system-software/` |
| `measuring-roi-how-contract-management-software-saves-your-money` | 613 | CLMS-C1 Evaluation | MERGE -> 5-essential-features... (301) | (ROI section of buyer guide) | `/contract-labour-management-system-software/` |
| `contract-management-software-pune` | 411 | CLMS-C1 Evaluation | 301 -> product hub ("contract management software" = legal CLM intent, mismatch) | (intent mismatch) | `/contract-labour-management-system-software/` |
| `automated-clms-covers-loopholes-maintain-gracious-industrial-relations` | 291 | CLMS-C2 Compliance | MERGE -> contract-labour-management-system-india-compliance-guide (301) | (compliance) | `/clms-compliances-statutory-reports/` |
| `compliance-management-system-in-india` | 429 | CLMS-C2 Compliance | 301 -> /clms-compliances-statutory-reports/ (module title is "Compliance Management System") | (competes with module) | `/clms-compliances-statutory-reports/` |
| `importance-legal-statutory-compliance-company-management-india` | 759 | CLMS-C2 Compliance | MERGE -> contract-labour-management-system-india-compliance-guide (301) | (compliance) | `/clms-compliances-statutory-reports/` |
| `effective-ways-to-manage-labor-outsourcing` | 402 | CLMS-PILLAR | MERGE -> pillar (301) | (pillar section) | `/contract-labour-management-system-software/` |
| `are-you-facing-challenges-while-managing-contract-resources` | 238 | CLMS-PILLAR | MERGE -> pillar (301) | (pillar section) | `/contract-labour-management-system-software/` |
| `comprehensive-labour-management-system` | 739 | CLMS-LMS bridge | OWNER - re-angle to LMS vs CLMS explainer, 1,400 | labour management system vs contract labour management system | `/contract-labour-management-system-software/` |
| `a-comprehensive-guide-to-labour-management-systems-powered-by-emhrms` | 587 | CLMS-LMS bridge | MERGE -> comprehensive-labour-management-system (301) | (dup: labour management system) | `/contract-labour-management-system-software/` |
| `why-every-business-needs-a-comprehensive-labour-management-system-in-2025` | 439 | CLMS-LMS bridge | MERGE -> comprehensive-labour-management-system (301) | (dup) | `/contract-labour-management-system-software/` |
| `labour-management-system-for-better-workforce-efficiency` | 837 | CLMS-LMS bridge | MERGE -> comprehensive-labour-management-system (301) | (dup) | `/contract-labour-management-system-software/` |
| `labour-management-system-pune` | 720 | CLMS-LMS bridge | MERGE -> comprehensive-labour-management-system (301) | (dup) | `/contract-labour-management-system-software/` |
| `enhance-productivity-with-emspheres-labour-management-system` | 363 | CLMS-LMS bridge | MERGE -> comprehensive-labour-management-system (301) | (dup) | `/contract-labour-management-system-software/` |
| `labour-management-system-lms-by-emsphere-technologies` | 288 | CLMS-LMS bridge | MERGE -> comprehensive-labour-management-system (301) | (dup) | `/contract-labour-management-system-software/` |
| `workforce-harmony-a-closer-look-at-emsphere-technologies-labour-management-system` | 313 | CLMS-LMS bridge | MERGE -> comprehensive-labour-management-system (301) | (dup) | `/contract-labour-management-system-software/` |
| `emspheres-labour-management-system-your-key-to-productive-staffing` | 492 | CLMS-LMS bridge | MERGE -> comprehensive-labour-management-system (301) | (dup) | `/contract-labour-management-system-software/` |
| `smart-labour-management-for-a-smarter-workforce` | 423 | CLMS-LMS bridge | MERGE -> comprehensive-labour-management-system (301) | (dup) | `/contract-labour-management-system-software/` |
| `understanding-the-benefits-of-a-labor-management-information-system-in-modern-businesses` | 442 | CLMS-LMS bridge | MERGE -> comprehensive-labour-management-system (301) | (dup) | `/contract-labour-management-system-software/` |

#### Navigational

| Post slug (/blog/...) | Words | Cluster | Action | Primary keyword it should own | Must link to |
|---|---|---|---|---|---|
| `personalizing-the-labour-management-system-login-customizing-profiles-for-employee` | 340 | Navigational | KEEP - navigational (login); exclude from clusters, fix links | labour management system login | `/contract-labour-management-system-software/` |

#### HRMS

| Post slug (/blog/...) | Words | Cluster | Action | Primary keyword it should own | Must link to |
|---|---|---|---|---|---|
| `human-resource-management-system-in-india` | 835 | HRMS-H1 Evaluation | 301 -> product (head-term clash) | (competes with product) | `/human-resource-management-system/` |
| `benefits-of-human-resource-management-system` | 682 | HRMS-H1 Evaluation | OWNER - expand to 1,500 | benefits of HRMS | `/human-resource-management-system/` |
| `need-of-human-resource-management-system` | 713 | HRMS-H1 Evaluation | MERGE -> benefits-of-human-resource-management-system (301) | (dup) | `/human-resource-management-system/` |
| `the-role-of-hrms-software-in-transforming-hr-operations` | 449 | HRMS-H1 Evaluation | MERGE -> benefits-of-human-resource-management-system (301) | (dup) | `/human-resource-management-system/` |
| `hris-keeps-strategic-hr-proactive-not-reactive-how` | 233 | HRMS-H1 Evaluation | MERGE -> benefits-of-human-resource-management-system (301) | (thin) | `/human-resource-management-system/` |
| `traditional-hris-tools-dont-work-blue-collar-workers-2018` | 421 | HRMS-H1 Evaluation | MERGE -> NEW "HRMS for manufacturing" post (301) | (blue-collar HRMS) | `/human-resource-management-system/` |
| `performance-management-system-adapting-times` | 446 | HRMS-H2 Talent | OWNER - expand to 1,300 | performance management system | `/human-resource-management-system/` |
| `positive-outlooks-on-performance-management-software-for-employees` | 300 | HRMS-H2 Talent | MERGE -> performance-management-system-adapting-times (301) | (dup) | `/human-resource-management-system/` |
| `employee-performance-management-system-need-of-todays-organization` | 390 | HRMS-H2 Talent | MERGE -> performance-management-system-adapting-times (301) | (dup) | `/human-resource-management-system/` |
| `let-technology-revolutionize-your-performance-management` | 388 | HRMS-H2 Talent | MERGE -> performance-management-system-adapting-times (301) | (dup) | `/human-resource-management-system/` |
| `moving-from-operational-hr-management-to-strategic-hr-management` | 887 | HRMS-Support | KEEP - support, fix links | strategic HR management | `/human-resource-management-system/` |
| `rpa-in-hr-automation` | 660 | HRMS-Support | KEEP - support; refresh as "HR automation" | RPA in HR | `/human-resource-management-system/` |
| `how-does-ai-in-hr-impact-business-in-2022` | 587 | HRMS-Support | REFRESH - retitle for 2026 (dated title) | AI in HR | `/human-resource-management-system/` |
| `top-5-expectations-from-hr-and-automation-analytics` | 655 | HRMS-Support | KEEP - support | HR analytics | `/human-resource-management-system/` |
| `benefits-of-hr-software-for-the-healthcare-sector-for-employees` | 706 | HRMS-Support | KEEP - vertical support | HR software for healthcare | `/human-resource-management-system/` |
| `why-investing-in-technology-to-improve-employee-experience` | 650 | HRMS-Support | KEEP - support | employee experience technology | `/human-resource-management-system/` |

#### PAY

| Post slug (/blog/...) | Words | Cluster | Action | Primary keyword it should own | Must link to |
|---|---|---|---|---|---|
| `payroll-management-system-and-everything-you-need-to-know` | 821 | PAY-PILLAR | OWNER (pillar) - expand to 2,800 | payroll management system (guide) | `/empay-management-solution/` |
| `payroll-management-system-compliance-india` | 1580 | PAY-P2 Compliance | RE-ANGLE - checklist format, 1,600 | payroll compliance checklist India (PF, ESI, PT, LWF, TDS) | `/empay-management-solution/` |
| `payroll-compliance-how-payroll-software-helps-you-stay-up-to-date-with-regulations` | 344 | PAY-P2 Compliance | MERGE -> payroll-management-system-compliance-india (301) | (dup) | `/empay-management-solution/` |
| `payroll-management-system-in-india` | 741 | PAY-P1 Evaluation | 301 -> product (head-term clash) | (competes with product) | `/empay-management-solution/` |
| `transform-payroll-operations-with-emspheres-advanced-payroll-management-system` | 352 | PAY-P1 Evaluation | 301 -> product (brand promo, 352 words) | (thin) | `/empay-management-solution/` |
| `payroll-management-with-advanced-solution` | 834 | PAY-P1 Evaluation | 301 -> product (brand promo) | (thin) | `/empay-management-solution/` |
| `efficiency-unleashed-how-emsphere-technologies-payroll-processing-software-boosts-productivity` | 364 | PAY-P1 Evaluation | 301 -> product (brand promo) | (thin) | `/empay-management-solution/` |
| `why-your-company-needs-a-modern-payroll-management-system` | 350 | PAY-PILLAR | MERGE -> pillar (301) | (pillar section) | `/empay-management-solution/` |
| `how-does-modern-payroll-technology-aid-in-better-payroll-management` | 483 | PAY-PILLAR | MERGE -> pillar (301) | (pillar section) | `/empay-management-solution/` |
| `pros-of-payroll-software-for-competitive-businesses` | 504 | PAY-P1 Evaluation | RE-ANGLE - "benefits of payroll software", 1,300 | benefits of payroll software | `/empay-management-solution/` |

#### WFM

| Post slug (/blog/...) | Words | Cluster | Action | Primary keyword it should own | Must link to |
|---|---|---|---|---|---|
| `workforce-management-system-scheduling` | 2431 | WFM-PILLAR | RE-ANGLE (pillar) - title clashes with product title; retarget to guide intent | workforce management in India (guide) | `/workforce-management-system/` |
| `benefits-of-effective-automated-workforce-management-system` | 798 | WFM-W0 Evaluation | OWNER - 1,400 | benefits of workforce management system | `/workforce-management-system/` |
| `workforce-management-solutions-revolutionary-technology-solution` | 1359 | WFM-W0 Evaluation | MERGE -> benefits-of-effective-automated... (301) | (dup) | `/workforce-management-system/` |
| `workforce-management-solution-combines-flexibility-with-efficiency-and-savings` | 404 | WFM-W0 Evaluation | MERGE -> benefits-of-effective-automated... (301) | (dup) | `/workforce-management-system/` |
| `need-of-workforce-management-system` | 264 | WFM-W0 Evaluation | MERGE -> benefits-of-effective-automated... (301) | (dup) | `/workforce-management-system/` |
| `what-happens-when-organizations-neglect-their-workforce-management-system` | 280 | WFM-W0 Evaluation | MERGE -> benefits-of-effective-automated... (301) | (dup) | `/workforce-management-system/` |
| `what-do-the-millennials-want-in-their-workforce-management-system` | 721 | WFM-Support | KEEP - support | (support) | `/workforce-management-system/` |
| `10-steps-get-productivity-less-staff` | 550 | WFM-Support | KEEP - support | workforce productivity | `/workforce-management-system/` |
| `workflow-management-system-and-its-work` | 324 | WFM-Support | KEEP or noindex - off-topic (workflow, 324 words) | (off-topic) | `/workforce-management-system/` |
| `eliminate-overtime-minimize-noncompliance-risks` | 210 | WFM-W2 Shift/Leave | MERGE -> NEW "overtime rules for factories" (301) | (OT) | `/workforce-management-system/` |
| `attendance-management-system-and-its-features` | 437 | WFM-W1 Attendance | OWNER - expand to 1,500 | attendance management system | `/workforce-management-system/` |
| `benefits-of-attendance-management-system` | 437 | WFM-W1 Attendance | 301 -> attendance-management-system-and-its-features (exact duplicate) | (duplicate) | `/workforce-management-system/` |
| `employee-attendance-management-system-pune` | 381 | WFM-W1 Attendance | MERGE -> attendance-management-system-and-its-features (301) | (dup) | `/workforce-management-system/` |
| `online-attendance-management-software-pune` | 390 | WFM-W1 Attendance | MERGE -> attendance-management-system-and-its-features (301) | (dup) | `/workforce-management-system/` |
| `online-attendance-management-software` | 308 | WFM-W1 Attendance | MERGE -> attendance-management-system-and-its-features (301) | (dup) | `/workforce-management-system/` |
| `clocking-in-success-transform-your-business-with-an-employee-attendance-management-system` | 279 | WFM-W1 Attendance | MERGE -> attendance-management-system-and-its-features (301) | (dup) | `/workforce-management-system/` |
| `what-is-a-biometric-attendance-system-and-how-does-it-work` | 369 | WFM-W1 Attendance | OWNER - expand to 1,300 | biometric attendance system | `/workforce-management-system/` |
| `the-future-of-time-management-emspheres-biometric-attendance-technology` | 491 | WFM-W1 Attendance | MERGE -> what-is-a-biometric-attendance-system... (301) | (dup) | `/workforce-management-system/` |
| `can-cloud-based-time-and-attendance-work-for-manufacturing-industry` | 284 | WFM-W1 Attendance | RE-ANGLE - expand to 1,400 | time and attendance software for shift workers / manufacturing | `/workforce-management-system/` |
| `leave-management-system` | 398 | WFM-W2 Shift/Leave | OWNER - expand to 1,300 | leave management system | `/workforce-management-system/` |
| `leave-management-system-pune` | 352 | WFM-W2 Shift/Leave | MERGE -> leave-management-system (301) | (dup) | `/workforce-management-system/` |
| `emspheres-leave-management-system-streamline-your-workforce` | 386 | WFM-W2 Shift/Leave | MERGE -> leave-management-system (301) | (dup) | `/workforce-management-system/` |
| `how-leave-management-system-helps-to-improve-performance` | 528 | WFM-W2 Shift/Leave | MERGE -> leave-management-system (301) | (dup) | `/workforce-management-system/` |
| `managing-leave-requests-with-attendance-management-software` | 446 | WFM-W2 Shift/Leave | MERGE -> leave-management-system (301) | (dup) | `/workforce-management-system/` |
| `manual-vs-automated-leave-management-whats-best-for-your-company` | 437 | WFM-W2 Shift/Leave | KEEP - comparison spoke, expand to 1,200 | manual vs automated leave management | `/workforce-management-system/` |

#### VMS

| Post slug (/blog/...) | Words | Cluster | Action | Primary keyword it should own | Must link to |
|---|---|---|---|---|---|
| `digital-visitor-management-system-manufacturing` | 2560 | VMS-V2 Industry/Compliance | OWNER - already 2,560 words | visitor management system for manufacturing / factories | `/visitor-management-system/` |
| `visitor-management-system-business-security-investment` | 1404 | VMS-V1 Evaluation | OWNER - 1,400 | visitor management system benefits | `/visitor-management-system/` |
| `visitor-management-system-vms-and-how-it-works` | 651 | VMS-PILLAR | OWNER (pillar) - expand to 2,500 | what is a visitor management system (guide) | `/visitor-management-system/` |
| `best-practices-of-visitor-management-system` | 458 | VMS-V1 Evaluation | OWNER - expand to 1,300 (ranks ?p=10236 for "VMS india") | visitor management best practices | `/visitor-management-system/` |
| `future-trends-in-visitor-management-systems-you-need-to-know` | 1215 | VMS-Support | KEEP - support, refresh yearly | visitor management trends | `/visitor-management-system/` |
| `emspheres-visitor-management-system-elevate-your-business-security-and-operations` | 379 | VMS-V1 Evaluation | 301 -> product (brand promo) | (competes with product) | `/visitor-management-system/` |
| `introducting-emspheres-visitor-management-system` | 831 | VMS-V1 Evaluation | 301 -> product (brand promo) | (competes with product) | `/visitor-management-system/` |
| `visitor-management-system-pune` | 825 | VMS-V1 Evaluation | 301 -> product (head-term clash) | (competes with product) | `/visitor-management-system/` |
| `future-of-smart-offices-benefits-of-digital-visitor-management-system` | 356 | VMS-V1 Evaluation | MERGE -> visitor-management-system-business-security-investment (301) | (dup) | `/visitor-management-system/` |
| `make-every-interaction-count-by-implementing-visitor-management-solution` | 391 | VMS-V1 Evaluation | MERGE -> visitor-management-system-business-security-investment (301) | (dup) | `/visitor-management-system/` |
| `create-an-efficient-well-organized-and-secure-lobby-with-visitor-management-system` | 223 | VMS-V1 Evaluation | MERGE -> visitor-management-system-business-security-investment (301) | (dup) | `/visitor-management-system/` |

#### CMS

| Post slug (/blog/...) | Words | Cluster | Action | Primary keyword it should own | Must link to |
|---|---|---|---|---|---|
| `how-canteen-management-system-corporate-dining-india` | 1502 | CMS-PILLAR | OWNER (pillar) - expand to 2,500 | canteen management system India (guide) | `/canteen-management-system/` |
| `top-7-benefits-of-implementing-a-canteen-management-system-in-your-organization` | 626 | CMS-K1 Evaluation | OWNER - expand to 1,300 | canteen management system benefits | `/canteen-management-system/` |
| `introduction-to-canteen-management-systems` | 743 | CMS-K1 Evaluation | MERGE -> pillar (301) | (what-is section) | `/canteen-management-system/` |
| `know-whats-on-the-menu-with-canteen-management-system` | 522 | CMS-K1 Evaluation | MERGE -> top-7-benefits... (301) | (dup) | `/canteen-management-system/` |
| `canteen-management-simplify-with-the-emmeal-system` | 1088 | CMS-K1 Evaluation | 301 -> product (title copies product H1) | (competes with product) | `/canteen-management-system/` |
| `how-a-canteen-management-system-cuts-food-costs-and-closes-compliance-gaps` | 727 | CMS-K2 Industrial | RE-ANGLE - canteen compliance (Factories Act / OSH Code), 1,400 | factory canteen rules / canteen compliance | `/canteen-management-system/` |
| `benefits-of-implementing-a-contractor-canteen-system` | 370 | CMS-K2 Industrial | RE-ANGLE - expand to 1,300 | contractor canteen management | `/canteen-management-system/` |
| `canteen-management-solution-replacement-printing-canteen-coupons` | 248 | CMS-K2 Industrial | RE-ANGLE - expand to 1,300 | canteen coupon system / biometric canteen | `/canteen-management-system/` |

#### HC

| Post slug (/blog/...) | Words | Cluster | Action | Primary keyword it should own | Must link to |
|---|---|---|---|---|---|
| `headcount-software-helps-track-employees-emergency` | 457 | HC-H1 Emergency | OWNER - expand to 1,600 (ranks ?p=10209) | emergency mustering / evacuation headcount system | `/headcount-management-software/` |
| `headcount-management-software-the-real-time-headcount-display-2` | 457 | HC-H1 Emergency | 301 -> headcount-software-helps-track-employees-emergency (exact duplicate) | (duplicate) | `/headcount-management-software/` |
| `emergency-response-management-quick-response-emergencies` | 561 | HC-H1 Emergency | MERGE -> headcount-software-helps-track-employees-emergency (301) | (dup) | `/headcount-management-software/` |
| `headcount-management-drive-operation` | 794 | HC-PILLAR | OWNER (pillar) - expand to 2,500 | real-time headcount management system (guide) | `/headcount-management-software/` |
| `headcount-management-system-the-key-to-workforce-optimization` | 479 | HC-PILLAR | MERGE -> headcount-management-drive-operation (301) | (dup) | `/headcount-management-software/` |
| `need-of-head-count-system-in-a-company` | 262 | HC-PILLAR | MERGE -> headcount-management-drive-operation (301) | (dup) | `/headcount-management-software/` |
| `headcount-and-staffing-management-system` | 1137 | HC-PILLAR | 301 -> product (title clone of product title) | (competes with product) | `/headcount-management-software/` |
| `staffing-headcount-management-system-in-pune` | 930 | HC-PILLAR | 301 -> product (head-term clash) | (competes with product) | `/headcount-management-software/` |

---

## 9. Structured cluster plan (JSON, for audit-data.json "Content Architecture")

```json
{
  "site": "https://www.emsphere.com",
  "generated": "2026-10-23",
  "method": {"serp_source": "WebSearch (US-geo, ~9 results/query, india-modified queries)", "thresholds": {"same_post": "7-10", "same_cluster": "4-6", "interlink": "2-3", "separate": "0-1"}, "confidence": "directional - re-verify P1 pairs in an IN rank tracker"},
  "hubs": [
    {"id": "clms", "product_url": "/contract-labour-management-system-software/", "commercial_keywords": ["contract labour management system software", "contract labour management software"],
     "pillar": {"url": "/blog/contract-labour-management-indian-principal-employers/", "keyword": "contract labour management in India", "template": "ultimate-guide", "words": 3200},
     "modules": ["/clms-attendance-shift-overtime-management/", "/clms-compliances-statutory-reports/", "/clms-contractor-contract-employee-masters/", "/clms-contractor-portal/", "/clms-manpower-planning/", "/clms-onboarding-gatepass-management/", "/clms-realtime-dashboards/", "/clms-wages-contractor-billing/"],
     "clusters": [
       {"id": "C1", "name": "Evaluation", "intent": "commercial", "spokes": [
         {"url": "/blog/top-5-benefits-of-implementing-a-contract-labour-management-system/", "keyword": "contract labour management system benefits", "template": "listicle", "status": "expand"},
         {"url": "/blog/5-essential-features-to-look-for-in-a-clms-for-effective-labour-management/", "keyword": "how to choose a CLMS", "template": "how-to", "status": "re-angle"},
         {"url": "/blog/hrms-vs-clms-contract-labour/", "keyword": "HRMS vs CLMS", "template": "comparison", "status": "new", "priority": "P1"}]},
       {"id": "C2", "name": "Compliance", "intent": "informational", "spokes": [
         {"url": "/blog/contract-labour-management-system-india-compliance-guide/", "keyword": "CLRA compliance checklist for principal employers", "template": "how-to", "status": "re-angle"},
         {"url": "/blog/contract-labour-labour-codes-principal-employer-obligations/", "keyword": "contract labour under labour codes", "template": "explainer", "status": "new", "priority": "P1"},
         {"url": "/blog/clra-registers-forms-principal-employer/", "keyword": "CLRA registers and forms", "template": "listicle", "status": "new", "priority": "P2"},
         {"url": "/blog/inter-state-migrant-workers-compliance/", "keyword": "inter-state migrant workmen compliance", "template": "explainer", "status": "new", "priority": "P3"}]},
       {"id": "C3", "name": "Operations", "intent": "commercial", "spokes": [
         {"url": "/blog/your-factory-in-your-pocket-why-a-labour-attendance-app-is-now-essential-for-multi-location-workforce-management/", "keyword": "labour attendance app", "template": "explainer", "status": "expand"},
         {"url": "/blog/attendance-leave-and-shift-management-for-large-enterprises-with-emcontract-labour-management-system/", "keyword": "shift and overtime management for contract workers", "template": "how-to", "status": "re-angle"},
         {"url": "/blog/gate-pass-management-system-contract-workers/", "keyword": "gate pass management system for contract workers", "template": "how-to", "status": "new", "priority": "P2"}]},
       {"id": "C4", "name": "Wages and Billing", "intent": "informational", "spokes": [
         {"url": "/blog/contractor-bill-verification-attendance-reconciliation/", "keyword": "contractor billing reconciliation", "template": "how-to", "status": "new", "priority": "P2"},
         {"url": "/blog/verify-contractor-pf-esic-ecr-challan/", "keyword": "contractor PF ESIC verification", "template": "how-to", "status": "new", "priority": "P2"},
         {"url": "/blog/minimum-wages-contract-workers-state-wise/", "keyword": "minimum wages contract workers", "template": "explainer", "status": "new", "priority": "P3"}]}]},
    {"id": "hrms", "product_url": "/human-resource-management-system/", "commercial_keywords": ["hrms software india", "human resource management system"],
     "pillar": {"url": "/blog/best-hrms-software-india-manufacturing/", "keyword": "best HRMS software India", "template": "best-of", "words": 2800, "status": "new", "priority": "P1"},
     "clusters": [
       {"id": "H1", "name": "Evaluation", "spokes": [{"url": "/blog/benefits-of-human-resource-management-system/", "keyword": "benefits of HRMS", "template": "listicle"}, {"url": "/blog/hrms-vs-clms-contract-labour/", "keyword": "HRMS vs CLMS", "canonical_home": "clms"}]},
       {"id": "H2", "name": "Talent and HR ops", "spokes": [{"url": "/blog/performance-management-system-adapting-times/", "keyword": "performance management system", "template": "explainer"}, {"url": "/blog/how-does-ai-in-hr-impact-business-in-2022/", "keyword": "AI in HR", "template": "explainer", "status": "refresh"}]}]},
    {"id": "payroll", "product_url": "/empay-management-solution/", "commercial_keywords": ["payroll software india"], "product_retitle": "Payroll Software India | emPay Payroll Management System - Emsphere",
     "pillar": {"url": "/blog/payroll-management-system-and-everything-you-need-to-know/", "keyword": "payroll management system", "template": "ultimate-guide", "words": 2800},
     "clusters": [
       {"id": "P1", "name": "Evaluation", "spokes": [{"url": "/blog/pros-of-payroll-software-for-competitive-businesses/", "keyword": "benefits of payroll software", "template": "listicle"}, {"url": "/blog/payroll-software-manufacturing-india/", "keyword": "payroll software for manufacturing india", "template": "best-of", "status": "new", "priority": "P2"}]},
       {"id": "P2", "name": "Compliance", "spokes": [{"url": "/blog/payroll-management-system-compliance-india/", "keyword": "payroll compliance checklist India", "template": "how-to"}, {"url": "/blog/labour-codes-50-percent-wage-rule-payroll/", "keyword": "50% wage rule payroll", "template": "explainer", "status": "new", "priority": "P1"}]}]},
    {"id": "wfm", "product_url": "/workforce-management-system/", "commercial_keywords": ["workforce management system india"],
     "pillar": {"url": "/blog/workforce-management-system-scheduling/", "keyword": "workforce management in India guide", "template": "ultimate-guide", "words": 2500, "status": "retitle"},
     "clusters": [
       {"id": "W1", "name": "Attendance", "spokes": [{"url": "/blog/attendance-management-system-and-its-features/", "keyword": "attendance management system"}, {"url": "/blog/what-is-a-biometric-attendance-system-and-how-does-it-work/", "keyword": "biometric attendance system"}, {"url": "/blog/can-cloud-based-time-and-attendance-work-for-manufacturing-industry/", "keyword": "time and attendance software for shift workers"}]},
       {"id": "W2", "name": "Shift and Leave", "spokes": [{"url": "/blog/leave-management-system/", "keyword": "leave management system"}, {"url": "/blog/manual-vs-automated-leave-management-whats-best-for-your-company/", "keyword": "manual vs automated leave management", "template": "comparison"}, {"url": "/blog/overtime-rules-factories-india-labour-codes/", "keyword": "overtime rules factories India", "status": "new", "priority": "P2"}]},
       {"id": "W0", "name": "Evaluation", "spokes": [{"url": "/blog/benefits-of-effective-automated-workforce-management-system/", "keyword": "benefits of workforce management system"}]}]},
    {"id": "vms", "product_url": "/visitor-management-system/", "commercial_keywords": ["visitor management system india", "visitor management software"],
     "pillar": {"url": "/blog/visitor-management-system-vms-and-how-it-works/", "keyword": "what is a visitor management system", "template": "ultimate-guide", "words": 2500},
     "clusters": [
       {"id": "V1", "name": "Evaluation", "spokes": [{"url": "/blog/visitor-management-system-business-security-investment/", "keyword": "visitor management system benefits"}, {"url": "/blog/best-practices-of-visitor-management-system/", "keyword": "visitor management best practices"}]},
       {"id": "V2", "name": "Industry and Compliance", "spokes": [{"url": "/blog/digital-visitor-management-system-manufacturing/", "keyword": "visitor management system for factories"}, {"url": "/blog/visitor-data-dpdp-act-compliance/", "keyword": "visitor data DPDP Act", "status": "new", "priority": "P2"}]}]},
    {"id": "canteen", "product_url": "/canteen-management-system/", "commercial_keywords": ["canteen management system"],
     "pillar": {"url": "/blog/how-canteen-management-system-corporate-dining-india/", "keyword": "canteen management system India guide", "template": "ultimate-guide", "words": 2500},
     "clusters": [
       {"id": "K1", "name": "Evaluation", "spokes": [{"url": "/blog/top-7-benefits-of-implementing-a-canteen-management-system-in-your-organization/", "keyword": "canteen management system benefits"}]},
       {"id": "K2", "name": "Industrial canteen", "spokes": [{"url": "/blog/canteen-management-solution-replacement-printing-canteen-coupons/", "keyword": "canteen coupon system"}, {"url": "/blog/benefits-of-implementing-a-contractor-canteen-system/", "keyword": "contractor canteen management"}, {"url": "/blog/how-a-canteen-management-system-cuts-food-costs-and-closes-compliance-gaps/", "keyword": "factory canteen rules"}, {"url": "/blog/canteen-payroll-deduction-subsidy/", "keyword": "canteen payroll deduction", "status": "new", "priority": "P2"}]}]},
    {"id": "headcount", "product_url": "/headcount-management-software/", "commercial_keywords": ["real-time headcount management system", "emergency mustering system"], "product_retitle": "Real-Time Headcount & Emergency Mustering System | emCount - Emsphere",
     "pillar": {"url": "/blog/headcount-management-drive-operation/", "keyword": "real-time headcount management system", "template": "ultimate-guide", "words": 2500},
     "clusters": [
       {"id": "HC1", "name": "Emergency", "spokes": [{"url": "/blog/headcount-software-helps-track-employees-emergency/", "keyword": "emergency mustering headcount system"}, {"url": "/blog/emergency-evacuation-drill-headcount-factory/", "keyword": "evacuation drill headcount factory", "status": "new", "priority": "P1"}]},
       {"id": "HC2", "name": "Occupancy", "spokes": [{"url": "/blog/real-time-occupancy-contractor-heavy-plants/", "keyword": "real-time people count plant", "status": "new", "priority": "P3"}]}]}
  ],
  "issues": [
    {"id": "CA-01", "severity": "critical", "title": "196 broken /blog/<product-slug>/ links in 89 posts; only 13 valid blog->product links"},
    {"id": "CA-02", "severity": "critical", "title": "Self-cannibalization: up to 5 emSphere URLs per SERP; CLMS hub absent from CLMS SERPs"},
    {"id": "CA-03", "severity": "high", "title": "WordPress ?p= shortlinks indexed instead of canonical blog URLs (17 observed)"},
    {"id": "CA-04", "severity": "high", "title": "8 /clms-* module pages orphaned (hub cards unlinked, no back-links)"},
    {"id": "CA-05", "severity": "high", "title": "Product keyword mismatch: payroll page lacks 'payroll software'; headcount page targets HR-planning SERP"},
    {"id": "CA-06", "severity": "high", "title": "14 blog posts clash with product page head terms/titles"},
    {"id": "CA-07", "severity": "medium", "title": "HRMS page links to non-existent /products/emworkforce (5x)"},
    {"id": "CA-08", "severity": "high", "title": "No content on Labour Codes 2025 (contract labour, 50% wage rule) - competitor-owned SERPs"}
  ]
}
```

---

## 10. Pre-delivery validation

| Check | Result |
|---|---|
| No two posts share a primary keyword | **Pass** after the merges and re-angles in section 8. Before them: fail (about 20 CLMS-benefit posts, 11 LMS posts, 2 pairs of exact duplicates) |
| Every spoke gets at least 3 incoming links | Pass by design (pillar + product/module + sibling + related block). Depends on fixes 7.1-1, 7.1-4 and 7.1-5 |
| Every spoke links to its pillar; every pillar links to all spokes | Pass by design (section 7.2) |
| No orphan pages | **Fails today** (8 `/clms-*` pages). Passes once 7.1-2 is done |
| Template matches intent | Pass: best-of for listicle SERPs (HRMS, payroll-manufacturing), how-to/checklist for compliance, comparison for "vs" |
| Word counts (pillar 2,500-4,000, spoke 1,200-1,800) | Pass for planned/new posts. **Exception:** `digital-visitor-management-system-manufacturing` is already 2,560 words; keep it as a deep spoke |
| Cluster-size constraints (2-5 clusters per hub, 2-4 posts per cluster) | Pass for CLMS (4 clusters of 3-4). **Exceptions:** W0, K1 and HC2 have 1 spoke each, because the product scope is small. They are kept as clusters to give expansion slots. Do not pad them with thin posts |
| SERP overlap supports groupings | Partly. Most within-cluster pairs score 0-3 on URL overlap, which is expected for long-tail B2B terms in a ~9-result sample. Clusters rest on topical and entity overlap plus product-module fit, not 4+ URL overlap. The two strong signals (CLMS software/system = 6-7, headcount real-time/emergency = 3) are used directly |

---

## 11. Implementation order

1. **Week 1 (technical):** fix the 196 broken links (7.1-1). Link the CLMS hub cards to the modules (7.1-2). Fix `/products/emworkforce`. Add 301s for `?p=<id>` (see 01-technical-seo).
2. **Week 1-2 (product pages):** retitle payroll, headcount, HRMS and CLMS (section 4). Add the "Guides" strip to every product page.
3. **Week 2-4:** expand the 7 pillars. Re-angle the 10 posts. Then run the merges and 301s (section 6.2 procedure). Exact duplicates go first.
4. **Month 2:** publish the 5 P1 posts (Labour Codes contract labour, 50% wage rule, HRMS vs CLMS, best HRMS for manufacturing, evacuation drill headcount).
5. **Month 2-3:** publish the 8 P2 posts. **Month 4:** the 3 P3 posts. Refresh minimum wages twice a year.
6. **Measure:** in Search Console, track the hub URLs for their commercial terms. Watch for the `?p=` URLs dropping out of the index and for drops in "multiple emsphere URLs per query".

## Sources (SERP evidence)
- [NALCO CLMS](https://nalcoindia.com/services-initiatives/contract-labour-management-system/), [myndsolution CLRA checklist](https://www.myndsolution.com/clra-compliance-checklist-ensuring-your-contract-labour-practices-are-legal/), [eSparsh CLMS](https://www.esparsh.in/innovations/contract-labour-management-system-clms/), [Capterra Iddion RegX](https://www.capterra.com/p/10047335/Iddion-RegX/), [IndiaMART CLMS](https://m.indiamart.com/proddetail/contract-labour-management-system-software-22123808812.html), [Ramco contract workforce](https://www.ramco.com/press-release/One-of-Indias-largest-business-conglomerates-Goes-Live-on-Ramco)
- Labour Codes: [aparajitha](https://aparajitha.com/clra-compliance-after-the-labour-codes-what-has-changed-what-continues-and-what-employers-must-do-now), [corporateprofessionals](https://www.corporateprofessionals.com/articles/contractor-principal-employer-duties-obligations-and-vicarious-liabilities-under-labour-codes/), [LKS](https://www.lkslaw.com/insights/articles/contract-labour-new-dynamics-under-new-labour-code), [taxguru 50% wage](https://taxguru.in/corporate-law/labour-codes-2025-change-pay-structures-50-percent-wage-rule-applies.html), [KPMG](https://www.in.kpmg.com/taxflashnews/KPMG-Flash-News-Notification-of-final-Rules-on-Four-Labour-Codes.pdf)
- HRMS/Payroll: [Pocket HRMS best HRMS](https://www.pockethrms.com/best-hrms-software-in-india/), [greytHR best HR software](https://greythr.com/list/best-hr-software), [Hono HRMS manufacturing](https://www.hono.ai/blog/best-hrms-for-very-large-manufacturing-companies-india), [Capterra IN payroll](https://www.capterra.in/blog/3720/payroll-software-india), [Zoho payroll management system](https://www.zoho.com/in/payroll/academy/payroll-operations/payroll-management-system.html), [paybooks PF ESI PT LWF](https://paybooks.in/article/pf-esi-pt-and-lwf-a-state-by-state-compliance-guide-for-indian-payroll/), [Kredily manufacturing](https://kredily.com/solutions/manufacturing/)
- WFM: [ZingHR WFM India](https://www.zinghr.com/blogs/workforce-management-software-india), [HROne top 10 WFM](https://hrone.cloud/blog/top-10-workforce-management-software-in-india/), [UKG WFM glossary](https://www.ukg.com/glossary/what-is-workforce-management-software), [myndsolution shift scheduling](https://www.myndsolution.com/smart-workforce-scheduling-a-practical-guide-for-manufacturing-efficiency/)
- VMS: [studiomatrx VMS India](https://www.studiomatrx.org/guides/visitor-management-systems-india), [studiomatrx visitor data](https://www.studiomatrx.org/guides/visitor-data-protection-india), [Capterra VMS](https://www.capterra.com/visitor-management-software/shortlist/), [friendlyway manufacturing VMS](https://www.friendlyway.com/visitor-management-system-manufacturing/)
- Canteen: [MealPe](https://mealpe.app/best-canteen-management-software-in-india), [Mantra CMS](https://www.mantratec.com/Solutions/Canteen-Management-System), [SpaceBasic industrial canteen](https://www.spacebasic.com/canteen-management-system/industrial-factory-canteen-software)
- Headcount: [Factorial headcount software](https://factorialhr.com/blog/headcount-management-software/), [Workday headcount planning](https://workday.com/en-gb/products/adaptive-planning/workforce-planning/headcount-cost-planning.html), [friendlyway mustering](https://www.friendlyway.com/emergency-mustering-save-lives/), [studiomatrx assembly areas](https://www.studiomatrx.org/guides/assembly-areas-india)
