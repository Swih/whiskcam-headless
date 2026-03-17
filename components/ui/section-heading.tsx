import clsx from "clsx";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  overline?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  overline,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx(centered && "text-center", "mb-12 md:mb-16", className)}>
      {overline && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-wk-amber">
          {overline}
        </p>
      )}
      <h2
        className={clsx(
          "text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight leading-[1.15]",
          light ? "text-white" : "text-wk-black"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "mx-auto mt-4 max-w-2xl text-base leading-relaxed",
            light ? "text-wk-grey-400" : "text-wk-grey-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
