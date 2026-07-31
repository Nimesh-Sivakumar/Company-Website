import { describe, expect, it } from "vitest";
import {
  company,
  differentiators,
  faqs,
  nav,
  process,
  projects,
  projectTypes,
  services,
  stats,
  testimonials,
} from "@/lib/content";

describe("company", () => {
  it("exposes the studio identity used across the site", () => {
    expect(company.name).toBe("Cabinet Creation Co.");
    expect(company.instagramUrl).toMatch(/^https:\/\/www\.instagram\.com\//);
    expect(company.instagramUrl).toContain(company.instagramHandle.replace("@", ""));
  });
});

describe("nav", () => {
  it("starts at the home route and uses unique root-relative hrefs", () => {
    expect(nav[0]).toEqual({ href: "/", label: "Home" });
    expect(new Set(nav.map((item) => item.href)).size).toBe(nav.length);
    nav.forEach((item) => {
      expect(item.href.startsWith("/")).toBe(true);
      expect(item.label.length).toBeGreaterThan(0);
    });
  });

  it("links to every top-level page rendered by the app", () => {
    expect(nav.map((item) => item.href)).toEqual([
      "/",
      "/services",
      "/portfolio",
      "/about",
      "/contact",
    ]);
  });
});

describe("services", () => {
  it("is numbered sequentially from 01", () => {
    expect(services.map((s) => s.num)).toEqual(["01", "02", "03", "04", "05", "06"]);
  });

  it("gives every service an image under /assets and descriptive alt text", () => {
    services.forEach((service) => {
      expect(service.image).toMatch(/^\/assets\/.+\.(jpg|mp4)$/);
      expect(service.alt.length).toBeGreaterThan(0);
      expect(service.details.length).toBeGreaterThan(0);
    });
  });

  it("has unique titles", () => {
    expect(new Set(services.map((s) => s.title)).size).toBe(services.length);
  });
});

describe("projectTypes", () => {
  it("mirrors the service titles for the quote form select", () => {
    expect(projectTypes).toEqual(services.map((s) => s.title));
  });
});

describe("projects", () => {
  it("is numbered sequentially and fully described", () => {
    expect(projects.map((p) => p.num)).toEqual(["01", "02", "03", "04"]);
    projects.forEach((project) => {
      expect(project.image).toMatch(/^\/assets\//);
      expect(project.location.length).toBeGreaterThan(0);
      expect(project.body.length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
    });
  });
});

describe("process", () => {
  it("describes the six documented steps in order", () => {
    expect(process).toHaveLength(6);
    expect(process.map((step) => step.num)).toEqual([
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
    ]);
    expect(process[0].title).toBe("Site Visit");
    expect(process.at(-1)?.title).toBe("Handover");
  });
});

describe("supporting content", () => {
  it("provides stats, differentiators, testimonials and faqs", () => {
    expect(stats.length).toBeGreaterThan(0);
    expect(differentiators.length).toBeGreaterThan(0);
    expect(testimonials.length).toBeGreaterThan(0);
    expect(faqs.length).toBeGreaterThan(0);
  });

  it("phrases every faq as a question with an answer", () => {
    faqs.forEach((faq) => {
      expect(faq.q.endsWith("?")).toBe(true);
      expect(faq.a.length).toBeGreaterThan(0);
    });
  });
});
