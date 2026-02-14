import exifr from "exifr";

/**
 * Extract the date a photo was taken from its EXIF metadata.
 * Works with iPhone camera roll photos which embed DateTimeOriginal.
 * Falls back to file.lastModified if no EXIF date is found.
 * Returns a YYYY-MM-DD string or null.
 */
export async function getPhotoDate(file: File): Promise<string | null> {
  try {
    // exifr can parse EXIF from File/Blob directly
    const exif = await exifr.parse(file, {
      pick: ["DateTimeOriginal", "CreateDate", "ModifyDate", "GPSDateStamp"],
    });

    if (exif) {
      // Try these EXIF tags in priority order
      const dateValue =
        exif.DateTimeOriginal || exif.CreateDate || exif.ModifyDate;

      if (dateValue instanceof Date) {
        return formatDate(dateValue);
      }

      // Some formats return a string like "2024:06:15 14:30:00"
      if (typeof dateValue === "string") {
        const parsed = parseExifDateString(dateValue);
        if (parsed) return parsed;
      }

      // GPSDateStamp is sometimes "2024:06:15"
      if (exif.GPSDateStamp && typeof exif.GPSDateStamp === "string") {
        const parsed = parseExifDateString(exif.GPSDateStamp);
        if (parsed) return parsed;
      }
    }
  } catch {
    // EXIF parsing failed — not all images have EXIF data
  }

  // Fallback: use the file's lastModified date
  if (file.lastModified) {
    const d = new Date(file.lastModified);
    if (!isNaN(d.getTime())) {
      return formatDate(d);
    }
  }

  return null;
}

/**
 * Extract dates from multiple files. Returns the earliest date found.
 */
export async function getEarliestPhotoDate(
  files: File[]
): Promise<string | null> {
  const dates = await Promise.all(files.map(getPhotoDate));
  const validDates = dates.filter(Boolean) as string[];

  if (validDates.length === 0) return null;

  // Sort chronologically and return earliest
  validDates.sort();
  return validDates[0];
}

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseExifDateString(str: string): string | null {
  // EXIF date strings look like "2024:06:15 14:30:00" or "2024:06:15"
  const match = str.match(/(\d{4})[:\-/](\d{2})[:\-/](\d{2})/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return null;
}
