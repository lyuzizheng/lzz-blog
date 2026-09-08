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
      <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-6 py-8 sm:px-8">
        {/* Faint Typographic Watermark Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 right-0 z-0 select-none overflow-hidden opacity-[0.03] dark:opacity-[0.04]"
        >
          <span className="font-display text-[7rem] font-black uppercase tracking-tighter leading-none text-ink-dominant sm:text-[11rem] md:text-[13rem]">
            TIKTOK
          </span>
        </div>

        <div className="relative z-10 space-y-4 sm:space-y-5">
          {/* 1. Header & Role Meta */}
          <div className="border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-ink-dominant">
                {isZh ? "03 // 字节跳动 · 即时通讯 · 2022–2023" : "03 // TIKTOK IM & SOCIAL MESSAGING · 2022–2023"}
              </span>
              <span className="text-[11px] opacity-75">1 年快速晋升 · 20+ GO 微服务</span>
            </div>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
              <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                Senior Backend Engineer
              </h2>
              <span className="text-muted opacity-40">·</span>
              <span className="font-telemetry text-xs text-muted">
                {isZh ? "TikTok Social Messaging (IM 核心链路)" : "TikTok Social Messaging Core"}
              </span>
            </div>
          </div>

          {/* 2. High-Concurrency Telemetry Bar */}
          <div className="grid grid-cols-3 divide-x divide-border-plate/60 rounded-[2px] border border-border-plate/60 bg-surface/40 py-2.5 text-center">
            <div className="px-2">
              <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "广播写放大" : "FAN-OUT STORM"}
              </span>
              <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
                O(1)<span className="text-xs font-normal text-ink-dominant"> cap</span>
              </div>
              <p className="font-telemetry text-[9px] text-muted">
                {isZh ? "Redis ZSET 心跳门禁" : "Redis ZSET gating"}
              </p>
            </div>

            <div className="px-2">
              <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "冷启动加载" : "COLD START"}
              </span>
              <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
                &lt;100<span className="text-xs font-normal text-ink-dominant">ms</span>
              </div>
              <p className="font-telemetry text-[9px] text-muted">
                {isZh ? "会话树排序初始化" : "inbox ranking"}
              </p>
            </div>

            <div className="px-2">
              <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "核心微服务" : "MICROSERVICES"}
              </span>
              <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
                20<span className="text-xs font-normal text-ink-dominant">+</span>
              </div>
              <p className="font-telemetry text-[9px] text-muted">
                {isZh ? "Go 核心服务 · 7×24" : "Go services · 7x24"}
              </p>
            </div>
          </div>

          {/* 3. Non-AI Grounded Bullets */}
          <ul className="space-y-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "亿级在线状态引擎（Presence Engine）：" : "Presence Engine & Redis ZSET Heartbeat Gating: "}
                </strong>
                {isZh
                  ? "针对千万级用户上下线触发的广播风暴，研发“推拉结合 + Redis ZSET 活跃心跳门禁”方案，限制仅向在线活跃好友定向推送，彻底消除 O(N×M) 写放大；重构冷启动会话排序，首屏初始化耗时优化至 100ms 以内。"
                  : "Mitigated multi-million QPS fan-out broadcast storms by architecting a hybrid push-pull protocol with active heartbeat gating via Redis ZSET, completely eliminating O(N*M) write amplification; overhauled cold-start inbox ranking to sub-100ms."}
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "正在输入与端到端延迟优化：" : "Typing Indicator & Latency Optimization: "}
                </strong>
                {isZh
                  ? "设计高频临时会话信令通道与客户端防抖自适应聚合，大幅降低网关长连接开销；全链路梳理网关接入层、RPC 编解码到下行推送拓扑，压降核心单聊与群聊 p99 投递延迟。"
                  : "Engineered ephemeral signaling pipelines with adaptive client debounce; conducted end-to-end latency profiling across gateway ingestion, serialization, and push routing, significantly trimming p99 delivery latency."}
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "已读回执写放大与存储保护：" : "Read Receipts & Write Amplification Defense: "}
                </strong>
                {isZh
                  ? "针对大群聊海量已读回执引发的写放大与存储冲击，设计异步批量聚合管道与多级高频缓存，建立削峰限流与自适应降级策略，保障底层存储集群高可用。"
                  : "Tackled massive write amplification from read receipts in large group chats by implementing asynchronous batch aggregation queues, multi-tiered caching, and adaptive traffic throttling."}
            </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "架构治理与新人培养：" : "Scale & Architecture Reviews: "}
                </strong>
                {isZh
                  ? "常态维护 20+ 个核心 Go 微服务，确保 7×24 线上稳定运行；担任跨团队新特性架构设计评审人，并辅导多位初级工程师。"
                  : "Governed 20+ Go microservices under 7x24 oncall SLA, leading technical architecture reviews and mentoring junior engineers."}
              </div>
            </li>
          </ul>

          {/* 4. Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 font-telemetry text-[11px] text-muted">
            <span className="font-semibold text-primary">STACK:</span>
            {["Go", "Redis (ZSET)", "RPC Microservices", "Kafka", "Protobuf", "Latency Tuning", "High Concurrency"].map((tech) => (
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

  // mode === "infra" (Location Platform, Spark, Multi-DC, AGW)
  return (
    <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-6 py-8 sm:px-8">
      {/* Faint Typographic Watermark Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 right-0 z-0 select-none overflow-hidden opacity-[0.03] dark:opacity-[0.04]"
      >
        <span className="font-display text-[7rem] font-black uppercase tracking-tighter leading-none text-ink-dominant sm:text-[11rem] md:text-[13rem]">
          INFRA
        </span>
      </div>

      <div className="relative z-10 space-y-4 sm:space-y-5">
        {/* 1. Stage Eyebrow & Role Meta */}
        <div className="border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-ink-dominant">
              {isZh ? "04 // 字节跳动 · 定位与基建 · 2021–2022" : "04 // BYTEDANCE LOCATION & INFRA · 2021–2022"}
            </span>
            <span className="text-[11px] opacity-75">SPOT BONUS · TOP RATING E</span>
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              Backend Engineer
            </h2>
            <span className="text-muted opacity-40">·</span>
            <span className="font-telemetry text-xs text-muted">
              {isZh ? "Overseas Location Platform & Core PaaS" : "Overseas Location Platform & API Gateway"}
            </span>
          </div>
        </div>

        {/* 2. Operational Highlights Bar */}
        <div className="grid grid-cols-3 divide-x border border-border-plate/60 rounded-[2px] divide-border-plate/60 bg-surface/40 py-2.5 text-center">
          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "离线数据链路" : "SPARK ETL"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              ~100<span className="text-xs font-normal text-ink-dominant"> jobs</span>
            </div>
            <p className="font-telemetry text-[9px] text-muted">
              {isZh ? "独立全周期维护" : "sole SWE in SG"}
            </p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "网关重大保活" : "PEAK GATEWAY"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              Millions<span className="text-xs font-normal text-ink-dominant"> QPS</span>
            </div>
            <p className="font-telemetry text-[9px] text-muted">
              {isZh ? "核心重保零故障" : "0 incident SLA"}
            </p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "绩效与嘉奖" : "RECOGNITION"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              Top E
            </div>
            <p className="font-telemetry text-[9px] text-muted">
              {isZh ? "Spot Bonus 嘉奖" : "Spot Bonus awarded"}
            </p>
          </div>
        </div>

        {/* 3. Non-AI Grounded Bullets */}
        <ul className="space-y-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm">
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

          <li className="flex items-start gap-2">
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

          <li className="flex items-start gap-2">
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
        <div className="flex flex-wrap items-center gap-1.5 pt-1 font-telemetry text-[11px] text-muted">
          <span className="font-semibold text-primary">STACK:</span>
          {["Go", "Apache Spark", "Multi-DC", "Kafka", "RPC Framework", "Troubleshooting", "PaaS Gateway"].map((tech) => (
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
