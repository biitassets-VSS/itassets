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

    // Check if user is admin or staff
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role === 'admin') {
      // Admin can see all assets
      const { data: assets, error } = await supabase
        .from('assets')
        .select(`
          *,
          category:asset_categories(name),
          holder:staff(name, emp_code)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return NextResponse.json(assets)
    } else {
      // Staff can only see their assigned assets
      const { data: staff } = await supabase
        .from('staff')
        .select('id')
        .eq('email', session.user.email)
        .single()

      if (!staff) {
        return NextResponse.json({ error: 'Staff not found' }, { status: 404 })
      }

      const { data: assets, error } = await supabase
        .from('assets')
        .select(`
          *,
          category:asset_categories(name)
        `)
        .eq('current_holder', staff.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return NextResponse.json(assets)
    }
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

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    
    const { data: asset, error } = await supabase
      .from('assets')
      .insert([body])
      .select(`
        *,
        category:asset_categories(name),
        holder:staff(name, emp_code)
      `)
      .single()

    if (error) throw error

    // Create asset history entry
    await supabase
      .from('asset_history')
      .insert([{
        asset_id: asset.id,
        action_type: 'created',
        notes: 'Asset created in system'
      }])

    return NextResponse.json(asset)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const { id, ...updateData } = body
    
    const { data: asset, error } = await supabase
      .from('assets')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        category:asset_categories(name),
        holder:staff(name, emp_code)
      `)
      .single()

    if (error) throw error
    return NextResponse.json(asset)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}