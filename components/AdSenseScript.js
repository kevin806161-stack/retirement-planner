import Script from "next/script";
import { adsenseConfig } from "../lib/affiliateLinks";

// 放在 _app.js 裡，全站只載入一次
export default function AdSenseScript() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
