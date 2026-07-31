import Reveal from "./Reveal";
import { Wrap } from "./Section";
import { stats } from "@/lib/content";

export default function StatsBand() {
  return (
    <section className="bg-coffee py-16 text-cream">
      <Wrap>
        <Reveal className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <b className="font-display text-4xl font-medium">{stat.value}</b>
              <span className="mt-2 block text-sm text-cream/70">{stat.label}</span>
            </div>
          ))}
        </Reveal>
      </Wrap>
    </section>
  );
}
