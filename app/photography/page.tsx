import type { Metadata } from "next";
import { Aperture } from "lucide-react";
import { DarkroomGallery } from "@/components/motion/darkroom";
import { SiteHeader, SiteFooter } from "@/components/site";
export const metadata: Metadata = {
  title: "摄影暗房 · The Darkroom — LZZ Atelier",
  description:
    "沉浸式摄影展厅:流式砌体 / 胶卷横卷 / 沉浸大图三重视图,机械 EXIF 探针与 mono-color 双色孔版艺术模式。",
};

export default function PhotographyPage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between">
      <SiteHeader />

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

      <SiteFooter variant="darkroom" />
    </div>
  );
}
