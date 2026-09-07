"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { ArrowUp, Download, Mail, Rocket, Printer } from "lucide-react";

interface StageWiseProps {
  onScrollToTop: () => void;
}

/**
 * Act 3 // Wise 与当下 (2024 – PRESENT)
 * 写作风个人叙事：技术为业务服务、确定性 AI 基建、以及一个“拧巴但全面”的工程师自白。
 */
export function StageWise({ onScrollToTop }: StageWiseProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-between px-6 py-8 sm:px-8 sm:py-10">
      {/* 1. Stage Eyebrow */}
      <div className="flex items-center justify-between border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <span className="font-semibold text-cobalt">
          {isZh ? "04 // WISE 与当下 · 2024–至今" : "04 // WISE & NEVER SETTLE · 2024–PRESENT"}
        </span>
        <span className="text-[11px] opacity-75">PRODUCT ENGINEER 3</span>
      </div>

      {/* 2. Core Narrative & Essay */}
      <div className="my-auto py-4 space-y-4">
        <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">
          {isZh
            ? "技术永远为业务服务：务实做 AI，与终身折腾"
            : "Technology In Service of Business: Pragmatic AI & Real Agency"}
        </h2>

        <div className="space-y-3 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
          <p>
            {isZh
              ? "2024 年底，我加入了 Wise 的 Payment Defects 团队，这是一家真正 Impact-driven 的公司。在这里，我们像 Autonomous Scout 一样，在一个巨大的全链路异常金钱池里自由探索，主攻最后 0.5% 最复杂、此前全靠高成本人工在各个后台拼凑信息的资金对账顽疾（Last-mile Linking）。我主导重构了全球 Compensation 补偿平台（双人复核审批），并用 Kafka 搭建了跨团队双向工单流转平台，利用结构化数据做根因预防，从产品源头消灭工单发生。"
              : "Late 2024, I joined Wise's Payment Defects team—a genuinely impact-driven culture. Operating as Autonomous Scouts, we tackle the final 0.5% edge cases: messy, high-friction financial discrepancies (Last-mile Linking) that previously burned massive operational hours. I re-architected the global Compensation Platform with cross-regional compliance double approvals, and engineered an event-driven Kafka escalation pipeline between CS and PayOps that uses structured telemetry for upstream root-cause prevention."}
          </p>

          <p>
            {isZh
              ? "更有技术密度的，是我从零搭建的 AI Automation & Evaluation Platform（AI Workflow Platform）：没有 Golden Dataset，我拒绝为了虚荣盲目上不稳定的 ReAct Agent，而是选择了高可靠的确定性 DAG 状态机；设计实时 Shadowing 影子流量比对，准召率达到 99.5% 才准许放行生产；上线后长驻 5% 对照流，检测到 LLM 漂移秒级触发 Circuit Breaker 熔断切回人工。设置大额强制人工审核与币种专属规则隔离，每月自动化稳定处理 30,000+ 个 Case（98%+ 准召率），扣除模型算力成本后，净节省 £80,000 GBP/月（年化近百万英镑）。凭着这些端到端交付，我如期晋升为了 Product Engineer 3。"
              : "My most technically demanding endeavor was architecting the AI Automation & Evaluation Platform (AI Workflow Platform) from scratch. Without an off-the-shelf Golden Dataset, I refused to chase the hype of fragile ReAct agents, deliberately anchoring on deterministic DAG state machines. I designed real-time live shadowing against human PayOps, enforcing a strict 99.5% accuracy gate before production clearance. In production, a 5% canary control stream runs continuously, triggering sub-second circuit-breaker failovers if any drift occurs. Paired with risk-tiered threshold gating for high amounts and per-currency rule isolation, the system autonomously handles 30,000+ cases/month with 98%+ accuracy, delivering £80,000 GBP/month (~£1M/year) in net operational savings. On the back of this delivery, I was promoted to Product Engineer 3."}
          </p>

          {/* Quiet Verified Metric Strip (Zero-CLS tabular-nums) */}
          <div className="grid grid-cols-3 divide-x divide-border-plate/60 border-y border-border-plate/60 py-2.5 text-center">
            <div className="px-2">
              <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "月自动化" : "AUTOMATION"}
              </span>
              <div className="font-display text-xl font-bold text-primary tabular-nums sm:text-2xl">
                30,000<span className="text-xs font-normal text-cobalt">+</span>
              </div>
              <p className="font-telemetry text-[9px] text-muted">cases / mo</p>
            </div>

            <div className="px-2">
              <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "核验准确率" : "ACCURACY"}
              </span>
              <div className="font-display text-xl font-bold text-primary tabular-nums sm:text-2xl">
                98<span className="text-xs font-normal text-cobalt">%+</span>
              </div>
              <p className="font-telemetry text-[9px] text-muted">matching</p>
            </div>

            <div className="px-2">
              <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
                {isZh ? "净节省" : "NET SAVINGS"}
              </span>
              <div className="font-display text-xl font-bold text-primary tabular-nums sm:text-2xl">
                £80,000
              </div>
              <p className="font-telemetry text-[9px] text-muted">GBP / mo</p>
            </div>
          </div>

          {/* Genuine Self-Reflection / Confession */}
          <p>
            {isZh
              ? "【个人自白】如果今天让我用一句话来形容自己，我其实是一个很“拧巴”的人：我喜欢钱，但我放弃了大厂更高薪资去了追求业务价值的 Wise；我热爱技术，但我不是钻研底层算法模型的学者；我迷恋创业和创造，但我又不敢在早期初创公司裸奔赌命。但好处是，我很全面——既能下沉到分布式系统底层抗住数百万 QPS，又能站在全局理解商业痛点把复杂平台跑通；既有 AI 落地的工程克制，又有业余端到端独立出产品的自驱力。我最满意的，是骨子里的折腾精神：Never Settle（不将就），永远相信美好的事情即将发生。"
              : "If I had to describe myself honestly, I am a creature of productive contradiction: I like financial rewards, yet I walked away from big-tech compensation for the engineering agency of Wise; I love deep tech, yet I am not an ivory-tower ML researcher; I am obsessed with building products, yet I am too pragmatic to gamble my livelihood on speculative equity with zero base. But this tension forged my greatest strength: comprehensiveness. I can dive into low-level distributed plumbing to tame million-QPS storms, yet step back to align cross-team business realities; I possess the architectural discipline to say no to AI hype, and the solo velocity to ship full-stack products over weekends. What I cherish most is that restless itch: Never Settle, and always believe that something wonderful is about to happen."}
          </p>
        </div>

        {/* Action Hub & Navigation */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={onScrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-[2px] border border-border-plate/80 bg-surface/80 px-3.5 py-1.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt cursor-pointer"
          >
            <ArrowUp className="h-3.5 w-3.5 text-cobalt" />
            <span>{isZh ? "回到起点 (Return to Origin)" : "RETURN TO ORIGIN"}</span>
          </button>

          <div className="inline-flex items-center rounded-[2px] shadow-plate">
            <a
              href="/resume.pdf"
              download="Zizheng-Lyu-Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-l-[2px] border border-cobalt bg-cobalt px-3.5 py-1.5 font-telemetry text-xs font-medium text-text-badge transition-all hover:opacity-90"
              aria-label="Download PDF Resume"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isZh ? "下载 A4 PDF 简历" : "DOWNLOAD RESUME"}</span>
            </a>
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center border border-l-0 border-cobalt bg-cobalt/85 px-2 py-1.5 text-text-badge transition-all hover:bg-cobalt cursor-pointer"
              title={isZh ? "打印/生成 A4 简历" : "Print A4 Resume"}
              aria-label={isZh ? "打印/生成 A4 简历" : "Print A4 Resume"}
            >
              <Printer className="h-3.5 w-3.5" />
            </button>
          </div>

          <a
            href="mailto:lvzizhengde@gmail.com"
            className="inline-flex items-center gap-1.5 rounded-[2px] border border-border-plate/80 bg-surface/80 px-3.5 py-1.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Mail className="h-3.5 w-3.5 text-cobalt" />
            <span>{isZh ? "邮件联系" : "CONTACT"}</span>
          </a>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-[2px] border border-border-plate/80 bg-surface/80 px-3.5 py-1.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Rocket className="h-3.5 w-3.5 text-terracotta" />
            <span>{isZh ? "独立产品" : "SIDE PRODUCTS"}</span>
          </Link>
        </div>
      </div>

      {/* 3. Subtle Footer Indicator */}
      <div className="flex items-center justify-between border-t border-border-plate/40 pt-2 font-telemetry text-[10px] text-muted">
        <span>LYU ZIZHENG · NEVER SETTLE</span>
        <span>2017 – 2026</span>
      </div>
    </div>
  );
}
