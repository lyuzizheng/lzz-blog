"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { CAREER_STAGES } from "./deck-types";
import {
  HeroCanvas,
  WiseCanvas,
  ExplorationCanvas,
  BytedanceCanvas,
} from "./canvases";
import { StageHero } from "./stage-hero";
import { StageBytedance } from "./stage-bytedance";
import { StageExploration } from "./stage-exploration";
import { StageWise } from "./stage-wise";
import { StageEducation } from "./stage-education";
import { ChevronUp, ChevronDown, ArrowUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

/**
 * Vertical snap-deck transition physics variants.
 * When scrolling down (direction > 0):
 *  - outgoing stage drifts up slightly (-45px) and fades out.
 *  - incoming stage rises from below (+50px) with damping inertia, fading in (0.98 -> 1.0).
 * When scrolling up (direction < 0):
 *  - outgoing stage drifts down slightly (+45px) and fades out.
 *  - incoming stage drops from above (-50px) with damping inertia, fading in (0.98 -> 1.0).
 */
const stageVariants: Variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98,
    filter: "blur(3px)",
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      y: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
      opacity: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
      filter: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -45 : 45,
    opacity: 0,
    scale: 0.98,
    filter: "blur(3px)",
    transition: {
      y: { duration: 0.32, ease: [0.32, 0, 0.67, 0] },
      opacity: { duration: 0.28, ease: "easeIn" },
      scale: { duration: 0.28, ease: "easeIn" },
      filter: { duration: 0.25 },
    },
  }),
};

/**
 * Thematic Canvas transition variants (smooth cross-fade)
 */
const canvasVariants: Variants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

export function CareerDeck() {
  const [stageIndex, setStageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isAnimatingRef = useRef(false);
  const { locale } = useI18n();
  const isZh = locale === "zh";

  const totalStages = CAREER_STAGES.length;

  // Navigate to specific stage
  const goToStage = useCallback(
    (newIndex: number) => {
      if (newIndex === stageIndex || isAnimatingRef.current) return;
      if (newIndex < 0 || newIndex >= totalStages) return;

      isAnimatingRef.current = true;
      setDirection(newIndex > stageIndex ? 1 : -1);
      setStageIndex(newIndex);

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 550);
    },
    [stageIndex, totalStages],
  );

  const goNext = useCallback(() => {
    if (stageIndex < totalStages - 1) {
      goToStage(stageIndex + 1);
    }
  }, [stageIndex, totalStages, goToStage]);

  const goPrev = useCallback(() => {
    if (stageIndex > 0) {
      goToStage(stageIndex - 1);
    }
  }, [stageIndex, goToStage]);

  // Wheel listener with threshold & cooldown
  const lastWheelTimeRef = useRef(0);
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 550) return;

      if (Math.abs(e.deltaY) > 30) {
        lastWheelTimeRef.current = now;
        if (e.deltaY > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    },
    [goNext, goPrev],
  );

  // Touch swipe gesture listener
  const touchStartYRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartYRef.current - touchEndY;
    touchStartYRef.current = null;

    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (
        e.key === "ArrowDown" ||
        e.key === "j" ||
        e.key === "J" ||
        e.key === "PageDown" ||
        (e.key === " " && !e.shiftKey)
      ) {
        e.preventDefault();
        goNext();
      } else if (
        e.key === "ArrowUp" ||
        e.key === "k" ||
        e.key === "K" ||
        e.key === "PageUp" ||
        (e.key === " " && e.shiftKey)
      ) {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToStage(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToStage(totalStages - 1);
      } else if (e.key >= "0" && e.key <= "3") {
        const target = parseInt(e.key, 10);
        if (target < totalStages) {
          e.preventDefault();
          goToStage(target);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, goToStage, totalStages]);

  const currentStage = CAREER_STAGES[stageIndex];

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex h-[calc(100dvh-3.5rem)] w-full flex-col overflow-hidden bg-substrate select-none overscroll-none touch-none"
      role="region"
      aria-label="Career Deck Vertical Snap Reel"
    >
      {/* 1. Thematic Stage Canvas (Faint, non-distracting SVG background) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          variants={canvasVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-25 dark:opacity-20 transition-opacity duration-500"
        >
          {currentStage.id === "hero" && <HeroCanvas />}
          {currentStage.id === "wise" && <WiseCanvas />}
          {currentStage.id === "exploration" && <ExplorationCanvas />}
          {(currentStage.id === "bytedance-im" || currentStage.id === "bytedance-infra") && (
            <BytedanceCanvas />
          )}
          {currentStage.id === "education" && <HeroCanvas />}
        </motion.div>
      </AnimatePresence>

      {/* 2. Main Stage Stage Frame with Vertical Snap Parallax */}
      <div className="relative z-10 flex h-full w-full flex-1 items-center justify-center overflow-hidden pb-8 sm:pb-12">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStage.id}
            custom={direction}
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex h-full w-full flex-col justify-center overflow-hidden"
          >
            {currentStage.id === "hero" && (
              <StageHero onExploreNext={() => goToStage(1)} />
            )}
            {currentStage.id === "wise" && (
              <StageWise onExploreNext={() => goToStage(2)} />
            )}
            {currentStage.id === "exploration" && (
              <StageExploration onExploreNext={() => goToStage(3)} />
            )}
            {currentStage.id === "bytedance-im" && (
              <StageBytedance mode="im" onExploreNext={() => goToStage(4)} />
            )}
            {currentStage.id === "bytedance-infra" && (
              <StageBytedance mode="infra" onExploreNext={() => goToStage(5)} />
            )}
            {currentStage.id === "education" && (
              <StageEducation onScrollToTop={() => goToStage(0)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Left-Side Minimalist Vertical Timeline (左侧极简竖向时间轴) */}
      <aside
        className="pointer-events-auto absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 sm:left-6 md:left-8 lg:left-10 md:flex select-none"
        aria-label="Career Timeline Progression"
      >
        <div className="relative flex flex-col items-center gap-6">
          {/* Subtle connecting vertical hairline */}
          <div
            className="absolute top-2.5 bottom-2.5 w-[1px] bg-border-plate/50"
            aria-hidden="true"
          />

          {CAREER_STAGES.map((stage, idx) => {
            const isActive = idx === stageIndex;
            const isPassed = idx < stageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => goToStage(idx)}
                className="group relative flex items-center justify-center p-1.5 transition-all cursor-pointer"
                aria-label={`Jump to ${stage.nameEn}`}
              >
                {/* Node Pip */}
                <div
                  className={`relative z-10 h-2 w-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "scale-125 bg-ink ring-2 ring-ink/20"
                      : isPassed
                        ? "bg-ink/50 hover:bg-ink hover:scale-110"
                        : "bg-border-plate hover:bg-muted hover:scale-110"
                  }`}
                />

                {/* Right Floating Badge on Hover */}
                <span className="pointer-events-none absolute left-6 whitespace-nowrap rounded-[2px] border border-border-plate/60 bg-surface/95 px-2 py-0.5 font-telemetry text-[10px] uppercase tracking-wider text-muted opacity-0 shadow-xs transition-all group-hover:opacity-100 group-hover:text-primary">
                  {stage.period} · {isZh ? stage.nameZh : stage.nameEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Minimalist Stage Counter */}
        <span className="font-telemetry text-[9px] tabular-nums tracking-widest text-muted">
          0{stageIndex + 1}/0{totalStages}
        </span>
      </aside>

      {/* 4. Bottom-Right Stepper (Minimalist, zero heavy box, typography-first) */}
      <nav
        className="pointer-events-auto absolute bottom-3 right-4 z-30 flex items-center gap-2 font-telemetry text-xs tracking-wider text-muted select-none sm:bottom-5 sm:right-6"
        aria-label="Stage Navigation Controls"
      >
        <button
          onClick={goPrev}
          disabled={stageIndex === 0}
          className="inline-flex items-center gap-0.5 transition-colors hover:text-ink-dominant disabled:opacity-20 disabled:pointer-events-none cursor-pointer underline-offset-4 hover:underline"
          title="Previous Stage (ArrowUp / K)"
          aria-label="Previous Stage"
        >
          <ChevronUp className="h-3.5 w-3.5 opacity-60" />
          <span className="text-[11px]">{isZh ? "上一章" : "PREV"}</span>
        </button>

        <span className="select-none text-muted opacity-40 text-[11px]" aria-hidden="true">
          ·
        </span>

        <span className="font-telemetry text-[11px] tabular-nums text-muted">
          0{stageIndex + 1}/0{totalStages}
        </span>

        <span className="select-none text-muted opacity-40 text-[11px]" aria-hidden="true">
          ·
        </span>

        {stageIndex === totalStages - 1 ? (
          <button
            onClick={() => goToStage(0)}
            className="inline-flex items-center gap-0.5 transition-colors hover:text-ink-dominant cursor-pointer underline-offset-4 hover:underline"
            title={isZh ? "回至篇首" : "Return to Top"}
            aria-label={isZh ? "回至篇首" : "Return to Top"}
          >
            <ArrowUp className="h-3.5 w-3.5 opacity-60" />
            <span className="text-[11px]">{isZh ? "回至篇首" : "TOP"}</span>
          </button>
        ) : (
          <button
            onClick={goNext}
            disabled={stageIndex === totalStages - 1}
            className="inline-flex items-center gap-0.5 transition-colors hover:text-ink-dominant disabled:opacity-20 disabled:pointer-events-none cursor-pointer underline-offset-4 hover:underline"
            title="Next Stage (ArrowDown / J)"
            aria-label="Next Stage"
          >
            <span className="text-[11px]">{isZh ? "下一章" : "NEXT"}</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </button>
        )}
      </nav>

      {/* 5. Mobile Progress Bar at Top */}
      <div
        className="absolute left-0 top-0 z-30 h-[2px] w-full bg-border-plate/40 md:hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-ink transition-all duration-300 ease-out"
          style={{ width: `${((stageIndex + 1) / totalStages) * 100}%` }}
        />
      </div>
    </div>
  );
}
