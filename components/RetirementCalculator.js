import ParameterSlider from "./ParameterSlider";
import EstimateRow from "./EstimateRow";
import { useState, useEffect, useRef } from "react";
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

  // 計算結果淡入；保留原始即時計算與減少動畫偏好
  const amountRef = useRef(null);
  useEffect(() => {
    const el = amountRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.remove("result-refresh");
    void el.offsetWidth;
    el.classList.add("result-refresh");
  }, [monthlyOut]);

  const [emailInput, setEmailInput] = useState("");
  const [sendStatus, setSendStatus] = useState(null);

  async function handleSendEmail() {
    if (!emailInput) return;
    setSendStatus("sending");
    try {
      const res = await fetch("/api/send-calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          result: { age, retire, income, saved, rate, totalTarget, savedGrow, gap, monthlySave, monthlyOut, allocation },
        }),
      });
      setSendStatus(res.ok ? "success" : "error");
    } catch {
      setSendStatus("error");
    }
  }

  return (
    <section className="calc-section">
      <h2>退休金 AI 試算器</h2>
      <p className="calc-desc">調整滑桿，即時看到你的退休缺口與建議配置</p>

      <div className="calc-grid">
        <div className="calc-inputs">
          <div className="calculator-panel-heading"><span>試算參數</span><span>即時調整</span></div>
          <ParameterSlider id="retirement-age" label="目前年齡" value={age} min={20} max={60} step={1} fmtVal={v => `${v} 歲`} onChange={setAge} />
          <ParameterSlider id="retirement-target-age" label="預計退休年齡" value={retire} min={50} max={75} step={1} fmtVal={v => `${v} 歲`} onChange={setRetire} />
          <ParameterSlider id="retirement-income" label="目前月收入" value={income} min={30000} max={200000} step={5000} fmtVal={v => `NT$ ${v.toLocaleString("zh-TW")}`} onChange={setIncome} />
          <ParameterSlider id="retirement-saved" label="目前已存退休金" value={saved} min={0} max={5000000} step={100000} fmtVal={v => `NT$ ${(v / 10000).toFixed(0)} 萬`} onChange={setSaved} />
          <ParameterSlider id="retirement-rate" label="預期投資年報酬率" value={rate} min={2} max={12} step={0.5} fmtVal={v => `${v} %`} onChange={setRate} />
        </div>

        <div className="calc-result">
          <div className="calculator-panel-heading"><span>估算摘要</span><span className="calculator-live-status">即時試算</span></div>
          <div className="result-main">
            <div className="label">退休後每月可用金額（估算）</div>
            <div className="amount" ref={amountRef}>{fmt(monthlyOut)}</div>
            <div className="sub">退休後預估可活 <strong>{lifeAfter}</strong> 年</div>
          </div>

          <EstimateRow label="退休目標總額" value={fmt(totalTarget)} />
          <EstimateRow label="現有資產成長後" value={fmt(savedGrow)} />
          <EstimateRow label="退休缺口" value={gap > 0 ? fmt(gap) : "無缺口 ✓"} warn={gap > 0} good={gap === 0} />
          <EstimateRow label="每月需額外儲蓄" value={gap > 0 ? fmt(monthlySave) : "目標已達成"} highlight />

          <div className="mini-chart">
            <div className="mini-chart-label">建議退休資產配置</div>
            <BarRow label="台股ETF" pct={allocation.stockPct} cls="self" />
            <BarRow label="債券/現金" pct={allocation.bondPct} cls="labor" />
            <BarRow label="美股ETF" pct={allocation.usPct} cls="invest" />
          </div>

          <div className="ai-tip">{tip}</div>

          {/* Email 試算結果 */}
          <div className="email-result">
            <div className="email-result-label">📩 把試算結果寄到我的信箱</div>
            {sendStatus === "success" ? (
              <div className="email-success">✅ 已寄出！請查收信箱</div>
            ) : (
              <div className="email-row">
                <input
                  type="email"
                  aria-label="接收試算結果的 Email"
                  placeholder="輸入你的 Email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendEmail()}
                />
                <button onClick={handleSendEmail} disabled={sendStatus === "sending"}>
                  {sendStatus === "sending" ? "寄送中..." : "寄送"}
                </button>
              </div>
            )}
            {sendStatus === "error" && <div className="email-error">寄送失敗，請稍後再試</div>}
          </div>
        </div>
      </div>

      <style jsx>{`
        .email-result {
          margin-top: 4px;
          border-top: 1px solid rgba(255,255,255,.07);
          padding-top: 14px;
        }
        .email-result-label {
          font-size: 12px;
          color: var(--slate);
          margin-bottom: 8px;
          font-weight: 500;
        }
        .email-row {
          display: flex;
          gap: 8px;
        }
        .email-row input {
          flex: 1;
          border: 1px solid rgba(212,169,90,.3);
          border-radius: 10px;
          padding: 9px 12px;
          font-size: 13px;
          outline: none;
          background: var(--bg);
          color: var(--cream);
        }
        .email-row input:focus { border-color: var(--gold); }
        .email-row button {
          background: linear-gradient(180deg, var(--gold2), var(--gold));
          color: #1a1206;
          border: none;
          border-radius: 10px;
          padding: 9px 18px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }
        .email-row button:disabled { opacity: 0.6; }
        .email-success { font-size: 13px; color: var(--green); }
        .email-error { font-size: 12px; color: var(--terra); margin-top: 4px; }
      `}</style>
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
