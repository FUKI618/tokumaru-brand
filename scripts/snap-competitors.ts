// 海外ブランド買取サイトのヒーロー画像を採取
import { chromium } from "playwright";

const sites = [
  { name: "saconde", url: "https://saconde.com/" },
  { name: "janefinds", url: "https://janefinds.com/pages/consign" },
  { name: "luxxedition", url: "https://www.luxxedition.com/pages/sell-consign" },
  { name: "mygemma", url: "https://www.mygemma.com/" },
  { name: "loveluxury", url: "http://loveluxury.com/" },
  { name: "baghunter", url: "https://baghunter.com/pages/sell-your-bag" },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

for (const site of sites) {
  try {
    console.log(`\n→ ${site.name}: ${site.url}`);
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: `screenshots/competitors/${site.name}.png`,
      fullPage: false,
    });
    console.log(`  ✓ saved`);
  } catch (err) {
    console.log(`  ✗ ${(err as Error).message.substring(0, 100)}`);
  }
}

await ctx.close();
await browser.close();
