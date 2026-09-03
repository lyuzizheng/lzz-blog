"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { motionPhysics } from "@/tokens";
import { Badge } from "@/components/ui";
import { CAPABILITY_DIMENSIONS } from "@/lib/resume";
import { cn } from "@/lib/utils";

/**
 * BRAWUKA-39 · ResumeDossier：交互浏览模式。
 * 按工程能力维度分类折叠（架构底座 / 复杂前端 / 算法管道 / 工程效能）。
 * - 展开动效使用 dossierDrawer 弹簧预设（DESIGN.md §6.2）。
 * - tbd 条目标记 [NEEDS-OWNER] 且默认收进"待确认"提示，不伪装成已验证事实。
 * - prefers-reduced-motion 下 AnimatePresence 经全局 CSS 降级为瞬时切换。
 */
export function ResumeDossier() {
  const [open, setOpen] = useState<string[]>(["platform"]);

  const toggle = (id: string) => {
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="no-print space-y-4" aria-label="Interactive resume">
      {CAPABILITY_DIMENSIONS.map((dim, index) => {
        const isOpen = open.includes(dim.id);
        return (
          <div
            key={dim.id}
            className="overflow-hidden rounded-lg border border-border-plate bg-surface"
          >
            <button
              onClick={() => toggle(dim.id)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-chamber/50"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-telemetry text-[11px] text-muted">
                  D{String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl font-medium text-primary">
                  {dim.title}
                </span>
                <span className="hidden font-telemetry text-[11px] tracking-[0.14em] text-muted sm:inline">
                  {dim.codename}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge variant="telemetry">{dim.bullets.length} ITEMS</Badge>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={motionPhysics.springs.snappy}
                  className="text-muted"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={motionPhysics.springs.dossierDrawer}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 border-t border-border-plate p-5">
                    <p className="font-body text-sm leading-relaxed text-muted">
                      {dim.summary}
                    </p>
                    <ul className="space-y-2.5">
                      {dim.bullets.map((bullet) => (
                        <li
                          key={bullet.text}
                          className={cn(
                            "border-l-2 pl-3 font-body text-sm leading-relaxed text-secondary",
                            bullet.status === "verified"
                              ? "border-border-strong"
                              : "border-terracotta"
                          )}
                        >
                          {bullet.text}
                          <span className="ml-2 font-telemetry text-[10px] tracking-wider text-muted">
                            {bullet.status === "verified"
                              ? `[${bullet.source}]`
                              : "[NEEDS-OWNER]"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
