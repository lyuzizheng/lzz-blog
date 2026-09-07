"use client";

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Layers,
  MapPin as MapPinIcon,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  X,
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
  formatGpsCoordinates,
  projectMercator,
  unprojectMercator,
  type GeoCoordinates,
  type PhotoMapPin,
} from "@/lib/photo-map";
import {
  CARTOGRAPHIC_LABELS,
  CONTINENT_PATHS,
  MAP_VIEW_PRESETS,
  SINGAPORE_DETAILED_PATHS,
  TOPOGRAPHIC_CONTOURS,
  generateGraticules,
} from "./map-data";
import { PhotoPlate } from "./photo-plate";

const STORAGE_KEY_VISITED = "lzz_visited_photo_pins_v1";
const MAP_WORLD_W = 3600;
const MAP_WORLD_H = 2200;
const MIN_ZOOM = 0.8;
const MAX_ZOOM = 14;

interface PhotoMapProps {
  readonly mode?: MonoMode;
  readonly onOpenPhoto?: (photo: DarkroomPhoto) => void;
  readonly onSwitchToMasonry?: () => void;
}

/**
 * BRAWUKA-65 · Fullscreen Draggable Paper Map with Visited Pins.
 *
 * Implements Phase 2-4 specifications:
 * 1. Fullscreen interactive map with inertial pan & damping.
 * 2. Pin coordinates parsed strictly from `content/photos.json` (no secondary dataset).
 * 3. Mono-color paper print aesthetics: `#F5F1E8` paper base, halftone dot matrix,
 *    cartographic graticule rules, cobalt blue pins (`#2148B8` / `#E05454`).
 * 4. Q10-A Eyebrow with `PINS X · VISITED Y` telemetry, LanguageSwitch, and SafelightSwitch.
 * 5. Pin click opens location collection drawer; clicking a photo launches Darkroom Lightbox.
 * 6. Risk control: prefers-reduced-motion disables inertia; touch-action isolation;
 *    instant fallback to masonry list.
 */
export function PhotoMap({
  mode = "true",
  onOpenPhoto,
  onSwitchToMasonry,
}: PhotoMapProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const reducedMotion = usePrefersReducedMotion();
  const patternId = useId().replace(/[^a-zA-Z0-9]/g, "");

  // Container & viewport dimensions
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState<{ w: number; h: number }>({ w: 1200, h: 800 });

  // Pan and Zoom transform state
  const [zoom, setZoom] = useState<number>(1.2);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Selected pin for collection drawer
  const [selectedPin, setSelectedPin] = useState<PhotoMapPin | null>(null);

  // Visited pins state (stored in localStorage)
  const [visitedIds, setVisitedIds] = useState<Set<string>>(() => new Set());

  // Cursor geo coordinates readout
  const [cursorCoords, setCursorCoords] = useState<GeoCoordinates>({ lat: 1.28, lng: 103.85 });

  // Dragging & inertial physics refs
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPosRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });
  const animFrameRef = useRef<number | null>(null);
  const pinchDistRef = useRef<number | null>(null);

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

  // Update container dimensions
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateSize = (): void => {
      const rect = el.getBoundingClientRect();
      setViewportSize({ w: rect.width || window.innerWidth, h: rect.height || window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Pins derived from photos
  const pins = PHOTO_MAP_PINS;

  // Graticules cache
  const graticules = useMemo(() => generateGraticules(MAP_WORLD_W, MAP_WORLD_H), []);

  // Helper: center viewport on target lat/lng and zoom
  const centerOnCoordinates = useCallback(
    (lat: number, lng: number, targetZoom: number) => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      const { nx, ny } = projectMercator({ lat, lng });
      const targetX = nx * MAP_WORLD_W;
      const targetY = ny * MAP_WORLD_H;
      const newPanX = viewportSize.w / 2 - targetX * targetZoom;
      const newPanY = viewportSize.h / 2 - targetY * targetZoom;

      setZoom(targetZoom);
      setPan({ x: newPanX, y: newPanY });
    },
    [viewportSize],
  );

  // Initial centering on Singapore preset
  const hasInitializedRef = useRef(false);
  useEffect(() => {
    if (hasInitializedRef.current || viewportSize.w === 0) return;
    hasInitializedRef.current = true;
    const defaultPreset = MAP_VIEW_PRESETS[0]; // Singapore
    centerOnCoordinates(defaultPreset.lat, defaultPreset.lng, defaultPreset.zoom);
  }, [centerOnCoordinates, viewportSize]);

  // Pointer event handlers for drag & pan
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    // Only handle primary button / touch
    if (e.button !== 0 && e.pointerType === "mouse") return;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { x: pan.x, y: pan.y };
    lastPosRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    velocityRef.current = { vx: 0, vy: 0 };

    // Capture pointer
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    // Calculate cursor world coords for telemetry
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const screenX = e.clientX - rect.left;
      const screenY = e.clientY - rect.top;
      const worldX = (screenX - pan.x) / zoom;
      const worldY = (screenY - pan.y) / zoom;
      const nx = worldX / MAP_WORLD_W;
      const ny = worldY / MAP_WORLD_H;
      if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
        setCursorCoords(unprojectMercator(nx, ny));
      }
    }

    if (!isDraggingRef.current) return;

    const now = performance.now();
    const dt = Math.max(now - lastPosRef.current.time, 1);
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;

    velocityRef.current = {
      vx: (dx / dt) * 16,
      vy: (dy / dt) * 16,
    };

    lastPosRef.current = { x: e.clientX, y: e.clientY, time: now };

    const totalDx = e.clientX - dragStartRef.current.x;
    const totalDy = e.clientY - dragStartRef.current.y;

    setPan({
      x: panStartRef.current.x + totalDx,
      y: panStartRef.current.y + totalDy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    // If reduced motion, stop immediately with zero coasting
    if (reducedMotion) return;

    const vxInit = velocityRef.current.vx;
    const vyInit = velocityRef.current.vy;
    if (Math.abs(vxInit) < 0.1 && Math.abs(vyInit) < 0.1) return;

    let vx = vxInit;
    let vy = vyInit;
    const DAMPING = 0.92;

    const inertialStep = (): void => {
      vx *= DAMPING;
      vy *= DAMPING;

      if (Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05) {
        animFrameRef.current = null;
        return;
      }

      setPan((prev) => ({
        x: prev.x + vx,
        y: prev.y + vy,
      }));

      animFrameRef.current = requestAnimationFrame(inertialStep);
    };

    animFrameRef.current = requestAnimationFrame(inertialStep);
  };

  // Wheel zoom centered at mouse pointer
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Zoom multiplier
    const factor = e.deltaY < 0 ? 1.15 : 0.85;
    const nextZoom = Math.min(Math.max(zoom * factor, MIN_ZOOM), MAX_ZOOM);

    // Maintain point under cursor
    const pointX = (mouseX - pan.x) / zoom;
    const pointY = (mouseY - pan.y) / zoom;

    const nextPanX = mouseX - pointX * nextZoom;
    const nextPanY = mouseY - pointY * nextZoom;

    setZoom(nextZoom);
    setPan({ x: nextPanX, y: nextPanY });
  };

  // Touch pinch-to-zoom support
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

      if (pinchDistRef.current !== null && pinchDistRef.current > 0) {
        const factor = dist / pinchDistRef.current;
        const nextZoom = Math.min(Math.max(zoom * factor, MIN_ZOOM), MAX_ZOOM);

        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const midX = (t1.clientX + t2.clientX) / 2 - rect.left;
          const midY = (t1.clientY + t2.clientY) / 2 - rect.top;
          const pointX = (midX - pan.x) / zoom;
          const pointY = (midY - pan.y) / zoom;

          setZoom(nextZoom);
          setPan({
            x: midX - pointX * nextZoom,
            y: midY - pointY * nextZoom,
          });
        }
      }
      pinchDistRef.current = dist;
    }
  };

  const handleTouchEnd = (): void => {
    pinchDistRef.current = null;
  };

  // Zoom control buttons
  const handleZoomIn = (): void => {
    const nextZoom = Math.min(zoom * 1.35, MAX_ZOOM);
    const centerX = viewportSize.w / 2;
    const centerY = viewportSize.h / 2;
    const pointX = (centerX - pan.x) / zoom;
    const pointY = (centerY - pan.y) / zoom;
    setZoom(nextZoom);
    setPan({ x: centerX - pointX * nextZoom, y: centerY - pointY * nextZoom });
  };

  const handleZoomOut = (): void => {
    const nextZoom = Math.max(zoom * 0.75, MIN_ZOOM);
    const centerX = viewportSize.w / 2;
    const centerY = viewportSize.h / 2;
    const pointX = (centerX - pan.x) / zoom;
    const pointY = (centerY - pan.y) / zoom;
    setZoom(nextZoom);
    setPan({ x: centerX - pointX * nextZoom, y: centerY - pointY * nextZoom });
  };

  const handleReset = (): void => {
    const defaultPreset = MAP_VIEW_PRESETS[0];
    centerOnCoordinates(defaultPreset.lat, defaultPreset.lng, defaultPreset.zoom);
  };

  const handleFitPins = (): void => {
    // Show all pins
    const globalPreset = MAP_VIEW_PRESETS[2];
    centerOnCoordinates(globalPreset.lat, globalPreset.lng, globalPreset.zoom);
  };

  // Pin click handler
  const handlePinClick = (pin: PhotoMapPin): void => {
    markPinVisited(pin.id);
    setSelectedPin(pin);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full flex-col overflow-hidden bg-substrate select-none touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="摄影全屏拖拽地图"
    >
      {/* Halftone & Paper Texture Layer */}
      <div className="halftone-screen pointer-events-none absolute inset-0 z-0 opacity-25" />

      {/* SVG Map Canvas */}
      <svg
        className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        <defs>
          {/* Lithographic Halftone Pattern */}
          <pattern
            id={`dots-${patternId}`}
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.1" className="fill-ink-dominant/20" />
            <circle cx="9" cy="9" r="0.9" className="fill-ink-dominant/15" />
          </pattern>

          {/* Paper Ink Filter */}
          <filter id={`grain-${patternId}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0" />
          </filter>
        </defs>

        {/* Ocean Background Tint with Halftone Screen */}
        <rect width="100%" height="100%" className="fill-substrate" />
        <rect width="100%" height="100%" fill={`url(#dots-${patternId})`} opacity="0.6" />

        {/* Transforming Virtual Map Group */}
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Graticule Latitude & Longitude Coordinate Grid */}
          <g className="graticule-lines stroke-border-default/40" strokeWidth={1 / zoom} strokeDasharray="4 6">
            {graticules.map((gLine) => (
              <path key={gLine.id} d={gLine.path} />
            ))}
          </g>

          {/* Graticule Labels */}
          <g className="graticule-labels fill-muted/70 font-telemetry" fontSize={10 / zoom}>
            {graticules.slice(0, 10).map((gLine) => (
              <text key={`label-${gLine.id}`} x={120} y={parseFloat(gLine.path.split(",")[1]) - 4 / zoom}>
                {gLine.label}
              </text>
            ))}
          </g>

          {/* Continents & Landmasses */}
          <g className="continents fill-surface/90 stroke-border-default" strokeWidth={1.2 / zoom}>
            {CONTINENT_PATHS.map((continent) => (
              <path key={continent.id} d={continent.d} />
            ))}
          </g>

          {/* Topographic Mountain Contours (Altay/Xinjiang Massif) */}
          <g className="topography stroke-ink-dominant/30 fill-none" strokeWidth={0.8 / zoom} strokeDasharray="2 3">
            {TOPOGRAPHIC_CONTOURS.map((contour) => (
              <path key={contour.id} d={contour.d} />
            ))}
          </g>

          {/* Detailed Singapore Island & Straits Coastlines */}
          <g className="singapore-coastline fill-chamber stroke-ink-dominant/50" strokeWidth={0.6 / zoom}>
            {SINGAPORE_DETAILED_PATHS.map((sgPath) => (
              <path key={sgPath.id} d={sgPath.d} />
            ))}
          </g>

          {/* Maritime Straits & Cartographic Annotations */}
          <g className="cartographic-labels fill-text-secondary/60 font-telemetry select-none" textAnchor="middle">
            {CARTOGRAPHIC_LABELS.map((item) => {
              const { nx, ny } = projectMercator({ lat: item.lat, lng: item.lng });
              const lx = nx * MAP_WORLD_W;
              const ly = ny * MAP_WORLD_H;
              const baseSize = item.size === "lg" ? 14 : item.size === "md" ? 11 : 9;
              return (
                <g key={item.text} transform={`translate(${lx}, ${ly})`}>
                  <text
                    y={0}
                    fontSize={baseSize / zoom}
                    letterSpacing="0.16em"
                    className="font-semibold uppercase"
                  >
                    {item.text}
                  </text>
                  {item.subtext && (
                    <text
                      y={(baseSize + 3) / zoom}
                      fontSize={(baseSize - 2) / zoom}
                      letterSpacing="0.1em"
                      className="fill-muted/75"
                    >
                      {item.subtext}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Visited Pins Layer */}
          <g className="pins-layer">
            {pins.map((pin) => {
              const { nx, ny } = projectMercator(pin.coordinates);
              const px = nx * MAP_WORLD_W;
              const py = ny * MAP_WORLD_H;
              const isVisited = visitedIds.has(pin.id);
              const isSelected = selectedPin?.id === pin.id;

              // Scale pin inverse to zoom with min/max clamps so it stays clickable
              const pinScale = Math.min(Math.max(1 / zoom, 0.45), 2.2);

              return (
                <g
                  key={pin.id}
                  transform={`translate(${px}, ${py}) scale(${pinScale})`}
                  className="cursor-pointer transition-transform duration-150 ease-out hover:scale-125"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePinClick(pin);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${pin.title} · ${pin.locationName} (${isVisited ? "已探索" : "未探索"})`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handlePinClick(pin);
                    }
                  }}
                >
                  {/* Outer Pulsing Sonar Ring */}
                  {!reducedMotion && (
                    <circle
                      r={isSelected ? 26 : 18}
                      className="fill-none stroke-ink-dominant/30 motion-safe:animate-ping"
                      strokeWidth={1.5}
                      style={{ animationDuration: "3s" }}
                    />
                  )}

                  {/* Concentric Target Ring */}
                  <circle
                    r={isSelected ? 16 : 11}
                    className={`${isSelected ? "fill-ink-dominant/20 stroke-ink-dominant" : "fill-surface stroke-ink-dominant"} transition-colors`}
                    strokeWidth={2}
                  />

                  {/* Target Reticle Crosshair */}
                  <line x1={-14} y1={0} x2={14} y2={0} className="stroke-ink-dominant/40" strokeWidth={1} />
                  <line x1={0} y1={-14} x2={0} y2={14} className="stroke-ink-dominant/40" strokeWidth={1} />

                  {/* Central Optical Core (Solid if Visited, Hollow Aperture if Unvisited) */}
                  <circle
                    r={isVisited ? 5 : 3}
                    className={`${isVisited ? "fill-ink-dominant" : "fill-surface stroke-ink-dominant"} transition-colors`}
                    strokeWidth={1.5}
                  />

                  {/* Pin Telemetry Callout Pill */}
                  <g transform="translate(18, -12)">
                    <rect
                      x={0}
                      y={-10}
                      width={pin.title.length * 13 + 64}
                      height={22}
                      rx={2}
                      className={`border border-border-default ${isSelected ? "fill-ink-dominant text-badge" : "fill-surface/95 text-primary"} shadow-sm transition-colors`}
                    />
                    <text
                      x={6}
                      y={5}
                      className={`font-telemetry text-[10px] font-medium tracking-wider ${isSelected ? "fill-badge" : "fill-text-primary"}`}
                    >
                      <tspan className="font-bold tracking-widest text-ink-dominant">
                        {pin.primaryPhoto.frame} ·{" "}
                      </tspan>
                      {pin.title}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Q10-A In-Screen Eyebrow (No global sticky chrome) */}
      <header
        aria-label="地图暗房眉题"
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
            {isZh ? "摄影全屏地图" : "DARKROOM ATLAS"}
          </span>
          <span className="hidden text-muted sm:inline">·</span>

          {/* Telemetry Indicator (PINS X · VISITED Y) */}
          <div className="flex items-center gap-1.5 rounded-sm border border-border-default bg-surface px-2.5 py-0.5 font-telemetry text-[11px] font-bold tracking-widest uppercase tabular-nums text-text-secondary">
            <MapPinIcon className="h-3 w-3 text-ink-dominant" />
            <span>PINS {pins.length}</span>
            <span className="text-muted">·</span>
            <span className={visitedIds.size > 0 ? "text-ink-dominant" : "text-muted"}>
              VISITED {visitedIds.size}
            </span>
          </div>
        </div>

        {/* Eyebrow Right: View Switcher, LanguageSwitch, SafelightSwitch */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {/* View Switcher: MAP vs MASONRY */}
          {onSwitchToMasonry && (
            <button
              type="button"
              onClick={onSwitchToMasonry}
              className="flex items-center gap-1.5 rounded-sm border border-border-default bg-surface px-2.5 py-1 font-telemetry text-xs font-medium tracking-wider uppercase text-text-secondary hover:border-ink-dominant hover:text-ink-dominant transition-colors"
              title={isZh ? "切换至传统瀑布流画廊" : "Switch to Masonry Gallery"}
            >
              <Layers className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{isZh ? "画廊视图" : "MASONRY"}</span>
            </button>
          )}

          <div className="h-4 w-px bg-border-default" />
          <LanguageSwitch />
          <SafelightSwitch />
        </div>
      </header>

      {/* Floating HUD Controls (Zoom, Presets, Fit) */}
      <aside
        aria-label="地图漫游控制面板"
        className="pointer-events-auto absolute bottom-12 left-4 z-20 flex flex-col gap-2 sm:left-8"
      >
        <div className="flex flex-col overflow-hidden rounded-sm border border-border-strong bg-surface/95 shadow-md">
          <button
            type="button"
            onClick={handleZoomIn}
            className="flex h-9 w-9 items-center justify-center border-b border-border-default text-text-primary hover:bg-chamber hover:text-ink-dominant transition-colors"
            title={isZh ? "放大地图" : "Zoom In"}
            aria-label="放大"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="flex h-9 w-9 items-center justify-center border-b border-border-default text-text-primary hover:bg-chamber hover:text-ink-dominant transition-colors"
            title={isZh ? "缩小地图" : "Zoom Out"}
            aria-label="缩小"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleFitPins}
            className="flex h-9 w-9 items-center justify-center border-b border-border-default text-text-primary hover:bg-chamber hover:text-ink-dominant transition-colors"
            title={isZh ? "全览所有图钉" : "Fit All Pins"}
            aria-label="全览"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex h-9 w-9 items-center justify-center text-text-primary hover:bg-chamber hover:text-ink-dominant transition-colors"
            title={isZh ? "重置为狮城视角" : "Reset to Singapore"}
            aria-label="重置"
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
              onClick={() => centerOnCoordinates(preset.lat, preset.lng, preset.zoom)}
              className="rounded-sm px-2 py-1 text-left font-telemetry text-[11px] font-semibold tracking-wider text-text-secondary hover:bg-chamber hover:text-ink-dominant transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </aside>

      {/* In-Screen Footer / Colophon Telemetry */}
      <footer
        aria-label="底图参数与配方"
        className="pointer-events-none relative z-10 mt-auto flex w-full items-center justify-between border-t border-border-default bg-substrate/85 px-4 py-2 font-telemetry text-[11px] tabular-nums text-muted backdrop-blur-sm sm:px-8"
      >
        <div className="flex items-center gap-3">
          <span>
            {formatGpsCoordinates(cursorCoords)}
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">ZOOM {zoom.toFixed(1)}X</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden uppercase tracking-wider sm:inline">
            PAPER #F5F1E8 · INK #2148B8
          </span>
          <span>© 2026 LZZ ATELIER</span>
        </div>
      </footer>

      {/* Pin Collection Slide-Over Drawer */}
      <AnimatePresence>
        {selectedPin && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto absolute top-16 right-4 bottom-12 z-30 flex w-full max-w-md flex-col overflow-hidden rounded-sm border-2 border-border-strong bg-surface shadow-2xl sm:top-20 sm:right-8 sm:bottom-14"
            role="dialog"
            aria-modal="true"
            aria-labelledby="collection-title"
          >
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-border-default bg-chamber p-4 sm:p-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-telemetry text-[11px] font-bold tracking-widest uppercase text-ink-dominant">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  <span>{selectedPin.primaryPhoto.frame} · {isZh ? "已定位" : "LOCATED"}</span>
                </div>
                <h2 id="collection-title" className="font-display text-2xl font-normal text-primary">
                  {selectedPin.title}
                </h2>
                <p className="font-telemetry text-xs text-muted">
                  {selectedPin.locationName} · {selectedPin.gpsRaw}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPin(null)}
                className="rounded-sm p-1 text-muted hover:bg-surface hover:text-text-primary transition-colors"
                aria-label={isZh ? "关闭抽屉" : "Close drawer"}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Collection Photo Plates List */}
            <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6" data-lenis-prevent>
              <div className="space-y-1 font-telemetry text-[11px] text-muted">
                <p className="uppercase tracking-wider">
                  {isZh ? "底片展藏" : "DARKROOM SPECIMENS"} ({selectedPin.photos.length})
                </p>
                <p className="text-[10px]">CAPTURED: {selectedPin.takenAt}</p>
              </div>

              <div className="space-y-6">
                {selectedPin.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="space-y-3 rounded-sm border border-border-plate bg-substrate p-3 sm:p-4"
                  >
                    <PhotoPlate
                      photo={photo}
                      mode={mode}
                      onOpen={onOpenPhoto}
                    />

                    <div className="flex items-center justify-between font-telemetry text-xs">
                      <span className="font-bold text-ink-dominant">{photo.frame}</span>
                      <button
                        type="button"
                        onClick={() => onOpenPhoto?.(photo)}
                        className="rounded-sm border border-border-default bg-surface px-2.5 py-1 font-semibold uppercase tracking-wider text-text-primary hover:border-ink-dominant hover:text-ink-dominant transition-colors"
                      >
                        {isZh ? "进入暗房检视 (LIGHTBOX)" : "ENTER DARKROOM"} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-border-default bg-chamber px-4 py-3 font-telemetry text-[11px] text-muted sm:px-6">
              <span className="tabular-nums">
                ILFORD & KODAK EMULSION · MULTIGRADE MONO
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
