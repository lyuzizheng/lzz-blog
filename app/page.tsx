import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site";
import { FilmUnfurl } from "@/components/home/film-unfurl";

export const metadata: Metadata = {
  title: "Zizheng Lyu — Engineer & Visual Storyteller",
  description:
    "Zizheng Lyu's personal page: writings on distributed systems, darkroom photography, and the flight path from NTU to ByteDance.",
  alternates: { canonical: "/" },
};

/**
 * BRAWUKA-57 · Film-strip personal homepage (founder direction).
 *
 * Not a landing page: no bento, no pillar card wall, no token palette.
 * One centered column — a few film frames up front that develop as you
 * scroll, then three chapters, each one sentence + one door.
 * Detail lives on /posts, /photography, /resume — never here.
 */
const CHAPTERS = [
  {
    index: "01",
    title: "Writings",
    note: "关于系统与手艺的长思考。",
    sentence: "Long-form thinking on distributed systems and craft.",
    href: "/posts",
    cta: "Enter the archive",
  },
  {
    index: "02",
    title: "Darkroom",
    note: "光子沉淀，时间晶体化。",
    sentence: "Light, sedimented on film — Sony A7M4 · 35mm F1.4 GM.",
    href: "/photography",
    cta: "Enter the darkroom",
  },
  {
    index: "03",
    title: "Flight Path",
    note: "从南洋到字节，一帧一帧。",
    sentence: "NTU to ByteDance, one frame at a time.",
    href: "/resume",
    cta: "Open the dossier",
  },
] as const;

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6">
        {/* ——— Hero: name, one sentence, film ——— */}
        <section className="flex min-h-[82vh] flex-col justify-center py-16">
          <p className="mb-6 font-telemetry text-[11px] uppercase tracking-[0.24em] text-muted">
            LZZ Atelier // Personal Page
          </p>
          <h1 className="font-display text-5xl font-normal leading-[1.02] tracking-tight text-primary sm:text-6xl">
            Zizheng Lyu
          </h1>
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-muted sm:text-lg">
            Distributed systems engineer &amp; visual storyteller — writing,
            photography, and the flight path between.
          </p>

          <div className="mt-12">
            <FilmUnfurl />
          </div>
        </section>

        {/* ——— Three chapters: one sentence + one door each ——— */}
        <div className="pb-24">
          {CHAPTERS.map((chapter) => (
            <section
              key={chapter.index}
              className="border-t border-border-plate py-14 sm:py-16"
            >
              <div className="mb-4 flex items-baseline justify-between">
                <span className="font-telemetry text-xs tracking-[0.2em] text-safelight">
                  {chapter.index}
                </span>
                <span className="font-telemetry text-xs tracking-[0.2em] text-muted">
                  {chapter.note}
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
            <span>SET IN NEWSREADER &amp; GEIST MONO</span>
            <a
              href="/feed.xml"
              className="inline-flex items-center gap-1 transition-colors hover:text-primary"
            >
              RSS
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </footer>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
