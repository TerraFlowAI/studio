import { supabase, type Lead, type LeadInsert, type LeadUpdate } from '@/lib/supabase'

export class LeadsService {
  // Generate AI score (mock implementation for now)
  private static generateAIScore(): number {
    return Math.floor(Math.random() * 60) + 40
  }

  // Generate AI score factors (mock implementation for now)
  private static generateAIScoreFactors(leadData: Partial<LeadInsert>): string {
    const factors = []
    
    if (leadData.source === 'Referral') {
      factors.push('High trust source')
    }
    
    if (leadData.property_of_interest) {
      factors.push('Specific property interest')
    }
    
    if (leadData.phone) {
      factors.push('Phone number provided')
    }
    
    if (factors.length === 0) {
      factors.push('Generated from manual entry')
    }
    
    return factors.join(', ')
  }

  // Fetch all leads for a user
  static async getLeads(userId: string): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch leads: ${error.message}`)
    }

    return data || []
  }

  // Fetch a single lead by ID
  static async getLeadById(leadId: string, userId: string): Promise<Lead | null> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Lead not found
      }
      throw new Error(`Failed to fetch lead: ${error.message}`)
    }

    return data
  }

  // Create a new lead
  static async createLead(leadData: Omit<LeadInsert, 'id' | 'ai_score' | 'ai_score_factors' | 'created_at' | 'updated_at'>): Promise<Lead> {
    const enrichedLeadData: LeadInsert = {
      ...leadData,
      ai_score: this.generateAIScore(),
      ai_score_factors: this.generateAIScoreFactors(leadData),
    }

    const { data, error } = await supabase
      .from('leads')
      .insert(enrichedLeadData)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create lead: ${error.message}`)
    }

    return data
  }

  // Update a lead
  static async updateLead(leadId: string, userId: string, updates: LeadUpdate): Promise<Lead> {
    const { data, error } = await supabase
      .from('leads')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', leadId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update lead: ${error.message}`)
    }

    return data
  }

  // Delete a lead
  static async deleteLead(leadId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', leadId)
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Failed to delete lead: ${error.message}`)
    }
  }

  // Bulk delete leads
  static async deleteLeads(leadIds: string[], userId: string): Promise<void> {
    const { error } = await supabase
      .from('leads')
      .delete()
      .in('id', leadIds)
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Failed to delete leads: ${error.message}`)
    }
  }

  // Update lead status
  static async updateLeadStatus(leadId: string, userId: string, status: string): Promise<Lead> {
    return this.updateLead(leadId, userId, { status })
  }

  // Search leads
  static async searchLeads(userId: string, searchTerm: string): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', userId)
      .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,property_of_interest.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to search leads: ${error.message}`)
    }

    return data || []
  }

  // Get leads by status
  static async getLeadsByStatus(userId: string, status: string): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', userId)
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch leads by status: ${error.message}`)
    }

    return data || []
  }

  // Get hot leads (AI score > 75)
  static async getHotLeads(userId: string): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', userId)
      .gt('ai_score', 75)
      .order('ai_score', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch hot leads: ${error.message}`)
    }

    return data || []
  }

  // Get leads that need attention (contacted but no update for 3+ days)
  static async getLeadsNeedingAttention(userId: string): Promise<Lead[]> {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'Contacted')
      .lt('updated_at', threeDaysAgo.toISOString())
      .order('updated_at', { ascending: true })

    if (error) {
      throw new Error(`Failed to fetch leads needing attention: ${error.message}`)
    }

    return data || []
  }
}
