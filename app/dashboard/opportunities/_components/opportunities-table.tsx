'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Checkbox } from "@/components/ui/checkbox"
import { 
    Tooltip, 
    TooltipContent, 
    TooltipTrigger, 
    TooltipProvider 
} from "@/components/ui/tooltip"
import { formatDistanceToNow } from 'date-fns'

// Add these imports if you implement pagination
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Update the Opportunity type to match the Prisma schema
type Opportunity = {
    id: string
    companyName: string
    contactName: string
    contactEmail: string
    value: number
    stage: string
    priority: string
    lastUpdated: string
    assignedSAId: string | null
    createdById: string
}

interface OpportunitiesTableProps {
    opportunities: Opportunity[];
    isLoading: boolean;
}

export default function OpportunitiesTable({ opportunities, isLoading }: OpportunitiesTableProps) {
    const { user } = useUser();
    const [sortColumn, setSortColumn] = useState<keyof Opportunity>('lastUpdated')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const handleSort = (column: keyof Opportunity) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }

        // Note: We're not modifying the original opportunities array here
        // as it's passed as a prop. Instead, you might want to implement
        // sorting logic in the parent component or use a state management solution.
    }

    const SortIcon = ({ column }: { column: keyof Opportunity }) => {
        if (column !== sortColumn) return <ChevronUp className="h-4 w-4 invisible" />
        return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
    }

    // Format currency with proper localization
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

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

    const getStageColor = (stage: string) => {
        switch (stage.toLowerCase()) {
            case 'qualified':
                return 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200 transition-colors'
            case 'proposal':
                return 'bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-200 transition-colors'
            case 'closed':
                return 'bg-green-100 hover:bg-green-200 text-green-800 border-green-200 transition-colors'
            default:
                return 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200 transition-colors'
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64 border rounded-md bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (opportunities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 border rounded-md bg-background">
                <p className="text-muted-foreground mb-4">No opportunities found</p>
                <Button variant="outline">Add New Opportunity</Button>
            </div>
        )
    }

    return (
        <TooltipProvider>
            <div className="space-y-4">
                {selectedRows.length > 0 && (
                    <div className="bg-muted/50 p-4 rounded-md flex items-center justify-between">
                        <span className="text-foreground">{selectedRows.length} items selected</span>
                        <div className="space-x-2">
                            <Button variant="outline" size="sm">Assign</Button>
                            <Button variant="outline" size="sm">Delete</Button>
                        </div>
                    </div>
                )}
                
                <div className="border border-border bg-background rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[30px] p-4">
                                    <Checkbox
                                        checked={selectedRows.length === opportunities.length}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedRows(opportunities.map(o => o.id))
                                            } else {
                                                setSelectedRows([])
                                            }
                                        }}
                                    />
                                </TableHead>
                                <TableHead className="w-[200px] cursor-pointer p-4" onClick={() => handleSort('companyName')}>
                                    <div className="flex items-center">
                                        Company Name <SortIcon column="companyName" />
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer p-4" onClick={() => handleSort('contactName')}>
                                    <div className="flex items-center">
                                        Contact Name <SortIcon column="contactName" />
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer p-4" onClick={() => handleSort('value')}>
                                    <div className="flex items-center">
                                        Value <SortIcon column="value" />
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer p-4" onClick={() => handleSort('stage')}>
                                    <div className="flex items-center">
                                        Stage <SortIcon column="stage" />
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer p-4" onClick={() => handleSort('priority')}>
                                    <div className="flex items-center">
                                        Priority <SortIcon column="priority" />
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer p-4" onClick={() => handleSort('lastUpdated')}>
                                    <div className="flex items-center">
                                        Last Updated <SortIcon column="lastUpdated" />
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer p-4" onClick={() => handleSort('assignedSAId')}>
                                    <div className="flex items-center">
                                        Assigned SA <SortIcon column="assignedSAId" />
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer p-4" onClick={() => handleSort('createdById')}>
                                    <div className="flex items-center">
                                        Created By <SortIcon column="createdById" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-right p-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {opportunities.map((opportunity) => (
                                <TableRow 
                                    key={opportunity.id}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    <TableCell className="p-4">
                                        <Checkbox
                                            checked={selectedRows.includes(opportunity.id)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setSelectedRows([...selectedRows, opportunity.id])
                                                } else {
                                                    setSelectedRows(selectedRows.filter(id => id !== opportunity.id))
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{opportunity.companyName}</TableCell>
                                    <TableCell>{opportunity.contactName}</TableCell>
                                    <TableCell>{formatCurrency(opportunity.value)}</TableCell>
                                    <TableCell>
                                        <Badge className={getStageColor(opportunity.stage)}>
                                            {opportunity.stage}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getPriorityColor(opportunity.priority)}>
                                            {opportunity.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                {formatDistanceToNow(new Date(opportunity.lastUpdated), { addSuffix: true })}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {new Date(opportunity.lastUpdated).toLocaleString()}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>{opportunity.assignedSAId === user?.id ? 'You' : 'Other SA'}</TableCell>
                                    <TableCell>{opportunity.createdById === user?.id ? 'You' : 'Other SA'}</TableCell>
                                    <TableCell className="text-right p-4">
                                        <Link href={`/dashboard/opportunities/${opportunity.id}`}>
                                            <Button variant="outline" size="sm">View</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Rows per page</span>
                        <Select
                            value={String(itemsPerPage)}
                            onValueChange={(value) => setItemsPerPage(Number(value))}
                        >
                            <SelectTrigger className="w-[70px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Page {currentPage} of {Math.ceil(opportunities.length / itemsPerPage)}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === Math.ceil(opportunities.length / itemsPerPage)}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}