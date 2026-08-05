/**
 * Cloudflare Pages rejects any single static asset over 25 MiB.
 *
 * Before: all summer videos were >25MB, so we deleted the whole folder.
 * Now:  compressed videos are ≤5MB and should stay in the Pages build.
 *       Only delete individual files that exceed 25 MiB.
 *
 * The original uncompressed files still live in public/videos/summer/ for
 * local dev (Vite dev server serves them); this script only affects dist/.
 */
import fs from "node:fs";
import path from "node:path";

const MAX_BYTES = 25 * 1024 * 1024; // 25 MiB
const target = path.join(process.cwd(), "dist", "videos", "summer");

if (fs.existsSync(target)) {
  const files = fs.readdirSync(target);
  let removed = 0;

  for (const file of files) {
    const filePath = path.join(target, file);
    const stat = fs.statSync(filePath);
    if (stat.size > MAX_BYTES) {
      fs.unlinkSync(filePath);
      console.log(`✂ Removed oversized file from Pages build: ${file} (${(stat.size / 1024 / 1024).toFixed(1)} MiB)`);
      removed++;
    }
  }

  if (removed === 0) {
    console.log("✅ All summer videos fit within Cloudflare Pages 25MiB limit — none removed.");
  }
} else {
  console.log("No local summer videos found in Pages build output.");
}
