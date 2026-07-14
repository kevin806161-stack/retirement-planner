import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>關於我們 | 退休咖</title>
        <meta name="description" content="退休咖是一個專為台灣上班族打造的退休金規劃工具與知識平台，提供免費的 AI 試算工具與原創理財文章。" />
        <link rel="canonical" href="https://www.retirementplantw.com/about" />
        <meta property="og:title" content="關於我們 | 退休咖" />
        <meta property="og:description" content="退休咖是專為台灣上班族打造的退休金規劃工具與知識平台。" />
        <meta property="og:url" content="https://www.retirementplantw.com/about" />
        <meta property="og:type" content="website" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
          退休咖
        </Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
        </div>
      </nav>

      <div className="legal-page">
        <h1>關於退休咖</h1>

        <p>
          <strong>退休咖</strong>（retirementplantw.com）是一個專為台灣上班族與理財新手打造的退休金規劃工具與知識平台。
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

        <h2>關於作者</h2>
        <p>
          退休咖由 Kevin 建立與維運。Kevin 20 歲接下家族經營的廣告招牌事業，本業專注於設計與行銷，並自學網站開發，將專業技能延伸到內容與工具型網站的經營。
        </p>
        <p>
          除了退休咖，Kevin 也創立了
          {" "}<a href="https://line.me/ti/g2/1AeW7b9R7_rxo7Y2wSCFMG0b7UnDl5FJwQ9_2g?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" className="highlight-link" target="_blank" rel="noopener noreferrer">設計圈資源共享平台</a>{" "}
          ，一個連結室內設計師、平面設計師與招牌工程承包商的交流社群，目標是促進設計圈與施工端之間更順暢的合作與資源共享。
        </p>
        <p>
          從招牌製作到網站開發，Kevin 相信「把複雜的專業知識，轉化成一般人也能輕鬆理解與使用的工具」，是退休咖與設計圈平台共同的核心理念。
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
          color: #f0f0f0;
        }
        h1 {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 24px;
          color: #d4af37;
        }
        h2 {
          font-size: 18px;
          font-weight: 600;
          margin-top: 32px;
          margin-bottom: 12px;
          color: #d4af37;
        }
        p {
          font-size: 14px;
          color: #f0f0f0;
          margin-bottom: 12px;
        }
        p strong {
          color: #ffffff;
          font-weight: 700;
        }
        .highlight-link {
          color: #d4af37;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
      `}</style>
    </>
  );
}
