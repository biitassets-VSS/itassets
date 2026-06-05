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

    // Get user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    let query = supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })

    if (profile.role === 'admin') {
      // Admin can see all notifications or those targeted to admin
      query = query.or(`target_role.eq.admin,target_user_id.eq.${session.user.id}`)
    } else {
      // Staff can see their notifications or general staff notifications
      query = query.or(`target_role.eq.staff,target_user_id.eq.${session.user.id}`)
    }

    const { data: notifications, error } = await query

    if (error) throw error
    return NextResponse.json(notifications)
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
    
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert([body])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(notification)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const notificationId = url.searchParams.get('id')
    const body = await request.json()

    if (!notificationId) {
      return NextResponse.json({ error: 'Notification ID required' }, { status: 400 })
    }

    const { data: notification, error } = await supabase
      .from('notifications')
      .update(body)
      .eq('id', notificationId)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(notification)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}