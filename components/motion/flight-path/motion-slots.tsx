"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { motionPhysics } from "@/tokens";
import type { DossierImpact } from "@/lib/career-dossier";

/**
 * BRAWUKA-37 · Five-act motion slot choreography.
 *
 * One wrapper per `motionSlot` value in lib/career-dossier.ts. Every slot:
 * - animates opacity/transform only (compositor-friendly, 60/120fps),
 * - carries a `prefers-reduced-motion` static fallback (no motion, final state),
 * - renders `tabular-nums` for every counter so digits never shift layout (Zero CLS).
 */

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent): void => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

interface SlotProps {
  children: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Act 1 · slow roll — paper cards drifting in on the horizontal reel  */
/* ------------------------------------------------------------------ */

export function SlotSlowRoll({ children, className = "" }: SlotProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div data-slot="act1-slow-roll">{children}</div>;
  return (
    <motion.div
      data-slot="act1-slow-roll"
      className={className}
      initial={{ x: 32, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", ...motionPhysics.springs.trayFloat }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Act 1 · bento counter — 20k/4k count-up, tabular-nums, Zero CLS     */
/* ------------------------------------------------------------------ */

function parseCounter(value: string): { num: number; suffix: string } | null {
  const m = value.match(/^([\d.]+)\s*([a-zA-Z%+]*)$/);
  if (!m) return null;
  return { num: Number(m[1]), suffix: m[2] };
}

export function ImpactCounter({ impact }: { impact: DossierImpact }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = usePrefersReducedMotion();
  const parsed = useMemo(() => parseCounter(impact.value), [impact.value]);
  const [display, setDisplay] = useState(impact.value);

  useEffect(() => {
    if (!parsed || !inView || reduced) {
      setDisplay(impact.value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number): void => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = parsed.num * eased;
      setDisplay(
        `${Number.isInteger(parsed.num) ? Math.round(current) : current.toFixed(1)}${parsed.suffix}`,
      );
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, impact.value, parsed]);

  return (
    <span ref={ref} className="tabular-nums" aria-label={`${impact.metric}: ${impact.value}`}>
      {display}
    </span>
  );
}

export function SlotBentoCounter({ children, className = "" }: SlotProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div data-slot="act1-bento-counter">{children}</div>;
  return (
    <motion.div
      data-slot="act1-bento-counter"
      className={className}
      initial={{ y: 28, opacity: 0, scale: 0.98 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", ...motionPhysics.springs.trayFloat }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Act 2 · fog — N06 新人浓雾: low-opacity blur slow roll + mentor     */
/* snap-into-focus entrance                                            */
/* ------------------------------------------------------------------ */

export function SlotFog({ children, className = "" }: SlotProps) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return (
      <div data-slot="act2-fog">
        {children}
        <p className="mt-2 border-l-2 border-ink-dominant pl-3 font-telemetry text-[11px] leading-relaxed text-secondary">
          {t.resume.mentorNote}
        </p>
      </div>
    );
  }
  return (
    <motion.div data-slot="act2-fog" className={`relative ${className}`}>
      {/* Drifting fog veil: low-opacity blur sheet rolling away on entry */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded bg-substrate/60 backdrop-blur-md"
        initial={{ opacity: 0.85 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <motion.div
        initial={{ opacity: 0.35, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      {/* Mentor snap-into-focus strip */}
      <motion.p
        className="mt-2 border-l-2 border-ink-dominant pl-3 font-telemetry text-[11px] leading-relaxed text-secondary"
        initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", ...motionPhysics.springs.snappy, delay: 0.5 }}
      >
        {t.resume.mentorNote}
      </motion.p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Act 2 · red alert — N07 安全红警示帧 + oncall pulse (opacity only)  */
/* ------------------------------------------------------------------ */

export function SlotRedAlert({ children, className = "" }: SlotProps) {
  const reduced = usePrefersReducedMotion();
  return (
    <div data-slot="act2-red-alert" className={className}>
      <div className="overflow-hidden rounded border-2 border-safelight/70">
        <div className="flex items-center justify-between bg-safelight/10 px-3 py-1.5 font-telemetry text-[10px] tracking-[0.12em] text-safelight">
          <span className="flex items-center gap-2">
            {!reduced && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-safelight opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-safelight" />
              </span>
            )}
            ONCALL // 7×24
          </span>
          <span className="tabular-nums">~100 JOBS</span>
        </div>
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Act 2 · layered lightup — N08 三轨逐层点亮 (opacity only)           */
/* ------------------------------------------------------------------ */

const IM_LAYERS = ["GATEWAY · Go", "STORE · 三轨并存", "SYNC · 多活排序"] as const;

export function SlotLayeredLightup({ children, className = "" }: SlotProps) {
  const reduced = usePrefersReducedMotion();
  const layers = (
    <div className="mb-2 flex flex-wrap gap-1.5" aria-label="IM architecture layers">
      {IM_LAYERS.map((layer, i) => (
        <LayerChip key={layer} label={layer} index={i} reduced={reduced} />
      ))}
    </div>
  );
  if (reduced) {
    return (
      <div data-slot="act2-layered-lightup" className={className}>
        {layers}
        {children}
      </div>
    );
  }
  return (
    <motion.div
      data-slot="act2-layered-lightup"
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      {layers}
      {children}
    </motion.div>
  );
}

function LayerChip({ label, index, reduced }: { label: string; index: number; reduced: boolean }) {
  const chip = (
    <span className="rounded border border-border-plate bg-chamber px-2 py-0.5 font-telemetry text-[10px] tracking-wider text-secondary">
      {String(index + 1).padStart(2, "0")} {"//"} {label}
    </span>
  );
  if (reduced) return chip;
  return (
    <motion.span
      initial={{ opacity: 0.15 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.28 }}
    >
      {chip}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* Act 3 · pipeline flow — N09 日志管道粒子流 (canvas ≤60, IO pause)   */
/* ------------------------------------------------------------------ */

const MAX_PARTICLES = 60;

export function SlotPipelineFlow({ children, className = "" }: SlotProps) {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles = Array.from({ length: MAX_PARTICLES }, (_, i) => ({
      x: Math.random(),
      y: 0.2 + Math.random() * 0.6,
      speed: 0.0016 + Math.random() * 0.003,
      phase: (i / MAX_PARTICLES) * Math.PI * 2,
    }));

    const resize = (): void => {
      const rect = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(48 * dpr));
    };
    resize();
    window.addEventListener("resize", resize);

    const ink = getComputedStyle(document.documentElement)
      .getPropertyValue("--ink-dominant")
      .trim();
    ctx.fillStyle = ink || "#2148B8";

    const frame = (): void => {
      raf = requestAnimationFrame(frame);
      if (!visible) return; // off-viewport: skip all canvas work
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      // Three conduit rails: Vector → Kafka → ES
      ctx.globalAlpha = 0.25;
      ctx.fillRect(0, h * 0.28, w, 1 * dpr);
      ctx.fillRect(0, h * 0.52, w, 1 * dpr);
      ctx.fillRect(0, h * 0.76, w, 1 * dpr);
      ctx.globalAlpha = 0.9;
      const r = 1.6 * dpr;
      for (const p of particles) {
        p.x += p.speed;
        if (p.x > 1) p.x = 0;
        const wobble = Math.sin(p.x * 12 + p.phase) * 2 * dpr;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h + wobble, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(frame);

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <div data-slot="act3-pipeline-flow" className={className}>
      <div ref={wrapRef} className="mb-2 overflow-hidden rounded border border-border-plate bg-chamber">
        <div className="flex items-center justify-between px-3 pt-1.5 font-telemetry text-[10px] tracking-[0.12em] text-muted">
          <span>VECTOR → KAFKA → ES</span>
          <span className="tabular-nums">≤{MAX_PARTICLES} PTS</span>
        </div>
        {reduced ? (
          <svg viewBox="0 0 300 48" className="h-12 w-full" aria-hidden>
            <line x1="0" y1="13" x2="300" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.25" />
            <line x1="0" y1="25" x2="300" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.25" />
            <line x1="0" y1="37" x2="300" y2="37" stroke="currentColor" strokeWidth="1" opacity="0.25" />
          </svg>
        ) : (
          <canvas ref={canvasRef} className="h-12 w-full text-ink-dominant" aria-hidden />
        )}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Act 3 · ledger stamp — N10 银行台账慢盖印 (distinct from pipeline)  */
/* ------------------------------------------------------------------ */

export function SlotLedgerStamp({ children, className = "" }: SlotProps) {
  const reduced = usePrefersReducedMotion();
  const stamp = (
    <div className="pointer-events-none flex justify-end" aria-hidden>
      <div
        className={`inline-block -rotate-6 rounded border-2 border-ink-accent px-3 py-1 font-telemetry text-[11px] font-bold tracking-[0.18em] text-ink-accent ${
          reduced ? "opacity-70" : ""
        }`}
      >
        LEDGER · 台账已核
      </div>
    </div>
  );
  if (reduced) {
    return (
      <div data-slot="act3-ledger-stamp" className={className}>
        {stamp}
        {children}
      </div>
    );
  }
  return (
    <motion.div data-slot="act3-ledger-stamp" className={className}>
      <motion.div
        initial={{ opacity: 0, scale: 1.6, rotate: 2 }}
        whileInView={{ opacity: 0.9, scale: 1, rotate: -6 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", ...motionPhysics.springs.snappy, delay: 0.35 }}
      >
        {stamp}
      </motion.div>
      {/* ruled ledger lines behind the card */}
      <div
        aria-hidden
        className="mb-1 h-8 opacity-40"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 7px, var(--border-plate) 7px 8px)",
        }}
      />
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Act 3 · bento row — N11 side-project cards, staggered rise          */
/* ------------------------------------------------------------------ */

export function SlotBentoRow({ children, className = "" }: SlotProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div data-slot="act3-bento-row">{children}</div>;
  return (
    <motion.div
      data-slot="act3-bento-row"
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        shown: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Act 3 · live cursor — N12 进行中呼吸光标                            */
/* ------------------------------------------------------------------ */

export function SlotLiveCursor({ children, className = "" }: SlotProps) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  return (
    <div data-slot="act3-live-cursor" className={className}>
      <div className="mb-2 flex items-center gap-2 font-telemetry text-[10px] tracking-[0.12em] text-safelight">
        {!reduced && (
          <span className="inline-block h-3 w-[7px] animate-pulse bg-safelight" aria-hidden />
        )}
        <span>{t.resume.liveNote} — {new Date().getFullYear().toString()}</span>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Slot dispatcher — every motionSlot value has a choreography         */
/* ------------------------------------------------------------------ */

export const KNOWN_MOTION_SLOTS = [
  "act1-slow-roll",
  "act1-bento-counter",
  "act2-fog",
  "act2-red-alert",
  "act2-layered-lightup",
  "act3-pipeline-flow",
  "act3-ledger-stamp",
  "act3-bento-row",
  "act3-live-cursor",
] as const;

export function SlotFrame({
  slot,
  children,
  className = "",
}: SlotProps & { slot: string }) {
  switch (slot) {
    case "act1-slow-roll":
      return <SlotSlowRoll className={className}>{children}</SlotSlowRoll>;
    case "act1-bento-counter":
      return <SlotBentoCounter className={className}>{children}</SlotBentoCounter>;
    case "act2-fog":
      return <SlotFog className={className}>{children}</SlotFog>;
    case "act2-red-alert":
      return <SlotRedAlert className={className}>{children}</SlotRedAlert>;
    case "act2-layered-lightup":
      return <SlotLayeredLightup className={className}>{children}</SlotLayeredLightup>;
    case "act3-pipeline-flow":
      return <SlotPipelineFlow className={className}>{children}</SlotPipelineFlow>;
    case "act3-ledger-stamp":
      return <SlotLedgerStamp className={className}>{children}</SlotLedgerStamp>;
    case "act3-bento-row":
      return <SlotBentoRow className={className}>{children}</SlotBentoRow>;
    case "act3-live-cursor":
      return <SlotLiveCursor className={className}>{children}</SlotLiveCursor>;
    default:
      return (
        <div data-slot={slot} className={className}>
          {children}
        </div>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Act 4 · S6《I_hate_IM》金句卡 — collapsed by default, expand on tap */
/* ------------------------------------------------------------------ */

const IHATEIM_QUOTES = [
  "已读回执把每一次阅读都变成一次被监视的签名。",
  "「正在输入…」把思考过程直播给了对方。",
  "最后上线时间，是对缺席者最温柔的审判，也是最冷酷的考勤。",
] as const;

export function CritiqueCard({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded border border-dashed border-border-plate bg-chamber/60 p-3 ${className}`}
      data-critique="I_hate_IM"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="ihateim-quotes"
        className="flex w-full cursor-pointer items-center justify-between gap-2 text-left"
      >
        <span className="font-telemetry text-[11px] tracking-[0.1em] text-secondary">
          S6 //《I_hate_IM》— 工程师实现它，作者质疑它
        </span>
        <span className="shrink-0 rounded border border-border-plate px-1.5 py-0.5 font-telemetry text-[10px] text-ink-dominant">
          {open ? "收起 −" : "展开 +"}
        </span>
      </button>
      {open && (
        <ul id="ihateim-quotes" className="mt-2 space-y-1.5">
          {IHATEIM_QUOTES.map((q) => (
            <li
              key={q}
              className="border-l-2 border-safelight pl-2 font-body text-[13px] leading-relaxed text-primary"
            >
              {q}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
