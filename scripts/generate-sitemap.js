// scripts/generate-sitemap.js

const fs = require("fs");
const path = require("path");
const { bells } = require("../data/bells");
const { slugify } = require("../lib/slugify");

const baseUrl = "https://bellpost-seo.vercel.app";

const now = new Date().toISOString();

const sitemapEntries = bells
  .map(bell => {
    const slug = slugify(bell.title);
    return `
  <url>
    <loc>${baseUrl}/bells/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;

const outputPath = path.join(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outputPath, sitemap.trim());
console.log("✅ Sitemap generated at public/sitemap.xml");
