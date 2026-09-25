"use client";

import { PRODUCT_FACTS } from "lib/content";
import { useState } from "react";

/** Arithmetic only: never infer an animal's safety from a weight percentage. */
export function CollarWeightCalculator() {
  const [weight, setWeight] = useState("4");
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [camera, setCamera] = useState(String(PRODUCT_FACTS.weightGrams));
  const [accessories, setAccessories] = useState("0");
  const catKg = Number(weight) / (unit === "lb" ? 2.2046226218 : 1);
  const cameraGrams = Number(camera);
  const accessoryGrams = Number(accessories);
  const valid =
    weight.trim() !== "" &&
    camera.trim() !== "" &&
    accessories.trim() !== "" &&
    Number.isFinite(catKg) &&
    catKg > 0 &&
    Number.isFinite(cameraGrams) &&
    cameraGrams >= 0 &&
    Number.isFinite(accessoryGrams) &&
    accessoryGrams >= 0;
  const total = cameraGrams + accessoryGrams;
  const inputStyle =
    "mt-2 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-lg text-wk-black";
  function changeUnit(next: "kg" | "lb") {
    if (next === unit) return;
    if (weight.trim() !== "" && Number.isFinite(catKg) && catKg > 0)
      setWeight(
        String(
          Number((next === "lb" ? catKg * 2.2046226218 : catKg).toFixed(4)),
        ),
      );
    setUnit(next);
  }
  return (
    <section
      aria-label="Collar load calculator"
      className="not-prose my-10 rounded-xl border border-neutral-200 bg-wk-warm p-6"
    >
      <h3 className="text-xl font-bold text-wk-black">
        Calculate the complete collar load
      </h3>
      <p className="mt-2 text-sm text-neutral-600">
        Enter measured weights. The result describes the load, not whether
        equipment is safe for your cat.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          Cat weight ({unit})
          <input
            aria-label="Cat weight"
            type="number"
            min="0.01"
            step="any"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={inputStyle}
          />
        </label>
        <label className="text-sm">
          Camera (g)
          <input
            aria-label="Camera weight in grams"
            type="number"
            min="0"
            step="any"
            value={camera}
            onChange={(e) => setCamera(e.target.value)}
            className={inputStyle}
          />
        </label>
        <label className="text-sm">
          Collar, mount and tags (g)
          <input
            aria-label="Accessories weight in grams"
            type="number"
            min="0"
            step="any"
            value={accessories}
            onChange={(e) => setAccessories(e.target.value)}
            className={inputStyle}
          />
        </label>
      </div>
      <div role="group" aria-label="Weight unit" className="mt-3 flex gap-2">
        {(["kg", "lb"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={unit === value}
            onClick={() => changeUnit(value)}
            className={
              unit === value
                ? "rounded bg-wk-black px-4 py-2 text-white"
                : "rounded border px-4 py-2"
            }
          >
            {value}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-neutral-600">
        The camera starts at Whiskcam&apos;s listed {PRODUCT_FACTS.weightGrams}{" "}
        g. Accessories start at zero: add their measured weight before
        interpreting the total.
      </p>
      <div
        role="status"
        aria-live="polite"
        className="mt-5 rounded-lg bg-white p-4 text-wk-black"
      >
        {valid ? (
          <>
            <strong>{Number(total.toFixed(2))} g total</strong>
            <p>{((total / (catKg * 1000)) * 100).toFixed(2)}% of body weight</p>
          </>
        ) : (
          <p>Enter a positive cat weight and non-negative equipment weights.</p>
        )}
      </div>
      <p className="mt-4 text-sm text-neutral-600">
        This calculator gives no safe-weight threshold or recommended wearing
        time. Fit, release function, health and your cat&apos;s response matter.
        Remove equipment if your cat appears uncomfortable.
      </p>
    </section>
  );
}
