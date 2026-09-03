/**
 * LZZ Blog Design Tokens & Physical Engine Definitions
 * Concept: The Digital Darkroom & Print Atelier
 * 
 * Strict TypeScript Types & Constants for 2026 Atelier Aesthetic
 */

export type ThemeMode = 'day' | 'night';

export interface InkDefinition {
  readonly hex: string;
  readonly name: string;
  readonly rgb: [number, number, number];
  readonly share: number;
}

export interface ColorModeTokens {
  readonly name: string;
  readonly substrate: string;
  readonly surface: string;
  readonly chamber: string;
  readonly dominantInk: InkDefinition;
  readonly accentInk: InkDefinition;
  readonly overprint: string;
  readonly text: {
    readonly primary: string;
    readonly secondary: string;
    readonly muted: string;
    readonly badge: string;
  };
  readonly border: {
    readonly default: string;
    readonly strong: string;
  };
  readonly blendMode: 'multiply' | 'screen';
}

export const colorTokens: Record<ThemeMode, ColorModeTokens> = {
  day: {
    name: 'Daylight Print Atelier',
    substrate: '#FAFAF7',
    surface: '#F0F0EB',
    chamber: '#E9E9E5',
    dominantInk: {
      hex: '#2148B8',
      name: 'Cobalt Blue',
      rgb: [33, 72, 184],
      share: 0.8,
    },
    accentInk: {
      hex: '#C65F38',
      name: 'Terracotta Orange',
      rgb: [198, 95, 56],
      share: 0.2,
    },
    overprint: '#18224B',
    text: {
      primary: '#1C2B54',
      secondary: '#35477D',
      muted: '#6B7C9E',
      badge: '#FAFAF7',
    },
    border: {
      default: 'rgba(33, 72, 184, 0.25)',
      strong: '#2148B8',
    },
    blendMode: 'multiply',
  },
  night: {
    name: 'Safelight Darkroom',
    substrate: '#0D0E11',
    surface: '#14151B',
    chamber: '#181920',
    dominantInk: {
      hex: '#E54B4B',
      name: 'Kodak Safelight Red',
      rgb: [229, 75, 75],
      share: 0.75,
    },
    accentInk: {
      hex: '#F3E8D6',
      name: 'Luminescent Cream',
      rgb: [243, 232, 214],
      share: 0.25,
    },
    overprint: '#FF5A5A',
    text: {
      primary: '#F3E8D6',
      secondary: 'rgba(243, 232, 214, 0.82)',
      muted: 'rgba(243, 232, 214, 0.55)',
      badge: '#0D0E11',
    },
    border: {
      default: 'rgba(229, 75, 75, 0.35)',
      strong: '#E54B4B',
    },
    blendMode: 'screen',
  },
} as const;

export const typographyTokens = {
  fonts: {
    display: "'Newsreader', 'Playfair Display', 'Cormorant', Georgia, serif",
    body: "'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    telemetry: "'Geist Mono', 'JetBrains Mono', 'SF Mono', monospace",
  },
  scale: {
    displayXXL: 'clamp(4.5rem, 9vw, 9.5rem)',
    displayXL: 'clamp(2.75rem, 5vw, 5rem)',
    h1: '2.25rem',
    h2: '1.5rem',
    h3: '1.25rem',
    body: '1.0625rem',
    caption: '0.875rem',
    telemetry: '0.75rem',
  },
} as const;

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

/**
 * Format standard EXIF Telemetry Badge for the Darkroom Gallery
 */
export function formatExifTelemetry(params: {
  camera: string;
  lens: string;
  aperture: string;
  shutter: string;
  iso: number | string;
}): string {
  return `${params.camera} · ${params.lens} · ${params.aperture} · ${params.shutter} · ISO ${params.iso}`;
}
