'use client'

import { Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NotificationBell } from '@/components/notifications/NotificationBell'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

interface HeaderProps {
  title?: string
  userName?: string
}

export function Header({ title = 'Dashboard', userName = 'Admin User' }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8 w-64"
              />
            </div>
            
            {/* Notifications */}
            <NotificationBell />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* User Menu */}
            <Button variant="ghost" size="sm" className="relative">
              <User className="h-4 w-4 mr-2" />
              {userName}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}