// 特定セクションだけPlaywrightでスクショ取得
import { chromium } from "playwright";

const url = process.env.SNAP_URL ?? "http://localhost:4323/tokumaru-brand/";
const sectionId = process.argv[2] ?? "flagship";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible")));
await page.waitForTimeout(500);
await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.locator(`#${sectionId}`).screenshot({ path: `screenshots/section-${sectionId}.png` });
console.log(`✓ screenshots/section-${sectionId}.png`);
await ctx.close();
await browser.close();
