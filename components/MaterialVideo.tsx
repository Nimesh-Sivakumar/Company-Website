"use client";

import Image from "next/image";
import { useState } from "react";

export default function MaterialVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <Image
        src={poster}
        alt="Sintered stone worktop detail"
        width={900}
        height={1600}
        className={className}
      />
    );
  }

  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className={className}
      onError={() => {
        console.error(`Material spotlight video failed to load: ${src}`);
        setFailed(true);
      }}
    />
  );
}
