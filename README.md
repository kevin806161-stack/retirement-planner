# 首頁 + 新增內容 美化套用（深藍 × 金 × 米白）

## 這次更新了什麼

上次的檔案沒有被套用到（你的 repo 現在還是舊的藍色系），這次重新打包，並且把你新增的「工具集」「文章列表」等頁面也一併套上同一套設計。

改了以下檔案，路徑跟你 repo 一致，直接覆蓋即可：

- `styles/globals.css` — 全站配色改為深藍（#0f2130）＋金（#c9a24b）＋米白（#f4efe4），標題黑體、內文宋體。
- `pages/_document.js` — 載入 Noto Sans TC / Noto Serif TC 字體。
- `pages/index.js` — 首頁 Hero / 導覽列 / 文章列表改版面配色。
- `pages/about.js`、`pages/contact.js` — 同套配色（contact 表單按鈕改深藍）。
- `pages/articles/index.js` — 文章列表頁配色、分類篩選按鈕改金色 active 狀態。
- `pages/articles/__slug__.js` — **這個檔案要重新命名成 `[slug].js`** 再放進 `pages/articles/` 資料夾（工具限制不能直接產出方括號檔名，抱歉多一個步驟）。
- `pages/tools/index.js` — 工具總覽頁：移除 emoji 圖示，改成金色字首方塊（跟書單卡片同風格），badge 改金色。
- `pages/tools/advanced-calculator.js`、`fire-calculator.js`、`compound-interest.js`、`etf-dividend.js`、`labor-insurance.js` — 5 個試算工具頁，全部套色，並拿掉標題與提示文字裡的 emoji（🔥🧮💰🏛️📈🎉💡📊⚠️🚀💪🪣✅）。
- `components/BookList.js`、`components/RetirementCalculator.js`、`components/EmailSubscribe.js` — 同上次的配色 + 拿掉剩餘 emoji。

## 這次修的問題

首頁導覽列一直沒有連到「所有工具」，所以你新增的 5 個試算工具頁面雖然檔案都在 repo 裡、也能被 Google 收錄，但首頁上完全點不到，等於「消失了」。這次補上：

- 首頁導覽列新增「所有工具」連結。
- 首頁在試算器下方新增一個「更多 AI 理財計算工具」區塊，展示 4 個工具卡片 + 「查看所有工具」連結。
- `about.js`、`contact.js`、`articles/index.js`、`articles/[slug].js` 的導覽列也補上「所有工具」，全站導覽一致。
- 修正 CSS：原本用 `:last-child` 判斷哪個連結該顯示金色按鈕樣式，導覽列項目變多後會誤套用到錯誤的連結（例如「關於我們」變成醒目金色按鈕）。改成明確的 `.nav-cta` class，只有首頁的「免費試算」會是金色按鈕，其他都是一般連結。同時修正手機版導覽列（原本邏輯在沒有 CTA 的頁面會把連結全部藏起來），改成可橫向滑動。

## 套用方式

1. 把這個資料夾裡的檔案，依相同路徑覆蓋你 repo 裡的檔案。
2. **`pages/articles/__slug__.js` 需要在 GitHub 上重新命名成 `pages/articles/[slug].js`**（覆蓋同名檔案）。
3. `git add . && git commit -m "首頁補上工具入口，修正導覽列樣式" && git push`
4. Vercel 自動重新部署。

## 沒有動到的東西

- 所有計算邏輯（試算公式、FIRE 計算、勞保公式、ETF 配息公式）、Email 寄送 API、AdSense 版位、文章內容（`content/articles/*.md`）都完全沒改，只改了顏色與文字排版。
- `lib/`、`pages/api/`、`content/`、其他設定檔都不受影響。
- 根目錄那個 14MB 的舊 `index.html` 建議直接刪除，Next.js 用不到它。

## 顏色對照（供之後自己調整用）

- 主背景／卡片：`#f4efe4`（米白）、`#fbf8f1`（卡片米白）、`#ece4d5`（次要區塊）
- 深色區塊／標題：`#0f2130`（深藍）
- 強調色：`#c9a24b`（金）
- 警示：`#a4562f`（磚紅）
- 內文灰階：`#4a5561` / `#6a7480` / `#8a929b`
