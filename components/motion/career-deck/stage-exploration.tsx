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
    <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-6 py-8 sm:px-8">
      {/* Faint Typographic Watermark Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 right-0 z-0 select-none overflow-hidden opacity-[0.03] dark:opacity-[0.04]"
      >
        <span className="font-display text-[7rem] font-black uppercase tracking-tighter leading-none text-ink-dominant sm:text-[11rem] md:text-[13rem]">
          FINTECH
        </span>
      </div>

      <div className="relative z-10 space-y-4 sm:space-y-5">
        {/* 1. Header & Role (统一为一个整合 Section) */}
        <div className="border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-ink-dominant">
              {isZh ? "02 // 银行信贷与云原生 · 新加坡 · 2023–2024" : "02 // BANKING & CLOUD-NATIVE · SINGAPORE · 2023–2024"}
            </span>
            <span className="text-[11px] opacity-75">FULL-TIME · SENIOR SWE</span>
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              Senior Software Engineer
            </h2>
            <span className="text-muted opacity-40">·</span>
            <span className="font-telemetry text-xs text-muted">
              MariBank (Sea Group) &amp; Bondee
            </span>
          </div>
        </div>

        {/* 2. Asymmetric Dual-Focus Highlight Cards */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div className="rounded-[2px] border border-border-plate/60 bg-surface/40 p-3">
            <div className="flex items-center justify-between font-telemetry text-[10px] uppercase tracking-wider text-muted">
              <span>{isZh ? "数字银行核心信贷" : "MARIBANK (SEA GROUP)"}</span>
              <span className="tabular-nums">Apr 2024 – Jul 2024</span>
            </div>
            <div className="mt-1 font-display text-sm font-bold text-primary">
              {isZh ? "100% MAS 金融强监管合规" : "100% MAS Compliance & Audit"}
            </div>
            <p className="mt-0.5 font-body text-xs text-muted">
              {isZh ? "分布式事务一致性 · 个人消费贷与小微企业贷" : "Strict distributed consistency across high-value disbursals"}
            </p>
          </div>

          <div className="rounded-[2px] border border-border-plate/60 bg-surface/40 p-3">
            <div className="flex items-center justify-between font-telemetry text-[10px] uppercase tracking-wider text-muted">
              <span>{isZh ? "云原生基础设施" : "BONDEE"}</span>
              <span className="tabular-nums">Oct 2023 – Apr 2024</span>
            </div>
            <div className="mt-1 font-display text-sm font-bold text-primary">
              {isZh ? "新加坡 1 号工程师 · 0➔1 K8s" : "Employee #1 · Multi-Tenant K8s"}
            </div>
            <p className="mt-0.5 font-body text-xs text-muted">
              {isZh ? "自建 Vector + Kafka 日志链路大幅降低出向成本" : "Self-hosted log ingestion pipeline slashing cloud egress"}
            </p>
          </div>
        </div>

        {/* 3. Unified High-Signal Bullets (Grounded, non-AI prose) */}
        <ul className="space-y-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "数字银行核心信贷底座（MariBank）：" : "Digital Banking Credit Engine (MariBank): "}
              </strong>
              {isZh
                ? "负责个人消费信贷（Cashloan）与中小微企业经营贷（SME Termloan）核心业务，严格遵循新加坡金融管理局（MAS）金融监管要求与审计标准。"
                : "Engineered core digital banking credit engine services (Cashloan & SME Termloan) in Java, strictly complying with MAS regulatory standards."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "分布式一致性与防重放校验：" : "Distributed Consistency & Anti-Replay: "}
              </strong>
              {isZh
                ? "在复杂资金划转与授信链路中，严格实施分布式事务一致性（Distributed Consistency）、高并发防重放、状态机防乱序与幂等校验机制。"
                : "Enforced strict distributed transaction consistency, state-machine idempotency, and anti-replay patterns across high-value banking credit disbursals."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "新加坡 1 号工程师云原生基建（Bondee）：" : "Employee #1 & Cloud-Native Setup (Bondee): "}
              </strong>
              {isZh
                ? "作为新加坡团队 1 号软件工程师，从零搭建多租户 Kubernetes（K8s）生产集群底座，开发自动化测试调度与后端弹性扩缩容工具。"
                : "Joined as Employee #1 in Singapore; established foundational cloud-native infrastructure, multi-tenant Kubernetes clusters, and autoscaling tooling."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "自建 Vector + Kafka 可观测日志体系：" : "Vector + Kafka Observability Pipeline: "}
              </strong>
              {isZh
                ? "独立架构并部署自建 Vector + Kafka + Elasticsearch 全链路日志收集与检索体系，替代高昂的云厂商全托管方案，大幅削减海外跨区域网络出方向流量成本。"
                : "Architected and deployed self-hosted Vector + Kafka + Elasticsearch log ingestion pipelines, replacing legacy managed cloud logging and slashing recurring egress costs."}
            </div>
          </li>
        </ul>

        {/* 4. Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 font-telemetry text-[11px] text-muted">
          <span className="font-semibold text-primary">STACK:</span>
          {["Java", "Spring Cloud", "Go", "Kubernetes", "Vector", "Apache Kafka", "Elasticsearch", "Distributed Consistency"].map((tech) => (
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
