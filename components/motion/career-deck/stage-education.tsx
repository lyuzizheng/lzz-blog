"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";

interface StageEducationProps {
  onScrollToTop?: () => void;
}

/**
 * Act 05 // 教育与起点 (2017 – 2021)
 * 结构化履历条目：NTU 全额卓越奖学金、U-Wave 校园创业（2 万用户 / 4000 DAU）与工程初心。
 */
export function StageEducation({}: StageEducationProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-6 py-8 sm:px-8">
      {/* Faint Typographic Watermark Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 right-0 z-0 select-none overflow-hidden opacity-[0.03] dark:opacity-[0.04]"
      >
        <span className="font-display text-[8rem] font-black uppercase tracking-tighter leading-none text-ink-dominant sm:text-[12rem] md:text-[15rem]">
          NTU
        </span>
      </div>

      <div className="relative z-10 space-y-4 sm:space-y-5">
        {/* 1. Stage Eyebrow & Education Meta */}
        <div className="border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-ink-dominant">
              {isZh ? "05 // 教育背景与起点 · 新加坡 · 2017–2021" : "05 // NTU & EARLY ROOTS · SINGAPORE · 2017–2021"}
            </span>
            <span className="text-[11px] opacity-75">B.ENG (HONORS) · MERIT SCHOLARSHIP</span>
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-primary">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              Nanyang Technological University
            </h2>
            <span className="text-muted opacity-40">·</span>
            <span className="font-telemetry text-xs text-muted">
              {isZh ? "计算机工程学士（荣誉学位）· NTU EEE" : "B.Eng. Honors in Computer Engineering"}
            </span>
          </div>
        </div>

        {/* 2. Educational & Milestone Highlights */}
        <div className="grid grid-cols-3 divide-x divide-border-plate/60 rounded-[2px] border border-border-plate/60 bg-surface/40 py-2.5 text-center">
          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "校园注册用户" : "CAMPUS USERS"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              20,000<span className="text-xs font-normal text-ink-dominant">+</span>
            </div>
            <p className="font-telemetry text-[9px] text-muted">
              {isZh ? "U-Wave 自然增长" : "U-Wave organic"}
            </p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "日活跃用户" : "DAILY ACTIVE"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              4,000<span className="text-xs font-normal text-ink-dominant"> DAU</span>
            </div>
            <p className="font-telemetry text-[9px] text-muted">
              {isZh ? "坡岛高校生活工具" : "campus utility"}
            </p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "全额奖学金" : "SCHOLARSHIP"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-xl">
              100<span className="text-xs font-normal text-ink-dominant">%</span>
            </div>
            <p className="font-telemetry text-[9px] text-muted">
              {isZh ? "南洋卓越奖学金" : "Full Merit Award"}
            </p>
          </div>
        </div>

        {/* 3. Non-AI Grounded Bullets */}
        <ul className="space-y-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "U-Wave 校园社区与实用工具（联合创始人 & 全栈研发）：" : "U-Wave Campus Platform (Co-Founder & Full Stack): "}
              </strong>
              {isZh
                ? "在校期间与校友联合创办坡岛高校移动生活平台，纯自然增长至 20,000 注册大学生与 4,000 日活跃用户（DAU）；使用 Flutter (BLoC) 独立重构全套移动客户端，后端基于 Spring Cloud 设计并落地微服务集群。"
                : "Co-founded campus mobile utility and student community from scratch; scaled organically to 20,000 registered users and 4,000 DAU across Singapore universities. Rebuilt client with Flutter and architected backend with Spring Cloud."}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "南洋理工大学全额科技本科卓越奖学金：" : "NTU Science & Engineering Undergraduate Merit Scholarship: "}
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
                {isZh ? "工程匠心与社会价值：" : "Engineering Craft & Product Agency: "}
              </strong>
              {isZh
                ? "坚信优秀的软件工程师兼具底层分布式系统的严谨掌控力与端到端产品孵化能力；坚守工程伦理，以解决真实痛点、创造社会价值为导向。"
                : "Combines high-concurrency systems craftsmanship with zero-to-one product velocity; committed to engineering ethics and solving real problems that benefit society."}
            </div>
          </li>
        </ul>

        {/* 4. Tech Stack Pills */}
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
    </div>
  );
}
