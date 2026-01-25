import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://afewhxffjdlieabhptms.supabase.co';
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

if (!SUPABASE_URL || !SUPABASE_API_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);