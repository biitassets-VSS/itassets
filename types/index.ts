export interface Asset {
  id: string
  asset_tag: string
  name: string
  category_id: string
  brand?: string
  model?: string
  serial_number?: string
  purchase_price?: number
  purchase_date?: string
  invoice_number?: string
  vendor_name?: string
  warranty_start_date?: string
  warranty_end_date?: string
  status: 'in_stock' | 'assigned' | 'repair' | 'disposed'
  current_holder?: string
  notes?: string
  created_at: string
  updated_at: string
  category?: AssetCategory
  holder?: Staff
}

export interface AssetCategory {
  id: string
  name: string
  prefix: string
  created_at: string
}

export interface Staff {
  id: string
  profile_id?: string
  emp_code: string
  name: string
  department: string
  contact_number: string
  email: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface Assignment {
  id: string
  asset_id: string
  staff_id: string
  assigned_date: string
  returned_date?: string
  expected_return_date?: string
  condition: string
  notes?: string
  created_at: string
  asset?: Asset
  staff?: Staff
}

export interface Inspection {
  id: string
  asset_id: string
  staff_id: string
  inspection_date: string
  condition: string
  working_status: boolean
  location: string
  notes?: string
  created_at: string
  asset?: Asset
  staff?: Staff
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'critical' | 'success'
  target_user_id?: string
  target_role?: 'admin' | 'staff'
  is_read: boolean
  created_at: string
}

export interface DashboardStats {
  totalAssets: number
  assignedAssets: number
  inStockAssets: number
  repairAssets: number
  disposedAssets: number
  totalAssetValue: number
  pendingInspections: number
  completedInspections: number
  staffMembers: number
}

export interface AssetFormData {
  name: string
  category_id: string
  brand?: string
  model?: string
  serial_number?: string
  purchase_price?: number
  purchase_date?: string
  invoice_number?: string
  vendor_name?: string
  warranty_start_date?: string
  warranty_end_date?: string
  notes?: string
  photos?: File[]
}

export interface StaffFormData {
  emp_code: string
  name: string
  department: string
  contact_number: string
  email: string
  status: 'active' | 'inactive'
  password?: string
}

export interface AssignmentFormData {
  asset_id: string
  staff_id: string
  assigned_date: string
  expected_return_date?: string
  condition: string
  notes?: string
}

export interface InspectionFormData {
  asset_id: string
  condition: string
  working_status: boolean
  location: string
  notes?: string
  photos?: File[]
}
