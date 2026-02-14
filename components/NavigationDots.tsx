"use client";

interface NavigationDotsProps {
  total: number; // total sections including hero + now
  activeIndex: number;
  accentColor: string;
  onDotClick: (index: number) => void;
}

export default function NavigationDots({
  total,
  activeIndex,
  accentColor,
  onDotClick,
}: NavigationDotsProps) {
  if (total <= 1) return null;

  return (
    <nav
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2"
      aria-label="Timeline navigation"
    >
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === activeIndex;
        const isNow = i === total - 1;
        return (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className="group relative flex items-center justify-center transition-all duration-300"
            aria-label={
              i === 0 ? "Start" : isNow ? "Now" : `Event ${i}`
            }
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                backgroundColor: isActive
                  ? accentColor
                  : `${accentColor}40`,
                boxShadow: isActive
                  ? `0 0 8px ${accentColor}60`
                  : "none",
              }}
            />
            {/* Pulse on "now" dot */}
            {isNow && (
              <span
                className="absolute block rounded-full animate-ping"
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: `${accentColor}30`,
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
