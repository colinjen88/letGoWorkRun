import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AdminCaseToc, type TocItem } from "@/components/AdminCaseToc";
import { ShotLightbox } from "@/components/ShotLightbox";

const toc: TocItem[] = [
  { id: "products", label: "上架作品" },
  { id: "site", label: "品牌官網" },
  { id: "motion", label: "程式動畫與動態貼圖" },
  { id: "consistency", label: "角色一致性" },
  { id: "pipeline", label: "製作與版本管理" },
];

const stats = [
  { value: "16", label: "款 LINE 貼圖公開上架" },
  { value: "384", label: "張靜態與動態貼圖" },
  { value: "49", label: "頁品牌官網內容" },
  { value: "17", label: "位定案製作的角色" },
];

const products = [
  { name: "搶戲小紅椅", set: "日常都是大場面", href: "https://store.line.me/stickershop/product/37446743/zh-Hant", image: "product_red" },
  { name: "迷豆兒 Midoar", set: "療癒舞會（動態）", href: "https://store.line.me/stickershop/product/37685565/zh-Hant", image: "product_midoar" },
  { name: "花歇歇", set: "陪你歇一下", href: "https://store.line.me/stickershop/product/37467862/zh-Hant", image: "product_hua" },
  { name: "篤篤", set: "認真回你", href: "https://store.line.me/stickershop/product/37454959/zh-Hant", image: "product_dudu" },
  { name: "慢慢小茶包", set: "日常慢慢回", href: "https://store.line.me/stickershop/product/37454831/zh-Hant", image: "product_tea" },
  { name: "聖光小黃豆", set: "微笑勸世中", href: "https://store.line.me/stickershop/product/37446092/zh-Hant", image: "product_bean" },
];

type Feature = {
  title: string;
  body: string;
  notes: string[];
  image: { src: string; width: number; height: number; alt: string };
};

const siteFeatures: Feature[] = [
  {
    title: "以角色為主的首頁",
    body: "角色就是品牌最強的辨識點，所以首頁讓角色佔據主視覺，再用三個入口帶到認識角色、讀故事與挑貼圖。",
    notes: ["Hero 有兩組角色輪換，重新整理會換另一組", "同一時間只輸出一個 h1，維持標題層級"],
    image: { src: "/assets/petadays/site_home.webp", width: 1440, height: 900, alt: "貼貼日和官網首頁，四個角色組成的主視覺" },
  },
  {
    title: "換頁過渡與回饋",
    body: "跨頁使用 View Transitions，頁首固定、內容淡入，換頁時由小黃豆帶路。回饋不會延遲實際換頁。",
    notes: ["系統減少動態或站內安靜模式時會略過", "保留瀏覽器原生的上一頁與獨立網址"],
    image: { src: "/assets/petadays/site_transition.webp", width: 1250, height: 712, alt: "換頁途中，新舊頁面交疊淡入，右下角小黃豆顯示帶路中" },
  },
  {
    title: "繪本式閱讀",
    body: "短篇故事的插畫與正文放在同一個紙感圖框，桌面左圖右文，760px 以下改為上圖下文，內容依高度自然伸展。",
    notes: ["文字維持可選取的 HTML，不燒進圖片", "提供大字閱讀，並可收藏故事"],
    image: { src: "/assets/petadays/site_story.webp", width: 1360, height: 900, alt: "貼貼日和官網的繪本式短篇故事頁" },
  },
];

const loops = [
  { src: "loop_hi", alt: "迷豆兒揮手打招呼的動態貼圖" },
  { src: "loop_spin", alt: "迷豆兒開心轉圈的動態貼圖" },
  { src: "loop_heart", alt: "迷豆兒心動的動態貼圖" },
  { src: "loop_cheer", alt: "迷豆兒慶祝舞步的動態貼圖" },
];

const checks = ["輪廓", "五官", "配色分區", "器官", "識別記號", "左右與連接", "個性", "縮圖辨識"];

const pipeline = [
  { title: "企劃", body: "先定角色、使用情境與常用語，再決定一套的張數與排序。" },
  { title: "製作", body: "每次生成都附上凍結的角色身分圖，並保存實際提示詞、來源與所選圖。" },
  { title: "驗收", body: "白底、深底、聊天縮圖各看一次，固定特徵錯一項就重做。" },
  { title: "送審", body: "送出的檔案以 SHA 鎖定；要改圖就另開修訂版，不覆寫原件。" },
  { title: "上架宣傳", body: "製作、送審、通過、販售與各平台公開分開記錄，有證據才更新狀態。" },
];

const bounceCode = `// 以腳底為伸縮軸：落地壓扁，再拉長回彈
yield* all(
  elastic().scale([1.24, .74], .10, easeOutCubic),
  stage().rotation(2, .10),
);
yield* all(
  stage().y(-15, .24, easeOutQuad),
  stage().rotation(-4, .24),
  elastic().scale([.87, 1.16], .24),
);`;

// 動態圖無法用 CSS 暫停，減少動態效果時改載入靜態首格。
function MotionImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <picture>
      <source media="(prefers-reduced-motion: reduce)" srcSet={`/assets/petadays/${src}_static.webp`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/assets/petadays/${src}.webp`} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
    </picture>
  );
}

export function PetaDaysCase() {
  return (
    <div className="ac">
      <aside className="ac-aside">
        <AdminCaseToc items={toc} />
      </aside>

      <div className="ac-main">
        <p className="ac-lead">
          貼貼日和是我的個人角色品牌，從角色、LINE 貼圖到官網與短影音都由我主導。角色圖像由 AI 工具生成，官網與動畫程式也是和 AI 協作完成；我負責企劃、設計方向、選圖定稿與逐項驗收。
        </p>

        <dl className="cs-stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
        <p className="ac-note">
          商店頁於 2026-11-09 逐頁確認可開啟；角色數取自 2026-11-08 的專案紀錄，官網頁數為 2026-10-26 盤點。本頁不列銷售數字。
        </p>

        <section id="products" className="ac-section cs-first">
          <header className="ac-section__head">
            <h2>上架作品</h2>
            <p>以下為 LINE STORE 的公開商品頁，共有 12 款靜態與 4 款動態貼圖，這裡列出各角色的代表作。</p>
          </header>
          <ul className="cs-products">
            {products.map((product) => (
              <li key={product.href}>
                <a href={product.href} target="_blank" rel="noopener noreferrer">
                  <span className="cs-sticker-mount">
                    <Image src={`/assets/petadays/${product.image}.webp`} alt="" width={240} height={204} sizes="140px" />
                  </span>
                  <span className="cs-products__text">
                    <strong>
                      {product.name}
                      <ArrowUpRight size={14} aria-hidden="true" />
                      <span className="sr-only">（另開新分頁）</span>
                    </strong>
                    <span>{product.set}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="site" className="ac-section">
          <header className="ac-section__head">
            <h2>品牌官網</h2>
            <p>官網集中角色介紹、故事、影片與貼圖入口，以 Python 產生靜態頁面，並用 CSS 與少量 JavaScript 處理互動。</p>
            <p className="ac-meta">
              <a href="https://peta-days.com/" target="_blank" rel="noopener noreferrer">
                peta-days.com <ArrowUpRight size={13} />
                <span className="sr-only">（另開新分頁）</span>
              </a>
            </p>
          </header>

          {siteFeatures.map((feature, index) => (
            <article className="ac-feature" key={feature.title}>
              <div className="ac-feature__text">
                <span className="ac-feature__index">
                  {index + 1} / {siteFeatures.length}
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
            <h3>效能與無障礙</h3>
            <p>
              靜態資源以內容雜湊長期快取，大圖輸出多種尺寸。輔助文字對比依 WCAG AA 調整，上線時 45 頁的桌機與手機掃描沒有不足項目。2026-10-24 的 PageSpeed 手機版首頁紀錄，效能、無障礙、最佳做法與 SEO 皆為 100。
            </p>
          </div>
        </section>

        <section id="motion" className="ac-section">
          <header className="ac-section__head">
            <h2>程式動畫與動態貼圖</h2>
            <p>這部分延續我原本的動態背景：同樣在調整時間差、緩動與重量感，只是工具換成程式與 AI。</p>
          </header>

          <article className="ac-feature">
            <div className="ac-feature__text">
              <h3>用程式寫角色表演</h3>
              <p>
                短影音以 Motion Canvas（TypeScript）製作。開場讓角色壓扁、拉長再回彈；呼吸與眨眼用自訂 GLSL shader 對原圖局部變形，不重新生成角色。
              </p>
              <ul>
                <li>身體呼吸起伏最大 1.8%，腳部固定不動</li>
                <li>程式與 AI 協作撰寫，節奏由我指定並驗收</li>
                <li>
                  <a className="cs-inline-link cs-inline-link--flush" href="https://www.youtube.com/shorts/66xN4yBYm-c" target="_blank" rel="noopener noreferrer">
                    觀看完整短片
                    <span className="sr-only">（另開新分頁）</span>
                  </a>
                </li>
              </ul>
            </div>
            <figure className="cs-code">
              <div className="cs-code__preview">
                <MotionImage src="bounce" alt="小黃豆彈跳入場、落地壓扁後回彈的開場動畫" width={300} height={534} />
              </div>
              <pre tabIndex={0} aria-label="開場動畫的程式節錄"><code>{bounceCode}</code></pre>
              <figcaption>開場 3 秒與對應的程式節錄（已省略陰影等次要屬性）</figcaption>
            </figure>
          </article>

          <article className="ac-feature">
            <div className="ac-feature__text">
              <h3>動態貼圖</h3>
              <p>
                《療癒舞會》每款 8 個關鍵姿勢由 AI 生成，再用程式補間到 20 格，並把文字分層，避免遮到角色。
              </p>
              <ul>
                <li>320×270 透明 APNG，20 格 × 100ms</li>
                <li>每輪 2 秒播放兩輪，單檔小於 1MB</li>
                <li>補間以有界光流處理，並非逐格手繪</li>
              </ul>
            </div>
            <div>
              <ul className="cs-loops">
                {loops.map((loop) => (
                  <li key={loop.src}>
                    <MotionImage src={loop.src} alt={loop.alt} width={280} height={236} />
                  </li>
                ))}
              </ul>
              <figure className="cs-compare">
                <MotionImage src="flow_compare" alt="同一個動作，左邊原版 8 格、右邊補間後 20 格的並排比較" width={640} height={300} />
                <figcaption>左為原版 8 格，右為補間後 20 格</figcaption>
              </figure>
            </div>
          </article>
        </section>

        <section id="consistency" className="ac-section">
          <header className="ac-section__head">
            <h2>讓 AI 生成的角色維持同一個樣子</h2>
            <p>
              AI 生圖最常見的問題，是角色每張都長得有點不同。我為每個角色建立識別卡與凍結參考圖，生成時實際附上，成品再依八項條件逐張檢查。
            </p>
          </header>

          <ul className="cs-checks" aria-label="角色辨識的八項檢查">
            {checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>

          <div className="cs-qa">
            <figure className="cs-qa__panel cs-qa__panel--light">
              <Image src="/assets/petadays/qa_sticker.webp" alt="迷豆兒貼圖放在白色背景上" width={320} height={270} sizes="200px" />
              <figcaption>白底</figcaption>
            </figure>
            <figure className="cs-qa__panel cs-qa__panel--dark">
              <Image src="/assets/petadays/qa_sticker.webp" alt="同一張貼圖放在深色背景上" width={320} height={270} sizes="200px" />
              <figcaption>深底</figcaption>
            </figure>
            <figure className="cs-qa__panel cs-qa__panel--chat">
              <Image src="/assets/petadays/qa_sticker.webp" alt="同一張貼圖縮小到聊天室尺寸" width={320} height={270} sizes="96px" className="cs-qa__small" />
              <figcaption>聊天縮圖</figcaption>
            </figure>
          </div>
          <p className="ac-note">貼圖的白邊與細線在深底和小尺寸最容易出問題，因此三種條件都要看。</p>

          <div className="cs-sets">
            <ShotLightbox
              image={{ src: "/assets/petadays/set_red_16.webp", width: 1280, height: 1280, alt: "搶戲小紅椅上架版 16 款貼圖總覽" }}
              caption="搶戲小紅椅上架版 16 款總覽"
            />
            <ShotLightbox
              image={{ src: "/assets/petadays/set_midoar_24.webp", width: 1280, height: 1740, alt: "迷豆兒療癒舞會 24 款排序總覽" }}
              caption="迷豆兒 24 款排序，前 8 張優先放問候與回應等常用語"
            />
          </div>
        </section>

        <section id="pipeline" className="ac-section">
          <header className="ac-section__head">
            <h2>製作與版本管理</h2>
            <p>商品變多後，最容易出錯的是版本和狀態。每個商品固定一個資料夾，依五個階段放檔。</p>
          </header>
          <ol className="ac-steps">
            {pipeline.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="ac-ops">
            <h3>工具與限制</h3>
            <p>
              開新商品、角色任務包與收工稽核都有腳本，會核對送審檔的雜湊是否變動。腳本只能確認檔案與紀錄，角色像不像、文案好不好仍要靠人判斷。音樂角色迷豆兒也延伸到
              <Link href="/work/ai-music-mv/" className="cs-inline-link">AI 音樂 MV</Link>
              。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
