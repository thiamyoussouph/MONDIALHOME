// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Vérification des variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Variables Supabase manquantes dans .env.local')
}

// Client pour le browser (frontend) - avec anon key
export const supaBrowser = () =>
  createClient(supabaseUrl, supabaseAnonKey)