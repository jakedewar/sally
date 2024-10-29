import React from 'react'
import { Step } from './types'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Condition = {
    id: string
    field: string
    operator: string
    value: string
}

type StepConfigProps = {
    step: Step
    updateStep: (id: string, data: Partial<Step>) => void
}

export default function StepConfig({ step, updateStep }: StepConfigProps) {
    const handleChange = (field: keyof Step, value: string) => {
        updateStep(step.id, { [field]: value })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{step.type === 'trigger' ? 'Trigger' : 'Action'} Configuration</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="event">Event</Label>
                        <Input
                            id="event"
                            value={step.event}
                            onChange={(e) => handleChange('event', e.target.value)}
                            placeholder="Enter event name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Input
                            id="platform"
                            value={step.platform}
                            onChange={(e) => handleChange('platform', e.target.value)}
                            placeholder="Enter platform name"
                        />
                    </div>
                    {/* Add more fields as needed */}
                </div>
            </CardContent>
        </Card>
    )
}