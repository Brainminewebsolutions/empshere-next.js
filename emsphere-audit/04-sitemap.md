# 04 - XML Sitemap Audit (emSphere Next.js static export)

Audited: out/sitemap.xml (identical to public/sitemap.xml, 29,813 bytes, 149 URLs), next-sitemap.config.js, scripts/sync-sitemap.js, out/robots.txt (public/robots.txt is the same), the built out/**/index.html files, and emsphere-audit/.live-urls.txt, .new-urls.txt and .missing.txt.
Not done: the live Rank Math index https://www.emsphere.com/sitemap_index.xml returned a Cloudflare 403 challenge ("Attention Required") even with a browser User-Agent. I used the saved live URL list instead. The live sitemap.xml also returned 403 to curl.

## What passes
- XML is well formed. 149 URLs, well under the 50,000 URL and 50MB limits. There are no duplicate URLs.
- All 149 URLs have a trailing slash and are lowercase.
- All 149 map to a built out/**/index.html. The /blog/ URLs correctly map to out/blogs/, so the sitemap uses the public /blog/ form, not /blogs/.
- Every page's canonical equals its sitemap URL exactly. None has a noindex robots meta.
- Excluded correctly: /payroll-management-solution/ (noindex plus meta-refresh to /empay-management-solution/), /404/ and /_not-found/. The 152 built pages minus these 3 give the 149 listed.
- Noindex blog posts are dropped through `post.seo.index === false`.
- robots.txt contains `Sitemap: https://www.emsphere.com/sitemap.xml`, and `Allow: /` is the only policy. I did not test the redirect or serving behaviour on the live server, only the files.

## Critical
None in the files themselves. The main migration risk is the High item H1.

## High

### H1. /sitemap_index.xml (the URL Google already knows) will 404 after cutover
The new build only emits /sitemap.xml. next-sitemap has `generateIndexSitemap: false`, and robots.txt lists only /sitemap.xml. Local check: /sitemap.xml returns 200, /sitemap_index.xml returns 404. Search Console very likely has /sitemap_index.xml submitted, so it would report "Couldn't fetch". Rank Math also serves sub-sitemaps (post-sitemap.xml, page-sitemap.xml and similar) that will 404.
Fix (any one of these):
1. Add a 301 in the root .htaccess, above the WordPress and Next rules:
```apache
RewriteRule ^sitemap_index\.xml$ /sitemap.xml [R=301,L]
RewriteRule ^(post|page|category|portfolio|job|footer|service)-sitemap[0-9]*\.xml$ /sitemap.xml [R=301,L]
```
2. Or, more safely, serve the same content at the old name by copying the file in postbuild. For example, add `sitemap_index.xml` to the file list in scripts/sync-sitemap.js, and copy it into out/ as well:
```js
fs.copyFileSync(path.join(outDir,'sitemap.xml'), path.join(outDir,'sitemap_index.xml'));
```
Option 2 is preferred. A file avoids a redirect on a sitemap, and Google's handling of redirects on sitemaps is inconsistent. Then add a second line to robots.txt: `Sitemap: https://www.emsphere.com/sitemap_index.xml`. Keep both for about 3 months, then resubmit only /sitemap.xml in GSC.
Also confirm that the WordPress install (which stays under /blog/) does not still generate or intercept /sitemap_index.xml. Disable Rank Math's sitemap module, or make sure the root rewrite wins.

### H2. Two live blog posts are not in the new build or its sitemap
- /blog/canteen-management-system-biometric-vs-rfid-authentication-guide/
- /blog/contract-labour-management-software-multi-site-wage-errors/
Neither slug is in data/blog-posts.json. It was fetched before these were published, so they are excluded from the build and will 404 after migration. Fix: run `npm run fetch:blog` (the prebuild step does this) right before the production build, and confirm the post count. The sitemap has 127 blog post URLs, plus /blog/ and 9 pagination pages.

### H3. 35 other live URLs are absent from the sitemap and the build
Per .missing.txt, there are 39 missing URLs. Two of them are the blog posts in H2. The other 37 are the items below. Anything not recreated needs a 301 (see the redirect audit), and none should be listed in the sitemap.
- Real pages that should be rebuilt or redirected to the closest match:
  - /ai-led-onboarding/
  - /attendance-management-system/
  - /clms-contract-employee-masters/ (the new slug is /clms-contractor-contract-employee-masters/)
  - /contract-labour-management-india/
  - /contract-labour-management-software/
  - /contract-labour-management-software-natcon2023/
  - /labour-management-system-software/
  - /integrations/
  - /pricing/
  - /help-center/
  - /our-team/
  - /privacy-policy/ (a legal page that must exist and be indexable or at least resolve)
  - /mobilepolicy/
- Template junk from the old theme that should be 301'd to / or /blog/, or return 410:
  - /portfolio/
  - /service/
  - /service/service-details/
  - /cyber-security/
  - /game-solutions/
  - /landing-page/
  - /landing-page-2/
  - /contract-labour-management-softwares-copy/
  - /blog/footers/*
  - /blog/job/*
  - /blog/portfolio/*

## Medium

### M1. lastmod is inaccurate for non-blog pages (the build timestamp is stamped everywhere)
Per the config, `config.autoLastmod` is true by default, so every non-blog page gets the build time. 30 URLs share a build time of 2026-10-23T06:43:18.2xxZ (the 19 + 10 + 1 counts above). Examples are the home page, about-us, careers, the product pages, and the 9 /blog/page/N pages. Google learns to ignore lastmod when it is always "now". Blog posts are correct: they use WordPress modified dates, from 2022 onward, and /blog/ uses the latest post date.
Fix: use real per-file dates, such as the git last commit date of each page, or a hand-kept map.
```js
// next-sitemap.config.js
const { execSync } = require('child_process');
const gitDate = (f) => { try { return execSync(`git log -1 --format=%cI -- "${f}"`).toString().trim() || undefined; } catch { return undefined; } };
// in transform, for non-blog paths:
const rel = path === '/' ? 'app/page.jsx' : `app${path.replace(/\/$/, '')}/page.jsx`;
return { loc: path, lastmod: gitDate(rel) };
// and for /blog/page/N use blog-posts.json latest modified (as /blog/ does), not new Date()
```
Alternatively, set `autoLastmod: false` so the tag is omitted. Omitting it is better than a false value.

### M2. changefreq and priority are emitted on every URL
All 149 entries carry both tags. Google ignores them, so they are harmless but are noise. Remove them: return only `{ loc, lastmod }` from transform, and delete the priority logic. Also set `changefreq: undefined, priority: undefined` as top-level defaults to keep next-sitemap from re-adding them.

### M3. /blog/page/N pagination URLs are listed (9 URLs, priority 0.4)
They are indexable and self-canonical, so this is acceptable. But paginated archives add little to a sitemap. Optional: exclude `/blog/page/*` and keep /blog/.

## Low
- L1. The urlset declares unused namespaces (news, xhtml, mobile, image, video). It is harmless; it can be trimmed with `transform`/`additionalPaths`, or ignored.
- L2. next-sitemap writes a `Host:` directive in robots.txt. Only Yandex honours it, and Google ignores it. It is harmless.
- L3. robots.txt is regenerated by next-sitemap and copied by sync-sitemap.js. Editing public/robots.txt by hand gets overwritten. Add extras (the second Sitemap line, any Disallow rules) through `robotsTxtOptions.additionalSitemaps` and `policies`:
```js
robotsTxtOptions: {
  policies: [{ userAgent: '*', allow: '/' }],
  additionalSitemaps: ['https://www.emsphere.com/sitemap_index.xml'],
},
```
  Note that next-sitemap already adds /sitemap.xml itself.
- L4. The /404/ and /_not-found/ pages are built as real folders (out/404/index.html). Make sure the server returns 404 status for unknown URLs, and that these two paths are not linked anywhere. Both are noindex with a canonical pointing to /, which is acceptable.
- L5. The `exclude` for /payroll-management-solution is hard-coded. If more redirect stub pages are added, they must be added to this list. Consider a postbuild check that fails if any sitemap URL's built HTML contains `noindex` or `http-equiv="refresh"`.

## Migration sitemap checklist
1. Run `npm run fetch:blog`, then build, so the two new posts (H2) are included. Expect the URL count to rise from 149 to 151 or more.
2. Resolve the 37 non-blog missing live URLs: rebuild, 301 or 410 (H3). Do this before cutover.
3. Make /sitemap_index.xml resolve (H1): a copied file plus a second Sitemap: line in robots.txt (or a 301). Verify with `curl -I` that it returns 200.
4. Fix lastmod and drop changefreq/priority (M1, M2).
5. After deployment, fetch https://www.emsphere.com/sitemap.xml and check status 200, content-type XML, and that it is not caught by the WordPress or Cloudflare challenge.
6. Spot-check 10 sitemap URLs on production for 200, no redirect, and canonical == URL. Include /blog/, /blog/page/2/, and a blog post (the Apache /blog -> /blogs rewrite).
7. Confirm /payroll-management-solution/, /404/, and /_not-found/ are not in the production sitemap.
8. In Google Search Console, re-submit /sitemap.xml and /sitemap_index.xml. Watch Pages > "Submitted URL not found / redirect / noindex" and the discovered-vs-indexed count. Keep the old sitemap name alive for about 3 months.
9. Check that the WordPress install under /blog/ does not expose its own sitemap or rewrite /sitemap*.xml. Check Cloudflare does not block Googlebot on the sitemap URL (it already returns 403 to curl on the live site, so test with Search Console's URL Inspection).
10. Add the postbuild guard from L5 so sitemap and built HTML cannot diverge.
