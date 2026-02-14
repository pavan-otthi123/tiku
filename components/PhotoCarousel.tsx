"use client";

import { Photo } from "@/lib/types";
import { useState, useRef, useEffect } from "react";

interface PhotoCarouselProps {
  photos: Photo[];
  accentColor: string;
}

export default function PhotoCarousel({
  photos,
  accentColor,
}: PhotoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: container.clientWidth * index,
      behavior: "smooth",
    });
  };

  if (photos.length === 0) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="flex items-center justify-center h-48 rounded-2xl bg-white/5 border-2 border-dashed border-current/10">
          <p className="text-sm opacity-40">No photos yet</p>
        </div>
      </div>
    );
  }

  const markLoaded = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Single-image swipeable carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-2xl"
        style={{
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {photos.map((photo, index) => (
          <div key={photo.id} className="flex-none w-full snap-center">
            <div className="relative aspect-[3/4] bg-black/5 rounded-2xl overflow-hidden">
              {!loadedImages.has(index) && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
              )}
              <img
                src={photo.url}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
                  loadedImages.has(index) ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
                onLoad={() => markLoaded(index)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Photo counter / dots */}
      {photos.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: activeIndex === index ? 20 : 6,
                height: 6,
                backgroundColor:
                  activeIndex === index ? accentColor : `${accentColor}33`,
              }}
              aria-label={`Photo ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
