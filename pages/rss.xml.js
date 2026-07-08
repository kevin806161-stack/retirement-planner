import { getAllArticles } from "../lib/articles";

const SITE_URL = "https://retirementplantw.com";

function escapeXml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRss(articles) {
  const items = articles
    .map(
      (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE_URL}/articles/${a.slug}</link>
      <guid>${SITE_URL}/articles/${a.slug}</guid>
      <description>${escapeXml(a.description)}</description>
      <category>${escapeXml(a.category)}</category>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>退休咖 - 理財知識文章</title>
    <link>${SITE_URL}</link>
    <description>退休金規劃、資產配置、ETF 投資的原創理財知識文章</description>
    <language>zh-TW</language>
${items}
  </channel>
</rss>`;
}

export default function Rss() { return null; }

export async function getServerSideProps({ res }) {
  const articles = getAllArticles();
  const rss = generateRss(articles);
  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.write(rss);
  res.end();
  return { props: {} };
}
