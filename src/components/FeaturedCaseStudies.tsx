import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getFeaturedProjects, getProjectCardImage } from "@/data/projects";
import { ScrollReveal } from "@/components/ScrollReveal";

export function FeaturedCaseStudies() {
  const featured = getFeaturedProjects();

  return (
    <section id="featured" className="section featured">
      <div className="site-container">
        <ScrollReveal className="section-head-wrap">
          <p className="eyebrow">
            <Sparkles size={14} className="eyebrow-icon" /> Featured case studies
          </p>
          <h2 className="section-title">
            <span className="text-nowrap">從畫面看見</span>
            <span className="text-nowrap">設計與實作的過程。</span>
          </h2>
          <p className="section-intro">
            精選作品先說明工作範圍，再提供可閱讀的圖集與網站入口。
          </p>
        </ScrollReveal>

        <div className="featured-grid">
          {featured.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 0.15}>
              <article className="card feature-card">
                <Link
                  href={`/work/${project.slug}/`}
                  prefetch={false}
                  className="feature-card__image"
                  aria-label={`精選案例：查看 ${project.title} 案例`}
                >
                  <Image
                    src={getProjectCardImage(project.images[0])}
                    alt={project.imageCaptions?.[0] ?? project.title}
                    fill
                    sizes="(max-width: 620px) calc(100vw - 3rem), (max-width: 1200px) 50vw, 580px"
                  />
                  <div className="feature-card__badge-overlay" aria-hidden="true">
                    <span>精選案例</span>
                  </div>
                </Link>
                <div className="feature-card__body">
                  <div className="feature-card__header">
                    <div className="feature-card__tags">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span className="tag tag--sm" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3>
                      <Link href={`/work/${project.slug}/`} prefetch={false}>{project.title}</Link>
                    </h3>
                    <p>{project.subtitle}</p>
                  </div>
                  <div className="feature-card__footer">
                    <Link
                      className="button button--quiet feature-card__cta"
                      href={`/work/${project.slug}/`}
                      prefetch={false}
                    >
                      <span>閱讀案例</span>
                      <ArrowUpRight size={15} className="feature-card__cta-icon" />
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
