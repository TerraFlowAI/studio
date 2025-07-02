import { useState, useEffect, useCallback } from 'react'
import { LeadsService } from '@/lib/services/leadsService'
import { useAuth } from '@/app/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import type { Lead, LeadInsert } from '@/lib/supabase'

interface UseLeadsReturn {
  leads: Lead[]
  isLoading: boolean
  isError: boolean
  error: string | null
  refetch: () => Promise<void>
  createLead: (leadData: Omit<LeadInsert, 'id' | 'user_id' | 'ai_score' | 'ai_score_factors' | 'created_at' | 'updated_at'>) => Promise<Lead | null>
  updateLead: (leadId: string, updates: Partial<Lead>) => Promise<Lead | null>
  deleteLead: (leadId: string) => Promise<boolean>
  deleteLeads: (leadIds: string[]) => Promise<boolean>
  updateLeadStatus: (leadId: string, status: string) => Promise<Lead | null>
}

export function useLeads(): UseLeadsReturn {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchLeads = useCallback(async () => {
    if (!user?.uid) {
      setLeads([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setIsError(false)
      setError(null)
      
      const fetchedLeads = await LeadsService.getLeads(user.uid)
      setLeads(fetchedLeads)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch leads'
      setError(errorMessage)
      setIsError(true)
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }, [user?.uid, toast])

  const createLead = useCallback(async (
    leadData: Omit<LeadInsert, 'id' | 'user_id' | 'ai_score' | 'ai_score_factors' | 'created_at' | 'updated_at'>
  ): Promise<Lead | null> => {
    if (!user?.uid) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to create a lead.',
        variant: 'destructive'
      })
      return null
    }

    try {
      const newLead = await LeadsService.createLead({
        ...leadData,
        user_id: user.uid
      })
      
      // Add the new lead to the beginning of the list
      setLeads(prev => [newLead, ...prev])
      
      toast({
        title: 'Lead Created!',
        description: `${leadData.name} has been successfully added.`
      })
      
      return newLead
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create lead'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      })
      return null
    }
  }, [user?.uid, toast])

  const updateLead = useCallback(async (
    leadId: string, 
    updates: Partial<Lead>
  ): Promise<Lead | null> => {
    if (!user?.uid) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to update a lead.',
        variant: 'destructive'
      })
      return null
    }

    try {
      const updatedLead = await LeadsService.updateLead(leadId, user.uid, updates)
      
      // Update the lead in the list
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? updatedLead : lead
      ))
      
      toast({
        title: 'Lead Updated!',
        description: 'Lead has been successfully updated.'
      })
      
      return updatedLead
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update lead'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      })
      return null
    }
  }, [user?.uid, toast])

  const deleteLead = useCallback(async (leadId: string): Promise<boolean> => {
    if (!user?.uid) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to delete a lead.',
        variant: 'destructive'
      })
      return false
    }

    try {
      await LeadsService.deleteLead(leadId, user.uid)
      
      // Remove the lead from the list
      setLeads(prev => prev.filter(lead => lead.id !== leadId))
      
      toast({
        title: 'Lead Deleted!',
        description: 'Lead has been successfully deleted.'
      })
      
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete lead'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      })
      return false
    }
  }, [user?.uid, toast])

  const deleteLeads = useCallback(async (leadIds: string[]): Promise<boolean> => {
    if (!user?.uid) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to delete leads.',
        variant: 'destructive'
      })
      return false
    }

    try {
      await LeadsService.deleteLeads(leadIds, user.uid)
      
      // Remove the leads from the list
      setLeads(prev => prev.filter(lead => !leadIds.includes(lead.id)))
      
      toast({
        title: 'Leads Deleted!',
        description: `${leadIds.length} leads have been successfully deleted.`
      })
      
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete leads'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      })
      return false
    }
  }, [user?.uid, toast])

  const updateLeadStatus = useCallback(async (
    leadId: string, 
    status: string
  ): Promise<Lead | null> => {
    if (!user?.uid) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to update lead status.',
        variant: 'destructive'
      })
      return null
    }

    try {
      const updatedLead = await LeadsService.updateLeadStatus(leadId, user.uid, status)
      
      // Update the lead in the list
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? updatedLead : lead
      ))
      
      toast({
        title: 'Status Updated!',
        description: `Lead status has been updated to ${status}.`
      })
      
      return updatedLead
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update lead status'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      })
      return null
    }
  }, [user?.uid, toast])

  // Fetch leads on mount and when user changes
  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  return {
    leads,
    isLoading,
    isError,
    error,
    refetch: fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    deleteLeads,
    updateLeadStatus
  }
}
