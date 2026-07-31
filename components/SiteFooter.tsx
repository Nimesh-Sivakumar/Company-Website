import Link from "next/link";
import { company, nav } from "@/lib/content";
import InstagramIcon from "./InstagramIcon";

export default function SiteFooter() {
  return (
    <footer className="bg-coffee text-cream">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/60">
              Get in touch
            </span>
            <h2 className="mt-4 text-3xl text-cream sm:text-4xl">
              Let&apos;s talk about your space
            </h2>
            <dl className="mt-8 space-y-3 text-sm text-cream/80">
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 font-semibold text-cream">Studio</dt>
                <dd>{company.name}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 font-semibold text-cream">Coverage</dt>
                <dd>{company.coverage}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 font-semibold text-cream">Instagram</dt>
                <dd>{company.instagramHandle}</dd>
              </div>
            </dl>
            <nav className="mt-10 flex flex-wrap gap-6 text-sm text-cream/70">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-cream">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <a
            href={company.instagramUrl}
            target="_blank"
            rel="noopener"
            className="block border border-cream/20 p-8 transition-colors hover:bg-cream/5"
          >
            <InstagramIcon className="h-7 w-7 text-cream" />
            <h3 className="mt-6 text-2xl text-cream">Follow the process</h3>
            <p className="mt-3 text-sm text-cream/75">
              Site visits, work-in-progress and finished spaces — posted as projects
              happen.
            </p>
            <span className="mt-6 inline-flex bg-cream px-6 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-coffee">
              {company.instagramHandle} →
            </span>
          </a>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-cream/15 pt-6 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-cream/50 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {company.name}
          </span>
          <span>Custom cabinetry & interior fit-outs</span>
        </div>
      </div>
    </footer>
  );
}
