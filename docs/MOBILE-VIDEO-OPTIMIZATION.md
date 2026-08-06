# 🎬 移动端视频优化方案 —— 微信扫码兼容

> ## ⚠️ 2026-08-06 重要更新（先看这里）
>
> **七牛云方案已弃用**：免费测试域名（`*.bkt.clouddn.com`）已失效，且国内云 CDN
> 绑定自定义域名都需要 ICP 备案，对 `pages.dev` 站点不可行。
>
> **转码已完成并替换到 `public/videos/summer/`**（本方案下方的压缩步骤不再需要手动做）：
>
> | 视频 | 原文件 | 现文件（网页版） | 说明 |
> |---|---|---|---|
> | 知行秦川 | 91MB 1080p H.264 | **24.7MB 540p H.264** | 5分11秒，≤25MiB，Pages 可托管 |
> | 玉树 | 47.7MB 720p **10-bit HEVC** | **10.4MB 720p H.264** | 顺带修复 HEVC 兼容性问题 |
>
> **新回退链**：B站嵌入（可选，填 BV 号即启用）→ Cloudflare Pages 压缩版 →
> GitHub Release → gh-proxy 镜像（可选）。配置见 `src/config.ts` 的
> `VIDEO_SOURCES_知行秦川 / VIDEO_SOURCES_玉树`。
>
> **B站播放源已接入（2026-08-06，用户提供 BV 号）**：
> - 知行秦川 `BV1R2MX6cE6A` · 玉树 `BV1pqgv6cEPS`（社团官方账号，已双重验证可播放）
> - 已填入 `src/config.ts` 的 `VIDEO_SOURCES_*`，国内用户点击播放即走 B站 iframe，
>   全画质、不耗站点流量；mp4 链（Pages → GitHub → 镜像）自动成为回退。
> - 卡片下方提供「B站播放不了？用直链播放」逃生入口，应对个别网络拦截 iframe 的情况。
>
> **你只剩一件可选的事**：把压缩后的两个 mp4 重新上传到 GitHub Release `media-2026-v1`，
> 覆盖原片，让 GitHub 兜底层也变快（不传也不影响，B站是主源）。

---

## ✅ 代码改动已完成（上一轮）

见 git diff，核心改动：
- Honors 移动端 Ken Burns 动画降级 + 点击播放
- SummerFilms 点击才加载视频 + 三级回退源
- 环境检测 + CDN 优先级选择
- 构建脚本只删 >25MB 文件（保留压缩版）

---

## 🔧 你需要完成的三件事

### 一、压缩视频（最关键！）

当前文件：知行秦川 87MB / 玉树 46MB → 目标：每个 ≤ 5MB

#### 推荐工具（免费，指定大小压缩）

| 工具 | 平台 | 特点 | 指定大小方法 |
|------|------|------|-------------|
| **小丸工具箱** ⭐ | Windows | B站UP主标配，极高质量 | 2Pass + 手算码率 |
| **ShanaEncoder** | Windows | GPU加速，超快，B站指定工具 | 设定目标码率 |
| **HandBrake** | Win/Mac/Linux | 开源，最知名 | Average Bitrate |
| **剪映 (CapCut)** | Win/Mac/手机 | 字节跳动出品，零门槛 | 导出时选手动码率 |

#### 🏆 首推：小丸工具箱

下载：https://maruko.moe/  或  https://m.onlinedown.net/soft/566891.htm

**操作步骤（目标 5MB 以内）：**

1. 打开小丸工具箱 → 视频标签页
2. 把原视频拖入「视频」框
3. **先算码率**（公式）：
   ```
   码率(kbps) = 目标大小(MB) × 8192 ÷ 视频时长(秒) - 音频码率(kbps)
   ```
   例如：视频 3 分 20 秒 = 200 秒，目标 4.5MB，音频 96kbps：
   ```
   码率 = 4.5 × 8192 ÷ 200 - 96 = 184 - 96 = 88 kbps
   ```
4. 编码器选 **x264_64-8bit**
5. 模式选 **2Pass**（精确控制大小）
6. 填入算出的码率
7. 分辨率改 **854×480**（手机够用，体积小 80%+）
8. 音频模式选 **编码** → 码率 **96kbps**
9. 点「压制」，等几分钟

> 💡 如果算出来码率太低（<80kbps），说明视频太长，可以：
> - 改成 640×360 分辨率
> - 或者接受稍大文件（7-8MB 也能接受，5MB 是理想值）

#### 🥈 次推：ShanaEncoder（速度最快）

下载：https://shanaencoder.com/

1. 拖入视频 → 右键「快速设置」
2. 分辨率：854×480
3. 视频编码：H.264
4. **码率模式：CBR** → 填入算出的码率
5. 音频码率：96kbps
6. 勾选 **movflags +faststart**（关键！边下边播）
7. 开始编码

#### 🥉 备选：HandBrake（跨平台）

下载：https://handbrake.fr/

1. 拖入视频 → Video 标签
2. 编码：H.264 (x264)
3. **质量：Average Bitrate** → 填入算出的码率
4. 分辨率：854×480
5. 勾选 **Web Optimized**（= faststart）
6. Audio → 码率 96kbps
7. 开始编码

#### ⚠️ 最重要的一件事

不管用什么工具，**必须开启 faststart（Web Optimized）**！
这会把视频元数据前置，让浏览器可以边下载边播放，否则必须等整个视频下载完才能开始播放。

#### 压缩完成后

把压缩后的文件重命名放到：
```
public/videos/summer/2026-qinchuan-recap.mp4    （替换原来 87MB 的）
public/videos/summer/2026-yushu-recap.mp4        （替换原来 46MB 的）
```

原来的大文件可以删掉或移到别处备份。

---

### 二、免费国内 CDN —— 七牛云

**零花钱方案**：七牛云永久免费额度足够用。

#### 七牛云免费额度

| 项目 | 免费额度 | 说明 |
|------|---------|------|
| 标准存储 | 10 GB/月 | 你的视频总共不到 10MB，绰绰有余 |
| CDN 国内流量 | 10 GB/月 | 1000 次播放 × 5MB = 5GB，够用 |
| CDN 海外流量 | 10 GB/月 | |
| GET 请求 | 100 万次/月 | |
| PUT 请求 | 10 万次/月 | 上传够用 |
| 上传流量 | 无限 | |

**你的用量估算**：2 个视频 × 5MB = 10MB 存储，每月 200 次播放 × 5MB ≈ 1GB 流量 → **远低于免费额度，完全不花钱**。

#### 配置步骤

1. **注册** → https://www.qiniu.com/ → 手机号注册
2. **实名认证** → 个人认证即可（姓名+身份证，5分钟）
3. **开通对象存储** → 产品 → 对象存储 Kodo → 立即开通
4. **新建存储空间**：
   - 空间名称：`yzaxs-video`
   - 存储区域：**华东-上海**（覆盖全国最优）
   - 访问控制：**公开空间**
5. **上传视频**：
   - 进入空间 → 上传 → 把压缩后的两个 mp4 传到 `summer/` 目录
   ```
   summer/2026-qinchuan-recap.mp4
   summer/2026-yushu-recap.mp4
   ```
6. **获取 CDN 域名**：
   - 空间设置 → CDN 加速 → 会自动分配一个测试域名
   - 类似 `yzaxs-video.qiniudns.com` 或 `xxx.qiniudns.com`
   - ⚠️ 测试域名有效期 6 个月，之后需要绑定自定义域名
   - 对于你的用量，6 个月测试域名完全够用
7. **配置代码** → 修改 `src/config.ts` 中的 `CDN_VIDEO_BASE`：
   ```ts
   const CDN_VIDEO_BASE = "https://yzaxs-video.qiniudns.com";
   // 填入七牛分配给你的实际域名
   ```

#### 关于 HTTPS

- 七牛测试域名自带 HTTPS ✅
- 你的站点 `yzaxs-1.pages.dev` 是 HTTPS，七牛域名也是 HTTPS → 不会有混合内容问题 ✅
- 测试域名过期后，如果需要自定义域名 + HTTPS，可以申请 Let's Encrypt 免费证书

#### 不想配七牛？也行！

压缩后的视频 ≤5MB，直接放 Cloudflare Pages 就能用（`yzaxs-1.pages.dev`）。
七牛只是让国内访问更快，不是必须的。

---

### 三、域名已配置

`yzaxs-1.pages.dev` 已在 `src/config.ts` 的 `SITE_URL` 中设置。
压缩视频放 `public/videos/summer/` 后，会自动通过以下地址访问：

```
https://yzaxs-1.pages.dev/videos/summer/2026-qinchuan-recap.mp4
https://yzaxs-1.pages.dev/videos/summer/2026-yushu-recap.mp4
```

组件中的三级回退逻辑：
```
① 七牛云 CDN → 国内最快（配置 CDN_VIDEO_BASE 后生效）
② yzaxs-1.pages.dev → Cloudflare Pages（默认路径，无需配置）
③ GitHub Release → 海外兜底
```

---

## 📋 完整操作清单

- [ ] 1. 用小丸/ShanaEncoder 把两个视频压缩到 ≤5MB（开启 faststart！）
- [ ] 2. 替换 `public/videos/summer/` 中的大文件
- [ ] 3. git push → Cloudflare Pages 自动部署
- [ ] 4. （可选）注册七牛云 → 上传视频 → 配置 CDN_VIDEO_BASE
- [ ] 5. 微信扫码验证：荣誉区 Ken Burns 动画 ✓ / 暑期视频点击播放 ✓
