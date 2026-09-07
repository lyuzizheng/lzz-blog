"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

interface StageBytedanceProps {
  onExploreNext: () => void;
}

/**
 * Act 1 // 字节跳动 (2021 – 2023)
 * 写作风个人叙事：大厂围城、一人扛全链路的孤岛守望、与千万级并发的硬核现实课。
 */
export function StageBytedance({ onExploreNext }: StageBytedanceProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-between px-6 py-8 sm:px-8 sm:py-10">
      {/* 1. Stage Eyebrow */}
      <div className="flex items-center justify-between border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <span className="font-semibold text-cobalt">
          {isZh ? "02 // 字节跳动 · 2021–2023" : "02 // BYTEDANCE · 2021–2023"}
        </span>
        <span className="text-[11px] opacity-75">TIKTOK IM &amp; LOCATION</span>
      </div>

      {/* 2. Core Narrative */}
      <div className="my-auto py-4 space-y-4">
        <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">
          {isZh
            ? "围城里的高并发熔炉：孤岛守望与海量流量"
            : "Inside The Crucible: High Concurrency & Solo Resilience"}
        </h2>

        <div className="space-y-3 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
          <p>
            {isZh
              ? "校招赶上了大扩招。大厂就像一座巨大的围城，里面有最先进的内部基建和成熟范式，也容易让人安逸地变成一颗螺丝钉。刚入职不久，我被借调到海外 Location 业务线。当时全团队在新加坡只有我一个工程师，顶着时差和远程沟通，一个人要扛近百个离线 Spark 任务和线上 Go 定位服务，7×24 oncall 报警响个不停。"
              : "Campus recruiting rode a major expansion wave. Big tech was a walled fortress—blessed with state-of-the-art internal infra, but dangerously comfortable for turning into a cog. Soon after joining, I was lent out to the overseas Location team. I was the sole engineer in Singapore, navigating remote time zones to shoulder ~100 offline Spark data pipelines and online Go geo-services with 7×24 oncall alerts ringing off the hook."}
          </p>

          <p>
            {isZh
              ? "我很快意识到盲目硬扛是死路，开始做系统性减负：清理无人过问的海外闲置资源，逐项优化日志误报与报警过滤，调优 Go 服务的内存分配与 GC 压力。当告警风暴终于被平息、服务真正稳定下来时，我拿到了在字节的第一个 E（卓越绩效）和 Spot Bonus。"
              : "Blind heroic overtime was a dead end; I survived by systematic pruning: purging abandoned overseas cloud resources, filtering noisy alerts, and tuning Go runtime memory allocation and GC pressure. When the alert storms silenced and the service hardened, I received my first E (Exceeds Expectations) rating and Spot Bonus."}
          </p>

          <p>
            {isZh
              ? "后来转入 TikTok IM 核心链路，独立维护 20+ 个 Go 微服务，直面千万级全球流量：面对用户重装 App 的冷启动，用 Redis ZSET 活跃会话分层索引重构了会话排序（Conversation Ranking），解决底层 Append-only 存储顺序扫描导致单会话淹没收件箱的体验 Bug；面对数百万 QPS 上下线广播风暴，设计了“推拉结合 + 活跃心跳门禁”机制，只向当前开着 App 的在线好友定向推送，彻底消除了写放大；针对跨洋 Multi-datacenter (Multi-DC) 多活同步链路，自研消息丢包自动排障工具（Troubleshooting Tool），秒级定位异常瓶颈。"
              : "Later moving to TikTok IM, I owned 20+ Go microservices under multi-million global QPS. When users reinstalled the app, cold-start inbox scans from append-only message stores would pull 10,000 messages from a single noisy group, obliterating the inbox; I overhauled Conversation Ranking with a Redis ZSET active-session hierarchy, unlocking sub-100ms multi-chat initialization. Confronted with massive fan-out broadcast storms when users toggled presence, I engineered a hybrid push-pull protocol with active heartbeat gating via Redis ZSET, eliminating O(N×M) write amplification. For cross-ocean Multi-datacenter (Multi-DC) active sync, I authored an automated message loss Troubleshooting Tool that pinpointed anomalies in seconds."}
          </p>

          <p>
            {isZh
              ? "在字节我 1 年内如期晋升 Senior，拿了奖金，但我也开始反思：大厂利润极其丰厚，很多时候大家沉迷于“技术很牛、优化很漂亮”，却缺乏对商业 ROI 的精打细算；而我一边实现着已读回执，一边写下了《我讨厌 IM》对隐私侵蚀的批判。看着大厂在商业压力下对理想主义的退让，我觉得自己像个被大厂光环包裹的套路化程序员。我必须走出来，看看外面的真实世界。"
              : "Promoted to Senior within 1 year with bonuses, but reflection crept in: with massive profit margins, big tech often celebrated pure technical bravado without demanding disciplined business ROI. Meanwhile, engineering read receipts by day while publishing essays critiquing how presence features erode personal privacy felt deeply conflicted. Watching commercial realities compromise product ethics, I felt sheltered by the corporate halo. I had to break out and see what the real engineering world looked like."}
          </p>
        </div>
      </div>

      {/* 3. Next Stage Indicator */}
      <div className="flex flex-col items-center">
        <button
          onClick={onExploreNext}
          type="button"
          className="group flex flex-col items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink-dominant cursor-pointer underline-offset-4 hover:underline"
          aria-label="Proceed to Exploration"
        >
          <span>{isZh ? "向下滑动 · 探索与触礁" : "PROCEED TO EXPLORATION"}</span>
          <ChevronDown className="h-4 w-4 opacity-60 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
