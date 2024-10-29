"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'
import { Opportunity } from '../types'
import { Skeleton } from "@/components/ui/skeleton"

const stages = ['Discovery', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']

const SkeletonCard = () => (
    <Card className="mb-4 w-full">
        <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-[140px]" />
                <Skeleton className="h-5 w-16" />
            </div>
        </CardHeader>
        <CardContent>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-4 w-full" />
        </CardContent>
    </Card>
)

export default function OpportunitiesKanban({ 
    opportunities, 
    setOpportunities, 
    isLoading = false 
}: { 
    opportunities: Opportunity[], 
    setOpportunities: (opportunities: Opportunity[]) => void,
    isLoading?: boolean
}) {
    const router = useRouter()

    const handleCardClick = (id: string) => {
        router.push(`/dashboard/opportunities/${id}`)
    }

    const getOpportunityContent = (opportunity: Opportunity) => (
        <Card
            key={opportunity.id}
            className="mb-4 cursor-pointer hover:shadow-md transition-shadow flex flex-col w-full"
            onClick={() => handleCardClick(opportunity.id)}
        >
            <CardHeader className="pb-2 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm sm:text-base lg:text-lg truncate">{opportunity.companyName}</CardTitle>
                    <Badge variant={opportunity.priority === 'high' ? 'destructive' : opportunity.priority === 'medium' ? 'default' : 'secondary'}>
                        {opportunity.priority}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
                <p className="font-semibold mb-2 text-sm sm:text-base">${opportunity.value.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 flex-grow">{opportunity.description}</p>
            </CardContent>
        </Card>
    )

    return (
        <div className="flex flex-col sm:flex-row overflow-x-auto w-full gap-4 pb-4 h-[calc(100vh-200px)]">
            {stages.map((stage) => {
                const stageOpportunities = opportunities.filter(opp => opp.stage === stage)
                return (
                    <div 
                        key={stage}
                        className="bg-gray-100 dark:bg-[#1A1A1A] p-2 sm:p-4 border border-gray-200 dark:border-[#333333] rounded-lg flex-1 min-w-[250px] sm:min-w-[300px] flex flex-col mb-4 sm:mb-0"
                    >
                        <h3 className="font-semibold mb-2 sm:mb-4 text-sm sm:text-base text-foreground dark:text-[#F9F9FF]">
                            {isLoading ? <Skeleton className="h-6 w-24" /> : stage}
                        </h3>
                        <div className="flex-grow overflow-y-auto">
                            {isLoading ? (
                                Array(3).fill(0).map((_, index) => (
                                    <SkeletonCard key={`skeleton-${stage}-${index}`} />
                                ))
                            ) : (
                                stageOpportunities.map((opportunity) => (
                                    getOpportunityContent(opportunity)
                                ))
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}