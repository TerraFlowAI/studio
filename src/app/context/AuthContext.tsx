
// src/app/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Define the shape of the context data
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // This is the core Firebase listener for authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, get their token to check for custom claims
        const tokenResult = await user.getIdTokenResult();
        // Set admin status based on the 'role' custom claim
        setIsAdmin(tokenResult.claims.role === 'admin');
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to easily use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
