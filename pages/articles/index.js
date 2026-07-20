import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getAllArticles } from "../../lib/articles";
import AdUnit from "../../components/AdUnit";
import EmailSubscribe from "../../components/EmailSubscribe";
import { adsenseConfig } from "../../lib/affiliateLinks";

export default function ArticlesIndex({ articles }) {
  const [activeCategory, setActiveCategory] = useState("全部");

  const categories = ["全部", ...Array.from(new Set(articles.map((a) => a.category)))];
  const filtered = activeCategory === "全部" ? articles : articles.filter((a) => a.category === activeCategory);

  return (
    <>
      <Head>
        <title>理財知識文章 | 退休咖</title>
        <meta name="description" content="退休金規劃、資產配置相關知識文章，幫助你建立正確的退休理財觀念。" />
        <link rel="canonical" href="https://www.retirementplantw.com/articles" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="理財知識文章 | 退休咖" />
        <meta property="og:description" content="退休金規劃、資產配置相關知識文章，幫助你建立正確的退休理財觀念。" />
        <meta property="og:url" content="https://www.retirementplantw.com/articles" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休咖</Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
          <Link href="/author">關於作者</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
      </nav>

      <div className="articles-page">
        <h1>理財知識文章</h1>
        <p className="page-sub">退休金規劃、資產配置相關知識，幫助你建立正確的理財觀念</p>

        {/* 分類篩選 */}
        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="article-list">
          {filtered.map((article) => (
            <Link href={`/articles/${article.slug}`} key={article.slug} className="article-card">
              <div className="article-category">{article.category}</div>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <div className="article-date">{article.publishedAt}</div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "40px" }}>
          <AdUnit slot={adsenseConfig.slots.inArticle} />
        </div>

        <div style={{ marginTop: "40px" }}>
          <EmailSubscribe />
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
        .articles-page { max-width: 760px; margin: 0 auto; padding: 48px 24px 80px; }
        h1 { font-size: 30px; font-weight: 900; margin-bottom: 8px; color: var(--cream); }
        .page-sub { font-size: 14px; color: var(--slate2); margin-bottom: 24px; }
        .category-filter { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .cat-btn {
          font-size: 13px; padding: 6px 16px; border-radius: 999px;
          border: 1px solid var(--line); background: var(--panel); color: var(--slate); cursor: pointer;
          transition: all 0.18s;
        }
        .cat-btn:hover { border-color: rgba(212,169,90,.55); color: var(--gold2); }
        .cat-btn.active { background: linear-gradient(180deg, var(--gold2), var(--gold)); color: #1a1206; border-color: var(--gold); font-weight: 700; }
        .article-list { display: flex; flex-direction: column; gap: 14px; }
        .article-card {
          display: block; border: 1px solid var(--line2); border-radius: 16px;
          padding: 22px; text-decoration: none; color: inherit; background: var(--panel);
          transition: transform 0.3s, border-color 0.3s;
        }
        .article-card:hover { transform: translateY(-4px); border-color: rgba(212,169,90,.45); }
        .article-category {
          font-size: 11px; color: var(--gold2); background: rgba(212,169,90,.14);
          border: 1px solid rgba(212,169,90,.3);
          display: inline-block; padding: 3px 10px; border-radius: 12px; margin-bottom: 10px;
        }
        .article-card h2 { font-size: 18px; font-weight: 700; margin-bottom: 8px; line-height: 1.4; color: var(--cream); }
        .article-card p { font-size: 13.5px; color: var(--slate); line-height: 1.7; margin-bottom: 10px; }
        .article-date { font-size: 11px; color: var(--muted); }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const articles = getAllArticles();
  return { props: { articles } };
}
