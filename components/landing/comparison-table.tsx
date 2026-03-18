"use client";

import { COMPARISON } from "lib/content";
import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";

function CellValue({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <svg className="mx-auto h-5 w-5 text-wk-amber" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="mx-auto h-5 w-5 text-wk-grey-300" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
    <span className={`text-sm ${highlight ? "font-semibold text-wk-black" : "text-wk-grey-500"}`}>
      {value}
    </span>
  );
}

export function ComparisonTable({ price }: { price?: string }) {
  const rows = COMPARISON.map((row) => {
    if (row.feature === "Price" && price) {
      return { ...row, whiskcam: price };
    }
    return row;
  });

  return (
    <SectionWrapper bg="white">
      <SectionHeading
        overline="Compare"
        title="Why Pet Parents Choose Whiskcam"
        subtitle="See how we stack up against other pet cameras."
      />

      <AnimatedElement>
        <div className="mx-auto max-w-2xl overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-wk-grey-200">
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-wk-grey-500">
                  Feature
                </th>
                <th scope="col" className="px-4 py-4 text-center">
                  <span className="rounded-full bg-wk-amber/10 px-3 py-1 text-sm font-bold text-wk-amber">
                    Whiskcam
                  </span>
                </th>
                <th scope="col" className="px-4 py-4 text-center text-xs text-wk-grey-400">
                  Other cameras
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-wk-grey-100 ${
                    i % 2 === 0 ? "bg-wk-grey-50" : "bg-white"
                  }`}
                >
                  <td scope="row" className="px-4 py-3.5 text-sm font-medium text-wk-black">
                    {row.feature}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <CellValue value={row.whiskcam} highlight />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <CellValue value={row.others} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Price anchoring */}
        <p className="mx-auto mt-6 max-w-md text-center text-sm text-wk-grey-500">
          Action cameras cost €300+. Whiskcam was built for pets — not your wallet.
        </p>
      </AnimatedElement>
    </SectionWrapper>
  );
}
