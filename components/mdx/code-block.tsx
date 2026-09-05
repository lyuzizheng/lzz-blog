"use client";

import React, { useState, useRef } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  "data-language"?: string;
  "data-theme"?: string;
  children?: React.ReactNode;
}

export function CodeBlock({
  "data-language": language = "code",
  children,
  className = "",
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (!containerRef.current) return;
    const codeElement = containerRef.current.querySelector("pre");
    const textToCopy = codeElement ? codeElement.innerText : "";

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is not available
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayLang = (language || "TEXT").toUpperCase();

  return (
    <div
      ref={containerRef}
      className={`group relative my-6 overflow-hidden rounded-none border border-border-plate bg-surface transition-colors duration-200 ${className}`}
      {...props}
    >
      {/* Code Header Bar with Language and Copy */}
      <div className="flex h-9 items-center justify-between border-b border-border-plate bg-chamber/60 px-4 py-1 text-xs font-telemetry">
        <div className="flex items-center gap-2 text-muted">
          <Terminal className="h-3.5 w-3.5 text-ink-dominant" />
          <span className="font-semibold tracking-wider text-text-primary">
            {displayLang}
          </span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="复制代码"
          className="flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-medium text-text-secondary transition-all hover:bg-surface hover:text-text-primary focus:outline-none focus:ring-1 focus:ring-ink-dominant"
        >
          {copied ? (
            <>
            <Check className="h-3.5 w-3.5 text-ink-dominant" />
            <span className="text-ink-dominant">已复制</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto text-sm">{children}</div>
    </div>
  );
}
