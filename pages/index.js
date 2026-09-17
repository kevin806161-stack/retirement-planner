import BrandLogo from "../components/BrandLogo";
import ToolCollection from "../components/ToolCollection";
import HorizonArtwork from "../components/HorizonArtwork";
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
        <title>退休咖 | 免費退休金與資產配置 AI 試算</title>
        <meta name="description" content="退休咖 RetirementPlan TW — 免費 AI 退休試算工具。輸入現況，即時分析退休缺口、資產配置比例與每月需存金額。" />
        <link rel="canonical" href="https://www.retirementplantw.com/" />
        <meta property="og:title" content="退休咖｜台灣人的 AI 退休金規劃工具" />
        <meta property="og:description" content="五分鐘算出你的退休金缺口。免費 AI 試算工具與原創理財知識。" />
        <meta property="og:url" content="https://www.retirementplantw.com/" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" aria-label="退休咖首頁"><BrandLogo /></Link>
        <div className="nav-links">
          <a href="#calc">試算工具</a>
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
          <Link href="/author">關於作者</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
      </nav>

      <section className="brand-hero">
        <div className="brand-hero-copy">
          <div className="hero-kicker hero-entry">AI 驅動 · 免費使用</div>
          <h1 className="hero-entry"><span>打造你的</span><span>退休財務藍圖</span><em>從今天開始</em></h1>
          <p className="brand-hero-description hero-entry">輸入你的現況，AI 幫你分析退休缺口、資產配置比例，以及每月需要存多少錢</p>
          <div className="brand-hero-actions hero-entry">
            <a href="#calc" className="brand-primary">開始免費試算<span aria-hidden="true">↗</span></a>
            <Link href="/tools" className="brand-secondary">看所有工具<span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <HorizonArtwork />
      </section>

      {/* 工具入口（全部保留） */}
      <section className="home-tools">
        <div className="home-tools-head editorial-reveal">
          <div>
            <div className="eyebrow">AI TOOLKIT</div>
            <h2>AI 計算工具集</h2>
          </div>
          <Link href="/tools" className="more-link">查看全部 →</Link>
        </div>
        <ToolCollection />
      </section>

      <div id="calc" className="editorial-reveal">
        <RetirementCalculator />
      </div>

      {/* 計算結果下方廣告版位 */}
      <div style={{ padding: "20px 28px", maxWidth: "1180px", margin: "0 auto" }} className="editorial-reveal">
        <AdUnit slot={adsenseConfig.slots.belowCalculator} />
      </div>

      <section className="home-articles">
        <div className="home-articles-head editorial-reveal">
          <div>
            <div className="eyebrow">INSIGHTS</div>
            <h2>最新理財知識文章</h2>
          </div>
          <Link href="/articles" className="more-link">查看所有文章 →</Link>
        </div>
        <div className="home-articles-grid">
          {articles.slice(0, 3).map((article, i) => (
            <Link href={`/articles/${article.slug}`} key={article.slug} className="home-article editorial-reveal" style={{ "--d": `${i * 0.09}s` }}>
              {article.category && <div className="home-article-cat">{article.category}</div>}
              <div className="home-article-title">{article.title}</div>
              <div className="home-article-desc">{article.description}</div>
            </Link>
          ))}
        </div>
      </section>

      <div id="books">
        <BookList />
      </div>

      {/* 文章內廣告版位 */}
      <div style={{ padding: "20px 28px", maxWidth: "1180px", margin: "0 auto" }} className="editorial-reveal">
        <AdUnit slot={adsenseConfig.slots.inArticle} />
      </div>

      <footer className="site-footer">
        <a href="/about">關於我們</a>
        <a href="/author">關於作者</a>
        <a href="/contact">聯絡我們</a>
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
