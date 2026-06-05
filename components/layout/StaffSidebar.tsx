'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ClipboardCheck,
  LogOut,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/staff/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'My Assets',
    href: '/staff/my-assets',
    icon: Package,
  },
  {
    title: 'Inspections',
    href: '/staff/inspections',
    icon: ClipboardCheck,
  },
]

interface StaffSidebarProps {
  className?: string
}

export function StaffSidebar({ className }: StaffSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn('pb-12 min-h-screen', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-6">
            <Link href="/staff/dashboard" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Virtual Staffing</h2>
                <p className="text-xs text-muted-foreground">IT Assets Management</p>
              </div>
            </Link>
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    pathname === item.href && 'bg-secondary'
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-3 right-3">
        <Button variant="outline" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start mt-2 text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}