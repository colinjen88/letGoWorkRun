"use client";

import { useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { auditPages } from "./elephant-clinic-audits";
import "./elephant-clinic-case.css";

const base = "/assets/elephant-clinic";
const reportUrl = base + "/reports/lighthouse/index.html";

const contentProposals = [
  {
    version: "版本一",
    label: "原生卡片",
    name: "原生卡片微調版",
    summary:
      "沿用原本的文章卡片網格，以不同色調和標籤標出專區文章，讓讀者沿著熟悉的列表瀏覽。",
  },
  {
    version: "版本二",
    label: "分類區塊",
    name: "清晰分類區塊版",
    summary: "依精雕工藝、材質解析等主題分區，方便讀者直接比較感興趣的項目。",
  },
  {
    version: "版本三",
    label: "特刊導讀",
    name: "特刊導讀雜誌版",
    summary: "以一篇焦點特刊和三篇階段式閱讀，帶讀者從了解議題走到專區入口。",
  },
  {
    version: "版本四",
    label: "專區微門戶",
    name: "專區簡化微門戶",
    summary: "在衛教頁集中呈現六個專區主題和精選文章，讀者可直接進入對應內容。",
  },
];

const heroProposals = [
  {
    number: "一",
    name: "治療項目快選",
    summary: "把四項療程放到主視覺下緣，手機先給療程與預約，再顯示照片。",
    desktop: "縮短主視覺，把四個療程入口整合到照片下緣。",
    mobile: "療程與預約放在照片前，右側快捷入口可以收合。",
  },
  {
    number: "二",
    name: "項目膠囊",
    summary: "保留大幅品牌照片與標語，用緊湊的膠囊入口補上療程導覽。",
    desktop: "縮短全幅照片，在首屏加入療程膠囊和預約入口。",
    mobile: "兩欄膠囊集中顯示項目，預約入口位於同一區塊。",
  },
  {
    number: "三",
    name: "雙欄目錄",
    summary: "用四列文字與線條圖示讓療程易掃讀，右側以醫師肖像保留診所辨識度。",
    desktop: "左側呈現四項目錄，右側保留醫師肖像和低對比診間背景。",
    mobile: "四項清單搭配線條圖示，右側只露出細窄的快捷標籤。",
  },
  {
    number: "四",
    name: "浮島分流",
    summary: "用四張卡片整理主題，讓還在探索的訪客按外觀、材質或功能需求選擇。",
    desktop: "四張卡片呈現不同需求，分流按鈕用來聚焦相關項目。",
    mobile: "兩欄卡片顯示療程分類，可按需求切換高亮，右側保留細窄快捷標籤。",
  },
];

const phases = [
  { key: "before", label: "Before", description: "優化前" },
  { key: "after", label: "After", description: "優化後" },
] as const;

const devices = [
  { key: "desktop", label: "桌機", comparisonLabel: "網頁版" },
  { key: "mobile", label: "手機", comparisonLabel: "手機版" },
] as const;

export function ElephantClinicCase() {
  const [auditIndex, setAuditIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [zoom, setZoom] = useState<{ src: string; alt: string }>();
  const dialog = useRef<HTMLDialogElement>(null);
  const comparison = useRef<HTMLHeadingElement>(null);
  const heroButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ id: number; x: number; y: number } | null>(null);
  const ignoreZoomUntil = useRef(0);

  const audit = auditPages[auditIndex];
  const content = contentProposals[contentIndex];
  const hero = heroProposals[heroIndex];
  const deviceLabel = device === "mobile" ? "手機版" : "網頁版";

  function stepAudit(direction: number) {
    setAuditIndex(
      (current) =>
        (current + direction + auditPages.length) % auditPages.length,
    );
  }

  function startSwipe(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" && event.isPrimary) {
      touchStart.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
    }
  }

  function endSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = touchStart.current;
    if (start?.id !== event.pointerId) return;
    touchStart.current = null;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
    ignoreZoomUntil.current = performance.now() + 350;
    stepAudit(dx < 0 ? 1 : -1);
  }

  function openImage(event: MouseEvent<HTMLButtonElement>) {
    if (
      event.detail &&
      event.currentTarget.classList.contains("audit-image") &&
      performance.now() < ignoreZoomUntil.current
    )
      return;
    const image = event.currentTarget.querySelector("img");
    if (!image || !dialog.current) return;
    setZoom({ src: image.src, alt: image.alt });
    dialog.current.showModal();
    dialog.current.scrollTop = 0;
  }

  function jumpToComparison(index: number) {
    setHeroIndex(index);
    comparison.current?.scrollIntoView({ block: "start" });
    heroButtons.current[index]?.focus({ preventScroll: true });
  }

  return (
    <div className="elephant-case">
      <figure className="hero-art">
        <div className="cover-desktop">
          <div className="browser-bar">
            <span />
            <span />
            <span />
            <small>性功能專區 · 桌機原型</small>
          </div>
          <img
            src={base + "/assets/ux-v3-desktop.webp"}
            alt="性功能專區桌機設計，左側為療程目錄，右側為醫師肖像"
            width={1215}
            height={678}
            fetchPriority="high"
          />
        </div>
        <img
          className="cover-phone"
          src={base + "/assets/ux-v1-mobile.webp"}
          alt="手機原型的療程快選與浮動聯絡入口"
          width={375}
          height={812}
        />
        <figcaption>性功能專區首屏設計原型</figcaption>
      </figure>
      <nav className="case-chapters" aria-label="案例章節">
        <a href="#performance">效能</a>
        <a href="#seo">技術 SEO</a>
        <a href="#content">內容整合</a>
        <a href="#experience">首屏與導覽</a>
        <a href="#delivery">發布驗證</a>
      </nav>
      <dl className="proof-strip" aria-label="案例重點">
        <div>
          <dt>手機首頁 Lighthouse</dt>
          <dd>
            55 <span>→</span> 94
          </dd>
          <small>同組歷史量測</small>
        </div>
        <div>
          <dt>行動版 LCP 待改善網址</dt>
          <dd>
            280 <span>→</span> 0
          </dd>
          <small>Search Console 真實使用者資料</small>
        </div>
        <div>
          <dt>內容與首屏設計</dt>
          <dd>
            8 <span>款</span>
          </dd>
          <small>兩組各四款比較原型</small>
        </div>
      </dl>

      <section className="case-section" id="performance">
        <div className="section-heading">
          <div>
            <p className="case-label">
              效能優化 <span className="status">正式站已上線</span>
            </p>
            <h2>先讓手機首屏顯示內容</h2>
          </div>
          <p>
            三輪優化在兩週內上線。先用 Lighthouse 與 Chrome
            效能追蹤找出真正的瓶頸，再以 Search Console 的真實使用者資料確認訪客端也變快。
          </p>
        </div>
        <aside className="strategy-note" aria-labelledby="strategy-title">
          <h3 id="strategy-title">0907 優化策略</h3>
          <div>
            <p>
              依輕重緩急，優先處理<strong>影響大、能快速改善的瓶頸</strong>
              。先改善訪客的載入體驗，同步處理與搜尋可見度有關的技術問題。短期修正穩定後，再規劃重整程式架構，持續改善效能、穩定性與安全性。
            </p>
            <a
              className="text-link"
              href={reportUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              參考 0907 完整效能對照與改進報告 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
        <aside className="strategy-note finding-note" aria-labelledby="finding-title">
          <h3 id="finding-title">先證明不是下載量的問題</h3>
          <div>
            <p>
              接手時首頁冷載入約 3 MB，其中近九成是中文字型。我先做了傳輸壓縮、WebP
              與字型精簡，頁面重量降到原本的 12%，手機分數卻只從 52 分升到 55
              分。這個結果推翻了「檔案太大」的假設。
            </p>
            <p>
              我改看渲染流程，發現全站樣式讓整頁先保持透明，要等所有 JavaScript
              下載、執行完才淡入。在行動網路與較慢的手機上，訪客會先看到十秒級的空白。我把「何時顯示」改由
              CSS 控制，手機版直接略過開場遮罩，分數才真正提升到 90 分以上。
            </p>
          </div>
        </aside>
        <div
          className="audit-box"
          onKeyDown={(event) => {
            if (
              !(event.target instanceof HTMLElement) ||
              !event.target.closest(".audit-stage, .audit-switcher")
            )
              return;
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            stepAudit(event.key === "ArrowLeft" ? -1 : 1);
          }}
        >
          <div className="audit-toolbar">
            <div>
              <h3>八種頁型的前後量測</h3>
              <p>2026 年 9 月 7–8 日 · 第一輪上線後 · Chrome Lighthouse 歷史截圖</p>
            </div>
            <div className="audit-page-tools">
              <div className="audit-page-picker">
                <label htmlFor="audit-page">比較頁型</label>
                <select
                  id="audit-page"
                  value={auditIndex}
                  onChange={(event) =>
                    setAuditIndex(Number(event.target.value))
                  }
                >
                  {auditPages.map((page, index) => (
                    <option key={page.id} value={index}>
                      {page.title}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="audit-switcher"
                role="group"
                aria-label="切換比較頁型"
              >
                <button type="button" onClick={() => stepAudit(-1)}>
                  <span aria-hidden="true" />
                  上一頁型
                </button>
                <span
                  className="audit-position"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="visually-hidden">{audit.title}，</span>
                  {auditIndex + 1} / {auditPages.length}
                </span>
                <button type="button" onClick={() => stepAudit(1)}>
                  下一頁型
                  <span aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div
            className="audit-stage"
            onPointerDown={startSwipe}
            onPointerUp={endSwipe}
            onPointerCancel={() => {
              touchStart.current = null;
            }}
          >
            <div className="audit-grid">
              {phases.map(({ key, label, description }) => {
                const data = audit[key];
                const alt =
                  audit.title + " " + description + " Lighthouse 截圖";
                return (
                  <article className={"audit-result " + key} key={key}>
                    <div className="audit-summary">
                      <h4 className="audit-phase">{label}</h4>
                      <div>
                        <span className="audit-score-label">
                          {description}評分
                        </span>
                        <strong className="audit-score">
                          {data.score}
                          <small>分</small>
                        </strong>
                      </div>
                      <dl>
                        <div>
                          <dt>首次內容繪製</dt>
                          <dd>
                            {data.fcp.slice(0, -1)}
                            <small>秒</small>
                          </dd>
                        </div>
                        <div>
                          <dt>最大內容繪製</dt>
                          <dd>
                            {data.lcp.slice(0, -1)}
                            <small>秒</small>
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <button
                      className="image-button audit-image"
                      type="button"
                      onClick={openImage}
                      aria-label={"放大" + alt}
                    >
                      <img
                        src={base + "/reports/lighthouse/" + data.preview}
                        alt={alt}
                        loading="lazy"
                        draggable={false}
                      />
                    </button>
                  </article>
                );
              })}
              <div className="comparison-direction" aria-hidden="true" />
            </div>
          </div>
          <div className="audit-footer">
            <p>
              上方為原始比較報告的單次截圖，改前在一般視窗、改後在無痕視窗量測。分數改善另有其他量測支持：同日以
              Lighthouse 在相同條件連跑三次，改前中位數為 55 分；另一次正式站無痕複測為{" "}
              <strong>93 分</strong>。截圖中「最佳做法」的差異來自無痕視窗封鎖第三方
              Cookie，不列為成果。
            </p>
          </div>
        </div>
        <div className="detail-grid">
          <article>
            <h3>解除首屏等待</h3>
            <p>
              改由 CSS 控制頁面何時顯示，手機版略過開場遮罩，不必等 JavaScript
              跑完才看到內容。
            </p>
          </article>
          <article>
            <h3>壓縮與字型</h3>
            <p>
              啟用傳輸壓縮與長效快取，內文改用裝置內建黑體。首頁冷載入從約 3 MB
              降到 371 KB。
            </p>
          </article>
          <article>
            <h3>延後首屏外排版</h3>
            <p>手機首頁的新聞與影音區塊接近視窗時才排版，並保留預估高度避免跳動。</p>
          </article>
        </div>

        <div className="field-data">
          <figure>
            <button
              className="image-button field-shot"
              type="button"
              onClick={openImage}
              aria-label="放大 Search Console 核心網頁指標行動版報表"
            >
              <img
                src={base + "/assets/gsc-cwv-mobile.webp"}
                alt="Search Console 核心網頁指標行動版報表：280 個網址全數轉為良好，LCP 超過 2.5 秒的網址為 0"
                width={1005}
                height={968}
                loading="lazy"
              />
            </button>
            <figcaption>Search Console · 網站使用體驗核心指標 · 行動裝置</figcaption>
          </figure>
          <div>
            <h3>真實訪客也變快了</h3>
            <p>
              Lighthouse 是實驗室分數，我同時追蹤 Search Console
              的核心網頁指標。這份報表採用 Chrome 真實使用者 28
              天的資料，優化前列出約 280 個行動版 LCP 超過 2.5
              秒的網址，多數是衛教長文。
            </p>
            <p>
              第二輪修正上線後，我先在正式站用手機節流複測代表頁，LCP 約 1.4
              秒。幾天後報表的最新資料點整批轉為良好，LCP 待改善的網址歸零。
            </p>
          </div>
        </div>

        <h3 className="rounds-heading">之後兩輪：長文、伺服器與每頁都要跑的程式</h3>
        <div className="rounds-grid">
          <article>
            <span className="round-tag">第二輪</span>
            <h4>衛教長文延後排版</h4>
            <p>
              效能追蹤顯示，手機第一次排版會把兩萬多像素高的整篇文章一次排完。我讓畫面外段落延後排版，並在伺服器端判斷哪些元素可以安全延後。最慢的一篇手機
              LCP 從 2.5 秒降到 1.5 秒，102 頁逐一比對版面與像素都沒有改變。
            </p>
          </article>
          <article>
            <span className="round-tag">第二輪</span>
            <h4>頁面快取</h4>
            <p>
              瀏覽過的頁面在框架啟動前直接送出，伺服器處理時間從約 170 毫秒降到約 20
              毫秒。後台存檔時立即清除，預約與搜尋頁不快取，也保留一個設定就能停用的開關。
            </p>
          </article>
          <article>
            <span className="round-tag">第二輪</span>
            <h4>字型與圖片</h4>
            <p>
              標題字型改成只下載該頁用到的字，每頁從最多 1.3 MB 降到 74 KB 以內。首頁醫師圖由
              923 KB 的 PNG 改為三種響應式 WebP，手機只下載約 20 KB；後台新上傳的圖片也會自動產生
              WebP。
            </p>
          </article>
          <article>
            <span className="round-tag">第三輪</span>
            <h4>每頁都要跑的程式</h4>
            <p>
              每頁原本載入兩份 jQuery，跑馬燈也為了水平循環下載整套動畫函式庫。移除重複、改用瀏覽器原生動畫，影片改成先顯示縮圖、按下才載入播放器。各頁腳本執行時間減少
              16% 到 61%。
            </p>
          </article>
        </div>
      </section>

      <section className="seo-section" id="seo">
        <div className="case-section">
          <div className="section-heading">
            <div>
              <p className="case-label">
                技術 SEO <span className="status">正式站已上線</span>
              </p>
              <h2>讓搜尋引擎辨識正確的網址與內容</h2>
            </div>
            <p>
              從 Search Console
              索引報表與站內抽查定位問題，逐項修正轉址、索引指令、網站地圖與結構化資料。
            </p>
          </div>
          <div className="seo-list">
            <article>
              <h3>重複網址</h3>
              <div>
                <span className="phase-tag">Before · 改前</span>
                <p>分身網址與重複列表各自指向自己，分頁也共用相同標題。</p>
              </div>
              <div>
                <span className="phase-tag phase-after">After · 改後</span>
                <p>
                  分身 301 導回正式路徑，統一列表 canonical，第 2
                  頁起加入頁碼。上線確認分身一次轉址、正式頁回 200。
                </p>
              </div>
            </article>
            <article>
              <h3>索引訊號</h3>
              <div>
                <span className="phase-tag">Before · 改前</span>
                <p>
                  robots.txt 擋住站內搜尋頁，Google 讀不到頁內的
                  noindex。網站地圖也列出空分類。
                </p>
              </div>
              <div>
                <span className="phase-tag phase-after">After · 改後</span>
                <p>
                  Google 可讀到搜尋頁的 noindex，sitemap
                  依發布狀態排除空分類。上線後核對 robots 指令與列表 canonical。
                </p>
              </div>
            </article>
            <article>
              <h3>結構化資料</h3>
              <div>
                <span className="phase-tag">Before · 改前</span>
                <p>
                  無封面文章的圖片欄位指向上傳目錄。作者欄混入診所名稱，診所節點缺少部分資訊。
                </p>
              </div>
              <div>
                <span className="phase-tag phase-after">After · 改後</span>
                <p>
                  修正 91
                  篇文章的圖片網址，補上醫師作者關聯及診所資料。上線後抽查 7 頁
                  JSON-LD 可正常解析。
                </p>
              </div>
            </article>
            <article>
              <h3>主機層分身與安全標頭</h3>
              <div>
                <span className="phase-tag">Before · 改前</span>
                <p>
                  網址結尾多一個斜線會被轉到 /public/，底下整份網站都能開；郵件子網域也會顯示整個官網。回應沒有任何安全標頭。
                </p>
              </div>
              <div>
                <span className="phase-tag phase-after">After · 改後</span>
                <p>
                  分身網址與郵件子網域一律 301
                  回正式網址，加上三個安全標頭。上線前先核對站內所有腳本與樣式表的檔案類型，確認不會被擋下；可能讓憑證問題直接斷站的
                  HSTS 交由主管決定。
                </p>
              </div>
            </article>
          </div>
          <div className="research-note">
            <div className="research-share">
              <strong>GSC</strong>
              <span>搜尋表現分析</span>
            </div>
            <p>
              <strong>搜尋資料如何影響決策</strong>
              　我把半年的搜尋成效與文章發布時間對照，發現近期成長主要來自新發布的衛教長文，而不是網站技術調整。因此我把技術修正定位在「讓好內容被正確辨識」，並把內容規劃和導覽入口放在讀者最常從搜尋抵達的衛教頁面。讀報表時，我也先合併
              Google「跳到段落」產生的錨點網址，避免高估單頁曝光。
            </p>
          </div>
        </div>
      </section>

      <section className="case-section" id="content">
        <div className="section-heading">
          <div>
            <p className="case-label">
              性功能內容整合{" "}
              <span className="status staging">版本三已實作 · 測試站驗收中</span>
            </p>
            <h2>四選一設計提案</h2>
          </div>
          <p>
            以衛教的「性功能」分類為起點，設計四種通往專區的方式。選一款即可查看桌機與手機畫面。
          </p>
        </div>
        <div className="proposal-gallery">
          <div
            className="picker proposal-picker"
            role="group"
            aria-label="四款內容整合提案"
          >
            {contentProposals.map((proposal, index) => (
              <button
                key={proposal.version}
                type="button"
                aria-pressed={index === contentIndex}
                onClick={() => setContentIndex(index)}
              >
                <span>{proposal.version}</span>
                {proposal.label}
              </button>
            ))}
          </div>
          <div className="gallery-intro" aria-live="polite">
            <h3>{content.name}</h3>
            <p>{content.summary}</p>
          </div>
          <div className="gallery-pair">
            {devices.map(({ key, label }) => (
              <figure key={key}>
                <figcaption>{label}</figcaption>
                <button
                  className={"image-button gallery-" + key}
                  type="button"
                  onClick={openImage}
                  aria-label={"放大" + content.name + label + "提案"}
                >
                  <img
                    src={
                      base +
                      "/assets/content-v" +
                      (contentIndex + 1) +
                      "-" +
                      key +
                      ".webp"
                    }
                    alt={content.name + label + "提案"}
                    loading="lazy"
                  />
                </button>
              </figure>
            ))}
          </div>
        </div>
        <p className="section-note">
          主管從四款中偏好版本一與版本三，我先實作版本三。設計稿原本用專刊區塊取代文章列表，但這個分類頁已有穩定的搜尋流量，所以我保留原本的列表、分頁與標準網址，只在第一頁上方加入專刊導讀。目前已部署到測試站，等待驗收與文案確認後上線。
        </p>
      </section>

      <section className="ux-section" id="experience">
        <div className="case-section">
          <div className="section-heading">
            <div>
              <p className="case-label">
                首屏與導覽 <span className="status prototype">設計原型</span>
              </p>
              <h2>進頁就能找到療程</h2>
            </div>
            <p>
              我主動設計四套桌機與手機方案，讓診所可以比較如何呈現形象照、讓療程更快被找到，以及要不要加入需求分流。目前等待選案。
            </p>
          </div>
          <h3 className="ux-showcase-heading">四款首屏方案</h3>
          <div className="ux-options">
            {heroProposals.map((proposal, index) => (
              <article className="ux-option" key={proposal.name}>
                <div className="option-title">
                  <span>版本{proposal.number}</span>
                  <h4>{proposal.name}</h4>
                </div>
                <p>{proposal.summary}</p>
                <div className="option-views">
                  {devices.map(({ key, label }) => (
                    <figure key={key}>
                      <button
                        className={"image-button option-" + key}
                        type="button"
                        onClick={openImage}
                        aria-label={"放大" + proposal.name + label + "原型"}
                      >
                        <img
                          src={
                            base +
                            "/assets/ux-v" +
                            (index + 1) +
                            "-" +
                            key +
                            ".webp"
                          }
                          alt={proposal.name + label + "原型"}
                          loading="lazy"
                        />
                      </button>
                      <figcaption>{label}</figcaption>
                    </figure>
                  ))}
                </div>
                <button
                  className="option-compare"
                  type="button"
                  onClick={() => jumpToComparison(index)}
                  aria-label={proposal.name + "和原版比較"}
                >
                  和原版比較 <span aria-hidden="true">↓</span>
                </button>
              </article>
            ))}
          </div>
          <h3
            className="ux-showcase-heading compare-section-heading"
            id="ux-comparison"
            ref={comparison}
          >
            與原版並排比較
          </h3>
          <div className="proposal-gallery ux-compare" data-device={device}>
            <div className="ux-controls">
              <div
                className="picker ux-proposal-picker"
                role="group"
                aria-label="改善後的首屏設計"
              >
                {heroProposals.map((proposal, index) => (
                  <button
                    key={proposal.name}
                    ref={(button) => {
                      heroButtons.current[index] = button;
                    }}
                    type="button"
                    aria-pressed={index === heroIndex}
                    onClick={() => setHeroIndex(index)}
                  >
                    <span>優化提案{proposal.number}</span>
                    <strong>{proposal.name}</strong>
                  </button>
                ))}
              </div>
              <div
                className="picker ux-device-picker"
                role="group"
                aria-label="比較裝置"
              >
                {devices.map(({ key, comparisonLabel }) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={key === device}
                    onClick={() => setDevice(key)}
                  >
                    {comparisonLabel}
                  </button>
                ))}
              </div>
            </div>
            <div className="ux-compare-pair" aria-live="polite">
              <figure>
                <div className="ux-compare-heading">
                  <span className="phase-tag">Before · 改前</span>
                  <h4>官網原畫面</h4>
                </div>
                <button
                  className="image-button compare-shot compare-shot-original"
                  type="button"
                  onClick={openImage}
                  aria-label={"放大官網原畫面" + deviceLabel}
                >
                  <span className="compare-phone-status" aria-hidden="true">
                    <span>9:41</span>
                    <span className="compare-phone-battery" />
                  </span>
                  <span className="compare-phone-screen">
                    <span className="compare-screen-content">
                      <img
                        src={base + "/assets/ux-original-" + device + ".webp"}
                        alt={"性功能專區改善前" + deviceLabel + "原畫面"}
                        loading="lazy"
                      />
                      <span className="ux-overlap" aria-hidden="true" />
                    </span>
                  </span>
                </button>
                <figcaption>
                  {device === "mobile"
                    ? "右側固定選單遮住標語與圖文，療程入口要往下捲才看得到。"
                    : "大圖占住首屏，畫面只看到標語與醫師照片，療程項目在下一屏。"}
                </figcaption>
              </figure>
              <div className="comparison-direction" aria-hidden="true" />
              <figure>
                <div className="ux-compare-heading">
                  <span className="phase-tag phase-after">
                    After · 設計原型
                  </span>
                  <h4>{hero.name}</h4>
                </div>
                <button
                  className="image-button compare-shot"
                  type="button"
                  onClick={openImage}
                  aria-label={"放大" + hero.name + deviceLabel + "原型"}
                >
                  <img
                    src={
                      base +
                      "/assets/ux-v" +
                      (heroIndex + 1) +
                      "-" +
                      device +
                      ".webp"
                    }
                    alt={
                      "性功能專區改善後" + deviceLabel + "原型，" + hero.name
                    }
                    loading="lazy"
                  />
                </button>
                <figcaption>{hero[device]}</figcaption>
              </figure>
            </div>
          </div>
          <p className="ux-notes">
            四款原型共用搜尋與主選單，並規劃六張主題卡、門診時段與手機快捷選單。
          </p>
        </div>
      </section>

      <section className="case-section" id="delivery">
        <div className="section-heading">
          <div>
            <p className="case-label">
              維運與上線驗證 <span className="status">正式站已上線</span>
            </p>
            <h2>讓改動可以驗證，也可以回退</h2>
          </div>
          <p>
            接手時網站靠 FTP
            手動上傳，沒人能回答正式站跑的是哪個版本、這次有沒有漏傳。我先補上版本控管、測試站與部署工具，再開始改網站。
          </p>
        </div>
        <div className="delivery-notes">
          <article>
            <h3>從手動拖檔到可回退的發布</h3>
            <p>
              部署工具預設只列出差異，確認後才上傳；上傳前備份即將被覆蓋的主機檔案，完成後自動檢查關鍵路由與
              SEO 標籤。第一次比對主機時，我發現近千個檔案曾被 FTP
              文字模式改壞行尾。網站表面正常，但版本紀錄已不等於線上內容，我逐檔修復到與正式站逐位元組一致。
            </p>
          </article>
          <article>
            <h3>重建 SCSS 原始檔</h3>
            <p>
              前台樣式原本只有一份壓縮成一行的
              CSS，任何兩項改動同時碰到它就無法合併。我依 source map 把 957
              條規則還原成 22 個 SCSS 檔，逐條比對四千多項宣告只差 5
              處等價寫法，再用桌機與手機截圖比對正式站 11 種頁面。CI
              會重新編譯比對，直接改 CSS 會被擋下。
            </p>
          </article>
          <article>
            <h3>出錯之後補上的驗證</h3>
            <p>
              第一輪上線時出過兩次狀況：圖片被拉長，以及去背人像變成黑底，兩次都在十幾分鐘內還原或修正。原本的檢查只確認檔案有效、頁面回應正常，沒有人真的看畫面。之後凡是影響版面或影像的改動，我都加上截圖或像素比對才上線。
            </p>
          </article>
        </div>
        <ol className="delivery-steps">
          <li>
            <strong>本機驗證</strong>
            <span>冒煙測試、Blade 語法與 SCSS 編譯檢查</span>
          </li>
          <li>
            <strong>測試站比對</strong>
            <span>確認關鍵路由、圖片與桌機／手機畫面</span>
          </li>
          <li>
            <strong>備份後發布</strong>
            <span>核對部署差異與可回退版本</span>
          </li>
          <li>
            <strong>正式站複驗</strong>
            <span>確認路由、索引指令與結構化資料</span>
          </li>
        </ol>
        <aside className="strategy-note collab-note" aria-labelledby="collab-title">
          <h3 id="collab-title">我和 AI 工具的分工</h3>
          <div>
            <p>
              這個專案由我獨立負責，包括問題判斷、方案取捨、驗收與上線決定。我先訂好
              AI
              的權限：可以讀取、分析、在分支上修改程式與部署到測試站；碰正式站資料庫、登入後台、更換密碼一律由我執行。
            </p>
            <p>
              <strong>Claude</strong>{" "}
              負責大部分的診斷、實作與文件，也覆核其他工具的成果，不採信交接說明、逐項重測。
              <strong>Codex</strong>{" "}
              實作第一輪的圖片與手機首屏改善，也做過正式站唯讀巡檢與重複文章的搜尋資料比對。移除
              jQuery 前，我請 Gemini 依調查計畫全面盤點，再由 Claude
              覆核並修正過度樂觀的結論。正式站的每次發布都由我核准，九月中旬起部署指令也由我本人執行。
            </p>
          </div>
        </aside>
      </section>

      <dialog
        className="image-dialog"
        ref={dialog}
        aria-label={zoom?.alt ?? "素材預覽"}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <header>
          <h2>{zoom?.alt ?? "素材預覽"}</h2>
          <button
            type="button"
            className="dialog-close"
            aria-label="關閉圖片"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
        </header>
        {zoom && <img src={zoom.src} alt={zoom.alt} />}
      </dialog>
    </div>
  );
}
