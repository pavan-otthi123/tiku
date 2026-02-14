/**
 * Backfill script: generate AI background images for all existing events
 * that have a location but no backgrounds yet.
 *
 * Usage:
 *   npx tsx scripts/generate-backgrounds.ts
 *
 * Requires:
 *   - GEMINI_API_KEY in .env.local
 *   - BLOB_READ_WRITE_TOKEN in .env.local
 *   - POSTGRES_URL in .env.local
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { sql } from "@vercel/postgres";
import { GoogleGenAI } from "@google/genai";
import { put } from "@vercel/blob";

// ── Config ───────────────────────────────────────────

const MODEL = "gemini-2.5-flash-image";
const DELAY_MS = 3000; // delay between events to avoid rate limiting

const PROMPT_TEMPLATES = [
  (loc: string) =>
    `Create a beautiful, atmospheric landscape photograph of ${loc}. Scenic, cinematic, golden hour lighting, wide angle. No text, no watermarks, no people.`,
  (loc: string) =>
    `Create a stunning panoramic view of ${loc} at twilight. Vivid colors, dreamy atmosphere, travel photography style. No text, no watermarks, no people.`,
];

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

  // Ensure background_images table exists
  await sql`
    CREATE TABLE IF NOT EXISTS background_images (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      url TEXT NOT NULL,
      prompt TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Fetch all events with a location
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

    // Check if backgrounds already exist
    const existing = await sql`
      SELECT COUNT(*)::int as count FROM background_images WHERE event_id = ${eventId}
    `;

    if ((existing.rows[0].count as number) > 0) {
      console.log(`  ✓ "${title}" — already has backgrounds, skipping`);
      skipped++;
      continue;
    }

    console.log(`  🎨 "${title}" — generating backgrounds for "${location}"…`);

    for (let i = 0; i < PROMPT_TEMPLATES.length; i++) {
      const prompt = PROMPT_TEMPLATES[i](location);

      try {
        const response = await ai.models.generateContent({
          model: MODEL,
          contents: prompt,
          config: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (!parts) {
          console.warn(`    ⚠ No response parts for prompt ${i + 1}`);
          continue;
        }

        let saved = false;
        for (const part of parts) {
          if (part.inlineData?.data) {
            const buffer = Buffer.from(part.inlineData.data, "base64");
            const mimeType = part.inlineData.mimeType || "image/png";
            const ext = mimeType.includes("jpeg") ? "jpg" : "png";

            const blob = await put(
              `backgrounds/${eventId}/${Date.now()}-${i}.${ext}`,
              buffer,
              { access: "public", contentType: mimeType }
            );

            await sql`
              INSERT INTO background_images (event_id, url, prompt)
              VALUES (${eventId}, ${blob.url}, ${prompt})
            `;

            console.log(`    ✅ Background ${i + 1}/2 saved`);
            saved = true;
            break;
          }
        }

        if (!saved) {
          console.warn(`    ⚠ No image data in response for prompt ${i + 1}`);
        }
      } catch (error) {
        console.error(`    ❌ Failed to generate background ${i + 1}:`, error);
      }
    }

    generated++;

    // Rate-limit delay between events
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
