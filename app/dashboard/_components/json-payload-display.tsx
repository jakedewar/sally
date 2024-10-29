'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import KlaviyoSendModal from './klaviyo-send-modal'
import { useToast } from "@/components/ui/use-toast"
import { MoreVertical } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type BusinessInfo = {
    businessName: string
    industry: string
    websiteUrl: string
    description: string
}

type CustomMetric = {
    name: string
    type: string
    properties: Record<string, string>
}

export type GeneratedPayload = {
    metricName: string;
    payload: any;
};

export default function JsonPayloadDisplay({
    businessInfo,
    generatedPayload,
    isLoading
}: {
    businessInfo: BusinessInfo | null,
    generatedPayload: { metricName: string, payload: any } | null,
    isLoading: boolean
}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { toast } = useToast()

    const handleSendToKlaviyo = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleModalSubmit = async (apiKey: string) => {
        // Here you would typically send the data to your backend
        // For now, we'll just simulate the process
        setIsModalOpen(false)
        toast({
            title: "Success",
            description: "Data sent to Klaviyo successfully!",
            variant: "default",
        })
    }

    const handleEdit = () => {
        // Implement edit functionality
        console.log("Edit clicked")
    }

    const handleRetry = () => {
        // Implement retry functionality
        console.log("Retry clicked")
    }

    const renderPayload = () => {
        if (!generatedPayload) {
            return <p>No payload generated</p>;
        }

        // if (generatedPayload.error) {
        //     return <p className="text-red-500">{generatedPayload.error}</p>;
        // }

        return (
            <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                <code className="text-sm">
                    {JSON.stringify(generatedPayload.payload, null, 2)}
                </code>
            </pre>
        );
    };

    // Remove the getEventName function as it's no longer needed

    if (!businessInfo || !generatedPayload) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Custom Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-500">
                        Submit the business info form to view custom payload data.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button disabled className="w-full">Please Complete Business Info Form</Button>
                </CardFooter>
            </Card>
        )
    }

    if (isLoading) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Generating Custom Metrics...</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Generated Custom Metric</CardTitle>
                        <div className=''>
                            Metric Name: {generatedPayload?.metricName || 'N/A'}
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleRetry}>Retry</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    {renderPayload()}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        onClick={handleSendToKlaviyo}
                        className="w-full"
                        disabled={!generatedPayload}
                    >
                        Send to Klaviyo
                    </Button>
                </CardFooter>
            </Card>
            <KlaviyoSendModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                payload={generatedPayload?.payload}
            />
        </>
    )
}