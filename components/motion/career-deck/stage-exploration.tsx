"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { Compass, Server, Landmark, ArrowRight, Layers } from "lucide-react";

interface StageExplorationProps {
  onExploreNext: () => void;
}

export function StageExploration({ onExploreNext }: StageExplorationProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="relative flex h-full min-h-[calc(100dvh-3.5rem)] w-full flex-col justify-between px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
      {/* Top Telemetry Header */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-b border-border-plate pb-3 font-telemetry text-[11px] uppercase tracking-wider text-muted">
        <div className="flex items-center gap-3">
          <span className="font-bold text-cobalt">ACT 02 // DYNAMIC &amp; EXPLORATION</span>
          <span className="text-border-plate">|</span>
          <span>2023–2024 // BREAKING COMFORT ZONE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">K8S · VECTOR · BANKING LEDGER</span>
          <span className="text-border-plate">|</span>
          <span className="font-semibold text-primary">BONDEE + MARIBANK</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto my-auto w-full max-w-5xl py-4 lg:py-6">
        {/* Stage Title & Philosophy */}
        <div className="max-w-3xl">
          <div className="mb-2 flex items-center gap-2 font-telemetry text-xs uppercase tracking-widest text-cobalt">
            <Compass className="h-3.5 w-3.5" />
            <span>EXPLORATION &amp; ADAPTIVE ENGINEERING</span>
          </div>

          <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Dynamic + Exploration
          </h2>
          <p className="mt-1 font-telemetry text-xs tracking-wider text-muted sm:text-sm">
            {isZh ? "跳出舒适圈 · 云原生 DevOps 与数字银行金融后端架构" : "Breaking The Comfort Zone · Cloud-Native Infra & Digital Banking"}
          </p>

          <p className="mt-4 rounded-xs border-l-2 border-cobalt bg-surface/60 p-3 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
            {isZh
              ? "2024 年主动跳出字节跳动的大厂舒适圈，以极客的敏锐度探索完全未知的技术栈与垂直行业。在云原生运维架构与严格合规数字金融中迅速建立起硬核统治力。"
              : "Actively stepping out of the big-tech comfort zone in 2024, venturing into unchartered technical territories across cloud-native infrastructure, K8s orchestration, and compliance-critical digital banking."}
          </p>
        </div>

        {/* Dual Battle Showcase: Bondee (Left) + MariBank (Right) */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {/* Card A: Bondee (Cloud Native & High-Throughput Observability) */}
          <div className="rounded-xs border border-border-plate bg-surface/90 p-5 shadow-plate backdrop-blur-xs">
            <div className="flex items-center justify-between border-b border-border-plate pb-2 font-telemetry text-[11px] uppercase tracking-wider text-muted">
              <div className="flex items-center gap-1.5 text-cobalt font-semibold">
                <Server className="h-3.5 w-3.5" />
                <span>BONDEE // DEVOPS &amp; K8S</span>
              </div>
              <span>SG EMPLOYEE #01</span>
            </div>

            <h3 className="mt-3 font-display text-lg font-bold text-primary sm:text-xl">
              {isZh ? "云原生基础设施与全自研日志管线" : "Cloud-Native Infra & Self-Hosted Logging"}
            </h3>

            <p className="mt-2 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
              {isZh
                ? "深度掌握 DevOps、K8s 容器编排平台与高吞吐可观测性基础设施。主导重构并彻底替换掉笨重昂贵的 ELK Stack，基于 DaemonSet + Disk Mount + Vector + Kafka 构建全自研高性能日志收集与导出管线。"
                : "Mastered DevOps, K8s orchestration, and high-throughput observability. Led the architecture rewrite replacing expensive managed ELK, building a self-hosted pipeline via DaemonSet + Disk Mount + Vector + Kafka."}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-xs border border-border-plate bg-chamber/50 px-2 py-0.5 font-telemetry text-[10px] text-primary">
                Vector + Kafka + ES
              </span>
              <span className="rounded-xs border border-border-plate bg-chamber/50 px-2 py-0.5 font-telemetry text-[10px] text-primary">
                K8s DaemonSet
              </span>
              <span className="rounded-xs border border-cobalt/30 bg-cobalt/10 px-2 py-0.5 font-telemetry text-[10px] font-semibold text-cobalt">
                {isZh ? "大幅缩减云资源账单" : "Major Cloud Cost Cut"}
              </span>
            </div>
          </div>

          {/* Card B: MariBank (Digital Banking Core & Loan Credit) */}
          <div className="rounded-xs border border-border-plate bg-surface/90 p-5 shadow-plate backdrop-blur-xs">
            <div className="flex items-center justify-between border-b border-border-plate pb-2 font-telemetry text-[11px] uppercase tracking-wider text-muted">
              <div className="flex items-center gap-1.5 text-terracotta font-semibold">
                <Landmark className="h-3.5 w-3.5" />
                <span>MARIBANK // BANKING CORE</span>
              </div>
              <span>LOAN DIVISION</span>
            </div>

            <h3 className="mt-3 font-display text-lg font-bold text-primary sm:text-xl">
              {isZh ? "合规数字银行金融后端架构" : "Compliant Digital Banking Architecture"}
            </h3>

            <p className="mt-2 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
              {isZh
                ? "全面切入新加坡合规数字银行严格的金融后端架构体系。在信贷业务线（Cashloan 与 SME Termloan）深入实践了分布式交易一致性、防并发重放、长周期计息与高标准风控工程。"
                : "Full immersion into Singapore compliant digital banking backend architecture. In the Loan Division (Cashloan & SME Termloan), engineered distributed consistency, anti-replay idempotency, and risk SDLC."}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-xs border border-border-plate bg-chamber/50 px-2 py-0.5 font-telemetry text-[10px] text-primary">
                Distributed Consistency
              </span>
              <span className="rounded-xs border border-border-plate bg-chamber/50 px-2 py-0.5 font-telemetry text-[10px] text-primary">
                Anti-Replay Idempotency
              </span>
              <span className="rounded-xs border border-terracotta/30 bg-terracotta/10 px-2 py-0.5 font-telemetry text-[10px] font-semibold text-terracotta">
                {isZh ? "信贷长周期计息风控" : "Loan & Credit Risk SDLC"}
              </span>
            </div>
          </div>
        </div>

        {/* Technical Highlights Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border-plate pt-3 font-telemetry text-[11px] text-muted">
          <div className="flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-cobalt" />
            <span>
              {isZh
                ? "技术跨界沉淀：全自研容器化日志系统 · 分布式金融事务合规保障"
                : "Multi-Disciplinary Expertise: Containerized Logging · Distributed Banking Transactions"}
            </span>
          </div>
          <span className="text-primary font-semibold">VERIFIED ARCHITECTURE // SG TECH</span>
        </div>
      </div>

      {/* Downward Exploration Indicator */}
      <div className="mx-auto flex flex-col items-center pb-2">
        <button
          onClick={onExploreNext}
          type="button"
          className="group flex items-center gap-2 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-primary"
          aria-label="Proceed to Act 3: ByteDance / TikTok IM"
        >
          <span>{isZh ? "下一幕：BYTEDANCE & TIKTOK IM" : "PROCEED TO ACT 03 · BYTEDANCE & TIKTOK"}</span>
          <ArrowRight className="h-3.5 w-3.5 text-cobalt transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
