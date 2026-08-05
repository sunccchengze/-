/**
 * Cloudflare Pages rejects any single static asset over 25 MiB.
 * The public summer videos are hosted as GitHub Release assets; remove their
 * local development copies from the production dist folder after Vite copies
 * public/ into dist/. Vite dev server still serves public/videos locally.
 */
import fs from "node:fs";
import path from "node:path";

const target = path.join(process.cwd(), "dist", "videos", "summer");
if (fs.existsSync(target)) {
  fs.rmSync(target, { recursive: true, force: true });
  console.log("Removed local summer video copies from Pages build output.");
} else {
  console.log("No local summer videos found in Pages build output.");
}
