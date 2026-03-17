"use client";

import CartModal from "components/cart/modal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NAV_LINKS = [
  { title: "Shop", path: "#product" },
  { title: "Footage", path: "#footage" },
  { title: "FAQ", path: "#faq" },
  { title: "About", path: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    if (path.startsWith("#")) {
      const el = document.querySelector(path);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
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
            aria-label="Open menu"
          >
            <Bars3Icon
              className={`h-6 w-6 transition-colors ${
                scrolled ? "text-wk-black" : "text-white"
              }`}
            />
          </button>

          {/* Logo — wordmark on desktop, icon on mobile */}
          <Link href="/" className="flex items-center">
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

          {/* Cart */}
          <div className={scrolled ? "text-wk-black" : "text-white"}>
            <CartModal />
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src="/images/logos/whiskcam-logo-wordmark.webp"
                alt="Whiskcam"
                width={130}
                height={30}
              />
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
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
          </nav>
        </div>
      )}
    </>
  );
}
