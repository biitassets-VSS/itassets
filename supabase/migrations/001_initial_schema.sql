-- ============================================================
-- IT Assets Management System - Complete Database Schema
-- Virtual Staffing Solution © AinodeArt 2026
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLE: profiles (extends Supabase Auth users)
-- ============================================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: asset_categories
-- ============================================================
CREATE TABLE public.asset_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.asset_categories (name) VALUES
  ('Laptop'),
  ('Keyboard'),
  ('Wireless Keyboard'),
  ('USB Wired Combo Keyboard & Mouse'),
  ('USB Wired Mouse'),
  ('Headphones'),
  ('Mouse Pad'),
  ('Laptop Stand'),
  ('Cleaning Kit');

-- ============================================================
-- TABLE: staff_members
-- ============================================================
CREATE TABLE public.staff_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  staff_name TEXT NOT NULL,
  department TEXT NOT NULL,
  join_date DATE NOT NULL,
  phone_number TEXT,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: assets
-- ============================================================
CREATE TABLE public.assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_id TEXT UNIQUE NOT NULL, -- Auto-generated e.g. AST-2026-0001
  category_id UUID REFERENCES public.asset_categories(id),
  asset_name TEXT NOT NULL,
  brand TEXT,
  model_number TEXT,
  serial_number TEXT UNIQUE,
  purchase_date DATE,
  purchase_price DECIMAL(12,2),
  asset_value DECIMAL(12,2),
  warranty_date DATE,
  inspection_date DATE,
  decommission_date DATE,
  status TEXT NOT NULL DEFAULT 'In Stock'
    CHECK (status IN ('In Stock','Assigned','Repaired','Discard','Lost')),
  notes TEXT,
  qr_code TEXT,
  -- Depreciation fields
  depreciation_rate DECIMAL(5,2) DEFAULT 20.00,
  current_value DECIMAL(12,2),
  -- Photo storage paths
  photo_thumbnail_1 TEXT,
  photo_thumbnail_2 TEXT,
  photo_vertical_1 TEXT,
  photo_vertical_2 TEXT,
  photo_vertical_3 TEXT,
  photo_vertical_4 TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-generate Asset ID
CREATE SEQUENCE IF NOT EXISTS asset_seq START 1;

CREATE OR REPLACE FUNCTION generate_asset_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.asset_id := 'AST-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
    LPAD(NEXTVAL('asset_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_asset_id
  BEFORE INSERT ON public.assets
  FOR EACH ROW WHEN (NEW.asset_id IS NULL OR NEW.asset_id = '')
  EXECUTE FUNCTION generate_asset_id();

-- ============================================================
-- TABLE: asset_assignments
-- ============================================================
CREATE TABLE public.asset_assignments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_id UUID REFERENCES public.assets(id) ON DELETE RESTRICT NOT NULL,
  staff_id UUID REFERENCES public.staff_members(id) ON DELETE RESTRICT NOT NULL,
  assignment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  return_date DATE,
  remarks TEXT,
  is_current BOOLEAN DEFAULT TRUE,
  assigned_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: asset_history (never delete)
-- ============================================================
CREATE TABLE public.asset_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_id UUID REFERENCES public.assets(id) ON DELETE RESTRICT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('Assigned','Returned','Transferred','Status Changed','Created','Updated')),
  from_staff_id UUID REFERENCES public.staff_members(id),
  to_staff_id UUID REFERENCES public.staff_members(id),
  previous_status TEXT,
  new_status TEXT,
  previous_owner UUID REFERENCES public.staff_members(id),
  current_owner UUID REFERENCES public.staff_members(id),
  assignment_date DATE,
  return_date DATE,
  transfer_date DATE,
  notes TEXT,
  performed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: inspections
-- ============================================================
CREATE TABLE public.inspections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_id UUID REFERENCES public.assets(id) ON DELETE RESTRICT NOT NULL,
  staff_id UUID REFERENCES public.staff_members(id) ON DELETE RESTRICT NOT NULL,
  inspection_date DATE NOT NULL DEFAULT CURRENT_DATE,
  condition_status TEXT NOT NULL
    CHECK (condition_status IN ('Good','Pending','Issue Found','Damaged')),
  notes TEXT,
  comments TEXT,
  photo_1 TEXT,
  photo_2 TEXT,
  photo_3 TEXT,
  submitted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: notifications
-- ============================================================
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info'
    CHECK (type IN ('info','warning','error','success','inspection_reminder','warranty_alert')),
  is_read BOOLEAN DEFAULT FALSE,
  related_asset_id UUID REFERENCES public.assets(id),
  related_inspection_id UUID REFERENCES public.inspections(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: audit_logs
-- ============================================================
CREATE TABLE public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES for Performance
-- ============================================================
CREATE INDEX idx_assets_status ON public.assets(status);
CREATE INDEX idx_assets_category ON public.assets(category_id);
CREATE INDEX idx_assignments_asset ON public.asset_assignments(asset_id);
CREATE INDEX idx_assignments_staff ON public.asset_assignments(staff_id);
CREATE INDEX idx_inspections_asset ON public.inspections(asset_id);
CREATE INDEX idx_inspections_date ON public.inspections(inspection_date);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX idx_audit_user ON public.audit_logs(user_id);

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_categories ENABLE ROW LEVEL SECURITY;

-- Profiles: users see own, admins see all
CREATE POLICY "profiles_own" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all" ON public.profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Assets: admins full access, staff read assigned only
CREATE POLICY "assets_admin" ON public.assets
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "assets_staff_read" ON public.assets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.asset_assignments aa
      JOIN public.staff_members sm ON sm.id = aa.staff_id
      WHERE aa.asset_id = assets.id
        AND sm.user_id = auth.uid()
        AND aa.is_current = TRUE
    )
  );

-- Staff members: admins full access, staff read own
CREATE POLICY "staff_admin" ON public.staff_members
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "staff_self_read" ON public.staff_members
  FOR SELECT USING (user_id = auth.uid());

-- Assignments: admins full, staff read own
CREATE POLICY "assignments_admin" ON public.asset_assignments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "assignments_staff_read" ON public.asset_assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.staff_members sm
      WHERE sm.id = staff_id AND sm.user_id = auth.uid()
    )
  );

-- History: admins full, staff read own
CREATE POLICY "history_admin" ON public.asset_history
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "history_staff_read" ON public.asset_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.staff_members sm
      WHERE (sm.id = from_staff_id OR sm.id = to_staff_id)
        AND sm.user_id = auth.uid()
    )
  );

-- Inspections: admins full, staff own
CREATE POLICY "inspections_admin" ON public.inspections
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "inspections_staff" ON public.inspections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.staff_members sm
      WHERE sm.id = staff_id AND sm.user_id = auth.uid()
    )
  );

-- Notifications: users see own
CREATE POLICY "notifications_own" ON public.notifications
  FOR ALL USING (user_id = auth.uid());

-- Categories: authenticated read all
CREATE POLICY "categories_read" ON public.asset_categories
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "categories_admin" ON public.asset_categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Audit logs: admins only
CREATE POLICY "audit_admin" ON public.audit_logs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- FUNCTION: Inspection reminder notifications (run via cron)
-- ============================================================
CREATE OR REPLACE FUNCTION send_inspection_reminders()
RETURNS void AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, related_asset_id)
  SELECT
    sm.user_id,
    'Inspection Reminder',
    'Asset "' || a.asset_name || '" inspection is due in 2 days on ' ||
      TO_CHAR(a.inspection_date, 'DD Mon YYYY'),
    'inspection_reminder',
    a.id
  FROM public.assets a
  JOIN public.asset_assignments aa ON aa.asset_id = a.id AND aa.is_current = TRUE
  JOIN public.staff_members sm ON sm.id = aa.staff_id
  WHERE a.inspection_date = CURRENT_DATE + INTERVAL '2 days'
    AND sm.user_id IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- FUNCTION: Warranty expiry alerts
-- ============================================================
CREATE OR REPLACE FUNCTION send_warranty_alerts()
RETURNS void AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, related_asset_id)
  SELECT
    p.id,
    'Warranty Expiry Alert',
    'Asset "' || a.asset_name || '" warranty expires in 30 days on ' ||
      TO_CHAR(a.warranty_date, 'DD Mon YYYY'),
    'warranty_alert',
    a.id
  FROM public.assets a
  CROSS JOIN public.profiles p
  WHERE p.role = 'admin'
    AND a.warranty_date = CURRENT_DATE + INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
