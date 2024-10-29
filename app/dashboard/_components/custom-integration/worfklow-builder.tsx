import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Plus, Trash2 } from 'lucide-react'
import StepConfig from './step-config'

type Platform = {
    name: string
    apiUrl: string
    authMethod: string
    apiKey?: string
    username?: string
    password?: string
    webhookUrl: string
    customHeaders: Record<string, string>
    testMode: boolean
}

type Condition = {
    id: string
    field: string
    operator: string
    value: string
}

type Step = {
    id: string
    type: 'trigger' | 'action'
    platform: string
    event: string
    dataMapping: { [key: string]: string }
    conditions: Condition[]
}

type WorkflowBuilderProps = {
    platform: Platform
    onComplete: () => void
}

export default function WorkflowBuilder({ platform, onComplete }: WorkflowBuilderProps) {
    const [workflowName, setWorkflowName] = useState('')
    const [steps, setSteps] = useState<Step[]>([])
    const [activeStep, setActiveStep] = useState<string | null>(null)

    const addStep = (type: 'trigger' | 'action') => {
        const newStep: Step = {
            id: Date.now().toString(),
            type,
            platform: platform.name,
            event: '',
            dataMapping: {},
            conditions: []
        }
        setSteps([...steps, newStep])
        setActiveStep(newStep.id)
    }

    const updateStep = (id: string, data: Partial<Step>) => {
        setSteps(steps.map(step => step.id === id ? { ...step, ...data } : step))
    }

    const removeStep = (id: string) => {
        setSteps(steps.filter(step => step.id !== id))
        if (activeStep === id) {
            setActiveStep(null)
        }
    }

    const handleSaveWorkflow = () => {
        console.log('Saving workflow:', { name: workflowName, steps })
        onComplete()
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className='text-lg'>Workflow Builder</CardTitle>
                    <CardDescription>Create custom workflows for your {platform.name} integration.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="workflow-name">Workflow Name</Label>
                            <Input
                                id="workflow-name"
                                value={workflowName}
                                onChange={(e) => setWorkflowName(e.target.value)}
                                placeholder="Enter workflow name"
                            />
                        </div>
                        <div className="space-y-2">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={`p-2 border rounded-md cursor-pointer flex items-center justify-between ${activeStep === step.id ? 'bg-blue-100 border-blue-300' : ''
                                        }`}
                                    onClick={() => setActiveStep(step.id)}
                                >
                                    <div className="flex items-center">
                                        <span className="font-semibold mr-2">{index + 1}.</span>
                                        <span>{step.type === 'trigger' ? 'Trigger' : 'Action'}: </span>
                                        <span className="ml-2">{step.event || 'Select Event'}</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeStep(step.id)
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between">
                            <Button onClick={() => addStep('trigger')} variant="outline">
                                <Plus className="mr-2 h-4 w-4" /> Add Trigger
                            </Button>
                            <Button onClick={() => addStep('action')} variant="outline">
                                <Plus className="mr-2 h-4 w-4" /> Add Action
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {activeStep && (
                <StepConfig
                    step={steps.find(s => s.id === activeStep)!}
                    updateStep={updateStep}
                />
            )}

            <div className="flex justify-end">
                <Button onClick={handleSaveWorkflow}>
                    Save Workflow <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

// ... (rest of the file remains the same)