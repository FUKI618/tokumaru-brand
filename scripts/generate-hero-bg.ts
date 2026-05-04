// Gemini API で高級ジュエリー店を連想させる抽象背景を生成
// ヒーローの背景に使用する。テキスト・ロゴなし、実在ブランド品なし。

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

const prompt = `A dark, luxurious, atmospheric photograph of an upscale jewelry boutique interior at night.
Deep navy and dark velvet textures with subtle champagne gold accents, soft warm bokeh lights from chandeliers and display cabinets reflecting on glass surfaces.
Empty, minimal composition with negative space at the top-left for text overlay (no actual text in the image).
Cinematic, editorial, sophisticated, high-end magazine aesthetic, similar to a luxury Hermès or Cartier flagship store ambiance but generic and abstract.
No visible brand names, no visible logos, no visible text, no visible characters or letters, no real branded products, no people, no faces.
Mostly dark navy and ink-black with golden warm light accents, subtle red wine undertones, like an editorial luxury photography. Shot on Hasselblad with shallow depth of field, ISO 100, f/2.8.
Aspect ratio 16:9 cinematic.`;

const negative = "text, letters, words, characters, logos, brand names, watermark, signature, visible products, faces, people";

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
