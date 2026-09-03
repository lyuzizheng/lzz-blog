"use client";

import React from "react";
import { motion } from "framer-motion";
import { motionPhysics } from "@/tokens";
import type { TimelineNode } from "@/lib/career-dossier";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { ArchDiagram } from "./arch-diagram";
import { CritiqueCard, ImpactCounter } from "./motion-slots";

/**
 * BRAWUKA-37 · Impact Dossier drawer.
 * Opens from any timeline node; panel motion uses the `dossierDrawer`
 * spring preset (DESIGN.md §6.2). Self-referential `docs/CAREER_DOSSIER.md`
 * placeholder links are filtered out of the UI — the drawer renders the
 * real `archDiagram` source instead.
 */

export function isSelfRefLink(href: string): boolean {
  return href === "docs/CAREER_DOSSIER.md";
}

export interface DossierDrawerProps {
  node: TimelineNode | null;
  onClose: () => void;
}

export function DossierDrawer({ node, onClose }: DossierDrawerProps) {
  return (
    <Dialog
      open={node !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        {node && (
          <motion.div
            initial={{ x: 48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", ...motionPhysics.springs.dossierDrawer }}
          >
            <DialogHeader>
              <p className="font-telemetry text-[11px] tracking-[0.14em] text-muted tabular-nums">
                {node.id} {"//"} {node.start}
                {node.end ? ` – ${node.end}` : " – 至今"} · {node.codename}
              </p>
              <DialogTitle className="font-display text-2xl text-primary">
                {node.org}
              </DialogTitle>
              <DialogDescription className="font-body text-sm text-secondary">
                {node.role} — {node.mainLine}
              </DialogDescription>
            </DialogHeader>

            <p className="mt-4 font-body text-[15px] leading-relaxed text-primary">
              {node.summary}
            </p>

            {node.impact.length > 0 && (
              <div className="mt-4 overflow-hidden rounded border border-border-plate">
                <div className="border-b border-border-plate bg-chamber px-3 py-1.5 font-telemetry text-[10px] tracking-[0.12em] text-muted">
                  IMPACT // 实测档案
                </div>
                <dl>
                  {node.impact.map((im) => (
                    <div
                      key={im.metric}
                      className="flex items-baseline justify-between gap-3 border-b border-border-plate/50 px-3 py-2 last:border-0"
                    >
                      <dt className="font-telemetry text-[11px] text-secondary">{im.metric}</dt>
                      <dd className="font-telemetry text-[13px] font-semibold text-primary tabular-nums">
                        <ImpactCounter impact={im} />
                        {im.status === "tbd" && (
                          <span className="ml-2 rounded border border-border-plate px-1 text-[10px] font-normal text-muted">
                            TBD 待确认
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {node.archDiagram && (
              <div className="mt-4">
                <ArchDiagram
                  source={node.archDiagram}
                  title={`ARCH // ${node.id} ${node.codename} · mono-color 蓝图`}
                />
              </div>
            )}

            {node.id === "N08" && <CritiqueCard className="mt-4" />}

            {node.needsOwner && (
              <p className="mt-4 rounded border border-dashed border-border-plate bg-chamber/50 px-3 py-2 font-telemetry text-[11px] text-muted">
                NEEDS-OWNER // 公开边界待确认，展示范围可能调整。
              </p>
            )}

            {node.links.filter((l) => !isSelfRefLink(l.href)).length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {node.links
                  .filter((l) => !isSelfRefLink(l.href))
                  .map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith("https://") ? "_blank" : undefined}
                      rel={l.href.startsWith("https://") ? "noreferrer" : undefined}
                      className="rounded border border-border-plate px-2.5 py-1 font-telemetry text-[11px] text-ink-dominant hover:border-ink-dominant"
                    >
                      {l.label} →
                    </a>
                  ))}
              </div>
            )}
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
