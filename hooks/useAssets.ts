'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Asset } from '@/types'

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAssets = async () => {
    try {
      const response = await fetch('/api/assets')
      if (!response.ok) {
        throw new Error('Failed to fetch assets')
      }
      const data = await response.json()
      setAssets(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createAsset = async (assetData: any) => {
    try {
      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assetData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create asset')
      }
      
      const newAsset = await response.json()
      setAssets(prev => [newAsset, ...prev])
      return newAsset
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const updateAsset = async (id: string, updates: any) => {
    try {
      const response = await fetch('/api/assets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update asset')
      }
      
      const updatedAsset = await response.json()
      setAssets(prev => prev.map(asset => 
        asset.id === id ? updatedAsset : asset
      ))
      return updatedAsset
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const deleteAsset = async (id: string) => {
    try {
      const response = await fetch(`/api/assets/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete asset')
      }
      
      setAssets(prev => prev.filter(asset => asset.id !== id))
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  useEffect(() => {
    fetchAssets()
  }, [])

  return {
    assets,
    isLoading,
    error,
    fetchAssets,
    createAsset,
    updateAsset,
    deleteAsset,
  }
}