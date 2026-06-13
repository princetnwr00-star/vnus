// ═══════════════════════════════════════════════════════════
//  settings.js  —  Vnus AI Account Settings
//  index.html mein add karo:
//  <script type="module" src="settings.js"></script>
// ═══════════════════════════════════════════════════════════

import { initializeApp, getApps }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, updateProfile, deleteUser, reauthenticateWithCredential,
         EmailAuthProvider, GoogleAuthProvider, reauthenticateWithPopup }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// ── Existing Firebase app use karo ────────────────────────
const app  = getApps()[0];
const auth = getAuth(app);
const db   = getFirestore(app);
const storage = getStorage(app);

// ══════════════════════════════════════════════════════════
//  INJECT STYLES
// ══════════════════════════════════════════════════════════
function injectStyles() {
  if (document.getElementById("settings-styles")) return;
  const s = document.createElement("style");
  s.id = "settings-styles";
  s.textContent = `
    #settings-overlay {
      display: none; position: fixed; inset: 0; z-index: 9999;
      background: rgba(10,60,120,0.38);
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      align-items: center; justify-content: center; padding: 16px;
    }
    #settings-overlay.open { display: flex; animation: stOverlayIn .22s ease; }
    @keyframes stOverlayIn { from{opacity:0} to{opacity:1} }

    #settings-modal {
      background: rgba(255,255,255,0.94);
      backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
      border: 1.5px solid rgba(255,255,255,0.78);
      border-radius: 26px; width: 100%; max-width: 460px;
      padding: 0; overflow: hidden;
      box-shadow: 0 24px 64px rgba(0,80,180,0.18);
      animation: stModalIn .28s cubic-bezier(.22,.68,0,1.2);
      font-family: 'Inter', sans-serif;
    }
    @keyframes stModalIn {
      from{opacity:0;transform:scale(.92) translateY(18px)}
      to  {opacity:1;transform:scale(1)   translateY(0)}
    }

    /* Header */
    .st-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px 16px;
      border-bottom: 1px solid rgba(0,0,0,0.07);
    }
    .st-title { font-size: 18px; font-weight: 800; color: #111; }
    .st-close {
      width: 32px; height: 32px; border-radius: 50%;
      background: rgba(0,0,0,0.07); border: none;
      font-size: 17px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: #555; transition: background .15s;
    }
    .st-close:hover { background: rgba(0,0,0,0.13); }

    /* Body scroll */
    .st-body { padding: 20px 24px; max-height: 70vh; overflow-y: auto; }

    /* Section */
    .st-section { margin-bottom: 28px; }
    .st-section-title {
      font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; color: #aaa; margin-bottom: 14px;
    }

    /* Avatar area */
    .st-avatar-row {
      display: flex; align-items: center; gap: 16px; margin-bottom: 6px;
    }
    .st-avatar {
      width: 72px; height: 72px; border-radius: 50%;
      background: linear-gradient(135deg,#38b6f5,#0ea5e9);
      display: flex; align-items: center; justify-content: center;
      font-size: 28px; font-weight: 700; color: white;
      overflow: hidden; flex-shrink: 0;
      border: 3px solid rgba(56,182,245,0.25);
    }
    .st-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

    .st-avatar-btns { display: flex; flex-direction: column; gap: 8px; }
    .st-upload-btn {
      display: flex; align-items: center; gap: 7px;
      background: #111; color: white; border: none;
      border-radius: 50px; padding: 9px 18px;
      font-size: 13px; font-weight: 600; cursor: pointer;
      font-family: 'Inter', sans-serif; transition: opacity .15s;
    }
    .st-upload-btn:hover { opacity: .85; }
    .st-upload-btn svg { width: 14px; height: 14px; }
    .st-remove-btn {
      background: none; border: 1.5px solid rgba(0,0,0,0.12);
      border-radius: 50px; padding: 8px 18px;
      font-size: 13px; font-weight: 600; color: #666;
      cursor: pointer; font-family: 'Inter', sans-serif;
      transition: background .15s;
    }
    .st-remove-btn:hover { background: rgba(0,0,0,0.04); }
    #st-file-input { display: none; }
    .st-photo-hint { font-size: 11px; color: #bbb; margin-top: 4px; }

    /* Upload progress */
    .st-progress-wrap {
      height: 4px; background: rgba(0,0,0,0.07);
      border-radius: 4px; margin-top: 10px; display: none;
    }
    .st-progress-wrap.show { display: block; }
    .st-progress-bar {
      height: 100%; background: #38b6f5;
      border-radius: 4px; width: 0%;
      transition: width .3s;
    }

    /* Input fields */
    .st-field { margin-bottom: 14px; }
    .st-field label {
      display: block; font-size: 13px; font-weight: 600;
      color: #555; margin-bottom: 6px;
    }
    .st-input-row { display: flex; gap: 8px; align-items: center; }
    .st-input {
      flex: 1; padding: 12px 16px;
      background: rgba(255,255,255,0.92);
      border: 1.5px solid rgba(0,0,0,0.10); border-radius: 14px;
      font-size: 15px; font-family: 'Inter', sans-serif; color: #111;
      outline: none; transition: border-color .15s, box-shadow .15s;
      box-sizing: border-box;
    }
    .st-input:focus { border-color: #38b6f5; box-shadow: 0 0 0 3px rgba(56,182,245,0.18); }
    .st-input:disabled { background: rgba(0,0,0,0.04); color: #aaa; cursor: not-allowed; }

    .st-save-btn {
      padding: 12px 20px; background: #111; color: white;
      border: none; border-radius: 14px; font-size: 14px;
      font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif;
      transition: opacity .15s; white-space: nowrap;
      display: flex; align-items: center; gap: 6px;
    }
    .st-save-btn:hover { opacity: .85; }
    .st-save-btn:disabled { opacity: .5; cursor: not-allowed; }

    /* Message */
    .st-msg {
      font-size: 13px; border-radius: 10px; padding: 9px 14px;
      margin-top: 8px; display: none; font-family: 'Inter', sans-serif;
    }
    .st-msg.success { background: rgba(34,197,94,.12); color: #15803d; display: block; }
    .st-msg.error   { background: rgba(239,68,68,.10); color: #b91c1c; display: block; }

    /* Divider */
    .st-divider { height: 1px; background: rgba(0,0,0,0.07); margin: 4px 0 28px; }

    /* Danger zone */
    .st-danger-box {
      border: 1.5px solid rgba(239,68,68,0.25);
      border-radius: 16px; padding: 16px;
      background: rgba(239,68,68,0.04);
    }
    .st-danger-title { font-size: 14px; font-weight: 700; color: #dc2626; margin-bottom: 4px; }
    .st-danger-desc  { font-size: 13px; color: #888; margin-bottom: 14px; line-height: 1.5; }
    .st-delete-btn {
      width: 100%; padding: 12px;
      background: #dc2626; color: white; border: none;
      border-radius: 50px; font-size: 14px; font-weight: 700;
      cursor: pointer; font-family: 'Inter', sans-serif;
      transition: background .15s;
      display: flex; align-items: center; justify-content: center; gap: 7px;
    }
    .st-delete-btn:hover { background: #b91c1c; }

    /* Confirm delete modal */
    #delete-confirm-overlay {
      display: none; position: fixed; inset: 0; z-index: 10000;
      background: rgba(10,60,120,0.45);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      align-items: center; justify-content: center; padding: 16px;
    }
    #delete-confirm-overlay.open { display: flex; }
    #delete-confirm-modal {
      background: white; border-radius: 22px; padding: 28px 24px;
      max-width: 380px; width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.20);
      font-family: 'Inter', sans-serif;
      animation: stModalIn .22s cubic-bezier(.22,.68,0,1.2);
    }
    .dc-icon {
      width: 48px; height: 48px; background: rgba(239,68,68,0.10);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      margin: 0 auto 14px; font-size: 22px;
    }
    .dc-title { font-size: 18px; font-weight: 800; color: #111; text-align: center; margin-bottom: 8px; }
    .dc-desc  { font-size: 14px; color: #777; text-align: center; line-height: 1.5; margin-bottom: 20px; }
    .dc-field { margin-bottom: 16px; }
    .dc-field label { display: block; font-size: 13px; font-weight: 600; color: #555; margin-bottom: 6px; }
    .dc-input {
      width: 100%; padding: 11px 14px; box-sizing: border-box;
      border: 1.5px solid rgba(0,0,0,0.12); border-radius: 12px;
      font-size: 14px; font-family: 'Inter', sans-serif; color: #111; outline: none;
    }
    .dc-input:focus { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220,38,38,0.12); }
    .dc-btns { display: flex; gap: 10px; }
    .dc-cancel {
      flex: 1; padding: 12px; background: rgba(0,0,0,0.06);
      border: none; border-radius: 50px; font-size: 14px;
      font-weight: 600; color: #555; cursor: pointer;
      font-family: 'Inter', sans-serif;
    }
    .dc-confirm {
      flex: 1; padding: 12px; background: #dc2626;
      border: none; border-radius: 50px; font-size: 14px;
      font-weight: 700; color: white; cursor: pointer;
      font-family: 'Inter', sans-serif; transition: background .15s;
      display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .dc-confirm:hover { background: #b91c1c; }
    .dc-confirm:disabled { opacity: .5; cursor: not-allowed; }
    .dc-msg { font-size: 12px; color: #dc2626; margin-top: 8px; min-height: 16px; }

    /* Spinner */
    .st-spinner {
      width: 14px; height: 14px;
      border: 2px solid rgba(255,255,255,0.4);
      border-top-color: white; border-radius: 50%;
      animation: stSpin .7s linear infinite; flex-shrink: 0;
    }
    @keyframes stSpin { to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(s);
}

// ══════════════════════════════════════════════════════════
//  INJECT HTML
// ══════════════════════════════════════════════════════════
function injectHTML() {
  if (document.getElementById("settings-overlay")) return;
  document.body.insertAdjacentHTML("beforeend", `

  <!-- Settings Overlay -->
  <div id="settings-overlay">
    <div id="settings-modal">

      <!-- Header -->
      <div class="st-header">
        <div class="st-title">⚙️ Account Settings</div>
        <button class="st-close" id="st-close">✕</button>
      </div>

      <!-- Body -->
      <div class="st-body">

        <!-- Profile Picture -->
        <div class="st-section">
          <div class="st-section-title">Profile Picture</div>
          <div class="st-avatar-row">
            <div class="st-avatar" id="st-avatar-preview">?</div>
            <div class="st-avatar-btns">
              <button class="st-upload-btn" id="st-upload-trigger">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Upload Photo
              </button>
              <button class="st-remove-btn" id="st-remove-photo">Remove Photo</button>
            </div>
          </div>
          <div class="st-photo-hint">JPG, PNG ya GIF. Max 2MB.</div>
          <div class="st-progress-wrap" id="st-progress-wrap">
            <div class="st-progress-bar" id="st-progress-bar"></div>
          </div>
          <input type="file" id="st-file-input" accept="image/*"/>
          <div class="st-msg" id="st-photo-msg"></div>
        </div>

        <div class="st-divider"></div>

        <!-- Username -->
        <div class="st-section">
          <div class="st-section-title">Username</div>
          <div class="st-field">
            <label>Username</label>
            <div class="st-input-row">
              <input class="st-input" id="st-username" type="text"
                placeholder="Enter username" maxlength="20"/>
              <button class="st-save-btn" id="st-save-username">Save</button>
            </div>
            <div class="st-msg" id="st-username-msg"></div>
          </div>
        </div>

        <div class="st-divider"></div>

        <!-- Danger Zone -->
        <div class="st-section">
          <div class="st-section-title">Danger Zone</div>
          <div class="st-danger-box">
            <div class="st-danger-title">🗑️ Delete Account</div>
            <div class="st-danger-desc">
              Yeh action permanent hai. Tumhara account aur saara data
              hamesha ke liye delete ho jaayega. Isko undo nahi kiya ja sakta.
            </div>
            <button class="st-delete-btn" id="st-delete-account">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
              Delete My Account
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Delete Confirm Modal -->
  <div id="delete-confirm-overlay">
    <div id="delete-confirm-modal">
      <div class="dc-icon">🗑️</div>
      <div class="dc-title">Account Delete Karen?</div>
      <div class="dc-desc">
        Confirm karne ke liye apna <strong>password</strong> daalo
        (Google se login hai toh khaali chhodo).
        Yeh action <strong>permanent</strong> hai.
      </div>
      <div class="dc-field">
        <label for="dc-password">Password (if email login)</label>
        <input class="dc-input" id="dc-password" type="password" placeholder="Enter password to confirm"/>
      </div>
      <div class="dc-msg" id="dc-msg"></div>
      <div class="dc-btns">
        <button class="dc-cancel" id="dc-cancel">Cancel</button>
        <button class="dc-confirm" id="dc-confirm">
          Delete Forever
        </button>
      </div>
    </div>
  </div>
  `);
}

// ══════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════
const $s = id => document.getElementById(id);

function showMsg(id, text, type) {
  const el = $s(id);
  if (!el) return;
  el.textContent = text;
  el.className = `st-msg ${type}`;
}
function clearMsg(id) {
  const el = $s(id);
  if (!el) return;
  el.textContent = "";
  el.className = "st-msg";
}

function showToast(msg) {
  const t = document.getElementById("vnus-toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3200);
}

function setBtn(id, loading, label) {
  const b = $s(id); if (!b) return;
  b.disabled = loading;
  b.innerHTML = loading
    ? `<span class="st-spinner"></span> ${label}`
    : label;
}

// ══════════════════════════════════════════════════════════
//  LOAD CURRENT USER DATA INTO FORM
// ══════════════════════════════════════════════════════════
async function loadUserData() {
  const user = auth.currentUser;
  if (!user) return;

  // Avatar preview
  const avatarEl = $s("st-avatar-preview");
  if (user.photoURL) {
    avatarEl.innerHTML = `<img src="${user.photoURL}" alt="avatar"/>`;
  } else {
    const snap = await getDoc(doc(db, "users", user.uid)).catch(() => null);
    const name = (snap?.data()?.usernameDisplay) || user.displayName || user.email;
    avatarEl.textContent = name[0].toUpperCase();
  }

  // Username
  const snap = await getDoc(doc(db, "users", user.uid)).catch(() => null);
  if (snap?.exists()) {
    $s("st-username").value = snap.data().usernameDisplay || "";
  }
}

// ══════════════════════════════════════════════════════════
//  SAVE USERNAME
// ══════════════════════════════════════════════════════════
async function saveUsername() {
  const user = auth.currentUser;
  if (!user) return;
  const val = $s("st-username").value.trim();
  clearMsg("st-username-msg");

  if (val.length < 3)               { showMsg("st-username-msg","Min 3 characters.","error"); return; }
  if (val.length > 20)              { showMsg("st-username-msg","Max 20 characters.","error"); return; }
  if (!/^[a-zA-Z0-9_]+$/.test(val)){ showMsg("st-username-msg","Only letters, numbers, underscore.","error"); return; }

  setBtn("st-save-username", true, "Saving…");
  try {
    await updateDoc(doc(db, "users", user.uid), {
      username:        val.toLowerCase(),
      usernameDisplay: val,
    });

    // Navbar mein bhi update karo
    const nameEl = document.querySelector("#profile-btn span");
    if (nameEl) nameEl.textContent = val;
    const pdName = document.querySelector(".pd-name");
    if (pdName) pdName.textContent = `@${val}`;

    showMsg("st-username-msg","✅ Username updated!","success");
    showToast("✅ Username updated!");
  } catch(e) {
    showMsg("st-username-msg","Could not update. Try again.","error");
  } finally {
    setBtn("st-save-username", false, "Save");
  }
}

// ══════════════════════════════════════════════════════════
//  UPLOAD PROFILE PHOTO
// ══════════════════════════════════════════════════════════
async function uploadPhoto(file) {
  const user = auth.currentUser;
  if (!user) return;
  clearMsg("st-photo-msg");

  if (file.size > 2 * 1024 * 1024) {
    showMsg("st-photo-msg","File too large. Max 2MB.","error"); return;
  }
  if (!file.type.startsWith("image/")) {
    showMsg("st-photo-msg","Please select an image file.","error"); return;
  }

  const progressWrap = $s("st-progress-wrap");
  const progressBar  = $s("st-progress-bar");
  progressWrap.classList.add("show");
  progressBar.style.width = "20%";

  try {
    // Upload to Firebase Storage
    const storageRef = ref(storage, `avatars/${user.uid}`);
    progressBar.style.width = "50%";
    await uploadBytes(storageRef, file);
    progressBar.style.width = "80%";

    const downloadURL = await getDownloadURL(storageRef);
    progressBar.style.width = "100%";

    // Update Firebase Auth profile
    await updateProfile(user, { photoURL: downloadURL });

    // Update Firestore
    await updateDoc(doc(db, "users", user.uid), { photoURL: downloadURL });

    // Update avatar preview
    $s("st-avatar-preview").innerHTML = `<img src="${downloadURL}" alt="avatar"/>`;

    // Update navbar avatar
    const navAvatar = document.querySelector("#profile-btn .profile-avatar");
    if (navAvatar) navAvatar.innerHTML = `<img src="${downloadURL}" alt="avatar"/>`;

    showMsg("st-photo-msg","✅ Photo updated!","success");
    showToast("✅ Profile photo updated!");
  } catch(e) {
    showMsg("st-photo-msg","Upload failed. Check Firebase Storage rules.","error");
    console.error(e);
  } finally {
    setTimeout(() => {
      progressWrap.classList.remove("show");
      progressBar.style.width = "0%";
    }, 800);
  }
}

// ══════════════════════════════════════════════════════════
//  REMOVE PROFILE PHOTO
// ══════════════════════════════════════════════════════════
async function removePhoto() {
  const user = auth.currentUser;
  if (!user) return;
  clearMsg("st-photo-msg");

  setBtn("st-remove-photo", true, "Removing…");
  try {
    // Delete from Storage
    try {
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await deleteObject(storageRef);
    } catch(_) {}

    // Update Auth profile
    await updateProfile(user, { photoURL: null });

    // Update Firestore
    await updateDoc(doc(db, "users", user.uid), { photoURL: null });

    // Update preview — show initial
    const snap = await getDoc(doc(db, "users", user.uid));
    const name = snap?.data()?.usernameDisplay || user.email;
    $s("st-avatar-preview").innerHTML = name[0].toUpperCase();

    // Update navbar
    const navAvatar = document.querySelector("#profile-btn .profile-avatar");
    if (navAvatar) navAvatar.innerHTML = name[0].toUpperCase();

    showMsg("st-photo-msg","✅ Photo removed.","success");
  } catch(e) {
    showMsg("st-photo-msg","Could not remove photo.","error");
  } finally {
    setBtn("st-remove-photo", false, "Remove Photo");
  }
}

// ══════════════════════════════════════════════════════════
//  DELETE ACCOUNT
// ══════════════════════════════════════════════════════════
function openDeleteConfirm() {
  $s("dc-password").value = "";
  $s("dc-msg").textContent = "";
  $s("delete-confirm-overlay").classList.add("open");
}
function closeDeleteConfirm() {
  $s("delete-confirm-overlay").classList.remove("open");
}

async function confirmDelete() {
  const user     = auth.currentUser;
  if (!user) return;
  const password = $s("dc-password").value;
  $s("dc-msg").textContent = "";

  setBtn("dc-confirm", true, "Deleting…");

  try {
    // Re-authenticate
    const isGoogle = user.providerData.some(p => p.providerId === "google.com");

    if (isGoogle) {
      await reauthenticateWithPopup(user, new GoogleAuthProvider());
    } else {
      if (!password) {
        $s("dc-msg").textContent = "Please enter your password.";
        setBtn("dc-confirm", false, "Delete Forever");
        return;
      }
      const cred = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, cred);
    }

    // Delete Firestore data
    await deleteDoc(doc(db, "users", user.uid)).catch(() => {});

    // Delete Storage avatar
    try {
      await deleteObject(ref(storage, `avatars/${user.uid}`));
    } catch(_) {}

    // Delete Firebase Auth account
    await deleteUser(user);

    // Close everything
    closeDeleteConfirm();
    closeSettings();
    showToast("Account deleted. Goodbye! 👋");

    // Reload after 2s
    setTimeout(() => window.location.reload(), 2000);

  } catch(e) {
    const msgs = {
      "auth/wrong-password":       "Wrong password. Try again.",
      "auth/too-many-requests":    "Too many attempts. Try later.",
      "auth/requires-recent-login":"Please log out and log back in first.",
    };
    $s("dc-msg").textContent = msgs[e.code] || "Error. Try again.";
    setBtn("dc-confirm", false, "Delete Forever");
  }
}

// ══════════════════════════════════════════════════════════
//  OPEN / CLOSE SETTINGS
// ══════════════════════════════════════════════════════════
export function openSettings() {
  $s("settings-overlay").classList.add("open");
  loadUserData();
}

// window pe expose karo taaki auth.js use kar sake
window.openSettings = openSettings;

function closeSettings() {
  $s("settings-overlay").classList.remove("open");
  clearMsg("st-photo-msg");
  clearMsg("st-username-msg");
}

// ══════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════
function init() {
  injectStyles();
  injectHTML();

  // Close
  $s("st-close").addEventListener("click", closeSettings);
  $s("settings-overlay").addEventListener("click", e => {
    if (e.target === $s("settings-overlay")) closeSettings();
  });

  // Photo upload
  $s("st-upload-trigger").addEventListener("click", () => $s("st-file-input").click());
  $s("st-file-input").addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) uploadPhoto(file);
    e.target.value = "";
  });

  // Remove photo
  $s("st-remove-photo").addEventListener("click", removePhoto);

  // Save username
  $s("st-save-username").addEventListener("click", saveUsername);
  $s("st-username").addEventListener("keydown", e => {
    if (e.key === "Enter") saveUsername();
  });

  // Delete account
  $s("st-delete-account").addEventListener("click", openDeleteConfirm);
  $s("dc-cancel").addEventListener("click", closeDeleteConfirm);
  $s("dc-confirm").addEventListener("click", confirmDelete);
  $s("dc-password").addEventListener("keydown", e => {
    if (e.key === "Enter") confirmDelete();
  });

  // Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeDeleteConfirm();
      closeSettings();
    }
  });
}

// DOM ready hone pe init
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}