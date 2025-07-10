// src/lib/firebase/auth.js
import { GoogleAuthProvider, signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export function onAuthStateChangedListener(callback: (user: any) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    await fbSignOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
  }
}
