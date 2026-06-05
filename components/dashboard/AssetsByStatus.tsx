"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getStatusColor } from '@/lib/utils'

interface AssetsByStatusProps {
  data?: Array<{ name: string; value: number }>
}

export default function AssetsByStatus({ data = [] }: AssetsByStatusProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  if (data.length === 0 || total === 0) {
    return (
      <Card>
        <CardHeader><CardTitle>Assets by Status</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-gray-500">
            <p>No status data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader><CardTitle>Assets by Status</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0
            return (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(item.name.toLowerCase())}>{item.name}</Badge>
                  <div className="text-right">
                    <span className="font-semibold">{item.value}</span>
                    <span className="text-sm text-gray-500 ml-2">({percentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{total}</div>
            <div className="text-sm text-gray-600">Total Assets</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}