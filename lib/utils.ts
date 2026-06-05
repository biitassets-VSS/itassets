import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function getStatusColor(status: string): string {
  const colors = {
    'in_stock': 'bg-green-100 text-green-800',
    'assigned': 'bg-blue-100 text-blue-800',
    'repair': 'bg-yellow-100 text-yellow-800',
    'disposed': 'bg-red-100 text-red-800',
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'excellent': 'bg-green-100 text-green-800',
    'good': 'bg-blue-100 text-blue-800',
    'fair': 'bg-yellow-100 text-yellow-800',
    'damaged': 'bg-red-100 text-red-800',
    'needs_repair': 'bg-orange-100 text-orange-800',
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

export function getNotificationColor(type: string): string {
  const colors = {
    'info': 'bg-blue-50 border-blue-200',
    'warning': 'bg-yellow-50 border-yellow-200',
    'critical': 'bg-red-50 border-red-200',
    'success': 'bg-green-50 border-green-200',
  }
  return colors[type as keyof typeof colors] || 'bg-gray-50 border-gray-200'
}

export function daysSinceInspection(date: string): number {
  const inspectionDate = new Date(date)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - inspectionDate.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
