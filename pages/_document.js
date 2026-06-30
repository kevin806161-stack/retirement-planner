import { Html, Head, Main, NextScript } from "next/document";
import { adsenseConfig } from "../lib/affiliateLinks";

export default function Document() {
  return (
    <Html lang="zh-Hant">
      <Head>
        <meta charSet="utf-8" />
        <meta name="google-adsense-account" content={adsenseConfig.publisherId} />
        <meta
          name="description"
          content="AI 驅動的退休金規劃與資產配置試算工具，免費試算你的退休缺口"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
