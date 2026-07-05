# 退休咖 · 深金全站改版 — 更新檔（覆蓋用）

把本資料夾內的檔案，依相同路徑覆蓋到你的 repo，即完成全站深金改版。

## 本次變更的檔案
- `styles/globals.css` — 全站基礎樣式改深金（背景/導覽/頁尾/試算器/書單/訂閱框），含字體(Noto Sans/Serif TC + Space Mono)、膠片雜訊、滾動進場、金色掃光、count-up 彈跳等動態工具 class。**帶動所有頁面**（工具頁、文章、faq、about、contact 皆吃這支）。
- `pages/index.js` — 首頁重寫為深金 2a：盾牌 Logo＋副標、掃光首屏＋光暈、深色工具卡（**7 個工具入口全保留**＋查看全部）、深色文章卡、CTA、兩處廣告版位保留、滾動進場動態。
- `pages/tools/index.js` — 所有工具頁卡片改深金、盾牌 Logo、hover 浮起。
- `components/RetirementCalculator.js` — email 區塊改深金、每月金額變動時彈跳動態；邏輯(useRetirementCalc / /api/send-calc)不變。

## 本次追加
- **手機版整理**：`styles/globals.css` 補上統一 RWD（每頁共用，一次修好全站手機版，桌機不動）。導覽在手機改為「Logo 一行＋連結橫向可捲的膠囊按鈕」不再擠成一團；首屏、試算器（兩欄→單欄）、書單、頁尾、工具頁/文章頁的內距與字級都收斂；表格與圖表在手機可橫向捲動不撐破版面。`pages/index.js` 另補首頁區塊的手機微調（工具格改 2 欄/1 欄、CTA 直排）。
- 獨立版 `site/index.html` 本身已含手機選單與 RWD，不受影響。

## 先前批次
- **首屏星塵背景**：粒子加密（密度上限提高、間距縮小）＋加上**極淡金色連線**（僅近距離、透明度約 0.14），仍維持緩慢漂移與滑鼠微互動；`prefers-reduced-motion` 自動關閉。同步於 `pages/index.js` 與 `site/index.html`。
- **7 個工具頁全部深金化**：labor-insurance、compound-interest、fire-calculator、etf-dividend、advanced-calculator、couple-calculator、dca-vs-lumpsum。修正所有「文字與背景太貼近」問題——卡片改深色 panel、內文改亮色、邊框改金線、按鈕/圖表/公式框/AI 分析框全部改深金；語意色（漲跌綠/警示）保留但調亮以確保可讀。
- 文章頁（[slug]、index）、RelatedArticles：深金高對比（前一輪已完成）。
- \`pages/articles/[slug].js\`、\`pages/articles/index.js\`、\`components/RelatedArticles.js\`：理財知識（文章）頁全部改深金高對比，內文、公式框、表格、程式碼區塊、分類標籤都清楚可讀。

## 未改動但已自動深色化的部分
BookList、AdUnit、訂閱框、各工具頁與文章頁都吃 `globals.css`，覆蓋後會一起變深金。若個別工具頁(如 advanced-calculator)內有 styled-jsx 殘留淺色，回報我再逐頁調。

## 部署
commit → push，Vercel 會自動部署。建議先在 PR / Preview 上看一輪。

## 微調位置
- 配色：`globals.css` 最上方 `:root` 變數（--gold / --bg / --cream…）。
- Logo：搜尋盾牌路徑 `M20 3 L34 8.5`（index nav、tools nav、favicon）。
