import { cn } from "@/lib/utils"
import { ListCheck, MessageCircle, Code2, BookOpen, LayoutDashboard } from "lucide-react"

interface PortalSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const sidebarItems = [
    { label: "Overview", icon: LayoutDashboard, id: "overview" },
    { label: "Integration Checklist", icon: ListCheck, id: "checklist" },
    { label: "Communication", icon: MessageCircle, id: "communication" },
    { label: "API Testing", icon: Code2, id: "api-testing" },
    { label: "Resources", icon: BookOpen, id: "resources" },
]

export function PortalSidebar({ activeTab, setActiveTab }: PortalSidebarProps) {
    return (
        <aside className="w-64 border-r border-gray-200 dark:border-[#333333]">
            <nav className="p-4 space-y-1">
                {sidebarItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "flex items-center w-full gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                            activeTab === item.id
                                ? "bg-[#F0EEFF] text-[#5D51FF] dark:bg-[#1A1A1A]"
                                : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    )
} 