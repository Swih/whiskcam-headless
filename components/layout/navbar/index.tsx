"use client";

import CartModal from "components/cart/modal";
import { LanguageSwitcher } from "components/ui/language-switcher";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link, usePathname, useRouter } from "../../../i18n/navigation";
import { useTranslations } from "next-intl";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

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

  // Pages that render a dark hero directly behind the navbar. The transparent
  // navbar with white text is only safe on these pages. Everywhere else the
  // body background is white, so the navbar must render with a light bg and
  // dark text from the start — otherwise the navbar becomes invisible at the
  // top of the page (white text on white body).
  const isDarkHeroPage = pathname === "/about";

  // Visual state: use the "light surface / dark text" look any time either
  // the user has scrolled OR the current page doesn't have a dark hero.
  const lightSurface = scrolled || !isDarkHeroPage;

  const NAV_LINKS = [
    { title: t("shop"), path: "#product" },
    { title: t("footage"), path: "#footage" },
    { title: t("guides"), path: "/blog" },
    { title: t("faq"), path: "#faq" },
    { title: t("about"), path: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    if (path.startsWith("#")) {
      if (pathname !== "/") {
        router.push(`/${path}`);
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
          lightSurface
            ? `${!scrolled && pathname === "/" ? "top-9" : "top-0"} bg-white/90 shadow-sm backdrop-blur-xl`
            : "top-9 bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          {/* Mobile hamburger */}
          <button
            className="flex h-11 w-11 items-center justify-center md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label={t("openMenu")}
          >
            <Bars3Icon
              className={`h-6 w-6 transition-colors ${
                lightSurface ? "text-wk-black" : "text-white"
              }`}
            />
          </button>

          {/* Logo — wordmark on desktop, icon on mobile */}
          <Link
            href="/"
            className="flex items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image
              src="/images/logos/whiskcam-logo-wordmark.webp"
              alt="Whiskcam"
              width={140}
              height={32}
              className={`block w-[112px] sm:w-[140px] transition-all ${
                lightSurface ? "" : "brightness-0 invert"
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
                      lightSurface
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
                      lightSurface
                        ? "text-wk-grey-600 hover:text-wk-black"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ),
            )}
          </ul>

          {/* Right side: Language switcher + Cart */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher variant={lightSurface ? "light" : "dark"} />
            </div>
            <div className={lightSurface ? "text-wk-black" : "text-white"}>
              <CartModal
                savingsPerUnit={savingsPerUnit}
                currencyCode={currencyCode}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <Dialog
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          className="relative z-[60]"
        >
          <DialogPanel className="fixed inset-0 overflow-y-auto bg-white">
            <DialogTitle className="sr-only">Whiskcam</DialogTitle>
            <div className="flex items-center justify-between px-4 py-3">
              <Link
                href="/"
                onClick={() => {
                  setMobileOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <Image
                  src="/images/logos/whiskcam-logo-wordmark.webp"
                  alt="Whiskcam"
                  width={130}
                  height={30}
                />
              </Link>
              <button
                className="flex h-11 w-11 items-center justify-center"
                onClick={() => setMobileOpen(false)}
                aria-label={t("closeMenu")}
              >
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
                ),
              )}
              {/* Mobile language switcher */}
              <div className="mt-6 flex items-center gap-2 border-b border-wk-grey-100 pb-4">
                <LanguageSwitcher variant="light" />
              </div>
            </nav>
          </DialogPanel>
        </Dialog>
      )}
    </>
  );
}
