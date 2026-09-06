"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { DeckEyebrow } from "./deck-eyebrow";
import { ArrowUpRight } from "lucide-react";

/**
 * BRAWUKA-64 · Slide 3 Colophon 终屏
 * - 屏内眉脚：左 LZZ · §03，右 01–04 索引 + LanguageSwitch + 昼夜点
 * - 终屏纸/墨规约 + 字阶样本 + 系统底座寄存器
 * - 到底即止（三屏封顶，无额外冗余滚动）
 */
export function SlideColophon() {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";

  return (
    <section
      id="slide-3"
      aria-label="Slide 3 · 尾注印记 Colophon"
      className="relative flex min-h-[100dvh] w-full snap-start snap-always flex-col justify-between px-4 pb-6 pt-2 sm:px-8 sm:pb-8"
    >
      {/* 屏内眉题 */}
      <DeckEyebrow section="§03" />

      {/* Colophon 主体 */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-6 sm:py-8">
        <div className="mb-6 border-b border-border-plate pb-3">
          <span className="font-telemetry text-xs uppercase tracking-widest text-cobalt font-semibold">
            REGISTER // COLOPHON
          </span>
          <h2 className="mt-2 font-display text-3xl font-normal tracking-tight text-primary sm:text-5xl">
            {isZh ? "尾注 · 纸墨印记与工程规约" : "Colophon · Print Formula & Craft"}
          </h2>
          <p className="mt-2 font-body text-base text-muted max-w-xl">
            {isZh
              ? "物理装帧与数字暗房的长期试验田。全站采用单专色孔版叠印物理渲染，不设任何冗余装饰。"
              : "A digital darkroom and engineering atelier grounded in physical printmaking invariants."}
          </p>
        </div>

        {/* 三列致密规约卡片 (DESIGN_V2 §2 纸媒装帧) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 font-telemetry text-xs">
          {/* 01 字体 */}
          <div className="rounded-[2px] border border-border-plate bg-surface p-4 shadow-plate">
            <div className="text-[10px] uppercase tracking-widest text-cobalt font-bold mb-2">
              01 / TYPOGRAPHY
            </div>
            <div className="font-display text-base text-primary mb-1">
              Newsreader + Noto Serif SC
            </div>
            <div className="text-muted leading-relaxed text-[11px]">
              标题字阶采用 Newsreader 衬线，正文由 Noto Serif SC 定稿，遥测数据统归 Geist Mono。严格杜绝全无衬线 AI 味。
            </div>
          </div>

          {/* 02 纸墨配方 */}
          <div className="rounded-[2px] border border-border-plate bg-surface p-4 shadow-plate">
            <div className="text-[10px] uppercase tracking-widest text-cobalt font-bold mb-2">
              02 / PALETTE FORMULA
            </div>
            <div className="font-mono text-xs text-primary mb-1 font-semibold">
              #F5F1E8 · #2148B8 · #E05454
            </div>
            <div className="text-muted leading-relaxed text-[11px]">
              温润纸底 Pale Beige (#F5F1E8) 直出；日间主墨 Cobalt Blue (#2148B8)，暗房夜景 Kodak Red (#E05454) 安全灯；叠印 #18224B。
            </div>
          </div>

          {/* 03 系统底座 */}
          <div className="rounded-[2px] border border-border-plate bg-surface p-4 shadow-plate">
            <div className="text-[10px] uppercase tracking-widest text-cobalt font-bold mb-2">
              03 / RUNTIME & ENGINE
            </div>
            <div className="font-mono text-xs text-primary mb-1 font-semibold">
              NEXT.JS 15 · TURBOPACK · VELITE
            </div>
            <div className="text-muted leading-relaxed text-[11px]">
              App Router React 19 服务端组件优先，Velite 强类型 MDX 校验，Cloudflare Workers 边缘交付，Lenis 动力学滚动。
            </div>
          </div>
        </div>

        {/* 快捷导航与直达通道 */}
        <nav
          aria-label="尾注直达通道"
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border-plate/60 pt-4 font-telemetry text-xs tracking-wider"
        >
          <a
            href="/feed.xml"
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-primary"
          >
            <span>[RSS FEED]</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <Link
            href="/status"
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-primary"
          >
            <span>[SYSTEM STATUS]</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <Link
            href="/resume"
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-primary"
          >
            <span>[RESUME DOSSIER]</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-primary"
          >
            <span>[A4 PDF DOWNLOAD]</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href="https://github.com/lyuzizheng/lzz-blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-primary"
          >
            <span>[SOURCE REPO]</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </nav>
      </div>

      {/* 终屏底注：到底即止 */}
      <footer className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-border-plate pt-3 font-telemetry text-[11px] tracking-wider text-muted">
        <span>© 2026 ZIZHENG LYU · LZZ ATELIER</span>
        <span className="tabular-nums">01°20&apos;N 103°49&apos;E // ATELIER END</span>
      </footer>
    </section>
  );
}
