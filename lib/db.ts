import { sql } from "@vercel/postgres";
import { TimelineEvent, Photo } from "./types";

let tablesInitialized = false;

export async function ensureTables(): Promise<void> {
  if (tablesInitialized) return;

  await sql`
    CREATE TABLE IF NOT EXISTS events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS photos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      url TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  tablesInitialized = true;
}

export async function getAllEvents(): Promise<TimelineEvent[]> {
  await ensureTables();

  const eventsResult = await sql`
    SELECT id, title, date::text, created_at, updated_at
    FROM events
    ORDER BY date ASC
  `;

  const photosResult = await sql`
    SELECT id, event_id, url, sort_order, created_at
    FROM photos
    ORDER BY sort_order ASC, created_at ASC
  `;

  const photosByEvent: Record<string, Photo[]> = {};
  for (const row of photosResult.rows) {
    const eventId = row.event_id;
    if (!photosByEvent[eventId]) photosByEvent[eventId] = [];
    photosByEvent[eventId].push({
      id: row.id,
      event_id: row.event_id,
      url: row.url,
      sort_order: row.sort_order,
      created_at: row.created_at,
    });
  }

  return eventsResult.rows.map((row) => ({
    id: row.id,
    title: row.title,
    date: row.date,
    created_at: row.created_at,
    updated_at: row.updated_at,
    photos: photosByEvent[row.id] || [],
  }));
}

export async function getEvent(id: string): Promise<TimelineEvent | null> {
  await ensureTables();

  const eventResult = await sql`
    SELECT id, title, date::text, created_at, updated_at
    FROM events WHERE id = ${id}
  `;

  if (eventResult.rows.length === 0) return null;

  const photosResult = await sql`
    SELECT id, event_id, url, sort_order, created_at
    FROM photos WHERE event_id = ${id}
    ORDER BY sort_order ASC, created_at ASC
  `;

  const row = eventResult.rows[0];
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    created_at: row.created_at,
    updated_at: row.updated_at,
    photos: photosResult.rows.map((p) => ({
      id: p.id,
      event_id: p.event_id,
      url: p.url,
      sort_order: p.sort_order,
      created_at: p.created_at,
    })),
  };
}

export async function createEvent(
  title: string,
  date: string
): Promise<TimelineEvent> {
  await ensureTables();

  const result = await sql`
    INSERT INTO events (title, date)
    VALUES (${title}, ${date})
    RETURNING id, title, date::text, created_at, updated_at
  `;

  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    created_at: row.created_at,
    updated_at: row.updated_at,
    photos: [],
  };
}

export async function updateEvent(
  id: string,
  title: string,
  date: string
): Promise<TimelineEvent | null> {
  await ensureTables();

  const result = await sql`
    UPDATE events SET title = ${title}, date = ${date}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, title, date::text, created_at, updated_at
  `;

  if (result.rows.length === 0) return null;

  const photosResult = await sql`
    SELECT id, event_id, url, sort_order, created_at
    FROM photos WHERE event_id = ${id}
    ORDER BY sort_order ASC, created_at ASC
  `;

  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    created_at: row.created_at,
    updated_at: row.updated_at,
    photos: photosResult.rows.map((p) => ({
      id: p.id,
      event_id: p.event_id,
      url: p.url,
      sort_order: p.sort_order,
      created_at: p.created_at,
    })),
  };
}

export async function deleteEvent(id: string): Promise<boolean> {
  await ensureTables();
  const result = await sql`DELETE FROM events WHERE id = ${id}`;
  return (result.rowCount ?? 0) > 0;
}

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
    id: row.id,
    event_id: row.event_id,
    url: row.url,
    sort_order: row.sort_order,
    created_at: row.created_at,
  };
}

export async function removePhoto(photoId: string): Promise<boolean> {
  await ensureTables();
  const result = await sql`DELETE FROM photos WHERE id = ${photoId}`;
  return (result.rowCount ?? 0) > 0;
}
