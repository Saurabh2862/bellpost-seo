const fs = require("fs");
const path = require("path");
const { bells } = require("../data/bells");
const { slugify } = require("../lib/slugify");

const baseUrl = "https://bellpost-seo.vercel.app";

const sitemapEntries = bells
  .map(bell => {
    const slug = slugify(bell.title);
    return `
  <url>
    <loc>${baseUrl}/bells/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries}
</urlset>`;

fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemap);
console.log("✅ Sitemap generated at public/sitemap.xml");
