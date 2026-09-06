"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { SlideCover } from "./slide-cover";
import { SlideIndex } from "./slide-index";
import { SlideColophon } from "./slide-colophon";
import { useReducedMotion } from "framer-motion";

export interface HomeDeckProps {
  filmHero?: React.ReactNode;
}

const SLIDE_IDS = ["slide-1", "slide-2", "slide-3"] as const;

/**
 * BRAWUKA-64 · HomeDeck
 * 1. 3 屏封顶：Slide 1 封面 → Slide 2 四入口散落索引 → Slide 3 Colophon；到底即止
 * 2. 策展式翻页 deck 模型与 scroll-jacking 风控 (DESIGN_V2 §8)
 * 3. 键盘控制契约：j/k, ArrowUp/ArrowDown, 1/2/3 定帧直达
 * 4. URL #slide 深链双向同步
 * 5. prefers-reduced-motion 与移动端无障碍退化
 */
export function HomeDeck({ filmHero }: HomeDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  // 滚动至指定 Slide
  const scrollToSlide = useCallback(
    (index: number) => {
      const targetEl = slideRefs.current[index];
      if (!targetEl) return;

      targetEl.scrollIntoView({
        behavior: reduceMotion ? "instant" : "smooth",
        block: "start",
      });
      setActiveIndex(index);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${SLIDE_IDS[index]}`);
      }
    },
    [reduceMotion],
  );

  // 监听 IntersectionObserver 确定当前可见 Slide 并同步 hash
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observers: IntersectionObserver[] = [];
    slideRefs.current.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              setActiveIndex(index);
              window.history.replaceState(null, "", `#${SLIDE_IDS[index]}`);
            }
          });
        },
        {
          threshold: [0.5],
        },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  // 支持初次加载根据 URL hash 直达
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    const found = SLIDE_IDS.indexOf(hash as (typeof SLIDE_IDS)[number]);
    if (found >= 0) {
      setTimeout(() => {
        scrollToSlide(found);
      }, 50);
    }
  }, [scrollToSlide]);

  // 键盘控制契约：j / k, ArrowUp / ArrowDown, 1 / 2 / 3 定帧直达
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 忽略表单输入
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "j" || e.key === "J") {
        e.preventDefault();
        const next = Math.min(SLIDE_IDS.length - 1, activeIndex + 1);
        scrollToSlide(next);
      } else if (e.key === "ArrowUp" || e.key === "k" || e.key === "K") {
        e.preventDefault();
        const next = Math.max(0, activeIndex - 1);
        scrollToSlide(next);
      } else if (e.key === "1") {
        e.preventDefault();
        scrollToSlide(0);
      } else if (e.key === "2") {
        e.preventDefault();
        scrollToSlide(1);
      } else if (e.key === "3") {
        e.preventDefault();
        scrollToSlide(2);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToSlide]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-clip"
    >
      {/* 侧边定帧点轨道 (Desktop Rail · DESIGN_V2 §8) */}
      <nav
        aria-label="Deck Frame Rail"
        className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 font-telemetry text-xs lg:flex"
      >
        {SLIDE_IDS.map((id, idx) => {
          const isActive = activeIndex === idx;
          const labels = ["COVER", "INDEX", "COLOPHON"];
          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`group flex items-center justify-end gap-2 transition-all cursor-pointer ${
                isActive ? "text-cobalt font-bold" : "text-muted hover:text-primary"
              }`}
              aria-label={`Jump to slide ${idx + 1}: ${labels[idx]}`}
              aria-current={isActive ? "step" : undefined}
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100 text-[10px] uppercase">
                {labels[idx]}
              </span>
              <span className="tracking-widest text-[11px]">
                0{idx + 1}
              </span>
              <span
                className={`h-3 w-1 rounded-[1px] transition-all ${
                  isActive ? "bg-cobalt scale-y-125" : "bg-border-plate group-hover:bg-muted"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Slide 1: 封面 */}
      <div
        ref={(el) => {
          slideRefs.current[0] = el;
        }}
      >
        <SlideCover
          filmHero={filmHero}
          onScrollDown={() => scrollToSlide(1)}
        />
      </div>

      {/* Slide 2: 四入口散落索引 */}
      <div
        ref={(el) => {
          slideRefs.current[1] = el;
        }}
      >
        <SlideIndex
          onScrollDown={() => scrollToSlide(2)}
        />
      </div>

      {/* Slide 3: Colophon 终屏（到底即止） */}
      <div
        ref={(el) => {
          slideRefs.current[2] = el;
        }}
      >
        <SlideColophon />
      </div>
    </div>
  );
}
