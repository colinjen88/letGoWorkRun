# 部署狀態與操作手冊 (2026-02-20 更新)

- **專案名稱**: letGoWorkRun — WANG's Portfolio (let.gowork.run)
- **當前位置**: `c:\git_work\letGoWorkRun\let\`
- **目標伺服器**: 72.62.66.151 (VPS)
- **狀態**: ✅ 已成功部署

## 🚧 已完成進度
1. **GitHub 同步**: 本地代碼（包含最新的 CSS 抽取、分類篩選更新）已全部推送到 GitHub `master` 分支。
2. **部署腳本**: 已建立自動化 PowerShell 部署腳本 (`deploy_vps_let.ps1`)。
   - 功能：自動安裝 Nginx/Git/Certbot、拉取 GitHub 代碼、設定 Nginx、申請 SSL 憑證。
   - 修正點：Nginx Root 路徑已修正為 `/var/www/html/worki/let` 以解決 403 錯誤。
3. **UI 更新**:
   - **御手國醫作品圖片**: 已將圖片更新為 `assets/royaltouch/` 資料夾下的 5 張新圖。
   - **輪播動畫優化**: 更新 `portfolio.css` 中的 `carousel-vertical` 動畫，支援 5 張圖無縫循環播放，並優化切換節奏。

## 🚀 快速部署流程 (手動操作)

如果自動腳本無法執行，請依照以下步驟手動更新與部署：

### 1. 更新 VPS 程式碼
```bash
# 登入 VPS
ssh root@72.62.66.151

# 進入專案目錄
cd /var/www/html/worki

# 拉取最新代碼
git pull origin master
# (如果提示輸入帳號密碼，請確認 Repo 為 Public，或使用 GitHub Token)
```

### 2. Nginx 設定範本
如果需要重新設定 Nginx，請使用以下配置：

**檔案位置**: `/etc/nginx/sites-available/let.gowork.run`

```nginx
server {
    listen 80;
    server_name let.gowork.run;

    # 指向專案內的 let 子目錄
    root /var/www/html/worki/let;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 3. SSL 與 Cloudflare 設定注意事項
本次部署採用 **Cloudflare Flexible SSL** 模式，無需在伺服器端安裝憑證 (Certbot)。

1.  **Cloudflare DNS**:
    - Type: `A`
    - Name: `let`
    - Content: `72.62.66.151`
    - Proxy Status: **Proxied (橘色雲朵)**

2.  **Cloudflare SSL/TLS**:
    - Mode: **Flexible** 或 **Full**
    - **不要**選 Full (Strict)，除非伺服器有安裝有效憑證。

## ⚠️ 常見問題排除

1.  **GitHub 驗證失敗 (Authentication failed)**
    - GitHub 已移除密碼登入支援。
    - **解法**: 將 Repo 設為 Public (最簡單)，或使用 Personal Access Token (PAT) 作為密碼登入。

2.  **Nginx 啟動失敗 (emerg)**
    - 檢查是否有其他設定檔引用了不存在的憑證檔案。
    - 指令: `nginx -t` 檢查設定檔語法。
    - 指令: `grep -r "不存在的檔案名" /etc/nginx/` 找出有問題的設定檔。
    - **本次案例**: `royal.gowork.run.conf` 引用了錯誤憑證導致全站 Nginx 崩潰，解決方式為暫時移除該設定檔。

3.  **403 Forbidden 錯誤**
    - 檢查 IP 是否正確指向 VPS。
    - 檢查 Nginx `root` 路徑是否正確指向 `/var/www/html/worki/let`。
