"use client"
import PageWrapper from "@/components/wrapper/page-wrapper";
import config from "@/config";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ParticleBackground } from "@/components/particle-background";

export default function SignInPage() {
    const router = useRouter()

    if (!config?.auth?.enabled) {
        router.back()
    }

    const appearance = {
        layout: {
            socialButtonsVariant: "iconButton",
            socialButtonsPlacement: "bottom",
            logoPlacement: "inside",
        },
        elements: {
            rootBox: "w-full max-w-md",
            card: "bg-black/50 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl",
            headerTitle: "text-2xl font-bold text-[#F9F9FF]",
            headerSubtitle: "text-[#A6A6A6]",
            formButtonPrimary: "bg-[#5D51FF] hover:bg-[#4B41CC] text-white font-semibold py-3 px-8 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_rgba(93,81,255,0.5)]",
            formFieldInput: "bg-[#1A1A1A] border-[#333333] text-[#F9F9FF] rounded-md focus:ring-[#5D51FF] focus:border-[#5D51FF]",
            formFieldLabel: "text-[#A6A6A6]",
            // footerActionLink: "text-[#5D51FF] hover:text-[#4B41CC]",
            socialButtonsIconButton: "border border-[#333333] hover:bg-[#1A1A1A] text-[#F9F9FF]",
            socialButtonsBlockButton: "border border-[#333333] hover:bg-[#1A1A1A] text-[#F9F9FF]",
            dividerLine: "bg-[#333333]",
            dividerText: "text-[#A6A6A6]",
            formFieldInputShowPasswordButton: "text-[#A6A6A6] hover:text-[#F9F9FF]",
            footer: "cl-footer text-[#A6A6A6] bg-black/50 backdrop-blur-md border-t border-gray-800",
            main: "text-[#F9F9FF]",
            // Add these new styles for the "Don't have an account?" section
            footerActionText: "text-[#A6A6A6]",
            footerActionLink: "text-[#5D51FF] hover:text-[#4B41CC] font-semibold",
        },
    };

    return (
        <PageWrapper>
            <div className="relative min-h-screen bg-[#000000] text-white w-full">
                <ParticleBackground />
                <div className="relative z-10 flex min-w-screen justify-center items-center min-h-screen px-4">
                    <SignIn
                        appearance={{
                            ...appearance,
                            layout: {
                                ...appearance.layout,
                                logoPlacement: appearance.layout.logoPlacement as "none" | "inside" | "outside" | undefined,
                                socialButtonsVariant: appearance.layout.socialButtonsVariant as "iconButton" | "auto" | "blockButton" | undefined,
                                socialButtonsPlacement: appearance.layout.socialButtonsPlacement as "bottom" | "top" | undefined
                            }
                        }}
                        routing="path"
                        path="/sign-in"
                        signUpUrl="/sign-up"
                    />
                </div>
            </div>
        </PageWrapper>
    );
}