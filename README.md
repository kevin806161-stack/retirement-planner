# 首頁美化 — 套用到 Next.js 專案

改動了以下 5 個檔案，其餘檔案（lib/、pages/articles、pages/about.js 等）不受影響：

- `styles/globals.css` — 全部改成深藍（#0f2130）＋金（#c9a24b）＋米白（#f4efe4）配色，標題黑體、內文宋體。
- `pages/_document.js` — 加入 Noto Sans TC / Noto Serif TC 字體載入。
- `pages/index.js` — Hero、導覽列、文章列表區塊改版面與配色，計算邏輯與資料抓取（getStaticProps）完全不變。
- `components/BookList.js` — 書封改成極簡字首方塊（金色底線），不再用 emoji。
- `components/RetirementCalculator.js` — 僅改了檔案底部 `<style jsx>` 的顏色（email 區塊），試算邏輯（`useRetirementCalc`、寄送 API）完全沒動。

## 套用方式

把這個資料夾裡對應路徑的檔案，覆蓋你 repo 裡的同名檔案（路徑一致，直接取代即可），然後：

```
git add .
git commit -m "首頁視覺美化：深藍金配色"
git push
```

Vercel 會自動重新部署。

## 沒有動到的東西

- 所有試算邏輯、Email 寄送 API、AdSense 版位、文章資料（lib/articles.js）、其他頁面（about、contact、privacy-policy、disclaimer）都維持原樣。
- 根目錄那個舊的 `index.html`（14MB，先前誤放的靜態匯出檔）建議直接刪除 —— Next.js 專案不需要它，留著也不會被使用。
