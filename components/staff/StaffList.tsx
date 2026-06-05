"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getStatusColor } from '@/lib/utils'
import type { Staff } from '@/types'

interface StaffListProps {
  staff?: Staff[]
  onEdit?: (staff: Staff) => void
}

export default function StaffList({ staff = [], onEdit }: StaffListProps) {
  if (staff.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No staff members found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {staff.map((member) => (
        <Card key={member.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                  {member.department && <span className="text-sm text-gray-500">{member.department}</span>}
                </div>
              </div>
              {onEdit && (
                <Button variant="outline" size="sm" onClick={() => onEdit(member)}>
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