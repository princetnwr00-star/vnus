// ═══════════════════════════════════════════════════════════
//  settings.js  —  Vnus AI Account Settings
// ═══════════════════════════════════════════════════════════

import { getApps }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, updateProfile, deleteUser,
         reauthenticateWithCredential, EmailAuthProvider,
         GoogleAuthProvider, reauthenticateWithPopup }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// ── Firebase instances ─────────────────────────────────────
function fb() {
  const app = getApps()[0];
  if (!app) return null;
  return {
    auth: getAuth(app),
    db:   getFirestore(app),
  };
}

// ══════════════════════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════════════════════
function injectStyles() {
  if (document.getElementById("st-styles")) return;
  const s = document.createElement("style");
  s.id = "st-styles";
  s.textContent = `
    #st-overlay {
      display:none; position:fixed; inset:0; z-index:9999;
      background:rgba(10,60,120,0.40);
      backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
      align-items:center; justify-content:center; padding:16px;
    }
    #st-overlay.open { display:flex; animation:stFadeIn .22s ease; }
    @keyframes stFadeIn { from{opacity:0} to{opacity:1} }

    #st-modal {
      background:rgba(255,255,255,0.96);
      backdrop-filter:blur(28px); -webkit-backdrop-filter:blur(28px);
      border:1.5px solid rgba(255,255,255,0.80);
      border-radius:26px; width:100%; max-width:460px;
      box-shadow:0 24px 64px rgba(0,80,180,0.18);
      animation:stSlideIn .28s cubic-bezier(.22,.68,0,1.2);
      font-family:'Inter',sans-serif; overflow:hidden;
    }
    @keyframes stSlideIn {
      from{opacity:0;transform:scale(.92) translateY(16px)}
      to  {opacity:1;transform:scale(1)   translateY(0)}
    }

    .st-head {
      display:flex; align-items:center; justify-content:space-between;
      padding:20px 24px 18px;
      border-bottom:1px solid rgba(0,0,0,0.07);
    }
    .st-head-title { font-size:18px; font-weight:800; color:#111; }
    .st-x {
      width:32px; height:32px; border-radius:50%;
      background:rgba(0,0,0,0.07); border:none;
      font-size:17px; cursor:pointer; color:#555;
      display:flex; align-items:center; justify-content:center;
      transition:background .15s;
    }
    .st-x:hover { background:rgba(0,0,0,0.13); }

    .st-body { padding:22px 24px; max-height:72vh; overflow-y:auto; }

    .st-sec-label {
      font-size:11px; font-weight:700; letter-spacing:1.5px;
      text-transform:uppercase; color:#bbb; margin-bottom:14px;
    }

    /* Avatar */


    /* Field */
    .st-field { margin-bottom:14px; }
    .st-field label { display:block; font-size:13px; font-weight:600; color:#555; margin-bottom:6px; }
    .st-row { display:flex; gap:8px; align-items:center; }
    .st-input {
      flex:1; padding:12px 16px; box-sizing:border-box;
      background:rgba(255,255,255,0.95);
      border:1.5px solid rgba(0,0,0,0.10); border-radius:14px;
      font-size:15px; font-family:'Inter',sans-serif; color:#111; outline:none;
      transition:border-color .15s, box-shadow .15s;
    }
    .st-input:focus { border-color:#38b6f5; box-shadow:0 0 0 3px rgba(56,182,245,0.15); }

    .st-save {
      padding:11px 20px; background:#111; color:white; border:none;
      border-radius:14px; font-size:14px; font-weight:600;
      cursor:pointer; font-family:'Inter',sans-serif;
      display:flex; align-items:center; gap:6px;
      transition:opacity .15s; white-space:nowrap;
    }
    .st-save:hover{opacity:.85}
    .st-save:disabled{opacity:.45;cursor:not-allowed}

    /* Messages */
    .st-msg { font-size:13px; border-radius:10px; padding:9px 14px; margin-top:8px; display:none; }
    .st-msg.ok  { background:rgba(34,197,94,.12); color:#15803d; display:block; }
    .st-msg.err { background:rgba(239,68,68,.10); color:#b91c1c; display:block; }

    /* Divider */
    .st-hr { height:1px; background:rgba(0,0,0,0.07); margin:20px 0; }

    /* Danger */
    .st-danger {
      border:1.5px solid rgba(239,68,68,0.22); border-radius:16px;
      padding:16px; background:rgba(239,68,68,0.04);
    }
    .st-danger-title { font-size:14px; font-weight:700; color:#dc2626; margin-bottom:4px; }
    .st-danger-desc  { font-size:13px; color:#888; margin-bottom:14px; line-height:1.5; }
    .st-del-btn {
      width:100%; padding:12px; background:#dc2626; color:white;
      border:none; border-radius:50px; font-size:14px; font-weight:700;
      cursor:pointer; font-family:'Inter',sans-serif;
      display:flex; align-items:center; justify-content:center; gap:7px;
      transition:background .15s;
    }
    .st-del-btn:hover{background:#b91c1c}
    .st-del-btn:disabled{opacity:.5;cursor:not-allowed}

    /* Confirm overlay */
    #dc-overlay {
      display:none; position:fixed; inset:0; z-index:10000;
      background:rgba(10,60,120,0.50);
      backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
      align-items:center; justify-content:center; padding:16px;
    }
    #dc-overlay.open { display:flex; }
    #dc-modal {
      background:white; border-radius:22px; padding:28px 24px;
      max-width:380px; width:100%;
      box-shadow:0 20px 60px rgba(0,0,0,0.22);
      font-family:'Inter',sans-serif;
      animation:stSlideIn .22s cubic-bezier(.22,.68,0,1.2);
    }
    .dc-icon { width:48px; height:48px; background:rgba(239,68,68,0.10); border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      margin:0 auto 14px; font-size:22px; }
    .dc-title { font-size:18px; font-weight:800; color:#111; text-align:center; margin-bottom:6px; }
    .dc-desc  { font-size:13px; color:#777; text-align:center; line-height:1.5; margin-bottom:18px; }
    .dc-label { font-size:13px; font-weight:600; color:#555; margin-bottom:6px; display:block; }
    .dc-input {
      width:100%; padding:11px 14px; box-sizing:border-box;
      border:1.5px solid rgba(0,0,0,0.12); border-radius:12px;
      font-size:14px; font-family:'Inter',sans-serif; color:#111;
      outline:none; margin-bottom:6px;
    }
    .dc-input:focus{border-color:#dc2626;box-shadow:0 0 0 3px rgba(220,38,38,0.12)}
    .dc-err { font-size:12px; color:#dc2626; min-height:18px; margin-bottom:12px; }
    .dc-btns { display:flex; gap:10px; }
    .dc-cancel {
      flex:1; padding:12px; background:rgba(0,0,0,0.06); border:none;
      border-radius:50px; font-size:14px; font-weight:600; color:#555;
      cursor:pointer; font-family:'Inter',sans-serif;
    }
    .dc-confirm {
      flex:1; padding:12px; background:#dc2626; border:none;
      border-radius:50px; font-size:14px; font-weight:700; color:white;
      cursor:pointer; font-family:'Inter',sans-serif;
      display:flex; align-items:center; justify-content:center; gap:6px;
      transition:background .15s;
    }
    .dc-confirm:hover{background:#b91c1c}
    .dc-confirm:disabled{opacity:.5;cursor:not-allowed}

    /* Spinner */
    .st-spin {
      width:13px; height:13px; border:2px solid rgba(255,255,255,0.35);
      border-top-color:white; border-radius:50%;
      animation:stSpinAnim .7s linear infinite; flex-shrink:0;
    }
    @keyframes stSpinAnim{to{transform:rotate(360deg)}}
  `;
  document.head.appendChild(s);
}

// ══════════════════════════════════════════════════════════
//  HTML
// ══════════════════════════════════════════════════════════
function injectHTML() {
  if (document.getElementById("st-overlay")) return;
  document.body.insertAdjacentHTML("beforeend", `

  <div id="st-overlay">
    <div id="st-modal">
      <div class="st-head">
        <div class="st-head-title">⚙️ Account Settings</div>
        <button class="st-x" id="st-x">✕</button>
      </div>
      <div class="st-body">

        <!-- Username -->
        <div class="st-sec-label">Username</div>
        <div class="st-field">
          <label for="st-uname">Username</label>
          <div class="st-row">
            <input class="st-input" id="st-uname" type="text" placeholder="Enter username" maxlength="20"/>
            <button class="st-save" id="st-uname-save">Save</button>
          </div>
          <div class="st-msg" id="st-uname-msg"></div>
        </div>

        <div class="st-hr"></div>

        <!-- Danger Zone -->
        <div class="st-sec-label">Danger Zone</div>
        <div class="st-danger">
          <div class="st-danger-title">🗑️ Delete Account</div>
          <div class="st-danger-desc">
            Yeh permanent hai. Tumhara saara data hamesha ke liye
            delete ho jaayega. Isko undo nahi kiya ja sakta.
          </div>
          <button class="st-del-btn" id="st-del-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
            Delete My Account
          </button>
        </div>

      </div>
    </div>
  </div>

  <!-- Delete Confirm -->
  <div id="dc-overlay">
    <div id="dc-modal">
      <div class="dc-icon">⚠️</div>
      <div class="dc-title">Pakka Delete Karna Hai?</div>
      <div class="dc-desc">
        Confirm karne ke liye <strong>password</strong> daalo.<br/>
        Google login hai toh khaali chhodo.
      </div>
      <label class="dc-label" for="dc-pw">Password (email login ke liye)</label>
      <input class="dc-input" id="dc-pw" type="password" placeholder="••••••••"/>
      <div class="dc-err" id="dc-err"></div>
      <div class="dc-btns">
        <button class="dc-cancel" id="dc-cancel">Cancel</button>
        <button class="dc-confirm" id="dc-ok">Delete Forever</button>
      </div>
    </div>
  </div>
  `);
}

// ══════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════
const G = id => document.getElementById(id);

function msg(id, text, type) {
  const el = G(id);
  el.textContent = text;
  el.className = `st-msg ${type}`;
}
function clearMsg(id) { const el=G(id); el.textContent=""; el.className="st-msg"; }

function toast(t) {
  const el = document.getElementById("vnus-toast");
  if (!el) return;
  el.textContent = t;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 3200);
}

function spin(id, loading, label) {
  const b = G(id); if(!b) return;
  b.disabled = loading;
  b.innerHTML = loading ? `<span class="st-spin"></span> ${label}` : label;
}

// ══════════════════════════════════════════════════════════
//  LOAD USER DATA
// ══════════════════════════════════════════════════════════
async function loadUser() {
  const f = fb(); if(!f) return;
  const user = f.auth.currentUser; if(!user) return;

  // Avatar
  const av = G("st-av");
  if (user.photoURL) {
    av.innerHTML = `<img src="${user.photoURL}" alt="av"/>`;
  } else {
    const snap = await getDoc(doc(f.db, "users", user.uid)).catch(()=>null);
    const name = snap?.data()?.usernameDisplay || user.displayName || user.email || "U";
    av.textContent = name[0].toUpperCase();
  }

  // Username
  const snap = await getDoc(doc(f.db, "users", user.uid)).catch(()=>null);
  if (snap?.exists()) {
    G("st-uname").value = snap.data().usernameDisplay || "";
  }
}

// ══════════════════════════════════════════════════════════
//  SAVE USERNAME
// ══════════════════════════════════════════════════════════
async function saveUsername() {
  const f = fb(); if(!f) return;
  const user = f.auth.currentUser; if(!user) return;
  const val = G("st-uname").value.trim();
  clearMsg("st-uname-msg");

  if (val.length < 3)                    { msg("st-uname-msg","Min 3 characters.","err"); return; }
  if (val.length > 20)                   { msg("st-uname-msg","Max 20 characters.","err"); return; }
  if (!/^[a-zA-Z0-9_]+$/.test(val))     { msg("st-uname-msg","Only letters, numbers, underscore.","err"); return; }

  spin("st-uname-save", true, "Saving…");
  try {
    await updateDoc(doc(f.db,"users",user.uid),{
      username:        val.toLowerCase(),
      usernameDisplay: val,
    });

    // Navbar update
    const nameSpan = document.querySelector("#profile-btn span");
    if (nameSpan) nameSpan.textContent = val;
    const pdName = document.querySelector(".pd-name");
    if (pdName) pdName.textContent = `@${val}`;

    msg("st-uname-msg","✅ Username updated!","ok");
    toast("✅ Username updated!");
  } catch(e) {
    msg("st-uname-msg","Could not update. Try again.","err");
  } finally {
    spin("st-uname-save", false, "Save");
  }
}

// ══════════════════════════════════════════════════════════
//  DELETE ACCOUNT
// ══════════════════════════════════════════════════════════
function openDC() {
  G("dc-pw").value = "";
  G("dc-err").textContent = "";
  G("dc-overlay").classList.add("open");
}
function closeDC() { G("dc-overlay").classList.remove("open"); }

async function doDelete() {
  const f = fb(); if(!f) return;
  const user = f.auth.currentUser; if(!user) return;
  const pw = G("dc-pw").value;
  G("dc-err").textContent = "";

  spin("dc-ok", true, "Deleting…");
  try {
    const isGoogle = user.providerData.some(p=>p.providerId==="google.com");
    if (isGoogle) {
      await reauthenticateWithPopup(user, new GoogleAuthProvider());
    } else {
      if (!pw) { G("dc-err").textContent="Password daalo."; spin("dc-ok",false,"Delete Forever"); return; }
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email,pw));
    }

    // Delete data
    await deleteDoc(doc(f.db,"users",user.uid)).catch(()=>{});
    try { await deleteObject(ref(f.storage,`avatars/${user.uid}`)); } catch(_){}
    await deleteUser(user);

    closeDC();
    closeSettings();
    toast("Account deleted. Goodbye! 👋");
    setTimeout(()=>window.location.reload(), 2000);
  } catch(e) {
    const errs = {
      "auth/wrong-password":      "Wrong password.",
      "auth/too-many-requests":   "Too many attempts. Try later.",
      "auth/requires-recent-login":"Log out aur wapis login karo.",
      "auth/popup-closed-by-user":"Google popup cancel kiya.",
    };
    G("dc-err").textContent = errs[e.code] || "Error aaya. Try again.";
    spin("dc-ok", false, "Delete Forever");
  }
}

// ══════════════════════════════════════════════════════════
//  OPEN / CLOSE
// ══════════════════════════════════════════════════════════
function openSettings() {
  G("st-overlay").classList.add("open");
  clearMsg("st-uname-msg");
  loadUser();
}

function closeSettings() {
  G("st-overlay").classList.remove("open");
}

// ══════════════════════════════════════════════════════════
//  INIT — wire events once
// ══════════════════════════════════════════════════════════
function init() {
  injectStyles();
  injectHTML();

  G("st-x").addEventListener("click", closeSettings);
  G("st-overlay").addEventListener("click", e => {
    if (e.target === G("st-overlay")) closeSettings();
  });

  G("st-uname-save").addEventListener("click", saveUsername);
  G("st-uname").addEventListener("keydown", e => { if(e.key==="Enter") saveUsername(); });

  G("st-del-btn").addEventListener("click", openDC);
  G("dc-cancel").addEventListener("click", closeDC);
  G("dc-overlay").addEventListener("click", e => { if(e.target===G("dc-overlay")) closeDC(); });
  G("dc-ok").addEventListener("click", doDelete);
  G("dc-pw").addEventListener("keydown", e => { if(e.key==="Enter") doDelete(); });

  document.addEventListener("keydown", e => {
    if (e.key==="Escape") { closeDC(); closeSettings(); }
  });

  // Window pe expose — auth.js use karega
  window.openSettings = openSettings;
}

// DOM ready check
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}