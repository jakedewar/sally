"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import { useUser } from '@clerk/nextjs'
import { Skeleton } from "@/components/ui/skeleton"
import { useOpportunities } from '@/lib/hooks/use-opportunities'

export default function PipelineRevenue() {
    const { data: opportunities, isLoading } = useOpportunities()
    const { user, isLoaded } = useUser()

    const assignedOpportunities = opportunities?.filter(
        opp => opp.assignedSAId === user?.id && opp.stage !== 'Closed Lost'
    ) || []
    
    const totalRevenue = assignedOpportunities.reduce((sum, opp) => sum + (opp.value || 0), 0)

    const formatRevenue = (amount: number) => {
        if (amount >= 1000000) {
            return `$${(amount / 1000000).toFixed(1)}M`
        } else if (amount >= 1000) {
            return `$${(amount / 1000).toFixed(1)}k`
        }
        return `$${amount.toFixed(0)}`
    }

    if (!isLoaded) {
        return (
            <div className="">
                <Card className="bg-white dark:bg-[#000000] border border-gray-300 dark:border-[#333333]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Loading...</CardTitle>
                        <DollarSign className="h-4 w-4 text-[#5D51FF]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-20 mb-1" />
                        <Skeleton className="h-4 w-32" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="">
            <Card className="bg-white dark:bg-[#000000] border border-gray-300 dark:border-[#333333]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#1e1e1e] dark:text-[#F9F9FF]">
                        Current Pipeline Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-[#5D51FF]" />
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
                                {formatRevenue(totalRevenue)}
                            </div>
                            <p className="text-xs text-[#5d5d5d] dark:text-[#A6A6A6] mt-1">
                                {totalRevenue > 0 ? '+100%' : '0%'} from last quarter
                            </p>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}