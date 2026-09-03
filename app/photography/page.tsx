import type { Metadata } from "next";
import Link from "next/link";
import { Aperture, ArrowLeft } from "lucide-react";
import { DarkroomGallery } from "@/components/motion/darkroom";
import { SafelightSwitch, Badge } from "@/components/ui";

export const metadata: Metadata = {
  title: "摄影暗房 · The Darkroom — LZZ Atelier",
  description:
    "沉浸式摄影展厅:流式砌体 / 胶卷横卷 / 沉浸大图三重视图,机械 EXIF 探针与 mono-color 双色孔版艺术模式。",
};

export default function PhotographyPage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between">
      <header className="sticky top-0 z-40 w-full border-b border-border-plate bg-substrate/85 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 font-telemetry text-[11px] text-secondary hover:text-primary">
              <ArrowLeft className="h-3 w-3" />
              <span>ATELIER // 门厅</span>
            </Link>
            <span className="font-display text-lg font-bold tracking-tight text-primary">
              THE DARKROOM
            </span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Badge variant="telemetry">EXIF PROBE · ACTIVE</Badge>
            <SafelightSwitch />
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
        <section className="relative mb-8 overflow-hidden rounded-lg border border-border-plate bg-surface p-6 sm:p-10">
          <div className="halftone-screen pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2 font-telemetry text-xs text-muted">
              <Aperture className="h-4 w-4 text-safelight" />
              <span className="tracking-[0.16em]">数字暗房与物料印社 // THE DARKROOM CHAMBER</span>
            </div>
            <h1 className="font-display text-4xl font-normal leading-[1.05] tracking-tight text-primary sm:text-6xl">
              光子沉淀,时间晶体化。
            </h1>
            <p className="max-w-2xl font-body text-base leading-relaxed text-muted">
              Sony A7M4 实拍画卷 — 悬停 / 聚焦 / 长按任意相纸,机械 EXIF 探针即刻显影;
              右侧油墨开关一键切入 Riso 双色孔版、蓝晒与单色网点。点击相纸进入物理灯箱:
              下拉甩飞关闭,滚轮缩放,←/→ 切帧。
            </p>
          </div>
        </section>

        <DarkroomGallery />
      </main>

      <footer className="w-full border-t border-border-plate bg-substrate py-6 font-telemetry text-xs text-muted">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
          <span>© 2026 Zizheng Lyu · The Darkroom Chamber</span>
          <span>SONY A7M4 · FE 35mm F1.4 GM · ILFORD WARMTONE FB</span>
        </div>
      </footer>
    </div>
  );
}
