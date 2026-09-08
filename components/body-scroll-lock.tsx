"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/motion/smooth-scroll-provider";

const FIXED_PATHS = new Set(["/", "/resume", "/products"]);

/**
 * Locks body scroll and pauses inertial Lenis on fixed single-screen pages (home, resume, products).
 * Scrollable routes (posts, photography, status) keep vertical scroll but
 * never allow horizontal drag / overscroll.
 */
export function BodyScrollLock() {
  const pathname = usePathname();
  const { lenis } = useLenis();

  useEffect(() => {
    const isFixed = FIXED_PATHS.has(pathname);

    if (isFixed) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    // Horizontal overscroll/drag is always disabled across the whole app.
    document.documentElement.style.overscrollBehaviorX = "none";

    // Vertical overscroll is disabled on fixed pages; left natural on scrollable pages.
    document.documentElement.style.overscrollBehaviorY = isFixed ? "none" : "";
    document.body.style.overflow = isFixed ? "hidden" : "";

    return () => {
      lenis?.start();
      document.documentElement.style.overscrollBehaviorX = "";
      document.documentElement.style.overscrollBehaviorY = "";
      document.body.style.overflow = "";
    };
  }, [pathname, lenis]);

  return null;
}
