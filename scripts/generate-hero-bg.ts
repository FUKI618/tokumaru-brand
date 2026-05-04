// Aesop / Lemaire 系のモダンミニマル静物（窓際リネン+シルクスカーフ）を生成
// ヒーロー背景。no text/no logos/no human face/no real branded products

import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const apiKey = process.env.GEMINI_API_KEY ?? (await readEnvKey());

async function readEnvKey(): Promise<string> {
  const { readFile } = await import("node:fs/promises");
  // 親ディレクトリの .env を読む
  for (const p of ["../.env", "../../.env", "/Users/fuki/Code/LP作成/徳丸商会/.env"]) {
    try {
      const txt = await readFile(p, "utf-8");
      const m = txt.match(/GEMINI_API_KEY=([^\s\n]+)/);
      if (m) return m[1];
    } catch {}
  }
  throw new Error("GEMINI_API_KEY not found");
}

const prompt = `An editorial still-life photograph in the style of Aesop, Lemaire, and Le Labo brand campaigns.
A quiet interior scene by a window in the late afternoon: natural soft warm sunlight gently filtering through sheer linen curtains, casting subtle long shadows.
Foreground: a smooth white linen tablecloth or unstarched fabric draped over a wooden surface, with one folded pale silk scarf in muted natural tones (cream, soft beige, dusty rose, no pattern).
Background: very softly out-of-focus warm ivory wall, no objects, lots of negative space.
Color palette: warm off-white (#fdfbf9), cream, beige, dusty rose, with subtle wood-grain accents — entirely warm and earthy, no cool tones, no navy, no black.
Composition: about 60% empty space (right and top) for text overlay, the silk scarf is positioned in the lower-left third.
Mood: calm, contemplative, refined, timeless, nothing flashy.
Style references: Kinfolk magazine still-life, Aesop campaign photography, mid-day natural window light.
Shot on a medium-format film camera with shallow depth of field.
Aspect ratio 16:9 cinematic, horizontal landscape orientation.`;

const negative = "text, letters, words, characters, logos, brand names, watermark, signature, visible products with brand logos, jewelry, watches, handbags, faces, people, dark mood, dramatic lighting, navy, black background, gold metallic, sparkle, glitter, vintage, retro";

await mkdir(resolve("public/images/hero"), { recursive: true });

console.log("→ Generating with Gemini 2.5 Flash Image...");

const model = process.env.GEMINI_MODEL ?? "gemini-3-pro-image-preview";
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

const body = {
  contents: [
    {
      parts: [{ text: `${prompt}\n\nNegative prompt: ${negative}` }],
    },
  ],
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
  console.error("API error:", res.status, t.substring(0, 500));
  process.exit(1);
}

const data: any = await res.json();
const candidates = data?.candidates ?? [];
let imageBuffer: Buffer | null = null;

for (const cand of candidates) {
  for (const part of cand?.content?.parts ?? []) {
    const inline = part?.inlineData ?? part?.inline_data;
    if (inline?.data) {
      imageBuffer = Buffer.from(inline.data, "base64");
      break;
    }
  }
  if (imageBuffer) break;
}

if (!imageBuffer) {
  console.error("No image in response:", JSON.stringify(data).substring(0, 800));
  process.exit(1);
}

// Sharp で WebP 変換 + リサイズ（2400x1350 まで、quality 80）
const outputPath = resolve("public/images/hero/luxury-bg.webp");
const outputJpg = resolve("public/images/hero/luxury-bg.jpg");

const meta = await sharp(imageBuffer).metadata();
console.log(`  Original: ${meta.width}x${meta.height} (${meta.format})`);

// オリジナル（推定1024〜1408幅）→ 1920x1080 にリサイズしてWebP出力
await sharp(imageBuffer)
  .resize(1920, 1080, { fit: "cover", position: "center" })
  .webp({ quality: 78 })
  .toFile(outputPath);

await sharp(imageBuffer)
  .resize(1920, 1080, { fit: "cover", position: "center" })
  .jpeg({ quality: 80 })
  .toFile(outputJpg);

const wInfo = await sharp(outputPath).metadata();
const jInfo = await sharp(outputJpg).metadata();

console.log(`✓ Generated:`);
console.log(`  WebP: ${outputPath} — ${wInfo.width}x${wInfo.height}`);
console.log(`  JPG:  ${outputJpg} — ${jInfo.width}x${jInfo.height}`);
