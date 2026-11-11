# 作品集 v3.1 QA 紀錄

最後更新：2026-09-23

測試基準：`master`，提交 `1505494`，Next.js 16.3.4，正式站 `https://let.gowork.run/`。

| 項目 | 結果 | 證據／說明 |
|---|---|---|
| 型別檢查 | 通過 | `npm run typecheck` exit 0。 |
| 靜態建置 | 通過 | `npm run build` exit 0；輸出首頁、404 與四個案例 SSG 頁面。 |
| 靜態伺服器 | 通過 | `npm run start`（`serve out`）下，首頁、四案例、robots、sitemap 與 PDF 為 HTTP 200；未知 `/not-a-real-route/` 為 HTTP 404。 |
| 專案資產 | 通過 | 擷取 `projects.ts` 的 `/assets/` 路徑並逐一檢查，皆存在於 `public/`。 |
| 首頁互動 | 通過 | In-app Browser：功能型網站篩選由 11 件切換為 4 件；植園圖片控制由第 1 張切換至第 2 張。 |
| 影片彈窗 | 通過 | In-app Browser：開啟 Motion 作品後顯示對話框、YouTube iframe、正確 `watch?v=V_f5eONwmPo` 備援連結；Escape 關閉並將焦點還原至觸發按鈕。 |
| 行動版 390 × 844 | 通過 | 檢視首頁、固定導覽、Hero、作品卡片；修正標題斷字與品牌名稱截斷後重新建置。 |
| 內容與 SEO | 通過 | `robots.txt`、`sitemap.xml` 已輸出；四個已發布案例有 canonical、title 與 description。內容證據與待確認項見 `portfolio-content-audit.md`。 |
| Lighthouse | 通過 | 使用者最新正式站重測 Performance **99**。發布時的獨立正式站驗證為 Performance 96、Accessibility 100、Best Practices 100、SEO 100；FCP 1.8s、LCP 2.4s、TBT 70ms、CLS 0。Lighthouse 為實驗室量測，單次分數會受網路與執行環境影響。 |
| 字體與首屏腳本 | 通過 | 正式站無外部字體請求；影片播放器 chunk 不在首屏下載，於開啟影片時才載入。 |
| Cloudflare Email | 通過 | 公開 HTML 未再注入 `email-decode.min.js`。 |
| 正式站部署 | 通過 | 提交 `1505494` 已部署；首頁、案例頁、robots、sitemap 為 HTTP 200，未知路徑維持 HTTP 404。回復產物：`/var/www/html/worki-out-backup-20260923T131106Z`。 |
| 後台案例頁部署（2026-10-29） | 通過 | 提交 `9a2072e` 已部署（新增 `/work/admin-systems/`）；首頁、5 個案例頁、sitemap、robots、`dark.html` 為 HTTP 200，未知路徑 404；正式站 Demo 互動與主控台無錯誤。回復產物：`/var/www/html/worki-out-backup-20261029T003837Z-admin-case`。 |
| 精選卡片封面修正（2026-10-29） | 通過 | 提交 `c788c1b` 已部署；首頁後台案例卡片改用 `admin_console_v2_card_v3.webp`，主控台完整顯示不裁切；主要頁面 HTTP 200、未知路徑 404、無主控台錯誤。回復產物：`/var/www/html/worki-out-backup-20261029T004542Z-admin-card`。 |
| 新案例與第一批優化（2026-11-11） | 通過 | 提交 `f1a3894` 已部署到新主機：新增 `/work/peta-days/`、`/work/ai-music-mv/`，深淺色切換、專屬分享圖、apple-touch-icon、案例頁結構化資料、手機版面視窗溢出修正。首頁、7 個案例頁、`dark.html`、sitemap、robots、分享圖為 HTTP 200，未知路徑 404；正式站切換深色正常、無主控台錯誤、無破圖。回復產物：`/var/www/html/worki-out-backup-20261111T124140Z-f1a3894`。 |
| 大象診所案例（2026-11-12） | 通過 | 提交 `41de73b` 已部署：新增 `/work/elephant-clinic/` 與 0907 完整報告；真人臉部與瀏覽器頭像已馬賽克（正式站封面圖與本機遮蔽版雜湊相同）。首頁、3 個案例頁、完整報告、sitemap、robots、`dark.html` 為 HTTP 200，未知路徑 404；案例頁 17 張圖無破圖、無水平捲動、無主控台錯誤。回復產物：`/var/www/html/worki-out-backup-20261111T161205Z-29fbb02`。 |
| 精選案例調整（2026-11-12） | 通過 | 提交 `fae4071` 已部署：精選改為 GoldLab、GoodEats、大象診所（網站效能、SEO及版面優化）、貼貼日和（角色設計、LINE貼圖製作）四張同尺寸卡片，大象改用 Before／After 縮圖；植園花室、古風官網、後台案例回到作品庫。首頁精選順序正確；首頁、5 個案例頁、新縮圖、sitemap、robots、`dark.html` 為 HTTP 200，未知路徑 404。回復產物：`/var/www/html/worki-out-backup-20261111T171839Z-5dd63aa`。 |

尚未執行：實機 iOS Safari、螢幕閱讀器抽查、圖片最重案例頁的 Lighthouse 三次中位數，以及全部外站入口的逐項可用性檢查。這些項目不可視為已通過。
