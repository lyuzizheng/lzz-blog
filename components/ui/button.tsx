import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-safelight disabled:pointer-events-none disabled:opacity-50 font-body select-none",
  {
    variants: {
      variant: {
        default:
          "bg-substrate text-primary border border-border-plate hover:border-border-strong hover:bg-surface active:scale-[0.99]",
        safelight:
          "bg-safelight text-white hover:bg-safelight/90 font-medium tracking-wide shadow-sm active:scale-[0.99]",
        cobalt:
          "bg-cobalt text-white hover:bg-cobalt/90 font-medium tracking-wide shadow-sm active:scale-[0.99]",
        outline:
          "border border-border-plate bg-transparent hover:bg-surface text-primary active:scale-[0.99]",
        ghost:
          "hover:bg-surface text-primary hover:text-primary",
        link:
          "text-safelight underline-offset-4 hover:underline",
        telemetry:
          "font-telemetry text-xs tracking-wider uppercase border border-border-plate bg-chamber hover:border-border-strong text-muted hover:text-primary py-1 px-2.5",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-11 rounded-sm px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
