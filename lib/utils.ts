// lib/utils.ts
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

export function getNotificationColor(type: string): string {
  switch (type?.toLowerCase()) {
    case "success":
      return "bg-green-50 text-green-800 border-green-200"
    case "warning":
      return "bg-yellow-50 text-yellow-800 border-yellow-200"
    case "error":
      return "bg-red-50 text-red-800 border-red-200"
    case "info":
    default:
      return "bg-blue-50 text-blue-800 border-blue-200"
  }
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A"
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateString))
  } catch {
    return "Invalid Date"
  }
}

export function capitalizeFirst(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function formatCurrency(amount: number | undefined | null): string {
  if (amount === undefined || amount === null) return 'N/A'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount)
}
