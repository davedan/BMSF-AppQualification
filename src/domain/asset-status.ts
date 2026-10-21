export type AssetStatus =
  | "active"
  | "inactive"
  | "retired";

/**
 * Determine whether an AssetStatus can transition from one state to another.
 *
 * Allowed transitions:
 * - active -> inactive
 * - active -> retired
 * - inactive -> active
 * - inactive -> retired
 *
 * All other transitions are disallowed.
 */
export function canTransition(
  from: AssetStatus,
  to: AssetStatus
): boolean {
  if (from === to) return false;
  if (from === "active") {
    return to === "inactive" || to === "retired";
  }
  if (from === "inactive") {
    return to === "active" || to === "retired";
  }
  // retired cannot transition anywhere
  return false;
}
