import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { IMG_第6页背景 } from "../config";
import { departmentFinder, departmentsIntro, functionalDepartments, projectDepartments, type Department } from "../content";
import { SectionHeader } from "./SectionHeader";

function DepartmentCard({
  department,
  index,
  suggested,
}: {
  department: Department;
  index: number;
  suggested: boolean;
}) {
  const Icon = department.icon;
  return (
    <motion.article
      className={`card-hover card-outline-gradient relative flex h-full flex-col overflow-hidden rounded-[24px] ${
        suggested ? "dept-recommended z-10" : ""
      }`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.65 }}
    >
      <div className="image-shell h-[200px] shrink-0 md:h-56">
        <img
          src={department.image}
          alt={`${department.name}活动照片`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute left-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 text-rouge backdrop-blur-md">
          <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
        </div>
        {department.brandNote ? (
          <div className="absolute bottom-4 left-4 z-10 rounded-full bg-black/45 px-3 py-1 text-[11px] text-white backdrop-blur-sm">
            {department.brandNote}
          </div>
        ) : null}
        {suggested ? (
          <div className="absolute right-4 top-4 z-10 rounded-full border border-white/40 bg-rouge-deep px-3 py-1.5 text-xs font-bold tracking-wide text-white shadow-lg shadow-rouge/30">
            为你推荐
          </div>
        ) : null}
      </div>

      <div className="flex flex-grow flex-col p-7 md:p-8">
        <h3 className="font-serif-cn text-[26px] font-bold leading-tight text-ink">{department.name}</h3>
        <p className="mt-2 font-serif-cn text-base italic text-rouge">{department.positioning}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {department.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
        <ul className="mt-5 flex-grow space-y-2.5 text-sm leading-7 text-muted">
          {department.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rouge" aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 rounded-xl bg-rouge/[0.06] px-3 py-2 text-sm font-medium leading-6 text-ink/85">
          <span className="text-rouge">适合</span>
          <span className="mx-1.5 text-rouge/40">·</span>
          {department.fit}
        </p>
        <a
          href={department.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-card mt-5 self-start text-sm"
        >
          了解部门故事
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

export function Departments() {
  const [activeTab, setActiveTab] = useState<"functional" | "project">("project");
  const [suggestedRoute, setSuggestedRoute] = useState<string | null>(null);
  const departments = activeTab === "functional" ? functionalDepartments : projectDepartments;
  const suggestedNames = departmentFinder.find((item) => item.title === suggestedRoute)?.departments ?? [];

  const chooseRoute = (title: string) => {
    setSuggestedRoute(title);
    setActiveTab("project");
    window.setTimeout(() => {
      document.getElementById("dept-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <section id="departments" className="bg-shell section-block">
      <img src={IMG_第6页背景} alt="" aria-hidden="true" className="bg-image" loading="lazy" decoding="async" />
      <div className="bg-veil veil-cream" />
      <div className="section-container">
        <SectionHeader
          eyebrow={departmentsIntro.eyebrow}
          title={departmentsIntro.title}
          subtitle={departmentsIntro.subtitle}
        />

        <div className="mx-auto mt-12 max-w-5xl">
          <p className="text-center font-serif-cn text-base font-bold text-ink">还不知道部门名？先按你想走近的人和场景选。</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {departmentFinder.map((item) => {
              const selected = suggestedRoute === item.title;
              return (
                <button
                  key={item.title}
                  type="button"
                  className={`focus-ring rounded-2xl border px-5 py-4 text-left backdrop-blur-sm transition ${
                    selected
                      ? "border-rouge bg-rouge/[0.09] shadow-md shadow-rouge/10"
                      : "border-rouge/10 bg-white/70 hover:border-rouge/35 hover:bg-white/90"
                  }`}
                  onClick={() => chooseRoute(item.title)}
                  aria-pressed={selected}
                >
                  <p className="font-serif-cn text-base font-bold text-rouge-deep">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
                  <p className="mt-2 text-xs font-medium tracking-wide text-rouge">{item.routes}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="glass-panel relative flex h-14 w-[280px] rounded-full bg-white/50 p-1.5 md:w-[320px]" role="tablist" aria-label="部门类型">
            <motion.div
              className="absolute inset-y-1.5 rounded-full bg-warm-gradient shadow-md"
              initial={false}
              animate={{
                left: activeTab === "functional" ? "6px" : "calc(50% + 2px)",
                width: "calc(50% - 8px)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            {(
              [
                { id: "functional" as const, label: "职能部门 · 3" },
                { id: "project" as const, label: "项目部门 · 8" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`dept-tab-${tab.id}`}
                aria-controls="dept-panel"
                aria-selected={activeTab === tab.id}
                className={`relative z-10 flex flex-1 items-center justify-center font-serif-cn text-base font-bold transition-colors duration-300 md:text-lg ${
                  activeTab === tab.id ? "text-white" : "text-muted hover:text-rouge"
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSuggestedRoute(null);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {suggestedRoute && activeTab === "project" ? (
          <p className="mt-8 text-center text-sm text-muted" aria-live="polite">
            已为你优先标出「{suggestedRoute}」相关方向；其余部门也仍可继续浏览。
          </p>
        ) : null}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id="dept-panel"
            role="tabpanel"
            className="mt-14 grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {departments.map((department, index) => (
              <DepartmentCard
                key={department.name}
                department={department}
                index={index}
                suggested={activeTab === "project" && suggestedNames.includes(department.name)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
          {/* 品牌线说明：为新生解释「大手拉小手」和「青春伴夕阳」。 */}
          {departmentsIntro.legend.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-rouge/10 bg-white/70 px-4 py-3 text-left backdrop-blur-sm"
            >
              <p className="font-serif-cn text-sm font-bold text-rouge">{item.name}</p>
              <p className="mt-1 text-xs leading-5 text-muted">{item.meaning}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center font-serif-cn text-base text-muted md:text-lg">{departmentsIntro.footer}</p>
      </div>
    </section>
  );
}
