"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled page error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <div className="mx-auto w-full max-w-[46ch] px-5 text-center">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-tan-deep">
          Something went wrong
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl">This page didn&apos;t load properly</h1>
        <p className="mt-5 text-ink-dim">
          Sorry about that. Try again, or reach us on Instagram and we&apos;ll pick it up
          from there.
        </p>
        {error.digest && (
          <p className="mt-4 font-mono text-[0.65rem] text-ink-dim">
            Reference: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex bg-tan-deep px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.06em] text-cream transition-colors hover:bg-coffee"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex border border-ink/15 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.06em] transition-colors hover:border-tan-deep hover:bg-cream-soft"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
