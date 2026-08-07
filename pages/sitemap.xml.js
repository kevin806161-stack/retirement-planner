import { getAllArticles } from "../lib/articles";

const SITE_URL = "https://www.retirementplantw.com";

function generateSiteMap(articles) {
  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { path: "", priority: "1.0", lastmod: today },
    { path: "articles", priority: "0.9", lastmod: today },
    { path: "tools", priority: "0.9", lastmod: today },
    { path: "tools/advanced-calculator", priority: "0.8", lastmod: today },
    { path: "tools/labor-insurance", priority: "0.8", lastmod: today },
    { path: "tools/fire-calculator", priority: "0.8", lastmod: today },
    { path: "tools/compound-interest", priority: "0.8", lastmod: today },
    { path: "tools/etf-dividend", priority: "0.8", lastmod: today },
    { path: "tools/couple-calculator", priority: "0.8", lastmod: today },
    { path: "tools/dca-vs-lumpsum", priority: "0.8", lastmod: today },
    { path: "faq", priority: "0.6", lastmod: today },
    { path: "about", priority: "0.5", lastmod: today },
    { path: "author", priority: "0.5", lastmod: today },
    { path: "contact", priority: "0.4", lastmod: today },
    { path: "privacy-policy", priority: "0.3", lastmod: today },
    { path: "disclaimer", priority: "0.3", lastmod: today },
  ];

  const articlePages = articles.map((a) => ({
    path: `articles/${a.slug}`,
    priority: "0.8",
    lastmod: a.publishedAt || today,
  }));
  const allPages = [...staticPages, ...articlePages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => `  <url>\n    <loc>${SITE_URL}/${page.path}</loc>\n    <lastmod>${page.lastmod}</lastmod>\n    <priority>${page.priority}</priority>\n  </url>`).join("\n")}
</urlset>`;
}

export default function SiteMap() { return null; }

export async function getServerSideProps({ res }) {
  const articles = getAllArticles();
  const sitemap = generateSiteMap(articles);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return { props: {} };
}
