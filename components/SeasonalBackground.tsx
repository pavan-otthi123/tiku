"use client";

import { Season } from "@/lib/types";
import { getTheme } from "@/lib/seasons";

interface SeasonalBackgroundProps {
  season: Season;
  children: React.ReactNode;
}

export default function SeasonalBackground({
  season,
  children,
}: SeasonalBackgroundProps) {
  const theme = getTheme(season);

  return (
    <div
      className="min-h-screen transition-all duration-[1500ms] ease-in-out"
      style={{
        background: `linear-gradient(170deg, ${theme.bg[0]} 0%, ${theme.bg[1]} 100%)`,
      }}
    >
      {children}
    </div>
  );
}
