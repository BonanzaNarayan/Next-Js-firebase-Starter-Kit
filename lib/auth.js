import {
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signOut
} from "firebase/auth";
import { auth } from "./firebase";

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const signInWithGithub = () => {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logOut = () => {
  return signOut(auth);
};
