import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";

function fmt(n) {
  return "NT$ " + Math.round(n).toLocaleString("zh-TW");
}

export default function AdvancedCalculator() {
  const [mode, setMode] = useState("single"); // single | couple
  const [age, setAge] = useState(35);
  const [retire, setRetire] = useState(65);
  const [income, setIncome] = useState(60000);
  const [income2, setIncome2] = useState(50000);
  const [saved, setSaved] = useState(500000);
  const [rate, setRate] = useState(6);
  const [inflation, setInflation] = useState(2);
  const [salaryGrowth, setSalaryGrowth] = useState(2);
  const [expenseRatio, setExpenseRatio] = useState(70);

  const result = useMemo(() => {
    const years = Math.max(retire - age, 1);
    const lifeAfter = 25;
    const r = rate / 100;
    const inf = inflation / 100;
    const sg = salaryGrowth / 100;

    const totalIncome = mode === "couple" ? income + income2 : income;

    // 退休時的月薪（考慮薪資成長）
    const incomeAtRetire = totalIncome * Math.pow(1 + sg, years);
    // 退休後月支出（以退休時薪資計算，再考慮通膨）
    const monthlyNeed = incomeAtRetire * (expenseRatio / 100);
    // 退休總需求（考慮通膨每年讓支出增加）
    const totalTarget = monthlyNeed * 12 * lifeAfter;

    // 現有資產成長後（考慮通膨調整後實質報酬率）
    const realRate = (1 + r) / (1 + inf) - 1;
    const savedGrow = saved * Math.pow(1 + r, years);
    const savedGrowReal = saved * Math.pow(1 + realRate, years);

    const gap = Math.max(totalTarget - savedGrow, 0);
    const n = years * 12;
    const monthlyRate = r / 12;
    const monthlySave = monthlyRate > 0 ? (gap * monthlyRate) / (Math.pow(1 + monthlyRate, n) - 1) : gap / n;

    const monthlySavePct = monthlySave / totalIncome * 100;

    // 通膨調整後的實質退休金需求
    const realTarget = totalTarget / Math.pow(1 + inf, years);

    return {
      years, lifeAfter, monthlyNeed, totalTarget, savedGrow,
      gap, monthlySave, monthlySavePct, realTarget,
      incomeAtRetire, savedGrowReal,
    };
  }, [mode, age, retire, income, income2, saved, rate, inflation, salaryGrowth, expenseRatio]);

  const getAiAnalysis = () => {
    const pct = result.monthlySavePct;
    if (result.gap === 0) return "🎉 恭喜！以目前的儲蓄速度，你已在退休金目標的軌道上。建議持續維持投資紀律，並每年檢視配置是否符合市場環境。";
    if (pct < 10) return `💡 每月需儲蓄 ${Math.round(result.monthlySavePct)}% 的收入，目標相當可達。建議設定自動扣款定期定額，讓儲蓄成為不需要意志力的習慣。`;
    if (pct < 20) return `📊 每月需儲蓄約 ${Math.round(result.monthlySavePct)}% 的收入，屬於中等難度。延後退休 2-3 年或提高投資報酬率，都能顯著降低每月需存的金額。`;
    return `⚠️ 每月需儲蓄約 ${Math.round(result.monthlySavePct)}% 的收入，壓力較大。建議重新檢視退休後的生活費預算、延後退休年齡，或考慮增加收入來源。`;
  };

  return (
    <>
      <Head>
        <title>進階退休試算器（含通膨+薪資成長+夫妻版）| 退休咖</title>
        <meta name="description" content="比基本版更精準的退休試算器，納入通膨率、薪資成長率、夫妻合計收入，計算更貼近真實的退休金目標。" />
        <link rel="canonical" href="https://www.retirementplantw.com/tools/advanced-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="進階退休試算器（含通膨+薪資成長+夫妻版）| 退休咖" />
        <meta property="og:description" content="比基本版更精準的退休試算器，納入通膨率、薪資成長率、夫妻合計收入，計算更貼近真實的退休金目標。" />
        <meta property="og:url" content="https://www.retirementplantw.com/tools/advanced-calculator" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"WebApplication\", \"name\": \"進階退休試算器（含通膨+薪資成長+夫妻版）\", \"url\": \"https://www.retirementplantw.com/tools/advanced-calculator\", \"description\": \"比基本版更精準的退休試算器，納入通膨率、薪資成長率、夫妻合計收入，計算更貼近真實的退休金目標。\", \"applicationCategory\": \"FinanceApplication\", \"operatingSystem\": \"Web\", \"offers\": {\"@type\": \"Offer\", \"price\": \"0\", \"priceCurrency\": \"TWD\"}, \"inLanguage\": \"zh-Hant\", \"publisher\": {\"@type\": \"Organization\", \"name\": \"退休咖\", \"url\": \"https://www.retirementplantw.com\"}}" }}
        />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休咖</Link>
        <div className="nav-links">
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/author">關於作者</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
      </nav>

      <div className="tool-page">
        <div className="tool-breadcrumb"><Link href="/tools">所有工具</Link> / 進階退休試算器</div>
        <h1>🧮 進階退休試算器</h1>
        <p className="tool-desc">納入通膨率、薪資成長率與夫妻合計收入，比基本試算器更精確反映真實狀況</p>

        {/* 模式切換 */}
        <div className="mode-switch">
          <button className={mode === "single" ? "active" : ""} onClick={() => setMode("single")}>個人版</button>
          <button className={mode === "couple" ? "active" : ""} onClick={() => setMode("couple")}>夫妻合計版</button>
        </div>

        <div className="calc-grid">
          <div className="calc-inputs">
            <div className="input-section-title">基本設定</div>
            <Slider label="目前年齡" value={age} min={20} max={60} unit="歲" onChange={setAge} />
            <Slider label="預計退休年齡" value={retire} min={45} max={75} unit="歲" onChange={setRetire} />
            <Slider label={mode === "couple" ? "本人月收入" : "月收入"} value={income} min={25000} max={200000} step={5000} unit="元" fmtVal={(v) => `NT$ ${v.toLocaleString("zh-TW")}`} onChange={setIncome} />
            {mode === "couple" && (
              <Slider label="配偶月收入" value={income2} min={25000} max={200000} step={5000} unit="元" fmtVal={(v) => `NT$ ${v.toLocaleString("zh-TW")}`} onChange={setIncome2} />
            )}
            <Slider label="目前已存退休金" value={saved} min={0} max={5000000} step={100000} fmtVal={(v) => `NT$ ${(v / 10000).toFixed(0)} 萬`} onChange={setSaved} />

            <div className="input-section-title" style={{ marginTop: "16px" }}>進階參數</div>
            <Slider label="預期投資年報酬率" value={rate} min={2} max={12} step={0.5} unit="%" onChange={setRate} />
            <Slider label="通膨率（歷史平均 2%）" value={inflation} min={0.5} max={5} step={0.5} unit="%" onChange={setInflation} />
            <Slider label="薪資年成長率" value={salaryGrowth} min={0} max={8} step={0.5} unit="%" onChange={setSalaryGrowth} />
            <Slider label="退休後生活費比例" value={expenseRatio} min={50} max={100} step={5} unit="%" onChange={setExpenseRatio} />
          </div>

          <div className="calc-result">
            <div className="result-main">
              <div className="result-label">退休後每月所需生活費</div>
              <div className="result-amount">{fmt(result.monthlyNeed)}</div>
              <div className="result-sub">（以退休時薪資 {expenseRatio}% 估算）</div>
            </div>

            <ResultRow label="退休金目標總額" value={fmt(result.totalTarget)} highlight />
            <ResultRow label="現有資產成長後（名目）" value={fmt(result.savedGrow)} />
            <ResultRow label="退休缺口" value={result.gap > 0 ? fmt(result.gap) : "無缺口 ✓"} warn={result.gap > 0} good={result.gap === 0} />
            <ResultRow label="每月需額外儲蓄" value={result.gap > 0 ? fmt(result.monthlySave) : "目標已達成"} good />
            <ResultRow label="佔目前月收入比例" value={result.gap > 0 ? `${Math.round(result.monthlySavePct)}%` : "—"} />
            <ResultRow label="退休時預估月薪（薪資成長後）" value={fmt(result.incomeAtRetire / (mode === "couple" ? 1 : 1))} />

            <div className="ai-analysis">{getAiAnalysis()}</div>

            <div className="disclaimer-note">* 已納入通膨率 {inflation}%、薪資成長率 {salaryGrowth}%，比基本試算更貼近實際</div>
          </div>
        </div>

        <div className="tool-guide">
          <h2>怎麼使用這個工具</h2>
          <p>
            先在「基本設定」輸入你目前的年齡、預計退休年齡、月收入與目前已存的退休金；如果你和配偶都有收入，可以切換到「夫妻合計版」，分別填入兩人的月收入，工具會自動加總計算家庭整體的退休金目標。接著在「進階參數」調整預期投資報酬率、通膨率與薪資年成長率——這三個數字會直接影響最終試算結果，建議先用預設值試算一次，再依照自己的實際狀況微調。
          </p>
          <p>
            試算結果會即時更新，你可以反覆調整滑桿，觀察「每月需額外儲蓄」這個數字如何隨著退休年齡、報酬率假設而變化，藉此找出一個你覺得可行、又能達成退休目標的組合。
          </p>

          <h2>這個工具的計算邏輯</h2>
          <p>
            多數線上退休試算工具，只用「現在的月薪」去估算退休後的生活費需求，忽略了通膨與薪資成長這兩個會互相抵銷、也會互相放大的變數。這個工具的做法是：先用薪資成長率，推算你退休當年的實際月薪水準，再用這個「退休時的薪資」乘上生活費比例，得出退休後每月所需支出；同時，現有資產的成長也會用通膨調整後的實質報酬率重新試算一次，讓你同時看到名目與實質兩種角度的結果。
          </p>
          <p>
            如果想先了解試算邏輯背後的基本公式，可以參考
            {" "}<Link href="/articles/how-much-retirement-savings-needed">退休金要存多少才夠</Link>{" "}
            這篇文章；如果你的退休金主要來源是勞保與勞退，建議搭配
            {" "}<Link href="/tools/labor-insurance">勞保年金試算器</Link>{" "}
            一起使用，掌握制度性給付能補足多少缺口。
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
        .mode-switch { display: flex; gap: 8px; margin-bottom: 24px; }
        .mode-switch button {
          padding: 8px 20px; border-radius: 20px; border: 1px solid rgba(212,169,90,.22);
          background: #10202f; color: #a2b4c6; cursor: pointer; font-size: 14px;
        }
        .mode-switch button.active { background: #ecc776; color: #1a1206; border-color: #ecc776; }
        .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 700px) { .calc-grid { grid-template-columns: 1fr; } }
        .input-section-title { font-size: 12px; font-weight: 600; color: #ecc776; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
        .calc-inputs { display: flex; flex-direction: column; gap: 14px; }
        .calc-result { background: #10202f; border: 1px solid rgba(212,169,90,.16); border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .result-main { text-align: center; padding-bottom: 14px; border-bottom: 1px solid rgba(212,169,90,.16); }
        .result-label { font-size: 12px; color: #8394a6; margin-bottom: 6px; }
        .result-amount { font-size: 28px; font-weight: 700; color: #ecc776; }
        .result-sub { font-size: 12px; color: #6b7d90; margin-top: 4px; }
        .ai-analysis { background: rgba(212,169,90,.08); border: 1px solid rgba(212,169,90,.28); border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #ecc776; line-height: 1.6; }
        .disclaimer-note { font-size: 11px; color: #6b7d90; }
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

function ResultRow({ label, value, highlight, warn, good }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
      <span style={{ color: "#a2b4c6" }}>{label}</span>
      <span style={{ fontWeight: 600, color: warn ? "#e8c477" : good ? "#2a7d2a" : highlight ? "#ecc776" : "#f3ecdd" }}>{value}</span>
    </div>
  );
}
