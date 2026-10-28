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
  external?: boolean;
};

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
    name: "GoldLab 文章管理中心",
    type: "資料列表型後台",
    stack: "前台 + 文章後台",
    modules: ["統計卡片", "狀態分頁", "關鍵字搜尋", "分類篩選", "可排序表格"],
    patterns: ["勾選批次操作", "資源回收筒（軟刪除）", "排程發布與 SEO 欄位"],
    href: "/work/goldlab/",
  },
  {
    name: "Goldlab.cloud 即時行情監控",
    type: "即時監控看板",
    stack: "WebSocket + 多來源聚合",
    modules: ["市場概覽", "多來源報價卡", "異常日誌", "管理端"],
    patterns: ["連線狀態指示", "各來源延遲（ms）", "「上次更新」資料新鮮度"],
    href: "https://goldlab.cloud/",
    external: true,
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
    from: "Goldlab.cloud：WebSocket 連線狀態、各來源延遲與上次更新時間",
    to: "機台狀態看板：標示資料新鮮度，資料過期時降低視覺權重並提示",
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
  {
    from: "GoldLab：批次操作、資源回收筒、狀態分頁",
    to: "工單與異常單批次處理：防誤刪、可復原，依處理狀態分流",
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
        <p className="eyebrow">Experience map</p>
        <h2>做過的五套後台</h2>
        <p className="section-intro">
          以下為作品集中已完成的後台與管理介面，依類型整理模組與可延用的設計模式。
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
              {system.external ? (
                <a className="button button--quiet button--sm" href={system.href} target="_blank" rel="noopener noreferrer">
                  前往網站 <ArrowUpRight size={14} />
                </a>
              ) : (
                <Link className="button button--quiet button--sm" href={system.href} prefetch={false}>
                  查看案例 <ArrowUpRight size={14} />
                </Link>
              )}
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
