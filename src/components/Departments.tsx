import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { IMG_第6页背景 } from "../config";
import { departmentFinder, departmentsIntro, functionalDepartments, projectDepartments, skillRoutes, type Department } from "../content";
import { SectionHeader } from "./SectionHeader";

function DepartmentCard({
  department,
  index,
  suggested,
  onSelect,
}: {
  department: Department;
  index: number;
  suggested: boolean;
  onSelect: (department: Department) => void;
}) {
  const Icon = department.icon;
  return (
    <motion.article
      className={`card-hover card-outline-gradient gpu-accelerated relative flex h-full flex-col overflow-hidden rounded-[24px] ${
        suggested ? "dept-recommended z-10" : ""
      }`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.65 }}
    >
      <div className="image-shell group/img relative h-[200px] shrink-0 md:h-56">
        <motion.img
          layoutId={`dept-image-${department.name}`}
          src={department.image}
          alt={`${department.name}活动照片`}
          loading="lazy"
          className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover/img:scale-105"
          onClick={() => onSelect(department)}
        />
        <button
          type="button"
          onClick={() => onSelect(department)}
          className="absolute right-4 bottom-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1 text-[11px] font-bold text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/img:opacity-100"
        >
          <span>点击展开剧场大图</span>
        </button>
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
        <p className="mt-2 text-xs leading-5 text-muted/80 italic">
          零经验新手干事安心承诺：本部门全面提供零起步岗前一帮一带指引与标准素材库支持；招新面试绝不仅仅考核已有专业特长，我们更为看重的，是你愿不愿意怀抱一颗真诚的心，和我们共同成长。
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
  const [activeTab, setActiveTab] = useState<"functional" | "project">("functional");
  const [suggestedRoute, setSuggestedRoute] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const departments = activeTab === "functional" ? functionalDepartments : projectDepartments;
  const suggestedNames = departmentFinder.find((item) => item.title === suggestedRoute)?.departments ?? [];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeTab === "functional") {
        setActiveTab("project");
        setSuggestedRoute(null);
      } else if (diff < 0 && activeTab === "project") {
        setActiveTab("functional");
        setSuggestedRoute(null);
      }
    }
    setTouchStartX(null);
  };

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

        <div className="mx-auto mt-7 max-w-5xl">
          <p className="text-center font-serif-cn text-base font-bold text-ink">也可以按你想练的本事看</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {skillRoutes.map((item) => (
              <div key={item.title} className="rounded-2xl border border-rouge/10 bg-white/70 px-5 py-4 text-left backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-rouge/35 hover:bg-white/90">
                <p className="font-serif-cn text-base font-bold text-rouge-deep">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
                <p className="mt-2 text-xs font-medium tracking-wide text-rouge">{item.routes}</p>
              </div>
            ))}
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
            className="touch-swipe-container gpu-accelerated mt-14 grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {(activeTab === "project" ? departments.slice(0, -2) : departments).map((department, index) => (
              <DepartmentCard
                key={department.name}
                department={department}
                index={index}
                suggested={activeTab === "project" && suggestedNames.includes(department.name)}
                onSelect={(dept) => setSelectedDepartment(dept)}
              />
            ))}
            {activeTab === "project" ? (
              <div className="md:col-span-2 lg:col-span-3 grid gap-7 md:grid-cols-2 lg:gap-8">
                {departments.slice(-2).map((department, index) => (
                  <DepartmentCard
                    key={department.name}
                    department={department}
                    index={index + departments.length - 2}
                    suggested={suggestedNames.includes(department.name)}
                    onSelect={(dept) => setSelectedDepartment(dept)}
                  />
                ))}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
          {/* 助学线 / 敬老线说明。 */}
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
        <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-rouge/20 bg-white/80 px-5 py-4 text-left shadow-sm">
          <p className="font-serif-cn text-sm font-bold text-rouge-deep">四大书院跨域青年共同体 · 零卷度友谊</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            这不是一场充满考核淘汰的竞争，这是一趟在四万人的交大校园里寻找真诚同行的旅程。无论你所读哪个专业班级、身处哪个书院楼栋（仲英、崇实、彭康、南洋等），我们的 11 个部门都是你在校园里最具温度的跨书院友爱第三空间，期待你来到这里，收获没有绩点攀比、彼此包容扶持的跨院挚友。
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-gold-soft/30 bg-gold-soft/[0.08] px-5 py-4 text-left">
          <p className="font-serif-cn text-sm font-bold text-gold">旁听制度 · 多一种体验</p>
          <p className="mt-2 text-sm leading-7 text-muted">{departmentsIntro.observerNote}</p>
        </div>
        <p className="mt-6 text-center font-serif-cn text-base text-muted md:text-lg">{departmentsIntro.footer}</p>
      </div>

      {/* 剧场式大图展台（丝滑弹窗，保留卡片底图零白底漏出） */}
      <AnimatePresence>
        {selectedDepartment ? (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedDepartment(null)}
            />
            <motion.div
              className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[#241615] shadow-2xl ring-1 ring-white/20"
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 15 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.7}
              onDragEnd={(_e, info) => {
                if (info.offset.y > 100) {
                  setSelectedDepartment(null);
                }
              }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={selectedDepartment.image}
                  alt={selectedDepartment.name}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedDepartment(null)}
                  className="focus-ring absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-md transition hover:bg-white hover:text-rouge-deep"
                  aria-label="关闭剧场大图"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col justify-between gap-4 border-t border-white/10 bg-[#2a1c18]/90 px-6 py-5 text-white sm:flex-row sm:items-center sm:px-8">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif-cn text-2xl font-bold">{selectedDepartment.name}</h3>
                    {selectedDepartment.brandNote ? (
                      <span className="rounded-full bg-rouge-deep px-3 py-0.5 text-xs font-bold text-white">
                        {selectedDepartment.brandNote}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 font-serif-cn text-sm italic text-rose-soft">{selectedDepartment.positioning}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDepartment(null)}
                  className="focus-ring inline-flex shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/15 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-white hover:text-rouge-deep"
                >
                  收回卡片
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
