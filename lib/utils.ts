import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-success-100 text-success-800',
    inactive: 'bg-gray-100 text-gray-800',
    assigned: 'bg-blue-100 text-blue-800',
    in_stock: 'bg-success-100 text-success-800',
    repair: 'bg-warning-100 text-warning-800',
    disposed: 'bg-danger-100 text-danger-800',
    excellent: 'bg-success-100 text-success-800',
    good: 'bg-blue-100 text-blue-800',
    fair: 'bg-warning-100 text-warning-800',
    needs_repair: 'bg-danger-100 text-danger-800',
    damaged: 'bg-red-100 text-red-800',
    pending: 'bg-warning-100 text-warning-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-success-100 text-success-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function getNotificationColor(type: string): string {
  const colors: Record<string, string> = {
    critical: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  }
  return colors[type] || 'bg-gray-50 border-gray-200 text-gray-800'
}

export function generateAssetTag(categoryName: string, counter: number): string {
  const categoryCode = categoryName.substring(0, 3).toUpperCase()
  return `VSS-${categoryCode}-${counter.toString().padStart(3, '0')}`
}

export function isWarrantyExpired(endDate: string): boolean {
  return new Date(endDate) < new Date()
}

export function isWarrantyExpiringSoon(endDate: string, days: number = 30): boolean {
  const expiryDate = new Date(endDate)
  const soonDate = new Date()
  soonDate.setDate(soonDate.getDate() + days)
  return expiryDate <= soonDate && expiryDate >= new Date()
}

export function isInspectionDue(lastInspectionDate: string | null): boolean {
  if (!lastInspectionDate) return true
  const lastDate = new Date(lastInspectionDate)
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() - 7) // 7 days ago
  return lastDate <= dueDate
}

export function daysSinceInspection(lastInspectionDate: string | null): number {
  if (!lastInspectionDate) return 999
  const lastDate = new Date(lastInspectionDate)
  const today = new Date()
  const diffTime = today.getTime() - lastDate.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s-()]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function downloadFile(data: Blob, filename: string): void {
  const url = URL.createObjectURL(data)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function uploadToSupabase(file: File, bucket: string, path: string) {
  // This will be implemented with Supabase client
  return Promise.resolve(`${bucket}/${path}`)
}