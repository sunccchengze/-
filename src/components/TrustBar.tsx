import { Award, Clock, School } from "lucide-react";
import { trustBar } from "../content";

const icons = [Award, Clock, School];

/**
 * 放在 Hero 与 About 之间的独立奶油色条带，
 * 避免半透明卡片卡在「两张全屏背景交界」上。
 */
export function TrustBar() {
  return (
    <section
      className="relative z-10 border-y border-rouge/10 bg-cream px-4 py-10 md:py-12"
      aria-label="社团信任要点"
    >
      <div className="section-container">
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {trustBar.map((item, i) => {
            const Icon = icons[i] ?? Award;
            return (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl border border-rouge/10 bg-white px-5 py-5 shadow-sm shadow-rouge/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-warm-gradient text-white shadow-md shadow-rouge/20">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-serif-cn text-base font-bold leading-snug text-ink">{item.label}</p>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
