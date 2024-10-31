"use client"

import ActivityTable from '../_components/activity-table'
import TotalMetrics from '../_components/total-opportunities-card'
import TotalCustomMetricsCreated from '../_components/pipeline-revenue-card'
import TotalProfilesCreated from '../_components/success-rate-card'
import ActionButtons from '../_components/form-action-cards'    

export default function Metrics() {

    return (
        <div className='p-6 dark:bg-[#000000]'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-normal mb-2 text-[#1e1e1e] dark:text-[#F9F9FF]'>
          Metrics
        </h1>
        <p className='text-sm text-[#5d5d5d] dark:text-[#A6A6A6] mb-6'>Manage your custom Metric and Profile sends</p>
      </div>
      <ActionButtons />
            <ActivityTable />
        </div>
    )
}