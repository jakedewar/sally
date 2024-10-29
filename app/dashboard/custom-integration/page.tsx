"use client"

import { useUser } from '@clerk/nextjs'
import KlaviyoIntegrationApp from '../_components/custom-integration/klaviyo-integration-app'

export default function CustomIntegrationPage() {
    const { user, isLoaded } = useUser()

    return (
        <div className='p-6'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-normal mb-2 text-[#1e1e1e]'>
                    Custom Integration Builder
                </h1>
                <p className='text-sm text-[#5d5d5d] mb-6'>Build a custom integration workflow with your data to send to Klaviyo</p>
            </div>
            <KlaviyoIntegrationApp />
        </div>
    )
}