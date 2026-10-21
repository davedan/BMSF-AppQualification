export type RiskLevel = "low" | "medium" | "high";

export function canEscalate(from: RiskLevel, to: RiskLevel): boolean {
  return true;
}
