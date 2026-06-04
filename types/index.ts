export type UserRole = 'admin' | 'staff';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
}

export interface AssetCategory {
  id: string;
  name: string;
  description: string | null;
}

export type AssetStatus = 'In Stock' | 'Assigned' | 'Repaired' | 'Discard' | 'Lost';

export interface Asset {
  id: string;
  asset_id: string;
  category_id: string;
  asset_name: string;
  brand: string | null;
  model_number: string | null;
  serial_number: string | null;
  purchase_date: string | null;
  purchase_price: number | null;
  asset_value: number | null;
  warranty_date: string | null;
  inspection_date: string | null;
  decommission_date: string | null;
  status: AssetStatus;
  notes: string | null;
  qr_code: string | null;
  depreciation_rate: number;
  current_value: number | null;
  photo_thumbnail_1: string | null;
  photo_thumbnail_2: string | null;
  photo_vertical_1: string | null;
  photo_vertical_2: string | null;
  photo_vertical_3: string | null;
  photo_vertical_4: string | null;
  created_at: string;
  asset_categories?: AssetCategory;
}

export interface StaffMember {
  id: string;
  user_id: string | null;
  staff_name: string;
  department: string;
  join_date: string;
  phone_number: string | null;
  email: string;
  is_active: boolean;
  created_at: string;
}

export type ConditionStatus = 'Good' | 'Pending' | 'Issue Found' | 'Damaged';

export interface Inspection {
  id: string;
  asset_id: string;
  staff_id: string;
  inspection_date: string;
  condition_status: ConditionStatus;
  notes: string | null;
  comments: string | null;
  photo_1: string | null;
  photo_2: string | null;
  photo_3: string | null;
  created_at: string;
  assets?: Asset;
  staff_members?: StaffMember;
}

export interface AssetAssignment {
  id: string;
  asset_id: string;
  staff_id: string;
  assignment_date: string;
  return_date: string | null;
  remarks: string | null;
  is_current: boolean;
  assets?: Asset;
  staff_members?: StaffMember;
}

export interface AssetHistory {
  id: string;
  asset_id: string;
  action: string;
  from_staff_id: string | null;
  to_staff_id: string | null;
  previous_status: string | null;
  new_status: string | null;
  notes: string | null;
  created_at: string;
  assets?: Asset;
}

export type NotificationType =
  | 'info' | 'warning' | 'error' | 'success'
  | 'inspection_reminder' | 'warranty_alert';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  related_asset_id: string | null;
  created_at: string;
}

export interface DashboardStats {
  totalAssets: number;
  assignedAssets: number;
  inStockAssets: number;
  repairedAssets: number;
  discardAssets: number;
  totalStaff: number;
  activeStaff: number;
  inactiveStaff: number;
  totalAssetValue: number;
}
