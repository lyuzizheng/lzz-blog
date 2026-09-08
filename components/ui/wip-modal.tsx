"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, AlertCircle, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const WIP_EVENT_NAME = "lzz:open-wip-modal";

export function openWipModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(WIP_EVENT_NAME));
  }
}

export function WipModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useI18n();
  const isZh = locale === "zh";

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener(WIP_EVENT_NAME, handleOpen);
    return () => window.removeEventListener(WIP_EVENT_NAME, handleOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isZh ? "摄影界面尚未完工" : "Photography Under Construction"}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-[3px] border border-border-plate bg-substrate p-6 shadow-elevated transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between border-b border-border-plate pb-3 font-telemetry text-xs text-muted uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="rounded-[2px] bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.5 text-[10px] font-bold text-amber-500">
              WIP // 03A
            </span>
            <span>{isZh ? "施工显影中" : "IN DEVELOPMENT"}</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="p-1 text-muted hover:text-primary transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="my-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
            <h3 className="font-display text-xl font-bold tracking-tight text-primary sm:text-2xl">
              {isZh ? "摄影界面还没弄好" : "Photography Under Construction"}
            </h3>
          </div>

          <p className="font-body text-xs sm:text-sm leading-relaxed text-secondary">
            {isZh
              ? "摄影暗房（全屏漫游地图与画廊视图）目前还在设计与冲洗显影中，功能尚未完全就绪，敬请期待后续上线！"
              : "The Darkroom Photography Atlas and Gallery are currently under active development and fine-tuning. Stay tuned for the upcoming release!"}
          </p>

          <p className="font-telemetry text-[11px] text-muted">
            {isZh
              ? "推荐先浏览「文章」、「履历航线」与「独立产品」章节。"
              : "Feel free to explore Blogs, Career Flight Path, and Products in the meantime."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-border-plate pt-4 font-telemetry text-xs">
          <Link
            href="/photography"
            onClick={close}
            className="text-muted hover:text-primary transition-colors underline-offset-4 hover:underline flex items-center gap-1"
          >
            <span>{isZh ? "仍然前往预览" : "Preview Anyway"}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>

          <button
            type="button"
            onClick={close}
            className="rounded-[2px] bg-ink-dominant px-4 py-1.5 font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
          >
            {isZh ? "我知道了" : "Understood"}
          </button>
        </div>
      </div>
    </div>
  );
}
