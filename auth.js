// ═══════════════════════════════════════════════════════════
//  auth.js  —  Vnus AI Firebase Authentication
//  Replace the Firebase config below with YOUR project config
// ═══════════════════════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ──────────────────────────────────────────────────────────
//  🔴 YAHAN APNA FIREBASE CONFIG PASTE KARO
//  Firebase Console → Project Settings → Your apps → SDK setup
// ──────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCOPpUgrSI20gr1zhr_knts2if6gEFr3XE",
  authDomain: "vnusai.firebaseapp.com",
  projectId: "vnusai",
  storageBucket: "vnusai.firebasestorage.app",
  messagingSenderId: "380179126596",
  appId: "1:380179126596:web:4904df078f13317c5f11",
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ══════════════════════════════════════════════════════════
//  MODAL HTML — inject into page on load
// ══════════════════════════════════════════════════════════
function injectModal() {
  const html = `
  <style>
    /* ── Overlay ── */
    #auth-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(10, 60, 120, 0.35);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    #auth-overlay.open { display: flex; animation: overlayIn 0.22s ease; }
    @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }

    /* ── Modal box ── */
    #auth-modal {
      background: rgba(255,255,255,0.82);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1.5px solid rgba(255,255,255,0.75);
      border-radius: 26px;
      width: 100%;
      max-width: 420px;
      padding: 36px 32px 32px;
      box-shadow: 0 20px 60px rgba(0,80,180,0.18);
      position: relative;
      animation: modalIn 0.25s cubic-bezier(.22,.68,0,1.2);
    }
    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.92) translateY(16px); }
      to   { opacity: 1; transform: scale(1)    translateY(0);     }
    }

    /* ── Close button ── */
    #auth-close {
      position: absolute;
      top: 16px; right: 18px;
      background: rgba(0,0,0,0.07);
      border: none;
      width: 32px; height: 32px;
      border-radius: 50%;
      font-size: 18px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: #444;
      transition: background 0.15s;
    }
    #auth-close:hover { background: rgba(0,0,0,0.13); }

    /* ── Logo area ── */
    .auth-logo {
      display: flex; align-items: center; gap: 9px;
      justify-content: center;
      margin-bottom: 6px;
    }
    .auth-logo-icon {
      width: 36px; height: 36px;
      background: linear-gradient(135deg,#38b6f5,#0ea5e9);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
    }
    .auth-logo-icon svg { width: 20px; height: 20px; }
    .auth-logo-text { font-size: 20px; font-weight: 800; color: #111; font-family: 'Inter',sans-serif; }

    /* ── Tabs ── */
    .auth-tabs {
      display: flex;
      background: rgba(0,0,0,0.06);
      border-radius: 50px;
      padding: 4px;
      margin: 22px 0 24px;
    }
    .auth-tab {
      flex: 1;
      padding: 9px;
      border: none;
      background: none;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      color: #666;
      font-family: 'Inter',sans-serif;
      transition: all 0.18s;
    }
    .auth-tab.active {
      background: white;
      color: #111;
      box-shadow: 0 2px 8px rgba(0,0,0,0.10);
    }

    /* ── Form panels ── */
    .auth-panel { display: none; }
    .auth-panel.active { display: block; }

    /* ── Google button ── */
    #btn-google {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: white;
      border: 1.5px solid rgba(0,0,0,0.12);
      border-radius: 50px;
      padding: 12px;
      font-size: 15px;
      font-weight: 600;
      font-family: 'Inter',sans-serif;
      cursor: pointer;
      color: #222;
      transition: box-shadow 0.15s, transform 0.12s;
      margin-bottom: 18px;
    }
    #btn-google:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.10); transform: translateY(-1px); }
    .google-icon { width: 20px; height: 20px; }

    /* ── Divider ── */
    .auth-divider {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 18px;
      color: #aaa; font-size: 13px; font-family: 'Inter',sans-serif;
    }
    .auth-divider::before, .auth-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba(0,0,0,0.10);
    }

    /* ── Inputs ── */
    .auth-input-wrap { margin-bottom: 14px; }
    .auth-input-wrap label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #555;
      margin-bottom: 6px;
      font-family: 'Inter',sans-serif;
    }
    .auth-input {
      width: 100%;
      padding: 12px 16px;
      background: rgba(255,255,255,0.90);
      border: 1.5px solid rgba(0,0,0,0.10);
      border-radius: 14px;
      font-size: 15px;
      font-family: 'Inter',sans-serif;
      color: #111;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      box-sizing: border-box;
    }
    .auth-input:focus {
      border-color: #38b6f5;
      box-shadow: 0 0 0 3px rgba(56,182,245,0.18);
    }

    /* ── Submit button ── */
    .auth-submit {
      width: 100%;
      padding: 13px;
      background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 15px;
      font-weight: 700;
      font-family: 'Inter',sans-serif;
      cursor: pointer;
      margin-top: 6px;
      transition: opacity 0.15s, transform 0.12s;
    }
    .auth-submit:hover { opacity: 0.88; transform: translateY(-1px); }
    .auth-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    /* ── Error / success messages ── */
    .auth-message {
      font-size: 13px;
      font-family: 'Inter',sans-serif;
      border-radius: 10px;
      padding: 10px 14px;
      margin-bottom: 14px;
      display: none;
    }
    .auth-message.error   { background: rgba(239,68,68,0.10); color: #b91c1c; display: block; }
    .auth-message.success { background: rgba(34,197,94,0.12); color: #15803d; display: block; }

    /* ── Spinner ── */
    .spinner {
      width: 18px; height: 18px;
      border: 2.5px solid rgba(255,255,255,0.4);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Toast notification ── */
    #auth-toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(80px);
      background: #111;
      color: white;
      padding: 12px 24px;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 600;
      font-family: 'Inter',sans-serif;
      z-index: 99999;
      transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), opacity 0.3s;
      opacity: 0;
      pointer-events: none;
      white-space: nowrap;
    }
    #auth-toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  </style>

  <!-- Overlay -->
  <div id="auth-overlay">
    <div id="auth-modal" role="dialog" aria-modal="true" aria-label="Authentication">

      <!-- Close -->
      <button id="auth-close" aria-label="Close">✕</button>

      <!-- Logo -->
      <div class="auth-logo">
        <div class="auth-logo-icon">
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.5l-6.2 4.4 2.4-7.2L2 9.2h7.6L12 2z"/>
          </svg>
        </div>
        <span class="auth-logo-text">Vnus AI</span>
      </div>

      <!-- Tabs -->
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="login">Log In</button>
        <button class="auth-tab" data-tab="signup">Sign Up</button>
      </div>

      <!-- Error/success message -->
      <div class="auth-message" id="auth-msg"></div>

      <!-- Google button (shared) -->
      <button id="btn-google">
        <svg class="google-icon" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        Continue with Google
      </button>

      <div class="auth-divider">or</div>

      <!-- LOGIN PANEL -->
      <div class="auth-panel active" id="panel-login">
        <div class="auth-input-wrap">
          <label for="login-email">Email</label>
          <input id="login-email" class="auth-input" type="email" placeholder="you@example.com" autocomplete="email"/>
        </div>
        <div class="auth-input-wrap">
          <label for="login-password">Password</label>
          <input id="login-password" class="auth-input" type="password" placeholder="••••••••" autocomplete="current-password"/>
        </div>
        <button class="auth-submit" id="btn-login">Log In</button>
      </div>

      <!-- SIGNUP PANEL -->
      <div class="auth-panel" id="panel-signup">
        <div class="auth-input-wrap">
          <label for="signup-email">Email</label>
          <input id="signup-email" class="auth-input" type="email" placeholder="you@example.com" autocomplete="email"/>
        </div>
        <div class="auth-input-wrap">
          <label for="signup-password">Password</label>
          <input id="signup-password" class="auth-input" type="password" placeholder="Min 6 characters" autocomplete="new-password"/>
        </div>
        <div class="auth-input-wrap">
          <label for="signup-confirm">Confirm Password</label>
          <input id="signup-confirm" class="auth-input" type="password" placeholder="Re-enter password" autocomplete="new-password"/>
        </div>
        <button class="auth-submit" id="btn-signup">Create Account</button>
      </div>

    </div>
  </div>

  <!-- Toast -->
  <div id="auth-toast"></div>
  `;

  document.body.insertAdjacentHTML("beforeend", html);
}

// ══════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════
function showMsg(text, type = "error") {
  const el = document.getElementById("auth-msg");
  el.textContent = text;
  el.className = `auth-message ${type}`;
}
function clearMsg() {
  const el = document.getElementById("auth-msg");
  el.textContent = "";
  el.className = "auth-message";
}

function showToast(msg) {
  const t = document.getElementById("auth-toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3200);
}

function setLoading(btnId, loading, label) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.disabled = loading;
  btn.innerHTML = loading
    ? `<span class="spinner"></span> ${label}`
    : label;
}

function openModal(tab = "login") {
  const overlay = document.getElementById("auth-overlay");
  overlay.classList.add("open");
  clearMsg();
  switchTab(tab);
  // focus first input
  setTimeout(() => {
    const input = document.querySelector(`#panel-${tab} .auth-input`);
    if (input) input.focus();
  }, 250);
}

function closeModal() {
  document.getElementById("auth-overlay").classList.remove("open");
  clearMsg();
}

function switchTab(tab) {
  document.querySelectorAll(".auth-tab").forEach(t => {
    t.classList.toggle("active", t.dataset.tab === tab);
  });
  document.querySelectorAll(".auth-panel").forEach(p => {
    p.classList.toggle("active", p.id === `panel-${tab}`);
  });
  clearMsg();
}

// ══════════════════════════════════════════════════════════
//  FIREBASE ERROR MESSAGES (user-friendly)
// ══════════════════════════════════════════════════════════
function friendlyError(code) {
  const map = {
    "auth/invalid-email":           "Invalid email address.",
    "auth/user-not-found":          "No account found with this email.",
    "auth/wrong-password":          "Wrong password. Try again.",
    "auth/email-already-in-use":    "This email is already registered. Log in instead.",
    "auth/weak-password":           "Password must be at least 6 characters.",
    "auth/popup-closed-by-user":    "Google sign-in was cancelled.",
    "auth/network-request-failed":  "Network error. Check your connection.",
    "auth/too-many-requests":       "Too many attempts. Try again later.",
    "auth/invalid-credential":      "Incorrect email or password.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

// ══════════════════════════════════════════════════════════
//  AUTH ACTIONS
// ══════════════════════════════════════════════════════════
async function handleGoogle() {
  clearMsg();
  setLoading("btn-google", true, "Continue with Google");
  try {
    await signInWithPopup(auth, googleProvider);
    showToast("✅ Welcome to Vnus AI!");
    closeModal();
  } catch (e) {
    showMsg(friendlyError(e.code));
  } finally {
    setLoading("btn-google", false, `
      <svg class="google-icon" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      Continue with Google`);
  }
}

async function handleLogin() {
  const email    = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  clearMsg();
  if (!email || !password) { showMsg("Please fill in all fields."); return; }
  setLoading("btn-login", true, "Logging in…");
  try {
    await signInWithEmailAndPassword(auth, email, password);
    showToast("✅ Logged in successfully!");
    closeModal();
  } catch (e) {
    showMsg(friendlyError(e.code));
  } finally {
    setLoading("btn-login", false, "Log In");
  }
}

async function handleSignup() {
  const email    = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirm  = document.getElementById("signup-confirm").value;
  clearMsg();
  if (!email || !password || !confirm) { showMsg("Please fill in all fields."); return; }
  if (password !== confirm)            { showMsg("Passwords do not match.");     return; }
  if (password.length < 6)            { showMsg("Password must be at least 6 characters."); return; }
  setLoading("btn-signup", true, "Creating account…");
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    showToast("🎉 Account created! Welcome to Vnus AI!");
    closeModal();
  } catch (e) {
    showMsg(friendlyError(e.code));
  } finally {
    setLoading("btn-signup", false, "Create Account");
  }
}

// ══════════════════════════════════════════════════════════
//  INIT — wire everything up after DOM ready
// ══════════════════════════════════════════════════════════
function init() {
  injectModal();

  // Close on overlay click
  document.getElementById("auth-overlay").addEventListener("click", e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Close button
  document.getElementById("auth-close").addEventListener("click", closeModal);

  // Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // Tabs
  document.querySelectorAll(".auth-tab").forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  // Google
  document.getElementById("btn-google").addEventListener("click", handleGoogle);

  // Login
  document.getElementById("btn-login").addEventListener("click", handleLogin);
  document.getElementById("login-password").addEventListener("keydown", e => {
    if (e.key === "Enter") handleLogin();
  });

  // Signup
  document.getElementById("btn-signup").addEventListener("click", handleSignup);
  document.getElementById("signup-confirm").addEventListener("keydown", e => {
    if (e.key === "Enter") handleSignup();
  });

  // Wire navbar buttons  (Login → login tab, Sign Up → signup tab)
  document.querySelectorAll(".btn-login").forEach(b =>
    b.addEventListener("click", () => openModal("login"))
  );
  document.querySelectorAll(".btn-signup").forEach(b =>
    b.addEventListener("click", () => openModal("signup"))
  );

  // Auth state observer — update UI when user logs in/out
  onAuthStateChanged(auth, user => {
    const loginBtns  = document.querySelectorAll(".btn-login");
    const signupBtns = document.querySelectorAll(".btn-signup");
    if (user) {
      // User is logged in — show their name/email or a logout button
      loginBtns.forEach(b => {
        b.textContent = user.displayName
          ? user.displayName.split(" ")[0]
          : user.email.split("@")[0];
        b.onclick = () => { signOut(auth); showToast("👋 Logged out."); };
      });
      signupBtns.forEach(b => { b.style.display = "none"; });
    } else {
      // Not logged in — restore original buttons
      loginBtns.forEach(b => {
        b.textContent = "Login";
        b.onclick = () => openModal("login");
      });
      signupBtns.forEach(b => {
        b.style.display = "";
        b.textContent = "Sign Up";
        b.onclick = () => openModal("signup");
      });
    }
  });
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Export openModal for use anywhere in your app
export { openModal, closeModal };