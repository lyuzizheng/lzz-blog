import type { Metadata } from "next";
import { FlightPathTimeline } from "@/components/motion/flight-path";
import {
  ResumeDossier,
  ResumePrint,
  PrintResumeButton,
  DownloadResumeButton,
  ResumeNav,
  CapabilityHeader,
  ResumeFooterNote,
} from "@/components/motion/resume";
import { SiteHeader, SiteFooter } from "@/components/site";
export const metadata: Metadata = {
  title: "履历与航线 · Flight Path | LZZ Blog",
  description:
    "Zizheng Lyu's career flight path and engineering capabilities: distributed systems, platform infrastructure, and product craftsmanship.",
};

export default function ResumePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <ResumeNav />
      <div className="no-print">
        <FlightPathTimeline />
      </div>

      <section className="no-print mt-16" aria-label="Capability dossier">
        <CapabilityHeader />
        <ResumeDossier />
      </section>

      <ResumePrint />

      <ResumeFooterNote />
      </div>
      <SiteFooter />
    </div>
  );
}
