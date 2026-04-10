const SUPABASE_URL = "https://llooewepqlkcpqzmiuzo.supabase.co";
const SUPABASE_KEY = "sb_publishable_vYhWHzf0GkDxch6hp9QmAA_kXkJEu6C";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// CHECK USER
async function checkUser() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    window.location.href = "index.html";
  }
}

checkUser();
