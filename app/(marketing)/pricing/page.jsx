import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import PriceCards from "../_components/PriceCards";

export default function Pricing() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="relative overflow-hidden">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
          <div
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Header */}
            <div>
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
            </div>

            {/* Pricing */}
            <PriceCards />
            
          </div>
        </div>
      </section>
    </div>
  );
}