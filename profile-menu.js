// ═══════════════════════════════════════════════════════════
//  profile-menu.js  —  Vnus AI Profile Dropdown
// ═══════════════════════════════════════════════════════════

// ── Styles inject (sirf ek baar) ──────────────────────────
function injectStyles() {
  if (document.getElementById("pm-styles")) return;
  const s = document.createElement("style");
  s.id = "pm-styles";
  s.textContent = `
    .pm-wrap { position: relative; display: inline-block; }

    .pm-btn {
      display: flex; align-items: center; gap: 8px;
      background: white; border: none; border-radius: 50px;
      padding: 8px 14px 8px 8px;
      font-weight: 600; font-size: 14px; color: #111;
      cursor: pointer; font-family: 'Inter', sans-serif;
      box-shadow: 0 2px 10px rgba(0,0,0,0.10);
      transition: box-shadow 0.15s, transform 0.12s;
    }
    .pm-btn:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.14); transform: translateY(-1px); }

    .pm-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      background: linear-gradient(135deg,#38b6f5,#0ea5e9);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: white;
      flex-shrink: 0; overflow: hidden;
    }
    .pm-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

    .pm-chevron {
      width: 13px; height: 13px; color: #aaa;
      transition: transform 0.2s; flex-shrink: 0;
    }
    .pm-btn.open .pm-chevron { transform: rotate(180deg); }

    .pm-dropdown {
      position: absolute; top: calc(100% + 10px); right: 0;
      width: 224px;
      background: rgba(255,255,255,0.96);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      border: 1.5px solid rgba(255,255,255,0.80);
      border-radius: 18px; padding: 8px;
      box-shadow: 0 12px 40px rgba(0,80,160,0.16);
      z-index: 9999;
      display: none;
    }
    .pm-dropdown.open {
      display: block;
      animation: pmDropIn 0.2s cubic-bezier(.22,.68,0,1.2);
    }
    @keyframes pmDropIn {
      from { opacity:0; transform: translateY(-8px) scale(0.96); }
      to   { opacity:1; transform: translateY(0) scale(1); }
    }

    .pm-header {
      padding: 10px 12px 12px;
      border-bottom: 1px solid rgba(0,0,0,0.07);
      margin-bottom: 6px;
    }
    .pm-name {
      font-size: 14px; font-weight: 700; color: #111;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      font-family: 'Inter', sans-serif;
    }
    .pm-email {
      font-size: 12px; color: #aaa; margin-top: 2px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      font-family: 'Inter', sans-serif;
    }

    .pm-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border-radius: 12px;
      font-size: 14px; font-weight: 500; color: #222;
      cursor: pointer; border: none; background: none;
      width: 100%; text-align: left;
      font-family: 'Inter', sans-serif;
      transition: background 0.15s, color 0.15s;
    }
    .pm-item:hover { background: rgba(56,182,245,0.10); color: #0ea5e9; }
    .pm-item svg { width: 17px; height: 17px; flex-shrink: 0; color: #aaa; transition: color 0.15s; }
    .pm-item:hover svg { color: #0ea5e9; }

    .pm-soon {
      margin-left: auto; font-size: 10px; font-weight: 700;
      background: rgba(0,0,0,0.06); color: #bbb;
      border-radius: 20px; padding: 2px 8px;
      font-family: 'Inter', sans-serif;
    }

    .pm-divider { height: 1px; background: rgba(0,0,0,0.07); margin: 6px 0; }

    .pm-item.pm-logout { color: #ef4444; }
    .pm-item.pm-logout svg { color: #ef4444; }
    .pm-item.pm-logout:hover { background: rgba(239,68,68,0.08); color: #dc2626; }
    .pm-item.pm-logout:hover svg { color: #dc2626; }
  `;
  document.head.appendChild(s);
}

// ── Build dropdown HTML ────────────────────────────────────
function buildHTML(user, username) {
  const name    = username || user.displayName || user.email.split("@")[0];
  const initial = name[0].toUpperCase();
  const email   = user.email || "";
  const avatar  = user.photoURL
    ? `<img src="${user.photoURL}" alt="avatar"/>`
    : initial;

  return `
    <div class="pm-wrap" id="pm-wrap">
      <button class="pm-btn" id="pm-btn">
        <div class="pm-avatar">${avatar}</div>
        <span>${name}</span>
        <svg class="pm-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      <div class="pm-dropdown" id="pm-dropdown">
        <div class="pm-header">
          <div class="pm-name">@${name}</div>
          <div class="pm-email">${email}</div>
        </div>

        <button class="pm-item" id="pm-settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          Settings
          <span class="pm-soon">Soon</span>
        </button>

        <button class="pm-item" id="pm-pricing">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          Pricing
          <span class="pm-soon">Soon</span>
        </button>

        <div class="pm-divider"></div>

        <button class="pm-item pm-logout" id="pm-logout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Log Out
        </button>
      </div>
    </div>
  `;
}

// ── Close dropdown ─────────────────────────────────────────
function closeDropdown() {
  document.getElementById("pm-btn")?.classList.remove("open");
  document.getElementById("pm-dropdown")?.classList.remove("open");
}

// ── Global listeners flag — sirf ek baar lagao ────────────
let _globalListenersAdded = false;
function addGlobalListeners() {
  if (_globalListenersAdded) return;
  _globalListenersAdded = true;

  // Outside click
  document.addEventListener("click", (e) => {
    const wrap = document.getElementById("pm-wrap");
    if (wrap && !wrap.contains(e.target)) closeDropdown();
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });
}

// ══════════════════════════════════════════════════════════
//  MAIN EXPORT
// ══════════════════════════════════════════════════════════
export function setupProfileMenu({ user, username, signOutFn, showToastFn, openModalFn }) {
  injectStyles();

  if (user) {
    // ── Purana profile wrap hata do ──
    const existing = document.getElementById("pm-wrap");
    if (existing) existing.remove();

    // ── Nav login btn dhundo aur replace karo ──
    const loginBtn = document.getElementById("nav-login-btn");
    if (loginBtn) {
      const temp = document.createElement("div");
      temp.innerHTML = buildHTML(user, username);
      loginBtn.replaceWith(temp.firstElementChild);
    }

    // ── Signup btn chhupao ──
    const signupBtn = document.getElementById("nav-signup-btn");
    if (signupBtn) signupBtn.style.display = "none";

    // ── Profile btn click → toggle ──
    // setTimeout 0 — DOM properly mount hone ka wait
    setTimeout(() => {
      const pmBtn = document.getElementById("pm-btn");
      if (pmBtn) {
        // Purane listeners hata do — clone trick
        const freshBtn = pmBtn.cloneNode(true);
        pmBtn.replaceWith(freshBtn);

        freshBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const dd = document.getElementById("pm-dropdown");
          if (!dd) return;
          const isOpen = dd.classList.contains("open");
          if (isOpen) {
            closeDropdown();
          } else {
            dd.classList.add("open");
            freshBtn.classList.add("open");
          }
        });
      }

      // Settings
      document.getElementById("pm-settings")?.addEventListener("click", () => {
        closeDropdown();
        showToastFn("⚙️ Settings — Coming soon!");
      });

      // Pricing
      document.getElementById("pm-pricing")?.addEventListener("click", () => {
        closeDropdown();
        showToastFn("💰 Pricing — Coming soon!");
      });

      // Logout
      document.getElementById("pm-logout")?.addEventListener("click", async () => {
        closeDropdown();
        await signOutFn();
        showToastFn("👋 Logged out successfully!");
      });

      // Global listeners (sirf ek baar)
      addGlobalListeners();
    }, 0);

  } else {
    // ── Logged out — profile wrap hata ke login/signup restore karo ──
    const wrap = document.getElementById("pm-wrap");
    if (wrap) {
      const newLogin = document.createElement("button");
      newLogin.className   = "btn-login";
      newLogin.id          = "nav-login-btn";
      newLogin.textContent = "Login";
      newLogin.addEventListener("click", () => openModalFn("login"));
      wrap.replaceWith(newLogin);
    }

    const signupBtn = document.getElementById("nav-signup-btn");
    if (signupBtn) {
      signupBtn.style.display = "";
      signupBtn.textContent   = "Sign Up";
      signupBtn.onclick       = () => openModalFn("signup");
    }
  }
}