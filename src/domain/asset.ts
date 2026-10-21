import type { AssetStatus } from "./asset-status";

export interface Asset {
  id: string;
  name: string;
  status: AssetStatus;
}

export function createAsset(id: string, name: string): Asset {
  const normalizedId = id.trim();
  const normalizedName = name.trim();

  if (!normalizedId) {
    throw new Error("Asset id must not be empty");
  }

  if (!normalizedName) {
    throw new Error("Asset name must not be empty");
  }

  return {
    id: normalizedId,
    name: normalizedName,
    status: "active",
  };
}
