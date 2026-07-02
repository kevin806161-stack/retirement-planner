# 退休咖 — Next.js 專案

## 本機啟動

```bash
npm install
npm run dev
```

開啟 http://localhost:3000

## 部署（建議用 Vercel，免費且最簡單）

```bash
npm install -g vercel
vercel
```

或直接到 https://vercel.com 用 GitHub 帳號登入，匯入這個專案資料夾即可一鍵部署。

## 串接 Google AdSense（真實步驟）

1. 到 https://www.google.com/adsense 申請帳號，網域要先上線（用 Vercel 部署後的網址即可）。
2. 審核通過後，AdSense 後台會給你一個 Publisher ID，格式像 `ca-pub-1234567890123456`。
3. 打開 `lib/affiliateLinks.js`，把 `adsenseConfig.publisherId` 換成你的真實 ID。
4. 在 AdSense 後台建立廣告單元（Ad unit），每個單元會有一個 slot ID，分別填入 `adsenseConfig.slots` 裡的 `sidebar` / `inArticle` / `belowCalculator`。
5. 重新部署即可生效。AdSense 審核期間廣告位置會是空白，這是正常的。

## 串接聯盟行銷連結（真實步驟）

### 博客來
1. 申請博客來「聯盟夥伴計畫」(https://aff.books.com.tw)，審核通過後會拿到你的聯盟 ID。
2. 打開 `lib/affiliateLinks.js`，把 `affiliateBooks` 裡每本書的 `url` 換成你在博客來後台產生的真實追蹤連結。

### Amazon Associates（如果要賣英文書/海外讀者）
1. 申請 https://affiliate-program.amazon.com
2. 同樣替換 `url` 欄位即可。

### 券商開戶推廣
許多券商（永豐金、富邦、Firstrade）都有自己的推薦人計畫，通常要先聯繫他們的行銷部門申請推薦碼，再填入 `affiliatePlatforms`。

## 待辦清單（TODO）

- [ ] 申請並替換 AdSense Publisher ID 與 3 個 ad slot
- [ ] 申請博客來聯盟帳號，替換 3 本書的連結
- [ ] 寫 SEO 文章頁（建議用 `/pages/articles/[slug].js` 動態路由）
- [ ] 加上 Google Analytics 或 Plausible 追蹤流量
- [ ] 加上 email 訂閱串接（建議用 Mailchimp 或台灣的電子豹）
- [ ] 補上「免責聲明」頁面：本站非投資建議，僅供教育參考用途

## 專案結構

```
retirement-planner/
├── pages/
│   ├── _app.js          # 全站 layout，載入 AdSense script
│   ├── _document.js     # meta 標籤
│   └── index.js         # 首頁
├── components/
│   ├── RetirementCalculator.js  # 核心試算器
│   ├── BookList.js               # 聯盟行銷書單
│   ├── AdSenseScript.js          # AdSense 載入器
│   └── AdUnit.js                  # 廣告版位元件
├── lib/
│   ├── affiliateLinks.js  # 所有聯盟連結與 AdSense 設定（集中管理）
│   └── useRetirementCalc.js  # 試算邏輯
└── styles/
    └── globals.css
```
