import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

test_img = "http://mmbiz.qpic.cn/mmbiz_jpg/Gx2bNxGW2sZx45sTtlRLub45DyONv3HFmrBicSr8HHDyn8lY3k2TwE1nmEwQreOTichMNlsl6eJIS4SBEmFOPYC3h2Dyz433IuNq5C1AiawhIA/640?wx_fmt=jpeg"

proxies = [
    "https://i0.wp.com/mmbiz.qpic.cn/mmbiz_jpg/Gx2bNxGW2sZx45sTtlRLub45DyONv3HFmrBicSr8HHDyn8lY3k2TwE1nmEwQreOTichMNlsl6eJIS4SBEmFOPYC3h2Dyz433IuNq5C1AiawhIA/640?wx_fmt=jpeg",
    "https://i1.wp.com/mmbiz.qpic.cn/mmbiz_jpg/Gx2bNxGW2sZx45sTtlRLub45DyONv3HFmrBicSr8HHDyn8lY3k2TwE1nmEwQreOTichMNlsl6eJIS4SBEmFOPYC3h2Dyz433IuNq5C1AiawhIA/640?wx_fmt=jpeg",
    "https://cdn.statically.io/img/mmbiz.qpic.cn/mmbiz_jpg/Gx2bNxGW2sZx45sTtlRLub45DyONv3HFmrBicSr8HHDyn8lY3k2TwE1nmEwQreOTichMNlsl6eJIS4SBEmFOPYC3h2Dyz433IuNq5C1AiawhIA/640?wx_fmt=jpeg",
    "https://corsproxy.io/?" + urllib.parse.quote(test_img),
    "https://api.codetabs.com/v1/proxy?quest=" + urllib.parse.quote(test_img),
]

for p in proxies:
    print(f"Testing {p[:50]}...")
    try:
        req = urllib.request.Request(p, headers={"User-Agent": "Mozilla/5.0"})
        data = urllib.request.urlopen(req, context=ctx, timeout=5).read()
        print(f"  -> SUCCESS! Received {len(data)} bytes")
    except Exception as e:
        print(f"  -> Failed: {e}")
