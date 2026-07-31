import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SiteNav from "@/components/SiteNav";
import { company, nav } from "@/lib/content";

const usePathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({ usePathname: () => usePathname() }));

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

function header() {
  return screen.getByRole("banner");
}

beforeEach(() => {
  usePathname.mockReturnValue("/");
  scrollTo(0);
});

describe("SiteNav", () => {
  it("renders the studio name, tagline and every nav link", () => {
    render(<SiteNav />);
    expect(screen.getByText(company.name.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(company.tagline.toUpperCase())).toBeInTheDocument();
    nav.forEach((item) => {
      expect(screen.getAllByRole("link", { name: item.label }).length).toBeGreaterThan(0);
    });
  });

  it("turns solid only past the 40px scroll threshold", () => {
    render(<SiteNav />);
    expect(header().className).not.toContain("bg-cream/95");

    scrollTo(40);
    expect(header().className).not.toContain("bg-cream/95");

    scrollTo(41);
    expect(header().className).toContain("bg-cream/95");

    scrollTo(0);
    expect(header().className).not.toContain("bg-cream/95");
  });

  it("marks the current route as active, including nested routes", () => {
    usePathname.mockReturnValue("/services/kitchens");
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Services" })).toHaveClass("text-tan-deep");
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass("text-ink");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveClass("text-tan-deep");
  });

  it("treats home as active only on an exact match", () => {
    usePathname.mockReturnValue("/");
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass("text-tan-deep");
  });

  it("toggles the mobile menu open and closed", () => {
    render(<SiteNav />);
    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(1);

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(2);
    expect(header().className).toContain("bg-cream/95");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(1);
  });

  it("closes the mobile menu when the route changes", () => {
    const { rerender } = render(<SiteNav />);
    fireEvent.click(screen.getByRole("button", { name: /toggle menu/i }));
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(2);

    usePathname.mockReturnValue("/about");
    rerender(<SiteNav />);
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(1);
  });

  it("links out to Instagram in a new tab", () => {
    render(<SiteNav />);
    const instagram = screen.getByRole("link", { name: /instagram/i });
    expect(instagram).toHaveAttribute("href", company.instagramUrl);
    expect(instagram).toHaveAttribute("target", "_blank");
  });

  it("removes its scroll listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<SiteNav />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    removeSpy.mockRestore();
  });
});
