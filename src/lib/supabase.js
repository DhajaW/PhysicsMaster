import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if variables exist in client/server runtime
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.error(
      '🚨 Supabase configuration error: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Please check your .env.local file configuration.'
    );
  }
}

// Fallback values prevent Next.js build-time errors when env vars are missing
const finalUrl = supabaseUrl || 'https://placeholder-url.supabase.co';
const finalAnonKey = supabaseAnonKey || 'placeholder-anon-key';

export const supabase = createClient(finalUrl, finalAnonKey, {
  auth: {
    persistSession: true,     // Persists user sessions automatically in local storage
    autoRefreshToken: true,   // Automatically refreshes auth tokens
    detectSessionInUrl: true  // Detects OAuth callback tokens in URL
  }
});
