"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    CalendarDays,
    DollarSign,
    Users,
    BarChart,
    FileText,
    MessageSquare,
    Info,
    ListTodo,
    ArrowLeft,
    Edit,
    Calendar,
    Trash2,
    Plus,
    ListChecks,
    Eye,
} from 'lucide-react'

interface Note {
    id: string;
    content: string;
    createdAt: string;
    authorId: string;
    author: {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
    };
    authorName?: string;
}

interface Opportunity {
    id: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    value: number;
    stage: string;
    priority: string;
    lastUpdated: string;
    createdAt: string;
    description: string | null;
    saRequestNotes: string | null;
    technologyStack: string[];
    integrationRequirements: string[];
    complianceRequirements: string[];
    nextSteps: string | null;
    assignedSAId: string | null;
    createdById: string;
    notes: Note[];
    assignedSA: {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
    } | null;
    createdBy: {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
    };
}

export default function OpportunityPage({ params }: { params: { id: string } }) {
    const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
    const { user } = useUser()

    useEffect(() => {
        fetchOpportunity()
    }, [params.id])

    const fetchOpportunity = async () => {
        try {
            const response = await fetch(`/api/opportunities/${params.id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch opportunity')
            }
            const data = await response.json()
            setOpportunity(data)
        } catch (error) {
            console.error('Error fetching opportunity:', error)
        }
    }

    if (!opportunity) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-6">
            <Link href="/dashboard/opportunities" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Opportunities
            </Link>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold">{opportunity.companyName}</h1>
                    <p className="text-gray-500">{opportunity.contactName} - {opportunity.contactEmail}</p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Value
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${opportunity.value.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Stage
                        </CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{opportunity.stage}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Priority
                        </CardTitle>
                        <Info className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <Badge variant={opportunity.priority === 'high' ? 'destructive' : opportunity.priority === 'medium' ? 'default' : 'secondary'}>
                            {opportunity.priority}
                        </Badge>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="details" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <Card>
                        <CardHeader>
                            <CardTitle>Opportunity Details</CardTitle>
                            <CardDescription>
                                View and manage the details of this opportunity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Created By</h3>
                                    {opportunity.createdBy ? (
                                        <>
                                            <p>{`${opportunity.createdBy.firstName || ''} ${opportunity.createdBy.lastName || ''}`.trim() || 'N/A'}</p>
                                            <p className="text-sm text-gray-500">{opportunity.createdBy.email || 'N/A'}</p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-500">Information not available</p>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Assigned SA</h3>
                                    {opportunity.assignedSA ? (
                                        <>
                                            <p>{`${opportunity.assignedSA.firstName || ''} ${opportunity.assignedSA.lastName || ''}`.trim() || 'N/A'}</p>
                                            <p className="text-sm text-gray-500">{opportunity.assignedSA.email || 'N/A'}</p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-500">Not assigned</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Description</h3>
                                <p>{opportunity.description}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">SA Request Notes</h3>
                                <p>{opportunity.saRequestNotes}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Technology Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {opportunity.technologyStack.map((tech, index) => (
                                        <Badge key={index} variant="outline">{tech}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Integration Requirements</h3>
                                <div className="flex flex-wrap gap-2">
                                    {opportunity.integrationRequirements.map((req, index) => (
                                        <Badge key={index} variant="outline">{req}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Compliance Requirements</h3>
                                <div className="flex flex-wrap gap-2">
                                    {opportunity.complianceRequirements.map((req, index) => (
                                        <Badge key={index} variant="outline">{req}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Next Steps</h3>
                                <p>{opportunity.nextSteps}</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notes">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notes</CardTitle>
                            <CardDescription>
                                Add and view notes related to this opportunity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {opportunity.notes && opportunity.notes.length > 0 ? (
                                    opportunity.notes.map((note) => (
                                        <div key={note.id} className="bg-gray-100 p-4 rounded-lg">
                                            <p className="text-sm text-gray-500 mb-2">
                                                {new Date(note.createdAt).toLocaleString()} - {note.authorName}
                                            </p>
                                            <p>{note.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No notes available for this opportunity.</p>
                                )}
                            </div>
                            <Separator className="my-4" />
                            <Textarea placeholder="Add a new note..." className="mb-2" />
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Note
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="activity">
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Log</CardTitle>
                            <CardDescription>
                                View the activity history for this opportunity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead>User</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{new Date(opportunity.createdAt).toLocaleString()}</TableCell>
                                        <TableCell>Opportunity Created</TableCell>
                                        <TableCell>{opportunity.createdById === user?.id ? 'You' : 'Other User'}</TableCell>
                                    </TableRow>
                                    {/* Add more activity rows here */}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}