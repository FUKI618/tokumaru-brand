import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("https://www.christies.com/en", { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(4000);
await page.screenshot({ path: ".lazyweb/refs/christies-live.png", fullPage: false });
await ctx.close();
await browser.close();
