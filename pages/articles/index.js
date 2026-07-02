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
        <title>理財知識文章 | 退休 AI 規劃師</title>
        <meta name="description" content="退休金規劃、資產配置相關知識文章，幫助你建立正確的退休理財觀念。" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休 AI 規劃師</Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
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
        <a href="/contact">聯絡我們</a>
      </footer>

      <style jsx>{`
        .articles-page { max-width: 760px; margin: 0 auto; padding: 48px 24px 80px; }
        h1 { font-size: 26px; font-weight: 700; margin-bottom: 8px; }
        .page-sub { font-size: 14px; color: #6a7480; margin-bottom: 24px; }
        .category-filter { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .cat-btn {
          font-size: 13px; padding: 6px 16px; border-radius: 20px;
          border: 1px solid rgba(15,33,48,0.25); background: #fbf8f1; color: #4a5561; cursor: pointer;
          transition: all 0.15s;
        }
        .cat-btn:hover { border-color: #c9a24b; color: #c9a24b; }
        .cat-btn.active { background: #c9a24b; color: #0f2130; border-color: #c9a24b; }
        .article-list { display: flex; flex-direction: column; gap: 14px; }
        .article-card {
          display: block; border: 1px solid rgba(15,33,48,0.14); border-radius: 12px;
          padding: 20px; text-decoration: none; color: inherit; background: #fbf8f1;
          transition: border-color 0.2s;
        }
        .article-card:hover { border-color: #c9a24b; }
        .article-category {
          font-size: 11px; color: #c9a24b; background: rgba(201,162,75,0.12);
          display: inline-block; padding: 3px 10px; border-radius: 12px; margin-bottom: 10px;
        }
        .article-card h2 { font-size: 17px; font-weight: 600; margin-bottom: 8px; line-height: 1.4; }
        .article-card p { font-size: 13px; color: #6a7480; line-height: 1.6; margin-bottom: 10px; }
        .article-date { font-size: 11px; color: #8a929b; }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const articles = getAllArticles();
  return { props: { articles } };
}
