import Image from "next/image";
import { Link } from "i18n/navigation";

// not-found.tsx does not receive params from Next.js, so we cannot call setRequestLocale here.
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <Image
        src="/images/logos/whiskcam-logo-icon.webp"
        alt="Whiskcam"
        width={64}
        height={64}
        className="mb-8"
      />
      <h1 className="text-3xl font-bold text-wk-black">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-wk-grey-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 bg-wk-black text-white rounded-[var(--radius-btn)] px-8 py-3 text-sm font-semibold hover:brightness-110 hover:shadow-[0_0_20px_rgba(245,166,35,0.3)] transition-all duration-200"
      >
        Back to shop
      </Link>
    </div>
  );
}
