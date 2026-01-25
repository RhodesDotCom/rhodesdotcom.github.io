// db/config.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Replace with your Supabase project info
export const SUPABASE_URL = "https://pcmztpqkwpfdtwrameqk.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjbXp0cHFrd3BmZHR3cmFtZXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzIzNjYsImV4cCI6MjA2ODg0ODM2Nn0.lcfkzc3knDburRZ71NDDNlLlP6d4HOrKHtLYRgHVeTY";


// Shared email for single-password login
export const EMAIL = "user@heatherandnathan.co.uk";

// Supabase client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
