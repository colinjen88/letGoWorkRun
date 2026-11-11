import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProjectBySlug, getFeaturedProjects, projects } from "@/data/projects";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { AdminSystemsCase } from "@/components/AdminSystemsCase";
import { ElephantClinicCase } from "@/components/ElephantClinicCase";
import { PetaDaysCase } from "@/components/PetaDaysCase";
import { WeiguangMvCase } from "@/components/WeiguangMvCase";
import { ShotLightbox } from "@/components/ShotLightbox";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((project) => project.slug).map(({ slug }) => ({ slug: slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  return project
    ? {
        title: `${project.title}｜案例解析`,
        description: project.summary,
        alternates: { canonical: `/work/${project.slug}/` },
        openGraph: {
          title: `${project.title}｜WANG 作品集`,
          description: project.summary,
          images: [{ url: project.images[0], alt: project.imageCaptions?.[0] ?? project.title }],
        },
      }
    : {};
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Find adjacent featured projects for case switcher
  const featuredList = getFeaturedProjects();
  const currentIndex = featuredList.findIndex((p) => p.slug === slug);
  const prevProject =
    currentIndex > 0
      ? featuredList[currentIndex - 1]
      : featuredList[featuredList.length - 1];
  const nextProject =
    currentIndex < featuredList.length - 1
      ? featuredList[currentIndex + 1]
      : featuredList[0];

  const site = "https://let.gowork.run";
  const pageUrl = `${site}/work/${project.slug}/`;
  const caseJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      headline: project.subtitle,
      description: project.summary,
      url: pageUrl,
      inLanguage: "zh-TW",
      image: project.images.map((src) => `${site}${src}`),
      keywords: project.tags.join(", "),
      creator: { "@type": "Person", name: "WANG", url: `${site}/` },
      ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首頁", item: `${site}/` },
        { "@type": "ListItem", position: 2, name: "作品庫", item: `${site}/#works` },
        { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
      ],
    },
  ];

  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      <main id="main-content" className="site-container work-page">
        {/* Navigation / Breadcrumbs */}
        <div className="work-nav-bar">
          <nav className="breadcrumbs" aria-label="麵包屑導覽">
            <Link href="/" className="breadcrumb-link">
              首頁
            </Link>
            <span className="breadcrumb-separator" aria-hidden="true">
              /
            </span>
            <Link href="/#works" className="breadcrumb-link">
              作品庫
            </Link>
            <span className="breadcrumb-separator" aria-hidden="true">
              /
            </span>
            <span className="breadcrumb-current" aria-current="page">
              {project.title}
            </span>
          </nav>

          <Link className="back-button-pill" href="/#works">
            <ArrowLeft size={16} />
            <span>返回完整作品庫</span>
          </Link>
        </div>

        {/* Case Header */}
        <header className="work-header">
          <div>
            <p className="eyebrow">Case study</p>
            <h1>{project.title}</h1>
            <p className="work-subtitle">{project.subtitle}</p>
            <div className="tags" style={{ marginTop: "1rem" }}>
              {project.tags.map((tag) => (
                <span className="tag tag--accent" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="card work-aside">
            <h2>本人工作範圍</h2>
            <p>{project.details?.role ?? "作品展示與相關連結整理"}</p>
            <div className="work-links">
              {project.liveUrl && (
                <a
                  className="button button--primary"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  前往線上網站 <ArrowUpRight size={16} />
                </a>
              )}
              {project.showcaseUrl && (
                <a
                  className="button button--secondary"
                  href={project.showcaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  查看開發介紹 <ArrowUpRight size={16} />
                </a>
              )}
              {project.slug === "admin-systems" && (
                <a className="button button--primary" href="#concept-demo">
                  直接操作概念 Demo <ArrowDown size={16} />
                </a>
              )}
              {project.slug === "ai-music-mv" && (
                <a className="button button--primary" href="#film">
                  直接觀看 MV <ArrowDown size={16} />
                </a>
              )}
            </div>
          </aside>
        </header>

        {/* 這些案例的圖片與說明都在自訂版面中，不再重複一般圖集與筆記 */}
        {project.slug === "admin-systems" ? (
          <AdminSystemsCase />
        ) : project.slug === "elephant-clinic" ? (
          <ElephantClinicCase />
        ) : project.slug === "peta-days" ? (
          <PetaDaysCase />
        ) : project.slug === "ai-music-mv" ? (
          <WeiguangMvCase />
        ) : (
        <>
        {/* Gallery */}
        <div className="gallery">
          {project.images.map((image, index) => (
            <ShotLightbox
              key={image}
              image={{
                src: image,
                width: 1600,
                height: 1000,
                alt: project.imageCaptions?.[index] ?? `${project.title} 畫面 ${index + 1}`,
              }}
              caption={`圖 ${index + 1}：${project.imageCaptions?.[index] ?? `${project.title} 畫面`}`}
              figureClassName=""
              triggerClassName="gallery-shot"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority={index === 0}
            />
          ))}
        </div>

        {/* Project Notes */}
        {project.details && (
          <div className="details">
            <aside>
              <p className="eyebrow">Project notes</p>
              <p className="section-intro">
                內容依現有作品素材整理，未附量測數據的成果以交付內容呈現。
              </p>
            </aside>
            <div>
              <section className="detail-block">
                <p className="eyebrow">Challenge</p>
                <h2>專案焦點</h2>
                <p>{project.details.challenge}</p>
              </section>
              <section className="detail-block">
                <p className="eyebrow">Approach</p>
                <h2>設計與實作方向</h2>
                <ul>
                  {project.details.approach.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section className="detail-block">
                <p className="eyebrow">Deliverables</p>
                <h2>作品中的交付內容</h2>
                <ul>
                  {project.details.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}
        </>
        )}

        {/* Case Switcher (Prev / Next Case Navigation) */}
        <nav className="case-switcher" aria-label="其他案例切換">
          <div className="case-switcher__header">
            <p className="eyebrow">Explore more</p>
            <h2>繼續瀏覽其他精選案例</h2>
          </div>
          <div className="case-switcher__grid">
            <Link
              href={`/work/${prevProject.slug}/`}
              prefetch={false}
              className="card case-switcher__card case-switcher__card--prev"
            >
              <span className="case-switcher__direction">
                <ArrowLeft size={16} /> 上一個案例
              </span>
              <strong className="case-switcher__title">{prevProject.title}</strong>
              <span className="case-switcher__sub">{prevProject.subtitle}</span>
            </Link>
            <Link
              href={`/work/${nextProject.slug}/`}
              prefetch={false}
              className="card case-switcher__card case-switcher__card--next"
            >
              <span className="case-switcher__direction">
                下一個案例 <ArrowRight size={16} />
              </span>
              <strong className="case-switcher__title">{nextProject.title}</strong>
              <span className="case-switcher__sub">{nextProject.subtitle}</span>
            </Link>
          </div>
        </nav>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
