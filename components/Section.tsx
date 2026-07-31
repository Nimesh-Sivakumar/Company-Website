import type { ReactNode } from "react";

export function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-tan-deep">
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-[16ch] text-3xl sm:text-4xl lg:text-[2.9rem]">
          {title}
        </h2>
      </div>
      {intro && <p className="max-w-[38ch] text-ink-dim">{intro}</p>}
    </div>
  );
}
