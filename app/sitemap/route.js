import { bells } from "../../data/bells";
import { slugify } from "../../lib/slugify";


const SITE_URL = "https://bellpost-seo.vercel.app";

export async function GET() {
  const now = new Date().toISOString();

  const urls = bells.map((bell) => {
    const slug = slugify(bell.title);
    return `
  <url>
    <loc>${SITE_URL}/bells/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
      "Content-Disposition": 'inline; filename="sitemap.xml"'
    },
  });
}
