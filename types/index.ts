// types/index.ts

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
  emp_code: string
  contact_number: string
  department: string
  position?: string
  phone?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface StaffFormData {
  emp_code: string
  name: string
  department: string
  contact_number: string
  email: string
  status: 'active' | 'inactive'
  password: string
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

export interface AssignmentFormData {
  asset_id: string
  staff_id: string
  assigned_date: string
  return_date?: string
  status: 'active' | 'returned'
  notes?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  is_read: boolean
  created_at: string
}

export interface User {
  id: string
  email: string
  role: 'admin' | 'staff'
  name?: string
  created_at: string
  updated_at: string
}

export interface InspectionFormData {
  asset_id: string
  inspection_date: string
  inspector_name: string
  status: string
  condition: string
  working_status: boolean
  location: string
  notes?: string
  findings?: string
  recommendations?: string
  next_inspection_date?: string
  photos?: File[]
  images?: File[]
}
