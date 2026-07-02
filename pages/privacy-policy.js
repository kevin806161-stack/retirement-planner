import Head from "next/head";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>隱私權政策 | 退休咖</title>
        <meta name="description" content="退休咖網站隱私權政策，說明我們如何蒐集、使用與保護您的個人資料。" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo">退休咖</Link>
        <div className="nav-links">
          <Link href="/#calc">試算工具</Link>
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
      </nav>

      <div className="legal-page">
        <h1>隱私權政策</h1>
        <p className="updated">最後更新日期：2026 年 6 月 30 日</p>

        <p>
          歡迎使用「退休咖」（以下稱「本網站」）。我們重視您的隱私權，本隱私權政策說明本網站如何蒐集、使用、儲存與保護您於使用本網站服務時所提供或產生的資訊。當您使用本網站，即表示您同意本政策所述之內容。
        </p>

        <h2>一、本網站蒐集哪些資訊</h2>
        <p>本網站可能蒐集以下類型的資訊：</p>
        <ul>
          <li>
            <strong>您主動提供的資訊：</strong>
            例如您於退休金試算工具中輸入的年齡、收入、儲蓄金額等數據，或訂閱電子報時提供的 Email 信箱。這些資料僅用於即時計算與顯示結果，本網站不會將您輸入的個人理財數字儲存於伺服器或對外揭露。
          </li>
          <li>
            <strong>自動蒐集的技術資訊：</strong>
            包括您的 IP 位址、瀏覽器類型、作業系統、造訪頁面、停留時間、流量來源等，通常透過 Cookie 或第三方分析工具（如 Google Analytics）自動蒐集。
          </li>
          <li>
            <strong>廣告相關資訊：</strong>
            本網站使用 Google AdSense 投放廣告，Google 及其合作夥伴可能使用 Cookie 依據您過去造訪本網站或其他網站的紀錄，投放個人化廣告。
          </li>
        </ul>

        <h2>二、Cookie 的使用</h2>
        <p>
          本網站使用 Cookie 與類似技術，以改善使用體驗、分析流量並提供個人化廣告內容。您可以透過瀏覽器設定停用 Cookie，但停用後可能影響部分功能（如試算工具的記憶功能）正常運作。
        </p>
        <p>
          第三方廣告商（包括 Google）使用 Cookie，以根據您過往造訪本網站及其他網站的紀錄，向您投放廣告。您可以前往
          {" "}<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google 廣告設定頁面</a>{" "}
          停用個人化廣告功能。
        </p>

        <h2>三、第三方服務</h2>
        <p>本網站使用以下第三方服務，這些服務有各自獨立的隱私權政策：</p>
        <ul>
          <li><strong>Google AdSense</strong>：用於投放廣告，詳見 <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google 合作網站隱私權與條款</a></li>
          <li><strong>Google Analytics（如有使用）</strong>：用於分析網站流量與使用行為</li>
          <li><strong>聯盟行銷夥伴</strong>（如博客來、Amazon Associates 等）：當您點擊本網站書籍或商品連結並完成購買，相關平台可能會記錄您的點擊與購買行為以核發推廣佣金，本網站不會接觸您於該平台輸入的付款資訊</li>
        </ul>

        <h2>四、資訊的使用目的</h2>
        <p>本網站蒐集之資訊僅用於以下目的：</p>
        <ul>
          <li>提供並改善退休金試算與資產配置建議功能</li>
          <li>分析網站流量與使用者行為，以優化內容與使用體驗</li>
          <li>投放與您興趣相關的廣告內容</li>
          <li>如您訂閱電子報，用於寄送理財知識相關內容</li>
        </ul>
        <p>本網站不會將您的個人資訊出售予第三方。</p>

        <h2>五、資料保護</h2>
        <p>
          本網站採取合理之技術與管理措施保護您的資訊，惟需提醒您，任何透過網際網路傳輸之資料均無法保證百分之百安全，本網站將盡力維護但不負絕對保證之責。
        </p>

        <h2>六、您的權利</h2>
        <p>
          您可隨時透過瀏覽器設定管理或刪除 Cookie；如您已訂閱電子報，可於每封郵件底部點選取消訂閱連結，停止接收後續通知。
        </p>

        <h2>七、政策修訂</h2>
        <p>
          本網站保留隨時修訂本隱私權政策之權利，修訂後將公布於本頁面，並更新「最後更新日期」。建議您定期查閱本頁面以掌握最新內容。
        </p>

        <h2>八、聯絡我們</h2>
        <p>
          若您對本隱私權政策有任何疑問，歡迎透過本網站提供之聯絡方式與我們聯繫。
        </p>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/about">關於我們</a>
        <a href="/contact">聯絡我們</a>
      </footer>

      <style jsx>{`
        .legal-page { max-width: 720px; margin: 0 auto; padding: 56px 24px 80px; line-height: 1.9; color: #26333f; font-family: "Noto Serif TC", serif; }
        h1 { font-family: "Noto Sans TC", sans-serif; font-size: 30px; font-weight: 900; color: #0f2130; margin-bottom: 8px; }
        .updated { font-family: "Noto Sans TC", sans-serif; font-size: 13px; color: #8a929b; margin-bottom: 32px; }
        h2 { font-family: "Noto Sans TC", sans-serif; font-size: 19px; font-weight: 700; color: #0f2130; margin-top: 34px; margin-bottom: 12px; }
        p { font-size: 14.5px; color: #3d4954; margin-bottom: 12px; }
        ul { padding-left: 20px; margin-bottom: 12px; }
        li { font-size: 14.5px; color: #3d4954; margin-bottom: 8px; }
        strong { color: #0f2130; }
        a { color: #c9a24b; }
      `}</style>
    </>
  );
}
