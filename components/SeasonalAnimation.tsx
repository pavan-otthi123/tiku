"use client";

import { Season } from "@/lib/types";
import { useMemo } from "react";

interface SeasonalAnimationProps {
  season: Season;
  accentColor: string;
}

interface Particle {
  id: number;
  left: number; // % from left
  size: number; // px
  delay: number; // s
  duration: number; // s
  opacity: number;
  drift: number; // horizontal drift px
  rotation: number; // starting rotation deg
  color?: string;
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/* ── Particle generators ── */

function generateSnowflakes(): Particle[] {
  return Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: randomBetween(0, 100),
    size: randomBetween(2, 5),
    delay: randomBetween(0, 12),
    duration: randomBetween(6, 14),
    opacity: randomBetween(0.3, 0.7),
    drift: randomBetween(-20, 20),
    rotation: 0,
  }));
}

function generateLeaves(): Particle[] {
  const colors = [
    "rgba(210,105,30,0.6)", // chocolate
    "rgba(178,34,34,0.5)", // firebrick
    "rgba(184,134,11,0.6)", // darkgoldenrod
    "rgba(139,69,19,0.5)", // saddlebrown
    "rgba(205,133,63,0.5)", // peru
  ];
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: randomBetween(0, 100),
    size: randomBetween(8, 14),
    delay: randomBetween(0, 10),
    duration: randomBetween(7, 13),
    opacity: randomBetween(0.4, 0.7),
    drift: randomBetween(-40, 40),
    rotation: randomBetween(0, 360),
    color: colors[i % colors.length],
  }));
}

function generatePetals(): Particle[] {
  const colors = [
    "rgba(255,182,193,0.5)", // lightpink
    "rgba(255,192,203,0.5)", // pink
    "rgba(255,228,225,0.5)", // mistyrose
    "rgba(255,160,180,0.4)", // soft pink
  ];
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: randomBetween(0, 100),
    size: randomBetween(6, 10),
    delay: randomBetween(0, 12),
    duration: randomBetween(8, 16),
    opacity: randomBetween(0.3, 0.6),
    drift: randomBetween(-25, 25),
    rotation: randomBetween(0, 360),
    color: colors[i % colors.length],
  }));
}

function generateFireflies(): Particle[] {
  return Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: randomBetween(5, 95),
    size: randomBetween(2, 4),
    delay: randomBetween(0, 8),
    duration: randomBetween(4, 8),
    opacity: randomBetween(0.3, 0.8),
    drift: randomBetween(-30, 30),
    rotation: 0,
  }));
}

export default function SeasonalAnimation({
  season,
  accentColor,
}: SeasonalAnimationProps) {
  const particles = useMemo(() => {
    switch (season) {
      case "winter":
        return generateSnowflakes();
      case "fall":
        return generateLeaves();
      case "spring":
        return generatePetals();
      case "summer":
        return generateFireflies();
    }
  }, [season]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => {
        switch (season) {
          case "winter":
            return (
              <div
                key={p.id}
                className="absolute rounded-full seasonal-snow"
                style={{
                  left: `${p.left}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: "rgba(255,255,255,0.8)",
                  opacity: p.opacity,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  ["--drift" as string]: `${p.drift}px`,
                }}
              />
            );

          case "fall":
            return (
              <div
                key={p.id}
                className="absolute seasonal-leaf"
                style={{
                  left: `${p.left}%`,
                  width: p.size,
                  height: p.size * 0.7,
                  backgroundColor: p.color,
                  borderRadius: "0 80% 0 80%",
                  opacity: p.opacity,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  ["--drift" as string]: `${p.drift}px`,
                  ["--rot" as string]: `${p.rotation}deg`,
                }}
              />
            );

          case "spring":
            return (
              <div
                key={p.id}
                className="absolute seasonal-petal"
                style={{
                  left: `${p.left}%`,
                  width: p.size,
                  height: p.size * 1.3,
                  backgroundColor: p.color,
                  borderRadius: "50% 50% 50% 0",
                  opacity: p.opacity,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  ["--drift" as string]: `${p.drift}px`,
                  ["--rot" as string]: `${p.rotation}deg`,
                }}
              />
            );

          case "summer":
            return (
              <div
                key={p.id}
                className="absolute rounded-full seasonal-firefly"
                style={{
                  left: `${p.left}%`,
                  top: `${randomBetween(10, 90)}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: accentColor,
                  boxShadow: `0 0 ${p.size * 2}px ${accentColor}`,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  ["--drift" as string]: `${p.drift}px`,
                }}
              />
            );
        }
      })}
    </div>
  );
}
