import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
}

// Configure with options specifically for GitHub Pages deployment
export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || '',
  {
    auth: {
      // This ensures the redirect works correctly on GitHub Pages with custom domains or project pages
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

