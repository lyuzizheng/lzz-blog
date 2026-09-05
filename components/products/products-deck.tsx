"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, type ProductItem } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import { ArrowUpRight, ChevronDown, Compass } from "lucide-react";

/**
 * BRAWUKA-62 · ProductsDeck — 04 Products (/products) 策展式一屏一产品展台
 *
 * 规范约束（依据 BRAWUKA-61 Q8 锁死与 BRAWUKA-62 交付要求）：
 * 1. 一屏一产品（snap-y snap-mandatory 策展式翻页 deck 模型，scroll 为翻页信号）。
 * 2. 具备 scroll-jacking 安全风控（非侵入原生 CSS scroll-snap，随时可打断、可回退自由滚）。
 * 3. 键盘控制契约：ArrowUp / ArrowDown、j / k 翻屏，1 / 2 / 3 定帧直达。
 * 4. 严格呈现：mono 网点头图 + 一句话文案 (≤40 字) + 状态章 (开发中 / 已上线) + 单一外链。
 * 5. 移动端退化：自然流动垂直错位堆叠，严格禁止横向溢出。
 */
export function ProductsDeck() {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  // 滚动监听：使用 IntersectionObserver 获取当前聚焦的 Slide
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observers: IntersectionObserver[] = [];
    slideRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              setActiveIndex(index);
            }
          });
        },
        { root: container, threshold: [0.5] },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // 键盘控制契约：j/k, ArrowUp/ArrowDown, 1-3 定帧
  const scrollToSlide = useCallback((index: number) => {
    const target = slideRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 避免输入框冲突
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "j") {
        event.preventDefault();
        setActiveIndex((prev) => {
          const next = Math.min(prev + 1, PRODUCTS.length - 1);
          scrollToSlide(next);
          return next;
        });
      } else if (event.key === "ArrowUp" || event.key === "k") {
        event.preventDefault();
        setActiveIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          scrollToSlide(next);
          return next;
        });
      } else if (event.key >= "1" && event.key <= String(PRODUCTS.length)) {
        const slot = Number.parseInt(event.key, 10) - 1;
        event.preventDefault();
        scrollToSlide(slot);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollToSlide]);

  return (
    <div className="relative w-full bg-substrate text-primary transition-colors duration-300">
      {/* 侧边章节序号 Rail (DESIGN V2 §5.6 TOC 与进度融合规则) */}
      <nav
        aria-label="Products Frame Rail"
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 font-telemetry text-xs lg:flex"
      >
        {PRODUCTS.map((product, idx) => {
          const isActive = activeIndex === idx;
          const pct = Math.round(((idx + 1) / PRODUCTS.length) * 100);
          return (
            <button
              key={product.id}
              onClick={() => scrollToSlide(idx)}
              className={`group flex items-center justify-end gap-2.5 transition-all ${
                isActive ? "text-cobalt font-bold" : "text-muted hover:text-primary"
              }`}
              aria-current={isActive ? "step" : undefined}
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100">
                {product.name}
              </span>
              <span className="tracking-widest">
                §0{idx + 1} · {pct}%
              </span>
              <span
                className={`h-4 w-1 transition-all rounded-[1px] ${
                  isActive ? "bg-cobalt scale-y-125" : "bg-border-plate group-hover:bg-muted"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* 策展式翻页 Snap 容器 */}
      <div
        ref={containerRef}
        className="h-[calc(100dvh-3.5rem)] w-full snap-y snap-mandatory overflow-y-auto scroll-smooth focus:outline-none"
        tabIndex={0}
        aria-label="Curated Products Slides"
      >
        {PRODUCTS.map((product, index) => {
          const isFirst = index === 0;
          const isLast = index === PRODUCTS.length - 1;
          const tagline = isZh ? product.taglineZh : product.taglineEn;
          const statusStamp = isZh ? product.statusStampZh : product.statusStampEn;
          const linkText = isZh ? product.link.labelZh : product.link.label;

          return (
            <section
              key={product.id}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              id={`product-${product.id}`}
              className="relative flex min-h-[calc(100dvh-3.5rem)] w-full snap-start snap-always items-center justify-center border-b border-border-plate/30 px-4 py-8 sm:px-8 sm:py-12 lg:px-16"
              aria-label={`${product.name} Showcase`}
            >
              {/* 背景微网格水印 (Mono Grid Accent) */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                  backgroundImage: `radial-gradient(var(--ink-dominant) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
                aria-hidden="true"
              />

              <div className="relative mx-auto w-full max-w-6xl">
                {/* 顶部遥测数据条 (Stripe/GitHub 式致密数据条 · DESIGN V2 §2 锚 C) */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-border-plate pb-2 font-telemetry text-[11px] uppercase tracking-wider text-muted">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-cobalt">PLATE 0{index + 1} / 03</span>
                    <span className="text-border-plate">|</span>
                    <span>{product.codename}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline">{product.coordinates}</span>
                    <span className="text-border-plate">|</span>
                    <span className="font-semibold text-primary">{product.statusTelemetry}</span>
                  </div>
                </div>

                {/* 核心双栏架构：左侧 mono 矢量头图 + 右侧文案与外链 */}
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  {/* 左栏 (7/12)：DESIGN V2 单专色 mono 网点矢量头图 */}
                  <div className="lg:col-span-7">
                    <div className="group relative overflow-hidden rounded-[2px] border border-border-plate bg-surface p-2 shadow-plate transition-all">
                      {/* 1px 工整绘图板边缘装帧 */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5F1E8]">
                        <Image
                          src={product.coverSvg}
                          alt={`${product.name} technical blueprint illustration`}
                          fill
                          priority={isFirst}
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 58vw"
                        />
                      </div>

                      {/* 图像说明 Caption (合法 Telemetry 位置 · DESIGN V2 §5.5) */}
                      <div className="mt-2 flex items-center justify-between px-1 font-telemetry text-[10px] text-muted">
                        <span className="tracking-wide">
                          FIG.0{index + 1} — {product.name.toUpperCase()} SCHEMATIC
                        </span>
                        <span className="text-cobalt">MONO-COLOR // COBALT #2148B8</span>
                      </div>
                    </div>
                  </div>

                  {/* 右栏 (5/12)：文案定稿 + 状态章 + 独立外链 */}
                  <div className="flex flex-col justify-center space-y-6 lg:col-span-5">
                    {/* 产品标题与状态章 Stamp */}
                    <div>
                      <div className="mb-2 flex items-center gap-2 font-telemetry text-xs uppercase tracking-widest text-muted">
                        <Compass className="h-3.5 w-3.5 text-cobalt" />
                        <span>INDEPENDENT PRODUCT EXPERIMENT</span>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-3">
                        <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                          {product.name}
                        </h2>

                        {/* 状态章 Stamp (实物印章质感：2px 圆角 + 1px 规则边框 + 专色高亮) */}
                        <div
                          className="inline-flex items-center gap-1.5 rounded-[2px] border border-cobalt/60 bg-cobalt/10 px-2.5 py-0.5 font-telemetry text-[11px] font-bold tracking-wider text-cobalt shadow-xs"
                          role="status"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-cobalt animate-pulse" />
                          <span>{statusStamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* 文案定稿：严格 ≤40 汉字一句话 (文学衬线排印) */}
                    <div className="border-l-2 border-cobalt/40 pl-4">
                      <p className="font-display text-lg leading-relaxed text-primary sm:text-xl font-medium">
                        {tagline}
                      </p>
                      {/* 英文对照小字 */}
                      {isZh && (
                        <p className="mt-2 font-telemetry text-xs leading-normal text-muted">
                          {product.taglineEn}
                        </p>
                      )}
                    </div>

                    {/* 极简技术特征标注 (非展开架构) */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {product.techSignature.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-[2px] border border-border-plate bg-surface/60 px-2 py-0.5 font-telemetry text-[10px] text-muted tracking-tight"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* 官方外链直达通道 (单一外链，拒绝冗杂) */}
                    <div className="pt-2">
                      <Link
                        href={product.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-[2px] bg-cobalt px-4 py-2 font-telemetry text-xs font-semibold tracking-wider text-white transition-colors hover:bg-cobalt/90 active:scale-[0.99]"
                        aria-label={`Visit ${product.name} external link`}
                      >
                        <span>{linkText}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                      <span className="ml-3 font-telemetry text-[10px] text-muted tracking-wide">
                        {product.link.kind === "github" ? "GitHub Repository" : "Verified Live URL"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 翻页指引 (非尾页显示向下滑动提示) */}
                {!isLast && (
                  <div className="mt-8 flex justify-center lg:hidden">
                    <button
                      onClick={() => scrollToSlide(index + 1)}
                      className="flex items-center gap-1 font-telemetry text-xs text-muted hover:text-primary"
                    >
                      <span>{t.products.scrollDown}</span>
                      <ChevronDown className="h-3 w-3 animate-bounce" />
                    </button>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
