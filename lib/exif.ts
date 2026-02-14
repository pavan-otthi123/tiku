import exifr from "exifr";

/**
 * All metadata we can extract from a photo's EXIF data.
 */
export interface PhotoMetadata {
  date: string | null;
  location: string | null;
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

  console.log(`[EXIF] Processing file: ${file.name} (${file.type}, ${(file.size / 1024).toFixed(1)}KB)`);

  // ── 1. Extract date tags ──
  try {
    const exif = await exifr.parse(file, {
      pick: [
        "DateTimeOriginal",
        "CreateDate",
        "ModifyDate",
        "GPSDateStamp",
      ],
    });

    console.log("[EXIF] Date tags:", JSON.stringify(exif, null, 2));

    if (exif) {
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
    }
  } catch (err) {
    console.warn("[EXIF] Date extraction failed:", err);
  }

  // ── 2. Extract GPS coordinates using dedicated exifr.gps() ──
  try {
    const gps = await exifr.gps(file);
    console.log("[EXIF] GPS result:", JSON.stringify(gps));

    if (gps && typeof gps.latitude === "number" && typeof gps.longitude === "number") {
      result.latitude = gps.latitude;
      result.longitude = gps.longitude;
      console.log(`[EXIF] Got coordinates: ${gps.latitude}, ${gps.longitude}`);
    } else {
      console.log("[EXIF] No GPS coordinates found in this file");
    }
  } catch (err) {
    console.warn("[EXIF] GPS extraction failed:", err);
  }

  // ── 3. Date fallback: file.lastModified ──
  if (!result.date && file.lastModified) {
    const d = new Date(file.lastModified);
    if (!isNaN(d.getTime())) {
      result.date = formatDate(d);
      console.log(`[EXIF] Using file.lastModified as date fallback: ${result.date}`);
    }
  }

  // ── 4. Reverse geocode GPS to human-readable location ──
  if (result.latitude !== null && result.longitude !== null) {
    console.log(`[EXIF] Reverse geocoding ${result.latitude}, ${result.longitude}...`);
    result.location = await reverseGeocode(result.latitude, result.longitude);
    console.log(`[EXIF] Reverse geocode result: "${result.location}"`);
  }

  console.log("[EXIF] Final metadata:", JSON.stringify(result));
  return result;
}

/**
 * Extract metadata from multiple files.
 * Defaults to the FIRST photo's date and location.
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
  console.log(`[EXIF] Processing ${files.length} file(s)`);

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

  const out = { date, location, latitude, longitude };
  console.log("[EXIF] getFilesMetadata result:", JSON.stringify(out));
  return out;
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
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
  console.log(`[EXIF] Geocode URL: ${url}`);

  try {
    const res = await fetch(url);
    console.log(`[EXIF] Geocode response status: ${res.status}`);

    if (!res.ok) {
      console.warn(`[EXIF] Geocode failed with status ${res.status}`);
      return fallbackCoords(lat, lng);
    }

    const data = await res.json();
    console.log("[EXIF] Geocode response:", JSON.stringify(data).slice(0, 500));

    const parts: string[] = [];
    if (data.locality) parts.push(data.locality);
    else if (data.city) parts.push(data.city);

    if (data.principalSubdivision) parts.push(data.principalSubdivision);

    if (data.countryName && data.countryCode !== "US") {
      parts.push(data.countryName);
    }

    if (parts.length > 0) return parts.join(", ");

    return fallbackCoords(lat, lng);
  } catch (err) {
    console.error("[EXIF] Geocode error:", err);
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
