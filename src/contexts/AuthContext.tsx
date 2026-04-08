// ============================================
// Auth Context - manages user session and profile
// Session: Provides login state across the app
// ============================================

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  user_id: string;
  username: string;
  score: number;
  level: number;
  total_login_num: number;
  last_login_at: string | null;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (username: string, password: string) => Promise<{ error: string | null }>;
  signIn: (username: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  addScore: (points: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Login: Converts username to fake email for Supabase Auth
const usernameToEmail = (username: string) => `${username.toLowerCase().trim()}@kids-game.local`;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // DB: Fetch user profile from profiles table
  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (data) setProfile(data as Profile);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  // Session: Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          // Use setTimeout to avoid deadlock with Supabase auth
          setTimeout(() => fetchProfile(session.user.id), 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  // Signup: Create new user with username
  const signUp = async (username: string, password: string): Promise<{ error: string | null }> => {
    const trimmed = username.trim();
    if (trimmed.length < 2) return { error: "שם המשתמש צריך להיות לפחות 2 תווים" };
    if (password.length < 6) return { error: "הסיסמה צריכה להיות לפחות 6 תווים" };

    // Check if username already exists
    const { data: existing } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", trimmed)
      .single();

    if (existing) return { error: "השם הזה כבר תפוס, נסו שם אחר 😊" };

    const { error } = await supabase.auth.signUp({
      email: usernameToEmail(trimmed),
      password,
      options: { data: { username: trimmed } },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        return { error: "השם הזה כבר תפוס, נסו שם אחר 😊" };
      }
      return { error: "משהו השתבש, נסו שוב 🤔" };
    }
    return { error: null };
  };

  // Login: Sign in with username and password
  const signIn = async (username: string, password: string): Promise<{ error: string | null }> => {
    const trimmed = username.trim();
    if (!trimmed) return { error: "הכניסו שם משתמש" };
    if (!password) return { error: "הכניסו סיסמה" };

    const { error } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(trimmed),
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login")) {
        // Check if user exists
        const { data: existing } = await supabase
          .from("profiles")
          .select("username")
          .eq("username", trimmed)
          .single();

        if (!existing) {
          return { error: "לא מצאנו אותך, אפשר להירשם 🙂" };
        }
        return { error: "הסיסמה לא נכונה, נסו שוב 🔑" };
      }
      return { error: "משהו השתבש, נסו שוב 🤔" };
    }

    // Login: Update login tracking
    // Update last_login_at and total_login_num
    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("total_login_num, user_id")
      .eq("username", trimmed)
      .single();

    if (currentProfile) {
      await supabase
        .from("profiles")
        .update({
          last_login_at: new Date().toISOString(),
          total_login_num: (currentProfile.total_login_num || 0) + 1,
        })
        .eq("user_id", currentProfile.user_id);
    }

    return { error: null };
  };

  // Session: Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  // Score Save: Add points to user's score after game completion
  const addScore = async (points: number) => {
    if (!user || !profile) return;
    const newScore = profile.score + points;
    await supabase
      .from("profiles")
      .update({ score: newScore })
      .eq("user_id", user.id);
    setProfile((prev) => prev ? { ...prev, score: newScore } : prev);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, session, loading, signUp, signIn, signOut, refreshProfile, addScore }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
