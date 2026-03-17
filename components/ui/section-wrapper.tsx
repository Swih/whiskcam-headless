import clsx from "clsx";

type SectionBg = "white" | "warm" | "dark";

interface SectionWrapperProps {
  children: React.ReactNode;
  bg?: SectionBg;
  className?: string;
  id?: string;
}

const backgrounds: Record<SectionBg, string> = {
  white: "bg-white text-wk-black",
  warm: "bg-wk-warm text-wk-black",
  dark: "bg-wk-black text-white",
};

export function SectionWrapper({
  children,
  bg = "white",
  className,
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={clsx(backgrounds[bg], "py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
