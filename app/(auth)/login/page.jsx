"use client";

import { useState } from "react";
import { signInWithEmail, signInWithGoogle, signInWithGithub } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserProfile } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, Loader2, Github, Chrome, Flame } from "lucide-react";
import { motion } from "framer-motion";
import OAuth from "../OAuthButtons/OAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    email: false,
    google: false,
    github: false
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(prev => ({ ...prev, email: true }));

    try {
      await signInWithEmail(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(prev => ({ ...prev, email: false }));
    }
  };

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
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 ">
      <div className="w-full max-w-md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo/Brand Section */}
          <motion.div 
            variants={itemVariants}
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
            <p className="text-sm text-muted-foreground">
              Welcome back! Please sign in to continue
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Sign in to your account
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Social Login Buttons */}
                <OAuth />

                {/* Separator */}
                <motion.div variants={itemVariants}>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with email
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Email Login Form */}
                <motion.form 
                  variants={itemVariants} 
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading.email || loading.google || loading.github}
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Link 
                        href="/forgot-password" 
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading.email || loading.google || loading.github}
                        className="pl-10 pr-10 h-11"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Alert variant="destructive">
                        <AlertDescription className="text-sm">
                          {error}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11"
                    disabled={loading.email || loading.google || loading.github}
                  >
                    {loading.email ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in with Email"
                    )}
                  </Button>
                </motion.form>

                {/* Terms and Sign Up */}
                <motion.div 
                  variants={itemVariants}
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

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Don&apos;t have an account?{" "}
                      <Link 
                        href="/signup" 
                        className="font-semibold text-primary hover:underline transition-colors"
                      >
                        Sign up for free
                      </Link>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      14-day free trial • No credit card required
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}