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

const serverConfig = {
  ...sharedConfig,
  // Image uploads are server actions capped at 4 MB in code.
  experimental: { serverActions: { bodySizeLimit: '5mb' } },
  serverExternalPackages: ['mysql2', 'pg', 'sanitize-html'],
  headers: adminHeaders,
  env: {
    // Where LeadForm posts; see the note at the top of this file.
    NEXT_PUBLIC_FORM_ENDPOINT: process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/lead/',
  },
  rewrites: blogRewrites,
};

const staticConfig = {
  ...sharedConfig,
  output: 'export',
  env: {
    NEXT_PUBLIC_FORM_ENDPOINT: process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/lead.php',
  },
};

export default STATIC_EXPORT ? staticConfig : serverConfig;
