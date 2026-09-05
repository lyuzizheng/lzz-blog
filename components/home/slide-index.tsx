"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { DeckEyebrow } from "./deck-eyebrow";
import { useReducedMotion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";

export interface SlideIndexProps {
  onScrollDown?: () => void;
}

/**
 * 1px 钴蓝细线家族 (DESIGN_V2 契约：只许一个 1px 钴蓝细线家族，全无多余修饰)
 * Physical registration mark & alignment crosshair in #2148B8 (Cobalt).
 */
function RegistrationCrosshair({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="6" stroke="#2148B8" strokeWidth="1" />
      <line x1="10" y1="1" x2="10" y2="19" stroke="#2148B8" strokeWidth="1" />
      <line x1="1" y1="10" x2="19" y2="10" stroke="#2148B8" strokeWidth="1" />
    </svg>
  );
}

/**
 * BRAWUKA-64 · Slide 2 四入口散落索引 (Overprint Collage)
 * 1. 一大（Darkroom 帧）+ 一小（Writings 卡）+ 一窄条（Flight 刻度）+ 一章戳（Products），压边 8~16px
 * 2. SVG 修饰只许一个 1px 钴蓝细线家族
 * 3. 桌面 hover 回正 + EXIF 一行（须有 focus 对等物）
 * 4. 移动端收敛垂直错位堆叠，禁横向溢出；入视口自动显影 (IntersectionObserver，禁纯 hover)
 * 5. prefers-reduced-motion 全退化堆叠
 */
export function SlideIndex({ onScrollDown }: SlideIndexProps) {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  const reduceMotion = useReducedMotion();

  // 移动端视口监听：IntersectionObserver 自动显影，禁纯 hover
  const [inViewStates, setInViewStates] = useState<Record<string, boolean>>({});
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-collage-id");
          if (id && entry.isIntersecting) {
            setInViewStates((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.25 },
    );

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="slide-2"
      aria-label="Slide 2 · 四入口散落索引"
      className="relative flex min-h-[100dvh] w-full snap-start snap-always flex-col justify-between overflow-x-clip px-4 pb-6 pt-2 sm:px-8 sm:pb-8"
    >
      {/* 屏内眉题 */}
      <DeckEyebrow section="§02" />

      {/* Collage 容器 */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-4 sm:py-6">
        <div className="mb-4 flex items-baseline justify-between border-b border-border-plate pb-2">
          <div className="flex items-center gap-2">
            <span className="font-telemetry text-xs tracking-widest text-cobalt font-semibold">
              INDEX // 01–04
            </span>
            <span className="text-border-plate">|</span>
            <span className="font-telemetry text-[11px] text-muted tracking-wider">
              OVERPRINT COLLAGE
            </span>
          </div>
          <RegistrationCrosshair className="h-4 w-4 opacity-75" />
        </div>

        {/* 桌面端：散落叠放（压边 8–16px + 旋转角度）
            移动端：垂直错位堆叠（严格禁止横向溢出） */}
        <div className="relative w-full">
          {/* 1px 钴蓝十字对齐标记（印刷校准线） */}
          <div className="pointer-events-none absolute -left-2 -top-2 hidden lg:block" aria-hidden="true">
            <RegistrationCrosshair />
          </div>
          <div className="pointer-events-none absolute -right-2 -bottom-2 hidden lg:block" aria-hidden="true">
            <RegistrationCrosshair />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-0 lg:py-6">
            {/* ——— 1. 一大：Darkroom 帧 (摄影暗房) ——— */}
            {/* 桌面占用 7 列，散落微倾 -2deg，压边与周边重叠 */}
            <div
              ref={(el) => {
                cardRefs.current["darkroom"] = el;
              }}
              data-collage-id="darkroom"
              className={`relative z-10 w-full transition-all duration-300 lg:col-span-7 ${
                reduceMotion
                  ? "rotate-0"
                  : "lg:-rotate-2 lg:hover:rotate-0 lg:focus-within:rotate-0"
              }`}
            >
              <Link
                href="/photography"
                className={`group block rounded-[2px] border border-border-plate bg-surface p-3 sm:p-4 shadow-plate transition-all duration-300 hover:border-cobalt hover:shadow-md focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2 ${
                  inViewStates["darkroom"] ? "border-cobalt/80" : ""
                }`}
              >
                {/* 顶栏微数据 */}
                <div className="mb-2.5 flex items-center justify-between border-b border-border-plate/60 pb-1.5 font-telemetry text-[10px] tracking-wider text-muted">
                  <span className="font-bold text-cobalt">02 · DARKROOM</span>
                  <span>▶ 01A · KODAK 400TX</span>
                  <ArrowUpRight className="h-3 w-3 text-muted group-hover:text-cobalt group-focus-visible:text-cobalt transition-colors" />
                </div>

                {/* 35mm 负片模拟头图 */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1px] bg-chamber border border-border-plate/40">
                  {/* Sprocket holes */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex justify-between bg-surface/80 px-1 py-0.5">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className="h-1 w-1.5 rounded-[1px] bg-primary/20" />
                    ))}
                  </div>

                  {/* 太阳与山脊矢量剪影 (Duotone Wash) */}
                  <svg
                    viewBox="0 0 110 80"
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    <rect width="110" height="80" className="fill-[var(--bg-chamber)]" />
                    <circle cx="70" cy="28" r="14" className="fill-cobalt opacity-80" />
                    <circle cx="70" cy="28" r="22" fill="none" stroke="#2148B8" strokeWidth="0.8" opacity="0.4" />
                    <path
                      d="M0 60 L28 42 L55 58 L86 36 L110 52 L110 80 L0 80 Z"
                      className="fill-[var(--bg-surface)]"
                      opacity="0.9"
                    />
                  </svg>
                  {/* Halftone overprint */}
                  <div className="halftone-screen pointer-events-none absolute inset-0 opacity-25" />

                  {/* 帧号与题注 */}
                  <span className="absolute bottom-2 left-2.5 font-telemetry text-[10px] tracking-widest text-primary/90 font-semibold">
                    FRAME 01 · {isZh ? "狮城蓝调时刻" : "SINGAPORE BLUE HOUR"}
                  </span>
                </div>

                {/* 交互矩阵：桌面 hover/focus-visible 显影 EXIF 一行；移动端入视口自动显影 */}
                <div
                  className={`mt-2.5 flex items-center justify-between font-telemetry text-[10px] sm:text-[11px] tracking-wider text-muted transition-colors ${
                    inViewStates["darkroom"] ? "text-primary" : "group-hover:text-primary group-focus-visible:text-primary"
                  }`}
                >
                  <span className="truncate">
                    SONY A7M4 · 35MM F1.4 GM · 1/250S · ISO 100
                  </span>
                  <span className="shrink-0 text-cobalt font-semibold ml-2">
                    [EXIF 8.9 EV]
                  </span>
                </div>
              </Link>
            </div>

            {/* ——— 2. 一小：Writings 卡 (文章归档) ——— */}
            {/* 桌面占用 5 列，压边 12px 叠放在 Darkroom 右侧，微倾 +2.5deg */}
            <div
              ref={(el) => {
                cardRefs.current["writings"] = el;
              }}
              data-collage-id="writings"
              className={`relative z-20 w-full transition-all duration-300 lg:-ml-4 lg:col-span-5 lg:mt-4 ${
                reduceMotion
                  ? "rotate-0"
                  : "lg:rotate-[2.5deg] lg:hover:rotate-0 lg:focus-within:rotate-0"
              }`}
            >
              <Link
                href="/posts"
                className={`group block rounded-[2px] border-2 border-border-strong bg-substrate p-3.5 sm:p-4 shadow-plate transition-all duration-300 hover:border-ink-dominant hover:shadow-md focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2 ${
                  inViewStates["writings"] ? "border-ink-dominant" : ""
                }`}
              >
                <div className="mb-2 flex items-center justify-between border-b border-border-plate pb-1.5 font-telemetry text-[10px] tracking-wider text-muted">
                  <span className="font-bold text-ink-dominant">01 · WRITINGS</span>
                  <span>VELITE MDX</span>
                  <ArrowUpRight className="h-3 w-3 text-muted group-hover:text-ink-dominant group-focus-visible:text-ink-dominant transition-colors" />
                </div>

                <h3 className="font-display text-lg sm:text-xl font-normal text-primary group-hover:text-ink-dominant transition-colors">
                  {isZh ? "分布式系统、基础架构与工程手艺" : "Distributed Systems, Infra & Craft"}
                </h3>
                <p className="mt-1.5 font-body text-xs leading-relaxed text-muted line-clamp-2">
                  {isZh
                    ? "长期主义工程思考与实践长文，收录架构、存储与手艺。"
                    : "Long-form thinking on high-concurrency systems and digital darkrooms."}
                </p>

                {/* 交互矩阵：EXIF 对等数据行 */}
                <div
                  className={`mt-3 flex items-center justify-between border-t border-border-plate/60 pt-2 font-telemetry text-[10px] tracking-wider text-muted transition-colors ${
                    inViewStates["writings"] ? "text-primary" : "group-hover:text-primary group-focus-visible:text-primary"
                  }`}
                >
                  <span>15 ARTICLES · 48K WORDS</span>
                  <span className="text-ink-dominant font-semibold">[INDEX]</span>
                </div>
              </Link>
            </div>

            {/* ——— 3. 一窄条：Flight 刻度 (航线履历) ——— */}
            {/* 桌面跨 8 列，压边 10px 垫在下层，微倾 -1.5deg */}
            <div
              ref={(el) => {
                cardRefs.current["flight"] = el;
              }}
              data-collage-id="flight"
              className={`relative z-15 w-full transition-all duration-300 lg:col-span-8 lg:-mt-4 lg:ml-2 ${
                reduceMotion
                  ? "rotate-0"
                  : "lg:-rotate-[1.5deg] lg:hover:rotate-0 lg:focus-within:rotate-0"
              }`}
            >
              <Link
                href="/resume"
                className={`group block rounded-[2px] border border-border-plate bg-surface px-3 py-2.5 sm:px-4 sm:py-3 shadow-plate transition-all duration-300 hover:border-cobalt hover:shadow-md focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2 ${
                  inViewStates["flight"] ? "border-cobalt/80" : ""
                }`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 font-telemetry text-[10px] tracking-wider text-muted">
                    <span className="font-bold text-cobalt">03 · FLIGHT</span>
                    <span className="text-border-plate">|</span>
                    <span className="font-semibold text-primary">NTU → BYTEDANCE</span>
                  </div>

                  {/* 刻度标尺 */}
                  <div className="flex items-center gap-1.5 font-telemetry text-[10px] text-muted">
                    <span className="text-border-plate">[2018]</span>
                    <span className="h-px w-6 sm:w-12 bg-cobalt/60" />
                    <span className="text-cobalt">✈</span>
                    <span className="h-px w-6 sm:w-12 bg-cobalt/60" />
                    <span className="text-border-plate">[2026]</span>
                  </div>

                  <ArrowUpRight className="hidden sm:block h-3 w-3 text-muted group-hover:text-cobalt group-focus-visible:text-cobalt transition-colors" />
                </div>

                {/* 交互矩阵：EXIF 对等遥测行 */}
                <div
                  className={`mt-1.5 flex items-center justify-between font-telemetry text-[10px] tracking-wider text-muted transition-colors ${
                    inViewStates["flight"] ? "text-primary" : "group-hover:text-primary group-focus-visible:text-primary"
                  }`}
                >
                  <span className="truncate">01°20&apos;N 103°49&apos;E · SINGAPORE → GLOBAL INFRA</span>
                  <span className="text-cobalt font-semibold ml-2">[DOSSIER]</span>
                </div>
              </Link>
            </div>

            {/* ——— 4. 一章戳：Products (产品印记) ——— */}
            {/* 桌面跨 4 列，压边 14px 错位盖在 Flight 右边缘，微倾 +3.5deg */}
            <div
              ref={(el) => {
                cardRefs.current["products"] = el;
              }}
              data-collage-id="products"
              className={`relative z-25 w-full transition-all duration-300 lg:-ml-6 lg:col-span-4 lg:-mt-8 ${
                reduceMotion
                  ? "rotate-0"
                  : "lg:rotate-[3.5deg] lg:hover:rotate-0 lg:focus-within:rotate-0"
              }`}
            >
              <Link
                href="/products"
                className={`group block rounded-full border-2 border-dashed border-cobalt/80 bg-substrate p-4 text-center shadow-plate transition-all duration-300 hover:border-cobalt hover:shadow-md focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2 ${
                  inViewStates["products"] ? "border-cobalt" : ""
                }`}
              >
                <div className="flex flex-col items-center justify-center font-telemetry">
                  <div className="text-[9px] font-bold tracking-[0.2em] text-cobalt uppercase">
                    ★ SEAL · STATUS ★
                  </div>
                  <div className="my-1 font-display text-base font-normal tracking-tight text-primary group-hover:text-cobalt transition-colors">
                    04 · {isZh ? "产品实验" : "PRODUCTS"}
                  </div>
                  <div className="text-[10px] tracking-wider text-text-secondary font-semibold">
                    OPERATING · INCUBATING
                  </div>
                  {/* EXIF 对等行 */}
                  <div
                    className={`mt-1.5 text-[9px] tracking-widest text-muted transition-colors ${
                      inViewStates["products"] ? "text-primary" : "group-hover:text-primary group-focus-visible:text-primary"
                    }`}
                  >
                    COFFEEMODE · CANCAN · VILLAGE
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 底部翻页指引 */}
      <footer className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-border-plate pt-3 font-telemetry text-[11px] tracking-wider text-muted">
        <span className="uppercase">
          02 / 03 · {isZh ? "散落索引" : "INDEX"}
        </span>
        {onScrollDown ? (
          <button
            type="button"
            onClick={onScrollDown}
            className="inline-flex items-center gap-1 transition-colors hover:text-ink-dominant cursor-pointer"
          >
            <span>{isZh ? "进入尾注终屏" : "ENTER COLOPHON"}</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          </button>
        ) : (
          <a
            href="#slide-3"
            className="inline-flex items-center gap-1 transition-colors hover:text-ink-dominant"
          >
            <span>{isZh ? "向下滚动进入尾注终屏" : "SCROLL FOR COLOPHON"}</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          </a>
        )}
      </footer>
    </section>
  );
}
