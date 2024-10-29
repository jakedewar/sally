import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import PlatformConnection from './platform-connection'
import WorkflowBuilder from './worfklow-builder'

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

type Stage = 'connection' | 'workflow' | 'review'

export default function KlaviyoIntegrationApp() {
    const [connectedPlatform, setConnectedPlatform] = useState<Platform | null>(null)
    const [currentStage, setCurrentStage] = useState<Stage>('connection')
    const [workflowComplete, setWorkflowComplete] = useState(false)

    const handlePlatformConnect = (platformData: Platform) => {
        setConnectedPlatform(platformData)
        setCurrentStage('workflow')
    }

    const handleDisconnect = () => {
        setConnectedPlatform(null)
        setCurrentStage('connection')
        setWorkflowComplete(false)
    }

    const handleWorkflowComplete = () => {
        setWorkflowComplete(true)
        setCurrentStage('review')
    }

    const getProgressPercentage = () => {
        switch (currentStage) {
            case 'connection':
                return 33
            case 'workflow':
                return workflowComplete ? 100 : 66
            case 'review':
                return 100
            default:
                return 0
        }
    }

    return (
        <div>

            <Card className="mb-8">
                <CardContent className="pt-6">
                    <div className="space-y-2">
                        <div className="flex justify-between mb-2">
                            <span className={`text-sm font-medium ${currentStage === 'connection' ? 'text-[#1170a3]' : ''}`}>Connection</span>
                            <span className={`text-sm font-medium ${currentStage === 'workflow' ? 'text-[#1170a3]' : ''}`}>Workflow</span>
                            <span className={`text-sm font-medium ${currentStage === 'review' ? 'text-[#1170a3]' : ''}`}>Review</span>
                        </div>
                        <Progress value={getProgressPercentage()} className="w-full" />
                    </div>
                </CardContent>
            </Card>

            {currentStage === 'connection' && (
                <PlatformConnection onConnect={handlePlatformConnect} />
            )}

            {currentStage === 'workflow' && connectedPlatform && (
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-lg'>Connected Platform</CardTitle>
                            <CardDescription>You are currently connected to the following eCommerce platform:</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{connectedPlatform.name}</p>
                                    <p className="text-sm text-gray-500">{connectedPlatform.apiUrl}</p>
                                </div>
                                <Button variant="outline" onClick={handleDisconnect}>Disconnect</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <WorkflowBuilder
                        platform={connectedPlatform}
                        onComplete={handleWorkflowComplete}
                    />
                </div>
            )}

            {currentStage === 'review' && (
                <Card>
                    <CardHeader>
                        <CardTitle className='text-lg'>Integration Review</CardTitle>
                        <CardDescription>Review your integration setup before finalizing.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold">Connected Platform</h3>
                                <p>{connectedPlatform?.name}</p>
                                <p className="text-sm text-gray-500">{connectedPlatform?.apiUrl}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Workflow</h3>
                                <p>Your workflow has been configured successfully.</p>
                            </div>
                            <Button onClick={() => console.log('Finalizing integration...')}>
                                Finalize Integration
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}