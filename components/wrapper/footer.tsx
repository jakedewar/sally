"use client"
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowRight, Code, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data: any) => {
        // Handle form submission
        console.log(data);
        reset();
    };

    return (
        <footer className="relative z-20 border-t border-gray-800 bg-black text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <Code className="h-6 w-6 text-[#5D51FF]" />
                            <span className="inline-block font-bold">Sally</span>
                        </Link>
                        <p className="text-gray-400">
                            Empowering Klaviyo SAs to navigate the e-commerce cosmos, close interstellar deals, and occasionally remember to refuel their space suits.
                        </p>
                        <div className="pt-4 text-sm text-gray-400">
                            &copy; 2024 Sally - Your Intergalactic SA Ally. All rights reserved across the multiverse.
                            <br />
                            <span className="flex items-center">
                                Crafted with <Heart className="h-4 w-4 mx-1 text-[#5D51FF] fill-current" /> by Jake
                            </span>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">Join the Galactic Sally Network</h3>
                        <p className="text-gray-400">
                            Receive transmissions on the latest Klaviyo SA cosmic discoveries and Sally updates. We promise not to flood your inbox (unlike those pesky asteroid field notifications).
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                            <Input
                                {...register('email', { required: true })}
                                placeholder="Your quantum-encrypted email"
                                type="email"
                                className="flex-1 bg-[#000000] border-[#333333] text-[#F9F9FF] placeholder-[#666666] focus:ring-2 focus:ring-[#5D51FF] transition-all duration-300"
                            />
                            <Button type="submit" className="bg-[#5D51FF] hover:bg-[#5D51FF] text-white">
                                Subscribe to Sally <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                        <p className="text-sm text-gray-400">
                            By subscribing, you agree to receive transmissions that are <i>almost</i> as exciting as discovering a new exoplanet in the Klaviyo universe.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
