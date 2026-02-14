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
    `Draw the silhouette outline of the skyline or most iconic landmark of ${loc} using a single thin continuous black line on a pure white background. Only draw the outer edge profile — like a city skyline silhouette. No interior details, no fill, no shading, no hatching, no color, no text, no ground line. Just one thin black outline tracing the shape against white.`,
  (loc: string) =>
    `Draw the silhouette outline of a natural landscape element strongly associated with ${loc} (for example: a mountain range profile, ocean wave, cliff edge, palm tree, cactus, etc) using a single thin continuous black line on a pure white background. Only the outer edge silhouette — no interior detail, no fill, no shading, no hatching, no color, no text. Just one thin black outline on white.`,
  (loc: string) =>
    `Draw the silhouette outline of a culturally iconic object or structure from ${loc} using a single thin continuous black line on a pure white background. Only the outer profile shape — no interior detail, no fill, no shading, no hatching, no color, no text. Just one thin black outline tracing the silhouette against white, like a minimal architectural profile drawing.`,
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
            text: "Here is an example of the exact style I want. Notice it is ONLY a thin black silhouette outline on pure white — just the outer edge profile, no interior details, no fill, no shading. Match this style precisely:",
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
