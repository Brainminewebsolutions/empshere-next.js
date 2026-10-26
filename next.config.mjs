import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/* Two ways to ship the site:

     npm run build        static export in out/ for Hostinger web hosting.
                          Lead emails go through public/api/lead.php.
     BUILD_TARGET=node    Node.js server (`npm start`, Vercel, Hostinger
     npm run build        Node.js app). Lead emails go through
                          app/api/lead/route.js (Nodemailer). `next dev`
                          also runs this way.
*/
const NODE_SERVER = process.env.BUILD_TARGET === 'node';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    // Where LeadForm posts; see the note at the top of this file.
    NEXT_PUBLIC_FORM_ENDPOINT: process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/lead.php',
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

// The blog's source folder is app/blogs but its public URL is /blog.
// The static export keeps out/blogs and the server maps /blog → /blogs
// (deploy/wordpress-blog.htaccess); a Node server or `next dev` does it here.
// Export mode is left off in dev: its generateStaticParams() check reads the
// requested /blog/… URL instead of the rewritten /blogs/… route and fails.
const blogRewrites = async () => [
  { source: '/blog', destination: '/blogs' },
  { source: '/blog/:path*', destination: '/blogs/:path*' },
];

export default function config(phase) {
  if (phase !== PHASE_DEVELOPMENT_SERVER && !NODE_SERVER) return nextConfig;
  const { output, ...serverConfig } = nextConfig;
  return {
    ...serverConfig,
    env: { NEXT_PUBLIC_FORM_ENDPOINT: process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/lead/' },
    rewrites: blogRewrites,
  };
}
