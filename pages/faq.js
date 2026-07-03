import Head from "next/head";
import Link from "next/link";

const faqs = [
  {
    q: "退休金到底要準備多少才夠？",
    a: "這取決於你退休後的預期月支出、退休年數與通膨。一般以「退休後月支出 × 12 × 退休年數」估算總額，再扣除勞保與勞退能提供的部分，得出個人需準備的缺口。你可以使用本站的進階退休試算器，輸入年齡、收入等資料即時計算。",
  },
  {
    q: "這些計算工具需要付費或註冊嗎？",
    a: "完全免費，且不需要註冊登入即可使用所有計算工具。輸入的個人財務數字僅用於即時計算，不會儲存在伺服器上，也不會外流。",
  },
  {
    q: "試算結果準確嗎？可以完全依賴嗎？",
    a: "本站工具採用簡化的財務模型與固定報酬率假設，提供的是概略估算，幫助你建立方向感。實際退休規劃牽涉市場波動、稅務、通膨變化等複雜因素，重要決策仍建議諮詢合格的財務規劃師（CFP）或相關專業人士。",
  },
  {
    q: "勞保和勞退有什麼不同？",
    a: "勞保是社會保險，年資與投保薪資達到條件後可請領老年年金；勞退則是雇主每月提撥薪資 6% 到你的個人專戶，屬於個人退休金儲蓄。兩者性質不同、計算方式不同，缺一不可。詳見本站「勞保、勞退差在哪」專文與勞保年金試算器。",
  },
  {
    q: "4% 法則適合台灣人嗎？",
    a: "4% 法則源自美國市場數據，主張退休金達年支出的 25 倍即可支撐長期退休。台灣人可以此為參考起點，但需考量台股與美股報酬差異、勞保勞退的補充，以及低利率環境等因素，部分保守派建議改用 3.5% 提領率。",
  },
  {
    q: "夫妻可以一起試算退休金嗎？",
    a: "可以。本站提供專為雙薪家庭設計的夫妻退休試算器，兩人的年齡、收入、退休年齡可分開設定，並計算退休時間差造成的單薪過渡期，比個人版更貼近家庭實際狀況。",
  },
  {
    q: "定期定額和單筆投入哪個比較好？",
    a: "歷史數據顯示，市場長期向上時單筆投入的報酬通常略高，因為資金較早完整參與市場；但定期定額能降低進場時機風險、減輕心理壓力，對每月有固定薪資的上班族更容易執行。你可以使用本站的回測工具比較兩者在不同市場條件下的差異。",
  },
  {
    q: "網站的推薦連結是廣告嗎？",
    a: "本站部分書籍或平台連結為聯盟行銷連結，透過連結完成購買時本站可能獲得少額佣金，但不會增加你的購買成本，也不影響內容的中立性與推薦依據。詳見免責聲明頁面。",
  },
];

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Head>
        <title>常見問題 FAQ | 退休咖</title>
        <meta name="description" content="退休金規劃、資產配置、勞保勞退、AI 試算工具的常見問題解答，快速找到你想知道的答案。" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>退休咖</Link>
        <div className="nav-links">
          <Link href="/tools">所有工具</Link>
          <Link href="/articles">理財知識</Link>
          <Link href="/about">關於我們</Link>
          <Link href="/contact">聯絡我們</Link>
        </div>
      </nav>

      <div className="legal-page">
        <h1>常見問題 FAQ</h1>
        <p className="faq-intro">關於退休金規劃與本站工具的常見疑問，這裡整理了最常被問到的問題。找不到答案？歡迎<Link href="/contact">聯絡我們</Link>。</p>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div className="faq-item" key={i}>
              <h2>{faq.q}</h2>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="site-footer">
        <a href="/privacy-policy">隱私權政策</a>
        <a href="/disclaimer">免責聲明</a>
        <a href="/about">關於我們</a>
        <a href="/contact">聯絡我們</a>
      </footer>

      <style jsx>{`
        .legal-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 48px 24px 80px;
          line-height: 1.8;
          color: #1a1a1a;
        }
        h1 { font-size: 26px; font-weight: 700; margin-bottom: 12px; }
        .faq-intro { font-size: 14px; color: #666; margin-bottom: 32px; }
        .faq-intro :global(a) { color: #1d6fd8; }
        .faq-list { display: flex; flex-direction: column; gap: 8px; }
        .faq-item {
          border: 1px solid #e5e5e0;
          border-radius: 12px;
          padding: 20px;
          background: #fff;
        }
        .faq-item h2 { font-size: 16px; font-weight: 600; margin-bottom: 10px; color: #1a1a1a; }
        .faq-item p { font-size: 14px; color: #444; line-height: 1.8; margin: 0; }
      `}</style>
    </>
  );
}
