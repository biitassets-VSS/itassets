import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('staff_members')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();
  const { staff_name, department, join_date, phone_number, email, password } = body;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Create Supabase Auth user for the staff member
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) return NextResponse.json({ error: authError.message }, { status: 500 });

  // Create profile with role 'staff'
  await supabase.from('profiles').insert({
    id: authData.user.id,
    email,
    full_name: staff_name,
    role: 'staff',
  });

  // Create staff member record
  const { data: staffData, error: staffError } = await supabase
    .from('staff_members')
    .insert({
      user_id: authData.user.id,
      staff_name,
      department,
      join_date,
      phone_number,
      email,
      is_active: true,
      created_by: user.id,
    })
    .select()
    .single();

  if (staffError) return NextResponse.json({ error: staffError.message }, { status: 500 });

  // Audit log
  await supabase.from('audit_logs').insert({
    user_id: user.id,
    action: 'CREATE',
    table_name: 'staff_members',
    record_id: staffData.id,
  });

  return NextResponse.json({ data: staffData }, { status: 201 });
}
