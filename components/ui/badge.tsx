import clsx from "clsx";

type BadgeVariant = "amber" | "dark" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  amber: "bg-wk-amber/10 text-wk-amber border-wk-amber/20",
  dark: "bg-wk-black text-white border-wk-black",
  outline: "bg-transparent text-wk-black border-wk-grey-300",
};

export function Badge({ children, variant = "amber", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-[var(--radius-pill)] border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
