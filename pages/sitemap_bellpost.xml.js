import { bells } from "../data/bells";
import { slugify } from "../lib/slugify";

const SITE_URL = "https://bellpost-seo.vercel.app";

// In future, replace with bell.updatedAt or bell.createdAt
const DEFAULT_LASTMOD = new Date().toISOString();

export const getServerSideProps = async ({ res }) => {
  const urls = bells.map((bell) => {
    const slug = slugify(bell.title);
    const loc = `${SITE_URL}/bells/${slug}`;
    const lastmod = DEFAULT_LASTMOD;

    return `
<url>
  <loc>${loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>`;
  }).join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default function SitemapBellpost() {
  return null;
}
