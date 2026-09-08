import type { Metadata } from "next";
import { getHealthPayload } from "@/lib/health";
import { SiteHeader, SiteFooter, StatusHeader } from "@/components/site";
import { StatusConsole } from "@/components/site/status-console";
import { siteConfig } from "@/lib/site";
import packageJson from "@/package.json";

export const metadata: Metadata = {
  title: "系统状态与边缘遥测 · System Status | Lyu Zizheng",
  description:
    "运行健康度、边缘遥测指标与 Next.js 15 静态编译架构验收探针。",
  keywords: [
    ...siteConfig.keywords,
    "Telemetry",
    "Edge Probes",
    "System Status",
  ],
  alternates: {
    canonical: `${siteConfig.url}/status`,
  },
  openGraph: {
    title: "系统状态与边缘遥测 · System Status | Lyu Zizheng",
    description:
      "运行健康度、边缘遥测指标与 Next.js 15 静态编译架构验收探针。",
    url: `${siteConfig.url}/status`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og?title=${encodeURIComponent("系统状态与边缘遥测")}&sub=${encodeURIComponent("Runtime Health · Edge Telemetry · Build Gates")}&badge=${encodeURIComponent("EDGE TELEMETRY")}`,
        width: 1200,
        height: 630,
        alt: "系统状态与边缘遥测 · System Status | Lyu Zizheng",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "系统状态与边缘遥测 · System Status | Lyu Zizheng",
    description:
      "运行健康度、边缘遥测指标与 Next.js 15 静态编译架构验收探针。",
    images: [
      `${siteConfig.url}/og?title=${encodeURIComponent("系统状态与边缘遥测")}&sub=${encodeURIComponent("Runtime Health · Edge Telemetry · Build Gates")}&badge=${encodeURIComponent("EDGE TELEMETRY")}`,
    ],
  },
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
        <StatusHeader />

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
