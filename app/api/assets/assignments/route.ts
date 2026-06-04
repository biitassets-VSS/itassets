import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('asset_assignments')
    .select(`
      *,
      assets(asset_id, asset_name, status),
      staff_members(staff_name, department)
    `)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();
  const { asset_id, staff_id, assignment_date, remarks } = body;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Mark previous assignments as not current
  await supabase
    .from('asset_assignments')
    .update({ is_current: false, return_date: assignment_date })
    .eq('asset_id', asset_id)
    .eq('is_current', true);

  // Create new assignment
  const { data, error } = await supabase
    .from('asset_assignments')
    .insert({
      asset_id,
      staff_id,
      assignment_date,
      remarks,
      is_current: true,
      assigned_by: user.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Update asset status
  await supabase
    .from('assets')
    .update({ status: 'Assigned' })
    .eq('id', asset_id);

  // Asset history
  await supabase.from('asset_history').insert({
    asset_id,
    action: 'Assigned',
    to_staff_id: staff_id,
    assignment_date,
    new_status: 'Assigned',
    performed_by: user.id,
  });

  return NextResponse.json({ data }, { status: 201 });
}
