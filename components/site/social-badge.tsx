"use client";

import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { handleOf, type SocialLink } from "./social-links";
import { cn } from "@/lib/utils";

/**
 * BRAWUKA-45 · Monochrome monospace social microbadge with tooltip.
 * Text glyphs (GH/X/IN/IG) instead of brand SVGs: zero dependencies,
 * telemetry-plate aesthetic, magnetic hover via border transition.
 */
export function SocialBadge({ link, className }: { link: SocialLink; className?: string }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${link.label} — ${handleOf(link.href)}`}
            className={cn(
              "inline-flex h-6 min-w-6 items-center justify-center border border-border-plate px-1.5 font-telemetry text-[10px] tracking-[0.08em] text-text-secondary transition-colors hover:border-ink-dominant hover:text-text-primary",
              className
            )}
          >
            {link.badge}
          </a>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {link.label} · {handleOf(link.href)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
