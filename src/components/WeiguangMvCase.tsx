import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AdminCaseToc, type TocItem } from "@/components/AdminCaseToc";
import { ShotLightbox } from "@/components/ShotLightbox";

const toc: TocItem[] = [
  { id: "film", label: "成片與署名" },
  { id: "rules", label: "影像規則" },
  { id: "tools", label: "AI 工具分工" },
  { id: "release", label: "發布驗證" },
  { id: "taiyang", label: "太陽的面容" },
];

const faceFix = [
  { title: "問題", body: "舞台全身遠景以圖生影片時，連續幾次人臉都壞掉，或被模型自行切成近景。" },
  { title: "診斷", body: "臉只佔畫面高度約 5%，像素太少，提示詞又要求唱歌，等於讓最脆弱的區域動得最多。" },
  { title: "做法", body: "遠景讓臉幾乎不動，動態改由裙擺、燈光、霧氣與落花提供；對嘴交給臉部較大的中景與近景。" },
];

const credits = [
  { role: "作曲、演唱", who: "Suno（AI 生成）", mine: false },
  { role: "作詞", who: "本人與 Claude 協作，共 8 稿，第 7 稿為本人手改", mine: true },
  { role: "製作、分鏡、選材", who: "本人與 Claude 協作", mine: true },
  { role: "靜態影像", who: "Codex（AI 生成）", mine: false },
  { role: "動態影像、對嘴", who: "Kling、AutoIP（AI 生成）", mine: false },
  { role: "剪輯", who: "程式產生粗剪草稿，本人細剪（剪映）", mine: true },
];

const rules = [
  { title: "光一律從左邊進來", body: "每張圖的窗都在畫面左側，鏡頭剪在一起時光的方向才接得上。" },
  { title: "第 43 鏡前只有一個杯子", body: "畫面中的杯子數量要連戲，第二個杯子留到尾奏才出現。" },
  { title: "「你」不露臉", body: "只拍手、背影與逆光側影，讓不同處境的聽眾都能代入。" },
  { title: "不出現特定病況", body: "不放醫院、點滴、輔具等物件，也不拍藥丸特寫，避免變成某一個人的故事。" },
];

const frames = [
  { src: "frame_pillbox", alt: "床頭櫃上的一週藥盒，第一格打開、其餘闔上，午後的光落在桌面" },
  { src: "frame_floor_a", alt: "地板上的窗光落在左側" },
  { src: "frame_floor_b", alt: "同一個房間，地板上的窗光移到右側並變暖" },
  { src: "frame_back", alt: "披著毯子坐在床邊看向窗外的背影" },
  { src: "frame_palm", alt: "伸出的掌心接住一道光" },
  { src: "frame_night", alt: "夜晚窗光照在房間地板上" },
];

const tools = [
  { name: "剪映", use: "靜圖推移、調色與光效疊層", amount: "全片多數鏡頭" },
  { name: "Codex 靜圖", use: "關鍵格與歌手底圖", amount: "約 100 張候選，39 組選用" },
  { name: "AutoIP 對嘴", use: "歌手鏡頭與剪輯補位", amount: "11 段，9 段採用" },
  { name: "Kling 圖生影片", use: "窗簾、水、時鐘、手，以及城市與天色", amount: "15 次生成，14 支採用，共 1,200 點" },
];

export function WeiguangMvCase() {
  return (
    <div className="ac">
      <aside className="ac-aside">
        <AdminCaseToc items={toc} />
      </aside>

      <div className="ac-main">
        <p className="ac-lead">
          這頁整理兩支 AI 音樂 MV，以《微光的時刻》為主，它是一首寫給慢性病患者的陪伴歌。歌曲與影像素材由 AI 生成，這個案例想呈現的是導演與製作判斷：畫面要守哪些規則、哪些鏡頭值得交給 AI 影片、以及上傳後如何確認觀眾實際看到的品質。頁尾的《太陽的面容》是更早完成的作品。
        </p>

        <section id="film" className="ac-section cs-first">
          <header className="ac-section__head">
            <h2>《微光的時刻》成片與署名</h2>
            <p className="ac-meta">
              2560×1440，4 分 42 秒，全片 44 鏡。
              <a href="https://youtu.be/Y3V4uC96kFQ" target="_blank" rel="noopener noreferrer">
                在 YouTube 觀看 <ArrowUpRight size={13} />
                <span className="sr-only">（另開新分頁）</span>
              </a>
            </p>
          </header>
          <div className="cs-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/Y3V4uC96kFQ"
              title="《微光的時刻》MV"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="ac-table-wrap cs-credits">
            <table className="ac-table">
              <thead>
                <tr>
                  <th scope="col">項目</th>
                  <th scope="col">由誰完成</th>
                </tr>
              </thead>
              <tbody>
                {credits.map((credit) => (
                  <tr key={credit.role}>
                    <td>{credit.role}</td>
                    <td>{credit.who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="ac-note">
            作曲與演唱不列入本人的創作範圍。歌曲由 Suno 付費方案生成，發布時已揭露使用 AI。
          </p>
        </section>

        <section id="rules" className="ac-section">
          <header className="ac-section__head">
            <h2>影像規則</h2>
            <p>
              全片的母題是藥盒上「光挪一格」。AI 影片很容易把格子數畫錯，所以這個母題用靜圖加光效層完成；光線明暗與色溫也盡量在剪輯時處理，因為讓 AI 改光，物件和臉常會跟著變形。
            </p>
          </header>

          <ol className="ac-steps cs-rule-list">
            {rules.map((rule) => (
              <li key={rule.title}>
                <h3>{rule.title}</h3>
                <p>{rule.body}</p>
              </li>
            ))}
          </ol>

          <ul className="cs-frames">
            {frames.map((frame) => (
              <li key={frame.src}>
                <Image src={`/assets/weiguang/${frame.src}.webp`} alt={frame.alt} width={960} height={540} sizes="(max-width: 620px) 100vw, 380px" />
              </li>
            ))}
          </ul>
        </section>

        <section id="tools" className="ac-section">
          <header className="ac-section__head">
            <h2>AI 工具分工</h2>
            <p>
              依成本由低到高使用工具，能用下一層解決就不往上。44 鏡原本只規劃 8 鏡使用 AI 影片，粗剪後再補 6 支城市與天色鏡頭。每次生成都記錄工具、點數與採用結果。
            </p>
          </header>
          <div className="ac-table-wrap">
            <table className="ac-table">
              <thead>
                <tr>
                  <th scope="col">工具</th>
                  <th scope="col">負責</th>
                  <th scope="col">實際用量</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.name}>
                    <td>{tool.name}</td>
                    <td>{tool.use}</td>
                    <td>{tool.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ac-ops">
            <h3>角落動畫：同一個角色，換一種媒材</h3>
            <p>
              MV 右下角的迷豆兒，也是
              <Link href="/work/peta-days/" className="cs-inline-link">貼貼日和</Link>
              上架的 LINE 貼圖角色。動畫以 8 秒循環排在影片上層，並以程式寫入剪輯草稿；位置從字幕右緣之後開始，避免重疊。從 12 款動畫中選了閉眼抱音符的版本，因為它只有呼吸與輕微搖擺，不會搶畫面；睡著的款式放在這個題材容易被誤讀，所以不用。
            </p>
          </div>
        </section>

        <section id="release" className="ac-section">
          <header className="ac-section__head">
            <h2>發布驗證</h2>
            <p>發布後我會回頭確認觀眾實際拿到的版本，而不是傳完就結束。</p>
          </header>

          <article className="ac-feature">
            <div className="ac-feature__text">
              <h3>畫質重傳</h3>
              <p>
                第一版以 1080p 上傳，手機常直接開在 360p。比對串流格式後，發現這支影片只拿到簡化格式，480p 只有 AV1、VP9 只到 360p。
              </p>
              <ul>
                <li>改以 2560×1440 重新匯出上傳</li>
                <li>新片有 1440p VP9，1080p 以下的 H.264 與 VP9 齊全</li>
                <li>此為這支影片的實測，非 YouTube 公開規則</li>
              </ul>
            </div>
            <ShotLightbox
              image={{ src: "/assets/weiguang/thumb_compare.webp", width: 1110, height: 770, alt: "三款 YouTube 縮圖在一般與手機尺寸下的比較" }}
              caption="YouTube 縮圖三案：在一般尺寸與手機實際尺寸下比較，上線後以平台的 A/B 測試比對"
            />
          </article>
        </section>

        <section id="taiyang" className="ac-section">
          <header className="ac-section__head">
            <h2>更早的作品：《太陽的面容》</h2>
            <p>這支 MV 以舞台上的歌手為主。製作時累積的人臉穩定經驗，後來成為《微光的時刻》規劃鏡頭的依據。</p>
            <p className="ac-meta">
              1920×1080，3 分 25 秒，37 張中英字幕卡。
              <a href="https://youtu.be/yoBgBemWTI0" target="_blank" rel="noopener noreferrer">
                在 YouTube 觀看 <ArrowUpRight size={13} />
                <span className="sr-only">（另開新分頁）</span>
              </a>
            </p>
          </header>
          <div className="cs-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/yoBgBemWTI0"
              title="《太陽的面容》MV"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="ac-note">作曲、演唱為 Suno（AI 生成）；作詞、製作由本人與 Claude 協作；影像為 AI 生成（Codex、AutoIP）。</p>

          <ol className="ac-steps cs-face-fix">
            {faceFix.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
