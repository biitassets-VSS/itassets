import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const assetId = url.searchParams.get('asset_id')
    const staffId = url.searchParams.get('staff_id')

    let query = supabase
      .from('inspections')
      .select(`
        *,
        asset:assets(name, asset_tag),
        staff:staff(name, emp_code)
      `)
      .order('inspection_date', { ascending: false })

    if (assetId) {
      query = query.eq('asset_id', assetId)
    }

    if (staffId) {
      query = query.eq('staff_id', staffId)
    }

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role === 'staff') {
      // Staff can only see their own inspections
      const { data: staff } = await supabase
        .from('staff')
        .select('id')
        .eq('email', session.user.email)
        .single()

      if (!staff) {
        return NextResponse.json({ error: 'Staff not found' }, { status: 404 })
      }

      query = query.eq('staff_id', staff.id)
    }

    const { data: inspections, error } = await query

    if (error) throw error
    return NextResponse.json(inspections)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get staff ID
    const { data: staff } = await supabase
      .from('staff')
      .select('id')
      .eq('email', session.user.email)
      .single()

    if (!staff) {
      return NextResponse.json({ error: 'Staff not found' }, { status: 404 })
    }

    const body = await request.json()
    
    // Check if inspection already exists this week
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - 7)

    const { data: existingInspection } = await supabase
      .from('inspections')
      .select('id')
      .eq('asset_id', body.asset_id)
      .eq('staff_id', staff.id)
      .gte('inspection_date', weekStart.toISOString().split('T')[0])
      .single()

    if (existingInspection) {
      return NextResponse.json(
        { error: 'Asset has already been inspected this week' },
        { status: 400 }
      )
    }

    const inspectionData = {
      ...body,
      staff_id: staff.id,
      inspection_date: new Date().toISOString().split('T')[0],
    }

    const { data: inspection, error } = await supabase
      .from('inspections')
      .insert([inspectionData])
      .select(`
        *,
        asset:assets(name, asset_tag),
        staff:staff(name, emp_code)
      `)
      .single()

    if (error) throw error

    // Create notification if asset needs repair
    if (body.condition === 'needs_repair' || body.condition === 'damaged') {
      await supabase
        .from('notifications')
        .insert([{
          title: 'Asset Requires Attention',
          message: `Asset ${inspection.asset.name} (${inspection.asset.asset_tag}) was marked as ${body.condition} during inspection`,
          type: 'critical',
          target_role: 'admin',
        }])
    }

    return NextResponse.json(inspection)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}