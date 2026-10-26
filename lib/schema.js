/* --------------------------------------------------------------------
   Shared Schema.org JSON-LD for the home and product pages.

   Every page's @graph carries its own copy of the Organization and
   WebSite nodes, so the "#organization" / "#website" references resolve
   when a validator reads one page on its own.
   -------------------------------------------------------------------- */

export const SITE_URL = "https://www.emsphere.com/";
export const ORGANIZATION_ID = `${SITE_URL}#organization`;
export const WEBSITE_ID = `${SITE_URL}#website`;

const LOGO_URL = `${SITE_URL}universal-images/header/emsphere-technologies-logo.webp`;

export const organizationNode = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Emsphere Technologies",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: LOGO_URL, width: 550, height: 143 },
  description:
    "Emsphere Technologies provides HR technology, workforce management and labour management solutions for enterprises.",
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Emsphere",
  publisher: { "@id": ORGANIZATION_ID },
};

// Product list on the home page; the URLs are this site's live product routes.
const HOME_PRODUCTS = [
  { name: "Human Resource Management System", path: "human-resource-management-system/" },
  { name: "Contract Labour Management System", path: "contract-labour-management-system-software/" },
  { name: "Payroll Management System", path: "empay-management-solution/" },
  { name: "Workforce Management System", path: "workforce-management-system/" },
  { name: "Headcount Management System", path: "headcount-management-software/" },
  { name: "Visitor Management System", path: "visitor-management-system/" },
];

export const homePageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode,
    websiteNode,
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}#webpage`,
      url: SITE_URL,
      name: "Workforce and Labor Management System - Emsphere",
      description:
        "Emsphere provides HR technology, workforce management and labour management solutions to digitalize HR processes and workflows.",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      mainEntity: { "@id": `${SITE_URL}#products` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}#products`,
      name: "Emsphere HR Technology Products",
      numberOfItems: HOME_PRODUCTS.length,
      itemListElement: HOME_PRODUCTS.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${SITE_URL}${product.path}`,
      })),
    },
  ],
};

/* SoftwareApplication + WebPage + BreadcrumbList for one product page.
   `extraNodes` lets a page append nodes such as its FAQPage. */
export function productPageJsonLd({ url, name, description, subCategory, pageName, breadcrumbName, extraNodes = [] }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode,
      websiteNode,
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#software`,
        name,
        url,
        description,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: subCategory,
        operatingSystem: "Web",
        provider: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: pageName,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${url}#software` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: breadcrumbName, item: url },
        ],
      },
      ...extraNodes,
    ],
  };
}

export function faqPageNode(url, faqs) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function jsonLdScript(data) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
