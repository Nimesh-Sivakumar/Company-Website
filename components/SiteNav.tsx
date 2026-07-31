"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, nav } from "@/lib/content";
import { buttonClass } from "./Button";
import InstagramIcon from "./InstagramIcon";

export default function SiteNav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid || open
          ? "bg-cream/95 shadow-[0_1px_0_rgba(42,29,18,0.13)] backdrop-blur py-3"
          : "py-6"
      }`}
    >
      <div className="flex items-center justify-between px-5 sm:px-8 lg:px-16">
        <Link href="/" className="font-display text-lg font-semibold leading-none">
          {company.name.toUpperCase()}
          <span className="mt-1 block font-mono text-[0.56rem] font-normal tracking-[0.18em] text-tan-deep">
            {company.tagline.toUpperCase()}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-tan-deep ${
                isActive(item.href) ? "text-tan-deep" : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={company.instagramUrl}
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            className="hidden text-ink transition-colors hover:text-tan-deep sm:block"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <Link
            href="/contact"
            className={`hidden sm:inline-flex ${buttonClass("solid", "sm")}`}
          >
            Get a Quote
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="block h-px w-6 bg-ink" />
            <span className="block h-px w-6 bg-ink" />
            <span className="block h-px w-6 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink/10 bg-cream px-5 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-base"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`mt-3 inline-flex ${buttonClass("solid", "sm")}`}
          >
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
