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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+TC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/icon-512.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0f2130" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
