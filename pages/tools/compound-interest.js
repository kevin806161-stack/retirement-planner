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
        <title>複利成長試算器 | 退休 AI 規劃師</title>
        <meta name="description" content="視覺化呈現定期定額投資在不同報酬率下的長期複利成長效果，了解時間與報酬率如何影響最終資產。" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休 AI 規劃師</Link>
        <div className="nav-links">
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
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
              <SummaryCard label="最終資產" value={fmt(finalValue)} color="#0f2130" />
              <SummaryCard label="總投入金額" value={fmt(totalInvested)} color="#4a5561" />
              <SummaryCard label="投資獲利" value={fmt(totalGain)} color="#c9a24b" />
              <SummaryCard label="報酬倍數" value={`${(finalValue / totalInvested).toFixed(1)} 倍`} color="#5a7184" />
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
              <span className="legend-item"><span className="dot" style={{ background: "#0f2130" }} />總資產</span>
              <span className="legend-item"><span className="dot" style={{ background: "#c7bfae" }} />投入本金</span>
              <span className="legend-item"><span className="dot" style={{ background: "#c9a24b" }} />複利獲利</span>
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
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
      </footer>

      <style jsx>{`
        .tool-page { max-width: 980px; margin: 0 auto; padding: 32px 24px 80px; }
        .tool-breadcrumb { font-size: 12px; color: #8a929b; margin-bottom: 16px; }
        .tool-breadcrumb a { color: #c9a24b; text-decoration: none; }
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
        .tool-desc { font-size: 14px; color: #6a7480; margin-bottom: 24px; line-height: 1.6; }
        .layout { display: grid; grid-template-columns: 320px 1fr; gap: 28px; align-items: start; }
        @media (max-width: 768px) { .layout { grid-template-columns: 1fr; } }
        .inputs-panel { display: flex; flex-direction: column; gap: 14px; }
        .summary-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px; }
        .chart-panel { background: #fbf8f1; border: 1px solid rgba(15,33,48,0.14); border-radius: 14px; padding: 20px; }
        .chart-title { font-size: 14px; font-weight: 600; color: #26333f; margin-bottom: 16px; }
        .bar-chart { display: flex; align-items: flex-end; gap: 4px; height: 200px; padding-bottom: 24px; position: relative; border-bottom: 1px solid rgba(15,33,48,0.14); }
        .bar-col { display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; }
        .bar-wrap { flex: 1; display: flex; align-items: flex-end; width: 100%; }
        .bar-total { background: #0f2130; width: 100%; border-radius: 3px 3px 0 0; min-height: 2px; position: relative; display: flex; align-items: flex-end; }
        .bar-invested { background: rgba(0,0,0,0.15); width: 100%; border-radius: 0 0 3px 3px; }
        .bar-label { font-size: 9px; color: #8a929b; margin-top: 4px; }
        .chart-legend { display: flex; gap: 16px; margin-top: 12px; flex-wrap: wrap; }
        .legend-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #6a7480; }
        .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .milestones { margin-top: 20px; border-top: 1px solid rgba(15,33,48,0.14); padding-top: 16px; }
        .milestones-title { font-size: 13px; font-weight: 600; color: #26333f; margin-bottom: 10px; }
        .milestone-row { display: flex; justify-content: space-between; font-size: 13px; color: #4a5561; margin-bottom: 6px; }
        .milestone-val { color: #c9a24b; font-weight: 500; }
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

function SummaryCard({ label, value, color }) {
  return (
    <div style={{ background: "#fbf8f1", border: "1px solid rgba(15,33,48,0.14)", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
      <div style={{ fontSize: "11px", color: "#6a7480", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "15px", fontWeight: 700, color }}>{value}</div>
    </div>
  );
}
