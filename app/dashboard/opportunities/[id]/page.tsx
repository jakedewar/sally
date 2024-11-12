"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    MoreVertical,
    ClipboardList,
    StickyNote,
    History,
    Target,
<<<<<<< HEAD
    X,
    Share2,
    Link as LinkIcon
=======
    X
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { useOpportunity } from '@/lib/hooks/use-opportunities'
import { useQueryClient } from '@tanstack/react-query'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

<<<<<<< HEAD
interface ClientPortal {
    id: string;
    opportunityId: string;
    accessToken: string;
    createdAt: string;
    lastAccessed?: string;
    isActive: boolean;
    expiresAt?: string;
}

=======
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
function OpportunityDetailsSkeleton() {
    return (
        <div className="container mx-auto p-6">
            <div className="mb-4">
                <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-6 w-24" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <Skeleton className="h-10 w-[400px]" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-72" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i}>
                                    <Skeleton className="h-4 w-32 mb-2" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function OpportunityPage({ params }: { params: { id: string } }) {
    const queryClient = useQueryClient()
    const { data: opportunity, isLoading } = useOpportunity(params.id)
    const { user } = useUser()
    const [newNote, setNewNote] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('details')
    const [meddpiccData, setMeddpiccData] = useState({
        metrics: '',
        economicBuyer: '',
        decisionCriteria: '',
        decisionProcess: '',
        paperProcess: '',
        implicitPain: '',
        championCoach: '',
        competition: ''
    })
<<<<<<< HEAD
    const [isGeneratingPortal, setIsGeneratingPortal] = useState(false)
    const [portalData, setPortalData] = useState<ClientPortal | null>(null)
    const [isLoadingPortal, setIsLoadingPortal] = useState(false)

    const handleAddNote = async () => {
        if (!newNote.trim()) return;

=======

    const handleAddNote = async () => {
        if (!newNote.trim()) return;
        
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/opportunities/${params.id}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newNote }),
            });

            if (!response.ok) {
                throw new Error('Failed to add note');
            }

<<<<<<< HEAD
            queryClient.invalidateQueries({
=======
            queryClient.invalidateQueries({ 
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                queryKey: ['opportunity', params.id]
            });
            setNewNote('');
            toast.success('Note added successfully');
        } catch (error) {
            console.error('Error adding note:', error);
            toast.error('Failed to add note');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this opportunity?')) {
            return;
        }

        try {
            const response = await fetch(`/api/opportunities/${params.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete opportunity');
            }

            toast.success('Opportunity deleted successfully');
            router.push('/dashboard/opportunities');
        } catch (error) {
            console.error('Error deleting opportunity:', error);
            toast.error('Failed to delete opportunity');
        }
    };

    const handleMeddpiccChange = (field: string, value: string) => {
        setMeddpiccData(prev => ({ ...prev, [field]: value }))
    }

    const handleMeddpiccSubmit = async () => {
        setIsSubmitting(true)
        try {
            const response = await fetch(`/api/opportunities/${params.id}/meddpicc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meddpiccData),
            })

            if (!response.ok) {
                throw new Error('Failed to update MEDDPICC data')
            }

            toast.success('MEDDPICC data updated successfully')
        } catch (error) {
            console.error('Error updating MEDDPICC data:', error)
            toast.error('Failed to update MEDDPICC data')
        } finally {
            setIsSubmitting(false)
        }
    }

<<<<<<< HEAD
    const handleViewClientPortal = () => {
        if (portalData?.accessToken) {
            window.open(`/portal/${portalData.accessToken}`, '_blank')
        }
    }

    const handleGeneratePortal = async () => {
        setIsGeneratingPortal(true)
        try {
            const response = await fetch(`/api/opportunities/${params.id}/portal`, {
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error('Failed to generate portal')
            }

            const data = await response.json()
            setPortalData(data)
            queryClient.invalidateQueries({ queryKey: ['opportunity', params.id] })
            toast.success('Client portal generated successfully')
        } catch (error) {
            console.error('Error generating portal:', error)
            toast.error('Failed to generate client portal')
        } finally {
            setIsGeneratingPortal(false)
        }
    }

    const fetchPortalData = async () => {
        setIsLoadingPortal(true)
        try {
            const response = await fetch(`/api/opportunities/${params.id}/portal`)
            if (response.ok) {
                const data = await response.json()
                setPortalData(data)
            }
        } catch (error) {
            console.error('Error fetching portal data:', error)
        } finally {
            setIsLoadingPortal(false)
        }
    }

    useEffect(() => {
        if (activeTab === 'portal') {
            fetchPortalData()
        }
    }, [activeTab, params.id])

=======
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
    if (!opportunity) {
        return <OpportunityDetailsSkeleton />
    }

    return (
<<<<<<< HEAD
        <div className="p-6">
            <Link href="/dashboard/opportunities" className="inline-flex items-center text-sm text-[#5D51FF] hover:text-[#4940CC] mb-4">
=======
        <div className="container mx-auto p-6">
            <Link href="/dashboard/opportunities" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4">
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Opportunities
            </Link>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold">{opportunity.companyName}</h1>
                    <p className="text-gray-500">{opportunity.contactName} - {opportunity.contactEmail}</p>
                </div>
                <div className="flex space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
<<<<<<< HEAD
                            <DropdownMenuItem
=======
                            <DropdownMenuItem 
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                                className="text-red-600"
                                onClick={handleDelete}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Value
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-[#5D51FF]" />
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
                        <BarChart className="h-4 w-4 text-[#5D51FF]" />
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
                        <Info className="h-4 w-4 text-[#5D51FF]" />
                    </CardHeader>
                    <CardContent>
                        <Badge variant={opportunity.priority === 'high' ? 'destructive' : opportunity.priority === 'medium' ? 'default' : 'secondary'}>
                            {opportunity.priority}
                        </Badge>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <div className="flex gap-4 border-b">
                    <button
                        onClick={() => setActiveTab('details')}
<<<<<<< HEAD
                        className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'details'
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
=======
                        className={`flex items-center gap-2 px-4 py-2 ${
                            activeTab === 'details' 
                                ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                    >
                        <ClipboardList className="h-4 w-4" />
                        Details
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
<<<<<<< HEAD
                        className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'notes'
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
=======
                        className={`flex items-center gap-2 px-4 py-2 ${
                            activeTab === 'notes' 
                                ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                    >
                        <StickyNote className="h-4 w-4" />
                        Notes
                    </button>
                    <button
                        onClick={() => setActiveTab('activity')}
<<<<<<< HEAD
                        className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'activity'
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
=======
                        className={`flex items-center gap-2 px-4 py-2 ${
                            activeTab === 'activity' 
                                ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                    >
                        <History className="h-4 w-4" />
                        Activity
                    </button>
                    <button
                        onClick={() => setActiveTab('meddpicc')}
<<<<<<< HEAD
                        className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'meddpicc'
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
=======
                        className={`flex items-center gap-2 px-4 py-2 ${
                            activeTab === 'meddpicc' 
                                ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                    >
                        <Target className="h-4 w-4" />
                        MEDDPICC
                    </button>
                    <button
                        onClick={() => setActiveTab('portal')}
<<<<<<< HEAD
                        className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'portal'
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
=======
                        className={`flex items-center gap-2 px-4 py-2 ${
                            activeTab === 'portal' 
                                ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                    >
                        <Users className="h-4 w-4" />
                        Client Portal
                    </button>
                </div>

                {activeTab === 'details' && (
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
                                        <div className="space-y-2">
                                            <div className="inline-block">
<<<<<<< HEAD
                                                <Badge
                                                    variant="secondary"
=======
                                                <Badge 
                                                    variant="secondary" 
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                                                    className="flex items-center gap-2 px-2 py-1 text-sm whitespace-nowrap rounded-lg"
                                                >
                                                    <Avatar className="h-5 w-5 rounded-lg">
                                                        <AvatarFallback className="text-xs bg-primary/10 rounded-lg">
                                                            {`${opportunity.createdBy.firstName?.[0] || ''}${opportunity.createdBy.lastName?.[0] || ''}`}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {`${opportunity.createdBy.firstName || ''} ${opportunity.createdBy.lastName || ''}`.trim() || 'N/A'}
                                                    <X className="h-3 w-3 cursor-pointer opacity-50 hover:opacity-100" />
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-500">{opportunity.createdBy.email || 'N/A'}</p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">Information not available</p>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Assigned SA</h3>
                                    {opportunity.assignedSA ? (
                                        <div className="space-y-2">
                                            <div className="inline-block">
<<<<<<< HEAD
                                                <Badge
                                                    variant="secondary"
=======
                                                <Badge 
                                                    variant="secondary" 
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                                                    className="flex items-center gap-2 px-2 py-1 text-sm whitespace-nowrap rounded-lg"
                                                >
                                                    <Avatar className="h-5 w-5 rounded-lg">
                                                        <AvatarFallback className="text-xs bg-primary/10 rounded-lg">
                                                            {`${opportunity.assignedSA.firstName?.[0] || ''}${opportunity.assignedSA.lastName?.[0] || ''}`}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {`${opportunity.assignedSA.firstName || ''} ${opportunity.assignedSA.lastName || ''}`.trim() || 'N/A'}
                                                    <X className="h-3 w-3 cursor-pointer opacity-50 hover:opacity-100" />
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-500">{opportunity.assignedSA.email || 'N/A'}</p>
                                        </div>
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
                )}

                {activeTab === 'notes' && (
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
                                        <div key={note.id} className="bg-muted/50 p-4 rounded-lg space-y-2 hover:bg-muted/70 transition-colors">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="text-xs bg-primary/10">
                                                        {note.authorName?.[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{note.authorName}</span>
                                                <span>•</span>
                                                <span>{new Date(note.createdAt).toLocaleString()}</span>
                                            </div>
                                            <p className="text-sm">{note.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">No notes available for this opportunity.</p>
                                    </div>
                                )}
                            </div>
                            <Separator className="my-4" />
<<<<<<< HEAD
                            <Textarea
                                placeholder="Add a new note..."
=======
                            <Textarea 
                                placeholder="Add a new note..." 
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                                className="mb-2"
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                            />
<<<<<<< HEAD
                            <Button
=======
                            <Button 
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                                onClick={handleAddNote}
                                disabled={isSubmitting || !newNote.trim()}
                            >
                                {isSubmitting ? (
                                    "Adding..."
                                ) : (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Note
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'activity' && (
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
                )}

                {activeTab === 'meddpicc' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>MEDDPICC Analysis</CardTitle>
                            <CardDescription>
                                Track deal status, performance, and effectiveness using the MEDDPICC sales methodology.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Object.entries(meddpiccData).map(([key, value]) => (
                                    <div key={key}>
                                        <Label htmlFor={key} className="text-sm font-medium">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </Label>
                                        <Textarea
                                            id={key}
                                            value={value}
                                            onChange={(e) => handleMeddpiccChange(key, e.target.value)}
                                            placeholder={`Enter ${key} details...`}
                                            className="mt-1"
                                        />
                                    </div>
                                ))}
                                <Button onClick={handleMeddpiccSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? "Updating..." : "Update MEDDPICC Data"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'portal' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Client Portal Management</CardTitle>
                            <CardDescription>
<<<<<<< HEAD
                                Generate and manage client portal access for this opportunity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {isLoadingPortal ? (
                                    <div className="space-y-4">
                                        <div className="text-center py-6">
                                            <Skeleton className="h-12 w-12 mx-auto mb-4 rounded-full" />
                                            <Skeleton className="h-4 w-48 mx-auto mb-2" />
                                            <Skeleton className="h-4 w-64 mx-auto mb-4" />
                                            <Skeleton className="h-10 w-40 mx-auto" />
                                        </div>
                                    </div>
                                ) : portalData ? (
                                    <>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold">Portal Status</h3>
                                                    <p className="text-sm text-gray-500">
                                                        {portalData.isActive ? 'Active' : 'Inactive'} • Created {new Date(portalData.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Badge variant={portalData.isActive ? "default" : "secondary"}>
                                                    {portalData.isActive ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Portal URL</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        readOnly
                                                        value={`${window.location.origin}/portal/${portalData.accessToken}`}
                                                        className="flex-1"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(`${window.location.origin}/portal/${portalData.accessToken}`)
                                                            toast.success('Portal URL copied to clipboard')
                                                        }}
                                                    >
                                                        <LinkIcon className="h-4 w-4 mr-2" />
                                                        Copy
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={handleViewClientPortal}
                                                    variant="outline"
                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Preview Portal
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        // Implement share functionality
                                                        // This could open a modal with sharing options
                                                    }}
                                                >
                                                    <Share2 className="mr-2 h-4 w-4" />
                                                    Share Portal
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="text-center py-6">
                                            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                            <h3 className="font-semibold mb-2">No Client Portal Generated</h3>
                                            <p className="text-sm text-gray-500 mb-4">
                                                Generate a unique client portal to share opportunity details and progress with your client.
                                            </p>
                                            <Button
                                                onClick={handleGeneratePortal}
                                                disabled={isGeneratingPortal}
                                            >
                                                {isGeneratingPortal ? (
                                                    "Generating..."
                                                ) : (
                                                    <>
                                                        <Plus className="mr-2 h-4 w-4" />
                                                        Generate Client Portal
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <Separator />

                                <div className="space-y-2">
                                    <h3 className="font-semibold">Portal Settings</h3>
                                    <p className="text-sm text-gray-500">
                                        Customize what information is visible to clients in the portal.
                                    </p>
                                    {/* Add portal settings controls here */}
=======
                                Manage client portal access and customize portal content for this opportunity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <Info className="h-5 w-5 text-yellow-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                Client portal functionality will be implemented soon. This will allow you to:
                                            </p>
                                            <ul className="list-disc ml-5 mt-2 text-sm text-yellow-700">
                                                <li>Generate unique client portal access</li>
                                                <li>Customize visible information</li>
                                                <li>Track client portal activity</li>
                                                <li>Manage document sharing</li>
                                            </ul>
                                        </div>
                                    </div>
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}