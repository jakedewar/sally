'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs';

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

export default function OpportunitiesTable({ opportunities }: { opportunities: Opportunity[] }) {
    const { user } = useUser();
    const [sortColumn, setSortColumn] = useState<keyof Opportunity>('lastUpdated')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

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

    return (
        <div className='border border-gray-200 bg-white rounded-md'>
            <Table>
                <TableHeader>
                    <TableRow>
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
                        <TableRow key={opportunity.id}>
                            <TableCell>{opportunity.companyName}</TableCell>
                            <TableCell>{opportunity.contactName}</TableCell>
                            <TableCell>{opportunity.contactEmail}</TableCell>
                            <TableCell>${opportunity.value.toFixed(2)}</TableCell>
                            <TableCell>{opportunity.stage}</TableCell>
                            <TableCell>
                                <Badge variant={opportunity.priority === 'high' ? 'destructive' : opportunity.priority === 'medium' ? 'default' : 'secondary'}>
                                    {opportunity.priority}
                                </Badge>
                            </TableCell>
                            <TableCell>{new Date(opportunity.lastUpdated).toLocaleDateString()}</TableCell>
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
    )
}