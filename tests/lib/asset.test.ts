import { afterEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

async function loadAsset(basePath: string | undefined) {
  vi.resetModules();
  if (basePath === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
  else process.env.NEXT_PUBLIC_BASE_PATH = basePath;
  return (await import("@/lib/asset")).asset;
}

afterEach(() => {
  if (ORIGINAL_BASE_PATH === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
  else process.env.NEXT_PUBLIC_BASE_PATH = ORIGINAL_BASE_PATH;
  vi.resetModules();
});

describe("asset", () => {
  it("returns the path unchanged when no base path is configured", async () => {
    const asset = await loadAsset(undefined);
    expect(asset("/assets/kitchen-01.jpg")).toBe("/assets/kitchen-01.jpg");
  });

  it("returns the path unchanged for an empty base path", async () => {
    const asset = await loadAsset("");
    expect(asset("/assets/homepage.jpg")).toBe("/assets/homepage.jpg");
  });

  it("prefixes the path when deployed under a base path", async () => {
    const asset = await loadAsset("/Company-Website");
    expect(asset("/assets/homepage.jpg")).toBe("/Company-Website/assets/homepage.jpg");
  });

  it("handles the site root path", async () => {
    const asset = await loadAsset("/Company-Website");
    expect(asset("/")).toBe("/Company-Website/");
  });
});
