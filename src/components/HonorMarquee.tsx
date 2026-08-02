import { honors } from "../content";

/** 荣誉关键词横向漫游——打破「纯时间线」疲劳，增加节奏变化（Taste: variance） */
export function HonorMarquee() {
  const chips = honors.flatMap((h) => h.items).slice(0, 12);
  const loop = [...chips, ...chips];

  return (
    <div className="relative overflow-hidden border-y border-rouge/10 bg-gradient-to-r from-cream via-white to-cream py-3" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent" />
      <div className="honor-marquee flex w-max gap-3 pr-3">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex shrink-0 items-center rounded-full border border-rouge/15 bg-white/80 px-4 py-1.5 font-serif-cn text-xs font-medium text-rouge-deep shadow-sm backdrop-blur-sm"
          >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gold-soft" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
