"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";

interface StageWiseProps {
  onExploreNext?: () => void;
  onScrollToTop?: () => void;
}

/**
 * Act 01 // Wise 核心支付 (2024 – PRESENT)
 * 结构化履历条目：AI Workflow Platform 确定性状态机、实时影子比对风控与量化财务收益。
 */
export function StageWise({}: StageWiseProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-6 py-8 sm:px-8">
      {/* Faint Typographic Watermark Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 right-0 z-0 select-none overflow-hidden opacity-[0.03] dark:opacity-[0.04]"
      >
        <span className="font-display text-[8rem] font-black uppercase tracking-tighter leading-none text-ink-dominant sm:text-[12rem] md:text-[15rem]">
          WISE
        </span>
      </div>

      <div className="relative z-10 space-y-4 sm:space-y-5">
        {/* 1. Header & Role */}
        <div className="border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-ink-dominant">
              {isZh ? "01 // WISE · 新加坡 · 2024–至今" : "01 // WISE · SINGAPORE · 2024–PRESENT"}
            </span>
            <span className="text-[11px] opacity-75">FULL-TIME · IC3 (PROM FROM IC2 TOP)</span>
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              Product Engineer 3
            </h2>
            <span className="text-muted opacity-40">·</span>
            <span className="font-telemetry text-xs text-muted">
              {isZh ? "Payment Defects Team · 核心支付错账治理" : "Payment Defects Team · Core Payouts"}
            </span>
          </div>
        </div>

        {/* 2. Bespoke Financial Telemetry Bar (Zero-CLS tabular-nums) */}
        <div className="grid grid-cols-3 divide-x divide-border-plate/60 rounded-[2px] border border-border-plate/60 bg-surface/40 py-2.5 text-center">
          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "月自动化处理" : "AUTOMATION"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              30,000<span className="text-xs font-normal text-ink-dominant">+</span>
            </div>
            <p className="font-telemetry text-[9px] text-muted">{isZh ? "笔错账 / 月" : "cases / mo"}</p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "核验准确率" : "ACCURACY"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              98<span className="text-xs font-normal text-ink-dominant">%+</span>
            </div>
            <p className="font-telemetry text-[9px] text-muted">{isZh ? "影子流量比对" : "matching rate"}</p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "月度净节省" : "NET SAVINGS"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              £80,000
            </div>
            <p className="font-telemetry text-[9px] text-muted">{isZh ? "英镑 / 月" : "GBP / mo"}</p>
          </div>
        </div>

        {/* 3. High-Signal Bullets (Grounded, non-AI prose) */}
        <ul className="space-y-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "AI Workflow Platform 架构设计：" : "AI Workflow Platform Architecture: "}
              </strong>
              {isZh
                ? "针对最后 0.5% 依赖繁琐人工操作的资金对账（Last-mile Linking），在无基准数据集场景下，从零搭建基于确定性 DAG 状态机的金融 AI 自动化平台。"
                : "Architected financial AI Evaluation & DAG Automation Platform from scratch: designed deterministic state machines for last-mile payment linking without golden datasets."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "实时影子比对与熔断风控：" : "Live Shadowing & Blast Radius Control: "}
              </strong>
              {isZh
                ? "采用实时影子流量（Live Shadowing）比对 PayOps 人工作业，设置 99.5% 准确率门禁；生产环境保持 5% 金丝雀对照流检测漂移并支持毫秒级熔断；大额与高风险场景强制双人复核，保障资金安全零事故。"
                : "Implemented real-time live shadowing against PayOps manual operations, 99.5% accuracy gating, and 5% canary control traffic with sub-second circuit-breaker failover and risk-tiered large amount threshold gating."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "可衡量业务 ROI 与运营降本：" : "Operational Impact & Direct Savings: "}
              </strong>
              {isZh
                ? "跨全球异构清算渠道与币种规则，每月自动化消化 30,000+ 资金错账案件，核验准确率 98%+，扣除模型调用成本后直接贡献净节约 £80,000 英镑/月（年化近百万英镑）。"
                : "Automated 30,000+ complex payment defect cases/month with 98%+ accuracy across heterogeneous partner rules, securing £80,000 GBP/month (~£1M/year) in direct operational savings."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "Compensation 赔付系统与工单协同：" : "Compensation Engine & Escalation System: "}
              </strong>
              {isZh
                ? "重构跨渠道客户赔付平台，实施多方合规双人复核与资金防重放；基于 Kafka 搭建客服（CS）与资金运营（PayOps）双向流转平台，利用结构化遥测数据推动上游根因治理。"
                : "Re-architected global Compensation Platform with double-approval compliance controls; built Kafka-based bidirectional escalation system bridging CS and PayOps to eliminate upstream ticket triggers."}
            </div>
          </li>
        </ul>

        {/* 4. Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 font-telemetry text-[11px] text-muted">
          <span className="font-semibold text-primary">STACK:</span>
          {["Java 21", "Spring Boot", "PostgreSQL", "Apache Kafka", "Redis", "DAG Workflows", "Distributed Systems"].map((tech) => (
            <span
              key={tech}
              className="rounded-[2px] border border-border-plate/60 bg-surface/60 px-1.5 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
