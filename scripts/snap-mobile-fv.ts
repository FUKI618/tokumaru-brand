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
await page.waitForTimeout(1500);
await page.screenshot({ path: "screenshots/mobile/_firstview.png" });
console.log("✓ firstview");
await ctx.close();
await browser.close();
