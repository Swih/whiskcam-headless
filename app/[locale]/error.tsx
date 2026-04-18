"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-20 flex max-w-md flex-col items-center rounded-2xl border border-wk-grey-200 bg-white p-10 text-center">
      <h2 className="text-xl font-bold text-wk-black">Something went wrong</h2>
      <p className="mt-2 text-sm text-wk-grey-500">
        There was an issue loading this page. Please try again.
      </p>
      <button
        className="mt-6 rounded-[var(--radius-btn)] bg-wk-amber px-8 py-3 text-sm font-semibold text-wk-black shadow-sm transition-all duration-200 hover:bg-wk-amber-hover hover:shadow-md active:scale-[0.98]"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
