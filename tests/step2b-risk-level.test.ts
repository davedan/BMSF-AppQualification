import { describe, expect, it } from "vitest";
import { canEscalate } from "../src/domain/risk-level";

describe("risk escalation", () => {
  it("allows low -> medium", () => {
    expect(canEscalate("low", "medium")).toBe(true);
  });

  it("allows low -> high", () => {
    expect(canEscalate("low", "high")).toBe(true);
  });

  it("allows medium -> high", () => {
    expect(canEscalate("medium", "high")).toBe(true);
  });

  it("rejects medium -> low", () => {
    expect(canEscalate("medium", "low")).toBe(false);
  });

  it("rejects high -> medium", () => {
    expect(canEscalate("high", "medium")).toBe(false);
  });

  it("rejects high -> low", () => {
    expect(canEscalate("high", "low")).toBe(false);
  });

  it("rejects same-level transitions", () => {
    expect(canEscalate("low", "low")).toBe(false);
    expect(canEscalate("medium", "medium")).toBe(false);
    expect(canEscalate("high", "high")).toBe(false);
  });
});
