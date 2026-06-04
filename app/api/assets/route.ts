import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const status = searchParams.get('status');
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let query = supabase
    .from('assets')
    .select('*, asset_categories(name)')
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);
  if (category) query = query.eq('category_id', category);
  if (search) {
    query = query.or(
      `asset_name.ilike.%${search}%,asset_id.ilike.%${search}%,serial_number.ilike.%${search}%`
    );
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('assets')
    .insert({ ...body, created_by: user.id })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Audit log
  await supabase.from('audit_logs').insert({
    user_id: user.id,
    action: 'CREATE',
    table_name: 'assets',
    record_id: data.id,
    new_values: body,
  });

  // Asset history
  await supabase.from('asset_history').insert({
    asset_id: data.id,
    action: 'Created',
    new_status: data.status,
    performed_by: user.id,
  });

  return NextResponse.json({ data }, { status: 201 });
}
