import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-normal transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "border border-border-plate bg-surface text-primary",
        telemetry:
          "font-telemetry text-[11px] tracking-widest uppercase border border-border-plate bg-chamber text-muted tabular-nums",
        safelight:
          "border border-safelight/40 bg-safelight/10 text-safelight font-telemetry text-[11px] tracking-wider uppercase",
        cobalt:
          "border border-cobalt/40 bg-cobalt/10 text-cobalt font-telemetry text-[11px] tracking-wider uppercase",
        terracotta:
          "border border-terracotta/40 bg-terracotta/10 text-terracotta font-telemetry text-[11px] tracking-wider uppercase",
        outline:
          "text-primary border border-border-plate",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
