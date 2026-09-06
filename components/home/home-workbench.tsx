"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { SOCIAL_LINKS, handleOf } from "@/components/site/social-links";
import { DeckEyebrow } from "./deck-eyebrow";
import { FilmStack } from "./film-stack";
import { DarkroomAmbient } from "./darkroom-ambient";

/**
 * BRAWUKA-78 · HomeWorkbench — 单屏无滚动暗房工作台
 *
 * - 100dvh 单屏到底，桌面与移动端均不可滑动翻页（overflow-hidden，无 Slide 2/3）。
 * - 中央：身份卡片（avatar + 名字 + 一句话 + 社交矩阵行）+ 四胶片叠放导航。
 * - 屏内眉脚沿用 Q10-A 契约（DeckEyebrow：LZZ · §号 + 01–04 索引 + LanguageSwitch + 昼夜点）。
 * - 背景：暗房环境动画（微尘 + 显影液微光，低透明度）。
 * - Zero CLS：全部元素固定定位网格，avatar 显式宽高。
 */
export function HomeWorkbench() {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden px-4 pb-4 pt-2 sm:px-8 sm:pb-6">
      <DarkroomAmbient />

      {/* 屏内眉题（Q10-A：语言切换 + 昼夜点硬性保留） */}
      <DeckEyebrow section="§00" />

      {/* 中央：身份卡片 + 胶片叠 */}
      <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col items-center justify-center gap-4 py-3 sm:gap-6">
        <section
          aria-label={isZh ? "身份卡片" : "Identity card"}
          className="flex flex-col items-center text-center"
        >
          <img
            src="/avatar.jpg"
            alt={isZh ? "吕自正的头像" : "Portrait of Zizheng Lyu"}
            width={64}
            height={64}
            className="h-14 w-14 rounded-[2px] border border-border-plate object-cover shadow-plate sm:h-16 sm:w-16"
          />
          <p className="mt-3 font-telemetry text-[10px] uppercase tracking-[0.24em] text-muted sm:text-[11px]">
            {t.home.tagline}
          </p>
          <h1 className="mt-1 font-display text-3xl font-normal leading-[1.05] tracking-tight text-primary sm:text-5xl">
            {t.home.title}
          </h1>
          <p className="mt-2 max-w-md font-body text-xs leading-relaxed text-muted sm:text-sm">
            {t.home.heroSubtitle}
          </p>

          {/* 社交矩阵 mono 行（LinkedIn / X / GitHub / Instagram，lib/site.ts 真实外链） */}
          <nav
            aria-label={isZh ? "社交媒体矩阵" : "Social links"}
            className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-telemetry text-[11px] tracking-wider text-muted"
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 transition-colors hover:text-ink-dominant"
              >
                <span className="font-semibold text-text-secondary group-hover:text-ink-dominant">
                  [{link.badge}]
                </span>
                <span className="underline-offset-2 group-hover:underline">
                  {handleOf(link.href)}
                </span>
              </a>
            ))}
          </nav>
        </section>

        <FilmStack />
      </div>

      {/* 屏内脚：一行 telemetry */}
      <footer className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-border-plate pt-2.5 font-telemetry text-[10px] tracking-wider text-muted sm:text-[11px]">
        <span className="uppercase">{isZh ? "暗房工作台" : "DARKROOM WORKBENCH"}</span>
        <span className="hidden uppercase sm:inline">{t.home.colophon}</span>
        <span className="uppercase">35MM · 100DVH</span>
      </footer>
    </div>
  );
}
