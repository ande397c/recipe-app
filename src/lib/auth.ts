import type { AuthChangeEvent, Session, VerifyOtpParams } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export const signInWithOtp = (email: string) =>
  supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin }
  });

export const signOut = () => supabase.auth.signOut();

export const getClaims = () => supabase.auth.getClaims();

export const verifyOtp = (params: VerifyOtpParams) => supabase.auth.verifyOtp(params);

export const onAuthStateChange = (
  callback: (event: AuthChangeEvent, session: Session | null) => void
) => supabase.auth.onAuthStateChange(callback);
