import type { Metadata } from "next";
import Link from "next/link";
import { FlightPathTimeline } from "@/components/motion/flight-path";

export const metadata: Metadata = {
  title: "航线履历 · Flight Path | LZZ Blog",
  description:
    "Zizheng Lyu 交互式生涯与成果航线图：NTU 地基层 → TikTok IM 全球心跳 → 降本刀锋 → 车库暗房。键盘定帧，战役简报抽屉。",
};

export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 flex items-center justify-between font-telemetry text-[11px] text-muted">
        <Link href="/" className="hover:text-primary">
          ← LZZ ATELIER
        </Link>
        <span className="tracking-[0.14em]">RESUME // FLIGHT PATH DOSSIER</span>
      </nav>
      <FlightPathTimeline />
      <footer className="mt-12 border-t border-border-plate pt-4 font-telemetry text-[11px] text-muted">
        数据源 docs/CAREER_DOSSIER.md · lib/career-dossier.ts —— 无数字不编数字，TBD 指标待 owner 确认。
      </footer>
    </div>
  );
}
