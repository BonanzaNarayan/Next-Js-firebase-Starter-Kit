'use client'
import { useAuth } from "@/context/AuthContext"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { auth, db } from "./firebase"
import { useRouter } from "next/navigation"

export const Dodopayments = ()=>{
    const { user } = useAuth();
    const router = useRouter()
    const [load, setLoad] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [subkey, setSubKey] = useState()
    useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async (user)=>{
      if(user){
        setCurrentUser(user?.uid)
        const docRef = doc(db, 'users', user?.uid)
        const response = await getDoc(docRef)
        if(response.exists()){
          setSubKey(response.data().subscriptionId)
        }
      }
    })
    return ()=>unsubscribe()
  },[])

  const upgradeAccount = async (plan_info)=>{
    try {
        if (!user) {
            router.push("/login");
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
                    uid: currentUser,
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
    if (!subkey) return toast.error("No subscription found.");

    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId: subkey }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Cancel failed");
      }

      if (!currentUser) return;

      await updateDoc(doc(db, "users", currentUser), {
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
    if (!subkey) return toast.error("No subscription found.");

    try {
      const response = await fetch("/api/subscription/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId: subkey }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Cancel failed");
      }

      if (!currentUser) return;

      await updateDoc(doc(db, "users", currentUser), {
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