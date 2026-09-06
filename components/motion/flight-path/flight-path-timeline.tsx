"use client";

import React from "react";
import { CareerDeck } from "@/components/motion/career-deck";

/**
 * BRAWUKA-93: Horizontal Reel Timeline (GSAP pinned scrub) has been gracefully retired.
 *
 * Replaced by the vertical snap-deck story experience (CareerDeck):
 * - 100dvh vertical snap-scroll story deck
 * - Thematic stage canvas per act
 * - Verified battle metrics (30k+ cases/mo, £80k/mo savings, 20+ microservices)
 * - Keyboard & touch gesture navigation
 */
export function FlightPathTimeline() {
  return <CareerDeck />;
}
