import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AdminCaseToc, type TocItem } from "@/components/AdminCaseToc";
import { FabConsoleDemo } from "@/components/FabConsoleDemo";
import { ShotLightbox } from "@/components/ShotLightbox";

const toc: TocItem[] = [
  { id: "goldlab", label: "GoldLab 編輯後台" },
  { id: "other-systems", label: "其他後台" },
  { id: "method", label: "後台規劃方式" },
  { id: "manufacturing", label: "延伸到製造現場" },
  { id: "concept-demo", label: "概念 Demo" },
];

type Feature = {
  title: string;
  body: string;
  notes: string[];
  image: { src: string; width: number; height: number; alt: string };
};

const goldlabFeatures: Feature[] = [
  {
    title: "文章列表",
    body: "編輯日常管理文章的主要頁面。上方統計卡片顯示各狀態的文章數，下方以分頁區分已發佈、草稿與排程、回收桶。",
    notes: ["篩選、排序與每頁筆數集中在同一列", "刪除的文章先移至回收桶，保留 30 天可還原"],
    image: { src: "/assets/admin/goldlab_admin_dashboard.webp", width: 1600, height: 911, alt: "GoldLab 文章管理後台，統計卡片、狀態分頁與篩選列" },
  },
  {
    title: "批次操作",
    body: "勾選文章後，畫面下方會出現操作列，顯示已選篇數及其中已發佈、置頂的數量，方便在執行前確認影響範圍。",
    notes: ["執行前會再次確認篇數", "部分失敗時，分別回報成功與失敗筆數"],
    image: { src: "/assets/admin/goldlab_admin_batch.webp", width: 1600, height: 800, alt: "勾選三篇文章後出現的批次操作列" },
  },
  {
    title: "編輯器與發布檢查",
    body: "內文、SEO 欄位與發布設定集中在同一頁，右側設定欄可收合。發布前檢查列出九個必填項目，未完成時會阻擋發布並列出缺漏欄位。",
    notes: ["作者與發布品牌可存成設定檔重複套用", "結構化資料可隨內容自動同步"],
    image: { src: "/assets/admin/goldlab_admin_editor.webp", width: 1600, height: 1200, alt: "GoldLab 文章編輯器，SEO 摘要與發布前檢查清單" },
  },
  {
    title: "英文版流程",
    body: "中英文對照列在同一張表，英文稿分為九種狀態。中文原文修改後，對應的英文會標示為「中文已更新」，以降低發布過期翻譯的機會。",
    notes: ["中文仍為草稿時，英文可先完成流程，待中文發布後再公開", "每次發布會留下紀錄，可回復至前一版"],
    image: { src: "/assets/admin/goldlab_admin_english.webp", width: 1600, height: 956, alt: "GoldLab 英文版管理，狀態篩選與中英文對照表" },
  },
  {
    title: "AI 草稿審核",
    body: "網站會以 AI 為國際新聞產生短評。當系統偵測到明顯的 AI 語氣，或內容涉及央行官員、政治人物的發言時，短評會先進入此佇列，由人工確認後再決定是否發布。",
    notes: ["每筆會標示進入審核的原因與使用的模型", "每日自動產生的市場分析預設存為草稿"],
    image: { src: "/assets/admin/goldlab_admin_queue.webp", width: 1600, height: 733, alt: "GoldLab 觀察筆記待審佇列，含高敏感標記與核准、拒絕按鈕" },
  },
];

const otherSystems = [
  {
    name: "大內御指 預約與排班後台",
    note: "試做專案",
    body: "管理者、技師、會員分別有各自的入口。管理端首頁呈現當日與近 30 天營收及最新預約，另有技師與休假管理。",
    href: "/work/royal/",
    image: { src: "/assets/royaltouch/royal04.webp", width: 900, height: 573 },
  },
  {
    name: "植園花室 網站管理",
    note: "內容管理後台",
    body: "讓店家自行維護首頁文案與 SEO 資訊。修改後可先預覽草稿，儲存時保留最近 20 個版本，並可匯出備份。",
    href: "/work/zyfloral/",
    image: { src: "/assets/zyfloral/zyfloral04.webp", width: 1024, height: 746 },
  },
  {
    name: "穀意 GoodEats",
    note: "前後端分離規劃",
    body: "React 前台搭配 PHP API，先訂定 API 規格再分別開發，並將後台規劃與開發歷程整理成介紹頁。",
    href: "/work/goodeats/",
    image: { src: "/assets/showgoodeats.webp", width: 900, height: 648 },
  },
];

const methodSteps = [
  { title: "確認使用者與任務", body: "整理使用者、使用時段與常用操作，首頁優先呈現這些操作需要的資訊。" },
  { title: "區分檢視與操作權限", body: "分別列出各角色可檢視與可操作的範圍。沒有權限時，盡量說明原因而非直接隱藏。" },
  { title: "依工作流程安排選單", body: "選單依工作流程排列；列表、詳細、編輯維持一致的層級，以降低學習成本。" },
  { title: "以實際資料測試版面", body: "以較長的標題、空值與大量資料檢查版面，較容易提早發現問題。" },
  { title: "高風險操作加入確認", body: "發布、刪除、批次修改前先顯示影響範圍，並視情況提供復原。" },
  { title: "規劃各種狀態畫面", body: "為載入中、無資料、錯誤與無權限準備對應畫面，並提示可採取的下一步。" },
];

const mappings = [
  { from: "發布前檢查清單", fromNote: "GoldLab", to: "工單或參數送出前的完整性檢查，並提示缺漏欄位" },
  { from: "AI 草稿進人工審核", fromNote: "GoldLab", to: "系統自動判定的結果（例如自動缺陷分類），可設計為經工程師確認後生效" },
  { from: "英文版狀態與回滾", fromNote: "GoldLab", to: "配方或文件版本的流程狀態管理，上游變更時標示受影響項目，並保留回復機制" },
  { from: "批次操作與失敗回報", fromNote: "GoldLab", to: "批次派工或結案前確認範圍，部分失敗時列出未完成項目" },
  { from: "管理者／技師／會員入口", fromNote: "大內御指", to: "依作業員、製程工程師、值班主管等角色區分可檢視資訊與可執行操作" },
  { from: "排班與休假管理", fromNote: "大內御指", to: "輪班排程與交接，讓接班人員查看前一班的事件與處理紀錄" },
  { from: "版本保留與備份", fromNote: "植園花室", to: "設定變更前預覽差異，並保留歷史版本" },
];

export function AdminSystemsCase() {
  return (
    <div className="ac">
      <aside className="ac-aside">
        <AdminCaseToc items={toc} />
      </aside>

      <div className="ac-main">
        <p className="ac-lead">
          這頁整理我參與開發的後台系統，以 GoldLab 為主要案例。GoldLab 是持續更新中的貴金屬資訊網站，前台、編輯後台、API 與部署主要由我負責規劃與開發。後段另外整理其他後台作品、我的規劃方式，以及這些經驗延伸到製造現場的想法。
        </p>

        <section id="goldlab" className="ac-section">
          <header className="ac-section__head">
            <h2>GoldLab 編輯後台</h2>
            <p>
              編輯透過後台管理中英文文章，並審核 AI 產生的短評。網站定期從國際新聞來源取得資料，翻譯後再產生短評；需要確認的內容會保留在後台，待人工審核。
            </p>
            <p className="ac-meta">
              使用技術：React、Vite、Tailwind CSS、Express、JWT，以 Docker 部署於 VPS。
              <a href="https://goldlab.tw/" target="_blank" rel="noopener noreferrer">
                goldlab.tw <ArrowUpRight size={13} />
                <span className="sr-only">（另開新分頁）</span>
              </a>
            </p>
          </header>

          {goldlabFeatures.map((feature, index) => (
            <article className="ac-feature" key={feature.title}>
              <div className="ac-feature__text">
                <span className="ac-feature__index">
                  {index + 1} / {goldlabFeatures.length}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
                <ul>
                  {feature.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
              <ShotLightbox image={feature.image} caption={feature.image.alt} />
            </article>
          ))}

          <div className="ac-ops">
            <h3>系統與維運</h3>
            <p>
              後台以 JWT 驗證身分，並在多次登入失敗後暫時鎖定。另提供健康檢查 API，回報文章、回收桶、備份與快取狀態。部署流程會先備份文章與上傳檔，新版本通過健康檢查後才切換；建置失敗時保留原本的版本。
            </p>
          </div>
        </section>

        <section id="other-systems" className="ac-section">
          <header className="ac-section__head">
            <h2>其他後台</h2>
            <p>規模較小，各自著重不同的管理需求。點選後會在新分頁開啟完整案例。</p>
          </header>
          <div className="ac-others">
            {otherSystems.map((system) => (
              <a className="ac-other" href={system.href} target="_blank" rel="noopener" key={system.name}>
                <span className="ac-other__thumb">
                  <Image src={system.image.src} alt="" width={system.image.width} height={system.image.height} sizes="200px" />
                </span>
                <span className="ac-other__text">
                  <strong>
                    {system.name}
                    <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="sr-only">（另開新分頁）</span>
                  </strong>
                  <em>{system.note}</em>
                  <span>{system.body}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="method" className="ac-section">
          <header className="ac-section__head">
            <h2>後台規劃方式</h2>
            <p>以下是我規劃後台時通常會依序確認的項目。</p>
          </header>
          <ol className="ac-steps">
            {methodSteps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="manufacturing" className="ac-section">
          <header className="ac-section__head">
            <h2>延伸到製造現場</h2>
            <p>
              製造現場的後台通常重視即時狀態、權限分層與追溯紀錄。以下整理既有作品中的做法，以及可延伸參考的方向；實際應用仍需依現場流程與規範調整。
            </p>
          </header>
          <div className="ac-table-wrap">
            <table className="ac-table">
              <thead>
                <tr>
                  <th scope="col">既有作品中的做法</th>
                  <th scope="col">可延伸參考的情境</th>
                </tr>
              </thead>
              <tbody>
                {mappings.map((row) => (
                  <tr key={row.from}>
                    <td>
                      {row.from}
                      <small>{row.fromNote}</small>
                    </td>
                    <td>{row.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="concept-demo" className="ac-section">
          <header className="ac-section__head">
            <h2>概念 Demo：設備監控主控台</h2>
            <p>
              以下是依上述想法製作的可操作畫面。將右上角身分切換為「作業員」並點選異常機台時，確認按鈕會停用；切換為「值班主管」後，可將機台轉為保養，執行前會再次確認。
            </p>
          </header>
          <FabConsoleDemo />
          <p className="ac-note">機台、批號與告警都是前端隨機產生的模擬資料，與任何公司的系統無關。</p>
        </section>
      </div>
    </div>
  );
}
