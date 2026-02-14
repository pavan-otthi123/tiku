import { Season } from "./types";

export interface SeasonTheme {
  key: Season;
  label: string;
  bg: [string, string]; // gradient stops
  accent: string;
  textAccent: string;
  dotColor: string;
  cardBg: string;
  cardBorder: string;
}

const themes: Record<Season, SeasonTheme> = {
  spring: {
    key: "spring",
    label: "Spring",
    bg: ["#fdf2f8", "#ecfdf5"],
    accent: "#ec4899",
    textAccent: "#be185d",
    dotColor: "#f472b6",
    cardBg: "rgba(255,255,255,0.85)",
    cardBorder: "rgba(236,72,153,0.15)",
  },
  summer: {
    key: "summer",
    label: "Summer",
    bg: ["#fffbeb", "#fef3c7"],
    accent: "#f59e0b",
    textAccent: "#b45309",
    dotColor: "#fbbf24",
    cardBg: "rgba(255,255,255,0.85)",
    cardBorder: "rgba(245,158,11,0.15)",
  },
  fall: {
    key: "fall",
    label: "Fall",
    bg: ["#fff7ed", "#ffedd5"],
    accent: "#f97316",
    textAccent: "#c2410c",
    dotColor: "#fb923c",
    cardBg: "rgba(255,255,255,0.85)",
    cardBorder: "rgba(249,115,22,0.15)",
  },
  winter: {
    key: "winter",
    label: "Winter",
    bg: ["#eff6ff", "#e0e7ff"],
    accent: "#6366f1",
    textAccent: "#4338ca",
    dotColor: "#818cf8",
    cardBg: "rgba(255,255,255,0.85)",
    cardBorder: "rgba(99,102,241,0.15)",
  },
};

export function getSeasonFromDate(dateStr: string): Season {
  const date = new Date(dateStr + "T00:00:00");
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();

  // Spring: March 20 - June 20
  if ((month === 2 && day >= 20) || month === 3 || month === 4 || (month === 5 && day <= 20)) {
    return "spring";
  }
  // Summer: June 21 - September 22
  if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day <= 22)) {
    return "summer";
  }
  // Fall: September 23 - December 20
  if ((month === 8 && day >= 23) || month === 9 || month === 10 || (month === 11 && day <= 20)) {
    return "fall";
  }
  // Winter: December 21 - March 19
  return "winter";
}

export function getCurrentSeason(): Season {
  const now = new Date();
  return getSeasonFromDate(now.toISOString().split("T")[0]);
}

export function getTheme(season: Season): SeasonTheme {
  return themes[season];
}
