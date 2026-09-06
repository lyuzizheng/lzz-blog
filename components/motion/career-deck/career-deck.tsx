"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Download, Mail, Rocket, ArrowUp, Printer } from "lucide-react";

/**
 * BRAWUKA-93 · CareerDeck (Re-architected)
 *
 * Minimalist, human-crafted Career Experience matching the Homepage & Posts language:
 * - max-w-2xl central column with generous breathing margins
 * - Darkroom easel light-table frames with precision hairline ruler ticks & crosshairs
 * - Integrated Masthead: Authentic engineering statement + 3 primary action badges
 * - Chapter 01: Wise · Product + Impact Matters More (30k+ cases/mo, 98%+, £80k/mo)
 * - Chapter 02: MariBank + Bondee · Dynamic + Exploration (Vector+Kafka, Banking Core)
 * - Chapter 03: ByteDance / TikTok IM · Foundation with Huge Responsibility (20+ Go Svcs, Multi-DC Sync)
 * - Keyboard shortcuts: 1, 2, 3 jump to chapters, Home returns to top
 */
export function CareerDeck() {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";

  const chapter1Ref = useRef<HTMLElement>(null);
  const chapter2Ref = useRef<HTMLElement>(null);
  const chapter3Ref = useRef<HTMLElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Keyboard navigation shortcuts (1, 2, 3, Home)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "1") {
        e.preventDefault();
        scrollToRef(chapter1Ref);
      } else if (e.key === "2") {
        e.preventDefault();
        scrollToRef(chapter2Ref);
      } else if (e.key === "3") {
        e.preventDefault();
        scrollToRef(chapter3Ref);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToTop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      {/* ========================================================================= */}
      {/* 1. Integrated Masthead (Statement + Action Hub)                          */}
      {/* ========================================================================= */}
      <section
        aria-label="Career Masthead"
        className="relative overflow-hidden rounded-[4px] border border-[var(--ink-faint)] bg-surface/60 p-5 shadow-[var(--shadow-plate)] backdrop-blur-xs sm:p-7"
      >
        {/* Inner subtle frame & registration crosshair */}
        <div className="pointer-events-none absolute inset-1 rounded-[2px] border border-dashed border-[var(--ink-faint)] opacity-40" />
        <div className="pointer-events-none absolute bottom-2 right-2 flex h-3.5 w-3.5 items-center justify-center text-[var(--ink-faint)] opacity-60">
          <span className="absolute h-full w-[1px] bg-current" />
          <span className="absolute h-[1px] w-full bg-current" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Avatar matching homepage */}
          <Image
            src="/avatar.jpg"
            alt="Zizheng Lyu"
            width={64}
            height={64}
            priority
            className="rounded-full border border-border-plate object-cover shadow-[var(--shadow-plate)]"
            style={{ width: 64, height: 64 }}
          />

          <p className="mt-3 font-telemetry text-[11px] uppercase tracking-[0.24em] text-muted">
            {isZh ? "经历航线与工程实录" : "CAREER CHRONICLES & FLIGHT PATH"}
          </p>

          <h1 className="mt-1.5 font-display text-2xl font-normal tracking-tight text-primary sm:text-3xl">
            {isZh ? "自正的工程师历程与战役实录" : "Zizheng Lyu — Flight Path"}
          </h1>

          {/* Authentic Core Statement */}
          <blockquote className="mt-3 max-w-xl font-serif text-sm italic leading-relaxed text-secondary sm:text-base sm:leading-relaxed">
            &ldquo;A results-driven full-stack engineer with a passion for user-centric product development.
            Proactive in fostering a cooperative team environment and mentoring new talent.
            Excels in guiding projects from conception to successful completion.
            More importantly, values engineering ethic and believes good software products must do good to societies.&rdquo;
          </blockquote>

          {/* Action Hub */}
          <nav
            aria-label="Resume quick actions"
            className="mt-5 flex flex-wrap items-center justify-center gap-2.5 font-telemetry text-xs"
          >
            {/* Download PDF + Print */}
            <div className="inline-flex items-center rounded-xs shadow-plate">
              <a
                href="/resume.pdf"
                download="Zizheng-Lyu-Resume.pdf"
                className="inline-flex items-center gap-1.5 rounded-l-xs border border-cobalt bg-cobalt px-3 py-1.5 font-telemetry text-xs font-medium text-text-badge transition-all hover:opacity-90"
              >
                <Download className="h-3 w-3" />
                <span>{isZh ? "下载 PDF 简历" : "DOWNLOAD RESUME"}</span>
              </a>
              <button
                onClick={handlePrint}
                type="button"
                className="inline-flex items-center border border-l-0 border-cobalt bg-cobalt/85 px-2 py-1.5 text-text-badge transition-all hover:bg-cobalt"
                title={isZh ? "打印/导出 A4 简历" : "Print A4 Resume"}
                aria-label={isZh ? "打印/导出 A4 简历" : "Print A4 Resume"}
              >
                <Printer className="h-3 w-3" />
              </button>
            </div>

            {/* Email */}
            <a
              href="mailto:lvzizhengde@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-xs border border-border-plate bg-surface px-3 py-1.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
            >
              <Mail className="h-3 w-3 text-cobalt" />
              <span>{isZh ? "邮件联系" : "EMAIL"}</span>
            </a>

            {/* Side Projects */}
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 rounded-xs border border-border-plate bg-surface px-3 py-1.5 font-telemetry text-xs font-medium text-primary shadow-plate transition-colors hover:border-cobalt hover:text-cobalt"
            >
              <Rocket className="h-3 w-3 text-terracotta" />
              <span>{isZh ? "独立产品雷达" : "PRODUCTS"}</span>
            </Link>
          </nav>

          {/* Mini Chapter Index Row */}
          <div className="mt-4 flex items-center gap-2 font-telemetry text-[11px] text-muted">
            <span className="opacity-50">{isZh ? "直达章节：" : "JUMP:"}</span>
            <button
              onClick={() => scrollToRef(chapter1Ref)}
              className="hover:text-cobalt transition-colors underline-offset-4 hover:underline"
            >
              01. WISE
            </button>
            <span className="opacity-30">·</span>
            <button
              onClick={() => scrollToRef(chapter2Ref)}
              className="hover:text-cobalt transition-colors underline-offset-4 hover:underline"
            >
              02. MARIBANK &amp; BONDEE
            </button>
            <span className="opacity-30">·</span>
            <button
              onClick={() => scrollToRef(chapter3Ref)}
              className="hover:text-cobalt transition-colors underline-offset-4 hover:underline"
            >
              03. BYTEDANCE
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. Chapter 01: Wise (2024 – Present)                                     */}
      {/* ========================================================================= */}
      <section
        ref={chapter1Ref}
        aria-label="Wise Experience"
        className="relative rounded-[4px] border border-[var(--ink-faint)] bg-surface/50 p-5 shadow-[var(--shadow-plate)] backdrop-blur-xs sm:p-7"
      >
        {/* Top telemetry rule */}
        <div className="flex items-center justify-between border-b border-border-plate pb-2 font-telemetry text-[11px] uppercase tracking-wider text-muted">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cobalt">CHAPTER 01</span>
            <span className="text-border-plate">|</span>
            <span>WISE</span>
          </div>
          <span>2024 – PRESENT</span>
        </div>

        {/* Title & Tagline */}
        <div className="mt-4">
          <h2 className="font-display text-xl font-bold tracking-tight text-primary sm:text-2xl">
            Product + Impact Matters More
          </h2>
          <p className="mt-0.5 font-telemetry text-xs tracking-wider text-muted">
            {isZh ? "技术为业务服务 · AI 工作流平台与降本提效" : "AI Workflow Platform · Payment Defects Group"}
          </p>

          <p className="mt-3 rounded-xs border-l-2 border-cobalt bg-chamber/30 p-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
            {isZh
              ? "在 Wise 建立的核心工程心智：技术永远是为业务服务的。在有限的工程资源与时间窗口内，科学拆解优先级、统筹团队规划，以 Impact 最大化为唯一北极星，坚决抵制自嗨与拍脑门盲目立项。"
              : "Core engineering mindset: Technology is always in service of business. Prioritizing ruthlessly within tight windows, maximizing measurable impact as the sole North Star, and resisting ungrounded vanity projects."}
          </p>
        </div>

        {/* Quantified Battle Stat Strip */}
        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
          <div className="rounded-xs border border-border-plate bg-surface p-3">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "月自动化处理" : "MONTHLY AUTOMATION"}
            </span>
            <div className="mt-1 font-display text-2xl font-bold text-primary tabular-nums">
              30,000<span className="text-lg text-cobalt">+</span>
            </div>
            <p className="mt-0.5 font-body text-[11px] text-muted">
              {isZh ? "cases / 月全自动流转" : "cases/mo automated"}
            </p>
          </div>

          <div className="rounded-xs border border-border-plate bg-surface p-3">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-muted">
              {isZh ? "核验匹配率" : "MATCHING ACCURACY"}
            </span>
            <div className="mt-1 font-display text-2xl font-bold text-primary tabular-nums">
              98<span className="text-lg text-cobalt">%+</span>
            </div>
            <p className="mt-0.5 font-body text-[11px] text-muted">
              {isZh ? "最后一公里资金核验" : "Last-mile linking accuracy"}
            </p>
          </div>

          <div className="rounded-xs border border-cobalt/30 bg-surface p-3">
            <span className="font-telemetry text-[10px] uppercase tracking-wider text-cobalt font-semibold">
              {isZh ? "直接商业价值" : "DIRECT VALUE"}
            </span>
            <div className="mt-1 font-display text-2xl font-bold text-primary tabular-nums">
              £80,000<span className="text-xs font-normal text-muted">/mo</span>
            </div>
            <p className="mt-0.5 font-body text-[11px] text-muted">
              {isZh ? "年化节省近百万英镑" : "Annualized ~£1.0M savings"}
            </p>
          </div>
        </div>

        {/* Deliverables detail */}
        <div className="mt-4 rounded-xs border border-border-plate/60 bg-surface/40 p-3 font-body text-xs leading-relaxed text-secondary">
          <p>
            {isZh
              ? "主导设计并落地贯穿整个 PayOps 运营线的 AI Workflow Platform + AI Infra 底座，首批 Onboard 最后一公里资金交易核验匹配场景（Last-mile linking scenario）。端到端保障资金安全（Security）、全链路可审计追踪（Auditability）以及高精度可观测性（Observability），具备长青迭代能力。"
              : "Led design and rollout of the AI Workflow Platform + AI Infra across Wise PayOps, onboarding the critical last-mile payment linking scenario with end-to-end security, auditability, and observability."}
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. Chapter 02: MariBank + Bondee (2023 – 2024)                           */}
      {/* ========================================================================= */}
      <section
        ref={chapter2Ref}
        aria-label="MariBank and Bondee Experience"
        className="relative rounded-[4px] border border-[var(--ink-faint)] bg-surface/50 p-5 shadow-[var(--shadow-plate)] backdrop-blur-xs sm:p-7"
      >
        {/* Top telemetry rule */}
        <div className="flex items-center justify-between border-b border-border-plate pb-2 font-telemetry text-[11px] uppercase tracking-wider text-muted">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cobalt">CHAPTER 02</span>
            <span className="text-border-plate">|</span>
            <span>MARIBANK · BONDEE</span>
          </div>
          <span>2023 – 2024</span>
        </div>

        {/* Title & Tagline */}
        <div className="mt-4">
          <h2 className="font-display text-xl font-bold tracking-tight text-primary sm:text-2xl">
            Dynamic + Exploration
          </h2>
          <p className="mt-0.5 font-telemetry text-xs tracking-wider text-muted">
            {isZh ? "跳出舒适圈 · 云原生运维与金融后端架构" : "Cloud-Native DevOps & Digital Banking Backend"}
          </p>

          <p className="mt-3 rounded-xs border-l-2 border-cobalt bg-chamber/30 p-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
            {isZh
              ? "2024 年主动跳出字节跳动的大厂舒适圈，以极客的敏锐度探索完全未知的技术栈与垂直行业。"
              : "Actively stepped out of the big-tech comfort zone in 2024, venturing into cloud-native infrastructure, high-throughput observability, and regulated banking architecture."}
          </p>
        </div>

        {/* Dual Battle Blocks */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {/* Bondee */}
          <div className="rounded-xs border border-border-plate bg-surface p-4">
            <div className="flex items-center justify-between border-b border-border-plate pb-1.5 font-telemetry text-[11px] uppercase text-cobalt font-semibold">
              <span>BONDEE // DEVOPS &amp; K8S</span>
              <span className="text-muted font-normal">SG SWE #01</span>
            </div>
            <h3 className="mt-2.5 font-display text-sm font-bold text-primary sm:text-base">
              {isZh ? "云原生与全自研高性能日志管线" : "Cloud-Native Logging Pipeline"}
            </h3>
            <p className="mt-1.5 font-body text-xs leading-relaxed text-secondary">
              {isZh
                ? "深度掌握 DevOps、K8s 容器编排平台与高吞吐可观测性基础设施。主导重构并彻底替换掉笨重昂贵的 ELK Stack，基于 DaemonSet + Disk Mount + Vector + Kafka 构建全自研高性能日志收集与导出管线，显著缩减云资源账单。"
                : "Mastered DevOps, K8s orchestration, and observability infra. Replaced expensive managed ELK, engineering a self-hosted pipeline via DaemonSet + Disk Mount + Vector + Kafka, significantly cutting cloud costs."}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 font-telemetry text-[10px] text-muted">
              <span className="rounded-xs border border-border-plate bg-chamber/50 px-1.5 py-0.5">Vector + Kafka</span>
              <span className="rounded-xs border border-border-plate bg-chamber/50 px-1.5 py-0.5">DaemonSet Mount</span>
              <span className="rounded-xs border border-cobalt/30 bg-cobalt/10 px-1.5 py-0.5 text-cobalt">大幅缩减云账单</span>
            </div>
          </div>

          {/* MariBank */}
          <div className="rounded-xs border border-border-plate bg-surface p-4">
            <div className="flex items-center justify-between border-b border-border-plate pb-1.5 font-telemetry text-[11px] uppercase text-terracotta font-semibold">
              <span>MARIBANK // BANKING CORE</span>
              <span className="text-muted font-normal">LOAN DIVISION</span>
            </div>
            <h3 className="mt-2.5 font-display text-sm font-bold text-primary sm:text-base">
              {isZh ? "合规数字银行金融后端架构" : "Digital Banking Core"}
            </h3>
            <p className="mt-1.5 font-body text-xs leading-relaxed text-secondary">
              {isZh
                ? "全面切入新加坡合规数字银行严格的金融后端架构体系。在信贷业务线（Cashloan + SME Termloan）深入实践了分布式交易一致性、防并发重放、长周期计息与高标准风控工程。"
                : "Immersed in Singapore regulated digital banking backend architecture. In the Loan Division (Cashloan & SME Termloan), engineered distributed consistency, anti-replay idempotency, and long-cycle interest calculation risk SDLC."}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 font-telemetry text-[10px] text-muted">
              <span className="rounded-xs border border-border-plate bg-chamber/50 px-1.5 py-0.5">分布式一致性</span>
              <span className="rounded-xs border border-border-plate bg-chamber/50 px-1.5 py-0.5">幂等防重放</span>
              <span className="rounded-xs border border-terracotta/30 bg-terracotta/10 px-1.5 py-0.5 text-terracotta">信贷计息风控</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. Chapter 03: ByteDance / TikTok IM (2021 – 2023)                       */}
      {/* ========================================================================= */}
      <section
        ref={chapter3Ref}
        aria-label="ByteDance and TikTok IM Experience"
        className="relative rounded-[4px] border border-[var(--ink-faint)] bg-surface/50 p-5 shadow-[var(--shadow-plate)] backdrop-blur-xs sm:p-7"
      >
        {/* Top telemetry rule */}
        <div className="flex items-center justify-between border-b border-border-plate pb-2 font-telemetry text-[11px] uppercase tracking-wider text-muted">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cobalt">CHAPTER 03</span>
            <span className="text-border-plate">|</span>
            <span>BYTEDANCE · TIKTOK IM</span>
          </div>
          <span>2021 – 2023</span>
        </div>

        {/* Title & Tagline */}
        <div className="mt-4">
          <h2 className="font-display text-xl font-bold tracking-tight text-primary sm:text-2xl">
            Foundation with Huge Responsibility
          </h2>
          <p className="mt-0.5 font-telemetry text-xs tracking-wider text-muted">
            {isZh ? "大厂高并发基石 · 亿级消息通信与全球化多活同步" : "High-Concurrency Foundation · Central Product Platform"}
          </p>

          <p className="mt-3 rounded-xs border-l-2 border-cobalt bg-chamber/30 p-2.5 font-body text-xs leading-relaxed text-secondary sm:text-sm sm:leading-relaxed">
            {isZh
              ? "字节跳动中台产品研发中心（Central Product Platform），扛起超大规模全球流量冲击的基石责任与工程纪律。"
              : "Central Product Platform at ByteDance: bearing the heavy engineering responsibility and discipline of global-scale traffic, ensuring resilience across distributed multi-datacenter meshes."}
          </p>
        </div>

        {/* 4 Core Facts Grid */}
        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
          <div className="rounded-xs border border-border-plate bg-surface p-3">
            <div className="flex items-center justify-between font-telemetry text-[10px] uppercase text-muted">
              <span>MICROSERVICES</span>
              <span className="text-cobalt font-semibold">20+ SVC</span>
            </div>
            <h3 className="mt-1 font-display text-sm font-bold text-primary">
              {isZh ? "微服务高可用矩阵" : "Microservices HA"}
            </h3>
            <p className="mt-1 font-body text-[11px] leading-relaxed text-muted">
              {isZh
                ? "独立维护 20+ 个 Go 微服务，扛住全球海量瞬时并发峰值，保障 TikTok IM 核心链路全球 7×24 Oncall 稳定运行。"
                : "Independently maintained 20+ Go microservices, handling global instantaneous traffic spikes with 7×24 oncall."}
            </p>
          </div>

          <div className="rounded-xs border border-border-plate bg-surface p-3">
            <div className="flex items-center justify-between font-telemetry text-[10px] uppercase text-muted">
              <span>MULTI-DC SYNC</span>
              <span className="text-cobalt font-semibold">MS-LEVEL</span>
            </div>
            <h3 className="mt-1 font-display text-sm font-bold text-primary">
              {isZh ? "多数据中心跨洋同步" : "Multi-Datacenter Sync"}
            </h3>
            <p className="mt-1 font-body text-[11px] leading-relaxed text-muted">
              {isZh
                ? "主导建设 Multi-datacenter Synchronization 机制，实现跨洋多活数据中心间的无缝毫秒级同步体验。"
                : "Led multi-datacenter synchronization mechanism, achieving seamless cross-ocean ms-level active-active sync."}
            </p>
          </div>

          <div className="rounded-xs border border-border-plate bg-surface p-3">
            <div className="flex items-center justify-between font-telemetry text-[10px] uppercase text-muted">
              <span>DIAGNOSTICS</span>
              <span className="text-terracotta font-semibold">HOURS → SECS</span>
            </div>
            <h3 className="mt-1 font-display text-sm font-bold text-primary">
              {isZh ? "自动化排障工具" : "Automated Tooling"}
            </h3>
            <p className="mt-1 font-body text-[11px] leading-relaxed text-muted">
              {isZh
                ? "设计并自研消息丢包自动排障工具，将过去需要半天排查的复杂丢包定位缩减至秒级全自动诊断。"
                : "Engineered automated message loss diagnostic tool, cutting complex manual investigation from half a day to seconds."}
            </p>
          </div>

          <div className="rounded-xs border border-border-plate bg-surface p-3">
            <div className="flex items-center justify-between font-telemetry text-[10px] uppercase text-muted">
              <span>LEADERSHIP</span>
              <span className="text-cobalt font-semibold">SPOT BONUS</span>
            </div>
            <h3 className="mt-1 font-display text-sm font-bold text-primary">
              {isZh ? "新人导师与技术突破" : "Mentorship & IP Geo"}
            </h3>
            <p className="mt-1 font-body text-[11px] leading-relaxed text-muted">
              {isZh
                ? "在 Location 业务线单人建立起新加坡团队标准基底（CI/CD、离线/在线任务告警体系），带领实习生进行 ASEAN IP 精度突破并荣获团队 Spot Bonus。"
                : "Established Singapore team foundation (CI/CD, alerts), mentored interns to ASEAN IP precision breakthroughs; won Spot Bonus."}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. Closing Footer Bar                                                     */}
      {/* ========================================================================= */}
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border-plate pt-4 font-telemetry text-xs text-muted">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
        >
          <ArrowUp className="h-3 w-3" />
          <span>{isZh ? "回到顶部" : "RETURN TO TOP"}</span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download="Zizheng-Lyu-Resume.pdf"
            className="transition-colors hover:text-cobalt underline-offset-4 hover:underline"
          >
            {isZh ? "下载 A4 PDF 简历" : "DOWNLOAD A4 PDF"}
          </a>
          <span className="opacity-30">·</span>
          <Link
            href="/products"
            className="transition-colors hover:text-terracotta underline-offset-4 hover:underline"
          >
            {isZh ? "独立产品雷达" : "PRODUCTS RADAR"}
          </Link>
        </div>
      </footer>
    </div>
  );
}
