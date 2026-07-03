import { getAllArticleSlugs } from "../lib/articles";

const SITE_URL = "https://retirementplantw.com";

function generateSiteMap(slugs) {
  const staticPages = [
    { path: "", priority: "1.0" },
    { path: "articles", priority: "0.9" },
    { path: "tools", priority: "0.9" },
    { path: "tools/advanced-calculator", priority: "0.8" },
    { path: "tools/labor-insurance", priority: "0.8" },
    { path: "tools/fire-calculator", priority: "0.8" },
    { path: "tools/compound-interest", priority: "0.8" },
    { path: "tools/etf-dividend", priority: "0.8" },
    { path: "tools/couple-calculator", priority: "0.8" },
    { path: "tools/dca-vs-lumpsum", priority: "0.8" },
    { path: "faq", priority: "0.6" },
    { path: "about", priority: "0.5" },
    { path: "contact", priority: "0.4" },
    { path: "privacy-policy", priority: "0.3" },
    { path: "disclaimer", priority: "0.3" },
  ];

  const articlePages = slugs.map((slug) => ({ path: `articles/${slug}`, priority: "0.8" }));
  const allPages = [...staticPages, ...articlePages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => `  <url>\n    <loc>${SITE_URL}/${page.path}</loc>\n    <priority>${page.priority}</priority>\n  </url>`).join("\n")}
</urlset>`;
}

export default function SiteMap() { return null; }

export async function getServerSideProps({ res }) {
  const slugs = getAllArticleSlugs();
  const sitemap = generateSiteMap(slugs);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return { props: {} };
}
