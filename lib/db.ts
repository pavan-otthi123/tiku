import { sql } from "@vercel/postgres";
import { TimelineEvent, Photo, BackgroundImage } from "./types";

let tablesInitialized = false;

export async function ensureTables(): Promise<void> {
  if (tablesInitialized) return;

  await sql`
    CREATE TABLE IF NOT EXISTS events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      location TEXT,
      latitude DOUBLE PRECISION,
      longitude DOUBLE PRECISION,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Migrate existing databases
  await sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS location TEXT`;
  await sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION`;
  await sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION`;

  await sql`
    CREATE TABLE IF NOT EXISTS photos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      url TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS background_images (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      url TEXT NOT NULL,
      prompt TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  tablesInitialized = true;
}

// ── Helpers ──────────────────────────────────────────

function rowToEvent(
  row: Record<string, unknown>,
  photos: Photo[],
  backgrounds: BackgroundImage[]
): TimelineEvent {
  return {
    id: row.id as string,
    title: row.title as string,
    date: row.date as string,
    location: (row.location as string) || null,
    latitude: row.latitude != null ? Number(row.latitude) : null,
    longitude: row.longitude != null ? Number(row.longitude) : null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    photos,
    backgrounds,
  };
}

// ── Events ───────────────────────────────────────────

export async function getAllEvents(): Promise<TimelineEvent[]> {
  await ensureTables();

  const eventsResult = await sql`
    SELECT id, title, date::text, location, latitude, longitude, created_at, updated_at
    FROM events ORDER BY date ASC
  `;

  const photosResult = await sql`
    SELECT id, event_id, url, sort_order, created_at
    FROM photos ORDER BY sort_order ASC, created_at ASC
  `;

  const bgResult = await sql`
    SELECT id, event_id, url, prompt, created_at
    FROM background_images ORDER BY created_at ASC
  `;

  const photosByEvent: Record<string, Photo[]> = {};
  for (const row of photosResult.rows) {
    const eid = row.event_id as string;
    if (!photosByEvent[eid]) photosByEvent[eid] = [];
    photosByEvent[eid].push({
      id: row.id as string,
      event_id: eid,
      url: row.url as string,
      sort_order: row.sort_order as number,
      created_at: row.created_at as string,
    });
  }

  const bgsByEvent: Record<string, BackgroundImage[]> = {};
  for (const row of bgResult.rows) {
    const eid = row.event_id as string;
    if (!bgsByEvent[eid]) bgsByEvent[eid] = [];
    bgsByEvent[eid].push({
      id: row.id as string,
      event_id: eid,
      url: row.url as string,
      prompt: (row.prompt as string) || null,
      created_at: row.created_at as string,
    });
  }

  return eventsResult.rows.map((row) =>
    rowToEvent(
      row,
      photosByEvent[row.id as string] || [],
      bgsByEvent[row.id as string] || []
    )
  );
}

export async function getEvent(id: string): Promise<TimelineEvent | null> {
  await ensureTables();

  const eventResult = await sql`
    SELECT id, title, date::text, location, latitude, longitude, created_at, updated_at
    FROM events WHERE id = ${id}
  `;
  if (eventResult.rows.length === 0) return null;

  const photosResult = await sql`
    SELECT id, event_id, url, sort_order, created_at
    FROM photos WHERE event_id = ${id}
    ORDER BY sort_order ASC, created_at ASC
  `;

  const bgResult = await sql`
    SELECT id, event_id, url, prompt, created_at
    FROM background_images WHERE event_id = ${id}
    ORDER BY created_at ASC
  `;

  const photos: Photo[] = photosResult.rows.map((p) => ({
    id: p.id as string,
    event_id: p.event_id as string,
    url: p.url as string,
    sort_order: p.sort_order as number,
    created_at: p.created_at as string,
  }));

  const backgrounds: BackgroundImage[] = bgResult.rows.map((b) => ({
    id: b.id as string,
    event_id: b.event_id as string,
    url: b.url as string,
    prompt: (b.prompt as string) || null,
    created_at: b.created_at as string,
  }));

  return rowToEvent(eventResult.rows[0], photos, backgrounds);
}

export async function createEvent(
  title: string,
  date: string,
  location: string | null = null,
  latitude: number | null = null,
  longitude: number | null = null
): Promise<TimelineEvent> {
  await ensureTables();

  const result = await sql`
    INSERT INTO events (title, date, location, latitude, longitude)
    VALUES (${title}, ${date}, ${location}, ${latitude}, ${longitude})
    RETURNING id, title, date::text, location, latitude, longitude, created_at, updated_at
  `;

  return rowToEvent(result.rows[0], [], []);
}

export async function updateEvent(
  id: string,
  title: string,
  date: string,
  location: string | null = null,
  latitude: number | null = null,
  longitude: number | null = null
): Promise<TimelineEvent | null> {
  await ensureTables();

  const result = await sql`
    UPDATE events
    SET title = ${title}, date = ${date}, location = ${location},
        latitude = ${latitude}, longitude = ${longitude}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, title, date::text, location, latitude, longitude, created_at, updated_at
  `;
  if (result.rows.length === 0) return null;

  const photosResult = await sql`
    SELECT id, event_id, url, sort_order, created_at
    FROM photos WHERE event_id = ${id}
    ORDER BY sort_order ASC, created_at ASC
  `;

  const bgResult = await sql`
    SELECT id, event_id, url, prompt, created_at
    FROM background_images WHERE event_id = ${id}
    ORDER BY created_at ASC
  `;

  const photos: Photo[] = photosResult.rows.map((p) => ({
    id: p.id as string,
    event_id: p.event_id as string,
    url: p.url as string,
    sort_order: p.sort_order as number,
    created_at: p.created_at as string,
  }));

  const backgrounds: BackgroundImage[] = bgResult.rows.map((b) => ({
    id: b.id as string,
    event_id: b.event_id as string,
    url: b.url as string,
    prompt: (b.prompt as string) || null,
    created_at: b.created_at as string,
  }));

  return rowToEvent(result.rows[0], photos, backgrounds);
}

export async function deleteEvent(id: string): Promise<boolean> {
  await ensureTables();
  const result = await sql`DELETE FROM events WHERE id = ${id}`;
  return (result.rowCount ?? 0) > 0;
}

// ── Photos ───────────────────────────────────────────

export async function addPhoto(
  eventId: string,
  url: string,
  sortOrder: number = 0
): Promise<Photo> {
  await ensureTables();

  const result = await sql`
    INSERT INTO photos (event_id, url, sort_order)
    VALUES (${eventId}, ${url}, ${sortOrder})
    RETURNING id, event_id, url, sort_order, created_at
  `;

  const row = result.rows[0];
  return {
    id: row.id as string,
    event_id: row.event_id as string,
    url: row.url as string,
    sort_order: row.sort_order as number,
    created_at: row.created_at as string,
  };
}

export async function removePhoto(photoId: string): Promise<boolean> {
  await ensureTables();
  const result = await sql`DELETE FROM photos WHERE id = ${photoId}`;
  return (result.rowCount ?? 0) > 0;
}

// ── Background Images ────────────────────────────────

export async function addBackgroundImage(
  eventId: string,
  url: string,
  prompt: string | null = null
): Promise<BackgroundImage> {
  await ensureTables();

  const result = await sql`
    INSERT INTO background_images (event_id, url, prompt)
    VALUES (${eventId}, ${url}, ${prompt})
    RETURNING id, event_id, url, prompt, created_at
  `;

  const row = result.rows[0];
  return {
    id: row.id as string,
    event_id: row.event_id as string,
    url: row.url as string,
    prompt: (row.prompt as string) || null,
    created_at: row.created_at as string,
  };
}

export async function getBackgroundsForEvent(
  eventId: string
): Promise<BackgroundImage[]> {
  await ensureTables();

  const result = await sql`
    SELECT id, event_id, url, prompt, created_at
    FROM background_images WHERE event_id = ${eventId}
    ORDER BY created_at ASC
  `;

  return result.rows.map((row) => ({
    id: row.id as string,
    event_id: row.event_id as string,
    url: row.url as string,
    prompt: (row.prompt as string) || null,
    created_at: row.created_at as string,
  }));
}

export async function removeBackgroundImage(bgId: string): Promise<boolean> {
  await ensureTables();
  const result = await sql`DELETE FROM background_images WHERE id = ${bgId}`;
  return (result.rowCount ?? 0) > 0;
}
