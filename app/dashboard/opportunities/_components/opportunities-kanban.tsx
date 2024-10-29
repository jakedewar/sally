"use client"

import { useState, useRef, useEffect } from 'react'
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'
import { SortableItem } from './sortable-item'
import { Opportunity } from '../types'

// Update the Opportunity type to match the Prisma schema
// type Opportunity = { ... }

// Use the imported Opportunity type instead
import { Opportunity } from '../types'

const stages = ['Discovery', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']

export default function OpportunitiesKanban({ opportunities, setOpportunities }: { opportunities: Opportunity[], setOpportunities: (opportunities: Opportunity[]) => void }) {
    const [activeId, setActiveId] = useState<string | null>(null)
    const router = useRouter()
    const isDragging = useRef(false)

    const updateOpportunity = async (id: string, newStage: string) => {
        try {
            const response = await fetch(`/api/opportunities/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stage: newStage }),
            })
            if (!response.ok) {
                throw new Error('Failed to update opportunity')
            }
        } catch (error) {
            console.error('Error updating opportunity:', error)
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragStart = (event: any) => {
        const { active } = event
        setActiveId(active.id)
        isDragging.current = true
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        console.log('Drag ended:', { active, over })

        if (!over) {
            setActiveId(null)
            isDragging.current = false
            return
        }

        const activeOpportunity = opportunities.find(opp => opp.id === active.id)
        console.log('Active opportunity:', activeOpportunity)

        // Extract the stage from the over.id
        const newStage = over.id.replace('-column', '')
        console.log('New stage:', newStage)

        if (activeOpportunity && newStage && activeOpportunity.stage !== newStage) {
            console.log('Updating opportunity stage')
            setOpportunities(opportunities.map(opp =>
                opp.id === active.id ? { ...opp, stage: newStage } : opp
            ))
            updateOpportunity(active.id, newStage)
        } else {
            console.log('No update needed')
        }

        setActiveId(null)
        isDragging.current = false
    }

    const handleDragOver = (event: any) => {
        // This function can be left empty as we're handling the stage update in handleDragEnd
    }

    const handleCardClick = (id: string) => {
        if (!isDragging.current) {
            router.push(`/dashboard/opportunities/${id}`)
        }
    }

    const getOpportunityContent = (opportunity: Opportunity) => (
        <Card
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
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col sm:flex-row overflow-x-auto w-full gap-4 pb-4 h-[calc(100vh-200px)]">
                {stages.map((stage) => {
                    const stageOpportunities = opportunities.filter(opp => opp.stage === stage)
                    return (
                        <div 
                            key={stage} 
                            id={`${stage}-column`} 
                            className="bg-gray-100 dark:bg-[#1A1A1A] p-2 sm:p-4 border border-gray-200 dark:border-[#333333] rounded-lg flex-1 min-w-[250px] sm:min-w-[300px] flex flex-col mb-4 sm:mb-0"
                        >
                            <h3 className="font-semibold mb-2 sm:mb-4 text-sm sm:text-base text-foreground dark:text-[#F9F9FF]">{stage}</h3>
                            <div className="flex-grow overflow-y-auto">
                                <SortableContext
                                    items={stageOpportunities.map(opp => opp.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {stageOpportunities.map((opportunity) => (
                                        <SortableItem key={opportunity.id} id={opportunity.id}>
                                            {activeId !== opportunity.id && getOpportunityContent(opportunity)}
                                        </SortableItem>
                                    ))}
                                </SortableContext>
                            </div>
                        </div>
                    )
                })}
            </div>
            <DragOverlay>
                {activeId ? getOpportunityContent(opportunities.find(opp => opp.id === activeId)!) : null}
            </DragOverlay>
        </DndContext>
    )
}