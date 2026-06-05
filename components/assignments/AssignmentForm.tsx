'use client'

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
  assets: Asset[]
  staff: Staff[]
  onSubmit: (data: AssignmentFormData) => Promise<void>
  isLoading?: boolean
}

export function AssignmentForm({ assets, staff, onSubmit, isLoading = false }: AssignmentFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<AssignmentFormData>({
    asset_id: '',
    staff_id: '',
    assigned_date: new Date().toISOString().split('T')[0],
    expected_return_date: '',
    condition: 'good',
    notes: '',
  })

  const availableAssets = assets.filter(asset => asset.status === 'in_stock')
  const activeStaff = staff.filter(member => member.status === 'active')

  const handleInputChange = (field: keyof AssignmentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Assign Asset to Staff Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="asset_id">Select Asset *</Label>
            <Select value={formData.asset_id} onValueChange={(value) => handleInputChange('asset_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an available asset" />
              </SelectTrigger>
              <SelectContent>
                {availableAssets.map((asset) => (
                  <SelectItem key={asset.id} value={asset.id}>
                    {asset.asset_tag} - {asset.name} ({asset.category?.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="staff_id">Select Staff Member *</Label>
            <Select value={formData.staff_id} onValueChange={(value) => handleInputChange('staff_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a staff member" />
              </SelectTrigger>
              <SelectContent>
                {activeStaff.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name} ({member.emp_code}) - {member.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assigned_date">Assignment Date *</Label>
              <Input
                id="assigned_date"
                type="date"
                value={formData.assigned_date}
                onChange={(e) => handleInputChange('assigned_date', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="expected_return_date">Expected Return Date</Label>
              <Input
                id="expected_return_date"
                type="date"
                value={formData.expected_return_date}
                onChange={(e) => handleInputChange('expected_return_date', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="condition">Asset Condition *</Label>
            <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="needs_repair">Needs Repair</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              placeholder="Any additional notes about this assignment..."
            />
          </div>
          
          <div className="flex items-center space-x-4 pt-4">
            <Button type="submit" disabled={isLoading || !formData.asset_id || !formData.staff_id}>
              {isLoading ? 'Assigning...' : 'Assign Asset'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}