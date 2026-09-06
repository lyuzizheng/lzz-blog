"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { CAREER_STAGES, type CareerStageId } from "./deck-types";
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

/**
 * CareerDeck: Vertical Snap-Scroll Story Deck
 *
 * Implements:
 * - 100dvh fixed viewport frame
 * - Mouse wheel debounce / cooldown lock (smooth single-screen step)
 * - Touch swipe gesture detection
 * - Keyboard navigation: ArrowUp/Down, j/k, Home/End, 0-3
 * - Thematic stage canvas per act
 * - Framer Motion vertical fade + Y-parallax drift transitions
 * - Right-hand side progress rail
 */
export function CareerDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = down/forward, -1 = up/back
  const isScrollingRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const totalStages = CAREER_STAGES.length;

  const goToStage = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndex) return;
      setDirection(nextIndex > activeIndex ? 1 : -1);
      setActiveIndex(Math.max(0, Math.min(nextIndex, totalStages - 1)));
    },
    [activeIndex, totalStages],
  );

  const goNext = useCallback(() => {
    if (activeIndex < totalStages - 1) {
      goToStage(activeIndex + 1);
    }
  }, [activeIndex, totalStages, goToStage]);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) {
      goToStage(activeIndex - 1);
    }
  }, [activeIndex, goToStage]);

  // Mouse Wheel Navigation with Cooldown
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      // If currently in cooldown, ignore
      if (isScrollingRef.current) return;

      const threshold = 35;
      if (Math.abs(e.deltaY) > threshold) {
        isScrollingRef.current = true;
        if (e.deltaY > 0) {
          goNext();
        } else {
          goPrev();
        }

        // Lock for 650ms to allow smooth single-frame transition
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 650);
      }
    },
    [goNext, goPrev],
  );

  // Touch Gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || isScrollingRef.current) return;
    const deltaY = touchStartRef.current.y - e.changedTouches[0].clientY;
    const threshold = 45;

    if (Math.abs(deltaY) > threshold) {
      isScrollingRef.current = true;
      if (deltaY > 0) {
        goNext();
      } else {
        goPrev();
      }
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 650);
    }
    touchStartRef.current = null;
  };

  // Keyboard Navigation: ArrowDown/Up, j/k, Home/End, 0-3
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not hijack typing in input elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "j" || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp" || e.key === "k" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToStage(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToStage(totalStages - 1);
      } else if (e.key >= "0" && e.key <= "3") {
        const slot = Number.parseInt(e.key, 10);
        if (slot < totalStages) {
          e.preventDefault();
          goToStage(slot);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, goToStage, totalStages]);

  // Framer Motion Transition Variants (Vertical Fade + Y-Parallax Drift)
  const variants: Variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring" as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.35, ease: "easeOut" },
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -30 : 30,
      opacity: 0,
      transition: {
        y: { duration: 0.25, ease: "easeIn" },
        opacity: { duration: 0.25, ease: "easeIn" },
      },
    }),
  };

  const currentStage = CAREER_STAGES[activeIndex];

  return (
    <section
      id="career-deck"
      aria-label="Career Experience Story Deck"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-[calc(100dvh-3.5rem)] w-full overflow-hidden bg-substrate text-primary select-none focus:outline-hidden"
      tabIndex={0}
    >
      {/* Dynamic Thematic Stage Canvas (Background Layer) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full"
          >
            {activeIndex === 0 && <HeroCanvas />}
            {activeIndex === 1 && <WiseCanvas />}
            {activeIndex === 2 && <ExplorationCanvas />}
            {activeIndex === 3 && <BytedanceCanvas />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side Navigation Rail (Desktop lg+): Fixed right-hand progress indicator */}
      <nav
        aria-label="Career Stage Rail"
        className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 font-telemetry text-xs lg:flex"
      >
        {CAREER_STAGES.map((stage, idx) => {
          const isActive = activeIndex === idx;
          const pct = Math.round(((idx + 1) / totalStages) * 100);
          return (
            <button
              key={stage.id}
              onClick={() => goToStage(idx)}
              type="button"
              className={`group flex cursor-pointer items-center justify-end gap-2.5 transition-all ${
                isActive ? "text-cobalt font-bold" : "text-muted hover:text-primary"
              }`}
              aria-current={isActive ? "step" : undefined}
              title={`${stage.actNo} · ${stage.nameEn}`}
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100">
                {stage.nameEn}
              </span>
              <span className="tracking-widest">
                §0{idx} · {pct}%
              </span>
              <span
                className={`h-4 w-1 rounded-xs transition-all ${
                  isActive ? "bg-cobalt scale-y-125" : "bg-border-plate group-hover:bg-muted"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Foreground Interactive Stage Carousel */}
      <div className="relative z-10 h-full w-full overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStage.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="h-full w-full"
          >
            {activeIndex === 0 && <StageHero onExploreNext={goNext} />}
            {activeIndex === 1 && <StageWise onExploreNext={goNext} />}
            {activeIndex === 2 && <StageExploration onExploreNext={goNext} />}
            {activeIndex === 3 && (
              <StageBytedance onScrollToTop={() => goToStage(0)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
