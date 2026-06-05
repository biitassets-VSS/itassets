"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate, getStatusColor, capitalizeFirst } from '@/lib/utils'
import type { Asset } from '@/types'

interface AssetTableProps {
  assets?: Asset[]
  onEdit?: (asset: Asset) => void
  onDelete?: (assetId: string) => void
  onAssign?: (assetId: string) => void
}

export default function AssetTable({ assets = [], onEdit, onDelete, onAssign }: AssetTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Filter assets based on search term and status
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serial_number?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  if (!assets || assets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assets Found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first asset to the system.</p>
            <Button onClick={() => window.location.href = '/admin/assets/new'}>
              Add First Asset
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets ({assets.length})</CardTitle>
        
        {/* Search and Filter Controls */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="assigned">Assigned</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredAssets.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No assets match your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-900">Asset</th>
                  <th className="text-left p-4 font-medium text-gray-900">Category</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Value</th>
                  <th className="text-left p-4 font-medium text-gray-900">Assigned To</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-600">
                          {asset.brand} {asset.model}
                        </div>
                        {asset.serial_number && (
                          <div className="text-xs text-gray-500">
                            SN: {asset.serial_number}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary">
                        {capitalizeFirst(asset.category)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(asset.status)}>
                        {capitalizeFirst(asset.status)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {formatCurrency(asset.purchase_price)}
                      </div>
                      {asset.purchase_date && (
                        <div className="text-xs text-gray-500">
                          {formatDate(asset.purchase_date)}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {asset.assigned_to || 'Unassigned'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {onEdit && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(asset)}
                          >
                            Edit
                          </Button>
                        )}
                        {onAssign && asset.status === 'active' && (
                          <Button
                            size="sm"
                            onClick={() => onAssign(asset.id)}
                          >
                            Assign
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(asset.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}