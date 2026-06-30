import Head from "next/head";
import RetirementCalculator from "../components/RetirementCalculator";
import BookList from "../components/BookList";
import AdUnit from "../components/AdUnit";
import { adsenseConfig } from "../lib/affiliateLinks";

export default function Home() {
  return (
    <>
      <Head>
        <title>退休 AI 規劃師 | 免費退休金與資產配置試算</title>
      </Head>

      <nav className="nav">
        <div className="nav-logo">退休 AI 規劃師</div>
        <div className="nav-links">
          <a href="#calc">試算工具</a>
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
