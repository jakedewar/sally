"use client"

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { TableIcon, LayoutGridIcon, CalendarIcon } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OpportunitiesTable from './_components/opportunities-table'
import OpportunitiesKanban from './_components/opportunities-kanban'
import OpportunitiesCalendar from './_components/opportunities-calendar'
import AddOpportunityModal from './_components/add-opportunity-modal'
import { useOpportunities, useUpdateOpportunity } from '@/lib/hooks/use-opportunities'
import { Opportunity } from './types'

export default function OpportunitiesPage() {
    const [view, setView] = useState<'table' | 'kanban' | 'calendar'>('kanban')
    const [filter, setFilter] = useState('all')
    const { user } = useUser()
    const { data: opportunities, isLoading } = useOpportunities()
    const { mutate: updateOpportunity } = useUpdateOpportunity()

    const filteredOpportunities = opportunities?.filter((opp) => {
        if (filter === 'all') return true
        if (filter === 'assigned') return opp.assignedSAId === user?.id
        if (filter === 'created') return opp.createdById === user?.id
        return true
    }) || []

    const handleSetOpportunities = (newOpportunities: Opportunity[]) => {
        newOpportunities.forEach(opportunity => {
            updateOpportunity({ 
                id: opportunity.id, 
                data: opportunity 
            })
        })
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold mb-2">Opportunities</h1>
                    <p className="text-sm text-gray-500">Manage and track your opportunities</p>
                </div>
                <AddOpportunityModal />
            </div>

            <Tabs defaultValue={view} className="mb-6" onValueChange={(value: any) => setView(value)}>
                <TabsList>
                    <TabsTrigger value="kanban">
                        <LayoutGridIcon className="w-4 h-4 mr-2" />
                        Kanban
                    </TabsTrigger>
                    <TabsTrigger value="table">
                        <TableIcon className="w-4 h-4 mr-2" />
                        Table
                    </TabsTrigger>
                    <TabsTrigger value="calendar">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Calendar
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="mb-6">
                <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilter('all')}
                    className="mr-2"
                >
                    All
                </Button>
                <Button
                    variant={filter === 'assigned' ? 'default' : 'outline'}
                    onClick={() => setFilter('assigned')}
                    className="mr-2"
                >
                    Assigned to Me
                </Button>
                <Button
                    variant={filter === 'created' ? 'default' : 'outline'}
                    onClick={() => setFilter('created')}
                >
                    Created by Me
                </Button>
            </div>

            {view === 'table' && (
                <OpportunitiesTable
                    opportunities={filteredOpportunities}
                    isLoading={isLoading}
                />
            )}
            {view === 'kanban' && (
                <OpportunitiesKanban
                    opportunities={filteredOpportunities}
                    setOpportunities={handleSetOpportunities}
                    isLoading={isLoading}
                />
            )}
        </div>
    )
}