'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, Edit, Trash2, QrCode, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import type { Asset } from '@/types'

interface AssetTableProps {
  assets: Asset[]
  onDelete?: (id: string) => void
}

export function AssetTable({ assets, onDelete }: AssetTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.asset_tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.model?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || asset.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Assets</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-input rounded-md bg-background"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="assigned">Assigned</option>
              <option value="repair">Repair</option>
              <option value="disposed">Disposed</option>
            </select>
            <Link href="/admin/assets/add">
              <Button>Add Asset</Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Asset Tag</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Brand</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Current Holder</th>
                <th className="text-left p-2">Purchase Price</th>
                <th className="text-left p-2">Purchase Date</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-mono">{asset.asset_tag}</td>
                  <td className="p-2 font-medium">{asset.name}</td>
                  <td className="p-2">{asset.category?.name}</td>
                  <td className="p-2">{asset.brand}</td>
                  <td className="p-2">
                    <Badge className={getStatusColor(asset.status)}>
                      {asset.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-2">{asset.holder?.name || '-'}</td>
                  <td className="p-2">
                    {asset.purchase_price ? formatCurrency(asset.purchase_price) : '-'}
                  </td>
                  <td className="p-2">
                    {asset.purchase_date ? formatDate(asset.purchase_date) : '-'}
                  </td>
                  <td className="p-2">
                    <div className="flex items-center space-x-1">
                      <Link href={`/admin/assets/${asset.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/assets/${asset.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <QrCode className="h-4 w-4" />
                      </Button>
                      {onDelete && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => onDelete(asset.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAssets.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No assets found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}