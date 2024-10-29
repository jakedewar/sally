"use client"

import { useState } from 'react'
import BusinessDataForm from '../_components/business-data-form'
import JsonPayloadDisplay, { GeneratedPayload } from '../_components/json-payload-display'
import axios from 'axios';
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

type BusinessInfo = {
    businessName: string
    industry: string
    websiteUrl: string
    description: string
}

const generateMetric = async (data: BusinessInfo) => {
    try {
        const response = await axios.post('/api/generate-metric', data);
        return response.data.result;
    } catch (error) {
        console.error('Error generating metric:', error);
        throw error;
    }
};

export default function CreateMetric() {
    const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null)
    const [generatedPayload, setGeneratedPayload] = useState<GeneratedPayload | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleFormSubmit = async (data: BusinessInfo) => {
        setBusinessInfo(data)
        setIsLoading(true)
        try {
            const payload = await generateMetric(data)
            setGeneratedPayload(payload)
        } catch (error) {
            console.error('Error generating metric:', error)
            // Handle error (e.g., show toast)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='p-6'>
            <div className='flex flex-col gap-2 mb-6'>
                <div className='flex items-center'>
                    <Button variant="link" className="p-0 mr-2">
                        <Link href="/dashboard" className='flex items-center'>
                            <ChevronLeft className='h-4 w-4' />
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
                <h1 className='text-2xl font-normal mb-2 text-[#1e1e1e]'>Create New Metric</h1>
                <p className='text-sm text-[#5d5d5d]'>Generate a custom metric based on business information</p>
            </div>
            <div className='flex flex-col lg:flex-row justify-between items-start gap-8'>
                <div className='w-full lg:w-[calc(50%-1rem)]'>
                    <BusinessDataForm onSubmit={handleFormSubmit} />
                </div>
                <div className='w-full lg:w-[calc(50%-1rem)]'>
                    <JsonPayloadDisplay
                        businessInfo={businessInfo}
                        generatedPayload={generatedPayload}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    )
}
