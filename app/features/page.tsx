"use client"

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, LayoutDashboard, FileText, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import PageWrapper from "@/components/wrapper/page-wrapper"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useSearchParams } from 'next/navigation'

const StarBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()

        const stars: { x: number; y: number; size: number; opacity: number }[] = []
        const starCount = 500

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1 + 0.1,
                opacity: Math.random() * 0.5 + 0.3
            })
        }

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            stars.forEach(star => {
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
                ctx.fill()
            })
        }

        drawStars()

        window.addEventListener('resize', () => {
            resizeCanvas()
            drawStars()
        })

        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}

const features = [
    {
        id: "dashboard",
        title: "Interstellar SA Dashboard",
        description: "Navigate the vast expanse of your Klaviyo projects with our intuitive, AI-powered dashboard. Get real-time insights, performance metrics, and actionable recommendations at your fingertips.",
        icon: LayoutDashboard,
        image: "/sally-dashboard.png",
        benefits: [
            "Real-time project overview",
            "AI-driven insights",
            "Performance metrics",
            "Task prioritization"
        ]
    },
    {
        id: "opportunity",
        title: "Galactic Opportunity Management",
        description: "Harness the power of the cosmos to manage your opportunities and take notes with unparalleled efficiency. Our AI-assisted system helps you capture, organize, and leverage crucial information for each client interaction.",
        icon: FileText,
        image: "/sally-opportunities.png",
        benefits: [
            "AI-powered note summarization",
            "Opportunity tracking",
            "Automated follow-ups",
            "Integration with Klaviyo's ecosystem"
        ]
    },
    {
        id: "checklist",
        title: "Quantum Checklist Generator",
        description: "Revolutionize your integration process with our AI-powered checklist generator. By analyzing opportunity information and leveraging vast integration knowledge, Sally creates tailored, comprehensive checklists for each unique project.",
        icon: CheckSquare,
        image: "/sally-checklist.png",
        benefits: [
            "AI-generated custom checklists",
            "Context-aware recommendations",
            "Dynamic updating based on project progress",
            "Integration best practices"
        ]
    }
]

export default function Features() {
    const searchParams = useSearchParams()
    const [activeTab, setActiveTab] = useState(() => {
        const hash = searchParams.get('tab')
        return features.some(feature => feature.id === hash) ? hash : "dashboard"
    })

    useEffect(() => {
        const hash = window.location.hash.replace('#', '')
        if (features.some(feature => feature.id === hash)) {
            setActiveTab(hash)
        }
    }, [])

    return (
        <PageWrapper>
            <div className="relative min-h-screen bg-[#000000] text-white w-full overflow-hidden">
                <StarBackground />
                <main className="relative z-10">
                    {/* Hero Section */}
                    <section className="relative w-full py-20 md:py-32 lg:py-40 xl:py-48">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col items-center space-y-8 text-center">
                                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-[#F9F9FF]">
                                    <span className="text-[#5D51FF]">Sally's</span> Cosmic Features
                                </h1>
                                <p className="mx-auto max-w-[700px] text-xl text-[#F9F9FF] md:text-2xl/relaxed lg:text-3xl/relaxed">
                                    Empowering Klaviyo Solution Architects with Cutting-Edge Tools
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="w-full py-20 bg-transparent">
                        <div className="container mx-auto px-4">
                            <Tabs value={activeTab || undefined} onValueChange={setActiveTab} className="space-y-12">
                                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 bg-transparent">
                                    {features.map((feature) => (
                                        <TabsTrigger
                                            key={feature.id}
                                            value={feature.id}
                                            className={`flex items-center justify-center space-x-2 p-4 rounded-lg transition-all ${activeTab === feature.id
                                                ? "bg-[#121212] text-[#5D51FF] data-[state=active]:bg-[#121212]"
                                                : "bg-[#1A1A1A] text-[#F9F9FF] hover:bg-[#252525]"
                                                }`}
                                            onClick={() => {
                                                window.history.pushState(null, '', `#${feature.id}`)
                                            }}
                                        >
                                            <feature.icon className={`w-6 h-6 ${activeTab === feature.id ? "text-[#5D51FF]" : ""}`} />
                                            <span className={activeTab === feature.id ? "text-[#5D51FF]" : ""}>
                                                {feature.title}
                                            </span>
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <div className="mt-12">
                                    {features.map((feature) => (
                                        <TabsContent key={feature.id} value={feature.id} className="pt-8">
                                            <div id={feature.id} className="flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-20">
                                                <div className="lg:w-1/2 space-y-8">
                                                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-[#F9F9FF]">
                                                        {feature.title}
                                                    </h2>
                                                    <p className="text-xl text-[#A6A6A6]">
                                                        {feature.description}
                                                    </p>
                                                    <ul className="space-y-4">
                                                        {feature.benefits.map((benefit, index) => (
                                                            <li key={index} className="flex items-center space-x-3">
                                                                <svg className="h-6 w-6 text-[#5D51FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                <span className="text-[#F9F9FF]">{benefit}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="lg:w-1/2">
                                                    <div className="relative group">
                                                        <div className="absolute inset-0 bg-[#5D51FF] opacity-30 blur-3xl rounded-lg transform scale-105 group-hover:opacity-40 transition-all"></div>
                                                        <Image
                                                            src={feature.image}
                                                            alt={`${feature.title} preview`}
                                                            className="rounded-lg shadow-2xl relative z-10 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(93,81,255,0.4)]"
                                                            width={600}
                                                            height={400}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    ))}
                                </div>
                            </Tabs>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="w-full py-20 bg-[#1A1A1A] border-t border-[#333333] relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent opacity-70"></div>
                        <div className="container mx-auto px-4 relative z-10">
                            <div className="flex flex-col items-center space-y-8 text-center">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#F9F9FF]">
                                    Ready to Elevate Your Klaviyo SA Experience?
                                </h2>
                                <p className="mx-auto max-w-[600px] text-xl text-[#A6A6A6]">
                                    Join the ranks of elite Klaviyo Solution Architects harnessing Sally's cosmic powers to revolutionize their workflow and client success.
                                </p>
                                <Button
                                    size="lg"
                                    className="bg-[#5D51FF] text-white hover:bg-[#4B41CC] transition duration-300 hover:shadow-[0_0_15px_rgba(93,81,255,0.5)]"
                                >
                                    Start Your Cosmic Journey <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </PageWrapper>
    );
}