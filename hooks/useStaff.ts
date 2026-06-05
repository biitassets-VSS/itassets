'use client'

import { useState, useEffect } from 'react'
import type { Staff } from '@/types'

export function useStaff() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff')
      if (!response.ok) {
        throw new Error('Failed to fetch staff')
      }
      const data = await response.json()
      setStaff(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createStaff = async (staffData: any) => {
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create staff member')
      }
      
      const newStaff = await response.json()
      setStaff(prev => [newStaff, ...prev])
      return newStaff
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const updateStaff = async (id: string, updates: any) => {
    try {
      const response = await fetch('/api/staff', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update staff member')
      }
      
      const updatedStaff = await response.json()
      setStaff(prev => prev.map(member => 
        member.id === id ? updatedStaff : member
      ))
      return updatedStaff
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const toggleStaffStatus = async (id: string, status: 'active' | 'inactive') => {
    return updateStaff(id, { status })
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  return {
    staff,
    isLoading,
    error,
    fetchStaff,
    createStaff,
    updateStaff,
    toggleStaffStatus,
  }
}