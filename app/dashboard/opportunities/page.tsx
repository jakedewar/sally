"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { TableIcon, LayoutGridIcon, CalendarIcon } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OpportunitiesTable from './_components/opportunities-table'
import OpportunitiesKanban from './_components/opportunities-kanban'
import OpportunitiesCalendar from './_components/opportunities-calendar'
import AddOpportunityModal from './_components/add-opportunity-modal'
import { Opportunity } from './types'

export default function OpportunitiesPage() {
    const [view, setView] = useState<'table' | 'kanban' | 'calendar'>('kanban')
    const [opportunities, setOpportunities] = useState<Opportunity[]>([])
    const [filter, setFilter] = useState('all')
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useUser()

    useEffect(() => {
        const fetchOpportunities = async () => {
            setIsLoading(true)
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

    const filteredOpportunities = opportunities.filter((opp) => {
        if (filter === 'all') return true
        if (filter === 'assigned') return opp.assignedSAId === user?.id
        if (filter === 'created') return opp.createdById === user?.id
        return true
    })

    return (
        <div className='p-6 dark:bg-[#000000]'>
            <div className='flex flex-col gap-2 mb-6'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-normal text-[#1e1e1e] dark:text-[#F9F9FF]'>
                        Opportunities
                    </h1>
                    <AddOpportunityModal />
                </div>
                <p className='text-sm text-[#5d5d5d]'>View your current and previous opportunities</p>
            </div>

            <Tabs value={view} onValueChange={(value) => setView(value as 'table' | 'kanban' | 'calendar')} className="mb-6">
                <TabsList>
                    <TabsTrigger
                        value="kanban"
                        className="data-[state=active]:text-[#5D51FF]"
                    >
                        <LayoutGridIcon className="mr-2 h-4 w-4" />
                        Kanban
                    </TabsTrigger>
                    <TabsTrigger
                        value="table"
                        className="data-[state=active]:text-[#5D51FF]"
                    >
                        <TableIcon className="mr-2 h-4 w-4" />
                        Table
                    </TabsTrigger>
                    <TabsTrigger
                        value="calendar"
                        className="data-[state=active]:text-[#5D51FF]"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Calendar
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="mb-4">
                <Button 
                    onClick={() => setFilter('all')} 
                    variant={filter === 'all' ? 'default' : 'outline'}
                    className="mr-2"
                >
                    All
                </Button>
                <Button 
                    onClick={() => setFilter('assigned')} 
                    variant={filter === 'assigned' ? 'default' : 'outline'}
                    className="mr-2"
                >
                    Assigned to Me
                </Button>
                <Button 
                    onClick={() => setFilter('created')} 
                    variant={filter === 'created' ? 'default' : 'outline'}
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
                    setOpportunities={setOpportunities}
                    isLoading={isLoading}
                />
            )}
            {view === 'calendar' && (
                <OpportunitiesCalendar 
                    opportunities={filteredOpportunities}
                    isLoading={isLoading}
                />
            )}
        </div>
    )
}