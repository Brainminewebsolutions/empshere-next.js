const fs = require('fs');
const path = require('path');

// Blog posts live in the admin database (posts table). The sitemap reads them
// from there at build time; if the database cannot be reached it falls back to
// the WordPress snapshot in data/blog-posts.json so the build never fails.
function loadEnvFile() {
  // next-sitemap does not load .env.local itself (Hostinger sets real env vars).
  if (process.env.DB_NAME) return;
  try {
    const text = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    // no .env.local: fine
  }
}

async function loadBlogPosts() {
  loadEnvFile();
  try {
    if (!process.env.DB_NAME) throw new Error('no database configured');
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dateStrings: true,
      connectTimeout: 10000,
    });
    try {
      const [rows] = await conn.query(
        "SELECT slug, updated_at, noindex FROM posts WHERE status = 'published' AND post_type = 'blog' ORDER BY published_at DESC",
      );
      return rows.map((r) => ({
        slug: r.slug,
        modified: new Date(String(r.updated_at).replace(' ', 'T') + 'Z').toISOString(),
        noindex: Boolean(r.noindex),
      }));
    } finally {
      await conn.end();
    }
  } catch (error) {
    console.warn('[next-sitemap] database unavailable, using data/blog-posts.json:', error.message);
    try {
      const file = path.join(__dirname, 'data', 'blog-posts.json');
      return JSON.parse(fs.readFileSync(file, 'utf8')).posts.map((p) => ({
        slug: p.slug,
        modified: p.modified,
        noindex: p.seo && p.seo.index === false,
      }));
    } catch {
      return [];
    }
  }
}

const FIRST_PAGE_GRID = 12;
const POSTS_PER_PAGE = 12;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.emsphere.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  trailingSlash: true,
  // Static export → out/ (copied back to public/ by scripts/sync-sitemap.js).
  outDir: process.env.BUILD_TARGET === 'static' ? 'out' : 'public',
  exclude: [
    '/icon.png',
    '/apple-icon.png',
    '/icon.png/*',
    '/apple-icon.png/*',
    '/_not-found',
    '/_not-found/*',
    // Old emPay URL; it only forwards to /payroll-management-solution/.
    '/empay-management-solution',
    '/empay-management-solution/*',
    // Post-submission page for the lead forms; noindex.
    '/thank-you',
    '/thank-you/*',
    // Admin dashboard, uploaded media and APIs are never indexed.
    '/admin',
    '/admin/*',
    '/media/*',
    '/api/*',
    // The blog is published at /blog (see additionalPaths below).
    '/blogs',
    '/blogs/*',
  ],
  // Blog index, pagination and every published post, straight from the database.
  additionalPaths: async () => {
    const posts = (await loadBlogPosts()).filter((p) => !p.noindex);
    const latest = posts.map((p) => p.modified).sort().pop() || new Date().toISOString();
    const rest = Math.max(0, posts.length - 1 - FIRST_PAGE_GRID);
    const totalPages = 1 + Math.ceil(rest / POSTS_PER_PAGE);
    const out = [{ loc: '/blog/', changefreq: 'daily', priority: 0.8, lastmod: latest }];
    for (let page = 2; page <= totalPages; page++) {
      out.push({ loc: `/blog/page/${page}/`, changefreq: 'weekly', priority: 0.4, lastmod: latest });
    }
    for (const p of posts) {
      out.push({ loc: `/blog/${p.slug}/`, changefreq: 'monthly', priority: 0.7, lastmod: p.modified });
    }
    return out;
  },
  transform: async (config, path) => {
    // Exclude system / metadata image paths if matched
    if (
      path.includes('icon.png') ||
      path.includes('apple-icon.png') ||
      path.includes('_not-found')
    ) {
      return null;
    }

    // Blog URLs are added by additionalPaths above (from the database).
    if (/^\/blogs?(\/|$)/.test(path)) return null;

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
    } else if (path === '/our-clients/' || path === '/our-clients' || path === '/testimonial/' || path === '/testimonial' || path === '/about-us/' || path === '/about-us') {
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
