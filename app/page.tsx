"use client"

import { useEffect, useRef } from 'react'
import { ArrowRight, CheckSquare, BarChart2, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import PageWrapper from "@/components/wrapper/page-wrapper"
import Link from "next/link"
import { useRotatingText } from '@/hooks/useRotatingText';

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

export default function Home() {
  const { currentWord, isAnimating } = useRotatingText([
    'Sales',
    'Success',
    'Solutions',
    'Strategy',
    'Scale'
  ], 2500);

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
                  <span className="text-[#5D51FF]">
                    Sally
                  </span> - Your{' '}
                  <span
                    className={`text-[#5D51FF] inline-block transition-all duration-500 ${isAnimating ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'
                      }`}
                  >
                    {currentWord}
                  </span>{' '}
                  Ally
                </h1>
                <p className="mx-auto max-w-[700px] text-xl text-[#F9F9FF] md:text-2xl/relaxed lg:text-3xl/relaxed">
                  Transform your technical sales process with AI-powered client portals
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/sign-up">
                    <Button size="lg" className="bg-[#5D51FF] hover:bg-[#4B41CC] text-white font-semibold py-3 px-8 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_rgba(93,81,255,0.5)]">
                      Summon Sally
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#5D51FF] text-[#5D51FF] bg-transparent hover:bg-transparent hover:text-[#5D51FF] font-semibold py-3 px-8 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_rgba(93,81,255,0.5)]"
                    >
                      Explore Sally's Cosmic Powers
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="w-full py-20 bg-transparent relative">
            <div className="absolute inset-0 bg-gradient-radial from-[#1A1A1A] to-transparent opacity-30"></div>
            <div className="container mx-auto px-4 relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16 text-[#F9F9FF]">Your Gateway to Seamless Solution Architecture</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Client Portal Hub",
                    description: "Create personalized spaces for each client, centralizing all technical discussions, requirements, and solutions in one secure location.",
                    icon: CheckSquare
                  },
                  {
                    title: "Deal Intelligence",
                    description: "Track engagement, analyze patterns, and receive AI-powered insights to optimize your technical sales approach.",
                    icon: BarChart2
                  },
                  {
                    title: "Solution Architect",
                    description: "Let AI help craft and document technical solutions while maintaining your unique expertise and approach.",
                    icon: Code
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center space-y-4 group">
                    <div className="bg-[#1A1A1A] backdrop-blur-sm p-4 rounded-lg transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(93,81,255,0.3)] group-hover:bg-opacity-80">
                      <feature.icon className="h-10 w-10 text-[#5D51FF]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#F9F9FF]">{feature.title}</h3>
                    <p className="text-[#A6A6A6]">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Portal Showcase Section */}
          <section className="w-full py-20 bg-transparent">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-20">
                <div className="lg:w-1/2 space-y-8">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-[#F9F9FF]">
                    Client Portals That Transform Deals
                  </h2>
                  <p className="text-xl text-[#A6A6A6]">
                    Create dedicated spaces for each opportunity, where technical discovery, solution design, and client collaboration come together seamlessly.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Personalized client workspaces",
                      "Real-time collaboration tools",
                      "Automated documentation",
                      "Secure file sharing",
                      "Integration capabilities"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <svg className="h-6 w-6 text-[#5D51FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#F9F9FF]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#5D51FF] opacity-30 blur-3xl rounded-full transform scale-110 group-hover:opacity-40 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-[#FF51A8] opacity-20 blur-3xl rounded-full transform scale-105 group-hover:opacity-30 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-[#51FFFF] opacity-10 blur-3xl rounded-full transform scale-100 group-hover:opacity-20 transition-all duration-300"></div>
                    <Image
                      src="/sally-screenshot.png"
                      alt="Sally's AI-powered dashboard"
                      className="rounded-lg shadow-2xl relative z-10 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(93,81,255,0.4)]"
                      width={600}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="w-full py-20 bg-transparent relative">
            <div className="absolute inset-0 bg-[url('/constellation-bg.png')] opacity-5"></div>
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16 text-[#F9F9FF]">
                Solution Expert Testimonials
              </h2>
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-[#5D51FF] rounded-full opacity-10 blur-3xl"></div>
                </div>
                <div className="relative bg-[#1A1A1A] border border-[#333333] rounded-lg p-8 md:p-12 shadow-lg">
                  <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-6 h-16 w-16 text-[#5D51FF] opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <blockquote className="relative">
                    <p className="text-lg md:text-xl text-[#F9F9FF] font-medium mb-8">
                      "Sally's client portals have revolutionized how we handle technical sales. Our discovery process is streamlined, solutions are documented automatically, and clients love having their own dedicated space. It's transformed our entire approach to solution architecture!"
                    </p>
                    <footer className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#5D51FF] rounded-full flex items-center justify-center text-white font-bold text-xl">
                          JD
                        </div>
                      </div>
                      <div>
                        <div className="text-base font-semibold text-[#F9F9FF]">Jake Dewar</div>
                        <div className="text-sm text-[#A6A6A6]">Solution Architect & Sally Evangelist</div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full py-20 bg-[#1A1A1A] border-t border-[#333333] relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent opacity-70"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col items-center space-y-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#F9F9FF]">
                  Ready to Transform Your Technical Sales Process?
                </h2>
                <p className="mx-auto max-w-[600px] text-xl text-[#A6A6A6]">
                  Join forward-thinking Solution Architects and Sales Engineers using Sally's client portals to streamline technical sales and drive success.
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