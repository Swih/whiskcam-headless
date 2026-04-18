"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "../../i18n/navigation";

interface LanguageSwitcherProps {
  variant?: "dark" | "light";
}

export function LanguageSwitcher({ variant = "dark" }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale as "en" | "fr" | "de" | "es" });
  };

  const baseClass = "text-[11px] font-semibold transition-colors";
  const activeClass = variant === "dark" ? "text-white" : "text-wk-black";
  const inactiveClass =
    variant === "dark"
      ? "text-white/40 hover:text-white/70"
      : "text-wk-grey-400 hover:text-wk-grey-600";
  const dividerClass = variant === "dark" ? "text-white/20" : "text-wk-grey-300";

  const locales = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "de", label: "DE" },
    { code: "es", label: "ES" },
  ];

  return (
    <div className="flex items-center gap-1" aria-label="Language switcher">
      {locales.map((l, i) => (
        <span key={l.code} className="flex items-center gap-1">
          {i > 0 && (
            <span className={`${dividerClass} text-[10px]`} aria-hidden="true">|</span>
          )}
          <button
            onClick={() => switchLocale(l.code)}
            className={`${baseClass} ${locale === l.code ? activeClass : inactiveClass}`}
            aria-current={locale === l.code ? "true" : undefined}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
