"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

interface StatsCardsProps {
  stats?: {
    total: number
    assigned: number
    available: number
    maintenance: number
    totalValue: number
  }
}

export default function StatsCards({ stats }: StatsCardsProps) {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const cards = [
    { title: 'Total Assets', value: stats.total, color: 'text-blue-600', icon: '📊' },
    { title: 'Assigned', value: stats.assigned, color: 'text-green-600', icon: '✅' },
    { title: 'Available', value: stats.available, color: 'text-yellow-600', icon: '📦' },
    { title: 'Maintenance', value: stats.maintenance, color: 'text-red-600', icon: '🔧' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
              </div>
              <div className="text-2xl">{card.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(stats.totalValue)}</p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}