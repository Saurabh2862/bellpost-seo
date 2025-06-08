import { bells } from "../data/bells";
import { slugify } from "../lib/slugify";

const SITE_URL = "https://bellpost-seo.vercel.app";

export async function getServerSideProps({ res }) {
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${bells
  .map((bell) => {
    const slug = slugify(bell.title);
    return `<url>
  <loc>${SITE_URL}/bells/${slug}</loc>
  <lastmod>${now}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>`;
  })
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
