"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

interface StageWiseProps {
  onExploreNext: () => void;
}

/**
 * BRAWUKA-93 · Act 1 Wise (Editorial & Impact-Focused)
 * Generous side margins (max-w-2xl), quiet metrics, zero box clutter.
 */
export function StageWise({ onExploreNext }: StageWiseProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col justify-between px-6 py-10 sm:px-8 sm:py-14">
      {/* 1. Quiet Stage Eyebrow */}
      <div className="flex items-center justify-between border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <span className="font-semibold text-cobalt">01 // WISE · 2024–PRESENT</span>
        <span className="text-[11px] opacity-75">FULL-STACK PRODUCT ENGINEER</span>
      </div>

      {/* 2. Core Narrative & Impact */}
      <div className="my-auto py-6">
        <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">
          Product + Impact Matters More
        </h2>
        <p className="mt-1 font-telemetry text-xs tracking-wider text-muted">
          {isZh
            ? "技术永远为业务服务 · AI Workflow Platform & PayOps"
            : "Technology In Service of Business · AI Workflow Platform"}
        </p>

        <p className="mt-4 font-serif text-sm italic leading-relaxed text-secondary sm:text-base sm:leading-relaxed">
          {isZh
            ? "“在 Wise 建立的核心工程心智：技术永远是为业务服务的。在有限的工程资源与时间窗口内，以 Impact 最大化为唯一北极星，坚决抵制盲目立项与自嗨。”"
            : "“The core engineering ethos: Technology is always in service of business. Ruthlessly prioritizing within tight windows, maximizing measurable impact as the sole North Star.”"}
        </p>

        {/* Airy Metrics Ruled Block (3 quantified facts with zero CLS tabular-nums) */}
        <div className="mt-8 grid grid-cols-3 divide-x divide-border-plate/60 border-y border-border-plate/60 py-4 text-center">
          <div className="px-2 sm:px-4">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "月自动化" : "AUTOMATION"}
            </span>
            <div className="mt-1 font-display text-2xl font-bold text-primary tabular-nums sm:text-3xl">
              30,000<span className="text-sm font-normal text-cobalt">+</span>
            </div>
            <p className="mt-0.5 font-telemetry text-[10px] text-muted">cases / mo</p>
          </div>

          <div className="px-2 sm:px-4">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "核验准确率" : "ACCURACY"}
            </span>
            <div className="mt-1 font-display text-2xl font-bold text-primary tabular-nums sm:text-3xl">
              98<span className="text-sm font-normal text-cobalt">%+</span>
            </div>
            <p className="mt-0.5 font-telemetry text-[10px] text-muted">matching</p>
          </div>

          <div className="px-2 sm:px-4">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "直接降本" : "SAVINGS"}
            </span>
            <div className="mt-1 font-display text-2xl font-bold text-primary tabular-nums sm:text-3xl">
              £80,000
            </div>
            <p className="mt-0.5 font-telemetry text-[10px] text-muted">GBP / mo</p>
          </div>
        </div>

        {/* Engineering Footnote */}
        <p className="mt-4 font-body text-xs text-muted">
          {isZh
            ? "主导重构支付缺陷（Payment Defects）自动化系统，搭建 AI 工作流平台，将复杂资金异常处理周期从天级缩短至秒级，年化直接节省运营成本近百万英镑。"
            : "Led AI Workflow Platform architecture across Payment Defects, reducing exception resolution from days to seconds with £1M+ annualized direct savings."}
        </p>
      </div>

      {/* 3. Next Stage Indicator */}
      <div className="flex flex-col items-center">
        <button
          onClick={onExploreNext}
          type="button"
          className="group flex flex-col items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-primary"
          aria-label="Explore Act 2: MariBank & Bondee"
        >
          <span>{isZh ? "下一幕 · MARIBANK & BONDEE" : "PROCEED TO MARIBANK & BONDEE"}</span>
          <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
