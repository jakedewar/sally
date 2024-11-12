import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"

export function CommunicationTab() {
    return (
        <div className="p-6">
            <Card className="md:col-span-2">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Communication Hub</CardTitle>
                            <CardDescription>Discuss integration details and questions</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Online
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="border rounded-lg p-4 space-y-4 bg-[#F8F7FF] dark:bg-[#1A1A1A] border-[#5D51FF]/20">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-[#5D51FF]">Technical Consultant</span>
                                    <span className="text-xs text-gray-500">• 2 hours ago</span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Hi! I'm your dedicated technical consultant. Let me know if you have any questions about the integration process.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Textarea
                                placeholder="Type your message here..."
                                className="min-h-[100px]"
                            />
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-500">
                                    Typical response time: within 2 hours during business hours
                                </p>
                                <Button>
                                    Send Message
                                    <MessageSquare className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 