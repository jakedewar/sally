"use client"

import { Button } from "@/components/ui/button"
import { useUser } from '@clerk/nextjs'
import IntegrationChecklistComponent from './_components/integration-checklist'
import { Share2 } from "lucide-react"
import ShareChecklistModal from './_components/share-checklist-modal'

export default function IntegrationDashboard() {
    const { user, isLoaded } = useUser()

    return (
        <div className="p-6">
            <div className='flex justify-between items-start mb-6'>
                <div className='flex flex-col gap-2'>
                    <h1 className="text-2xl font-normal text-[#1e1e1e] dark:text-white">Hi {user?.fullName}, let's build your integration!</h1>
                    <p className='text-sm text-[#5d5d5d]'>Select the events you want to track and we'll give you code snippets and best practices for implementing them.</p>
                </div>
                <ShareChecklistModal checklistId="your-checklist-id-here" />
            </div>
            <IntegrationChecklistComponent />
        </div>
    )
}