import fs from 'node:fs';
import path from 'node:path';

const repo = process.cwd();
const files = ['src/config.ts', 'src/content.ts', 'index.html'];
const paths = new Set();
for (const file of files) {
  const text = fs.readFileSync(path.join(repo, file), 'utf8');
  for (const match of text.matchAll(/["'](\/images\/[^"']+|\/videos\/[^"']+)["']/g)) paths.add(match[1]);
}

const intentional = new Set([
  '/videos/summer/2026-qinchuan-recap.mp4',
  '/videos/summer/2026-yushu-recap.mp4',
  ...Array.from({ length: 3 }, (_, i) => `/images/暑期实践/同季出发/同季${i + 1}.jpg`),
  ...Array.from({ length: 27 }, (_, i) => `/images/荣誉/荣誉${i + 1}.jpg`),
]);

const missing = [...paths].filter((asset) => !fs.existsSync(path.join(repo, 'public', asset)));
const unexpected = missing.filter((asset) => !intentional.has(asset));
const expected = missing.filter((asset) => intentional.has(asset));

console.log(`Checked ${paths.size} configured assets.`);
if (expected.length) {
  console.log('\nExpected future assets:');
  expected.forEach((asset) => console.log(`  - ${asset}`));
}
if (unexpected.length) {
  console.error('\nUnexpected missing assets:');
  unexpected.forEach((asset) => console.error(`  - ${asset}`));
  process.exitCode = 1;
}
if (!missing.length) console.log('All configured assets exist.');
