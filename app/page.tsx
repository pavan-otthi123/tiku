"use client";

import { useState, useEffect, useCallback } from "react";
import { TimelineEvent, Photo, Season } from "@/lib/types";
import { getCurrentSeason, getTheme } from "@/lib/seasons";
import SeasonalBackground from "@/components/SeasonalBackground";
import Timeline from "@/components/Timeline";
import EventModal from "@/components/EventModal";
import GlobeView from "@/components/GlobeView";

const DATING_START_DATE =
  process.env.NEXT_PUBLIC_DATING_START_DATE || "2024-01-01";

export default function Home() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [season, setSeason] = useState<Season>(getCurrentSeason());

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [globeOpen, setGlobeOpen] = useState(false);

  const theme = getTheme(season);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setEvents([]);
      } else {
        setEvents(data.events || []);
        setError(null);
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("Could not connect to the database. Check your configuration.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Event CRUD handlers
  const handleSaveEvent = async (
    title: string,
    date: string,
    location: string | null,
    latitude: number | null,
    longitude: number | null
  ): Promise<TimelineEvent> => {
    const payload = { title, date, location, latitude, longitude };
    if (editingEvent) {
      const res = await fetch(`/api/events/${editingEvent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchEvents();
      return data.event;
    } else {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchEvents();
      return data.event;
    }
  };

  const handleAddPhoto = async (eventId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`/api/events/${eventId}/photos`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    await fetchEvents();
  };

  const handleRemovePhoto = async (eventId: string, photo: Photo) => {
    const res = await fetch(`/api/events/${eventId}/photos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoId: photo.id, url: photo.url }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    await fetchEvents();
  };

  const handleDeleteEvent = async (eventId: string) => {
    const res = await fetch(`/api/events/${eventId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    await fetchEvents();
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setModalOpen(true);
  };

  const openEditModal = (event: TimelineEvent) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEvent(null);
    fetchEvents();
  };

  // Loading state
  if (loading) {
    return (
      <SeasonalBackground season={season}>
        <div className="h-screen flex flex-col items-center justify-center">
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: `${theme.accent}30`, borderTopColor: theme.accent }}
            />
          </div>
          <p className="mt-4 text-sm" style={{ color: `${theme.accent}80` }}>
            Loading your story...
          </p>
        </div>
      </SeasonalBackground>
    );
  }

  // Error state — still show the app, just with a banner
  return (
    <SeasonalBackground season={season}>
      {error && (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-amber-50 border-b border-amber-200 text-amber-800 text-xs text-center">
          <strong>Setup needed:</strong> {error}{" "}
          <a
            href="https://vercel.com/docs/storage/vercel-postgres/quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Learn more
          </a>
        </div>
      )}

      <Timeline
        events={events}
        startDate={DATING_START_DATE}
        currentSeason={season}
        onSeasonChange={setSeason}
        onEditEvent={openEditModal}
        onCreateEvent={openCreateModal}
        onOpenGlobe={() => setGlobeOpen(true)}
      />

      <GlobeView
        events={events}
        accentColor={theme.accent}
        isOpen={globeOpen}
        onClose={() => setGlobeOpen(false)}
      />

      <EventModal
        isOpen={modalOpen}
        event={editingEvent}
        accentColor={theme.accent}
        onClose={closeModal}
        onSave={handleSaveEvent}
        onAddPhoto={handleAddPhoto}
        onRemovePhoto={handleRemovePhoto}
        onDelete={editingEvent ? handleDeleteEvent : undefined}
      />
    </SeasonalBackground>
  );
}
