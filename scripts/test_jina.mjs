import https from 'https';
import fs from 'fs';
import path from 'path';

// Let's test fetching via Jina Reader proxy: https://r.jina.ai/<target_url>
function fetchViaJina(url) {
  return new Promise((resolve, reject) => {
    const jinaUrl = 'https://r.jina.ai/' + url;
    https.get(jinaUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Testing Jina proxy...');
  try {
    const data = await fetchViaJina('https://mp.weixin.qq.com/s/Z_Wblg4hSWTurtcqPWBElw');
    console.log('Jina response size:', data.length);
    console.log('First 500 chars:', data.toString('utf-8').slice(0, 500));
  } catch (err) {
    console.error('Jina failed:', err);
  }
}

main();
