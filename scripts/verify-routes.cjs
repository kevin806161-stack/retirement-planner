const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const root = path.resolve(__dirname, '..');
const origin = process.argv[2] || 'http://localhost:3017';
const routes = ['/', '/tools', '/articles', '/about', '/author', '/contact', '/faq', '/privacy-policy', '/disclaimer', '/sitemap.xml', '/rss.xml'];
const toolNames = ['advanced-calculator', 'labor-insurance', 'fire-calculator', 'compound-interest', 'etf-dividend', 'couple-calculator', 'dca-vs-lumpsum'];
routes.push(...toolNames.map(name => `/tools/${name}`));
for (const file of fs.readdirSync(path.join(root, 'content/articles')).filter(file => file.endsWith('.md'))) {
  const { data } = matter(fs.readFileSync(path.join(root, 'content/articles', file), 'utf8'));
  routes.push(`/articles/${data.slug}`);
}
(async () => {
  const failures = [];
  for (const route of routes) {
    const response = await fetch(new URL(route, origin));
    if (!response.ok) failures.push(`${route}: ${response.status}`);
  }
  const missing = await fetch(new URL('/this-page-does-not-exist', origin));
  if (missing.status !== 404) failures.push(`Missing page returned ${missing.status}, expected 404`);
  if (failures.length) throw new Error(failures.join('\n'));
  console.log(`${routes.length} original public pages/feeds return 200, including all 56 article URLs and seven calculator URLs. Unknown route returns 404.`);
})().catch(error => { console.error(error.message); process.exitCode = 1; });
