import type { Metadata, Viewport } from "next";
import { Newsreader, Noto_Serif_SC, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider, FilmGrainOverlay, ScrollRestore, ExposureProgress, AtelierVeilDismiss } from "@/components/motion";
import { siteConfig } from "@/lib/site";
import { I18nProvider } from "@/lib/i18n";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  weight: ["400", "700"],
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "LZZ Blog · The Digital Darkroom & Print Atelier",
    template: "%s · LZZ Blog",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.atelier,
    title: "LZZ Blog · The Digital Darkroom & Print Atelier",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "LZZ Blog · The Digital Darkroom & Print Atelier",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0E11",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${notoSerifSC.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-substrate text-primary font-body antialiased selection:bg-safelight/20 selection:text-safelight">
        {/* BRAWUKA-87 · 0ms Zero-Blocking Instant Darkroom Exposure Veil */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #atelier-veil {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 16px;
                background-color: #100F0E;
                color: #F4F4F5;
                pointer-events: auto;
                transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s;
              }
              #atelier-veil.veil-dismissed {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
              }
              @keyframes veil-spin {
                to { transform: rotate(360deg); }
              }
              @keyframes veil-pulse {
                0%, 100% { opacity: 0.8; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.15); }
              }
              .veil-frame {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 56px;
                height: 56px;
                border: 1px solid #262019;
                background-color: #171512;
                border-radius: 2px;
                box-shadow: 0 4px 25px -2px rgba(224, 84, 84, 0.22);
              }
              .veil-spinner {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 1.5px dashed rgba(224, 84, 84, 0.5);
                animation: veil-spin 6s linear infinite;
              }
              .veil-dot {
                position: absolute;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #E05454;
                animation: veil-pulse 2s ease-in-out infinite;
              }
              .veil-label {
                display: flex;
                align-items: center;
                gap: 8px;
                font-family: var(--font-geist-mono), monospace;
                font-size: 10px;
                letter-spacing: 0.24em;
                text-transform: uppercase;
                color: rgba(243, 232, 214, 0.55);
              }
            `,
          }}
        />
        <div id="atelier-veil" aria-hidden="true">
          <div className="veil-frame">
            <div className="veil-spinner" />
            <div className="veil-dot" />
          </div>
          <div className="veil-label">DEVELOPING EXPOSURE // 35MM</div>
        </div>
        <AtelierVeilDismiss />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="night"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <I18nProvider>
            <SmoothScrollProvider>
              {/* Top Darkroom Exposure Beam & Route Navigation Progress Bar */}
              <ExposureProgress />
              {/* 3%~5% Silver Halide Film Grain Overlay (Fixed, 0 CLS) */}
              <FilmGrainOverlay />
              <ScrollRestore>{children}</ScrollRestore>
            </SmoothScrollProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
