"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export interface HomeViewProps {
  children?: React.ReactNode;
}

export function HomeView({ children }: HomeViewProps) {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";

  const chapters = [
    {
      index: "01",
      title: t.home.chapters.writings.title,
      sentence: t.home.chapters.writings.sentence,
      href: "/posts",
      cta: t.home.chapters.writings.cta,
    },
    {
      index: "02",
      title: t.home.chapters.darkroom.title,
      sentence: t.home.chapters.darkroom.sentence,
      href: "/photography",
      cta: t.home.chapters.darkroom.cta,
    },
    {
      index: "03",
      title: t.home.chapters.flightPath.title,
      sentence: t.home.chapters.flightPath.sentence,
      href: "/resume",
      cta: t.home.chapters.flightPath.cta,
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6">
      {/* ——— Hero: name, one sentence, film ——— */}
      <section className="flex min-h-[82vh] flex-col justify-center py-16">
        <p className="mb-6 font-telemetry text-[11px] uppercase tracking-[0.24em] text-muted">
          {t.home.tagline}
        </p>
        <h1 className="font-display text-5xl font-normal leading-[1.02] tracking-tight text-primary sm:text-6xl">
          {t.home.title}
        </h1>
        <p className="mt-5 max-w-md font-body text-base leading-relaxed text-muted sm:text-lg">
          {t.home.heroSubtitle}
        </p>

        <div className="mt-12">{children}</div>
      </section>

      {/* ——— Three chapters: one sentence + one door each ——— */}
      <div className="pb-24">
        {chapters.map((chapter) => (
          <section
            key={chapter.index}
            className="border-t border-border-plate py-14 sm:py-16"
          >
            <div className="mb-4 flex items-baseline justify-between">
              <span className="font-telemetry text-xs tracking-[0.2em] text-safelight">
                {chapter.index}
              </span>
            </div>
            <h2 className="font-display text-4xl font-normal tracking-tight text-primary sm:text-5xl">
              {chapter.title}
            </h2>
            <p className="mt-3 font-body text-base leading-relaxed text-muted">
              {chapter.sentence}
            </p>
            <Link
              href={chapter.href}
              className="group mt-6 inline-flex items-center gap-1.5 font-telemetry text-xs tracking-[0.18em] text-primary transition-colors hover:text-safelight"
            >
              {chapter.cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </section>
        ))}

        {/* ——— Colophon ——— */}
        <footer className="flex items-center justify-between border-t border-border-plate pt-6 font-telemetry text-[10px] tracking-[0.18em] text-muted">
          <span>{t.home.colophon}</span>
          <a
            href="/feed.xml"
            className="inline-flex items-center gap-1 transition-colors hover:text-primary"
          >
            {t.home.rss}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </footer>
      </div>
    </main>
  );
}
