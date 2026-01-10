"use client";

import { useState } from "react";
import { signUpWithEmail, signInWithGoogle, signInWithGithub } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserProfile } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, Loader2, Github, Chrome, Check, X, User, Flame } from "lucide-react";
import { motion } from "framer-motion";
import OAuth from "../OAuthButtons/OAuth";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    email: false,
    google: false,
    github: false
  });
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordStrength({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      });
    }
  };

  const validatePassword = () => {
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(formData.password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(formData.password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(formData.password)) {
      return "Password must contain at least one number";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const passwordError = validatePassword();
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(prev => ({ ...prev, email: true }));

    try {
      const { user } = await signUpWithEmail(formData.email, formData.password);
      await createUserProfile(user);
      
      // Send welcome email
      const token = await user.getIdToken();
      await fetch("/api/email/welcome", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create account");
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

  const passwordRequirements = [
    { key: "length", label: "At least 8 characters", met: passwordStrength.length },
    { key: "uppercase", label: "One uppercase letter", met: passwordStrength.uppercase },
    { key: "lowercase", label: "One lowercase letter", met: passwordStrength.lowercase },
    { key: "number", label: "One number", met: passwordStrength.number },
    { key: "special", label: "One special character", met: passwordStrength.special },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-linear-to-br from-background to-primary/5">
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
                  <Flame className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold tracking-tight">NextFire SaaS</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Create your account and start building today
            </p>
          </motion.div>

          {/* Signup Card */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Create your account
                </CardTitle>
                <CardDescription className="text-center">
                  Start your 14-day free trial. No credit card required.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Social Signup Buttons */}
                <OAuth />

                {/* Separator */}
                <motion.div variants={itemVariants}>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or sign up with email
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Email Signup Form */}
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
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading.email || loading.google || loading.github}
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword.password ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading.email || loading.google || loading.github}
                        className="pl-10 pr-10 h-11"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        tabIndex={-1}
                      >
                        {showPassword.password ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2 pt-2"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {passwordRequirements.map((req) => (
                            <div key={req.key} className="flex items-center gap-2">
                              {req.met ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <X className="h-3 w-3 text-muted-foreground" />
                              )}
                              <span className={`text-xs ${req.met ? 'text-green-600' : 'text-muted-foreground'}`}>
                                {req.label}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{
                              width: `${(Object.values(passwordStrength).filter(Boolean).length / 5) * 100}%`
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword.confirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={loading.email || loading.google || loading.github}
                        className="pl-10 pr-10 h-11"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        tabIndex={-1}
                      >
                        {showPassword.confirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-red-500"
                      >
                        Passwords do not match
                      </motion.p>
                    )}
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      required
                    />
                    <Label htmlFor="terms" className="text-xs text-muted-foreground">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
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
                        Creating account...
                      </>
                    ) : (
                      "Start Free Trial"
                    )}
                  </Button>
                </motion.form>

                {/* Already have account */}
                <motion.div 
                  variants={itemVariants}
                  className="text-center pt-2"
                >
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link 
                      href="/login" 
                      className="font-semibold text-primary hover:underline transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get instant access to all features
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features List */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
          >
            <div className="space-y-1">
              <div className="h-8 w-8 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm font-medium">No credit card required</p>
              <p className="text-xs text-muted-foreground">14-day free trial</p>
            </div>
            <div className="space-y-1">
              <div className="h-8 w-8 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm font-medium">Full access included</p>
              <p className="text-xs text-muted-foreground">All features unlocked</p>
            </div>
            <div className="space-y-1">
              <div className="h-8 w-8 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm font-medium">Cancel anytime</p>
              <p className="text-xs text-muted-foreground">No long-term commitment</p>
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <p className="text-xs text-muted-foreground">
              <Lock className="h-3 w-3 inline mr-1" />
              Your data is secured with enterprise-grade encryption
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}