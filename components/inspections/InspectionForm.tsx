'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Upload, X } from 'lucide-react'
import type { InspectionFormData, Asset } from '@/types'

interface InspectionFormProps {
  asset: Asset
  onSubmit: (data: InspectionFormData) => Promise<void>
  isLoading?: boolean
}

export function InspectionForm({ asset, onSubmit, isLoading = false }: InspectionFormProps) {
  const [formData, setFormData] = useState<InspectionFormData>({
    asset_id: asset.id,
    condition: 'good',
    working_status: true,
    location: '',
    notes: '',
    photos: [],
  })
  
  const [photoPreview, setPhotoPreview] = useState<string[]>([])

  const handleInputChange = (field: keyof InspectionFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        photos: [...(prev.photos || []), ...files] 
      }))
      
      files.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPhotoPreview(prev => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos?.filter((_, i) => i !== index) || []
    }))
    setPhotoPreview(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Weekly Asset Inspection</CardTitle>
        <div className="text-sm text-muted-foreground">
          Asset: {asset.name} ({asset.asset_tag})
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Asset Condition Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="condition">Current Asset Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent - Like new condition</SelectItem>
                    <SelectItem value="good">Good - Minor wear and tear</SelectItem>
                    <SelectItem value="fair">Fair - Noticeable wear but functional</SelectItem>
                    <SelectItem value="damaged">Damaged - Requires immediate attention</SelectItem>
                    <SelectItem value="needs_repair">Needs Repair - Not functioning properly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="working_status"
                  checked={formData.working_status}
                  onCheckedChange={(checked) => handleInputChange('working_status', checked)}
                />
                <Label htmlFor="working_status">Asset is working properly</Label>
              </div>
              
              <div>
                <Label htmlFor="location">Current Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Office desk, Home office, Conference room"
                  required
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Asset Photos</CardTitle>
              <p className="text-sm text-muted-foreground">
                Upload up to 5 current photos of the asset
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('photos')?.click()}
                    disabled={photoPreview.length >= 5}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos ({photoPreview.length}/5)
                  </Button>
                </div>
                
                {photoPreview.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photoPreview.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Inspection photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={4}
              placeholder="Any issues, observations, or maintenance requirements..."
            />
          </div>
          
          <div className="flex items-center space-x-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Inspection'}
            </Button>
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}