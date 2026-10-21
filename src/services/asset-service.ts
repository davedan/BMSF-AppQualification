import { createAsset, type Asset } from "../domain/asset";
import { canTransition, type AssetStatus } from "../domain/asset-status";

function cloneAsset(asset: Asset): Asset {
  return { ...asset };
}

export class AssetService {
  private readonly assets: Asset[] = [];
  private nextId = 1;

  list(): readonly Asset[] {
    return this.assets.map(cloneAsset);
  }

  create(name: string): Asset {
    const asset = createAsset(`asset-${this.nextId}`, name);
    this.nextId += 1;
    this.assets.push(asset);
    return cloneAsset(asset);
  }

  transition(id: string, to: AssetStatus): Asset {
    const asset = this.assets.find((candidate) => candidate.id === id);

    if (!asset) {
      throw new Error(`Unknown asset id: ${id}`);
    }

    if (!canTransition(asset.status, to)) {
      throw new Error(`Transition from ${asset.status} to ${to} is not allowed`);
    }

    asset.status = to;
    return cloneAsset(asset);
  }
}
