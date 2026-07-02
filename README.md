# 退休咖 — 全站美化更新（深藍 × 金 × 米白 + Logo）

這次以你 repo **目前的實際內容**為基底重做，所以「退休咖」品牌、你自己加的工具入口、新的免責／隱私頁都完整保留，只換上一致的設計。**這是一次到位的完整版，覆蓋後全站都會是新樣式，工具入口也不會再消失。**

## 為什麼之前沒生效

前幾次的更新其實沒有成功套用到 repo：`styles/globals.css`、`pages/index.js`、`pages/_document.js` 都還是舊的藍色淺色版；logo 的 PNG 雖然上傳到 `public/`，但 `_document.js` 沒有引用、導覽列也沒接上，所以 logo 等於沒生效。這次一併修好。

## 套用方式（重要）

把這個資料夾裡的檔案，依相同路徑覆蓋你 repo 裡的同名檔案。有 **一個** 需要手動改檔名：

1. 覆蓋所有檔案（`pages/`、`components/`、`styles/`、`public/`）。
2. **`pages/articles/__slug__.js` 要改名成 `pages/articles/[slug].js`**（GitHub 網頁上：先刪掉舊的 `[slug].js`，再把 `__slug__.js` 改名為 `[slug].js`）。工具沒法直接產出方括號檔名，只能麻煩這一步。
3. `git add . && git commit -m "全站套用深藍金設計 + Logo" && git push`
4. Vercel 自動重新部署。

## 這次改了什麼

**設計（深藍 #0f2130 / 金 #c9a24b / 米白 #f4efe4，標題黑體、內文宋體）**
- `styles/globals.css` — 全站配色、字體、導覽列、Hero、試算器、書單、頁尾、電子報訂閱框。
- `pages/_document.js` — 載入中文字體 + 接上 favicon/logo + 主題色。
- `pages/index.js` — 首頁改版，**含工具入口區塊**（5 個工具卡片 + 「查看所有工具」）。
- `pages/tools/index.js` + 5 個試算工具頁 — 全部套色，移除 emoji 圖示改用金色字首方塊。
- `pages/articles/index.js`、`pages/articles/[slug].js` — 文章列表 / 內文頁套色，分類按鈕金色 active。
- `pages/about.js`、`pages/contact.js`、`pages/disclaimer.js`、`pages/privacy-policy.js` — 全部套色；**免責與隱私頁原本沒有導覽列與頁尾，這次補上**，全站導覽一致。
- `components/BookList.js`、`RetirementCalculator.js`、`EmailSubscribe.js`、`RelatedArticles.js` — 套色 + 移除剩餘 emoji。

**Logo / Favicon**
- `public/favicon.svg`（主要，向量）+ `favicon-32.png`、`icon-512.png`、`apple-touch-icon.png`（相容備援，已在你 repo 內，這裡一併附上）。
- 標記是「深藍底 + 金色地平線日出」，呼應退休／黃金歲月，與首頁弧線同一套視覺語言。
- 導覽列左上的品牌 icon 也換成同一個標記，跟分頁 favicon 一致，取代原本的灰色地球。

**工具入口不再消失**
- 首頁新增工具區塊 + 導覽列「所有工具」；每個內頁的導覽列也都補上「所有工具」，任何頁面都點得到。

## 完全沒動的東西

- 所有計算邏輯（`lib/`、各試算公式）、Email/聯絡 API（`pages/api/`）、AdSense 版位、文章內容（`content/*.md`）、sitemap 都沒改，只改樣式與文字排版。
- 根目錄那個 14MB 的舊 `index.html` 建議刪除，Next.js 用不到。

## 顏色對照（日後自己調整用）

- 米白背景 `#f4efe4`、卡片 `#fbf8f1`、次要區塊 `#ece4d5`
- 深藍 `#0f2130`、金 `#c9a24b`、警示磚紅 `#a4562f`
- 內文灰階 `#3d4954` / `#6a7480` / `#8a929b`
