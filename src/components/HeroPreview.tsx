/**
 * 首页预览页面 - 临时展示5个版本供选择
 */
import { useState } from "react";
import { Hero } from "./Hero";
import { HeroV1 } from "./HeroV1";
import { HeroV2 } from "./HeroV2";
import { HeroV2Pro } from "./HeroV2Pro";
import { HeroV3 } from "./HeroV3";
import { HeroV4 } from "./HeroV4";
import { HeroV5 } from "./HeroV5";

const versions = [
  { id: "original", name: "原版", desc: "轮播背景+悬浮蒙版" },
  { id: "v1", name: "V1 数字驱动", desc: "Charity:Water风·具体数据突出" },
  { id: "v2", name: "V2 原版", desc: "单图分栏·旧候选保留" },
  { id: "v2pro", name: "V2 Pro · 正式", desc: "轮播分栏·当前正式首页" },
  { id: "v3", name: "V3 分屏叙事", desc: "WaterAid风·左右布局" },
  { id: "v4", name: "V4 极简克制", desc: "Medium风·大量留白" },
  { id: "v5", name: "V5 分屏固定", desc: "Obama风·沉浸叙事" },
];

export function HeroPreview() {
  // V2 Pro 是当前正式候选：保留 V2 分栏并融合轮播、Logo 与完整招新信息。
  const [active, setActive] = useState("v2pro");

  const HeroComponent = {
    original: Hero,
    v1: HeroV1,
    v2: HeroV2,
    v2pro: HeroV2Pro,
    v3: HeroV3,
    v4: HeroV4,
    v5: HeroV5,
  }[active] || Hero;

  return (
    <div className="relative">
      {/* 版本选择器 - 固定左侧 */}
      <div className="fixed inset-x-3 bottom-3 z-50 flex max-h-[42vh] gap-2 overflow-x-auto rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur-sm md:inset-x-auto md:bottom-auto md:left-4 md:top-1/2 md:max-h-[80vh] md:w-56 md:-translate-y-1/2 md:flex-col md:overflow-y-auto">
        <p className="hidden shrink-0 px-2 font-serif-cn text-xs font-bold tracking-wider text-muted md:block">内部预览 · 选择首页</p>
        {versions.map((v) => (
          <button
            key={v.id}
            onClick={() => setActive(v.id)}
            className={`rounded-xl px-4 py-2.5 text-left transition-all ${
              active === v.id
                ? "bg-rouge text-white shadow-md"
                : "hover:bg-rouge/10"
            }`}
          >
            <p className={`font-serif-cn text-sm font-medium ${active === v.id ? "" : "text-ink"}`}>{v.name}</p>
            <p className={`text-xs ${active === v.id ? "text-white/70" : "text-muted"}`}>{v.desc}</p>
          </button>
        ))}
      </div>

      {/* 渲染选中的Hero */}
      <HeroComponent />
    </div>
  );
}
