'use client';
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { createUserProfile } from '@/lib/userDB';
import { signInWithGithub, signInWithGoogle } from '@/lib/auth';
import { Chrome, Github, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function OAuth() {
    const router = useRouter();
    const [loading, setLoading] = useState({
      google: false,
      github: false,
    });

    // Google auth
    const handleGoogle = async () => {
      setLoading(prev => ({ ...prev, google: true }));

      try {
        const { user } = await signInWithGoogle();
        await createUserProfile(user);
        router.push("/dashboard");
      } catch (err) {
        toast.error("Error signing in please try again")
      } finally {
        setLoading(prev => ({ ...prev, google: false }));
      }
  };

  // Github auth
  const handleGithub = async () => {
    setLoading(prev => ({ ...prev, github: true }));

    try {
      const { user } = await signInWithGithub();
      await createUserProfile(user);
      router.push("/dashboard");
    } catch (err) {
      toast.error("Error signing in please try again")
    } finally {
      setLoading(prev => ({ ...prev, github: false }));
    }
  };
  return (
    <div
        className="space-y-3"
    >
        <Button
            type="button"
            variant="outline"
            onClick={handleGoogle}
            disabled={loading.google || loading.github}
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
            disabled={loading.google || loading.github}
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
    </div>
  )
}
