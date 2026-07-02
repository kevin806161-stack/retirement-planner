import Head from "next/head";
import Link from "next/link";

const tools = [
  {
    href: "/tools/advanced-calculator",
    icon: "🧮",
    title: "進階退休試算器",
    desc: "含通膨調整、薪資成長率、夫妻合計試算，比基本版更精確",
    badge: "最熱門",
    color: "#e6f1fb",
  },
  {
    href: "/tools/labor-insurance",
    icon: "🏛️",
    title: "勞保年金試算器",
    desc: "輸入投保薪資與年資，精算你的勞保老年年金月領金額",
    badge: "台灣專屬",
    color: "#e6f9ed",
  },
  {
    href: "/tools/fire-calculator",
    icon: "🔥",
    title: "FIRE 財務自由試算器",
    desc: "計算你需要多少資產才能提早退休，以及達成 FIRE 的時間表",
    badge: "新增",
    color: "#fff4e5",
  },
  {
    href: "/tools/compound-interest",
    icon: "📈",
    title: "複利成長試算器",
    desc: "視覺化呈現你的投資組合在不同報酬率下的長期成長曲線",
    badge: null,
    color: "#f0e6fb",
  },
  {
    href: "/tools/etf-dividend",
    icon: "💰",
    title: "ETF 配息收入試算器",
    desc: "試算持有 0050、00878 等 ETF 每月能領到多少配息",
    badge: null,
    color: "#ffeaea",
  },
];

export default function ToolsIndex() {
  return (
    <>
      <Head>
        <title>AI 理財計算工具 | 退休 AI 規劃師</title>
        <meta name="description" content="免費 AI 理財計算工具：退休試算、勞保年金、FIRE 試算、複利計算、ETF 配息試算，全方位退休規劃工具集。" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休 AI 規劃師</Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
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
        <a href="/contact">聯絡我們</a>
      </footer>

      <style jsx>{`
        .tools-page { max-width: 760px; margin: 0 auto; padding: 48px 24px 80px; }
        .tools-hero { text-align: center; margin-bottom: 40px; }
        .tools-hero h1 { font-size: 28px; font-weight: 700; margin-bottom: 10px; }
        .tools-hero p { font-size: 15px; color: #666; }
        .tools-grid { display: flex; flex-direction: column; gap: 14px; }
        .tool-card {
          display: flex; align-items: center; gap: 16px;
          border: 1px solid #e5e5e0; border-radius: 14px;
          padding: 18px 20px; text-decoration: none; color: inherit;
          background: #fff; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .tool-card:hover { border-color: #1d6fd8; box-shadow: 0 2px 12px rgba(29,111,216,0.08); }
        .tool-icon { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0; }
        .tool-content { flex: 1; }
        .tool-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .tool-content h2 { font-size: 16px; font-weight: 600; }
        .tool-badge { font-size: 10px; background: #1d6fd8; color: #fff; padding: 2px 8px; border-radius: 10px; }
        .tool-content p { font-size: 13px; color: #666; line-height: 1.5; }
        .tool-arrow { font-size: 18px; color: #aaa; flex-shrink: 0; }
      `}</style>
    </>
  );
}
