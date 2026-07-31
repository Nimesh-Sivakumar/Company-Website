import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/Button";
import CoverImage from "@/components/CoverImage";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Num, SectionHead, Wrap } from "@/components/Section";
import { process, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom kitchens, wardrobes, feature walls, commercial fit-outs and full home renovations across Kuala Lumpur and Selangor.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Design and build, collection by collection"
        intro="Six collections covering everything from a single wardrobe run to a full home renovation — each measured, fabricated and installed by the same team."
        image="/assets/kitchen-02.jpg"
        alt="Light timber kitchen with dining island"
      />

      <section className="py-24 lg:py-32">
        <Wrap className="space-y-24">
          {services.map((service, i) => (
            <Reveal key={service.title}>
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-4/3">
                  <CoverImage
                    src={service.image}
                    alt={service.alt}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div>
                  <Num>{service.num}</Num>
                  <h2 className="mt-3 text-3xl sm:text-4xl">{service.title}</h2>
                  <p className="mt-5 text-ink-dim">{service.summary}</p>
                  <ul className="mt-7 space-y-3 text-sm">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex gap-3 border-b border-ink/10 pb-3">
                        <span className="text-tan-deep">—</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-8 inline-flex ${buttonClass("solid", "sm")}`}
                  >
                    Enquire about this
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </Wrap>
      </section>

      <section className="bg-coffee-soft py-24 lg:py-32">
        <Wrap>
          <SectionHead
            eyebrow="Working Process"
            title="From first measurement to handover"
            intro="The same six steps for every project, whatever the scope."
          />
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((step, i) => (
              <Reveal key={step.num} delay={i * 60}>
                <div className="h-full bg-white-warm p-8">
                  <Num>{step.num}</Num>
                  <h3 className="mt-4 text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-dim">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  );
}
