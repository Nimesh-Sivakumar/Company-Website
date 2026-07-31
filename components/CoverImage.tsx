import Image from "next/image";
import { asset } from "@/lib/asset";

/** Image that fills its (positioned) parent and crops to cover, basePath-aware. */
export default function CoverImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={asset(src)}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`.trim()}
    />
  );
}
