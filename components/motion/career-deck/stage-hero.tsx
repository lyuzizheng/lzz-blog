"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Download, Mail, Rocket, Printer, ArrowUp, ChevronDown } from "lucide-react";

interface StageHeroProps {
  onScrollToTop?: () => void;
  onExploreNext?: () => void;
}

/**
 * Act 04 // 大学与起点 (2017 – 2021)
 * 结构化履历条目：NTU 全额奖学金、U-Wave 校园创业（2 万用户 / 4000 DAU）与工程伦理宣言。
 */
export function StageHero({ onScrollToTop, onExploreNext }: StageHeroProps) {
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
      {/* 1. Stage Eyebrow & Education Meta */}
      <div className="border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-ink-dominant">
            {isZh ? "04 // 教育与起点 · 新加坡 · 2017–2021" : "04 // NTU & EARLY ROOTS · SINGAPORE · 2017–2021"}
          </span>
          <span className="text-[11px] opacity-75">B.ENG (HONORS) · MERIT SCHOLARSHIP</span>
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            Nanyang Technological University
          </h2>
          <span className="font-telemetry text-xs text-muted">
            {isZh ? "计算机工程学士（荣誉学位）" : "B.Eng. Honors in Computer Engineering"}
          </span>
          <span className="text-muted opacity-40">·</span>
          <span className="font-telemetry text-xs text-muted">NTU EEE</span>
        </div>
      </div>

      {/* 2. Core Bullet Points */}
      <div className="my-auto py-2 space-y-4">
        {/* Core Philosophy Statement */}
        <blockquote className="border-l-2 border-ink-dominant/50 pl-3.5 font-serif text-xs italic leading-relaxed text-muted sm:text-sm">
          &ldquo;A results-driven engineer with a passion for user-centric craftsmanship.
          Excels in taking products from zero to one. More importantly, values engineering ethic and believes good software products must do good to societies.&rdquo;
        </blockquote>

        {/* Structured Experience Bullets */}
        <ul className="space-y-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "U-Wave 校园社区与实用工具（联合创始人 & 全栈研发）：" : "U-Wave Campus Platform (Co-Founder & Full Stack): "}
              </strong>
              {isZh
                ? "从零与校友共同创办坡岛高校移动生活平台，纯自然增长至 20,000 注册大学生与 4,000 日活跃用户（DAU）；用 Flutter (BLoC) 独立重构全套移动端，后端基于 Spring Cloud 设计微服务集群。"
                : "Co-founded campus mobile utility and student community from scratch; scaled organically to 20,000 registered users and 4,000 DAU across Singapore universities. Rebuilt client with Flutter and architected backend with Spring Cloud."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "NTU 全额科技本科卓越奖学金：" : "NTU Science & Engineering Undergraduate Merit Scholarship: "}
              </strong>
              {isZh
                ? "荣获南洋理工大学全额本科荣誉奖学金（Full Merit Scholarship），在计算机体系结构、分布式系统、操作系统内核与算法理论领域打下深厚工程底座。"
                : "Recipient of the Full NTU Science and Engineering Undergraduate Merit Scholarship with deep foundations in distributed systems, OS kernels, and networking protocols."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "端到端产品创造力与折腾精神：" : "Zero-to-One Product Craftsmanship: "}
              </strong>
              {isZh
                ? "秉持“Never Settle（不将就）”的工程师品格：兼具底层分布式高并发技术沉淀与端到端产品孵化能力，热衷于用可靠代码交付可量化的真实社会与商业价值。"
                : "Values product agency and rapid zero-to-one velocity: combines high-concurrency systems craftsmanship with solo product velocity to solve real user problems."}
            </div>
          </li>
        </ul>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 font-telemetry text-[11px] text-muted">
          <span className="font-semibold text-primary">STACK:</span>
          {["Flutter", "Dart", "Java", "Spring Cloud", "MySQL", "Redis", "Distributed Systems"].map((tech) => (
            <span
              key={tech}
              className="rounded-[2px] border border-border-plate/60 bg-surface/60 px-1.5 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Action Hub & Return to Top */}
      <div className="border-t border-border-plate/40 pt-3">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          {/* Action Hub — 对齐首页工作台 (Atelier) 的排版风格 */}
          <nav
            aria-label="Resume actions"
            className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-telemetry text-xs tracking-wider text-muted"
          >
            {onScrollToTop && (
              <>
                <button
                  onClick={onScrollToTop}
                  type="button"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-ink-dominant underline-offset-4 hover:underline cursor-pointer"
                >
                  <ArrowUp className="h-3.5 w-3.5 opacity-70" />
                  <span>{isZh ? "回到 Wise" : "RETURN TO WISE"}</span>
                </button>
                <span className="select-none text-muted opacity-40" aria-hidden="true">
                  ·
                </span>
              </>
            )}

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

          {/* Return to top indicator button */}
          {onScrollToTop && (
            <button
              onClick={onScrollToTop}
              type="button"
              className="group inline-flex items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink-dominant cursor-pointer underline-offset-4 hover:underline"
            >
              <span>{isZh ? "回至篇首 · Wise" : "TOP: WISE (IC3)"}</span>
              <ArrowUp className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5" />
            </button>
          )}

          {/* Fallback exploration link if rendered with onExploreNext */}
          {!onScrollToTop && onExploreNext && (
            <button
              onClick={onExploreNext}
              type="button"
              className="group inline-flex items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink-dominant cursor-pointer underline-offset-4 hover:underline"
            >
              <span>{isZh ? "进入下一章" : "NEXT STAGE"}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-y-0.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
