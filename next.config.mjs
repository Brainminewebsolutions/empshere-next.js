import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default function config(phase) {
  if (phase !== PHASE_DEVELOPMENT_SERVER) return nextConfig;

  // The blog's source folder is app/blogs but its public URL is /blog.
  // Production builds keep out/blogs and the server maps /blog → /blogs
  // (deploy/wordpress-blog.htaccess); `next dev` does the same here. Export mode
  // is left off in dev: its generateStaticParams() check reads the requested
  // /blog/… URL instead of the rewritten /blogs/… route and fails.
  const { output, ...devConfig } = nextConfig;
  return {
    ...devConfig,
    async rewrites() {
      return [
        { source: '/blog', destination: '/blogs' },
        { source: '/blog/:path*', destination: '/blogs/:path*' },
      ];
    },
  };
}
