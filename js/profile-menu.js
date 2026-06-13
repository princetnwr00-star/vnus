// ═══════════════════════════════════════════════════════════
//  profile-menu.js  —  Vnus AI Profile Dropdown Menu
// ═══════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════════════════════
function injectProfileStyles() {
  if (document.getElementById("profile-menu-styles")) return;
  const style = document.createElement("style");
  style.id = "profile-menu-styles";
  style.textContent = `
    .profile-dropdown-wrap {
      position: relative;
      display: inline-block;
    }

    /* Profile button */
    .profile-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: white;
      border: none;
      border-radius: 50px;
      padding: 8px 14px 8px 8px;
      font-weight: 600;
      font-size: 14px;
      color: #111;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,0.10);
      font-family: 'Inter', sans-serif;
      transition: box-shadow 0.15s, transform 0.12s;
    }
    .profile-btn:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.14);
      transform: translateY(-1px);
    }

    /* Avatar */
    .profile-avatar {
      width: 28px; height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, #38b6f5, #0ea5e9);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: white;
      flex-shrink: 0; overflow: hidden;
    }
    .profile-avatar img {
      width: 100%; height: 100%;
      object-fit: cover; border-radius: 50%;
    }

    /* Chevron */
    .profile-chevron {
      width: 13px; height: 13px;
      color: #aaa;
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    .profile-btn.open .profile-chevron {
      transform: rotate(180deg);
    }

    /* Dropdown */
    .profile-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 224px;
      background: rgba(255,255,255,0.94);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1.5px solid rgba(255,255,255,0.80);
      border-radius: 18px;
      box-shadow: 0 12px 40px rgba(0,80,160,0.16);
      padding: 8px;
      z-index: 9990;
      display: none;
    }
    .profile-dropdown.open {
      display: block;
      animation: profileDropIn 0.2s cubic-bezier(.22,.68,0,1.2);
    }
    @keyframes profileDropIn {
      from { opacity:0; transform: translateY(-8px) scale(0.96); }
      to   { opacity:1; transform: translateY(0)    scale(1);    }
    }

    /* Header */
    .pd-header {
      padding: 10px 12px 12px;
      border-bottom: 1px solid rgba(0,0,0,0.07);
      margin-bottom: 6px;
    }
    .pd-name {
      font-size: 14px; font-weight: 700; color: #111;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      font-family: 'Inter', sans-serif;
    }
    .pd-email {
      font-size: 12px; color: #aaa; margin-top: 2px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      font-family: 'Inter', sans-serif;
    }

    /* Menu items */
    .pd-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      font-size: 14px; font-weight: 500; color: #222;
      cursor: pointer; border: none; background: none;
      width: 100%; text-align: left;
      font-family: 'Inter', sans-serif;
      transition: background 0.15s, color 0.15s;
    }
    .pd-item:hover { background: rgba(56,182,245,0.10); color: #0ea5e9; }
    .pd-item svg { width: 17px; height: 17px; flex-shrink: 0; color: #aaa; transition: color 0.15s; }
    .pd-item:hover svg { color: #0ea5e9; }

    /* Soon badge */
    .pd-soon {
      margin-left: auto;
      font-size: 10px; font-weight: 700;
      background: rgba(0,0,0,0.06); color: #bbb;
      border-radius: 20px; padding: 2px 8px;
      font-family: 'Inter', sans-serif;
    }

    /* Divider */
    .pd-divider { height: 1px; background: rgba(0,0,0,0.07); margin: 6px 0; }

    /* Logout */
    .pd-item.pd-logout { color: #ef4444; }
    .pd-item.pd-logout svg { color: #ef4444; }
    .pd-item.pd-logout:hover { background: rgba(239,68,68,0.08); color: #dc2626; }
    .pd-item.pd-logout:hover svg { color: #dc2626; }
  `;
  document.head.appendChild(style);
}

// ══════════════════════════════════════════════════════════
//  BUILD HTML
// ══════════════════════════════════════════════════════════
function buildDropdownHTML(user, username) {
  const displayName = username || (user.displayName ? user.displayName : user.email.split("@")[0]);
  const initial     = displayName[0].toUpperCase();
  const email       = user.email || "";
  const avatarHTML  = user.photoURL
    ? `<img src="${user.photoURL}" alt="avatar"/>`
    : initial;

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
          <div class="pd-email">${email}</div>
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
    </div>
  `;
}

// ══════════════════════════════════════════════════════════
//  OPEN / CLOSE
// ══════════════════════════════════════════════════════════
function closeDropdown() {
  const btn = document.getElementById("profile-btn");
  const dd  = document.getElementById("profile-dropdown");
  if (btn) btn.classList.remove("open");
  if (dd)  dd.classList.remove("open");
}

function toggleDropdown() {
  const dd = document.getElementById("profile-dropdown");
  if (!dd) return;
  if (dd.classList.contains("open")) {
    closeDropdown();
  } else {
    dd.classList.add("open");
    document.getElementById("profile-btn")?.classList.add("open");
  }
}

// ══════════════════════════════════════════════════════════
//  RESTORE ORIGINAL NAV BUTTONS
// ══════════════════════════════════════════════════════════
function restoreNavButtons(openModalFn) {
  // Remove profile wrap
  const wrap = document.getElementById("profile-wrap");
  if (wrap) {
    const loginBtn = document.createElement("button");
    loginBtn.className = "btn-login";
    loginBtn.textContent = "Login";
    loginBtn.addEventListener("click", () => openModalFn("login"));
    wrap.replaceWith(loginBtn);
  }

  // Show signup buttons
  document.querySelectorAll(".btn-signup").forEach(b => {
    b.style.display = "";
    b.textContent = "Sign Up";
    b.onclick = () => openModalFn("signup");
  });
}

// ══════════════════════════════════════════════════════════
//  MAIN SETUP — export this
// ══════════════════════════════════════════════════════════
export function setupProfileMenu({ user, username, signOutFn, showToastFn, openModalFn }) {
  injectProfileStyles();

  if (user) {
    // Replace login button with profile dropdown
    const loginBtns = document.querySelectorAll(".btn-login");
    if (loginBtns.length > 0) {
      const target = loginBtns[0];
      // Check if profile wrap already exists — update instead of re-create
      const existing = document.getElementById("profile-wrap");
      if (existing) {
        existing.remove();
      }
      const temp = document.createElement("div");
      temp.innerHTML = buildDropdownHTML(user, username);
      target.replaceWith(temp.firstElementChild);
    }

    // Hide signup
    document.querySelectorAll(".btn-signup").forEach(b => { b.style.display = "none"; });

    // Wire events
    const profileBtn = document.getElementById("profile-btn");
    if (profileBtn) {
      profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleDropdown();
      });
    }

    document.getElementById("pd-settings")?.addEventListener("click", () => {
      closeDropdown();
      showToastFn("⚙️ Settings — Coming soon!");
    });

    document.getElementById("pd-pricing")?.addEventListener("click", () => {
      closeDropdown();
      showToastFn("💰 Pricing — Coming soon!");
    });

    document.getElementById("pd-logout")?.addEventListener("click", async () => {
      closeDropdown();
      await signOutFn();
      showToastFn("👋 Logged out successfully!");
      restoreNavButtons(openModalFn);
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      const wrap = document.getElementById("profile-wrap");
      if (wrap && !wrap.contains(e.target)) closeDropdown();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDropdown();
    });

  } else {
    restoreNavButtons(openModalFn);
  }
}