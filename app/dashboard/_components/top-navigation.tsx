"use client"

import { Menu } from "lucide-react"

export default function TopNavigation({ toggleSidebar }: { toggleSidebar: () => void }) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        className="mr-4 p-2 lg:hidden"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    {/* Your logo or site title */}
                    <span className="text-xl font-bold">Your Dashboard</span>
                </div>
                {/* Other top navigation items */}
            </div>
        </nav>
    )
}