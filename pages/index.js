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
          <Link href="/articles">理財知識</Link>
          <a href="#books">書單推薦</a>
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
      <div style={{ padding: "20px 28px" }}>
        <AdUnit slot={adsenseConfig.slots.belowCalculator} />
      </div>

      <section style={{ padding: "36px 28px", background: "#fff", borderTop: "1px solid #e5e5e0" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>最新理財知識文章</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {articles.slice(0, 3).map((article) => (
            <Link
              href={`/articles/${article.slug}`}
              key={article.slug}
              style={{
                display: "block",
                border: "1px solid #e5e5e0",
                borderRadius: "10px",
                padding: "14px 16px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                {article.title}
              </div>
              <div style={{ fontSize: "12px", color: "#888" }}>{article.description}</div>
            </Link>
          ))}
        </div>
        <Link
          href="/articles"
          style={{ display: "inline-block", marginTop: "16px", fontSize: "13px", color: "#1d6fd8" }}
        >
          查看所有文章 →
        </Link>
      </section>

      <div id="books">
        <BookList />
      </div>

      {/* 文章內廣告版位（之後文章頁也可重複使用） */}
      <div style={{ padding: "20px 28px" }}>
        <AdUnit slot={adsenseConfig.slots.inArticle} />
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  const articles = getAllArticles();
  return {
    props: { articles },
  };
}
