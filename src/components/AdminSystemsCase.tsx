import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AdminCaseToc, type TocItem } from "@/components/AdminCaseToc";
import { FabConsoleDemo } from "@/components/FabConsoleDemo";
import { ShotLightbox } from "@/components/ShotLightbox";

const toc: TocItem[] = [
  { id: "goldlab", label: "GoldLab 編輯後台" },
  { id: "other-systems", label: "其他後台" },
  { id: "method", label: "我怎麼規劃後台" },
  { id: "manufacturing", label: "放到製造現場" },
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
    body: "編輯每天最常停留的頁面。上方四個數字回答「現在有多少要處理」，下方用狀態分頁切出已發佈、草稿與排程、回收桶。",
    notes: ["篩選、排序與每頁筆數放在同一列，不必展開進階搜尋", "刪除先進回收桶，保留 30 天可以還原"],
    image: { src: "/assets/admin/goldlab_admin_dashboard.webp", width: 1600, height: 911, alt: "GoldLab 文章管理後台，統計卡片、狀態分頁與篩選列" },
  },
  {
    title: "批次操作",
    body: "勾選後操作列從底部浮出，顯示選了幾篇、其中幾篇已發佈或置頂，讓人在按下去之前知道會影響什麼。",
    notes: ["執行前再確認一次篇數", "部分失敗會分開回報成功與失敗筆數，不會只顯示「完成」"],
    image: { src: "/assets/admin/goldlab_admin_batch.webp", width: 1600, height: 800, alt: "勾選三篇文章後出現的批次操作列" },
  },
  {
    title: "編輯器與發布檢查",
    body: "內文、SEO 欄位與發布設定放在同一頁，右側設定欄可以收合。底部的發布前檢查列出九個必填項目，缺一項就不能發布，並直接告訴編輯缺哪一欄。",
    notes: ["作者與發布品牌可存成設定檔，一鍵套用", "結構化資料跟著內容自動同步"],
    image: { src: "/assets/admin/goldlab_admin_editor.webp", width: 1600, height: 1200, alt: "GoldLab 文章編輯器，SEO 摘要與發布前檢查清單" },
  },
  {
    title: "英文版流程",
    body: "中英文對照放在同一張表。英文稿有九種狀態，中文原文一改，對應的英文會自動標成「中文已更新」，不會有人在不知情下發布過期翻譯。",
    notes: ["中文還是草稿時，英文可以先走完流程，等中文發布後一起公開", "每次發布都留紀錄，可以回到上一版"],
    image: { src: "/assets/admin/goldlab_admin_english.webp", width: 1600, height: 956, alt: "GoldLab 英文版管理，狀態篩選與中英文對照表" },
  },
  {
    title: "AI 草稿審核",
    body: "網站會用 AI 替國際新聞寫短評。語氣太像 AI，或內容牽涉央行官員、政治人物的發言時，這則短評不會直接上線，而是進到這個佇列等人判斷。",
    notes: ["每筆標出被攔下的原因與使用的模型", "每天自動產生的市場分析一律先存草稿"],
    image: { src: "/assets/admin/goldlab_admin_queue.webp", width: 1600, height: 733, alt: "GoldLab 觀察筆記待審佇列，含高敏感標記與核准、拒絕按鈕" },
  },
];

const otherSystems = [
  {
    name: "大內御指 預約與排班後台",
    note: "試做專案",
    body: "管理者、技師、會員分成三個入口。管理端以當日與近 30 天營收、最新預約為首頁，另有技師管理與休假管理。",
    href: "/work/royal/",
    image: { src: "/assets/royaltouch/royal04.webp", width: 900, height: 573 },
  },
  {
    name: "植園花室 網站管理",
    note: "內容管理後台",
    body: "店家自己改首頁文案與 SEO 資訊。改完可以先預覽草稿，正式儲存後自動保留最近 20 個版本，也能匯出備份。",
    href: "/work/zyfloral/",
    image: { src: "/assets/zyfloral/zyfloral04.webp", width: 1024, height: 746 },
  },
  {
    name: "穀意 GoodEats",
    note: "前後端分離規劃",
    body: "React 前台搭配 PHP API，先定好 API 契約再分頭開發，並把後台規劃與開發歷程整理成介紹站。",
    href: "/work/goodeats/",
    image: { src: "/assets/showgoodeats.webp", width: 900, height: 648 },
  },
];

const methodSteps = [
  { title: "先問誰在用", body: "列出使用者、使用時段與最常做的三件事，首頁只放這三件事需要的資訊。" },
  { title: "分開「看」與「做」", body: "每個角色看得到什麼、能按什麼分別列表。沒權限的按鈕要說明原因，不是直接藏起來。" },
  { title: "依任務分選單", body: "選單照工作流程排，不照資料表排。列表、詳細、編輯三層固定，換頁不用重新學。" },
  { title: "用真實資料排版", body: "拿超長標題、空值、上千筆資料去測版面，漂亮的假資料看不出問題。" },
  { title: "高風險動作加關卡", body: "發布、刪除、批次修改都要先顯示影響範圍；能復原的就提供復原。" },
  { title: "補齊各種狀態", body: "載入中、沒有資料、出錯、沒有權限都要有畫面，並告訴使用者下一步。" },
];

const mappings = [
  { from: "發布前檢查清單", fromNote: "GoldLab", to: "工單或參數送出前的完整性檢查，不完整就擋下並指出缺哪一欄" },
  { from: "AI 草稿進人工審核", fromNote: "GoldLab", to: "系統自動判定的結果（例如自動缺陷分類）由工程師確認後才生效" },
  { from: "英文版狀態與回滾", fromNote: "GoldLab", to: "配方、文件版本的流程狀態，上游變更時標出受影響項目，可回到前一版" },
  { from: "批次操作與失敗回報", fromNote: "GoldLab", to: "批次派工或結案前先確認範圍，部分失敗時列出哪幾筆沒成功" },
  { from: "管理者／技師／會員入口", fromNote: "大內御指", to: "作業員、製程工程師、值班主管看到的資訊與能做的操作不同" },
  { from: "排班與休假管理", fromNote: "大內御指", to: "輪班排程與交接，下一班能看到上一班留下的事件與處理紀錄" },
  { from: "版本保留與備份", fromNote: "植園花室", to: "設定變更先預覽差異再套用，保留歷史版本" },
];

export function AdminSystemsCase() {
  return (
    <div className="ac">
      <aside className="ac-aside">
        <AdminCaseToc items={toc} />
      </aside>

      <div className="ac-main">
        <p className="ac-lead">
          這頁整理我做過的後台。主角是 GoldLab：一個仍在營運的貴金屬資訊網站，前台、編輯後台、API 到部署都是我做的。後面再補上其他幾套後台、我規劃後台的方式，以及這些經驗放到製造現場會怎麼用。
        </p>

        <section id="goldlab" className="ac-section">
          <header className="ac-section__head">
            <h2>GoldLab 編輯後台</h2>
            <p>
              編輯在這裡管理中英文文章、審核 AI 產生的短評。網站每 15 分鐘從 17 個國際新聞來源抓資料，翻譯後交給 AI 寫短評，有疑慮的內容會停在後台等人確認。
            </p>
            <p className="ac-meta">
              React、Vite、Tailwind CSS、Express、JWT，部署在自己的 VPS（Docker）。
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
            <h3>看不到的部分</h3>
            <p>
              後台用 JWT 驗證，同一個 IP 登入失敗五次會鎖十五分鐘。另有一支健康檢查 API，回報文章數、回收桶、備份與快取狀態。部署時先備份文章與上傳檔，新版本通過健康檢查才切換，建置失敗也不會影響線上網站。
            </p>
          </div>
        </section>

        <section id="other-systems" className="ac-section">
          <header className="ac-section__head">
            <h2>其他後台</h2>
            <p>規模較小，但各自處理了不同的問題。點選會在新分頁開啟完整案例，這頁會留著。</p>
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
            <h2>我怎麼規劃後台</h2>
            <p>做了幾套之後，固定會照這個順序想一遍。</p>
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
            <h2>放到製造現場</h2>
            <p>
              製造現場的後台更在意即時狀態、權限分層和事後追溯。這些需求在我做過的系統裡都有對應的做法：
            </p>
          </header>
          <div className="ac-table-wrap">
            <table className="ac-table">
              <thead>
                <tr>
                  <th scope="col">做過的</th>
                  <th scope="col">可以怎麼用</th>
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
              為了驗證上面的想法，我做了這個可以操作的畫面。可以試試把右上角的身分切成「作業員」再點一台異常機台，確認按鈕會鎖住；切成「值班主管」才能把機台轉為保養，而且要再確認一次。
            </p>
          </header>
          <FabConsoleDemo />
          <p className="ac-note">機台、批號與告警都是前端隨機產生的模擬資料，與任何公司的系統無關。</p>
        </section>
      </div>
    </div>
  );
}
