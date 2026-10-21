import { describe, expect, it } from "vitest";
import { AssetService } from "../src/services/asset-service";

describe("AssetService", () => {
  it("creates deterministic sequential ids, trims names, and starts active", () => {
    const service = new AssetService();

    const first = service.create("  First asset  ");
    const second = service.create("Second asset");

    expect(first).toEqual({
      id: "asset-1",
      name: "First asset",
      status: "active",
    });
    expect(second).toEqual({
      id: "asset-2",
      name: "Second asset",
      status: "active",
    });
  });

  it("lists created assets without exposing mutable internal state", () => {
    const service = new AssetService();
    service.create("Original");

    const listed = service.list();
    expect(listed).toEqual([
      { id: "asset-1", name: "Original", status: "active" },
    ]);

    (listed[0] as { name: string }).name = "Mutated externally";

    expect(service.list()).toEqual([
      { id: "asset-1", name: "Original", status: "active" },
    ]);
  });

  it("allows transitions permitted by the shared domain rule", () => {
    const service = new AssetService();
    const asset = service.create("Server");

    const updated = service.transition(asset.id, "inactive");

    expect(updated.status).toBe("inactive");
    expect(service.list()[0]?.status).toBe("inactive");
  });

  it("rejects disallowed transitions", () => {
    const service = new AssetService();
    const asset = service.create("Server");
    service.transition(asset.id, "retired");

    expect(() => service.transition(asset.id, "active")).toThrow(
      "Transition from retired to active is not allowed"
    );
  });

  it("rejects transitions for unknown asset ids", () => {
    const service = new AssetService();

    expect(() => service.transition("asset-999", "inactive")).toThrow(
      "Unknown asset id: asset-999"
    );
  });

  it("rejects empty asset names", () => {
    const service = new AssetService();

    expect(() => service.create("   ")).toThrow("Asset name must not be empty");
  });
});
