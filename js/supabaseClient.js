const SUPABASE_URL = "https://mvgvmzkykevsdydwcigg.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Z3Ztemt5a2V2c2R5ZHdjaWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNzQxOTAsImV4cCI6MjA5NDk1MDE5MH0.y9c8nyUeFJvwlqsIdKoPwr41ynNpd4vAPUK82krxjp8";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
