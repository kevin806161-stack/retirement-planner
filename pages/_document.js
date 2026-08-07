import { Html, Head, Main, NextScript } from "next/document";
import { adsenseConfig } from "../lib/affiliateLinks";

export default function Document() {
  return (
    <Html lang="zh-Hant">
      <Head>
        <meta charSet="utf-8" />

        {/* Favicon / Site Icon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/icon-512.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="google-site-verification" content="KqZGc0tJ-VrFZXB2BoTTWoM4nU_ADFlQAn-ZO9d-Oh0" />
        <meta name="google-adsense-account" content={adsenseConfig.publisherId} />
        <meta property="og:site_name" content="退休咖" />
        <meta property="og:type" content="website" />
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
