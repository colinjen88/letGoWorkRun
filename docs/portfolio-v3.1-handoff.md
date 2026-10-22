# 作品集 v3.1 協作交接紀錄

最後更新：2026-10-22

專案名稱：letGoWorkRun（2026-10-22 由 `worki` 更名；GitHub <https://github.com/colinjen88/letGoWorkRun>，本機 `C:\git_work\letGoWorkRun`）。VPS 上的 `/var/www/html/worki` 路徑刻意維持舊名，詳見根目錄 `README.md`。

目前分支：`master`

正式站提交：`1505494`（`Improve loading performance and accessibility`）

工作目錄：程式碼已提交並推送；Lighthouse JSON 僅保留在本機，不納入版本庫。

## 1. 目前可用成果

作品集已完成 v3.1 實作、效能優化與正式站部署：<https://let.gowork.run/>。

- 全站已從深色版改為淺色設計系統：`src/app/globals.css`。
- 首頁結構已完成：Hero、核心職能、4 個精選案例、11 筆可篩選作品、個人特點與聯絡區。
- 4 個靜態案例頁已存在：`/work/zyfloral/`、`/work/royal/`、`/work/goodeats/`、`/work/goldlab/`。
- 手機導覽、圖片卡片切換、影片彈窗、Email 複製回饋與鍵盤 Escape 關閉已實作。
- 產物為靜態網站：`next.config.mjs` 使用 `output: "export"`、`trailingSlash: true`、`images.unoptimized: true`；發布單位是完整 `out/`。
- 已新增 `public/robots.txt` 與 `public/sitemap.xml`。
- 首頁已改用系統字體、延後載入影片播放器、停用同頁導覽預抓，並以桌面限定的 `IntersectionObserver` 處理 ScrollSpy。
- Cloudflare Email Address Obfuscation 已對聯絡區停用，正式站不再注入 `email-decode.min.js`。

## 2. 重要檔案與責任範圍

| 位置 | 用途與協作注意事項 |
|---|---|
| `implementation_plan.md` | v3.1 實作計畫與驗收基準。任何擴大範圍前先對照此文件。 |
| `src/app/globals.css` | 全站淺色 token 與元件樣式；此專案沒有正在運行的 Tailwind 編譯流程，勿只新增 Tailwind class。 |
| `src/data/projects.ts` | 11 筆作品與 4 個案例路由的唯一資料來源；`ProjectCategory` 不含 `all`，篩選使用 `ProjectFilter`。 |
| `src/components/FeaturedCaseStudies.tsx` | 精選案例區，從 `getFeaturedProjects()` 讀取資料。 |
| `src/components/WorksSection.tsx` | 作品篩選、卡片與圖像切換。圖像路徑需在 `public/` 下存在。 |
| `src/components/VideoModal.tsx` | 影片彈窗；保留 YouTube watch URL 轉換與焦點還原行為。 |
| `src/app/work/[slug]/page.tsx` | 靜態案例頁；必須保留 `generateStaticParams()` 與 `dynamicParams = false`。 |
| `docs/portfolio-content-audit.md` | 內容、入口與可確認範圍；修改案例敘述前必讀。 |
| `docs/portfolio-v3.1-qa.md` | 已執行的 QA 與尚未執行項目。 |

## 3. 內容與事實邊界

目前已使用保守文案，避免把截圖或公開網址當作作者角色、後台功能、數據串接、SEO 排名、流量或商業成果的證明。

- 古風官網必須保留「試做」性質，不能改寫為正式委託或正式上線。已補充主官網首頁與養生知識 2 張截圖作為首圖，並提供主官網與 Showcase 雙入口。
- GoodEats 的官網和 Showcase 必須保留兩個獨立入口。
- GoldLab 與 `flashrate`（報價來源）為不同作品，不得合併功能、責任或成果。
- `flashrate` 的「15 個資料源」、SEO 排名／AI 引用、網站效益等無佐證說法已移除；未提供新證據前不要恢復。
- 個案內容的待本人確認事項集中在 `portfolio-content-audit.md`。若無法取得確認，維持以可見交付物為主的表述。

## 4. 已完成驗證

最近一次實作後檢查皆通過：

```powershell
npm run typecheck
npm run build
```

靜態預覽以 `npm run start` 啟動（`serve out`）。已確認下列路徑：

- HTTP 200：`/`、四個 `/work/<slug>/`、`/robots.txt`、`/sitemap.xml`、`/assets/Graphic_Portfolio.pdf`
- HTTP 404：`/not-a-real-route/`
- In-app Browser：作品篩選、植園圖片切換、影片彈窗、YouTube 備援網址、Escape 關閉與 390 × 844 手機版。
- 正式站：首頁、案例頁、robots 與 sitemap 回 HTTP 200；未知路徑回 HTTP 404。
- Lighthouse：使用者最新正式站重測 Performance **99**。發布驗證為 Performance 96、Accessibility 100、Best Practices 100、SEO 100，LCP 2.4s、TBT 70ms、CLS 0。
- 部署版本：`1505494`；回復產物為 `/var/www/html/worki-out-backup-20260923T131106Z`。

詳細紀錄見 `docs/portfolio-v3.1-qa.md`。每次修改 UI 或資料後，至少重跑 typecheck、build，以及受影響的互動流程。

## 5. 尚未完成與建議下一步

1. 由本人確認內容稽核表中每個「待本人確認」作品的工作範圍、可公開的後台資訊與任何可量測成效。
2. 檢查全部外站連結、真實 iOS Safari 與螢幕閱讀器。
3. 對圖片最重案例頁跑 Lighthouse mobile 三次並記錄中位數。
4. 後續部署沿用 `/home/docker-server/projects/let-final` 容器與 `/var/www/html/worki/out` 掛載；建置會重建 `out/`，完成後必須重新建立容器，不能只執行 Nginx reload。
5. 每次發布保留上一版 `out/` 回復產物；未知路徑維持 404，不得全部轉向首頁。

## 6. 本機預覽與協作守則

```powershell
npm run build
npm run start
```

開啟 `http://localhost:3000/`。本次工作已啟動本機預覽；若 3000 port 未在監聽，執行上述命令重新啟動即可。

實作前必讀專案根目錄 `AGENTS.md`，並依其要求先閱讀本機 `node_modules/next/dist/docs/` 對應的 Next.js 16 文件。避免使用已淘汰的 `next export`，也不要加入需要執行期伺服器的 Server Actions、cookies、ISR、登入或 API 表單。

## 7. Git 交接注意事項

v3.1 程式與效能優化已提交到 `master`。開始新工作前仍應先執行：

```powershell
git status --short
git diff --check
```

不要使用 `git reset --hard`、`git checkout --` 或刪除未追蹤檔案。本機 Lighthouse JSON 是驗證輸入，不應加入版本庫。
