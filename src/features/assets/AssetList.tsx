import type { Asset } from "../../domain/asset";
import { canTransition, type AssetStatus } from "../../domain/asset-status";

interface AssetListProps {
  assets: readonly Asset[];
  onTransition: (id: string, to: AssetStatus) => void;
}

const ASSET_STATUSES: readonly AssetStatus[] = [
  "active",
  "inactive",
  "retired",
];

export function AssetList({ assets, onTransition }: AssetListProps) {
  if (assets.length === 0) {
    return <p>No assets</p>;
  }

  return (
    <ul>
      {assets.map((asset) => {
        const allowedNextStates = ASSET_STATUSES.filter((status) =>
          canTransition(asset.status, status)
        );

        return (
          <li key={asset.id}>
            <span>{asset.name}</span>{" "}
            <span>{asset.status}</span>
            {allowedNextStates.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onTransition(asset.id, status)}
              >
                Move to {status}
              </button>
            ))}
          </li>
        );
      })}
    </ul>
  );
}
