"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../lib/firebase'; // adjust path as needed

// Define user data type
interface UserType {
  email: string | null;
  uid: string | null;
}

// Create AuthContext with proper typing
interface AuthResponse {
  user?: {
    uid: string;
    email: string | null;
  };
  error?: string;
}

interface AuthContextType {
  user: UserType;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  logIn: (email: string, password: string) => Promise<AuthResponse>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

// AuthContext Provider component
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid
        });
      } else {
        setUser({ email: null, uid: null });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Auth methods
  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    return await signOut(auth);
  };

  const value = {
    user,
    signUp,
    logIn,
    logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};