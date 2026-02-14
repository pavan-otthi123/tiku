"use client";

import { TimelineEvent, Season } from "@/lib/types";
import { getSeasonFromDate, getCurrentSeason, getTheme } from "@/lib/seasons";
import { useRef, useEffect, useCallback, useState } from "react";
import EventSection from "./EventSection";
import DatingCounter from "./DatingCounter";
import NavigationDots from "./NavigationDots";

interface TimelineProps {
  events: TimelineEvent[];
  startDate: string;
  currentSeason: Season;
  onSeasonChange: (season: Season) => void;
  onEditEvent: (event: TimelineEvent) => void;
  onCreateEvent: () => void;
  onOpenGlobe: () => void;
}

export default function Timeline({
  events,
  startDate,
  currentSeason,
  onSeasonChange,
  onEditEvent,
  onCreateEvent,
  onOpenGlobe,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Total sections: hero + events + now
  const totalSections = events.length + 2;
  const theme = getTheme(currentSeason);

  // IntersectionObserver to detect active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);

              // Determine season
              if (index === 0) {
                // Hero section — use season of start date
                onSeasonChange(getSeasonFromDate(startDate));
              } else if (index <= events.length) {
                // Event section
                const event = events[index - 1];
                onSeasonChange(getSeasonFromDate(event.date));
              } else {
                // Now section
                onSeasonChange(getCurrentSeason());
              }
            }
          });
        },
        { threshold: 0.55 }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [events, startDate, onSeasonChange]);

  // Scroll to section
  const scrollToSection = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, totalSections - 1));
      sectionRefs.current[clamped]?.scrollIntoView({ behavior: "smooth" });
    },
    [totalSections]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture if user is typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        scrollToSection(activeIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        scrollToSection(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToSection]);

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="relative">
      {/* Globe button */}
      <button
        onClick={onOpenGlobe}
        className="fixed top-4 left-12 md:left-16 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          backgroundColor: `${theme.accent}18`,
          color: theme.accent,
        }}
        aria-label="Open globe view"
        title="View our world"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Navigation dots */}
      <NavigationDots
        total={totalSections}
        activeIndex={activeIndex}
        accentColor={theme.accent}
        onDotClick={scrollToSection}
      />

      {/* Timeline vertical line */}
      <div
        className="fixed left-5 md:left-8 top-0 bottom-0 w-px z-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: `${theme.accent}25` }}
      />

      {/* Scrollable sections */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {/* ── Hero Section ────────────────────────────────── */}
        <section
          ref={setRef(0)}
          className="h-screen snap-start flex flex-col items-center justify-center relative px-6"
        >
          {/* Timeline dot */}
          <div
            className="absolute left-5 md:left-8 top-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-30 transition-colors duration-700"
            style={{ backgroundColor: theme.accent }}
          />

          <div className="text-center max-w-md">
            <div
              className="text-5xl mb-4 transition-colors duration-700"
              style={{ color: theme.accent }}
            >
              &#x2665;
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-3 transition-colors duration-700"
              style={{ color: theme.textAccent }}
            >
              Our Story
            </h1>
            <p className="text-gray-400 text-sm mb-8 tracking-wide">
              Every moment together is a memory worth keeping
            </p>
            <DatingCounter startDate={startDate} accentColor={theme.accent} />

            {/* Scroll hint */}
            <div className="mt-12 animate-bounce">
              <svg
                className="w-5 h-5 mx-auto opacity-30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* ── Event Sections ──────────────────────────────── */}
        {events.map((event, i) => (
          <section
            key={event.id}
            ref={setRef(i + 1)}
            className="h-screen snap-start relative"
          >
            {/* Timeline dot */}
            <div
              className="absolute left-5 md:left-8 top-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-30 transition-all duration-700"
              style={{
                backgroundColor: theme.accent,
                boxShadow:
                  activeIndex === i + 1
                    ? `0 0 12px ${theme.accent}60`
                    : "none",
                transform:
                  activeIndex === i + 1
                    ? "translateX(-50%) scale(1.3)"
                    : "translateX(-50%) scale(1)",
              }}
            />

            <EventSection
              event={event}
              theme={theme}
              onEdit={onEditEvent}
            />
          </section>
        ))}

        {/* ── Now Section ─────────────────────────────────── */}
        <section
          ref={setRef(totalSections - 1)}
          className="h-screen snap-start flex flex-col items-center justify-center relative px-6"
        >
          {/* Pulsing now dot */}
          <div className="absolute left-5 md:left-8 top-1/2 -translate-x-1/2 z-30">
            <div
              className="w-3 h-3 rounded-full transition-colors duration-700"
              style={{ backgroundColor: theme.accent }}
            />
            <div
              className="absolute inset-0 w-3 h-3 rounded-full animate-ping transition-colors duration-700"
              style={{ backgroundColor: `${theme.accent}40` }}
            />
          </div>

          <div className="text-center max-w-md">
            <p
              className="text-xs font-bold tracking-[0.3em] uppercase mb-4 transition-colors duration-700"
              style={{ color: `${theme.accent}80` }}
            >
              Right Now
            </p>
            <DatingCounter startDate={startDate} accentColor={theme.accent} />
            <p className="text-gray-400 text-sm mt-4 mb-8">
              ...and still counting
            </p>

            {/* Add event button */}
            <button
              onClick={onCreateEvent}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: theme.accent,
                boxShadow: `0 8px 24px ${theme.accent}30`,
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add a Memory
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
