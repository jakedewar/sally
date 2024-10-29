import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock } from "lucide-react"

export default function ActivityTable() {
    const [activeTab, setActiveTab] = useState("metrics")

    const sentMetrics = [
        { id: 1, name: "Page View", date: "2023-06-01", count: 1000 },
        { id: 2, name: "Purchase", date: "2023-06-02", count: 50 },
        { id: 3, name: "Email Open", date: "2023-06-03", count: 500 },
    ]

    const createdProfiles = [
        { id: 1, email: "user1@example.com", date: "2023-06-01" },
        { id: 2, email: "user2@example.com", date: "2023-06-02" },
        { id: 3, email: "user3@example.com", date: "2023-06-03" },
    ]

    return (
        <Card className="bg-white dark:bg-[#000000] border border-gray-300 dark:border-[#333333]">
            <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-[#5D51FF]" />
                    <CardTitle className="text-lg font-medium text-[#1e1e1e] dark:text-[#F9F9FF]">Recent Activity</CardTitle>
                </div>
                <p className="text-sm text-[#5d5d5d] dark:text-[#A6A6A6] mt-1">
                    View and analyze your latest sent metrics and created profiles. Toggle between tabs to see different types of activity.
                </p>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                            value="metrics"
                            className="data-[state=active]:text-[#5D51FF] text-[#5d5d5d] dark:text-[#A6A6A6] data-[state=active]:text-[#5D51FF]"
                        >
                            Sent Metrics
                        </TabsTrigger>
                        <TabsTrigger
                            value="profiles"
                            className="data-[state=active]:text-[#5D51FF] text-[#5d5d5d] dark:text-[#A6A6A6] data-[state=active]:text-[#5D51FF]"
                        >
                            Created Profiles
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="metrics">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50 dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#333333]">
                                    <TableHead className="text-[#5d5d5d] dark:text-[#A6A6A6] font-semibold">ID</TableHead>
                                    <TableHead className="text-[#5d5d5d] dark:text-[#A6A6A6] font-semibold">Name</TableHead>
                                    <TableHead className="text-[#5d5d5d] dark:text-[#A6A6A6] font-semibold">Date</TableHead>
                                    <TableHead className="text-[#5d5d5d] dark:text-[#A6A6A6] font-semibold">Count</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sentMetrics.map((metric) => (
                                    <TableRow key={metric.id} className="border-b border-gray-200 dark:border-[#333333]">
                                        <TableCell className="text-[#1e1e1e] dark:text-[#F9F9FF]">{metric.id}</TableCell>
                                        <TableCell className="text-[#1e1e1e] dark:text-[#F9F9FF]">{metric.name}</TableCell>
                                        <TableCell className="text-[#1e1e1e] dark:text-[#F9F9FF]">{metric.date}</TableCell>
                                        <TableCell className="text-[#1e1e1e] dark:text-[#F9F9FF]">{metric.count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="profiles">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50 dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#333333]">
                                    <TableHead className="text-[#5d5d5d] dark:text-[#A6A6A6] font-semibold">ID</TableHead>
                                    <TableHead className="text-[#5d5d5d] dark:text-[#A6A6A6] font-semibold">Email</TableHead>
                                    <TableHead className="text-[#5d5d5d] dark:text-[#A6A6A6] font-semibold">Date Created</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {createdProfiles.map((profile) => (
                                    <TableRow key={profile.id} className="border-b border-gray-200 dark:border-[#333333]">
                                        <TableCell className="text-[#1e1e1e] dark:text-[#F9F9FF]">{profile.id}</TableCell>
                                        <TableCell className="text-[#1e1e1e] dark:text-[#F9F9FF]">{profile.email}</TableCell>
                                        <TableCell className="text-[#1e1e1e] dark:text-[#F9F9FF]">{profile.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}