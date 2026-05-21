const SUPABASE_URL = "DIN_SUPABASE_URL";
const SUPABASE_ANON_KEY = "DIN_ANON_KEY";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
