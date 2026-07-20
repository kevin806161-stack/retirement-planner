# 退休咖 更新包 2026-07-20：SEO 修復 + 5 篇優先文章

## 這次更新做了什麼

1. **`next.config.js`（新增檔案）**
   把 `retirement-planner-mocha.vercel.app` 301 永久轉址到 `https://www.retirementplantw.com`，解決重複內容問題（對應 GSC 的「頁面會重新導向」與「已檢索 - 尚未建立索引」）。

2. **`pages/articles/[slug].js`（覆蓋）**，文章頁四個升級：
   - 加入 canonical 標籤（之前文章頁完全沒有）
   - 加入 og:title / og:description / og:url / og:type=article
   - 加入 Article 結構化資料（JSON-LD，含作者、發布日期）
   - 加入 `remark-gfm` 外掛 → **修復現有文章的 Markdown 表格沒有被渲染成表格的 bug**
   - 頁面標題品牌從「退休 AI 規劃師」統一改為「退休咖」

3. **`content/articles/` 新增 5 篇優先文章**（數字長尾字策略）：

   | 檔案 | 主關鍵字 | 對應 Hub 工具 |
   |------|---------|--------------|
   | salary-50k-retirement-plan.md | 月薪5萬 退休金 | 進階退休試算 |
   | retire-at-50-how-much.md | 50歲退休 要準備多少 | FIRE 試算 |
   | 15-million-enough-to-retire.md | 1500萬 退休 | FIRE 試算 |
   | labor-insurance-pension-age.md | 勞保 幾歲可以領 | 勞保年金試算 |
   | save-10k-monthly-30-years.md | 月存一萬 30年 | 複利試算 |

## 部署步驟（照順序）

1. 把本資料夾內的檔案照相同路徑覆蓋／放入專案。
2. 在專案根目錄執行：
   ```bash
   npm install remark-gfm
   ```
   （這步不能跳過，否則 build 會失敗。）
3. 本機測試：`npm run dev`，打開任一篇文章確認表格正常顯示、瀏覽器檢視原始碼看得到 canonical。
4. Commit + push，Vercel 自動部署。
5. 部署完成後測試：瀏覽器打開 `https://retirement-planner-mocha.vercel.app`，應自動跳轉到正式網域。

## 部署後的 SEO 動作

1. GSC → 網址檢查 → 對 5 篇新文章逐一「要求建立索引」（每天有限額，分兩天做）。
2. 文章的 `publishedAt` 日期已預排在 7/21～8/1 之間。**建議配合 SEO 節奏分批上稿**：一次 push 兩三篇、隔幾天再 push 其餘，並把 `publishedAt` 改成實際上稿日。一次全上也可以，但持續更新的訊號更好。
3. 一週後回 GSC 確認「頁面會重新導向」數字開始下降。

## 上稿前必須人工查證的數字（YMYL 把關）

- [ ] 勞保投保薪資上限 45,800 元（2026）— 勞保局分級表
- [ ] 勞退月提繳工資：月薪 5 萬對應級距（文中以 50,600 元計）— 勞退月提繳分級表
- [ ] 勞保年金請領年齡對照表（46 年次以前 60 歲 → 51 年次以後 65 歲）
- [ ] 減給／展延年金 ±4%/年、上限 ±20%
- [ ] 年金公式：式一 0.775% + 3,000／式二 1.55%、最高 60 個月平均

查證來源：勞動部 mol.gov.tw、勞保局 bli.gov.tw。確認無誤後再上稿。
