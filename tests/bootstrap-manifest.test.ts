import { describe, expect, it } from "vitest";
import { checkManifestContract } from "@bmbos/application-contracts";
import { applicationManifest } from "../src/app/manifest";

describe("deterministic satellite bootstrap", () => {
  it("creates a valid BMBOS application manifest", () => {
    const result = checkManifestContract(applicationManifest);
    expect(result.ok).toBe(true);
  });
});
