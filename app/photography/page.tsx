import type { Metadata } from "next";
import Link from "next/link";
import { DarkroomGallery } from "@/components/motion/darkroom";
import { DARKROOM_PHOTOS } from "@/lib/photos";

export const metadata: Metadata = {
  title: "暗房展厅 · The Darkroom | LZZ Blog",
  description:
    "Zizheng Lyu 摄影暗房：瀑布流 / 胶卷 / 沉浸三重视图，机械 EXIF 探针，mono-color 孔版 / 蓝晒 / 网点艺术模式，拖拽甩飞灯箱。",
};

export default function PhotographyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 flex items-center justify-between font-telemetry text-[11px] text-muted">
        <Link href="/" className="hover:text-primary">
          ← LZZ ATELIER
        </Link>
        <span className="tracking-[0.14em] tabular-nums">
          PHOTO // DARKROOM · {String(DARKROOM_PHOTOS.length).padStart(2, "0")} FRAMES
        </span>
      </nav>
      <header className="mb-8 border-b border-border-plate pb-6">
        <p className="font-telemetry text-[11px] tracking-[0.18em] text-safelight">
          SAFELIGHT // 暗房展厅 — 胶片显影中
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight text-primary sm:text-5xl">
          The Darkroom — 摄影暗房
        </h1>
        <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-muted sm:text-base">
          博客正文刊载图策展。悬停或点 EXIF + 呼出机械探针（文件级遥测，相机 EXIF
          已剥离、拒绝编造）；右角一键 mono-color 孔版 / 蓝晒 / 网点；点图进灯箱，纵拖 120px
          甩飞关闭。
        </p>
      </header>
      <DarkroomGallery />
      <footer className="mt-12 border-t border-border-plate pt-4 font-telemetry text-[11px] text-muted">
        数据源 lib/photos.ts —— 仅收录 owner 已发布博文配图；代表作原图（P5）待 owner 供图后扩容。
      </footer>
    </div>
  );
}
