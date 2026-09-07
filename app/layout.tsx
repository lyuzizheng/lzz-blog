import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider, FilmGrainOverlay, ScrollRestore, ExposureProgress, AtelierVeilDismiss } from "@/components/motion";
import { I18nProvider } from "@/lib/i18n";
import { fontVariables } from "@/lib/fonts";
import { rootMetadata, rootViewport } from "@/lib/metadata";

export { rootMetadata as metadata, rootViewport as viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <script
          id="atelier-init-theme-locale"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'day' || t === 'night') {
                    document.documentElement.setAttribute('data-theme', t);
                  }
                  var l = localStorage.getItem('lzz_locale');
                  if (!l) {
                    var m = document.cookie.match(/(?:^|;\\s*)lzz_locale=(en|zh)/);
                    if (m) l = m[1];
                  }
                  if (l === 'zh') {
                    document.documentElement.setAttribute('lang', 'zh-CN');
                    document.documentElement.setAttribute('data-locale', 'zh');
                  } else if (l === 'en') {
                    document.documentElement.setAttribute('lang', 'en');
                    document.documentElement.setAttribute('data-locale', 'en');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
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
                animation: veil-safety-fade 0.4s ease 4s forwards;
              }
              #atelier-veil.veil-dismissed {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
              }
              @media (prefers-reduced-motion: reduce) {
                #atelier-veil {
                  display: none !important;
                }
              }
              @keyframes veil-safety-fade {
                to {
                  opacity: 0;
                  visibility: hidden;
                  pointer-events: none;
                }
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
              .veil-label-dot {
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #E05454;
                animation: veil-pulse 2s ease-in-out infinite;
              }
              [data-theme="day"] #atelier-veil {
                background-color: #F5F1E8;
                color: #26241E;
              }
              [data-theme="day"] #atelier-veil .veil-frame {
                border: 1px solid rgba(33, 72, 184, 0.25);
                background-color: #EEE6D3;
                box-shadow: 0 4px 20px -2px rgba(33, 72, 184, 0.08);
              }
              [data-theme="day"] #atelier-veil .veil-spinner {
                border: 1.5px dashed rgba(33, 72, 184, 0.5);
              }
              [data-theme="day"] #atelier-veil .veil-dot {
                background-color: #2148B8;
              }
              [data-theme="day"] #atelier-veil .veil-label {
                color: #857C68;
              }
              [data-theme="day"] #atelier-veil .veil-label-dot {
                background-color: #2148B8;
              }
              .veil-text-zh {
                display: none;
              }
              .veil-text-en {
                display: inline;
              }
              [lang^="zh"] .veil-text-zh,
              [data-locale="zh"] .veil-text-zh,
              :root[lang^="zh"] .veil-text-zh,
              :root[data-locale="zh"] .veil-text-zh {
                display: inline !important;
              }
              [lang^="zh"] .veil-text-en,
              [data-locale="zh"] .veil-text-en,
              :root[lang^="zh"] .veil-text-en,
              :root[data-locale="zh"] .veil-text-en {
                display: none !important;
              }
            `,
          }}
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `#atelier-veil { display: none !important; }`,
            }}
          />
        </noscript>
        <div id="atelier-veil" aria-hidden="true">
          <div className="veil-frame">
            <div className="veil-spinner" />
            <div className="veil-dot" />
          </div>
          <div className="veil-label">
            <span className="veil-label-dot" />
            <span className="veil-text-en">DEVELOPING EXPOSURE // 35MM</span>
            <span className="veil-text-zh">胶片显影中 // 35MM</span>
          </div>
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
