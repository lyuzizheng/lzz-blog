import type { Translations } from "../types";

export const en: Translations = {
  common: {
    atelier: "LZZ ATELIER",
    backToAtelier: "← LZZ ATELIER",
    loading: "Loading...",
    tbd: "TBD",
    language: "Language",
    theme: "Theme",
  },
  nav: {
    atelier: "ATELIER",
    dispatches: "DISPATCHES",
    darkroom: "DARKROOM",
    flightPath: "FLIGHT PATH",
    status: "STATUS",
    pdf: "DOWNLOAD PDF",
  },
  home: {
    title: "Zizheng Lyu",
    tagline: "LZZ Atelier // Personal Page",
    heroSubtitle:
      "Distributed systems engineer & visual storyteller — writing, photography, and the flight path between.",
    developing: "DEVELOPING · SCROLL TO DEVELOP",
    chapters: {
      writings: {
        title: "Writings",
        sentence: "Long-form thinking on distributed systems and craft.",
        cta: "Enter the archive",
      },
      darkroom: {
        title: "Darkroom",
        sentence: "Light, sedimented on film — Sony A7M4 · 35mm F1.4 GM.",
        cta: "Enter the darkroom",
      },
      flightPath: {
        title: "Flight Path",
        sentence: "NTU to ByteDance, one frame at a time.",
        cta: "Open the dossier",
      },
    },
    colophon: "SET IN NEWSREADER & GEIST MONO",
    rss: "RSS",
  },
  posts: {
    title: "Writing & Dispatches",
    subtitle:
      "Long-form thinking on distributed systems, infrastructure engineering, and personal essays.",
    allChannels: "ALL",
    technical: "TECHNICAL",
    essays: "ESSAYS",
    searchPlaceholder: "Search articles by title, summary, or tag...",
    tagFilter: "Filter by tag:",
    clearTag: "Clear tag",
    noResults: "No matching articles found. Try adjusting your search or filters.",
    yearArchive: "articles",
    readingTime: "min read",
    wordCount: "words",
    backToPosts: "Back to all articles",
    prevPost: "PREVIOUS",
    nextPost: "NEXT",
    toc: "TABLE OF CONTENTS",
    specimenSlug: "SLUG",
    specimenChannel: "CHANNEL",
    specimenStatus: "STATUS",
  },
  photography: {
    badge: "THE DARKROOM CHAMBER",
    title: "The Darkroom",
    description:
      "Photographs captured on Sony A7M4 · 35mm F1.4 GM. Hover or focus any frame for EXIF telemetry, switch ink modes, or open the lightbox.",
    views: {
      masonry: "Masonry",
      reel: "Reel",
      immersive: "Immersive",
    },
    inkLabel: "INK MODE",
    inkModes: {
      true: { label: "TRUE FILM", hint: "Natural film tone" },
      riso: { label: "RISO DUO", hint: "Cobalt & terracotta duotone" },
      cyano: { label: "CYANOTYPE", hint: "Cyanotype blue" },
      halftone: { label: "HALFTONE", hint: "Monochrome halftone" },
    },
    lightbox: {
      hint: "DRAG ↓ 120px DISMISS · SCROLL ZOOM · ESC CLOSE",
      close: "CLOSE",
    },
    exifProbe: {
      title: "EXIF // MECHANICAL PROBE",
      chemistry: "CHEMISTRY",
    },
  },
  resume: {
    navTitle: "RESUME // FLIGHT PATH DOSSIER",
    downloadPdf: "PDF DIRECT",
    printResume: "PRINT RESUME",
    flightPathTitle: "Flight Path — Career & Milestones",
    flightPathSubtitle:
      "Zizheng Lyu — Engineer & Visual Storyteller. A chronicle of engineering milestones from NTU to ByteDance and beyond.",
    timelineAct0: "ACT 0 // developing — 35mm negative development",
    capabilityTitle: "Capability Dossier",
    screenOnly: "// INTERACTIVE · SCREEN ONLY",
    footerNote:
      "Source: docs/CAREER_DOSSIER.md · lib/career-dossier.ts — Verified facts only. TBD metrics require owner confirmation.",
    employment: "Employment",
    act4Human: "ACT 4 · Human Interlude",
    photoRep: "PHOTOGRAPHY · SELECTION",
    lifeBadminton: "LIFE · BADMINTON",
    badmintonMatches: "+ matches/yr",
    badmintonNote:
      "2023 full attendance, coaching since May — still haven't beaten the boss. [VERIFIED:S5]",
    mentorNote: "MENTORSHIP · Structured methodology, sharp engineering focus.",
    liveNote: "LIVE · IN PROGRESS",
    needsOwnerNote: "[NEEDS-OWNER] Public disclosure boundary pending confirmation.",
    archTitle: "ARCH DIAGRAM",
    dimensions: {
      platform: {
        title: "Platform Infrastructure",
        summary: "API gateway PaaS, observability, and release engineering.",
      },
      frontend: {
        title: "Frontend Engineering",
        summary: "Publishing-grade typography and physical micro-interactions.",
      },
      pipeline: {
        title: "Data Pipelines",
        summary: "Offline orchestration and real-time streaming services governance.",
      },
      effectiveness: {
        title: "Engineering Efficiency",
        summary: "Translating production incident firefighting into resilient systems.",
      },
    },
  },
  status: {
    navTitle: "STATUS // EDGE PROBE CONSOLE · ESC RETURN",
    escHint: "ESC RETURN",
    telemetryLabel: "THE DARKROOM TELEMETRY // 01°20′N 103°49′E",
    title: "System Status",
    subtitle:
      "Edge runtime heartbeat, release artifacts, and architecture verification gates. Health probe: /api/health.",
    operational: "OPERATIONAL",
    reprobe: "RE-PROBE ↻",
    cards: {
      pulse: { eyebrow: "SYSTEM PULSE", title: "Live Runtime Status" },
      artifacts: { eyebrow: "ATELIER ARTIFACTS", title: "Release & Artifacts" },
      gates: { eyebrow: "ARCHITECTURE & GATES", title: "Architecture & Verification Gates" },
    },
  },
  footer: {
    connect: "CONNECT",
    copyright: "Zizheng Lyu",
    darkroomChamber: "The Darkroom Chamber",
    printAtelier: "The Digital Darkroom & Print Atelier",
    posts: "POSTS",
    resume: "RESUME",
    status: "STATUS",
    pdf: "PDF DOWNLOAD",
  },
};
