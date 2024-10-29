"use client"
import { useEffect, useRef } from 'react'
import { ArrowRight, Coffee, MessageSquare, Slack, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export default function Contact() {
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
                                    <span className="text-[#5D51FF]">Contact</span> Sally's Creator
                                </h1>
                                <p className="mx-auto max-w-[700px] text-xl text-[#F9F9FF] md:text-2xl/relaxed lg:text-3xl/relaxed">
                                    Because Sometimes Slack Just Isn't Cosmic Enough
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Form Section */}
                    <section className="w-full py-20 bg-transparent">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#F9F9FF]">
                                        Reach Out to the Void
                                    </h2>
                                    <p className="text-[#A6A6A6]">
                                        Fill out this form to send your message into the cosmic abyss.
                                    </p>
                                    <form className="space-y-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-[#F9F9FF]">Your Earthly Name</label>
                                            <Input id="name" placeholder="e.g. Luke Skywalker" className="bg-[#1A1A1A] border-[#333333] text-[#F9F9FF]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-[#F9F9FF]">Intergalactic Email Address</label>
                                            <Input id="email" type="email" placeholder="luke@rebel-alliance.com" className="bg-[#1A1A1A] border-[#333333] text-[#F9F9FF]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-[#F9F9FF]">Subject of Cosmic Importance</label>
                                            <Select>
                                                <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-[#F9F9FF]">
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="coffee">Need More Coffee</SelectItem>
                                                    <SelectItem value="feature">Suggest a Feature (That We've Already Discussed)</SelectItem>
                                                    <SelectItem value="bug">Report a Bug (That You Could Just Tell Us About)</SelectItem>
                                                    <SelectItem value="lunch">Lunch Plans</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-[#F9F9FF]">Your Message to the Stars</label>
                                            <Textarea id="message" placeholder="Type your message here, or just walk over to my desk..." className="bg-[#1A1A1A] border-[#333333] text-[#F9F9FF]" rows={4} />
                                        </div>
                                        <Button type="submit" className="bg-[#5D51FF] text-white hover:bg-[#4B41CC]">
                                            Launch Message into Space <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                                <div className="space-y-8">
                                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#F9F9FF]">
                                        Alternative Communication Channels
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <Slack className="w-6 h-6 text-[#5D51FF]" />
                                            <span className="text-[#F9F9FF]">Slack: @your-name-here (You know, the app you're already using)</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <MessageSquare className="w-6 h-6 text-[#5D51FF]" />
                                            <span className="text-[#F9F9FF]">Telepathy: Just think really hard, we might hear you</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Coffee className="w-6 h-6 text-[#5D51FF]" />
                                            <span className="text-[#F9F9FF]">Coffee Machine: Meet us there every hour, on the hour</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <MapPin className="w-6 h-6 text-[#5D51FF]" />
                                            <span className="text-[#F9F9FF]">Physical Location: That office we all work in, remember?</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6 mt-8">
                                        <h3 className="text-xl font-semibold text-[#F9F9FF] mb-4">Office Hours</h3>
                                        <p className="text-[#A6A6A6]">Monday - Friday: 9am - 5pm (or whenever we decide to show up)</p>
                                        <p className="text-[#A6A6A6]">Weekends: Why are you working on weekends? Go home!</p>
                                        <p className="text-[#A6A6A6] mt-4 italic">Note: All times are in whatever time zone we're currently in.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="w-full py-20 bg-transparent">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16 text-[#F9F9FF]">
                                Frequently Asked (But Unnecessary) Questions
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    {
                                        q: "Do I really need to fill out this contact form?",
                                        a: "Only if you enjoy unnecessary bureaucracy. Otherwise, just tap me on the shoulder."
                                    },
                                    {
                                        q: "What's the average response time?",
                                        a: "Depends on how loud you yell across the office. We recommend using your 'outdoor' voice for faster response times."
                                    },
                                    {
                                        q: "Is there a support ticket system?",
                                        a: "Yes, it's called 'Post-it notes stuck to our monitors'. Very high-tech stuff."
                                    },
                                    {
                                        q: "Can I schedule a meeting to discuss Sally?",
                                        a: "We love meetings. How about we schedule a pre-meeting to discuss when to have the meeting about scheduling the actual meeting?"
                                    }
                                ].map((faq, index) => (
                                    <div key={index} className="space-y-2">
                                        <h3 className="text-xl font-semibold text-[#F9F9FF]">{faq.q}</h3>
                                        <p className="text-[#A6A6A6]">{faq.a}</p>
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
                                    Still Here? Just Talk to Us!
                                </h2>
                                <p className="mx-auto max-w-[600px] text-xl text-[#A6A6A6]">
                                    Remember, we're your coworkers, not distant aliens (although sometimes it might feel that way).
                                    If you've read this far, you probably need more coffee. Let's go grab some!
                                </p>
                                <Button
                                    size="lg"
                                    className="bg-[#5D51FF] text-white hover:bg-[#4B41CC] transition duration-300 hover:shadow-[0_0_15px_rgba(93,81,255,0.5)]"
                                >
                                    Initiate Coffee Break Protocol <Coffee className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </PageWrapper>
    );
}