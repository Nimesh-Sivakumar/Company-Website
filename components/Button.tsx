type Variant = "solid" | "cream" | "outline" | "outlineCream";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  solid: "bg-tan-deep text-cream hover:bg-coffee",
  cream: "bg-cream text-coffee hover:bg-white-warm",
  outline: "border border-ink/15 hover:border-tan-deep hover:bg-cream-soft",
  outlineCream: "border border-cream/50 text-cream hover:bg-cream/10",
};

const sizes: Record<Size, string> = {
  sm: "px-6 py-3",
  md: "px-7 py-3.5",
};

/**
 * Visual classes for the site's call-to-action buttons. Layout classes
 * (`inline-flex`, margins) stay with the caller.
 */
export function buttonClass(variant: Variant = "solid", size: Size = "md") {
  return `${sizes[size]} text-xs font-semibold uppercase tracking-[0.06em] transition-colors ${variants[variant]}`;
}
