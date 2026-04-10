const SUPABASE_URL = "https://llooewepqlkcpqzmiuzo.supabase.co";
const SUPABASE_KEY = "sb_publishable_vYhWHzf0GkDxch6hp9QmAA_kXkJEu6C";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");

// LOGIN
loginBtn.onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
  } else {
    window.location.href = "app.html";
  }
};

// SIGN UP
signupBtn.onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Account created. Check your email.");
  }
};
