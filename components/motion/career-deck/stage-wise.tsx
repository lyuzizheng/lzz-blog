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
        <div className="border-b border-border-plate/60 pb-2 sm:pb-3 font-telemetry text-[11px] sm:text-xs uppercase tracking-widest text-muted">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-ink-dominant">
              {isZh ? "01 // WISE · 新加坡 · 2024–至今" : "01 // WISE · SINGAPORE · 2024–PRESENT"}
            </span>
            <span className="text-[10px] sm:text-[11px] opacity-75">FULL-TIME · IC3 · TECH OWNER</span>
          </div>
          <div className="mt-0.5 sm:mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              Product Engineer 3
            </h2>
            <span className="text-muted opacity-40">·</span>
            <span className="font-telemetry text-[11px] sm:text-xs text-muted">
              {isZh ? "Regional Platform Team · Payment Defects, Incidents & Tooling" : "Regional Platform Team · Payment Defects, Incidents & Tooling"}
            </span>
          </div>
        </div>

        {/* 2. Bespoke Financial Telemetry Bar (Zero-CLS tabular-nums) */}
        <div className="grid grid-cols-3 divide-x divide-border-plate/60 rounded-[2px] border border-border-plate/60 bg-surface/40 py-1.5 sm:py-2.5 text-center">
          <div className="px-1.5 sm:px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "月自动化处理" : "AUTOMATION"}
            </span>
            <div className="font-display text-base font-bold text-primary tabular-nums sm:text-xl">
              30,000<span className="text-xs font-normal text-ink-dominant">+</span>
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">{isZh ? "笔错账 / 月" : "cases / mo"}</p>
          </div>

          <div className="px-1.5 sm:px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "核验准确率" : "PRECISION / RECALL"}
            </span>
            <div className="font-display text-base font-bold text-primary tabular-nums sm:text-xl">
              99.8<span className="text-xs font-normal text-ink-dominant">%</span>
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">{isZh ? "40% 召回 · 98%+ 准确率" : "40% recall · 98%+ accuracy"}</p>
          </div>

          <div className="px-1.5 sm:px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "月度净节省" : "NET SAVINGS"}
            </span>
            <div className="font-display text-base font-bold text-primary tabular-nums sm:text-xl">
              £80,000
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">{isZh ? "英镑 / 月" : "GBP / mo"}</p>
          </div>
        </div>

        {/* 3. High-Signal Bullets (Grounded, non-AI prose) */}
        <ul className="space-y-2 font-body text-[11px] leading-snug text-secondary sm:space-y-2.5 sm:text-sm sm:leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "AI 自动化规划与评估平台（AI Workflow Platform & Evaluation / Tech Owner）：" : "AI Workflow Platform & Evaluation Roadmap: "}
              </strong>
              {isZh
                ? "负责自动化与工单领域的平台路线图规划与任务拆解，定义平台如何支持各区域团队接入非 Happy-path 异常场景（如各地区定制对账策略、特定银行渠道的 Payout 异常自动化）；从 0 到 1 搭建 AI 评估平台（AI Evaluation Platform），确立基线实时监控（Live Monitoring against baseline）与第三方 Ops 双盲评审（Third Ops Blind Evaluation），作为全组后续新自动化准入的审计与兜底标准。"
                : "Formulated technical roadmaps and team planning for the regional platform tooling team, enabling regional engineers to onboard non-happy-path exception automations (bespoke linking strategies, banking partner payout defects); initialised and built the core AI Evaluation Platform with baseline live monitoring and third-party Ops blind evaluations as the audit and safeguard standard for future automations."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "最后一公里资金对账 AI 工作流（Initialise + 带 1 个 Grad）：" : "Last-Mile Payment Linking AI Workflow: "}
              </strong>
              {isZh
                ? "针对 0.5% 最复杂的长尾滞留资金对账，在无金集场景下设计基于确定性 DAG 状态机的 AI 工作流；坚持金融零容错工程底线，严格调优为 99.8% Precision（极高精度防错划）与 40% Recall，稳定月均自动处理 30,000+ 笔错账案件，扣除推理成本后净贡献 £80,000 英镑/月（年化近百万镑）运营降本。"
                : "Designed deterministic DAG state machines for edge-case unallocated fund matching without golden datasets, tuning for 99.8% precision and 40% recall to eliminate financial risk; automated 30,000+ monthly defect cases, yielding £80,000/month direct operational savings."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "集中式跨团队升级系统（Lead + 带 1 个 Grad + 跨团队协同）：" : "Centralised Cross-Team Escalation System: "}
              </strong>
              {isZh
                ? "搭建基于 Kafka 的集中式 Escalation 核心服务，替代此前 CS、PayOps、Fraud、KYC 之间依靠 Slack/Zendesk 的碎片化沟通；自研目标系统接入 SDK，标准化 receive → ack → de-escalate 生命周期协议，支持团队升级路径与原因分类的平台化配置，已在 CS ↔ PayOps、Fraud → CS、KYC → CS 生产环境稳定运行。"
                : "Built a Kafka-based orchestration service to replace ad-hoc Slack/Zendesk handoffs across disparate ops systems (CS, PayOps, Fraud, KYC); authored client integration SDKs standardising lifecycle states (receive, ack, de-escalate) and configurable team-to-team routing, currently live across CS ↔ PayOps, Fraud → CS, and KYC → CS corridors."}
            </div>
          </li>
        </ul>

        {/* 4. Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5 sm:pt-1 font-telemetry text-[10px] sm:text-[11px] text-muted">
          <span className="font-semibold text-primary">STACK:</span>
          {["Java 21", "Spring Boot", "PostgreSQL", "Apache Kafka", "Redis", "DAG Workflows", "Distributed Systems"].map((tech, idx) => (
            <span
              key={tech}
              className={`rounded-[2px] border border-border-plate/60 bg-surface/60 px-1 sm:px-1.5 py-0.5 ${
                idx > 4 ? "hidden sm:inline-block" : "inline-block"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
