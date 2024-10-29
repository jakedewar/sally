"use client"
import Link from 'next/link';
import * as React from "react";
import { Button } from "../ui/button";
import { UserProfile } from "../user-profile";
import { Code, Menu, X, ChevronDown } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "About",
        href: "/about",
        description: "Learn more about Sally, your Klaviyo SA Ally.",
    },
    {
        title: "Features",
        href: "/features",
        description: "Explore the powerful features Sally offers.",
    },
    {
        title: "Pricing",
        href: "/pricing",
        description: "View our pricing plans and choose the best fit for you.",
    },
    {
        title: "Contact",
        href: "/contact",
        description: "Get in touch with our support team.",
    },
    {
        title: "Integration Checklist",
        href: "/dashboard/integration-checklist",
        description: "Streamline your Klaviyo integrations with our comprehensive checklist.",
    },
    {
        title: "Custom Integration Builder",
        href: "/dashboard/custom-integration",
        description: "Create tailored Klaviyo integrations for your clients with our intuitive builder.",
    },
    {
        title: "Opportunities",
        href: "/dashboard/opportunities",
        description: "Manage and track your Klaviyo integration opportunities efficiently.",
    },
];

const features = [
    {
        title: "Interstellar SA Dashboard",
        href: "/features#dashboard",
        description: "Navigate the vast expanse of your Klaviyo projects with our intuitive, AI-powered dashboard.",
    },
    {
        title: "Galactic Opportunity Management",
        href: "/features#opportunity",
        description: "Harness the power of the cosmos to manage your opportunities and take notes with unparalleled efficiency.",
    },
    {
        title: "Quantum Checklist Generator",
        href: "/features#checklist",
        description: "Revolutionize your integration process with our AI-powered checklist generator.",
    },
];

export default function NavBar() {
    const { isSignedIn } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#000000] text-white">
            <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Code className="h-6 w-6 text-[#5D51FF]" />
                        <span className="inline-block font-bold text-[#F9F9FF]">Sally</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex flex-1 justify-center">
                    <NavigationMenu>
                        <NavigationMenuList className="space-x-6">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/about"
                                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-[#000000] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#1A1A1A] hover:text-[#F9F9FF] focus:bg-[#1A1A1A] focus:text-[#F9F9FF] focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#1A1A1A] data-[state=open]:bg-[#1A1A1A]"
                                    >
                                        About
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-[#000000] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#1A1A1A] hover:text-[#F9F9FF] focus:bg-[#1A1A1A] focus:text-[#F9F9FF] focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#1A1A1A] data-[state=open]:bg-[#1A1A1A]">
                                    Features
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#121212]">
                                        {features.map((feature) => (
                                            <ListItem
                                                key={feature.title}
                                                title={feature.title}
                                                href={feature.href}
                                            >
                                                {feature.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            {['Contact', 'Pricing'].map((item) => (
                                <NavigationMenuItem key={item}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={`/${item.toLowerCase()}`}
                                            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-[#000000] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#1A1A1A] hover:text-[#F9F9FF] focus:bg-[#1A1A1A] focus:text-[#F9F9FF] focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#1A1A1A] data-[state=open]:bg-[#1A1A1A]"
                                        >
                                            {item}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* User Actions */}
                <div className="flex items-center space-x-6">
                    {isSignedIn && config.auth.enabled && (
                        <UserProfile />
                    )}
                    {!isSignedIn && config.auth.enabled && (
                        <div className="hidden md:flex space-x-4">
                            <Link href="/sign-in">
                                <Button variant="ghost" className="text-[#F9F9FF] hover:bg-[#1A1A1A] hover:text-[#F9F9FF]">Sign In</Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button className="bg-[#5D51FF] hover:bg-[#4B41CC] text-[#F9F9FF]">Sign Up</Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-4 pt-2 pb-3 space-y-2">
                        <Link
                            href="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-[#F9F9FF] hover:bg-[#1A1A1A]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <div className="relative">
                            <button
                                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#F9F9FF] hover:bg-[#1A1A1A] flex items-center justify-between"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Toggle a state for mobile features dropdown
                                }}
                            >
                                Features
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            {/* Add a conditional rendering for mobile features dropdown */}
                        </div>
                        {['Contact', 'Pricing'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="block px-3 py-2 rounded-md text-base font-medium text-[#F9F9FF] hover:bg-[#1A1A1A]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        {!isSignedIn && config.auth.enabled && (
                            <>
                                <Link
                                    href="/sign-in"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-[#F9F9FF] hover:bg-[#1A1A1A]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-[#F9F9FF] bg-[#5D51FF] hover:bg-[#4B41CC]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#2A2A2A] hover:text-[#F9F9FF] focus:bg-[#2A2A2A] focus:text-[#F9F9FF]",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none text-[#F9F9FF]">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-[#A6A6A6] group-hover:text-[#F9F9FF]">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"