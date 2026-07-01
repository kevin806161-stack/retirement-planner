import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>關於我們 | 退休 AI 規劃師</title>
        <meta name="description" content="退休 AI 規劃師是一個專為台灣上班族打造的退休金規劃工具與知識平台，提供免費的 AI 試算工具與原創理財文章。" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
          退休 AI 規劃師
        </Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
        </div>
      </nav>

      <div className="legal-page">
        <h1>關於退休 AI 規劃師</h1>

        <p>
          <strong>退休 AI 規劃師</strong>（retirementplantw.com）是一個專為台灣上班族與理財新手打造的退休金規劃工具與知識平台。
        </p>

        <h2>我們為什麼做這個網站</h2>
        <p>
          台灣的退休金制度複雜，勞保、勞退、個人儲蓄三個層次交疊，加上通膨、投資報酬率等變數，讓大多數人對「我到底需要存多少錢才夠退休」這個問題感到模糊。
        </p>
        <p>
          我們希望用最直覺的方式，幫助每一個台灣人在五分鐘內算出屬於自己的退休金目標，並透過原創的理財知識文章，幫助你建立正確的退休規劃觀念。
        </p>

        <h2>我們提供什麼</h2>
        <p>
          <strong>免費 AI 退休金試算工具</strong>：輸入年齡、收入、已存金額與預期報酬率，即時計算退休金缺口、每月需存金額與建議資產配置比例。
        </p>
        <p>
          <strong>原創理財知識文章</strong>：涵蓋退休規劃入門、資產配置策略、ETF 選擇、勞保勞退制度解析等主題，全部由編輯團隊撰寫，力求正確易懂。
        </p>
        <p>
          <strong>精選書單與工具推薦</strong>：整理最值得台灣讀者參考的理財書籍、券商平台與學習資源。
        </p>

        <h2>關於內容的立場</h2>
        <p>
          本網站所有文章均以教育性質為目的，不構成個人投資建議。我們相信長期、分散、低成本的指數化投資是大多數人最適合的退休準備方式，但每個人的財務狀況不同，重要的財務決策仍應諮詢合格的財務規劃師或相關專業人士。
        </p>
        <p>
          部分文章包含聯盟行銷連結（如博客來書籍購買連結），透過這些連結的購買行為，本站可能獲得少額佣金，但不影響你的購買價格，也不影響我們的內容立場與推薦標準。
        </p>

        <h2>聯絡我們</h2>
        <p>
          如有任何問題、文章勘誤或合作洽詢，歡迎透過以下方式與我們聯繫：
        </p>
        <p>
          Email：contact@retirementplantw.com
        </p>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/about">關於我們</a>
      </footer>

      <style jsx>{`
        .legal-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 48px 24px 80px;
          line-height: 1.8;
          color: #1a1a1a;
        }
        h1 {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 24px;
        }
        h2 {
          font-size: 18px;
          font-weight: 600;
          margin-top: 32px;
          margin-bottom: 12px;
        }
        p {
          font-size: 14px;
          color: #333;
          margin-bottom: 12px;
        }
      `}</style>
    </>
  );
}
