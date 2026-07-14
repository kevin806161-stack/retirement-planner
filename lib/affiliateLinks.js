// 集中管理聯盟行銷連結，之後申請到真實帳號後直接替換 url 即可
// 博客來、Amazon Associates、各券商開戶連結都放這裡

export const affiliateBooks = [
  {
    id: "b1",
    title: "漫步華爾街",
    author: "Burton Malkiel",
    emoji: "📈",
    url: "https://greenmall.info/3RnOT?uid1=1",
  },
  {
    id: "b2",
    title: "富爸爸，窮爸爸",
    author: "Robert Kiyosaki",
    emoji: "💰",
    url: "https://adcenter.conn.tw/3RnOY?uid1=3",
  },
  {
    id: "b3",
    title: "投資最重要的事",
    author: "Howard Marks",
    emoji: "🏦",
    url: "https://product.mchannles.com/3RnOV?uid1=2",
  },
];

// 券商 / 平台聯盟連結（之後可在文章中插入）
export const affiliatePlatforms = [
  {
    id: "p1",
    name: "永豐金證券",
    url: "https://example.com/affiliate/sinopac?ref=AFFILIATE_ID",
  },
  {
    id: "p2",
    name: "Firstrade 第一證券",
    url: "https://www.firstrade.com/content/zh-tw/welcomeoffer?refid=AFFILIATE_ID",
  },
];

// Google AdSense 設定
export const adsenseConfig = {
  publisherId: "ca-pub-6408742977461651",
  slots: {
    sidebar: "0000000000",
    inArticle: "0000000000",
    belowCalculator: "0000000000",
  },
};
