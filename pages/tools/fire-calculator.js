import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";

function fmt(n) { return "NT$ " + Math.round(n).toLocaleString("zh-TW"); }

export default function FireCalculator() {
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(80000);
  const [expense, setExpense] = useState(40000);
  const [saved, setSaved] = useState(500000);
  const [rate, setRate] = useState(6);
  const [withdrawalRate, setWithdrawalRate] = useState(4);

  const result = useMemo(() => {
    const r = rate / 100;
    const wr = withdrawalRate / 100;
    const annualExpense = expense * 12;
    const annualSaving = (income - expense) * 12;
    const savingRate = (income - expense) / income * 100;

    // FIRE 目標金額
    const fireTarget = annualExpense / wr;

    // 每月投資（月存款）
    const monthlyInvest = income - expense;

    // 計算幾年後達到 FIRE
    // FV = PV*(1+r)^n + PMT*((1+r)^n-1)/r = fireTarget
    // 用迭代法計算
    let yearsToFire = 0;
    let portfolio = saved;
    const monthlyRate = r / 12;
    for (let i = 0; i < 600; i++) {
      portfolio = portfolio * (1 + monthlyRate) + monthlyInvest;
      if (portfolio >= fireTarget) {
        yearsToFire = (i + 1) / 12;
        break;
      }
    }

    const fireAge = age + yearsToFire;

    // 桶狀策略建議
    const bucket1 = expense * 12 * 2; // 2年現金
    const bucket2 = expense * 12 * 8; // 8年債券
    const bucket3 = fireTarget - bucket1 - bucket2; // 其餘股票

    return {
      fireTarget, annualSaving, savingRate, yearsToFire, fireAge,
      monthlyInvest, bucket1, bucket2, bucket3,
    };
  }, [age, income, expense, saved, rate, withdrawalRate]);

  const getFireType = () => {
    const monthly = expense;
    if (monthly < 25000) return { type: "Lean FIRE", desc: "極簡生活，最快達成財務自由", color: "#e6f9ed" };
    if (monthly < 50000) return { type: "Regular FIRE", desc: "一般舒適生活水準", color: "#e6f1fb" };
    if (monthly < 80000) return { type: "Fat FIRE", desc: "高品質生活，需要更多資產", color: "#fff4e5" };
    return { type: "Ultra Fat FIRE", desc: "奢華生活，資產需求極高", color: "#ffeaea" };
  };

  const fireType = getFireType();

  return (
    <>
      <Head>
        <title>FIRE 財務自由試算器 | 退休咖</title>
        <meta name="description" content="計算你需要多少資產才能實現 FIRE 財務自由，以及根據目前的儲蓄率，幾年後能夠達成。" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休咖</Link>
        <div className="nav-links">
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
        </div>
      </nav>

      <div className="tool-page">
        <div className="tool-breadcrumb"><Link href="/tools">所有工具</Link> / FIRE 財務自由試算器</div>
        <h1>🔥 FIRE 財務自由試算器</h1>
        <p className="tool-desc">計算你的 FIRE 目標金額，以及以目前的儲蓄率和投資報酬率，幾年後能夠提早退休</p>

        <div className="calc-grid">
          <div className="calc-inputs">
            <Slider label="目前年齡" value={age} min={20} max={55} unit="歲" onChange={setAge} />
            <Slider label="月收入" value={income} min={30000} max={300000} step={5000} fmtVal={(v) => `NT$ ${v.toLocaleString("zh-TW")}`} onChange={setIncome} />
            <Slider label="月支出（FIRE 後生活費）" value={expense} min={15000} max={150000} step={5000} fmtVal={(v) => `NT$ ${v.toLocaleString("zh-TW")}`} onChange={setExpense} />
            <Slider label="目前已存資產" value={saved} min={0} max={10000000} step={100000} fmtVal={(v) => `NT$ ${(v / 10000).toFixed(0)} 萬`} onChange={setSaved} />
            <Slider label="預期投資年報酬率" value={rate} min={2} max={12} step={0.5} unit="%" onChange={setRate} />
            <Slider label="提領率（保守建議 3.5-4%）" value={withdrawalRate} min={3} max={5} step={0.5} unit="%" onChange={setWithdrawalRate} />
          </div>

          <div className="calc-result">
            {/* FIRE 類型 */}
            <div className="fire-type" style={{ background: fireType.color }}>
              <div className="fire-type-label">你的 FIRE 類型</div>
              <div className="fire-type-name">{fireType.type}</div>
              <div className="fire-type-desc">{fireType.desc}</div>
            </div>

            <div className="result-main">
              <div className="result-label">FIRE 目標資產</div>
              <div className="result-amount">{fmt(result.fireTarget)}</div>
              <div className="result-sub">月支出 {fmt(expense)} ÷ {withdrawalRate}% 提領率</div>
            </div>

            <ResultRow label="月儲蓄金額" value={fmt(result.monthlyInvest)} />
            <ResultRow label="儲蓄率" value={`${Math.round(result.savingRate)}%`} highlight />
            <ResultRow
              label="達成 FIRE 所需時間"
              value={result.yearsToFire > 0 && result.yearsToFire < 50 ? `約 ${result.yearsToFire.toFixed(1)} 年` : "儲蓄率不足，需調整"}
              warn={result.yearsToFire >= 50 || result.yearsToFire === 0}
              good={result.yearsToFire > 0 && result.yearsToFire < 50}
            />
            <ResultRow
              label="預計 FIRE 年齡"
              value={result.fireAge < 100 ? `${result.fireAge.toFixed(0)} 歲` : "—"}
              good={result.fireAge < 55}
            />

            <div className="bucket-box">
              <div className="bucket-title">🪣 桶狀策略建議配置</div>
              <BucketRow color="#2a7d2a" label="第一桶（2年現金）" value={fmt(result.bucket1)} desc="定存、活存" />
              <BucketRow color="#1d6fd8" label="第二桶（8年債券）" value={fmt(result.bucket2)} desc="債券 ETF、高股息" />
              <BucketRow color="#8a4fd8" label="第三桶（長期股票）" value={fmt(Math.max(0, result.bucket3))} desc="台美股 ETF" />
            </div>

            <div className="ai-analysis">
              {result.savingRate < 20
                ? `⚠️ 目前儲蓄率 ${Math.round(result.savingRate)}% 較低，建議提升到 30% 以上才能有效累積資產。降低月支出或增加收入，都能加速 FIRE 進程。`
                : result.savingRate >= 50
                ? `🚀 儲蓄率高達 ${Math.round(result.savingRate)}%，是達成 FIRE 的強力基礎！繼續維持，預計 ${result.yearsToFire.toFixed(0)} 年後可達財務自由。`
                : `💪 儲蓄率 ${Math.round(result.savingRate)}%，符合 FIRE 族群的目標範圍（30-50%）。預計約 ${result.yearsToFire.toFixed(0)} 年後達成財務自由。`}
            </div>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
      </footer>

      <style jsx>{`
        .tool-page { max-width: 900px; margin: 0 auto; padding: 32px 24px 80px; }
        .tool-breadcrumb { font-size: 12px; color: #999; margin-bottom: 16px; }
        .tool-breadcrumb a { color: #1d6fd8; text-decoration: none; }
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
        .tool-desc { font-size: 14px; color: #666; margin-bottom: 24px; line-height: 1.6; }
        .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 700px) { .calc-grid { grid-template-columns: 1fr; } }
        .calc-inputs { display: flex; flex-direction: column; gap: 14px; }
        .calc-result { background: #fafaf8; border: 1px solid #e5e5e0; border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .fire-type { border-radius: 10px; padding: 14px; text-align: center; }
        .fire-type-label { font-size: 11px; color: #666; margin-bottom: 4px; }
        .fire-type-name { font-size: 18px; font-weight: 700; color: #1a1a1a; }
        .fire-type-desc { font-size: 12px; color: #666; margin-top: 4px; }
        .result-main { text-align: center; padding-bottom: 14px; border-bottom: 1px solid #e5e5e0; }
        .result-label { font-size: 12px; color: #888; margin-bottom: 6px; }
        .result-amount { font-size: 28px; font-weight: 700; color: #1d6fd8; }
        .result-sub { font-size: 12px; color: #999; margin-top: 4px; }
        .bucket-box { background: #f5f5f3; border-radius: 10px; padding: 14px; }
        .bucket-title { font-size: 13px; font-weight: 600; color: #333; margin-bottom: 12px; }
        .ai-analysis { background: #e6f1fb; border: 1px solid #b5d4f4; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #1a4a7a; line-height: 1.6; }
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

function BucketRow({ color, label, value, desc }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, flexShrink: 0 }} />
      <div style={{ flex: 1, fontSize: "12px", color: "#555" }}>{label}<span style={{ color: "#999", marginLeft: "6px" }}>{desc}</span></div>
      <div style={{ fontSize: "12px", fontWeight: 600, color }}>{value}</div>
    </div>
  );
}
