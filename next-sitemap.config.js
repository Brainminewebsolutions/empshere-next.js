const fs = require('fs');
const path = require('path');

// Blog post dates + Rank Math robots, from scripts/fetch-blog-posts.mjs
const blogPosts = (() => {
  try {
    const file = path.join(__dirname, 'data', 'blog-posts.json');
    return new Map(JSON.parse(fs.readFileSync(file, 'utf8')).posts.map((p) => [p.slug, p]));
  } catch {
    return new Map();
  }
})();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.emsphere.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  trailingSlash: true,
  outDir: 'out',
  exclude: [
    '/icon.png',
    '/apple-icon.png',
    '/icon.png/*',
    '/apple-icon.png/*',
    '/_not-found',
    '/_not-found/*',
  ],
  transform: async (config, path) => {
    // Exclude system / metadata image paths if matched
    if (
      path.includes('icon.png') ||
      path.includes('apple-icon.png') ||
      path.includes('_not-found')
    ) {
      return null;
    }

    // The blog's source folder is app/blogs, but it is published at /blog
    // through the server rewrite in deploy/wordpress-blog.htaccess, so list it
    // under /blog.
    path = path.replace(/^\/blogs(?=\/|$)/, '/blog');

    // Blog: posts use their WordPress modified date; noindex posts (per Rank
    // Math) stay out of the sitemap.
    const blogPost = path.match(/^\/blog\/([^/]+)\/?$/);
    if (blogPost && blogPosts.has(blogPost[1])) {
      const post = blogPosts.get(blogPost[1]);
      if (post.seo && post.seo.index === false) return null;
      return { loc: path, changefreq: 'monthly', priority: 0.7, lastmod: post.modified };
    }
    if (path === '/blog/' || path === '/blog') {
      const latest = [...blogPosts.values()].map((p) => p.modified).sort().pop();
      return { loc: path, changefreq: 'daily', priority: 0.8, lastmod: latest || new Date().toISOString() };
    }
    if (path.startsWith('/blog/page/')) {
      return { loc: path, changefreq: 'weekly', priority: 0.4, lastmod: config.autoLastmod ? new Date().toISOString() : undefined };
    }

    // Custom priorities and change frequencies based on route importance
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/human-resource-management-system/' || path === '/human-resource-management-system') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/contact-us/' || path === '/contact-us') {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path === '/clients/' || path === '/clients' || path === '/testimonials/' || path === '/testimonials' || path === '/About-us/' || path === '/About-us') {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
