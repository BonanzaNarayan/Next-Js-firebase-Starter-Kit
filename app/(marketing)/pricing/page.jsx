"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Sparkles, Zap, Shield, Globe, Infinity, Star, TrendingUp, Users, Cloud, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dodopayments } from "@/lib/dodopayments";

export default function Pricing() {
  const { upgradeAccount, load } = Dodopayments();
  const [isYearly, setIsYearly] = useState(false);

  const products = [
    {
      id: 1,
      name: "Starter",
      description: "Perfect for individual developers",
      price: isYearly ? 24 : 29,
      originalPrice: 29,
      interval: isYearly ? "year" : "month",
      features: [
        "Up to 10 projects",
        "5 team members",
        "100GB storage",
        "Custom domains",
        "Basic analytics",
        "Email support",
      ],
      plan_info: {
        name: "Starter",
        product_id: isYearly ? "pdt_0NW0ReNqm8Q9A1ZguwZAQ" : "pdt_e0QYhJivyCQyxdsgFCyar",
        interval: isYearly ? "Yearly" : "Monthly",
        price: isYearly ? "24" : "29",
      },
      popular: false,
      cta: "Get Started",
    },
    {
      id: 2,
      name: "Pro",
      description: "For growing teams and businesses",
      price: isYearly ? 79 : 99,
      originalPrice: 99,
      interval: isYearly ? "year" : "month",
      features: [
        "Unlimited projects",
        "20 team members",
        "500GB storage",
        "Custom domains + SSL",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Webhooks",
      ],
      plan_info: {
        name: "Pro",
        product_id: isYearly ? "pdt_0NW0SAsgvu0GjQM878BKo" : "pdt_0NW0S1NF1Sw1zqdu1XEX1",
        interval: isYearly ? "Yearly" : "Monthly",
        price: isYearly ? "79" : "99",
      },
      popular: true,
      cta: "Try Pro Free",
    },
    {
      id: 3,
      name: "Enterprise",
      description: "For large organizations",
      price: isYearly ? 299 : 399,
      originalPrice: 399,
      interval: isYearly ? "year" : "month",
      features: [
        "Unlimited everything",
        "Custom user limits",
        "2TB+ storage",
        "Dedicated infrastructure",
        "Custom integrations",
        "24/7 phone support",
        "SLA guarantee",
        "Custom onboarding",
        "Security audit",
      ],
      plan_info: {
        name: "Enterprise",
        product_id: isYearly ? "pdt_0NW0SKBmmIkSWDjA9TurJ" : "pdt_0NW0SSdjGPR0AFgscp0xj",
        interval: isYearly ? "Yearly" : "Monthly",
        price: isYearly ? "299" : "399",
      },
      popular: false,
      cta: "Grow Bigger",
      custom: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const benefits = [
    { icon: Shield, text: "Enterprise-grade security" },
    { icon: Globe, text: "99.9% uptime SLA" },
    { icon: Users, text: "Scalable team collaboration" },
    { icon: Cloud, text: "Global CDN" },
    { icon: CreditCard, text: "No hidden fees" },
    { icon: Zap, text: "Instant setup" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Header */}
            <motion.div variants={itemVariants}>
              <Badge 
                variant="outline" 
                className="mb-4 sm:mb-6 px-4 py-1.5 text-sm"
              >
                <Sparkles className="h-3 w-3 mr-2" />
                Simple, transparent pricing
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
                Pricing that{" "}
                <span className="bg-linear-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                  scales with you
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12">
                Start free, upgrade as you grow. No surprise fees, cancel anytime.
                14-day free trial on all paid plans.
              </p>
            </motion.div>

            {/* Billing Toggle */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-4 p-1 bg-muted rounded-lg">
                <Label 
                  htmlFor="billing-toggle" 
                  className={`cursor-pointer px-4 py-2 rounded-md transition-colors ${!isYearly ? 'bg-background shadow' : 'text-muted-foreground'}`}
                >
                  Monthly billing
                </Label>
                <Switch
                  id="billing-toggle"
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                  className="data-[state=checked]:bg-primary"
                />
                <Label 
                  htmlFor="billing-toggle" 
                  className={`cursor-pointer px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${isYearly ? 'bg-background shadow' : 'text-muted-foreground'}`}
                >
                  Yearly billing
                  <Badge variant="secondary" className="text-xs">
                    Save 20%
                  </Badge>
                </Label>
              </div>
            </motion.div>

            {/* Pricing Cards */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-20"
            >
              {products.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card className={`h-full relative transition-all duration-300 ${plan.popular ? 'border-primary shadow-xl' : 'border'}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="px-3 py-1 text-sm">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {plan.description}
                      </CardDescription>
                      
                      <div className="mt-6">
                        <div className="flex items-baseline">
                          <span className="text-4xl sm:text-5xl font-bold">${plan.price}</span>
                          <span className="text-muted-foreground ml-2">/{plan.interval}</span>
                        </div>
                        {isYearly && plan.originalPrice && (
                          <p className="text-sm text-muted-foreground mt-1">
                            <s>${plan.originalPrice}/month</s> when billed monthly
                          </p>
                        )}
                      </div>
                    </CardHeader>

                    <Separator />

                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="pt-6">
                        <Button
                          onClick={() => upgradeAccount(plan.plan_info)}
                          disabled={load}
                          className={`w-full h-12 ${plan.popular ? '' : 'bg-primary'}`}
                          size="lg"
                          variant={plan.popular ? "default" : "default"}
                        >
                          {load ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              {plan.cta}
                              {plan.popular && <Zap className="ml-2 h-4 w-4" />}
                            </>
                          )}
                        </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Benefits Section */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
                Everything you need to succeed
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}