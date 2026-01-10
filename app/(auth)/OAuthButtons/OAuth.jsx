'use client';
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { createUserProfile } from '@/lib/db';
import { signInWithGithub, signInWithGoogle } from '@/lib/auth';
import { Chrome, Github, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OAuth() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({
      google: false,
      github: false,
      email: false
    });
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1
      }
    };
    const handleGoogle = async () => {
    setError("");
    setLoading(prev => ({ ...prev, google: true }));

    try {
      const { user } = await signInWithGoogle();
      await createUserProfile(user);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to sign up with Google");
    } finally {
      setLoading(prev => ({ ...prev, google: false }));
    }
  };

  const handleGithub = async () => {
    setError("");
    setLoading(prev => ({ ...prev, github: true }));

    try {
      const { user } = await signInWithGithub();
      await createUserProfile(user);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to sign up with GitHub");
    } finally {
      setLoading(prev => ({ ...prev, github: false }));
    }
  };
  return (
    <motion.div 
        variants={itemVariants}
        className="space-y-3"
    >
        <Button
            type="button"
            variant="outline"
            onClick={handleGoogle}
            disabled={loading.google || loading.github || loading.email}
            className="w-full h-11 relative"
        >
            {loading.google ? (
                <Loader2 className="h-4 w-4 animate-spin absolute left-4" />
            ) : (
                <Chrome className="h-4 w-4 absolute left-4" />
            )}
            <span className="flex-1 text-center">
                {loading.google ? "Signing up..." : "Sign up with Google"}
            </span>
        </Button>

        <Button
            type="button"
            variant="outline"
            onClick={handleGithub}
            disabled={loading.google || loading.github || loading.email}
            className="w-full h-11 relative"
        >
            {loading.github ? (
                <Loader2 className="h-4 w-4 animate-spin absolute left-4" />
            ) : (
                <Github className="h-4 w-4 absolute left-4" />
            )}
            <span className="flex-1 text-center">
                {loading.github ? "Signing up..." : "Sign up with GitHub"}
            </span>
        </Button>
    </motion.div>
  )
}
