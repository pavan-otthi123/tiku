"use client";

import { TimelineEvent, Photo } from "@/lib/types";
import { getFilesMetadata } from "@/lib/exif";
import { useState, useRef, useCallback } from "react";

interface EventModalProps {
  isOpen: boolean;
  event: TimelineEvent | null; // null = create mode
  accentColor: string;
  onClose: () => void;
  onSave: (
    title: string,
    date: string,
    location: string | null,
    latitude: number | null,
    longitude: number | null
  ) => Promise<TimelineEvent>;
  onAddPhoto: (eventId: string, file: File) => Promise<void>;
  onRemovePhoto: (eventId: string, photo: Photo) => Promise<void>;
  onDelete?: (eventId: string) => Promise<void>;
}

export default function EventModal({
  isOpen,
  event,
  accentColor,
  onClose,
  onSave,
  onAddPhoto,
  onRemovePhoto,
  onDelete,
}: EventModalProps) {
  const isEditing = !!event;
  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(
    event?.date || new Date().toISOString().split("T")[0]
  );
  const [location, setLocation] = useState(event?.location || "");
  const [latitude, setLatitude] = useState<number | null>(
    event?.latitude ?? null
  );
  const [longitude, setLongitude] = useState<number | null>(
    event?.longitude ?? null
  );
  const [saving, setSaving] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [extractingMeta, setExtractingMeta] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [localPhotos, setLocalPhotos] = useState<Photo[]>(
    event?.photos || []
  );
  const [savedEventId, setSavedEventId] = useState<string | null>(
    event?.id || null
  );
  const [dateAutoFilled, setDateAutoFilled] = useState(false);
  const [locationAutoFilled, setLocationAutoFilled] = useState(false);
  const [dateManuallySet, setDateManuallySet] = useState(!!event?.date);
  const [locationManuallySet, setLocationManuallySet] = useState(
    !!event?.location
  );
  const [pendingPreviews, setPendingPreviews] = useState<string[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal opens/event changes
  const resetState = useCallback(() => {
    setTitle(event?.title || "");
    setDate(event?.date || new Date().toISOString().split("T")[0]);
    setLocation(event?.location || "");
    setLatitude(event?.latitude ?? null);
    setLongitude(event?.longitude ?? null);
    setLocalPhotos(event?.photos || []);
    setSavedEventId(event?.id || null);
    setSaving(false);
    setUploadingPhotos(false);
    setExtractingMeta(false);
    setDateAutoFilled(false);
    setLocationAutoFilled(false);
    setDateManuallySet(!!event?.date);
    setLocationManuallySet(!!event?.location);
    pendingPreviews.forEach((url) => URL.revokeObjectURL(url));
    setPendingPreviews([]);
    setPendingFiles([]);
  }, [event]);

  useState(() => {
    resetState();
  });

  // ── File handling ──────────────────────────────────

  const extractMetadataFromFiles = useCallback(
    async (files: FileList) => {
      setExtractingMeta(true);
      try {
        const meta = await getFilesMetadata(Array.from(files));

        if (meta.date && !dateManuallySet) {
          setDate(meta.date);
          setDateAutoFilled(true);
        }

        if (meta.location && !locationManuallySet) {
          setLocation(meta.location);
          setLocationAutoFilled(true);
        }

        if (meta.latitude != null && meta.longitude != null) {
          setLatitude(meta.latitude);
          setLongitude(meta.longitude);
        }

        return meta;
      } catch {
        return { date: null, location: null, latitude: null, longitude: null };
      } finally {
        setExtractingMeta(false);
      }
    },
    [dateManuallySet, locationManuallySet]
  );

  const handleFiles = async (files: FileList) => {
    // Extract metadata from the first photo
    await extractMetadataFromFiles(files);

    if (!savedEventId) {
      // Stage files as previews
      const newFiles = Array.from(files);
      setPendingFiles((prev) => [...prev, ...newFiles]);
      const previews = newFiles.map((f) => URL.createObjectURL(f));
      setPendingPreviews((prev) => [...prev, ...previews]);
      return;
    }
    await uploadFiles(savedEventId, files);
  };

  const uploadFiles = async (eventId: string, files: FileList) => {
    setUploadingPhotos(true);
    try {
      for (const file of Array.from(files)) {
        await onAddPhoto(eventId, file);
      }
      const res = await fetch(`/api/events/${eventId}`);
      const data = await res.json();
      if (data.event) setLocalPhotos(data.event.photos);
    } catch (error) {
      console.error("Failed to upload photos:", error);
    } finally {
      setUploadingPhotos(false);
    }
  };

  // ── Save / Delete ──────────────────────────────────

  const handleSave = async () => {
    if (!title.trim() || !date) return;
    setSaving(true);
    try {
      const savedEvent = await onSave(
        title.trim(),
        date,
        location.trim() || null,
        latitude,
        longitude
      );
      setSavedEventId(savedEvent.id);
      setLocalPhotos(savedEvent.photos || []);

      if (pendingFiles.length > 0) {
        setUploadingPhotos(true);
        try {
          for (const file of pendingFiles) {
            await onAddPhoto(savedEvent.id, file);
          }
          const res = await fetch(`/api/events/${savedEvent.id}`);
          const data = await res.json();
          if (data.event) setLocalPhotos(data.event.photos);
        } finally {
          pendingPreviews.forEach((url) => URL.revokeObjectURL(url));
          setPendingFiles([]);
          setPendingPreviews([]);
          setUploadingPhotos(false);
        }
      }
    } catch (error) {
      console.error("Failed to save event:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleRemovePhoto = async (photo: Photo) => {
    if (!savedEventId) return;
    try {
      await onRemovePhoto(savedEventId, photo);
      setLocalPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    } catch (error) {
      console.error("Failed to remove photo:", error);
    }
  };

  const handleDelete = async () => {
    if (!savedEventId || !onDelete) return;
    if (!confirm("Delete this event and all its photos?")) return;
    try {
      await onDelete(savedEventId);
      onClose();
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
    },
    [savedEventId, title, date]
  );

  // ── Helpers ────────────────────────────────────────

  const formatDetectedDate = (d: string) => {
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const hasPhotos = pendingPreviews.length > 0 || localPhotos.length > 0;
  const hasDetectedMeta = dateAutoFilled || locationAutoFilled;
  const fieldsChanged =
    !savedEventId ||
    title !== event?.title ||
    date !== event?.date ||
    (location || "") !== (event?.location || "");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl md:rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 pb-3 bg-white rounded-t-3xl md:rounded-t-2xl border-b border-black/5">
          <h2 className="text-lg font-bold" style={{ color: accentColor }}>
            {isEditing ? "Edit Event" : "New Event"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* ── 1. PHOTOS (first!) ────────────────────── */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {isEditing ? "Photos" : "Add photos to start"}
            </label>

            {/* Photo thumbnails */}
            {(pendingPreviews.length > 0 || localPhotos.length > 0) && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {/* Pending (unsaved) */}
                {pendingPreviews.map((src, i) => (
                  <div
                    key={`pending-${i}`}
                    className="relative aspect-square rounded-xl overflow-hidden"
                    style={{ boxShadow: `0 0 0 2px ${accentColor}40` }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        URL.revokeObjectURL(src);
                        setPendingPreviews((prev) => prev.filter((_, j) => j !== i));
                        setPendingFiles((prev) => prev.filter((_, j) => j !== i));
                      }}
                      className="absolute top-1 right-1 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center text-xs active:scale-90 transition-transform"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Saved */}
                {localPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative aspect-square rounded-xl overflow-hidden"
                  >
                    <img src={photo.url} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemovePhoto(photo)}
                      className="absolute top-1 right-1 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center text-xs active:scale-90 transition-transform"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Drop zone */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? "scale-[1.02]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={
                dragActive
                  ? { borderColor: accentColor, backgroundColor: `${accentColor}08` }
                  : {}
              }
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) handleFiles(e.target.files);
                }}
              />
              {uploadingPhotos ? (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Uploading...
                </div>
              ) : (
                <div className="space-y-1">
                  <svg className="w-8 h-8 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-gray-400">
                    {hasPhotos ? "Add more photos" : "Tap to select photos"}
                  </p>
                  <p className="text-[10px] text-gray-300">
                    Date & location auto-detect from photo
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── 2. DETECTED METADATA CARD ─────────────── */}
          {extractingMeta && (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor: `${accentColor}08`, color: accentColor }}
            >
              <svg className="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Reading photo details...
            </div>
          )}

          {!extractingMeta && hasDetectedMeta && (
            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: `${accentColor}20` }}
            >
              <div
                className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider"
                style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
              >
                Detected from photo
              </div>
              <div className="px-4 py-3 space-y-2 bg-white">
                {dateAutoFilled && (
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${accentColor}10` }}
                    >
                      <svg className="w-3.5 h-3.5" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs text-gray-400 leading-none">Date</p>
                      <p className="text-sm font-medium text-gray-800">
                        {formatDetectedDate(date)}
                      </p>
                    </div>
                  </div>
                )}
                {locationAutoFilled && location && (
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${accentColor}10` }}
                    >
                      <svg className="w-3.5 h-3.5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs text-gray-400 leading-none">Location</p>
                      <p className="text-sm font-medium text-gray-800">
                        {location}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── 3. TITLE ──────────────────────────────── */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Event title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Our First Date"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-current focus:ring-2 focus:ring-current/10 outline-none text-gray-800 text-sm transition-all"
              style={{ "--tw-ring-color": `${accentColor}20` } as React.CSSProperties}
              autoFocus={isEditing}
            />
          </div>

          {/* ── 4. DATE ───────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Date
              </label>
              {dateAutoFilled && (
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                  }}
                >
                  from photo
                </span>
              )}
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setDateManuallySet(true);
                setDateAutoFilled(false);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-current focus:ring-2 focus:ring-current/10 outline-none text-gray-800 text-sm transition-all"
            />
          </div>

          {/* ── 5. LOCATION ───────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Location{" "}
                <span className="text-xs font-normal text-gray-400">
                  (optional)
                </span>
              </label>
              {locationAutoFilled && (
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                  }}
                >
                  from photo
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setLocationManuallySet(true);
                  setLocationAutoFilled(false);
                }}
                placeholder="e.g. Paris, France"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-current focus:ring-2 focus:ring-current/10 outline-none text-gray-800 text-sm transition-all"
              />
            </div>
          </div>

          {/* ── 6. SAVE BUTTON ────────────────────────── */}
          {fieldsChanged && (
            <button
              onClick={handleSave}
              disabled={saving || !title.trim() || !date}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: accentColor }}
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>{savedEventId ? "Update Event" : "Create Event"}</>
              )}
            </button>
          )}

          {/* ── 7. DELETE / DONE ──────────────────────── */}
          {isEditing && onDelete && (
            <button
              onClick={handleDelete}
              className="w-full py-2.5 rounded-xl text-red-500 text-xs font-medium hover:bg-red-50 transition-colors"
            >
              Delete this event
            </button>
          )}

          {savedEventId && (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: `${accentColor}12`,
                color: accentColor,
              }}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
