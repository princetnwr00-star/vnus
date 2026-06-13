// ═══════════════════════════════════════════════════════════
//  settings.js  —  Vnus AI Account Settings
// ═══════════════════════════════════════════════════════════

import { getApps }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { deleteUser, reauthenticateWithCredential,
         EmailAuthProvider, GoogleAuthProvider, reauthenticateWithPopup }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ══════════════════════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════════════════════
const STYLES = `
  #st-overlay {
    display: none; position: fixed; inset: 0; z-index: 9999;
    background: rgba(10,60,120,0.40);
    backdrop-filter: blur(14px);
    align-items: center; justify-content: center; padding: 16px;
  }
  #st-overlay.open { display: flex; animation: stFade .2s ease; }
  @keyframes stFade { from{opacity:0} to{opacity:1} }

  #st-box {
    background: rgba(255,255,255,0.97);
    border-radius: 24px; width: 100%; max-width: 440px;
    box-shadow: 0 20px 60px rgba(0,80,180,0.18);
    font-family: 'Inter', sans-serif; overflow: hidden;
    animation: stPop .25s cubic-bezier(.22,.68,0,1.2);
  }
  @keyframes stPop {
    from { opacity:0; transform: scale(.93) translateY(14px); }
    to   { opacity:1; transform: scale(1)   translateY(0); }
  }

  .st-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 22px 18px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
  }
  .st-top h2 { font-size: 17px; font-weight: 800; color: #111; margin: 0; }
  .st-close-btn {
    width: 30px; height: 30px; border-radius: 50%;
    background: rgba(0,0,0,0.07); border: none;
    font-size: 16px; cursor: pointer; color: #555;
    display: flex; align-items: center; justify-content: center;
  }
  .st-close-btn:hover { background: rgba(0,0,0,0.12); }

  .st-body { padding: 20px 22px; max-height: 70vh; overflow-y: auto; }

  .st-label {
    font-size: 11px; font-weight: 700; letter-spacing: 1.4px;
    text-transform: uppercase; color: #bbb; margin-bottom: 12px; display: block;
  }

  .st-row { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }

  .st-inp {
    flex: 1; padding: 11px 14px; box-sizing: border-box;
    border: 1.5px solid rgba(0,0,0,0.10); border-radius: 12px;
    font-size: 15px; font-family: 'Inter', sans-serif; color: #111; outline: none;
    background: white;
  }
  .st-inp:focus { border-color: #38b6f5; box-shadow: 0 0 0 3px rgba(56,182,245,0.15); }

  .st-save-btn {
    padding: 11px 18px; background: #111; color: white;
    border: none; border-radius: 12px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: 'Inter', sans-serif; white-space: nowrap;
    display: flex; align-items: center; gap: 5px;
  }
  .st-save-btn:hover { opacity: .85; }
  .st-save-btn:disabled { opacity: .45; cursor: not-allowed; }

  .st-feedback {
    font-size: 13px; border-radius: 10px; padding: 8px 12px;
    margin-top: 6px; display: none;
  }
  .st-feedback.ok  { background: rgba(34,197,94,.12); color: #15803d; display: block; }
  .st-feedback.err { background: rgba(239,68,68,.10); color: #b91c1c; display: block; }

  .st-divider { height: 1px; background: rgba(0,0,0,0.07); margin: 20px 0; }

  .st-danger-box {
    border: 1.5px solid rgba(239,68,68,0.20); border-radius: 14px;
    padding: 16px; background: rgba(239,68,68,0.03);
  }
  .st-danger-box h3 { font-size: 14px; font-weight: 700; color: #dc2626; margin: 0 0 6px; }
  .st-danger-box p  { font-size: 13px; color: #888; margin: 0 0 14px; line-height: 1.5; }

  .st-del-btn {
    width: 100%; padding: 12px; background: #dc2626; color: white;
    border: none; border-radius: 50px; font-size: 14px; font-weight: 700;
    cursor: pointer; font-family: 'Inter', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .st-del-btn:hover { background: #b91c1c; }
  .st-del-btn:disabled { opacity: .5; cursor: not-allowed; }

  /* Confirm popup */
  #dc-overlay {
    display: none; position: fixed; inset: 0; z-index: 10000;
    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(8px);
    align-items: center; justify-content: center; padding: 16px;
  }
  #dc-overlay.open { display: flex; }
  #dc-box {
    background: white; border-radius: 20px; padding: 26px 22px;
    max-width: 360px; width: 100%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.22);
    font-family: 'Inter', sans-serif;
    animation: stPop .22s cubic-bezier(.22,.68,0,1.2);
  }
  .dc-icon { font-size: 28px; text-align: center; margin-bottom: 10px; }
  .dc-title { font-size: 17px; font-weight: 800; color: #111; text-align: center; margin-bottom: 6px; }
  .dc-desc  { font-size: 13px; color: #777; text-align: center; line-height: 1.5; margin-bottom: 16px; }
  .dc-inp {
    width: 100%; padding: 11px 14px; box-sizing: border-box;
    border: 1.5px solid rgba(0,0,0,0.12); border-radius: 12px;
    font-size: 14px; font-family: 'Inter', sans-serif; outline: none; margin-bottom: 6px;
  }
  .dc-inp:focus { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220,38,38,0.12); }
  .dc-err { font-size: 12px; color: #dc2626; min-height: 16px; margin-bottom: 10px; }
  .dc-btns { display: flex; gap: 8px; }
  .dc-cancel-btn {
    flex: 1; padding: 11px; background: rgba(0,0,0,0.06); border: none;
    border-radius: 50px; font-size: 14px; font-weight: 600; color: #555;
    cursor: pointer; font-family: 'Inter', sans-serif;
  }
  .dc-ok-btn {
    flex: 1; padding: 11px; background: #dc2626; border: none;
    border-radius: 50px; font-size: 14px; font-weight: 700; color: white;
    cursor: pointer; font-family: 'Inter', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 5px;
  }
  .dc-ok-btn:hover { background: #b91c1c; }
  .dc-ok-btn:disabled { opacity: .5; cursor: not-allowed; }

  .st-spin {
    width: 13px; height: 13px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white; border-radius: 50%;
    animation: stSpinR .7s linear infinite; flex-shrink: 0;
  }
  @keyframes stSpinR { to { transform: rotate(360deg); } }
`;

// ══════════════════════════════════════════════════════════
//  HTML
// ══════════════════════════════════════════════════════════
const HTML = `
<div id="st-overlay">
  <div id="st-box">
    <div class="st-top">
      <h2>⚙️ Account Settings</h2>
      <button class="st-close-btn" id="st-close-btn">✕</button>
    </div>
    <div class="st-body">

      <span class="st-label">Username</span>
      <div class="st-row">
        <input class="st-inp" id="st-uname-inp" type="text"
          placeholder="Enter new username" maxlength="20"/>
        <button class="st-save-btn" id="st-uname-btn">Save</button>
      </div>
      <div class="st-feedback" id="st-uname-fb"></div>

      <div class="st-divider"></div>

      <span class="st-label">Danger Zone</span>
      <div class="st-danger-box">
        <h3>🗑️ Delete Account</h3>
        <p>Yeh permanent hai. Tumhara account aur saara data hamesha ke liye delete ho jaayega.</p>
        <button class="st-del-btn" id="st-del-btn">Delete My Account</button>
      </div>

    </div>
  </div>
</div>

<div id="dc-overlay">
  <div id="dc-box">
    <div class="dc-icon">⚠️</div>
    <div class="dc-title">Account Delete Karen?</div>
    <div class="dc-desc">Email login hai toh password daalo.<br/>Google login hai toh khaali chhodo.</div>
    <input class="dc-inp" id="dc-pw-inp" type="password" placeholder="Password (email login ke liye)"/>
    <div class="dc-err" id="dc-err"></div>
    <div class="dc-btns">
      <button class="dc-cancel-btn" id="dc-cancel-btn">Cancel</button>
      <button class="dc-ok-btn" id="dc-ok-btn">Delete Forever</button>
    </div>
  </div>
</div>
`;

// ══════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════
const el = id => document.getElementById(id);

function feedback(id, text, type) {
  const e = el(id);
  e.textContent = text;
  e.className = `st-feedback ${type}`;
}

function loading(id, on, label) {
  const b = el(id); if (!b) return;
  b.disabled = on;
  b.innerHTML = on ? `<span class="st-spin"></span>${label}` : label;
}

function toast(msg) {
  const t = el("vnus-toast"); if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

function getFirebase() {
  const apps = getApps();
  if (!apps.length) return null;
  return {
    auth: getAuth(apps[0]),
    db:   getFirestore(apps[0]),
  };
}

// ══════════════════════════════════════════════════════════
//  LOAD USER
// ══════════════════════════════════════════════════════════
async function loadUser() {
  const { auth, db } = getFirebase() || {};
  if (!auth) return;
  const user = auth.currentUser;
  if (!user) return;

  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      el("st-uname-inp").value = snap.data().usernameDisplay || "";
    }
  } catch(e) { console.error(e); }
}

// ══════════════════════════════════════════════════════════
//  SAVE USERNAME
// ══════════════════════════════════════════════════════════
async function saveUsername() {
  const { auth, db } = getFirebase() || {};
  if (!auth) return;
  const user = auth.currentUser; if (!user) return;

  const val = el("st-uname-inp").value.trim();
  el("st-uname-fb").className = "st-feedback";

  if (val.length < 3)                { feedback("st-uname-fb","Min 3 characters.","err"); return; }
  if (val.length > 20)               { feedback("st-uname-fb","Max 20 characters.","err"); return; }
  if (!/^[a-zA-Z0-9_]+$/.test(val)) { feedback("st-uname-fb","Only letters, numbers, underscore.","err"); return; }

  loading("st-uname-btn", true, "Saving…");
  try {
    await updateDoc(doc(db, "users", user.uid), {
      username:        val.toLowerCase(),
      usernameDisplay: val,
    });

    // Navbar update
    const nameEl = document.querySelector("#profile-btn span");
    if (nameEl) nameEl.textContent = val;
    const pdName = document.querySelector(".pd-name");
    if (pdName) pdName.textContent = `@${val}`;

    feedback("st-uname-fb", "✅ Username updated!", "ok");
    toast("✅ Username updated!");
  } catch(e) {
    feedback("st-uname-fb", "Error. Try again.", "err");
  } finally {
    loading("st-uname-btn", false, "Save");
  }
}

// ══════════════════════════════════════════════════════════
//  DELETE ACCOUNT
// ══════════════════════════════════════════════════════════
async function doDelete() {
  const { auth, db } = getFirebase() || {};
  if (!auth) return;
  const user = auth.currentUser; if (!user) return;
  const pw = el("dc-pw-inp").value;
  el("dc-err").textContent = "";

  loading("dc-ok-btn", true, "Deleting…");
  try {
    const isGoogle = user.providerData.some(p => p.providerId === "google.com");

    if (isGoogle) {
      await reauthenticateWithPopup(user, new GoogleAuthProvider());
    } else {
      if (!pw) {
        el("dc-err").textContent = "Password daalo.";
        loading("dc-ok-btn", false, "Delete Forever");
        return;
      }
      const cred = EmailAuthProvider.credential(user.email, pw);
      await reauthenticateWithCredential(user, cred);
    }

    await deleteDoc(doc(db, "users", user.uid)).catch(() => {});
    await deleteUser(user);

    el("dc-overlay").classList.remove("open");
    el("st-overlay").classList.remove("open");
    toast("Account deleted. Goodbye! 👋");
    setTimeout(() => window.location.reload(), 2000);

  } catch(e) {
    const errs = {
      "auth/wrong-password":       "Wrong password.",
      "auth/too-many-requests":    "Too many attempts. Try later.",
      "auth/requires-recent-login":"Log out aur wapis login karo.",
      "auth/popup-closed-by-user": "Google popup cancel kiya.",
    };
    el("dc-err").textContent = errs[e.code] || "Error aaya. Try again.";
    loading("dc-ok-btn", false, "Delete Forever");
  }
}

// ══════════════════════════════════════════════════════════
//  OPEN / CLOSE
// ══════════════════════════════════════════════════════════
function openSettings() {
  el("st-overlay").classList.add("open");
  el("st-uname-fb").className = "st-feedback";
  loadUser();
}

function closeSettings() {
  el("st-overlay").classList.remove("open");
}

// ══════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════
function init() {
  // Inject styles
  if (!document.getElementById("st-css")) {
    const s = document.createElement("style");
    s.id = "st-css";
    s.textContent = STYLES;
    document.head.appendChild(s);
  }

  // Inject HTML
  if (!document.getElementById("st-overlay")) {
    document.body.insertAdjacentHTML("beforeend", HTML);
  }

  // Events
  el("st-close-btn").addEventListener("click", closeSettings);

  el("st-overlay").addEventListener("click", e => {
    if (e.target === el("st-overlay")) closeSettings();
  });

  el("st-uname-btn").addEventListener("click", saveUsername);
  el("st-uname-inp").addEventListener("keydown", e => {
    if (e.key === "Enter") saveUsername();
  });

  el("st-del-btn").addEventListener("click", () => {
    el("dc-pw-inp").value = "";
    el("dc-err").textContent = "";
    el("dc-overlay").classList.add("open");
  });

  el("dc-cancel-btn").addEventListener("click", () => {
    el("dc-overlay").classList.remove("open");
  });

  el("dc-overlay").addEventListener("click", e => {
    if (e.target === el("dc-overlay")) el("dc-overlay").classList.remove("open");
  });

  el("dc-ok-btn").addEventListener("click", doDelete);
  el("dc-pw-inp").addEventListener("keydown", e => {
    if (e.key === "Enter") doDelete();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      el("dc-overlay").classList.remove("open");
      closeSettings();
    }
  });

  // Expose globally
  window.openSettings = openSettings;
}

// Start
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}