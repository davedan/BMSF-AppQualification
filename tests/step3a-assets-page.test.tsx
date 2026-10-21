import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AssetsPage } from "../src/features/assets/AssetsPage";

describe("AssetsPage", () => {
  it("renders the initial Asset Registry UI", () => {
    const output = renderToStaticMarkup(<AssetsPage />);

    expect(output).toContain("Asset Registry");
    expect(output).toContain('name="asset-name"');
    expect(output).toContain("Add Asset");
    expect(output).toContain("No assets");
  });
});
