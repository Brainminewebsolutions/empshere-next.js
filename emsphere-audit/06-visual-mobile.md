# 06 - Visual / Mobile Rendering Audit (emSphere, local static export http://127.0.0.1:4173/)

Method: Playwright Chromium headless, desktop 1366x768 and mobile 390x844 (DPR 2, touch, is_mobile). Each page was captured at 300 ms after load (`*-early.png`), at about 2.8 s (`*-desktop.png`, `*-mobile.png`) and full-page (`*-full.png`). DOM metrics were collected by script (opacity of `.reveal-on-scroll`, tap target sizes, overflow, CLS via PerformanceObserver). No source files were modified.

Screenshots are in `C:\Users\AJINKYA\OneDrive\Desktop\EMSPHERE NEXT.JS\emsphere-audit\screenshots\`. Slugs: `home`, `human-resource-management-system`, `contract-labour-management-system-software`, `empay-management-solution`, `workforce-management-system`, `visitor-management-system`, `contact-us`, `blogs`. Each slug has `-desktop`, `-mobile`, `-desktop-early`, `-mobile-early`, `-desktop-full` and `-mobile-full` PNGs.

## Per-page summary (above the fold)

| Page | H1 | Keyword in H1 | CTA above fold (desk / mob) | Trust signals ATF | Mobile H-overflow | CLS |
|---|---|---|---|---|---|---|
| / | "HR Tech Re-imagined" (3 H1s, one per slide) | No (brand/tagline only) | "REQUEST DEMO" + "Get Started" / "REQUEST DEMO" y=419 | 500+ clients, 15+ yrs, 10,00,000+ users, 10+ industries (stat card) | none (scrollW=390) | ~0 |
| /human-resource-management-system/ | "A Single All-In One System for your HR Needs" | Partial ("HR System"; not "HRMS") | Book a Demo / yes | none | none | 0 |
| /contract-labour-management-system-software/ | "Contract Labour Management System made Simple!" | Yes | Book a Demo + inline "Request for demo" form / yes (y=559) | "trusted by 500+ clients" in copy only | none | 0 |
| /empay-management-solution/ | "Simplify Your Salary Process With A Powerful emPay Management System" | Yes | Book a Demo / yes | none | none | 0 |
| /workforce-management-system/ | "An Intuitive modern Workforce Management System for today's global enterprise" | Yes | Book a Demo / yes | none (feature chips only) | none | 0 |
| /visitor-management-system/ | "Smart Visitor Management System by Emsphere Technologies" | Yes | Request for demo / yes | none | none | 0 |
| /contact-us/ | "Connect With Our HR Tech & Workforce Specialists" | n/a | Book a Free Demo / yes | ISO/IEC 27001:2022, 500+ clients, 24h reply | none | 0 |
| /blogs/ | "HR, Payroll & Workforce Insights" | OK for hub | none besides header "Get Started" | none | none | 0 |

The viewport meta is correct on every page (`width=device-width, initial-scale=1`). No horizontal scroll on mobile on any page. No cookie banners or modal overlays were seen on first load. The only fixed items are the closed menu drawer and the floating button at bottom-right (50x50 desktop, 43x43 mobile).

## Findings

### Critical
None visual-blocking. The reveal-on-scroll risk below is rated High and could be raised to Critical if Google rendering tests show missing content.

### High

**H1. Most below-the-fold content is `opacity:0` in the initial render (reveal-on-scroll).**
- After 2.8 s with no scroll, the share of `.reveal-on-scroll` elements still at opacity below 0.1 was:
  - Home 42/42
  - HRMS 48/53
  - CLMS 71/73
  - emPay 47/49
  - Workforce 25/27
  - Visitor 55/57
  - Contact 24/31
  - Blogs 19/26
- The CSS in `app/globals.css` lines 161-206 sets `opacity:0; transform:translateY(...)` on the `reveal-fade-*` and `reveal-zoom-in` classes under `.animated-page` and `.hrms-page`. `components/ScrollReveal.jsx` adds `reveal-visible` through an IntersectionObserver (threshold 0.08, rootMargin -30px). The static HTML contains `reveal-on-scroll` markup, for example 11 on the home page, so any consumer that does not run JS or scroll sees invisible sections.
- Evidence: `*-full.png` full-page captures show large blank regions, because Playwright does not scroll to trigger the observer.
- The text is in the DOM, so Google (which renders JS in a tall viewport) will probably index it. The risks are:
  - Non-JS crawlers, such as some AI crawlers, social scrapers and Bing in some modes.
  - Google rendering where IntersectionObserver never fires.
  - Hidden-content heuristics.
  - Visible blank sections when users jump to anchors or print.
- Fix:
  - Make visible the default state. Gate the hidden state behind a `.js-reveal` class that a tiny inline script adds to `<html>` (so no-JS users see everything).
  - Add `<noscript><style>.reveal-on-scroll{opacity:1!important;transform:none!important}</style></noscript>`.
  - Add a fallback timer (for example 1.5 s) that reveals everything.
  - Do not start sections that are partly in the first screen at opacity 0.
  - Keep the `prefers-reduced-motion` override (it already exists).

**H2. Home page has 3 `<h1>` elements and none contains a target keyword.**
- The hero slider renders three H1s in the HTML: "HR Tech Re-imagined", "Connected HR" and "Adaptive & Integrated". Only the first is visible; the others report empty `innerText` because their slides are hidden.
- The visible value proposition has no mention of HRMS, payroll, contract labour or workforce management, and the product names are not in the H1 or hero copy.
- Fix:
  - Use one H1 on the page, with a keyword-bearing statement such as "HRMS, Payroll & Contract Labour Management Software for Indian Enterprises". Keep "HR Tech Re-imagined" as the eyebrow or tagline.
  - Render slides 2 and 3 as `<p>` or `<h2>`.
  - Add a descriptive subline naming emHRMS, emPay and CLMS.

### Medium

**M1. Hero slider on the home page.**
- Slider dots are about 17 px (desktop) and 20 px (mobile), well under the 44-48 px tap target.
- On mobile (`home-mobile.png`) the hero text sits over a washed-out photo with a heavy white overlay; the H1 is only 26 px, small for a hero, and the paragraph is grey on a busy image. Contrast is borderline.
- The stat counters render animated digits during load. `home-desktop-early.png` shows "2_6+", "40+", "00,00,000+" at 300 ms. Crawlers may read zeros, and the layout is visibly jittery. The final values are correct.
- Fix: enlarge the dot hit areas (padding), raise the H1 to at least 32 px on mobile, add a stronger text scrim, and server-render the final counter values (animate with CSS or aria-hidden).

**M2. Small tap targets and text.**
- Above the fold on mobile, the logo link (138x36) and close/menu buttons (36x36) are below 44 px. The drawer product links are 21-36 px tall (for example "Contract Labour mana..." 250x21, emHRMS 278x33). The CLMS sub-links are 36 px tall and the expand toggle is 36x36 (24x24 on desktop).
- Floating button at bottom-right: 43x43 on mobile (just under 48).
- Fix: use at least 44 px min-height on the drawer links, burger and toggle buttons, and at least 48 px for the floating button.
- Footer links are 165x20 to 165x41.
- 24-70 text elements per page have computed font size under 14 px (they appear to be the hero mock-up UI labels and footer/cards). Body text is 16 px or more on mobile; this is acceptable.

**M3. Home page and CLMS/emPay pages carry about 200 images with no alt.**
- `imgNoAlt` was 204 of 295 on home, 195 of 280 on CLMS and 195 of 276 on emPay (the logo marquee and mega-menu images). HRMS, workforce, visitor and contact pages are 0.
- Fix: add alt text (client name) or `alt=""` when decorative. Better, reduce the marquee to a lighter DOM. A 280-295 image DOM on a landing page also hurts LCP/INP.

**M4. Trust signals missing above the fold on product pages.**
- Only home (stat card) and contact (ISO 27001, 500+ clients) show trust cues above the fold. The HRMS, emPay, workforce and visitor pages show only a CTA and a product visual. The CLMS page has "500+ clients" in a paragraph.
- Fix: add a one-line strip under the hero CTA, for example "500+ clients - ISO 27001 - 10 lakh+ users" with 3-5 client logos.

**M5. Blogs hub has no demo CTA in its hero** (`blogs-mobile.png`). The hero is long (about 1,300 px on mobile) before the first article. A post-card stack appears at y~1,300 CSS px at 390 px wide. Add a "Request demo" button and show the latest article within the first screen.

### Low

**L1. Right-edge shadow artifact on mobile.** All `*-mobile.png` shots show a pale vertical gradient or shadow on the right edge (x ~370-390). It comes from the off-canvas menu drawer (`aside fixed right-0 z-[55] 332px`) casting a box-shadow into the viewport while closed. Fix: use `visibility:hidden` or `shadow-none` when closed.

**L2. Desktop right gutter.** Desktop shots show a ~15 px white strip at the right (scrollWidth 1351 vs 1366). This is probably the scrollbar in headless Chrome, with a possible `overflow-x-hidden` wrapper; verify in a real browser. The home page marquee track and the visitor/workforce carousel items extend past the viewport width, but they are clipped and not scrollable.

**L3. CTA label inconsistency.** Header "Get Started"/"Contact Us", hero "REQUEST DEMO", "Book a Demo", "Request for demo" and "Book a Free Demo" are all used. Standardize on "Request a Demo" for consistent conversion tracking and keyword relevance.

**L4. Layout shift.** CLS was effectively 0 on all pages (home about 0.00001 desktop, 0.00004 mobile). The only visible jitter is the counter animation (M1). No intrusive interstitials. Hero images appear without a visible jump in the early captures.

**L5. Header on mobile.** The hamburger is accessible and the logo and burger fit. Check that the burger has an `aria-label` (the close button does, "Close menu").

## Quick-win priority
1. Make reveal-on-scroll content visible by default, with no-JS and timer fallbacks (H1).
2. Reduce the home page to a single keyword-rich H1 (H2).
3. Fix alt text and DOM weight on the marquee (M3).
4. Increase tap target sizes in the drawer, slider dots and floating button (M1/M2).
5. Add trust strips to the product page heroes and a CTA to the blog hero (M4/M5).
