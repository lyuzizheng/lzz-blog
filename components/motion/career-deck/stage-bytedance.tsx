"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { ArrowUp, Download, Rocket } from "lucide-react";

interface StageBytedanceProps {
  onScrollToTop: () => void;
}

/**
 * BRAWUKA-93 · Act 3 ByteDance / TikTok IM (Editorial & Minimalist)
 * Generous side margins (max-w-2xl), quiet editorial typography, zero card walls.
 */
export function StageBytedance({ onScrollToTop }: StageBytedanceProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col justify-between px-6 py-10 sm:px-8 sm:py-14">
      {/* 1. Quiet Stage Eyebrow */}
      <div className="flex items-center justify-between border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <span className="font-semibold text-cobalt">03 // FOUNDATION · 2021–2023</span>
        <span className="text-[11px] opacity-75">BYTEDANCE · TIKTOK IM</span>
      </div>

      {/* 2. Core Narrative */}
      <div className="my-auto py-6">
        <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">
          Foundation with Huge Responsibility
        </h2>
        <p className="mt-1 font-telemetry text-xs tracking-wider text-muted">
          {isZh
            ? "大厂高并发基石 · 亿级消息通信与全球跨洋多活同步"
            : "High-Concurrency Foundation · Multi-DC Active Sync & Global Messaging"}
        </p>

        <p className="mt-4 font-serif text-sm italic leading-relaxed text-secondary sm:text-base sm:leading-relaxed">
          {isZh
            ? "“字节跳动中台产品研发中心，扛起全球超大规模海量流量冲击的工程纪律与基石责任。在跨洋分布式复杂拓扑下保障核心通信链路坚如磐石。”"
            : "“Central Product Platform at ByteDance: bearing the heavy discipline of global traffic, ensuring rock-solid resilience across cross-ocean distributed topologies.”"}
        </p>

        {/* 4 Quantified Battle Highlights (Quiet 2-column editorial grid) */}
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border-plate/60 pt-4 sm:grid-cols-2">
          {/* Item 1 */}
          <div className="space-y-1">
            <span className="font-telemetry text-[11px] font-semibold text-primary">
              {isZh ? "微服务高可用矩阵 (20+ SVC)" : "MICROSERVICES HA (20+)"}
            </span>
            <p className="font-body text-xs leading-relaxed text-secondary">
              {isZh
                ? "独立维护 20+ 个 Go 微服务，抗住全球海量瞬时并发峰值，保障 TikTok IM 核心链路 7×24 Oncall 稳定运行。"
                : "Maintained 20+ Go microservices, handling global instantaneous traffic spikes with 7×24 oncall resilience."}
            </p>
          </div>

          {/* Item 2 */}
          <div className="space-y-1">
            <span className="font-telemetry text-[11px] font-semibold text-primary">
              {isZh ? "多数据中心跨洋同步 (Multi-DC)" : "MULTI-DC ACTIVE SYNC"}
            </span>
            <p className="font-body text-xs leading-relaxed text-secondary">
              {isZh
                ? "主导建设跨洋多数据中心同步机制（Multi-datacenter Synchronization），实现跨洋多活无缝毫秒级同步。"
                : "Engineered cross-ocean multi-datacenter synchronization mechanism for seamless ms-level active-active sync."}
            </p>
          </div>

          {/* Item 3 */}
          <div className="space-y-1">
            <span className="font-telemetry text-[11px] font-semibold text-primary">
              {isZh ? "自动化排障工具 (Troubleshooting)" : "AUTOMATED DIAGNOSTICS"}
            </span>
            <p className="font-body text-xs leading-relaxed text-secondary">
              {isZh
                ? "自研消息丢包自动排障工具 (Message Loss Troubleshooting Tool)，将半天排查缩减至秒级自动定位。"
                : "Authored automated message loss diagnostic tool, cutting complex debugging from half a day to seconds."}
            </p>
          </div>

          {/* Item 4 */}
          <div className="space-y-1">
            <span className="font-telemetry text-[11px] font-semibold text-primary">
              {isZh ? "新人导师与团队荣誉 (Spot Bonus)" : "LEADERSHIP & SPOT BONUS"}
            </span>
            <p className="font-body text-xs leading-relaxed text-secondary">
              {isZh
                ? "Location 业务线单人建立 CI/CD 与告警体系，带领实习生完成 ASEAN IP 精度突破并荣获团队 Spot Bonus。"
                : "Built CI/CD and telemetry base for Location overseas, mentored interns to IP accuracy gain, awarded Spot Bonus."}
            </p>
          </div>
        </div>

        {/* Action Hub */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={onScrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xs border border-border-plate/80 bg-surface/80 px-3.5 py-1.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <ArrowUp className="h-3.5 w-3.5 text-cobalt" />
            <span>{isZh ? "回到第一幕 (Return to Origin)" : "RETURN TO ORIGIN"}</span>
          </button>

          <a
            href="/resume.pdf"
            download="Zizheng-Lyu-Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-xs border border-cobalt bg-cobalt px-3.5 py-1.5 font-telemetry text-xs font-medium text-text-badge shadow-plate transition-all hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{isZh ? "下载 A4 PDF 简历" : "DOWNLOAD RESUME"}</span>
          </a>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-xs border border-border-plate/80 bg-surface/80 px-3.5 py-1.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Rocket className="h-3.5 w-3.5 text-terracotta" />
            <span>{isZh ? "独立产品雷达" : "PRODUCTS RADAR"}</span>
          </Link>
        </div>
      </div>

      {/* 3. Subtle Footer Indicator */}
      <div className="flex items-center justify-between border-t border-border-plate/40 pt-2 font-telemetry text-[10px] text-muted">
        <span>VERIFIED DOSSIER · LZZ ATELIER</span>
        <span>2026.09</span>
      </div>
    </div>
  );
}
