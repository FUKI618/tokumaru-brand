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
}

const NEGATIVE = "text, letters, words, characters, logos, brand names, watermark, signature, visible products with brand logos, faces, people, written language";

const jobs: Job[] = [
  {
    name: "flagship-velvet",
    outputDir: "public/images/sections",
    width: 1920,
    height: 1080,
    quality: 78,
    prompt: `A cinematic top-down view of an upscale jewelry boutique's display table.
Multiple deep navy and black velvet display trays arranged in an elegant composition, each with subtle empty pillows.
Glowing under warm directional spotlight from above, creating soft shadows on the velvet texture.
Champagne gold accents on the tray edges, subtle golden bokeh in the dark background.
Editorial luxury magazine photography, Hasselblad-quality detail.
Mostly dark navy and black palette with warm champagne gold highlights, sophisticated and intimate.
Composition has clear negative space for text overlay.
Aspect ratio 16:9 cinematic.

Negative prompt: ${NEGATIVE}`,
  },
  {
    name: "guarantee-vault",
    outputDir: "public/images/sections",
    width: 1920,
    height: 1080,
    quality: 78,
    prompt: `A dramatic close-up of an ornate antique luxury vault door, slightly ajar.
Brass and burnished gold detailing, intricate art deco patterns on the heavy door.
Warm golden light spilling out from the slightly open vault interior, illuminating the dust particles in the air.
Dark navy and black surroundings, deep shadows.
Cinematic editorial photography, dramatic chiaroscuro lighting, sense of mystery and value.
No visible contents inside (just the warm light glow).
Mostly dark with a focal point of warm golden light from the vault opening.
Aspect ratio 16:9 cinematic.

Negative prompt: ${NEGATIVE}`,
  },
  {
    name: "flow-appraisal",
    outputDir: "public/images/sections",
    width: 1920,
    height: 1080,
    quality: 78,
    prompt: `A sophisticated jewelry appraisal workspace interior. Polished dark walnut wood desk with an empty soft leather mat at its center.
On the desk: an antique brass jeweler's loupe, vintage brass weighing scale, soft cotton white gloves, a small velvet cloth.
Warm desk lamp creating focused pool of light, dark navy walls in background, hint of bookshelves softly out of focus.
Professional yet intimate atmosphere, editorial photography style with shallow depth of field.
Empty workspace ready for an appraisal session, no products yet on the mat.
Dark navy palette with warm wood, brass, and amber lamp tones.
Aspect ratio 16:9 cinematic.

Negative prompt: ${NEGATIVE}, modern computer, screen, monitor`,
  },
  {
    name: "og-image-v2",
    outputDir: "public",
    width: 1200,
    height: 630,
    quality: 88,
    prompt: `A magazine cover quality flat-lay editorial composition for a high-end luxury jewelry buyback service.
Center: an elegant deep navy velvet display surface with subtle texture and folds.
Surrounding elements: a brass jeweler's loupe with rich patina, antique brass weighing scale with delicate chain, an open vintage leather notebook, scattered champagne gold rose petals or sparkles, hint of dark blue silk ribbon, soft chandelier bokeh in upper corners.
Composition has clear negative space at the top-left third for text overlay.
Editorial magazine cover aesthetic, Vogue/Condé Nast Traveler quality, deep navy and champagne gold palette with subtle bordeaux undertones.
Cinematic lighting, sophisticated, dramatic. No actual jewelry shown.
Aspect ratio 16:9 cinematic.

Negative prompt: ${NEGATIVE}, jewelry, ring, necklace, bracelet, watch, bag, purse`,
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
      imageConfig: { aspectRatio: "16:9" },
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

console.log(`Model: ${model}`);
console.log(`Jobs: ${jobs.map((j) => j.name).join(", ")}\n`);

for (const job of jobs) {
  try {
    await generateOne(job);
  } catch (err) {
    console.error(`  ✗ [${job.name}] FAILED: ${(err as Error).message}`);
  }
}

console.log("\n✓ All done");
