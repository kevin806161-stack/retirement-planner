# 退休 AI 規劃師 — 首頁

單一自包含靜態 HTML 檔（`index.html`），無需 build 步驟。

## 部署到 Vercel

1. 將這個資料夾（含 `index.html` 與 `vercel.json`）推到 GitHub repo 根目錄。
2. Vercel → Import Project → 選這個 repo。
3. Framework Preset 選 **Other**；Build Command / Output Directory 留空即可。
4. Deploy。

## 更新內容

`index.html` 是打包後的產出檔，不要直接編輯。若要改文案、配色或版面，請回到原始設計檔（Design Component）修改後重新匯出。

## 自訂網域

Vercel 專案設定 → Domains → 新增 `retirementplantw.com`，依指示更新 DNS（通常是 A 記錄指向 Vercel 或改用 Vercel Nameservers）。
