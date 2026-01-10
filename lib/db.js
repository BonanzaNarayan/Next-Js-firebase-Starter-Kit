import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { toast } from "sonner";

export const createUserProfile = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { email, displayName, photoURL } = user;
    try {
      await setDoc(userRef, {
        uid: user.uid,
        email,
        displayName,
        photoURL,
        subscriptionStatus: "inactive", // Default status
        createdAt: serverTimestamp(),
      });
      toast.success("User profile created successfully 🎉");
    } catch (error) {
      console.error("Error creating user profile", error);
    }
  }
  toast.error("Welcome back! 🎉");
};

export const getUserProfile = async (uid) => {
  if (!uid) return null;
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  }
  return null;
};
