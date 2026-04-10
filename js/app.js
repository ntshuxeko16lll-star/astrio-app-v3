const SUPABASE_URL = "https://llooewepqlkcpqzmiuzo.supabase.co";
const SUPABASE_KEY = "sb_publishable_vYhWHzf0GkDxch6hp9QmAA_kXkJEu6C";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// CHECK USER
async function checkUser() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    window.location.href = "index.html";
  }

  return data.user;
}

// CREATE POST
document.getElementById("post-btn").onclick = async () => {
  const user = await checkUser();

  const file = document.getElementById("file-input").files[0];
  const caption = document.getElementById("caption").value;

  if (!file) return alert("Select file");

  const fileName = Date.now() + "-" + file.name;

  // UPLOAD FILE
  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(fileName, file);

  if (uploadError) {
    alert(uploadError.message);
    return;
  }

  // GET PUBLIC URL
  const { data } = supabase.storage
    .from("media")
    .getPublicUrl(fileName);

  const mediaUrl = data.publicUrl;

  // SAVE POST
  await supabase.from("posts").insert([
    {
      user_id: user.id,
      media_url: mediaUrl,
      caption: caption
    }
  ]);

  loadFeed();
};

// LOAD FEED
async function loadFeed() {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  data.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    if (post.media_url.includes("video")) {
      div.innerHTML = `
        <video src="${post.media_url}" controls></video>
        <p>${post.caption}</p>
      `;
    } else {
      div.innerHTML = `
        <img src="${post.media_url}">
        <p>${post.caption}</p>
      `;
    }

    feed.appendChild(div);
  });
}

// INIT
loadFeed();
