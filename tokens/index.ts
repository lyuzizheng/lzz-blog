/**
 * LZZ Blog Design Tokens & Physical Engine Definitions
 * Concept: The Digital Darkroom & Print Atelier
 */

export const motionPhysics = {
  lenis: {
    lerp: 0.08,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  },
  springs: {
    snappy: { stiffness: 450, damping: 30, mass: 0.8 },
    trayFloat: { stiffness: 220, damping: 24, mass: 1.2 },
    cursorTrack: { stiffness: 150, damping: 18, mass: 0.6 },
    dossierDrawer: { stiffness: 300, damping: 32, mass: 1.0 },
  },
} as const;
