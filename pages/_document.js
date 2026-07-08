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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "退休咖",
              url: "https://retirementplantw.com",
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
              url: "https://retirementplantw.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://retirementplantw.com/articles?q={search_term_string}",
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
