import { cn } from "../utils/cn";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  invert?: boolean;
};

export function SectionHeader({ eyebrow, title, subtitle, invert = false }: Props) {
  return (
    <div className="text-center">
      <p className={cn("eyebrow", invert && "!text-rouge-mist")}>{eyebrow}</p>
      <h2
        className={cn(
          "mt-4 font-serif-cn text-3xl font-bold tracking-[0.06em] md:text-5xl",
          invert ? "text-white text-shadow-soft" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mx-auto mt-5 max-w-2xl text-base leading-7 md:text-lg",
            invert ? "text-white/75" : "text-muted",
          )}
        >
          {subtitle}
        </p>
      ) : null}
      <div className="gradient-divider" />
    </div>
  );
}
