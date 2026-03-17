import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  shop: [
    { title: "Whiskcam Original", path: "/#product" },
  ],
  support: [
    { title: "FAQ", path: "/#faq" },
    { title: "Shipping", path: "/policies/shipping" },
    { title: "Returns", path: "/policies/returns" },
    { title: "Contact", path: "mailto:support@whiskcam.com" },
  ],
  legal: [
    { title: "Privacy Policy", path: "/policies/privacy" },
    { title: "Terms of Service", path: "/policies/terms" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wk-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/images/logos/whiskcam-logo-wordmark.webp"
                alt="Whiskcam"
                width={120}
                height={28}
                className="brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-wk-grey-500">
              See their world. The pet collar camera that lets you discover your
              pet&apos;s secret adventures.
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://tiktok.com/@whiskcam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wk-grey-500 transition-colors hover:text-white"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.27 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0 0 12.68 6.34 6.34 0 0 0 6.34-6.34V9.19a8.16 8.16 0 0 0 3.76.92V6.69z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/whiskcam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wk-grey-500 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-wk-grey-500">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.path}
                    className="text-sm text-wk-grey-400 transition-colors hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-wk-grey-500">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.path}
                    className="text-sm text-wk-grey-400 transition-colors hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-wk-grey-500">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.path}
                    className="text-sm text-wk-grey-400 transition-colors hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-wk-grey-600">
          <p>&copy; {currentYear} Whiskcam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
