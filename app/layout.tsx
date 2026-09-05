import type { Metadata, Viewport } from "next";
import { Newsreader, Noto_Serif_SC, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider, FilmGrainOverlay, ScrollRestore } from "@/components/motion";
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
  weight: ["400", "500", "600", "700", "900"],
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
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="night"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <I18nProvider>
            <SmoothScrollProvider>
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
