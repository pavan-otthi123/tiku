import { NextRequest, NextResponse } from "next/server";
import { getAllEvents, createEvent } from "@/lib/db";

export async function GET() {
  try {
    const events = await getAllEvents();
    return NextResponse.json({ events });
  } catch (error: unknown) {
    console.error("Error fetching events:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch events";
    return NextResponse.json({ error: message, events: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, date } = await request.json();

    if (!title || !date) {
      return NextResponse.json(
        { error: "Title and date are required" },
        { status: 400 }
      );
    }

    const event = await createEvent(title, date);
    return NextResponse.json({ event }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating event:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create event";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
