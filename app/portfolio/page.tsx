import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Wrap } from "@/components/Section";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Recent kitchens, wardrobes and living-space built-ins by Cabinet Creation Co. across the Klang Valley.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Recent kitchens, wardrobes & built-ins"
        intro="A closer look at fit-outs completed around Kuala Lumpur and Selangor — layout, materials and the details that make each one work."
        image="/assets/living-01.jpg"
        alt="Living room with TV feature wall and dining area"
      />

      <section className="py-24 lg:py-32">
        <Wrap className="space-y-24">
          {projects.map((project) => (
            <Reveal key={project.title}>
              <article className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
                <div>
                  <span className="font-mono text-xs text-tan-deep">
                    Project {project.num} — {project.location}
                  </span>
                  <h2 className="mt-3 text-3xl sm:text-4xl">{project.title}</h2>
                  <p className="mt-5 text-ink-dim">{project.body}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-ink/15 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-4/3">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </Wrap>
      </section>

      <section className="pb-24 lg:pb-32">
        <Wrap>
          <Reveal className="border border-ink/10 bg-white-warm px-8 py-14 text-center">
            <h2 className="mx-auto max-w-[24ch] text-3xl sm:text-4xl">
              Want something similar in your home?
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex bg-tan-deep px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.06em] text-cream transition-colors hover:bg-coffee"
            >
              Book a free site visit
            </Link>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
