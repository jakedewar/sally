"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { PlusCircle, ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useUser } from "@clerk/nextjs"

// Update the Opportunity interface to match the Prisma schema
interface Opportunity {
    id: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    value: number;
    stage: string;
    priority: string;
    lastUpdated: Date;
    createdAt: Date;
    description?: string;
    saRequestNotes?: string;
    technologyStack: string[];
    integrationRequirements: string[];
    complianceRequirements: string[];
    nextSteps?: string;
    assignedSAId?: string;
    createdById: string;
    notes: Note[];
}

// Update the Note interface to match the Prisma schema
interface Note {
    id: string;
    content: string;
    createdAt: Date;
    author: string;
    opportunityId: string;
}

// Add this helper function at the top of the component
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export default function AddOpportunityModal() {
    const session = useUser()
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [opportunity, setOpportunity] = useState<Partial<Opportunity>>({
        companyName: '',
        contactName: '',
        contactEmail: '',
        value: 0,
        stage: '',
        priority: '',
        description: '',
        saRequestNotes: '',
        technologyStack: [],
        integrationRequirements: [],
        complianceRequirements: [],
        nextSteps: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setOpportunity(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setOpportunity(prev => ({ ...prev, [name]: value }))
    }

    const handleArrayInput = (e: React.KeyboardEvent<HTMLInputElement>, field: keyof Opportunity) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const value = e.currentTarget.value.trim()
            if (value) {
                setOpportunity(prev => ({
                    ...prev,
                    [field]: [...(prev[field] as string[] || []), value]
                }))
                e.currentTarget.value = ''
            }
        }
    }

    const removeArrayItem = (field: keyof Opportunity, index: number) => {
        setOpportunity(prev => ({
            ...prev,
            [field]: (prev[field] as string[]).filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!session?.user?.id) {
                throw new Error('User not authenticated');
            }

            const formattedOpportunity = {
                companyName: opportunity.companyName,
                contactName: opportunity.contactName,
                contactEmail: opportunity.contactEmail,
                value: Math.abs(parseFloat(opportunity.value?.toString() || '0')),
                stage: opportunity.stage,
                priority: opportunity.priority,
                description: opportunity.description,
                saRequestNotes: opportunity.saRequestNotes,
                technologyStack: opportunity.technologyStack,
                integrationRequirements: opportunity.integrationRequirements,
                complianceRequirements: opportunity.complianceRequirements,
                nextSteps: opportunity.nextSteps,
            };

            console.log("Sending opportunity data:", formattedOpportunity);

            const response = await fetch('/api/opportunities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedOpportunity),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add opportunity');
            }

            const data = await response.json();
            console.log('Opportunity added:', data);
            toast({
                title: "Opportunity added",
                description: "The new opportunity has been successfully added.",
            })
            setIsOpen(false)
            setCurrentStep(0)
            // You might want to refresh the opportunities list or update the UI here
        } catch (error: unknown) {
            console.error('Error adding opportunity:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to add the opportunity. Please try again.",
                variant: "destructive",
            })
        }
    }

    // Update the steps content to use the new field names
    const steps = [
        {
            title: "Basic Information",
            content: (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input
                                id="companyName"
                                name="companyName"
                                value={opportunity.companyName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="contactName">Contact Name</Label>
                            <Input
                                id="contactName"
                                name="contactName"
                                value={opportunity.contactName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            value={opportunity.contactEmail}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="value">Monthly Recurring Revenue (MRR)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <Input
                                    id="value"
                                    name="value"
                                    type="number"
                                    min="0"
                                    step="100"
                                    value={opportunity.value ?? ''}
                                    onChange={handleInputChange}
                                    className="pl-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="0"
                                    required
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">/month</span>
                            </div>
                            {(opportunity.value ?? 0) > 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Annual: {formatCurrency((opportunity.value ?? 0) * 12)}/year
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stage">Stage</Label>
                            <Select onValueChange={(value) => handleSelectChange('stage', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select stage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Discovery">Discovery</SelectItem>
                                    <SelectItem value="Proposal">Proposal</SelectItem>
                                    <SelectItem value="Negotiation">Negotiation</SelectItem>
                                    <SelectItem value="Closed_Won">Closed Won</SelectItem>
                                    <SelectItem value="Closed_Lost">Closed Lost</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select onValueChange={(value) => handleSelectChange('priority', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </>
            )
        },
        {
            title: "Description and Notes",
            content: (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={opportunity.description}
                            onChange={handleInputChange}
                            rows={3}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="saRequestNotes">SA Request Notes</Label>
                        <Textarea
                            id="saRequestNotes"
                            name="saRequestNotes"
                            value={opportunity.saRequestNotes}
                            onChange={handleInputChange}
                            rows={3}
                        />
                    </div>
                </>
            )
        },
        {
            title: "Technology and Requirements",
            content: (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="technologyStack">Technology Stack</Label>
                        <Input
                            id="technologyStack"
                            placeholder="Press Enter to add"
                            onKeyDown={(e) => handleArrayInput(e, 'technologyStack')}
                        />
                        <div className="flex flex-wrap gap-2">
                            {opportunity.technologyStack?.map((tech, index) => (
                                <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('technologyStack', index)}
                                        className="ml-2 text-secondary-foreground hover:text-primary-foreground"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="integrationRequirements">Integration Requirements</Label>
                        <Input
                            id="integrationRequirements"
                            placeholder="Press Enter to add"
                            onKeyDown={(e) => handleArrayInput(e, 'integrationRequirements')}
                        />
                        <div className="flex flex-wrap gap-2">
                            {opportunity.integrationRequirements?.map((req, index) => (
                                <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
                                    {req}
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('integrationRequirements', index)}
                                        className="ml-2 text-secondary-foreground hover:text-primary-foreground"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="complianceRequirements">Compliance Requirements</Label>
                        <Input
                            id="complianceRequirements"
                            placeholder="Press Enter to add"
                            onKeyDown={(e) => handleArrayInput(e, 'complianceRequirements')}
                        />
                        <div className="flex flex-wrap gap-2">
                            {opportunity.complianceRequirements?.map((req, index) => (
                                <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
                                    {req}
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('complianceRequirements', index)}
                                        className="ml-2 text-secondary-foreground hover:text-primary-foreground"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )
        },
        {
            title: "Next Steps",
            content: (
                <div className="grid gap-2">
                    <Label htmlFor="nextSteps">Next Steps</Label>
                    <Textarea
                        id="nextSteps"
                        name="nextSteps"
                        value={opportunity.nextSteps}
                        onChange={handleInputChange}
                        rows={3}
                    />
                </div>
            )
        }
    ]

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    className="bg-background hover:bg-accent text-[#5D51FF] hover:text-[#5D51FF] border-[#5D51FF]/20 hover:border-[#5D51FF]/30"
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Opportunity
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New Opportunity</DialogTitle>
                    <DialogDescription>
                        {steps[currentStep].title}
                    </DialogDescription>
                </DialogHeader>
                <div className="mb-4">
                    <div className="flex justify-between mb-2">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                        index < currentStep
                                            ? 'bg-[#5D51FF] text-white dark:text-white'
                                            : index === currentStep
                                                ? 'bg-[#5D51FF]/10 dark:bg-[#5D51FF]/20 text-[#5D51FF] border-2 border-[#5D51FF]'
                                                : 'bg-muted text-muted-foreground'
                                    }`}
                                >
                                    {index < currentStep ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        <span className="text-sm font-semibold">{index + 1}</span>
                                    )}
                                </div>
                                <span className={`text-xs mt-2 ${
                                    index <= currentStep 
                                        ? 'text-[#5D51FF] dark:text-[#8075FF] font-medium' 
                                        : 'text-muted-foreground'
                                }`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full mt-2">
                        <div
                            className="bg-[#5D51FF] dark:bg-[#8075FF] h-2 rounded-full transition-all duration-300 ease-in-out"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {steps[currentStep].content}
                    <div className="flex justify-between space-x-2">
                        <Button
                            type="button"
                            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                            disabled={currentStep === 0}
                            variant="outline"
                            className="hover:bg-[#5D51FF]/10 dark:hover:bg-[#5D51FF]/20 text-[#5D51FF] dark:text-[#8075FF] hover:text-[#5D51FF] border-[#5D51FF]/20"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>
                        {currentStep < steps.length - 1 ? (
                            <Button
                                type="button"
                                onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                                className="bg-[#5D51FF] dark:bg-[#8075FF] text-white hover:bg-[#4B41CC] dark:hover:bg-[#6A61DD]"
                            >
                                Next
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="bg-[#5D51FF] dark:bg-[#8075FF] text-white hover:bg-[#4B41CC] dark:hover:bg-[#6A61DD]"
                            >
                                Save Opportunity
                            </Button>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}