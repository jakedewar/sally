'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import TotalOpportunities from './_components/total-opportunities-card'
import PipelineRevenue from './_components/pipeline-revenue-card'
import SuccessRate from './_components/success-rate-card'
import ActionButtons from './_components/form-action-cards'
import OpportunitiesKanban from './opportunities/_components/opportunities-kanban'
import { Opportunity } from './opportunities/types'
import { useOpportunities } from '@/lib/hooks/use-opportunities'

const stages = ['Discovery', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const { data: opportunities, isLoading } = useOpportunities()

  return (
    <div className='p-6 dark:bg-[#000000]'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-normal mb-2 text-[#1e1e1e] dark:text-[#F9F9FF]'>
          Welcome, {isLoaded ? user?.firstName || 'User' : 'Loading...'}
        </h1>
        <p className='text-sm text-[#5d5d5d] dark:text-[#A6A6A6] mb-6'>Manage your opportunities and track your success</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <TotalOpportunities />
        <PipelineRevenue />
        <SuccessRate />
      </div>
      <ActionButtons />
      <div className='flex flex-col'>
        <h2 className='text-lg font-normal mb-2 text-[#1e1e1e] dark:text-[#F9F9FF]'>Opportunities</h2>
        <p className='text-sm text-[#5d5d5d] dark:text-[#A6A6A6] mb-4'>View and manage your opportunities</p>
        <OpportunitiesKanban 
          opportunities={opportunities || []}
          setOpportunities={(opportunities) => {}} 
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
