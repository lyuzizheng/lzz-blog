"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

interface StageExplorationProps {
  onExploreNext: () => void;
}

/**
 * Act 2 // 探索与触礁 (2023 – 2024)
 * 写作风个人叙事：逃离围城之后，初创的泡沫与坚决不做流水线执行机器。
 */
export function StageExploration({ onExploreNext }: StageExplorationProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-between px-6 py-8 sm:px-8 sm:py-10">
      {/* 1. Stage Eyebrow */}
      <div className="flex items-center justify-between border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <span className="font-semibold text-cobalt">
          {isZh ? "03 // 探索与触礁 · 2023–2024" : "03 // EXPLORATION · 2023–2024"}
        </span>
        <span className="text-[11px] opacity-75">BONDEE · MARIBANK · INDIE</span>
      </div>

      {/* 2. Core Content */}
      <div className="my-auto py-4 space-y-4">
        <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">
          {isZh
            ? "逃离围城：初创泡沫与拒绝做流水线打字机"
            : "Breaking The Comfort Zone: Startup Reality & Agency"}
        </h2>

        <div className="space-y-3 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
          <p>
            {isZh
              ? "2023 年秋天，我果断离开了字节。我不想一辈子只懂大厂内部的现成套路，我想去看看真实初创公司怎么跑。我去了 Bondee 作为新加坡 1 号软件工程师。刚去时感觉空间很大、很受信任，但现实给了我狠狠一击：海外技术扩张缺乏真正的战略定力，短短几个月后扩张直接搁浅，技术团队几乎全被砍掉只留运营。那几个月我被迫当了全栈杂家，把 K8s 容器编排和 Vector + Kafka + ES 日志底座摸了一遍。真实情况就是帮小团队替换了每月几百块钱的云托管日志，但它让我真切体会到了商业世界和初创团队的残酷与脆弱。"
              : "In autumn 2023, I walked away from ByteDance. I refused to spend my career knowing only internal walled tools; I wanted to experience how real startups operated. I joined Bondee as their first software engineer in Singapore. It felt expansive and trusting at first, but reality struck quickly: overseas technical expansion lacked strategic depth, and within months the expansion was shelved, wiping out the engineering presence in favor of pure operations. I wore every hat imaginable—wrestling with Kubernetes container orchestration and deploying a self-hosted Vector + Kafka + ElasticSearch observability pipeline. It was simply swapping out a few-hundred-dollar cloud logging bill for a small team, but it gave me a raw taste of startup fragility."}
          </p>

          <p>
            {isZh
              ? "受挫之后，出于对安全感（Job Security）的恐慌性代偿，加上当时 AI 还没全面爆发，我选择进入了数字银行 MariBank 做信贷核心业务。结果迎来了整个职业生涯中最窒息的三个月：极度死板、零自主度。所有的业务需求由业务方想好、交给 PM，输出的技术文档详尽死板到连每一个函数接口、每一张表字段都写得清清楚楚。现在把那份 PRD 喂给 AI，都不需要程序员了。在信贷系统里严格实践了分布式事务一致性（Distributed Consistency）、高并发防重放幂等与金融风控，但每天按部就班走 Sprint，感觉自己像个没有思想的代码打字机。"
              : "Bruised by that collapse and seeking stability before the current AI boom, I joined MariBank in the core credit engine team. What followed was the most suffocating three months of my career: rigid bureaucracy and zero autonomy. Upstream business teams handed down PRDs so mechanically detailed that every API signature, table schema, and error code was dictated—today, feeding that PRD to an AI model would make the developer entirely redundant. I practiced rigorous distributed consistency, anti-replay idempotency, and MAS risk controls across Cashloan & SME Termloan, but trudging through predetermined sprints felt like being an emotionless code monkey."}
          </p>

          <p>
            {isZh
              ? "我是一个必须认可工作意义感的人。如果八个小时全用来做不喜欢、没有掌控感的事，我会从头顶难受到脚后跟。三个月后果断斩仓离开——我明确了自己的绝对底线：我是一个 Product Builder，我坚决不接受做一个纯粹的 Executor（提线木偶执行者）。"
              : "I need meaning in my craft. If eight hours a day are spent on soul-crushing tasks with zero ownership, I feel deeply miserable. I cut my losses and left after 90 days, setting a lifelong non-negotiable standard: I am a Product Builder; I will never settle for being a mindless executor."}
          </p>

          <p>
            {isZh
              ? "在随后的空白期里，借助 AI 工具的爆发，我找回了纯粹的创造乐趣。我一个人快速做出了 CanCan（财务证据与对账台）、CoffeeMode（找咖极简指南）和 Our Village（社区协作）。我的动手能力被彻底解放，也彻底确立了我找寻下一站的不可妥协标准：必须有业务定义权，必须能发挥端到端的产品创造力。"
              : "During the brief break that followed, empowered by generative AI tools, I rediscovered the joy of building. Solo, I rapidly brought CanCan (creator financial reconciliation), CoffeeMode (specialty cafe curation), and Our Village (decentralized member management) to life. My agency was unshackled, and my criteria for the next chapter solidified: I must have ownership over problem definition, and I must build with end-to-end product agency."}
          </p>
        </div>
      </div>

      {/* 3. Next Stage Indicator */}
      <div className="flex flex-col items-center">
        <button
          onClick={onExploreNext}
          type="button"
          className="group flex flex-col items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-primary cursor-pointer"
          aria-label="Proceed to Wise"
        >
          <span>{isZh ? "向下滑动 · Wise 与现在" : "PROCEED TO WISE"}</span>
          <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
