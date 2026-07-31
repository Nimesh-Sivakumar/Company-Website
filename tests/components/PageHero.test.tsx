import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageHero from "@/components/PageHero";

const props = {
  eyebrow: "Portfolio",
  title: "Recent projects",
  intro: "A look at recent fit-outs across KL and Selangor.",
  image: "/assets/kitchen-01.jpg",
  alt: "Custom kitchen",
};

describe("PageHero", () => {
  it("renders the eyebrow, h1 and intro copy", () => {
    render(<PageHero {...props} />);
    expect(screen.getByText(props.eyebrow)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: props.title })).toBeInTheDocument();
    expect(screen.getByText(props.intro)).toBeInTheDocument();
  });

  it("renders the background image with its alt text", () => {
    render(<PageHero {...props} />);
    const image = screen.getByAltText(props.alt);
    expect(image).toHaveAttribute("src", props.image);
  });
});
