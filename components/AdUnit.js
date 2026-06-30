import { useEffect } from "react";
import { adsenseConfig } from "../lib/affiliateLinks";

// 用法: <AdUnit slot={adsenseConfig.slots.sidebar} />
export default function AdUnit({ slot, style }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense load error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client={adsenseConfig.publisherId}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
