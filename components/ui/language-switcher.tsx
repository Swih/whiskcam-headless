"use client";

import { useLocale } from "next-intl";

interface LanguageSwitcherProps {
  variant?: "dark" | "light";
}

export function LanguageSwitcher({ variant = "dark" }: LanguageSwitcherProps) {
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    document.cookie = `wk-locale=${newLocale}; max-age=${365 * 24 * 60 * 60}; path=/; samesite=lax`;
    window.location.reload();
  };

  const baseClass = "text-[11px] font-semibold transition-colors";
  const activeClass = variant === "dark" ? "text-white" : "text-wk-black";
  const inactiveClass =
    variant === "dark"
      ? "text-white/40 hover:text-white/70"
      : "text-wk-grey-400 hover:text-wk-grey-600";
  const dividerClass = variant === "dark" ? "text-white/20" : "text-wk-grey-300";

  return (
    <div className="flex items-center gap-1" aria-label="Language switcher">
      <button
        onClick={() => switchLocale("en")}
        className={`${baseClass} ${locale === "en" ? activeClass : inactiveClass}`}
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </button>
      <span className={`${dividerClass} text-[10px]`} aria-hidden="true">
        |
      </span>
      <button
        onClick={() => switchLocale("fr")}
        className={`${baseClass} ${locale === "fr" ? activeClass : inactiveClass}`}
        aria-current={locale === "fr" ? "true" : undefined}
      >
        FR
      </button>
    </div>
  );
}
