"use client";

import { useState, useEffect } from "react";

interface DatingCounterProps {
  startDate: string; // ISO date string e.g. "2024-03-15"
  accentColor?: string;
}

interface Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeDuration(start: Date, now: Date): Duration {
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  const hours = now.getHours() - start.getHours();
  const minutes = now.getMinutes() - start.getMinutes();
  const seconds = now.getSeconds() - start.getSeconds();

  // Normalize negative values
  let totalMonths = years * 12 + months;
  if (days < 0) {
    totalMonths -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (totalMonths < 0) totalMonths = 0;

  years = Math.floor(totalMonths / 12);
  months = totalMonths % 12;

  return {
    years,
    months,
    days: Math.max(0, days),
    hours: ((hours % 24) + 24) % 24,
    minutes: ((minutes % 60) + 60) % 60,
    seconds: ((seconds % 60) + 60) % 60,
  };
}

export default function DatingCounter({
  startDate,
  accentColor = "#e11d48",
}: DatingCounterProps) {
  const [duration, setDuration] = useState<Duration | null>(null);

  useEffect(() => {
    const start = new Date(startDate + "T00:00:00");
    const update = () => setDuration(computeDuration(start, new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  if (!duration) return null;

  const parts: { value: number; label: string }[] = [];
  if (duration.years > 0) parts.push({ value: duration.years, label: duration.years === 1 ? "year" : "years" });
  if (duration.months > 0) parts.push({ value: duration.months, label: duration.months === 1 ? "month" : "months" });
  parts.push({ value: duration.days, label: duration.days === 1 ? "day" : "days" });

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="text-center select-none">
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {parts.map((p, i) => (
          <span key={i} className="inline-flex items-baseline gap-1">
            <span
              className="text-2xl md:text-3xl font-bold tabular-nums"
              style={{ color: accentColor }}
            >
              {p.value}
            </span>
            <span className="text-xs md:text-sm font-medium opacity-60">
              {p.label}
            </span>
            {i < parts.length - 1 && (
              <span className="opacity-30 mx-0.5">,</span>
            )}
          </span>
        ))}
      </div>
      <div
        className="text-xl md:text-2xl font-mono font-bold tabular-nums mt-1 tracking-wider"
        style={{ color: accentColor }}
      >
        {pad(duration.hours)}:{pad(duration.minutes)}:{pad(duration.seconds)}
      </div>
    </div>
  );
}
