import Image from "next/image";
import { Eyebrow, Wrap } from "./Section";

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="relative isolate flex min-h-[62vh] items-end overflow-hidden pb-16 pt-40">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-coffee/90 via-coffee/55 to-coffee/25" />
      <Wrap>
        <Eyebrow>
          <span className="text-gold">{eyebrow}</span>
        </Eyebrow>
        <h1 className="mt-4 max-w-[20ch] text-4xl text-cream sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-[52ch] text-cream/85">{intro}</p>
      </Wrap>
    </section>
  );
}
