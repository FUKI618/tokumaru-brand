#!/usr/bin/env bun
/**
 * Convert absolute base-path references (e.g. `="/brand/..."`) in dist/*.html
 * to depth-aware relative paths (`./` or `../`), so the built site keeps
 * working even when uploaded to a different folder/domain.
 *
 * Canonical / og:url / sitemap stays as full https:// — those are intentional
 * SEO signals and unaffected by this rewrite.
 *
 * Usage:
 *   PUBLIC_SITE_BASE=/brand bun run scripts/relativize-dist.ts
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const DIST = "dist";
const BASE = process.env.PUBLIC_SITE_BASE ?? "/brand";
const BASE_PREFIX = BASE.endsWith("/") ? BASE : BASE + "/";

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (e.endsWith(".html")) out.push(full);
  }
  return out;
}

const htmls = walk(DIST);
let totalReplacements = 0;

for (const file of htmls) {
  const html = readFileSync(file, "utf-8");
  const relDir = relative(DIST, dirname(file));
  const depth = relDir === "" ? 0 : relDir.split("/").length;
  const prefix = depth === 0 ? "./" : "../".repeat(depth);

  // Replace `="/brand/X"` → `="<prefix>X"` for href / src / content / action / formaction
  // We do a simple string replace — `="${BASE_PREFIX}` is unambiguous.
  const needle = `="${BASE_PREFIX}`;
  const replacement = `="${prefix}`;
  let count = 0;
  const next = html.split(needle).join(((): string => { count++; return replacement; })());
  // The above join trick miscounts; recompute:
  const rawCount = (html.match(new RegExp(`="${BASE_PREFIX.replace(/\//g, "\\/").replace(/\./g, "\\.")}`, "g")) || []).length;

  if (rawCount > 0) {
    writeFileSync(file, next);
    totalReplacements += rawCount;
    console.log(`  ${file}  depth=${depth}  ${rawCount} refs → ${prefix}`);
  }
}

console.log(`\nDone. ${totalReplacements} references rewritten across ${htmls.length} HTML files.`);
console.log(`Site is now portable: drop dist/ at any path and assets resolve relatively.`);
