import { getAllArticleSlugs } from "../lib/articles";

const SITE_URL = "https://retirementplantw.com";

function generateSiteMap(slugs) {
  const staticPages = [
    { path: "", priority: "1.0" },
    { path: "articles", priority: "0.9" },
    { path: "privacy-policy", priority: "0.3" },
    { path: "disclaimer", priority: "0.3" },
  ];

  const articlePages = slugs.map((slug) => ({
    path: `articles/${slug}`,
    priority: "0.8",
  }));

  const allPages = [...staticPages, ...articlePages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}/${page.path}</loc>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

export default function SiteMap() {
  // getServerSideProps 會處理實際回應，這裡不需要回傳內容
  return null;
}

export async function getServerSideProps({ res }) {
  const slugs = getAllArticleSlugs();
  const sitemap = generateSiteMap(slugs);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
