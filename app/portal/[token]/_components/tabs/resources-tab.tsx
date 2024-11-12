import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, MessageSquare, ExternalLink } from "lucide-react"

export function ResourcesTab() {
    return (
        <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Documentation & Resources</CardTitle>
                        <CardDescription>Essential resources for your integration</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <a
                                href="https://developers.klaviyo.com/en/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-gray-500" />
                                    <span>Developer Documentation</span>
                                </div>
                                <ExternalLink className="h-4 w-4 text-gray-500" />
                            </a>
                            <a
                                href="https://developers.klaviyo.com/en/reference/api-overview"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-gray-500" />
                                    <span>API Reference</span>
                                </div>
                                <ExternalLink className="h-4 w-4 text-gray-500" />
                            </a>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Support Resources</CardTitle>
                        <CardDescription>Help and technical support</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <a
                                href="https://help.klaviyo.com/hc/en-us/requests/new"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="h-5 w-5 text-gray-500" />
                                    <span>Technical Support</span>
                                </div>
                                <ExternalLink className="h-4 w-4 text-gray-500" />
                            </a>
                            <a
                                href="https://community.klaviyo.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="h-5 w-5 text-gray-500" />
                                    <span>Developer Community</span>
                                </div>
                                <ExternalLink className="h-4 w-4 text-gray-500" />
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 