"use client"

import { Separator } from '@/components/ui/separator'
import { UserProfile } from '@/components/user-profile'
import clsx from 'clsx'
import { Code, HomeIcon, Settings, CalendarCog, ListCheck, BriefcaseBusiness } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import SearchBar from '@/components/ui/search-bar'

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 h-full bg-white dark:bg-[#000000] border-r border-gray-200 dark:border-[#333333]">
      <div className="flex-grow overflow-y-auto">
        <nav className="grid items-start px-4 text-sm font-medium py-2">
          <Link
            className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-[#A6A6A6] dark:hover:text-[#F9F9FF]", {
              "bg-[#F0EEFF] text-[#5D51FF] hover:text-[#5D51FF] dark:bg-[#1A1A1A] dark:text-[#5D51FF] dark:hover:text-[#5D51FF]": pathname === "/dashboard"
            })}
            href="/dashboard"
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>
          <Link
            className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-[#A6A6A6] dark:hover:text-[#F9F9FF]", {
              "bg-[#F0EEFF] text-[#5D51FF] hover:text-[#5D51FF] dark:bg-[#1A1A1A] dark:text-[#5D51FF] dark:hover:text-[#5D51FF]": pathname === "/dashboard/metrics"
            })}
            href="/dashboard/metrics"
          >
            <CalendarCog className="h-4 w-4" />
            Metrics
          </Link>
          <Link
            className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-[#A6A6A6] dark:hover:text-[#F9F9FF]", {
              "bg-[#F0EEFF] text-[#5D51FF] hover:text-[#5D51FF] dark:bg-[#1A1A1A] dark:text-[#5D51FF] dark:hover:text-[#5D51FF]": pathname === "/dashboard/custom-integration"
            })}
            href="/dashboard/custom-integration"
          >
            <Code className="h-4 w-4" />
            Custom Integration
          </Link>
          <Link
            className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-[#A6A6A6] dark:hover:text-[#F9F9FF]", {
              "bg-[#F0EEFF] text-[#5D51FF] hover:text-[#5D51FF] dark:bg-[#1A1A1A] dark:text-[#5D51FF] dark:hover:text-[#5D51FF]": pathname === "/dashboard/integration-checklist"
            })}
            href="/dashboard/integration-checklist"
          >
            <ListCheck className="h-4 w-4" />
            Integration Checklist
          </Link>
          <Link
            className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-[#A6A6A6] dark:hover:text-[#F9F9FF]", {
              "bg-[#F0EEFF] text-[#5D51FF] hover:text-[#5D51FF] dark:bg-[#1A1A1A] dark:text-[#5D51FF] dark:hover:text-[#5D51FF]": pathname.startsWith("/dashboard/opportunities")
            })}
            href="/dashboard/opportunities"
          >
            <BriefcaseBusiness className="h-4 w-4" />
            Opportunities
          </Link>
          <Separator className="my-2 dark:bg-[#333333]" />
          <Link
            className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900", {
              "bg-[#F0EEFF] text-[#5D51FF] hover:text-[#5D51FF]": pathname === "/dashboard/settings"
            })}
            href="/dashboard/settings"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
      <div className="flex-shrink-0 px-4 py-4 border-t dark:border-[#333333]">
        <UserProfile expandable={true} />
      </div>
    </div>
  )
}
