"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getStatusColor, formatCurrency } from '@/lib/utils'
import type { Asset } from '@/types'

interface AssetListProps {
  assets?: Asset[]
  onEdit?: (asset: Asset) => void
}

export default function AssetList({ assets = [], onEdit }: AssetListProps) {
  if (assets.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No assets found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {assets.map((asset) => (
        <Card key={asset.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                <p className="text-sm text-gray-600">{asset.brand} {asset.model}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(asset.status)}>{asset.status}</Badge>
                  <span className="text-sm text-gray-500">{formatCurrency(asset.purchase_price ?? 0)}</span>
                </div>
              </div>
              {onEdit && (
                <Button variant="outline" size="sm" onClick={() => onEdit(asset)}>
                  Edit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
