"use client";

import CartModal from "components/cart/modal";
import { LanguageSwitcher } from "components/ui/language-switcher";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface NavbarProps {
  savingsPerUnit?: number;
  currencyCode?: string;
}

export function Navbar({ savingsPerUnit, currencyCode }: NavbarProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const NAV_LINKS = [
    { title: t("shop"), path: "#product" },
    { title: t("footage"), path: "#footage" },
    { title: t("faq"), path: "#faq" },
    { title: t("about"), path: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    if (path.startsWith("#")) {
      if (pathname !== "/") {
        // Navigate to homepage first, then scroll after load
        router.push("/");
        // Small delay to let the page load before scrolling
        setTimeout(() => {
          document.querySelector(path)?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      } else {
        // Already on homepage — scroll without changing URL hash
        document.querySelector(path)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "top-0 bg-white/90 shadow-sm backdrop-blur-xl"
            : "top-9 bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label={t("openMenu")}
          >
            <Bars3Icon
              className={`h-6 w-6 transition-colors ${
                scrolled ? "text-wk-black" : "text-white"
              }`}
            />
          </button>

          {/* Logo — wordmark on desktop, icon on mobile */}
          <Link href="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {/* Mobile: icon only */}
            <Image
              src="/images/logos/whiskcam-logo-icon.webp"
              alt="Whiskcam"
              width={28}
              height={28}
              className="block sm:hidden rounded"
            />
            {/* Desktop: wordmark */}
            <Image
              src="/images/logos/whiskcam-logo-wordmark.webp"
              alt="Whiskcam"
              width={140}
              height={32}
              className={`hidden sm:block transition-all ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) =>
              link.path.startsWith("#") ? (
                <li key={link.title}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className={`text-sm font-medium transition-colors ${
                      scrolled
                        ? "text-wk-grey-600 hover:text-wk-black"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.title}
                  </button>
                </li>
              ) : (
                <li key={link.title}>
                  <Link
                    href={link.path}
                    className={`text-sm font-medium transition-colors ${
                      scrolled
                        ? "text-wk-grey-600 hover:text-wk-black"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Right side: Language switcher + Cart */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher variant={scrolled ? "light" : "dark"} />
            </div>
            <div className={scrolled ? "text-wk-black" : "text-white"}>
              <CartModal savingsPerUnit={savingsPerUnit} currencyCode={currencyCode} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <Image
                src="/images/logos/whiskcam-logo-wordmark.webp"
                alt="Whiskcam"
                width={130}
                height={30}
              />
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label={t("closeMenu")}>
              <XMarkIcon className="h-6 w-6 text-wk-black" />
            </button>
          </div>
          <nav className="mt-8 px-4">
            {NAV_LINKS.map((link) =>
              link.path.startsWith("#") ? (
                <button
                  key={link.title}
                  onClick={() => handleNavClick(link.path)}
                  className="block w-full border-b border-wk-grey-100 py-4 text-left text-lg font-semibold text-wk-black transition-colors hover:text-wk-amber"
                >
                  {link.title}
                </button>
              ) : (
                <Link
                  key={link.title}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-wk-grey-100 py-4 text-lg font-semibold text-wk-black transition-colors hover:text-wk-amber"
                >
                  {link.title}
                </Link>
              )
            )}
            {/* Mobile language switcher */}
            <div className="mt-6 flex items-center gap-2 border-b border-wk-grey-100 pb-4">
              <LanguageSwitcher variant="light" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
