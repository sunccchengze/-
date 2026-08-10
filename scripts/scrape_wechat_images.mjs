import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const url = 'https://mp.weixin.qq.com/s/Z_Wblg4hSWTurtcqPWBElw';

function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    const client = targetUrl.startsWith('https') ? https : http;
    const req = client.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
  });
}

async function main() {
  console.log('Fetching WeChat article via Node.js https...');
  try {
    const htmlBuf = await fetchUrl(url);
    const html = htmlBuf.toString('utf-8');
    console.log('HTML retrieved, size:', html.length);

    const matches = [...html.matchAll(/data-src=["']?([^"'\s>]+)/g)].map(m => m[1]);
    console.log('Found data-src image URLs:', matches.length);

    const outDir = path.join(process.cwd(), 'public/images/暑期实践/银发融城');
    fs.mkdirSync(outDir, { recursive: true });

    let idx = 1;
    for (const imgUrl of matches) {
      if (!imgUrl.includes('qpic.cn') && !imgUrl.includes('wx_fmt=')) continue;
      try {
        console.log(`Downloading [${idx}]: ${imgUrl.slice(0, 70)}...`);
        const imgBuf = await fetchUrl(imgUrl);
        if (imgBuf.length > 10000) { // filter out tiny icons
          const filePath = path.join(outDir, `银发融城${idx}.jpg`);
          fs.writeFileSync(filePath, imgBuf);
          console.log(`  -> Saved ${filePath} (${imgBuf.length} bytes)`);
          idx++;
        }
      } catch (err) {
        console.error(`  -> Failed: ${err.message}`);
      }
    }
    console.log(`Done! Saved ${idx - 1} images.`);
  } catch (err) {
    console.error('Fetch failed:', err);
  }
}

main();
