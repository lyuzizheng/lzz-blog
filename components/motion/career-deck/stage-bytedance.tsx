"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";

interface StageBytedanceProps {
  mode?: "im" | "infra";
  onExploreNext?: () => void;
}

/**
 * Act 03 & 04 // 字节跳动 (2021 – 2023)
 * 支持双页独立展示：
 *  - mode="im": TikTok IM 核心通讯与互动系统（正在输入、已读回执、延时优化、亿级心跳门禁）
 *  - mode="infra": 海外 Location 平台独立维护、Spark ETL、Go 运行时调优、Multi-DC 多活排障与 API 网关
 */
export function StageBytedance({ mode = "im" }: StageBytedanceProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  if (mode === "im") {
    return (
      <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-4 py-2 sm:px-8 sm:py-6 overflow-hidden">
        <div className="relative z-10 space-y-2.5 sm:space-y-4">
          {/* 1. Header & Role */}
          <div className="border-b border-border-plate/60 pb-2 sm:pb-3 font-telemetry">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                TikTok · ByteDance
              </h2>
              <span className="text-[11px] sm:text-xs text-muted tabular-nums">
                2022 – 2023 · SINGAPORE
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-xs sm:text-sm text-secondary">
              <span className="font-semibold text-ink-dominant">Senior Backend Engineer</span>
              <span className="text-muted opacity-40">·</span>
              <span className="text-muted text-[11px] sm:text-xs">
                {isZh ? "社交即时通讯 (IM 核心链路) · 20+ Go 核心微服务" : "Social Messaging (IM Core) · 20+ Go Microservices"}
              </span>
            </div>
          </div>

          {/* 2. High-Concurrency Telemetry Bar */}
          <div className="grid grid-cols-3 divide-x divide-border-plate/60 rounded-[2px] border border-border-plate/60 bg-surface/50 py-2 sm:py-3 text-center">
            <div className="px-2">
              <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "广播写放大" : "FAN-OUT STORM"}
              </span>
              <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
                O(1)<span className="text-xs font-normal text-ink-dominant"> cap</span>
              </div>
              <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
                {isZh ? "Redis ZSET 心跳门禁" : "Redis ZSET gating"}
              </p>
            </div>

            <div className="px-2">
              <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "冷启动加载" : "COLD START"}
              </span>
              <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
                &lt;100<span className="text-xs font-normal text-ink-dominant">ms</span>
              </div>
              <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
                {isZh ? "会话树排序初始化" : "inbox ranking"}
              </p>
            </div>

            <div className="px-2">
              <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "核心微服务" : "MICROSERVICES"}
              </span>
              <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
                20<span className="text-xs font-normal text-ink-dominant">+</span>
              </div>
              <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
                {isZh ? "Go 核心服务 · 7×24" : "Go services · 7x24"}
              </p>
            </div>
          </div>

          {/* 3. Non-AI Grounded Bullets */}
          <ul className="space-y-2.5 font-body text-xs sm:text-sm leading-relaxed text-secondary">
            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "在线状态引擎（Presence Engine）：" : "Online Presence Engine: "}
                </strong>
                {isZh
                  ? "针对数百万级 QPS 广播风暴，基于 Redis ZSET 设计“动态维护最近在线好友集合 + 5 分钟心跳 TTL”门禁机制，状态变更仅向活跃在线好友定向推送；彻底消除 O(N×M) 写放大瓶颈，兼顾实时在线感知与聊天促活。"
                  : "Architected a dynamic active-friend cache with 5-minute heartbeat TTL to mitigate multi-million QPS broadcast storms; eliminated O(N*M) Redis bottlenecks by restricting fan-out strictly to active online friends, balancing status accuracy against real-time messaging penetration."}
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "正在输入与已读回执时序链路：" : "Typing Indicators & Read Receipts: "}
                </strong>
                {isZh
                  ? "解决“对方正在输入但上一条因同步延迟仍显示未读”的时序因果倒置；将已读回执提入独立低延迟信令通道，将已读时间戳统一锚定至消息 ID 时间戳，彻底消除多机房时钟漂移与网络抖动导致的客户端状态割裂。"
                  : "Resolved causality inversions (typing before read) by unifying read receipts and typing into a dedicated low-latency bypass pipeline; anchored read cursors to canonical message ID timestamps to eliminate multi-DC clock skew and out-of-order state divergences."}
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "多机房多主同步与首屏冷启动排障：" : "Multi-DC Sync & Cold-Start Troubleshooting: "}
                </strong>
                {isZh
                  ? "配合资深工程师推进 SG/US/EU 三地机房跨洋同步与多主写入冲突缓解策略；排查解决重装 App 导致会话丢失的线上 P0 故障（大群刷屏淹没单条 user chain），重构消息拉取与会话树排序逻辑，保障冷启动首屏各会话 <100ms 完整恢复。"
                  : "Co-implemented cross-region replication across SG, US, and EU datacenters under GDPR/US compliance, designing mitigations for multi-master group chat divergence; resolved critical cold-start bug where active group chats flooded single-chain fetches during app re-installation, ensuring reliable sub-100ms multi-chat inbox recovery."}
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // mode === "infra" (Location Platform, Spark, Multi-DC, AGW)
  return (
    <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-4 py-2 sm:px-8 sm:py-6 overflow-hidden">
      <div className="relative z-10 space-y-2.5 sm:space-y-4">
        {/* 1. Header & Role */}
        <div className="border-b border-border-plate/60 pb-2 sm:pb-3 font-telemetry">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              ByteDance Infra
            </h2>
            <span className="text-[11px] sm:text-xs text-muted tabular-nums">
              2021 – 2022 · SINGAPORE
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-xs sm:text-sm text-secondary">
            <span className="font-semibold text-ink-dominant">Backend Engineer</span>
            <span className="text-muted opacity-40">·</span>
            <span className="text-muted text-[11px] sm:text-xs">
              {isZh ? "海外地理位置中台与核心 API 网关 · 卓越绩效评级 Top E" : "Overseas Location Platform & Core API Gateway · Top Rating E"}
            </span>
          </div>
        </div>

        {/* 2. Operational Highlights Bar */}
        <div className="grid grid-cols-3 divide-x border border-border-plate/60 rounded-[2px] divide-border-plate/60 bg-surface/50 py-2 sm:py-3 text-center">
          <div className="px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "离线数据链路" : "SPARK ETL"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
              ~100<span className="text-xs font-normal text-ink-dominant"> jobs</span>
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
              {isZh ? "独立全周期维护" : "sole SWE in SG"}
            </p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "网关重大保活" : "PEAK GATEWAY"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
              Millions<span className="text-xs font-normal text-ink-dominant"> QPS</span>
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
              {isZh ? "核心重保零故障" : "0 incident SLA"}
            </p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "绩效与嘉奖" : "RECOGNITION"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
              Top E
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
              {isZh ? "Spot Bonus 嘉奖" : "Spot Bonus awarded"}
            </p>
          </div>
        </div>

        {/* 3. Non-AI Grounded Bullets */}
        <ul className="space-y-2.5 font-body text-xs sm:text-sm leading-relaxed text-secondary">
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "海外离线 Spark 任务错峰治理：" : "Spark ETL Pipeline Governance: "}
              </strong>
              {isZh
                ? "作为新加坡唯一常驻研发承接海外全链路；排查治理近百个历史 Spark 批量计算任务，纠正不合理的 CPU 与 Driver/Executor 内存配置；消除凌晨 12am/2am 任务扎堆导致的队列竞争与算力短缺，重构调度编排实现错峰执行，保障深夜任务准时产出。"
                : "Independently governed overseas IP geo-location stack (~100 offline Spark jobs); resolved resource contention and queue racing caused by 12am/2am batch overlap through pipeline rescheduling and CPU/memory tuning; overhauled alert aggregation to eliminate oncall alarm fatigue."}
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "高并发 Go 性能调优与网关工具：" : "High-Throughput Go Profiling & AGW Tooling: "}
              </strong>
              {isZh
                ? "针对海量吞吐的在线定位微服务，通过 pprof 深入分析堆内存分配与性能瓶颈；预设容量、重排 struct 字段内存对齐并精调 GC pacing，显著提升东盟（ASEAN）定位精度；同时为核心中台 API 网关（AGW）研发自动化自助诊断与容量预估工具，保障千万级 QPS 流量重保。"
                : "Optimized memory footprint and p99 latency for high-volume Go microservices using pprof (map/slice pre-allocation, struct alignment, GC tuning), significantly boosting ASEAN geo-accuracy; developed automated self-diagnosis and capacity estimation tools for core PaaS API Gateway (AGW) routing millions of QPS during peak campaigns."}
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "7×24 Oncall 稳定性保障与告警收敛：" : "7×24 Oncall Reliability & Alert De-noising: "}
              </strong>
              {isZh
                ? "面对 7×24 Oncall 高频告警，主动将故障分类归因并重构收敛规则，彻底消除报警疲劳；独挑大梁保障海外定位全天候高可用与极端流量稳定性，荣获团队 Spot Bonus 嘉奖与年度卓越绩效（Top E 评级）。"
                : "Tackled severe 7x24 oncall fatigue by categorizing alarm causes and restructuring alert thresholds; independently safeguarded overseas availability and peak-traffic stability, earning a Spot Bonus and top rating (E)."}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
