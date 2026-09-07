"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Compass } from "lucide-react";
import type { ProductItem } from "@/lib/products";

interface ProductSlideProps {
  product: ProductItem;
  index: number;
  total: number;
  isZh: boolean;
  onScrollTo: (index: number) => void;
  tProducts: { scrollDown: string };
}

export const ProductSlide = React.forwardRef<HTMLElement, ProductSlideProps>(
  function ProductSlide(
    { product, index, total, isZh, onScrollTo, tProducts },
    ref,
  ) {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const tagline = isZh ? product.taglineZh : product.taglineEn;
  const statusStamp = isZh ? product.statusStampZh : product.statusStampEn;
  const linkText = isZh ? product.link.labelZh : product.link.label;

  return (
    <section
      ref={ref}
      id={`product-${product.id}`}
      className="relative flex min-h-[calc(100dvh-3.5rem)] w-full snap-start snap-always items-center justify-center border-b border-border-plate/30 px-4 py-8 sm:px-8 sm:py-12 lg:px-16"
      aria-label={`${product.name} Showcase`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(var(--ink-dominant) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-border-plate pb-2 font-telemetry text-[11px] uppercase tracking-wider text-muted">
          <div className="flex items-center gap-3">
            <span className="font-bold text-cobalt">PLATE 0{index + 1} / 0{total}</span>
            <span className="text-border-plate">|</span>
            <span>{product.codename}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">{product.coordinates}</span>
            <span className="text-border-plate">|</span>
            <span className="font-semibold text-primary">{product.statusTelemetry}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="group relative overflow-hidden rounded-[2px] border border-border-plate bg-surface p-2 shadow-plate transition-all">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5F1E8]">
                <Image
                  src={product.coverSvg}
                  alt={`${product.name} technical blueprint illustration`}
                  fill
                  priority={isFirst}
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>

              <div className="mt-2 flex items-center justify-between px-1 font-telemetry text-[10px] text-muted">
                <span className="tracking-wide">
                  FIG.0{index + 1} — {product.name.toUpperCase()} SCHEMATIC
                </span>
                <span className="text-cobalt">MONO-COLOR // COBALT #2148B8</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6 lg:col-span-5">
            <div>
              <div className="mb-2 flex items-center gap-2 font-telemetry text-xs uppercase tracking-widest text-muted">
                <Compass className="h-3.5 w-3.5 text-cobalt" />
                <span>INDEPENDENT PRODUCT EXPERIMENT</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                  {product.name}
                </h2>

                <div
                  className="inline-flex items-center gap-1.5 rounded-[2px] border border-cobalt/60 bg-cobalt/10 px-2.5 py-0.5 font-telemetry text-[11px] font-bold tracking-wider text-cobalt shadow-xs"
                  role="status"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cobalt animate-pulse" />
                  <span>{statusStamp}</span>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-cobalt/40 pl-4">
              <p className="font-display text-lg leading-relaxed text-primary sm:text-xl font-medium">
                {tagline}
              </p>
              {isZh && (
                <p className="mt-2 font-telemetry text-xs leading-normal text-muted">
                  {product.taglineEn}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {product.techSignature.map((tech) => (
                <span
                  key={tech}
                  className="rounded-[2px] border border-border-plate bg-surface/60 px-2 py-0.5 font-telemetry text-[10px] text-muted tracking-tight"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={product.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-[2px] bg-cobalt px-4 py-2 font-telemetry text-xs font-semibold tracking-wider text-white transition-colors hover:bg-cobalt/90 active:scale-[0.99]"
                aria-label={`Visit ${product.name} external link`}
              >
                <span>{linkText}</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <span className="ml-3 font-telemetry text-[10px] text-muted tracking-wide">
                {product.link.kind === "github" ? "GitHub Repository" : "Verified Live URL"}
              </span>
            </div>
          </div>
        </div>

        {!isLast && (
          <div className="mt-8 flex justify-center lg:hidden">
            <button
              onClick={() => onScrollTo(index + 1)}
              className="flex items-center gap-1 font-telemetry text-xs text-muted hover:text-primary"
            >
              <span>{tProducts.scrollDown}</span>
              <ChevronDown className="h-3 w-3 animate-bounce" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
});
