"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { m, AnimatePresence, type Variants } from "framer-motion";
import { MotionDomAnimation } from "../lazy-motion-dom-animation";
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
    y: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { type: "spring", stiffness: 320, damping: 30, mass: 0.8 },
      opacity: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -35 : 35,
    opacity: 0,
    scale: 0.99,
    transition: {
      y: { duration: 0.2, ease: "easeIn" },
      opacity: { duration: 0.18, ease: "easeIn" },
      scale: { duration: 0.18, ease: "easeIn" },
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
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: "easeIn" },
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
      }, 300);
    },
    [stageIndex, totalStages],
  );

  // Deep links: URL hash ↔ stage (#wise, #exploration, #bytedance-im, …).
  // Hero (index 0) keeps the canonical bare /career — no hash.
  const stageIndexFromHash = useCallback((hash: string): number => {
    const id = hash.replace(/^#/, "");
    if (id === "products" || id === "roots") return 5;
    return CAREER_STAGES.findIndex((s) => s.id === id);
  }, []);

  // Live mirror of the active stage for the hash listener below.
  // The listener subscribes once on mount: re-running applyHash on every
  // stage change would read the still-stale URL (the reflect effect below
  // replaceStates the new hash afterwards) and bounce 1↔2 into
  // "Maximum update depth exceeded" (BRAWUKA-527).
  const stageIndexRef = useRef(0);
  useEffect(() => {
    stageIndexRef.current = stageIndex;
  }, [stageIndex]);

  // Apply initial hash on mount + follow external hash changes
  // (back/forward navigation, pasted deep links). Bypasses the animation
  // lock deliberately: a deep link must never be swallowed mid-transition.
  useEffect(() => {
    const applyHash = () => {
      const target = stageIndexFromHash(window.location.hash);
      if (target < 0 || target === stageIndexRef.current) return;
      isAnimatingRef.current = true;
      setDirection(target > stageIndexRef.current ? 1 : -1);
      setStageIndex(target);
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 550);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [stageIndexFromHash]);

  // Reflect the active stage in the URL so every act is shareable.
  // replaceState (not pushState): deck navigation is one logical page —
  // scroll-through shouldn't flood history, and it never fires hashchange.
  useEffect(() => {
    const stage = CAREER_STAGES[stageIndex];
    const desired = stageIndex === 0 ? "" : `#${stage.id}`;
    if (window.location.hash === desired) return;
    window.history.replaceState(
      null,
      "",
      desired === ""
        ? window.location.pathname + window.location.search
        : desired,
    );
  }, [stageIndex]);

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

  // Wheel listener with delta accumulation, sub-tick sensitivity & momentum cooldown
  const wheelAccumulatorRef = useRef(0);
  const lastWheelTriggerRef = useRef(0);
  const wheelResetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleWheel = useCallback(
    (e: WheelEvent | React.WheelEvent) => {
      const native = "nativeEvent" in e ? e.nativeEvent : e;
      if ((native as any).__careerDeckHandled) return;
      (native as any).__careerDeckHandled = true;

      // Prevent native browser scroll or rubber-banding
      if ("cancelable" in e && e.cancelable) {
        e.preventDefault();
      }

      if (isAnimatingRef.current) {
        return;
      }

      const now = Date.now();
      // Cooldown after transition: 240ms
      if (now - lastWheelTriggerRef.current < 240) {
        return;
      }

      // Handle both pixel-based trackpads and line-based mousewheels
      const delta = e.deltaMode === 1 ? e.deltaY * 25 : e.deltaY;
      wheelAccumulatorRef.current += delta;

      if (wheelResetTimerRef.current) {
        clearTimeout(wheelResetTimerRef.current);
      }

      // Reset accumulator on idle (100ms)
      wheelResetTimerRef.current = setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 100);

      const THRESHOLD = 14; // Gentle two-finger flick or 1 notch mouse wheel
      if (Math.abs(wheelAccumulatorRef.current) >= THRESHOLD) {
        const direction = wheelAccumulatorRef.current;
        wheelAccumulatorRef.current = 0;
        lastWheelTriggerRef.current = now;

        if (direction > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    },
    [goNext, goPrev],
  );

  // Global window wheel listener so scrolling works seamlessly anywhere on screen
  useEffect(() => {
    const onWindowWheel = (e: WheelEvent) => {
      handleWheel(e);
    };

    window.addEventListener("wheel", onWindowWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWindowWheel);
    };
  }, [handleWheel]);

  // Touch swipe gesture listener with velocity & flick detection
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const lastTouchTriggerRef = useRef<number>(0);

  const handleTouchStart = useCallback((e: React.TouchEvent | TouchEvent) => {
    const touch = "touches" in e ? e.touches[0] : null;
    if (!touch) return;
    touchStartYRef.current = touch.clientY;
    touchStartXRef.current = touch.clientX;
    touchStartTimeRef.current = Date.now();
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent | TouchEvent) => {
    if (e.cancelable) {
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent | TouchEvent) => {
    if (touchStartYRef.current === null) return;
    if (isAnimatingRef.current) {
      touchStartYRef.current = null;
      touchStartXRef.current = null;
      return;
    }

    const now = Date.now();
    if (now - lastTouchTriggerRef.current < 240) {
      touchStartYRef.current = null;
      touchStartXRef.current = null;
      return;
    }

    const changed = "changedTouches" in e ? e.changedTouches[0] : null;
    if (!changed) return;

    const touchEndY = changed.clientY;
    const touchEndX = changed.clientX;
    const diffY = touchStartYRef.current - touchEndY;
    const diffX = (touchStartXRef.current ?? touchEndX) - touchEndX;
    const duration = Math.max(now - touchStartTimeRef.current, 1);

    touchStartYRef.current = null;
    touchStartXRef.current = null;

    // Check vertical dominance
    if (Math.abs(diffY) > Math.abs(diffX) * 0.7) {
      const velocityY = Math.abs(diffY) / duration;
      // Flick: small displacement (>10px) with fast velocity (>0.15 px/ms)
      // Drag: displacement > 18px
      const isFlick = velocityY > 0.15 && Math.abs(diffY) > 10;
      const isDrag = Math.abs(diffY) > 18;

      if (isFlick || isDrag) {
        lastTouchTriggerRef.current = now;
        if (diffY > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    }
  }, [goNext, goPrev]);

  const handleTouchCancel = useCallback(() => {
    touchStartYRef.current = null;
    touchStartXRef.current = null;
  }, []);

  // Global window touch listeners with non-passive touchmove to prevent iOS gesture cancel
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => handleTouchStart(e);
    const onTouchMove = (e: TouchEvent) => handleTouchMove(e);
    const onTouchEnd = (e: TouchEvent) => handleTouchEnd(e);
    const onTouchCancel = () => handleTouchCancel();

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleTouchCancel]);

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
    <MotionDomAnimation>
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      className="relative flex h-[calc(100dvh-3.5rem)] w-full flex-col overflow-hidden bg-substrate select-none overscroll-none touch-none"
      role="region"
      aria-label="Career Deck Vertical Snap Reel"
    >
      {/* 1. Thematic Stage Canvas (Faint, non-distracting SVG background) */}
      <AnimatePresence mode="wait">
        <m.div
          key={currentStage.id}
          variants={canvasVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {currentStage.id === "hero" && <HeroCanvas mode="hero" />}
          {currentStage.id === "wise" && <WiseCanvas />}
          {currentStage.id === "exploration" && <ExplorationCanvas />}
          {currentStage.id === "bytedance-im" && <BytedanceCanvas mode="im" />}
          {currentStage.id === "bytedance-infra" && <BytedanceCanvas mode="infra" />}
          {currentStage.id === "education" && <HeroCanvas mode="education" />}
        </m.div>
      </AnimatePresence>

      {/* 2. Main Stage Stage Frame with Vertical Snap Parallax */}
      <div className="relative z-10 flex h-full w-full flex-1 items-center justify-center overflow-hidden pb-8 sm:pb-12">
        <AnimatePresence custom={direction} mode="wait">
          <m.div
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
          </m.div>
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
    </MotionDomAnimation>
  );
}
