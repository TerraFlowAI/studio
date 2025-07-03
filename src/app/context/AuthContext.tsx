
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/lib/supabase';
import type { SupabaseClient, User } from '@supabase/supabase-js';

// Define the shape of the user profile data stored in your 'users' table
export type UserProfile = {
  id: string;
  display_name: string;
  email: string;
  role: 'admin' | 'customer';
  has_completed_onboarding: boolean;
};

// Define the shape of the context
type AuthContextType = {
  supabase: SupabaseClient;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
};

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This function handles fetching the user's profile from your public 'users' table.
    const fetchUserProfile = async (currentUser: User) => {
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUser.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        setProfile(null);
      } else {
        setProfile(userProfile);
      }
    };

    // Subscribe to authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await fetchUserProfile(currentUser);
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    // Initial check on component mount
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user);
      }
      setIsLoading(false);
    };

    initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const isAdmin = profile?.role === 'admin';

  const value = {
    supabase,
    user,
    profile,
    isLoading,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
