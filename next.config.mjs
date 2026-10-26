/* Two ways to ship the site:

     npm run build          Node.js server (default): `npm start` on a
                            Hostinger Node.js app, Vercel, etc. Every URL is
                            rendered by Next.js, so reloads and deep links
                            work. Lead emails go through app/api/lead/route.js
                            (Nodemailer, SMTP_* env vars).
     BUILD_TARGET=static    static export in out/ for Hostinger shared web
     npm run build          hosting. Lead emails go through
                            public/api/lead.php.
*/
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
  images: {
    unoptimized: true,
  },
};

const serverConfig = {
  ...sharedConfig,
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
