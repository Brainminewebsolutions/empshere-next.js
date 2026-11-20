# Launch checklist (SEO)

## Hostinger environment variables (Node.js app)
| Name | Production value | Notes |
|---|---|---|
| NEXT_PUBLIC_SITE_URL | https://www.emsphere.com | optional, this is the default |
| NEXT_PUBLIC_SITE_ENV | (leave unset) | set to `staging` ONLY on the staging app: adds noindex and Disallow: / |
| NEXT_PUBLIC_GTM_ID | GTM-MZCM5M6 | optional, this is the default |
| NEXT_PUBLIC_GSC_VERIFICATION | token from Search Console | only if verifying by HTML tag |
Existing: DB_*, SMTP_*, LEAD_TO, CAREERS_TO, TURNSTILE_SECRET_KEY, NEXT_PUBLIC_TURNSTILE_SITE_KEY.
NEXT_PUBLIC_* values are baked in at build time: rebuild after changing them.

## Before switching DNS
1. Staging app: set NEXT_PUBLIC_SITE_ENV=staging and rebuild (blocks indexing).
2. Production app: do NOT set it. After deploy open /robots.txt: must show `Allow: /` and the Sitemap line.
3. Cloudflare Turnstile widget must list www.emsphere.com.
4. In hPanel, make emsphere.com redirect to https://www.emsphere.com (and force HTTPS).

## After launch
1. Open /sitemap.xml, /robots.txt, and test 3 old URLs from redirects-map.csv.
2. Search Console: add/verify www.emsphere.com, submit https://www.emsphere.com/sitemap.xml.
3. URL Inspection on /, /human-resource-management-system/, one blog post.
4. Watch Coverage / Pages report for 404 spikes for 2-4 weeks.

## Checks you can run
npm run build && npm start, then in another terminal:
node scripts/seo-check.mjs http://localhost:3000
node scripts/redirects-check.mjs http://localhost:3000
