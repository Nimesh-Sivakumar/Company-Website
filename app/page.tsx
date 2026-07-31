import Image from "next/image";
import Link from "next/link";
import { buttonClass } from "@/components/Button";
import CoverImage from "@/components/CoverImage";
import FaqList from "@/components/FaqList";
import Reveal from "@/components/Reveal";
import StatsBand from "@/components/StatsBand";
import { asset } from "@/lib/asset";
import { Eyebrow, Num, SectionHead, Wrap } from "@/components/Section";
import {
  differentiators,
  process,
  projects,
  services,
  testimonials,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-screen items-center overflow-hidden">
        <CoverImage
          src="/assets/kitchen-01.jpg"
          alt="Custom wet and dry kitchen with island by Cabinet Creation Co."
          priority
          sizes="100vw"
          className="-z-10 scale-105"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-coffee/90 via-coffee/65 to-coffee/25" />
        <Wrap>
          <Eyebrow>
            <span className="text-gold">Cabinet Creation Co. — Design & Build</span>
          </Eyebrow>
          <h1 className="mt-5 text-5xl text-cream sm:text-6xl lg:text-7xl">
            Cabinetry, <em className="font-light italic">crafted</em>
            <br />
            to fit.
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-cream/85">
            Custom kitchens, wardrobes and built-ins for homes across Kuala Lumpur and
            Selangor — designed around your space, not a catalogue.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className={`inline-flex ${buttonClass()}`}
            >
              Get a Quote
            </Link>
            <Link
              href="/portfolio"
              className={`inline-flex ${buttonClass("outlineCream")}`}
            >
              View Portfolio
            </Link>
          </div>
        </Wrap>
      </section>

      {/* INTRO */}
      <section className="py-24 lg:py-32">
        <Wrap className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Image
              src="/assets/kitchen-02.jpg"
              alt="Light timber kitchen with dining island"
              width={900}
              height={1100}
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal delay={80}>
            <Eyebrow>About the studio</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              A cabinetry studio for homes that actually get lived in
            </h2>
            <p className="mt-6 text-ink-dim">
              Cabinet Creation Co. designs and builds kitchens, wardrobes and interior
              fit-outs for homeowners across the Klang Valley. Every project starts with
              a site measurement, not a template — so what you approve on the drawing is
              exactly what gets installed.
            </p>
            <p className="mt-4 text-ink-dim">
              From wet-and-dry kitchen layouts to walk-in wardrobes and full living-space
              built-ins, we carry each job through design, fabrication and installation
              with one team, start to finish.
            </p>
            <Link
              href="/about"
              className={`mt-8 inline-flex ${buttonClass("outline", "sm")}`}
            >
              More about us
            </Link>
          </Reveal>
        </Wrap>
      </section>

      {/* STATS */}
      <StatsBand />

      {/* WHY */}
      <section className="py-24 lg:py-32">
        <Wrap>
          <SectionHead
            eyebrow="Why Cabinet Creation Co."
            title="Built around how you'll actually use the space"
            intro="The details that make the difference between a nice render and a kitchen that works."
          />
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} delay={i * 70} className="bg-cream">
                <div className="h-full bg-white-warm p-8">
                  <Num>0{i + 1}</Num>
                  <h3 className="mt-5 text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm text-ink-dim">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-coffee-soft py-24 lg:py-32">
        <Wrap>
          <SectionHead
            eyebrow="Collections"
            title="What we design & build"
            intro="Every project falls into one of these collections — each with its own scope, pace and finish."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 60}>
                <Link
                  href="/services"
                  className="flex h-full flex-col justify-between border border-ink/10 bg-white-warm p-8 transition-colors hover:border-tan-deep"
                >
                  <Num>{service.num}</Num>
                  <div className="mt-10">
                    <h3 className="text-xl">{service.title}</h3>
                    <p className="mt-2 text-sm text-ink-dim">{service.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* WORK PREVIEW */}
      <section className="py-24 lg:py-32">
        <Wrap>
          <SectionHead
            eyebrow="Selected Work"
            title="Recent kitchens, wardrobes & built-ins"
            intro="A few fit-outs from recent projects around the Klang Valley."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 60}>
                <Link href="/portfolio" className="group block">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <CoverImage
                      src={project.image}
                      alt={project.alt}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee/80 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="font-mono text-xs text-cream/70">
                        {project.num}
                      </span>
                      <h3 className="mt-1 text-xl text-cream">{project.title}</h3>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/portfolio"
              className={`inline-flex ${buttonClass("outline", "sm")}`}
            >
              See the full portfolio
            </Link>
          </div>
        </Wrap>
      </section>

      {/* MATERIAL SPOTLIGHT */}
      <section className="bg-coffee py-24 text-cream lg:py-32">
        <Wrap className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <video
              src={asset("/assets/sintered-stone.mp4")}
              autoPlay
              muted
              loop
              playsInline
              className="w-full"
            />
          </Reveal>
          <Reveal delay={80}>
            <Eyebrow>
              <span className="text-gold">Material Spotlight</span>
            </Eyebrow>
            <h2 className="mt-4 text-3xl text-cream sm:text-4xl">
              Sintered stone worktops, built to last
            </h2>
            <p className="mt-6 text-cream/75">
              For countertops and island tops, we work extensively with sintered stone — a
              dense, low-porosity surface that resists heat, scratching and staining far
              better than standard quartz.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-cream/85">
              {[
                "Heat and scratch resistant surface",
                "Non-porous — resists staining, no sealing needed",
                "Seamless joints for a clean, continuous look",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Wrap>
      </section>

      {/* PROCESS MARQUEE */}
      <section className="overflow-hidden py-24 lg:py-32">
        <Wrap>
          <SectionHead
            eyebrow="Working Process"
            title="From first measurement to handover"
            intro="The same six steps for every project — scrolling on its own, hover to pause."
          />
        </Wrap>
        <div className="relative">
          <div className="flex w-max animate-marquee gap-6">
            {[...process, ...process].map((step, i) => (
              <div
                key={`${step.num}-${i}`}
                aria-hidden={i >= process.length}
                className="w-[280px] shrink-0 border-t border-ink/15 pt-6"
              >
                <Num>{step.num}</Num>
                <h4 className="mt-3 text-xl">{step.title}</h4>
                <p className="mt-2 text-sm text-ink-dim">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-coffee-soft py-24 lg:py-32">
        <Wrap>
          <SectionHead
            eyebrow="Client Feedback"
            title="What it's like to work with us"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, i) => (
              <Reveal key={item.quote} delay={i * 70}>
                <figure className="h-full border border-ink/10 bg-white-warm p-8">
                  <div className="text-gold">★★★★★</div>
                  <blockquote className="mt-4 font-display text-lg leading-snug">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-ink-dim">
                    <b className="block text-ink">{item.who}</b>
                    {item.detail}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-dim">
            Sample layout only — swap in real client reviews before publishing.
          </p>
        </Wrap>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32">
        <Wrap>
          <FaqList />
        </Wrap>
      </section>

      {/* CTA */}
      <section className="pb-24 lg:pb-32">
        <Wrap>
          <Reveal className="bg-tan-deep px-8 py-16 text-center text-cream sm:px-16">
            <h2 className="mx-auto max-w-[22ch] text-3xl text-cream sm:text-4xl">
              Ready to plan your kitchen or wardrobe?
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-cream/80">
              Send over a few details and we&apos;ll follow up to arrange a free site
              visit.
            </p>
            <Link
              href="/contact"
              className={`mt-8 inline-flex ${buttonClass("cream")}`}
            >
              Get a Quote
            </Link>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
