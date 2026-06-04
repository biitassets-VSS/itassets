export interface DepreciationResult {
  originalValue: number;
  currentValue: number;
  depreciatedAmount: number;
  depreciationPercentage: number;
  yearsOwned: number;
}

/**
 * Calculates asset depreciation using the Straight-Line method.
 */
export function calculateDepreciation(
  purchasePrice: number,
  purchaseDate: string,
  depreciationRate: number = 20
): DepreciationResult {
  const purchase = new Date(purchaseDate);
  const today = new Date();
  const yearsOwned =
    (today.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  const depreciatedAmount = Math.min(
    purchasePrice * (depreciationRate / 100) * yearsOwned,
    purchasePrice
  );
  const currentValue = Math.max(purchasePrice - depreciatedAmount, 0);
  const depreciationPercentage = (depreciatedAmount / purchasePrice) * 100;

  return {
    originalValue: purchasePrice,
    currentValue: Math.round(currentValue * 100) / 100,
    depreciatedAmount: Math.round(depreciatedAmount * 100) / 100,
    depreciationPercentage: Math.round(depreciationPercentage * 100) / 100,
    yearsOwned: Math.round(yearsOwned * 10) / 10,
  };
}

/**
 * Check if warranty is expiring within given days.
 */
export function isWarrantyExpiringSoon(
  warrantyDate: string | null,
  withinDays: number = 30
): boolean {
  if (!warrantyDate) return false;
  const warranty = new Date(warrantyDate);
  const threshold = new Date();
  threshold.setDate(threshold.getDate() + withinDays);
  return warranty <= threshold && warranty >= new Date();
}

/**
 * Check if inspection is due within given days.
 */
export function isInspectionDueSoon(
  inspectionDate: string | null,
  withinDays: number = 2
): boolean {
  if (!inspectionDate) return false;
  const inspection = new Date(inspectionDate);
  const threshold = new Date();
  threshold.setDate(threshold.getDate() + withinDays);
  return inspection <= threshold && inspection >= new Date();
}
