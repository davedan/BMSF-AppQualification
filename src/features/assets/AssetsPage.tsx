import { useState } from "react";
import type { Asset } from "../../domain/asset";
import type { AssetStatus } from "../../domain/asset-status";
import { AssetService } from "../../services/asset-service";
import { AssetForm } from "./AssetForm";
import { AssetList } from "./AssetList";

export function AssetsPage() {
  const [service] = useState(() => new AssetService());
  const [assets, setAssets] = useState<readonly Asset[]>(() => service.list());

  function handleCreate(name: string) {
    service.create(name);
    setAssets(service.list());
  }

  function handleTransition(id: string, to: AssetStatus) {
    service.transition(id, to);
    setAssets(service.list());
  }

  return (
    <main>
      <h1>Asset Registry</h1>
      <AssetForm onCreate={handleCreate} />
      <AssetList assets={assets} onTransition={handleTransition} />
    </main>
  );
}
