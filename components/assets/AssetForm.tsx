'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Upload, X } from 'lucide-react'
import type { AssetFormData, AssetCategory, Asset } from '@/types'

interface AssetFormProps {
  asset?: Asset
  categories: AssetCategory[]
  onSubmit: (data: AssetFormData) => Promise<void>
  isLoading?: boolean
}

export function AssetForm({ asset, categories, onSubmit, isLoading = false }: AssetFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<AssetFormData>({
    name: asset?.name || '',
    category_id: asset?.category_id || '',
    brand: asset?.brand || '',
    model: asset?.model || '',
    serial_number: asset?.serial_number || '',
    purchase_price: asset?.purchase_price || undefined,
    purchase_date: asset?.purchase_date || '',
    invoice_number: asset?.invoice_number || '',
    vendor_name: asset?.vendor_name || '',
    warranty_start_date: asset?.warranty_start_date || '',
    warranty_end_date: asset?.warranty_end_date || '',
    notes: asset?.notes || '',
    photos: [],
  })
  
  const [photoPreview, setPhotoPreview] = useState<string[]>([])

  const handleInputChange = (field: keyof AssetFormData, value: any) => {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Asset Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Asset Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => handleInputChange('brand', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="serial_number">Serial Number</Label>
            <Input
              id="serial_number"
              value={formData.serial_number}
              onChange={(e) => handleInputChange('serial_number', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="purchase_date">Purchase Date</Label>
            <Input
              id="purchase_date"
              type="date"
              value={formData.purchase_date}
              onChange={(e) => handleInputChange('purchase_date', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="purchase_price">Purchase Price (₹)</Label>
            <Input
              id="purchase_price"
              type="number"
              value={formData.purchase_price || ''}
              onChange={(e) => handleInputChange('purchase_price', parseFloat(e.target.value))}
            />
          </div>
          
          <div>
            <Label htmlFor="invoice_number">Invoice Number</Label>
            <Input
              id="invoice_number"
              value={formData.invoice_number}
              onChange={(e) => handleInputChange('invoice_number', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="vendor_name">Vendor Name</Label>
            <Input
              id="vendor_name"
              value={formData.vendor_name}
              onChange={(e) => handleInputChange('vendor_name', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Warranty Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="warranty_start_date">Warranty Start Date</Label>
            <Input
              id="warranty_start_date"
              type="date"
              value={formData.warranty_start_date}
              onChange={(e) => handleInputChange('warranty_start_date', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="warranty_end_date">Warranty End Date</Label>
            <Input
              id="warranty_end_date"
              type="date"
              value={formData.warranty_end_date}
              onChange={(e) => handleInputChange('warranty_end_date', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Asset Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="photos">Upload Photos</Label>
              <div className="flex items-center space-x-2">
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
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photos
                </Button>
              </div>
            </div>
            
            {photoPreview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photoPreview.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
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

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center space-x-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : asset ? 'Update Asset' : 'Create Asset'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}