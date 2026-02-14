/**
 * Generate minimal line sketches for all existing events that have a
 * location but no sketches yet.
 *
 * Usage:
 *   npx tsx scripts/generate-sketches.ts
 *
 * Requires GEMINI_API_KEY, BLOB_READ_WRITE_TOKEN, POSTGRES_URL in .env.local
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { sql } from "@vercel/postgres";
import { GoogleGenAI } from "@google/genai";
import { put } from "@vercel/blob";

// ── Config ───────────────────────────────────────────

const MODEL = "gemini-2.0-flash-exp-image-generation";
const DELAY_MS = 3000;

const SKETCH_PROMPTS = [
  (loc: string) =>
    `Create a minimal single-line sketch drawing of the most iconic landmark or skyline of ${loc}. Simple black outline on a pure white background. No fill, no shading, no gradient, no color, no text. Just clean, thin, minimal continuous lines.`,
  (loc: string) =>
    `Create a minimal single-line sketch drawing of a natural element or landscape typical of ${loc} (could be a wave, mountain, tree, coastline, etc). Simple black outline on a pure white background. No fill, no shading, no color, no text.`,
  (loc: string) =>
    `Create a minimal single-line sketch drawing of something culturally symbolic of ${loc}. Simple black outline on a pure white background. No fill, no shading, no color, no text.`,
];

// ── Load reference sketch ────────────────────────────

function loadSketchRef(): string | null {
  try {
    const p = path.join(process.cwd(), "app", "sketchExample", "sketch.png");
    return fs.readFileSync(p).toString("base64");
  } catch {
    console.warn("⚠ Could not load reference sketch — proceeding without it");
    return null;
  }
}

// ── Main ─────────────────────────────────────────────

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY is not set in .env.local");
    process.exit(1);
  }
  if (!process.env.POSTGRES_URL) {
    console.error("❌ POSTGRES_URL is not set in .env.local");
    process.exit(1);
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("❌ BLOB_READ_WRITE_TOKEN is not set in .env.local");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const sketchRef = loadSketchRef();

  // Ensure table exists
  await sql`
    CREATE TABLE IF NOT EXISTS background_images (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      url TEXT NOT NULL,
      prompt TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  const eventsResult = await sql`
    SELECT id, title, location
    FROM events
    WHERE location IS NOT NULL AND location != ''
    ORDER BY date ASC
  `;

  const events = eventsResult.rows;
  console.log(`\n🔍 Found ${events.length} event(s) with locations\n`);

  let generated = 0;
  let skipped = 0;

  for (const event of events) {
    const eventId = event.id as string;
    const title = event.title as string;
    const location = event.location as string;

    const existing = await sql`
      SELECT COUNT(*)::int as count FROM background_images WHERE event_id = ${eventId}
    `;
    if ((existing.rows[0].count as number) > 0) {
      console.log(`  ✓ "${title}" — already has sketches, skipping`);
      skipped++;
      continue;
    }

    console.log(`  🎨 "${title}" — generating sketches for "${location}"…`);

    for (let i = 0; i < SKETCH_PROMPTS.length; i++) {
      const promptText = SKETCH_PROMPTS[i](location);

      try {
        const parts: Array<
          | { text: string }
          | { inlineData: { mimeType: string; data: string } }
        > = [];

        if (sketchRef) {
          parts.push({
            text: "Here is an example of the minimal line sketch style I want. Match this style — simple black outlines on white, no fills, no shading:",
          });
          parts.push({
            inlineData: { mimeType: "image/png", data: sketchRef },
          });
        }

        parts.push({ text: promptText });

        const response = await ai.models.generateContent({
          model: MODEL,
          contents: [{ role: "user", parts }],
          config: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        });

        const resParts = response.candidates?.[0]?.content?.parts;
        if (!resParts) {
          console.warn(`    ⚠ No response parts for prompt ${i + 1}`);
          continue;
        }

        let saved = false;
        for (const part of resParts) {
          if (part.inlineData?.data) {
            const buffer = Buffer.from(part.inlineData.data, "base64");
            const mimeType = part.inlineData.mimeType || "image/png";
            const ext = mimeType.includes("jpeg") ? "jpg" : "png";

            const blob = await put(
              `sketches/${eventId}/${Date.now()}-${i}.${ext}`,
              buffer,
              { access: "public", contentType: mimeType }
            );

            await sql`
              INSERT INTO background_images (event_id, url, prompt)
              VALUES (${eventId}, ${blob.url}, ${promptText})
            `;

            console.log(`    ✅ Sketch ${i + 1}/${SKETCH_PROMPTS.length} saved`);
            saved = true;
            break;
          }
        }

        if (!saved) {
          console.warn(`    ⚠ No image data for prompt ${i + 1}`);
        }
      } catch (error) {
        console.error(`    ❌ Failed sketch ${i + 1}:`, error);
      }

      // Small delay between prompts within the same event
      await new Promise((r) => setTimeout(r, 1500));
    }

    generated++;

    if (events.indexOf(event) < events.length - 1) {
      console.log(`    ⏳ Waiting ${DELAY_MS / 1000}s before next event…`);
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  console.log(`\n✨ Done! Generated: ${generated}, Skipped: ${skipped}\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
