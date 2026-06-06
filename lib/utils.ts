import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "retired":
      return "bg-red-100 text-red-800 border-red-200"
    case "disposed":
      return "bg-red-100 text-red-800 border-red-200"
    case "lost":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-blue-100 text-blue-800 border-blue-200"
  }
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}
