import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string | null
          ai_score: number
          ai_score_factors: string
          source: string
          status: string
          property_of_interest: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          phone?: string | null
          ai_score?: number
          ai_score_factors?: string
          source: string
          status: string
          property_of_interest?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string | null
          ai_score?: number
          ai_score_factors?: string
          source?: string
          status?: string
          property_of_interest?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          property_type: string
          status: string
          price: number
          location: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          property_type: string
          status: string
          price: number
          location: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          property_type?: string
          status?: string
          price?: number
          location?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Lead = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type LeadUpdate = Database['public']['Tables']['leads']['Update']
