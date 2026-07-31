import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InstagramIcon from "@/components/InstagramIcon";

describe("InstagramIcon", () => {
  it("renders a decorative svg", () => {
    const { container } = render(<InstagramIcon />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("forwards the class name for sizing", () => {
    const { container } = render(<InstagramIcon className="h-5 w-5" />);
    expect(container.querySelector("svg")).toHaveClass("h-5", "w-5");
  });
});
