"use client"

import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react"
import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'

export function UserProfile({ expandable = false }: { expandable?: boolean }) {
    const { user } = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start px-2">
                    <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                        <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    {expandable && (
                        <>
                            <span className="flex-grow text-left">{user?.fullName || "User"}</span>
                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.primaryEmailAddress?.emailAddress}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/user-profile">
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/settings">
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <SignOutButton>
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </SignOutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
