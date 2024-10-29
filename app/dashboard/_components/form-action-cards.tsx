import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, UserPlus, Code } from "lucide-react"
import Link from 'next/link'

export default function ActionButtons() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-white dark:bg-[#000000] border border-gray-300 dark:border-[#333333]">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-1">
                        <UserPlus className="h-4 w-4 text-[#5D51FF]" />
                        <CardTitle className="text-lg font-medium text-[#1e1e1e] dark:text-[#F9F9FF]">Create New Profile</CardTitle>
                    </div>
                    <CardDescription className="text-[#5d5d5d] dark:text-[#A6A6A6]">Create a new profile to track your data.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <Link href="dashboard/create-profile" passHref>
                        <Button variant="outline" className="w-full bg-white dark:bg-[#000000] text-[#5D51FF] border-[#5D51FF] hover:bg-[#F0EEFF] dark:hover:bg-[#1A1A1A] hover:text-[#5D51FF]">
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Profile
                        </Button>
                    </Link>
                </CardContent>
            </Card>
            <Card className="bg-white dark:bg-[#000000] border border-gray-300 dark:border-[#333333]">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-1">
                        <Code className="h-4 w-4 text-[#5D51FF]" />
                        <CardTitle className="text-lg font-medium text-[#1e1e1e] dark:text-[#F9F9FF]">Create New Metric</CardTitle>
                    </div>
                    <CardDescription className="text-[#5d5d5d] dark:text-[#A6A6A6]">Create a new metric to track your data.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <Link href="dashboard/create-metric" passHref>
                        <Button variant="outline" className="w-full bg-white dark:bg-[#000000] text-[#5D51FF] border-[#5D51FF] hover:bg-[#F0EEFF] dark:hover:bg-[#1A1A1A] hover:text-[#5D51FF]">
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Metric
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}