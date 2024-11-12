import { Portal } from '../_types/portal'
import { Button } from "@/components/ui/button"
import { MessageSquare, FileText, HeartHandshake, User2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import ModeToggle from '@/components/mode-toggle'

interface PortalHeaderProps {
    portalData: Portal;
    setActiveTab: (tab: string) => void;
}

export function PortalHeader({ portalData, setActiveTab }: PortalHeaderProps) {
    return (
        <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b border-[#333333] bg-[#000000] px-6 sticky top-0 z-50 text-[#F9F9FF]">
            <div className="flex items-center gap-6 flex-1">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <HeartHandshake className="h-6 w-6 text-[#5D51FF]" />
                    <span className="hidden md:inline">Sally</span>
                </Link>

                <Separator orientation="vertical" className="h-6" />

                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        <span className="text-sm font-medium">Klaviyo</span>
                        <span className="mx-2 text-[#666666]">×</span>
                        <span className="text-sm font-medium">{portalData.opportunity.companyName}</span>
                    </div>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#1A1A1A] border border-[#333333] text-[#A6A6A6]">
                        Integration Portal
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <a
                    href="https://developers.klaviyo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-[#A6A6A6] hover:text-[#F9F9FF] transition-colors rounded-md hover:bg-[#1A1A1A]"
                >
                    <FileText className="h-4 w-4" />
                    <span>Docs</span>
                </a>

                <div className="hover:bg-[#1A1A1A] rounded p-1 transition-colors">
                    <ModeToggle />
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#F9F9FF] hover:bg-[#1A1A1A]"
                >
                    <User2 className="h-4 w-4 mr-2" />
                    Account
                </Button>
            </div>
        </header>
    )
} 