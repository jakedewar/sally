"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'
import { Opportunity } from '../types'
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from 'date-fns'
import { User2, Calendar, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
        case 'high':
            return 'bg-red-100 hover:bg-red-200 text-red-800 border-red-200 transition-colors'
        case 'medium':
            return 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-yellow-200 transition-colors'
        default:
            return 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200 transition-colors'
    }
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

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
            className="mb-4 cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col w-full border-border hover:border-primary/20 bg-background"
            onClick={() => handleCardClick(opportunity.id)}
        >
            <CardHeader className="pb-2 flex-shrink-0 space-y-2">
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-sm sm:text-base lg:text-lg truncate text-foreground">
                        {opportunity.companyName}
                    </CardTitle>
                    <Badge className={`shrink-0 ${getPriorityColor(opportunity.priority)}`}>
                        {opportunity.priority}
                    </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User2 className="h-4 w-4" />
                    <span className="truncate">{opportunity.contactName}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600 dark:text-green-500" />
                    <span className="font-semibold text-green-600 dark:text-green-500">
                        {formatCurrency(opportunity.value)}
                    </span>
                </div>
                
                {opportunity.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {opportunity.description}
                    </p>
                )}
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-2 border-t border-border">
                    <Calendar className="h-3 w-3" />
                    <span>
                        Updated {formatDistanceToNow(new Date(opportunity.lastUpdated), { addSuffix: true })}
                    </span>
                </div>
            </CardContent>
        </Card>
    )

    const getOpportunitiesByStage = (stage: string) => {
        return opportunities.filter(opp => opp.stage === stage)
    }

    return (
        <div className="flex gap-2 sm:gap-4 overflow-x-auto h-full pb-6">
            {stages.map((stage) => {
                const stageOpportunities = getOpportunitiesByStage(stage)
                const isEmpty = stageOpportunities.length === 0

                return (
                    <AnimatePresence key={stage}>
                        <motion.div
                            initial={{ width: "280px", opacity: 1 }}
                            animate={{
                                width: isEmpty ? "64px" : "min(280px, calc(100vw - 2rem))",
                                opacity: isEmpty ? 0.7 : 1,
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className={`flex-shrink-0 ${
                                isEmpty ? 'border-dashed' : 'border-solid'
                            } border border-border rounded-lg bg-background flex flex-col h-full`}
                        >
                            <div className={`p-3 sm:p-4 border-b border-border flex-shrink-0 ${
                                isEmpty ? 'h-full flex items-center justify-center' : ''
                            }`}>
                                <motion.div
                                    animate={{
                                        transform: isEmpty ? "rotate(-90deg)" : "rotate(0deg)",
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex items-center justify-between gap-2 ${
                                        isEmpty ? 'origin-center whitespace-nowrap' : ''
                                    }`}
                                >
                                    <span className="font-medium text-sm sm:text-base text-foreground">
                                        {stage}
                                    </span>
                                    <span className={`text-xs sm:text-sm text-muted-foreground ${
                                        isEmpty ? 'ml-2' : ''
                                    }`}>
                                        {stageOpportunities.length}
                                    </span>
                                </motion.div>
                            </div>

                            {!isEmpty && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-3 sm:p-4 space-y-3 sm:space-y-4 flex-grow overflow-y-auto"
                                >
                                    {isLoading ? (
                                        Array(3).fill(0).map((_, index) => (
                                            <SkeletonCard key={`skeleton-${stage}-${index}`} />
                                        ))
                                    ) : (
                                        stageOpportunities.map((opportunity) => (
                                            getOpportunityContent(opportunity)
                                        ))
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )
            })}
        </div>
    )
}