import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Reveal from "@/components/Reveal";
import { MockIntersectionObserver } from "../setup";

function latestObserver() {
  return MockIntersectionObserver.instances.at(-1)!;
}

describe("Reveal", () => {
  it("starts hidden and observes its wrapper", () => {
    render(<Reveal>content</Reveal>);
    const wrapper = screen.getByText("content");

    expect(wrapper).toHaveClass("opacity-0");
    expect(latestObserver().observed).toEqual([wrapper]);
    expect(latestObserver().options).toEqual({ threshold: 0.12 });
  });

  it("becomes visible once intersecting and stops observing", () => {
    render(<Reveal>content</Reveal>);
    act(() => latestObserver().trigger(true));

    expect(screen.getByText("content")).toHaveClass("opacity-100");
    expect(latestObserver().disconnected).toBe(true);
  });

  it("stays hidden while not intersecting", () => {
    render(<Reveal>content</Reveal>);
    act(() => latestObserver().trigger(false));

    expect(screen.getByText("content")).toHaveClass("opacity-0");
    expect(latestObserver().disconnected).toBe(false);
  });

  it("applies the transition delay and extra class names", () => {
    render(
      <Reveal delay={250} className="custom-class">
        content
      </Reveal>,
    );
    const wrapper = screen.getByText("content");

    expect(wrapper).toHaveStyle({ transitionDelay: "250ms" });
    expect(wrapper).toHaveClass("custom-class");
  });

  it("defaults to no delay", () => {
    render(<Reveal>content</Reveal>);
    expect(screen.getByText("content")).toHaveStyle({ transitionDelay: "0ms" });
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = render(<Reveal>content</Reveal>);
    const observer = latestObserver();
    unmount();
    expect(observer.disconnected).toBe(true);
  });
});
