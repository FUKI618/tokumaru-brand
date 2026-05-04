// 汎用画像生成: Gemini 3 Pro Image Preview で複数画像を一括生成
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

async function readEnvKey(): Promise<string> {
  const { readFile } = await import("node:fs/promises");
  for (const p of ["../.env", "../../.env", "/Users/fuki/Code/LP作成/徳丸商会/.env"]) {
    try {
      const txt = await readFile(p, "utf-8");
      const m = txt.match(/GEMINI_API_KEY=([^\s\n]+)/);
      if (m) return m[1];
    } catch {}
  }
  throw new Error("GEMINI_API_KEY not found");
}

const apiKey = process.env.GEMINI_API_KEY ?? (await readEnvKey());
const model = process.env.GEMINI_MODEL ?? "gemini-3-pro-image-preview";

interface Job {
  name: string;
  outputDir: string;
  prompt: string;
  width?: number;
  height?: number;
  quality?: number;
  aspectRatio?: "16:9" | "3:4" | "4:3" | "1:1" | "9:16";
}

const NEGATIVE = "text, letters, words, characters, logos, brand names, watermark, signature, visible products with brand logos, jewelry, watches, handbags, faces, people, dark mood, dramatic lighting, navy, black background, gold metallic, sparkle, glitter, vintage retro filter";

const STYLE_BASE = `An editorial still-life photograph in the style of Aesop, Lemaire, and Le Labo brand campaigns.
Soft warm natural light from a window in late afternoon, gentle shadows.
Color palette: warm off-white (#fdfbf9), cream, soft beige, dusty rose, with subtle wood-grain accents — entirely warm and earthy, no cool tones.
Mood: calm, contemplative, refined, timeless, nothing flashy.
Style references: Kinfolk magazine still-life, Aesop campaign photography, mid-day natural window light.
Shot on a medium-format film camera with shallow depth of field.
Aspect ratio 16:9 cinematic, horizontal landscape orientation.`;

const jobs: Job[] = [
  {
    name: "story-notebook",
    outputDir: "public/images/sections",
    width: 1920,
    height: 1080,
    quality: 78,
    prompt: `${STYLE_BASE}

A wooden table edge in late afternoon light from a window.
Foreground: a closed leather-bound notebook (plain natural tan, no embossing, no logo) with a slim brass-finished fountain pen resting on top.
A corner of unbleached linen cloth visible, gently draped.
Background: warm ivory wall, softly out of focus.
Composition: the notebook + pen positioned in the lower-left third, ~60% empty space at the top and right for text overlay.

Negative prompt: ${NEGATIVE}`,
  },
  {
    name: "methods-parcel",
    outputDir: "public/images/sections",
    width: 1920,
    height: 1080,
    quality: 78,
    prompt: `${STYLE_BASE}

A clean white kraft paper parcel sitting on a wooden table, gently opened with unbleached linen cloth peeking out from inside.
Beside it: a roll of natural twine and a small empty tag (no writing, no text).
Soft warm afternoon light from a window casting subtle shadows.
Composition: subject in the lower-center, ~50% empty space at the top.

Negative prompt: ${NEGATIVE}, postage stamps, address labels`,
  },
  {
    name: "staff-tools",
    outputDir: "public/images/sections",
    width: 1920,
    height: 1080,
    quality: 78,
    prompt: `${STYLE_BASE}

A small antique brass weighing scale (vintage simple geometric form) and an antique brass magnifying loupe sitting on a wooden surface.
Beside them: white cotton inspection gloves folded neatly, and a small empty cream-colored velvet tray (completely empty, no jewelry visible).
Soft warm directional light from a window, gentle shadows, focused composition.
Background: warm ivory wall.
Composition: tools arranged in the lower-third in a refined editorial layout, ~40% empty space at the top.

Negative prompt: ${NEGATIVE}, jewelry on tray, watches, rings, necklaces`,
  },
  {
    name: "voices-letter",
    outputDir: "public/images/sections",
    width: 1920,
    height: 1080,
    quality: 78,
    prompt: `${STYLE_BASE}

A folded cream-colored letter paper sitting on a wooden table next to a small empty inkwell (clear or amber glass, no liquid visible).
A pressed dried flower or single small dried sprig laid casually beside the paper.
Soft afternoon natural light casting long gentle shadows.
Background: warm ivory wall.
Composition: subject in the lower-left, ~60% empty space at the top and right.

Negative prompt: ${NEGATIVE}, written text on paper, calligraphy, ink visible`,
  },
  {
    name: "campaigns-ribbon",
    outputDir: "public/images/sections",
    width: 1920,
    height: 1080,
    quality: 78,
    prompt: `${STYLE_BASE}

A small cream-colored gift box wrapped with natural unbleached linen ribbon (no logos, no labels, no text).
Beside it: a folded ivory paper card (blank, no writing) and a single pressed dried sprig.
Soft warm late-afternoon window light casting gentle long shadows on a wooden table.
Background: warm ivory wall, softly out of focus.
Composition: subject in the lower-right, ~60% empty space at the top and left for text overlay.

Negative prompt: ${NEGATIVE}, decorations, holiday, christmas, sparkle, glitter, gold ribbon, red ribbon`,
  },

  /* ============== Portrait variants for mobile (3:4) ============== */
  {
    name: "luxury-bg-portrait",
    outputDir: "public/images/hero",
    width: 1200,
    height: 1600,
    quality: 80,
    aspectRatio: "3:4",
    prompt: `${STYLE_BASE.replace("Aspect ratio 16:9 cinematic, horizontal landscape orientation.", "Aspect ratio 3:4 portrait orientation for mobile.")}

A wooden table by a sunlit window in late afternoon. On the table: a corner of unbleached white linen cloth gently draped, with a faint suggestion of a soft cream-colored silk scarf folded loosely (no logos, no patterns).
A delicate ceramic vase with a single dried branch in the background.
Soft warm directional light streaming from upper-right window casting long shadows.
Background: warm ivory wall, softly out of focus.
Composition: subject placed in the lower-third, ~60% empty space at the top — meant for h1 text overlay below.

Negative prompt: ${NEGATIVE}`,
  },
  {
    name: "story-notebook-portrait",
    outputDir: "public/images/sections",
    width: 1200,
    height: 1600,
    quality: 80,
    aspectRatio: "3:4",
    prompt: `${STYLE_BASE.replace("Aspect ratio 16:9 cinematic, horizontal landscape orientation.", "Aspect ratio 3:4 portrait orientation for mobile.")}

A wooden table edge with late afternoon light from a window above.
A closed leather-bound notebook (plain natural tan, no embossing, no logo) viewed from a slight downward angle, with a slim brass-finished fountain pen resting diagonally on top.
A corner of unbleached linen cloth visible.
Background: warm ivory wall, soft focus.
Composition: subject centered with breathing space above and below.

Negative prompt: ${NEGATIVE}`,
  },
  {
    name: "methods-parcel-portrait",
    outputDir: "public/images/sections",
    width: 1200,
    height: 1600,
    quality: 80,
    aspectRatio: "3:4",
    prompt: `${STYLE_BASE.replace("Aspect ratio 16:9 cinematic, horizontal landscape orientation.", "Aspect ratio 3:4 portrait orientation for mobile.")}

A clean white kraft paper parcel sitting on a wooden table, gently opened with unbleached linen cloth peeking out.
Beside it: a roll of natural twine and a small empty tag (no writing).
Soft warm afternoon window light casting subtle shadows.
Composition: subject centered, generous breathing space top and bottom for portrait framing.

Negative prompt: ${NEGATIVE}, postage stamps, address labels`,
  },
  {
    name: "staff-tools-portrait",
    outputDir: "public/images/sections",
    width: 1200,
    height: 1600,
    quality: 80,
    aspectRatio: "3:4",
    prompt: `${STYLE_BASE.replace("Aspect ratio 16:9 cinematic, horizontal landscape orientation.", "Aspect ratio 3:4 portrait orientation for mobile.")}

A small antique brass weighing scale with a delicate chain, standing upright on a wooden table.
Behind it: an antique brass magnifying loupe and folded white cotton inspection gloves, with a small empty cream-colored velvet tray nearby.
Soft warm directional light from a side window, gentle shadows.
Background: warm ivory wall.
Composition: subjects vertically arranged, ~30% breathing space top and bottom.

Negative prompt: ${NEGATIVE}, jewelry on tray, watches, rings, necklaces`,
  },
  {
    name: "voices-letter-portrait",
    outputDir: "public/images/sections",
    width: 1200,
    height: 1600,
    quality: 80,
    aspectRatio: "3:4",
    prompt: `${STYLE_BASE.replace("Aspect ratio 16:9 cinematic, horizontal landscape orientation.", "Aspect ratio 3:4 portrait orientation for mobile.")}

A folded cream-colored letter paper sitting on a wooden table, with a small empty inkwell (clear or amber glass, no liquid) beside it.
A pressed dried flower sprig laid casually next to the paper.
Soft afternoon natural light casting long gentle shadows.
Background: warm ivory wall, blurred.
Composition: subject in the center, generous space above and below.

Negative prompt: ${NEGATIVE}, written text on paper, calligraphy, ink visible`,
  },
  {
    name: "campaigns-ribbon-portrait",
    outputDir: "public/images/sections",
    width: 1200,
    height: 1600,
    quality: 80,
    aspectRatio: "3:4",
    prompt: `${STYLE_BASE.replace("Aspect ratio 16:9 cinematic, horizontal landscape orientation.", "Aspect ratio 3:4 portrait orientation for mobile.")}

A small cream-colored gift box wrapped with natural unbleached linen ribbon (no logos, no labels).
Beside it: a folded ivory paper card (blank) and a single pressed dried sprig.
Soft warm late-afternoon window light casting long shadows on a wooden table.
Background: warm ivory wall, softly out of focus.
Composition: subject centered or slightly off-center, ample top/bottom breathing space.

Negative prompt: ${NEGATIVE}, decorations, holiday, christmas, sparkle, glitter, gold ribbon, red ribbon`,
  },
];

async function generateOne(job: Job): Promise<void> {
  console.log(`\n→ [${job.name}] Generating...`);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: job.prompt }] }],
    generationConfig: {
      temperature: 0.85,
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: job.aspectRatio ?? "16:9" },
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`API ${res.status}: ${t.substring(0, 200)}`);
  }

  const data: any = await res.json();
  let imageBuffer: Buffer | null = null;
  for (const cand of data?.candidates ?? []) {
    for (const part of cand?.content?.parts ?? []) {
      const inline = part?.inlineData ?? part?.inline_data;
      if (inline?.data) {
        imageBuffer = Buffer.from(inline.data, "base64");
        break;
      }
    }
    if (imageBuffer) break;
  }

  if (!imageBuffer) throw new Error("No image in response");

  await mkdir(resolve(job.outputDir), { recursive: true });
  const w = job.width ?? 1920;
  const h = job.height ?? 1080;
  const q = job.quality ?? 78;

  const webpPath = resolve(job.outputDir, `${job.name}.webp`);
  const jpgPath = resolve(job.outputDir, `${job.name}.jpg`);

  await sharp(imageBuffer).resize(w, h, { fit: "cover", position: "center" }).webp({ quality: q }).toFile(webpPath);
  await sharp(imageBuffer).resize(w, h, { fit: "cover", position: "center" }).jpeg({ quality: q + 2 }).toFile(jpgPath);

  console.log(`  ✓ ${webpPath}`);
  console.log(`  ✓ ${jpgPath}`);
}

const onlyNames = process.env.ONLY?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
const filteredJobs = onlyNames.length > 0 ? jobs.filter((j) => onlyNames.includes(j.name)) : jobs;

console.log(`Model: ${model}`);
console.log(`Jobs: ${filteredJobs.map((j) => j.name).join(", ")}\n`);

for (const job of filteredJobs) {
  try {
    await generateOne(job);
  } catch (err) {
    console.error(`  ✗ [${job.name}] FAILED: ${(err as Error).message}`);
  }
}

console.log("\n✓ All done");
