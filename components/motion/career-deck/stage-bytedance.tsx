"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

interface StageBytedanceProps {
  onExploreNext: () => void;
}

/**
 * Act 03 // 字节跳动 (2021 – 2023)
 * 结构化履历条目：1 年内快速晋升 Senior、TikTok IM 亿级心跳门禁、海外 Location 借调独当一面与 Multi-DC 架构。
 */
export function StageBytedance({ onExploreNext }: StageBytedanceProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-between px-6 py-6 sm:px-8 sm:py-8">
      {/* 1. Stage Eyebrow & Role Meta */}
      <div className="border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-ink-dominant">
            {isZh ? "03 // 字节跳动 · 新加坡 · 2021–2023" : "03 // BYTEDANCE / TIKTOK · SINGAPORE · 2021–2023"}
          </span>
          <span className="text-[11px] opacity-75">1 年快速晋升 · SPOT BONUS · E 评级</span>
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            Senior Backend Engineer
          </h2>
          <span className="font-telemetry text-xs text-muted">
            {isZh ? "(校招 1 年内晋升 Senior)" : "(Promoted within 1 Year)"}
          </span>
          <span className="text-muted opacity-40">·</span>
          <span className="font-telemetry text-xs text-muted">TikTok Social Messaging & Location</span>
        </div>
      </div>

      {/* 2. Core Bullet Points */}
      <div className="my-auto py-2 space-y-4">
        {/* Bullet List */}
        <ul className="space-y-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "TikTok IM 亿级在线状态与心跳门禁：" : "TikTok IM Presence Engine (Redis ZSET): "}
              </strong>
              {isZh
                ? "面对千万级用户上下线触发的扩散广播风暴，主导设计“推拉结合 + 活跃心跳门禁”机制，基于 Redis ZSET 判定仅向当前处于 App 活跃态的好友推送，彻底消除 O(N×M) 写放大；重构冷启动会话排序，将初始化耗时压减至 100ms 以内。"
                : "Mitigated multi-million QPS fan-out broadcast storms by architecting a hybrid push-pull protocol with active heartbeat gating via Redis ZSET, completely eliminating O(N*M) write amplification; overhauled cold-start conversation ranking to sub-100ms latency."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "海外 Location 平台独挑大梁与减负治理：" : "Overseas Location Platform & Operational Resilience: "}
              </strong>
              {isZh
                ? "作为新加坡唯一常驻工程师独立接管海外 Location 链路，维护 20+ 个 Go 微服务与近百个离线 Spark 任务；全天候 7×24 oncall 护航，系统化治理误报收敛日志风暴，深度调优 Go 运行时内存与 GC 压力，荣获公司 Spot Bonus 与卓越绩效（E）。"
                : "Sole Singapore backend engineer governing ~100 offline Spark ETL jobs and 20+ Go microservices. Guaranteed 7x24 oncall stability, eliminated alarm fatigue through intelligent log triage, and tuned Go runtime memory/GC profiles, earning a Spot Bonus and top rating (E)."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "多中心多活同步与自动化排障：" : "Multi-Datacenter Sync & Automated Troubleshooting: "}
              </strong>
              {isZh
                ? "主导跨洋多数据中心（Multi-datacenter / Multi-DC）消息多活同步机制，研发消息丢包自动排障工具（Troubleshooting），实现网络波动下链路异常秒级定位；曾在春晚核心保障中支持 API Gateway 百万 QPS 洪峰。"
                : "Engineered cross-ocean Multi-datacenter (Multi-DC) message sync and authored automated message loss troubleshooting tooling for instant triage; supported company core API Gateway handling multi-million QPS during Chinese New Year campaigns."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "团队梯队搭建与工程文化：" : "Mentorship & Engineering Standards: "}
              </strong>
              {isZh
                ? "担任团队新人与实习生 Mentor，制定高质量代码评审与灰度发布规约，多次主导跨团队架构评审。"
                : "Mentored new joiners and interns on Go concurrency patterns, distributed storage systems, and zero-downtime migration practices."}
            </div>
          </li>
        </ul>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 font-telemetry text-[11px] text-muted">
          <span className="font-semibold text-primary">STACK:</span>
          {["Go", "Redis (ZSET)", "Apache Spark", "RPC Microservices", "Apache Kafka", "Multi-DC", "High Concurrency (1M+ QPS)"].map((tech) => (
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
          <span>{isZh ? "下翻 · 教育与起点" : "NEXT: EDUCATION & EARLY ROOTS"}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
