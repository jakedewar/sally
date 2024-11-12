'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Edit, Save } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface EngagementStage {
  id: string
  name: string
  date: string
  saNote: string
  prospectFeedback: string
  status: 'pending' | 'approved' | 'disputed'
}

interface Opportunity {
  createdAt: string;
  description?: string;
}

interface EngagementSummaryProps {
  opportunity: Opportunity;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function EngagementSummary({ opportunity }: EngagementSummaryProps) {
  const [stages, setStages] = useState<EngagementStage[]>([
    {
      id: '1',
      name: 'Initial Discovery',
      date: opportunity.createdAt,
      saNote: opportunity.description || "Initial discovery phase",
      prospectFeedback: "",
      status: 'pending'
    },
    {
      id: '2',
      name: 'Technical Deep Dive',
      date: '2023-10-15',
      saNote: "Discussed integration with TechStyle's custom e-commerce platform. They require API access for real-time data syncing and have concerns about data migration from their current system.",
      prospectFeedback: "",
      status: 'pending'
    },
    {
      id: '3',
      name: 'Solution Presentation',
      date: '2023-10-30',
      saNote: "Presented Klaviyo's segmentation and automation features. TechStyle was particularly interested in the predictive analytics for customer lifetime value.",
      prospectFeedback: "",
      status: 'pending'
    }
  ])

  const [editingStage, setEditingStage] = useState<string | null>(null)
  const [editedNote, setEditedNote] = useState("")

  const handleSANoteEdit = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId)
    if (stage) {
      setEditingStage(stageId)
      setEditedNote(stage.saNote)
    }
  }

  const handleSANoteSave = (stageId: string) => {
    setStages(stages.map(stage =>
      stage.id === stageId ? { ...stage, saNote: editedNote } : stage
    ))
    setEditingStage(null)
  }

  const handleProspectFeedback = (stageId: string, feedback: string, newStatus: 'approved' | 'disputed') => {
    setStages(stages.map(stage =>
      stage.id === stageId ? { ...stage, prospectFeedback: feedback, status: newStatus } : stage
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Summary</CardTitle>
        <CardDescription>Review and confirm the outcomes of our discussions</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {stages.map((stage) => (
            <AccordionItem key={stage.id} value={stage.id}>
              <AccordionTrigger>
                <div className="flex items-center">
                  <span>{stage.name}</span>
                  <span className="mx-2 text-muted-foreground">-</span>
                  <span className="text-muted-foreground">{formatDate(stage.date)}</span>
                  {stage.status === 'approved' && <CheckCircle className="ml-2 h-4 w-4 text-green-500" />}
                  {stage.status === 'disputed' && <XCircle className="ml-2 h-4 w-4 text-red-500" />}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">SA Notes:</h4>
                    {editingStage === stage.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editedNote}
                          onChange={(e) => setEditedNote(e.target.value)}
                          className="w-full"
                        />
                        <Button onClick={() => handleSANoteSave(stage.id)}>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-gray-600">{stage.saNote}</p>
                        <Button variant="ghost" size="sm" onClick={() => handleSANoteEdit(stage.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Prospect Feedback:</h4>
                    {stage.status === 'pending' ? (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Provide your feedback or comments here..."
                          className="w-full"
                          onChange={(e) => handleProspectFeedback(stage.id, e.target.value, 'approved')}
                        />
                        <div className="flex space-x-2">
                          <Button onClick={() => handleProspectFeedback(stage.id, stage.prospectFeedback, 'approved')}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button variant="destructive" onClick={() => handleProspectFeedback(stage.id, stage.prospectFeedback, 'disputed')}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Dispute
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/avatars/prospect.png" alt="Prospect" />
                          <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm text-gray-600">{stage.prospectFeedback}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Status: {stage.status === 'approved' ? 'Approved' : 'Disputed'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}