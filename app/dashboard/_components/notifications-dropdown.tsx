import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Mock notification data
const mockNotifications = [
    {
        id: 1,
        type: 'comment',
        title: 'New comment on TechStyle Boutique',
        description: 'Sarah added a comment: "Updated the integration checklist with additional considerations..."',
        timestamp: '2 minutes ago',
        read: false,
        avatar: '/avatars/01.png',
        initials: 'SA',
        link: '/dashboard/opportunities/techstyle'
    },
    {
        id: 2,
        type: 'stage_update',
        title: 'Deal stage updated',
        description: 'FashionCo deal moved to Technical Review',
        timestamp: '1 hour ago',
        read: true,
        avatar: '/avatars/02.png',
        initials: 'FC',
        link: '/dashboard/opportunities/fashionco'
    },
    {
        id: 3,
        type: 'checklist',
        title: 'Integration checklist approved',
        description: 'Client approved the integration checklist for StyleHub project',
        timestamp: '3 hours ago',
        read: true,
        avatar: '/avatars/03.png',
        initials: 'SH',
        link: '/dashboard/opportunities/stylehub'
    }
]

export default function NotificationsDropdown() {
    const [notifications, setNotifications] = useState(mockNotifications)
    const [isOpen, setIsOpen] = useState(false)

    const unreadCount = notifications.filter(n => !n.read).length

    const handleNotificationClick = (notificationId: number) => {
        setNotifications(notifications.map(notification =>
            notification.id === notificationId
                ? { ...notification, read: true }
                : notification
        ))
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="relative">
                <div className="hover:bg-[#1A1A1A] rounded p-2 transition-colors">
                    <Bell className="h-5 w-5 text-[#F9F9FF]" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-[#5D51FF] text-white rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <ScrollArea className="h-[300px] p-4">
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={cn(
                                    "flex items-start space-x-3 p-3 cursor-pointer",
                                    !notification.read && "bg-[#F0EEFF] dark:bg-[#1A1A1A]"
                                )}
                                onClick={() => handleNotificationClick(notification.id)}
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={notification.avatar} />
                                    <AvatarFallback>{notification.initials}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {notification.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {notification.description}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {notification.timestamp}
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </div>
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 