import type { Metadata } from "next";
import Link from "next/link";
import { FlightPathTimeline } from "@/components/motion/flight-path";
import { ResumeDossier, ResumePrint, PrintResumeButton, DownloadResumeButton } from "@/components/motion/resume";
import { SiteHeader, SiteFooter } from "@/components/site";
export const metadata: Metadata = {
  title: "航线履历 · Flight Path | LZZ Blog",
  description:
    "Zizheng Lyu 交互式生涯与成果航线图：NTU 地基层 → TikTok IM 全球心跳 → 降本刀锋 → 车库暗房。键盘定帧，战役简报抽屉。",
};

export default function ResumePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <nav className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 font-telemetry text-[11px] text-muted">
        <Link href="/" className="hover:text-primary">
          ← LZZ ATELIER
        </Link>
        <span className="flex flex-wrap items-center gap-2">
          <span className="mr-1 hidden tracking-[0.14em] sm:inline">RESUME // FLIGHT PATH DOSSIER</span>
          <DownloadResumeButton />
          <PrintResumeButton />
        </span>
      </nav>
      <div className="no-print">
        <FlightPathTimeline />
      </div>

      <section className="no-print mt-16" aria-label="Capability dossier">
        <div className="mb-6 flex items-center justify-between border-b border-border-plate pb-3">
          <h2 className="font-display text-2xl font-semibold text-primary">
            Capability Dossier
          </h2>
          <span className="font-telemetry text-xs text-muted">
            {"// INTERACTIVE · SCREEN ONLY"}
          </span>
        </div>
        <ResumeDossier />
      </section>

      <ResumePrint />

      <footer className="no-print mt-12 border-t border-border-plate pt-4 font-telemetry text-[11px] text-muted">
        数据源 docs/CAREER_DOSSIER.md · lib/career-dossier.ts —— 无数字不编数字，TBD 指标待 owner 确认。
      </footer>
      </div>
      <SiteFooter />
    </div>
  );
}
