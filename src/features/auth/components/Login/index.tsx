import { useState, useEffect, FormEvent } from 'react';
import type { AuthError } from '@supabase/supabase-js';
import { signInWithOtp, signOut, getClaims, verifyOtp, onAuthStateChange } from '@/lib/auth';

type Claims = {
  email?: string;
  [key: string]: unknown;
} | null;

export const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [claims, setClaims] = useState<Claims>(null);

  const [verifying, setVerifying] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    return !!params.get('token_hash');
  });

  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);

  useEffect(() => {
    const handleMagicLinkVerification = async () => {
      const params = new URLSearchParams(window.location.search);
      const token_hash = params.get('token_hash');
      const type = params.get('type');

      if (token_hash) {
        const { error } = await verifyOtp({
          token_hash,
          type: (type as 'signup' | 'magiclink' | 'recovery' | 'invite' | 'email') || 'email'
        });

        if (error) {
          setAuthError(error.message);
        } else {
          setAuthSuccess(true);
          window.history.replaceState({}, document.title, '/');
        }

        setVerifying(false);
      }
    };

    const getUserClaims = async () => {
      const { data, error } = await getClaims();
      if (!error) {
        setClaims(data?.claims ?? null);
      }
    };

    handleMagicLinkVerification();
    getUserClaims();

    const {
      data: { subscription }
    } = onAuthStateChange(async () => {
      await getUserClaims();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await signInWithOtp(email);

    if (error) {
      const authError = error as AuthError;
      alert(authError.message);
    } else {
      alert('Check your email for the login link!');
    }

    setLoading(false);
  };

  const handleLogout = async (): Promise<void> => {
    await signOut();
    setClaims(null);
  };

  // Verifying magic link
  if (verifying) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>Confirming your magic link...</p>
        <p>Loading...</p>
      </div>
    );
  }

  // Auth error state
  if (authError) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✗ Authentication failed</p>
        <p>{authError}</p>
        <button
          onClick={() => {
            setAuthError(null);
            window.history.replaceState({}, document.title, '/');
          }}
        >
          Return to login
        </button>
      </div>
    );
  }

  // Auth success but claims not loaded yet
  if (authSuccess && !claims) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✓ Authentication successful!</p>
        <p>Loading your account...</p>
      </div>
    );
  }

  // Logged in
  if (claims?.email) {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>You are logged in as: {claims.email}</p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    );
  }

  // Login form
  return (
    <div>
      <h1>Supabase + React</h1>
      <p>Sign in via magic link with your email below</p>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Your email'
          value={email}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? <span>Loading</span> : <span>Send magic link</span>}
        </button>
      </form>
    </div>
  );
};
