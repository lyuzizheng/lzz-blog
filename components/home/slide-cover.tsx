"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SOCIAL_LINKS, handleOf } from "@/components/site/social-links";
import { DeckEyebrow } from "./deck-eyebrow";
import { FilmUnfurl } from "./film-unfurl";
import { useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface SlideCoverProps {
  filmHero?: React.ReactNode;
  onScrollDown?: () => void;
}

/**
 * BRAWUKA-64 · Slide 1 封面
 * - 屏内眉脚：左 LZZ · §01，右 01–04 索引 + LanguageSwitch + 昼夜点
 * - Brief：名字显影 + bio + 社交 mono 行
 * - 中央 3 帧胶片：Load 时间线 3 帧 stagger 显影（错峰 80ms，发丝进度线走完即停）
 * - 总收敛 <1.2s，可打断
 */
export function SlideCover({ filmHero, onScrollDown }: SlideCoverProps) {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  const reduceMotion = useReducedMotion();

  // Load timeline state
  // t0: 纸底直出 (bg-substrate)
  // t1: 名字显影 + bio + 社交 (100ms)
  // t2: 3 帧 stagger 显影 (360ms onwards)
  const [t1Revealed, setT1Revealed] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setT1Revealed(true);
      setSettled(true);
      return;
    }

    const t1Timer = setTimeout(() => {
      setT1Revealed(true);
    }, 100);

    const settleTimer = setTimeout(() => {
      setSettled(true);
    }, 1100);

    const interrupt = () => {
      setT1Revealed(true);
      setSettled(true);
    };

    window.addEventListener("wheel", interrupt, { passive: true, once: true });
    window.addEventListener("touchstart", interrupt, { passive: true, once: true });
    window.addEventListener("keydown", interrupt, { once: true });
    window.addEventListener("pointerdown", interrupt, { passive: true, once: true });

    return () => {
      clearTimeout(t1Timer);
      clearTimeout(settleTimer);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", interrupt);
      window.removeEventListener("pointerdown", interrupt);
    };
  }, [reduceMotion]);

  return (
    <section
      id="slide-1"
      aria-label="Slide 1 · 封面"
      className="relative flex min-h-[100dvh] w-full snap-start snap-always flex-col justify-between px-4 pb-6 pt-2 sm:px-8 sm:pb-8"
    >
      {/* 屏内眉题 */}
      <DeckEyebrow section="§01" />

      {/* Slide 1 主体：Brief + 社交 Mono 行 + 中央 3 帧胶片 */}
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-6 sm:py-8">
        {/* brief 区域：t1 显影 */}
        <div
          className="transition-all duration-500 ease-out"
          style={{
            opacity: t1Revealed ? 1 : 0,
            transform: t1Revealed ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <p className="mb-3 font-telemetry text-[11px] uppercase tracking-[0.24em] text-muted">
            {t.home.tagline}
          </p>
          <h1 className="font-display text-4xl font-normal leading-[1.05] tracking-tight text-primary sm:text-6xl">
            {t.home.title}
          </h1>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-muted sm:text-lg">
            {t.home.heroSubtitle}
          </p>

          {/* 社交 mono 行 */}
          <nav
            aria-label={isZh ? "社交媒体矩阵" : "Social links"}
            className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-telemetry text-xs tracking-wider text-muted"
          >
            <span className="text-text-secondary text-[11px] font-semibold tracking-widest uppercase">
              {isZh ? "矩阵 //" : "CONNECT //"}
            </span>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 transition-colors hover:text-ink-dominant"
              >
                <span className="text-text-secondary group-hover:text-ink-dominant font-semibold">
                  [{link.badge}]
                </span>
                <span className="hover:underline underline-offset-2">
                  {handleOf(link.href)}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* 中央 3 帧胶片：t2 stagger 显影 */}
        <div className="mt-8 sm:mt-12 w-full">
          {filmHero ?? <FilmUnfurl isDeveloped={settled} />}
        </div>
      </div>

      {/* 底部滚动手势指引 */}
      <footer className="mx-auto flex w-full max-w-4xl items-center justify-between border-t border-border-plate pt-3 font-telemetry text-[11px] tracking-wider text-muted">
        <span className="uppercase">
          01 / 03 · {isZh ? "封面" : "COVER"}
        </span>
        {onScrollDown ? (
          <button
            type="button"
            onClick={onScrollDown}
            className="inline-flex items-center gap-1 transition-colors hover:text-ink-dominant cursor-pointer"
          >
            <span>{isZh ? "进入散落索引" : "ENTER INDEX"}</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          </button>
        ) : (
          <a
            href="#slide-2"
            className="inline-flex items-center gap-1 transition-colors hover:text-ink-dominant"
          >
            <span>{isZh ? "向下滚动进入散落索引" : "SCROLL FOR INDEX"}</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          </a>
        )}
      </footer>
    </section>
  );
}
