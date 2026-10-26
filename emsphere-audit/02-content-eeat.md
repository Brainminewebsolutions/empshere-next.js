# 02 — Content Quality & E-E-A-T Audit: emSphere (Next.js rebuild)

**Audit date:** 23 Oct 2026
**Scope:** Built static export in `out/` (served at http://127.0.0.1:4173/), checked against the live WordPress site https://www.emsphere.com (fetched 23 Oct 2026 with a browser User-Agent). Also covers `data/blog-posts.json` (118 posts) and `components/ClmsModulePage.jsx`.
**Framework:** Google Search Quality Rater Guidelines (current version, 11 Sep 2025), Helpful-content signals (part of core ranking since March 2024), and this skill's internal E-E-A-T weighting. Google does not publish numeric E-E-A-T weights; it only says trust matters most.
**Method:** Word counts cover main content only. Site header, nav, footer, forms and `aria-hidden` elements (count-up digit strips, duplicated marquee logos) are removed first. On the live site, WordPress `main#main` was used with the header and mega-menu stripped. Readability was calculated on `<p>` text only, because headings and card labels distort sentence-length metrics. Metadata templating was checked with `metadata_template.py` across 140 URLs. No project source files were changed.

---

## 1. Scores

| Metric | Score |
|---|---|
| **Content Quality (overall)** | **48 / 100** |
| E-E-A-T composite | 49 / 100 |
| AI citation readiness | 42 / 100 |
| Metadata templating risk (`metadata_template.py`) | `site_risk: low`, `templated_ratio: 0.0`, `shared_cta_phrases: {}` |

### Content Quality breakdown

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Topical depth & coverage vs SERP intent | 20 | 10 | CLMS, emPay and Visitor pages are reasonably deep. Headcount and the 8 CLMS modules are thin. No product page covers the Labour Codes. |
| Keyword targeting & on-page alignment | 15 | 7 | "payroll" was removed from the payroll page (18 mentions down to 0). HRMS and Headcount H1s do not contain their keywords. Titles include "SAP HRMS" and "emPay Software". |
| E-E-A-T | 25 | 12 | Strong named client testimonials, but company facts conflict, two certification claims are unverifiable, and Privacy/Terms links are broken. |
| Originality / duplication / AI-content quality | 15 | 7 | Generic AI-style filler blocks, copy-paste errors, CLMS module template sameness, duplicate blog posts. |
| Readability & structure | 10 | 6 | Single H1 on every product page (good). Paragraph text sits at Flesch 16-47, which is hard to read. Flip cards repeat each heading as H3 and H4. |
| Freshness & factual accuracy | 10 | 4 | Factual errors (ISO 27001:2022 "achieved in 2021", ILO global figures labelled as India, "87M" that should be 87%). No blog post has ever been updated. |
| Blog / content hub quality | 5 | 2 | 98 of 118 posts are under 800 words. Every post is by "Admin". 222 internal links are broken. |
| **Total** | **100** | **48** | |

### E-E-A-T breakdown

| Factor | Weight | Score | Evidence |
|---|---|---|---|
| Experience | 20% | 60 | 10 named testimonials with title, company and scale (M&M 40,000+ contract labourers, Yazaki 12,000+ across 7 plants, Varroc 20,000+ across 28 locations, Yashaswi 65K+). Dashboard screenshots on CLMS. Client logo wall. **But:** zero case studies (the CLMS page says "Our testimonials and case studies speak volumes", and none exist), no implementation stories or before/after metrics on product pages, and 4 long-tenure legacy testimonials from the live site were dropped. |
| Expertise | 25% | 45 | emPay names real statutory artefacts (ECR, 24Q, Form 16/12BA/27A, ITNS 281) and the CLMS FAQ cites Form B and Form D. **But:** the main CLMS page never names the CLRA Act 1970 or the four Labour Codes. Large blocks of generic US-style copy ("statutory holiday calculations", "freelancers and independent contractors"). Factual errors. Blog author is "Admin" / "Emsphere Team" with Organization-only author schema and no external citations in 10 sampled posts. |
| Authoritativeness | 25% | 50 | Blue-chip client names (Mahindra & Mahindra, Yazaki, JK Cement, Kansai Nerolac, Vishay, Varroc). Leadership names on About. **But:** no third-party proof (G2, Capterra, Gartner Peer Insights ratings, awards, press, analyst mentions, SAP or hardware partner badges, NASSCOM membership). Leadership has no LinkedIn links or photos-with-credentials schema. Organization schema has no `sameAs`, `address`, `foundingDate`, `founder` or `contactPoint`. |
| Trustworthiness | 30% | 45 | Full Pune HQ address, phones and emails on /contact-us/. ISO/IEC 27001:2022 claim. **But:** footer links `/privacy-policy/` and `/terms-of-use/` return 404 in the build. "GDPR Certified Software" (CLMS) and "Encryption … with GDPR Certification" (emPay) are unverifiable; there is no official GDPR certification. Company facts contradict each other across pages (section 4, C-4). No legal entity name or CIN. |
| **Weighted** | | **49** | 0.2×60 + 0.25×45 + 0.25×50 + 0.3×45 |

### AI citation readiness (42/100)
- **Positive:** FAQPage JSON-LD on Workforce, Visitor and Canteen. Question-style H3s on HRMS and CLMS. Concrete numbers in testimonials. emPay lists statutory forms by name.
- **Negative:** the CLMS and HRMS FAQs are not in FAQPage schema, although they are the two most valuable FAQs. Company facts conflict (an LLM cannot quote "500+ clients" with confidence when the Workforce page says "120+ Happy Customers … worldwide"). There is no single "What is a CLMS / what laws apply" definition paragraph written for India. Product naming is inconsistent (emContract / emCLMS / "em Contract" / "CWMS" / "LMS"; emPay / emPayroll; emCount / Emcount), which weakens entity resolution. There are no dated "last updated" stamps on product pages.

---

## 2. Live (WordPress) vs New (Next.js): migration content-loss check

| Page (new URL) | Live URL | Live words | New words | Δ | Primary keyword occurrences (new/live) | Verdict |
|---|---|---|---|---|---|---|
| / | / | 1,201 | 1,598 | +397 | "canteen management" 0/3, "hrms" 1/2 | OK, more content |
| /human-resource-management-system/ | same | 1,522 | 1,466 | −56 | "payroll" 7/13, "hrms" 13/16 | Minor loss ("payroll" swapped for "emPay") |
| /contract-labour-management-system-software/ | same | 2,276 | 2,341 | +65 | "contract labour" 27/27 | Parity |
| **/empay-management-solution/** | **/payroll-management-solution/** | 1,043 | 1,018 | −25 | **"payroll" 0/18** | **CRITICAL: URL change plus keyword removed** |
| /workforce-management-system/ | same | 779 | 828 | +49 | "workforce management" 8/8 | Parity |
| /headcount-management-software/ | same | 411 | 432 | +21 | **"headcount" 0/1 in body** | Parity, but thin before and after |
| /visitor-management-system/ | same | 1,598 | 1,599 | +1 | "visitor management" 53/55 | Parity |
| /canteen-management-system/ | same | 1,655 | 1,569 | −86 | "canteen management" 25/31 | Small loss |
| /testimonial/ | same | 1,683 | 980 | **−703** | — | **HIGH: 4 legacy testimonials dropped (Fundtech, Itron, DOW Agrosciences, Aquatech "since May 2011")** |
| /about-us/ | same | 165 | 1,669 | +1,504 | — | Big gain |
| /our-clients/ | same | 14 | 872 | +858 | — | Big gain |
| /contact-us/ | same | 177 | 448 | +271 | — | Gain |
| **/clms-contractor-contract-employee-masters/** | **/clms-contract-employee-masters/** | 361 | 445 | +84 | — | **CRITICAL: URL changed, no redirect in build** (only a code comment, line 28 of the page.jsx) |
| Other 7 /clms-* modules | same slugs | 323-446 | 395-537 | +70 to +90 each | — | Parity, thin |

**Conclusion:** body copy was mostly carried over 1:1 from WordPress, so the rebuild does not cause mass content loss. Most of the migration risk sits in three places:
1. The payroll page: URL `/payroll-management-solution/` becomes `/empay-management-solution/`, and every instance of "payroll" was replaced with the invented brand term "emPay" in the title, H1 and body. The old URL becomes a `noindex` meta-refresh stub (`app/payroll-management-solution/page.jsx`), not a server 301. The live `/empay-management-solution/` currently returns 404, so the new URL has no history.
2. The CLMS master module slug change, with no 301.
3. The testimonial page losing 703 words, including the only evidence of tenure back to 2011.

---

## 3. Per-page table

| URL | Target keyword | Words | Key issues | Priority fix |
|---|---|---|---|---|
| / | HR software India / HRMS & CLMS software (brand hub) | 1,598 | 3 H1s (carousel slides "HR Tech Re-imagined", "Connected HR", "Adaptive & Integrated"), none with keywords. No `<main>` landmark. Title "Workforce and Labor Management System" uses US "Labor" and competes with /workforce-management-system/. Description has brand-suffix artefact. | One H1: "HRMS, Payroll & Contract Labour Management Software for Indian Enterprises". Retitle (see section 6). Make other slides `<p>`/`<h2>`. |
| /human-resource-management-system/ | HRMS software | 1,466 | H1 "A Single All-In One System for your HR Needs" has no "HRMS". "HRMS" is absent from the first 100 words. Title says "SAP HRMS Software" (wrong intent, trademark). "87M of McKinsey Global Survey respondents" should be 87%. "em Expense" section reuses the HelpDesk sub-headings ("Efficient and Productive Helpdesk", "Single Platform"). Stats from 2018. No India statutory or Labour Code content. FAQ not in FAQPage schema. | H1 "HRMS Software for Indian Enterprises: One Human Resource Management System from Hire to Retire". Fix title, fix the stat, fix Expense copy, add the sections in 5.1. |
| /contract-labour-management-system-software/ | contract labour management system | 2,341 | Good length, keyword in H1 and intro. Never names the CLRA Act 1970 or the 4 Labour Codes. ~900 words of generic "LMS" filler ("In today's fast-paced business environment…", "Let's delve…", "Whether you're a small startup…"). US framing in FAQ (freelancers, statutory holidays). "GDPR Certified". "OSHAS" (OHSAS 18001 was replaced by ISO 45001). "Muster Role" should be Muster Roll. FAQ says "the product continues to evolve over the last 5 years" while the site claims 15+ years. Implementation FAQ says "emSphere HRMS is ready to use the CLMS platform". "12 modules" but only 8 module pages. Flip cards duplicate each H3 as an H4. | Replace the generic block with India-specific compliance sections (5.2). Add FAQPage schema. Fix errors. |
| /clms-onboarding-gatepass-management/ | gate pass management system | 537 | ~27% template text. No FAQ, no India specifics beyond Aadhaar. H1 "Onboarding & Gatepass Module" has no "system/software". Description echoes title. | Expand to 900+ words (5.3). H1 "Contract Worker Onboarding & Gate Pass Management System". |
| /clms-attendance-shift-overtime-management/ | contract labour attendance / overtime management | 478 | Zero statutory terms (no OT limits, no Factories Act / OSH Code hours). Generic benefits. | Add OT law limits, double-rate OT, spread-over, weekly-off rule blocking. |
| /clms-compliances-statutory-reports/ | labour law compliance software / CLRA compliance | 467 | Best module, but the forms and registers are not listed. Title uses "Compliance Management System" (very broad). | List registers and returns (Form XII, XIII, XVI, XVII, XIX, XXIV/XXV, Form B/D, BOCW), state-wise, plus Labour Code equivalents. |
| /clms-contractor-contract-employee-masters/ | contract employee master / contractor database | 445 | **URL changed from live `/clms-contract-employee-masters/`, no redirect.** Description echoes title. | Revert slug or add a 301. Expand. |
| /clms-contractor-portal/ | contractor portal / contractor management software | 470 | Two H2s both read "CLMS Contractor Portal Module". "Compliance Tracking" H3 appears twice. | Unique H2s. Add a contractor self-service walkthrough with screenshots. |
| /clms-manpower-planning/ | manpower planning software | 395 | Thinnest module. "Comprehensive Reporting" appears twice. | Add requisition-to-fulfilment workflow, cost forecasting, examples. |
| /clms-realtime-dashboards/ | contract labour dashboard | 446 | Generic benefits ("Enhanced Security", "Reduced Administrative Burden"). | Show actual dashboard KPIs (contractor liability, head count vs plan, OT %). |
| /clms-wages-contractor-billing/ | contractor billing software / contract labour wages | 420 | Mentions min-wage arrears and bonus. Says "compliance with tax regulations", which is vague. No Code on Wages, no PF/ESIC wage ceilings, no GST on contractor invoices. | Add wage-to-invoice reconciliation, principal-employer liability under the Code on Wages, GST invoice handling. |
| /empay-management-solution/ | payroll management software India | 1,018 | **"payroll" appears 0 times (live 18).** Title "emPay Management System, emPay Software India". H1 "…emPay Management System". URL changed. "TDF self-declaration" should be TDS. "GDPR Certification". "people like to it credited". No Code on Wages 50% wage rule, new tax regime, LWF, gratuity changes. | **Restore "Payroll Management Software" in URL/title/H1/body.** Keep emPay as the product name only. Add 5.4 sections. |
| /payroll-management-solution/ | (legacy ranking URL) | 6 | `noindex` + meta refresh + canonical to new URL. Static export cannot send a 301. | Make this the canonical payroll page again (preferred), or add a real 301 in root `.htaccess`. |
| /workforce-management-system/ | workforce management system | 828 | Title says "India", hero says "global enterprise". "120+ Happy Customers … worldwide" contradicts 500+ elsewhere. "99% Customer Satisfaction, Verified SLA delivery rating" has no source. FAQ written in third person ("Their systems are designed…") and generic ("most Workforce Management Systems…"). Overlaps heavily with HRMS (attendance, leave, payroll, ESS). | Reposition as Time, Attendance & Shift Rostering. Fix stats. Rewrite FAQ in first person, India-specific. Expand to 1,500. |
| /headcount-management-software/ | headcount management software | 432 | Thin. H1 "Get Total Count of People…" with no keyword. The word "headcount" appears 0 times in the body. ILO numbers ("6,50,000 deaths an year … due to hazardous substances") are global estimates labelled "for India", with no citation. "Keeps 15,00,000 workers safe" conflicts with the 10,00,000+ users stat. Mock UI number "1,428 On-Premises" is indexed as text. | Rewrite H1 "Real-Time Headcount Management Software for Factory Safety & Evacuation". Expand to 1,000+ (5.6). Cite sources correctly. |
| /visitor-management-system/ | visitor management system | 1,599 | Good depth. "Badge Printing" description is a copy of "Customizable Check-In". "full proof" should be foolproof. "India's leading" is unsubstantiated. "How Emsphere Enhances Workplace Security" H2 appears twice in near-identical form. No DPDP Act 2023 content in the product page. | Fix copy. Add DPDP consent and retention section, hardware list, plant use case. |
| /canteen-management-system/ | canteen management system | 1,569 | Third-person copy ("Their CMS is highly customizable"). FAQ addresses "canteen owners" and "customers" (wrong audience; buyer is the employer/HR/admin). Flip cards duplicate H3/H4 and "Tap to see details" text. H1 "…with em Meal System" with a broken space. No FSSAI / Factories Act canteen obligations. | Rewrite FAQ for employer/HR. Add statutory canteen and subsidy payroll-deduction content. |
| /about-us/ | Emsphere company / about | 1,669 | Strong new timeline and leadership content. But "2021: Achieved ISO/IEC 27001:2022 certification" (the 2022 edition did not exist in 2021). Inception 2015 vs "15+ years" vs CEO "18 years" vs live testimonial "using eMpower since May 2011". "10,00,000+ users" vs "2,000,000+ satisfied users" on the same page. No schema. Leaders have no photos/LinkedIn. | Reconcile all company facts (C-4). Add Organization + Person schema with `sameAs`. |
| /our-clients/ | — | 872 | Good logo and industry content (up from 14 words live). Paragraph FKGL ~26 (card fragments). | Add 3-5 mini case studies linked from each product page. |
| /testimonial/ | — | 980 | Lost 703 words vs live. Strong named quotes. | Restore legacy testimonials (they prove tenure). Add industry and product tags per quote. |
| /careers/ | — | 749 | Title duplicates brand: "Careers \| Emsphere Technologies - Join Our HR Tech Team \| Emsphere Technologies". | Fix title template. |
| /contact-us/ | — | 448 | Good NAP. Footer Privacy/Terms links 404. | Publish /privacy-policy/ and /terms-of-use/. |
| /blogs/ (served at /blog/) | HR/payroll/labour blog | 734 | 118 posts. See section 7. | — |

---

## 4. Findings by severity

### CRITICAL

**C-1. "Payroll" was find-and-replaced with "emPay" on the payroll page, and the ranking URL was retired.**
- Evidence: the live page `/payroll-management-solution/` has title "Payroll Management System, Payroll Software India - Emsphere", H1 "Simplify Your Payroll Process With A Powerful Payroll Management System", and 18 body mentions of "payroll". The new `/empay-management-solution/` has title "emPay Management System, emPay Software India - Emsphere", H1 "Simplify Your Salary Process With A Powerful emPay Management System", and **0** mentions of "payroll". The replacement also broke phrases: "100% accurate emPay", "End to End emPay", "emPay Teams". The same swap reduced "payroll" on HRMS from 13 to 7 and on Headcount, Visitor, Canteen and the CLMS module pages from 3 to 0 (footer/product-card copy).
- Impact: removes the page's relevance for "payroll management software India", "payroll software", and "payroll management system". Nobody searches "emPay software". Combined with a URL change done through a `noindex` meta refresh rather than a 301, this is the single largest ranking risk in the migration.
- Fix:
  1. Keep `/payroll-management-solution/` as the canonical URL. Move the new design there and point `/empay-management-solution/` at it, or delete it.
  2. Title: `Payroll Management Software India | emPay Payroll System – Emsphere`. H1: `Payroll Management Software That Gets Salary, PF, ESI, PT & TDS Right — Every Month`.
  3. Use "payroll" generically everywhere and "emPay" only as the product name ("emPay payroll software"). Undo the broken replacements in `app/empay-management-solution/page.jsx`, `components/FlagshipProducts.jsx` ("emPay helps organizations to manage their complete salary activities" should become "emPay payroll software manages salary, statutory compliance and payslips end to end") and the HRMS page.

**C-2. Renamed URL for the CLMS master module with no redirect.**
- Evidence: live = `/clms-contract-employee-masters/` (200). New = `/clms-contractor-contract-employee-masters/`. `out/` contains no page or redirect for the old slug. `app/clms-contractor-contract-employee-masters/page.jsx:28` has the comment "add a redirect when migrating". The only `.htaccess` in `deploy/` handles `/blog/` only.
- Fix: rename the route back to `/clms-contract-employee-masters/` (simplest for a static export), or add `Redirect 301 /clms-contract-employee-masters/ /clms-contractor-contract-employee-masters/` in the root `.htaccess`. Audit every live URL against the new sitemap before launch (the technical audit should own the full list).

**C-3. Broken trust pages: Privacy Policy and Terms of Use.**
- Evidence: the footer on every page links `/privacy-policy/` and `/terms-of-use/`. Neither exists in `out/` (local server returns 404). Live `/privacy-policy/` is 200; live `/terms-of-use/` is 404 too.
- Impact: Trust carries the most weight in the QRG. A B2B vendor processing Aadhaar, biometric, salary and PF data with no reachable privacy policy is a strong negative trust signal, and it also matters for DPDP Act 2023 notice obligations.
- Fix: port the privacy policy and publish a Terms of Use. Add DPDP-aligned sections: data fiduciary identity, grievance officer, retention, sub-processors (Azure India region), biometric data handling.

**C-4. Company facts contradict each other across pages (Trust and AI-citation killer).**

| Fact | Where | Value |
|---|---|---|
| Clients | Home, About, Contact, Clients, CLMS | 500+ |
| Clients | /workforce-management-system/ | "120+ Happy Customers, Enterprise clients worldwide" |
| Years | Home, About | 15+ Years of Experience |
| Years | About timeline | "2015 Inception in Pune" (11 years) |
| Years | Careers | "over a decade" |
| Years | CLMS FAQ | "The product continues to evolve over the last 5 years" |
| Years | Live testimonial (dropped) | "using eMpower time attendance since May 2011" |
| Users | Home, About stats | 10,00,000+ users |
| Users | About timeline 2025-26 | "Surpassing 2,000,000+ Satisfied Users" |
| Workers | Headcount | "Keeps 15,00,000 workers safe across India" |
| Certification | About | "2021 … Achieved ISO/IEC 27001:2022 certification" (ISO/IEC 27001:2022 was published in Oct 2022) |
| Certification | CLMS, emPay | "GDPR Certified Software" / "GDPR Certification" (no official GDPR certification scheme is in general use; this reads as a false claim) |

- Fix: create a single source of truth (e.g. `lib/company.js`) with the founding year (legal incorporation vs product origin, e.g. "products in use since 2011, incorporated as Emsphere Technologies Pvt. Ltd. in 20XX"), client count, active users, workers covered, and ISO certificate number, certifying body and year. Render every stat from it. Replace "GDPR Certified" with a factual statement such as "GDPR- and DPDP-aligned data protection controls; ISO/IEC 27001:2022 certified (Cert. No. …, issued by …)". Fix the 2021 timeline entry to the real certification year (or "ISO 27001:2013 in 2021, transitioned to 27001:2022 in 2024").

### HIGH

**H-1. The CLMS pillar page has no CLRA Act / Labour Codes coverage, which is the core topic of the SERP.**
- Evidence: on `/contract-labour-management-system-software/`, "CLRA" = 0, "Labour Code" = 0, "Code on Wages" = 0, "Social Security" = 0. The only legal specifics are "Form B, Form D, Annual return of principal employer, Interstate migrant labours" (FAQ) and "20+ State and central laws covered". Your own 2026 blog posts (`contract-labour-management-indian-principal-employers`, CLRA ×8; `workforce-management-system-scheduling`, Labour Code ×4) cover this better than the product page.
- Context: the four Labour Codes (Code on Wages 2019, Industrial Relations Code 2020, Code on Social Security 2020, OSH & Working Conditions Code 2020) were brought into force on 21 Nov 2025, and the OSH Code subsumes the CLRA Act 1970. Have legal counsel check the state-rule status before publishing. Indian buyers searching in 2026 expect a CLMS to explain principal-employer liability under both the legacy CLRA regime and the Codes.
- Fix: add the sections listed in 5.2 and replace the ~900-word generic "Features of Contract Labour Management System" / "Why Choose" filler.

**H-2. Generic, AI-style or third-person filler on the CLMS, Workforce, Canteen and Visitor pages.**
- Evidence (verbatim):
  - CLMS: "In today's fast-paced business environment…", "Let's delve into the key features that make Emsphere's LMS stand out", "Say goodbye to scheduling headaches", "Gone are the days of manual attendance registers", "Whether you're a small startup or a multinational corporation", "statutory holiday calculations", FAQ defining contract labour as "temporary workers, freelancers, and independent contractors" (US concept, not the Indian CLRA definition).
  - Canteen: "Emsphere understands that every organization has unique requirements. **Their** CMS is highly customizable…", FAQ for "canteen owners" and "customers".
  - Workforce FAQ: "Yes, Emsphere offers comprehensive and cutting-edge solutions… **Their** systems are designed…"
  - The CLMS "Proven Track Record" card cites case studies that do not exist.
- QRG relevance: generic phrasing, no first-hand experience, and third-person vendor copy are the low-quality-AI markers listed in the Sept 2025 QRG. The page still ranks today on age and links. After a migration recrawl, this filler weakens the helpfulness signal.
- Fix: rewrite in first person with Indian-plant specifics, e.g. "At a 7-plant auto-component maker, emCLMS blocks a worker at the turnstile the moment their contractor's licence or the work order expires…". Cut every paragraph that could appear on any vendor's site.

**H-3. HRMS page does not target "HRMS software" in its H1 or intro, and its title has the wrong intent.**
- Evidence: title "Human Resource Management System, SAP HRMS Software". H1 "A Single All-In One System for your HR Needs". The first 100 words start with "Highly Configurable & Flexible…". "SAP HRMS" attracts people looking for SAP SuccessFactors / SAP HCM and misuses a third-party trademark.
- Fix: title `HRMS Software India | Human Resource Management System – emSphere`. H1 `HRMS Software for Indian Enterprises — Hire to Retire on One Platform`. First sentence: "emSphere HRMS is a human resource management system built for Indian manufacturing and multi-location enterprises, covering recruitment, onboarding, attendance, leave, payroll, performance and exit, with PF, ESI, PT and TDS compliance built in." Mention SAP only as an integration ("integrates with SAP ECC / S/4HANA").

**H-4. Headcount page is thin and missing its own keyword.**
- Evidence: 432 words; "headcount" appears 0 times in the body; H1 "Get Total Count of People Within Company Premises in 'One Glance'". The blog post `/blog/headcount-and-staffing-management-system/` (1,137 words, title "Headcount Management System and Staffing Management India") is a stronger match for the query and will likely outrank or compete with the product page.
- Also: the "ILO for India" stats are misattributed. 6,50,000 deaths from hazardous substances is an ILO global estimate, and there is no citation link.
- Fix: see 5.6. Target 1,000-1,200 words, cite ILO and the DGFASLI (Directorate General Factory Advice Service & Labour Institutes) / Ministry of Labour with links and years.

**H-5. CLMS module pages are templated and thin (8 pages × 395-537 words).**
- Evidence: all 8 come from `components/ClmsModulePage.jsx` with identical structure: hero, mock UI card, 6 "Benefits", 6 "Features", 5-step workflow, Flagship Products, CTA. 27-37% of each page's text is the same template block. Pairwise unique-content Jaccard similarity is 0.18-0.23 (acceptable, so this is not duplicate content), but the unique copy is generic benefit statements ("Simplify payroll with automated calculations and disbursements"; "Enhanced Security: Secures attendance and compliance data with advanced security features"). None has an FAQ or FAQPage schema. Only the Breadcrumb schema is present. Same-page duplicate headings: Contractor Portal has two H2s reading "CLMS Contractor Portal Module" and two "Compliance Tracking" H3s.
- Risk: low-value, near-template pages dilute the CLMS cluster. They are also the natural pages for valuable long-tail terms ("gate pass management system", "contractor billing software", "labour law compliance software").
- Fix: per module, add (a) a 150-200-word "how it works at a plant" narrative, (b) module-specific statutory references, (c) 4-6 FAQs with FAQPage schema, (d) one quantified client outcome, (e) a module-specific keyword in the H1 (see the table in section 3 and section 6). Make the `ClmsModulePage` template accept `faqs`, `compliance`, `caseStudy` and `relatedPosts` props. Target 900+ words each.

**H-6. Blog internal links point to non-existent `/blog/<product>/` URLs (222 links in 99 posts).**
- Evidence: post HTML links to `https://www.emsphere.com/blog/contract-labour-management-system-software/` (38×), `/blog/headcount-management-software/` (21×), `/blog/workforce-management-system/` (20×), `/blog/visitor-management-system/` (17×), `/blog/canteen-management-system/` (12×), `/blog/human-resource-management-system/` (9×), `/blog/payroll-management-solution/` (8×). On WordPress these happen to resolve (the blog subsite serves the product page with a canonical to root). Under the new `deploy/wordpress-blog.htaccess`, `/blog/X/` is rewritten to `/blogs/X/`, which does not exist, so they return 404.
- Impact: blog-to-product link equity, the main internal-link signal into money pages, is lost at launch.
- Fix: rewrite `https://www.emsphere.com/blog/<product-slug>/` to `https://www.emsphere.com/<product-slug>/` when generating `data/blog-posts.json` (and `/blog/payroll-management-solution/` to the payroll canonical). 36 posts link to no product page at all, including the two best 2026 posts (`workforce-management-system-scheduling`, `digital-visitor-management-system-manufacturing`, both with 0 links). Add 2-3 contextual product links to each.

**H-7. Blog images and assets load from the staging host `olivedrab-dove-173337.hostingersite.com`.**
- Evidence: all 118 built post pages reference `hostingersite.com/blog/wp-content/uploads/...` (featured image `srcset`). 13 posts also contain staging links inside the body copy.
- Impact: images break when staging is removed, and a staging domain shows up in the page source (crawl and trust hygiene). Escalate to the technical audit.
- Fix: rewrite the asset host to `https://www.emsphere.com/blog/wp-content/...` during data generation.

**H-8. Testimonial page lost 703 words, including the only tenure evidence.**
- Evidence: the live page includes testimonials from Fundtech India, Itron India, DOW AgroSciences India and Aquatech Systems ("We have been using eMpower time attendance since May 2011"). The new page has 10 newer testimonials only.
- Fix: restore them in a "Long-standing clients" section. They support the 15+ years claim, once C-4 is reconciled.

### MEDIUM

**M-1. Blog quality, authorship and freshness (sample of 13 posts plus a full metadata scan of 118):**
- Author is `"Admin"` for 118/118 posts, rendered as "By Emsphere Team". BlogPosting `author` is the Organization, with no Person, credentials or reviewer. For labour-law and payroll compliance content (legal/financial, YMYL-adjacent) this is a major Expertise gap.
- `modified == date` for 118/118 posts: nothing has ever been refreshed. 51 posts are from 2022, and 98/118 are under 800 words (median 458).
- Junk or duplicate posts: `8-reasons-to-choose-clms` is **12 words**. `headcount-software-helps-track-employees-emergency` and `headcount-management-software-the-real-time-headcount-display-2` are identical (457 words, same title). `benefits-of-attendance-management-system` and `attendance-management-system-and-its-features` share the same description and 437 words.
- Metadata errors: SEO title is a URL (`how-does-modern-payroll-technology-aid-in-better-payroll-management` has title `https://emsphere.com/blog/...`). Healthcare post `benefits-of-hr-software-for-the-healthcare-sector-for-employees` has title "6 ways emContract Labour Management Software accelerates…". Typos in titles: "Emshere", "Esmphere", "Syste:", "Introducting". Stale year titles: "…IN 2018", "…In 2022?", "…in 2025". 47 titles are over 60 characters.
- Accuracy: the headcount posts cite "The Working Safety & Health Administration" (a garbled OSHA reference, US agency) and "EMTs". `labour-management-system-pune` opens with "Labour Management System" but describes an "Employee Attendance Management System".
- No external citations in any of the 13 sampled posts (0 outbound links to the Ministry of Labour, EPFO, ESIC or gazette notifications).
- **Positive:** the 2026 long-form posts (1,400-2,560 words: CLMS principal-employer guide, payroll compliance India, digital VMS for manufacturing, WFM scheduling) are good-quality, India-specific (CLRA, DPDP, Labour Codes) and worth building on.
- Fix: introduce named authors with bios (e.g. Head of Compliance Product, Payroll SME) plus Person schema, and a "Reviewed by" line for compliance posts. Add a visible "Last updated" date. Delete or 301 the 12-word post and the duplicates. Run the consolidation plan in section 6. Cite primary sources.

**M-2. Workforce page positioning overlaps with HRMS and conflicts with its India title.**
- Evidence: modules (Employee Mgmt, Time & Attendance, Payroll, ESS, Leave, Workflow, MIS) duplicate the HRMS page. The hero says "for today's global enterprise" while the title says "Workforce Management System India".
- Fix: position emWorkForce as time, attendance, shift rostering and field-workforce management for Indian plants (geo-fencing, biometric/face devices, roster auto-assign, OT caps, compliance registers). Link to HRMS for core HR and to payroll for salary.

**M-3. Visitor and Canteen copy errors, and the canteen FAQ targets the wrong buyer.** See the per-page table. The canteen FAQ should answer employer questions: subsidy and payroll deduction, contractor-worker meals, FSSAI vendor hygiene records, kiosk hardware, food-waste reporting, canteen obligations under the Factories Act / OSH Code.

**M-4. Readability is hard across product pages.**
- Paragraph-only Flesch Reading Ease: Home 27, HRMS 39, CLMS 22, emPay 43, Workforce 33, Headcount 48, Visitor 20, Canteen 16, CLMS modules 31-34. FK grade 10-16. Canteen has 16% of sentences over 25 words.
- B2B buyers (plant HR, IR heads) skim. Aim for FRE 40-55 and grade 10-12: split long sentences, use bullet lists for features, one idea per paragraph.

**M-5. Flip-card components duplicate headings and text.** "Why Choose" on CLMS and Canteen renders each item as H3 plus H4 with the same text, plus "Tap to see details". That gives 7-8 duplicate heading pairs per page and inflates the heading outline. Render the back-face title as a `<p>` or visually hidden text and drop the H4.

**M-6. Product naming inconsistency hurts entity clarity.** emContract / emCLMS / "em Contract" / "CWMS" (JK Cement quote) / "LMS" (CLMS page). emPay / emPayroll (blog). emCount / Emcount / "em Count". emMeal / "em Meal". Pick one canonical form per product: "emCLMS — Contract Labour Management System", "emPay — Payroll Software", and so on. Use it in copy, schema `SoftwareApplication.name` and alt text.

**M-7. FAQs on HRMS and CLMS are not marked up.** Workforce, Visitor and Canteen have FAQPage JSON-LD, but HRMS (5 Q&As) and CLMS (13 Q&As) do not. Add it (FAQ rich results are limited, but the markup helps AI answer engines extract Q&A). Trim the CLMS FAQ to India-specific product questions and move the generic "Define labor management" questions to a blog glossary.

### LOW

- **L-1.** Careers title duplicates the brand: "…Join Our HR Tech Team | Emsphere Technologies" with a second "| Emsphere Technologies" appended by the title template.
- **L-2.** 11 descriptions carry the brand-suffix artefact (e.g. home: "…powered by Emsphere Pune."). 3 descriptions echo their title (`clms-contractor-contract-employee-masters`, `clms-onboarding-gatepass-management`, blog `choosing-the-right-labour-attendance-app…`). These are secondary findings only; site-wide templating risk is low.
- **L-3.** Home, About, CLMS and emPay each have 65 logo `<img>` with empty or missing alt outside `aria-hidden` wrappers (marquee). This is fine if decorative, but give the first instance of each client logo a real alt ("Mahindra & Mahindra logo") to support the client-proof signal.
- **L-4.** Mock UI numbers ("1,428 On-Premises", "Today's Attendance Punches synced", "OT pending approval") are indexed as body text at the top of pages and push real intro copy out of the first 100 words. Add `aria-hidden="true"` to decorative mock UI, as the count-up strips already have.
- **L-5.** HRMS stats are dated (2018 LinkedIn report, a 2030 Korn Ferry projection) and the "87M" figure is wrong. Use 2024-2026 India-specific sources (e.g. NASSCOM, SHRM India) or remove them.
- **L-6.** The home page has no `<main>` landmark.

---

## 5. Exact sections to add per product page

### 5.1 HRMS (`/human-resource-management-system/`): target 2,200-2,500 words
1. **"What is an HRMS?"** 60-word definition paragraph (quotable), India framing.
2. **"HRMS built for Indian compliance"**: PF/EPFO ECR, ESIC, PT (state-wise), LWF, TDS (old vs new regime), Form 16, gratuity, bonus, maternity benefit, Shops & Establishments registers, Labour Codes readiness (wage definition, fixed-term employee gratuity).
3. **Module-by-module table** (Recruit, Welcome/Onboarding, Core HR, Attendance & Leave, Payroll, ESS mobile, Performance, Skills, Expense, HelpDesk, Exit, Analytics) with a one-line outcome each and links to /payroll and /workforce.
4. **"HRMS for manufacturing & multi-plant enterprises"**: blue-collar plus white-collar on one system, biometric/face device integration, shift workers, links to CLMS.
5. **Integrations**: SAP ECC/S/4HANA, Oracle, Tally, biometric brands, SSO/AD, Azure hosting (India region).
6. **Deployment & security**: cloud vs on-premise, ISO 27001 certificate detail, data residency, DPDP Act 2023.
7. **Implementation timeline** (6-10 weeks, as in the existing FAQ) as a phased graphic, plus migration from legacy systems.
8. **Client proof**: 2 HRMS-specific testimonials and 1 mini case study (numbers).
9. **Comparison: "HRMS vs HRIS vs HCM"** (captures informational queries).
10. Expanded FAQ (pricing model, user count, mobile app, data migration) with FAQPage schema.

### 5.2 CLMS pillar (`/contract-labour-management-system-software/`): target 3,000-3,500 words
Replace the generic "Features of Contract Labour Management System" and "Why Choose" filler with:
1. **"What is a Contract Labour Management System?"** India definition: principal employer, contractor, contract labour; why principal-employer liability makes a CLMS necessary.
2. **"Laws a CLMS must handle"**: CLRA Act 1970 & Central Rules 1971 (registration certificate, contractor licence, Forms XII, XIII, XVI, XVII, XIX, XXIV/XXV annual return); the 4 Labour Codes and what changes for contract labour (OSH Code thresholds, single licence, Code on Wages wage definition, social security for contract and gig workers); BOCW; Inter-State Migrant Workmen; Minimum Wages / VDA revisions; Payment of Bonus; EPF & MP Act; ESI Act; Factories Act working-hour/OT limits; state-wise variations. Present as a table: law → obligation → how emCLMS automates it → report/form produced.
3. **"Principal-employer liability: what happens if a contractor defaults"**: wage payment liability, PF/ESIC recovery, inspection risks, penalties.
4. **Gate pass & access compliance blocking**: licence expiry, work-order expiry, PF/ESIC challan not uploaded, medical/induction pending, continuous-working/weekly-off violation, so the turnstile denies entry. This is the strongest differentiator (cited in the Reliable Autotech and M&M testimonials) and is under-explained.
5. **PF/ESIC ECR reconciliation with AI**: how contractor challans are validated against the attendance-based wage register (UAN/IP number mismatch detection).
6. **Wage & contractor billing reconciliation**: attendance to wages to statutory deductions to service charge to GST invoice; arrears for minimum-wage revisions.
7. **Hardware & integrations**: face biometric terminals, turnstiles, SAP integration (mentioned only in the FAQ today).
8. **Implementation & scale proof**: "40,000+ contract labourers at Mahindra & Mahindra; 20,000+ across 28 Varroc locations; 10,000+ across 12 JK Cement plants", each linked to a case study.
9. **12-module overview grid** linking to the 8 module pages. Either build the missing 4 module pages or change "12 modules" to the real number.
10. **ROI section** with real numbers ("40% reduction in manual validation hours", "elimination of ghost workers", source: client).
11. India-only FAQ (8-10 Qs) with FAQPage schema. Remove US-framed generic Qs.

### 5.3 CLMS module pages: target 900-1,200 words each

| Module | Add |
|---|---|
| Onboarding & Gate Pass | Aadhaar/DigiLocker verification, police verification, medical fitness, safety induction, age check (child/adolescent labour prohibition), blacklist, gate pass validity tied to work order, ID card format, FAQ |
| Attendance, Shift & OT | Factories Act / OSH Code daily and weekly hour caps, OT at double rate, quarterly OT limits, spread-over, weekly-off enforcement, device integration, FAQ |
| Compliances & Statutory Reports | Full register/return list (Forms XII-XXV, Form B/D, BOCW, ISMW) by state, Labour Code formats, inspection-ready audit pack, licence/RC tracking, FAQ |
| Contractor & Employee Masters | Contractor KYC (PAN, GST, licence, WC/ESIC coverage), employee master fields, Aadhaar-binding trajectory across contractors, blacklisting rules, FAQ |
| Contractor Portal | Contractor self-service walkthrough (register, upload, onboard, challan upload, invoice), screenshots, access controls, FAQ |
| Manpower Planning | Requisition-to-fulfilment workflow, department/contractor allocation, cost forecasting vs budget, sanctioned vs actual headcount, FAQ |
| Real-time Dashboards | Named KPI tiles (contractor liability, head count vs plan, OT %, compliance violations), drill-downs, mobile view, FAQ |
| Wages & Contractor Billing | Minimum wages/VDA auto-revision, arrears, bonus, PF/ESIC wage ceilings, service-charge config, GST invoice, payment proof to principal employer, FAQ |

### 5.4 Payroll (`/payroll-management-solution/`, restored): target 2,000-2,500 words
1. Definition: "What is payroll management software?"
2. **India statutory payroll compliance table**: EPF (12%/ECR/UAN), EPS, EDLI, ESIC (wage ceiling, contribution periods), PT (state slabs), LWF (state-wise), TDS (old vs new regime, Section 192), Form 16/24Q/12BA, gratuity, bonus, minimum wages. Update references for the Income-tax Act, 2025 (effective 1 April 2026) if form numbering has changed; verify with your tax advisor.
3. **Labour Codes impact on payroll**: 50% "wages" definition and its effect on PF/gratuity base, CTC restructuring.
4. Payroll process flow: attendance to salary computation to reconciliation to bank file to payslip to statutory returns.
5. Multi-entity / multi-state / multi-pay-cycle payroll (Yashaswi 65K+ employees proof).
6. Full & final settlement.
7. Security and controls (maker-checker, audit trail, ISO 27001). Remove the "GDPR Certification" claim.
8. Reports by team (keep the existing section).
9. Integrations (Tally, SAP FI, banks).
10. FAQ with FAQPage schema (pricing model, employee-count limits, tax regime switch, mid-month joiners, arrears).

### 5.5 Workforce (`/workforce-management-system/`): target 1,500-1,800 words
Reposition around time, attendance, rostering and field force. Add: auto shift rostering logic, geo-fencing/GPS punch, face and biometric devices, OT and weekly-off compliance, multi-location dashboards, labour-cost analytics, an India plant use case, and correct stats (remove "120+ worldwide" and the unsourced 99%). Rewrite the FAQ in first person.

### 5.6 Headcount (`/headcount-management-software/`): target 1,000-1,200 words
New H1 containing "headcount management software". Add: definition; how real-time headcount works (turnstile/biometric in-out); evacuation roll-call and muster-point report; zone and red-zone access alerts; integration with CLMS and Visitor so contractors and visitors are counted; Factories Act / OSH Code emergency preparedness and ISO 45001 alignment; fire-drill reporting; a client example; correctly cited safety statistics (ILO global vs India DGFASLI data, with year and link); FAQ plus FAQPage schema.

### 5.7 Visitor (`/visitor-management-system/`)
Fix the duplicated Badge Printing copy. Add: DPDP Act 2023 consent notice, purpose limitation and retention for visitor data; plant-specific flows (contractor visitors, truck/material gate, safety induction video, PPE acknowledgement); hardware list (kiosk, ID scanner, printer); WhatsApp host alert; multi-plant central dashboard; a client example. Link to `/blog/digital-visitor-management-system-manufacturing/`.

### 5.8 Canteen (`/canteen-management-system/`)
Rewrite third-person copy. Add: employer-subsidy and payroll-deduction flow (link to payroll); contract-worker meal entitlement via CLMS; canteen statutory obligations (Factories Act s.46 / OSH Code; verify thresholds) and FSSAI vendor compliance records; food-waste and footfall analytics; vendor billing reconciliation; kiosk hardware; a client example; employer-focused FAQ.

---

## 6. Keyword-to-page mapping (anti-cannibalization)

### Money pages: one primary keyword each

| Primary keyword | Owner URL | Recommended title tag | Secondary keywords |
|---|---|---|---|
| HRMS software / human resource management system | /human-resource-management-system/ | HRMS Software India \| Human Resource Management System – emSphere | HR software India, HRMS for manufacturing |
| contract labour management system | /contract-labour-management-system-software/ | Contract Labour Management System (CLMS) Software India \| emSphere | CLMS software, contract worker management, CLRA compliance software |
| payroll management software India | **/payroll-management-solution/** (restore) | Payroll Management Software India \| emPay Payroll – emSphere | payroll software, payroll management system, statutory payroll compliance |
| workforce management system | /workforce-management-system/ | Workforce Management System India \| Attendance & Shift Rostering – emSphere | time and attendance software, shift scheduling software |
| headcount management software | /headcount-management-software/ | Headcount Management Software \| Real-Time Evacuation Roll-Call – emSphere | emergency headcount system, muster roll software |
| visitor management system | /visitor-management-system/ | Visitor Management System India \| Visitor Management Software – emSphere | VMS software, gate visitor management |
| canteen management system | /canteen-management-system/ | Canteen Management System for Factories & Offices \| emMeal – emSphere | canteen software, cafeteria management system |
| gate pass management system | /clms-onboarding-gatepass-management/ | Gate Pass Management System for Contract Workers \| emSphere CLMS | contract worker onboarding |
| labour law compliance software | /clms-compliances-statutory-reports/ | Labour Law Compliance Software \| CLRA & Labour Code Registers – emSphere | statutory compliance reports, CLRA registers |
| contractor billing software | /clms-wages-contractor-billing/ | Contractor Billing & Contract Labour Wages Software \| emSphere | contract labour payroll |
| contractor portal | /clms-contractor-portal/ | Contractor Portal Software \| Contractor Self-Service – emSphere CLMS | contractor management software |
| manpower planning software | /clms-manpower-planning/ | Manpower Planning Software for Contract Labour \| emSphere | labour deployment planning |
| contract labour attendance / OT | /clms-attendance-shift-overtime-management/ | Contract Labour Attendance, Shift & Overtime Management \| emSphere | OT management software |
| contract labour dashboard | /clms-realtime-dashboards/ | Real-Time Contract Labour Dashboards \| emSphere CLMS | labour analytics |
| contract employee master | /clms-contract-employee-masters/ (restore slug) | Contractor & Contract Employee Master \| emSphere CLMS | contractor database |
| Brand / HR tech suite India | / | HRMS, Payroll & Contract Labour Management Software India \| emSphere | HR tech suite, workforce & labour management |

The home page should stop using "Workforce and Labor Management System" as its title, because that phrase belongs to /workforce-management-system/.

### Blog posts competing with product pages: consolidate, re-angle or 301
Check Search Console clicks and impressions for each post before acting. Any post with meaningful traffic should be refreshed and re-angled rather than redirected.

| Cluster | Posts competing with the product page | Action |
|---|---|---|
| Contract labour / "labour management system" (~30 posts) | labour-management-system-pune, labour-management-system-lms-by-emsphere-technologies, comprehensive-labour-management-system, enhance-productivity-with-emspheres-labour-management-system, smart-labour-management-for-a-smarter-workforce, emspheres-labour-management-system-your-key-to-productive-staffing, why-every-business-needs-a-comprehensive-labour-management-system-in-2025, a-comprehensive-guide-to-labour-management-systems-powered-by-emhrms, management-of-contract-labor-management, top-5-benefits-of-implementing-a-contract-labour-management-system, top-6-benefits…, top-7-reasons…, 8-reasons-to-choose-clms (12 words), manage-contractual-labour-efficiently…, emspheres-integrated-system-for-effective-contractual-labor-management, workforce-harmony-a-closer-look… | 301 thin "benefits/why choose" posts (<600 words) to the CLMS pillar. Keep and strengthen `contract-labour-management-indian-principal-employers` (target "contract labour compliance for principal employers") and `contract-labour-management-system-india-compliance-guide` (re-angle to "CLRA Act vs Labour Codes: compliance checklist") as supporting informational content linking to the pillar. |
| Payroll | payroll-management-system-in-india, payroll-management-with-advanced-solution, transform-payroll-operations…, why-your-company-needs-a-modern-payroll-management-system, efficiency-unleashed…payroll-processing-software…, pros-of-payroll-software…, how-does-modern-payroll-technology… | 301 the "Emsphere payroll system" product-style posts to /payroll-management-solution/. Keep `payroll-management-system-compliance-india`, re-angled to "payroll compliance in India: PF, ESI, PT, LWF, TDS checklist 2026", and `payroll-compliance-how-payroll-software-helps…` merged into it. |
| HRMS | human-resource-management-system-in-india, the-role-of-hrms-software-in-transforming-hr-operations, need-of-human-resource-management-system, benefits-of-human-resource-management-system | 301 the first three to the HRMS page. Keep `benefits-of-human-resource-management-system` as "HRMS benefits" informational content. |
| Workforce | workforce-management-system-scheduling (title "Workforce Management System India…", exact overlap), need-of-workforce-management-system, benefits-of-effective-automated-workforce-management-system, workforce-management-solution-combines…, workforce-management-solutions-revolutionary… | Retitle `workforce-management-system-scheduling` to "Shift Scheduling & Rostering for Indian Plants: A Practical Guide" and link it to the product page. 301 the thin 2022 posts. |
| Headcount | headcount-and-staffing-management-system ("Headcount Management System…India"), staffing-headcount-management-system-in-pune, headcount-management-system-the-key-to-workforce-optimization, headcount-management-drive-operation, need-of-head-count-system-in-a-company, plus the two duplicate posts | Merge the best content into the expanded product page (5.6). 301 the duplicates and the Pune post. Keep one informational post: "Emergency evacuation roll-call: how to account for every worker". |
| Visitor | visitor-management-system-pune, introducting-emspheres-visitor-management-system, emspheres-visitor-management-system-elevate…, visitor-management-system-vms-and-how-it-works, future-of-smart-offices…, create-an-efficient…lobby… | 301 the Pune, "Introducting" and "elevate" posts to /visitor-management-system/. Keep `digital-visitor-management-system-manufacturing`, `visitor-management-system-business-security-investment` and `future-trends-in-visitor-management-systems…` as supporting content. |
| Canteen | canteen-management-simplify-with-the-emmeal-system (near-identical to the product H1), introduction-to-canteen-management-systems, top-7-benefits…, know-whats-on-the-menu…, benefits-of-implementing-a-contractor-canteen-system | 301 the first two to /canteen-management-system/. Keep `how-canteen-management-system-corporate-dining-india` and `how-a-canteen-management-system-cuts-food-costs…`. |
| Attendance / leave (no product page) | ~19 attendance and leave posts, including several "Pune" variants | Consolidate into 2-3 guides linking to /workforce-management-system/. The "Pune" city-variant posts are doorway-like; merge them. |
| Duplicates / junk | 8-reasons-to-choose-clms (12 words), headcount-…-display-2, attendance-management-system-and-its-features | 301 to the canonical equivalents. |

**Rule going forward:** blog posts target informational queries (what, how, checklist, law, vs). Product pages own commercial queries (software, system, India, price, vendor). No blog title should start with a product page's head term.

---

## 7. Blog sample summary (13 posts reviewed in full; 118 scanned)

| Post | Date | Words | Assessment |
|---|---|---|---|
| 8-reasons-to-choose-clms | 2022-11-20 | 12 | Junk. Delete or 301. |
| headcount-software-helps-track-employees-emergency | 2022-11-20 | 457 | Exact duplicate of `…display-2`. US references (OSHA garbled, EMTs). |
| headcount-management-software-the-real-time-headcount-display-2 | 2022-11-21 | 457 | Duplicate. |
| benefits-of-hr-software-for-the-healthcare-sector-for-employees | 2022-11-19 | 706 | SEO title is for a different post ("6 ways emContract…"). |
| traditional-hris-tools-dont-work-blue-collar-workers-2018 | 2022-11-20 | 421 | Title says "2018", all caps, no links. |
| labour-management-system-pune | 2024-07-12 | 720 | Topic drift (describes attendance software). Generic "fast-paced landscape" copy. City doorway. |
| payroll-management-system-in-india | 2024-10-15 | 741 | Cannibalizes the payroll page. Generic. Zero statutory specifics. |
| human-resource-management-system-in-india | 2024-10-15 | 835 | Cannibalizes the HRMS page. "Basically, HRMS stands for… which is basically…". |
| contract-labour-management-system-india-compliance-guide | 2026-04-13 | 1,032 | Decent. CLRA ×3. No primary-source links. |
| contract-labour-management-indian-principal-employers | 2026-07-22 | 1,632 | Good. CLRA ×8, FAQ, India-specific. Keep as a pillar support. |
| payroll-management-system-compliance-india | 2026-07-22 | 1,580 | Good. Uses "emPayroll" (naming inconsistency). |
| digital-visitor-management-system-manufacturing | 2026-08-14 | 2,560 | Strong, DPDP-aware. 0 internal links. |
| workforce-management-system-scheduling | 2026-08-30 | 2,431 | Strong, Labour Codes ×4. 0 links. Title overlaps the product page. |

---

## 8. Prioritised action list

1. **(Critical, before launch)** Restore `/payroll-management-solution/` as the canonical payroll page and put "payroll" back in its title, H1 and body (C-1).
2. **(Critical, before launch)** Restore the `/clms-contract-employee-masters/` slug or add a 301. Diff all live URLs against the new sitemap (C-2).
3. **(Critical, before launch)** Publish /privacy-policy/ and /terms-of-use/ (C-3).
4. **(Critical)** Reconcile company facts. Remove "GDPR Certified". Fix the ISO 2021/2022 entry (C-4).
5. **(High, before launch)** Fix 222 blog links (`/blog/<product>/` to root) and the staging image host (H-6, H-7).
6. **(High)** Rewrite the HRMS and Headcount H1s and titles, and expand Headcount (H-3, H-4).
7. **(High, 2-4 weeks)** Replace the CLMS generic filler with the CLRA/Labour Codes compliance sections (H-1, H-2, 5.2).
8. **(High, 4-6 weeks)** Expand the 8 CLMS module pages to 900+ words with FAQs and statutory specifics (H-5).
9. **(Medium)** Blog: named authors, reviewer, updated dates, consolidation and 301 plan, internal links (M-1, section 6).
10. **(Medium)** Unify product naming. Add FAQPage to HRMS/CLMS. Fix flip-card heading duplication. Improve readability (M-4 to M-7).

*Cross-skill notes: the redirect implementation, the `/blogs/` vs `/blog/` duplicate-path exposure, and schema expansion (Organization `sameAs`/`address`/`foundingDate`, Person schema for leaders and authors) belong in the technical and schema audits. Thin or templated generated pages beyond the CLMS modules can be reviewed with the `seo-programmatic` sub-skill.*
