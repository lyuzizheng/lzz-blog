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
import { StageWise } from "./stage-wise";
import { StageExploration } from "./stage-exploration";
import { StageBytedance } from "./stage-bytedance";
import { ChevronUp, ChevronDown } from "lucide-react";
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

    if (Math.abs(diff) > 45) {
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
      // Ignore if inside input/textarea
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
      className="relative flex h-[calc(100dvh-3.5rem)] w-full flex-col overflow-hidden bg-substrate select-none"
      role="region"
      aria-label="Career Deck Vertical Snap Reel"
    >
      {/* 1. Thematic Stage Canvas (Single-color high precision SVG background) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          variants={canvasVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {currentStage.id === "hero" && <HeroCanvas />}
          {currentStage.id === "wise" && <WiseCanvas />}
          {currentStage.id === "exploration" && <ExplorationCanvas />}
          {currentStage.id === "bytedance" && <BytedanceCanvas />}
        </motion.div>
      </AnimatePresence>

      {/* 2. Main Stage Stage Frame with Vertical Snap Parallax */}
      <div className="relative z-10 flex h-full w-full flex-1 items-center justify-center overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStage.id}
            custom={direction}
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex h-full w-full flex-col justify-center overflow-y-auto"
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
            {currentStage.id === "bytedance" && (
              <StageBytedance onScrollToTop={() => goToStage(0)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Sleek Minimalist Vertical Timeline & Progress Rail (纵向时间轴) */}
      <aside
        className="pointer-events-auto absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 sm:right-8 md:flex"
        aria-label="Career Timeline Progression"
      >
        <div className="flex flex-col items-center gap-3">
          {CAREER_STAGES.map((stage, idx) => {
            const isActive = idx === stageIndex;
            const isPassed = idx < stageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => goToStage(idx)}
                className="group relative flex items-center justify-center p-1 transition-all"
                aria-label={`Jump to ${stage.actNo}: ${stage.nameEn}`}
              >
                {/* Tooltip on hover */}
                <span className="pointer-events-none absolute right-6 origin-right scale-95 rounded-xs border border-border-plate/60 bg-surface/90 px-2 py-0.5 font-telemetry text-[10px] uppercase tracking-wider text-muted opacity-0 shadow-xs transition-all group-hover:scale-100 group-hover:opacity-100 group-hover:text-primary backdrop-blur-xs">
                  {stage.actNo} · {isZh ? stage.nameZh : stage.nameEn}
                </span>

                {/* Pip node */}
                <div
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "scale-125 bg-cobalt ring-4 ring-cobalt/20"
                      : isPassed
                        ? "bg-cobalt/50 hover:bg-cobalt"
                        : "bg-border-plate hover:bg-muted"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Subtle Stage Counter */}
        <span className="font-telemetry text-[9px] tracking-widest text-muted">
          0{stageIndex + 1}/0{totalStages}
        </span>
      </aside>

      {/* 4. Bottom-Right Quick Step Controls & Telemetry Eyebrow */}
      <nav
        className="pointer-events-auto absolute bottom-3 right-3 z-30 flex items-center gap-1.5 rounded-xs border border-border-plate/60 bg-surface/80 p-1 shadow-plate backdrop-blur-md sm:bottom-4 sm:right-6"
        aria-label="Stage Navigation Controls"
      >
        <button
          onClick={goPrev}
          disabled={stageIndex === 0}
          className="flex h-7 w-7 items-center justify-center rounded-xs border border-border-plate/40 text-muted transition-colors hover:border-cobalt hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
          title="Previous Stage (ArrowUp / K)"
          aria-label="Previous Stage"
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        <span className="px-1.5 font-telemetry text-[10px] font-medium text-muted">
          {stageIndex + 1}/{totalStages}
        </span>

        <button
          onClick={goNext}
          disabled={stageIndex === totalStages - 1}
          className="flex h-7 w-7 items-center justify-center rounded-xs border border-border-plate/40 text-muted transition-colors hover:border-cobalt hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
          title="Next Stage (ArrowDown / J)"
          aria-label="Next Stage"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </nav>

      {/* 5. Mobile Progress Bar at Top */}
      <div
        className="absolute left-0 top-0 z-30 h-[2px] w-full bg-border-plate/40 md:hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-cobalt transition-all duration-300 ease-out"
          style={{ width: `${((stageIndex + 1) / totalStages) * 100}%` }}
        />
      </div>
    </div>
  );
}
