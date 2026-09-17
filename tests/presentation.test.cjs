const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { execFileSync } = require('node:child_process');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const swc = require('next/dist/build/swc');
const root = path.resolve(__dirname, '..');

const routes = ['advanced-calculator', 'labor-insurance', 'fire-calculator', 'compound-interest', 'etf-dividend', 'couple-calculator', 'dca-vs-lumpsum'];
const descriptions = ['含通膨調整、薪資成長率、夫妻合計試算，比基本版更精確', '輸入投保薪資與年資，精算你的勞保老年年金月領金額', '計算你需要多少資產才能提早退休，以及達成 FIRE 的時間表', '視覺化呈現你的投資組合在不同報酬率下的長期成長曲線', '試算持有 0050、00878 等 ETF 每月能領到多少配息', '雙薪家庭專用，兩人年齡收入分開設定，計算家庭退休缺口', '同一筆錢，分批投入還是一次投入更好？回測比較兩種策略'];

test.before(async () => {
  await swc.loadBindings();
  const originalLoader = require.extensions['.js'];
  require.extensions['.js'] = (module, filename) => {
    if (!filename.startsWith(root + path.sep) || filename.includes(`${path.sep}node_modules${path.sep}`)) return originalLoader(module, filename);
    const { code } = swc.transformSync(fs.readFileSync(filename, 'utf8'), {
      filename,
      styledJsx: {},
      jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } }, target: 'es2020' },
      module: { type: 'commonjs' },
    });
    module._compile(code, filename);
  };
});

test('all seven original tool links expose distinct artwork and their complete descriptions', () => {
  const Page = require('../pages/tools/index.js').default;
  const html = renderToStaticMarkup(React.createElement(Page));
  const artworks = [];
  for (let i = 0; i < routes.length; i++) {
    const link = html.match(new RegExp(`<a[^>]*href="/tools/${routes[i]}"[^>]*>([\\s\\S]*?)</a>`));
    assert.ok(link, `Missing tool route: ${routes[i]}`);
    assert.ok(link[1].includes(descriptions[i]), `Missing original description: ${routes[i]}`);
    const svg = link[1].match(/<svg\b[\s\S]*?<\/svg>/);
    assert.ok(svg, `${routes[i]} needs its own vector illustration`);
    assert.match(svg[0], /aria-hidden="true"/, 'Decorative artwork must not replace the tool label');
    artworks.push(svg[0]);
  }
  assert.equal(new Set(artworks).size, 7);
});

test('basic retirement calculation keeps original values and labels identify all five controls', () => {
  const Calculator = require('../components/RetirementCalculator.js').default;
  const html = renderToStaticMarkup(React.createElement(Calculator));
  for (const amount of ['NT$ 42,000', 'NT$ 12,600,000', 'NT$ 2,871,746', 'NT$ 9,728,254', 'NT$ 9,685']) assert.ok(html.includes(amount), amount);
  const labels = [...html.matchAll(/<label[^>]*for="([^"]+)"/g)].map(match => match[1]);
  assert.equal(labels.length, 5, 'Every original range input needs an associated label');
  for (const id of labels) assert.match(html, new RegExp(`<input[^>]*id="${id}"[^>]*type="range"|<input[^>]*type="range"[^>]*id="${id}"`));
  assert.match(html, /type="email"/);
});

test('every calculator parameter has a named and associated slider label', () => {
  for (const route of routes) {
    const Page = require(`../pages/tools/${route}.js`).default;
    const html = renderToStaticMarkup(React.createElement(Page));
    const inputs = [...html.matchAll(/<input\b[^>]*type="range"[^>]*>/g)].map(match => match[0]);
    for (const input of inputs) {
      const id = input.match(/\bid="([^"]+)"/)?.[1];
      assert.ok(id, `${route}: unnamed parameter input`);
      assert.ok(html.includes(`for="${id}"`), `${route}: missing associated label`);
      assert.match(input, /aria-valuetext="[^"]+"/, `${route}: formatted parameter value must remain accessible`);
    }
  }
});

test('retirement estimate labels and amounts remain paired as a readable financial breakdown', () => {
  const Calculator = require('../components/RetirementCalculator.js').default;
  const html = renderToStaticMarkup(React.createElement(Calculator));
  assert.match(html, /<dt[^>]*>退休缺口<\/dt>\s*<dd[^>]*>NT\$ 9,728,254<\/dd>/);
  assert.match(html, /<dt[^>]*>每月需額外儲蓄<\/dt>\s*<dd[^>]*>NT\$ 9,685<\/dd>/);
});

test('homepage retains every original navigation, calculator, article and affiliate link', async () => {
  const baseline = JSON.parse(fs.readFileSync(path.join(root, 'docs/superpowers/specs/baseline-manifest.json'), 'utf8').replace(/^\uFEFF/, ''));
  const filename = path.join(root, 'pages/index.js');
  const source = execFileSync('git', ['show', `${baseline.revision}:pages/index.js`], { cwd: root, encoding: 'utf8' });
  const original = new Module(filename, module);
  original.filename = filename;
  original.paths = Module._nodeModulePaths(path.dirname(filename));
  original._compile(swc.transformSync(source, {
    filename, styledJsx: {},
    jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } }, target: 'es2020' },
    module: { type: 'commonjs' },
  }).code, filename);
  const Home = require('../pages/index.js').default;
  const props = { articles: require('../lib/articles.js').getAllArticles() };
  const before = renderToStaticMarkup(React.createElement(original.exports.default, props));
  const after = renderToStaticMarkup(React.createElement(Home, props));
  const links = html => [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]).sort();
  assert.deepEqual(links(after), links(before));
  for (const text of ['輸入你的現況，AI 幫你分析退休缺口、資產配置比例，以及每月需要存多少錢', '最新理財知識文章', '精選理財書單', 'AI 驅動 · 免費使用']) assert.ok(after.includes(text), text);
});
