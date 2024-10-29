"use client"

import ModeToggle from '@/components/mode-toggle'
import { Code, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function DashboardTopNav({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname()
  const { isSignedIn, isLoaded } = useUser()

  return (
    <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b border-[#333333] bg-[#000000] px-6 sticky top-0 z-50 text-[#F9F9FF]">
      <button
        className="mr-4 p-2 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
        <Code className="h-6 w-6 text-[#5D51FF]" />
        <span className="hidden md:inline">Sally</span>
      </Link>
      <p className="text-xs text-[#A6A6A6]">
        Your SA Ally
      </p>
      <div className="ml-auto flex items-center gap-4">
        <div className="hover:bg-[#1A1A1A] rounded p-1 transition-colors">
          <ModeToggle />
        </div>
        {isLoaded && !isSignedIn && (
          <>
            <Link href="/sign-in">
              <Button variant="ghost" className="text-[#F9F9FF] hover:bg-[#1A1A1A]">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-[#5D51FF] hover:bg-[#4B41CC] text-[#F9F9FF]">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
