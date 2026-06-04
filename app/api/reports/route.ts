import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') ?? 'assets';

  let data: unknown[] = [];

  switch (type) {
    case 'assets':
      const { data: assets } = await supabase
        .from('assets')
        .select('*, asset_categories(name)')
        .order('created_at', { ascending: false });
      data = assets ?? [];
      break;

    case 'staff':
      const { data: staff } = await supabase
        .from('staff_members')
        .select('*')
        .order('created_at', { ascending: false });
      data = staff ?? [];
      break;

    case 'inspections':
      const { data: inspections } = await supabase
        .from('inspections')
        .select('*, assets(asset_name, asset_id), staff_members(staff_name)')
        .order('created_at', { ascending: false });
      data = inspections ?? [];
      break;

    case 'assignments':
      const { data: assignments } = await supabase
        .from('asset_history')
        .select('*, assets(asset_name, asset_id)')
        .order('created_at', { ascending: false });
      data = assignments ?? [];
      break;
  }

  return NextResponse.json({ data, type });
}
