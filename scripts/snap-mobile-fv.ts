// Mobile firstview only - fresh page load
import { chromium } from "playwright";
const url = process.env.SNAP_URL ?? "http://127.0.0.1:4327/tokumaru-brand/";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() =>
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"))
);
// Wait for hero image to actually load
await page.waitForFunction(
  () => {
    const imgs = Array.from(document.querySelectorAll("section#hero img")) as HTMLImageElement[];
    return imgs.length > 0 && imgs.every((img) => img.complete && img.naturalWidth > 0);
  },
  { timeout: 10000 }
);
await page.waitForTimeout(800);
await page.screenshot({ path: "screenshots/mobile/_firstview.png" });
console.log("✓ firstview");
await ctx.close();
await browser.close();
