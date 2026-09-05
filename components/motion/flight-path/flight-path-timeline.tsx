"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE_NODES, NARRATIVE_BEATS, type TimelineNode } from "@/lib/career-dossier";
import { useFlightKeyboard } from "./keyboard-nav";
import { SlotFrame, ImpactCounter, CritiqueCard, usePrefersReducedMotion } from "./motion-slots";
import { DossierDrawer, isSelfRefLink } from "./dossier-drawer";

/**
 * BRAWUKA-37 · Interactive Flight Path Timeline.
 *
 * Desktop (lg+): GSAP ScrollTrigger pins the section and scrubs the
 * 35mm reel horizontally (vertical scroll → horizontal travel).
 * Mobile: vertical Pocket Zine stack, zero horizontal overflow.
 * Keyboard (DESIGN.md §7.2): ArrowRight/L forward, ArrowLeft/J back,
 * Home/End jump — synchronous handler, responds within one frame.
 * prefers-reduced-motion: no pin/scrub, native overflow + static slots.
 */

const ACT_BY_NODE: Record<string, string> = (() => {
  const map: Record<string, string> = { N01: "Act 1 · 地基层", N05: "Act 1 · 地基层" };
  for (const beat of NARRATIVE_BEATS) {
    const label =
      beat.act === "Act 0 developing"
        ? "Act 0 · 显影"
        : beat.act === "Act 1 bedrock"
          ? "Act 1 · 地基层"
          : beat.act === "Act 2 abyss-heartbeat"
            ? "Act 2 · 深渊与心跳"
            : beat.act === "Act 3 blade-darkroom"
              ? "Act 3 · 刀锋与暗房"
              : "Act 4 · 人格穿插";
    for (const id of beat.covers) {
      if (!map[id]) map[id] = label;
    }
  }
  return map;
})();

function frameNo(index: number): string {
  return `FRAME ${String(index + 1).padStart(2, "0")}`;
}

export function FlightPathTimeline() {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  const nodes = TIMELINE_NODES;
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [drawerNode, setDrawerNode] = useState<TimelineNode | null>(null);

  /* Pinned horizontal scrub (desktop, motion-safe only) */
  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      const section = sectionRef.current;
      if (!track || !viewport || !section) return;
      const amount = (): number => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const tween = gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${amount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.round(self.progress * (nodes.length - 1));
            activeRef.current = i;
            setActiveIndex(i);
          },
        },
      });
      triggerRef.current = tween.scrollTrigger as ScrollTrigger;
      return () => {
        triggerRef.current = null;
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, [reduced, nodes.length]);

  const activeRef = useRef(0);
  const scrollToNode = useCallback(
    (index: number) => {
      activeRef.current = index;
      setActiveIndex(index);
      const trigger = triggerRef.current;
      if (trigger) {
        // Pinned scrub mode: drive the page scroll position directly.
        const start = trigger.start;
        const distance = trigger.end - trigger.start;
        const top = start + distance * (nodes.length <= 1 ? 0 : index / (nodes.length - 1));
        window.scrollTo({ top, behavior: "auto" });
        return;
      }
      cardRefs.current[index]?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    },
    [nodes.length, reduced],
  );

  /* Keyboard contract via the shared hook — sync match + arithmetic (<16ms).
     enabled=false while the dossier drawer is open. */
  useFlightKeyboard({
    count: nodes.length,
    index: activeIndex,
    enabled: drawerNode === null,
    onStep: useCallback(
      (next: number) => {
        if (next === activeRef.current) return;
        scrollToNode(next);
      },
      [scrollToNode],
    ),
  });

  const progress = nodes.length <= 1 ? 100 : (activeIndex / (nodes.length - 1)) * 100;

  return (
    <div className="flight-path">
      {/* Act 0 · Developing hero */}
      <header className="mb-8 border-b border-border-plate pb-6">
        <p className="font-telemetry text-[11px] tracking-[0.18em] text-safelight">
          {t.resume.timelineAct0}
        </p>
        <h2 className="mt-2 font-display text-3xl leading-tight text-primary sm:text-5xl">
          {t.resume.flightPathTitle}
        </h2>
        <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-muted sm:text-base">
          {t.resume.flightPathSubtitle}
        </p>
        <p className="mt-3 font-telemetry text-[11px] tracking-wider text-muted">
          <kbd className="rounded border border-border-plate px-1.5 py-0.5">→</kbd>/
          <kbd className="rounded border border-border-plate px-1.5 py-0.5">L</kbd> {isZh ? "前进" : "Forward"} ·{" "}
          <kbd className="rounded border border-border-plate px-1.5 py-0.5">←</kbd>/
          <kbd className="rounded border border-border-plate px-1.5 py-0.5">J</kbd> {isZh ? "后退" : "Back"} ·{" "}
          <kbd className="rounded border border-border-plate px-1.5 py-0.5">Home</kbd>/
          <kbd className="rounded border border-border-plate px-1.5 py-0.5">End</kbd> {isZh ? "首尾" : "First/Last"}
        </p>
      </header>

      {/* Pinned reel section */}
      <section ref={sectionRef} aria-label="生涯时间轴长卷" className="relative">
        <div ref={viewportRef} className="overflow-hidden py-1">
          {/* Progress rail */}
          <div className="mb-4 flex items-center gap-3" aria-hidden={false}>
            <span className="font-telemetry text-[11px] text-muted tabular-nums">
              {frameNo(activeIndex)} / FRAME 12
            </span>
            <div
              className="relative h-[3px] flex-1 overflow-hidden rounded bg-chamber"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="时间轴进度"
            >
              <div
                className="absolute inset-y-0 left-0 bg-ink-dominant transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-telemetry text-[11px] text-muted tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>

          <div
            ref={trackRef}
            className="flex flex-col gap-5 lg:w-max lg:flex-row lg:items-stretch lg:gap-6"
          >
            {nodes.map((node, i) => (
              <div
                key={node.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-node-index={i}
                data-node-id={node.id}
                className="w-full lg:w-[330px] lg:shrink-0"
              >
                <SlotFrame slot={node.motionSlot}>
                  <NodeCard
                    node={node}
                    index={i}
                    active={i === activeIndex}
                    onOpen={() => setDrawerNode(node)}
                    onSelect={() => scrollToNode(i)}
                  />
                </SlotFrame>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Act 4 · 人格穿插 interlude */}
      <section aria-label="人格穿插" className="mt-12 border-t border-border-plate pt-6">
        <p className="font-telemetry text-[11px] tracking-[0.18em] text-safelight">
          {t.resume.act4Human}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <CritiqueCard />
          <div className="rounded border border-border-plate bg-surface p-3">
            <p className="font-telemetry text-[11px] tracking-[0.1em] text-secondary">
              {t.resume.photoRep}
            </p>
            <div className="halftone-screen mt-2 flex h-28 items-center justify-center rounded bg-chamber">
              <span className="px-4 text-center font-telemetry text-[10px] leading-relaxed text-muted">
                Sony A7M4 · 35mm F1.4 GM · f/1.4 · 1/250s · ISO 100
                <br />
                {isZh ? "代表作待供图（P5）" : "Specimen photo pending upload (P5)"}
              </span>
            </div>
          </div>
          <div className="rounded border border-border-plate bg-surface p-3">
            <p className="font-telemetry text-[11px] tracking-[0.1em] text-secondary">
              {t.resume.lifeBadminton}
            </p>
            <p className="mt-2 font-display text-3xl text-primary tabular-nums">
              50<span className="text-lg text-muted">{t.resume.badmintonMatches}</span>
            </p>
            <p className="mt-1 font-body text-[13px] leading-relaxed text-muted">
              {t.resume.badmintonNote}
            </p>
          </div>
        </div>
      </section>

      <DossierDrawer node={drawerNode} onClose={() => setDrawerNode(null)} />
    </div>
  );
}

interface NodeCardProps {
  node: TimelineNode;
  index: number;
  active: boolean;
  onOpen: () => void;
  onSelect: () => void;
}

function NodeCard({ node, index, active, onOpen, onSelect }: NodeCardProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const externalLinks = node.links.filter((l) => !isSelfRefLink(l.href));
  return (
    <article
      aria-current={active ? "true" : undefined}
      className={`flex h-full flex-col rounded-lg border bg-surface p-4 transition-colors ${
        active ? "border-ink-dominant shadow-elevated" : "border-border-plate"
      }`}
    >
      {/* 35mm sprocket strip */}
      <div className="mb-3 flex items-center justify-between border-b border-border-plate pb-2" aria-hidden>
        <div className="flex gap-1">
          {Array.from({ length: 8 }).map((_, k) => (
            <span key={k} className="inline-block h-1.5 w-2 rounded-[1px] bg-ink-dominant/30" />
          ))}
        </div>
        <span className="font-telemetry text-[10px] text-muted tabular-nums">{frameNo(index)}</span>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className="cursor-pointer text-left"
        aria-label={`定帧到 ${node.id} ${node.org}`}
      >
        <p className="font-telemetry text-[10px] tracking-[0.14em] text-safelight">
          {ACT_BY_NODE[node.id] ?? node.motionSlot}
        </p>
        <h3 className="mt-1 font-display text-xl leading-snug text-primary">{node.org}</h3>
        <p className="mt-0.5 font-telemetry text-[11px] text-secondary">{node.role}</p>
        <p className="mt-1 font-telemetry text-[11px] text-muted tabular-nums">
          {node.start}
          {node.end ? ` – ${node.end}` : (isZh ? " – 至今" : " – Present")} · {node.codename}
        </p>
      </button>

      <p className="mt-2 font-body text-[13px] font-medium leading-relaxed text-primary">
        {node.mainLine}
      </p>
      <p className="mt-1 line-clamp-3 font-body text-[13px] leading-relaxed text-muted">
        {node.summary}
      </p>

      {node.impact.filter((im) => im.status === "verified").length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {node.impact
            .filter((im) => im.status === "verified")
            .map((im) => (
              <span
                key={im.metric}
                className="rounded bg-chamber px-2 py-0.5 font-telemetry text-[11px] text-secondary tabular-nums"
              >
                {im.metric}: <ImpactCounter impact={im} />
              </span>
            ))}
        </div>
      )}

      {node.id === "N08" && <CritiqueCard className="mt-3" />}

      <div className="mt-auto flex items-center justify-between gap-2 pt-3">
        <div className="flex items-center gap-2">
          {node.archDiagram && (
            <span className="font-telemetry text-[10px] tracking-wider text-ink-dominant">
              {isZh ? "蓝图已收录 →" : "DIAGRAM INCLUDED →"}
            </span>
          )}
          {node.needsOwner && (
            <span className="rounded border border-dashed border-border-plate px-1.5 py-0.5 font-telemetry text-[10px] text-muted">
              {isZh ? "待确认" : "TBD"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {externalLinks.slice(0, 1).map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith("https://") ? "_blank" : undefined}
              rel={l.href.startsWith("https://") ? "noreferrer" : undefined}
              className="font-telemetry text-[11px] text-muted hover:text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              {l.label} ↗
            </a>
          ))}
          <button
            type="button"
            onClick={onOpen}
            className="cursor-pointer rounded border border-ink-dominant/50 px-2.5 py-1 font-telemetry text-[11px] text-ink-dominant hover:bg-ink-dominant hover:text-white"
          >
            {isZh ? "战役简报" : "DOSSIER"}
          </button>
        </div>
      </div>
    </article>
  );
}
