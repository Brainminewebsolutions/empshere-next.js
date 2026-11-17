import { getPublishedSlugs, SITE_URL } from "@/lib/posts";

// Live sitemap of blog posts (they're also in /sitemap.xml). Regenerated
// instantly when a post is saved in /admin (revalidatePath), hourly otherwise.
export const revalidate = 3600;

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function GET() {
  const blog = await getPublishedSlugs("blog");

  const urls = blog
    .filter((p) => !p.noindex)
    .map(
      (p) =>
        `<url><loc>${escapeXml(`${SITE_URL}/blog/${p.slug}/`)}</loc><lastmod>${new Date(p.updated_at).toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
    );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
