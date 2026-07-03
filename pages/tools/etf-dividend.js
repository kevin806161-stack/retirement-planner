import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";

function fmt(n) { return "NT$ " + Math.round(n).toLocaleString("zh-TW"); }

const ETF_PRESETS = [
  { name: "0050 元大台灣50", ticker: "0050", yield: 2.8, freq: 2, category: "市值型" },
  { name: "00878 國泰永續高股息", ticker: "00878", yield: 5.8, freq: 4, category: "高股息" },
  { name: "00919 群益台灣精選高息", ticker: "00919", yield: 6.5, freq: 4, category: "高股息" },
  { name: "00929 復華台灣科技優息", ticker: "00929", yield: 5.2, freq: 12, category: "月配" },
  { name: "006208 富邦台灣50", ticker: "006208", yield: 3.0, freq: 1, category: "市值型" },
  { name: "00713 元大台灣高息低波", ticker: "00713", yield: 5.0, freq: 4, category: "高股息" },
  { name: "自訂 ETF", ticker: "custom", yield: 4.0, freq: 4, category: "自訂" },
];

export default function ETFDividendCalculator() {
  const [selectedETF, setSelectedETF] = useState(ETF_PRESETS[1]);
  const [shares, setShares] = useState(10000);
  const [price, setPrice] = useState(20);
  const [customYield, setCustomYield] = useState(4.0);
  const [monthlyBuy, setMonthlyBuy] = useState(5000);
  const [growthRate, setGrowthRate] = useState(3);
  const [years, setYears] = useState(10);

  const etfYield = selectedETF.ticker === "custom" ? customYield : selectedETF.yield;

  const result = useMemo(() => {
    const totalCost = shares * price;
    const annualDividend = totalCost * (etfYield / 100);
    const monthlyDividend = annualDividend / 12;
    const quarterlyDividend = annualDividend / 4;

    // 10年後（含每月買入+殖利率成長）的預估
    let portfolio = totalCost;
    const monthlyRate = growthRate / 100 / 12;
    for (let i = 0; i < years * 12; i++) {
      portfolio = portfolio * (1 + monthlyRate) + monthlyBuy;
    }
    const futureAnnualDividend = portfolio * (etfYield / 100);
    const futureMonthlyDividend = futureAnnualDividend / 12;

    return {
      totalCost, annualDividend, monthlyDividend, quarterlyDividend,
      portfolio, futureAnnualDividend, futureMonthlyDividend,
    };
  }, [shares, price, etfYield, monthlyBuy, growthRate, years]);

  const freqLabel = { 1: "年配", 2: "半年配", 4: "季配", 12: "月配" };

  return (
    <>
      <Head>
        <title>ETF 配息收入試算器 | 退休咖</title>
        <meta name="description" content="試算持有 0050、00878 等台灣主流 ETF 每月能領到多少配息，以及持續買入後的未來配息預估。" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休咖</Link>
        <div className="nav-links">
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
        </div>
      </nav>

      <div className="tool-page">
        <div className="tool-breadcrumb"><Link href="/tools">所有工具</Link> / ETF 配息收入試算器</div>
        <h1>💰 ETF 配息收入試算器</h1>
        <p className="tool-desc">選擇 ETF、輸入持有張數，立即計算現在與未來的配息收入</p>

        <div className="etf-picker">
          {ETF_PRESETS.map((etf) => (
            <button
              key={etf.ticker}
              className={`etf-btn ${selectedETF.ticker === etf.ticker ? "active" : ""}`}
              onClick={() => { setSelectedETF(etf); if (etf.ticker !== "custom" && etf.ticker !== selectedETF.ticker) setPrice(etf.ticker === "0050" ? 165 : etf.ticker === "00878" ? 20 : etf.ticker === "00929" ? 19 : 20); }}
            >
              <div className="etf-ticker">{etf.ticker}</div>
              <div className="etf-cat">{etf.category}</div>
            </button>
          ))}
        </div>

        {selectedETF.ticker !== "custom" && (
          <div className="etf-info">
            <span className="etf-name">{selectedETF.name}</span>
            <span className="etf-yield">殖利率約 {selectedETF.yield}%</span>
            <span className="etf-freq">{freqLabel[selectedETF.freq]}</span>
          </div>
        )}

        <div className="calc-grid">
          <div className="calc-inputs">
            <Slider label="持有張數" value={shares} min={1} max={100000} step={100} fmtVal={(v) => `${v.toLocaleString("zh-TW")} 股`} onChange={setShares} />
            <Slider label="目前股價" value={price} min={5} max={300} step={0.5} fmtVal={(v) => `NT$ ${v}`} onChange={setPrice} />
            {selectedETF.ticker === "custom" && (
              <Slider label="自訂殖利率" value={customYield} min={1} max={12} step={0.5} unit="%" onChange={setCustomYield} />
            )}

            <div className="section-title">未來成長試算</div>
            <Slider label="每月額外買入" value={monthlyBuy} min={0} max={50000} step={1000} fmtVal={(v) => `NT$ ${v.toLocaleString("zh-TW")}`} onChange={setMonthlyBuy} />
            <Slider label="預期資產年成長率" value={growthRate} min={0} max={10} step={0.5} unit="%" onChange={setGrowthRate} />
            <Slider label="試算年數" value={years} min={1} max={30} unit="年" onChange={setYears} />
          </div>

          <div className="calc-result">
            <div className="result-main">
              <div className="result-label">目前持倉總市值</div>
              <div className="result-amount">{fmt(result.totalCost)}</div>
              <div className="result-sub">{shares.toLocaleString("zh-TW")} 股 × NT$ {price}</div>
            </div>

            <div className="dividend-grid">
              <DividendCard label="年配息" value={fmt(result.annualDividend)} sub={`殖利率 ${etfYield}%`} />
              <DividendCard label="每月均攤" value={fmt(result.monthlyDividend)} sub="÷12個月" />
              {selectedETF.freq === 4 && <DividendCard label="季配息（每次）" value={fmt(result.quarterlyDividend)} sub="每季實際領取" />}
            </div>

            <div className="section-title">{years} 年後預估（持續每月買入 {fmt(monthlyBuy)}）</div>
            <ResultRow label={`${years} 年後資產規模`} value={fmt(result.portfolio)} highlight />
            <ResultRow label={`${years} 年後年配息`} value={fmt(result.futureAnnualDividend)} good />
            <ResultRow label={`${years} 年後每月配息`} value={fmt(result.futureMonthlyDividend)} good />

            <div className="ai-analysis">
              {result.futureMonthlyDividend >= 40000
                ? `🎉 依試算，${years} 年後每月配息可達 ${fmt(result.futureMonthlyDividend)}，已達到多數人退休生活費標準！持續定期定額是關鍵。`
                : `💡 ${years} 年後每月配息預估 ${fmt(result.futureMonthlyDividend)}，若要以配息支撐退休生活（建議至少 NT$40,000/月），可考慮增加月投入金額或延長持有年數。`}
            </div>

            <Link href="/tools/advanced-calculator" className="cta-link">
              → 搭配進階退休試算器計算完整退休缺口
            </Link>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
      </footer>

      <style jsx>{`
        .tool-page { max-width: 980px; margin: 0 auto; padding: 32px 24px 80px; }
        .tool-breadcrumb { font-size: 12px; color: #999; margin-bottom: 16px; }
        .tool-breadcrumb a { color: #1d6fd8; text-decoration: none; }
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
        .tool-desc { font-size: 14px; color: #666; margin-bottom: 20px; }
        .etf-picker { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .etf-btn { border: 1px solid #e5e5e0; border-radius: 10px; padding: 8px 14px; background: #fff; cursor: pointer; text-align: center; }
        .etf-btn.active { border-color: #1d6fd8; background: #e6f1fb; }
        .etf-ticker { font-size: 13px; font-weight: 600; color: #1a1a1a; }
        .etf-cat { font-size: 10px; color: #888; }
        .etf-info { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding: 10px 14px; background: #f5f5f3; border-radius: 8px; flex-wrap: wrap; }
        .etf-name { font-size: 14px; font-weight: 500; color: #333; }
        .etf-yield { font-size: 13px; color: #2a7d2a; font-weight: 600; }
        .etf-freq { font-size: 12px; color: #1d6fd8; background: #e6f1fb; padding: 2px 10px; border-radius: 12px; }
        .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 700px) { .calc-grid { grid-template-columns: 1fr; } }
        .calc-inputs { display: flex; flex-direction: column; gap: 14px; }
        .section-title { font-size: 12px; font-weight: 600; color: #1d6fd8; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }
        .calc-result { background: #fafaf8; border: 1px solid #e5e5e0; border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .result-main { text-align: center; padding-bottom: 14px; border-bottom: 1px solid #e5e5e0; }
        .result-label { font-size: 12px; color: #888; margin-bottom: 6px; }
        .result-amount { font-size: 28px; font-weight: 700; color: #1a1a1a; }
        .result-sub { font-size: 12px; color: #999; margin-top: 4px; }
        .dividend-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; }
        .ai-analysis { background: #e6f1fb; border: 1px solid #b5d4f4; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #1a4a7a; line-height: 1.6; }
        .cta-link { font-size: 13px; color: #1d6fd8; text-decoration: none; font-weight: 500; }
      `}</style>
    </>
  );
}

function Slider({ label, value, min, max, step = 1, unit, fmtVal, onChange }) {
  const display = fmtVal ? fmtVal(value) : `${value}${unit || ""}`;
  return (
    <div>
      <label style={{ fontSize: "13px", color: "#555", display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        {label} <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{display}</span>
      </label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} style={{ width: "100%" }} />
    </div>
  );
}

function ResultRow({ label, value, highlight, warn, good }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
      <span style={{ color: "#666" }}>{label}</span>
      <span style={{ fontWeight: 600, color: warn ? "#b07a0b" : good ? "#2a7d2a" : highlight ? "#1d6fd8" : "#1a1a1a" }}>{value}</span>
    </div>
  );
}

function DividendCard({ label, value, sub }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
      <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "16px", fontWeight: 700, color: "#2a7d2a" }}>{value}</div>
      <div style={{ fontSize: "10px", color: "#999", marginTop: "2px" }}>{sub}</div>
    </div>
  );
}
