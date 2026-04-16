window.SUPABASE_URL = "https://tntbdasgrqvtcrpfwjgd.supabase.co";
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRudGJkYXNncnF2dGNycGZ3amdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTAzNjYsImV4cCI6MjA4OTkyNjM2Nn0.LgqLlC2kb4gaLRkuoU4-Uze5YjJQTvsFmbKdrzf9PEQ";

if (window.supabase && typeof window.supabase.createClient === "function") {
	window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
}
