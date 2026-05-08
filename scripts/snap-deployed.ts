// 本番URLをモバイル端末エミュレーションで開いて、初期スクロール位置と表示を確認
import { chromium } from "playwright";

const url = "https://fuki618.github.io/tokumaru-brand/";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});
const page = await ctx.newPage();

// Phase 1: Initial load
await page.goto(url, { waitUntil: "domcontentloaded" });
const initialScrollY = await page.evaluate(() => window.scrollY);
const initialURL = await page.evaluate(() => window.location.href);
console.log(`[after DOMContentLoaded] scrollY=${initialScrollY}, URL=${initialURL}`);

// Phase 2: After all loaded
await page.waitForLoadState("networkidle");
const loadedScrollY = await page.evaluate(() => window.scrollY);
const loadedURL = await page.evaluate(() => window.location.href);
console.log(`[after networkidle] scrollY=${loadedScrollY}, URL=${loadedURL}`);

// Phase 3: Wait extra for any late JS
await page.waitForTimeout(2000);
const lateScrollY = await page.evaluate(() => window.scrollY);
const lateURL = await page.evaluate(() => window.location.href);
const visibleSectionId = await page.evaluate(() => {
  const sections = Array.from(document.querySelectorAll("section[id]"));
  for (const sec of sections) {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      return sec.id;
    }
  }
  return "?";
});
console.log(`[after 2s wait] scrollY=${lateScrollY}, URL=${lateURL}, visibleSection=${visibleSectionId}`);

// Take screenshot
await page.screenshot({ path: "screenshots/deployed-mobile-initial.png" });
console.log(`✓ Screenshot saved`);

// Detect any DOMContentLoaded → load shift
console.log(`\n--- Document height ---`);
const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
console.log(`scrollHeight=${docHeight}`);

await ctx.close();
await browser.close();
