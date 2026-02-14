"use client";

import { TimelineEvent } from "@/lib/types";
import { getTheme } from "@/lib/seasons";
import { getSeasonFromDate, getCurrentSeason } from "@/lib/seasons";
import type { GlobeMethods } from "react-globe.gl";
import dynamic from "next/dynamic";
import { useState, useEffect, useMemo, useRef, useCallback, MutableRefObject } from "react";

// react-globe.gl must be loaded client-side only (uses WebGL)
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobeViewProps {
  events: TimelineEvent[];
  accentColor: string;
  isOpen: boolean;
  onClose: () => void;
}

interface GlobePoint {
  lat: number;
  lng: number;
  title: string;
  date: string;
  location: string;
  color: string;
  size: number;
  event: TimelineEvent;
}

export default function GlobeView({
  events,
  accentColor,
  isOpen,
  onClose,
}: GlobeViewProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedPoint, setSelectedPoint] = useState<GlobePoint | null>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined) as MutableRefObject<GlobeMethods | undefined>;

  // Update dimensions on mount and resize
  useEffect(() => {
    if (!isOpen) return;
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isOpen]);

  // Build globe points from events that have coordinates
  const points: GlobePoint[] = useMemo(() => {
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
          size: 0.6,
          event: e,
        };
      });
  }, [events]);

  // Auto-rotate to first point
  useEffect(() => {
    if (!isOpen || !globeRef.current || points.length === 0) return;
    const globe = globeRef.current;
    setTimeout(() => {
      globe.pointOfView(
        { lat: points[0].lat, lng: points[0].lng, altitude: 2 },
        1000
      );
    }, 500);
  }, [isOpen, points]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handlePointClick = useCallback((point: object) => {
    const p = point as GlobePoint;
    setSelectedPoint(p);
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: p.lat, lng: p.lng, altitude: 1.5 }, 800);
    }
  }, []);

  // Close on Escape
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

      {/* Globe */}
      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.01}
          pointRadius="size"
          pointLabel={(d: object) => {
            const p = d as GlobePoint;
            return `<div style="background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);padding:8px 12px;border-radius:10px;font-family:system-ui;border:1px solid rgba(255,255,255,0.1)">
              <div style="font-weight:700;font-size:13px;color:white">${p.title}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px">${p.location}</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:2px">${formatDate(p.date)}</div>
            </div>`;
          }}
          onPointClick={handlePointClick}
          atmosphereColor={accentColor}
          atmosphereAltitude={0.2}
          animateIn={true}
        />
      )}

      {/* Selected point detail card */}
      {selectedPoint && (
        <div className="absolute bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50">
          <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base truncate">
                  {selectedPoint.title}
                </h3>
                {selectedPoint.location && (
                  <div className="flex items-center gap-1 mt-1 text-white/60 text-xs">
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
                  </div>
                )}
                <p className="text-white/40 text-xs mt-1">
                  {formatDate(selectedPoint.date)}
                </p>
              </div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="ml-2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white shrink-0"
              >
                <svg
                  className="w-3 h-3"
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

            {/* Thumbnail strip */}
            {selectedPoint.event.photos.length > 0 && (
              <div className="flex gap-1.5 mt-3 overflow-x-auto scrollbar-hide">
                {selectedPoint.event.photos.slice(0, 5).map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.url}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                ))}
                {selectedPoint.event.photos.length > 5 && (
                  <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-xs text-white/50">
                    +{selectedPoint.event.photos.length - 5}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty state */}
      {points.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div className="text-center">
            <p className="text-white/60 text-sm">No locations yet</p>
            <p className="text-white/30 text-xs mt-1">
              Upload photos with GPS data to see pins on the globe
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
