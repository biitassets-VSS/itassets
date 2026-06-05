export interface Asset {
  id: string
  name: string
  category: string
  brand?: string
  model?: string
  serial_number?: string
  purchase_price?: number
  purchase_date?: string
  status: 'active' | 'inactive' | 'assigned' | 'maintenance' | 'retired'
  assigned_to?: string
  location?: string
  warranty_expiry?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Staff {
  id: string
  name: string
  email: string
  department?: string
  position?: string
  phone?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface Inspection {
  id: string
  asset_id: string
  staff_id: string
  inspection_date: string
  status: 'pending' | 'completed' | 'failed'
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  notes?: string
  next_inspection_date?: string
  created_at: string
  updated_at: string
}

export interface Assignment {
  id: string
  asset_id: string
  staff_id: string
  assigned_date: string
  return_date?: string
  status: 'active' | 'returned'
  notes?: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  read: boolean
  created_at: string
}