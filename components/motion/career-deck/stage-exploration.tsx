"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";

interface StageExplorationProps {
  onExploreNext?: () => void;
}

/**
 * Act 02 // 银行信贷与云原生 (2023 – 2024)
 * 统一整合 Section：MariBank 数字银行核心信贷分布式一致性与 Bondee 新加坡创始云原生基建。
 */
export function StageExploration({}: StageExplorationProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-4 py-2 sm:px-8 sm:py-6 overflow-hidden">
      <div className="relative z-10 space-y-2.5 sm:space-y-4">
        {/* 1. Header & Role */}
        <div className="border-b border-border-plate/60 pb-2 sm:pb-3 font-telemetry">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              MariBank &amp; Bondee
            </h2>
            <span className="text-[11px] sm:text-xs text-muted tabular-nums">
              2023 – 2024 · SINGAPORE
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-xs sm:text-sm text-secondary">
            <span className="font-semibold text-ink-dominant">Senior Software Engineer</span>
            <span className="text-muted opacity-40">·</span>
            <span className="text-muted text-[11px] sm:text-xs">
              {isZh ? "信贷状态机事务一致性 / 创始员工自建日志架构" : "Banking Credit Consistency & Founding Logging Infra"}
            </span>
          </div>
        </div>

        {/* 2. Asymmetric Dual-Focus Highlight Cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-[2px] border border-border-plate/60 bg-surface/50 p-2 sm:p-3">
            <div className="flex items-center justify-between font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              <span className="truncate">{isZh ? "数字银行核心信贷" : "MARIBANK"}</span>
              <span className="tabular-nums hidden sm:inline">Apr–Jul 24</span>
            </div>
            <div className="mt-0.5 sm:mt-1 font-display text-xs sm:text-sm font-bold text-primary">
              {isZh ? "状态机驱动的信贷一致性" : "State-Machine Credit Consistency"}
            </div>
            <p className="mt-0.5 font-body text-[10px] sm:text-xs text-muted line-clamp-1 sm:line-clamp-none">
              {isZh ? "阶段性强一致 + 流程最终一致 · Cashloan & SME Termloan" : "Phase-wise strong consistency via DB tx + eventual consistency"}
            </p>
          </div>

          <div className="rounded-[2px] border border-border-plate/60 bg-surface/50 p-2 sm:p-3">
            <div className="flex items-center justify-between font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              <span className="truncate">{isZh ? "自研日志基础设施" : "BONDEE"}</span>
              <span className="tabular-nums hidden sm:inline">Oct 23–Apr 24</span>
            </div>
            <div className="mt-0.5 sm:mt-1 font-display text-xs sm:text-sm font-bold text-primary">
              {isZh ? "新加坡 1 号员工 · 多重角色" : "Employee #1 · Multi-Role Dev/BD"}
            </div>
            <p className="mt-0.5 font-body text-[10px] sm:text-xs text-muted line-clamp-1 sm:line-clamp-none">
              {isZh ? "自建 Vector + Kafka + ES 日志链路替代昂贵托管" : "Self-hosted Vector + Kafka + ES log pipeline replacing cloud services"}
            </p>
          </div>
        </div>

        {/* 3. Unified High-Signal Bullets (Grounded, non-AI prose) */}
        <ul className="space-y-2.5 font-body text-xs sm:text-sm leading-relaxed text-secondary">
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "数字银行核心信贷状态机：" : "Banking Credit State Machines: "}
              </strong>
              {isZh
                ? "负责个人消费贷（Cashloan）与小微企业贷（SME Termloan）核心业务，基于数据库事务与状态机保障各阶段强一致，实现跨服务分布式最终一致性。"
                : "Engineered core credit services (Cashloan & SME Termloan) in Java, implementing state machines to ensure phase-wise strong consistency via DB transactions and end-to-end eventual consistency."}
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "自建 Vector + Kafka 日志链路：" : "Self-Hosted Vector + Kafka Log Pipeline: "}
              </strong>
              {isZh
                ? "作为新加坡 1 号工程师独立推进基建，部署 DaemonSet + Vector + Kafka + Elasticsearch 全链路日志收集与检索体系，替代高昂的云托管方案并大幅缩减资源开销。"
                : "As Singapore Employee #1, deployed self-hosted DaemonSet + Vector + Kafka + Elasticsearch log ingestion pipelines, replacing expensive managed cloud services and cutting recurring costs."}
            </div>
          </li>

          <li className="hidden sm:flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "创始团队跨领域协作：" : "Founding Multi-Discipline Execution: "}
              </strong>
              {isZh
                ? "身兼后端基础架构、研究项目跨国协调、海外商务拓展（BD）与影像制作等多重职责，支撑早期团队在新加坡的平稳落地与敏捷迭代。"
                : "Joined as Employee #1 in Singapore, driving backend infrastructure while coordinating research projects, business development, and media production during zero-to-one setup."}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
