# 03 - Schema.org / JSON-LD Audit: emSphere (Emsphere Technologies)

Scope: all 152 `out/**/index.html` files (incl. `_not-found`, `404`), all 118 blog posts parsed programmatically (not just a sample), plus `lib/schema.js`, `app/blogs/[slug]/page.jsx`, `components/Footer.jsx`, `components/OfficeFlipCards.jsx`, `components/JobOpenings.jsx`. No source files were modified.

## Schema score: 58 / 100

| Area | Score | Note |
|---|---|---|
| JSON validity / syntax | 10/10 | Every block parses; `@context` is `https://schema.org`; absolute URLs; ISO 8601 dates |
| @id consistency / graph integrity | 9/10 | No unresolved references, no conflicting Organization/WebSite definitions (checked across all pages) |
| Rich-result eligibility | 6/20 | Software App invalid (no offers/rating); FAQ retired; BlogPosting OK except 2 posts missing `image`; Breadcrumb OK |
| Organization / entity completeness | 6/20 | No sameAs, address, contactPoint, email, phone, foundingDate |
| Coverage across pages | 12/20 | About, Contact, Careers, Clients, Testimonial have no schema; headcount and 8 CLMS pages bypass the helper |
| Correctness of data values | 15/20 | Blog images on staging host, `wordCount: 12`, stray FAQPage, mojibake in some descriptions |

## Detection results (per page)

| Page | Types detected | Status |
|---|---|---|
| `/` | Organization, WebSite, WebPage, ItemList (6 products) | Valid. No rich result applicable (ItemList of non-rich entities is fine). Org thin. |
| `/human-resource-management-system/` | Org, WebSite, SoftwareApplication, WebPage, BreadcrumbList | Breadcrumb valid; SoftwareApplication NOT rich-result eligible (see C/H1) |
| `/contract-labour-management-system-software/` | same as above | same |
| `/empay-management-solution/` | same | same |
| `/workforce-management-system/` | same + FAQPage | same; FAQ = Info |
| `/visitor-management-system/` | same + FAQPage | same; FAQ = Info |
| `/canteen-management-system/` | same + FAQPage | same; FAQ = Info |
| `/headcount-management-software/` | SoftwareApplication, BreadcrumbList (inline, no `@id`) | Valid JSON. Not using helper; `publisher` is an inline Organization with no `@id` (creates a second, un-linked org entity); no WebPage/Org/WebSite nodes; name has mojibake risk ("emCount - Headcount", see M3) |
| `/clms-*` (8 pages) | BreadcrumbList only (standalone object, no `@graph`) | Valid, rich-result eligible. Parent is "Contract Labour Management System" - correct hierarchy |
| `/about-us/` | none | Missing (AboutPage) |
| `/contact-us/` | none | Missing (ContactPage + LocalBusiness offices) |
| `/careers/` | none | None needed now: JobOpenings.jsx says "placeholder openings". Do NOT add JobPosting |
| `/our-clients/` | none | Optional (CollectionPage + breadcrumb) |
| `/testimonial/` | none | Optional (CollectionPage + breadcrumb). No Review markup (see L2) |
| `/blogs/` (canonical `/blog/`) | CollectionPage w/ inline ItemList, BreadcrumbList | Valid. `isPartOf` is an inline WebSite without `@id` (M2). ItemList items should be capped to what is displayed |
| `/blogs/<slug>/` x118 | BlogPosting + BreadcrumbList | Valid; Article rich-result requirements met (headline, image*, datePublished, author, publisher). *2 posts lack `image` |
| `/payroll-management-solution/` | none (redirect stub, canonical to `/empay-management-solution/`) | OK |
| `/404`, `/_not-found` | none | OK (but canonical is `/`; not a schema issue, see note) |

### Cross-site checks
- `https://www.emsphere.com/#organization` in blog posts vs `lib/schema.js`: IDs match. The blog's inline publisher Organization is a strict subset (name, url, logo) of the helper's, so no property conflicts - but it is a second copy and is thinner (no description). Safe today, will drift when you enrich the Organization (see H3).
- Blog `author: {"@id": ".../#organization"}` is resolved in the same graph by the `publisher` node (same `@id`), so no dangling reference. All 118 posts use the org as author (0 Person authors).
- All `url` / `item` values equal their page canonical (verified for every product page, headcount, CLMS, blog listing and posts). Blog canonical `/blog/...` is correct because the host maps `/blog` to `out/blogs` (deploy `.htaccess`); schema URLs correctly use `/blog/`.
- Logo: `public/universal-images/header/emsphere-technologies-logo.webp` exists (33 KB), 550x143 matches. WebP is accepted by Google. Logo is a wide wordmark; Google wants it crawlable and a sensible aspect ratio - fine, but a square 112x112+ PNG is better for knowledge-panel use (L1).
- Duplicate `@id` with differing content: none found (Organization and WebSite are byte-identical on all 7 helper pages).
- No `http://` contexts, no placeholder text, no relative URLs.

## Findings

### Critical
None. No syntax errors, no invalid markup that would trigger Search Console errors on eligible types.

### High

**H1. SoftwareApplication on 6 product pages is not eligible for the Software App rich result (and will show as "invalid" if tested in Rich Results Test).**
Google requires `name`, `offers` (price, can be 0) and either `aggregateRating` or `review`. You have neither, and (correctly) should not invent them. Options, honestly assessed:
1. Keep as is (recommended default). The markup is still valid Schema.org, helps entity understanding, and Search Console only reports "Software app" enhancement errors if the page is enrolled; pages missing required fields appear as non-eligible, not as a penalty. Enterprise B2B software sold on quote has no public price.
2. Add `offers` with real data only if true: for quote-only products, an `Offer` without a price is not accepted by Google's validator (price required). `price: 0` would misstate a paid product - do not do this.
3. Add `aggregateRating` / `review` only if you have genuine, verifiable, user-visible ratings (e.g. real G2/Capterra/Gartner Peer Insights data shown on page, or the client testimonials treated as `Review` with the real named reviewer and visible text on the same page). Testimonials are company-attributed endorsements the company chose to publish; Google treats self-serving reviews on your own entity as ineligible (see L2). Not recommended.
4. Recommended refinement: switch `@type` to `["SoftwareApplication","WebApplication"]`? Not needed; instead keep `SoftwareApplication` and add `featureList`, `softwareHelp` and `audience` for semantic value (no rich result, but no harm). Keep expectations: no Google SERP feature results from this type.

Net: treat this schema as entity/semantic markup, not rich-result markup, and say so internally so nobody expects stars/price in SERPs.

**H2. Organization node is too thin for entity/knowledge-panel use.** Missing `sameAs`, `address`, `contactPoint`, `email`, `telephone`, `foundingDate`, `legalName`. Real data is already on the site: LinkedIn, Facebook, Twitter (footer), HQ address, phones, hr@/sales@ emails. See Code 1. The Twitter/X URL in the footer is `twitter.com/emspheretech`; keep it as-is (x.com redirect) unless the handle was changed - verify before publishing. No YouTube/Instagram profile appears on the site, do not add any.

**H3. Blog posts embed their own Organization copy (`app/blogs/[slug]/page.jsx` lines ~107-114) instead of importing `organizationNode` from `lib/schema.js`.** Once H2 is applied, blog posts will carry a contradictory, thinner Organization with the same `@id` (Google merges, but validators and other consumers may not). Import the helper. Also note `SITE_URL` differs in form between files (`.../` with trailing slash in `lib/schema.js`, no slash in the blog page, which then re-adds `/`); output is currently identical but is fragile. See Code 4.

**H4. Blog `image` URLs point to the staging host `https://olivedrab-dove-173337.hostingersite.com/blog/wp-content/uploads/...` in all 118 posts (grep: 118 out of 118 `index.html` files contain `hostingersite`).** Article image is a recommended property and Google will try to fetch it; a staging domain that may be taken down or noindexed means the image fails and cross-domain is poor for brand. Re-host images on `www.emsphere.com` (e.g. `/blog/wp-content/uploads/...` or `/universal-images/blog/`) and use that for both schema and og:image. 2 posts have no `image` at all (e.g. `/blog/8-reasons-to-choose-clms/`); fall back to a default 1200x630 image.

### Medium

**M1. `wordCount` is wrong for some posts** (min 12, max 2560 - e.g. `8-reasons-to-choose-clms` reports 12). Not a rich-result field, but wrong values are noise; compute from body text or drop it when < ~100.

**M2. Blog listing `isPartOf` is an inline `{"@type":"WebSite","name":"Emsphere Technologies","url":"https://www.emsphere.com"}`** with a different name ("Emsphere Technologies") from the helper's WebSite (`name: "Emsphere"`) and no trailing slash. Replace with `{"@id": "https://www.emsphere.com/#website"}` and include the Organization + WebSite nodes in that graph (same as other pages) so the reference resolves standalone. Blog listing BreadcrumbList node has an `@id`, but blog post breadcrumbs have none (fine, but add `@id` for consistency).

**M3. Encoding corruption ("�" replacement chars) in some text:** headcount `name` ("emCount � Headcount Management Software"), blog 8-reasons description ("�emContract� is...") and blog listing item names ("Emsphere�s"). These are literal U+FFFD in the built HTML JSON, shown in output as `�`. Likely the source text was a CP-1252 smart quote/en dash that was mis-decoded when saved. Fix source strings (use `'`, `-`, or proper UTF-8). The FAQ/product helper pages are clean.

**M4. Headcount page (`app/headcount-management-software/page.jsx`) should use `productPageJsonLd`.** Gains Organization/WebSite/WebPage nodes and `provider` @id link (currently `publisher` inline org). Code 2.

**M5. CLMS module pages emit only a BreadcrumbList.** Valid, but each module is a distinct feature/page of the parent product. Add WebPage with `isPartOf` Website and `about` -> parent SoftwareApplication `@id` (`.../contract-labour-management-system-software/#software`), so the graph connects. Code 3. Do not make each module a separate SoftwareApplication (would create duplicate/competing app entities).

**M6. No schema on About, Contact (core entity pages).** Add `AboutPage` and `ContactPage` (Code 5, 6). Contact is the best place to declare the three offices as `Organization` `location` entries with `PostalAddress` (real data from `OfficeFlipCards.jsx`).

### Low / Info

**I1 (Info). FAQPage on workforce, visitor and canteen pages.** Google retired FAQ rich results for all sites (May 2026). No SERP benefit; any AI-search benefit is unconfirmed. Harmless to keep (valid, matches visible content - confirm visible FAQs exist on-page). Do not add to other pages for SERP purposes; no need to prioritise removal. If these are genuine user-submitted Q&A, use QAPage; they are not, so leave as FAQPage or remove.

**L1.** Provide a square logo (>=112x112 px, PNG/WebP) in addition to the wordmark, e.g. `/universal-images/header/emsphere-logo-square.png`. Only if a square asset exists; otherwise leave.

**L2.** Do NOT add `Review`/`AggregateRating` from `lib/testimonials.js`: the quotes are client testimonials curated by the company about itself; Google's self-serving review policy makes them ineligible for Organization/SoftwareApplication, and `rating: 5` defaulting in `TestimonialsSlider.jsx` (`testimonial.rating || 5`) means the star count is not real data. Only consider Review markup if you gather genuine third-party ratings (G2, Capterra, Google Business) with verifiable counts.

**L3.** `/careers/`: JobOpenings.jsx explicitly states "these are placeholder openings - replace with real roles". JobPosting on fake jobs violates Google's policy and could trigger a manual action. Add JobPosting only once real, currently open roles exist (template in Code 7 for later).

**L4.** `WebSite` node has no `potentialAction` SearchAction. Do not add unless site search exists (sitelinks searchbox was retired anyway).

**L5.** Note (non-schema): `_not-found` and `404` pages carry canonical `/`. Harmless for 404 status but reconsider.

**L6.** Product `WebPage` nodes lack `description`, `inLanguage`, `datePublished/dateModified`. Add `inLanguage: "en-IN"` or `"en"` and `description` (already available) - optional.

**L7.** Home `ItemList` of product URLs is fine but Google only supports ItemList rich results for carousels of Recipe/Course/Movie/Restaurant; it is purely semantic here. `/payroll-management-solution/` stub is correctly excluded from sitemap and from schema.

## Ready-to-use code

### Code 1 - Enriched Organization (`lib/schema.js`)
Real data only, taken from Footer.jsx, contact-us/page.jsx and OfficeFlipCards.jsx. Verify the Facebook and Twitter URLs resolve before publishing, and confirm which phone is the primary one. Verify `foundingDate` before adding (not found on site, intentionally omitted).

```js
export const organizationNode = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Emsphere Technologies",
  legalName: "Emsphere Technologies", // replace with registered legal name (e.g. "... Private Limited") if different
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: LOGO_URL, width: 550, height: 143 },
  description:
    "Emsphere Technologies provides HR technology, workforce management and labour management solutions for enterprises.",
  email: "sales@emsphere.com",
  telephone: "+91-7798981117",
  sameAs: [
    "https://www.linkedin.com/company/emsphere-technologies/",
    "https://www.facebook.com/emspheretechnologies/",
    "https://twitter.com/emspheretech",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "2nd Floor, Sapphire Chambers, Above Axis Bank, Baner Road, Baner",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411045",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+91-7798981117",
      email: "sales@emsphere.com",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    { "@type": "ContactPoint", contactType: "human resources", email: "hr@emsphere.com" },
  ],
};
```
Note: footer says `facebook.com/...` without `www`; canonical Facebook form is `https://www.facebook.com/emspheretechnologies/`.

### Code 2 - Headcount page via helper
```jsx
import { productPageJsonLd, jsonLdScript } from "@/lib/schema";

const jsonLd = productPageJsonLd({
  url: "https://www.emsphere.com/headcount-management-software/",
  name: "emCount - Headcount Management Software",
  description:
    "Emsphere Headcount & Staffing Management Software offers a unique capability to display the total count of people inside company premises in real time.",
  subCategory: "Headcount Management Software",
  pageName: "Headcount Management Software",
  breadcrumbName: "Headcount Management Software",
});
// <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
```
(Remove the inline SoftwareApplication/BreadcrumbList. Use a plain hyphen, not a smart dash, in `name`.)

### Code 3 - CLMS module pages (`components/ClmsModulePage.jsx`)
```js
import { organizationNode, websiteNode, ORGANIZATION_ID, WEBSITE_ID, SITE_URL } from "@/lib/schema";

const PARENT = `${SITE_URL}contract-labour-management-system-software/`;

function clmsModuleJsonLd({ url, name, description, parentName = "Contract Labour Management System" }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode,
      websiteNode,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${PARENT}#software` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: parentName, item: PARENT },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      },
    ],
  };
}
```
Caveat: the `about` reference to `PARENT#software` resolves only on the parent page; Google tolerates cross-page `@id` references, but if you want self-contained validation, drop `about`.

### Code 4 - Blog: reuse shared Organization (`app/blogs/[slug]/page.jsx` `buildJsonLd`)
```js
import { organizationNode, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/schema";
// remove local `organization` const
"@graph": [
  organizationNode,                       // full node (sameAs, address...) defined once
  {
    "@type": "BlogPosting",
    // ...existing fields...
    isPartOf: { "@id": WEBSITE_ID },
    author: author.isOrganization ? { "@id": ORGANIZATION_ID } : { "@type": "Person", name: author.name },
    publisher: { "@id": ORGANIZATION_ID },
    image: post.featuredImage ? { "@type": "ImageObject", url: toSiteImageUrl(post.featuredImage.src), width: ..., height: ... } : DEFAULT_BLOG_IMAGE,
    wordCount: post.wordCount > 100 ? post.wordCount : undefined,
  },
  { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, ... },
]
```
Add `websiteNode` to the blog graph too if you reference `WEBSITE_ID`. `toSiteImageUrl` = rewrite `https://olivedrab-dove-173337.hostingersite.com/blog/wp-content/...` to the production-hosted path once images are copied.

Blog listing fix:
```js
isPartOf: { "@id": "https://www.emsphere.com/#website" },
```
and add `organizationNode`, `websiteNode` to its `@graph`.

### Code 5 - About page (`app/about-us/layout.jsx` or page; layout is a server component)
```js
import { organizationNode, websiteNode, WEBSITE_ID, ORGANIZATION_ID, SITE_URL, jsonLdScript } from "@/lib/schema";
const url = `${SITE_URL}about-us/`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode, websiteNode,
    {
      "@type": ["AboutPage", "WebPage"],
      "@id": `${url}#webpage`,
      url,
      name: "About Emsphere Technologies",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "About Us", item: url },
      ],
    },
  ],
};
// in layout: <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
```

### Code 6 - Contact page with real offices
Page `contact-us/page.jsx` is likely a client component; put this in a `layout.jsx` as for about-us. Phones/addresses are from `OfficeFlipCards.jsx`.
```js
const url = `${SITE_URL}contact-us/`;
const office = (id, city, street, region, postal, tel) => ({
  "@type": "Organization", // OR "LocalBusiness" - keep Organization to avoid asserting opening hours/price range
  "@id": `${SITE_URL}#office-${id}`,
  name: `Emsphere Technologies - ${city}`,
  parentOrganization: { "@id": ORGANIZATION_ID },
  telephone: tel,
  address: { "@type": "PostalAddress", streetAddress: street, addressLocality: city, addressRegion: region, postalCode: postal, addressCountry: "IN" },
});
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode, websiteNode,
    {
      "@type": ["ContactPage", "WebPage"],
      "@id": `${url}#webpage`, url,
      name: "Contact Emsphere Technologies",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    office("pune", "Pune", "2nd Floor, Sapphire Chambers, Above Axis Bank, Baner Road, Baner", "Maharashtra", "411045", "+91-7798981534"),
    office("delhi", "New Delhi", "Plot No. 11, 1st Floor, Sector 12A, Dwarka", "Delhi", "110075", "+91-9823185585"),
    office("bengaluru", "Bengaluru", "Aarya Center, Opposite 8th Block Post Office, Koramangala", "Karnataka", "560095", "+91-9922412060"),
    {
      "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Contact Us", item: url },
      ],
    },
  ],
};
```
Confirm the primary phone per office (the cards list multiple; the above picks the first mobile). Do not add geo coordinates, opening hours or ratings unless known.

### Code 7 - JobPosting template (ONLY when real roles go live)
```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Senior Frontend Engineer",
  "description": "<p>Full job description HTML from the real listing</p>",
  "datePosted": "YYYY-MM-DD",
  "validThrough": "YYYY-MM-DDT23:59",
  "employmentType": "FULL_TIME",
  "hiringOrganization": { "@id": "https://www.emsphere.com/#organization" },
  "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": "Pune", "addressRegion": "Maharashtra", "addressCountry": "IN" } }
}
```
Salary (`baseSalary`) is strongly recommended in India; omit if not disclosed. Page needs one URL per job to be eligible.

### Code 8 - Optional breadcrumb-only for our-clients / testimonial
Same pattern as Code 5, using `["CollectionPage","WebPage"]` and names "Our Clients" / "Testimonials". Low priority.

## Priority order
1. H4 (blog images off staging host), H2+H3 (rich Organization once, reused everywhere).
2. M4, M5 (headcount + CLMS via helper), M2, M3.
3. M6 (About, Contact), then L-items.
4. Leave H1 and I1 as-is, with expectations set (no rich results from Software App or FAQ).
