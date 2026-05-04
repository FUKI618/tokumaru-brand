import { chromium } from "playwright";
import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const templatePath = resolve("scripts/og-template.html");
const outputPath = resolve("public/og-image.webp");
const outputPng = resolve("public/og-image.png");

await mkdir(resolve("public"), { recursive: true });

const html = await readFile(templatePath, "utf-8");
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
// フォント描画安定
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);
const pngBuffer = await page.screenshot({
  type: "png",
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});
await ctx.close();
await browser.close();

// 1200x630 にリサイズして保存（OGP推奨サイズ）
await sharp(pngBuffer).resize(1200, 630).png({ compressionLevel: 9 }).toFile(outputPng);
await sharp(pngBuffer).resize(1200, 630).webp({ quality: 88 }).toFile(outputPath);
const sharpInfo = await sharp(outputPath).metadata();
const png = await sharp(outputPng).metadata();

console.log(`✓ OG image generated`);
console.log(`  WebP: ${outputPath} — ${sharpInfo.width}x${sharpInfo.height}`);
console.log(`  PNG:  ${outputPng} — ${png.width}x${png.height}`);
