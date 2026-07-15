import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";

function fmt(n) { return "NT$ " + Math.round(n).toLocaleString("zh-TW"); }

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(30);

  const { yearlyData, finalValue, totalInvested, totalGain } = useMemo(() => {
    const r = rate / 100 / 12;
    const yearlyData = [];
    let portfolio = principal;
    const totalMonths = years * 12;

    for (let y = 1; y <= years; y++) {
      const months = y * 12;
      // FV = PV*(1+r)^n + PMT*((1+r)^n-1)/r
      const pv = principal * Math.pow(1 + r, months);
      const pmt = monthly * (Math.pow(1 + r, months) - 1) / r;
      const total = pv + pmt;
      const invested = principal + monthly * months;
      yearlyData.push({ year: y, total, invested, gain: total - invested });
    }

    const last = yearlyData[yearlyData.length - 1];
    return {
      yearlyData,
      finalValue: last?.total || 0,
      totalInvested: last?.invested || 0,
      totalGain: last?.gain || 0,
    };
  }, [principal, monthly, rate, years]);

  const maxValue = Math.max(...yearlyData.map((d) => d.total));

  return (
    <>
      <Head>
        <title>複利成長試算器 | 退休咖</title>
        <meta name="description" content="視覺化呈現定期定額投資在不同報酬率下的長期複利成長效果，了解時間與報酬率如何影響最終資產。" />
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
        <div className="tool-breadcrumb"><Link href="/tools">所有工具</Link> / 複利成長試算器</div>
        <h1>📈 複利成長試算器</h1>
        <p className="tool-desc">視覺化呈現你的投資組合在不同報酬率下的長期成長曲線，了解時間與複利的驚人威力</p>

        <div className="layout">
          <div className="inputs-panel">
            <Slider label="初始投入金額" value={principal} min={0} max={5000000} step={50000} fmtVal={(v) => `NT$ ${(v / 10000).toFixed(0)} 萬`} onChange={setPrincipal} />
            <Slider label="每月定期定額" value={monthly} min={1000} max={100000} step={1000} fmtVal={(v) => `NT$ ${v.toLocaleString("zh-TW")}`} onChange={setMonthly} />
            <Slider label="預期年報酬率" value={rate} min={1} max={15} step={0.5} unit="%" onChange={setRate} />
            <Slider label="投資年數" value={years} min={5} max={40} unit="年" onChange={setYears} />

            <div className="summary-cards">
              <SummaryCard label="最終資產" value={fmt(finalValue)} color="#ecc776" />
              <SummaryCard label="總投入金額" value={fmt(totalInvested)} color="#a2b4c6" />
              <SummaryCard label="投資獲利" value={fmt(totalGain)} color="#2a7d2a" />
              <SummaryCard label="報酬倍數" value={`${(finalValue / totalInvested).toFixed(1)} 倍`} color="#8a4fd8" />
            </div>
          </div>

          <div className="chart-panel">
            <div className="chart-title">資產成長曲線（{years} 年）</div>
            <div className="bar-chart">
              {yearlyData
                .filter((_, i) => years <= 20 ? true : i % 2 === 0 || i === yearlyData.length - 1)
                .map((d) => {
                  const totalPct = (d.total / maxValue) * 100;
                  const investedPct = (d.invested / maxValue) * 100;
                  return (
                    <div key={d.year} className="bar-col">
                      <div className="bar-wrap">
                        <div className="bar-total" style={{ height: `${totalPct}%` }}>
                          <div className="bar-invested" style={{ height: `${(investedPct / totalPct) * 100}%` }} />
                        </div>
                      </div>
                      <div className="bar-label">{d.year}年</div>
                    </div>
                  );
                })}
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot" style={{ background: "#ecc776" }} />總資產</span>
              <span className="legend-item"><span className="dot" style={{ background: "rgba(212,169,90,.16)" }} />投入本金</span>
              <span className="legend-item"><span className="dot" style={{ background: "#2a7d2a" }} />複利獲利</span>
            </div>

            <div className="milestones">
              <div className="milestones-title">關鍵里程碑</div>
              {[500, 1000, 2000, 3000].map((target) => {
                const d = yearlyData.find((y) => y.total >= target * 10000);
                if (!d) return null;
                return (
                  <div key={target} className="milestone-row">
                    <span>資產達 <strong>{target} 萬</strong></span>
                    <span className="milestone-val">第 {d.year} 年（{d.year + (new Date().getFullYear()) - (new Date().getFullYear())} 年後）</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="tool-guide">
          <h2>怎麼使用這個工具</h2>
          <p>
            初始投入金額填 0 也沒關係，如果你是從零開始只靠每月定期定額累積，重點觀察每月定期定額和投資年數這兩個滑桿，它們對最終資產的影響通常比報酬率假設更直接、也更容易由你自己掌控——報酬率是市場給的，但每月投入多少、投資多少年，是你能決定的部分。建議先用保守的報酬率（5-6%）跑一次基準情境，了解實際可行的存款計畫。
          </p>
          <p>
            右側的長條圖用顏色區分「投入本金」與「複利獲利」兩個部分，隨著年數拉長，你會清楚看到獲利佔比逐漸超過本金佔比，這就是複利效果隨時間加速的具體樣貌。
          </p>

          <h2>這個工具的計算邏輯</h2>
          <p>
            複利成長的計算包含兩個部分：初始本金以複利公式（本金 × (1+報酬率)^年數）成長，加上每月定期定額投入以年金終值公式累加。工具會逐年計算這兩部分加總後的資產總額，並同步記錄「累積投入的本金」，兩者的差距就是複利創造的獲利部分。這也是為什麼圖表要把本金和獲利分開標示——同樣是「資產成長」，理解這筆錢有多少是你自己存的、多少是市場幫你賺的，能幫助你更準確評估投資策略是否有效。
          </p>
          <p>
            如果想知道複利效果具體能幫你完成多少退休金目標，可以搭配
            {" "}<Link href="/tools/advanced-calculator">進階退休試算器</Link>{" "}
            對照，看目前的存款速度離目標還有多少距離。
          </p>
        </div>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/author">關於作者</a>
      </footer>

      <style jsx>{`
        .tool-page { max-width: 980px; margin: 0 auto; padding: 32px 24px 80px; }
        .tool-breadcrumb { font-size: 12px; color: #6b7d90; margin-bottom: 16px; }
        .tool-breadcrumb a { color: #ecc776; text-decoration: none; }
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
        .tool-desc { font-size: 14px; color: #a2b4c6; margin-bottom: 24px; line-height: 1.6; }
        .layout { display: grid; grid-template-columns: 320px 1fr; gap: 28px; align-items: start; }
        @media (max-width: 768px) { .layout { grid-template-columns: 1fr; } }
        .inputs-panel { display: flex; flex-direction: column; gap: 14px; }
        .summary-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px; }
        .chart-panel { background: #10202f; border: 1px solid rgba(212,169,90,.16); border-radius: 14px; padding: 20px; }
        .chart-title { font-size: 14px; font-weight: 600; color: #f3ecdd; margin-bottom: 16px; }
        .bar-chart { display: flex; align-items: flex-end; gap: 4px; height: 200px; padding-bottom: 24px; position: relative; border-bottom: 1px solid rgba(212,169,90,.16); }
        .bar-col { display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; }
        .bar-wrap { flex: 1; display: flex; align-items: flex-end; width: 100%; }
        .bar-total { background: #ecc776; width: 100%; border-radius: 3px 3px 0 0; min-height: 2px; position: relative; display: flex; align-items: flex-end; }
        .bar-invested { background: rgba(255,255,255,0.14); width: 100%; border-radius: 0 0 3px 3px; }
        .bar-label { font-size: 9px; color: #6b7d90; margin-top: 4px; }
        .chart-legend { display: flex; gap: 16px; margin-top: 12px; flex-wrap: wrap; }
        .legend-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #a2b4c6; }
        .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .milestones { margin-top: 20px; border-top: 1px solid rgba(212,169,90,.16); padding-top: 16px; }
        .milestones-title { font-size: 13px; font-weight: 600; color: #f3ecdd; margin-bottom: 10px; }
        .milestone-row { display: flex; justify-content: space-between; font-size: 13px; color: #a2b4c6; margin-bottom: 6px; }
        .milestone-val { color: #ecc776; font-weight: 500; }
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

function SummaryCard({ label, value, color }) {
  return (
    <div style={{ background: "#10202f", border: "1px solid rgba(212,169,90,.16)", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
      <div style={{ fontSize: "11px", color: "#8394a6", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "15px", fontWeight: 700, color }}>{value}</div>
    </div>
  );
}
