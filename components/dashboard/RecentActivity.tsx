"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate, getStatusColor } from '@/lib/utils'

interface Activity {
  id: string
  type: 'assignment' | 'return' | 'maintenance' | 'purchase'
  asset_name: string
  description: string
  timestamp: string
  status?: string
}

interface RecentActivityProps {
  activities?: Activity[]
}

export default function RecentActivity({ activities = [] }: RecentActivityProps) {
  const defaultActivities: Activity[] = [
    {
      id: '1', type: 'assignment', asset_name: 'MacBook Pro 16"',
      description: 'Assigned to John Doe', timestamp: '2023-12-01T10:30:00Z'
    },
    {
      id: '2', type: 'maintenance', asset_name: 'HP LaserJet Printer',
      description: 'Scheduled for maintenance', timestamp: '2023-12-01T09:15:00Z', status: 'maintenance'
    },
    {
      id: '3', type: 'purchase', asset_name: 'Dell Monitor 27"',
      description: 'New asset purchased', timestamp: '2023-11-30T16:45:00Z', status: 'active'
    },
    {
      id: '4', type: 'return', asset_name: 'iPhone 15 Pro',
      description: 'Returned by Jane Smith', timestamp: '2023-11-30T14:20:00Z'
    },
  ]

  const displayActivities = activities.length > 0 ? activities : defaultActivities

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'assignment': return '👤'
      case 'return': return '↩️'
      case 'maintenance': return '🔧'
      case 'purchase': return '🛒'
      default: return '📝'
    }
  }

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'assignment': return 'text-blue-600'
      case 'return': return 'text-green-600'
      case 'maintenance': return 'text-yellow-600'
      case 'purchase': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {displayActivities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📋</div>
            <p>No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="text-xl">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 truncate">{activity.asset_name}</p>
                    {activity.status && (
                      <Badge className={getStatusColor(activity.status)} variant="secondary">
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                  <p className="text-xs text-gray-400">{formatDate(activity.timestamp)}</p>
                </div>
                <div className={`text-sm font-medium ${getActivityColor(activity.type)}`}>
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}