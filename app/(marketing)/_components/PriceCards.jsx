'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, TrendingUp } from "lucide-react";
import { Dodopayments } from "@/lib/dodopayments";

export default function PriceCards() {
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
            product_id: isYearly ? "pdt_0NW0ReNqm8Q9A1ZguwZAQ" : "pdt_e0QYhJivyCQyxdsgFCyar", // Product IDs from dodopayment
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
            product_id: isYearly ? "pdt_0NW0SAsgvu0GjQM878BKo" : "pdt_0NW0S1NF1Sw1zqdu1XEX1", // Product IDs from dodopayment
            interval: isYearly ? "Yearly" : "Monthly",
            price: isYearly ? "79" : "99",
        },
        popular: true,
        cta: "Try Pro Free",
        }
    ];
  return (
    <div>
        {/* Billing Toggle */}
        <div className="mb-12 sm:mb-16">
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
        </div>

        {/* Pricing Cards */}
        <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 sm:mb-20"
        >
            {products.map((plan) => (
            <div
                key={plan.id}
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
                        className={`w-full h-12`}
                        size="lg"
                        variant={plan.popular ? "default" : "secondary"}
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
            </div>
            ))}
        </div>
    </div>
  )
}
