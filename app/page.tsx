import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MagneticButton,
  SpotlightCard,
  ProjectsBento,
} from "@/components/motion";
import { IdentityFilter } from "@/components/home/identity-filter";
import {
  Button,
  Badge,
  SafelightSwitch,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { formatExifTelemetry } from "@/tokens";
import {
  Camera,
  Cpu,
  Compass,
  ArrowRight,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "门厅 · LZZ Atelier",
  description:
    "Zizheng Lyu — distributed systems engineer & visual storyteller. Next.js 15, Tailwind CSS v4, Lenis kinetic scroll physics.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const telemetrySample = formatExifTelemetry({
    camera: "Sony A7M4",
    lens: "FE 35mm F1.4 GM",
    aperture: "f/1.4",
    shutter: "1/250s",
    iso: 100,
  });

  return (
    <div className="relative flex min-h-screen flex-col justify-between">
      {/* Precision Top Registration Ruler & Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border-plate bg-substrate/85 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo & Physical Coordinates */}
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold tracking-tight text-primary">
              LZZ ATELIER
            </span>
            <span className="hidden font-telemetry text-[11px] text-muted sm:inline-block">
              / 01°20&apos;N 103°49&apos;E / 2026.09
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-4 font-body text-xs">
            <Link
              href="/resume"
              className="flex items-center gap-1.5 font-telemetry text-[11px] border border-border-plate px-2.5 py-1 rounded-xs text-text-primary hover:border-ink-dominant transition-colors"
            >
              <Compass className="h-3 w-3 text-ink-dominant" />
              <span>RESUME // 航线</span>
            </Link>
            <Link
              href="/photography"
              className="flex items-center gap-1.5 font-telemetry text-[11px] border border-border-plate px-2.5 py-1 rounded-xs text-text-primary hover:border-ink-dominant transition-colors"
            >
              <Camera className="h-3 w-3 text-ink-dominant" />
              <span>DARKROOM // 暗房</span>
            </Link>
            <span className="hidden text-muted md:inline-flex items-center gap-1.5 font-telemetry text-[11px] border border-border-plate px-2 py-0.5 rounded-xs">
              <Activity className="h-3 w-3 text-safelight" />
              120FPS · ZERO CLS
            </span>
            <SafelightSwitch />
          </nav>
        </div>
      </header>

      {/* Main Atelier Stage */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-16">
        {/* Section 1: The Developing Tray Hero */}
        <section className="relative mb-16 overflow-hidden rounded-lg border border-border-plate bg-surface p-6 sm:p-12">
          {/* Background Halftone Pattern Accent */}
          <div className="halftone-screen pointer-events-none absolute inset-0 opacity-20" />

          <div className="relative z-10 flex flex-col gap-6">
            {/* Top Telemetry cluster */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-plate pb-4 font-telemetry text-xs text-muted">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-safelight" />
                <span>ARCHETYPE // SPECIMEN 2026-N1</span>
              </div>
              <div className="tracking-widest">
                [DARKROOM CHEMISTRY // ILFORD WARMTONE FB]
              </div>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-3">
              <p className="font-telemetry text-xs uppercase tracking-widest text-safelight">
                The Digital Darkroom & Print Atelier
              </p>
              <h1 className="font-display text-4xl font-normal leading-[1.05] tracking-tight text-primary sm:text-6xl md:text-7xl">
                Physicality meets fluid dynamics.
              </h1>
              <p className="max-w-2xl font-body text-base text-muted sm:text-lg leading-relaxed">
                Zizheng Lyu — Distributed systems engineer & visual storyteller.
                Crafted with Next.js 15, Tailwind CSS v4, React 19, and Lenis kinetic scroll physics.
              </p>
            </div>

            {/* Identity Filter Switcher & EXIF Telemetry */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
              {/* Filter Toggles (client island — keeps page server-rendered) */}
              <IdentityFilter />

              {/* Sample EXIF Badge */}
              <div className="flex items-center gap-2">
                <Badge variant="safelight" className="flex items-center gap-1.5 py-1">
                  <Camera className="h-3 w-3" />
                  <span>{telemetrySample}</span>
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Core Engineering & Motion Pillars (Bento Grid) */}
        <div className="mb-16">
          <div className="mb-6 flex items-center justify-between border-b border-border-plate pb-3">
            <h2 className="font-display text-2xl font-semibold text-primary">
              Core Engineering Pillars
            </h2>
            <span className="font-telemetry text-xs text-muted">
              {"// ATELIER SPECIFICATIONS"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Pillar 1: Lenis Kinetic Smooth Scroll */}
            <SpotlightCard className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-safelight">
                  <Compass className="h-5 w-5" />
                  <span className="font-telemetry text-xs">LERP 0.08 // 1.2S</span>
                </div>
                <h3 className="font-display text-xl font-medium text-primary">
                  Inertial Kinetic Scrolling
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  Native Lenis physics integrated with hardware wheel interpolation. Butter-smooth 120fps with automatic graceful fallback for prefers-reduced-motion.
                </p>
              </div>
              <div className="mt-6 border-t border-border-plate pt-3 font-telemetry text-xs text-muted flex items-center justify-between">
                <span>ZERO CLS GUARANTEE</span>
                <span className="text-safelight">[ACTIVE]</span>
              </div>
            </SpotlightCard>

            {/* Pillar 2: Micro-Interactions & Spring Physics */}
            <SpotlightCard className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-cobalt">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-telemetry text-xs">SPRING SNAPPY</span>
                </div>
                <h3 className="font-display text-xl font-medium text-primary">
                  Tactile Spring Micro-Interactions
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  Magnetic attraction buttons, spotlight cursor radiation, and mechanical tactile feedback driven by motion physics.
                </p>
              </div>
              <div className="mt-6 border-t border-border-plate pt-3">
                <MagneticButton className="w-full">
                  <Button variant="safelight" className="w-full flex items-center justify-center gap-2">
                    <span>Magnetic Spring Test</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </MagneticButton>
              </div>
            </SpotlightCard>

            {/* Pillar 3: Dual-Mode Ink Spectrum */}
            <SpotlightCard className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-terracotta">
                  <Layers className="h-5 w-5" />
                  <span className="font-telemetry text-xs">DUOTONE 80/20</span>
                </div>
                <h3 className="font-display text-xl font-medium text-primary">
                  Dual-Mode Optical Inks
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  Daylight Print Atelier (#FAFAF7 + Cobalt Blue + Terracotta) and Safelight Darkroom (#0D0E11 + Kodak Red + Luminescent Cream).
                </p>
              </div>
              <div className="mt-6 border-t border-border-plate pt-3 font-telemetry text-xs flex items-center justify-between text-muted">
                <span>DARKROOM RED / COBALT BLUE</span>
                <span className="text-terracotta">[RESOLVED]</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
        {/* Section 2.5: Featured Expeditions (BRAWUKA-39 Project Radar) */}
        <div className="mb-16">
          <ProjectsBento />
          <div className="mt-4 flex justify-end">
            <Link
              href="/resume"
              className="inline-flex items-center gap-1 font-telemetry text-[11px] tracking-[0.14em] text-muted transition-colors hover:text-primary"
            >
              FULL DOSSIER // 航线履历
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>


        {/* Section 3: Design Tokens & Palette Verification Plate */}
        <section className="rounded-lg border border-border-plate bg-surface p-6">
          <div className="mb-4 flex items-center justify-between border-b border-border-plate pb-3">
            <h3 className="font-display text-lg font-medium text-primary">
              Design Tokens Palette & Verification
            </h3>
            <Badge variant="telemetry">TAILWIND V4 + REACT 19</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-7 font-telemetry text-xs">
            {/* Color 1: Obsidian */}
            <div className="flex flex-col gap-2 rounded border border-border-plate bg-chamber p-3">
              <div className="h-10 w-full rounded border border-white/10" style={{ backgroundColor: "#0D0E11" }} />
              <span className="font-semibold text-primary">Obsidian</span>
              <span className="text-[10px] text-muted">#0D0E11</span>
            </div>

            {/* Color 2: Cold Gray */}
            <div className="flex flex-col gap-2 rounded border border-border-plate bg-chamber p-3">
              <div className="h-10 w-full rounded border border-white/10" style={{ backgroundColor: "#22242A" }} />
              <span className="font-semibold text-primary">Border Cold</span>
              <span className="text-[10px] text-muted">#22242A</span>
            </div>

            {/* Color 3: Highlight Text */}
            <div className="flex flex-col gap-2 rounded border border-border-plate bg-chamber p-3">
              <div className="h-10 w-full rounded border border-white/10" style={{ backgroundColor: "#F4F4F5" }} />
              <span className="font-semibold text-primary">Highlight</span>
              <span className="text-[10px] text-muted">#F4F4F5</span>
            </div>

            {/* Color 4: Safelight Red */}
            <div className="flex flex-col gap-2 rounded border border-border-plate bg-chamber p-3">
              <div className="h-10 w-full rounded border border-white/10" style={{ backgroundColor: "#E54B4B" }} />
              <span className="font-semibold text-primary">Safelight Red</span>
              <span className="text-[10px] text-muted">#E54B4B</span>
            </div>

            {/* Color 5: Phosphor Cream */}
            <div className="flex flex-col gap-2 rounded border border-border-plate bg-chamber p-3">
              <div className="h-10 w-full rounded border border-white/10" style={{ backgroundColor: "#F3E8D6" }} />
              <span className="font-semibold text-primary">Phosphor</span>
              <span className="text-[10px] text-muted">#F3E8D6</span>
            </div>

            {/* Color 6: Cobalt Blue */}
            <div className="flex flex-col gap-2 rounded border border-border-plate bg-chamber p-3">
              <div className="h-10 w-full rounded border border-white/10" style={{ backgroundColor: "#2148B8" }} />
              <span className="font-semibold text-primary">Cobalt Blue</span>
              <span className="text-[10px] text-muted">#2148B8</span>
            </div>

            {/* Color 7: Terracotta */}
            <div className="flex flex-col gap-2 rounded border border-border-plate bg-chamber p-3">
              <div className="h-10 w-full rounded border border-white/10" style={{ backgroundColor: "#C65F38" }} />
              <span className="font-semibold text-primary">Terracotta</span>
              <span className="text-[10px] text-muted">#C65F38</span>
            </div>
          </div>
        </section>
      </main>

      {/* Atelier Footer */}
      <footer className="w-full border-t border-border-plate bg-substrate py-6 font-telemetry text-xs text-muted">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span>© 2026 Zizheng Lyu · The Digital Darkroom & Print Atelier</span>
          </div>
          <div className="flex items-center gap-4">
            <span>NEXT.JS 15 (APP ROUTER)</span>
            <span>TURBOPACK</span>
            <span>LENIS KINETIC</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
