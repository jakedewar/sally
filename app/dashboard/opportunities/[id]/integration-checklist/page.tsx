"use client"

import { Button } from "@/components/ui/button"
import { useUser } from '@clerk/nextjs'
import IntegrationChecklistComponent from '../../../integration-checklist/_components/integration-checklist'
import { ArrowLeft } from "lucide-react"
import Link from 'next/link'
import ShareChecklistModal from '../../../integration-checklist/_components/share-checklist-modal'

export default function SingleOpportunityIntegrationChecklist({ params }: { params: { id: string } }) {
    const { user, isLoaded } = useUser()

    return (
        <div className="p-6">
            <Link href={`/dashboard/opportunities/${params.id}`} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Opportunity
            </Link>
            <div className='flex justify-between items-start mb-6'>
                <div className='flex flex-col gap-2'>
                    <h1 className="text-2xl font-normal text-[#1e1e1e] dark:text-white">Hi {user?.fullName}, let's build your integration!</h1>
                    <p className='text-sm text-[#5d5d5d]'>Select the events you want to track and we'll give you code snippets and best practices for implementing them.</p>
                </div>
                <ShareChecklistModal checklistId={params.id} />
            </div>
            <IntegrationChecklistComponent />
        </div>
    )
}