const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const baseline = JSON.parse(fs.readFileSync(path.join(root, 'docs/superpowers/specs/baseline-manifest.json'), 'utf8').replace(/^\uFEFF/, ''));
const failures = [];
let contentCount = 0;
for (const item of baseline.files) {
  const file = path.join(root, item.path);
  if (!fs.existsSync(file)) { failures.push(`Missing original file: ${item.path}`); continue; }
  const protectedFile = item.path.startsWith('content/articles/') || item.path.startsWith('pages/api/') || item.path.startsWith('lib/') || ['components/AdUnit.js', 'components/AdSenseScript.js', 'components/BookList.js', 'components/EmailSubscribe.js', 'components/RelatedArticles.js', 'pages/rss.xml.js', 'pages/sitemap.xml.js'].includes(item.path);
  if (item.path.startsWith('content/articles/')) contentCount++;
  if (protectedFile && crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').toUpperCase() !== item.sha256) failures.push(`Changed protected content/function: ${item.path}`);
}
// Permit the authorized brand and shared presentation helpers only. Keep every
// formula, state, input call, result expression and explanatory section intact.
const stripPresentation = source => source.replaceAll('\r\n', '\n')
  .replace(/^import (?:BrandLogo|ParameterSlider|ResultRow|SummaryCard|EstimateTile)[^\n]*\n/gm, '')
  .replace(/<Link href="\/" className="nav-logo"[\s\S]*?<\/Link>/g, '<BRAND>')
  .replace(/^function (?:Slider|ResultRow|SummaryCard|DividendCard)\([\s\S]*?^}\n/gm, '')
  .replace(/<div className="calculator-panel-heading">[^\n]*?<\/div>/g, '')
  .replace(/\s+/g, ' ').trim();
const tools = ['advanced-calculator', 'labor-insurance', 'fire-calculator', 'compound-interest', 'etf-dividend', 'couple-calculator', 'dca-vs-lumpsum'];
for (const tool of tools) {
  const route = `pages/tools/${tool}.js`;
  const original = execFileSync('git', ['show', `${baseline.revision}:${route}`], { cwd: root, encoding: 'utf8' });
  if (stripPresentation(original) !== stripPresentation(fs.readFileSync(path.join(root, route), 'utf8'))) failures.push(`Calculator logic or original content changed: ${route}`);
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`Preserved ${contentCount} original Markdown files, all original files/routes, seven calculators' formulas, inputs, result expressions and guidance, APIs, calculation core, book/affiliate data, subscriptions, advertisements, RSS and sitemap.`);
