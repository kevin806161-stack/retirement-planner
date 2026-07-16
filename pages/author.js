import Head from "next/head";
import Link from "next/link";

export default function Author() {
  return (
    <>
      <Head>
        <title>關於作者 | 退休咖</title>
        <meta name="description" content="李廖紘（小李），20歲休學接手家族招牌事業，自學網站開發創立退休咖，並發起設計圈資源共享平台。把技能變成資產，把知識變成自由。" />
        <link rel="canonical" href="https://www.retirementplantw.com/author" />
        <meta property="og:title" content="關於作者 | 退休咖" />
        <meta property="og:description" content="李廖紘（小李），20歲休學接手家族招牌事業，自學網站開發創立退休咖，並發起設計圈資源共享平台。" />
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
          <div className="author-tagline">「把技能變成資產，把知識變成自由。」</div>
          <div className="author-title">退休咖創辦人｜設計圈資源共享平台發起人</div>
        </div>

        <p>從小，我一直是一個很努力的人。</p>

        <p>
          學生時期，我的成績不錯，但我很快發現，真正讓我有成就感的不是考高分，而是創造東西、解決問題，以及看見自己的作品真正影響別人。
        </p>

        <p>
          20 歲那年，我選擇休學，接手家裡的廣告招牌事業。很多人認為這是一條傳統的路，但對我來說，這反而是另一個開始。從設計、行銷到與客戶溝通，我每天都在學習如何解決新的問題，也更加確定，我想走的不是一條被安排好的人生，而是一條自己打造的路。
        </p>

        <p>
          經營招牌事業的這幾年，我開始認真面對一個問題：如果收入不是永遠穩定的，我該怎麼幫自己、也幫身邊的人，提早做好財務上的準備？這個念頭，讓我一頭栽進投資與退休規劃的研究。因為喜歡分享知識，我創立了退休咖。然而，我身邊很少有人對這些內容感興趣，於是我決定把分享的對象，從身邊的人變成整個網路。
        </p>

        <p>
          為了打造真正有價值的平台，我從零開始學網站開發。看不懂程式碼、沒學過寫程式，就靠著 AI 一次又一次修改、一次又一次重來，直到把想法變成可以真正使用的網站。
        </p>

        <p>
          一路走來，我漸漸發現，真正讓我有成就感的，不是別人的掌聲，而是每完成一個作品、解決一個問題，就離自己理想中的人生更近一步。
        </p>

        <p>
          現在，我除了經營退休咖，也建立了
          {" "}<a href="https://line.me/ti/g2/1AeW7b9R7_rxo7Y2wSCFMG0b7UnDl5FJwQ9_2g?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" className="highlight-link" target="_blank" rel="noopener noreferrer">設計圈資源共享平台</a>{" "}
          ，希望串聯設計師、工班與業主，打造一個不抽成、共享資源、彼此合作的社群，讓更多人因為分享而獲得更多機會。
        </p>

        <p>
          我相信，真正的成功，不是得到多少掌聲，而是有多少人因為你的作品，人生變得更好。
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
        .author-tagline {
          font-size: 13px;
          font-style: italic;
          color: var(--slate);
          margin-bottom: 8px;
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
