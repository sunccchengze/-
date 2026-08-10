import urllib.request
import ssl
import re
import os

ctx = ssl.create_default_context()
ctx.set_ciphers("DEFAULT@SECLEVEL=1")

url = "https://mp.weixin.qq.com/s/Z_Wblg4hSWTurtcqPWBElw"
headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}

req = urllib.request.Request(url, headers=headers)
html = urllib.request.urlopen(req, context=ctx).read().decode("utf-8")
print(f"HTML downloaded, length: {len(html)}")

urls = re.findall(r'data-src=["\']?([^"\'\s>]+)', html)
print(f"Found {len(urls)} data-src URLs")

os.makedirs("public/images/暑期实践/银发融城", exist_ok=True)

valid_count = 0
for idx, img_url in enumerate(urls, 1):
    print(f"Downloading [{idx}]: {img_url[:80]}...")
    try:
        ireq = urllib.request.Request(img_url, headers=headers)
        data = urllib.request.urlopen(ireq, context=ctx).read()
        if len(data) > 10000: # Filter out tiny icons/banners
            valid_count += 1
            fn = f"public/images/暑期实践/银发融城/银发融城{valid_count}.jpg"
            with open(fn, "wb") as f:
                f.write(data)
            print(f"  -> Saved {fn} ({len(data)} bytes)")
    except Exception as e:
        print(f"  -> Error: {e}")

print(f"Finished. Saved {valid_count} real article images.")
