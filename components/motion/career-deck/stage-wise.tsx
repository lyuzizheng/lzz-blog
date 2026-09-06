"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { TrendingUp, ShieldCheck, Cpu, ArrowRight } from "lucide-react";

interface StageWiseProps {
  onExploreNext: () => void;
}

export function StageWise({ onExploreNext }: StageWiseProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="relative flex h-full min-h-[calc(100dvh-3.5rem)] w-full flex-col justify-between px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
      {/* Top Telemetry Header */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-b border-border-plate pb-3 font-telemetry text-[11px] uppercase tracking-wider text-muted">
        <div className="flex items-center gap-3">
          <span className="font-bold text-cobalt">ACT 01 // WISE · 2024–PRESENT</span>
          <span className="text-border-plate">|</span>
          <span>PAYMENT DEFECTS GROUP</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">FULL-STACK PRODUCT ENGINEER</span>
          <span className="text-border-plate">|</span>
          <span className="font-semibold text-primary">AI WORKFLOW PLATFORM</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto my-auto w-full max-w-5xl py-4 lg:py-6">
        {/* Stage Title & Philosophy */}
        <div className="max-w-3xl">
          <div className="mb-2 flex items-center gap-2 font-telemetry text-xs uppercase tracking-widest text-cobalt">
            <Cpu className="h-3.5 w-3.5" />
            <span>BUSINESS IMPACT NORTH STAR</span>
          </div>

          <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Product + Impact Matters More
          </h2>
          <p className="mt-1 font-telemetry text-xs tracking-wider text-muted sm:text-sm">
            {isZh ? "技术永远为业务服务 · PayOps AI 工作流平台与全链路提效" : "Technology In Service of Business · AI Workflow Platform"}
          </p>

          <p className="mt-4 rounded-xs border-l-2 border-cobalt bg-surface/60 p-3 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
            {isZh
              ? "在 Wise 建立的核心工程心智：技术永远是为业务服务的。在有限的工程资源与时间窗口内，科学拆解优先级、统筹团队规划，以 Impact 最大化为唯一北极星，坚决抵制盲目立项与自嗨。"
              : "The core engineering ethos: Technology is always in service of business. Prioritizing ruthlessly within tight windows, maximizing measurable impact as the sole North Star, and resisting ungrounded vanity projects."}
          </p>
        </div>

        {/* 4 Quantified Impact Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          {/* Card 1: 30k+ cases / month */}
          <div className="rounded-xs border border-border-plate bg-surface/90 p-4 shadow-plate backdrop-blur-xs">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "月自动化处理" : "MONTHLY AUTOMATION"}
            </span>
            <div className="mt-2 font-display text-3xl font-bold text-primary tabular-nums sm:text-4xl">
              30,000<span className="text-xl text-cobalt">+</span>
            </div>
            <p className="mt-1 font-body text-[12px] leading-snug text-muted">
              {isZh ? "cases / 月全自动流转，解决数百种错综复杂的资金缺陷" : "cases/mo automated across complex defect scenarios"}
            </p>
          </div>

          {/* Card 2: 98%+ accuracy */}
          <div className="rounded-xs border border-border-plate bg-surface/90 p-4 shadow-plate backdrop-blur-xs">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "核验匹配准确率" : "MATCHING ACCURACY"}
            </span>
            <div className="mt-2 font-display text-3xl font-bold text-primary tabular-nums sm:text-4xl">
              98<span className="text-xl text-cobalt">%+</span>
            </div>
            <p className="mt-1 font-body text-[12px] leading-snug text-muted">
              {isZh ? "首批 Onboard 最后一公里资金交易核验匹配场景 (Last-mile)" : "First onboarded for last-mile payment linking scenarios"}
            </p>
          </div>

          {/* Card 3: £80,000 / month savings */}
          <div className="rounded-xs border border-cobalt/40 bg-surface/90 p-4 shadow-plate backdrop-blur-xs">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-cobalt font-semibold">
              {isZh ? "直接商业价值" : "DIRECT BUSINESS VALUE"}
            </span>
            <div className="mt-2 font-display text-3xl font-bold text-primary tabular-nums sm:text-4xl">
              £80,000<span className="text-sm font-normal text-muted">/mo</span>
            </div>
            <p className="mt-1 font-body text-[12px] leading-snug text-muted">
              {isZh ? "为公司节省高额人工运营成本，年化节省近百万英镑" : "Annualized ~£1.0M in direct human operation cost reduction"}
            </p>
          </div>

          {/* Card 4: Enterprise Compliance */}
          <div className="rounded-xs border border-border-plate bg-surface/90 p-4 shadow-plate backdrop-blur-xs">
            <div className="flex items-center gap-1.5 font-telemetry text-[10px] uppercase tracking-wider text-muted">
              <ShieldCheck className="h-3 w-3 text-terracotta" />
              <span>{isZh ? "企业级合规架构" : "ENTERPRISE COMPLIANCE"}</span>
            </div>
            <div className="mt-2 font-display text-xl font-bold text-primary sm:text-2xl">
              3-Pillar
            </div>
            <p className="mt-1 font-body text-[12px] leading-snug text-muted">
              {isZh ? "端到端保障资金安全、全链路可审计追踪与高精度可观测性" : "End-to-end security, full auditability, high observability"}
            </p>
          </div>
        </div>

        {/* Architecture & Engineering Footnote */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border-plate pt-3 font-telemetry text-[11px] text-muted">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-cobalt" />
            <span>
              {isZh
                ? "系统架构：主导设计并落地贯穿整个 PayOps 运营线的 AI Workflow Platform + AI Infra 底座"
                : "System Architecture: Led AI Workflow Platform & AI Infra across Wise PayOps"}
            </span>
          </div>
          <span className="text-primary font-semibold">VERIFIED IMPACT // PAYOPS</span>
        </div>
      </div>

      {/* Downward Exploration Indicator */}
      <div className="mx-auto flex flex-col items-center pb-2">
        <button
          onClick={onExploreNext}
          type="button"
          className="group flex items-center gap-2 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-primary"
          aria-label="Proceed to Act 2: MariBank + Bondee"
        >
          <span>{isZh ? "下一幕：MARIBANK + BONDEE" : "PROCEED TO ACT 02 · MARIBANK & BONDEE"}</span>
          <ArrowRight className="h-3.5 w-3.5 text-cobalt transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
