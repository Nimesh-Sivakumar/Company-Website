import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/Button";
import FaqList from "@/components/FaqList";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import StatsBand from "@/components/StatsBand";
import { Eyebrow, SectionHead, Wrap } from "@/components/Section";
import { company, differentiators } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cabinet Creation Co. is a custom cabinetry and interior fit-out studio serving Kuala Lumpur and Selangor.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        title="A cabinetry studio for homes that actually get lived in"
        intro="One team carrying every project from site measurement through design, fabrication and installation."
        image="/assets/homepage.jpg"
        alt="Interior fit-out by Cabinet Creation Co."
      />

      <section className="py-24 lg:py-32">
        <Wrap className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              Built around your space, not a catalogue
            </h2>
          </Reveal>
          <Reveal delay={80} className="space-y-5 text-ink-dim">
            <p>
              {company.name} designs and builds kitchens, wardrobes and interior fit-outs
              for homeowners across the Klang Valley. Every project starts with a site
              measurement, not a template — so what you approve on the drawing is exactly
              what gets installed.
            </p>
            <p>
              From wet-and-dry kitchen layouts to walk-in wardrobes and full living-space
              built-ins, we carry each job through design, fabrication and installation
              with one team, start to finish. That means fewer handoffs, clearer timelines
              and one point of contact from the first visit to handover.
            </p>
            <p>
              We work with materials chosen for daily wear — sintered stone worktops,
              quality laminates and hardware that keeps working years after installation.
            </p>
          </Reveal>
        </Wrap>
      </section>

      <StatsBand />

      <section className="py-24 lg:py-32">
        <Wrap>
          <SectionHead
            eyebrow="How we work"
            title="What you can expect from us"
          />
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full bg-white-warm p-8">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm text-ink-dim">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="bg-coffee-soft py-24 lg:py-32">
        <Wrap>
          <FaqList />
          <Link href="/contact" className={`mt-12 inline-flex ${buttonClass()}`}>
            Get a Quote
          </Link>
        </Wrap>
      </section>
    </>
  );
}
