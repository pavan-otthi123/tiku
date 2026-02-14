"use client";

import { TimelineEvent, Photo } from "@/lib/types";
import { useState, useRef, useCallback } from "react";

interface EventModalProps {
  isOpen: boolean;
  event: TimelineEvent | null; // null = create mode
  accentColor: string;
  onClose: () => void;
  onSave: (title: string, date: string) => Promise<TimelineEvent>;
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
  const [saving, setSaving] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [localPhotos, setLocalPhotos] = useState<Photo[]>(
    event?.photos || []
  );
  const [savedEventId, setSavedEventId] = useState<string | null>(
    event?.id || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal opens/event changes
  const resetState = useCallback(() => {
    setTitle(event?.title || "");
    setDate(event?.date || new Date().toISOString().split("T")[0]);
    setLocalPhotos(event?.photos || []);
    setSavedEventId(event?.id || null);
    setSaving(false);
    setUploadingPhotos(false);
  }, [event]);

  // Reset when event changes
  useState(() => {
    resetState();
  });

  const handleSave = async () => {
    if (!title.trim() || !date) return;
    setSaving(true);
    try {
      const savedEvent = await onSave(title.trim(), date);
      setSavedEventId(savedEvent.id);
      setLocalPhotos(savedEvent.photos || []);
      if (!isEditing) {
        // After creating, switch to edit mode so photos can be added
        // Don't close — let user add photos
      }
    } catch (error) {
      console.error("Failed to save event:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleFiles = async (files: FileList) => {
    if (!savedEventId) {
      // Need to save the event first
      if (!title.trim() || !date) return;
      setSaving(true);
      try {
        const savedEvent = await onSave(title.trim(), date);
        setSavedEventId(savedEvent.id);
        await uploadFiles(savedEvent.id, files);
      } catch (error) {
        console.error("Failed to save event:", error);
      } finally {
        setSaving(false);
      }
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
      // Refresh photos by re-fetching event
      const res = await fetch(`/api/events/${eventId}`);
      const data = await res.json();
      if (data.event) {
        setLocalPhotos(data.event.photos);
      }
    } catch (error) {
      console.error("Failed to upload photos:", error);
    } finally {
      setUploadingPhotos(false);
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
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files?.length) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [savedEventId, title, date]
  );

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
          {/* Title */}
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
              autoFocus
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-current focus:ring-2 focus:ring-current/10 outline-none text-gray-800 text-sm transition-all"
            />
          </div>

          {/* Save event button (if not saved yet or title/date changed) */}
          {(!savedEventId || title !== event?.title || date !== event?.date) && (
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

          {/* Photos section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Photos
              {!savedEventId && (
                <span className="text-xs font-normal text-gray-400 ml-2">
                  (save the event first, or just drop photos below)
                </span>
              )}
            </label>

            {/* Existing photos grid */}
            {localPhotos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {localPhotos.map((photo) => (
                  <div key={photo.id} className="relative group aspect-square rounded-xl overflow-hidden">
                    <img
                      src={photo.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemovePhoto(photo)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                  ? "border-current bg-current/5 scale-[1.02]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={dragActive ? { borderColor: accentColor, backgroundColor: `${accentColor}08` } : {}}
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
                <div className="space-y-1.5">
                  <svg className="w-8 h-8 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-gray-400">
                    Drop photos here or <span style={{ color: accentColor }}>browse</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Delete event */}
          {isEditing && onDelete && (
            <button
              onClick={handleDelete}
              className="w-full py-2.5 rounded-xl text-red-500 text-xs font-medium hover:bg-red-50 transition-colors"
            >
              Delete this event
            </button>
          )}

          {/* Done button */}
          {savedEventId && (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
