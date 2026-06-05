export type UserRole = 'admin' | 'staff'
export type AssetStatus = 'in_stock' | 'assigned' | 'repair' | 'disposed'
export type AssetCondition = 'excellent' | 'good' | 'fair' | 'needs_repair' | 'damaged'
export type NotificationType = 'critical' | 'warning' | 'info' | 'success'
export type RepairStatus = 'pending' | 'in_progress' | 'completed'
export type StaffStatus = 'active' | 'inactive'

export interface Profile {
  id: string
  role: UserRole
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface Staff {
  id: string
  profile_id: string
  emp_code: string
  name: string
  department: string
  contact_number: string
  email: string
  status: StaffStatus
  created_at: string
  updated_at: string
  profile?: Profile
}

export interface AssetCategory {
  id: string
  name: string
  description?: string
  created_at: string
}

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
  status: AssetStatus
  current_holder?: string
  photo_urls?: string[]
  qr_code?: string
  notes?: string
  created_at: string
  updated_at: string
  category?: AssetCategory
  holder?: Staff
}

export interface AssetAssignment {
  id: string
  asset_id: string
  staff_id: string
  assigned_date: string
  expected_return_date?: string
  returned_date?: string
  condition: AssetCondition
  notes?: string
  created_at: string
  asset?: Asset
  staff?: Staff
}

export interface AssetHistory {
  id: string
  asset_id: string
  staff_id?: string
  action_type: string
  action_date: string
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
  condition: AssetCondition
  working_status: boolean
  location?: string
  notes?: string
  photo_urls?: string[]
  created_at: string
  asset?: Asset
  staff?: Staff
}

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  target_role?: UserRole
  target_user_id?: string
  is_read: boolean
  created_at: string
}

export interface Repair {
  id: string
  asset_id: string
  reported_by: string
  repair_status: RepairStatus
  cost?: number
  notes?: string
  created_at: string
  completed_at?: string
  asset?: Asset
  reporter?: Staff
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

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface AssignmentFormData {
  asset_id: string
  staff_id: string
  assigned_date: string
  expected_return_date?: string
  condition: AssetCondition
  notes?: string
}

export interface InspectionFormData {
  asset_id: string
  condition: AssetCondition
  working_status: boolean
  location?: string
  notes?: string
  photos?: File[]
}

export interface StaffFormData {
  emp_code: string
  name: string
  department: string
  contact_number: string
  email: string
  status: StaffStatus
  password?: string
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