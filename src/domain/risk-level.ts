export type RiskLevel = "low" | "medium" | "high";

export function canEscalate(from: RiskLevel, to: RiskLevel): boolean {
  if (from === to) {
    return false;
  }
  const order: Record<RiskLevel, number> = {
    low: 1,
    medium: 2,
    high: 3,
  };
  return order[from] < order[to];
}
