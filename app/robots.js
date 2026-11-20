import { IS_PRODUCTION, SITE_URL } from "@/lib/siteUrl";

// Production: crawlable, points at the sitemap. Staging (NEXT_PUBLIC_SITE_ENV=staging): blocked.
export default function robots() {
  if (!IS_PRODUCTION) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/thank-you/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
