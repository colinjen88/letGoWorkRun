"use client";

import { useState } from "react";
import { Copy, Mail, Check, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/projects";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <footer id="contact" className="site-footer">
      <div className="site-container footer-inner">
        <div className="footer-status-pill">
          <span className="footer-status-dot" aria-hidden="true" />
          <span>支援線上協作 • 隨時歡迎交流與合作機會</span>
        </div>

        <h2 className="section-title footer-title">
          <span className="text-nowrap">一起把想法</span>
          <span className="text-nowrap">做成富有手感的好體驗。</span>
        </h2>

        <p className="footer-copy">
          若你正在尋找能把設計稿精緻落地、兼顧動態細節與程式碼結構的跨領域夥伴，歡迎直接來信。
        </p>

        <div className="footer-contact-box">
          {/* Cloudflare email obfuscation prevention to eliminate email-decode.min.js */}
          <span dangerouslySetInnerHTML={{ __html: '<!--email_off-->' }} />
          <div className="footer-email-display">
            <span className="footer-email-label">DIRECT EMAIL</span>
            <a className="footer-email-link" href={`mailto:${personalInfo.email}`}>
              <Mail size={18} />
              <span>{personalInfo.email}</span>
            </a>
          </div>

          <div className="footer-actions">
            <a
              className="button button--primary"
              href={`mailto:${personalInfo.email}`}
            >
              <Mail size={16} />
              <span>開啟郵件客戶端</span>
            </a>
            <button
              className={`button button--secondary ${copied ? "button--copied" : ""}`}
              type="button"
              onClick={copyEmail}
              aria-label="複製 Email 地址"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Email 已複製，期待來信！</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>複製 Email</span>
                </>
              )}
            </button>
          </div>
        <span dangerouslySetInnerHTML={{ __html: '<!--/email_off-->' }} />
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} WANG • Crafted with Next.js &amp; Design Care. All works protected.
          </p>
          <div className="footer-tags">
            <a href="/dark.html" className="footer-legacy-link">舊版作品集</a>
            <span>#UI/UX</span>
            <span>#MotionDesign</span>
            <span>#CreativeFrontend</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
