"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Map as MapLibreMap } from "maplibre-gl";
import {
  MapPin as MapPinIcon,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { SafelightSwitch } from "@/components/ui/safelight-switch";
import {
  type DarkroomPhoto,
  type MonoMode,
} from "@/lib/darkroom";
import {
  PHOTO_MAP_PINS,
  MAP_VIEW_PRESETS,
  DEFAULT_MAP_PRESET,
  derivePhotoMapPins,
  formatGpsCoordinates,
  type GeoCoordinates,
  type PhotoMapPin,
} from "@/lib/photo-map";
import "./photo-map-canvas.css";

/* BRAWUKA-343: the atlas runs on MapLibre GL + OpenStreetMap vector tiles —
   a heavy runtime that must never enter the first-load chunk. The canvas and
   the framer-motion drawer both stay behind next/dynamic; the SSR surface is
   the eyebrow, the boot placeholder and the telemetry footer. */
const PhotoMapCanvas = dynamic(
  () => import("./photo-map-canvas").then((mod) => mod.PhotoMapCanvas),
  {
    ssr: false,
    loading: () => <PhotoMapBoot />,
  }
);
const PinCollectionDrawer = dynamic(
  () =>
    import("./pin-collection-drawer").then((mod) => mod.PinCollectionDrawer),
  { ssr: false }
);

const STORAGE_KEY_VISITED = "lzz_visited_photo_pins_v1";

/** SSR + first-paint surface while the maplibre chunk and style JSON load.
    Lives in the shell so it never drags the maplibre chunk into first load. */
function PhotoMapBoot() {
  return (
    <div className="photo-map-boot" aria-hidden="true">
      <span className="photo-map-boot__label">Triangulating Atlas · OSM Vector</span>
    </div>
  );
}

interface PhotoMapProps {
  readonly mode?: MonoMode;
  readonly photos?: ReadonlyArray<DarkroomPhoto>;
  readonly onOpenPhoto?: (photo: DarkroomPhoto) => void;
}

/**
 * BRAWUKA-343 · The Darkroom Atlas — /photography's single, official interface.
 *
 * A full-screen world map on OpenStreetMap data (MapLibre GL + OpenFreeMap
 * vector tiles), pins derived live from `content/photos.json` GPS telemetry
 * (BRAWUKA-65 engine — no hand-written pin dataset). Pin click opens the
 * collection drawer; a photo plate there launches the shared darkroom
 * lightbox. The classic masonry gallery is retired — no parallel view.
 */
export function PhotoMap({ mode = "true", photos, onOpenPhoto }: PhotoMapProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const reducedMotion = usePrefersReducedMotion();

  // Live map instance — arrives once the canvas chunk + style JSON load.
  const mapRef = useRef<MapLibreMap | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Selected pin for the collection drawer
  const [selectedPin, setSelectedPin] = useState<PhotoMapPin | null>(null);
  /* Mount the deferred drawer chunk on first pin click; keep it mounted so
     AnimatePresence can play the exit animation. */
  const [drawerMounted, setDrawerMounted] = useState(false);

  // Visited pins state (stored in localStorage)
  const [visitedIds, setVisitedIds] = useState<Set<string>>(() => new Set());

  // Cursor geo coordinates + zoom telemetry
  const [cursorCoords, setCursorCoords] = useState<GeoCoordinates>({
    lat: DEFAULT_MAP_PRESET.lat,
    lng: DEFAULT_MAP_PRESET.lng,
  });
  const [zoom, setZoom] = useState<number>(DEFAULT_MAP_PRESET.zoom);
  const cursorRafRef = useRef<number | null>(null);
  const pendingCoordsRef = useRef<GeoCoordinates | null>(null);

  // Initialize visited pins from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VISITED);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setVisitedIds(new Set(parsed));
        }
      }
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  const markPinVisited = useCallback((pinId: string) => {
    setVisitedIds((prev) => {
      if (prev.has(pinId)) return prev;
      const next = new Set(prev);
      next.add(pinId);
      try {
        localStorage.setItem(STORAGE_KEY_VISITED, JSON.stringify(Array.from(next)));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  // Pins derived from photos prop (BRAWUKA-66)
  const pins = useMemo(
    () => (photos ? derivePhotoMapPins(photos) : PHOTO_MAP_PINS),
    [photos]
  );

  const handleMapReady = useCallback((map: MapLibreMap) => {
    mapRef.current = map;
    setMapReady(true);
  }, []);

  // rAF-throttled cursor telemetry — at most one state update per frame.
  const handleCursorMove = useCallback((coords: GeoCoordinates) => {
    pendingCoordsRef.current = coords;
    if (!cursorRafRef.current) {
      cursorRafRef.current = requestAnimationFrame(() => {
        cursorRafRef.current = null;
        if (pendingCoordsRef.current) {
          setCursorCoords(pendingCoordsRef.current);
        }
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (cursorRafRef.current) cancelAnimationFrame(cursorRafRef.current);
    };
  }, []);

  const handleZoomChange = useCallback((nextZoom: number) => {
    setZoom(nextZoom);
  }, []);

  // Camera commands — straight onto the live map instance.
  const flyToPreset = useCallback(
    (presetId: string) => {
      const map = mapRef.current;
      if (!map) return;
      if (presetId === "global") {
        fitAllPins();
        return;
      }
      const preset = MAP_VIEW_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      map.flyTo({
        center: [preset.lng, preset.lat],
        zoom: preset.zoom,
        duration: reducedMotion ? 0 : 900,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reducedMotion]
  );

  const fitAllPins = useCallback(() => {
    const map = mapRef.current;
    if (!map || pins.length === 0) return;
    const lngs = pins.map((p) => p.coordinates.lng);
    const lats = pins.map((p) => p.coordinates.lat);
    map.fitBounds(
      [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ],
      {
        padding: { top: 90, bottom: 90, left: 90, right: 90 },
        maxZoom: 10,
        duration: reducedMotion ? 0 : 900,
      }
    );
  }, [pins, reducedMotion]);

  const handleZoomIn = useCallback(() => {
    mapRef.current?.zoomIn({ duration: reducedMotion ? 0 : 200 });
  }, [reducedMotion]);

  const handleZoomOut = useCallback(() => {
    mapRef.current?.zoomOut({ duration: reducedMotion ? 0 : 200 });
  }, [reducedMotion]);

  const handleReset = useCallback(() => {
    flyToPreset(DEFAULT_MAP_PRESET.id);
  }, [flyToPreset]);

  // Pin click handler
  const handlePinClick = useCallback(
    (pin: PhotoMapPin): void => {
      markPinVisited(pin.id);
      setDrawerMounted(true);
      setSelectedPin(pin);
    },
    [markPinVisited]
  );

  return (
    <div
      className="relative flex h-screen w-full flex-col overflow-hidden bg-substrate text-primary select-none"
      role="region"
      aria-label={isZh ? "摄影世界地图" : "Photography Atlas"}
    >
      {/* Q10-A In-Screen Eyebrow */}
      <header
        aria-label={isZh ? "地图暗房眉题" : "Darkroom Atlas Header"}
        className="relative z-20 flex w-full items-center justify-between border-b-2 border-border-strong bg-substrate/90 px-4 py-3 backdrop-blur-sm sm:px-8 sm:py-4"
      >
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="font-telemetry text-xs font-bold tracking-wider text-ink-dominant uppercase hover:underline"
          >
            ← INDEX
          </Link>
          <span className="text-muted">/</span>
          <span className="truncate font-telemetry text-xs font-semibold tracking-widest uppercase text-text-primary">
            {isZh ? "摄影世界地图" : "DARKROOM ATLAS"}
          </span>
          <span className="hidden text-muted sm:inline">·</span>

          {/* Telemetry Indicator (PINS X · VISITED Y) */}
          <div className="flex items-center gap-1.5 whitespace-nowrap rounded-sm border border-border-default bg-surface px-2.5 py-0.5 font-telemetry text-[11px] font-bold tracking-widest uppercase tabular-nums text-text-secondary">
            <MapPinIcon className="h-3 w-3 text-ink-dominant" />
            <span>PINS {pins.length}</span>
            <span className="text-muted">·</span>
            <span className={visitedIds.size > 0 ? "text-ink-dominant" : "text-muted"}>
              VISITED {visitedIds.size}
            </span>
          </div>
        </div>

        {/* Eyebrow Right: LanguageSwitch, SafelightSwitch. The map is the only
            interface — no gallery switcher anywhere on the first screen. */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <LanguageSwitch />
          <SafelightSwitch />
        </div>
      </header>

      {/* Atlas region — the OSM vector canvas fills everything between the
          eyebrow and the telemetry footer. */}
      <div className="relative min-h-0 flex-1">
        <PhotoMapCanvas
          pins={pins}
          visitedIds={visitedIds}
          selectedPinId={selectedPin?.id ?? null}
          reducedMotion={reducedMotion}
          onReady={handleMapReady}
          onPinClick={handlePinClick}
          onCursorMove={handleCursorMove}
          onZoomChange={handleZoomChange}
        />

        {/* Floating HUD Controls (Zoom, Presets, Fit) — live once the map is. */}
        <aside
          aria-label={isZh ? "地图漫游控制面板" : "Map controls"}
          className="pointer-events-auto absolute bottom-4 left-4 z-20 flex flex-col gap-2 sm:left-8"
        >
          <div className="flex flex-col overflow-hidden rounded-sm border border-border-strong bg-surface/95 shadow-md">
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={!mapReady}
              className="flex h-9 w-9 items-center justify-center border-b border-border-default text-text-primary hover:bg-chamber hover:text-ink-dominant transition-colors disabled:opacity-40"
              title={isZh ? "放大地图" : "Zoom In"}
              aria-label={isZh ? "放大地图" : "Zoom In"}
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={!mapReady}
              className="flex h-9 w-9 items-center justify-center border-b border-border-default text-text-primary hover:bg-chamber hover:text-ink-dominant transition-colors disabled:opacity-40"
              title={isZh ? "缩小地图" : "Zoom Out"}
              aria-label={isZh ? "缩小地图" : "Zoom Out"}
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={fitAllPins}
              disabled={!mapReady}
              className="flex h-9 w-9 items-center justify-center border-b border-border-default text-text-primary hover:bg-chamber hover:text-ink-dominant transition-colors disabled:opacity-40"
              title={isZh ? "全览所有图钉" : "Fit All Pins"}
              aria-label={isZh ? "全览所有图钉" : "Fit All Pins"}
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={!mapReady}
              className="flex h-9 w-9 items-center justify-center text-text-primary hover:bg-chamber hover:text-ink-dominant transition-colors disabled:opacity-40"
              title={isZh ? "重置为狮城视角" : "Reset to Singapore"}
              aria-label={isZh ? "重置为狮城视角" : "Reset to Singapore"}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* View Presets Pill Strip */}
          <div className="hidden flex-col gap-1 rounded-sm border border-border-default bg-surface/95 p-1.5 shadow-sm sm:flex">
            <span className="px-1 font-telemetry text-[9px] font-bold tracking-widest uppercase text-muted">
              {isZh ? "聚落速览" : "PRESETS"}
            </span>
            {MAP_VIEW_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => flyToPreset(preset.id)}
                disabled={!mapReady}
                className="rounded-sm px-2 py-1 text-left font-telemetry text-[11px] font-semibold tracking-wider text-text-secondary hover:bg-chamber hover:text-ink-dominant transition-colors disabled:opacity-40"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Pin Collection Slide-Over Drawer — deferred chunk, mounts on first
            pin click and stays mounted for exit animations. */}
        {drawerMounted && (
          <PinCollectionDrawer
            pin={selectedPin}
            mode={mode}
            reducedMotion={reducedMotion}
            onClose={() => setSelectedPin(null)}
            onOpenPhoto={onOpenPhoto}
          />
        )}
      </div>

      {/* In-Screen Footer / Colophon Telemetry */}
      <footer
        aria-label={isZh ? "底图参数与来源" : "Atlas Telemetry & Sources"}
        className="pointer-events-none relative z-10 flex w-full items-center justify-between border-t border-border-default bg-substrate/85 px-4 py-2 font-telemetry text-[11px] tabular-nums text-muted backdrop-blur-sm sm:px-8"
      >
        <div className="flex items-center gap-3">
          <span>{formatGpsCoordinates(cursorCoords)}</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">ZOOM {zoom.toFixed(1)}X</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Basemap credit — the map canvas also carries the live
              OpenFreeMap/OSM attribution control. */}
          <span className="hidden uppercase tracking-wider sm:inline">
            OSM · OPENFREEMAP VECTOR
          </span>
          <span>© 2026 LZZ ATELIER</span>
        </div>
      </footer>
    </div>
  );
}
