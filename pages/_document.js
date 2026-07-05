import { Html, Head, Main, NextScript } from "next/document";
import { adsenseConfig } from "../lib/affiliateLinks";

export default function Document() {
  return (
    <Html lang="zh-Hant">
      <Head>
        <meta charSet="utf-8" />
        <meta name="google-site-verification" content="KqZGc0tJ-VrFZXB2BoTTWoM4nU_ADFlQAn-ZO9d-Oh0" />
        <meta name="google-adsense-account" content={adsenseConfig.publisherId} />
        {/* 全站共用的 <meta description> 已移除：
            description 一律由各頁自己的 <Head> 提供（每頁獨立、對 SEO 最有利）。
            切勿在此重新加入全站 description，否則每頁會出現兩個 description 標籤而互相稀釋。 */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
