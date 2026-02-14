import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { put } from "@vercel/blob";
import { addBackgroundImage } from "./db";

const MODEL = "gemini-2.0-flash-exp-image-generation";

/**
 * Prompt templates for different sketch subjects per location.
 * Each generates a distinct minimal line sketch.
 */
const SKETCH_PROMPTS = [
  (loc: string) =>
    `Create a minimal single-line sketch drawing of the most iconic landmark or skyline of ${loc}. Simple black outline on a pure white background. No fill, no shading, no gradient, no color, no text. Just clean, thin, minimal continuous lines. The style should look like a simple architectural line sketch.`,
  (loc: string) =>
    `Create a minimal single-line sketch drawing of a natural element or landscape typical of ${loc} (could be a wave, mountain, tree, coastline, river, etc). Simple black outline on a pure white background. No fill, no shading, no color, no text. Just clean, thin, minimal continuous lines.`,
  (loc: string) =>
    `Create a minimal single-line sketch drawing of something culturally or geographically symbolic of ${loc}. Simple black outline on a pure white background. No fill, no shading, no color, no text. Just clean, thin, minimal lines — like a quick pen sketch.`,
];

/**
 * Load the reference sketch image as base64.
 * Falls back gracefully if the file doesn't exist.
 */
function loadSketchReference(): string | null {
  try {
    const sketchPath = path.join(
      process.cwd(),
      "app",
      "sketchExample",
      "sketch.png"
    );
    return fs.readFileSync(sketchPath).toString("base64");
  } catch {
    console.warn("[SKETCH] Could not load reference sketch image");
    return null;
  }
}

/**
 * Generate 2-4 minimal line sketches for an event's location using Gemini,
 * upload them to Vercel Blob, and save references in the database.
 */
export async function generateAndSaveBackgrounds(
  eventId: string,
  location: string
): Promise<string[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn(
      "[SKETCH] GEMINI_API_KEY not set – skipping sketch generation"
    );
    return [];
  }

  const ai = new GoogleGenAI({ apiKey });
  const sketchRef = loadSketchReference();
  const urls: string[] = [];

  for (let i = 0; i < SKETCH_PROMPTS.length; i++) {
    const promptText = SKETCH_PROMPTS[i](location);
    console.log(
      `[SKETCH] Generating sketch ${i + 1}/${SKETCH_PROMPTS.length} for "${location}"…`
    );

    try {
      // Build multimodal contents: reference image + text prompt
      const parts: Array<
        { text: string } | { inlineData: { mimeType: string; data: string } }
      > = [];

      if (sketchRef) {
        parts.push({
          text: "Here is an example of the minimal line sketch style I want. Match this style exactly — simple black outlines on white, no fills, no shading:",
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

      const candidates = response.candidates;
      if (!candidates || candidates.length === 0) {
        console.warn("[SKETCH] No candidates returned");
        continue;
      }

      const resParts = candidates[0].content?.parts;
      if (!resParts) {
        console.warn("[SKETCH] No parts in response");
        continue;
      }

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

          await addBackgroundImage(eventId, blob.url, promptText);
          urls.push(blob.url);
          console.log(`[SKETCH] ✓ Saved sketch: ${blob.url}`);
          break; // one image per prompt
        }
      }
    } catch (error) {
      console.error(`[SKETCH] Failed to generate sketch ${i + 1}:`, error);
    }
  }

  return urls;
}
