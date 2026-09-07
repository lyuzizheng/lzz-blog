"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Download, Mail, Rocket, ChevronDown, Printer } from "lucide-react";

interface StageHeroProps {
  onExploreNext: () => void;
}

/**
 * Act 0 // 大学时期 (2017 – 2021)
 * 写作风个人叙事：从大学时期嫌学校东西太烂，到 U-Wave 校园创业与单兵作战。
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
    <div className="mx-auto flex h-full w-full max-w-2xl lg:max-w-3xl flex-col justify-between px-6 py-8 sm:px-8 sm:py-10">
      {/* 1. Quiet Minimalist Eyebrow */}
      <div className="flex items-center justify-between border-b border-border-plate/60 pb-3 font-telemetry text-xs uppercase tracking-widest text-muted">
        <span className="font-semibold text-cobalt">
          {isZh ? "01 // 大学与起点 · 2017–2021" : "01 // ORIGIN & U-WAVE · 2017–2021"}
        </span>
        <span className="text-[11px] opacity-75">NTU SINGAPORE · B.ENG</span>
      </div>

      {/* 2. Editorial Statement & Essay Narrative */}
      <div className="my-auto py-4 space-y-4">
        <h1 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">
          {isZh ? "嫌学校东西太烂，所以自己造" : "Building What Was Missing"}
        </h1>

        {/* Quiet sub-quote for philosophy */}
        <blockquote className="border-l-2 border-cobalt/40 pl-3.5 font-serif text-xs italic leading-relaxed text-muted sm:text-sm">
          &ldquo;A results-driven engineer with a passion for user-centric craftsmanship.
          Excels in taking products from zero to one. More importantly, values engineering ethic and believes good software products must do good to societies.&rdquo;
        </blockquote>

        {/* Natural Essay Text */}
        <div className="space-y-3 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
          <p>
            {isZh
              ? "拿了全额奖学金来到 NTU 计算机工程系。大学那几年，我最大的冲动不是为了刷履历去比赛，而是纯粹觉得学校官方的系统和社区体验太差了——反应慢、设计粗糙、谁用谁难受。我觉得工程师就该有这种“看不得烂东西”的脾气，既然没人改，那我就在业余时间自己动手做一个给全校人用。"
              : "Entered NTU on a full merit scholarship. In college, my biggest drive was never gaming resume bullets, but pure annoyance with our university's official tools and campus forums—sluggish, clunky, and exhausting to use. I believed an engineer should have the intolerance for broken software: if nobody fixes it, I will build a proper one myself in my spare time."}
          </p>

          <p>
            {isZh
              ? "我和朋友一起从零折腾了 U-Wave。我用 Flutter 把客户端整个重构了一遍，后端自己用 Spring Cloud 搭建微服务。白天上课，晚上写代码。当看到它在坡岛各个高校慢慢传开，一路跑出 20,000 注册用户和 4,000 日活（DAU），看到身边的同学都在真实用自己敲出来的产品，那种纯粹的成就感比什么都开心。"
              : "Co-founded U-Wave from scratch with friends. I overhauled the entire client with Flutter and designed backend microservices using Spring Cloud. Classes by day, coding by night. Seeing it spread organically across Singapore universities to 20,000 registered users and 4,000 DAU—watching classmates actually rely on something I engineered—was more exhilarating than any trophy."}
          </p>

          <p>
            {isZh
              ? "毕业时现实很清醒：作为国际生要留在新加坡、要拿 EP 工作准证，不能全职任性赌命；而且我也学到了深刻的一课——绝不该对纯校园工具过早强行商业化，走不通商业化的工具硬去变现只会透支用户信任。大学画上句号，带着对真实工业级系统的敬畏，我迈进了大厂。"
              : "Graduation brought cold reality: as an international student, survival came first—I needed a solid job and an Employment Pass (EP) to stay in Singapore. U-Wave also taught me an indelible lesson: never rush premature monetization on a campus utility. When unit economics do not fit the domain, forcing monetization only burns user trust. With college behind me, I stepped into big tech."}
          </p>
        </div>

        {/* Action Hub */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-[2px] shadow-plate">
            <a
              href="/resume.pdf"
              download="Zizheng-Lyu-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-l-[2px] border border-cobalt bg-cobalt px-3.5 py-1.5 font-telemetry text-xs font-medium text-text-badge transition-all hover:opacity-90"
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
            className="inline-flex items-center gap-2 rounded-[2px] border border-border-plate/80 bg-surface/80 px-3.5 py-1.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Mail className="h-3.5 w-3.5 text-cobalt" />
            <span>{isZh ? "邮件联系" : "CONTACT"}</span>
          </a>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-[2px] border border-border-plate/80 bg-surface/80 px-3.5 py-1.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Rocket className="h-3.5 w-3.5 text-terracotta" />
            <span>{isZh ? "独立产品" : "SIDE PRODUCTS"}</span>
          </Link>
        </div>
      </div>

      {/* 3. Subtle Downward Indicator */}
      <div className="flex flex-col items-center">
        <button
          onClick={onExploreNext}
          type="button"
          className="group flex flex-col items-center gap-1 font-telemetry text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-primary cursor-pointer"
          aria-label="Proceed to ByteDance"
        >
          <span>{isZh ? "向下滑动 · 字节跳动" : "PROCEED TO BYTEDANCE"}</span>
          <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
