'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, Edit, Search, UserCheck, UserX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getStatusColor, formatDate } from '@/lib/utils'
import type { Staff } from '@/types'

interface StaffTableProps {
  staff: Staff[]
  onStatusChange?: (id: string, status: 'active' | 'inactive') => void
}

export function StaffTable({ staff, onStatusChange }: StaffTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.emp_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || member.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const toggleStatus = async (member: Staff) => {
    const newStatus = member.status === 'active' ? 'inactive' : 'active'
    if (onStatusChange) {
      await onStatusChange(member.id, newStatus)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Staff Members</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Link href="/admin/staff/add">
              <Button>Add Staff Member</Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Employee Code</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Contact</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Joined Date</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((member) => (
                <tr key={member.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-mono">{member.emp_code}</td>
                  <td className="p-2 font-medium">{member.name}</td>
                  <td className="p-2">{member.department}</td>
                  <td className="p-2">{member.email}</td>
                  <td className="p-2">{member.contact_number}</td>
                  <td className="p-2">
                    <Badge className={getStatusColor(member.status)}>
                      {member.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-2">{formatDate(member.created_at)}</td>
                  <td className="p-2">
                    <div className="flex items-center space-x-1">
                      <Link href={`/admin/staff/${member.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/staff/${member.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleStatus(member)}
                        className={member.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                      >
                        {member.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStaff.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No staff members found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}