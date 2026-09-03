"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
  className?: string;
}

/**
 * SpotlightCard: Physical plate card with dynamic specular highlight following the cursor.
 * Uses CSS radial gradient calculations for 60/120fps GPU performance with zero layout shift.
 */
export function SpotlightCard({
  children,
  spotlightColor,
  spotlightSize = 350,
  className,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -999, y: -999 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border-plate bg-surface p-6 transition-colors duration-300",
        className
      )}
      {...props}
    >
      {/* Specular Spotlight Gradient Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${
            spotlightColor || "var(--border-plate-strong)"
          } 0%, transparent 70%)`,
          maskImage: "radial-gradient(circle at center, black, transparent)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent)",
          mixBlendMode: "var(--blend-mode-ink)" as React.CSSProperties["mixBlendMode"],
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
