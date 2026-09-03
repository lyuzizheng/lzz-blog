"use client";

import React, { useState } from "react";

type IdentityFilter = "all" | "engineer" | "photographer";

/**
 * IdentityFilter: home hero filter switcher (client island).
 * Extracted so app/page.tsx stays a server component for SEO + first-paint.
 */
export function IdentityFilter() {
  const [activeFilter, setActiveFilter] = useState<IdentityFilter>("all");

  return (
    <div className="flex items-center gap-1 rounded-sm border border-border-plate bg-chamber p-1 font-telemetry text-xs">
      {(["all", "engineer", "photographer"] as const).map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          aria-pressed={activeFilter === filter}
          className={`px-3 py-1 uppercase rounded-xs transition-colors cursor-pointer ${
            activeFilter === filter
              ? "bg-substrate text-primary border border-border-strong font-semibold shadow-xs"
              : "text-secondary hover:text-primary hover:bg-surface/50"
          }`}
        >
          [{filter}]
        </button>
      ))}
    </div>
  );
}
