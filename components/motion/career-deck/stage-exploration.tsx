"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

interface StageExplorationProps {
  onExploreNext: () => void;
}

/**
 * BRAWUKA-93 · Act 2 Exploration (Editorial & Clean Layout)
 * Generous side margins (max-w-2xl), zero box walls.
 */
export function StageExploration({ onExploreNext }: StageExplorationProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col justify-between px-6 py-10 sm:px-8 sm:py-14">
      {/* 1. Quiet Stage Eyebrow */}
      <div className="flex items-center justify-between border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <span className="font-semibold text-cobalt">02 // EXPLORATION · 2023–2024</span>
        <span className="text-[11px] opacity-75">BONDEE + MARIBANK</span>
      </div>

      {/* 2. Core Content */}
      <div className="my-auto py-6">
        <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">
          Dynamic + Exploration
        </h2>
        <p className="mt-1 font-telemetry text-xs tracking-wider text-muted">
          {isZh
            ? "跳出舒适圈 · 云原生 DevOps 与数字银行金融后端架构"
            : "Breaking The Comfort Zone · Cloud-Native Infra & Digital Banking"}
        </p>

        <p className="mt-4 font-serif text-sm italic leading-relaxed text-secondary sm:text-base sm:leading-relaxed">
          {isZh
            ? "“主动跳出大厂舒适圈，以极客的敏锐度探索完全未知的技术栈与垂直行业。在云原生基础设施与严格合规数字金融中迅速建立起硬核统治力。”"
            : "“Actively stepping out of the comfort zone, mastering uncharted territories across K8s cloud-native infrastructure and compliance-critical digital banking.”"}
        </p>

        {/* Two Balanced Editorial Sections (Bondee & MariBank) */}
        <div className="mt-6 space-y-4 border-t border-border-plate/60 pt-4">
          {/* Item 1: Bondee */}
          <div className="space-y-1">
            <div className="flex items-center justify-between font-telemetry text-xs">
              <span className="font-bold text-primary">BONDEE // DEVOPS &amp; K8S</span>
              <span className="text-muted text-[11px]">2023.09 – 2024.04</span>
            </div>
            <p className="font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
              {isZh
                ? "深度掌舵 K8s 容器编排平台与高吞吐可观测性底座。主导重构并替换掉笨重昂贵的 ELK，基于 DaemonSet + Disk Mount + Vector + Kafka 构建全自研高性能日志收集与导出管线。"
                : "Led K8s container orchestration and high-throughput observability. Engineered a self-hosted pipeline via DaemonSet + Disk Mount + Vector + Kafka, fully replacing legacy ELK."}
            </p>
          </div>

          {/* Item 2: MariBank */}
          <div className="space-y-1 border-t border-border-plate/40 pt-3">
            <div className="flex items-center justify-between font-telemetry text-xs">
              <span className="font-bold text-primary">MARIBANK // BANKING CORE</span>
              <span className="text-muted text-[11px]">2024.04 – 2024.07</span>
            </div>
            <p className="font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
              {isZh
                ? "深入新加坡合规数字银行信贷核心业务（Cashloan 与 SME Termloan）。严格实践分布式事务一致性（Distributed Consistency）、高并发防重放幂等与长周期计息风控工程。"
                : "Core backend engineer for Cashloan & SME Termloan credit engines. Practiced rigorous distributed consistency, anti-replay idempotency, and financial risk engineering."}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Next Stage Indicator */}
      <div className="flex flex-col items-center">
        <button
          onClick={onExploreNext}
          type="button"
          className="group flex flex-col items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-primary"
          aria-label="Explore Act 3: ByteDance & TikTok IM"
        >
          <span>{isZh ? "下一幕 · BYTEDANCE & TIKTOK IM" : "PROCEED TO BYTEDANCE"}</span>
          <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
