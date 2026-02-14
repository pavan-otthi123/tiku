"use client";

import { Photo } from "@/lib/types";
import { useState, useEffect, useRef, useCallback } from "react";

interface PhotoGalleryProps {
  photos: Photo[];
  accentColor: string;
}

/* Fixed positions for the 10 photo slots – scattered around centre content */
const SLOTS = [
  { top: "4%", left: "3%", rotate: -7 },
  { top: "3%", left: "58%", rotate: 5 },
  { top: "22%", left: "1%", rotate: 4 },
  { top: "20%", left: "66%", rotate: -6 },
  { top: "42%", left: "4%", rotate: 3 },
  { top: "40%", left: "62%", rotate: -4 },
  { top: "60%", left: "2%", rotate: 6 },
  { top: "58%", left: "67%", rotate: -5 },
  { top: "78%", left: "5%", rotate: -3 },
  { top: "76%", left: "60%", rotate: 4 },
];

const FADE_MS = 800; // transition duration
const SWAP_INTERVAL_MS = 1500; // how often we swap one photo
const STAGGER_MS = 500; // delay between initial fade-ins

export default function PhotoGallery({ photos, accentColor }: PhotoGalleryProps) {
  const [displayPhotos, setDisplayPhotos] = useState<(Photo | null)[]>(
    Array(10).fill(null)
  );
  const [opacities, setOpacities] = useState<number[]>(Array(10).fill(0));

  // Track which photo indices (into photos[]) are currently showing
  const usedSet = useRef<Set<number>>(new Set());
  const nextSlot = useRef(0);
  const initialised = useRef(false);

  /* Pick a random photo not currently on screen */
  const pickRandom = useCallback(
    (exclude: Set<number>): { photo: Photo; idx: number } | null => {
      if (photos.length === 0) return null;

      const available = photos
        .map((p, i) => ({ photo: p, idx: i }))
        .filter(({ idx }) => !exclude.has(idx));

      if (available.length === 0) {
        // Exhausted pool → reset
        exclude.clear();
        const all = photos.map((p, i) => ({ photo: p, idx: i }));
        return all[Math.floor(Math.random() * all.length)];
      }

      return available[Math.floor(Math.random() * available.length)];
    },
    [photos]
  );

  /* ── Initial fill: stagger fade-in ── */
  useEffect(() => {
    if (photos.length === 0 || initialised.current) return;
    initialised.current = true;

    const used = new Set<number>();
    const initial: (Photo | null)[] = Array(10).fill(null);
    const count = Math.min(10, photos.length);

    for (let i = 0; i < count; i++) {
      const pick = pickRandom(used);
      if (pick) {
        initial[i] = pick.photo;
        used.add(pick.idx);
      }
    }

    usedSet.current = used;
    setDisplayPhotos(initial);

    // Stagger the fade-ins
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        setOpacities((prev) => {
          const next = [...prev];
          next[i] = 1;
          return next;
        });
      }, i * STAGGER_MS);
    }
  }, [photos, pickRandom]);

  /* ── Random swap: pick a random slot every SWAP_INTERVAL_MS ── */
  useEffect(() => {
    if (photos.length <= 10) return; // not enough to cycle

    const interval = setInterval(() => {
      const slot = Math.floor(Math.random() * 10);

      // 1. Fade out
      setOpacities((prev) => {
        const next = [...prev];
        next[slot] = 0;
        return next;
      });

      // 2. After fade-out, swap photo & fade in (pre-load image first)
      setTimeout(() => {
        const pick = pickRandom(usedSet.current);
        if (!pick) return;

        const img = new Image();
        img.onload = () => {
          setDisplayPhotos((prev) => {
            const next = [...prev];
            // Release old
            const old = prev[slot];
            if (old) {
              const oldIdx = photos.findIndex((p) => p.id === old.id);
              if (oldIdx >= 0) usedSet.current.delete(oldIdx);
            }
            next[slot] = pick.photo;
            usedSet.current.add(pick.idx);
            return next;
          });
          // Fade in after image loaded
          setOpacities((prev) => {
            const next = [...prev];
            next[slot] = 1;
            return next;
          });
        };
        img.onerror = () => {
          // Still swap even if load fails
          setOpacities((prev) => {
            const next = [...prev];
            next[slot] = 1;
            return next;
          });
        };
        img.src = pick.photo.url;
      }, FADE_MS);
    }, SWAP_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [photos, pickRandom]);

  if (photos.length === 0) return null;

  return (
    <>
      {SLOTS.map((pos, i) => (
        <div
          key={i}
          className="absolute w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden shadow-xl pointer-events-none"
          style={{
            top: pos.top,
            left: pos.left,
            transform: `rotate(${pos.rotate}deg)`,
            opacity: opacities[i],
            transition: `opacity ${FADE_MS}ms ease-in-out`,
            border: `2px solid ${accentColor}30`,
          }}
        >
          {displayPhotos[i] && (
            <img
              src={displayPhotos[i]!.url}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
            />
          )}
        </div>
      ))}
    </>
  );
}
