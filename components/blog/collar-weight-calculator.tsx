"use client";

import { PRODUCT_FACTS } from "lib/content";
import { useState } from "react";

// =============================================================================
// Collar weight calculator
//
// Built for the safety article, which sits at position 8.6 on 1,498 impressions
// and converts at 0.33%. The ranking is fine; the click is not. On a yes/no
// safety question Google's AI Overview answers inline, so a page that only
// restates the 3% rule earns no reason to be visited. A calculator is the part
// of the answer a summary cannot carry — the reader has to come here to get the
// number for *their* cat.
//
// The static table above it in the article stays: crawlers that do not run JS
// still need the answer in the HTML.
// =============================================================================

const CAMERA_G = PRODUCT_FACTS.weightGrams;

/** Vet-adopted wildlife-telemetry thresholds (Cochran & Lord, Murray & Fuller). */
const CONSERVATIVE = 0.03;
const MAXIMUM = 0.05;

const PRESETS = [
  { label: "Kitten / small", kg: 2.5 },
  { label: "Average cat", kg: 4 },
  { label: "Large cat", kg: 6 },
  { label: "Maine Coon", kg: 7.8 },
];

export function CollarWeightCalculator() {
  const [kg, setKg] = useState(4);
  const [unit, setUnit] = useState<"kg" | "lb">("kg");

  const safeKg = Number.isFinite(kg) && kg > 0 ? kg : 0;
  const conservativeLimit = Math.round(safeKg * CONSERVATIVE * 1000);
  const maximumLimit = Math.round(safeKg * MAXIMUM * 1000);
  const percentOfBody = safeKg > 0 ? (CAMERA_G / (safeKg * 1000)) * 100 : 0;

  const verdict =
    safeKg <= 0
      ? null
      : CAMERA_G <= conservativeLimit
        ? { tone: "ok" as const, text: `Within the conservative 3% limit` }
        : CAMERA_G <= maximumLimit
          ? { tone: "warn" as const, text: `Between the 3% and 5% limits — short sessions only` }
          : { tone: "bad" as const, text: `Over the 5% limit — too heavy for this cat` };

  // Where the camera sits on a 0 → 5%-of-body-weight scale.
  const barPct = Math.min((percentOfBody / (MAXIMUM * 100)) * 100, 100);

  const display = unit === "kg" ? safeKg : +(safeKg * 2.20462).toFixed(1);

  function handleValue(raw: string) {
    const n = Number.parseFloat(raw);
    if (Number.isNaN(n)) {
      setKg(0);
      return;
    }
    setKg(unit === "kg" ? n : n / 2.20462);
  }

  return (
    <div className="not-prose my-10 rounded-xl border border-neutral-200 bg-wk-warm p-6">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-wk-amber">
        Calculator
      </div>
      <h3 className="text-xl font-bold text-wk-black">
        What is the safe camera weight for your cat?
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        Enter your cat&apos;s weight. The limits come from the 3–5% body-weight rule
        veterinarians apply to wearables.
      </p>

      {/* Input */}
      <div className="mt-5 flex flex-wrap items-end gap-3">
        <div>
          <label
            htmlFor="cat-weight"
            className="block text-xs font-medium text-neutral-500"
          >
            Your cat&apos;s weight
          </label>
          <input
            id="cat-weight"
            type="number"
            min="0.5"
            max="15"
            step="0.1"
            value={display || ""}
            onChange={(e) => handleValue(e.target.value)}
            className="mt-1.5 w-32 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-lg font-semibold text-wk-black tabular-nums focus:border-wk-amber focus:outline-none focus:ring-2 focus:ring-wk-amber/20"
          />
        </div>

        <div
          className="mb-0.5 inline-flex overflow-hidden rounded-lg border border-neutral-300"
          role="group"
          aria-label="Weight unit"
        >
          {(["kg", "lb"] as const).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              aria-pressed={unit === u}
              className={
                "px-3.5 py-2 text-sm font-semibold transition-colors " +
                (unit === u
                  ? "bg-wk-black text-white"
                  : "bg-white text-neutral-500 hover:text-wk-black")
              }
            >
              {u}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setKg(p.kg)}
              className="mb-0.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-wk-amber hover:text-wk-black"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div aria-live="polite">
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Conservative limit (3%)" value={`${conservativeLimit} g`} />
          <Stat label="Absolute maximum (5%)" value={`${maximumLimit} g`} />
          <Stat
            label={`A ${CAMERA_G} g camera is`}
            value={`${percentOfBody.toFixed(2)}%`}
            hint="of body weight"
          />
        </div>

        {/* Scale */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between text-[11px] font-medium text-neutral-500">
            <span>0%</span>
            <span>3% — conservative</span>
            <span>5% — maximum</span>
          </div>
          <div className="relative mt-1.5 h-2.5 w-full rounded-full bg-neutral-200">
            {/* 3% marker sits at 60% of a 0–5% scale */}
            <div className="absolute left-[60%] top-[-3px] h-[17px] w-px bg-neutral-400" />
            <div
              className={
                "h-2.5 rounded-full transition-all duration-300 " +
                (verdict?.tone === "ok"
                  ? "bg-wk-green"
                  : verdict?.tone === "warn"
                    ? "bg-wk-amber"
                    : "bg-wk-red")
              }
              style={{ width: `${barPct}%` }}
            />
          </div>
        </div>

        {verdict && (
          <p
            className={
              "mt-5 rounded-lg px-4 py-3 text-sm font-medium " +
              (verdict.tone === "ok"
                ? "bg-wk-green/10 text-wk-green"
                : verdict.tone === "warn"
                  ? "bg-wk-amber/10 text-[#8a5d06]"
                  : "bg-wk-red/10 text-wk-red")
            }
          >
            <strong>
              {safeKg.toFixed(1)} kg cat, {CAMERA_G} g camera:
            </strong>{" "}
            {verdict.text}.
          </p>
        )}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-neutral-500">
        Weight is only half of it. A breakaway collar matters more than a few grams —
        entanglement is the risk that actually injures outdoor cats. Read the collar
        section below before you buy anything.
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-4 py-3">
      <div className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold tabular-nums text-wk-black">{value}</div>
      {hint && <div className="text-[11px] text-neutral-400">{hint}</div>}
    </div>
  );
}
