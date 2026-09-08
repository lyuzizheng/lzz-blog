"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { FileText, Mail, Rocket, ChevronDown } from "lucide-react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface StageHeroProps {
  onExploreNext?: () => void;
  onScrollToTop?: () => void;
}

/**
 * Act 00 // 个人简介与档案首页
 * 纯粹、精炼的高定个人概述：包含用户指定个人宣言、去 AI 腔真实背景、CORE 技能标签与操作区。
 */
export function StageHero({ onExploreNext }: StageHeroProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";


  return (
    <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-4 py-2 sm:px-8 sm:py-8 overflow-hidden">
      {/* Faint Typographic Watermark Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 right-0 z-0 select-none overflow-hidden opacity-[0.03] dark:opacity-[0.04]"
      >
        <span className="font-display text-[6rem] font-black uppercase tracking-tighter leading-none text-ink-dominant sm:text-[12rem] md:text-[15rem]">
          PROFILE
        </span>
      </div>

      <div className="relative z-10 space-y-2.5 sm:space-y-5">
        {/* 1. Header & Identity */}
        <div className="border-b border-border-plate/60 pb-2 sm:pb-3 font-telemetry text-[11px] sm:text-xs uppercase tracking-widest text-muted">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-ink-dominant">
              {isZh ? "00 // 个人简介与档案 · 新加坡" : "00 // OVERVIEW & PROFILE · SINGAPORE"}
            </span>
            <span className="text-[10px] sm:text-[11px] opacity-75">PRODUCT &amp; SYSTEMS ENGINEER</span>
          </div>
          <div className="mt-0.5 sm:mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
            <h1 className="font-display text-xl font-bold tracking-tight sm:text-3xl">
              Lyu Zizheng (吕子正)
            </h1>
            <span className="text-muted opacity-40">·</span>
            <span className="font-telemetry text-[11px] sm:text-xs text-muted">
              Wise IC3 · Ex-TikTok / ByteDance
            </span>
          </div>
        </div>

        {/* 2. Core Philosophy (用户指定原句陈述) */}
        <blockquote className="border-l-2 border-ink-dominant/60 pl-3 sm:pl-4 font-serif text-[11px] sm:text-sm italic leading-snug sm:leading-relaxed text-secondary">
          &ldquo;A results-driven full-stack engineer with a passion for user-centric product development.
          Proactive in fostering a cooperative team environment and mentoring new talent.
          Excels in guiding projects from conception to successful completion.
          More importantly, values engineering ethic and believes good software products must do good to societies.&rdquo;
        </blockquote>

        {/* 3. Authentic Bio Statement (自然专业、消除 AI 腔) */}
        <p className="font-body text-[11px] sm:text-sm leading-snug sm:leading-relaxed text-secondary">
          {isZh
            ? "以结果为导向的全栈与系统工程师，专注以用户为中心的产品开发。现居新加坡，拥有 5 年以上海量并发与金融系统实战经验。曾先后负责 TikTok 即时通讯核心架构与海外基础架构、MariBank 数字银行信贷核心，目前在 Wise 负责核心支付缺陷治理与确定性 AI 自动化平台研发。"
            : "A results-oriented product and systems engineer based in Singapore with 5+ years of experience engineering high-concurrency systems and financial backends. Previously architected core social messaging at TikTok and digital credit engines at MariBank; currently building payment defect automation and deterministic AI workflow platforms at Wise."}
        </p>

        {/* 4. Tech Focus Tags */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5 sm:pt-1 font-telemetry text-[10px] sm:text-[11px] text-muted">
          <span className="font-semibold text-primary">CORE:</span>
          {[
            "Distributed Systems",
            "High Concurrency",
            "AI Workflows",
            "Go",
            "Java 21",
            "Kafka",
            "Redis",
            "Kubernetes",
          ].map((item, idx) => (
            <span
              key={item}
              className={`rounded-[2px] border border-border-plate/60 bg-surface/60 px-1 sm:px-1.5 py-0.5 ${
                idx > 4 ? "hidden sm:inline-block" : "inline-block"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* 5. Action Hub & Downward Indicator */}
        <div className="border-t border-border-plate/40 pt-2.5 sm:pt-4">
          <div className="flex flex-wrap items-center justify-between gap-y-2 sm:gap-y-3">
            <nav
              aria-label={isZh ? "简历与联系方式" : "Resume actions"}
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-telemetry text-xs tracking-wider text-muted"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-ink-dominant underline-offset-4 hover:underline cursor-pointer"
                aria-label={isZh ? "在新标签页打开预览 PDF 简历" : "Open PDF Resume in new tab"}
              >
                <FileText className="h-3.5 w-3.5 opacity-70" />
                <span>{isZh ? "简历 (PDF)" : "RESUME (PDF)"}</span>
              </a>

              <span className="select-none text-muted opacity-40" aria-hidden="true">
                ·
              </span>

              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-ink-dominant underline-offset-4 hover:underline cursor-pointer"
                title={isZh ? "领英个人主页 (LinkedIn)" : "LinkedIn Profile"}
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-3.5 w-3.5 opacity-70" />
                <span>LINKEDIN</span>
              </a>

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

            {onExploreNext && (
              <button
                onClick={onExploreNext}
                type="button"
                className="group inline-flex items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink-dominant cursor-pointer underline-offset-4 hover:underline"
              >
                <span>{isZh ? "下一章 · Wise 核心支付" : "NEXT: WISE · PAYMENTS & AI"}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-y-0.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
