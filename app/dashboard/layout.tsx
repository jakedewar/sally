"use client"

import { ReactNode, useState } from 'react'
import DashboardTopNav from './_components/dashbord-top-nav'
import DashboardSideBar from './_components/dashboard-side-bar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#000000] text-foreground dark:text-[#F9F9FF]">
      <DashboardTopNav toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile sidebar */}
        <div className={`lg:hidden fixed inset-0 z-50 transition-opacity ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/50 dark:bg-black/80" onClick={toggleSidebar}></div>
          <div className={`absolute inset-y-0 left-0 w-64 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <DashboardSideBar />
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <DashboardSideBar />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#000000] w-full lg:w-[calc(100%-16rem)]">
          {children}
        </main>
      </div>
    </div>
  )
}
