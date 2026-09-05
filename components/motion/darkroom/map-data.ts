/**
 * BRAWUKA-65 · Cartographic Vector Atlas Data
 *
 * Paper-printed cartographic dataset for the Darkroom Atlas map:
 * - World continental basemap & landmasses
 * - Maritime Southeast Asia & Singapore Straits archipelago
 * - Silk Road & Central Asian topographic mountain contours
 * - Graticule coordinate grid & nautical labels
 *
 * Projected in standard Web Mercator coordinate space (3600 x 2200).
 */

export interface MapViewPreset {
  readonly id: string;
  readonly label: string;
  readonly hint: string;
  readonly lat: number;
  readonly lng: number;
  readonly zoom: number;
}

export const MAP_VIEW_PRESETS: ReadonlyArray<MapViewPreset> = [
  {
    id: "singapore",
    label: "SINGAPORE",
    hint: "狮城暗房聚落",
    lat: 1.28,
    lng: 103.82,
    zoom: 6.5,
  },
  {
    id: "xinjiang",
    label: "XINJIANG",
    hint: "天山阿勒泰旷野",
    lat: 46.2,
    lng: 85.0,
    zoom: 2.8,
  },
  {
    id: "global",
    label: "ALL PINS",
    hint: "丝路与南洋全览",
    lat: 25.0,
    lng: 96.0,
    zoom: 1.1,
  },
];

export interface CartographicLabel {
  readonly text: string;
  readonly subtext?: string;
  readonly lat: number;
  readonly lng: number;
  readonly size?: "sm" | "md" | "lg";
  readonly tracking?: string;
}

export const CARTOGRAPHIC_LABELS: ReadonlyArray<CartographicLabel> = [
  { text: "SINGAPORE STRAIT", subtext: "SELAT SINGAPURA · 1°14'N", lat: 1.18, lng: 103.88, size: "sm" },
  { text: "MALACCA STRAIT", subtext: "SELAT MELAKA · 2°00'N", lat: 2.2, lng: 102.1, size: "sm" },
  { text: "SOUTH CHINA SEA", subtext: "MARITIME ROUTE N1 · 5°00'N", lat: 5.5, lng: 106.5, size: "md" },
  { text: "TIAN SHAN RANGE", subtext: "ALTAY MASSIF · 46°00'N", lat: 45.8, lng: 84.5, size: "md" },
  { text: "EURASIAN CONTINENT", subtext: "LZZ EXPEDITION CORRIDOR", lat: 33.0, lng: 102.0, size: "lg" },
];

export interface GraticuleLine {
  readonly id: string;
  readonly label: string;
  readonly isEquator?: boolean;
  readonly isPrimeMeridian?: boolean;
  readonly path: string;
}

/**
 * Generate graticule lines across 3600 x 2200 Mercator space.
 */
export function generateGraticules(W = 3600, H = 2200): GraticuleLine[] {
  const lines: GraticuleLine[] = [];

  // Parallels (latitudes)
  const parallels = [-60, -45, -30, -15, 0, 15, 30, 45, 60, 75];
  for (const lat of parallels) {
    const latRad = (lat * Math.PI) / 180;
    const y = H / 2 - (W / (2 * Math.PI)) * Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    if (y >= 0 && y <= H) {
      const label = lat === 0 ? "0° EQUATOR" : `${Math.abs(lat)}°${lat > 0 ? "N" : "S"}`;
      lines.push({
        id: `lat-${lat}`,
        label,
        isEquator: lat === 0,
        path: `M 0,${y.toFixed(1)} L ${W},${y.toFixed(1)}`,
      });
    }
  }

  // Meridians (longitudes)
  const meridians = [-180, -150, -120, -90, -60, -30, 0, 30, 60, 75, 90, 105, 120, 135, 150, 180];
  for (const lng of meridians) {
    const x = ((lng + 180) / 360) * W;
    const label = lng === 0 ? "0° MERIDIAN" : `${Math.abs(lng)}°${lng > 0 ? "E" : "W"}`;
    lines.push({
      id: `lng-${lng}`,
      label,
      isPrimeMeridian: lng === 0,
      path: `M ${x.toFixed(1)},0 L ${x.toFixed(1)},${H}`,
    });
  }

  return lines;
}

/**
 * Simplified world continent SVG paths (Mercator W=3600, H=2200).
 * Precision crafted to capture Eurasia, China, Malay Peninsula, and surrounding seas.
 */
export const CONTINENT_PATHS: ReadonlyArray<{ readonly id: string; readonly name: string; readonly d: string }> = [
  {
    id: "eurasia-mainland",
    name: "Eurasia Mainland",
    d: "M 2000,320 L 2250,280 L 2500,290 L 2700,340 L 2950,420 L 3100,560 L 3200,750 L 3150,900 L 3050,980 L 2980,1020 L 2900,1000 L 2850,1050 L 2840,1082 L 2835,1085 L 2830,1060 L 2810,1020 L 2750,1000 L 2650,980 L 2550,1020 L 2450,1050 L 2350,1000 L 2250,920 L 2150,850 L 2050,750 L 1950,650 L 1900,520 Z",
  },
  {
    id: "sumatra",
    name: "Sumatra Island",
    d: "M 2760,1040 L 2810,1070 L 2850,1110 L 2870,1170 L 2860,1190 L 2820,1160 L 2780,1120 L 2750,1080 Z",
  },
  {
    id: "borneo",
    name: "Borneo Island",
    d: "M 2890,1050 L 2940,1040 L 2970,1080 L 2980,1140 L 2950,1160 L 2900,1140 L 2880,1090 Z",
  },
  {
    id: "java",
    name: "Java Island",
    d: "M 2860,1200 L 2950,1210 L 2980,1215 L 2960,1225 L 2880,1220 Z",
  },
  {
    id: "japan-archipelago",
    name: "Japanese Archipelago",
    d: "M 3140,780 L 3180,740 L 3210,700 L 3220,720 L 3180,770 L 3150,810 Z",
  },
  {
    id: "philippines",
    name: "Philippines Archipelago",
    d: "M 3000,980 L 3020,1020 L 3030,1070 L 3015,1070 L 3000,1030 Z",
  },
  {
    id: "australia",
    name: "Australia",
    d: "M 2950,1350 L 3150,1320 L 3250,1450 L 3200,1620 L 3000,1650 L 2920,1500 Z",
  },
  {
    id: "africa",
    name: "Africa",
    d: "M 1850,800 L 2050,780 L 2150,880 L 2180,1000 L 2150,1150 L 2100,1350 L 2000,1450 L 1950,1380 L 1880,1150 L 1750,1000 L 1800,850 Z",
  },
  {
    id: "americas",
    name: "Americas",
    d: "M 800,300 L 1100,280 L 1250,450 L 1150,750 L 1050,880 L 1120,950 L 1280,1050 L 1320,1250 L 1250,1550 L 1150,1650 L 1100,1500 L 1180,1200 L 1000,980 L 850,700 Z",
  },
];

/**
 * Detailed local Singapore Island & Southern Islands polygon paths
 * positioned exactly in Mercator space around (2838.5, 1087.2).
 */
export const SINGAPORE_DETAILED_PATHS: ReadonlyArray<{ readonly id: string; readonly name: string; readonly d: string }> = [
  {
    id: "singapore-main-island",
    name: "Pulau Ujong (Singapore Main Island)",
    d: "M 2836.0,1086.2 C 2836.5,1086.0 2837.2,1086.1 2838.0,1086.3 C 2839.0,1086.5 2840.0,1086.7 2840.5,1087.0 C 2840.8,1087.3 2840.5,1087.8 2839.8,1088.0 C 2839.0,1088.2 2838.2,1088.1 2837.5,1087.9 C 2836.8,1087.7 2836.2,1087.5 2835.8,1087.0 C 2835.5,1086.6 2835.7,1086.3 2836.0,1086.2 Z",
  },
  {
    id: "sentosa-island",
    name: "Sentosa Island",
    d: "M 2837.8,1088.1 C 2838.2,1088.1 2838.5,1088.3 2838.4,1088.4 C 2838.2,1088.6 2837.7,1088.5 2837.6,1088.3 C 2837.6,1088.2 2837.7,1088.1 2837.8,1088.1 Z",
  },
  {
    id: "jurong-island",
    name: "Jurong Island",
    d: "M 2835.9,1087.7 C 2836.3,1087.6 2836.6,1087.9 2836.5,1088.1 C 2836.2,1088.2 2835.7,1088.0 2835.7,1087.8 C 2835.7,1087.7 2835.8,1087.7 2835.9,1087.7 Z",
  },
];

/**
 * Topographic contour paths for Altay / Central Asian mountains (Mercator ~2681, 554).
 */
export const TOPOGRAPHIC_CONTOURS: ReadonlyArray<{ readonly id: string; readonly name: string; readonly d: string }> = [
  {
    id: "altay-contour-outer",
    name: "Altay Massif 2000m",
    d: "M 2640,580 Q 2670,540 2710,550 Q 2730,570 2700,600 Q 2660,610 2640,580 Z",
  },
  {
    id: "altay-contour-inner",
    name: "Altay Peak 3500m",
    d: "M 2665,565 Q 2685,545 2700,555 Q 2710,570 2690,580 Q 2675,585 2665,565 Z",
  },
  {
    id: "sayram-lake-basin",
    name: "Sayram Lake Basin 2073m",
    d: "M 2600,610 Q 2620,595 2630,605 Q 2625,620 2605,625 Q 2595,620 2600,610 Z",
  },
];
