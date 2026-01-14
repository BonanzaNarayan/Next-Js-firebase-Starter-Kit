'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React from 'react'

export default function Tools() {
    const { theme, resolvedTheme } = useTheme()
    const currentTheme = theme === 'system' ? resolvedTheme : theme
    
    const tools = [
        {
            name: "Next.js",
            icon: "https://nextjs.org/favicon.ico",
        },
        {
            name: "Firebase",
            icon: "https://firebase.google.com/favicon.ico",
        },
        {
            name: "Tailwind CSS",
            icon: "https://tailwindcss.com/favicon.ico",
        },
        {
            name: "Shadcn UI",
            icon: "https://ui.shadcn.com/favicon.ico",
        },
        {
            name: "Dodopayments",
            icon: "https://app.dodopayments.com/favicon.ico",
        },
        {
            name: "Resend",
            icon: currentTheme === "dark" 
                ? "https://cdn.resend.com/brand/resend-wordmark-white.svg" 
                : "https://cdn.resend.com/brand/resend-wordmark-black.svg",
        },
        {
            name: "JavaScript",
            icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        },
    ]
  return (
        <div
            className="mb-12 sm:mb-16"
            >
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                Built with modern technologies
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
                {tools.map((tool, index) => (
                    <div
                        key={index}
                        className="group relative"
                    >
                        <div className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl">
                            <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                                <Image 
                                    src={tool.icon} 
                                    alt={tool.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                {tool.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    )
}
