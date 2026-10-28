export type ProjectCategory =
  | "dynamic-web"
  | "functional-web"
  | "graphic-design"
  | "seo"
  | "motion-design";

export type ProjectFilter = ProjectCategory | "all";

export function getProjectCardImage(source: string) {
  return source.replace(/\.(?:jpe?g|png|webp)$/i, "_card_v3.webp");
}

export type Project = {
  id: string;
  slug?: string; // 若有獨立 Case Study 深度頁面
  title: string;
  subtitle: string;
  categories: ProjectCategory[];
  summary: string;
  tags: string[];
  images: string[];
  imageCaptions?: string[];
  bgImage?: string;
  liveUrl?: string;
  showcaseUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
  featured?: boolean;
  status?: "live" | "in-progress" | "offline";
  details?: {
    role: string;
    challenge: string;
    approach: string[];
    highlights: string[];
  };
};

export const personalInfo = {
  name: "WANG",
  title: "前端設計工程師",
  englishTitle: "Creative Frontend Designer & Engineer",
  subtitle: "介面視覺・動效節奏・前端工程完整實現",
  email: "flashjen@gmail.com",
  location: "Taiwan",
  statusBadge: "Open for Opportunities • 隨時可洽談新專案",
  statusDescription:
    "專精 UI/UX 介面設計、前台與後台全端程式功能建置、動效微互動 (Lottie/SVGA) 及 SEO 部署上線，具備獨立負責產品從零到一完整落地能力。",
  aboutParagraphs: [
    "從 Flash / Animate 動態設計出發，淬鍊出對動態細節與微互動節奏的敏銳度。以 Figma 梳理使用者體驗與介面架構，並能依專案需求進行精準的技術選型，靈活運用 Next.js、Nuxt.js、TypeScript 與 Tailwind CSS 高品質實現現代 Web 應用。",
    "從設計系統、響應式排版到互動狀態，依真實內容與裝置條件逐一處理，讓設計稿能穩定落地。",
  ],
  craftTokens: [
    { label: "主軸風格", value: "Editorial Tech & Creative Studio" },
    { label: "動態核心", value: "Lottie, SVGA, CSS Keyframe Springs" },
    { label: "工程體系", value: "Next.js, Nuxt.js, TypeScript, Tailwind CSS" },
    { label: "視覺工具", value: "Figma, After Effects, Illustrator, Photoshop" },
  ],
};

export const projects: Project[] = [
  {
    id: "admin-systems",
    slug: "admin-systems",
    title: "後台管理系統 設計規劃與開發整合",
    subtitle: "五套後台的模組整理、規劃流程、設計規範與製造現場概念 Demo",
    categories: ["functional-web"],
    summary:
      "營運／內容／列表／即時監控後台整理 • 角色權限與資訊架構規劃 • 後台設計規範 • 設備監控主控台互動 Demo",
    tags: ["後台 UI/UX", "權限規劃 RBAC", "資料表格與篩選", "即時監控", "設計規範"],
    featured: true,
    images: [
      "/assets/admin/admin_console.webp",
      "/assets/royaltouch/royal04.webp",
      "/assets/goldlab_preview5.webp",
      "/assets/zyfloral/zyfloral04.webp",
      "/assets/flashrate.webp",
      "/assets/royaltouch/royal05.webp",
    ],
    imageCaptions: [
      "概念 Demo：設備監控主控台（模擬資料）",
      "大內御指（試做）：預約總覽儀表板，KPI 卡片、營收趨勢與最新預約",
      "GoldLab：文章管理中心，狀態分頁、搜尋篩選、排序表格與批次勾選",
      "植園花室：網站內容管理，草稿預覽、版本保留與備份匯出入",
      "Goldlab.cloud：多來源即時監控，連線狀態、來源延遲與更新時間",
      "大內御指（試做）：依角色拆分的前台、管理後台與技師後台入口",
    ],
    details: {
      role: "後台資訊架構與權限規劃、UI/UX 介面設計、前端程式實作與 API 串接；本頁概念 Demo 為個人設計練習",
      challenge:
        "把散落在不同作品中的後台經驗整理成一套可重複的方法：從角色與任務出發規劃資訊架構，用一致的元件與狀態規範降低操作錯誤，並驗證這套方法能延伸到即時監控、權限分層與可追溯性要求更高的製造現場。",
      approach: [
        "盤點五套後台的模組與共通模式，歸納為儀表板、資料列表、內容編輯、即時監控四種頁型。",
        "先定義角色與權限矩陣，再依任務頻率決定選單與首頁資訊，敏感操作綁定角色並在原位二次確認。",
        "統一狀態標籤（圖示＋文字＋顏色）、表格密度、篩選列與空／載入／錯誤／無權限四種狀態畫面。",
        "以 React 實作設備監控主控台 Demo，示範即時更新、資料新鮮度、角色權限、告警確認與操作紀錄。",
      ],
      highlights: [
        "五套後台模組與設計模式對照表，以及既有經驗對應製造現場的情境整理",
        "六步驟後台規劃流程與每一步的交付物",
        "後台狀態語意與六項設計原則",
        "可操作的設備監控主控台概念 Demo（模擬資料，可完整用鍵盤操作）",
      ],
    },
  },
  {
    id: "zyfloral",
    slug: "zyfloral",
    title: "植園花室 Zhiyuan Floral Studio (官網與後台管理)",
    subtitle: "品牌官網建置與後台管理平台",
    categories: ["dynamic-web", "functional-web", "seo"],
    summary:
      "品牌官網與內容管理後台建置 • 課程/文章管理系統 • SEO 優化架構 • RWD 響應式開發",
    tags: ["Brand Web", "CMS 後台", "SEO 文章系統", "RWD"],
    liveUrl: "https://zyfloral.com/",
    featured: true,
    images: [
      "/assets/zyfloral/zyfloral01.webp",
      "/assets/zyfloral/zyfloral02.webp",
      "/assets/zyfloral/zyfloral03.webp",
      "/assets/zyfloral/zyfloral04.webp",
    ],
    imageCaptions: [
      "植園花室 Zhiyuan Floral Studio 首頁",
      "植園花室 課程介紹區塊",
      "植園花室 品牌故事與理念",
      "植園花室 後台管理平台 & SEO文章管理",
    ],
    details: {
      role: "UI/UX 介面設計、前台與內容管理後台程式功能建置、SEO 優化至獨立部署上線",
      challenge:
        "以品牌作品與服務資訊建立沉浸式瀏覽動線，並從零建置前台視覺、高擴充性內容管理後台（課程/文章）與 SEO 架構。",
      approach: [
        "主導全站 UI/UX 介面規劃，以簡約留白與細緻字體層級襯托花藝作品張力，完成全站 RWD 響應式排版。",
        "負責前台互動畫面與內容管理後台（CMS）之程式功能建置，實現課程維護、文章發布與即時資料管理。",
        "規劃 Technical SEO 結構化資料、關鍵字與語意化標籤，並完成雲端伺服器環境配置與正式部署上線。",
      ],
      highlights: [
        "品牌官網前台與內容管理後台系統之端到端完整建置",
        "課程介紹、文章發布與 SEO 系統之架構規劃與功能實作",
        "跨裝置 RWD 排版、細膩微互動回饋與伺服器部署上線",
      ],
    },
  },
  {
    id: "royal",
    slug: "royal",
    title: "古風官網 按摩官網-前/後台試做",
    subtitle: "前台改版設計與後台預約管理系統",
    categories: ["functional-web"],
    summary:
      "品牌官網視覺設計 • 前台預約流程體驗優化 • 門市/排班後台管理系統建置 • 微互動整合 • Showcase 開發歷程",
    tags: ["古風官網", "預約系統", "後台管理", "微互動", "RWD 開發歷程"],
    liveUrl: "https://royal.gowork.run/main-site/index.html",
    showcaseUrl: "https://royal.gowork.run/showcase",
    featured: true,
    images: [
      "/assets/royaltouch/royal_main01.webp",
      "/assets/royaltouch/royal_main02.webp",
      "/assets/royaltouch/royal01.webp",
      "/assets/royaltouch/royal02.webp",
      "/assets/royaltouch/royal03.webp",
      "/assets/royaltouch/royal04.webp",
      "/assets/royaltouch/royal05.webp",
    ],
    imageCaptions: [
      "古風主官網品牌視覺與首頁",
      "古風主官網養生知識專欄",
      "前台門市與預約流程設計",
      "線上預約步驟化引導",
      "後台管理總覽儀表板",
      "門市與師傅排班管理",
      "開發歷程與流程架構",
    ],
    details: {
      role: "UI/UX 視覺與介面設計、前台線上預約流程與後台門市管理系統程式功能建置、微互動動效整合至網站部署上線",
      challenge:
        "以古典東方美學重塑品牌官網門面，並將繁雜的選單預約流程與門市排班後台轉化為高效率的前後端功能系統。",
      approach: [
        "負責主官網整體視覺風格提案與 UI/UX 介面設計，打造具東方沉浸感的養生文化與知識專欄體驗。",
        "完整規劃並建置前台步驟化線上預約功能，結合細膩微動態回饋提升操作流暢度與轉換率。",
        "實作後台總覽儀表板、門市管理與師傅排班管理等系統功能與資料處理流程。",
        "建構專屬開發展示站（Showcase），實踐 RWD 跨裝置自適應測試與伺服器部署上線。",
      ],
      highlights: [
        "古典東方品牌主官網、知識專欄與步驟化線上預約系統功能建置",
        "後台門市管理、師傅排班調度與總覽儀表板系統功能落地實作",
        "RWD 全裝置自適應排版、細膩微動態回饋與互動體驗調優",
        "前後台完整功能架構與獨立開發 Showcase 部署上線",
      ],
    },
  },
  {
    id: "goodeats",
    slug: "goodeats",
    title: "穀意 GoodEats (官網 & 開發介紹)",
    subtitle: "品牌沉浸式官網與前/後台 Showcase 開發歷程",
    categories: ["dynamic-web"],
    summary:
      "品牌官網沉浸式視覺設計 • 動態特效與影片整合 • Showcase 前後台開發歷程與系統建置",
    tags: ["沉浸式體驗", "動態設計", "Showcase 雙入口", "創意版型"],
    liveUrl: "https://goodeats.asia/",
    showcaseUrl: "https://gowork.run/showGoodEats/",
    featured: true,
    images: [
      "/assets/goodeats_preview.webp",
      "/assets/showgoodeats.webp",
    ],
    imageCaptions: [
      "穀意 GoodEats 品牌官網",
      "穀意 GoodEats Showcase 前/後台開發介紹",
    ],
    details: {
      role: "品牌官網與 Showcase 之 UI/UX 設計、動態視覺特效、前後台程式功能建置、SEO 優化至獨立部署上線",
      challenge:
        "融合大幅影片背景、品牌故事與動態節奏打造沉浸式體驗，並同步規劃後台管理與 Showcase 開發歷程展示。",
      approach: [
        "全盤主導品牌官網視覺定位、UI/UX 介面設計與動態腳本，調校影片背景與時間差動態細節。",
        "獨立建構專屬 Showcase 站點，完整開發前台形象視覺、後台管理規劃與互動系統功能。",
        "實作跨裝置 RWD 自適應架構與載入效能調優，落實 Technical SEO 與伺服器獨立部署上線。",
      ],
      highlights: [
        "品牌官網主站與前後台開發歷程 Showcase 雙站點全功能建置",
        "沉浸式背景影片、微互動動效與視覺節奏之精準調校",
        "後台管理功能架構規劃、RWD 自適應排版與獨立部署上線",
      ],
    },
  },
  {
    id: "goldlab",
    slug: "goldlab",
    title: "內容型網站完整建置 (GoldLab)",
    subtitle: "獨立規劃設計、製作與佈署之資訊型網站",
    categories: ["functional-web", "seo"],
    summary:
      "資訊型網站全端建置 • 文章管理後台開發 • SEO 關鍵字策略佈局 • VPS 伺服器建置與部署",
    tags: ["全站獨立建置", "SEO 策略", "文章後台", "資訊架構"],
    liveUrl: "https://goldlab.tw/",
    featured: true,
    images: [
      "/assets/goldlab_preview1.webp",
      "/assets/goldlab_preview2.webp",
      "/assets/goldlab_preview3.webp",
      "/assets/goldlab_preview4.webp",
      "/assets/goldlab_preview5.webp",
      "/assets/goldlab_preview6.webp",
    ],
    imageCaptions: [
      "首頁市場資訊與熱門內容入口",
      "分類選單與文章清單",
      "文章內頁結構化閱讀排版",
      "SEO 關鍵字佈局架構",
      "文章管理後台發布系統",
      "響應式行動端完整呈現",
    ],
    details: {
      role: "全站獨立 UI/UX 規劃設計、前台與文章管理後台程式功能建置、SEO 關鍵字策略佈局至 VPS 伺服器建置與部署上線",
      challenge:
        "以資訊型網站為定位，從零打造涵蓋市場資訊、結構化閱讀、高擴充性文章管理後台與長期 SEO 導流架構。",
      approach: [
        "從零負責全站資訊架構與 UI/UX 介面規劃，兼顧極致閱讀體驗與多裝置 RWD 排版。",
        "獨立撰寫前台渲染與文章管理後台發布系統之完整程式功能，實現即時內容維護。",
        "制定全站 SEO 策略，包含關鍵字佈局、語意化 HTML、結構化資料（Schema.org）與索引優化。",
        "自行配置 Linux VPS 伺服器環境、網域、SSL 憑證與 Web 伺服器，完成全自動部署上線。",
      ],
      highlights: [
        "全站端到端（End-to-End）獨立規劃設計、全功能程式開發與 VPS 部署上線",
        "自研文章管理後台發布系統與前台結構化閱讀體驗",
        "完整 Technical SEO 關鍵字佈局策略與高擴充性架構",
      ],
    },
  },
  {
    id: "flashrate",
    title: "聚合免費報價來源",
    subtitle: "分散式即時市場行情數據整合",
    categories: ["functional-web"],
    summary: "多來源即時市場行情數據串接與聚合 • 即時報價介面設計與前端功能開發 • 伺服器部署上線",
    tags: ["數據整理", "多來源資料", "行情匯率", "即時介面"],
    liveUrl: "https://goldlab.cloud/",
    images: ["/assets/flashrate.jpg"],
    imageCaptions: ["多來源報價整理介面"],
  },
  {
    id: "shiny-jewelry",
    title: "形象官網一頁式網站（主頁設計）",
    subtitle: "璀璨珠寶 Shiny Jewelry 一頁式形象品牌",
    categories: ["dynamic-web"],
    summary: "品牌風格提案與定位 • UI/UX 介面設計 • 前端程式功能建置與 RWD 自適應 • 網站正式部署上線",
    tags: ["珠寶品牌", "風格提案", "UI/UX 設計", "一頁式網站"],
    liveUrl: "https://my8020.cloud/",
    images: ["/assets/shiny_jewelry_preview.webp"],
    imageCaptions: ["璀璨珠寶主頁形象視覺"],
  },
  {
    id: "alloy-team",
    title: "alloy.team工作室網站",
    subtitle: "創意工作室品牌官網",
    categories: ["dynamic-web"],
    summary: "品牌形象規劃 • UI/UX 設計 • 微動畫與多語系功能建置 • 響應式前端開發與部署上線",
    tags: ["互動網站", "微動畫", "多語系", "自適應"],
    liveUrl: "https://alloy.team",
    images: [
      "/assets/alloy1.jpg",
      "/assets/alloy2.jpg",
      "/assets/alloy3.jpg",
    ],
    imageCaptions: [
      "alloy.team 工作室網站 首頁",
      "團隊專案與服務介紹",
      "多語系與自適應介面",
    ],
  },
  {
    id: "motion-collection",
    title: "Motion - Animation Collection",
    subtitle: "SVGA 直播動效、廣告 Banner 與動態人物",
    categories: ["motion-design"],
    summary: "SVGA直播動效設計、廣告banner動畫、動態人物，多年 Flash/Animate 深厚動效背景",
    tags: ["SVGA 動效", "直播動態", "Banner 動畫", "YouTube Showreel"],
    liveUrl: "https://www.youtube.com/watch?v=V_f5eONwmPo",
    videoUrl: "https://www.youtube.com/embed/V_f5eONwmPo?autoplay=1",
    images: ["/assets/motion_preview.webp"],
    imageCaptions: ["Motion Showreel 動效精華預覽"],
  },
  {
    id: "graphic-portfolio",
    title: "平面設計作品集",
    subtitle: "廣告、印刷品、公仔筆、海報與品牌識別",
    categories: ["graphic-design"],
    summary:
      "Graphic Design • 廣告設計 • 印刷品設計(立牌、公仔筆、海報…) • 活動頁設計 • Banner設計 • 吉祥物設計 • LOGO及名片設計",
    tags: ["平面設計", "印刷品", "吉祥物", "PDF 作品集"],
    pdfUrl: "/assets/Graphic_Portfolio.pdf",
    images: ["/assets/graphic_portfolio_thumb.webp"],
    bgImage: "/assets/graphic_collage_bg.webp",
    imageCaptions: ["平面設計作品集手冊封面"],
  },
  {
    id: "seo-strategy",
    title: "SEO內容行銷",
    subtitle: "關鍵字與內容規劃展示",
    categories: ["seo"],
    summary: "市場競爭受眾與關鍵字深度研究 • 內容策略與全站資訊架構規劃 • Technical SEO 與成效分析",
    tags: ["SEO 關鍵字", "內容規劃", "內容行銷", "網站架構"],
    liveUrl: "https://seo.gowork.run/",
    images: ["/assets/seo_preview.webp"],
    imageCaptions: ["SEO 內容策略規劃成果"],
  },
  {
    id: "micro-interactions",
    title: "Micro-interactions & Animated Game Cards",
    subtitle: "Lottie 客製化動效製作與動態化體驗",
    categories: ["motion-design"],
    summary: "Lottie 客製化動效製作 • JSON • UI Dynamic • 圖片動態化",
    tags: ["Lottie", "JSON 動畫", "微互動", "整理中"],
    status: "in-progress",
    images: ["/assets/loading_animation.webp"],
    imageCaptions: ["微互動載入動畫示範"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
