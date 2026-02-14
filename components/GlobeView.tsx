"use client";

import { TimelineEvent } from "@/lib/types";
import { getTheme, getSeasonFromDate } from "@/lib/seasons";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Map,
  Marker,
  NavigationControl,
  type MapRef,
} from "@vis.gl/react-maplibre";
import type { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface GlobeViewProps {
  events: TimelineEvent[];
  accentColor: string;
  isOpen: boolean;
  onClose: () => void;
}

interface MapPoint {
  lat: number;
  lng: number;
  title: string;
  date: string;
  location: string;
  color: string;
  event: TimelineEvent;
}

/* ── Dark basemap style using CartoDB tiles (free, no API key) ── */
const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    "carto-dark": {
      type: "raster",
      tiles: ["https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors, © CARTO",
    },
  },
  layers: [
    {
      id: "carto-dark-layer",
      type: "raster",
      source: "carto-dark",
    },
  ],
};

/* ── Inline photo carousel for the detail panel ── */
function DetailCarousel({
  photos,
}: {
  photos: TimelineEvent["photos"];
  accentColor: string;
}) {
  if (photos.length === 0) return null;

  return (
    <div
      className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] pr-1 scrollbar-hide"
      style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
    >
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative aspect-[3/4] bg-black/20 rounded-xl overflow-hidden shrink-0"
        >
          <img
            src={photo.url}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════ */

export default function GlobeView({
  events,
  accentColor,
  isOpen,
  onClose,
}: GlobeViewProps) {
  const mapRef = useRef<MapRef>(null);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  /* Build map points from events that have coordinates */
  const points: MapPoint[] = useMemo(() => {
    return events
      .filter((e) => e.latitude != null && e.longitude != null)
      .map((e) => {
        const season = getSeasonFromDate(e.date);
        const theme = getTheme(season);
        return {
          lat: e.latitude!,
          lng: e.longitude!,
          title: e.title,
          date: e.date,
          location: e.location || "",
          color: theme.accent,
          event: e,
        };
      });
  }, [events]);

  /* Enable globe projection once the map style loads */
  const handleLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    try {
      map.setProjection({ type: "globe" });
    } catch {
      // Globe projection requires maplibre-gl >= 5
    }
  }, []);

  /* Fly to first event when opened */
  useEffect(() => {
    if (!isOpen || points.length === 0) return;
    const timer = setTimeout(() => {
      const map = mapRef.current?.getMap();
      if (!map) return;
      map.flyTo({
        center: [points[0].lng, points[0].lat],
        zoom: 4,
        duration: 1200,
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [isOpen, points]);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedPoint) setSelectedPoint(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, selectedPoint, onClose]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a1a]">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90"
        aria-label="Close globe"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Header */}
      <div className="absolute top-4 left-4 z-50">
        <h2 className="text-white text-lg font-bold">Our World</h2>
        <p className="text-white/50 text-xs">
          {points.length} {points.length === 1 ? "place" : "places"} visited
        </p>
      </div>

      {/* Map */}
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: points[0]?.lng ?? 0,
          latitude: points[0]?.lat ?? 20,
          zoom: 1.8,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        onLoad={handleLoad}
        maxZoom={18}
        minZoom={1}
        attributionControl={false}
        onClick={() => setSelectedPoint(null)}
      >
        <NavigationControl position="bottom-right" showCompass={false} />

        {/* Markers */}
        {points.map((point, i) => (
          <Marker
            key={`${point.event.id}-${i}`}
            longitude={point.lng}
            latitude={point.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedPoint(point);
              mapRef.current?.getMap()?.flyTo({
                center: [point.lng, point.lat],
                zoom: Math.max(
                  mapRef.current?.getMap()?.getZoom() ?? 6,
                  6
                ),
                duration: 600,
              });
            }}
          >
            <div className="flex flex-col items-center cursor-pointer group">
              <div
                className="w-7 h-7 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125"
                style={{
                  backgroundColor: point.color,
                  boxShadow: `0 2px 8px ${point.color}80`,
                }}
              >
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                </svg>
              </div>
              <div
                className="w-0.5 h-2 -mt-0.5"
                style={{ backgroundColor: point.color }}
              />
            </div>
          </Marker>
        ))}
      </Map>

      {/* ── Detail panel (slides up from bottom) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out"
        style={{
          transform: selectedPoint
            ? "translateY(0)"
            : "translateY(100%)",
        }}
      >
        {selectedPoint && (
          <div className="mx-3 mb-3 md:mx-auto md:max-w-md">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 text-white overflow-hidden">
              {/* Close detail */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-base truncate">
                    {selectedPoint.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    {selectedPoint.location && (
                      <span className="text-xs text-white/50 flex items-center gap-1 truncate">
                        <svg
                          className="w-3 h-3 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {selectedPoint.location}
                      </span>
                    )}
                    <span className="text-xs text-white/35 shrink-0">
                      {formatDate(selectedPoint.date)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPoint(null)}
                  className="ml-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 shrink-0 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Photo carousel */}
              {selectedPoint.event.photos.length > 0 ? (
                <div className="px-4 pb-4 pt-1">
                  <DetailCarousel
                    photos={selectedPoint.event.photos}
                    accentColor={selectedPoint.color}
                  />
                  <p className="text-center text-[10px] text-white/30 mt-2">
                    {selectedPoint.event.photos.length}{" "}
                    {selectedPoint.event.photos.length === 1
                      ? "photo"
                      : "photos"}
                    {" · scroll to browse"}
                  </p>
                </div>
              ) : (
                <div className="px-4 pb-4 pt-1">
                  <div className="h-24 rounded-xl bg-white/5 flex items-center justify-center">
                    <p className="text-xs text-white/30">No photos</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Empty state */}
      {points.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div className="text-center">
            <p className="text-white/60 text-sm">No locations yet</p>
            <p className="text-white/30 text-xs mt-1">
              Upload photos with GPS data to see pins on the map
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
