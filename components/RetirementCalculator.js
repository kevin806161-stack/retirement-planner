import { useRetirementCalc } from "../lib/useRetirementCalc";

function fmt(n) {
  return "NT$ " + Math.round(n).toLocaleString("zh-TW");
}

export default function RetirementCalculator() {
  const {
    age, setAge,
    retire, setRetire,
    income, setIncome,
    saved, setSaved,
    rate, setRate,
    result,
  } = useRetirementCalc();

  const { totalTarget, savedGrow, gap, monthlySave, monthlyOut, lifeAfter, allocation, tip } = result;

  return (
    <section className="calc-section">
      <h2>退休金 AI 試算器</h2>
      <p className="calc-desc">調整滑桿，即時看到你的退休缺口與建議配置</p>

      <div className="calc-grid">
        <div className="calc-inputs">
          <div className="input-group">
            <label>目前年齡 <span>{age} 歲</span></label>
            <input type="range" min={20} max={60} step={1} value={age} onChange={(e) => setAge(+e.target.value)} />
          </div>
          <div className="input-group">
            <label>預計退休年齡 <span>{retire} 歲</span></label>
            <input type="range" min={50} max={75} step={1} value={retire} onChange={(e) => setRetire(+e.target.value)} />
          </div>
          <div className="input-group">
            <label>目前月收入 <span>NT$ {income.toLocaleString("zh-TW")}</span></label>
            <input type="range" min={30000} max={200000} step={5000} value={income} onChange={(e) => setIncome(+e.target.value)} />
          </div>
          <div className="input-group">
            <label>目前已存退休金 <span>NT$ {(saved / 10000).toFixed(0)} 萬</span></label>
            <input type="range" min={0} max={5000000} step={100000} value={saved} onChange={(e) => setSaved(+e.target.value)} />
          </div>
          <div className="input-group">
            <label>預期投資年報酬率 <span>{rate} %</span></label>
            <input type="range" min={2} max={12} step={0.5} value={rate} onChange={(e) => setRate(+e.target.value)} />
          </div>
        </div>

        <div className="calc-result">
          <div className="result-main">
            <div className="label">退休後每月可用金額（估算）</div>
            <div className="amount">{fmt(monthlyOut)}</div>
            <div className="sub">退休後預估可活 <strong>{lifeAfter}</strong> 年</div>
          </div>

          <div className="result-row"><span>退休目標總額</span><span>{fmt(totalTarget)}</span></div>
          <div className="result-row"><span>現有資產成長後</span><span>{fmt(savedGrow)}</span></div>
          <div className="result-row"><span>退休缺口</span><span className={gap > 0 ? "warn" : "good"}>{gap > 0 ? fmt(gap) : "無缺口 ✓"}</span></div>
          <div className="result-row"><span>每月需額外儲蓄</span><span className="good">{gap > 0 ? fmt(monthlySave) : "目標已達成"}</span></div>

          <div className="mini-chart">
            <div className="mini-chart-label">建議退休資產配置</div>
            <BarRow label="台股ETF" pct={allocation.stockPct} cls="self" />
            <BarRow label="債券/現金" pct={allocation.bondPct} cls="labor" />
            <BarRow label="美股ETF" pct={allocation.usPct} cls="invest" />
          </div>

          <div className="ai-tip">{tip}</div>
        </div>
      </div>
    </section>
  );
}

function BarRow({ label, pct, cls }) {
  return (
    <div className="bar-row">
      <div className="bar-label">{label}</div>
      <div className="bar-track">
        <div className={`bar-fill ${cls}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="bar-val">{pct}%</div>
    </div>
  );
}
