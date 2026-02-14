"use client";

import { TimelineEvent } from "@/lib/types";
import { SeasonTheme } from "@/lib/seasons";
import PhotoCarousel from "./PhotoCarousel";

interface EventSectionProps {
  event: TimelineEvent;
  theme: SeasonTheme;
  onEdit: (event: TimelineEvent) => void;
}

export default function EventSection({
  event,
  theme,
  onEdit,
}: EventSectionProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-16 relative">
      {/* Date badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 transition-colors duration-700"
        style={{
          backgroundColor: `${theme.accent}15`,
          color: theme.textAccent,
        }}
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
        {formatDate(event.date)}
      </div>

      {/* Location */}
      {event.location && (
        <div
          className="inline-flex items-center gap-1.5 mb-3 text-xs transition-colors duration-700"
          style={{ color: `${theme.textAccent}99` }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </div>
      )}

      {/* Title */}
      <h2
        className="text-2xl md:text-4xl font-bold text-center mb-6 transition-colors duration-700 max-w-lg"
        style={{ color: theme.textAccent }}
      >
        {event.title}
      </h2>

      {/* Photo carousel */}
      <PhotoCarousel photos={event.photos} accentColor={theme.accent} />

      {/* Edit button */}
      <button
        onClick={() => onEdit(event)}
        className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: `${theme.accent}12`,
          color: theme.textAccent,
        }}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Edit
      </button>
    </div>
  );
}
