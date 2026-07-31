import { SectionHead } from "./Section";
import { faqs } from "@/lib/content";

export default function FaqList() {
  return (
    <>
      <SectionHead eyebrow="FAQ" title="Good to know before you book a visit" />
      <div className="max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map((faq) => (
          <details key={faq.q} className="group py-5">
            <summary className="flex cursor-pointer items-center justify-between gap-6 font-display text-lg">
              {faq.q}
              <span className="text-tan-deep transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-[60ch] text-sm text-ink-dim">{faq.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
