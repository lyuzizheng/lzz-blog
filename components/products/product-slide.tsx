"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductItem } from "@/lib/products";

/**
 * 产品主界面实拍图尚未提供（cancan / coffeemode / our-village 均无），
 * 统一以站点主页截图 + 模糊 WIP 显影 overlay 占位；实拍就绪后按产品替换。
 */
const HOME_PREVIEW_IMAGE = "/products/home-preview.jpg";

export interface ProductCardProps {
  product: ProductItem;
  index: number;
  total: number;
  isZh: boolean;
  onScrollTo?: (index: number) => void;
  tProducts?: { scrollDown?: string };
}

/**
 * Vertical Exhibition Card for /products single-page showcase.
 * Embodying the Darkroom Paper aesthetic:
 * - Top telemetry bar with Plate number & pulsing status stamp
 * - Mono-color Pale Beige (#F5F1E8) blueprint schematic
 * - Serif Newsreader headline + bilingual tagline (<=40 chars)
 * - Micro tech signature tags
 * - External repository or live deployment link
 */
export const ProductCard = React.forwardRef<HTMLElement, ProductCardProps>(
  function ProductCard(
    { product, index, total, isZh },
    ref,
  ) {
    const isFirst = index === 0;
    const isWip = product.statusCode === "in_development";
    const isOurVillage = product.id === "our-village";
    const tagline = isZh ? product.taglineZh : product.taglineEn;
    const secondaryTagline = isZh ? product.taglineEn : product.taglineZh;
    const statusStamp = isWip
      ? (isZh ? "WIP · 开发中" : "WIP · In Dev")
      : (isZh ? "已上线 · 官网" : "Official Site · Live");
    const linkText = isZh ? product.link.labelZh : product.link.label;

    return (
      <article
        ref={ref}
        id={`product-${product.id}`}
        className="group relative flex flex-col justify-between rounded-[2px] border border-border-plate bg-surface/50 hover:bg-surface p-4 sm:p-5 transition-all duration-300 hover:border-ink-dominant/60 hover:shadow-plate"
        aria-label={`${product.name} Showcase Card`}
      >
        {/* Subtle halftone grain background accent */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(var(--ink-dominant) 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* 1. Top Telemetry Bar */}
            <div className="flex items-center justify-between border-b border-border-plate/60 pb-2.5 font-telemetry text-[11px] uppercase tracking-wider text-muted">
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink-dominant">
                  §0{index + 1} / 0{total}
                </span>
                <span className="text-border-plate" aria-hidden="true">|</span>
                <span className="truncate max-w-[130px] sm:max-w-[160px]">{product.codename.split(" //")[0]}</span>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-0.5 font-telemetry text-[10px] font-semibold shadow-xs ${
                  isWip
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    : "border-emerald-600/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                }`}
                role="status"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isWip ? "bg-amber-500 animate-pulse" : "bg-emerald-500 animate-pulse"
                  }`}
                />
                <span>{statusStamp}</span>
              </div>
            </div>

            {/* 2. Homepage Preview Plate · blurred WIP veil (主界面实拍待补) */}
            <div className="my-3.5 overflow-hidden rounded-[2px] border border-border-plate bg-chamber p-1.5 shadow-xs transition-transform duration-300 group-hover:border-ink-dominant/40">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1px]">
                <Image
                  src={HOME_PREVIEW_IMAGE}
                  alt={`${product.name} interface preview placeholder — homepage capture under WIP veil`}
                  fill
                  priority={isFirst}
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
                />
                {/* 模糊 WIP 显影层：背板压暗 + 毛玻璃，WIP 章与遥测微字保持锐利 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-obsidian/40 backdrop-blur-md">
                  <span className="pl-[0.35em] font-telemetry text-xl font-bold tracking-[0.35em] text-ink-dominant">
                    WIP
                  </span>
                  <span className="font-telemetry text-[9px] uppercase tracking-[0.2em] text-phosphor/70">
                    {isZh ? "主界面实拍 · 显影中" : "UI CAPTURE · DEVELOPING"}
                  </span>
                </div>
              </div>
              <div className="mt-1 flex items-center justify-between px-1 font-telemetry text-[9px] text-muted">
                <span className="tracking-wider">
                  FIG.0{index + 1} · {product.name.toUpperCase()}
                </span>
                <span className="tabular-nums opacity-80">
                  {product.coordinates.slice(0, 20)}
                </span>
              </div>
            </div>

            {/* 3. Product Name & Bilingual Taglines */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-bold tracking-tight text-primary group-hover:text-ink-dominant transition-colors sm:text-[26px]">
                  {product.name}
                </h2>
                {isWip && (
                  <span className="rounded-[1px] bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.2 text-[8px] font-bold text-amber-600 dark:text-amber-400 font-telemetry tracking-wider uppercase">
                    WIP
                  </span>
                )}
                {isOurVillage && (
                  <span className="rounded-[1px] bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 text-[8px] font-bold text-emerald-600 dark:text-emerald-400 font-telemetry tracking-wider uppercase">
                    {isZh ? "官方网站" : "OFFICIAL"}
                  </span>
                )}
              </div>

              <p className="font-serif text-xs leading-relaxed text-secondary sm:text-sm font-medium">
                {tagline}
              </p>

              <p className="font-telemetry text-[11px] leading-normal text-muted line-clamp-2">
                {secondaryTagline}
              </p>
            </div>
          </div>

          {/* 4. Tech Signature & 5. Action Link */}
          <div className="mt-4 pt-3 border-t border-border-plate/40">
            <div className="flex flex-wrap items-center gap-1 font-telemetry text-[10px] text-muted">
              {product.techSignature.map((tech) => (
                <span
                  key={tech}
                  className="rounded-[2px] border border-border-plate/60 bg-chamber/50 px-1.5 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-3.5 flex items-center justify-between">
              <Link
                href={product.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[2px] text-xs font-telemetry font-bold tracking-wider text-ink-dominant hover:underline underline-offset-4 cursor-pointer transition-colors"
                aria-label={`Visit ${product.name}: ${linkText}`}
              >
                <span>{linkText}</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <span className="font-telemetry text-[10px] text-muted tracking-wide">
                {product.link.kind === "github"
                  ? "GitHub"
                  : isOurVillage
                  ? (isZh ? "官方网站" : "Official Site")
                  : (isZh ? "WIP 预览" : "WIP Preview")}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }
);

/**
 * Backward compatibility alias for test suite
 */
export const ProductSlide = ProductCard;

