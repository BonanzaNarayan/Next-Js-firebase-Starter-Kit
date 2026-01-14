'use client'
import { useAuth } from "@/context/AuthContext"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { auth, db } from "./firebase"
import { useRouter } from "next/navigation"
import { getUserProfile } from "./userDB"

export const Dodopayments = ()=>{
    const { user: u } = useAuth();
    const router = useRouter()
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState()
    // 
    useEffect(()=>{
    getUserProfile(u?.uid).then((user) => {
      setUser(user)
    });
  },[])

  const upgradeAccount = async (plan_info)=>{
    try {
        if (!u) {
            router.push("/sign-in");
            return;
        }
        setLoad(true)
        const response = await fetch(`/api/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            product_cart: [
              { 
                  product_id: plan_info.product_id, 
                  quantity: 1 
              }
              ],
              metadata: {
                  name: plan_info.name,
                  uid: user?.uid,
                  planInterval: plan_info.interval,
                  price: plan_info.price,
              },
              return_url: `${window.location.origin}/dashboard`,
            }),
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Checkout error response:", text);
          toast.error("Failed to start checkout process");
          return;
        }

        const { checkout_url } = await response.json();
        window.location.href = checkout_url;
    } catch (error) {
        toast.error("Failed to start checkout process");
        console.log(error)
    }
    finally{
        setLoad(false)
    }
  }

  const downgradeAccount = async () => {
    if (!user?.subscriptionId) return toast.error("No subscription found.");

    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId: user?.subscriptionId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Cancel failed");
      }

      if (!u) return;

      await updateDoc(doc(db, "users", u?.uid), {
        cancelAtPeriodEnd: true,
      });

      toast.success("Your subscription will end after this billing cycle.");
      return { success: true };
    } catch (error) {
      toast.error("Could not cancel subscription");
      return {
        success: false,
        error: error.message || "Unknown error",
      };
    }
  };

  const restoreAccount = async () => {
    if (!user?.subscriptionId) return toast.error("No subscription found.");

    try {
      const response = await fetch("/api/subscription/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId: user?.subscriptionId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Cancel failed");
      }

      if (!u) return;

      await updateDoc(doc(db, "users", u.uid), {
        cancelAtPeriodEnd: false,
        updatedAt: serverTimestamp()
      });

      toast.success("Your subscription cycle has been restored");
      return { success: true };
    } catch (error) {
      toast.error("Could not cancel restore");
      return {
        success: false,
        error: error.message || "Unknown error",
      };
    }
  };



  return { upgradeAccount, downgradeAccount, restoreAccount, load }
}