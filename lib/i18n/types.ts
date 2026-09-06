export type Locale = "en" | "zh";

export interface Translations {
  common: {
    atelier: string;
    backToAtelier: string;
    loading: string;
    developingExposure: string;
    tbd: string;
    language: string;
    theme: string;
  };
  nav: {
    atelier: string;
    dispatches: string;
    darkroom: string;
    flightPath: string;
    products: string;
    status: string;
    pdf: string;
  };
  home: {
    title: string;
    tagline: string;
    heroSubtitle: string;
    developing: string;
    chapters: {
      writings: {
        title: string;
        sentence: string;
        cta: string;
      };
      darkroom: {
        title: string;
        sentence: string;
        cta: string;
      };
      flightPath: {
        title: string;
        sentence: string;
        cta: string;
      };
    };
    colophon: string;
    rss: string;
    films: {
      blogs: string;
      career: string;
      photography: string;
      projects: string;
      label: string;
    };
  };
  posts: {
    noResults: string;
    yearArchive: string;
    readingTime: string;
    wordCount: string;
    backToPosts: string;
    prevPost: string;
    nextPost: string;
    toc: string;
    specimenSlug: string;
    specimenChannel: string;
    specimenStatus: string;
  };
  photography: {
    badge: string;
    title: string;
    description: string;
    views: {
      masonry: string;
      reel: string;
      immersive: string;
    };
    inkLabel: string;
    inkModes: {
      true: { label: string; hint: string };
      riso: { label: string; hint: string };
      cyano: { label: string; hint: string };
      halftone: { label: string; hint: string };
    };
    lightbox: {
      hint: string;
      close: string;
    };
    exifProbe: {
      title: string;
      chemistry: string;
    };
  };
  resume: {
    navTitle: string;
    downloadPdf: string;
    printResume: string;
    flightPathTitle: string;
    flightPathSubtitle: string;
    timelineAct0: string;
    capabilityTitle: string;
    screenOnly: string;
    footerNote: string;
    employment: string;
    act4Human: string;
    photoRep: string;
    lifeBadminton: string;
    badmintonMatches: string;
    badmintonNote: string;
    mentorNote: string;
    liveNote: string;
    needsOwnerNote: string;
    archTitle: string;
    dimensions: {
      platform: { title: string; summary: string };
      frontend: { title: string; summary: string };
      pipeline: { title: string; summary: string };
      effectiveness: { title: string; summary: string };
    };
  };
  status: {
    navTitle: string;
    escHint: string;
    telemetryLabel: string;
    title: string;
    subtitle: string;
    operational: string;
    reprobe: string;
    cards: {
      pulse: { eyebrow: string; title: string };
      artifacts: { eyebrow: string; title: string };
      gates: { eyebrow: string; title: string };
    };
  };
  footer: {
    connect: string;
    copyright: string;
    darkroomChamber: string;
    printAtelier: string;
    posts: string;
    resume: string;
    status: string;
    pdf: string;
  };
  products: {
    title: string;
    subtitle: string;
    deckHint: string;
    scrollDown: string;
    externalLink: string;
    status: string;
  };
}
