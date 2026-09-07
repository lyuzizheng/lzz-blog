"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const FIXED_PATHS = new Set(["/", "/resume", "/products"]);

/**
 * Locks body scroll on fixed single-screen pages (home, resume, products).
 * Scrollable routes (posts, photography, status) are left untouched.
 */
export function BodyScrollLock() {
  const pathname = usePathname();

  useEffect(() => {
    const isFixed = FIXED_PATHS.has(pathname);
    document.body.style.overflow = isFixed ? "hidden" : "";
    document.documentElement.style.overscrollBehavior = isFixed ? "none" : "";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, [pathname]);

  return null;
}
