'use client'

import { useState, useEffect } from 'react'
<<<<<<< HEAD
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useOpportunities } from '@/lib/hooks/use-opportunities' // Make sure this hook exists
import { Button } from "@/components/ui/button"

// Keep all existing interfaces and constants...

interface Opportunity {
  companyName: string;
  status: string;
  // ... other properties ...
}

export default function ClientPortal() {
  const router = useRouter()
  const { data: opportunities, isLoading: isLoadingOpportunities } = useOpportunities()

  if (isLoadingOpportunities) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-normal mb-6">Client Portal</h1>
        <div>Loading opportunities...</div>
      </div>
    )
  }

  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-normal mb-6">Client Portal</h1>
        <Card>
          <CardHeader>
            <CardTitle>No Opportunities Found</CardTitle>
            <CardDescription>Create an opportunity to get started with the client portal.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/dashboard/opportunities/new')}>
              Create Opportunity
            </Button>
          </CardContent>
        </Card>
      </div>
    )
=======
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Share2, ExternalLink, MessageSquare, FileText, Users, Calendar, LayoutDashboard, ListCheck, MessageCircle, BookOpen } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EngagementSummary from './_components/engagement-summary'

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
      // Add more items as needed
    ]
  },
  // Add more sections as needed
]

const salesStages = [
  { id: 'discovery', name: 'Discovery', description: 'Initial contact and needs assessment' },
  { id: 'demo', name: 'Demo', description: 'Product demonstration and feature showcase' },
  { id: 'proposal', name: 'Proposal', description: 'Formal proposal and pricing discussion' },
  { id: 'negotiation', name: 'Negotiation', description: 'Contract terms and final adjustments' },
  { id: 'closed', name: 'Closed', description: 'Deal closed and onboarding initiated' }
]

export default function ClientPortal() {
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
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
  }

  return (
    <div className="p-6">
<<<<<<< HEAD
      <h1 className="text-2xl font-normal mb-6">Select an Opportunity</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opportunity) => (
          <Card
            key={opportunity.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/dashboard/client-portal/${opportunity.id}`)}
          >
            <CardHeader>
              <CardTitle>{opportunity.companyName}</CardTitle>
              <CardDescription>{opportunity.stage}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {opportunity.description || 'No description available'}
              </p>
            </CardContent>
          </Card>
        ))}
=======
      <h1 className="text-2xl font-normal mb-2 text-[#1e1e1e] dark:text-[#F9F9FF]">TechStyle Boutique x Klaviyo</h1>
      <p className="text-sm text-[#5d5d5d] dark:text-[#A6A6A6] mb-6">Manage your integration with TechStyle Boutique and Klaviyo</p>
      <div className="space-y-6">
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 ${
              activeTab === 'overview' 
                ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('integration')}
            className={`flex items-center gap-2 px-4 py-2 ${
              activeTab === 'integration' 
                ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ListCheck className="h-4 w-4" />
            Integration Checklist
          </button>
          <button
            onClick={() => setActiveTab('communication')}
            className={`flex items-center gap-2 px-4 py-2 ${
              activeTab === 'communication' 
                ? 'text-[#5D51FF] border-b-2 border-[#5D51FF]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            Communication
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-4 py-2 ${
              activeTab === 'resources' 
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
                <h3 className="font-semibold mb-2">TechStyle Boutique Integration</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Custom e-commerce platform integration with Klaviyo for enhanced customer engagement and personalized marketing.
                </p>
                <h4 className="font-semibold mb-2">Key Specifications:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>E-commerce platform: Custom-built</li>
                  <li>Primary goals: User tracking, event logging, personalized emails</li>
                  <li>Key events: Product views, cart additions, checkouts, purchases</li>
                  <li>Advanced features: Custom events, server-side tracking</li>
                </ul>
              </CardContent>
            </Card>

            <EngagementSummary />

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
          <Card>
            <CardHeader>
              <CardTitle>{currentSection.title}</CardTitle>
              <CardDescription>Step {currentStep + 1} of {integrationSections.length}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSection.items.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={item.id}
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleItemToggle(item.id)}
                        />
                        <Label htmlFor={item.id} className="text-lg font-semibold">{item.name}</Label>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="considerations">
                          <AccordionTrigger>Implementation Considerations</AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc pl-5 space-y-1">
                              {item.considerations.map((consideration, index) => (
                                <li key={index} className="text-sm">{consideration}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        {item.codeSnippet && (
                          <AccordionItem value="code-snippet">
                            <AccordionTrigger>Code Snippet</AccordionTrigger>
                            <AccordionContent>
                              <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                                <code>{item.codeSnippet}</code>
                              </pre>
                            </AccordionContent>
                          </AccordionItem>
                        )}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <div className="flex justify-between p-6">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="outline"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={currentStep === integrationSections.length - 1}
              >
                {currentStep === integrationSections.length - 1 ? "Finish" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'communication' && (
          <Card>
            <CardHeader>
              <CardTitle>Communication Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Avatar>
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="font-semibold">Sarah (Solution Architect)</p>
                      <p className="text-sm text-gray-600">2 days ago</p>
                    </div>
                  </div>
                  <p>Hi TechStyle team, I've updated the integration checklist with some additional considerations for your custom events. Please take a look and let me know if you have any questions!</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Avatar>
                      <AvatarImage src="/avatars/02.png" alt="Avatar" />
                      <AvatarFallback>CT</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="font-semibold">Jake (TechStyle CTO)</p>
                      <p className="text-sm text-gray-600">1 day ago</p>
                    </div>
                  </div>
                  <p>Thanks Sarah! We've reviewed the updates and have a few questions about implementing the server-side tracking. Can we schedule a call to discuss?</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Type your message here..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button onClick={handleSendMessage}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'resources' && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Klaviyo Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {supportResources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      {resource.title}
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Project Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="flex items-center text-blue-500 hover:underline">
                      <FileText className="mr-2 h-4 w-4" />
                      TechStyle Integration Proposal
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-blue-500 hover:underline">
                      <FileText className="mr-2 h-4 w-4" />
                      Custom Event Specifications
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-blue-500 hover:underline">
                      <FileText className="mr-2 h-4 w-4" />
                      Data Flow Diagram
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Team Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/avatars/03.png" alt="Sarah" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Sarah Adams</p>
                      <p className="text-sm text-gray-600">Solution Architect</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Avatar className="h-8  w-8 mr-2">
                      <AvatarImage src="/avatars/04.png" alt="Mike" />
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Mike Evans</p>
                      <p className="text-sm text-gray-600">Account Executive</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <div>
                      <p className="font-semibold">Integration Review</p>
                      <p className="text-sm text-gray-600">Oct 31, 2023 - 2:00 PM</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <div>
                      <p className="font-semibold">Contract Discussion</p>
                      <p className="text-sm text-gray-600">Nov 3, 2023 - 11:00 AM</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
      </div>
    </div>
  )
}