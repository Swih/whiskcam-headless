"use client";

import Footer from "components/layout/footer";
import { Link } from "i18n/navigation";
import { useState } from "react";

export default function TrackPage() {
  const [tracking, setTracking] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = tracking.trim();
    if (!trimmed) return;
    window.open(`https://t.17track.net/en#nums=${encodeURIComponent(trimmed)}`, "_blank", "noopener");
  };

  return (
    <>
      <div className="mx-auto max-w-xl px-5 pt-32 pb-16 md:pt-40">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-wk-amber">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-600">Track My Order</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-wk-black md:text-4xl">
          Track My Order
        </h1>
        <p className="mt-3 text-neutral-500">
          Enter your tracking number to see the real-time status of your Whiskcam delivery.
          You can find your tracking number in the shipping confirmation email.
        </p>

        {/* Tracking form */}
        <form onSubmit={handleSubmit} className="mt-8">
          <label htmlFor="tracking" className="block text-sm font-medium text-wk-black">
            Tracking Number
          </label>
          <div className="mt-2 flex gap-3">
            <input
              id="tracking"
              type="text"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="e.g. LX123456789CN"
              className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-wk-black placeholder:text-neutral-400 focus:border-wk-amber focus:outline-none focus:ring-2 focus:ring-wk-amber/20"
              required
            />
            <button
              type="submit"
              className="rounded-xl bg-wk-amber px-6 py-3 text-sm font-semibold text-wk-dark transition-colors hover:bg-wk-amber-hover"
            >
              Track
            </button>
          </div>
        </form>

        {/* Info cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-wk-amber/10">
                <svg className="h-5 w-5 text-wk-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-wk-black">Standard Delivery</p>
                <p className="text-xs text-neutral-500">7-14 business days worldwide</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-wk-amber/10">
                <svg className="h-5 w-5 text-wk-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-wk-black">No tracking number?</p>
                <p className="text-xs text-neutral-500">
                  Check your email or contact{" "}
                  <a href="mailto:support@whiskcam.com" className="text-wk-amber hover:underline">
                    support@whiskcam.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 space-y-6">
          <h2 className="text-lg font-bold text-wk-black">Common Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-wk-black">When will I get my tracking number?</h3>
              <p className="mt-1 text-sm text-neutral-500">
                You&apos;ll receive a shipping confirmation email with your tracking number
                within 1-3 business days after placing your order.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-wk-black">My tracking hasn&apos;t updated in days</h3>
              <p className="mt-1 text-sm text-neutral-500">
                International shipments can sometimes show no updates for 3-7 days while
                in transit between countries. This is normal. If there&apos;s no update after
                15 days, contact us.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-wk-black">My order hasn&apos;t arrived after 30 days</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Email us at{" "}
                <a href="mailto:support@whiskcam.com" className="text-wk-amber hover:underline">
                  support@whiskcam.com
                </a>{" "}
                with your order number and we&apos;ll sort it out immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
