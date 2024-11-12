import { EngagementStage, Portal } from '../../_types/portal'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Code2, MessageCircle, Clock, PlayCircle, CheckCircle, Circle, HeartHandshake, XCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { format } from "date-fns"

interface OverviewTabProps {
    portalData: Portal;
}

export function OverviewTab({ portalData }: OverviewTabProps) {
    const [stages] = useState<EngagementStage[]>([
        {
            id: '1',
            name: 'Initial Discovery',
            date: new Date().toISOString(),
            saNote: "Based on our initial discussion, we understand that you're looking to implement real-time data synchronization with custom field mapping capabilities. Key priorities include:",
            prospectFeedback: "",
            status: 'pending'
        },
        {
            id: '2',
            name: 'Technical Requirements',
            date: new Date().toISOString(),
            saNote: "During our technical deep dive, we identified the following integration requirements:\n- API Version: v2.0\n- Authentication: OAuth 2.0\n- Data Format: JSON/REST\n- Rate Limits: 100 req/min",
            prospectFeedback: "",
            status: 'pending'
        }
    ]);

    const handleProspectFeedback = (stageId: string, feedback: string, newStatus: 'approved' | 'disputed') => {
        // This would typically update the backend
        console.log('Updating feedback:', { stageId, feedback, newStatus });
    };

    return (
        <div className="p-6">
            <div className="grid gap-6">
                {/* Title Section */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-normal text-[#1e1e1e] dark:text-white">
                        {portalData.opportunity.companyName} Integration Portal
                    </h1>
                    <p className="text-sm text-[#5d5d5d] dark:text-gray-400">
                        Welcome to your dedicated integration portal. Here you'll find everything you need for a successful integration.
                    </p>
                </div>

                {/* Combined Welcome Card with Stats */}
                <Card className="bg-[#F8F7FF] dark:bg-[#1A1A1A] border-[#5D51FF]/20">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-white dark:bg-black border border-[#5D51FF]/20">
                                <HeartHandshake className="h-7 w-7 text-[#5D51FF]" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-xl font-medium">Integration Overview</h2>
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Track your progress, access resources, and stay connected with our team throughout the integration journey.
                                        We're here to ensure a smooth and successful implementation.
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 text-sm">
                                        <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                            </span>
                                            Support Available
                                        </div>
                                        <Separator orientation="vertical" className="h-4" />
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Integration Started {new Date().toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        {/* Stats Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-[#5D51FF]" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Time to Completion</p>
                                    <p className="text-xl font-bold">2 weeks</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-4 w-4 text-[#5D51FF]" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Milestones Complete</p>
                                    <p className="text-xl font-bold">2/4</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <MessageCircle className="h-4 w-4 text-[#5D51FF]" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Support Response</p>
                                    <p className="text-xl font-bold">2hrs</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Engagement Summary Card - Now First */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Engagement Summary</CardTitle>
                            <CardDescription>Review and confirm our understanding of your requirements</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {stages.map((stage) => (
                                    <AccordionItem
                                        key={stage.id}
                                        value={stage.id}
                                        className="border-b border-gray-200 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-md"
                                    >
                                        <AccordionTrigger className="hover:no-underline px-4">
                                            <div className="flex items-center py-2">
                                                <span>{stage.name}</span>
                                                <span className="mx-2 text-muted-foreground">-</span>
                                                <span className="text-muted-foreground">
                                                    {format(new Date(stage.date), 'MMM d, yyyy')}
                                                </span>
                                                {stage.status === 'approved' && (
                                                    <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                                                )}
                                                {stage.status === 'disputed' && (
                                                    <XCircle className="ml-2 h-4 w-4 text-red-500" />
                                                )}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4 px-4 pb-4">
                                                {/* What We Heard Section */}
                                                <div className="space-y-2">
                                                    <h4 className="font-medium text-sm text-gray-500">What We Heard:</h4>
                                                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                                                        <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                                            {stage.saNote}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Feedback Section */}
                                                <div className="space-y-2">
                                                    <h4 className="font-medium text-sm text-gray-500">Your Feedback:</h4>
                                                    {stage.status === 'pending' ? (
                                                        <div className="space-y-3">
                                                            <Textarea
                                                                placeholder="Provide your feedback or comments here..."
                                                                className="w-full min-h-[100px] border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-[#5D51FF] focus:border-transparent"
                                                            />
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    onClick={() => handleProspectFeedback(stage.id, '', 'approved')}
                                                                    className="bg-green-600 hover:bg-green-700"
                                                                >
                                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                                    Confirm Understanding
                                                                </Button>
                                                                <Button
                                                                    variant="destructive"
                                                                    onClick={() => handleProspectFeedback(stage.id, '', 'disputed')}
                                                                >
                                                                    <XCircle className="mr-2 h-4 w-4" />
                                                                    Request Clarification
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                                {stage.prospectFeedback ||
                                                                    (stage.status === 'approved'
                                                                        ? "Understanding confirmed"
                                                                        : "Clarification requested"
                                                                    )
                                                                }
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                Status: {stage.status === 'approved' ? 'Confirmed' : 'Clarification Needed'}
                                                            </p>
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

                    {/* Project Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Details</CardTitle>
                            <CardDescription>Integration specifications and requirements</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Project Overview */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Project Overview</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {portalData.opportunity.description}
                                </p>
                            </div>

                            {/* Technology Stack */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Technology Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {portalData.opportunity.technologyStack.map((tech: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-2.5 py-1 text-xs font-medium rounded-full 
                                            bg-[#F8F7FF] dark:bg-[#1A1A1A] 
                                            text-[#5D51FF] border border-[#5D51FF]/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Key Requirements */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Key Requirements</h3>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-[#5D51FF] mt-0.5" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            Real-time data synchronization between systems
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-[#5D51FF] mt-0.5" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            Secure authentication and data encryption
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-[#5D51FF] mt-0.5" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            Custom field mapping and data transformation
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Specifications */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Technical Specifications</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">API Version</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">v2.0</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Data Format</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">JSON/REST</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Authentication</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">OAuth 2.0</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Rate Limits</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">100 req/min</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Implementation Progress Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Implementation Progress</CardTitle>
                            <CardDescription>Track your integration milestones</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Overall Progress */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Overall Progress</span>
                                        <span className="text-sm font-medium">75%</span>
                                    </div>
                                    <Progress value={75} className="w-full" />
                                </div>

                                {/* Milestone Timeline */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <div className="flex-1">
                                            <span className="text-gray-600 dark:text-gray-400">Environment Setup</span>
                                            <span className="text-xs text-gray-400 ml-2">Completed</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <div className="flex-1">
                                            <span className="text-gray-600 dark:text-gray-400">Authentication</span>
                                            <span className="text-xs text-gray-400 ml-2">Completed</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Circle className="h-4 w-4 text-blue-500 fill-current" />
                                        <div className="flex-1">
                                            <span className="text-gray-600 dark:text-gray-400">Data Synchronization</span>
                                            <span className="text-xs text-blue-500 ml-2">In Progress</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Circle className="h-4 w-4 text-gray-300" />
                                        <div className="flex-1">
                                            <span className="text-gray-600 dark:text-gray-400">Testing & Validation</span>
                                            <span className="text-xs text-gray-400 ml-2">Upcoming</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Next Steps */}
                                <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Next Steps</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Complete data synchronization setup and prepare for testing phase.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 