import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";

function fmt(n) { return "NT$ " + Math.round(n).toLocaleString("zh-TW"); }

export default function CoupleCalculator() {
  // 本人
  const [age1, setAge1] = useState(35);
  const [retire1, setRetire1] = useState(65);
  const [income1, setIncome1] = useState(60000);
  // 配偶
  const [age2, setAge2] = useState(33);
  const [retire2, setRetire2] = useState(65);
  const [income2, setIncome2] = useState(50000);
  // 共同
  const [saved, setSaved] = useState(1000000);
  const [rate, setRate] = useState(6);
  const [inflation, setInflation] = useState(2);
  const [expenseRatio, setExpenseRatio] = useState(65);

  const result = useMemo(() => {
    const r = rate / 100;
    const inf = inflation / 100;
    const lifeAfter = 25;

    // 兩人各自距離退休的年數
    const years1 = Math.max(retire1 - age1, 0);
    const years2 = Math.max(retire2 - age2, 0);
    // 家庭完全退休以較晚退休者為準
    const yearsToFullRetire = Math.max(years1, years2);
    // 第一人退休後的「單薪過渡期」
    const transitionYears = Math.abs(years1 - years2);

    const totalIncome = income1 + income2;
    // 過渡期仍有收入的那一方
    const laterIncome = years1 > years2 ? income1 : income2;

    // 退休後家庭月支出（夫妻共同生活成本低於兩個單身人，用共同比例估算）
    const monthlyNeed = totalIncome * (expenseRatio / 100);
    const totalTarget = monthlyNeed * 12 * lifeAfter;

    // 現有資產成長（以完全退休年數計）
    const savedGrow = saved * Math.pow(1 + r, yearsToFullRetire);

    // 過渡期單薪可累積的部分（簡化：過渡期收入的30%可儲蓄投資）
    const transitionSaving = transitionYears > 0
      ? laterIncome * 0.3 * 12 * transitionYears * (1 + r * transitionYears / 2)
      : 0;

    const gap = Math.max(totalTarget - savedGrow - transitionSaving, 0);

    // 雙薪期間每月需共同儲蓄（以較短年數者為主要累積期）
    const n = Math.max(Math.min(years1, years2), 1) * 12;
    const monthlyRate = r / 12;
    const monthlySave = monthlyRate > 0 ? (gap * monthlyRate) / (Math.pow(1 + monthlyRate, n) - 1) : gap / n;
    const monthlySavePct = (monthlySave / totalIncome) * 100;

    // 通膨提醒
    const inflatedNeed = monthlyNeed * Math.pow(1 + inf, yearsToFullRetire);

    return {
      years1, years2, yearsToFullRetire, transitionYears,
      monthlyNeed, totalTarget, savedGrow, transitionSaving,
      gap, monthlySave, monthlySavePct, inflatedNeed, lifeAfter,
    };
  }, [age1, retire1, income1, age2, retire2, income2, saved, rate, inflation, expenseRatio]);

  const getAiAnalysis = () => {
    const pct = result.monthlySavePct;
    if (result.gap === 0) return "🎉 以雙薪家庭目前的資產累積，你們已在退休目標軌道上。建議持續維持共同投資紀律，並每年一起檢視配置。";
    if (result.transitionYears >= 3) return `💑 你們的退休時間差 ${result.transitionYears} 年，過渡期的單薪收入是重要緩衝。建議先退休的一方將勞保年金延後請領（每年+4%），讓仍在工作方的收入支撐生活。每月共同需儲蓄約 ${fmt(result.monthlySave)}。`;
    if (pct < 15) return `💡 每月共同儲蓄 ${fmt(result.monthlySave)}（佔家庭收入 ${Math.round(pct)}%），雙薪分攤下相當可行。建議開設共同投資帳戶，自動扣款定期定額。`;
    return `📊 每月共同需儲蓄 ${fmt(result.monthlySave)}（佔家庭收入 ${Math.round(pct)}%），壓力偏高。可考慮其中一方延後退休 2-3 年，或重新檢視退休後的生活費預算。`;
  };

  return (
    <>
      <Head>
        <title>夫妻退休試算器（雙薪家庭專用）| 退休咖</title>
        <meta name="description" content="專為雙薪家庭設計的退休金試算器，夫妻年齡、收入、退休年齡分開設定，計算家庭退休缺口與共同儲蓄目標。" />
        <link rel="canonical" href="https://www.retirementplantw.com/tools/couple-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="夫妻退休試算器（雙薪家庭專用）| 退休咖" />
        <meta property="og:description" content="專為雙薪家庭設計的退休金試算器，夫妻年齡、收入、退休年齡分開設定，計算家庭退休缺口與共同儲蓄目標。" />
        <meta property="og:url" content="https://www.retirementplantw.com/tools/couple-calculator" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"WebApplication\", \"name\": \"夫妻退休試算器（雙薪家庭專用）\", \"url\": \"https://www.retirementplantw.com/tools/couple-calculator\", \"description\": \"專為雙薪家庭設計的退休金試算器，夫妻年齡、收入、退休年齡分開設定，計算家庭退休缺口與共同儲蓄目標。\", \"applicationCategory\": \"FinanceApplication\", \"operatingSystem\": \"Web\", \"offers\": {\"@type\": \"Offer\", \"price\": \"0\", \"priceCurrency\": \"TWD\"}, \"inLanguage\": \"zh-Hant\", \"publisher\": {\"@type\": \"Organization\", \"name\": \"退休咖\", \"url\": \"https://www.retirementplantw.com\"}}" }}
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
        <div className="tool-breadcrumb"><Link href="/tools">所有工具</Link> / 夫妻退休試算器</div>
        <h1>💑 夫妻退休試算器</h1>
        <p className="tool-desc">兩人的年齡、收入、退休時間分開設定，精算雙薪家庭的退休缺口與退休時間差的過渡策略</p>

        <div className="calc-grid">
          <div className="calc-inputs">
            <div className="input-section-title">本人</div>
            <Slider label="年齡" value={age1} min={20} max={60} unit="歲" onChange={setAge1} />
            <Slider label="預計退休年齡" value={retire1} min={50} max={75} unit="歲" onChange={setRetire1} />
            <Slider label="月收入" value={income1} min={25000} max={200000} step={5000} fmtVal={(v) => `NT$ ${v.toLocaleString("zh-TW")}`} onChange={setIncome1} />

            <div className="input-section-title" style={{ marginTop: "16px" }}>配偶</div>
            <Slider label="年齡" value={age2} min={20} max={60} unit="歲" onChange={setAge2} />
            <Slider label="預計退休年齡" value={retire2} min={50} max={75} unit="歲" onChange={setRetire2} />
            <Slider label="月收入" value={income2} min={25000} max={200000} step={5000} fmtVal={(v) => `NT$ ${v.toLocaleString("zh-TW")}`} onChange={setIncome2} />

            <div className="input-section-title" style={{ marginTop: "16px" }}>家庭共同</div>
            <Slider label="目前共同已存退休金" value={saved} min={0} max={10000000} step={100000} fmtVal={(v) => `NT$ ${(v / 10000).toFixed(0)} 萬`} onChange={setSaved} />
            <Slider label="預期投資年報酬率" value={rate} min={2} max={12} step={0.5} unit="%" onChange={setRate} />
            <Slider label="通膨率" value={inflation} min={0.5} max={5} step={0.5} unit="%" onChange={setInflation} />
            <Slider label="退休後家庭生活費比例" value={expenseRatio} min={40} max={90} step={5} unit="%" onChange={setExpenseRatio} />
            <div className="hint">夫妻共同生活有規模經濟，比例通常低於個人版的 70%</div>
          </div>

          <div className="calc-result">
            <div className="result-main">
              <div className="result-label">退休後家庭每月所需生活費</div>
              <div className="result-amount">{fmt(result.monthlyNeed)}</div>
              <div className="result-sub">（家庭合計收入的 {expenseRatio}%）</div>
            </div>

            <ResultRow label="家庭退休金目標總額" value={fmt(result.totalTarget)} highlight />
            <ResultRow label="共同資產成長後" value={fmt(result.savedGrow)} />
            {result.transitionYears > 0 && (
              <ResultRow label={`過渡期單薪累積（${result.transitionYears} 年）`} value={fmt(result.transitionSaving)} good />
            )}
            <ResultRow label="家庭退休缺口" value={result.gap > 0 ? fmt(result.gap) : "無缺口 ✓"} warn={result.gap > 0} good={result.gap === 0} />
            <ResultRow label="每月需共同儲蓄" value={result.gap > 0 ? fmt(result.monthlySave) : "目標已達成"} good />
            <ResultRow label="佔家庭月收入比例" value={result.gap > 0 ? `${Math.round(result.monthlySavePct)}%` : "—"} />

            <div className="timeline-box">
              <div className="timeline-title">⏱️ 退休時間軸</div>
              <div className="timeline-row">
                <span>本人退休</span>
                <span className="timeline-val">{result.years1} 年後（{retire1} 歲）</span>
              </div>
              <div className="timeline-row">
                <span>配偶退休</span>
                <span className="timeline-val">{result.years2} 年後（{retire2} 歲）</span>
              </div>
              {result.transitionYears > 0 && (
                <div className="timeline-row">
                  <span>單薪過渡期</span>
                  <span className="timeline-val" style={{ color: "#e8c477" }}>{result.transitionYears} 年</span>
                </div>
              )}
            </div>

            <div className="ai-analysis">{getAiAnalysis()}</div>

            <div className="disclaimer-note">* 通膨 {inflation}% 調整後，{result.yearsToFullRetire} 年後同等生活水準約需 {fmt(result.inflatedNeed)}/月</div>
          </div>
        </div>

        <div className="tool-guide">
          <h2>怎麼使用這個工具</h2>
          <p>
            分別填入本人與配偶的年齡、預計退休年齡、月收入，如果兩人預計退休的年齡不同（例如一方想早點退休、另一方想工作久一點），工具會自動計算出中間的「單薪過渡期」，並試算這段期間單薪收入能為家庭多存下多少錢。家庭共同已存退休金、預期報酬率與通膨率則是共用參數，反映夫妻共同管理的資產池。
          </p>
          <p>
            退休後家庭生活費比例建議抓比個人試算更低一些（例如 60-70% 而非 70-80%），因為夫妻同住通常有房租房貸、水電、部分保險等固定支出可以分攤，實際家庭生活成本不會是兩個單身生活成本的簡單加總。
          </p>

          <h2>這個工具的計算邏輯</h2>
          <p>
            這個工具跟一般個人退休試算最大的差異，在於處理「兩人退休時間不同步」的情境。家庭完全退休的時間點，是以較晚退休的一方為準；如果兩人退休年齡有落差，中間的過渡期會假設仍在工作的一方，把部分收入持續投入儲蓄，這筆錢會在計算最終退休缺口時，從總目標中扣除，反映這段單薪期對家庭資產的實際貢獻。
          </p>
          <p>
            如果你和配偶其中一方是自由業或收入不固定，也可以先用
            {" "}<Link href="/tools/advanced-calculator">個人版進階試算器</Link>{" "}
            分別試算兩人的狀況，再回來這裡看合併後的家庭總覽。
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
        .input-section-title { font-size: 12px; font-weight: 600; color: #ecc776; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
        .calc-inputs { display: flex; flex-direction: column; gap: 14px; }
        .hint { font-size: 11px; color: #6b7d90; margin-top: -8px; }
        .calc-result { background: #10202f; border: 1px solid rgba(212,169,90,.16); border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .result-main { text-align: center; padding-bottom: 14px; border-bottom: 1px solid rgba(212,169,90,.16); }
        .result-label { font-size: 12px; color: #8394a6; margin-bottom: 6px; }
        .result-amount { font-size: 28px; font-weight: 700; color: #ecc776; }
        .result-sub { font-size: 12px; color: #6b7d90; margin-top: 4px; }
        .timeline-box { background: #0d1c2b; border-radius: 10px; padding: 14px; }
        .timeline-title { font-size: 13px; font-weight: 600; color: #f3ecdd; margin-bottom: 10px; }
        .timeline-row { display: flex; justify-content: space-between; font-size: 13px; color: #a2b4c6; margin-bottom: 6px; }
        .timeline-val { font-weight: 600; color: #ecc776; }
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
