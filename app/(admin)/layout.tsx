'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/layout/AdminSidebar'
import { Header } from '@/components/layout/Header'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        redirect('/auth/admin/login')
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, name')
        .eq('id', session.user.id)
        .single()

      if (profile?.role !== 'admin') {
        redirect('/auth/admin/login')
      }

      setUser({ ...session.user, name: profile.name })
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64">
        <Header userName={user?.name} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}