import type { Translations } from "../types";

export const en: Translations = {
  common: {
    atelier: "LZZ ATELIER",
    backToAtelier: "← Back to Home",
    loading: "Loading...",
    developingExposure: "DEVELOPING EXPOSURE // 35MM",
    tbd: "TBD",
    language: "Language",
    theme: "Theme",
  },
  nav: {
    atelier: "ATELIER",
    dispatches: "DISPATCHES",
    darkroom: "DARKROOM",
    flightPath: "FLIGHT PATH",
    products: "PRODUCTS",
    status: "STATUS",
    pdf: "DOWNLOAD PDF",
  },
  home: {
    title: "Zizheng Lyu",
    tagline: "Full-Stack Engineer · Loves Photography",
    heroSubtitle:
      "Writes a bit of code | Loves photography & documenting life | Just renovated my home | ENFJ-A | A bit random, always down for a trip | Always believe that something wonderful is about to happen!",
    developing: "DEVELOPING · SCROLL TO DEVELOP",
    chapters: {
      writings: {
        title: "Writings",
        sentence: "Long-form thinking on distributed systems, infrastructure, and engineering in practice.",
        cta: "Browse all articles",
      },
      darkroom: {
        title: "Photography",
        sentence: "Capturing everyday moments with a Sony A7M4 · 35mm F1.4 GM.",
        cta: "View photographs",
      },
      flightPath: {
        title: "Career & Milestones",
        sentence: "From NTU to ByteDance: engineering journey and milestones.",
        cta: "View full resume",
      },
    },
    colophon: "SET IN NEWSREADER & GEIST MONO",
    rss: "RSS",
    films: {
      blogs: "Blogs",
      career: "Career",
      photography: "Photography",
      projects: "Projects",
      records: "Records",
      label: "Chapter index — five negatives scattered on the light table",
    },
  },
  weeklyRecords: {
    title: "Weekly Records",
    subtitle:
      "A chronological record of the personal and professional threads that shaped each week.",
    personal: "Personal",
    personalDescription: "Life outside work, curated separately.",
    personalEmpty: "Personal notes will appear here when they are ready to be shared.",
    work: "Work",
    workDescription:
      "Public-safe weekly delivery notes, assembled from collaboration, planning, and engineering records.",
    agentMaintained: "Updated weekly by agents",
    atAGlance: "At a glance",
    calendarCoverage: "Calendar coverage",
    coverageNote:
      "Work records are synchronised from the public-safe Weekly Record. Personal records are never changed by the weekly agent workflow.",
  },
  posts: {
    noResults: "No articles found. Try adjusting your search query or filters.",
    yearArchive: "posts",
    readingTime: "min read",
    wordCount: "words",
    backToPosts: "Back to all posts",
    prevPost: "Previous",
    nextPost: "Next",
    toc: "Table of Contents",
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
  products: {
    title: "Independent Products & Works",
    subtitle: "Curated Independent Engineering & Digital Experiments",
    badge: "04 // INDEPENDENT PRODUCTS & FORGE",
    deckHint: "Single Page · 3 Curated Products",
    scrollDown: "Scroll down for more ↓",
    externalLink: "External Channel",
    status: "Status Stamp",
    viewCode: "View Source ↗",
    visitSite: "Visit Website ↗",
    githubRepo: "GitHub Open Source Repository",
    liveSite: "Verified Official Live URL",
    summary: "3 Experiments · Zero Ads · Local-first & Community Utility",
  },
};
