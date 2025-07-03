
import { createBrowserClient } from '@supabase/ssr'

// Define a function to create a Supabase client for client-side usage.
// This is used in the AuthProvider and throughout the app.
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
