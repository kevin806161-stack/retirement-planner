import { Html, Head, Main, NextScript } from "next/document";
import { adsenseConfig } from "../lib/affiliateLinks";

export default function Document() {
  return (
    <Html lang="zh-Hant">
      <Head>
        <meta charSet="utf-8" />
        <meta name="google-site-verification" content="KqZGc0tJ-VrFZXB2BoTTWoM4nU_ADFlQAn-ZO9d-Oh0" />
        <meta name="google-adsense-account" content={adsenseConfig.publisherId} />
        <meta
          name="description"
          content="退休咖｜AI 驅動的退休金規劃與資產配置試算工具，免費試算你的退休缺口"
        />
        <meta property="og:site_name" content="退休咖" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="退休咖｜台灣人的 AI 退休金規劃工具" />
        <meta property="og:description" content="五分鐘算出你的退休金缺口。免費 AI 試算工具與原創理財知識。" />
        <meta property="og:url" content="https://www.retirementplantw.com" />
        <meta property="og:image" content="https://www.retirementplantw.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="zh_TW" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.retirementplantw.com/og-image.png" />

        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M6R87F8KBY"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M6R87F8KBY');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "退休咖",
              url: "https://www.retirementplantw.com",
              description: "專為台灣上班族打造的退休金規劃工具與知識平台，提供免費 AI 試算工具與原創理財文章。",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "退休咖",
              url: "https://www.retirementplantw.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.retirementplantw.com/articles?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
