import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize client safely to avoid crashing the app on startup if variables are missing
const safeUrl = supabaseUrl.startsWith('http') ? supabaseUrl : 'https://placeholder-project.supabase.co';
const safeKey = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(safeUrl, safeKey);
