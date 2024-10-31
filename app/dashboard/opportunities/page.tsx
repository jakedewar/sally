"use client"

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { LayoutDashboard, TableIcon, LayoutGridIcon, X, Search } from 'lucide-react'
import AddOpportunityModal from './_components/add-opportunity-modal'
import { useOpportunities, useUpdateOpportunity } from '@/lib/hooks/use-opportunities'
import { Opportunity } from './types'
import OpportunitiesTable from './_components/opportunities-table'
import OpportunitiesKanban from './_components/opportunities-kanban'
import SearchBar from "@/components/ui/search-bar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function OpportunitiesPage() {
    const [view, setView] = useState<'table' | 'kanban'>('kanban')
    const [filter, setFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const { user } = useUser()
    const { data: opportunities, isLoading } = useOpportunities()
    const { mutate: updateOpportunity } = useUpdateOpportunity()

    const filteredOpportunities = opportunities?.filter((opp) => {
        const ownershipFilter = 
            filter === 'all' ? true :
            filter === 'assigned' ? opp.assignedSAId === user?.id :
            filter === 'created' ? opp.createdById === user?.id :
            true

        const searchFilter = searchQuery
            ? opp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              opp.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              opp.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
              opp.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              opp.stage.toLowerCase().includes(searchQuery.toLowerCase()) ||
              opp.priority.toLowerCase().includes(searchQuery.toLowerCase())
            : true

        return ownershipFilter && searchFilter
    }) || []

    const handleSetOpportunities = (newOpportunities: Opportunity[]) => {
        newOpportunities.forEach(opportunity => {
            updateOpportunity({ 
                id: opportunity.id, 
                data: opportunity 
            })
        })
    }

    const clearSearch = () => {
        setSearchQuery('')
    }

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold mb-2">Opportunities</h1>
                    <p className="text-sm text-gray-500">Manage and track your opportunities</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-[320px]">
                        <SearchBar 
                            onSearch={setSearchQuery}
                            placeholder="Search opportunities..."
                            value={searchQuery}
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-gray-100 p-1 rounded-full"
                            >
                                <X className="h-4 w-4 text-gray-500" />
                            </button>
                        )}
                    </div>
                    <AddOpportunityModal />
                </div>
            </div>

            {searchQuery && (
                <div className="mb-6 flex items-center gap-2 overflow-x-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
                        <Search className="h-4 w-4 flex-shrink-0" />
                        <span>Found {filteredOpportunities.length} results for</span>
                        <Badge variant="secondary" className="font-medium flex items-center gap-2">
                            {searchQuery}
                            <button
                                onClick={clearSearch}
                                className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Clear search</span>
                            </button>
                        </Badge>
                    </div>
                </div>
            )}

            <div className="flex gap-4 border-b mb-6 overflow-x-auto">
                <button
                    onClick={() => setView('kanban')}
                    className={`flex items-center gap-2 px-4 py-2 ${
                        view === 'kanban' 
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]' 
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <LayoutGridIcon className="h-4 w-4" />
                    <span className="whitespace-nowrap">Kanban</span>
                </button>
                <button
                    onClick={() => setView('table')}
                    className={`flex items-center gap-2 px-4 py-2 ${
                        view === 'table' 
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]' 
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <TableIcon className="h-4 w-4" />
                    <span className="whitespace-nowrap">Table</span>
                </button>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
                <Button
                    variant="ghost"
                    onClick={() => setFilter('all')}
                    className={cn(
                        "hover:bg-muted/60 transition-colors",
                        filter === 'all' 
                            ? "bg-[#5D51FF]/20 text-[#5D51FF] hover:bg-[#5D51FF]/30 dark:bg-[#5D51FF]/10 dark:text-[#5D51FF] dark:hover:bg-[#5D51FF]/20"
                            : "hover:bg-muted/50"
                    )}
                >
                    All
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setFilter('assigned')}
                    className={cn(
                        "hover:bg-muted/60 transition-colors",
                        filter === 'assigned'
                            ? "bg-[#5D51FF]/20 text-[#5D51FF] hover:bg-[#5D51FF]/30 dark:bg-[#5D51FF]/10 dark:text-[#5D51FF] dark:hover:bg-[#5D51FF]/20"
                            : "hover:bg-muted/50"
                    )}
                >
                    Assigned to Me
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setFilter('created')}
                    className={cn(
                        "hover:bg-muted/60 transition-colors",
                        filter === 'created'
                            ? "bg-[#5D51FF]/20 text-[#5D51FF] hover:bg-[#5D51FF]/30 dark:bg-[#5D51FF]/10 dark:text-[#5D51FF] dark:hover:bg-[#5D51FF]/20"
                            : "hover:bg-muted/50"
                    )}
                >
                    Created by Me
                </Button>
            </div>

            <div className="h-[calc(100vh-280px)] sm:h-[calc(100vh-300px)] md:h-[calc(100vh-320px)]">
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
        </div>
    )
}