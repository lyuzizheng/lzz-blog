import type { Metadata } from "next";
import Link from "next/link";
import { getHealthPayload } from "@/lib/health";
import { SiteHeader, SiteFooter } from "@/components/site";
import { StatusConsole } from "@/components/site/status-console";
import packageJson from "@/package.json";

export const metadata: Metadata = {
  title: "系统状态 · System Status | LZZ Blog",
  description:
    "LZZ 数字暗房系统状态与边缘探针控制台：运行脉搏、版本交付物、架构门禁。Readiness probe: /api/health。",
};

function CardShell({
  index,
  eyebrow,
  title,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title} className="border border-border-plate bg-surface">
      <header className="flex items-baseline justify-between gap-3 border-b border-border-plate px-4 py-3">
        <h2 className="font-display text-lg font-semibold text-primary">{title}</h2>
        <span className="shrink-0 font-telemetry text-[11px] tracking-[0.14em] text-muted">
          {index} {"//"} {eyebrow}
        </span>
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

function TelemetryRows({ rows }: { rows: ReadonlyArray<readonly [string, string]> }) {
  return (
    <dl className="divide-y divide-border-plate/60 font-telemetry text-xs tabular-nums">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-4 py-2">
          <dt className="shrink-0 tracking-[0.14em] text-muted">{k}</dt>
          <dd className="truncate text-right text-primary" title={v}>
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * BRAWUKA-54 · `/status` — 数字暗房系统状态与边缘探针控制台。
 * Server shell (Zero CLS) + one live probe island. Esc 返回门厅。
 */
export default function StatusPage() {
  const initial = getHealthPayload();
  const nextVersion = "15.2.1";
  const reactVersion = "19.0.0";

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <nav
          aria-label="面包屑"
          className="mb-6 flex flex-wrap items-center justify-between gap-3 font-telemetry text-[11px] text-muted"
        >
          <Link href="/" className="hover:text-primary">
            ← LZZ ATELIER
          </Link>
          <span className="tracking-[0.14em]">STATUS {"//"} EDGE PROBE CONSOLE · ESC 返回</span>
        </nav>

        <header className="mb-8">
          <p className="mb-2 font-telemetry text-[11px] tracking-[0.22em] text-muted">
            THE DARKROOM TELEMETRY {"//"} 01°20′N 103°49′E
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            系统状态<span className="text-muted"> / </span>
            <span className="italic">System Status</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-secondary">
            数字暗房的边缘脉搏、交付物印章与架构门禁 —— 全绿即营业。
            自动化就绪探针直达 <code className="font-telemetry text-xs">/api/health</code>。
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <CardShell index="01" eyebrow="SYSTEM PULSE" title="系统运行状态">
            <StatusConsole initial={initial} />
          </CardShell>

          <CardShell index="02" eyebrow="ATELIER ARTIFACTS" title="版本与交付物">
            <TelemetryRows
              rows={[
                ["RELEASE", `v${packageJson.version}`],
                ["COMMIT", initial.commit],
                ["RUNTIME", `NEXT.JS ${nextVersion} · REACT ${reactVersion}`],
                ["CONTENT INDEX", `${initial.posts_count} DISPATCHES · VELITE MDX`],
                ["DARKROOM", "6+ FRAMES · EXIF PROBES ARMED"],
                ["ENV", initial.environment.toUpperCase()],
              ]}
            />
          </CardShell>

          <div className="lg:col-span-2">
            <CardShell index="03" eyebrow="ARCHITECTURE & GATES" title="架构与门禁健康">
              <ul className="grid gap-3 font-telemetry text-xs tabular-nums sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["CI GATES", "TYPECHECK · TEST · BUILD — GREEN"],
                  ["SCROLL", "LENIS · LERP 0.08 · 120FPS"],
                  ["REDIRECTS", "HUGO LEGACY SLUGS → 301 INTACT"],
                  ["SYNDICATION", "/FEED.XML · /SITEMAP.XML · OG LIVE"],
                ].map(([k, v]) => (
                  <li key={k} className="border border-border-plate/60 px-3 py-2.5">
                    <span className="mb-1 flex items-center gap-1.5 tracking-[0.14em] text-muted">
                      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {k}
                    </span>
                    <span className="text-primary">{v}</span>
                  </li>
                ))}
              </ul>
            </CardShell>
          </div>
        </div>

        <footer className="mt-8 border-t border-border-plate pt-4 font-telemetry text-[11px] text-muted">
          PROBE <code>/api/health</code> · CACHE-CONTROL NO-STORE · SERVER-TIMING EDGE —— Esc 返回门厅。
        </footer>
      </main>
      <SiteFooter />
    </div>
  );
}
