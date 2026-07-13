// lib/autoLink.js
// 自動在文章內文中，將特定關鍵字轉換成指向相關文章/工具的連結
// 規則：
// 1. 每個關鍵字在單篇文章中最多只連結「一次」（第一次出現時），避免過度連結
// 2. 不會連結到文章自己（selfSlug 比對）
// 3. 跳過標題列、表格列、code block，避免破壞 markdown 格式
// 4. 跳過已經在既有連結內的文字

const LINK_MAP = [
  { keyword: "4% 法則", url: "/articles/four-percent-rule-explained", selfSlug: "four-percent-rule-explained" },
  { keyword: "資產配置", url: "/articles/asset-allocation-by-age", selfSlug: "asset-allocation-by-age" },
  { keyword: "0050", url: "/articles/0050-vs-00878-comparison", selfSlug: "0050-vs-00878-comparison" },
  { keyword: "00878", url: "/articles/0050-vs-00878-comparison", selfSlug: "0050-vs-00878-comparison" },
  { keyword: "定期定額", url: "/articles/dca-vs-lump-sum-for-retirement", selfSlug: "dca-vs-lump-sum-for-retirement" },
  { keyword: "股債比", url: "/articles/60-40-portfolio-still-relevant", selfSlug: "60-40-portfolio-still-relevant" },
  { keyword: "All In 股票", url: "/articles/should-retirees-all-in-stocks", selfSlug: "should-retirees-all-in-stocks" },
  { keyword: "美股 ETF", url: "/articles/should-include-us-etf-in-retirement-portfolio", selfSlug: "should-include-us-etf-in-retirement-portfolio" },
  { keyword: "券商", url: "/articles/taiwan-broker-comparison-2026", selfSlug: "taiwan-broker-comparison-2026" },
  { keyword: "Robo Advisor", url: "/articles/robo-advisor-comparison-taiwan", selfSlug: "robo-advisor-comparison-taiwan" },
  { keyword: "自願提繳", url: "/articles/labor-pension-voluntary-contribution", selfSlug: "labor-pension-voluntary-contribution" },
  { keyword: "通膨", url: "/articles/inflation-impact-on-retirement-savings", selfSlug: "inflation-impact-on-retirement-savings" },
  { keyword: "FIRE", url: "/articles/fire-financial-independence-taiwan", selfSlug: "fire-financial-independence-taiwan" },
  { keyword: "勞保", url: "/articles/labor-insurance-vs-labor-pension", selfSlug: "labor-insurance-vs-labor-pension" },
  // 連到計算工具（提升工具頁流量與轉換）
  { keyword: "退休金試算", url: "/tools/advanced-calculator", selfSlug: null },
  { keyword: "夫妻退休試算", url: "/tools/couple-calculator", selfSlug: null },
  { keyword: "勞保年金試算器", url: "/tools/labor-insurance", selfSlug: null },
  { keyword: "複利成長", url: "/tools/compound-interest", selfSlug: null },
];

export function autoLinkContent(markdown, currentSlug) {
  const lines = markdown.split("\n");
  const usedKeywords = new Set();
  let inCodeBlock = false;

  const result = lines.map((line) => {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      return line;
    }
    if (inCodeBlock) return line;

    const trimmed = line.trim();
    // 跳過標題、表格列、分隔線、空行 —— 避免破壞 markdown 結構
    if (trimmed.startsWith("#")) return line;
    if (trimmed.includes("|")) return line;
    if (trimmed.startsWith("---")) return line;
    if (trimmed === "") return line;

    let newLine = line;
    for (const { keyword, url, selfSlug } of LINK_MAP) {
      if (usedKeywords.has(keyword)) continue;
      if (selfSlug && selfSlug === currentSlug) continue;

      const idx = newLine.indexOf(keyword);
      if (idx === -1) continue;

      // 避免在已存在的連結文字 [xxx](yyy) 內重複加連結
      const before = newLine.slice(0, idx);
      const openBracket = before.lastIndexOf("[");
      const closeBracket = before.lastIndexOf("]");
      if (openBracket > closeBracket) continue;

      newLine =
        newLine.slice(0, idx) +
        `[${keyword}](${url})` +
        newLine.slice(idx + keyword.length);
      usedKeywords.add(keyword);
    }
    return newLine;
  });

  return result.join("\n");
}
