"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Download, Mail, Rocket, ChevronDown, Printer } from "lucide-react";

interface StageHeroProps {
  onExploreNext: () => void;
}

/**
 * BRAWUKA-93 · Act 0 Hero Cover (Editorial & Minimalist)
 * Focused within max-w-2xl with generous side breathing room,
 * zero cluttered telemetry badges, publication-grade typography.
 */
export function StageHero({ onExploreNext }: StageHeroProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col justify-between px-6 py-10 sm:px-8 sm:py-14">
      {/* 1. Quiet Minimalist Eyebrow */}
      <div className="flex items-center justify-between border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <span className="font-semibold text-cobalt">00 // CAREER DOSSIER</span>
        <span className="text-[11px] opacity-75">SINGAPORE · 2026</span>
      </div>

      {/* 2. Editorial Statement & Title */}
      <div className="my-auto py-6 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
          {isZh ? "自正的工程师历程与战役实录" : "Engineering Flight Path"}
        </h1>

        <blockquote className="mx-auto mt-6 max-w-xl font-serif text-sm italic leading-relaxed text-secondary sm:text-base sm:leading-relaxed">
          &ldquo;A results-driven full-stack engineer with a passion for user-centric product development.
          Proactive in fostering a cooperative team environment and mentoring new talent.
          Excels in guiding projects from conception to successful completion.
          More importantly, values engineering ethic and believes good software products must do good to societies.&rdquo;
        </blockquote>

        {/* Action Hub */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center rounded-xs shadow-plate">
            <a
              href="/resume.pdf"
              download="Zizheng-Lyu-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-l-xs border border-cobalt bg-cobalt px-4 py-2 font-telemetry text-xs font-medium text-text-badge transition-all hover:opacity-90"
              aria-label="Download PDF Resume"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isZh ? "下载 A4 PDF 简历" : "DOWNLOAD RESUME"}</span>
            </a>
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center border border-l-0 border-cobalt bg-cobalt/85 px-2.5 py-2 text-text-badge transition-all hover:bg-cobalt"
              title={isZh ? "打印/生成 A4 简历" : "Print A4 Resume"}
              aria-label={isZh ? "打印/生成 A4 简历" : "Print A4 Resume"}
            >
              <Printer className="h-3.5 w-3.5" />
            </button>
          </div>

          <a
            href="mailto:lvzizhengde@gmail.com"
            className="inline-flex items-center gap-2 rounded-xs border border-border-plate/80 bg-surface/80 px-4 py-2 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Mail className="h-3.5 w-3.5 text-cobalt" />
            <span>{isZh ? "邮件联系" : "CONTACT"}</span>
          </a>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xs border border-border-plate/80 bg-surface/80 px-4 py-2 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Rocket className="h-3.5 w-3.5 text-terracotta" />
            <span>{isZh ? "独立产品雷达" : "PRODUCTS"}</span>
          </Link>
        </div>
      </div>

      {/* 3. Subtle Downward Indicator */}
      <div className="flex flex-col items-center">
        <button
          onClick={onExploreNext}
          type="button"
          className="group flex flex-col items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-primary"
          aria-label="Explore Act 1: Wise"
        >
          <span>{isZh ? "向下探索 · WISE" : "PROCEED TO WISE"}</span>
          <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
