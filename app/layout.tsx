import type { Metadata, Viewport } from "next";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider, FilmGrainOverlay } from "@/components/motion";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
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
  title: "LZZ Blog · The Digital Darkroom & Print Atelier",
  description:
    "Personal digital darkroom & engineering atelier of Zizheng Lyu. Physicality meets fluid dynamics: Next.js 15, Tailwind CSS v4, Lenis smooth scrolling.",
  keywords: ["Zizheng Lyu", "Next.js 15", "Digital Darkroom", "Print Atelier", "Tailwind CSS v4", "Lenis", "Motion"],
  authors: [{ name: "Zizheng Lyu" }],
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
      lang="zh-CN"
      suppressHydrationWarning
      className={`${newsreader.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-substrate text-primary font-body antialiased selection:bg-safelight/20 selection:text-safelight">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="night"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <SmoothScrollProvider>
            {/* 3%~5% Silver Halide Film Grain Overlay (Fixed, 0 CLS) */}
            <FilmGrainOverlay />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
