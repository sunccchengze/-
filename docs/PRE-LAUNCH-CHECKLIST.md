# 上线前检查清单（给你填）

## 必须你提供
- [ ] `config.ts` → 真实 `QQ_招新群号`（现在占位会显示友好提示）
- [ ] `config.ts` → 确认 `LINK_报名` 表单仍有效
- [ ] 按 `IMAGE-SLOTS.md` 替换真图（尤其 IMG-02~06 轮播、IMG-16~19 暑期）
- [ ] 萤火/病童相关图：无未授权正脸
- [ ] 招新宣讲/面试日期（可写进 hero.seasonNote 或新模块）
- [ ] 上线域名（改 JSON-LD url、og:url）

## 建议你点一点
- [ ] 手机 375 宽：粘性报名条不挡二维码
- [ ] 桌面：导航不换行、荣誉展开按钮可读
- [ ] 外链：部门推送、三平台账号能打开
- [ ] 读一遍 About / 暑期 / FAQ：有无过时数字

## 构建
```bash
npm run typecheck
npm run build && npm run preview
```
