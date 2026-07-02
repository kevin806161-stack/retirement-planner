import Head from "next/head";
import Link from "next/link";
import RetirementCalculator from "../components/RetirementCalculator";
import BookList from "../components/BookList";
import AdUnit from "../components/AdUnit";
import { adsenseConfig } from "../lib/affiliateLinks";
import { getAllArticles } from "../lib/articles";

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>退休 AI 規劃師 | 免費退休金與資產配置試算</title>
      </Head>

      <nav className="nav">
        <div className="nav-logo">退休 AI 規劃師</div>
        <div className="nav-links">
          <a href="#calc">試算工具</a>
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <a href="#books">書單推薦</a>
          <a href="#calc">免費試算</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">AI 驅動 · 免費使用</div>
        <h1>打造你的退休財務藍圖<br />從今天開始</h1>
        <p className="hero-sub">
          輸入你的現況，AI 幫你分析退休缺口、資產配置比例，以及每月需要存多少錢
        </p>
      </section>

      <div id="calc">
        <RetirementCalculator />
      </div>

      {/* 計算結果下方廣告版位 */}
      <div style={{ padding: "20px 28px", background: "#f4efe4" }}>
        <AdUnit slot={adsenseConfig.slots.belowCalculator} />
      </div>

      <section style={{ padding: "8px 28px 56px", background: "#f4efe4" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 900, color: "#0f2130", margin: 0 }}>
              更多 AI 理財計算工具
            </h2>
            <Link href="/tools" style={{ fontSize: "14px", color: "#c9a24b", textDecoration: "none" }}>查看所有工具 →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {homeTools.map((tool) => (
              <Link
                href={tool.href}
                key={tool.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  padding: "22px 20px",
                  background: "#fbf8f1",
                  border: "1px solid rgba(15,33,48,0.14)",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "4px", background: "#0f2130", color: "#c9a24b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Serif TC', serif", fontWeight: 700, fontSize: "16px" }}>
                  {tool.title.slice(0, 1)}
                </div>
                <div>
                  <div style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "15px", fontWeight: 700, color: "#0f2130", marginBottom: "6px" }}>{tool.title}</div>
                  <div style={{ fontFamily: "'Noto Serif TC', serif", fontSize: "13px", color: "#6a7480", lineHeight: 1.6 }}>{tool.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 28px", background: "#0f2130" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: "clamp(22px, 4vw, 28px)",
              fontWeight: 900,
              color: "#f2ecdf",
              marginBottom: "28px",
            }}
          >
            最新理財知識文章
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)" }}>
            {articles.slice(0, 3).map((article) => (
              <Link
                href={`/articles/${article.slug}`}
                key={article.slug}
                style={{
                  display: "block",
                  background: "#0f2130",
                  padding: "22px 24px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f2ecdf", marginBottom: "6px" }}>
                  {article.title}
                </div>
                <div style={{ fontFamily: "'Noto Serif TC', serif", fontSize: "13.5px", color: "#9fb0c0", lineHeight: 1.7 }}>{article.description}</div>
              </Link>
            ))}
          </div>
          <Link
            href="/articles"
            style={{ display: "inline-block", marginTop: "22px", fontSize: "14px", color: "#c9a24b", textDecoration: "none" }}
          >
            查看所有文章 →
          </Link>
        </div>
      </section>

      <div id="books">
        <BookList />
      </div>

      {/* 文章內廣告版位（之後文章頁也可重複使用） */}
      <div style={{ padding: "20px 28px", background: "#ece4d5" }}>
        <AdUnit slot={adsenseConfig.slots.inArticle} />
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/about">關於我們</a>
        <a href="/contact">聯絡我們</a>
      </footer>
    </>
  );
}

const homeTools = [
  { href: "/tools/advanced-calculator", title: "進階退休試算器", desc: "含通膨調整、薪資成長率、夫妻合計試算" },
  { href: "/tools/fire-calculator", title: "FIRE 財務自由試算器", desc: "計算多少資產能提早退休，以及達成時間表" },
  { href: "/tools/labor-insurance", title: "勞保年金試算器", desc: "精算勞保老年年金月領金額" },
  { href: "/tools/etf-dividend", title: "ETF 配息收入試算器", desc: "試算 0050、00878 等 ETF 每月配息" },
];

export async function getStaticProps() {
  const articles = getAllArticles();
  return {
    props: { articles },
  };
}
