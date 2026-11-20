/* Old WordPress URLs -> closest new page. Each is a single hop (Next sends 308,
   which Google treats as a permanent 301). Sources are written without a
   trailing slash; trailingSlash:true makes them match both forms.
   Query strings (gclid, utm_*) are passed through to the destination.
   `npm run redirects:csv` regenerates redirects-map.csv from this list. */

export const redirectRules = [
  // Renamed or merged pages
  { source: "/clms-contract-employee-masters", destination: "/clms-contractor-contract-employee-masters/", reason: "Renamed page (was indexable on WordPress)" },
  { source: "/contract-labour-management-software", destination: "/contract-labour-management-system-software/", reason: "Old page merged into the CLMS page (was indexable)" },
  { source: "/contract-labor-management-software", destination: "/contract-labour-management-system-software/", reason: "Old 404, closest topic page" },
  { source: "/contract-labour-employee-management-system-software", destination: "/contract-labour-management-system-software/", reason: "Old 404, closest topic page" },
  { source: "/leave-management-system", destination: "/blog/leave-management-system/", reason: "WordPress canonicalised this page to the blog post" },
  { source: "/visitor-management-software", destination: "/visitor-management-system/", reason: "Existing WordPress 301" },
  { source: "/canteen-management-solution", destination: "/canteen-management-system/", reason: "Existing WordPress 301" },
  { source: "/hrms", destination: "/human-resource-management-system/", reason: "Existing WordPress 301" },
  { source: "/empay-management-solution", destination: "/payroll-management-solution/", reason: "emPay page moved (was a meta refresh)" },

  // WordPress archives with no equivalent -> blog index
  { source: "/blog/category/:path*", destination: "/blog/", reason: "WordPress category archive" },
  { source: "/blog/tag/:path*", destination: "/blog/", reason: "WordPress tag archive" },
  { source: "/category/:path*", destination: "/blog/", reason: "WordPress category archive" },
  { source: "/tag/:path*", destination: "/blog/", reason: "WordPress tag archive" },
  { source: "/author/:path*", destination: "/blog/", reason: "WordPress author archive" },

  // WordPress feeds and sitemaps
  { source: "/feed", destination: "/blog/", reason: "WordPress feed" },
  { source: "/comments/feed", destination: "/blog/", reason: "WordPress comments feed" },
  { source: "/blog/feed", destination: "/blog/", reason: "WordPress blog feed" },
  { source: "/sitemap_index.xml", destination: "/sitemap.xml", reason: "Yoast/Rank Math sitemap index" },
  { source: "/wp-sitemap.xml", destination: "/sitemap.xml", reason: "WordPress core sitemap" },
  { source: "/post-sitemap.xml", destination: "/sitemap.xml", reason: "Old post sitemap" },
  { source: "/page-sitemap.xml", destination: "/sitemap.xml", reason: "Old page sitemap" },
];

export const redirects = redirectRules.map(({ source, destination }) => ({
  source,
  destination,
  permanent: true,
}));
