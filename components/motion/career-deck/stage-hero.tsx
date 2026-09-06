"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Download, Mail, Rocket, ChevronDown, Compass, Printer } from "lucide-react";

interface StageHeroProps {
  onExploreNext: () => void;
}

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
    <div className="relative flex h-full min-h-[calc(100dvh-3.5rem)] w-full flex-col justify-between px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
      {/* Top Telemetry Header */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-b border-border-plate pb-3 font-telemetry text-[11px] uppercase tracking-wider text-muted">
        <div className="flex items-center gap-3">
          <span className="font-bold text-cobalt">ACT 00 // MISSION CONTROL</span>
          <span className="text-border-plate">|</span>
          <span>ORIGIN // ZIZHENG LYU</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">01°20′N 103°49′E</span>
          <span className="text-border-plate">|</span>
          <span className="text-primary">SINGAPORE</span>
        </div>
      </div>

      {/* Central Statement & Mission Focus */}
      <div className="mx-auto my-auto w-full max-w-4xl py-6 text-center lg:py-10">
        {/* Monospaced Eyebrow Stamp */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-xs border border-border-plate bg-surface/80 px-3 py-1 font-telemetry text-xs uppercase tracking-widest text-muted backdrop-blur-xs">
          <Compass className="h-3.5 w-3.5 text-cobalt" />
          <span>CAREER EXPERIENCE &amp; ENGINEERING DOSSIER</span>
        </div>

        {/* Display Title */}
        <h1 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          {isZh ? "自正的工程师历程与战役实录" : "Engineering Chronicles & Flight Path"}
        </h1>

        {/* The Central Statement (Verbatim) */}
        <blockquote className="mx-auto mt-6 max-w-3xl font-serif text-base italic leading-relaxed text-secondary sm:text-xl sm:leading-relaxed">
          &ldquo;A results-driven full-stack engineer with a passion for user-centric product development.
          Proactive in fostering a cooperative team environment and mentoring new talent.
          Excels in guiding projects from conception to successful completion.
          More importantly, values engineering ethic and believes good software products must do good to societies.&rdquo;
        </blockquote>

        {/* Action Hub (3 primary buttons) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:mt-10">
          {/* Download Resume (PDF direct + print trigger) */}
          <div className="inline-flex items-center rounded-xs shadow-plate">
            <a
              href="/resume.pdf"
              download="Zizheng-Lyu-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-l-xs border border-cobalt bg-cobalt px-4 py-2.5 font-telemetry text-xs font-medium text-text-badge transition-all hover:opacity-90"
              aria-label="Download PDF Resume"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isZh ? "下载 PDF 简历" : "DOWNLOAD RESUME"}</span>
            </a>
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center border border-l-0 border-cobalt bg-cobalt/85 px-2.5 py-2.5 text-text-badge transition-all hover:bg-cobalt"
              title={isZh ? "打印/生成 A4 简历" : "Print A4 Resume"}
              aria-label={isZh ? "打印/生成 A4 简历" : "Print A4 Resume"}
            >
              <Printer className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Email Contact */}
          <a
            href="mailto:lvzizhengde@gmail.com"
            className="inline-flex items-center gap-2 rounded-xs border border-border-plate bg-surface px-4 py-2.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Mail className="h-3.5 w-3.5 text-cobalt" />
            <span>{isZh ? "邮件联系 (Direct Mail)" : "CONTACT (EMAIL)"}</span>
          </a>

          {/* Side Projects Radar */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xs border border-border-plate bg-surface px-4 py-2.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Rocket className="h-3.5 w-3.5 text-terracotta" />
            <span>{isZh ? "我的独立产品 (Side Projects)" : "EXPLORE PRODUCTS"}</span>
          </Link>
        </div>
      </div>

      {/* Downward Exploration Indicator (Animated Chevron Down) */}
      <div className="mx-auto flex flex-col items-center pb-2">
        <button
          onClick={onExploreNext}
          type="button"
          className="group flex flex-col items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-primary"
          aria-label="Explore Act 1: Wise"
        >
          <span>{isZh ? "向下探索第一幕 · WISE" : "PROCEED TO ACT 01 · WISE"}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border-plate/60 bg-surface/80 shadow-xs transition-transform group-hover:translate-y-1">
            <ChevronDown className="h-4 w-4 animate-bounce text-cobalt" />
          </span>
        </button>
      </div>
    </div>
  );
}
