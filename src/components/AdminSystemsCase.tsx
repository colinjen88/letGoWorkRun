import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FabConsoleDemo } from "@/components/FabConsoleDemo";

type SystemEntry = {
  name: string;
  type: string;
  stack: string;
  modules: string[];
  patterns: string[];
  href: string;
};

const goldlabFacts = [
  { value: "64", label: "支 API 端點" },
  { value: "25", label: "個自動化測試檔" },
  { value: "220+", label: "次版本提交" },
  { value: "9", label: "種英文版流程狀態" },
];

const goldlabModules = [
  {
    title: "文章管理後台",
    route: "/editorrr",
    points: [
      "統計卡片＋「全部／已發佈／草稿與排程／回收桶」狀態分頁，再細分草稿與排程中",
      "關鍵字搜尋、分類篩選、依更新時間／置頂／標題排序，可調整每頁筆數",
      "選取本頁後批次發佈、轉草稿、置頂、排程或移到回收桶，執行前顯示筆數確認",
      "批次結果回報「成功幾筆、失敗幾筆」，部分失敗不會被當成全部成功",
      "一鍵建立文章備份快照；回收桶保留 30 天，可還原或永久刪除",
    ],
  },
  {
    title: "文章編輯器",
    route: "/editorrr/:id",
    points: [
      "發布前檢查清單：標題、Slug、SEO 摘要、分類、關鍵字、封面、圖片 Alt、內文、作者，缺一項就擋下發布並列出缺漏",
      "側欄可收合：文章狀態、發佈資訊、全域設定、SEO 分析與社群分享預覽",
      "結構化資料（Schema）自動同步、關鍵字出現次數統計、FAQ 與結構化內容編輯",
      "媒體庫支援拖放上傳（JPG／PNG／WEBP，5MB 上限）與刪除",
      "快速儲存、存為草稿、發布更新三種儲存層級",
    ],
  },
  {
    title: "英文版管理",
    route: "/editorrr/english",
    points: [
      "中英文對照表格，以 9 種狀態篩選：尚無英文、草稿、待 QA 核准、可發布、等中文發布、已發布、中文已更新、已下架",
      "中文原文修改後，自動把對應英文標為「中文已更新」，避免兩邊內容不一致",
      "中文還是草稿時，英文可先完成發布程序，等中文發布後自動公開",
      "每次發布都留下 release 紀錄，可預覽並一鍵回滾到前一版",
    ],
  },
  {
    title: "AI 草稿人工審核佇列",
    route: "/editorrr/golder-queue",
    points: [
      "系統自動產生的評論筆記，若偵測到明顯 AI 語氣，或涉及聯準會官員、政治人物、市場操作等高風險內容，會先進入待審佇列",
      "編輯在後台逐筆核准或退回，處理完即從佇列移除",
      "每日自動產生的市場分析預設存為草稿，必須經後台審核才發布",
    ],
  },
  {
    title: "安全與維運",
    route: "/api/admin/*",
    points: [
      "JWT 驗證（24 小時效期）、bcrypt 密碼雜湊；同一 IP 登入失敗 5 次鎖定 15 分鐘",
      "健康檢查 API 回報文章數、回收桶數量與最舊天數、備份數、殘留暫存檔、新聞快取時間與運行時間",
      "部署流程依序為備份、建置、切換、健康檢查；建置失敗不影響線上網站，文章與上傳檔案不會被覆蓋",
      "後台頁面一律 noindex，前台與後台共用同一套 API 與權限檢查",
    ],
  },
];

const goldlabPipeline = [
  { step: "抓取", body: "17 個 RSS 來源，每 15 分鐘排程" },
  { step: "整理", body: "擷取全文、分段翻譯、多個服務依序備援" },
  { step: "AI 產生", body: "相關新聞產生評論筆記，每日 08:00 產生分析" },
  { step: "人工把關", body: "可疑內容進審核佇列，分析預設為草稿" },
  { step: "發布", body: "前台列表與文章頁，含結構化資料" },
];

const systems: SystemEntry[] = [
  {
    name: "大內御指 預約與排班後台（試做）",
    type: "營運管理後台",
    stack: "Nuxt 3",
    modules: ["預約總覽儀表板", "訂單查詢", "行事曆", "技師管理", "休假管理", "系統設定"],
    patterns: ["管理者／技師／會員三種入口", "KPI 卡片 + 趨勢圖 + 最新紀錄", "排班與休假資料串接"],
    href: "/work/royal/",
  },
  {
    name: "植園花室 網站管理",
    type: "內容管理後台（CMS）",
    stack: "前台 + 管理後台",
    modules: ["概覽管理", "網站內容", "文章管理", "帳號與安全"],
    patterns: ["草稿預覽後再發布", "自動保留近 20 個版本", "匯出／匯入備份"],
    href: "/work/zyfloral/",
  },
  {
    name: "穀意 GoodEats 前／後台規劃",
    type: "架構規劃與開發介紹",
    stack: "React 18 + PHP API（Headless）",
    modules: ["Admin 規劃", "系統架構", "功能清單", "開發時間軸"],
    patterns: ["前後端分離", "以 API 契約銜接前台與後台", "開發歷程文件化"],
    href: "/work/goodeats/",
  },
];

const processSteps = [
  {
    title: "盤點角色與任務",
    body: "先列出誰會用、在什麼時段用、最常做哪三件事，再決定首頁該放什麼。",
    output: "角色清單・任務頻率表",
  },
  {
    title: "權限與資料範圍",
    body: "把「看得到」與「能操作」分開設計，敏感操作綁定角色，無權限時明確說明原因。",
    output: "權限矩陣（RBAC）",
  },
  {
    title: "資訊架構",
    body: "依任務而非資料表分選單；列表、詳細、編輯三層結構固定，降低學習成本。",
    output: "Sitemap・頁面流程圖",
  },
  {
    title: "Wireframe 與 Figma",
    body: "以真實欄位與極端資料（超長名稱、空值、千筆以上）驗證版面，而不是只排漂亮的假資料。",
    output: "線框稿・高保真稿・互動原型",
  },
  {
    title: "元件與設計規範",
    body: "表格、篩選列、狀態標籤、表單驗證、確認對話框統一規格，讓新頁面能直接組合。",
    output: "Design Tokens・元件清單",
  },
  {
    title: "前端實作與串接",
    body: "依 API 契約開發，處理載入、空狀態、錯誤與逾時；上線後依實際使用回饋迭代。",
    output: "可上線介面・狀態處理清單",
  },
];

const mappings = [
  {
    from: "GoldLab：發布前檢查清單，必填項目未完成就擋下並列出缺漏",
    to: "工單、參數設定送出前的完整性檢核，不完整就不能送出，並指出缺哪一欄",
  },
  {
    from: "GoldLab：AI 自動產生的內容，可疑項目先進人工審核佇列",
    to: "系統自動判定的結果（例如自動缺陷分類）需工程師確認才生效",
  },
  {
    from: "GoldLab：英文版 9 種狀態、來源更新自動標示過期、release 紀錄與回滾",
    to: "配方與文件的版本流程：狀態清楚、上游變更時標示受影響項目、可回到前一版",
  },
  {
    from: "GoldLab：批次操作前顯示筆數確認，結果回報成功與失敗筆數",
    to: "批次派工或批次結案：先確認範圍，部分失敗時明確列出哪些沒成功",
  },
  {
    from: "GoldLab：健康檢查 API 與先備份再切換的部署流程",
    to: "系統狀態儀表板與維運紀錄，異常時能快速定位、不影響產線作業",
  },
  {
    from: "大內御指：管理者／技師／會員分流入口",
    to: "作業員、製程工程師、值班主管分層權限，同一畫面依身分顯示可做的事",
  },
  {
    from: "大內御指：技師排班與休假管理",
    to: "輪班排程與交接：讓下一班一眼看到上一班留下的事件與處理紀錄",
  },
  {
    from: "植園花室：草稿預覽、版本保留、匯出備份",
    to: "參數與設定變更：先預覽差異再套用，保留版本可回溯",
  },
];

const statusTokens = [
  { key: "run", label: "運轉", note: "實心勾選圖示" },
  { key: "idle", label: "待機", note: "空心圓點" },
  { key: "down", label: "異常", note: "八角形停止圖示" },
  { key: "pm", label: "保養", note: "扳手圖示" },
];

const principles = [
  {
    title: "狀態不能只靠顏色",
    body: "每個狀態同時有圖示、文字與顏色，色弱或螢幕反光時仍可辨識。",
  },
  {
    title: "資料密度可調",
    body: "提供標準／緊湊兩種密度；監控畫面需要一屏看更多，表單頁需要留白。",
  },
  {
    title: "高風險操作兩段確認",
    body: "切換機台狀態、刪除資料前，在原位顯示影響範圍再確認，不用跳出式彈窗打斷。",
  },
  {
    title: "每個動作都留紀錄",
    body: "操作紀錄附帶執行身分與時間，方便交班與事後追溯。",
  },
  {
    title: "空、載入、錯誤、無權限",
    body: "四種狀態都有對應畫面與下一步提示，不讓使用者面對空白表格。",
  },
  {
    title: "鍵盤與長時間使用",
    body: "可用 Tab 操作全部控制項、焦點清楚；色彩以 Token 管理，可延伸深色主題，降低長時間值班的疲勞。",
  },
];

export function AdminSystemsCase() {
  return (
    <div className="admin-case">
      <section className="admin-section">
        <p className="eyebrow">Main case</p>
        <h2>主案例：GoldLab 編輯後台</h2>
        <p className="section-intro">
          GoldLab 是持續維運中的貴金屬資訊網站，從前台、後台、API、自動化內容管線到部署都由我規劃與實作。後台讓編輯管理中英文文章、審核系統自動產生的內容，並掌握系統狀態。
        </p>
        <div className="goldlab-facts">
          {goldlabFacts.map((fact) => (
            <div className="goldlab-fact" key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
        <p className="goldlab-stack">
          React 18・Vite・Tailwind CSS・React Router・Express・JWT・Node.js 測試・Docker／VPS 部署
        </p>

        <div className="goldlab-modules">
          {goldlabModules.map((module) => (
            <article className="card goldlab-module" key={module.title}>
              <div className="goldlab-module__head">
                <h3>{module.title}</h3>
                <code>{module.route}</code>
              </div>
              <ul>
                {module.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className="goldlab-subhead">自動化內容管線與人工把關</h3>
        <ol className="goldlab-pipeline">
          {goldlabPipeline.map((item) => (
            <li key={item.step}>
              <strong>{item.step}</strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ol>
        <div className="goldlab-links">
          <Link className="button button--secondary button--sm" href="/work/goldlab/" prefetch={false}>
            GoldLab 前台案例 <ArrowUpRight size={14} />
          </Link>
          <a className="button button--quiet button--sm" href="https://goldlab.tw/" target="_blank" rel="noopener noreferrer">
            goldlab.tw <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <section className="admin-section">
        <p className="eyebrow">Other systems</p>
        <h2>其他後台作品</h2>
        <p className="section-intro">
          不同類型的後台各有重點：營運排班、內容管理與前後端分離架構。
        </p>
        <div className="admin-systems">
          {systems.map((system) => (
            <article className="card admin-system" key={system.name}>
              <div className="admin-system__head">
                <span className="admin-system__type">{system.type}</span>
                <h3>{system.name}</h3>
                <span className="admin-system__stack">{system.stack}</span>
              </div>
              <div className="admin-system__group">
                <span>主要模組</span>
                <div className="tags">
                  {system.modules.map((item) => (
                    <span className="tag tag--sm" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="admin-system__group">
                <span>設計模式</span>
                <ul>
                  {system.patterns.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <Link className="button button--quiet button--sm" href={system.href} prefetch={false}>
                查看案例 <ArrowUpRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <p className="eyebrow">Process</p>
        <h2>後台規劃流程</h2>
        <p className="section-intro">從上面幾套系統歸納出的固定流程，每一步都有可交付的產出。</p>
        <ol className="admin-process">
          {processSteps.map((step, index) => (
            <li className="card" key={step.title}>
              <span className="admin-process__num">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <span className="admin-process__output">產出：{step.output}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="admin-section">
        <p className="eyebrow">Transfer to manufacturing</p>
        <h2>經驗如何對應到製造現場</h2>
        <p className="section-intro">
          晶圓廠後台的核心同樣是「即時狀態、角色權限、可追溯」。以下是既有經驗可以直接延用的地方。
        </p>
        <div className="admin-map" role="table" aria-label="既有經驗與製造現場情境對照">
          <div className="admin-map__row admin-map__row--head" role="row">
            <span role="columnheader">既有作品中的做法</span>
            <span role="columnheader">對應的製造現場情境</span>
          </div>
          {mappings.map((row) => (
            <div className="admin-map__row" role="row" key={row.from}>
              <span role="cell">{row.from}</span>
              <span role="cell">{row.to}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <p className="eyebrow">Design system</p>
        <h2>後台設計原則與規範</h2>
        <div className="admin-tokens">
          {statusTokens.map((token) => (
            <div className="admin-token" key={token.key}>
              <span className={`fab-status fab-status--${token.key}`}>{token.label}</span>
              <small>{token.note}</small>
            </div>
          ))}
        </div>
        <div className="admin-principles">
          {principles.map((item) => (
            <div className="admin-principle" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section" id="concept-demo">
        <p className="eyebrow">Interactive concept</p>
        <h2>概念 Demo：設備監控主控台</h2>
        <p className="section-intro">
          把上述原則實作成可操作的畫面。可以試著切換「檢視身分」看權限差異、點選機台確認告警、用狀態篩選與欄位排序，或切換緊湊密度。
        </p>
        <FabConsoleDemo />
        <p className="admin-disclaimer">
          此 Demo 為個人設計練習，所有機台、批號與告警皆為前端隨機模擬資料，與任何公司的實際系統無關。
        </p>
      </section>
    </div>
  );
}
