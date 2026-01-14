"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile } from "@/lib/userDB";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, User, Shield, Clock, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const { user: u, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !u) {
      router.push("/sign-in");
    }
    getUserProfile(u?.uid).then((user) => {
      setUser(user);
    });
  }, [u, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Format the creation date
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Here&apos;s your account information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Profile Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>
                  Your personal account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Image height={80} width={80} src={"/profile.jpg"} alt={user.displayName || "No name set"} className="h-20 w-20 rounded-full border-2" />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {user.displayName || user?.email?.split("@")[0]}
                    </h3>
                    <Badge variant="outline" className="mt-1">
                      {user.emailVerified ? "Verified" : "Not Verified"}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email || "No email"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">User ID</p>
                        <p className="font-medium text-sm font-mono break-all">
                          {user.uid}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Account Created</p>
                        <p className="font-medium">
                          {user.metadata?.creationTime 
                            ? formatDate(user.metadata.creationTime)
                            : "Unknown"
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Last Sign In</p>
                        <p className="font-medium">
                          {user.metadata?.lastSignInTime 
                            ? formatDate(user.metadata.lastSignInTime)
                            : "Unknown"
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Account Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={user.emailVerified ? "default" : "secondary"}>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {user.emailVerified ? "Email Verified" : "Email Not Verified"}
                    </Badge>
                    <Badge variant="outline">
                      Active User
                    </Badge>
                    <Badge variant="outline">
                      {user.providerData?.[0]?.providerId || "Firebase"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}