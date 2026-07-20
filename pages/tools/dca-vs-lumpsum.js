import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";

function fmt(n) { return "NT$ " + Math.round(n).toLocaleString("zh-TW"); }

export default function DcaVsLumpsum() {
  const [totalAmount, setTotalAmount] = useState(1200000);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(6);
  const [volatility, setVolatility] = useState("normal"); // low | normal | high
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const annualRate = rate / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = years * 12;

    // 單筆投入：一次全部投入，複利成長
    const lumpSumFinal = totalAmount * Math.pow(1 + monthlyRate, totalMonths);

    // 定期定額：分 months 期投入，之後持有到期
    const monthlyInvest = totalAmount / months;
    let dcaPortfolio = 0;
    for (let m = 0; m < totalMonths; m++) {
      if (m < months) {
        dcaPortfolio += monthlyInvest;
      }
      dcaPortfolio = dcaPortfolio * (1 + monthlyRate);
    }

    // 波動情境調整（模擬進場時機影響）
    const volFactor = { low: 1.0, normal: 1.0, high: 1.0 };
    // 高波動時定期定額有攤平優勢，單筆有時機風險
    const volBonus = { low: 0, normal: 0.015, high: 0.04 };
    const dcaAdjusted = dcaPortfolio * (1 + volBonus[volatility]);

    const lumpGain = lumpSumFinal - totalAmount;
    const dcaGain = dcaAdjusted - totalAmount;
    const diff = lumpSumFinal - dcaAdjusted;
    const winner = diff > 0 ? "lumpsum" : "dca";

    return {
      lumpSumFinal, dcaAdjusted, lumpGain, dcaGain,
      diff: Math.abs(diff), winner, monthlyInvest,
    };
  }, [totalAmount, months, rate, volatility, years]);

  const maxVal = Math.max(result.lumpSumFinal, result.dcaAdjusted);

  return (
    <>
      <Head>
        <title>定期定額 vs 單筆投入回測工具 | 退休咖</title>
        <meta name="description" content="輸入投資金額與市場條件，回測比較定期定額（DCA）與單筆投入（Lump Sum）兩種策略的最終報酬差異。" />
        <link rel="canonical" href="https://www.retirementplantw.com/tools/dca-vs-lumpsum" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="定期定額 vs 單筆投入回測工具 | 退休咖" />
        <meta property="og:description" content="輸入投資金額與市場條件，回測比較定期定額（DCA）與單筆投入（Lump Sum）兩種策略的最終報酬差異。" />
        <meta property="og:url" content="https://www.retirementplantw.com/tools/dca-vs-lumpsum" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"WebApplication\", \"name\": \"定期定額 vs 單筆投入回測工具\", \"url\": \"https://www.retirementplantw.com/tools/dca-vs-lumpsum\", \"description\": \"輸入投資金額與市場條件，回測比較定期定額（DCA）與單筆投入（Lump Sum）兩種策略的最終報酬差異。\", \"applicationCategory\": \"FinanceApplication\", \"operatingSystem\": \"Web\", \"offers\": {\"@type\": \"Offer\", \"price\": \"0\", \"priceCurrency\": \"TWD\"}, \"inLanguage\": \"zh-Hant\", \"publisher\": {\"@type\": \"Organization\", \"name\": \"退休咖\", \"url\": \"https://www.retirementplantw.com\"}}" }}
        />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休咖</Link>
        <div className="nav-links">
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/author">關於作者</Link>
        </div>
      </nav>

      <div className="tool-page">
        <div className="tool-breadcrumb"><Link href="/tools">所有工具</Link> / 定期定額 vs 單筆投入回測</div>
        <h1>⚖️ 定期定額 vs 單筆投入回測</h1>
        <p className="tool-desc">同一筆資金，一次投入還是分批投入更好？調整市場條件，比較兩種策略的最終報酬</p>

        <div className="calc-grid">
          <div className="calc-inputs">
            <Slider label="總投資金額" value={totalAmount} min={100000} max={10000000} step={100000} fmtVal={(v) => `NT$ ${(v / 10000).toFixed(0)} 萬`} onChange={setTotalAmount} />
            <Slider label="定期定額分幾個月投完" value={months} min={3} max={36} unit="個月" onChange={setMonths} />
            <Slider label="預期年報酬率" value={rate} min={2} max={12} step={0.5} unit="%" onChange={setRate} />
            <Slider label="總持有年數" value={years} min={3} max={30} unit="年" onChange={setYears} />

            <div className="vol-picker">
              <div className="vol-label">市場波動情境</div>
              <div className="vol-buttons">
                {[
                  { key: "low", label: "低波動" },
                  { key: "normal", label: "一般" },
                  { key: "high", label: "高波動" },
                ].map((v) => (
                  <button
                    key={v.key}
                    className={`vol-btn ${volatility === v.key ? "active" : ""}`}
                    onClick={() => setVolatility(v.key)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <div className="hint">市場波動越大，定期定額的分批攤平優勢越明顯</div>
            </div>
          </div>

          <div className="calc-result">
            <div className="result-main">
              <div className="result-label">
                {result.winner === "lumpsum" ? "🏆 單筆投入勝出" : "🏆 定期定額勝出"}
              </div>
              <div className="result-amount">{fmt(result.diff)}</div>
              <div className="result-sub">兩種策略的最終金額差距</div>
            </div>

            {/* 對比長條圖，沿用 ai-analysis 系配色，不引入新設計系統 */}
            <div className="compare-bars">
              <div className="compare-item">
                <div className="compare-head">
                  <span>單筆投入 (Lump Sum)</span>
                  <span className="compare-val">{fmt(result.lumpSumFinal)}</span>
                </div>
                <div className="compare-track">
                  <div className="compare-fill lump" style={{ width: `${(result.lumpSumFinal / maxVal) * 100}%` }} />
                </div>
                <div className="compare-sub">獲利 {fmt(result.lumpGain)}</div>
              </div>

              <div className="compare-item">
                <div className="compare-head">
                  <span>定期定額 (DCA)</span>
                  <span className="compare-val">{fmt(result.dcaAdjusted)}</span>
                </div>
                <div className="compare-track">
                  <div className="compare-fill dca" style={{ width: `${(result.dcaAdjusted / maxVal) * 100}%` }} />
                </div>
                <div className="compare-sub">獲利 {fmt(result.dcaGain)}｜每月投入 {fmt(result.monthlyInvest)}</div>
              </div>
            </div>

            <div className="ai-analysis">
              {volatility === "high"
                ? `📊 在高波動市場中，定期定額透過分批進場攤平成本，能降低單一時點進場的時機風險。但長期而言，若市場整體向上，單筆投入因資金較早完整進場，多數情況報酬仍略高。你的資金個性與心理承受度是關鍵。`
                : result.winner === "lumpsum"
                ? `📊 依歷史數據，市場長期向上時，單筆投入通常小幅領先（本試算差距 ${fmt(result.diff)}），因為資金較早完整參與市場成長。但單筆投入需承受一次全押的心理壓力與時機風險。`
                : `📊 在此條件下定期定額表現較佳。實務上若你有大額閒置資金但擔心進場時機，「先投入一半、其餘分批」是常見的折衷策略，兼顧報酬與心理壓力。`}
            </div>

            <Link href="/articles/dca-vs-lump-sum-for-retirement" className="cta-link">
              → 深入閱讀：定期定額 vs 單筆投入完整分析
            </Link>
          </div>
        </div>

        <div className="tool-guide">
          <h2>怎麼使用這個工具</h2>
          <p>
            這個工具模擬的是「同一筆錢」的兩種投入方式：一次全部投入，或是分成好幾個月慢慢投入。填入你手上實際有的總金額、想分幾個月投完，以及預期的市場報酬率和持有年數，再選擇一個市場波動情境，就能看到兩種策略在這些假設下的最終資產差異。
          </p>
          <p>
            建議多試幾種波動情境對照——如果你認為短期內市場不確定性較高，可以看看「高波動」情境下兩者的差距是否縮小；如果你對市場長期向上有信心，「低波動」或「一般」情境下的結果會更貼近你的預期。
          </p>

          <h2>這個工具的計算邏輯</h2>
          <p>
            單筆投入的計算方式，是把總金額直接用複利公式成長到期末；定期定額則是把總金額拆成每月固定金額，每個月投入後開始計算複利成長，因此越晚投入的錢，複利成長的時間越短。波動情境的設定，反映的是「定期定額分批進場能降低擇時風險」這個效果——市場波動越大，分批進場的攤平效果越明顯，這裡用一個簡化的加成係數模擬這個效果，並非精確的歷史回測，實際結果會因真實市場走勢而有所不同。
          </p>
          <p>
            如果你手上有一筆退休金或資遣費，正在猶豫要不要一次投入市場，這篇
            {" "}<Link href="/articles/dca-vs-lump-sum-for-retirement">定期定額 vs 單筆投入</Link>{" "}
            文章有更完整的策略建議。
          </p>
        </div>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/author">關於作者</a>
      </footer>

      <style jsx>{`
        .tool-page { max-width: 900px; margin: 0 auto; padding: 32px 24px 80px; }
        .tool-breadcrumb { font-size: 12px; color: #6b7d90; margin-bottom: 16px; }
        .tool-breadcrumb a { color: #ecc776; text-decoration: none; }
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
        .tool-desc { font-size: 14px; color: #a2b4c6; margin-bottom: 24px; line-height: 1.6; }
        .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 700px) { .calc-grid { grid-template-columns: 1fr; } }
        .calc-inputs { display: flex; flex-direction: column; gap: 14px; }
        .calc-result { background: #10202f; border: 1px solid rgba(212,169,90,.16); border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 14px; }
        .result-main { text-align: center; padding-bottom: 14px; border-bottom: 1px solid rgba(212,169,90,.16); }
        .result-label { font-size: 13px; color: #f3ecdd; margin-bottom: 6px; font-weight: 600; }
        .result-amount { font-size: 28px; font-weight: 700; color: #ecc776; }
        .result-sub { font-size: 12px; color: #6b7d90; margin-top: 4px; }
        .vol-picker { margin-top: 4px; }
        .vol-label { font-size: 13px; color: #a2b4c6; margin-bottom: 8px; }
        .vol-buttons { display: flex; gap: 8px; }
        .vol-btn { flex: 1; padding: 8px; border-radius: 8px; border: 1px solid rgba(212,169,90,.22); background: #10202f; color: #a2b4c6; cursor: pointer; font-size: 13px; }
        .vol-btn.active { background: #ecc776; color: #1a1206; border-color: #ecc776; }
        .hint { font-size: 11px; color: #6b7d90; margin-top: 8px; }
        .compare-bars { display: flex; flex-direction: column; gap: 16px; }
        .compare-item { }
        .compare-head { display: flex; justify-content: space-between; font-size: 13px; color: #f3ecdd; margin-bottom: 6px; }
        .compare-val { font-weight: 700; }
        .compare-track { height: 14px; background: rgba(255,255,255,0.08); border-radius: 7px; overflow: hidden; }
        .compare-fill { height: 100%; border-radius: 7px; transition: width 0.4s ease; }
        .compare-fill.lump { background: #ecc776; }
        .compare-fill.dca { background: #2a9d5c; }
        .compare-sub { font-size: 11px; color: #8394a6; margin-top: 4px; }
        .ai-analysis { background: rgba(212,169,90,.08); border: 1px solid rgba(212,169,90,.28); border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #ecc776; line-height: 1.6; }
        .cta-link { font-size: 13px; color: #ecc776; text-decoration: none; font-weight: 500; }
        .tool-guide {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--line);
        }
        .tool-guide h2 {
          font-size: 16px;
          font-weight: 600;
          color: var(--gold);
          margin-top: 20px;
          margin-bottom: 10px;
        }
        .tool-guide h2:first-child { margin-top: 0; }
        .tool-guide p {
          font-size: 13px;
          line-height: 1.9;
          color: var(--slate);
          margin-bottom: 12px;
        }
        .tool-guide :global(a) {
          color: var(--gold);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
      `}</style>
    </>
  );
}

function Slider({ label, value, min, max, step = 1, unit, fmtVal, onChange }) {
  const display = fmtVal ? fmtVal(value) : `${value}${unit || ""}`;
  return (
    <div>
      <label style={{ fontSize: "13px", color: "#a2b4c6", display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        {label} <span style={{ fontWeight: 600, color: "#f3ecdd" }}>{display}</span>
      </label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} style={{ width: "100%" }} />
    </div>
  );
}
