import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const url = process.env.SNAP_URL ?? "http://localhost:4323/tokumaru-brand/";
const outDir = "screenshots";

await mkdir(outDir, { recursive: true });

async function setup(page: import("playwright").Page) {
  await page.goto(url, { waitUntil: "networkidle" });
  // reveal アニメーションの最終状態を強制適用
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  });
  // フォント・フォーカス安定
  await page.waitForTimeout(800);
  // 一度最後までスクロールして lazy 要素を確実に発火→戻す
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      const scroll = (y: number) => {
        window.scrollTo(0, y);
      };
      let y = 0;
      const step = window.innerHeight / 2;
      const max = document.body.scrollHeight;
      const t = setInterval(() => {
        y += step;
        scroll(y);
        if (y >= max) {
          clearInterval(t);
          scroll(0);
          resolve();
        }
      }, 30);
    });
  });
  await page.waitForTimeout(500);
}

const browser = await chromium.launch();

// PC
const pcCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const pcPage = await pcCtx.newPage();
await setup(pcPage);
await pcPage.screenshot({ path: `${outDir}/pc-full.png`, fullPage: true });
await pcPage.screenshot({ path: `${outDir}/pc-firstview.png`, fullPage: false });
await pcCtx.close();
console.log(`✓ PC: ${outDir}/pc-full.png + pc-firstview.png`);

// Mobile
const mbCtx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const mbPage = await mbCtx.newPage();
await setup(mbPage);
await mbPage.screenshot({ path: `${outDir}/mobile-full.png`, fullPage: true });
await mbPage.screenshot({ path: `${outDir}/mobile-firstview.png`, fullPage: false });
await mbCtx.close();
console.log(`✓ Mobile: ${outDir}/mobile-full.png + mobile-firstview.png`);

await browser.close();
console.log("✓ Done");
