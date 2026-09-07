"use client";

import React from "react";
import { PRODUCTS } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import { ProductSlide } from "./product-slide";
import { useProductsDeck } from "./use-products-deck";

/**
 * BRAWUKA-62 · ProductsDeck — 04 Products (/products) 策展式一屏一产品展台
 */
export function ProductsDeck() {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  const { activeIndex, containerRef, slideRefs, scrollToSlide } = useProductsDeck();

  return (
    <div className="relative w-full bg-substrate text-primary transition-colors duration-300">
      <nav
        aria-label="Products Frame Rail"
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 font-telemetry text-xs lg:flex"
      >
        {PRODUCTS.map((product, idx) => {
          const isActive = activeIndex === idx;
          const pct = Math.round(((idx + 1) / PRODUCTS.length) * 100);
          return (
            <button
              key={product.id}
              onClick={() => scrollToSlide(idx)}
              className={`group flex items-center justify-end gap-2.5 transition-all ${
                isActive ? "text-cobalt font-bold" : "text-muted hover:text-primary"
              }`}
              aria-current={isActive ? "step" : undefined}
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100">
                {product.name}
              </span>
              <span className="tracking-widest">
                §0{idx + 1} · {pct}%
              </span>
              <span
                className={`h-4 w-1 transition-all rounded-[1px] ${
                  isActive ? "bg-cobalt scale-y-125" : "bg-border-plate group-hover:bg-muted"
                }`}
              />
            </button>
          );
        })}
      </nav>

      <div
        ref={containerRef}
        className="h-[calc(100dvh-3.5rem)] w-full snap-y snap-mandatory overflow-y-auto scroll-smooth focus:outline-none"
        tabIndex={0}
        aria-label="Curated Products Slides"
      >
        {PRODUCTS.map((product, index) => (
          <ProductSlide
            key={product.id}
            product={product}
            index={index}
            total={PRODUCTS.length}
            isZh={isZh}
            onScrollTo={scrollToSlide}
            tProducts={t.products}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
