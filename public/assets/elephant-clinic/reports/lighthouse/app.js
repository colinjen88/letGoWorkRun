/**
 * 美麗大象診所 - 網站效能優化成果比較應用腳本 (app.js)
 */

// --- 完整的 8 頁實測資料庫 ---
const pagesData = [
  {
    id: "home",
    index: "01",
    category: "main",
    title: "【 診所首頁 】",
    path: "https://didi-elephant.com/",
    status: "optimized", // "optimized" (已達標) | "pending" (待測中)
    improvementText: "<span style=\"font-size: 2rem;\">+39 分</span><br>(+70.9%)",
    deltaType: "positive",
    before: {
      score: 55,
      bestPractices: 77,
      fcp: "41.2s",
      lcp: "68.5s",
      tbt: "0ms",
      cls: "0",
      filename: "首頁_55分.png",
      thumb: "assets/images/preview/before/home.webp",
      preview: "assets/images/preview/before/home.webp"
    },
    after: {
      score: 94,
      bestPractices: 100,
      fcp: "1.7s",
      lcp: "2.2s",
      tbt: "200ms",
      cls: "0",
      filename: "首頁_94分.png",
      thumb: "assets/images/preview/after/home.webp",
      preview: "assets/images/preview/after/home.webp"
    },
    optimizations: ["Next-gen WebP 轉檔", "LCP 優先預載 (fetchpriority)", "CSS/JS 延遲載入", "靜態資源快取"]
  },
  {
    id: "treatment",
    index: "02",
    category: "about",
    title: "【 治療項目 】內頁",
    path: "https://didi-elephant.com/treatment-program-detail/...",
    status: "optimized",
    improvementText: "<span style=\"font-size: 2rem;\">+21 分</span><br>(+42.9%)",
    deltaType: "positive",
    before: {
      score: 49,
      bestPractices: 77,
      fcp: "11.5s",
      lcp: "22.5s",
      tbt: "300ms",
      cls: "0",
      filename: "治療項目內頁_49分.png",
      thumb: "assets/images/preview/before/treatment.webp",
      preview: "assets/images/preview/before/treatment.webp"
    },
    after: {
      score: 70,
      bestPractices: 100,
      fcp: "4.1s",
      lcp: "4.6s",
      tbt: "200ms",
      cls: "0.002",
      filename: "治療項目內頁_70分.png",
      thumb: "assets/images/preview/after/treatment.webp",
      preview: "assets/images/preview/after/treatment.webp"
    },
    optimizations: ["醫療解剖插圖 WebP 轉換", "折疊 FAQ 原生標籤化", "移除未引用腳本"]
  },
  {
    id: "team",
    index: "03",
    category: "about",
    title: "【 醫療團隊 】頁",
    path: "https://didi-elephant.com/team",
    status: "optimized",
    improvementText: "<span style=\"font-size: 2rem;\">+42 分</span><br>(+82.4%)",
    deltaType: "positive",
    before: {
      score: 51,
      bestPractices: 77,
      fcp: "13.6s",
      lcp: "32.7s",
      tbt: "220ms",
      cls: "0",
      filename: "醫療團隊_51分.png",
      thumb: "assets/images/preview/before/team.webp",
      preview: "assets/images/preview/before/team.webp"
    },
    after: {
      score: 93,
      bestPractices: 100,
      fcp: "1.7s",
      lcp: "2.2s",
      tbt: "250ms",
      cls: "0.004",
      filename: "醫療團隊_93分.png",
      thumb: "assets/images/preview/after/team.webp",
      preview: "assets/images/preview/after/team.webp"
    },
    optimizations: ["醫師高清形象肖像壓縮", "證照專科徽章 SVG 向量化", "卡片滾動懶加載"]
  },
  {
    id: "video",
    index: "04",
    category: "media",
    title: "【 影音專區 】頁",
    path: "https://didi-elephant.com/video/category",
    status: "optimized",
    improvementText: "<span style=\"font-size: 2rem;\">+22 分</span><br>(+40.0%)",
    deltaType: "positive",
    before: {
      score: 55,
      bestPractices: 77,
      fcp: "36.4s",
      lcp: "44.6s",
      tbt: "0ms",
      cls: "0.002",
      filename: "影音專區_55分.png",
      thumb: "assets/images/preview/before/video.webp",
      preview: "assets/images/preview/before/video.webp"
    },
    after: {
      score: 77,
      bestPractices: 100,
      fcp: "1.7s",
      lcp: "3.7s",
      tbt: "480ms",
      cls: "0",
      filename: "影音專區_77分.png",
      thumb: "assets/images/preview/after/video.webp",
      preview: "assets/images/preview/after/video.webp"
    },
    optimizations: ["YouTube 嵌入 Lite 輕量化", "封面縮圖 WebP 預載", "衛教列表分頁載入"]
  },
  {
    id: "devices",
    index: "05",
    category: "about",
    title: "【 醫療設備 】頁",
    path: "https://didi-elephant.com/medical-devices",
    status: "optimized",
    improvementText: "<span style=\"font-size: 2rem;\">+44 分</span><br>(+89.8%)",
    deltaType: "positive",
    before: {
      score: 49,
      bestPractices: 77,
      fcp: "11.5s",
      lcp: "45.9s",
      tbt: "310ms",
      cls: "0",
      filename: "醫療設備_49分.png",
      thumb: "assets/images/preview/before/devices.webp",
      preview: "assets/images/preview/before/devices.webp"
    },
    after: {
      score: 93,
      bestPractices: 100,
      fcp: "1.7s",
      lcp: "2.3s",
      tbt: "240ms",
      cls: "0.001",
      filename: "醫療設備_93分.png",
      thumb: "assets/images/preview/after/devices.webp",
      preview: "assets/images/preview/after/devices.webp"
    },
    optimizations: ["設備主圖自適應剪裁", "多圖輪播延遲初始化 (Swiper Lazy)", "GPU 硬體加速渲染"]
  },
  {
    id: "sex_home",
    index: "06",
    category: "sex-health",
    title: "【 性功能專區 】 首頁 ",
    path: "https://didi-elephant.com/sexual-health",
    status: "optimized",
    improvementText: "<span style=\"font-size: 2rem;\">+32 分</span><br>(+64.0%)",
    deltaType: "positive",
    before: {
      score: 50,
      bestPractices: 77,
      fcp: "10.1s",
      lcp: "27.6s",
      tbt: "280ms",
      cls: "0",
      filename: "性功能專區_首頁_50分.png",
      thumb: "assets/images/preview/before/sex_home.webp",
      preview: "assets/images/preview/before/sex_home.webp"
    },
    after: {
      score: 82,
      bestPractices: 100,
      fcp: "2.9s",
      lcp: "3.4s",
      tbt: "260ms",
      cls: "0",
      filename: "性功能專區_首頁_82分.png",
      thumb: "assets/images/preview/after/sex_home.webp",
      preview: "assets/images/preview/after/sex_home.webp"
    },
    optimizations: ["首屏大圖 WebP 壓縮", "導流模組延遲加載", "預約按鈕防抖與快取"]
  },
  {
    id: "sex_inner",
    index: "07",
    category: "sex-health",
    title: "【 性功能專區 】 衛教文章內頁",
    path: "https://didi-elephant.com/sexual-health-detail/...",
    status: "optimized",
    improvementText: "<span style=\"font-size: 2rem;\">+33 分</span><br>(+63.5%)",
    deltaType: "positive",
    before: {
      score: 52,
      bestPractices: 77,
      fcp: "9.8s",
      lcp: "17.0s",
      tbt: "230ms",
      cls: "0",
      filename: "性功能專區_內頁_52分.png",
      thumb: "assets/images/preview/before/sex_inner.webp",
      preview: "assets/images/preview/before/sex_inner.webp"
    },
    after: {
      score: 85,
      bestPractices: 100,
      fcp: "2.9s",
      lcp: "3.1s",
      tbt: "220ms",
      cls: "0",
      filename: "性功能專區_內頁_85分.png",
      thumb: "assets/images/preview/after/sex_inner.webp",
      preview: "assets/images/preview/after/sex_inner.webp"
    },
    optimizations: ["長文章圖文非同步 Lazyload", "字型預載 (Preload Font)", "DOM 結構輕量化"]
  },
  {
    id: "appointment",
    index: "08",
    category: "sex-health",
    title: "【 性功能專區 】隱私線上預約",
    path: "https://didi-elephant.com/appointment",
    status: "optimized",
    improvementText: "<span style=\"font-size: 2rem;\">+28 分</span><br>(+53.8%)",
    deltaType: "positive",
    before: {
      score: 52,
      bestPractices: 77,
      fcp: "10.8s",
      lcp: "17.9s",
      tbt: "210ms",
      cls: "0",
      filename: "性功能專區_隱私預約_52分.png",
      thumb: "assets/images/preview/before/appointment.webp",
      preview: "assets/images/preview/before/appointment.webp"
    },
    after: {
      score: 80,
      bestPractices: 100,
      fcp: "2.9s",
      lcp: "3.0s",
      tbt: "390ms",
      cls: "0",
      filename: "性功能專區_隱私預約_80分.png",
      thumb: "assets/images/preview/after/appointment.webp",
      preview: "assets/images/preview/after/appointment.webp"
    },
    optimizations: ["表單驗證輕量化", "表單樣式 CSS 預編譯", "第三方像素追蹤 Defer"]
  }
];

// --- 工具函數：取得分數色彩等級與 Gauge offset ---
function getScoreColorClass(score) {
  if (score >= 90) return { text: "text-green", gauge: "gauge-green", badge: "badge-green" };
  if (score >= 50) return { text: "text-orange", gauge: "gauge-orange", badge: "badge-orange" };
  return { text: "text-red", gauge: "gauge-red", badge: "badge-red" };
}

function calculateStrokeOffset(score) {
  const circumference = 188.5; // 2 * PI * 30
  return circumference * (1 - Math.min(100, Math.max(0, score)) / 100);
}

// --- 渲染卡片對照視圖 ---
function renderCards(filter = "all") {
  const container = document.getElementById("cards-container");
  if (!container) return;

  const filtered = filter === "all" 
    ? pagesData 
    : pagesData.filter(p => p.category === filter);

  container.innerHTML = filtered.map((page, idx) => {
    const globalIdx = pagesData.findIndex(p => p.id === page.id);
    const beforeColors = getScoreColorClass(page.before.score);
    const afterColors = getScoreColorClass(page.after.score);
    const isPending = page.status === "pending";

    return `
      <article class="compare-card" id="card-${page.id}" data-id="${page.id}">
        <!-- Card Topbar -->
        <div class="card-topbar">
          <div class="card-title-group">
            <span class="card-page-index">${page.index}</span>
            <h3 class="card-page-title">${page.title}</h3>
            <span class="card-page-path">${page.path}</span>
          </div>

        </div>

        <!-- Dual Side Body -->
        <div class="card-dual-body">
          <!-- Side Left: Before -->
          <div class="side-panel side-before">
            <div class="side-header">
              <span class="side-title-tag tag-before">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                Before · 優化前
              </span>
              <span class="side-filename" title="${page.before.filename}">${page.before.filename}</span>
            </div>

            <!-- Metrics Bar -->
            <div class="side-metrics-bar">
              <div class="score-gauge-wrap">
                <svg class="score-gauge-svg" viewBox="0 0 70 70">
                  <circle class="gauge-bg" cx="35" cy="35" r="30"/>
                  <circle class="gauge-val ${beforeColors.gauge}" cx="35" cy="35" r="30" 
                          data-target-offset="${calculateStrokeOffset(page.before.score)}"/>
                </svg>
                <div class="score-number ${beforeColors.text}">${page.before.score}</div>
              </div>

              <div class="metrics-mini-list">
                <div class="metric-item">
                  <span class="m-lbl">LCP (最大繪製)</span>
                  <span class="m-val text-red">${page.before.lcp}</span>
                </div>
                <div class="metric-item">
                  <span class="m-lbl">FCP (首次繪製)</span>
                  <span class="m-val text-red">${page.before.fcp}</span>
                </div>
                <div class="metric-item">
                  <span class="m-lbl">最佳做法 *</span>
                  <span class="m-val text-muted">${page.before.bestPractices}</span>
                </div>
                <div class="metric-item">
                  <span class="m-lbl">版面位移 (CLS)</span>
                  <span class="m-val text-green">${page.before.cls}</span>
                </div>
              </div>
            </div>

            <!-- Thumbnail Box -->
            <button type="button" class="screenshot-box" data-preview="${page.before.preview}" aria-label="放大${page.title}的 Before 截圖">
              <img class="screenshot-img" src="${new URL(page.before.thumb, reportDirectory)}" alt="${page.title} - Before 截圖" loading="lazy" />
              <span class="zoom-overlay" aria-hidden="true">
                <span class="zoom-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                </span>
                <span>點擊放大檢視</span>
              </span>
            </button>
          </div>

          <!-- VS Divider -->
          <div class="vs-divider">
            <div class="vs-badge"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
            <div class="delta-badge ${isPending ? 'delta-pending' : 'delta-positive'}">
              ${page.improvementText}
            </div>
          </div>

          <!-- Side Right: After -->
          <div class="side-panel side-after">
            <div class="side-header">
              <span class="side-title-tag tag-after">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                After · 優化後
              </span>
              <span class="side-filename" title="${page.after.filename}">${page.after.filename}</span>
            </div>

            <!-- Metrics Bar -->
            <div class="side-metrics-bar">
              <div class="score-gauge-wrap">
                <svg class="score-gauge-svg" viewBox="0 0 70 70">
                  <circle class="gauge-bg" cx="35" cy="35" r="30"/>
                  <circle class="gauge-val ${afterColors.gauge}" cx="35" cy="35" r="30" 
                          data-target-offset="${calculateStrokeOffset(page.after.score)}"/>
                </svg>
                <div class="score-number ${afterColors.text}">${page.after.score}</div>
              </div>

              <div class="metrics-mini-list">
                <div class="metric-item">
                  <span class="m-lbl">LCP (最大繪製)</span>
                  <span class="m-val ${isPending ? 'text-red' : 'text-green font-bold'}">${page.after.lcp}</span>
                </div>
                <div class="metric-item">
                  <span class="m-lbl">FCP (首次繪製)</span>
                  <span class="m-val ${isPending ? 'text-red' : 'text-green font-bold'}">${page.after.fcp}</span>
                </div>
                <div class="metric-item">
                  <span class="m-lbl">最佳做法 *</span>
                  <span class="m-val text-muted">${page.after.bestPractices}</span>
                </div>
                <div class="metric-item">
                  <span class="m-lbl">版面位移 (CLS)</span>
                  <span class="m-val text-green">${page.after.cls}</span>
                </div>
              </div>
            </div>

            <!-- Thumbnail Box -->
            <button type="button" class="screenshot-box" data-preview="${page.after.preview}" aria-label="放大${page.title}的 After 截圖">
              <img class="screenshot-img" src="${new URL(page.after.thumb, reportDirectory)}" alt="${page.title} - After 截圖" loading="lazy" />
              <span class="zoom-overlay" aria-hidden="true">
                <span class="zoom-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                </span>
                <span>點擊放大檢視</span>
              </span>
            </button>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="card-footer-info">
          <div class="tags-group">
            <span class="tag-label">關鍵優化工程：</span>
            ${page.optimizations.map(tag => `<span class="tech-tag">${tag}</span>`).join("")}
          </div>
        </div>
      </article>
    `;
  }).join("");

  // 觸發 SVG 進度條動畫
  triggerGaugeAnimations();
}

// --- 渲染數據表格視圖 ---
function renderTable() {
  const tbody = document.getElementById("table-body");
  if (!tbody) return;

  tbody.innerHTML = pagesData.map((page, idx) => {
    const isPending = page.status === "pending";
    const beforeCol = getScoreColorClass(page.before.score);
    const afterCol = getScoreColorClass(page.after.score);

    return `
      <tr>
        <td>
          <div class="table-page-name">
            <span class="card-page-index">${page.index}</span>
            <span>${page.title}</span>
          </div>
        </td>
        <td><code class="code-inline">${page.before.filename}</code></td>
        <td><code class="code-inline">${page.after.filename}</code></td>
        <td class="text-center font-bold ${beforeCol.text}" style="font-size: 1.6rem; font-family: var(--font-mono);">${page.before.score} 分</td>
        <td class="text-center font-bold ${afterCol.text}" style="font-size: 1.6rem; font-family: var(--font-mono);">${page.after.score} 分</td>
        <td class="text-center">
          <span class="delta-badge ${isPending ? 'delta-pending' : 'delta-positive'}">
            ${page.improvementText}
          </span>
        </td>
        <td>
          <span class="text-red">${page.before.lcp}</span>
          <span style="color:var(--text-sub)"> ➔ </span>
          <span class="${isPending ? 'text-red' : 'text-green font-bold'}">${page.after.lcp}</span>
        </td>
        <td class="text-center">
          ${isPending 
            ? `<span class="badge-status-pill pill-warning" style="margin:0;">待驗證</span>` 
            : `<span class="badge-tag" style="background:#10B981;">已達標</span>`
          }
        </td>
        <td class="text-center">
          <div class="table-thumb-cell">
            <button type="button" class="table-thumb-btn" data-preview="${page.before.preview}" aria-label="放大${page.title}的 Before 截圖">
              <img src="${new URL(page.before.thumb, reportDirectory)}" alt="Before 縮圖" loading="lazy">
            </button>
            <button type="button" class="table-thumb-btn" data-preview="${page.after.preview}" aria-label="放大${page.title}的 After 截圖">
              <img src="${new URL(page.after.thumb, reportDirectory)}" alt="After 縮圖" loading="lazy">
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// --- 微互動：圓環進度條繪製動畫 ---
function triggerGaugeAnimations() {
  requestAnimationFrame(() => {
    const gauges = document.querySelectorAll(".gauge-val");
    gauges.forEach(gauge => {
      const target = gauge.getAttribute("data-target-offset");
      if (target !== null) {
        gauge.style.strokeDashoffset = target;
      }
    });
  });
}

// --- 微互動：數字滾動計數 (Count-up Animation) ---
function initCountUp() {
  const countElements = document.querySelectorAll(".count-up");
  countElements.forEach(el => {
    const target = parseInt(el.getAttribute("data-target"), 10) || 0;
    const duration = 1400; // ms
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(updateCount);
  });
}

// ==========================================================================
// 簡單圖片彈窗 (Simple Lightbox)
// ==========================================================================
const reportDirectory = new URL(".", document.currentScript.src);
const imageDialog = document.querySelector(".report-image-dialog");
const dialogImage = imageDialog.querySelector("img");

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("button[data-preview]");
  if (!trigger) return;
  const label = trigger.getAttribute("aria-label");
  dialogImage.src = new URL(trigger.dataset.preview, reportDirectory);
  dialogImage.alt = label.replace(/^放大/, "");
  imageDialog.setAttribute("aria-label", dialogImage.alt);
  imageDialog.showModal();
});

imageDialog.addEventListener("click", (event) => {
  if (event.target === imageDialog) imageDialog.close();
});

// --- 事件監聽器綁定 ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. 初始化卡片與表格
  renderCards("all");
  renderTable();
  initCountUp();

  // 2. 頁面分類篩選 Filter 按鈕
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderCards(filter);
    });
  });

  // 3. 視圖切換 (卡片 vs 表格)
  const btnCards = document.getElementById("btn-view-cards");
  const btnTable = document.getElementById("btn-view-table");
  const cardsView = document.getElementById("cards-view");
  const tableView = document.getElementById("table-view");

  btnCards.addEventListener("click", () => {
    btnCards.classList.add("active");
    btnTable.classList.remove("active");
    cardsView.classList.remove("hidden");
    tableView.classList.add("hidden");
  });

  btnTable.addEventListener("click", () => {
    btnTable.classList.add("active");
    btnCards.classList.remove("active");
    tableView.classList.remove("hidden");
    cardsView.classList.add("hidden");
  });
});

