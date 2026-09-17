import BrandLogo from "../../components/BrandLogo";
import ToolCollection from "../../components/ToolCollection";
import Head from "next/head";
import Link from "next/link";

export default function ToolsIndex() {
  return (
    <>
      <Head>
        <title>AI 理財計算工具 | 退休咖</title>
        <meta name="description" content="免費 AI 理財計算工具：退休試算、勞保年金、FIRE 試算、複利計算、ETF 配息試算，全方位退休規劃工具集。" />
        <link rel="canonical" href="https://www.retirementplantw.com/tools" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI 理財計算工具 | 退休咖" />
        <meta property="og:description" content="免費 AI 理財計算工具：退休試算、勞保年金、FIRE 試算、複利計算、ETF 配息試算，全方位退休規劃工具集。" />
        <meta property="og:url" content="https://www.retirementplantw.com/tools" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" aria-label="退休咖首頁"><BrandLogo /></Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
          <Link href="/author">關於作者</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
      </nav>

      <div className="tools-page">
        <div className="tools-hero">
          <h1>AI 理財計算工具集</h1>
          <p>免費使用，即時計算，幫你從各個角度掌握退休金規劃全貌</p>
        </div>

        <ToolCollection variant="full" />
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/about">關於我們</a>
        <a href="/author">關於作者</a>
        <a href="/contact">聯絡我們</a>
      </footer>

    </>
  );
}
