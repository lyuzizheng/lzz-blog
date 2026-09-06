import type { Translations } from "../types";

export const en: Translations = {
  common: {
    atelier: "LZZ ATELIER",
    backToAtelier: "← Back to Home",
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
    products: "PRODUCTS",
    status: "STATUS",
    pdf: "DOWNLOAD PDF",
  },
  home: {
    title: "Zizheng Lyu",
    tagline: "Full-Stack Engineer · Loves Photography",
    heroSubtitle:
      "A full-stack engineer who loves building thoughtful products from the user's shoes. I enjoy collaborating with teammates, turning ideas into finished products, and exploring new tech. I firmly believe good software should genuinely help people and do good for society. Outside of code, I'm really into photography and capturing everyday life.",
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
      label: "Chapter index — four negatives scattered on the light table",
    },
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
    title: "Products & Works",
    subtitle: "Curated Independent Engineering & Digital Experiments",
    deckHint: "One product per frame · Scroll or Arrow keys to navigate",
    scrollDown: "Scroll down for next product ↓",
    externalLink: "External Channel",
    status: "Status Stamp",
  },
};
