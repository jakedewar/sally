import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"

export default function TotalMetrics() {
    return (
        <div className="">
            <Card className="bg-white dark:bg-[#000000] border border-gray-300 dark:border-[#333333]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#1e1e1e] dark:text-[#F9F9FF]">Total Opportunities</CardTitle>
                    <Target className="h-4 w-4 text-[#5D51FF]" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-[#1e1e1e] dark:text-[#F9F9FF]">24</div>
                    <p className="text-xs text-[#5d5d5d] dark:text-[#A6A6A6] mt-1">+12% from last month</p>
                </CardContent>
            </Card>
        </div>
    )
}