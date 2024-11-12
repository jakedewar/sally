'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Share2, ExternalLink, MessageSquare, FileText, Users, Calendar, LayoutDashboard, ListCheck, MessageCircle, BookOpen, Code2, PlayCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EngagementSummary from '../_components/engagement-summary'
import { useOpportunity } from '@/lib/hooks/use-opportunities'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton"

// First, let's define the types
interface IntegrationItem {
    id: string;
    name: string;
    description: string;
    considerations: string[];
    codeSnippet?: string;
}

interface IntegrationSection {
    title: string;
    items: IntegrationItem[];
}

interface ApiEndpoint {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    description: string;
    requestBody?: string;
}

interface ApiSection {
    title: string;
    description: string;
    endpoints: ApiEndpoint[];
    authType?: 'private' | 'public';
    authNote?: string;
}

// Define the integrationSections array with proper data
const integrationSections: IntegrationSection[] = [
    {
        title: "Initial Setup",
        items: [
            {
                id: "setup-1",
                name: "Install Klaviyo SDK",
                description: "Set up the Klaviyo SDK in your application",
                considerations: [
                    "Choose between client-side and server-side implementation",
                    "Ensure proper API key configuration"
                ],
                codeSnippet: "npm install @klaviyo/sdk"
            },
        ]
    },
]

const apiTestingSections: ApiSection[] = [
    {
        title: "Authentication",
        description: "Before testing any endpoints, ensure you have the correct authentication credentials",
        authNote: "Private API Key required for /api endpoints, Public Key (Company ID) required for /client endpoints",
        endpoints: [
            {
                method: 'GET',
                path: '/api/accounts/',
                description: 'Verify your authentication by retrieving account details',
            }
        ]
    },
    {
        title: "Profiles",
        description: "Test endpoints related to customer profiles management. These endpoints require private API key authentication.",
        authType: 'private',
        endpoints: [
            {
                method: 'GET',
                path: '/api/profiles/',
                description: 'Get all profiles with optional filtering'
            },
            {
                method: 'POST',
                path: '/api/profiles/',
                description: 'Create a new customer profile',
                requestBody: `{
  "type": "profile",
  "attributes": {
    "email": "test@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+1234567890",
    "properties": {
      "custom_field": "value"
    }
  }
}`
            },
            {
                method: 'PUT',
                path: '/api/profiles/{profile_id}/',
                description: 'Update an existing profile',
                requestBody: `{
  "type": "profile",
  "id": "profile_id",
  "attributes": {
    "first_name": "Updated Name"
  }
}`
            }
        ]
    },
    {
        title: "Events",
        description: "Test event tracking endpoints for monitoring customer behavior and activities",
        authType: 'private',
        endpoints: [
            {
                method: 'POST',
                path: '/api/events/',
                description: 'Track a custom event',
                requestBody: `{
  "type": "event",
  "attributes": {
    "metric": {
      "name": "Custom Event"
    },
    "profile": {
      "email": "test@example.com"
    },
    "properties": {
      "value": 42.99,
      "items": ["SKU123", "SKU456"]
    }
  }
}`
            },
            {
                method: 'GET',
                path: '/api/events/',
                description: 'Retrieve tracked events with optional filtering'
            }
        ]
    },
    {
        title: "Lists & Segments",
        description: "Manage marketing lists and dynamic segments",
        authType: 'private',
        endpoints: [
            {
                method: 'GET',
                path: '/api/lists/',
                description: 'Get all marketing lists'
            },
            {
                method: 'POST',
                path: '/api/lists/',
                description: 'Create a new marketing list',
                requestBody: `{
  "type": "list",
  "attributes": {
    "name": "New Customer List",
    "description": "A list of new customers"
  }
}`
            }
        ]
    }
]

interface ClientPortalProps {
    params: { id: string }
}

export default function ClientPortalDetail({ params }: ClientPortalProps) {
    const router = useRouter()
    const { data: opportunity, isLoading } = useOpportunity(params.id)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const [progress, setProgress] = useState(0)
    const [currentSalesStage, setCurrentSalesStage] = useState('discovery')
    const [newMessage, setNewMessage] = useState('')
    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        const totalItems = integrationSections.reduce((sum, section) => sum + section.items.length, 0)
        const completedItems = selectedItems.length
        setProgress((completedItems / totalItems) * 100)
    }, [selectedItems])

    const handleItemToggle = (itemId: string) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        )
    }

    const nextStep = () => {
        if (currentStep < integrationSections.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const currentSection = integrationSections[currentStep]

    const supportResources = [
        { title: "Klaviyo Docs", url: "https://developers.klaviyo.com/en/" },
        { title: "API Reference", url: "https://developers.klaviyo.com/en/reference/api-overview" },
        { title: "Community Forum", url: "https://community.klaviyo.com/" },
        { title: "Support Center", url: "https://help.klaviyo.com/" },
    ]

    const handleSendMessage = () => {
        // Implement message sending logic here
        console.log('Sending message:', newMessage)
        setNewMessage('')
    }

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                {/* Header skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-4 w-24" /> {/* Back button */}
                    <Skeleton className="h-8 w-2/3" /> {/* Title */}
                    <Skeleton className="h-4 w-1/2" /> {/* Subtitle */}
                </div>

                {/* Tab buttons skeleton */}
                <div className="flex gap-4 border-b">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-10 w-32" />
                    ))}
                </div>

                {/* Content skeleton - Grid layout */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Project Overview Card */}
                    <div className="border rounded-lg p-6 space-y-4">
                        <Skeleton className="h-6 w-40" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/6" />
                        </div>
                    </div>

                    {/* Engagement Summary Card */}
                    <div className="border rounded-lg p-6 space-y-4">
                        <Skeleton className="h-6 w-48" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>

                    {/* Progress Card */}
                    <div className="border rounded-lg p-6 space-y-4 md:col-span-2">
                        <Skeleton className="h-6 w-44" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </div>
        )
    }

    if (!opportunity) {
        return <div>Opportunity not found</div> // Consider adding a proper error state
    }

    return (
        <div className="p-6">
            <Link
                href={`/dashboard/opportunities/${params.id}`}
                className="inline-flex items-center text-sm text-[#5D51FF] hover:text-[#4840CC] mb-4"
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Opportunity
            </Link>
            <h1 className="text-2xl font-normal mb-2 text-[#1e1e1e] dark:text-[#F9F9FF]">
                {opportunity.companyName} Integration Portal
            </h1>
            <p className="text-sm text-[#5d5d5d] dark:text-[#A6A6A6] mb-6">
                Manage your integration with {opportunity.companyName}
            </p>
            <div className="space-y-6">
                <div className="flex gap-4 border-b">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'overview'
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('integration')}
                        className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'integration'
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <ListCheck className="h-4 w-4" />
                        Integration Checklist
                    </button>
                    <button
                        onClick={() => setActiveTab('communication')}
                        className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'communication'
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <MessageCircle className="h-4 w-4" />
                        Communication
                    </button>
                    <button
                        onClick={() => setActiveTab('api-testing')}
                        className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'api-testing'
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Code2 className="h-4 w-4" />
                        API Testing
                    </button>
                    <button
                        onClick={() => setActiveTab('resources')}
                        className={`flex items-center gap-2 px-4 py-2 ${activeTab === 'resources'
                            ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <BookOpen className="h-4 w-4" />
                        Resources
                    </button>
                </div>

                {activeTab === 'overview' && (
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h3 className="font-semibold mb-2">{opportunity.companyName} Integration</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {opportunity.description || "Custom integration project with detailed specifications and requirements."}
                                </p>
                                <h4 className="font-semibold mb-2">Key Specifications:</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    {opportunity.technologyStack.map((tech, index) => (
                                        <li key={index}>{tech}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <EngagementSummary opportunity={{ ...opportunity, description: opportunity.description || undefined }} />

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Integration Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 mb-2">
                                    <Progress value={progress} className="w-full" />
                                    <span className="text-sm font-medium">{Math.round(progress)}%</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Current Step: {currentStep + 1} of {integrationSections.length} - {currentSection.title}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'integration' && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Integration Checklist</CardTitle>
                                <CardDescription>Complete these steps to integrate with our platform</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {integrationSections.map((section, sectionIndex) => (
                                        <Accordion key={sectionIndex} type="single" collapsible>
                                            <AccordionItem value={`section-${sectionIndex}`}>
                                                <AccordionTrigger>{section.title}</AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="space-y-4 pt-4">
                                                        {section.items.map((item) => (
                                                            <div key={item.id} className="flex items-start space-x-4">
                                                                <Checkbox
                                                                    id={item.id}
                                                                    checked={selectedItems.includes(item.id)}
                                                                    onCheckedChange={() => handleItemToggle(item.id)}
                                                                />
                                                                <div className="space-y-1">
                                                                    <Label htmlFor={item.id}>{item.name}</Label>
                                                                    <p className="text-sm text-gray-500">{item.description}</p>
                                                                    {item.considerations && (
                                                                        <ul className="list-disc list-inside text-sm text-gray-500 ml-4">
                                                                            {item.considerations.map((consideration, i) => (
                                                                                <li key={i}>{consideration}</li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                    {item.codeSnippet && (
                                                                        <pre className="bg-gray-100 p-2 rounded-md text-sm mt-2">
                                                                            <code>{item.codeSnippet}</code>
                                                                        </pre>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-6">
                                    <Button
                                        variant="outline"
                                        onClick={prevStep}
                                        disabled={currentStep === 0}
                                    >
                                        <ChevronLeft className="mr-2 h-4 w-4" />
                                        Previous
                                    </Button>
                                    <Button
                                        onClick={nextStep}
                                        disabled={currentStep === integrationSections.length - 1}
                                    >
                                        Next
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'communication' && (
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Communication Hub</CardTitle>
                                <CardDescription>Discuss integration details and questions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="border rounded-lg p-4 space-y-4">
                                        {/* Example message */}
                                        <div className="flex items-start gap-4">
                                            <Avatar>
                                                <AvatarImage src="/avatars/01.png" />
                                                <AvatarFallback>TC</AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">Technical Consultant</p>
                                                <p className="text-sm text-gray-500">
                                                    Hi! I'm your dedicated technical consultant. Let me know if you have any questions about the integration process.
                                                </p>
                                                <p className="text-xs text-gray-400">2 hours ago</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Textarea
                                            placeholder="Type your message here..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <Button onClick={handleSendMessage} className="w-full">
                                            Send Message
                                            <MessageSquare className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'api-testing' && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>API Endpoint Testing</CardTitle>
                                <CardDescription>Test Klaviyo API endpoints in your development environment</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 mb-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-900 mb-2">Important Notes</h4>
                                        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                                            <li>All API requests must include proper authentication headers</li>
                                            <li>Rate limits apply to all endpoints (429 error if exceeded)</li>
                                            <li>Datetime values should be in ISO 8601 format (e.g., 2023-01-16T23:20:50.52Z)</li>
                                            <li>Test thoroughly in development before using in production</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {apiTestingSections.map((section, index) => (
                                        <div key={index} className="space-y-4">
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                {section.title}
                                                {section.authType && (
                                                    <span className={`text-xs px-2 py-1 rounded-full ${section.authType === 'private'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-green-100 text-green-700'
                                                        }`}>
                                                        {section.authType} key
                                                    </span>
                                                )}
                                            </h3>
                                            <p className="text-sm text-gray-500">{section.description}</p>
                                            {section.authNote && (
                                                <div className="text-sm text-amber-700 bg-amber-50 p-3 rounded-md">
                                                    ℹ️ {section.authNote}
                                                </div>
                                            )}
                                            <div className="space-y-4">
                                                {section.endpoints.map((endpoint, endpointIndex) => (
                                                    <div key={endpointIndex} className="border rounded-lg p-4 space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className={`px-2 py-1 rounded text-xs font-medium ${endpoint.method === 'GET'
                                                                    ? 'bg-blue-100 text-blue-700'
                                                                    : endpoint.method === 'POST'
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : endpoint.method === 'PUT'
                                                                            ? 'bg-yellow-100 text-yellow-700'
                                                                            : 'bg-red-100 text-red-700'
                                                                    }`}>
                                                                    {endpoint.method}
                                                                </span>
                                                                <code className="text-sm">{endpoint.path}</code>
                                                            </div>
                                                            <Button variant="outline" size="sm">
                                                                <PlayCircle className="h-4 w-4 mr-2" />
                                                                Test
                                                            </Button>
                                                        </div>
                                                        <p className="text-sm text-gray-600">{endpoint.description}</p>
                                                        {endpoint.requestBody && (
                                                            <pre className="bg-gray-50 p-3 rounded-md text-sm overflow-x-auto">
                                                                <code>{endpoint.requestBody}</code>
                                                            </pre>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'resources' && (
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Documentation & Resources</CardTitle>
                                <CardDescription>Essential resources for your integration</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {supportResources.map((resource, index) => (
                                        <a
                                            key={index}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-gray-500" />
                                                <span>{resource.title}</span>
                                            </div>
                                            <ExternalLink className="h-4 w-4 text-gray-500" />
                                        </a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Support Contacts</CardTitle>
                                <CardDescription>Your dedicated support team</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-3 border rounded-lg">
                                        <Avatar>
                                            <AvatarImage src="/avatars/02.png" />
                                            <AvatarFallback>TC</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">Technical Consultant</p>
                                            <p className="text-sm text-gray-500">technical.support@example.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 border rounded-lg">
                                        <Avatar>
                                            <AvatarImage src="/avatars/03.png" />
                                            <AvatarFallback>AM</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">Account Manager</p>
                                            <p className="text-sm text-gray-500">account.manager@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}