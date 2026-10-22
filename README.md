# letGoWorkRun

個人作品集網站，正式站：<https://let.gowork.run/>

| 項目 | 值 |
|---|---|
| 專案名稱 | letGoWorkRun（`package.json` 為 `letgoworkrun`） |
| GitHub | <https://github.com/colinjen88/letGoWorkRun>（舊網址 `colinjen88/worki` 會自動轉址） |
| 本機路徑 | `C:\git_work\letGoWorkRun` |
| 主要分支 | `master` |
| 技術 | Next.js 16（App Router、靜態匯出）、React 19、TypeScript、next-themes |

## 本機開發

```powershell
npm install
npm run dev        # 開發模式
npm run typecheck  # 型別檢查
npm run build      # 產生靜態網站到 out/
npm run start      # 以 serve 預覽 out/，開啟 http://localhost:3000/
```

實作前先閱讀 [`AGENTS.md`](AGENTS.md)：此專案使用的 Next.js 版本與常見寫法不同，需先查閱 `node_modules/next/dist/docs/`。網站為純靜態輸出（`output: "export"`），不要加入 Server Actions、cookies、ISR、API 路由等需要執行期伺服器的功能。

## 目錄結構

| 位置 | 用途 |
|---|---|
| `src/app/` | 頁面、版面與全站樣式（`globals.css`）；案例頁在 `work/[slug]/` |
| `src/components/` | 首頁各區塊元件 |
| `src/data/projects.ts` | 作品與案例頁的唯一資料來源 |
| `public/` | 圖片、PDF、`robots.txt`、`sitemap.xml` |
| `docs/` | 設計計畫、內容稽核、QA 與交接紀錄 |
| `let/` | 舊版純 HTML 作品集與早期部署腳本（保留參考） |

## 部署

發布單位是 `npm run build` 產生的完整 `out/`，部署在 VPS 的 Docker 容器中：

- 容器專案：`/home/docker-server/projects/let-final`
- 網站檔案掛載：`/var/www/html/worki/out`
- 重新建置 `out/` 後必須重新建立容器，不能只 reload Nginx。
- 每次發布前保留上一版 `out/` 作為回復產物。

> **命名說明**：專案已於 2026-10-22 從 `worki` 更名為 `letGoWorkRun`，但 VPS 上的路徑（`/var/www/html/worki`）刻意維持舊名。若要一併更名，需同時修改伺服器目錄、容器掛載與 Nginx 設定，並更新 `let/deploy_vps_let.ps1`、`let/nginx_let.conf` 與相關文件。

## 文件索引

- [`docs/portfolio-v3.1-handoff.md`](docs/portfolio-v3.1-handoff.md)：目前狀態與協作交接（新加入先讀）
- [`docs/portfolio-v3.1-qa.md`](docs/portfolio-v3.1-qa.md)：已執行的 QA 與 Lighthouse 結果
- [`docs/portfolio-content-audit.md`](docs/portfolio-content-audit.md)：作品內容與可公開範圍
- [`docs/portfolio-redesign-plan-2026-09-05.md`](docs/portfolio-redesign-plan-2026-09-05.md)：改版計畫
- [`implementation_plan.md`](implementation_plan.md)：v3.1 實作計畫與驗收基準
- [`let/DEPLOY_STATUS.md`](let/DEPLOY_STATUS.md)：舊版靜態站的部署手冊

## 更名紀錄

| 日期 | 變更 |
|---|---|
| 2026-10-22 | GitHub 倉庫 `worki` → `letGoWorkRun`；`package.json` 名稱 `wang-portfolio-v2` → `letgoworkrun`；本機資料夾 `C:\git_work\worki` → `C:\git_work\letGoWorkRun`；GitHub 倉庫說明更新 |
