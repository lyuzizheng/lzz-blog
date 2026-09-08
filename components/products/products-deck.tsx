"use client";

import React, { useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import { ProductCard, ProductSlide } from "./product-slide";

/**
 * BRAWUKA-62 / Refactor · Single-Page 3-Card Products Exhibition.
 * - Desktop: 3 vertical cards side-by-side in a 3-column grid within one single viewport page.
 * - Mobile: Responsive vertical stream with top fast-jump tabs and smooth touch navigation.
 * - 100% Day/Night Darkroom & i18n (ZH/EN) compliant.
 */
export function ProductsDeck() {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  const [activeTab, setActiveTab] = useState<string>(PRODUCTS[0].id);

  const scrollToCard = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(`product-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="relative w-full bg-substrate text-primary transition-colors duration-300">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* 1. Masthead Header */}
        <header className="border-b border-border-plate pb-4 font-telemetry text-xs uppercase tracking-widest text-muted">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-ink-dominant">
              {t.products.badge}
            </span>
            <span className="text-[11px] opacity-75 tabular-nums">
              03 SPECIMENS · {isZh ? "独立手作" : "ZERO-ADS UTILITY"}
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h1 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              {t.products.title}
            </h1>
            <p className="font-body text-xs text-muted max-w-lg sm:text-right hidden sm:block leading-relaxed">
              {t.products.subtitle}
            </p>
          </div>
        </header>

        {/* 2. Mobile Quick-Jump Nav Bar (手机版本再想想 · 快速横切指示栏) */}
        <nav
          aria-label="Mobile Product Navigation"
          className="my-3 flex items-center gap-1.5 overflow-x-auto py-1 font-telemetry text-xs md:hidden scrollbar-none"
        >
          {PRODUCTS.map((product, idx) => {
            const isActive = activeTab === product.id;
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => scrollToCard(product.id)}
                className={`group flex shrink-0 items-center gap-1 rounded-[2px] border px-2.5 py-1 transition-all cursor-pointer ${
                  isActive
                    ? "border-ink-dominant bg-surface text-ink-dominant font-semibold shadow-xs"
                    : "border-border-plate/60 bg-chamber/40 text-muted hover:border-border-plate hover:text-primary"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="text-[10px] opacity-70">§0{idx + 1}</span>
                <span className="tracking-wider">{product.name}</span>
              </button>
            );
          })}
        </nav>

        {/* 3. Three Vertical Cards Container (单页三卡片并排 · 手机竖排 Snap-y 适配) */}
        <div
          className="my-4 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6 snap-y snap-mandatory md:snap-none"
          role="region"
          aria-label="Products Grid"
        >
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              total={PRODUCTS.length}
              isZh={isZh}
              tProducts={t.products}
            />
          ))}
        </div>

        {/* 4. Minimalist Colophon Footer */}
        <footer className="mt-4 border-t border-border-plate pt-3 font-telemetry text-[11px] text-muted flex flex-col sm:flex-row justify-between gap-1.5">
          <span>
            © 2026 ZIZHENG LYU · {isZh ? "独立产品工坊与手作" : "INDEPENDENT FORGE"}
          </span>
          <span className="tabular-nums">
            3 SPECIMENS · NEXT.JS 16 · TAURI V2 · AIRWALLEX BILLING
          </span>
        </footer>
      </div>
    </div>
  );
}
