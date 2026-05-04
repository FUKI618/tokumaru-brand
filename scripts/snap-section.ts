// 特定セクションだけPlaywrightでスクショ取得（ヘッダー分オフセット + アニメ完了待機）
import { chromium } from "playwright";

const url = process.env.SNAP_URL ?? "http://localhost:4321/tokumaru-brand/";
const sectionId = process.argv[2] ?? "flagship";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible")));

// 一度ページ全体をスクロールして lazy 要素・カウンター発火
await page.evaluate(async () => {
  await new Promise<void>((resolve) => {
    let y = 0;
    const step = window.innerHeight / 2;
    const max = document.body.scrollHeight;
    const t = setInterval(() => {
      y += step;
      window.scrollTo(0, y);
      if (y >= max) {
        clearInterval(t);
        resolve();
      }
    }, 50);
  });
});

await page.waitForTimeout(2000); // カウンター完了待機
await page.evaluate((id) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80; // ヘッダー分オフセット
    window.scrollTo(0, top);
  }
}, sectionId);
await page.waitForTimeout(800);

const section = await page.locator(`#${sectionId}`);
await section.screenshot({ path: `screenshots/section-${sectionId}.png` });
console.log(`✓ screenshots/section-${sectionId}.png`);
await ctx.close();
await browser.close();
