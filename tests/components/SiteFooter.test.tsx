import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SiteFooter from "@/components/SiteFooter";
import { company, nav } from "@/lib/content";

afterEach(() => {
  vi.useRealTimers();
});

describe("SiteFooter", () => {
  it("lists the studio details", () => {
    render(<SiteFooter />);
    expect(screen.getByText(company.name)).toBeInTheDocument();
    expect(screen.getByText(company.coverage)).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(company.instagramHandle)).length).toBeGreaterThan(0);
  });

  it("renders every nav link", () => {
    render(<SiteFooter />);
    nav.forEach((item) => {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    });
  });

  it("opens Instagram in a new tab without leaking the referrer opener", () => {
    render(<SiteFooter />);
    const instagram = screen
      .getAllByRole("link")
      .find((link) => link.getAttribute("href") === company.instagramUrl)!;
    expect(instagram).toHaveAttribute("target", "_blank");
    expect(instagram).toHaveAttribute("rel", "noopener");
  });

  it("shows the current year in the copyright line", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2031-04-05T00:00:00Z"));
    render(<SiteFooter />);
    expect(screen.getByText(`© 2031 ${company.name}`)).toBeInTheDocument();
  });
});
