import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Opportunity } from '@/app/dashboard/opportunities/types'

export function useOpportunities() {
  return useQuery<Opportunity[], Error>({
    queryKey: ['opportunities'],
    queryFn: async () => {
      const response = await fetch('/api/opportunities')
      if (!response.ok) {
        throw new Error('Failed to fetch opportunities')
      }
      const data = await response.json()
      return data.map((opp: any) => ({
        ...opp,
        lastUpdated: new Date(opp.lastUpdated).toISOString(),
        createdAt: new Date(opp.createdAt).toISOString()
      }))
    }
  })
}

export function useOpportunity(id: string) {
  return useQuery<Opportunity, Error>({
    queryKey: ['opportunities', id],
    queryFn: async () => {
      const response = await fetch(`/api/opportunities/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch opportunity')
      }
      return response.json()
    }
  })
}

export function useUpdateOpportunity() {
  const queryClient = useQueryClient()
  
  return useMutation<
    Opportunity,
    Error,
    { id: string; data: Partial<Opportunity> }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await fetch(`/api/opportunities/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error('Failed to update opportunity')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] })
    }
  })
} 