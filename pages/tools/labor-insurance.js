import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";

function fmt(n) { return "NT$ " + Math.round(n).toLocaleString("zh-TW"); }

export default function LaborInsuranceCalculator() {
  const [avgSalary, setAvgSalary] = useState(40000);
  const [years, setYears] = useState(30);
  const [claimAge, setClaimAge] = useState(65);
  const [hasDisability, setHasDisability] = useState(false);

  const result = useMemo(() => {
    // 勞保投保薪資上限（2026年）
    const maxSalary = 45800;
    const insuredSalary = Math.min(avgSalary, maxSalary);

    // 計算公式一：年資 × 平均月投保薪資 × 0.775%
    const formula1 = years * insuredSalary * 0.00775;
    // 計算公式二：年資 × 1.55% × 平均月投保薪資
    const formula2 = years * 0.0155 * insuredSalary;
    // 取較高者
    const baseAmount = Math.max(formula1, formula2);

    // 延後請領加成（每延後1年+4%，最多+20%）
    const delayYears = Math.max(0, Math.min(5, claimAge - 65));
    const bonus = 1 + delayYears * 0.04;
    const monthlyAmount = baseAmount * bonus;

    // 提前請領減成（65歲前每提前1年-4%）
    const earlyYears = Math.max(0, 65 - claimAge);
    const penalty = 1 - earlyYears * 0.04;
    const monthlyAmountEarly = baseAmount * Math.max(0, penalty);

    const finalAmount = claimAge >= 65 ? monthlyAmount : monthlyAmountEarly;

    // 勞退預估（雇主6%提撥）
    const laborPensionMonthly = avgSalary * 0.06;
    const laborPensionTotal = laborPensionMonthly * 12 * years * 1.03; // 加計利息
    const laborPensionMonthlyPayout = laborPensionTotal / (25 * 12);

    const totalMonthly = finalAmount + laborPensionMonthlyPayout;

    return {
      insuredSalary, formula1, formula2, baseAmount,
      monthlyAmount, finalAmount, delayYears, earlyYears,
      laborPensionMonthlyPayout, totalMonthly,
    };
  }, [avgSalary, years, claimAge]);

  return (
    <>
      <Head>
        <title>勞保年金試算器 | 退休 AI 規劃師</title>
        <meta name="description" content="輸入投保薪資與年資，精算你的勞保老年年金月領金額，以及延後或提前請領的差異。" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休 AI 規劃師</Link>
        <div className="nav-links">
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
        </div>
      </nav>

      <div className="tool-page">
        <div className="tool-breadcrumb"><Link href="/tools">所有工具</Link> / 勞保年金試算器</div>
        <h1>勞保年金試算器</h1>
        <p className="tool-desc">依照現行勞保老年年金給付公式，計算你能領多少勞保年金，以及延後請領的加成效果</p>

        <div className="calc-grid">
          <div className="calc-inputs">
            <Slider label="平均月投保薪資" value={avgSalary} min={25250} max={45800} step={1000} fmtVal={(v) => `NT$ ${v.toLocaleString("zh-TW")}`} onChange={setAvgSalary} />
            <div className="hint">目前勞保投保薪資上限為 NT$ 45,800</div>

            <Slider label="勞保年資" value={years} min={1} max={45} unit="年" onChange={setYears} />
            <Slider label="預計請領年齡" value={claimAge} min={60} max={70} unit="歲" onChange={setClaimAge} />

            <div className="info-box">
              <div className="info-title">延後/提前請領說明</div>
              <p>65 歲為標準請領年齡</p>
              <p>每延後 1 年：金額加給 <strong>4%</strong>（最多延後 5 年，+20%）</p>
              <p>每提前 1 年：金額減少 <strong>4%</strong>（最多提前 5 年，-20%）</p>
            </div>
          </div>

          <div className="calc-result">
            <div className="result-main">
              <div className="result-label">勞保老年年金月領金額</div>
              <div className="result-amount">{fmt(result.finalAmount)}</div>
              <div className="result-sub">
                {claimAge > 65 && <span className="badge-good">延後 {result.delayYears} 年，加給 {result.delayYears * 4}%</span>}
                {claimAge < 65 && <span className="badge-warn">提前 {result.earlyYears} 年，減少 {result.earlyYears * 4}%</span>}
                {claimAge === 65 && <span>標準 65 歲請領</span>}
              </div>
            </div>

            <div className="formula-box">
              <div className="formula-title">計算過程</div>
              <div className="formula-row">
                <span>實際投保薪資</span>
                <span>{fmt(result.insuredSalary)}</span>
              </div>
              <div className="formula-row">
                <span>公式一（年資×0.775%×薪資）</span>
                <span>{fmt(result.formula1)}</span>
              </div>
              <div className="formula-row">
                <span>公式二（年資×1.55%×薪資）</span>
                <span style={{ color: "#c9a24b", fontWeight: 600 }}>{fmt(result.formula2)}</span>
              </div>
              <div className="formula-note">取兩公式較高者：{fmt(result.baseAmount)}</div>
            </div>

            <div className="divider" />

            <div className="result-section-title">加上勞退（雇主提撥 6%）</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px" }}>
              <span style={{ color: "#6a7480" }}>勞退月領估算</span>
              <span style={{ fontWeight: 600 }}>{fmt(result.laborPensionMonthlyPayout)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 700, borderTop: "1px solid rgba(15,33,48,0.14)", paddingTop: "12px" }}>
              <span>勞保 + 勞退合計月領</span>
              <span style={{ color: "#c9a24b" }}>{fmt(result.totalMonthly)}</span>
            </div>

            <div className="ai-analysis">
              {result.totalMonthly < 30000
                ? `你的勞保加勞退合計月領約 ${fmt(result.totalMonthly)}，通常不足以支撐舒適的退休生活（一般建議至少 NT$40,000/月）。建議透過個人投資補足缺口，可使用進階退休試算器計算需要額外準備多少。`
                : `你的勞保加勞退合計月領約 ${fmt(result.totalMonthly)}，已具備基本退休保障。建議仍規劃個人投資補充，以應對醫療支出與通膨侵蝕。`}
            </div>

            <Link href="/tools/advanced-calculator" className="cta-link">
              → 進階退休試算器：計算個人投資缺口
            </Link>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
      </footer>

      <style jsx>{`
        .tool-page { max-width: 900px; margin: 0 auto; padding: 32px 24px 80px; }
        .tool-breadcrumb { font-size: 12px; color: #8a929b; margin-bottom: 16px; }
        .tool-breadcrumb a { color: #c9a24b; text-decoration: none; }
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
        .tool-desc { font-size: 14px; color: #6a7480; margin-bottom: 24px; line-height: 1.6; }
        .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 700px) { .calc-grid { grid-template-columns: 1fr; } }
        .calc-inputs { display: flex; flex-direction: column; gap: 14px; }
        .hint { font-size: 11px; color: #8a929b; margin-top: -8px; }
        .info-box { background: #ece4d5; border-radius: 10px; padding: 14px; font-size: 13px; color: #4a5561; line-height: 1.8; }
        .info-title { font-weight: 600; color: #26333f; margin-bottom: 6px; }
        .calc-result { background: #fbf8f1; border: 1px solid rgba(15,33,48,0.14); border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .result-main { text-align: center; padding-bottom: 14px; border-bottom: 1px solid rgba(15,33,48,0.14); }
        .result-label { font-size: 12px; color: #6a7480; margin-bottom: 6px; }
        .result-amount { font-size: 30px; font-weight: 700; color: #0f2130; }
        .result-sub { font-size: 12px; color: #6a7480; margin-top: 6px; }
        .badge-good { background: rgba(201,162,75,0.1); color: #c9a24b; padding: 2px 10px; border-radius: 12px; }
        .badge-warn { background: rgba(201,162,75,0.14); color: #a4562f; padding: 2px 10px; border-radius: 12px; }
        .formula-box { background: #ece4d5; border-radius: 10px; padding: 14px; }
        .formula-title { font-size: 12px; font-weight: 600; color: #4a5561; margin-bottom: 10px; }
        .formula-row { display: flex; justify-content: space-between; font-size: 12px; color: #6a7480; margin-bottom: 6px; }
        .formula-note { font-size: 12px; color: #6a7480; margin-top: 8px; border-top: 1px solid rgba(15,33,48,0.16); padding-top: 8px; }
        .divider { border-top: 1px solid rgba(15,33,48,0.14); }
        .result-section-title { font-size: 12px; font-weight: 600; color: #4a5561; }
        .ai-analysis { background: rgba(201,162,75,0.12); border: 1px solid rgba(201,162,75,0.35); border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #7a5a1f; line-height: 1.6; }
        .cta-link { font-size: 13px; color: #c9a24b; text-decoration: none; font-weight: 500; }
      `}</style>
    </>
  );
}

function Slider({ label, value, min, max, step = 1, unit, fmtVal, onChange }) {
  const display = fmtVal ? fmtVal(value) : `${value}${unit || ""}`;
  return (
    <div>
      <label style={{ fontSize: "13px", color: "#4a5561", display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        {label} <span style={{ fontWeight: 700, color: "#0f2130" }}>{display}</span>
      </label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#c9a24b" }} />
    </div>
  );
}
