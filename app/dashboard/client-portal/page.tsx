'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  FileText,
  Calendar,
  LayoutDashboard,
  ListCheck,
  MessageCircle,
  BookOpen
} from "lucide-react"
import EngagementSummary from './_components/engagement-summary'
import { useOpportunities } from '@/lib/hooks/use-opportunities'

// Types
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

// Constants
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

const supportResources = [
  { title: "Klaviyo Docs", url: "https://developers.klaviyo.com/en/" },
  { title: "API Reference", url: "https://developers.klaviyo.com/en/reference/api-overview" },
  { title: "Community Forum", url: "https://community.klaviyo.com/" },
  { title: "Support Center", url: "https://help.klaviyo.com/" },
]

export default function ClientPortal() {
  const router = useRouter()
  const { data: opportunities, isLoading: isLoadingOpportunities } = useOpportunities()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [newMessage, setNewMessage] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

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
  }

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

  const handleSendMessage = () => {
    console.log('Sending message:', newMessage)
    setNewMessage('')
  }

  const currentSection = integrationSections[currentStep]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-normal mb-2 text-[#1e1e1e] dark:text-[#F9F9FF]">
        Client Portal
      </h1>
      <div className="space-y-6">
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
        </div>
      </div>
    </div>
  )
}