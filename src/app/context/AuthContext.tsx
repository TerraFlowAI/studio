
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
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUser.id)
        .single();
      
      // "PGRST116" is the error code for when .single() finds 0 rows.
      // We can safely ignore it and treat it as a "profile not found" case.
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        return null;
      }
      
      return data;
    };

    // Subscribe to authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
            let userProfile = await fetchUserProfile(currentUser);

            // If a new user signs in (e.g., via Google OAuth) and they don't have a profile yet, create one.
            if (!userProfile && event === 'SIGNED_IN') {
                 console.log("No profile found for new user, creating one...");
                 const { data: newUserProfile, error: insertError } = await supabase.from('users').insert({
                    id: currentUser.id,
                    // Use the name from Google/OAuth provider, fallback to email
                    display_name: currentUser.user_metadata.name || currentUser.email,
                    email: currentUser.email,
                    role: 'customer',
                    has_completed_onboarding: false,
                 }).select().single(); // select().single() to get the new profile back

                 if (insertError) {
                    console.error("Error creating user profile:", insertError);
                    setProfile(null);
                 } else {
                    userProfile = newUserProfile;
                 }
            }
            
            setProfile(userProfile);

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
        const userProfile = await fetchUserProfile(session.user);
        setProfile(userProfile);
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
