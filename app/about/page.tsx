"use client"

import { useEffect, useRef } from 'react'
import { ArrowRight, Users, Rocket, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import PageWrapper from "@/components/wrapper/page-wrapper"

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

export default function About() {
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
                                    Along Came <span className="text-[#5D51FF]">Sally</span>
                                </h1>
                                <p className="mx-auto max-w-[700px] text-xl text-[#F9F9FF] md:text-2xl/relaxed lg:text-3xl/relaxed">
                                    Revolutionizing Klaviyo Solution Architecture Across the Cosmos
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Mission Section */}
                    <section className="w-full py-20 bg-transparent relative">
                        <div className="absolute inset-0 bg-gradient-radial from-[#1A1A1A] to-transparent opacity-30"></div>
                        <div className="container mx-auto px-4 relative">
                            <div className="flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-20">
                                <div className="lg:w-1/2 space-y-8">
                                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-[#F9F9FF]">
                                        Our Cosmic Mission
                                    </h2>
                                    <p className="text-xl text-[#A6A6A6]">
                                        Sally was born from the collision of cutting-edge AI technology and the vast expertise of Klaviyo Solution Architects. Our mission is to empower SAs with tools that transcend traditional boundaries, enabling them to navigate the complex universe of integrations with unprecedented ease and efficiency. To e-commerce and beyond!
                                    </p>
                                </div>
                                <div className="lg:w-1/2">
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-[#5D51FF] opacity-30 blur-3xl rounded-full transform scale-110 group-hover:opacity-40 transition-all duration-300"></div>
                                        <div className="absolute inset-0 bg-[#FF51A8] opacity-20 blur-3xl rounded-full transform scale-105 group-hover:opacity-30 transition-all duration-300"></div>
                                        <Image
                                            src="/sally-screenshot.png"
                                            alt="Sally's cosmic mission"
                                            className="rounded-lg shadow-2xl relative z-10 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(93,81,255,0.4)]"
                                            width={600}
                                            height={400}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Core Values Section */}
                    <section className="w-full py-20 bg-transparent">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16 text-[#F9F9FF]">Our Intergalactic Values</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {[
                                    { title: "Cosmic Innovation", description: "We push the boundaries of what's possible in Klaviyo integration and management.", icon: Rocket },
                                    { title: "Universal Collaboration", description: "We believe in the power of community and shared knowledge across the SA universe.", icon: Users },
                                    { title: "Galactic Impact", description: "We strive to make a lasting impact on the e-commerce ecosystem, one integration at a time.", icon: Globe }
                                ].map((value, index) => (
                                    <div key={index} className="flex flex-col items-center text-center space-y-4 group">
                                        <div className="bg-[#1A1A1A] p-4 rounded-lg transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(93,81,255,0.3)]">
                                            <value.icon className="h-10 w-10 text-[#5D51FF]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#F9F9FF]">{value.title}</h3>
                                        <p className="text-[#A6A6A6]">{value.description}</p>
                                    </div>
                                ))}
                            </div>
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
                                    Summon Sally <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </PageWrapper>
    );
}