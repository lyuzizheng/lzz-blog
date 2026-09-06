"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Shield, Network, Zap, Award, ArrowUp, Rocket } from "lucide-react";

interface StageBytedanceProps {
  onScrollToTop: () => void;
}

export function StageBytedance({ onScrollToTop }: StageBytedanceProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="relative flex h-full min-h-[calc(100dvh-3.5rem)] w-full flex-col justify-between px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
      {/* Top Telemetry Header */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-b border-border-plate pb-3 font-telemetry text-[11px] uppercase tracking-wider text-muted">
        <div className="flex items-center gap-3">
          <span className="font-bold text-cobalt">ACT 03 // BYTEDANCE &amp; TIKTOK IM</span>
          <span className="text-border-plate">|</span>
          <span>2021–2023 // CENTRAL PRODUCT PLATFORM</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">20+ GO SERVICES · 7×24 ONCALL</span>
          <span className="text-border-plate">|</span>
          <span className="font-semibold text-primary">GLOBAL SCALE FOUNDATION</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto my-auto w-full max-w-5xl py-4 lg:py-6">
        {/* Stage Title & Philosophy */}
        <div className="max-w-3xl">
          <div className="mb-2 flex items-center gap-2 font-telemetry text-xs uppercase tracking-widest text-cobalt">
            <Shield className="h-3.5 w-3.5" />
            <span>GLOBAL TRAFFIC FOUNDATION</span>
          </div>

          <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Foundation with Huge Responsibility
          </h2>
          <p className="mt-1 font-telemetry text-xs tracking-wider text-muted sm:text-sm">
            {isZh ? "大厂高并发基石 · 亿级消息通信与全球跨洋多活同步" : "High-Concurrency Foundation · Multi-DC Active Sync & Global Messaging"}
          </p>

          <p className="mt-4 rounded-xs border-l-2 border-cobalt bg-surface/60 p-3 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
            {isZh
              ? "字节跳动中台产品研发中心（Central Product Platform），扛起超大规模全球流量冲击的基石责任与工程纪律。在极端并发与跨数据中心分布式复杂场景下保障核心链路坚如磐石。"
              : "Central Product Platform at ByteDance: bearing the heavy engineering responsibility and discipline of global-scale traffic, ensuring rock-solid resilience across distributed multi-datacenter meshes."}
          </p>
        </div>

        {/* 4 Key Pillars Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          {/* Pillar 1: Microservice HA Matrix */}
          <div className="rounded-xs border border-border-plate bg-surface/90 p-4 shadow-plate backdrop-blur-xs">
            <div className="flex items-center justify-between font-telemetry text-[10px] uppercase tracking-wider text-muted">
              <span>HIGH AVAILABILITY</span>
              <span className="text-cobalt font-semibold">20+ SVC</span>
            </div>
            <h4 className="mt-2 font-display text-base font-bold text-primary">
              {isZh ? "微服务高可用矩阵" : "Microservices HA"}
            </h4>
            <p className="mt-1 font-body text-[12px] leading-snug text-muted">
              {isZh
                ? "独立维护 20+ 个 Go 微服务，抗住全球海量瞬时并发峰值，保障 TikTok IM 核心链路 7×24 Oncall 稳定运行。"
                : "Independently maintained 20+ Go microservices, handling global instantaneous traffic spikes with 7×24 oncall."}
            </p>
          </div>

          {/* Pillar 2: Multi-DC Sync */}
          <div className="rounded-xs border border-border-plate bg-surface/90 p-4 shadow-plate backdrop-blur-xs">
            <div className="flex items-center justify-between font-telemetry text-[10px] uppercase tracking-wider text-muted">
              <span>MULTI-DC SYNC</span>
              <Network className="h-3 w-3 text-cobalt" />
            </div>
            <h4 className="mt-2 font-display text-base font-bold text-primary">
              {isZh ? "多数据中心跨洋同步" : "Multi-Datacenter Sync"}
            </h4>
            <p className="mt-1 font-body text-[12px] leading-snug text-muted">
              {isZh
                ? "主导建设 Multi-datacenter Synchronization 机制，实现跨洋多活数据中心间的无缝毫秒级同步体验。"
                : "Led multi-datacenter synchronization mechanism, achieving seamless cross-ocean ms-level active-active sync."}
            </p>
          </div>

          {/* Pillar 3: Troubleshooting Tool */}
          <div className="rounded-xs border border-border-plate bg-surface/90 p-4 shadow-plate backdrop-blur-xs">
            <div className="flex items-center justify-between font-telemetry text-[10px] uppercase tracking-wider text-muted">
              <span>DIAGNOSTICS</span>
              <Zap className="h-3 w-3 text-terracotta" />
            </div>
            <h4 className="mt-2 font-display text-base font-bold text-primary">
              {isZh ? "自动化排障工具" : "Automated Tooling"}
            </h4>
            <p className="mt-1 font-body text-[12px] leading-snug text-muted">
              {isZh
                ? "自研消息丢包自动排障工具，将过去需要半天排查的复杂丢包定位缩减至秒级全自动诊断。"
                : "Engineered automated message loss diagnostic tool, cutting complex manual investigation from half a day to seconds."}
            </p>
          </div>

          {/* Pillar 4: Mentorship & Spot Bonus */}
          <div className="rounded-xs border border-border-plate bg-surface/90 p-4 shadow-plate backdrop-blur-xs">
            <div className="flex items-center justify-between font-telemetry text-[10px] uppercase tracking-wider text-muted">
              <span>LEADERSHIP &amp; IMPACT</span>
              <Award className="h-3 w-3 text-cobalt" />
            </div>
            <h4 className="mt-2 font-display text-base font-bold text-primary">
              {isZh ? "新人导师与技术突破" : "Mentorship & IP Geo"}
            </h4>
            <p className="mt-1 font-body text-[12px] leading-snug text-muted">
              {isZh
                ? "单人建立新加坡团队标准基底（CI/CD、任务告警），带领实习生进行 ASEAN IP 精度突破并荣获团队 Spot Bonus。"
                : "Established Singapore team foundation (CI/CD, alerts), mentored interns to ASEAN IP precision breakthroughs; won Spot Bonus."}
            </p>
          </div>
        </div>

        {/* Global Closing Navigation Row */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border-plate pt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onScrollToTop}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xs border border-border-plate bg-surface px-3 py-1.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>{isZh ? "回到第一幕 (Return to Origin)" : "RETURN TO TOP"}</span>
            </button>

            <a
              href="/resume.pdf"
              download="Zizheng-Lyu-Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-xs border border-cobalt bg-cobalt/10 px-3 py-1.5 font-telemetry text-xs font-medium text-cobalt transition-colors hover:bg-cobalt hover:text-text-badge"
            >
              <span>{isZh ? "下载 A4 PDF 简历" : "DOWNLOAD A4 PDF"}</span>
            </a>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 font-telemetry text-xs uppercase tracking-wider text-muted transition-colors hover:text-primary"
          >
            <span>{isZh ? "查看独立产品雷达 (Side Projects)" : "EXPLORE PRODUCTS RADAR"}</span>
            <Rocket className="h-3.5 w-3.5 text-terracotta" />
          </Link>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-dashed border-border-plate/60 pt-2 font-telemetry text-[10px] text-muted">
        <span>VERIFIED RECORDS // BYTEDANCE &amp; TIKTOK GLOBAL</span>
        <span>LZZ ATELIER · 2026</span>
      </div>
    </div>
  );
}
