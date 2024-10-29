"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"
import { useUser } from '@clerk/nextjs'
import { Skeleton } from "@/components/ui/skeleton"
import { Opportunity } from '../opportunities/types'

export default function TotalMetrics() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useUser()

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const response = await fetch('/api/opportunities')
                const data = await response.json()
                const formattedData = data.map((opp: any) => ({
                    ...opp,
                    lastUpdated: new Date(opp.lastUpdated).toISOString(),
                    createdAt: new Date(opp.createdAt).toISOString()
                }))
                setOpportunities(Array.isArray(data) ? formattedData : [])
            } catch (error) {
                console.error('Error fetching opportunities:', error)
                setOpportunities([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchOpportunities()
    }, [])

    const assignedOpportunities = opportunities.filter(opp => opp.assignedSAId === user?.id)

    return (
        <div className="">
            <Card className="bg-white dark:bg-[#000000] border border-gray-300 dark:border-[#333333]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#1e1e1e] dark:text-[#F9F9FF]">Total Opportunities</CardTitle>
                    <Target className="h-4 w-4 text-[#5D51FF]" />
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <>
                            <Skeleton className="h-8 w-20 mb-1" />
                            <Skeleton className="h-4 w-32" />
                        </>
                    ) : (
                        <>
                            <div className="text-2xl font-bold text-[#1e1e1e] dark:text-[#F9F9FF]">
                                {assignedOpportunities.length}
                            </div>
                            <p className="text-xs text-[#5d5d5d] dark:text-[#A6A6A6] mt-1">
                                {assignedOpportunities.length > 0 ? '+100%' : '0%'} from last month
                            </p>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}