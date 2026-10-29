"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ArrowLeft, Moon } from "lucide-react";
import { personalInfo } from "@/data/projects";

const navItems = [
  { label: "關於我", id: "about", href: "/#about" },
  { label: "核心技術", id: "expertise", href: "/#expertise" },
  { label: "精選案例", id: "featured", href: "/#featured" },
  { label: "完整作品", id: "works", href: "/#works" },
  { label: "工作哲學", id: "whyme", href: "/#whyme" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const pathname = usePathname();
  const isCaseStudy = pathname?.startsWith("/work/");

  // IntersectionObserver ScrollSpy on homepage (zero forced reflow)
  useEffect(() => {
    if (isCaseStudy) return;

    const sectionIds = ["about", "expertise", "featured", "works", "whyme", "contact"];
    const desktopViewport = window.matchMedia("(min-width: 861px)");
    let observer: IntersectionObserver | null = null;

    const syncScrollSpy = () => {
      observer?.disconnect();
      observer = null;
      if (!desktopViewport.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        }
      );

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer?.observe(element);
      });
    };

    desktopViewport.addEventListener("change", syncScrollSpy);
    syncScrollSpy();

    return () => {
      observer?.disconnect();
      desktopViewport.removeEventListener("change", syncScrollSpy);
    };
  }, [isCaseStudy]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="site-nav" aria-label="主要導覽">
        <div className="nav-surface">
          <Link href="/" prefetch={false} className="nav-brand" onClick={closeMenu}>
            <span className="nav-mark">W.</span>
            <span>
              {personalInfo.name}
              <span className="nav-brand-suffix">.STUDIO</span>
            </span>
          </Link>

          {isCaseStudy ? (
            <div className="nav-case-badge">
              <span className="nav-case-dot" aria-hidden="true" />
              <span>案例深度解析</span>
            </div>
          ) : (
            <div className="nav-links">
              {navItems.map(({ label, id, href }) => {
                const isActive = !isCaseStudy && activeSection === id;
                return (
                  <Link key={href} href={href} prefetch={false}
                    className={`nav-link ${isActive ? "nav-link--active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="nav-actions">
            {/* 案例頁不放切換舊版的入口，避免讀到一半被帶離 */}
            {!isCaseStudy && (
              <a
                href="/dark.html"
                className="theme-toggle-btn"
                aria-label="切換至原版深色作品集"
                title="切換至原版深色作品集"
              >
                <Moon size={16} />
              </a>
            )}

            {isCaseStudy ? (
              <Link href="/#works" prefetch={false} className="button button--secondary button--sm nav-case-return">
                <ArrowLeft size={14} /> 回作品庫
              </Link>
            ) : null}

            {/* 案例頁底部就有聯絡區，直接捲到本頁頁尾 */}
            <a href={isCaseStudy ? "#contact" : "/#contact"} className="button button--primary button--sm nav-cta">
              <span>開始合作</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              className="nav-toggle"
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? "關閉選單" : "開啟選單"}
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div id="mobile-navigation" className="nav-menu">
            {isCaseStudy && (
              <Link href="/#works" onClick={closeMenu} className="nav-menu-case-link">
                <ArrowLeft size={16} /> 返回完整作品庫
              </Link>
            )}
            {navItems.map(({ label, href }) => (
              <Link key={href} href={href} prefetch={false} onClick={closeMenu}>
                {label}
              </Link>
            ))}
            <div className="nav-menu-footer">
              {!isCaseStudy && (
                <a
                  href="/dark.html"
                  className="mobile-theme-btn"
                >
                  <Moon size={15} />
                  <span>切換至原版深色作品集</span>
                </a>
              )}
              <a href={isCaseStudy ? "#contact" : "/#contact"} onClick={closeMenu} className="mobile-cta-link">
                聯絡我
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
