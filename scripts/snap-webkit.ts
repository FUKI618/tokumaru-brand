// iOS Safari (WebKit) で本番URLを開いて、初期スクロール挙動を検証
import { webkit } from "playwright";

const url = "https://fuki618.github.io/tokumaru-brand/";

const browser = await webkit.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();

await page.goto(url, { waitUntil: "domcontentloaded" });
console.log(`[DOMContentLoaded] scrollY=${await page.evaluate(() => window.scrollY)}, hash=${await page.evaluate(() => window.location.hash)}`);

await page.waitForLoadState("networkidle");
console.log(`[networkidle] scrollY=${await page.evaluate(() => window.scrollY)}, hash=${await page.evaluate(() => window.location.hash)}`);

await page.waitForTimeout(3000);
const data = await page.evaluate(() => {
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const visible = sections.find((sec) => {
    const r = sec.getBoundingClientRect();
    return r.top <= window.innerHeight / 2 && r.bottom >= window.innerHeight / 2;
  });
  const focused = document.activeElement;
  return {
    scrollY: window.scrollY,
    hash: window.location.hash,
    visibleSectionId: visible?.id ?? "?",
    activeElement: focused?.tagName + (focused?.id ? `#${focused.id}` : "") + (focused?.getAttribute("name") ? `[name="${focused.getAttribute("name")}"]` : ""),
    docHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
  };
});
console.log(`[after 3s wait]`, JSON.stringify(data, null, 2));

await page.screenshot({ path: "screenshots/webkit-mobile-initial.png" });

await ctx.close();
await browser.close();
