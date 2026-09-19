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
          {/* 1. Header & Role Meta */}
          <div className="border-b border-border-plate/60 pb-2 sm:pb-3 font-telemetry text-[11px] sm:text-xs uppercase tracking-widest text-muted">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-ink-dominant">
                {isZh ? "03 // 字节跳动 · 即时通讯 · 2022–2023" : "03 // TIKTOK IM & SOCIAL MESSAGING · 2022–2023"}
              </span>
              <span className="text-[10px] sm:text-[11px] opacity-75">1 年快速晋升 · 20+ GO 微服务</span>
            </div>
            <div className="mt-0.5 sm:mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
              <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                Senior Backend Engineer
              </h2>
              <span className="text-muted opacity-40">·</span>
              <span className="font-telemetry text-[11px] sm:text-xs text-muted">
                {isZh ? "TikTok Social Messaging (IM 核心链路)" : "TikTok Social Messaging Core"}
              </span>
            </div>
          </div>

          {/* 2. High-Concurrency Telemetry Bar */}
          <div className="grid grid-cols-3 divide-x divide-border-plate/60 rounded-[2px] border border-border-plate/60 bg-surface/40 py-1.5 sm:py-2.5 text-center">
            <div className="px-1.5 sm:px-2">
              <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "广播写放大" : "FAN-OUT STORM"}
              </span>
              <div className="font-display text-base font-bold text-primary tabular-nums sm:text-xl">
                O(1)<span className="text-xs font-normal text-ink-dominant"> cap</span>
              </div>
              <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
                {isZh ? "Redis ZSET 心跳门禁" : "Redis ZSET gating"}
              </p>
            </div>

            <div className="px-1.5 sm:px-2">
              <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "冷启动加载" : "COLD START"}
              </span>
              <div className="font-display text-base font-bold text-primary tabular-nums sm:text-xl">
                &lt;100<span className="text-xs font-normal text-ink-dominant">ms</span>
              </div>
              <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
                {isZh ? "会话树排序初始化" : "inbox ranking"}
              </p>
            </div>

            <div className="px-1.5 sm:px-2">
              <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "核心微服务" : "MICROSERVICES"}
              </span>
              <div className="font-display text-base font-bold text-primary tabular-nums sm:text-xl">
                20<span className="text-xs font-normal text-ink-dominant">+</span>
              </div>
              <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
                {isZh ? "Go 核心服务 · 7×24" : "Go services · 7x24"}
              </p>
            </div>
          </div>

          {/* 3. Non-AI Grounded Bullets */}
          <ul className="space-y-2 font-body text-[11px] leading-snug text-secondary sm:space-y-2.5 sm:text-sm sm:leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "在线状态引擎（Online Status Engine · 独立设计与实现）：" : "Online Status Engine: "}
                </strong>
                {isZh
                  ? "面对数百万级 QPS，放弃全量扫表与不可持续的高频 Redis 全查；设计“动态维护最近在线好友集合 + 5 分钟心跳 TTL”机制，状态变更仅向当前有心跳的活跃好友定向推送，冷启动增量拉取；彻底消除 O(N×M) 写放大瓶颈，同时权衡了状态准确度与聊天促活渗透率。"
                  : "Architected a dynamic active-friend cache with 5-minute heartbeat TTL to mitigate multi-million QPS broadcast storms; eliminated O(N*M) Redis bottlenecks by restricting fan-out strictly to active online friends, balancing status accuracy against real-time messaging penetration."}
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "正在输入与已读回执联合优化（Low-Latency Signaling · 独立后端负责）：" : "Typing Indicators & Read Receipts: "}
                </strong>
                {isZh
                  ? "解决“对方正在输入但上一条因同步延迟仍显示未读”的时序因果倒置；将已读回执提入独立低延迟信令通道；针对多机房同一消息 cursor 与时间戳不一致问题，主动将已读时间戳锚定至对应消息 ID 的时间戳，彻底消除跨机房乱序与时钟漂移引起的客户端割裂。"
                  : "Resolved causality inversions (typing before read) by unifying read receipts and typing into a dedicated low-latency bypass pipeline; anchored read cursors to canonical message ID timestamps to eliminate multi-DC clock skew and out-of-order state divergences."}
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "跨机房多主同步与冷启动 Bug 修复（Co-impl with Senior / Impl）：" : "Multi-DC Sync & Cold-Start Inbox Fix: "}
                </strong>
                {isZh
                  ? "配合资深工程师推进 SG/US/EU 三地机房多主写入与跨洋同步合规落地，设计群聊多主冲突缓解策略；排查修复重装 App 导致会话丢失的线上 P0 Bug（大群刷屏淹没单条 user chain），重构会话拉取与排序，保障冷启动首屏各会话 <100ms 完整恢复。"
                  : "Co-implemented cross-region replication across SG, US, and EU datacenters under GDPR/US compliance, designing mitigations for multi-master group chat divergence; resolved critical cold-start bug where active group chats flooded single-chain fetches during app re-installation, ensuring reliable sub-100ms multi-chat inbox recovery."}
              </div>
            </li>
          </ul>

          {/* 4. Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5 sm:pt-1 font-telemetry text-[10px] sm:text-[11px] text-muted">
            <span className="font-semibold text-primary">STACK:</span>
            {["Go", "Redis (ZSET)", "RPC Microservices", "Kafka", "Protobuf", "Latency Tuning", "High Concurrency"].map((tech, idx) => (
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

  // mode === "infra" (Location Platform, Spark, Multi-DC, AGW)
  return (
    <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-4 py-2 sm:px-8 sm:py-6 overflow-hidden">
      <div className="relative z-10 space-y-2.5 sm:space-y-4">
        {/* 1. Stage Eyebrow & Role Meta */}
        <div className="border-b border-border-plate/60 pb-2 sm:pb-3 font-telemetry text-[11px] sm:text-xs uppercase tracking-widest text-muted">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-ink-dominant">
              {isZh ? "04 // 字节跳动 · 定位与基建 · 2021–2022" : "04 // BYTEDANCE LOCATION & INFRA · 2021–2022"}
            </span>
            <span className="text-[10px] sm:text-[11px] opacity-75">SPOT BONUS · TOP RATING E</span>
          </div>
          <div className="mt-0.5 sm:mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              Backend Engineer
            </h2>
            <span className="text-muted opacity-40">·</span>
            <span className="font-telemetry text-[11px] sm:text-xs text-muted">
              {isZh ? "Overseas Location Platform & Core PaaS" : "Overseas Location Platform & API Gateway"}
            </span>
          </div>
        </div>

        {/* 2. Operational Highlights Bar */}
        <div className="grid grid-cols-3 divide-x border border-border-plate/60 rounded-[2px] divide-border-plate/60 bg-surface/40 py-1.5 sm:py-2.5 text-center">
          <div className="px-1.5 sm:px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "离线数据链路" : "SPARK ETL"}
            </span>
            <div className="font-display text-base font-bold text-primary tabular-nums sm:text-xl">
              ~100<span className="text-xs font-normal text-ink-dominant"> jobs</span>
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
              {isZh ? "独立全周期维护" : "sole SWE in SG"}
            </p>
          </div>

          <div className="px-1.5 sm:px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "网关重大保活" : "PEAK GATEWAY"}
            </span>
            <div className="font-display text-base font-bold text-primary tabular-nums sm:text-xl">
              Millions<span className="text-xs font-normal text-ink-dominant"> QPS</span>
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
              {isZh ? "核心重保零故障" : "0 incident SLA"}
            </p>
          </div>

          <div className="px-1.5 sm:px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "绩效与嘉奖" : "RECOGNITION"}
            </span>
            <div className="font-display text-base font-bold text-primary tabular-nums sm:text-xl">
              Top E
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
              {isZh ? "Spot Bonus 嘉奖" : "Spot Bonus awarded"}
            </p>
          </div>
        </div>

        {/* 3. Non-AI Grounded Bullets */}
        <ul className="space-y-2 font-body text-[11px] leading-snug text-secondary sm:space-y-2.5 sm:text-sm sm:leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "海外 Location 平台独立维护：" : "Overseas Location Platform (Sole Singapore SWE): "}
              </strong>
              {isZh
                ? "作为新加坡常驻工程师独立接管海外 Location 链路全生命周期，负责维护约 100 个离线 Spark ETL 数据清洗任务与线上 Go 定位微服务，保障服务稳定可靠。"
                : "Sole Singapore engineer governing ~100 offline Spark ETL data pipelines and online Go geo-services. Maintained 7x24 high-reliability oncall."}
            </div>
          </li>

          <li className="hidden sm:flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "系统减负与 Go 运行时优化：" : "System Governance & Go Runtime Optimization: "}
              </strong>
              {isZh
                ? "系统化清理闲置海外计算资源，重构报警收敛机制消灭无效告警干扰；调优 Go runtime 内存分配与 GC 压力，提升东盟地区地理定位精度，荣获公司 Spot Bonus 与卓越绩效（E 评级）。"
                : "Purged abandoned overseas cloud resources, tuned Go memory/GC profiles, restructured alert aggregation to eliminate alert fatigue, and improved ASEAN geo-lookup precision; awarded Spot Bonus and top rating (E)."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "跨洋多活同步与秒级丢包排障：" : "Multi-Datacenter Sync & Automated Troubleshooting: "}
              </strong>
              {isZh
                ? "主导跨洋多数据中心（Multi-datacenter / Multi-DC）消息多活同步机制，研发自愈式消息丢包自动排障工具（Troubleshooting Tool），支持秒级异常定位与网络分析。"
                : "Engineered cross-ocean Multi-datacenter (Multi-DC) message sync and authored automated message loss troubleshooting tooling for sub-second anomaly isolation."}
            </div>
          </li>

          <li className="hidden sm:flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "核心 PaaS API 网关（AGW）重保支持：" : "Core PaaS API Gateway (AGW): "}
              </strong>
              {isZh
                ? "为公司核心 API Gateway 研发服务容量估算与自诊断工具，在重大活动期间平稳支撑数百万 QPS 核心流量洪峰，保障线上零故障。"
                : "Developed server usage estimation and self-diagnosis tooling for company core API Gateway, sustaining millions of QPS during major traffic campaigns."}
            </div>
          </li>
        </ul>

        {/* 4. Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5 sm:pt-1 font-telemetry text-[10px] sm:text-[11px] text-muted">
          <span className="font-semibold text-primary">STACK:</span>
          {["Go", "Apache Spark", "Multi-DC", "Kafka", "RPC Framework", "Troubleshooting", "PaaS Gateway"].map((tech, idx) => (
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
