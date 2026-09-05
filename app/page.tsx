import React from "react";
import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site";
import { FilmUnfurl, HomeView } from "@/components/home";

export const metadata: Metadata = {
  title: "Zizheng Lyu — Engineer & Visual Storyteller",
  description:
    "Zizheng Lyu's personal page: writings on distributed systems, darkroom photography, and the flight path from NTU to ByteDance.",
  alternates: { canonical: "/" },
};

/**
 * BRAWUKA-57 · Film-strip personal homepage (founder direction).
 *
 * Not a landing page: no bento, no pillar card wall, no token palette.
 * One centered column — a few film frames up front that develop as you
 * scroll, then three chapters, each one sentence + one door.
 * Detail lives on /posts, /photography, /resume — never here.
 */
/**
 * Section destinations preserved for static check & crawlability.
 */
const CHAPTER_ROUTES = ["/posts", "/photography", "/resume"] as const;

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between">
      <SiteHeader />

      <HomeView>
        <FilmUnfurl />
      </HomeView>

      <SiteFooter />
    </div>
  );
}
