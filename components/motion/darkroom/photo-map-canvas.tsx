"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Map as MapLibreMap,
  Marker,
  setWorkerUrl,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useI18n } from "@/lib/i18n";
import {
  DEFAULT_MAP_PRESET,
  formatGpsCoordinates,
  type GeoCoordinates,
  type PhotoMapPin,
} from "@/lib/photo-map";

/**
 * BRAWUKA-343 · Darkroom Atlas — real world basemap on OpenStreetMap data.
 *
 * Stack: MapLibre GL + OpenFreeMap vector tiles (key-less, quota-less, OSM
 * data — the same stack CoffeeMode runs). Never tiles.openstreetmap.org
 * directly: the OSMF tile policy throttles heavy production use.
 *
 * The positron style is fetched once and retinted into the paper palette
 * (substrate background, cobalt-wash water) so the atlas keeps its printed
 * voice; night mode re-darkens the tiles with a CSS inversion filter while
 * pins stay DOM-crisp in theme-exact ink.
 */

const POSITRON_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

/* MapLibre v6 derives its worker URL from the running chunk's URL, which
   404s under webpack's hashed chunks — serve the worker from /maplibre/
   instead (copied from node_modules by scripts/copy-maplibre-worker.mjs). */
setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

/** Paper retint targets — daylight values; night comes from the CSS filter. */
const PAPER_BACKGROUND = "#F5F1E8";
const PAPER_WATER = "#D9E1F0";
const PAPER_WATERWAY = "#B9C8E4";

function retintPositronToPaper(style: StyleSpecification): StyleSpecification {
  for (const layer of style.layers ?? []) {
    const paint = (layer as { paint?: Record<string, unknown> }).paint;
    if (!paint) continue;
    if (layer.id === "background") {
      paint["background-color"] = PAPER_BACKGROUND;
    } else if (layer.id === "water" && layer.type === "fill") {
      paint["fill-color"] = PAPER_WATER;
    } else if (layer.id === "waterway" && layer.type === "line") {
      paint["line-color"] = PAPER_WATERWAY;
    }
  }
  return style;
}

let paperStylePromise: Promise<StyleSpecification | string> | null = null;

/** Fetch + retint once per session; on any failure hand MapLibre the raw URL. */
function loadPaperStyle(): Promise<StyleSpecification | string> {
  if (!paperStylePromise) {
    paperStylePromise = (async () => {
      try {
        const res = await fetch(POSITRON_STYLE_URL);
        if (!res.ok) throw new Error(`style ${res.status}`);
        const style = (await res.json()) as StyleSpecification;
        return retintPositronToPaper(style);
      } catch {
        return POSITRON_STYLE_URL;
      }
    })();
  }
  return paperStylePromise;
}

/** MapLibre v6 renders on WebGL2 only and no longer ships `supported()` —
    probe the context ourselves (and still try/catch the Map constructor). */
function isWebGL2Available(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return canvas.getContext("webgl2") !== null;
  } catch {
    return false;
  }
}

interface PhotoMapCanvasProps {
  readonly pins: ReadonlyArray<PhotoMapPin>;
  readonly visitedIds: ReadonlySet<string>;
  readonly selectedPinId: string | null;
  readonly reducedMotion: boolean;
  readonly onReady: (map: MapLibreMap) => void;
  readonly onPinClick: (pin: PhotoMapPin) => void;
  readonly onCursorMove: (coords: GeoCoordinates) => void;
  readonly onZoomChange: (zoom: number) => void;
}

interface PinMarkerHandle {
  readonly marker: Marker;
  readonly element: HTMLButtonElement;
}

export function PhotoMapCanvas({
  pins,
  visitedIds,
  selectedPinId,
  reducedMotion,
  onReady,
  onPinClick,
  onCursorMove,
  onZoomChange,
}: PhotoMapCanvasProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Map<string, PinMarkerHandle>>(new Map());
  const telemetryRafRef = useRef<number | null>(null);
  const [failed, setFailed] = useState(false);

  /* Latest-callback refs so the one-time map wiring never goes stale. */
  const callbacksRef = useRef({ onReady, onPinClick, onCursorMove, onZoomChange });
  callbacksRef.current = { onReady, onPinClick, onCursorMove, onZoomChange };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!isWebGL2Available()) {
      setFailed(true);
      return;
    }

    let cancelled = false;
    let map: MapLibreMap | null = null;
    const markers = markersRef.current;

    const scheduleTelemetryFlush = (): void => {
      if (telemetryRafRef.current !== null || !map) return;
      telemetryRafRef.current = requestAnimationFrame(() => {
        telemetryRafRef.current = null;
        if (!map) return;
        callbacksRef.current.onZoomChange(map.getZoom());
      });
    };

    /** Flip callout pills to the left when a pin nears the viewport's right edge. */
    const flipEdgePills = (): void => {
      if (!map) return;
      const width = container.getBoundingClientRect().width;
      for (const handle of markersRef.current.values()) {
        const { x } = map.project(handle.marker.getLngLat());
        handle.element
          .querySelector(".photo-map-pin__pill")
          ?.classList.toggle("photo-map-pin__pill--flip", x > width - 170);
      }
    };

    loadPaperStyle().then((style) => {
      if (cancelled || !containerRef.current) return;

      /* Small viewports: a fixed center+zoom crops the Singapore cluster, so
         fit the pins near the default preset instead (≈ all of them today). */
      let initialView: { center: [number, number]; zoom: number } | { bounds: [[number, number], [number, number]]; fitBoundsOptions: { padding: number } };
      const homePins = pins.filter(
        (p) =>
          Math.abs(p.coordinates.lat - DEFAULT_MAP_PRESET.lat) < 2 &&
          Math.abs(p.coordinates.lng - DEFAULT_MAP_PRESET.lng) < 2,
      );
      if (container.clientWidth < 640 && homePins.length > 1) {
        const lngs = homePins.map((p) => p.coordinates.lng);
        const lats = homePins.map((p) => p.coordinates.lat);
        initialView = {
          bounds: [
            [Math.min(...lngs), Math.min(...lats)],
            [Math.max(...lngs), Math.max(...lats)],
          ],
          fitBoundsOptions: { padding: 56 },
        };
      } else {
        initialView = {
          center: [DEFAULT_MAP_PRESET.lng, DEFAULT_MAP_PRESET.lat],
          zoom: DEFAULT_MAP_PRESET.zoom,
        };
      }

      let m: MapLibreMap;
      try {
        m = new MapLibreMap({
          container,
          style,
          ...initialView,
          minZoom: 1.5,
          maxZoom: 18,
          attributionControl: { compact: true },
          renderWorldCopies: false,
          fadeDuration: reducedMotion ? 0 : 200,
        });
      } catch (error) {
        // WebGL2 context creation can still fail past the probe (GPU blocklist)
        console.warn("[photo-map] maplibre init failed", error);
        setFailed(true);
        return;
      }
      map = m;
      mapRef.current = m;

      /* The atlas is a north-up printed artifact — no bearing rotation. */
      m.dragRotate.disable();
      m.touchZoomRotate.disableRotation();

      m.on("mousemove", (event) => {
        callbacksRef.current.onCursorMove({
          lat: event.lngLat.lat,
          lng: event.lngLat.lng,
        });
      });
      m.on("move", scheduleTelemetryFlush);
      m.on("moveend", flipEdgePills);

      m.on("error", (event) => {
        // Tile/CDN hiccups should not blank the atlas — only the initial
        // style/source failure flips to the readable fallback.
        if (!m.getStyle()) setFailed(true);
        console.warn("[photo-map] maplibre error", event.error?.message ?? event);
      });

      m.on("load", () => {
        for (const pin of pins) {
          const element = document.createElement("button");
          element.type = "button";
          element.className = "photo-map-pin";
          element.dataset.pinId = pin.id;
          element.setAttribute(
            "aria-label",
            `${pin.title} · ${pin.locationName} · ${pin.gpsRaw}`,
          );
          for (const part of ["pulse", "reticle", "core"]) {
            const span = document.createElement("span");
            span.className = `photo-map-pin__${part}`;
            span.setAttribute("aria-hidden", "true");
            element.appendChild(span);
          }
          const pill = document.createElement("span");
          pill.className = "photo-map-pin__pill";
          pill.setAttribute("aria-hidden", "true");
          const frame = document.createElement("strong");
          frame.textContent = pin.primaryPhoto.frame;
          pill.appendChild(frame);
          pill.appendChild(document.createTextNode(pin.title));
          element.appendChild(pill);
          element.addEventListener("click", () => callbacksRef.current.onPinClick(pin));

          const marker = new Marker({ element, anchor: "center" })
            .setLngLat([pin.coordinates.lng, pin.coordinates.lat])
            .addTo(m);
          markersRef.current.set(pin.id, { marker, element });
        }
        flipEdgePills();
        callbacksRef.current.onZoomChange(m.getZoom());
        callbacksRef.current.onReady(m);
      });
    });

    return () => {
      cancelled = true;
      if (telemetryRafRef.current !== null) {
        cancelAnimationFrame(telemetryRafRef.current);
        telemetryRafRef.current = null;
      }
      for (const handle of markers.values()) {
        handle.marker.remove();
      }
      markers.clear();
      map?.remove();
      mapRef.current = null;
    };
    // The map is created once per mount; pins are static for the session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Sync visited / selected states onto marker DOM without rebuilding the map. */
  useEffect(() => {
    for (const [pinId, handle] of markersRef.current) {
      handle.element.dataset.visited = visitedIds.has(pinId) ? "true" : "false";
      handle.element.dataset.selected = selectedPinId === pinId ? "true" : "false";
    }
  }, [visitedIds, selectedPinId]);

  if (failed) {
    return (
      <div className="photo-map-fallback" role="note">
        <p className="font-telemetry text-[11px] uppercase tracking-widest text-muted">
          {isZh
            ? "当前浏览器无法渲染矢量地图（需要 WebGL）——以下为图钉索引："
            : "This browser cannot render the vector atlas (WebGL required) — pin index:"}
        </p>
        <ul className="mt-4 space-y-3">
          {pins.map((pin) => (
            <li key={pin.id}>
              <button
                type="button"
                onClick={() => onPinClick(pin)}
                className="w-full rounded-sm border border-border-default bg-surface px-3 py-2 text-left font-telemetry text-xs text-text-primary hover:border-ink-dominant transition-colors"
              >
                <span className="font-bold text-ink-dominant">{pin.primaryPhoto.frame}</span>
                {" · "}
                {pin.title}
                <span className="block text-[10px] text-muted">
                  {pin.locationName} · {formatGpsCoordinates(pin.coordinates)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="photo-map-canvas"
      role="application"
      aria-label={isZh ? "摄影世界地图（OpenStreetMap 数据）" : "Photography world atlas (OpenStreetMap data)"}
    />
  );
}
