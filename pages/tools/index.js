import Head from "next/head";
import Link from "next/link";

const tools = [
  {
    href: "/tools/advanced-calculator",
    icon: "🧮",
    title: "進階退休試算器",
    desc: "含通膨調整、薪資成長率、夫妻合計試算，比基本版更精確",
    badge: "最熱門",
    color: "rgba(212,169,90,.14)",
  },
  {
    href: "/tools/labor-insurance",
    icon: "🏛️",
    title: "勞保年金試算器",
    desc: "輸入投保薪資與年資，精算你的勞保老年年金月領金額",
    badge: "台灣專屬",
    color: "rgba(212,169,90,.1)",
  },
  {
    href: "/tools/fire-calculator",
    icon: "🔥",
    title: "FIRE 財務自由試算器",
    desc: "計算你需要多少資產才能提早退休，以及達成 FIRE 的時間表",
    badge: "新增",
    color: "rgba(221,143,95,.14)",
  },
  {
    href: "/tools/compound-interest",
    icon: "📈",
    title: "複利成長試算器",
    desc: "視覺化呈現你的投資組合在不同報酬率下的長期成長曲線",
    badge: null,
    color: "rgba(90,113,132,.2)",
  },
  {
    href: "/tools/etf-dividend",
    icon: "💰",
    title: "ETF 配息收入試算器",
    desc: "試算持有 0050、00878 等 ETF 每月能領到多少配息",
    badge: null,
    color: "rgba(236,199,118,.14)",
  },
  {
    href: "/tools/couple-calculator",
    icon: "💑",
    title: "夫妻退休試算器",
    desc: "雙薪家庭專用，兩人年齡收入分開設定，計算家庭退休缺口",
    badge: "雙人",
    color: "rgba(212,169,90,.12)",
  },
  {
    href: "/tools/dca-vs-lumpsum",
    icon: "⚖️",
    title: "定期定額 vs 單筆回測",
    desc: "同一筆錢，分批投入還是一次投入更好？回測比較兩種策略",
    badge: null,
    color: "rgba(44,71,99,.35)",
  },
];

export default function ToolsIndex() {
  return (
    <>
      <Head>
        <title>AI 理財計算工具 | 退休咖</title>
        <meta name="description" content="免費 AI 理財計算工具：退休試算、勞保年金、FIRE 試算、複利計算、ETF 配息試算，全方位退休規劃工具集。" />
        <link rel="canonical" href="https://www.retirementplantw.com/tools" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI 理財計算工具 | 退休咖" />
        <meta property="og:description" content="免費 AI 理財計算工具：退休試算、勞保年金、FIRE 試算、複利計算、ETF 配息試算，全方位退休規劃工具集。" />
        <meta property="og:url" content="https://www.retirementplantw.com/tools" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <svg width="30" height="32" viewBox="0 0 40 42" fill="none" aria-hidden="true" style={{ display: "block", filter: "drop-shadow(0 3px 10px rgba(212,169,90,.28))" }}>
            <path d="M20 3 L34 8.5 V22 C34 31.5 27.5 37.5 20 40 C12.5 37.5 6 31.5 6 22 V8.5 Z" fill="none" stroke="#d4a95a" strokeWidth="2" />
            <path d="M13 24 Q19 24 22 19 T29 13" fill="none" stroke="#ecc776" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="29" cy="13" r="2.7" fill="#ecc776" />
          </svg>
          退休咖
        </Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
          <Link href="/author">關於作者</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
      </nav>

      <div className="tools-page">
        <div className="tools-hero">
          <h1>AI 理財計算工具集</h1>
          <p>免費使用，即時計算，幫你從各個角度掌握退休金規劃全貌</p>
        </div>

        <div className="tools-grid">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.href} className="tool-card">
              <div className="tool-icon" style={{ background: tool.color }}>{tool.icon}</div>
              <div className="tool-content">
                <div className="tool-header">
                  <h2>{tool.title}</h2>
                  {tool.badge && <span className="tool-badge">{tool.badge}</span>}
                </div>
                <p>{tool.desc}</p>
              </div>
              <div className="tool-arrow">→</div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/about">關於我們</a>
        <a href="/author">關於作者</a>
        <a href="/contact">聯絡我們</a>
      </footer>

      <style jsx>{`
        .tools-page { max-width: 760px; margin: 0 auto; padding: 48px 24px 80px; }
        .tools-hero { text-align: center; margin-bottom: 40px; }
        .tools-hero h1 { font-size: 30px; font-weight: 900; margin-bottom: 10px; color: var(--cream); }
        .tools-hero p { font-size: 15px; color: var(--slate2); }
        .tools-grid { display: flex; flex-direction: column; gap: 14px; }
        .tool-card {
          display: flex; align-items: center; gap: 16px;
          border: 1px solid var(--line); border-radius: 16px;
          padding: 18px 20px; text-decoration: none; color: inherit;
          background: var(--panel); transition: transform .3s, border-color .3s, box-shadow .3s;
        }
        .tool-card:hover { transform: translateY(-4px); border-color: rgba(212,169,90,.5); box-shadow: 0 22px 44px -24px rgba(0,0,0,.8); }
        .tool-icon { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0; }
        .tool-content { flex: 1; }
        .tool-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .tool-content h2 { font-size: 16px; font-weight: 700; color: var(--cream); }
        .tool-badge { font-size: 10px; font-weight: 700; background: var(--gold); color: #1a1206; padding: 2px 8px; border-radius: 8px; }
        .tool-content p { font-size: 13px; color: var(--slate2); line-height: 1.5; }
        .tool-arrow { font-size: 18px; color: var(--gold); flex-shrink: 0; transition: transform .25s; }
        .tool-card:hover .tool-arrow { transform: translateX(4px); }
      `}</style>
    </>
  );
}
