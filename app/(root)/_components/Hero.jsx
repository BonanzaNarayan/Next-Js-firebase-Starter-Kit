'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { motion } from "motion/react"
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Download, ArrowRight, Sparkles, CheckCircle, Star, Github, BadgeQuestionMark } from 'lucide-react'

export default function Hero() {
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

    const features = [
        "Authentication & Authorization",
        "Dodopayments Integration",
        "Emailing Resend",
        "Dark/Light Mode",
        "Responsive Design",
        "Shadcn UI",
    ]

    return (
        <section className="relative overflow-hidden py-12 sm:py-20 lg:py-28">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
            </div>


            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-1.5 mb-6 sm:mb-8"
                    >
                        <BadgeQuestionMark className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">This website is the preview of the project</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6"
                    >
                        Build Your SaaS Faster with{' '}
                        <span className="bg-linear-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                            Next.js & Firebase
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12"
                    >
                        Production-ready SaaS boilerplate with authentication, payments, and everything you need to launch faster. 
                        Start building in minutes, not days.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16"
                    >
                        <Button 
                            size="lg" 
                            className="group gap-2 px-6 sm:px-8 text-base sm:text-lg"
                        >
                            <Download className="h-5 w-5" />
                            Download This Project
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline"
                            className="px-6 sm:px-8 text-base sm:text-lg"
                        >
                            <Github className="h-5 w-5" />
                            Star on github
                        </Button>
                    </motion.div>

                    {/* Tools Section */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-12 sm:mb-16"
                    >
                        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                            Built with modern technologies
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
                            {tools.map((tool, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ 
                                        duration: 0.3, 
                                        delay: 0.1 + index * 0.05,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                    whileHover={{ 
                                        scale: 1.05, 
                                        y: -4,
                                        transition: { duration: 0.2 }
                                    }}
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
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Features */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    className="flex items-center gap-2 p-3 sm:p-4 rounded-lg border bg-background/50"
                                >
                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                    <span className="text-sm sm:text-base">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}