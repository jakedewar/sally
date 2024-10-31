"use client"
import { ArrowRight, Coffee, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageWrapper from "@/components/wrapper/page-wrapper"
import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface PricingTierProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    icon: React.ElementType;
    buttonText: string;
}

const PricingTier: React.FC<PricingTierProps> = ({ title, price, description, features, icon: Icon, buttonText }) => (
    <div className="flex flex-col p-6 bg-[#1A1A1A]/70 backdrop-blur-sm rounded-lg shadow-lg border border-[#333333] transition-all duration-300 hover:shadow-[0_0_30px_rgba(93,81,255,0.3)] hover:scale-105">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#5D51FF] rounded-full">
            <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-center text-[#F9F9FF]">{title}</h3>
        <div className="mt-2 text-center text-5xl font-semibold text-[#5D51FF]">{price}</div>
        <p className="mt-3 text-center text-[#A6A6A6]">{description}</p>
        <ul className="mt-6 space-y-4 flex-grow">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-[#5D51FF] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-[#F9F9FF]">{feature}</span>
                </li>
            ))}
        </ul>
        <Link href={`/signin`} className="w-full mt-8">
            <Button className="w-full bg-[#5D51FF] text-white hover:bg-[#4B41CC]">
                {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </Link>
    </div>
)

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

export default function Pricing() {
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
                                    <span className="text-[#5D51FF]">Sally's</span> Cosmic Pricing
                                </h1>
                                <p className="mx-auto max-w-[700px] text-xl text-[#F9F9FF] md:text-2xl/relaxed lg:text-3xl/relaxed">
                                    Choose Your Intergalactic Payment Plan
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Pricing Section */}
                    <section className="w-full py-20 bg-transparent">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <PricingTier
                                    title="Astro Apprentice"
                                    price="FREE"
                                    description="For SAs who are ready to leave Earth's atmosphere but forgot to pack a spacesuit."
                                    features={[
                                        "Access to a star map of basic Klaviyo features",
                                        "Asteroid-dodging tips for avoiding common SA pitfalls",
                                        "A space helmet to protect you from client brain-melting questions",
                                        "One free 'Get Out of Zoom Jail' card per month"
                                    ]}
                                    icon={Coffee}
                                    buttonText="Launch Career"
                                />
                                <PricingTier
                                    title="Galactic Guru"
                                    price="FREE"
                                    description="For SAs who can recite Klaviyo documentation in their sleep and have mastered the art of client mind-reading."
                                    features={[
                                        "Wormhole generator for instant access to any Klaviyo feature",
                                        "Telepathic link with the Klaviyo dev team",
                                        "Ability to bend space-time to meet impossible deadlines",
                                        "Anti-gravity boots for walking clients through complex setups"
                                    ]}
                                    icon={Rocket}
                                    buttonText="Transcend Mortality"
                                />
                                <PricingTier
                                    title="Cosmic Overlord"
                                    price="FREE"
                                    description="For SAs who have ascended beyond mere mortal concerns and now exist as pure Klaviyo energy."
                                    features={[
                                        "Omniscience of all past, present, and future Klaviyo features",
                                        "Ability to solve client issues with a single thought",
                                        "Time travel capabilities to undo client mistakes before they happen",
                                        "A pet black hole to swallow up scope creep"
                                    ]}
                                    icon={Rocket}
                                    buttonText="Become One with Klaviyo"
                                />
                            </div>
                            <p className="mt-8 text-center text-[#A6A6A6] text-sm italic">
                                * Warning: Side effects may include spontaneous levitation, uncontrollable urges to draw Venn diagrams, and the ability to see email flows in the Matrix.
                            </p>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="w-full py-20 bg-transparent">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16 text-[#F9F9FF]">
                                Frequently Asked Quandaries (or "Things We Made Up to Sound Smart")
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    {
                                        q: "Is Sally really powered by dark matter?",
                                        a: "No, Sally runs on a proprietary blend of caffeine, dad jokes, and the tears of one frustrated aspiring developer."
                                    },
                                    {
                                        q: "Can I pay with cryptocurrency from other galaxies?",
                                        a: "We accept all forms of imaginary currency, including Monopoly money and IOUs written on napkins."
                                    },
                                    {
                                        q: "Will using Sally make me the ultimate Klaviyo SA?",
                                        a: "Sally will make you so good, you'll start finishing your clients' sentences. It's either impressive or creepy, we're not sure which."
                                    },
                                    {
                                        q: "Is the 'Free' tier really free?",
                                        a: "Yes, it's as free as the advice your uncle gives at Thanksgiving dinner. But unlike his advice, Sally is actually useful."
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