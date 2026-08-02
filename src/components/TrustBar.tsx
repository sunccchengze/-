import { Award, Clock, School } from "lucide-react";
import { trustBar } from "../content";

const icons = [Award, Clock, School];

export function TrustBar() {
  return (
    <section className="relative z-10 -mt-10 mb-2 px-4 md:-mt-14" aria-label="社团信任要点">
      <div className="section-container">
        <div className="glass-panel grid gap-1 overflow-hidden rounded-2xl p-2 shadow-xl shadow-rouge/10 sm:grid-cols-3 sm:gap-0 sm:p-0">
          {trustBar.map((item, i) => {
            const Icon = icons[i] ?? Award;
            return (
              <div
                key={item.label}
                className={`flex items-start gap-3 rounded-xl px-5 py-4 sm:rounded-none sm:px-6 sm:py-5 ${
                  i < trustBar.length - 1 ? "sm:border-r sm:border-rouge/10" : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warm-gradient text-white shadow-md shadow-rouge/20">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-serif-cn text-base font-bold text-ink">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
