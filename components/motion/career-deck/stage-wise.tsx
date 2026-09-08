"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Download, Mail, Rocket, Printer, ChevronDown } from "lucide-react";

interface StageWiseProps {
  onExploreNext?: () => void;
  onScrollToTop?: () => void;
}

/**
 * Act 01 // Wise 核心支付 (2024 – PRESENT)
 * 结构化履历条目：核心指标、架构攻坚、AI Workflow Platform 确定性状态机与业务收益。
 */
export function StageWise({ onExploreNext }: StageWiseProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-between px-6 py-6 sm:px-8 sm:py-8">
      {/* 1. Stage Eyebrow & Role Meta */}
      <div className="border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-ink-dominant">
            {isZh ? "01 // WISE · 新加坡 · 2024–至今" : "01 // WISE · SINGAPORE · 2024–PRESENT"}
          </span>
          <span className="text-[11px] opacity-75">FULL-TIME · IC3</span>
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            Product Engineer 3
          </h2>
          <span className="font-telemetry text-xs text-muted">
            {isZh ? "(从 IC2 Top 晋升)" : "(Promoted from IC2 Top)"}
          </span>
          <span className="text-muted opacity-40">·</span>
          <span className="font-telemetry text-xs text-muted">Payment Defects Team</span>
        </div>
      </div>

      {/* 2. Core Bullet Points & Metrics */}
      <div className="my-auto py-2 space-y-4">
        {/* Verified Battle Metrics (Zero-CLS tabular-nums) */}
        <div className="grid grid-cols-3 divide-x divide-border-plate/60 rounded-[2px] border border-border-plate/60 bg-surface/40 py-2 text-center">
          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "月自动化案例" : "AUTOMATION"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              30,000<span className="text-xs font-normal text-ink-dominant">+</span>
            </div>
            <p className="font-telemetry text-[9px] text-muted">cases / mo</p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "核验准确率" : "ACCURACY"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              98<span className="text-xs font-normal text-ink-dominant">%+</span>
            </div>
            <p className="font-telemetry text-[9px] text-muted">matching</p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "月度净节省" : "NET SAVINGS"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              £80,000
            </div>
            <p className="font-telemetry text-[9px] text-muted">GBP / mo</p>
          </div>
        </div>

        {/* Structured Experience Bullets */}
        <ul className="space-y-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "AI Workflow Platform 架构设计：" : "AI Workflow Platform Architecture: "}
              </strong>
              {isZh
                ? "针对最后 0.5% 依赖繁琐人工操作的资金对账（Last-mile Linking），在无 Golden Dataset 场景下，从零搭建基于确定性 DAG 状态机的金融 AI 评估与执行基座。"
                : "Architected financial AI Automation & Evaluation Platform from scratch: designed deterministic DAG state machines for last-mile payment linking without golden datasets."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "影子比对与熔断风控：" : "Live Shadowing & Blast Radius Control: "}
              </strong>
              {isZh
                ? "构建实时影子流量（Live Shadowing）比对 PayOps 人工作业，设置 99.5% 准入阈值；生产环境保持 5% 金丝雀对照流，毫秒级检测漂移并触发 Circuit Breaker 熔断降级；设置大额与高危通道强制人工复核，保障资金安全零事故。"
                : "Implemented real-time live shadowing against PayOps manual operations, 99.5% accuracy gating, and 5% canary control traffic with sub-second circuit-breaker failover and risk-tiered large amount threshold gating."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "大规模降本与业务收益：" : "Operational Impact & Direct Savings: "}
              </strong>
              {isZh
                ? "跨全球异构清算渠道与币种规则，实现每月自动化消化 30,000+ 资金错账案件，核验准确率 98%+，扣除算力成本后直接贡献净节约 £80,000 英镑/月（年化近百万英镑）。"
                : "Automated 30,000+ complex payment defect cases/month with 98%+ accuracy across heterogeneous partner rules, securing £80,000 GBP/month (~£1M/year) in direct operational savings."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "Compensation 赔付中枢与工单流转：" : "Compensation Engine & Escalation System: "}
              </strong>
              {isZh
                ? "重构全球客户赔付平台，实施多方合规双人复核与资金通道防重放；基于 Kafka 构建客服（CS）与资金运营（PayOps）双向流转平台，利用结构化遥测数据驱动上游根因治理。"
                : "Re-architected global Compensation Platform with double-approval compliance controls; built Kafka-based bidirectional escalation system bridging CS and PayOps to eliminate upstream ticket triggers."}
            </div>
          </li>
        </ul>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 font-telemetry text-[11px] text-muted">
          <span className="font-semibold text-primary">STACK:</span>
          {["Java 21", "Spring Boot", "PostgreSQL", "Apache Kafka", "Redis", "DAG Workflows", "Distributed Systems"].map((tech) => (
            <span
              key={tech}
              className="rounded-[2px] border border-border-plate/60 bg-surface/60 px-1.5 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Action Hub & Downward Indicator */}
      <div className="border-t border-border-plate/40 pt-3">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          {/* Action Hub — 对齐首页工作台 (Atelier) 的排版风格 */}
          <nav
            aria-label="Resume actions"
            className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-telemetry text-xs tracking-wider text-muted"
          >
            <a
              href="/resume.pdf"
              download="Zizheng-Lyu-Resume.pdf"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ink-dominant underline-offset-4 hover:underline cursor-pointer"
              aria-label="Download PDF Resume"
            >
              <Download className="h-3.5 w-3.5 opacity-70" />
              <span>{isZh ? "下载简历 (PDF)" : "RESUME (PDF)"}</span>
            </a>

            <span className="select-none text-muted opacity-40" aria-hidden="true">
              ·
            </span>

            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ink-dominant underline-offset-4 hover:underline cursor-pointer"
              title={isZh ? "打印/生成 A4 简历" : "Print A4 Resume"}
              aria-label={isZh ? "打印/生成 A4 简历" : "Print A4 Resume"}
            >
              <Printer className="h-3.5 w-3.5 opacity-70" />
              <span>{isZh ? "打印 A4" : "PRINT A4"}</span>
            </button>

            <span className="select-none text-muted opacity-40" aria-hidden="true">
              ·
            </span>

            <a
              href="mailto:lvzizhengde@gmail.com"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ink-dominant underline-offset-4 hover:underline"
            >
              <Mail className="h-3.5 w-3.5 opacity-70" />
              <span>{isZh ? "邮件联系" : "CONTACT"}</span>
            </a>

            <span className="select-none text-muted opacity-40" aria-hidden="true">
              ·
            </span>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ink-dominant underline-offset-4 hover:underline"
            >
              <Rocket className="h-3.5 w-3.5 opacity-70" />
              <span>{isZh ? "独立产品" : "PRODUCTS"}</span>
            </Link>
          </nav>

          {/* Downward indicator to next stage */}
          {onExploreNext && (
            <button
              onClick={onExploreNext}
              type="button"
              className="group inline-flex items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink-dominant cursor-pointer underline-offset-4 hover:underline"
            >
              <span>{isZh ? "下翻 · 银行与初创" : "NEXT: MARIBANK & BONDEE"}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-y-0.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
