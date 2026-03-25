import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-wk-amber text-wk-black hover:bg-wk-amber-hover hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] active:scale-[0.98] shadow-sm transition-all duration-200",
  secondary:
    "bg-wk-black text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(245,166,35,0.3)] active:scale-[0.98] shadow-sm hover:shadow-md",
  ghost:
    "bg-transparent border border-wk-grey-300 text-wk-black hover:border-wk-black hover:bg-wk-grey-50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-[15px]",
  lg: "px-9 py-4 text-base min-w-[240px]",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "inline-flex items-center justify-center font-semibold tracking-wide",
        "rounded-[var(--radius-btn)]",
        "transition-all duration-200 ease-out",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
