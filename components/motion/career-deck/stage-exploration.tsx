"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

interface StageExplorationProps {
  onExploreNext: () => void;
}

/**
 * Act 02 // 银行信贷与初创 (2023 – 2024)
 * 结构化履历条目：MariBank 信贷核心分布式一致性、Bondee 云原生可观测管道与独立项目。
 */
export function StageExploration({ onExploreNext }: StageExplorationProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-between px-6 py-6 sm:px-8 sm:py-8">
      {/* 1. Stage Eyebrow & Role Meta */}
      <div className="border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-ink-dominant">
            {isZh ? "02 // 银行信贷与初创 · 新加坡 · 2023–2024" : "02 // BANKING & CLOUD-NATIVE · SINGAPORE · 2023–2024"}
          </span>
          <span className="text-[11px] opacity-75">FULL-TIME · SENIOR SWE</span>
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            Senior Software Engineer
          </h2>
          <span className="font-telemetry text-xs text-muted">MariBank (Sea Group) & Bondee</span>
        </div>
      </div>

      {/* 2. Core Bullet Points */}
      <div className="my-auto py-2 space-y-4">
        {/* Section 1: MariBank */}
        <div className="space-y-2">
          <div className="flex items-center justify-between border-b border-border-plate/40 pb-1 font-telemetry text-xs text-primary">
            <span className="font-semibold">MARIBANK (SEA GROUP) · CORE CREDIT ENGINE</span>
            <span className="text-muted text-[11px]">Apr 2024 – Jul 2024</span>
          </div>
          <ul className="space-y-2 font-body text-xs leading-relaxed text-secondary sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "数字银行核心信贷底座：" : "Digital Banking Credit Core: "}
                </strong>
                {isZh
                  ? "负责个人消费信贷（Cashloan）与中小微企业经营贷（SME Termloan）核心业务，严格对齐新加坡金管局（MAS）金融监管要求与审计标准。"
                  : "Engineered core digital banking credit engine services (Cashloan & SME Termloan) in Java, strictly complying with MAS regulatory standards."}
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "分布式事务与幂等风控：" : "Distributed Consistency & Anti-Replay: "}
                </strong>
                {isZh
                  ? "在复杂资金划转与授信链路中，严格实施分布式事务一致性（Distributed Consistency）、高并发防重放、状态机防乱序与幂等校验机制。"
                  : "Enforced strict distributed transaction consistency, state-machine idempotency, and anti-replay patterns across high-value banking credit disbursals."}
              </div>
            </li>
          </ul>
        </div>

        {/* Section 2: Bondee */}
        <div className="space-y-2">
          <div className="flex items-center justify-between border-b border-border-plate/40 pb-1 font-telemetry text-xs text-primary">
            <span className="font-semibold">BONDEE · FOUNDATIONAL INFRASTRUCTURE</span>
            <span className="text-muted text-[11px]">Oct 2023 – Apr 2024</span>
          </div>
          <ul className="space-y-2 font-body text-xs leading-relaxed text-secondary sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "新加坡 1 号工程师基建搭建：" : "Employee #1 & Cloud-Native Setup: "}
                </strong>
                {isZh
                  ? "作为新加坡团队 1 号软件工程师，从零建立多租户 Kubernetes（K8s）集群基座，开发自动化测试 Pod 调度与后端自动扩缩容（Autoscaling）工具。"
                  : "Joined as Employee #1 in Singapore; established foundational cloud-native infrastructure, multi-tenant Kubernetes clusters, and autoscaling tooling."}
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "自建可观测日志管道：" : "Vector + Kafka Observability Pipeline: "}
                </strong>
                {isZh
                  ? "独立架构并部署自建 Vector + Kafka + Elasticsearch 全链路日志收集与可观测体系，替代高昂的云厂商全托管方案，大幅削减海外跨区域网络出方向流量成本。"
                  : "Architected and deployed self-hosted Vector + Kafka + Elasticsearch log ingestion pipelines, replacing legacy managed cloud logging and slashing recurring egress costs."}
              </div>
            </li>
          </ul>
        </div>

        {/* Tech Stack Pills */}
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

      {/* 3. Downward Indicator */}
      <div className="border-t border-border-plate/40 pt-3 flex justify-end">
        <button
          onClick={onExploreNext}
          type="button"
          className="group inline-flex items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink-dominant cursor-pointer underline-offset-4 hover:underline"
        >
          <span>{isZh ? "下翻 · 字节跳动" : "NEXT: BYTEDANCE / TIKTOK"}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
