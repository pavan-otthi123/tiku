import exifr from "exifr";

/**
 * All metadata we can extract from a photo's EXIF data.
 */
export interface PhotoMetadata {
  date: string | null; // YYYY-MM-DD
  location: string | null; // Human-readable location
  latitude: number | null;
  longitude: number | null;
}

/**
 * Extract date and GPS location from a photo's EXIF metadata.
 * Works with iPhone camera roll photos which embed DateTimeOriginal + GPS.
 */
export async function getPhotoMetadata(file: File): Promise<PhotoMetadata> {
  const result: PhotoMetadata = {
    date: null,
    location: null,
    latitude: null,
    longitude: null,
  };

  try {
    const exif = await exifr.parse(file, {
      pick: [
        "DateTimeOriginal",
        "CreateDate",
        "ModifyDate",
        "GPSDateStamp",
        "latitude",
        "longitude",
      ],
      gps: true, // exifr will auto-convert GPS tags to decimal degrees
    });

    if (exif) {
      // ── Date extraction ──
      const dateValue =
        exif.DateTimeOriginal || exif.CreateDate || exif.ModifyDate;

      if (dateValue instanceof Date) {
        result.date = formatDate(dateValue);
      } else if (typeof dateValue === "string") {
        result.date = parseExifDateString(dateValue);
      }

      if (!result.date && exif.GPSDateStamp && typeof exif.GPSDateStamp === "string") {
        result.date = parseExifDateString(exif.GPSDateStamp);
      }

      // ── GPS extraction ──
      if (typeof exif.latitude === "number" && typeof exif.longitude === "number") {
        result.latitude = exif.latitude;
        result.longitude = exif.longitude;
      }
    }
  } catch {
    // EXIF parsing failed — not all images have EXIF data
  }

  // Date fallback: file.lastModified
  if (!result.date && file.lastModified) {
    const d = new Date(file.lastModified);
    if (!isNaN(d.getTime())) {
      result.date = formatDate(d);
    }
  }

  // Reverse geocode GPS to human-readable location
  if (result.latitude !== null && result.longitude !== null) {
    result.location = await reverseGeocode(result.latitude, result.longitude);
  }

  return result;
}

/**
 * Extract metadata from multiple files.
 * Defaults to the FIRST photo's date and location.
 * Falls back through subsequent photos if the first has no data.
 */
export interface FilesMetadataResult {
  date: string | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
}

export async function getFilesMetadata(
  files: File[]
): Promise<FilesMetadataResult> {
  const results = await Promise.all(files.map(getPhotoMetadata));

  // Use first photo's date; fall back to first available
  const date =
    results[0]?.date ||
    results.find((r) => r.date)?.date ||
    null;

  // Use first photo's location; fall back to first available
  const firstWithLocation = results[0]?.location
    ? results[0]
    : results.find((r) => r.location) || null;

  const location = firstWithLocation?.location || null;
  const latitude = firstWithLocation?.latitude ?? null;
  const longitude = firstWithLocation?.longitude ?? null;

  return { date, location, latitude, longitude };
}

// Keep the old export for backward compat
export async function getEarliestPhotoDate(
  files: File[]
): Promise<string | null> {
  const { date } = await getFilesMetadata(files);
  return date;
}

/**
 * Reverse geocode lat/lng to a human-readable place name.
 * Uses the free BigDataCloud API (no API key needed, generous limits).
 */
async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (!res.ok) return fallbackCoords(lat, lng);

    const data = await res.json();

    // Build a concise location string
    const parts: string[] = [];
    if (data.locality) parts.push(data.locality);
    else if (data.city) parts.push(data.city);

    if (data.principalSubdivision) parts.push(data.principalSubdivision);

    if (data.countryName && data.countryCode !== "US") {
      parts.push(data.countryName);
    }

    if (parts.length > 0) return parts.join(", ");

    return fallbackCoords(lat, lng);
  } catch {
    return fallbackCoords(lat, lng);
  }
}

function fallbackCoords(lat: number, lng: number): string {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseExifDateString(str: string): string | null {
  const match = str.match(/(\d{4})[:\-/](\d{2})[:\-/](\d{2})/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return null;
}
