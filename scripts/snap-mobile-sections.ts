// モバイル別セクションスクショ。Aesop品質監査用。
// 使い方: SNAP_URL=http://127.0.0.1:4327/tokumaru-brand/ bun run scripts/snap-mobile-sections.ts
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const url = process.env.SNAP_URL ?? "http://127.0.0.1:4327/tokumaru-brand/";
const outDir = "screenshots/mobile";
const sections = [
  "hero",
  "story",
  "rates",
  "methods",
  "campaigns",
  "staff",
  "voices",
  "faq",
  "info",
  "contact",
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() =>
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"))
);

// lazy 一括発火
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
    }, 30);
  });
});
await page.waitForTimeout(1500);

for (const id of sections) {
  await page.evaluate((sid) => {
    const el = document.getElementById(sid);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo(0, top);
    }
  }, id);
  await page.waitForTimeout(400);
  const exists = await page.locator(`#${id}`).count();
  if (exists === 0) {
    console.log(`- skip #${id} (not found)`);
    continue;
  }
  await page.locator(`#${id}`).screenshot({ path: `${outDir}/${id}.png` });
  console.log(`✓ ${outDir}/${id}.png`);
}

// First view (header含む)
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.screenshot({ path: `${outDir}/_firstview.png` });
console.log(`✓ ${outDir}/_firstview.png`);

await ctx.close();
await browser.close();
