"use client";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, MoveLeft } from "lucide-react";
import OAuth from "../OAuthButtons/OAuth";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Link href={'/'}>
        <Button size="sm" className={'absolute top-0 left-0 m-5'} variant="secondary">
          <MoveLeft /> Home
        </Button>
      </Link>
      <div className="w-full max-w-md">
        <div
          initial="hidden"
          animate="visible"
        >
          {/* Logo/Brand Section */}
          <div
            className="text-center mb-8"
          >
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold"><Flame /></span>
                </div>
                <span className="text-xl font-bold tracking-tight">NextFire SaaS</span>
              </div>
            </Link>
          </div>

          {/* Login Card */}
          <div>
            <Card className="border shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Sign in to your account
                </CardTitle>
                <CardDescription className="text-center">
                  Select sign in method to access your dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Social Login Buttons */}
                <OAuth />

                {/* Terms and Sign Up */}
                <div 
                  className="space-y-4 pt-4"
                >
                  <p className="text-xs text-center text-muted-foreground">
                    By continuing, you agree to our{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}