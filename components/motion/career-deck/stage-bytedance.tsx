"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

interface StageBytedanceProps {
  mode?: "im" | "infra";
  onExploreNext: () => void;
}

/**
 * Act 03 & 04 // 字节跳动 (2021 – 2023)
 * 支持双页独立展示：
 *  - mode="im": TikTok IM 核心通讯与互动系统（正在输入、已读回执、延时优化、亿级心跳门禁）
 *  - mode="infra": 海外 Location 平台独当一面、Spark ETL、Go 运行时优化、Multi-DC 多活排障与 API 网关
 */
export function StageBytedance({ mode = "im", onExploreNext }: StageBytedanceProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  if (mode === "im") {
    return (
      <div className="mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-between px-6 py-6 sm:px-8 sm:py-8">
        {/* 1. Stage Eyebrow & Role Meta */}
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
            <span className="font-telemetry text-xs text-muted">
              {isZh ? "TikTok Social Messaging (IM 核心链路)" : "TikTok Social Messaging Core"}
            </span>
          </div>
        </div>

        {/* 2. Core Bullet Points for IM */}
        <div className="my-auto py-2 space-y-4">
          <ul className="space-y-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "正在输入状态（Typing Indicator）与低延迟传输：" : "Typing Indicator & Ephemeral Signaling: "}
                </strong>
                {isZh
                  ? "设计高频临时会话信令通道与端侧防抖自适应聚合，大幅降低客户端无感状态下的心跳广播损耗与接入层网关长连接开销，确保跨洋输入感知延迟平稳受控。"
                  : "Engineered high-frequency ephemeral signaling pipelines with adaptive client debounce, minimizing network overhead and edge gateway load while delivering real-time typing indicators."}
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "已读回执（Read Receipts）与写放大治理：" : "Read Receipts & Write Amplification Defense: "}
                </strong>
                {isZh
                  ? "针对大群聊场景下海量已读回执引发的写放大与存储风暴，设计异步批量聚合管道与多级高频缓存，建立削峰限流与自适应降级策略，保障底层存储集群高可用。"
                  : "Tackled massive write amplification from read receipts in large group chats by implementing asynchronous batch aggregation queues, multi-tiered caching, and adaptive traffic throttling."}
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "端到端消息延时优化（Latency Optimization）：" : "End-to-End Latency Optimization: "}
                </strong>
                {isZh
                  ? "全链路剖析消息从发送端、网关接入层、RPC 编解码到下行长连推送的拓扑耗时，精简冗余 RPC 链路与序列化开销，将核心单聊与群聊的 p99 投递延迟大幅压降。"
                  : "Conducted end-to-end messaging latency profiling across gateway ingestion, serialization, and push routing, trimming redundant RPC hops and reducing p99 delivery latency by multiples."}
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "亿级在线状态引擎（Presence Engine）：" : "Presence Engine & Redis ZSET Heartbeat Gating: "}
                </strong>
                {isZh
                  ? "打破千万级用户上下线触发的广播风暴，研发“推拉结合 + Redis ZSET 活跃心跳门禁”，限制仅向在线活跃好友定向推送，彻底消除 O(N×M) 写放大；重构冷启动会话排序，初始化耗时压至 100ms 以内。"
                  : "Mitigated multi-million QPS fan-out broadcast storms by architecting a hybrid push-pull protocol with active heartbeat gating via Redis ZSET, completely eliminating O(N*M) write amplification; overhauled cold-start inbox ranking to sub-100ms."}
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">
                  {isZh ? "服务架构规模与稳定性：" : "Scale & High-Availability Operations: "}
                </strong>
                {isZh
                  ? "常态维护 20+ 个核心 Go 微服务，确保 7×24 线上平稳运行，担任跨团队新特性设计评审人并指导新人。"
                  : "Governed 20+ Go microservices under 7x24 oncall SLA, leading technical architecture reviews and mentoring junior engineers."}
              </div>
            </li>
          </ul>

          {/* Tech Stack Pills */}
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

        {/* 3. Downward Indicator */}
        <div className="border-t border-border-plate/40 pt-3 flex justify-end">
          <button
            onClick={onExploreNext}
            type="button"
            className="group inline-flex items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink-dominant cursor-pointer underline-offset-4 hover:underline"
          >
            <span>{isZh ? "下翻 · 定位平台与基建" : "NEXT: LOCATION & INFRA"}</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    );
  }

  // mode === "infra" (Location Platform, Spark, Multi-DC, AGW)
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-between px-6 py-6 sm:px-8 sm:py-8">
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
          <span className="font-telemetry text-xs text-muted">
            {isZh ? "Overseas Location Platform & Core PaaS" : "Overseas Location Platform & API Gateway"}
          </span>
        </div>
      </div>

      {/* 2. Core Bullet Points for Infra */}
      <div className="my-auto py-2 space-y-4">
        <ul className="space-y-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "海外 Location 平台独挑大梁：" : "Overseas Location Platform (Sole Singapore SWE): "}
              </strong>
              {isZh
                ? "作为新加坡唯一常驻工程师，一人独立接管海外 Location 链路全生命周期，负责 ~100 个离线 Spark ETL 数据清洗任务与线上 Go 定位微服务，扛起 7×24 线上稳定护航。"
                : "Sole Singapore engineer governing ~100 offline Spark ETL data pipelines and online Go geo-services. Maintained 7x24 high-reliability oncall."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "系统化减负治理与 Go 深度调优：" : "Systematic Triage & Go Runtime Optimization: "}
              </strong>
              {isZh
                ? "系统化清理闲置海外计算资源，深度重构报警收敛机制消灭告警疲劳；调优 Go runtime 内存分配与 GC 压力，全面提高东盟（ASEAN）地区地理定位精度，荣获公司 Spot Bonus 与卓越绩效（E）。"
                : "Systematically eliminated alarm fatigue through intelligent log triage, purged abandoned overseas cloud resources, tuned Go memory/GC profiles, and improved ASEAN geo-lookup precision; awarded Spot Bonus and top rating (E)."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "多中心多活同步与秒级丢包排障：" : "Multi-Datacenter Sync & Automated Troubleshooting: "}
              </strong>
              {isZh
                ? "主导跨洋多数据中心（Multi-datacenter / Multi-DC）消息多活同步机制，研发自愈式消息丢包自动排障工具（Troubleshooting Tool），毫秒级定位网络抖动与数据瓶颈。"
                : "Engineered cross-ocean Multi-datacenter (Multi-DC) message sync and authored automated message loss troubleshooting tooling for sub-second anomaly isolation."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "核心 PaaS API 网关（AGW）春保支持：" : "Core PaaS API Gateway (AGW): "}
              </strong>
              {isZh
                ? "为公司核心 API Gateway 研发服务容量估算与自诊断工具，在春晚重保等特大活动中稳健支撑数百万 QPS 核心流量洪峰，保障零故障。"
                : "Developed server usage estimation and self-diagnosis tooling for company core API Gateway, sustaining millions of QPS during Chinese New Year campaigns."}
            </div>
          </li>
        </ul>

        {/* Tech Stack Pills */}
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
