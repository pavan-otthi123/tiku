import { NextRequest, NextResponse } from "next/server";
import { addPhoto, removePhoto } from "@/lib/db";
import { put, del } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: eventId } = await params;
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const sortOrder = parseInt(formData.get("sort_order") as string) || 0;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const fileId = uuidv4();
    const ext = file.name.split(".").pop() || "jpg";
    const blob = await put(`photos/${fileId}.${ext}`, file, {
      access: "public",
      contentType: file.type,
    });

    // Save reference in database
    const photo = await addPhoto(eventId, blob.url, sortOrder);
    return NextResponse.json({ photo }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error adding photo:", error);
    const message =
      error instanceof Error ? error.message : "Failed to add photo";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { photoId, url } = await request.json();

    // Delete from blob storage
    if (url) {
      try {
        await del(url);
      } catch {
        // Blob might already be deleted
      }
    }

    // Delete from database
    const deleted = await removePhoto(photoId);
    if (!deleted) {
      return NextResponse.json(
        { error: "Photo not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error removing photo:", error);
    const message =
      error instanceof Error ? error.message : "Failed to remove photo";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
