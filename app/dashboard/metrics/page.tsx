"use client"

import { useUser } from '@clerk/nextjs'
import ActivityTable from '../_components/activity-table'

export default function Metrics() {
    const { user, isLoaded } = useUser()

    return (
        <div className='p-6'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-normal mb-2 text-[#1e1e1e]'>
                    Metrics
                </h1>
                <p className='text-sm text-[#5d5d5d] mb-6'>View and manage your metrics</p>
            </div>
            <ActivityTable />
        </div>
    )
}