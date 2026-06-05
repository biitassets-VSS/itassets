import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export const createRouteHandlerSupabaseClient = () => {
  const cookieStore = cookies()
  return createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  })
}

export const createServerActionSupabaseClient = () => {
  const cookieStore = cookies()
  return createServerActionClient<Database>({
    cookies: () => cookieStore,
  })
}