import { describe, it, expect } from "vitest";
import { AssetStatus, canTransition } from "../src/domain/asset-status";


describe("AssetStatus transitions", () => {
  it("allows allowed transitions", () => {
    expect(canTransition("active", "inactive")).toBe(true);
    expect(canTransition("active", "retired")).toBe(true);
    expect(canTransition("inactive", "active")).toBe(true);
    expect(canTransition("inactive", "retired")).toBe(true);
  });

  it("disallows disallowed transitions", () => {
    // same state
    expect(canTransition("active", "active")).toBe(false);
    expect(canTransition("inactive", "inactive")).toBe(false);
    expect(canTransition("retired", "retired")).toBe(false);

    // retired to others
    expect(canTransition("retired", "active")).toBe(false);
    expect(canTransition("retired", "inactive")).toBe(false);

    // invalid combinations
    expect(canTransition("active", "active")).toBe(false);
    expect(canTransition("inactive", "inactive")).toBe(false);
  });
});
