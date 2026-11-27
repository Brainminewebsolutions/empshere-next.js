/* Two ways to ship the site:

     (default)              Node.js server: `npm run build` then `npm start` on a
                            Hostinger Node.js app, Vercel, etc. Every URL is
                            rendered by Next.js. Needed for /admin, the
                            database blog and /media. Lead emails go through
                            app/api/lead/route.js (Nodemailer, SMTP_* env vars).
     BUILD_TARGET=static    legacy static export in out/ for Hostinger shared
                            web hosting. No /admin and no database blog.
                            Lead emails go through public/api/lead.php.
*/
// The admin dashboard (/admin), the database-backed blog and the media route
// need a Node server, so server mode is the default. Static export is kept
// only for the legacy shared-hosting build: BUILD_TARGET=static npm run build
// (it cannot include /admin or the database blog).
import { redirects } from './redirects.mjs';
import { LANDING_PAGES } from './lib/landingPages.mjs';

const STATIC_EXPORT = process.env.BUILD_TARGET === 'static';

// The blog's source folder is app/blogs but its public URL is /blog.
// The static export keeps out/blogs and the server maps /blog → /blogs
// (deploy/wordpress-blog.htaccess); a Node server or `next dev` does it here.
const blogRewrites = async () => [
  { source: '/blog', destination: '/blogs' },
  { source: '/blog/:path*', destination: '/blogs/:path*' },
];

/** @type {import('next').NextConfig} */
const sharedConfig = {
  trailingSlash: true,
  experimental: { agentUpgrade: 'security' },
  images: {
    unoptimized: true,
  },
};

const adminHeaders = async () => [
  {
    source: '/admin/:path*',
    headers: [
      { key: 'Cache-Control', value: 'no-store, max-age=0' },
      { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'no-referrer' },
    ],
  },
];

// Staging must never be indexed: NEXT_PUBLIC_SITE_ENV=staging adds X-Robots-Tag
// (and app/robots.js disallows everything). Production never gets noindex.
const siteHeaders = async () => [
  {
    source: '/((?!admin).*)',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ...(process.env.NEXT_PUBLIC_SITE_ENV === 'staging'
        ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
        : []),
    ],
  },
  ...(await adminHeaders()),
];

const serverConfig = {
  ...sharedConfig,
  experimental: {
    // Image uploads are server actions capped at 4 MB in code.
    serverActions: { bodySizeLimit: '5mb' },
    // Next.js starts one build worker per CPU core. Hostinger's build machine
    // reports dozens of cores but limits what one build may use, and the
    // build aborts (SIGABRT) while generating pages. Two workers are enough.
    cpus: 2,
  },
  serverExternalPackages: ['mysql2', 'pg', 'sanitize-html'],
  headers: siteHeaders,
  redirects: async () => redirects,
  env: {
    // Where LeadForm posts; see the note at the top of this file.
    NEXT_PUBLIC_FORM_ENDPOINT: process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/lead/',
  },
  // Campaign landing pages are static files in public/<slug>/.
  rewrites: async () => [
    ...(await blogRewrites()),
    ...Object.keys(LANDING_PAGES).map((slug) => ({ source: `/${slug}`, destination: `/${slug}/index.html` })),
  ],
};

const staticConfig = {
  ...sharedConfig,
  output: 'export',
  env: {
    NEXT_PUBLIC_FORM_ENDPOINT: process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/lead.php',
  },
};

export default STATIC_EXPORT ? staticConfig : serverConfig;
