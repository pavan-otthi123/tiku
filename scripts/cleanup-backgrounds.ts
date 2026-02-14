/**
 * Remove all existing AI-generated background images from DB + Vercel Blob.
 *
 * Usage:
 *   npx tsx scripts/cleanup-backgrounds.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { sql } from "@vercel/postgres";
import { del } from "@vercel/blob";

async function main() {
  if (!process.env.POSTGRES_URL) {
    console.error("❌ POSTGRES_URL not set in .env.local");
    process.exit(1);
  }

  // Ensure table exists (in case it doesn't yet)
  await sql`
    CREATE TABLE IF NOT EXISTS background_images (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      url TEXT NOT NULL,
      prompt TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  const result = await sql`SELECT id, url FROM background_images`;
  console.log(`\n🗑  Found ${result.rows.length} background image(s) to remove\n`);

  for (const row of result.rows) {
    const url = row.url as string;
    try {
      await del(url);
      console.log(`  ✓ Deleted blob: ${url.slice(0, 80)}…`);
    } catch (err) {
      console.warn(`  ⚠ Could not delete blob (may already be gone):`, err);
    }
  }

  await sql`DELETE FROM background_images`;
  console.log(`\n✨ Cleaned up all background_images from database\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
