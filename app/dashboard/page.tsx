'use client'

import { useUser } from '@clerk/nextjs'
import TotalMetrics from './_components/total-metrics-card'
import TotalCustomMetricsCreated from './_components/total-custom-metrics-created'
import TotalProfilesCreated from './_components/total-profiles-created'
import ActionButtons from './_components/form-action-cards'
import ActivityTable from './_components/activity-table'
import SearchBar from '@/components/ui/search-bar'

export default function Dashboard() {
  const { user, isLoaded } = useUser()

  return (
    <div className='p-6 bg-white dark:bg-[#000000]'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-normal mb-2 text-[#1e1e1e] dark:text-[#F9F9FF]'>
          Welcome, {isLoaded ? user?.firstName || 'User' : 'Loading...'}
        </h1>
        <p className='text-sm text-[#5d5d5d] dark:text-[#A6A6A6] mb-6'>Manage your custom Metric and Profile sends</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <TotalMetrics />
        <TotalCustomMetricsCreated />
        <TotalProfilesCreated />
      </div>
      <ActionButtons />
      <ActivityTable />
    </div>
  )
}
