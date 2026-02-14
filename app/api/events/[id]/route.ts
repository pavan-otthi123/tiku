import { NextRequest, NextResponse } from "next/server";
import { getEvent, updateEvent, deleteEvent } from "@/lib/db";
import { del } from "@vercel/blob";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await getEvent(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ event });
  } catch (error: unknown) {
    console.error("Error fetching event:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch event";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, date, location, latitude, longitude } = await request.json();

    if (!title || !date) {
      return NextResponse.json(
        { error: "Title and date are required" },
        { status: 400 }
      );
    }

    const event = await updateEvent(
      id,
      title,
      date,
      location ?? null,
      latitude ?? null,
      longitude ?? null
    );
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ event });
  } catch (error: unknown) {
    console.error("Error updating event:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update event";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get event first to clean up blob storage (photos + backgrounds)
    const event = await getEvent(id);
    if (event) {
      const allUrls = [
        ...event.photos.map((p) => p.url),
        ...event.backgrounds.map((b) => b.url),
      ];
      for (const url of allUrls) {
        try {
          await del(url);
        } catch {
          // Blob might already be deleted
        }
      }
    }

    const deleted = await deleteEvent(id);
    if (!deleted) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting event:", error);
    const message =
      error instanceof Error ? error.message : "Failed to delete event";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
