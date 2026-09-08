"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Download, Mail, Rocket, Printer, ChevronDown } from "lucide-react";

interface StageHeroProps {
  onExploreNext?: () => void;
  onScrollToTop?: () => void;
}

/**
 * Act 00 // 个人简介与导航首页
 * 包含一小段清晰、硬核的个人简介、核心外部链接与向下探索提示。
 */
export function StageHero({ onExploreNext }: StageHeroProps) {
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
      {/* 1. Header & Identity */}
      <div className="border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-ink-dominant">
            {isZh ? "00 // 个人简介与档案 · 新加坡" : "00 // OVERVIEW & PROFILE · SINGAPORE"}
          </span>
          <span className="text-[11px] opacity-75">PRODUCT &amp; SYSTEMS ENGINEER</span>
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Lyu Zizheng (吕子正)
          </h1>
          <span className="text-muted opacity-40">·</span>
          <span className="font-telemetry text-xs text-muted">
            Wise IC3 · Ex-TikTok / ByteDance
          </span>
        </div>
      </div>

      {/* 2. Short Bio & Core Profile */}
      <div className="my-auto py-2 space-y-4">
        {/* Verbatim Core Philosophy */}
        <blockquote className="border-l-2 border-ink-dominant/50 pl-3.5 font-serif text-xs italic leading-relaxed text-muted sm:text-sm">
          &ldquo;A results-driven engineer with a passion for user-centric craftsmanship.
          Excels in taking products from zero to one. More importantly, values engineering ethic and believes good software products must do good to societies.&rdquo;
        </blockquote>

        {/* Crisp Summary Bullets */}
        <div className="space-y-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm">
          <p>
            {isZh
              ? "我是子正，一名专注高可用分布式系统、金融级 AI 自动化工作流与端到端产品落地的资深工程师，现居新加坡。习惯在千万级并发的工业级底座上推敲确定性与极致性能，也热衷于深入复杂业务泥潭探寻工程与商业 ROI 的最大公约数。"
              : "I am Zizheng, a product-minded systems engineer specializing in high-concurrency distributed backends, deterministic financial AI workflows, and zero-to-one product velocity, based in Singapore."}
          </p>

          <ul className="space-y-2 border-t border-border-plate/40 pt-2.5">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">Wise (IC3): </strong>
                {isZh
                  ? "负责核心支付缺陷治理，主导基于确定性 DAG 状态机与影子比对的 AI Workflow Platform，实现月度净节约 £80,000 英镑。"
                  : "Architecting financial AI evaluation & DAG automation engines in core payment defect resolution, delivering £80,000/month net savings."}
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">TikTok / ByteDance: </strong>
                {isZh
                  ? "校招 1 年晋升 Senior；TikTok IM 亿级在线状态引擎（Redis ZSET 心跳门禁）、正在输入与已读回执延时优化；海外 Location 平台独当一面（Spot Bonus & E 评级）。"
                  : "Promoted to Senior in 1 year. Engineered TikTok IM presence engine, typing indicators, read receipts, and latency tuning; stabilized Overseas Location Platform (Spot Bonus & E)."}
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">Fintech &amp; Cloud-Native: </strong>
                {isZh
                  ? "MariBank 核心借贷引擎分布式事务一致性与 MAS 金融合规；Bondee 新加坡 1 号工程师搭建云原生 K8s 与可观测日志体系。"
                  : "Enforced strict distributed transaction consistency under MAS compliance at MariBank; Employee #1 at Bondee establishing K8s & Vector/Kafka logging pipelines."}
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
              <div>
                <strong className="font-semibold text-primary">NTU &amp; Entrepreneurship: </strong>
                {isZh
                  ? "南洋理工大学计算机工程荣誉学士（全额卓越奖学金）；联合创办高校生活平台 U-Wave（自然增长至 20,000 用户、4,000 DAU）。"
                  : "B.Eng. Honors in Computer Engineering at NTU on Full Merit Scholarship; co-founded U-Wave, scaling campus utility to 20,000 users / 4,000 DAU."}
              </div>
            </li>
          </ul>
        </div>

        {/* Tech Focus Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 font-telemetry text-[11px] text-muted">
          <span className="font-semibold text-primary">CORE:</span>
          {["Distributed Systems", "AI Workflow Engines", "High Concurrency", "Go", "Java 21", "Kafka", "Redis", "Kubernetes"].map((item) => (
            <span
              key={item}
              className="rounded-[2px] border border-border-plate/60 bg-surface/60 px-1.5 py-0.5"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Action Hub & Downward Exploration */}
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
              <span>lvzizhengde@gmail.com</span>
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

          {/* Downward indicator to Wise */}
          {onExploreNext && (
            <button
              onClick={onExploreNext}
              type="button"
              className="group inline-flex items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink-dominant cursor-pointer underline-offset-4 hover:underline"
            >
              <span>{isZh ? "向下滑动 · Wise 核心支付" : "NEXT: WISE · PAYMENTS & AI"}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-y-0.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
