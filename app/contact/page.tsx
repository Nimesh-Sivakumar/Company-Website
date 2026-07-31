import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { Eyebrow, Num, Wrap, fieldLabelClass } from "@/components/Section";
import { company, process } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a quote from Cabinet Creation Co. — free site visit and measurement across Kuala Lumpur and Selangor.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get a Quote"
        title="Tell us about your project"
        intro="Send over a few details and we'll follow up to arrange a free site visit and measurement."
        image="/assets/wardrobe-01.jpg"
        alt="Walk-in wardrobe with open shelving"
      />

      <section className="py-24 lg:py-32">
        <Wrap className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Studio details</Eyebrow>
            <h2 className="mt-4 text-3xl">Let&apos;s talk about your space</h2>
            <dl className="mt-8 space-y-4 text-sm">
              <div className="border-b border-ink/10 pb-4">
                <dt className={fieldLabelClass}>Studio</dt>
                <dd className="mt-1">{company.name}</dd>
              </div>
              <div className="border-b border-ink/10 pb-4">
                <dt className={fieldLabelClass}>Coverage</dt>
                <dd className="mt-1">{company.coverage}</dd>
              </div>
              <div className="border-b border-ink/10 pb-4">
                <dt className={fieldLabelClass}>Instagram</dt>
                <dd className="mt-1">
                  <a
                    href={company.instagramUrl}
                    target="_blank"
                    rel="noopener"
                    className="underline decoration-tan-deep/40 underline-offset-4 hover:text-tan-deep"
                  >
                    {company.instagramHandle}
                  </a>
                </dd>
              </div>
            </dl>

            <h3 className="mt-12 text-xl">What happens next</h3>
            <ol className="mt-4 space-y-3 text-sm text-ink-dim">
              {process.slice(0, 3).map((step) => (
                <li key={step.num} className="flex gap-3">
                  <Num>{step.num}</Num>
                  <span>
                    <b className="text-ink">{step.title}</b> — {step.body}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border border-ink/10 bg-white-warm p-8 sm:p-10">
            <QuoteForm />
          </div>
        </Wrap>
      </section>
    </>
  );
}
