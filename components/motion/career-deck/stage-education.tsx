"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { ArrowUp } from "lucide-react";

interface StageEducationProps {
  onScrollToTop?: () => void;
}

/**
 * Act 05 // 独立产品与工程起点 (2017 – PRESENT)
 * 结构化履历条目：U-Wave 校园创业（2 万用户 / 4000 DAU）、CanCan 本地优先财务对账、NTU 全额卓越奖学金。
 */
export function StageEducation({ onScrollToTop }: StageEducationProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="relative mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-center px-4 py-2 sm:px-8 sm:py-6 overflow-hidden">
      <div className="relative z-10 space-y-2.5 sm:space-y-4">
        {/* 1. Header & Role (Unified Masthead) */}
        <div className="border-b border-border-plate/60 pb-2 sm:pb-3 font-telemetry">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              {isZh ? "独立产品与工程起点" : "Products & Foundations"}
            </h2>
            <span className="text-[11px] sm:text-xs text-muted tabular-nums">
              2017 – PRESENT · SINGAPORE
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-xs sm:text-sm text-secondary">
            <span className="font-semibold text-ink-dominant">
              {isZh ? "独立全栈开发 / 联合创始人" : "Independent Builder / Co-Founder"}
            </span>
            <span className="text-muted opacity-40">·</span>
            <span className="font-medium text-primary">NTU EEE</span>
            <span className="text-muted opacity-40">·</span>
            <span className="text-muted text-[11px] sm:text-xs">
              {isZh
                ? "U-Wave 校园社区 · CanCan 本地财务对账 · 南洋理工全额卓越奖学金"
                : "U-Wave Campus · CanCan Ledger · NTU Merit Scholarship"}
            </span>
          </div>
        </div>

        {/* 2. Scale & Milestone Metrics Bar */}
        <div className="grid grid-cols-3 divide-x divide-border-plate/60 rounded-[2px] border border-border-plate/60 bg-surface/50 py-2 sm:py-3 text-center">
          <div className="px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "校园注册用户" : "CAMPUS USERS"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
              20,000<span className="text-xs font-normal text-ink-dominant">+</span>
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
              {isZh ? "U-Wave 坡岛高校" : "U-Wave Singapore"}
            </p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "日活跃用户" : "DAILY ACTIVE"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
              4,000<span className="text-xs font-normal text-ink-dominant"> DAU</span>
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
              {isZh ? "纯自然口碑增长" : "100% Organic Growth"}
            </p>
          </div>

          <div className="px-2">
            <span className="font-telemetry text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "全额奖学金" : "SCHOLARSHIP"}
            </span>
            <div className="font-display text-lg font-bold text-primary tabular-nums sm:text-2xl">
              100<span className="text-xs font-normal text-ink-dominant">%</span>
            </div>
            <p className="font-telemetry text-[8px] sm:text-[9px] text-muted">
              {isZh ? "南洋卓越奖学金" : "Full Merit Award"}
            </p>
          </div>
        </div>

        {/* 3. Battle Modules: Personal Products & NTU Roots */}
        <ul className="space-y-2.5 font-body text-xs sm:text-sm leading-relaxed text-secondary">
          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "uWave 校园社交与实用工具（联合创始人 & 全栈研发）：" : "uWave Campus Community & Utility (Co-Founder & Full Stack): "}
              </strong>
              {isZh
                ? "在校期间与校友联合创办坡岛高校移动生活平台，纯自然增长至 20,000+ 注册大学生与 4,000 日活跃用户（DAU）；使用 Flutter (BLoC) 独立重构全套移动客户端，后端基于 Spring Cloud 微服务架构设计，平稳支撑选课与二手交易瞬时流量高峰。"
                : "Co-founded campus mobile utility and student community from scratch; scaled organically to 20,000+ registered users and 4,000 DAU across Singapore universities. Rebuilt client with Flutter and architected backend with Spring Cloud microservices."}
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "CanCan 独立财务凭证与自动对账平台（Creator & Sole Developer）：" : "CanCan Local-First Financial Vault (Creator & Sole Developer): "}
              </strong>
              {isZh
                ? "面向独立经营者与自由职业者的自动化凭证与智能对账平台；基于 Tauri v2 + Rust + SQLCipher + React 19 构建 Local-first 本地优先架构，结合微型 LLM 账单解析与确定性复式记账勾稽引擎，全本地加密保护用户财务隐私。"
                : "Local-first financial vault for indie builders and freelancers. Engineered with Tauri v2, Rust, SQLCipher, and React 19; features local LLM invoice parsing and deterministic double-entry reconciliation with end-to-end local encryption."}
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dominant" />
            <div>
              <strong className="font-semibold text-primary">
                {isZh ? "南洋理工大学全额科技本科卓越奖学金（NTU B.Eng Honors）：" : "NTU Science & Engineering Undergraduate Merit Scholarship: "}
              </strong>
              {isZh
                ? "荣获新加坡南洋理工大学全额本科荣誉奖学金（Full Merit Scholarship，覆盖 100% 学费与全额生活津贴），在计算机体系结构、分布式系统、操作系统内核与算法理论领域打下深厚工程底座。"
                : "Recipient of the Full NTU Science and Engineering Undergraduate Merit Scholarship (100% tuition + living stipends) with deep engineering foundations in distributed systems, OS kernels, and networking protocols."}
            </div>
          </li>
        </ul>

        {/* 4. Action Hub & Top Indicator */}
        <div className="border-t border-border-plate/40 pt-2.5 sm:pt-4">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 font-telemetry text-xs tracking-wider text-muted transition-colors hover:text-ink-dominant underline-offset-4 hover:underline"
            >
              <span>{isZh ? "浏览独立产品展厅 (/products) ↗" : "VIEW PRODUCTS EXHIBITION (/products) ↗"}</span>
            </Link>

            {onScrollToTop && (
              <button
                onClick={onScrollToTop}
                type="button"
                className="group inline-flex items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink-dominant cursor-pointer underline-offset-4 hover:underline"
              >
                <span>{isZh ? "返回顶部 · Lyu Zizheng" : "BACK TO TOP"}</span>
                <ArrowUp className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
