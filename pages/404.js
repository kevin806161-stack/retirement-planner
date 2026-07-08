import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>找不到頁面 | 退休咖</title>
        <meta name="robots" content="noindex" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休咖</Link>
        <div className="nav-links">
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
        </div>
      </nav>

      <div className="notfound-page">
        <div className="notfound-code">404</div>
        <h1>找不到這個頁面</h1>
        <p>你要找的頁面可能已移除或網址有誤，試試以下連結：</p>

        <div className="notfound-links">
          <Link href="/" className="nf-link">🏠 回首頁</Link>
          <Link href="/tools" className="nf-link">🧮 所有計算工具</Link>
          <Link href="/articles" className="nf-link">📚 理財知識文章</Link>
        </div>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/about">關於我們</a>
        <a href="/contact">聯絡我們</a>
      </footer>

      <style jsx>{`
        .notfound-page {
          max-width: 560px;
          margin: 0 auto;
          padding: 80px 24px;
          text-align: center;
        }
        .notfound-code {
          font-size: 72px;
          font-weight: 800;
          color: #1d6fd8;
          line-height: 1;
          margin-bottom: 16px;
        }
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 10px; }
        .notfound-page > p { font-size: 14px; color: #666; margin-bottom: 32px; }
        .notfound-links { display: flex; flex-direction: column; gap: 12px; max-width: 320px; margin: 0 auto; }
        .nf-link {
          display: block;
          border: 1px solid #e5e5e0;
          border-radius: 10px;
          padding: 14px;
          text-decoration: none;
          color: #1a1a1a;
          font-size: 14px;
          font-weight: 500;
          transition: border-color 0.2s;
        }
        .nf-link:hover { border-color: #1d6fd8; }
      `}</style>
    </>
  );
}
