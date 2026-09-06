"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

/**
 * BRAWUKA-78 · FilmStack — 单屏暗房工作台的四枚 35mm 负片导航
 *
 * 状态机：stacked（中央叠放，轻微随机角度 + idle 微摆）
 *         → scattered（spring 扇形散落，各自回正为入口卡片）
 *         → 点击空白 / Esc 收拢回叠。
 *
 * - 叠放位移经 getBoundingClientRect 量测 + 纯 transform 注入：网格布局恒定，Zero CLS。
 * - 片齿打孔复用全局 .film-sprockets；telemetry 印记（KODAK 400TX / EXP 36 / ▶ 片号）。
 * - hover/focus：微上浮 + 显影曝光（.film-latent 负片 → 正片反转），键盘 Tab + Enter 可达。
 * - prefers-reduced-motion：禁散落 spring 与 idle 摆动，静态规整排布，功能全保留。
 */

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

interface FilmSpec {
  readonly key: "blogs" | "career" | "photography" | "projects";
  readonly href: string;
  /** 创始人定稿 EN 标注 */
  readonly tag: string;
  readonly index: string;
  readonly frameNo: string;
  readonly scene: "lines" | "flight" | "landscape" | "grid";
}

const FILMS: ReadonlyArray<FilmSpec> = [
  { key: "blogs", href: "/posts", tag: "BLOGS", index: "01", frameNo: "▶ 01A", scene: "lines" },
  { key: "career", href: "/resume", tag: "CAREER", index: "02", frameNo: "▶ 07", scene: "flight" },
  { key: "photography", href: "/photography", tag: "PHOTOGRAPHY", index: "03", frameNo: "▶ 12A", scene: "landscape" },
  { key: "projects", href: "/products", tag: "PROJECTS", index: "04", frameNo: "▶ 24", scene: "grid" },
];

/** 叠放态：确定性伪随机角度与错位（同一叠胶片，每次访问一致） */
const STACK_TILT = [-4.5, -1.5, 2, 5] as const;
const STACK_DX = [-6, 4, -3, 7] as const;
const STACK_DY = [-8, -3, 2, 7] as const;

/** idle 呼吸微摆错峰（±2px / ±0.5°，见 globals.css film-idle-sway） */
const IDLE_DURATION = ["6.4s", "7.3s", "8.1s", "6.9s"] as const;
const IDLE_DELAY = ["0s", "-1.8s", "-3.4s", "-2.6s"] as const;

/** DESIGN_V2 §6 snappy 弹簧：{ stiffness: 450, damping: 30, mass: 0.8 } */
const SCATTER_SPRING = { type: "spring", stiffness: 450, damping: 30, mass: 0.8 } as const;

/** 片齿孔 + 等宽 edge print 印记条（35mm 上下各一条） */
function SprocketEdge({ left, right }: { left: string; right: string }) {
  return (
    <div className="bg-chamber px-1.5 py-1">
      <div className="film-sprockets h-2 w-full opacity-60 sm:h-2.5" aria-hidden="true" />
      <div className="mt-0.5 flex items-center justify-between font-telemetry text-[8px] tracking-[0.18em] text-muted">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}

/** 画格场景：单一细线手势家族，主题变量着色（显影经 .film-latent 反转） */
function FilmScene({ scene }: { scene: FilmSpec["scene"] }) {
  if (scene === "lines") {
    return (
      <svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect width="120" height="80" className="fill-[var(--bg-chamber)]" />
        <rect x="36" y="12" width="48" height="58" className="fill-[var(--bg-surface)]" />
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <rect key={r} x="42" y={20 + r * 8} width={r % 3 === 2 ? 22 : 36} height="2" className="fill-[var(--text-muted)]" opacity="0.7" />
        ))}
      </svg>
    );
  }
  if (scene === "flight") {
    return (
      <svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect width="120" height="80" className="fill-[var(--bg-chamber)]" />
        <path d="M0 66 L30 52 L60 60 L92 40 L120 48 L120 80 L0 80 Z" className="fill-[var(--bg-surface)]" opacity="0.9" />
        <polyline points="14,62 48,44 82,30 106,18" fill="none" className="stroke-[var(--text-muted)]" strokeWidth="1.4" opacity="0.85" />
        <circle cx="106" cy="18" r="3" className="fill-[var(--text-muted)]" />
      </svg>
    );
  }
  if (scene === "landscape") {
    return (
      <svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect width="120" height="80" className="fill-[var(--bg-chamber)]" />
        <circle cx="76" cy="26" r="12" className="fill-[var(--text-muted)]" opacity="0.85" />
        <circle cx="76" cy="26" r="19" fill="none" className="stroke-[var(--text-muted)]" strokeWidth="0.8" opacity="0.4" />
        <path d="M0 62 L32 40 L62 56 L94 34 L120 50 L120 80 L0 80 Z" className="fill-[var(--bg-surface)]" opacity="0.9" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="120" height="80" className="fill-[var(--bg-chamber)]" />
      <rect x="26" y="22" width="20" height="20" className="fill-[var(--bg-surface)]" />
      <rect x="50" y="30" width="20" height="20" className="fill-[var(--text-muted)]" opacity="0.75" />
      <rect x="74" y="18" width="20" height="20" className="fill-[var(--bg-surface)]" />
    </svg>
  );
}

function FilmCard({ film, title }: { film: FilmSpec; title: string }) {
  return (
    <div className="overflow-hidden rounded-[2px] border border-border-plate bg-surface shadow-plate transition-colors duration-300 group-hover:border-cobalt group-focus-visible:border-cobalt">
      <SprocketEdge left="KODAK 400TX" right="EXP 36" />

      {/* 画格：场景层参与显影反转，文字叠层保持可读 */}
      <div className="relative aspect-[3/2] overflow-hidden border-y border-border-plate/60">
        <div className="film-latent absolute inset-0">
          <FilmScene scene={film.scene} />
          <div className="halftone-screen pointer-events-none absolute inset-0 opacity-20" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-2 sm:p-2.5">
          <div className="flex items-center justify-between font-telemetry text-[8px] tracking-[0.16em] sm:text-[9px]">
            <span className="font-bold text-ink-dominant">{film.index}</span>
            <span className="text-muted">{film.frameNo}</span>
          </div>
          <div>
            <div className="font-display text-sm leading-tight text-primary sm:text-base">
              {title}
            </div>
            <div className="mt-0.5 flex items-center justify-between font-telemetry text-[8px] tracking-[0.2em] text-muted">
              <span className="transition-colors group-hover:text-ink-dominant group-focus-visible:text-ink-dominant">
                {film.tag} →
              </span>
              <span>35MM</span>
            </div>
          </div>
        </div>
      </div>

      <SprocketEdge left={film.frameNo} right="LZZ · 26" />
    </div>
  );
}

export function FilmStack() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const [scattered, setScattered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [offsets, setOffsets] = useState<Array<{ x: number; y: number }>>(() =>
    FILMS.map(() => ({ x: 0, y: 0 })),
  );

  const titles = {
    blogs: t.home.chapters.writings.title,
    career: t.home.chapters.flightPath.title,
    photography: t.home.chapters.darkroom.title,
    projects: t.home.chapters.projects.title,
  } as const;

  // 量测各槽位中心 → 容器中心的位移；叠放纯 transform，网格布局恒定（Zero CLS）
  useIsoLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const cr = container.getBoundingClientRect();
      const cx = cr.left + cr.width / 2;
      const cy = cr.top + cr.height / 2;
      setOffsets(
        slotRefs.current.map((el) => {
          if (!el) return { x: 0, y: 0 };
          const r = el.getBoundingClientRect();
          return {
            x: cx - (r.left + r.width / 2),
            y: cy - (r.top + r.height / 2),
          };
        }),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // reduced-motion：禁散落 spring 与 idle，静态规整排布（等同散落后的可用态）
  const isStacked = !reduceMotion && !scattered;

  // Esc 收拢
  useEffect(() => {
    if (!scattered) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setScattered(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scattered]);

  return (
    <div className="w-full">
      <div ref={containerRef} className="relative mx-auto w-full max-w-4xl">
        {/* 散落后的空白捕手：点击画布任意空白处收拢（沉到内容层之下，Esc 为键盘对等物） */}
        {scattered && (
          <button
            type="button"
            aria-label={t.home.workbench.collapseAria}
            onClick={() => setScattered(false)}
            className="fixed inset-0 -z-10 cursor-pointer bg-transparent"
          />
        )}

        <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {FILMS.map((film, i) => (
            <div
              key={film.key}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              className="relative min-w-0"
            >
              <motion.div
                initial={false}
                animate={
                  isStacked
                    ? {
                        x: offsets[i].x + STACK_DX[i],
                        y: offsets[i].y + STACK_DY[i],
                        rotate: STACK_TILT[i],
                        scale: 0.96,
                      }
                    : { x: 0, y: 0, rotate: 0, scale: 1 }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        ...SCATTER_SPRING,
                        delay: scattered ? i * 0.045 : (FILMS.length - 1 - i) * 0.03,
                      }
                }
                style={{
                  zIndex: 10 + i,
                  ...(isStacked
                    ? { animationDuration: IDLE_DURATION[i], animationDelay: IDLE_DELAY[i] }
                    : {}),
                }}
                className={`relative ${isStacked ? "film-idle" : ""}`}
              >
                {isStacked ? (
                  // 叠放态：视觉仅为叠堆，唯一交互物是覆盖按钮（见下）
                  <div aria-hidden="true" className="pointer-events-none select-none">
                    <FilmCard film={film} title={titles[film.key]} />
                  </div>
                ) : (
                  <Link
                    href={film.href}
                    className="group block transition-transform duration-300 hover:-translate-y-1.5 focus-visible:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
                  >
                    <FilmCard film={film} title={titles[film.key]} />
                  </Link>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* 叠放态整叠按钮：点击/触摸/Enter 散落展开 */}
        {isStacked && (
          <button
            type="button"
            aria-expanded={false}
            aria-label={t.home.workbench.expandAria}
            onClick={() => setScattered(true)}
            className="absolute inset-0 z-30 cursor-pointer focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-4"
          />
        )}
      </div>

      <p
        className="mt-3 text-center font-telemetry text-[10px] uppercase tracking-[0.22em] text-muted"
        aria-hidden="true"
      >
        {isStacked ? t.home.workbench.scatterHint : t.home.workbench.gatherHint}
      </p>
      <p className="sr-only" role="status">
        {isStacked ? t.home.workbench.scatterHint : t.home.workbench.gatherHint}
      </p>
    </div>
  );
}
