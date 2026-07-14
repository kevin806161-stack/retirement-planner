import Head from "next/head";
import Link from "next/link";

export default function Author() {
  return (
    <>
      <Head>
        <title>關於作者 | 退休咖</title>
        <meta name="description" content="退休咖由李廖紘（小李）建立與維運，本業經營家族廣告招牌事業，並自學網站開發，致力於把複雜的專業知識轉化成易懂的工具。" />
        <link rel="canonical" href="https://www.retirementplantw.com/author" />
        <meta property="og:title" content="關於作者 | 退休咖" />
        <meta property="og:description" content="退休咖由李廖紘（小李）建立與維運，本業經營家族廣告招牌事業，並自學網站開發。" />
        <meta property="og:url" content="https://www.retirementplantw.com/author" />
        <meta property="og:type" content="profile" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
          退休咖
        </Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
          <Link href="/author">關於作者</Link>
        </div>
      </nav>

      <div className="legal-page">
        <h1>關於作者</h1>

        <div className="author-card">
          <div className="author-name">李廖紘（小李）</div>
          <div className="author-title">退休咖 創辦人</div>
        </div>

        <p>
          退休咖由<strong>李廖紘（小李）</strong>建立與維運。小李 20 歲接下家族經營的廣告招牌事業，本業專注於設計與行銷，並自學 Next.js 網站開發，將專業技能延伸到內容與工具型網站的經營。
        </p>

        <h2>從招牌到網站：跨領域的實作經驗</h2>
        <p>
          長期經營廣告招牌事業，讓小李累積了紮實的設計與客戶溝通經驗；而自學程式開發的過程，則讓他能夠親手把想法變成真正上線運作的產品，退休咖正是這個跨領域經驗的具體成果——從試算工具的邏輯設計、內容規劃，到網站架設與 SEO 優化，全部一手包辦。
        </p>

        <h2>設計圈資源共享平台</h2>
        <p>
          除了退休咖，小李也創立了
          {" "}<a href="https://line.me/ti/g2/1AeW7b9R7_rxo7Y2wSCFMG0b7UnDl5FJwQ9_2g?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" className="highlight-link" target="_blank" rel="noopener noreferrer">設計圈資源共享平台</a>{" "}
          ，一個連結室內設計師、平面設計師與招牌工程承包商的交流社群，目標是促進設計圈與施工端之間更順暢的合作與資源共享。
        </p>

        <h2>核心理念</h2>
        <p>
          從招牌製作到網站開發，小李相信「把複雜的專業知識，轉化成一般人也能輕鬆理解與使用的工具」，是退休咖與設計圈平台共同的核心理念。
        </p>

        <h2>聯絡與追蹤</h2>
        <div className="social-links">
          <a
            href="https://www.instagram.com/llh.000_/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <span className="social-icon">📷</span>
            <span>
              <span className="social-label">個人 Instagram</span>
              <span className="social-handle">@llh.000_</span>
            </span>
          </a>
          <a
            href="https://www.instagram.com/design_new20/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <span className="social-icon">🏢</span>
            <span>
              <span className="social-label">公司 Instagram</span>
              <span className="social-handle">@design_new20</span>
            </span>
          </a>
        </div>

        <p style={{ marginTop: "24px" }}>
          也可以透過退休咖的{" "}<Link href="/contact" className="highlight-link">聯絡表單</Link>{" "}與小李聯繫。
        </p>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/about">關於我們</a>
        <a href="/author">關於作者</a>
      </footer>

      <style jsx>{`
        .legal-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 48px 24px 80px;
          line-height: 1.8;
          color: var(--slate);
        }
        h1 {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--gold);
        }
        h2 {
          font-size: 18px;
          font-weight: 600;
          margin-top: 32px;
          margin-bottom: 12px;
          color: var(--gold);
        }
        p {
          font-size: 14px;
          color: var(--slate);
          margin-bottom: 12px;
        }
        p strong {
          color: var(--cream);
          font-weight: 700;
        }
        .highlight-link {
          color: var(--gold);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .author-card {
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 24px;
        }
        .author-name {
          font-size: 20px;
          font-weight: 700;
          color: var(--cream);
          margin-bottom: 4px;
        }
        .author-title {
          font-size: 13px;
          color: var(--gold);
        }
        .social-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 12px 16px;
          text-decoration: none;
          transition: border-color 0.2s;
        }
        .social-link:hover {
          border-color: var(--gold);
        }
        .social-icon {
          font-size: 20px;
        }
        .social-label {
          display: block;
          font-size: 12px;
          color: #b0b0b0;
        }
        .social-handle {
          display: block;
          font-size: 14px;
          color: var(--cream);
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
