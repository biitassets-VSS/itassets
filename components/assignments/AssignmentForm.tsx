"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { AssignmentFormData, Asset, Staff } from '@/types'

interface AssignmentFormProps {
  assets?: Asset[]
  staff?: Staff[]
  onSubmit?: (data: AssignmentFormData) => void
  initialData?: Partial<AssignmentFormData>
}

export default function AssignmentForm({ 
  assets = [], 
  staff = [], 
  onSubmit,
  initialData = {} 
}: AssignmentFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<AssignmentFormData>({
    asset_id: initialData.asset_id || '',
    staff_id: initialData.staff_id || '',
    assigned_date: initialData.assigned_date || new Date().toISOString().split('T')[0],
    return_date: initialData.return_date || '',
    status: initialData.status || 'active',
    notes: initialData.notes || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.asset_id || !formData.staff_id) {
      alert('Please select both an asset and a staff member.')
      return
    }

    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log('Assignment form submitted:', formData)
      alert('Assignment created successfully!')
      router.push('/admin-dashboard')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: keyof AssignmentFormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const selectedAsset = assets.find(asset => asset.id === formData.asset_id)
  const selectedStaff = staff.find(member => member.id === formData.staff_id)

  // Filter available assets (only active and unassigned)
  const availableAssets = assets.filter(asset => 
    asset.status === 'active' || asset.id === formData.asset_id
  )

  // Filter available staff (only active)
  const availableStaff = staff.filter(member => member.status === 'active')

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>
              {initialData.asset_id ? 'Edit Assignment' : 'Create New Assignment'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Asset Selection */}
              <div>
                <Label htmlFor="asset_id">Select Asset *</Label>
                <Select
                  value={formData.asset_id}
                  onValueChange={handleSelectChange('asset_id')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an asset..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAssets.length === 0 ? (
                      <div className="p-3 text-gray-500 text-sm">
                        No available assets found
                      </div>
                    ) : (
                      availableAssets.map((asset) => (
                        <SelectItem key={asset.id} value={asset.id}>
                          <div>
                            <div className="font-medium">{asset.name}</div>
                            <div className="text-sm text-gray-500">
                              {asset.brand} {asset.model} • {asset.category}
                            </div>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                
                {selectedAsset && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-md">
                    <div className="text-sm">
                      <strong>Selected Asset:</strong> {selectedAsset.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedAsset.brand} {selectedAsset.model} • SN: {selectedAsset.serial_number}
                    </div>
                  </div>
                )}
              </div>

              {/* Staff Selection */}
              <div>
                <Label htmlFor="staff_id">Assign to Staff Member *</Label>
                <Select
                  value={formData.staff_id}
                  onValueChange={handleSelectChange('staff_id')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a staff member..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStaff.length === 0 ? (
                      <div className="p-3 text-gray-500 text-sm">
                        No active staff members found
                      </div>
                    ) : (
                      availableStaff.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500">
                              {member.department} • {member.position}
                            </div>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                
                {selectedStaff && (
                  <div className="mt-2 p-3 bg-green-50 rounded-md">
                    <div className="text-sm">
                      <strong>Selected Staff:</strong> {selectedStaff.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedStaff.department} • {selectedStaff.position}
                    </div>
                  </div>
                )}
              </div>

              {/* Assignment Date */}
              <div>
                <Label htmlFor="assigned_date">Assignment Date *</Label>
                <Input
                  id="assigned_date"
                  name="assigned_date"
                  type="date"
                  value={formData.assigned_date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Return Date (Optional) */}
              <div>
                <Label htmlFor="return_date">Expected Return Date</Label>
                <Input
                  id="return_date"
                  name="return_date"
                  type="date"
                  value={formData.return_date}
                  onChange={handleInputChange}
                />
              </div>

              {/* Status */}
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleSelectChange('status')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any additional notes about this assignment..."
                  rows={3}
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  {initialData.asset_id ? 'Update Assignment' : 'Create Assignment'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin-dashboard')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}