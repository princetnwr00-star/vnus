// ═══════════════════════════════════════════════════════════
//  auth.js  —  Vnus AI  |  Firebase Auth + Onboarding + Profile Menu
//  🔴 Apna Firebase config neeche daalo
// ═══════════════════════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, setPersistence, browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore, doc, setDoc, getDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ──────────────────────────────────────────────────────────
//  🔴 APNA CONFIG YAHAN PASTE KARO
// ──────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyCOPpUgrSI20gr1zhr_knts2if6gEFr3XE",
  authDomain:        "vnusai.firebaseapp.com",
  projectId:         "vnusai",
  storageBucket:     "vnusai.firebasestorage.app",
  messagingSenderId: "380179126596",
  appId:             "1:380179126596:web:4904df078f13317c5f11",
};

const app       = initializeApp(firebaseConfig);
const auth      = getAuth(app);
const db        = getFirestore(app);
const gProvider = new GoogleAuthProvider();

// Local persistence — browser band ho tab bhi session rahe
setPersistence(auth, browserLocalPersistence).catch(console.error);

// ══════════════════════════════════════════════════════════
//  COUNTRY DATA
// ══════════════════════════════════════════════════════════
const COUNTRIES = [
  { name:"Afghanistan",         code:"AF", dial:"+93"  },
  { name:"Albania",             code:"AL", dial:"+355" },
  { name:"Algeria",             code:"DZ", dial:"+213" },
  { name:"Argentina",           code:"AR", dial:"+54"  },
  { name:"Australia",           code:"AU", dial:"+61"  },
  { name:"Austria",             code:"AT", dial:"+43"  },
  { name:"Bangladesh",          code:"BD", dial:"+880" },
  { name:"Belgium",             code:"BE", dial:"+32"  },
  { name:"Brazil",              code:"BR", dial:"+55"  },
  { name:"Canada",              code:"CA", dial:"+1"   },
  { name:"Chile",               code:"CL", dial:"+56"  },
  { name:"China",               code:"CN", dial:"+86"  },
  { name:"Colombia",            code:"CO", dial:"+57"  },
  { name:"Czech Republic",      code:"CZ", dial:"+420" },
  { name:"Denmark",             code:"DK", dial:"+45"  },
  { name:"Egypt",               code:"EG", dial:"+20"  },
  { name:"Ethiopia",            code:"ET", dial:"+251" },
  { name:"Finland",             code:"FI", dial:"+358" },
  { name:"France",              code:"FR", dial:"+33"  },
  { name:"Germany",             code:"DE", dial:"+49"  },
  { name:"Ghana",               code:"GH", dial:"+233" },
  { name:"Greece",              code:"GR", dial:"+30"  },
  { name:"Hungary",             code:"HU", dial:"+36"  },
  { name:"India",               code:"IN", dial:"+91"  },
  { name:"Indonesia",           code:"ID", dial:"+62"  },
  { name:"Iran",                code:"IR", dial:"+98"  },
  { name:"Iraq",                code:"IQ", dial:"+964" },
  { name:"Ireland",             code:"IE", dial:"+353" },
  { name:"Israel",              code:"IL", dial:"+972" },
  { name:"Italy",               code:"IT", dial:"+39"  },
  { name:"Japan",               code:"JP", dial:"+81"  },
  { name:"Jordan",              code:"JO", dial:"+962" },
  { name:"Kenya",               code:"KE", dial:"+254" },
  { name:"Malaysia",            code:"MY", dial:"+60"  },
  { name:"Mexico",              code:"MX", dial:"+52"  },
  { name:"Morocco",             code:"MA", dial:"+212" },
  { name:"Myanmar",             code:"MM", dial:"+95"  },
  { name:"Nepal",               code:"NP", dial:"+977" },
  { name:"Netherlands",         code:"NL", dial:"+31"  },
  { name:"New Zealand",         code:"NZ", dial:"+64"  },
  { name:"Nigeria",             code:"NG", dial:"+234" },
  { name:"Norway",              code:"NO", dial:"+47"  },
  { name:"Pakistan",            code:"PK", dial:"+92"  },
  { name:"Peru",                code:"PE", dial:"+51"  },
  { name:"Philippines",         code:"PH", dial:"+63"  },
  { name:"Poland",              code:"PL", dial:"+48"  },
  { name:"Portugal",            code:"PT", dial:"+351" },
  { name:"Romania",             code:"RO", dial:"+40"  },
  { name:"Russia",              code:"RU", dial:"+7"   },
  { name:"Saudi Arabia",        code:"SA", dial:"+966" },
  { name:"Singapore",           code:"SG", dial:"+65"  },
  { name:"South Africa",        code:"ZA", dial:"+27"  },
  { name:"South Korea",         code:"KR", dial:"+82"  },
  { name:"Spain",               code:"ES", dial:"+34"  },
  { name:"Sri Lanka",           code:"LK", dial:"+94"  },
  { name:"Sweden",              code:"SE", dial:"+46"  },
  { name:"Switzerland",         code:"CH", dial:"+41"  },
  { name:"Taiwan",              code:"TW", dial:"+886" },
  { name:"Tanzania",            code:"TZ", dial:"+255" },
  { name:"Thailand",            code:"TH", dial:"+66"  },
  { name:"Turkey",              code:"TR", dial:"+90"  },
  { name:"Uganda",              code:"UG", dial:"+256" },
  { name:"Ukraine",             code:"UA", dial:"+380" },
  { name:"United Arab Emirates",code:"AE", dial:"+971" },
  { name:"United Kingdom",      code:"GB", dial:"+44"  },
  { name:"United States",       code:"US", dial:"+1"   },
  { name:"Venezuela",           code:"VE", dial:"+58"  },
  { name:"Vietnam",             code:"VN", dial:"+84"  },
];

const PROFESSIONS = [
  "Student","Freelancer","Software Developer","Designer","Product Manager",
  "Entrepreneur / Founder","Marketing Professional","Sales Professional",
  "Data Analyst / Scientist","Content Creator","Educator / Teacher",
  "Healthcare Professional","Finance / Accounting","Legal Professional",
  "HR / Recruiter","Consultant","Operations Manager","Researcher",
  "Journalist / Writer","Artist / Musician","Other",
];

// ══════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════
const $ = id => document.getElementById(id);

function showMsg(id, text, type = "error") {
  const el = $(id); if (!el) return;
  el.textContent = text;
  el.className = `vnus-msg ${type}`;
}
function clearMsg(id) {
  const el = $(id); if (!el) return;
  el.textContent = ""; el.className = "vnus-msg";
}

function showToast(msg) {
  const t = $("vnus-toast"); if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3400);
}

function setLoading(btnId, loading, html) {
  const b = $(btnId); if (!b) return;
  b.disabled = loading;
  b.innerHTML = loading ? `<span class="vnus-spinner"></span> ${html}` : html;
}

function friendlyError(code) {
  return ({
    "auth/invalid-email":          "Invalid email address.",
    "auth/user-not-found":         "No account found with this email.",
    "auth/wrong-password":         "Incorrect password.",
    "auth/email-already-in-use":   "Email already registered — log in instead.",
    "auth/weak-password":          "Password must be at least 6 characters.",
    "auth/popup-closed-by-user":   "Google sign-in cancelled.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/too-many-requests":      "Too many attempts. Try again later.",
    "auth/invalid-credential":     "Incorrect email or password.",
  })[code] || "Something went wrong. Please try again.";
}

function openOverlay(id)  { const el=$(id); if(el) el.classList.add("open");    }
function closeOverlay(id) { const el=$(id); if(el) el.classList.remove("open"); }

// ══════════════════════════════════════════════════════════
//  INJECT ALL HTML + STYLES
// ══════════════════════════════════════════════════════════
function injectHTML() {
  const countryOptions   = COUNTRIES.map(c   => `<option value="${c.code}" data-dial="${c.dial}">${c.name}</option>`).join("");
  const professionOptions= PROFESSIONS.map(p => `<option value="${p}">${p}</option>`).join("");

  document.body.insertAdjacentHTML("beforeend", `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    .vnus-overlay {
      display:none; position:fixed; inset:0; z-index:9998;
      background:rgba(10,60,120,0.38);
      backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
      align-items:center; justify-content:center; padding:16px;
    }
    .vnus-overlay.open { display:flex; animation:vOverlayIn .22s ease; }
    @keyframes vOverlayIn { from{opacity:0} to{opacity:1} }

    .vnus-modal {
      background:rgba(255,255,255,0.84);
      backdrop-filter:blur(28px); -webkit-backdrop-filter:blur(28px);
      border:1.5px solid rgba(255,255,255,0.78); border-radius:26px;
      width:100%; max-width:440px; padding:36px 32px 30px; position:relative;
      box-shadow:0 24px 64px rgba(0,80,180,0.18);
      animation:vModalIn .28s cubic-bezier(.22,.68,0,1.2);
      font-family:'Inter',sans-serif;
    }
    @keyframes vModalIn {
      from{opacity:0;transform:scale(.92) translateY(18px)}
      to  {opacity:1;transform:scale(1)   translateY(0)}
    }

    .vnus-close {
      position:absolute; top:16px; right:18px;
      background:rgba(0,0,0,0.07); border:none;
      width:32px; height:32px; border-radius:50%;
      font-size:17px; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      color:#444; transition:background .15s;
    }
    .vnus-close:hover { background:rgba(0,0,0,0.13); }

    .vnus-logo { display:flex; align-items:center; gap:9px; justify-content:center; margin-bottom:4px; }
    .vnus-logo-icon {
      width:34px; height:34px; background:linear-gradient(135deg,#38b6f5,#0ea5e9);
      border-radius:10px; display:flex; align-items:center; justify-content:center;
    }
    .vnus-logo-icon svg { width:18px; height:18px; }
    .vnus-logo-text { font-size:19px; font-weight:800; color:#111; }

    .vnus-steps { display:flex; justify-content:center; gap:7px; margin:18px 0 22px; }
    .vnus-step-dot {
      width:8px; height:8px; border-radius:50%;
      background:rgba(0,0,0,0.12); transition:background .25s, width .25s;
    }
    .vnus-step-dot.active { background:#38b6f5; width:22px; border-radius:4px; }

    .vnus-title    { font-size:20px; font-weight:800; color:#111; margin-bottom:4px; text-align:center; }
    .vnus-subtitle { font-size:13px; color:#777; text-align:center; margin-bottom:22px; }

    .vnus-field { margin-bottom:14px; }
    .vnus-field label { display:block; font-size:13px; font-weight:600; color:#555; margin-bottom:6px; }
    .vnus-input {
      width:100%; padding:12px 16px; box-sizing:border-box;
      background:rgba(255,255,255,0.92); border:1.5px solid rgba(0,0,0,0.10);
      border-radius:14px; font-size:15px; font-family:'Inter',sans-serif;
      color:#111; outline:none; transition:border-color .15s, box-shadow .15s;
    }
    .vnus-input:focus { border-color:#38b6f5; box-shadow:0 0 0 3px rgba(56,182,245,0.18); }
    .vnus-select {
      appearance:none;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23999' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
      background-repeat:no-repeat; background-position:right 14px center; padding-right:36px; cursor:pointer;
    }

    .vnus-phone-row { display:flex; gap:8px; align-items:stretch; }
    .vnus-dial-badge {
      display:flex; align-items:center; justify-content:center;
      background:rgba(56,182,245,0.12); border:1.5px solid rgba(56,182,245,0.35);
      border-radius:14px; padding:0 14px; font-size:15px; font-weight:700; color:#0ea5e9;
      white-space:nowrap; min-width:62px; transition:all .2s;
    }
    .vnus-phone-row .vnus-input { flex:1; }

    .vnus-btn {
      width:100%; padding:13px;
      background:linear-gradient(135deg,#1a1a1a,#333);
      color:white; border:none; border-radius:50px;
      font-size:15px; font-weight:700; font-family:'Inter',sans-serif;
      cursor:pointer; margin-top:6px;
      transition:opacity .15s, transform .12s;
      display:flex; align-items:center; justify-content:center; gap:8px;
    }
    .vnus-btn:hover { opacity:.88; transform:translateY(-1px); }
    .vnus-btn:disabled { opacity:.5; cursor:not-allowed; transform:none; }

    .vnus-btn-outline {
      width:100%; padding:12px; background:transparent; color:#555;
      border:1.5px solid rgba(0,0,0,0.12); border-radius:50px;
      font-size:14px; font-weight:600; font-family:'Inter',sans-serif;
      cursor:pointer; margin-top:8px; transition:background .15s;
    }
    .vnus-btn-outline:hover { background:rgba(0,0,0,0.04); }

    .vnus-msg { font-size:13px; font-family:'Inter',sans-serif; border-radius:10px; padding:10px 14px; margin-bottom:12px; display:none; }
    .vnus-msg.error   { background:rgba(239,68,68,.10); color:#b91c1c; display:block; }
    .vnus-msg.success { background:rgba(34,197,94,.12); color:#15803d; display:block; }

    .vnus-spinner {
      width:16px; height:16px; border:2.5px solid rgba(255,255,255,.4);
      border-top-color:white; border-radius:50%;
      animation:vspin .7s linear infinite; flex-shrink:0;
    }
    @keyframes vspin { to { transform:rotate(360deg); } }

    #vnus-toast {
      position:fixed; bottom:28px; left:50%;
      transform:translateX(-50%) translateY(80px);
      background:#111; color:white; padding:12px 24px; border-radius:50px;
      font-size:14px; font-weight:600; font-family:'Inter',sans-serif;
      z-index:99999; opacity:0; pointer-events:none; white-space:nowrap;
      transition:transform .3s cubic-bezier(.22,.68,0,1.2), opacity .3s;
    }
    #vnus-toast.show { transform:translateX(-50%) translateY(0); opacity:1; }

    /* ── AUTH MODAL ── */
    #auth-overlay { z-index:9999; }
    .auth-tabs {
      display:flex; background:rgba(0,0,0,0.06); border-radius:50px;
      padding:4px; margin:20px 0 22px;
    }
    .auth-tab {
      flex:1; padding:9px; border:none; background:none; border-radius:50px;
      font-size:14px; font-weight:600; cursor:pointer; color:#666;
      font-family:'Inter',sans-serif; transition:all .18s;
    }
    .auth-tab.active { background:white; color:#111; box-shadow:0 2px 8px rgba(0,0,0,.10); }
    .auth-panel { display:none; }
    .auth-panel.active { display:block; }

    #btn-google {
      width:100%; display:flex; align-items:center; justify-content:center; gap:10px;
      background:white; border:1.5px solid rgba(0,0,0,.12); border-radius:50px;
      padding:12px; font-size:15px; font-weight:600; font-family:'Inter',sans-serif;
      cursor:pointer; color:#222; transition:box-shadow .15s, transform .12s; margin-bottom:16px;
    }
    #btn-google:hover { box-shadow:0 4px 16px rgba(0,0,0,.10); transform:translateY(-1px); }
    .google-icon { width:20px; height:20px; flex-shrink:0; }

    .auth-divider {
      display:flex; align-items:center; gap:10px; margin-bottom:16px;
      color:#aaa; font-size:13px; font-family:'Inter',sans-serif;
    }
    .auth-divider::before,.auth-divider::after { content:''; flex:1; height:1px; background:rgba(0,0,0,.10); }

    .vnus-hint { font-size:11px; color:#aaa; margin-top:4px; }
    .vnus-char-count { text-align:right; font-size:11px; color:#bbb; margin-top:3px; }

    /* ── PROFILE DROPDOWN ── */
    .profile-dropdown-wrap { position:relative; display:inline-block; }

    .profile-btn {
      display:flex; align-items:center; gap:8px; background:white; border:none;
      border-radius:50px; padding:8px 14px 8px 8px; font-weight:600; font-size:14px;
      color:#111; cursor:pointer; box-shadow:0 2px 10px rgba(0,0,0,0.10);
      font-family:'Inter',sans-serif; transition:box-shadow .15s, transform .12s;
    }
    .profile-btn:hover { box-shadow:0 4px 16px rgba(0,0,0,.14); transform:translateY(-1px); }

    .profile-avatar {
      width:28px; height:28px; border-radius:50%;
      background:linear-gradient(135deg,#38b6f5,#0ea5e9);
      display:flex; align-items:center; justify-content:center;
      font-size:13px; font-weight:700; color:white; flex-shrink:0; overflow:hidden;
    }
    .profile-avatar img { width:100%; height:100%; object-fit:cover; border-radius:50%; }

    .profile-chevron { width:13px; height:13px; color:#aaa; transition:transform .2s; flex-shrink:0; }
    .profile-btn.open .profile-chevron { transform:rotate(180deg); }

    .profile-dropdown {
      position:absolute; top:calc(100% + 10px); right:0; width:224px;
      background:rgba(255,255,255,0.96); backdrop-filter:blur(24px);
      -webkit-backdrop-filter:blur(24px); border:1.5px solid rgba(255,255,255,0.80);
      border-radius:18px; box-shadow:0 12px 40px rgba(0,80,160,0.18);
      padding:8px; z-index:9990; display:none;
    }
    .profile-dropdown.open {
      display:block;
      animation:profileDropIn .2s cubic-bezier(.22,.68,0,1.2);
    }
    @keyframes profileDropIn {
      from { opacity:0; transform:translateY(-8px) scale(0.96); }
      to   { opacity:1; transform:translateY(0)    scale(1);    }
    }

    .pd-header { padding:10px 12px 12px; border-bottom:1px solid rgba(0,0,0,0.07); margin-bottom:6px; }
    .pd-name  { font-size:14px; font-weight:700; color:#111; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'Inter',sans-serif; }
    .pd-email { font-size:12px; color:#aaa; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'Inter',sans-serif; }

    .pd-item {
      display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:12px;
      font-size:14px; font-weight:500; color:#222; cursor:pointer; border:none; background:none;
      width:100%; text-align:left; font-family:'Inter',sans-serif; transition:background .15s, color .15s;
    }
    .pd-item:hover { background:rgba(56,182,245,0.10); color:#0ea5e9; }
    .pd-item svg { width:17px; height:17px; flex-shrink:0; color:#aaa; transition:color .15s; }
    .pd-item:hover svg { color:#0ea5e9; }

    .pd-soon {
      margin-left:auto; font-size:10px; font-weight:700;
      background:rgba(0,0,0,0.06); color:#bbb; border-radius:20px; padding:2px 8px;
    }
    .pd-divider { height:1px; background:rgba(0,0,0,0.07); margin:6px 0; }

    .pd-logout { color:#ef4444 !important; }
    .pd-logout svg { color:#ef4444 !important; }
    .pd-logout:hover { background:rgba(239,68,68,0.08) !important; color:#dc2626 !important; }
    .pd-logout:hover svg { color:#dc2626 !important; }
  </style>

  <!-- ══ AUTH MODAL ══ -->
  <div id="auth-overlay" class="vnus-overlay">
    <div class="vnus-modal" role="dialog" aria-modal="true">
      <button class="vnus-close" id="auth-close">✕</button>
      <div class="vnus-logo">
        <div class="vnus-logo-icon">
          <svg viewBox="0 0 24 24" fill="white"><path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.5l-6.2 4.4 2.4-7.2L2 9.2h7.6L12 2z"/></svg>
        </div>
        <span class="vnus-logo-text">Vnus AI</span>
      </div>
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="login">Log In</button>
        <button class="auth-tab"        data-tab="signup">Sign Up</button>
      </div>
      <div class="vnus-msg" id="auth-msg"></div>

      <button id="btn-google">
        <svg class="google-icon" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        Continue with Google
      </button>
      <div class="auth-divider">or</div>

      <div class="auth-panel active" id="panel-login">
        <div class="vnus-field">
          <label for="login-email">Email</label>
          <input id="login-email" class="vnus-input" type="email" placeholder="you@example.com" autocomplete="email"/>
        </div>
        <div class="vnus-field">
          <label for="login-password">Password</label>
          <input id="login-password" class="vnus-input" type="password" placeholder="••••••••" autocomplete="current-password"/>
        </div>
        <button class="vnus-btn" id="btn-login">Log In</button>
      </div>

      <div class="auth-panel" id="panel-signup">
        <div class="vnus-field">
          <label for="signup-email">Email</label>
          <input id="signup-email" class="vnus-input" type="email" placeholder="you@example.com" autocomplete="email"/>
        </div>
        <div class="vnus-field">
          <label for="signup-password">Password</label>
          <input id="signup-password" class="vnus-input" type="password" placeholder="Min 6 characters" autocomplete="new-password"/>
        </div>
        <div class="vnus-field">
          <label for="signup-confirm">Confirm Password</label>
          <input id="signup-confirm" class="vnus-input" type="password" placeholder="Re-enter password" autocomplete="new-password"/>
        </div>
        <button class="vnus-btn" id="btn-signup">Create Account</button>
      </div>
    </div>
  </div>

  <!-- ══ ONBOARDING STEP 1 ══ -->
  <div id="ob1-overlay" class="vnus-overlay">
    <div class="vnus-modal" role="dialog" aria-modal="true">
      <div class="vnus-logo">
        <div class="vnus-logo-icon">
          <svg viewBox="0 0 24 24" fill="white"><path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.5l-6.2 4.4 2.4-7.2L2 9.2h7.6L12 2z"/></svg>
        </div>
        <span class="vnus-logo-text">Vnus AI</span>
      </div>
      <div class="vnus-steps">
        <div class="vnus-step-dot active"></div>
        <div class="vnus-step-dot"></div>
      </div>
      <div class="vnus-title">Welcome! Let's set up your profile</div>
      <div class="vnus-subtitle">Step 1 of 2 — Tell us about yourself</div>
      <div class="vnus-msg" id="ob1-msg"></div>
      <div class="vnus-field">
        <label for="ob-username">Username</label>
        <input id="ob-username" class="vnus-input" type="text" placeholder="e.g. john_doe" maxlength="20" autocomplete="off"/>
        <div class="vnus-hint">Letters, numbers, underscores only. 3–20 chars.</div>
        <div class="vnus-char-count"><span id="un-count">0</span>/20</div>
      </div>
      <div class="vnus-field">
        <label for="ob-country">Country</label>
        <select id="ob-country" class="vnus-input vnus-select">
          <option value="">— Select your country —</option>
          ${countryOptions}
        </select>
      </div>
      <button class="vnus-btn" id="btn-ob1-next">Next &rarr;</button>
    </div>
  </div>

  <!-- ══ ONBOARDING STEP 2 ══ -->
  <div id="ob2-overlay" class="vnus-overlay">
    <div class="vnus-modal" role="dialog" aria-modal="true">
      <div class="vnus-logo">
        <div class="vnus-logo-icon">
          <svg viewBox="0 0 24 24" fill="white"><path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.5l-6.2 4.4 2.4-7.2L2 9.2h7.6L12 2z"/></svg>
        </div>
        <span class="vnus-logo-text">Vnus AI</span>
      </div>
      <div class="vnus-steps">
        <div class="vnus-step-dot"></div>
        <div class="vnus-step-dot active"></div>
      </div>
      <div class="vnus-title">Almost there! 🎉</div>
      <div class="vnus-subtitle">Step 2 of 2 — Contact &amp; profession</div>
      <div class="vnus-msg" id="ob2-msg"></div>
      <div class="vnus-field">
        <label>Mobile Number</label>
        <div class="vnus-phone-row">
          <div class="vnus-dial-badge" id="dial-display">+__</div>
          <input id="ob-phone" class="vnus-input" type="tel" placeholder="Phone number"/>
        </div>
        <div class="vnus-hint">Country code auto-added from Step 1.</div>
      </div>
      <div class="vnus-field">
        <label for="ob-profession">Profession</label>
        <select id="ob-profession" class="vnus-input vnus-select">
          <option value="">— Select your profession —</option>
          ${professionOptions}
        </select>
      </div>
      <button class="vnus-btn" id="btn-ob2-finish">Finish &amp; Enter Vnus AI 🚀</button>
      <button class="vnus-btn-outline" id="btn-ob2-back">← Back</button>
    </div>
  </div>

  <!-- ══ TOAST ══ -->
  <div id="vnus-toast"></div>
  `);
}

// ══════════════════════════════════════════════════════════
//  AUTH MODAL
// ══════════════════════════════════════════════════════════
function openModal(tab = "login") {
  clearMsg("auth-msg");
  switchTab(tab);
  openOverlay("auth-overlay");
  setTimeout(() => {
    const inp = document.querySelector(`#panel-${tab} .vnus-input`);
    if (inp) inp.focus();
  }, 250);
}
function closeModal() { closeOverlay("auth-overlay"); clearMsg("auth-msg"); }

function switchTab(tab) {
  document.querySelectorAll(".auth-tab").forEach(t =>
    t.classList.toggle("active", t.dataset.tab === tab));
  document.querySelectorAll(".auth-panel").forEach(p =>
    p.classList.toggle("active", p.id === `panel-${tab}`));
  clearMsg("auth-msg");
}

// ══════════════════════════════════════════════════════════
//  PROFILE DROPDOWN — fully inline, no separate file needed
// ══════════════════════════════════════════════════════════
function buildProfileHTML(user, username) {
  const displayName = username || (user.displayName ? user.displayName : user.email.split("@")[0]);
  const avatarHTML  = user.photoURL
    ? `<img src="${user.photoURL}" alt="avatar"/>`
    : displayName[0].toUpperCase();

  return `
    <div class="profile-dropdown-wrap" id="profile-wrap">
      <button class="profile-btn" id="profile-btn">
        <div class="profile-avatar">${avatarHTML}</div>
        <span>${displayName}</span>
        <svg class="profile-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div class="profile-dropdown" id="profile-dropdown">
        <div class="pd-header">
          <div class="pd-name">@${displayName}</div>
          <div class="pd-email">${user.email || ""}</div>
        </div>
        <button class="pd-item" id="pd-settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          Settings
          <span class="pd-soon">Soon</span>
        </button>
        <button class="pd-item" id="pd-pricing">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          Pricing
          <span class="pd-soon">Soon</span>
        </button>
        <div class="pd-divider"></div>
        <button class="pd-item pd-logout" id="pd-logout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Log Out
        </button>
      </div>
    </div>`;
}

function closeDropdown() {
  $("profile-btn")?.classList.remove("open");
  $("profile-dropdown")?.classList.remove("open");
}

function wireProfileDropdown() {
  // Clone trick — purane duplicate listeners hata do
  const oldBtn = $("profile-btn");
  if (!oldBtn) return;
  const newBtn = oldBtn.cloneNode(true);
  oldBtn.replaceWith(newBtn);

  // Toggle dropdown
  newBtn.addEventListener("click", e => {
    e.stopPropagation();
    const dd  = $("profile-dropdown");
    const btn = $("profile-btn");
    if (!dd || !btn) return;
    if (dd.classList.contains("open")) {
      dd.classList.remove("open");
      btn.classList.remove("open");
    } else {
      dd.classList.add("open");
      btn.classList.add("open");
    }
  });

  // Settings
  const settingsBtn = $("pd-settings");
  if (settingsBtn) {
    const fresh = settingsBtn.cloneNode(true);
    settingsBtn.replaceWith(fresh);
    fresh.addEventListener("click", () => {
      closeDropdown();
      showToast("⚙️ Settings — Coming soon!");
    });
  }

  // Pricing
  const pricingBtn = $("pd-pricing");
  if (pricingBtn) {
    const fresh = pricingBtn.cloneNode(true);
    pricingBtn.replaceWith(fresh);
    fresh.addEventListener("click", () => {
      closeDropdown();
      showToast("💰 Pricing — Coming soon!");
    });
  }

  // Logout
  const logoutBtn = $("pd-logout");
  if (logoutBtn) {
    const fresh = logoutBtn.cloneNode(true);
    logoutBtn.replaceWith(fresh);
    fresh.addEventListener("click", async () => {
      closeDropdown();
      await signOut(auth);
      showToast("👋 Logged out successfully!");
    });
  }

  // Outside click — sirf ek baar
  if (!window._profileOutsideClickAdded) {
    window._profileOutsideClickAdded = true;
    document.addEventListener("click", e => {
      const wrap = $("profile-wrap");
      if (wrap && !wrap.contains(e.target)) closeDropdown();
    });
  }
}

// ══════════════════════════════════════════════════════════
//  NAVBAR UPDATE
// ══════════════════════════════════════════════════════════
async function showLoggedIn(user) {
  let username = user.displayName ? user.displayName.split(" ")[0] : user.email.split("@")[0];
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists() && snap.data().usernameDisplay) username = snap.data().usernameDisplay;
  } catch(_) {}

  const loginBtn  = $("nav-login-btn");
  const signupBtn = $("nav-signup-btn");

  if (loginBtn) {
    const temp = document.createElement("div");
    temp.innerHTML = buildProfileHTML(user, username);
    loginBtn.replaceWith(temp.firstElementChild);
    wireProfileDropdown();
  }
  if (signupBtn) signupBtn.style.display = "none";
}

function showLoggedOut() {
  // Agar profile wrap hai toh login button wapas lao
  const wrap = $("profile-wrap");
  if (wrap) {
    const loginBtn = document.createElement("button");
    loginBtn.className   = "btn-login";
    loginBtn.id          = "nav-login-btn";
    loginBtn.textContent = "Login";
    loginBtn.addEventListener("click", () => openModal("login"));
    wrap.replaceWith(loginBtn);
  }
  // Signup button wapas dikhao
  const signupBtn = $("nav-signup-btn");
  if (signupBtn) {
    signupBtn.style.display = "";
    signupBtn.onclick = () => openModal("signup");
  }
}

// ══════════════════════════════════════════════════════════
//  ONBOARDING
// ══════════════════════════════════════════════════════════
let _pendingUser = null;
let _ob1Data     = {};

async function checkOnboarding(user) {
  const snap = await getDoc(doc(db, "users", user.uid));
  return snap.exists() && snap.data().onboardingDone === true;
}

async function startOnboarding(user) {
  _pendingUser = user;
  openOverlay("ob1-overlay");
}

async function handleOb1Next() {
  clearMsg("ob1-msg");
  const username = $("ob-username").value.trim();
  const country  = $("ob-country").value;
  if (username.length < 3)             { showMsg("ob1-msg","Username must be at least 3 characters."); return; }
  if (!/^[a-zA-Z0-9_]+$/.test(username)){ showMsg("ob1-msg","Only letters, numbers, underscores."); return; }
  if (!country)                          { showMsg("ob1-msg","Please select your country."); return; }

  const countryObj = COUNTRIES.find(c => c.code === country);
  _ob1Data = { username, country, countryName: countryObj.name, dialCode: countryObj.dial };
  $("dial-display").textContent = countryObj.dial;
  closeOverlay("ob1-overlay");
  openOverlay("ob2-overlay");
}

async function handleOb2Finish() {
  clearMsg("ob2-msg");
  const phone      = $("ob-phone").value.trim();
  const profession = $("ob-profession").value;
  if (!phone)      { showMsg("ob2-msg","Please enter your mobile number."); return; }
  if (!profession) { showMsg("ob2-msg","Please select your profession."); return; }

  setLoading("btn-ob2-finish", true, "Saving…");
  try {
    await setDoc(doc(db, "users", _pendingUser.uid), {
      uid:             _pendingUser.uid,
      email:           _pendingUser.email || "",
      displayName:     _pendingUser.displayName || _ob1Data.username,
      username:        _ob1Data.username.toLowerCase(),
      usernameDisplay: _ob1Data.username,
      country:         _ob1Data.country,
      countryName:     _ob1Data.countryName,
      phone:           _ob1Data.dialCode + " " + phone,
      profession:      profession,
      onboardingDone:  true,
      createdAt:       serverTimestamp(),
    });
    closeOverlay("ob2-overlay");
    showToast(`🎉 Welcome, ${_ob1Data.username}! Your account is ready.`);
    await showLoggedIn(_pendingUser);
    _pendingUser = null; _ob1Data = {};
  } catch(e) {
    showMsg("ob2-msg","Could not save profile. Check Firestore rules & try again.");
    console.error(e);
  } finally {
    setLoading("btn-ob2-finish", false, "Finish & Enter Vnus AI 🚀");
  }
}

// ══════════════════════════════════════════════════════════
//  AUTH ACTIONS
// ══════════════════════════════════════════════════════════
async function handleGoogle() {
  clearMsg("auth-msg");
  setLoading("btn-google", true, "Connecting…");
  try {
    const result = await signInWithPopup(auth, gProvider);
    const user   = result.user;
    const done   = await checkOnboarding(user);
    closeModal();
    if (!done) { await startOnboarding(user); }
    else { await showLoggedIn(user); showToast(`✅ Welcome back!`); }
  } catch(e) {
    showMsg("auth-msg", friendlyError(e.code));
  } finally {
    setLoading("btn-google", false, `<svg class="google-icon" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg> Continue with Google`);
  }
}

async function handleLogin() {
  const email    = $("login-email").value.trim();
  const password = $("login-password").value;
  clearMsg("auth-msg");
  if (!email || !password) { showMsg("auth-msg","Please fill in all fields."); return; }
  setLoading("btn-login", true, "Logging in…");
  try {
    await signInWithEmailAndPassword(auth, email, password);
    showToast("✅ Logged in successfully!");
    closeModal();
  } catch(e) {
    showMsg("auth-msg", friendlyError(e.code));
  } finally {
    setLoading("btn-login", false, "Log In");
  }
}

async function handleSignup() {
  const email    = $("signup-email").value.trim();
  const password = $("signup-password").value;
  const confirm  = $("signup-confirm").value;
  clearMsg("auth-msg");
  if (!email||!password||!confirm) { showMsg("auth-msg","Please fill in all fields."); return; }
  if (password !== confirm)         { showMsg("auth-msg","Passwords do not match."); return; }
  if (password.length < 6)          { showMsg("auth-msg","Password must be at least 6 characters."); return; }
  setLoading("btn-signup", true, "Creating account…");
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    closeModal();
    await startOnboarding(cred.user);
  } catch(e) {
    showMsg("auth-msg", friendlyError(e.code));
  } finally {
    setLoading("btn-signup", false, "Create Account");
  }
}

// ══════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════
function init() {
  injectHTML();

  // Auth modal
  $("auth-close").addEventListener("click", closeModal);
  $("auth-overlay").addEventListener("click", e => { if(e.target===e.currentTarget) closeModal(); });
  document.addEventListener("keydown", e => { if(e.key==="Escape") { closeModal(); closeDropdown(); } });
  document.querySelectorAll(".auth-tab").forEach(t => t.addEventListener("click", () => switchTab(t.dataset.tab)));
  $("btn-google").addEventListener("click", handleGoogle);
  $("btn-login").addEventListener("click", handleLogin);
  $("login-password").addEventListener("keydown", e => { if(e.key==="Enter") handleLogin(); });
  $("btn-signup").addEventListener("click", handleSignup);
  $("signup-confirm").addEventListener("keydown", e => { if(e.key==="Enter") handleSignup(); });

  // Navbar
  $("nav-login-btn")?.addEventListener("click", () => openModal("login"));
  $("nav-signup-btn")?.addEventListener("click", () => openModal("signup"));

  // Onboarding
  $("ob-username").addEventListener("input", () => { $("un-count").textContent = $("ob-username").value.length; });
  $("btn-ob1-next").addEventListener("click", handleOb1Next);
  $("ob-username").addEventListener("keydown", e => { if(e.key==="Enter") handleOb1Next(); });
  $("btn-ob2-finish").addEventListener("click", handleOb2Finish);
  $("btn-ob2-back").addEventListener("click", () => { closeOverlay("ob2-overlay"); openOverlay("ob1-overlay"); });
  $("ob-phone").addEventListener("keydown", e => { if(e.key==="Enter") handleOb2Finish(); });

  // Auth state — authStateReady pehle, phir observer
  auth.authStateReady().then(async () => {
    const user = auth.currentUser;
    if (user) {
      const done = await checkOnboarding(user);
      if (done) { await showLoggedIn(user); }
      else { await startOnboarding(user); }
    }
    // Logged out — buttons pehle se hi visible hain, kuch nahi karna
  });

  // Login/logout changes ke liye
  onAuthStateChanged(auth, async user => {
    if (user) {
      const done = await checkOnboarding(user);
      if (done) await showLoggedIn(user);
    } else {
      showLoggedOut();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export { openModal, closeModal };