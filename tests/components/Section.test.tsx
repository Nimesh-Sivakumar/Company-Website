import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Eyebrow, SectionHead, Wrap } from "@/components/Section";

describe("Wrap", () => {
  it("renders children inside the shared max-width container", () => {
    render(<Wrap>inner</Wrap>);
    const wrapper = screen.getByText("inner");
    expect(wrapper.className).toContain("max-w-[1240px]");
  });

  it("appends custom class names", () => {
    render(<Wrap className="extra">inner</Wrap>);
    expect(screen.getByText("inner")).toHaveClass("extra");
  });
});

describe("Eyebrow", () => {
  it("renders its children", () => {
    render(<Eyebrow>Our Work</Eyebrow>);
    expect(screen.getByText("Our Work")).toBeInTheDocument();
  });
});

describe("SectionHead", () => {
  it("renders the eyebrow, heading and intro", () => {
    render(<SectionHead eyebrow="Services" title="What we build" intro="Custom joinery." />);
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "What we build" })).toBeInTheDocument();
    expect(screen.getByText("Custom joinery.")).toBeInTheDocument();
  });

  it("omits the intro paragraph when none is given", () => {
    const { container } = render(<SectionHead eyebrow="Services" title="What we build" />);
    expect(container.querySelector("p")).toBeNull();
  });
});
