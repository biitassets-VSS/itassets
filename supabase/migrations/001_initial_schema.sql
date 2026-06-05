-- IT Assets Management System Database Schema
-- Virtual Staffing Solution

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom types
CREATE TYPE user_role AS ENUM ('admin', 'staff');
CREATE TYPE asset_status AS ENUM ('in_stock', 'assigned', 'repair', 'disposed');
CREATE TYPE asset_condition AS ENUM ('excellent', 'good', 'fair', 'needs_repair', 'damaged');
CREATE TYPE notification_type AS ENUM ('critical', 'warning', 'info', 'success');
CREATE TYPE repair_status AS ENUM ('pending', 'in_progress', 'completed');
CREATE TYPE staff_status AS ENUM ('active', 'inactive');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'staff',
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff table
CREATE TABLE staff (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  emp_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  status staff_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Asset categories
CREATE TABLE asset_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO asset_categories (name, description) VALUES
('Laptop', 'Laptop computers'),
('Mobile Phone', 'Mobile phones and smartphones'),
('Wireless Keyboard & Mouse Kit', 'Wireless input devices kit'),
('USB Wired Keyboard & Mouse Kit', 'Wired input devices kit'),
('USB Wired Keyboard', 'Wired keyboards'),
('USB Wired Mouse', 'Wired mice'),
('Headphones', 'Audio devices'),
('Laptop Stand', 'Laptop accessories'),
('Mouse Pad', 'Mouse accessories'),
('Cleaning Kit', 'Device cleaning supplies'),
('Monitor', 'External monitors'),
('Docking Station', 'Laptop docking stations'),
('Printer', 'Printing devices'),
('Scanner', 'Scanning devices'),
('Projector', 'Projection devices'),
('Router', 'Network routers'),
('Switch', 'Network switches'),
('UPS', 'Uninterruptible power supply'),
('External HDD', 'External hard drives'),
('SSD', 'Solid state drives'),
('Tablet', 'Tablet computers'),
('Other', 'Other assets');

-- Assets table
CREATE TABLE assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_tag TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category_id UUID REFERENCES asset_categories(id),
  brand TEXT,
  model TEXT,
  serial_number TEXT,
  purchase_price DECIMAL(10,2),
  purchase_date DATE,
  invoice_number TEXT,
  vendor_name TEXT,
  warranty_start_date DATE,
  warranty_end_date DATE,
  status asset_status NOT NULL DEFAULT 'in_stock',
  current_holder UUID REFERENCES staff(id),
  photo_urls TEXT[],
  qr_code TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Asset assignments
CREATE TABLE asset_assignments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE NOT NULL,
  staff_id UUID REFERENCES staff(id) NOT NULL,
  assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expected_return_date DATE,
  returned_date DATE,
  condition asset_condition NOT NULL DEFAULT 'good',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Asset history
CREATE TABLE asset_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE NOT NULL,
  staff_id UUID REFERENCES staff(id),
  action_type TEXT NOT NULL,
  action_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inspections
CREATE TABLE inspections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE NOT NULL,
  staff_id UUID REFERENCES staff(id) NOT NULL,
  inspection_date DATE NOT NULL DEFAULT CURRENT_DATE,
  condition asset_condition NOT NULL,
  working_status BOOLEAN NOT NULL DEFAULT TRUE,
  location TEXT,
  notes TEXT,
  photo_urls TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type notification_type NOT NULL DEFAULT 'info',
  target_role user_role,
  target_user_id UUID REFERENCES profiles(id),
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Repairs
CREATE TABLE repairs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE NOT NULL,
  reported_by UUID REFERENCES staff(id) NOT NULL,
  repair_status repair_status NOT NULL DEFAULT 'pending',
  cost DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for better performance
CREATE INDEX idx_assets_status ON assets(status);
CREATE INDEX idx_assets_current_holder ON assets(current_holder);
CREATE INDEX idx_asset_assignments_asset_id ON asset_assignments(asset_id);
CREATE INDEX idx_asset_assignments_staff_id ON asset_assignments(staff_id);
CREATE INDEX idx_asset_history_asset_id ON asset_history(asset_id);
CREATE INDEX idx_inspections_asset_id ON inspections(asset_id);
CREATE INDEX idx_inspections_staff_id ON inspections(staff_id);
CREATE INDEX idx_inspections_date ON inspections(inspection_date);
CREATE INDEX idx_notifications_target_user ON notifications(target_user_id);
CREATE INDEX idx_staff_status ON staff(status);

-- Functions for auto-updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-generate asset tags
CREATE OR REPLACE FUNCTION generate_asset_tag()
RETURNS TRIGGER AS $$
DECLARE
  category_code TEXT;
  counter INTEGER;
  new_tag TEXT;
BEGIN
  -- Get category abbreviation
  SELECT UPPER(LEFT(name, 3)) INTO category_code 
  FROM asset_categories 
  WHERE id = NEW.category_id;
  
  -- Get next counter
  SELECT COALESCE(MAX(CAST(SUBSTRING(asset_tag FROM '([0-9]+)$') AS INTEGER)), 0) + 1
  INTO counter
  FROM assets
  WHERE asset_tag LIKE 'VSS-' || category_code || '-%';
  
  -- Generate new tag
  NEW.asset_tag = 'VSS-' || category_code || '-' || LPAD(counter::TEXT, 3, '0');
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for auto-generating asset tags
CREATE TRIGGER generate_asset_tag_trigger 
  BEFORE INSERT ON assets 
  FOR EACH ROW 
  WHEN (NEW.asset_tag IS NULL)
  EXECUTE FUNCTION generate_asset_tag();

-- Function to log asset history
CREATE OR REPLACE FUNCTION log_asset_history()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO asset_history (asset_id, action_type, notes)
    VALUES (NEW.id, 'created', 'Asset created');
    RETURN NEW;
  END IF;
  
  IF TG_OP = 'UPDATE' THEN
    -- Log status changes
    IF OLD.status != NEW.status THEN
      INSERT INTO asset_history (asset_id, staff_id, action_type, notes)
      VALUES (NEW.id, NEW.current_holder, 'status_changed', 
              'Status changed from ' || OLD.status || ' to ' || NEW.status);
    END IF;
    
    -- Log assignment changes
    IF OLD.current_holder != NEW.current_holder THEN
      IF NEW.current_holder IS NOT NULL THEN
        INSERT INTO asset_history (asset_id, staff_id, action_type, notes)
        VALUES (NEW.id, NEW.current_holder, 'assigned', 'Asset assigned to staff member');
      ELSE
        INSERT INTO asset_history (asset_id, staff_id, action_type, notes)
        VALUES (NEW.id, OLD.current_holder, 'returned', 'Asset returned');
      END IF;
    END IF;
    
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger for asset history logging
CREATE TRIGGER log_asset_history_trigger
  AFTER INSERT OR UPDATE ON assets
  FOR EACH ROW EXECUTE FUNCTION log_asset_history();

-- Function to create inspection notifications
CREATE OR REPLACE FUNCTION create_inspection_notification()
RETURNS VOID AS $$
DECLARE
  asset_record RECORD;
  staff_record RECORD;
BEGIN
  -- Find assets due for inspection (7 days since last inspection or never inspected)
  FOR asset_record IN
    SELECT a.id, a.name, a.asset_tag, a.current_holder
    FROM assets a
    WHERE a.status = 'assigned' 
    AND a.current_holder IS NOT NULL
    AND (
      a.id NOT IN (
        SELECT asset_id 
        FROM inspections 
        WHERE inspection_date > CURRENT_DATE - INTERVAL '7 days'
      )
    )
  LOOP
    -- Get staff details
    SELECT * INTO staff_record FROM staff WHERE id = asset_record.current_holder;
    
    -- Create notification
    INSERT INTO notifications (title, message, type, target_user_id)
    SELECT 
      '⚠️ Inspection Due',
      asset_record.name || ' (' || asset_record.asset_tag || ') inspection is due',
      'warning',
      p.id
    FROM staff s
    JOIN profiles p ON s.profile_id = p.id
    WHERE s.id = asset_record.current_holder;
  END LOOP;
END;
$$ language 'plpgsql';

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE repairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_categories ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admin full access policies
CREATE POLICY "Admins have full access" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins full access to staff" ON staff
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins full access to assets" ON assets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins full access to assignments" ON asset_assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins full access to history" ON asset_history
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins full access to inspections" ON inspections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins full access to notifications" ON notifications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins full access to repairs" ON repairs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Staff policies - can only see their own data
CREATE POLICY "Staff can view own profile" ON staff
  FOR SELECT USING (
    profile_id = auth.uid()
  );

CREATE POLICY "Staff can view assigned assets" ON assets
  FOR SELECT USING (
    current_holder IN (
      SELECT id FROM staff WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Staff can view own assignments" ON asset_assignments
  FOR SELECT USING (
    staff_id IN (
      SELECT id FROM staff WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Staff can view own inspections" ON inspections
  FOR SELECT USING (
    staff_id IN (
      SELECT id FROM staff WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Staff can insert own inspections" ON inspections
  FOR INSERT WITH CHECK (
    staff_id IN (
      SELECT id FROM staff WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Staff can view own notifications" ON notifications
  FOR SELECT USING (
    target_user_id = auth.uid() OR target_role = 'staff'
  );

CREATE POLICY "Staff can update own notifications" ON notifications
  FOR UPDATE USING (
    target_user_id = auth.uid()
  );

-- Public read access to categories
CREATE POLICY "Anyone can view categories" ON asset_categories
  FOR SELECT USING (true);

-- Storage policies (to be set up in Supabase dashboard)
-- Bucket: asset-photos
-- Bucket: inspection-photos  
-- Bucket: documents

-- Sample admin user (password should be set via Supabase Auth)
-- This will be created via the application interface

-- Performance optimization
ANALYZE;