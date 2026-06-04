import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return '—';
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  } catch {
    return '—';
  }
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    'In Stock': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Assigned': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Repaired': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Discard': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Lost': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };
  return map[status] ?? 'bg-gray-100 text-gray-800';
}

export function getConditionColor(condition: string): string {
  const map: Record<string, string> = {
    'Good': 'bg-green-500',
    'Pending': 'bg-orange-500',
    'Issue Found': 'bg-red-500',
    'Damaged': 'bg-red-700',
  };
  return map[condition] ?? 'bg-gray-400';
}

export function getInspectionStatusColor(
  inspectionDate: string | null,
  conditionStatus: string | null
): string {
  if (!inspectionDate) return 'bg-gray-400';
  const today = new Date();
  const inspection = new Date(inspectionDate);
  if (conditionStatus === 'Good') return 'bg-green-500';
  if (conditionStatus === 'Pending') return 'bg-orange-500';
  if (conditionStatus === 'Issue Found' || conditionStatus === 'Damaged') {
    return 'bg-red-500';
  }
  if (inspection < today) return 'bg-gray-400';
  return 'bg-orange-500';
}

export function generateAssetQRData(assetId: string, assetName: string): string {
  return JSON.stringify({
    asset_id: assetId,
    name: assetName,
    system: 'Virtual Staffing Solution',
    timestamp: new Date().toISOString(),
  });
}

export function calculateDepreciation(
  purchasePrice: number,
  purchaseDate: string,
  depreciationRate: number = 20
) {
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
