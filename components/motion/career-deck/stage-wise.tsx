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
    <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-4 py-2 sm:px-8 sm:py-6 overflow-hidden">
      <div className="relative z-10 space-y-2.5 sm:space-y-4">
        {/* 1. Header & Role */}
        <div className="border-b border-border-plate/60 pb-2 sm:pb-3 font-telemetry">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Wise
            </h2>
            <span className="text-[11px] sm:text-xs text-muted tabular-nums">
              2024 – PRESENT · SINGAPORE
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-xs sm:text-sm text-secondary">
            <span className="font-semibold text-ink-dominant">Product Engineer 3</span>
            <span className="text-muted opacity-40">/</span>
            <span className="font-medium text-primary">Tech Owner</span>
            <span className="text-muted opacity-40">·</span>
            <span className="text-muted text-[11px] sm:text-xs">
              {isZh ? "区域平台与支付缺陷工具链" : "Regional Platform · Payment Defects & Tooling"}
            </span>
          </div>
        </div>

        {/* 2. Financial & System Impact Bar */}
        <div className="grid grid-cols-3 divide-x divide-border-plate/60 rounded-[2px] border border-border-plate/60 bg-surface/50 py-2 sm:py-3 text-center">
          <div className="px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "月度净节省" : "NET SAVINGS"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
              £80,000
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">{isZh ? "英镑 / 月" : "GBP / month"}</p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "核验准确率" : "PRECISION"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
              99.8<span className="text-xs font-normal text-ink-dominant">%</span>
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">{isZh ? "40% 召回 · 98%+ 准确率" : "40% recall · 98%+ accuracy"}</p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "月自动化处理" : "AUTOMATION"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
              30,000<span className="text-xs font-normal text-ink-dominant">+</span>
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">{isZh ? "笔错账 / 月" : "cases / month"}</p>
          </div>
        </div>

        {/* 3. High-Signal Battle Modules */}
        <ul className="space-y-2.5 font-body text-xs sm:text-sm leading-relaxed text-secondary">
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "AI 评估平台与自动化路线图（Tech Owner）：" : "AI Workflow Platform & Evaluation Roadmap: "}
              </strong>
              {isZh
                ? "负责自动化与工单平台技术路线规划；搭建核心 AI 评估平台（AI Evaluation Platform），以基准实时监控与第三方 Ops 双盲评审确立准入与审计安全兜底标准，支持区域工程师自主接入定制对账与异常流转。"
                : "Formulated technical roadmaps and team planning for the regional platform tooling team; built the core AI Evaluation Platform with baseline live monitoring and 3rd-party Ops blind evaluations as standard audit and safeguard gates."}
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "最后一公里资金对账 AI 工作流（Initialise + Lead 1 Grad）：" : "Last-Mile Payment Linking AI Workflow: "}
              </strong>
              {isZh
                ? "针对无金集的长尾复杂滞留资金对账，设计确定性 DAG 状态机工作流；调优至 99.8% 极高精度（零错划）与 40% 召回率，月自动化处理 30,000+ 笔错账，扣除推理成本后净贡献 £80,000/月直接运营降本。"
                : "Designed deterministic DAG state machines for complex unallocated fund matching without golden datasets, tuning for 99.8% precision and 40% recall; automated 30,000+ monthly defect cases, generating £80,000/month direct operational savings."}
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "集中式跨团队升级系统（Lead + 跨团队编排）：" : "Centralised Cross-Team Escalation System: "}
              </strong>
              {isZh
                ? "基于 Kafka 打造集中式流转编排核心，替代此前 CS、PayOps、Fraud、KYC 之间碎片化的 Slack/Zendesk 沟通；自研目标系统接入 SDK 标准化生命周期协议（receive / ack / de-escalate），保障生产环境跨组稳定流转。"
                : "Built a Kafka-based orchestration service to replace ad-hoc Slack/Zendesk handoffs across disparate ops systems (CS, PayOps, Fraud, KYC); authored client integration SDKs standardising lifecycle states (receive, ack, de-escalate), currently live across primary cross-team corridors."}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
