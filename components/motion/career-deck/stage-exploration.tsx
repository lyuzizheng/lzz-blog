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
        {/* 1. Header & Role (统一为一个整合 Section) */}
        <div className="border-b border-border-plate/60 pb-2 sm:pb-3 font-telemetry text-[11px] sm:text-xs uppercase tracking-widest text-muted">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-ink-dominant">
              {isZh ? "02 // 银行信贷与云原生 · 新加坡 · 2023–2024" : "02 // BANKING & CLOUD-NATIVE · SINGAPORE · 2023–2024"}
            </span>
            <span className="text-[10px] sm:text-[11px] opacity-75">FULL-TIME · SENIOR SWE</span>
          </div>
          <div className="mt-0.5 sm:mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              Senior Software Engineer
            </h2>
            <span className="text-muted opacity-40">·</span>
            <span className="font-telemetry text-[11px] sm:text-xs text-muted">
              MariBank (Sea Group) &amp; Bondee
            </span>
          </div>
        </div>

        {/* 2. Asymmetric Dual-Focus Highlight Cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-[2px] border border-border-plate/60 bg-surface/40 p-2 sm:p-3">
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

          <div className="rounded-[2px] border border-border-plate/60 bg-surface/40 p-2 sm:p-3">
            <div className="flex items-center justify-between font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              <span className="truncate">{isZh ? "云原生基础设施" : "BONDEE"}</span>
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
        <ul className="space-y-2 font-body text-[11px] leading-snug text-secondary sm:space-y-2.5 sm:text-sm sm:leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "信贷核心与状态机一致性（MariBank）：" : "Credit Core & State Machines (MariBank): "}
              </strong>
              {isZh
                ? "负责个人消费贷（Cashloan）与小微企业贷（SME Termloan）核心业务，梳理借贷数据流，基于数据库事务与状态机保障各阶段强一致，实现全流程最终一致性。"
                : "Engineered core credit services (Cashloan & SME Termloan) in Java, implementing state machines to ensure phase-wise strong consistency via DB transactions and end-to-end eventual consistency."}
            </div>
          </li>

          <li className="hidden sm:flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "新加坡 1 号员工与多领域协作（Bondee）：" : "SG Employee #1 & Cross-Discipline Execution (Bondee): "}
              </strong>
              {isZh
                ? "作为新加坡团队首位工程师，身兼后端研发、研究项目协调、商务拓展（BD）与摄影制作等多重职责。"
                : "Joined as Employee #1 in Singapore, wearing multiple hats across backend engineering, research project coordination, business development, and photography."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "自建 Vector + Kafka + ES 日志收集链路（Bondee）：" : "Self-Hosted Vector + Kafka + ES Logging (Bondee): "}
              </strong>
              {isZh
                ? "独立部署 DaemonSet + Vector + Kafka + Elasticsearch 全链路日志收集与检索体系，替代高昂的云厂商全托管方案，大幅削减云资源成本。"
                : "Deployed self-hosted DaemonSet + Vector + Kafka + Elasticsearch log ingestion pipelines, replacing expensive managed cloud logging and cutting recurring costs."}
            </div>
          </li>
        </ul>

        {/* 4. Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5 sm:pt-1 font-telemetry text-[10px] sm:text-[11px] text-muted">
          <span className="font-semibold text-primary">STACK:</span>
          {["Java", "Spring Cloud", "Go", "Docker", "Vector", "Apache Kafka", "Elasticsearch", "Distributed State Machines"].map((tech, idx) => (
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
