// ═══════════════════════════════════════════════════════════
//  payment.js  —  Vnus AI | Crossmint Payment Integration
//  🔴 APNI CLIENT KEY NEECHE DAALO
// ═══════════════════════════════════════════════════════════

const CROSSMINT_CLIENT_KEY = "ck_staging_5pK9bWiYBS6aNTRZrQW1VLNvA1Vw9eDHjY66HAycGBy5DYuQTemqDGu1VqUooMdBjVjmNtr6Y6wSmos5fMw1DftRAnRShDbksq4BjEaMp3qYxy5yWHMuJvRMozckQdeiWSgzfaMHh836LCdzXcDiZfPiq3tV4yhvL11SbmcSF5r6Mvu3hAKYcLoZtf4a4h1uKuduD8aY8NAkrvdf1484Ljrd";
// 👆 Yahan apni key daalo: ck_staging_xxxxxxxxxx

const PLANS = {
  399: { title: "Junior AI Employee", description: "Entry-level AI Employee for basic task automation." },
  599: { title: "Pro AI Employee",    description: "Mid-level AI Employee for complex multi-step workflows." },
  999: { title: "Elite AI Employee",  description: "Senior-level AI Employee with zero restrictions." },
};

// ══════════════════════════════════════════════════════════
//  INJECT CROSSMINT SCRIPT
// ══════════════════════════════════════════════════════════
function loadCrossmint() {
  return new Promise((resolve) => {
    if (window.CrossmintPayButton) { resolve(); return; }
    const script = document.createElement("script");
    script.src = "https://www.crossmint.com/uikit/button/dist/client/v2-alpha/button.js";
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

// ══════════════════════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════════════════════
function injectPayStyles() {
  if (document.getElementById("pay-styles")) return;
  const s = document.createElement("style");
  s.id = "pay-styles";
  s.textContent = `
    /* Payment overlay */
    #pay-overlay {
      display:none; position:fixed; inset:0; z-index:20000;
      background:rgba(0,10,30,0.60);
      backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
      align-items:center; justify-content:center; padding:20px;
    }
    #pay-overlay.open { display:flex; animation:payFd .22s ease; }
    @keyframes payFd { from{opacity:0} to{opacity:1} }

    #pay-modal {
      background:white; border-radius:24px;
      width:100%; max-width:480px;
      box-shadow:0 32px 80px rgba(0,0,0,0.25);
      font-family:'Inter',sans-serif; overflow:hidden;
      animation:payPp .28s cubic-bezier(.22,.68,0,1.2);
    }
    @keyframes payPp {
      from{opacity:0;transform:scale(.92) translateY(16px)}
      to  {opacity:1;transform:scale(1)   translateY(0)}
    }

    /* Modal header */
    .pay-head {
      background:linear-gradient(135deg,#1a1a2e,#16213e);
      padding:24px 24px 20px; position:relative;
    }
    .pay-close {
      position:absolute; top:14px; right:16px;
      width:32px; height:32px; border-radius:50%;
      background:rgba(255,255,255,0.12); border:none;
      font-size:15px; cursor:pointer; color:white; font-weight:700;
      display:flex; align-items:center; justify-content:center;
      transition:background .15s;
    }
    .pay-close:hover { background:rgba(255,255,255,0.22); }
    .pay-head-chip {
      display:inline-flex; align-items:center; gap:5px;
      background:rgba(56,182,245,0.15); border:1px solid rgba(56,182,245,0.30);
      border-radius:50px; padding:3px 12px; font-size:11px;
      font-weight:700; color:#38b6f5; letter-spacing:1px;
      text-transform:uppercase; margin-bottom:12px;
    }
    .pay-emp-name {
      font-size:22px; font-weight:900; color:white; margin-bottom:4px;
    }
    .pay-emp-role { font-size:13px; color:rgba(255,255,255,0.50); margin-bottom:0; }

    /* Price section */
    .pay-price-row {
      display:flex; align-items:center; justify-content:space-between;
      padding:18px 24px; border-bottom:1px solid rgba(0,0,0,0.07);
      background:#fafafa;
    }
    .pay-price-label { font-size:12px; color:#aaa; font-weight:600; text-transform:uppercase; letter-spacing:1px; }
    .pay-price-amount { font-size:28px; font-weight:900; color:#111; letter-spacing:-1px; }
    .pay-price-amount span { font-size:14px; font-weight:500; color:#aaa; letter-spacing:0; }

    /* Features */
    .pay-features { padding:16px 24px; border-bottom:1px solid rgba(0,0,0,0.07); }
    .pay-feature {
      display:flex; align-items:center; gap:10px;
      font-size:13px; color:#555; margin-bottom:10px;
    }
    .pay-feature:last-child { margin-bottom:0; }
    .pay-feature-ic { font-size:15px; flex-shrink:0; }

    /* Crossmint button wrapper */
    .pay-btn-wrap { padding:20px 24px 24px; }
    .pay-btn-wrap crossmint-pay-button,
    .pay-btn-wrap button[data-crossmint] {
      width:100% !important;
      border-radius:14px !important;
      font-size:15px !important;
      font-weight:700 !important;
      padding:14px !important;
    }

    /* Secure note */
    .pay-secure {
      text-align:center; font-size:11px; color:#ccc;
      padding:0 24px 16px;
      display:flex; align-items:center; justify-content:center; gap:5px;
    }

    /* Success overlay */
    #pay-success {
      display:none; position:fixed; inset:0; z-index:20001;
      background:rgba(0,10,30,0.65); backdrop-filter:blur(20px);
      align-items:center; justify-content:center; padding:20px;
    }
    #pay-success.open { display:flex; animation:payFd .22s ease; }
    #pay-success-box {
      background:white; border-radius:24px; padding:40px 32px;
      max-width:400px; width:100%; text-align:center;
      box-shadow:0 32px 80px rgba(0,0,0,0.25);
      animation:payPp .28s cubic-bezier(.22,.68,0,1.2);
      font-family:'Inter',sans-serif;
    }
    .pay-success-icon {
      width:72px; height:72px; border-radius:50%;
      background:linear-gradient(135deg,#22c55e,#16a34a);
      display:flex; align-items:center; justify-content:center;
      font-size:34px; margin:0 auto 20px;
      box-shadow:0 8px 24px rgba(34,197,94,0.35);
    }
    .pay-success-title { font-size:22px; font-weight:900; color:#111; margin-bottom:8px; }
    .pay-success-sub   { font-size:14px; color:#888; line-height:1.5; margin-bottom:24px; }
    .pay-success-btn {
      width:100%; padding:14px; background:#1a1a2e; color:white;
      border:none; border-radius:14px; font-size:15px; font-weight:700;
      cursor:pointer; font-family:'Inter',sans-serif;
      transition:opacity .15s;
    }
    .pay-success-btn:hover { opacity:.88; }

    /* AI Employee card in dashboard */
    .hired-emp-card {
      background:white; border-radius:16px; padding:16px 18px;
      display:flex; align-items:center; gap:14px;
      box-shadow:0 2px 12px rgba(0,0,0,0.07);
      margin-bottom:12px; animation:empCardIn .4s cubic-bezier(.22,.68,0,1.2);
    }
    @keyframes empCardIn {
      from{opacity:0;transform:translateY(12px)}
      to  {opacity:1;transform:translateY(0)}
    }
    .hired-emp-avatar {
      width:48px; height:48px; border-radius:13px;
      background:linear-gradient(135deg,#38b6f5,#0ea5e9);
      display:flex; align-items:center; justify-content:center;
      font-size:22px; flex-shrink:0;
    }
    .hired-emp-info { flex:1; }
    .hired-emp-name { font-size:15px; font-weight:700; color:#111; margin-bottom:2px; }
    .hired-emp-role { font-size:12px; color:#38b6f5; margin-bottom:2px; }
    .hired-emp-plan { font-size:11px; color:#bbb; }
    .hired-emp-status {
      display:flex; align-items:center; gap:5px;
      font-size:12px; font-weight:600; color:#22c55e;
      background:rgba(34,197,94,0.10); border-radius:50px;
      padding:4px 10px; flex-shrink:0;
    }
    .hired-emp-status::before {
      content:''; width:6px; height:6px; border-radius:50%;
      background:#22c55e; animation:statusPulse 1.5s ease infinite;
    }
    @keyframes statusPulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  `;
  document.head.appendChild(s);
}

// ══════════════════════════════════════════════════════════
//  INJECT HTML
// ══════════════════════════════════════════════════════════
function injectPayHTML() {
  if (document.getElementById("pay-overlay")) return;
  document.body.insertAdjacentHTML("beforeend", `

    <!-- Payment Modal -->
    <div id="pay-overlay">
      <div id="pay-modal">
        <div class="pay-head">
          <button class="pay-close" id="pay-close">✕</button>
          <div class="pay-head-chip">⚡ Hire Now</div>
          <div class="pay-emp-name" id="pay-emp-name">Pro AI Employee</div>
          <div class="pay-emp-role" id="pay-emp-role">Mid Level · Monthly subscription</div>
        </div>

        <div class="pay-price-row">
          <div class="pay-price-label">Monthly Salary</div>
          <div class="pay-price-amount" id="pay-price">$599<span>/mo</span></div>
        </div>

        <div class="pay-features">
          <div class="pay-feature"><span class="pay-feature-ic">✅</span>Starts working immediately after payment</div>
          <div class="pay-feature"><span class="pay-feature-ic">✅</span>Cancel anytime — no long-term contract</div>
          <div class="pay-feature"><span class="pay-feature-ic">✅</span>7-day money back guarantee</div>
          <div class="pay-feature"><span class="pay-feature-ic">✅</span>Secure payment via Crossmint</div>
        </div>

        <div class="pay-btn-wrap" id="pay-btn-wrap">
          <!-- Crossmint button injected here -->
        </div>

        <div class="pay-secure">🔒 Secured by Crossmint · Card & Crypto accepted</div>
      </div>
    </div>

    <!-- Success Screen -->
    <div id="pay-success">
      <div id="pay-success-box">
        <div class="pay-success-icon">🎉</div>
        <div class="pay-success-title">Employee Hired!</div>
        <div class="pay-success-sub" id="pay-success-sub">
          Your AI Employee is now active and ready to work!
        </div>
        <button class="pay-success-btn" id="pay-success-btn">
          View My AI Employees →
        </button>
      </div>
    </div>
  `);

  // Events
  document.getElementById("pay-close").onclick = closePayment;
  document.getElementById("pay-overlay").onclick = e => {
    if (e.target === document.getElementById("pay-overlay")) closePayment();
  };
  document.getElementById("pay-success-btn").onclick = () => {
    document.getElementById("pay-success").classList.remove("open");
    // Scroll to employees section
    document.querySelector(".emp-section")?.scrollIntoView({ behavior:"smooth" });
  };
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closePayment();
  });
}

// ══════════════════════════════════════════════════════════
//  OPEN PAYMENT
// ══════════════════════════════════════════════════════════
async function openPayment(empName, empRole, price, empEmoji) {
  empEmoji = empEmoji || "🤖";
  injectPayStyles();
  injectPayHTML();
  await loadCrossmint();

  // Set modal content
  document.getElementById("pay-emp-name").textContent = empName;
  document.getElementById("pay-emp-role").textContent = `${empRole} · Monthly subscription`;
  document.getElementById("pay-price").innerHTML = `$${price}<span>/mo</span>`;

  // Build Crossmint button
  const wrap = document.getElementById("pay-btn-wrap");
  wrap.innerHTML = "";

  const btn = document.createElement("crossmint-pay-button");
  btn.setAttribute("clientId",         CROSSMINT_CLIENT_KEY);
  btn.setAttribute("mintTo",           "email");
  btn.setAttribute("environment",      "staging");
  btn.setAttribute("paymentMethods",   "fiat,ETH,SOL");
  btn.setAttribute("currency",         "usd");
  btn.setAttribute("locale",           "en-US");
  btn.setAttribute("mintConfig", JSON.stringify({
    type:        "erc-721",
    totalPrice:  String(price),
    title:       empName,
    description: PLANS[price]?.description || `${empName} - Monthly Plan`,
  }));

  // Success callback
  btn.addEventListener("payment:completed", (e) => {
    closePayment();
    handlePaymentSuccess(empName, empRole, price, e.detail);
  });

  wrap.appendChild(btn);

  // Show modal
  document.getElementById("pay-overlay").classList.add("open");
}

function closePayment() {
  document.getElementById("pay-overlay")?.classList.remove("open");
}

// ══════════════════════════════════════════════════════════
//  PAYMENT SUCCESS — Add to Dashboard
// ══════════════════════════════════════════════════════════
function handlePaymentSuccess(empName, empRole, price, paymentData) {
  // Show success modal
  const planLabel = price === 399 ? "Junior" : price === 599 ? "Pro" : "Elite";
  document.getElementById("pay-success-sub").textContent =
    `${empName} is now active and working for you! Check your AI Employees below.`;
  document.getElementById("pay-success").classList.add("open");

  // Add to "Your AI Employees" section
  addEmployeeToBoard(empName, empRole, planLabel, price, empEmoji);

  // Save to localStorage (Firebase integration baad mein)
  saveEmployee({ name:empName, role:empRole, plan:planLabel, price, hiredAt: new Date().toISOString() });

  // Toast
  showToast(`🎉 ${empName} hired successfully!`);
}

// ══════════════════════════════════════════════════════════
//  ADD EMPLOYEE CARD TO DASHBOARD
// ══════════════════════════════════════════════════════════
function addEmployeeToBoard(name, role, plan, price, emoji) {
  emoji = emoji || (plan === "Junior" ? "🧑‍💻" : plan === "Pro" ? "👨‍💼" : "🧠");
  const empSection = document.querySelector(".emp-section");
  if (!empSection) return;

  // Remove empty state if exists
  const emptyState = empSection.querySelector(".emp-empty");
  if (emptyState) emptyState.style.display = "none";

  // Get or create cards container
  let cardsWrap = document.getElementById("hired-emp-list");
  if (!cardsWrap) {
    cardsWrap = document.createElement("div");
    cardsWrap.id = "hired-emp-list";
    cardsWrap.style.padding = "0 4px";
    empSection.querySelector(".emp-box").appendChild(cardsWrap);
  }



  const card = document.createElement("div");
  card.className = "hired-emp-card";
  card.innerHTML = `
    <div class="hired-emp-avatar">${emoji}</div>
    <div class="hired-emp-info">
      <div class="hired-emp-name">${name}</div>
      <div class="hired-emp-role">${role}</div>
      <div class="hired-emp-plan">${plan} Plan · $${price}/mo</div>
    </div>
    <div class="hired-emp-status">Active</div>
  `;
  cardsWrap.appendChild(card);
}

// ══════════════════════════════════════════════════════════
//  SAVE & LOAD FROM LOCALSTORAGE
// ══════════════════════════════════════════════════════════
function saveEmployee(emp) {
  try {
    const existing = JSON.parse(localStorage.getItem("vnus_employees") || "[]");
    existing.push(emp);
    localStorage.setItem("vnus_employees", JSON.stringify(existing));
  } catch(e) {}
}

function loadSavedEmployees() {
  try {
    const saved = JSON.parse(localStorage.getItem("vnus_employees") || "[]");
    saved.forEach(emp => {
      addEmployeeToBoard(emp.name, emp.role, emp.plan, emp.price);
    });
  } catch(e) {}
}

// ══════════════════════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById("vnus-toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3500);
}

// ══════════════════════════════════════════════════════════
//  EXPOSE GLOBALLY — ai-employee.js se call hoga
// ══════════════════════════════════════════════════════════
// Main function called by ai-employee.js
window.vnusOpenPayment = function(name, role, price, emoji) {
  openPayment(name, role, parseInt(price), emoji);
};

// Fallback
window.vnusHire = function(name, price, emoji, role, level) {
  openPayment(name, role || level || "AI Employee", parseInt(price), emoji || "🤖");
};

// ══════════════════════════════════════════════════════════
//  INIT — load saved employees on page load
// ══════════════════════════════════════════════════════════
function init() {
  injectPayStyles();
  injectPayHTML();

  // Load previously hired employees
  setTimeout(loadSavedEmployees, 800);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  setTimeout(init, 300);
}