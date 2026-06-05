"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useMemo } from 'react'

interface AssetsByCategoryProps {
  data?: Array<{ name: string; value: number; color?: string }>
}

const defaultColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'
]

export default function AssetsByCategory({ data = [] }: AssetsByCategoryProps) {
  const chartData = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    if (total === 0) return []
    
    let currentAngle = 0
    return data.map((item, index) => {
      const percentage = (item.value / total) * 100
      const angle = (item.value / total) * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      currentAngle += angle
      
      return {
        ...item,
        percentage,
        startAngle,
        endAngle,
        color: item.color || defaultColors[index % defaultColors.length]
      }
    })
  }, [data])

  const total = data.reduce((sum, item) => sum + item.value, 0)

  if (data.length === 0 || total === 0) {
    return (
      <Card>
        <CardHeader><CardTitle>Assets by Category</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p>No asset data available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const createPath = (startAngle: number, endAngle: number, radius: number = 80) => {
    const centerX = 120, centerY = 120
    const startAngleRad = (startAngle - 90) * (Math.PI / 180)
    const endAngleRad = (endAngle - 90) * (Math.PI / 180)
    const x1 = centerX + radius * Math.cos(startAngleRad)
    const y1 = centerY + radius * Math.sin(startAngleRad)
    const x2 = centerX + radius * Math.cos(endAngleRad)
    const y2 = centerY + radius * Math.sin(endAngleRad)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    
    return ["M", centerX, centerY, "L", x1, y1, "A", radius, radius, 0, largeArcFlag, 1, x2, y2, "Z"].join(" ")
  }

  return (
    <Card>
      <CardHeader><CardTitle>Assets by Category</CardTitle></CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          <div className="flex-shrink-0">
            <svg width="240" height="240" viewBox="0 0 240 240">
              {chartData.map((item, index) => (
                <path
                  key={item.name}
                  d={createPath(item.startAngle, item.endAngle)}
                  fill={item.color}
                  stroke="white"
                  strokeWidth="2"
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
              <circle cx="120" cy="120" r="40" fill="white" stroke="#E5E7EB" strokeWidth="2" />
              <text x="120" y="115" textAnchor="middle" className="fill-gray-600 text-sm font-medium">Total</text>
              <text x="120" y="135" textAnchor="middle" className="fill-gray-900 text-xl font-bold">{total}</text>
            </svg>
          </div>
          <div className="flex-1 space-y-3">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.percentage.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{total}</div>
              <div className="text-sm text-gray-600">Total Assets</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{chartData.length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}