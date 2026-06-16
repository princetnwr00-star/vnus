// ═══════════════════════════════════════════════════════════
//  ai-employee.js  —  Vnus AI Employee Flow
//  3 Popups: Role Brief → Loading → 3 Candidates
// ═══════════════════════════════════════════════════════════

// ── Keywords to detect AI employee request ──────────────
const HIRE_WORDS = [
  "hire","build","create","make","need","want","get","find","setup",
  "set up","assign","deploy","launch","start","i need","i want",
  "automate","automation","agent","employee","worker","bot",
  "scraper","writer","manager","analyst","researcher","creator",
  "marketer","recruiter","coach","outreach","scheduler","assistant",
  "youtube","dropshipping","shopify","amazon","etsy","crypto",
  "real estate","social media","email","seo","ads","content","sales",
  "support","lead","invoice","bookkeeper","developer","designer",
  "cold email","linkedin","twitter","tiktok","instagram","facebook",
];

const NOT_HIRE = [
  "hello","hi","hey","thanks","thank you","how are","what is",
  "who are","tell me","explain","what does","how does","good morning",
  "good evening","good afternoon","whats up","what's up",
];

function isValidOrder(text) {
  const low = text.toLowerCase();
  if (NOT_HIRE.some(w => low.includes(w))) return false;
  return HIRE_WORDS.some(w => low.includes(w));
}

// ── Suggest examples based on input ─────────────────────
const SUGGESTIONS = [
  "lead scraper for real estate agents in NYC",
  "cold email outreach for B2B SaaS founders",
  "calendar scheduler that books discovery calls",
  "wingman that drafts replies on dating apps",
  "YouTube automation agent for faceless channels",
  "dropshipping product researcher for TikTok",
  "LinkedIn outreach agent for recruiters",
  "SEO content writer for e-commerce brands",
];

// ── AI Employee data generator based on brief ───────────
function generateCandidates(brief) {
  const low = brief.toLowerCase();

  // Detect category
  let category = "General";
  let emoji1 = "🔍", emoji2 = "📊", emoji3 = "🤖";
  let skills1 = [], skills2 = [], skills3 = [];
  let name1 = "", name2 = "", name3 = "";
  let desc1 = "", desc2 = "", desc3 = "";

  if (low.includes("lead") || low.includes("scraper") || low.includes("prospect")) {
    category = "Lead Generation";
    emoji1 = "🔍"; emoji2 = "📈"; emoji3 = "🎯";
    name1 = "Lead Scout";
    name2 = "Prospect Researcher";
    name3 = "Lead Extraction Architect";
    desc1 = "Scours LinkedIn and directories to find basic leads using simple filters. Exports clean lists to Google Sheets automatically.";
    desc2 = "Extracts verified contact data and firmographic details like funding stage, tech stack, and company size for precise targeting.";
    desc3 = "Builds fully automated custom scrapers to find high-intent prospects based on specific behavioral signals and intent data.";
    skills1 = ["LinkedIn Basic","Google Sheets","Data Cleaning","CSV Export"];
    skills2 = ["Email Verification","BuiltWith Integration","Crunchbase Pro","CRM Syncing","Lead Scoring"];
    skills3 = ["Custom Web Scraping","Intent Data Analysis","Clay Workflow","API Integrations","Database Enrichment"];
  } else if (low.includes("email") || low.includes("outreach") || low.includes("cold")) {
    category = "Email Outreach";
    emoji1 = "✉️"; emoji2 = "🚀"; emoji3 = "⚡";
    name1 = "Cold Email Starter";
    name2 = "Outreach Specialist";
    name3 = "Email Automation Architect";
    desc1 = "Writes and sends basic cold email campaigns with simple personalization. Tracks opens and replies in a spreadsheet.";
    desc2 = "Runs multi-step email sequences with smart follow-ups, A/B testing, and automatic reply detection across platforms.";
    desc3 = "Builds fully autonomous outreach systems that personalize at scale, book meetings, and update your CRM with zero manual input.";
    skills1 = ["Gmail","Basic Templates","Open Tracking","CSV Lists"];
    skills2 = ["Instantly.ai","Spintax","A/B Testing","Reply Detection","CRM Sync"];
    skills3 = ["Clay + Smartlead","AI Personalization","Meeting Booking","Pipeline Management","Revenue Tracking"];
  } else if (low.includes("youtube") || low.includes("video") || low.includes("channel")) {
    category = "YouTube Automation";
    emoji1 = "🎬"; emoji2 = "📹"; emoji3 = "🏆";
    name1 = "YouTube Content Helper";
    name2 = "YouTube Growth Agent";
    name3 = "YouTube Automation Architect";
    desc1 = "Researches video ideas, writes basic scripts, and creates descriptions with relevant hashtags for your channel.";
    desc2 = "Manages your full content calendar, optimizes SEO, creates thumbnails briefs, and schedules posts automatically.";
    desc3 = "Runs a fully autonomous YouTube operation — from trend research to publishing. Grows channels on complete autopilot.";
    skills1 = ["Script Writing","Basic SEO","Description Writing","Hashtags"];
    skills2 = ["VidIQ","TubeBuddy","Thumbnail Briefs","Analytics","Scheduling"];
    skills3 = ["Full Automation","Trend Detection","A/B Thumbnails","Monetization","Channel Analytics"];
  } else if (low.includes("social") || low.includes("instagram") || low.includes("tiktok") || low.includes("twitter")) {
    category = "Social Media";
    emoji1 = "📱"; emoji2 = "🌟"; emoji3 = "💫";
    name1 = "Social Media Poster";
    name2 = "Social Growth Manager";
    name3 = "Social Media Automation Pro";
    desc1 = "Creates and schedules basic social media posts across your platforms with relevant hashtags and captions.";
    desc2 = "Manages your full social presence — creates content, engages with followers, analyzes performance, and grows your audience.";
    desc3 = "Builds a fully automated social media engine that creates viral content, engages at scale, and drives measurable business results.";
    skills1 = ["Post Creation","Scheduling","Basic Hashtags","Caption Writing"];
    skills2 = ["Buffer","Hootsuite","Content Calendar","Engagement","Analytics"];
    skills3 = ["AI Content Creation","Viral Strategies","Influencer Outreach","Ad Management","ROI Tracking"];
  } else if (low.includes("dropshipping") || low.includes("shopify") || low.includes("ecommerce") || low.includes("product")) {
    category = "Ecommerce";
    emoji1 = "📦"; emoji2 = "🛒"; emoji3 = "💰";
    name1 = "Product Scout";
    name2 = "Dropshipping Manager";
    name3 = "Ecommerce Automation Architect";
    desc1 = "Researches trending products on AliExpress and TikTok. Finds winning items with good margins for your store.";
    desc2 = "Manages your store end-to-end — product listings, supplier communication, order processing, and customer queries.";
    desc3 = "Builds a fully automated dropshipping operation from product research to fulfillment with zero manual intervention.";
    skills1 = ["AliExpress Research","Trend Detection","Margin Analysis","Product Listings"];
    skills2 = ["Shopify","CJDropshipping","Order Processing","Customer Support","Inventory"];
    skills3 = ["Full Automation","Multi-Store Management","Ad Scaling","Supplier Network","Profit Optimization"];
  } else if (low.includes("schedule") || low.includes("calendar") || low.includes("booking") || low.includes("appointment")) {
    category = "Scheduling";
    emoji1 = "📅"; emoji2 = "🗓️"; emoji3 = "⚙️";
    name1 = "Basic Scheduler";
    name2 = "Calendar Manager";
    name3 = "Scheduling Automation Pro";
    desc1 = "Manages your calendar, books basic appointments, and sends reminders to reduce no-shows automatically.";
    desc2 = "Handles complex scheduling across time zones, qualifies leads before booking, and syncs with your CRM in real time.";
    desc3 = "Builds a fully automated booking pipeline that qualifies, schedules, follows up, and fills your calendar on autopilot.";
    skills1 = ["Calendly","Email Reminders","Basic Booking","Calendar Sync"];
    skills2 = ["Zoom Integration","Lead Qualification","CRM Sync","Multi-timezone","Follow-ups"];
    skills3 = ["Full Pipeline Automation","AI Qualification","Payment Integration","No-show Recovery","Revenue Tracking"];
  } else {
    // Generic
    name1 = "AI Task Assistant";
    name2 = "AI Operations Agent";
    name3 = "AI Automation Architect";
    emoji1 = "🤖"; emoji2 = "⚡"; emoji3 = "🧠";
    desc1 = "Handles basic, repetitive tasks related to your request. Simple, fast, and reliable for everyday automation needs.";
    desc2 = "Manages complex multi-step workflows for your use case with smart decision-making and tool integrations.";
    desc3 = "Builds a fully autonomous AI system tailored exactly to your needs with zero restrictions and maximum output quality.";
    skills1 = ["Task Automation","Basic Workflows","Reporting","Data Entry"];
    skills2 = ["Advanced Automation","API Connections","Smart Decisions","CRM Integration","Analytics"];
    skills3 = ["Full Autonomy","Custom AI Agents","Enterprise Integrations","Dedicated Support","Custom Development"];
  }

  return [
    { level:"JUNIOR", popular:false, emoji:emoji1, name:name1, desc:desc1, skills:skills1, price:399 },
    { level:"MID",    popular:true,  emoji:emoji2, name:name2, desc:desc2, skills:skills2, price:599 },
    { level:"SENIOR", popular:false, emoji:emoji3, name:name3, desc:desc3, skills:skills3, price:999 },
  ];
}

// ══════════════════════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════════════════════
function injectStyles() {
  if (document.getElementById("ae-styles")) return;
  const s = document.createElement("style");
  s.id = "ae-styles";
  s.textContent = `
    /* ── Shared overlay ── */
    .ae-ov {
      display:none; position:fixed; inset:0; z-index:10000;
      background:rgba(0,20,60,0.55);
      backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
      align-items:center; justify-content:center; padding:20px;
    }
    .ae-ov.open { display:flex; animation:aeOvIn .22s ease; }
    @keyframes aeOvIn { from{opacity:0} to{opacity:1} }

    /* ── Shared modal ── */
    .ae-modal {
      background:#f0f2f5;
      border-radius:24px; width:100%; max-width:640px;
      box-shadow:0 32px 80px rgba(0,0,0,0.22);
      font-family:'Inter',sans-serif; overflow:hidden;
      animation:aeMdIn .28s cubic-bezier(.22,.68,0,1.2);
    }
    @keyframes aeMdIn {
      from{opacity:0;transform:scale(.93) translateY(16px)}
      to  {opacity:1;transform:scale(1)   translateY(0)}
    }

    /* ══ POPUP 1 — Role Brief ══════════════════════════════ */
    #ae-brief-modal { padding:28px 28px 24px; }

    .ae-brief-head {
      display:flex; align-items:center; gap:14px;
      margin-bottom:24px; position:relative;
    }
    .ae-brief-icon {
      width:52px; height:52px; border-radius:14px;
      background:linear-gradient(135deg,#ff6b6b,#ee5a24);
      display:flex; align-items:center; justify-content:center;
      font-size:24px; flex-shrink:0;
      box-shadow:0 4px 16px rgba(238,90,36,0.35);
    }
    .ae-brief-head-text h2 {
      font-size:20px; font-weight:800; color:#111; margin:0 0 3px;
    }
    .ae-brief-head-text p {
      font-size:13px; color:#888; margin:0;
    }
    .ae-close-x {
      position:absolute; top:0; right:0;
      width:36px; height:36px; border-radius:50%;
      background:white; border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      font-size:16px; color:#666; font-weight:700;
      box-shadow:0 2px 8px rgba(0,0,0,0.10);
      transition:background .15s;
    }
    .ae-close-x:hover { background:#f5f5f5; }

    .ae-brief-label {
      font-size:11px; font-weight:700; letter-spacing:1.4px;
      color:#aaa; text-transform:uppercase; margin-bottom:10px;
    }

    .ae-brief-textarea {
      width:100%; min-height:100px; background:white;
      border:none; outline:none; border-radius:16px;
      padding:16px 18px; font-size:15px;
      font-family:'Inter',sans-serif; color:#111;
      resize:none; line-height:1.5; box-sizing:border-box;
      box-shadow:0 2px 12px rgba(0,0,0,0.06);
    }
    .ae-brief-textarea::placeholder { color:#ccc; }

    .ae-ortry {
      font-size:11px; font-weight:700; letter-spacing:1.4px;
      color:#aaa; text-transform:uppercase;
      margin:18px 0 10px;
    }
    .ae-suggestions {
      display:flex; flex-wrap:wrap; gap:8px; margin-bottom:22px;
    }
    .ae-sug-chip {
      background:white; border:none; border-radius:50px;
      padding:8px 14px; font-size:13px; color:#333;
      cursor:pointer; font-family:'Inter',sans-serif;
      box-shadow:0 2px 8px rgba(0,0,0,0.07);
      transition:background .15s, transform .12s;
    }
    .ae-sug-chip:hover { background:#f0f8ff; transform:translateY(-1px); }

    .ae-arch-btn {
      width:100%; padding:16px; background:#1a1a2e;
      color:white; border:none; border-radius:16px;
      font-size:16px; font-weight:700; cursor:pointer;
      font-family:'Inter',sans-serif;
      display:flex; align-items:center; justify-content:center; gap:10px;
      transition:opacity .15s, transform .12s;
    }
    .ae-arch-btn:hover { opacity:.9; transform:translateY(-1px); }
    .ae-arch-btn:disabled { opacity:.5; cursor:not-allowed; transform:none; }

    /* ══ POPUP 2 — Loading ══════════════════════════════════ */
    #ae-load-modal { padding:40px 32px 44px; text-align:center; }

    .ae-brain-wrap {
      width:120px; height:120px; margin:0 auto 28px;
      position:relative; display:flex;
      align-items:center; justify-content:center;
    }
    .ae-brain-glow {
      position:absolute; inset:-20px; border-radius:50%;
      background:radial-gradient(circle, rgba(255,107,107,0.25) 0%, rgba(238,90,36,0.10) 50%, transparent 70%);
      animation:aeGlowPulse 2s ease-in-out infinite;
    }
    @keyframes aeGlowPulse {
      0%,100%{ transform:scale(1); opacity:0.7; }
      50%    { transform:scale(1.15); opacity:1; }
    }
    .ae-brain-circle {
      width:90px; height:90px; border-radius:50%;
      background:linear-gradient(135deg,#ff6b6b,#ee5a24,#c0392b);
      display:flex; align-items:center; justify-content:center;
      font-size:38px; position:relative; z-index:1;
      box-shadow:0 8px 32px rgba(238,90,36,0.45);
      animation:aeCirclePulse 2s ease-in-out infinite;
    }
    @keyframes aeCirclePulse {
      0%,100%{ transform:scale(1); box-shadow:0 8px 32px rgba(238,90,36,0.45); }
      50%    { transform:scale(1.06); box-shadow:0 12px 40px rgba(238,90,36,0.65); }
    }

    .ae-load-title {
      font-size:20px; font-weight:800; color:#111; margin-bottom:6px;
    }
    .ae-load-brief {
      font-size:13px; color:#aaa; font-style:italic; margin-bottom:28px;
    }

    .ae-steps { list-style:none; padding:0; margin:0; }
    .ae-step {
      display:flex; align-items:center; gap:14px;
      background:white; border-radius:14px;
      padding:14px 18px; margin-bottom:10px;
      box-shadow:0 2px 8px rgba(0,0,0,0.06);
      transition:all .3s; opacity:0.45;
    }
    .ae-step.step-done {
      background:#f0fdf4; opacity:1;
    }
    .ae-step.step-active {
      background:white; opacity:1;
      box-shadow:0 4px 16px rgba(0,0,0,0.10);
    }
    .ae-step.step-pending { opacity:0.35; }

    .ae-step-ic {
      width:34px; height:34px; border-radius:50%; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
      font-size:15px;
    }
    .step-done  .ae-step-ic { background:#22c55e; }
    .step-active .ae-step-ic { background:#1a1a2e; animation:aeStepSpin 1s linear infinite; }
    .step-pending .ae-step-ic { background:rgba(0,0,0,0.08); }
    @keyframes aeStepSpin {
      0%,100%{ transform:scale(1); }
      50%    { transform:scale(1.1); }
    }

    .ae-step-text {
      font-size:14px; font-weight:600; color:#333;
      font-family:'Inter',sans-serif;
    }
    .step-done .ae-step-text   { color:#16a34a; }
    .step-active .ae-step-text { color:#111; }
    .step-pending .ae-step-text { color:#bbb; }

    /* ══ POPUP 3 — 3 Candidates ════════════════════════════ */
    #ae-result-ov { z-index:10001; }
    #ae-result-modal {
      max-width:900px; background:#f0f2f5;
      padding:0; border-radius:24px; overflow:hidden;
    }

    .ae-result-head {
      display:flex; align-items:center; justify-content:space-between;
      padding:22px 24px 18px; background:#f0f2f5;
    }
    .ae-result-head-left { display:flex; align-items:center; gap:14px; }
    .ae-result-check {
      width:42px; height:42px; border-radius:50%;
      background:#22c55e; display:flex; align-items:center;
      justify-content:center; font-size:20px;
      box-shadow:0 4px 14px rgba(34,197,94,0.35);
    }
    .ae-result-title { font-size:20px; font-weight:800; color:#111; margin:0 0 2px; }
    .ae-result-sub   { font-size:13px; color:#888; margin:0; }
    .ae-result-head-right { display:flex; align-items:center; gap:10px; }
    .ae-rebrief-btn {
      background:white; border:none; border-radius:50px;
      padding:9px 16px; font-size:13px; font-weight:600; color:#555;
      cursor:pointer; font-family:'Inter',sans-serif;
      box-shadow:0 2px 8px rgba(0,0,0,0.08);
      display:flex; align-items:center; gap:6px;
    }
    .ae-rebrief-btn:hover { background:#f5f5f5; }
    .ae-result-close {
      width:36px; height:36px; border-radius:50%;
      background:white; border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      font-size:16px; color:#666; font-weight:700;
      box-shadow:0 2px 8px rgba(0,0,0,0.10);
    }
    .ae-result-close:hover { background:#f5f5f5; }

    /* Candidate cards */
    .ae-candidates {
      display:grid; grid-template-columns:repeat(3,1fr);
      gap:14px; padding:0 18px 20px;
    }
    @media(max-width:640px) { .ae-candidates { grid-template-columns:1fr; } }

    .ae-cand-card {
      background:white; border-radius:18px; padding:20px 18px;
      display:flex; flex-direction:column; position:relative;
      box-shadow:0 2px 12px rgba(0,0,0,0.07);
    }
    .ae-cand-card.popular-card {
      border:2px solid #ff6b35;
    }

    .ae-popular-tag {
      position:absolute; top:-1px; left:50%; transform:translateX(-50%);
      background:linear-gradient(90deg,#ff6b35,#ee5a24);
      color:white; font-size:10px; font-weight:800;
      padding:3px 14px; border-radius:0 0 12px 12px;
      letter-spacing:.8px; text-transform:uppercase; white-space:nowrap;
    }

    .ae-cand-top {
      display:flex; align-items:flex-start;
      justify-content:space-between; margin-bottom:12px; margin-top:8px;
    }
    .ae-cand-avatar {
      width:52px; height:52px; border-radius:14px;
      background:#f0f2f5; display:flex;
      align-items:center; justify-content:center; font-size:26px;
    }
    .ae-cand-level {
      font-size:10px; font-weight:800; letter-spacing:1px;
      color:#aaa; text-transform:uppercase;
      background:#f0f2f5; padding:4px 10px; border-radius:20px;
    }

    .ae-cand-name {
      font-size:16px; font-weight:800; color:#111; margin-bottom:6px; line-height:1.2;
    }
    .ae-cand-desc {
      font-size:12px; color:#777; line-height:1.5; margin-bottom:12px; flex:1;
    }
    .ae-cand-skills {
      display:flex; flex-wrap:wrap; gap:5px; margin-bottom:14px;
    }
    .ae-skill-tag {
      font-size:11px; color:#38b6f5; background:rgba(56,182,245,0.10);
      border-radius:6px; padding:3px 8px; font-weight:500;
    }

    .ae-cand-divider { height:1px; background:#f0f2f5; margin-bottom:12px; }

    .ae-cand-salary-label {
      font-size:10px; font-weight:700; letter-spacing:1px;
      color:#bbb; text-transform:uppercase; margin-bottom:3px;
    }
    .ae-cand-price {
      font-size:22px; font-weight:900; color:#111;
      letter-spacing:-0.5px; margin-bottom:12px;
    }
    .ae-cand-price span { font-size:13px; font-weight:500; color:#aaa; }

    .ae-hire-btn {
      width:100%; padding:13px; background:#1a1a2e;
      color:white; border:none; border-radius:12px;
      font-size:14px; font-weight:700; cursor:pointer;
      font-family:'Inter',sans-serif;
      display:flex; align-items:center; justify-content:center; gap:8px;
      transition:opacity .15s, transform .12s;
    }
    .ae-hire-btn:hover { opacity:.88; transform:translateY(-1px); }
  `;
  document.head.appendChild(s);
}

// ══════════════════════════════════════════════════════════
//  INJECT HTML
// ══════════════════════════════════════════════════════════
function injectHTML() {
  if (document.getElementById("ae-brief-ov")) return;

  document.body.insertAdjacentHTML("beforeend", `

    <!-- POPUP 1: Role Brief -->
    <div class="ae-ov" id="ae-brief-ov">
      <div class="ae-modal" id="ae-brief-modal">
        <div class="ae-brief-head">
          <div class="ae-brief-icon">⚡</div>
          <div class="ae-brief-head-text">
            <h2>Hire an AI Employee</h2>
            <p>Describe the role. We'll architect 3 candidates in seconds.</p>
          </div>
          <button class="ae-close-x" id="ae-brief-close">✕</button>
        </div>

        <div class="ae-brief-label">Role Brief</div>
        <textarea class="ae-brief-textarea" id="ae-brief-input"
          placeholder="e.g. Lead scraper for B2B SaaS founders"></textarea>

        <div class="ae-ortry">Or Try</div>
        <div class="ae-suggestions" id="ae-suggestions"></div>

        <button class="ae-arch-btn" id="ae-arch-btn">
          ⚡ Architect 3 candidates →
        </button>
      </div>
    </div>

    <!-- POPUP 2: Loading -->
    <div class="ae-ov" id="ae-load-ov">
      <div class="ae-modal" id="ae-load-modal">
        <div class="ae-brain-wrap">
          <div class="ae-brain-glow"></div>
          <div class="ae-brain-circle">🧠</div>
        </div>
        <div class="ae-load-title">Architecting your employee</div>
        <div class="ae-load-brief" id="ae-load-brief"></div>
        <ul class="ae-steps">
          <li class="ae-step step-pending" id="ae-step-1">
            <div class="ae-step-ic">🔍</div>
            <span class="ae-step-text">Researching the role</span>
          </li>
          <li class="ae-step step-pending" id="ae-step-2">
            <div class="ae-step-ic">🎨</div>
            <span class="ae-step-text">Designing skill profiles</span>
          </li>
          <li class="ae-step step-pending" id="ae-step-3">
            <div class="ae-step-ic">✏️</div>
            <span class="ae-step-text">Drafting 3 candidates</span>
          </li>
          <li class="ae-step step-pending" id="ae-step-4">
            <div class="ae-step-ic">✨</div>
            <span class="ae-step-text">Polishing presentation</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- POPUP 3: 3 Candidates -->
    <div class="ae-ov" id="ae-result-ov">
      <div class="ae-modal" id="ae-result-modal">
        <div class="ae-result-head">
          <div class="ae-result-head-left">
            <div class="ae-result-check">✓</div>
            <div>
              <div class="ae-result-title">3 candidates ready</div>
              <div class="ae-result-sub">Pick the one you want to hire.</div>
            </div>
          </div>
          <div class="ae-result-head-right">
            <button class="ae-rebrief-btn" id="ae-rebrief-btn">← Re-brief</button>
            <button class="ae-result-close" id="ae-result-close">✕</button>
          </div>
        </div>
        <div class="ae-candidates" id="ae-candidates"></div>
      </div>
    </div>
  `);
}

// ══════════════════════════════════════════════════════════
//  STEP ANIMATION
// ══════════════════════════════════════════════════════════
function runSteps(cb) {
  let i = 0;
  const steps = ["ae-step-1","ae-step-2","ae-step-3","ae-step-4"];
  const icons  = ["✓","✓","✓","✓"];

  function next() {
    if (i > 0) {
      const prev = document.getElementById(steps[i-1]);
      if (prev) {
        prev.className = "ae-step step-done";
        prev.querySelector(".ae-step-ic").textContent = "✓";
        prev.querySelector(".ae-step-ic").style.color = "white";
      }
    }
    if (i < steps.length) {
      const cur = document.getElementById(steps[i]);
      if (cur) cur.className = "ae-step step-active";
      i++;
      setTimeout(next, 750);
    } else {
      setTimeout(cb, 400);
    }
  }
  next();
}

// ══════════════════════════════════════════════════════════
//  BUILD CANDIDATE CARDS
// ══════════════════════════════════════════════════════════
function buildCards(candidates, brief) {
  return candidates.map((c, idx) => `
    <div class="ae-cand-card ${c.popular ? 'popular-card' : ''}">
      ${c.popular ? '<div class="ae-popular-tag">POPULAR</div>' : ''}
      <div class="ae-cand-top">
        <div class="ae-cand-avatar">${c.emoji}</div>
        <div class="ae-cand-level">${c.level}</div>
      </div>
      <div class="ae-cand-name">${c.name}</div>
      <div class="ae-cand-desc">${c.desc}</div>
      <div class="ae-cand-skills">
        ${c.skills.map(s => `<span class="ae-skill-tag">${s}</span>`).join("")}
      </div>
      <div class="ae-cand-divider"></div>
      <div class="ae-cand-salary-label">Salary</div>
      <div class="ae-cand-price">$${c.price}<span>/mo</span></div>
      <button class="ae-hire-btn" onclick="window.vnusHireEmployee('${c.name}','${c.price}')">
        Hire →
      </button>
    </div>
  `).join("");
}

// ══════════════════════════════════════════════════════════
//  OPEN / CLOSE
// ══════════════════════════════════════════════════════════
function openBriefPopup(prefill) {
  injectStyles();
  injectHTML();

  // Fill suggestions
  const sugDiv = document.getElementById("ae-suggestions");
  sugDiv.innerHTML = SUGGESTIONS.slice(0,4).map(s =>
    `<button class="ae-sug-chip">${s}</button>`
  ).join("");

  sugDiv.querySelectorAll(".ae-sug-chip").forEach(btn => {
    btn.onclick = () => {
      document.getElementById("ae-brief-input").value = btn.textContent;
    };
  });

  if (prefill) document.getElementById("ae-brief-input").value = prefill;

  document.getElementById("ae-brief-ov").classList.add("open");
  setTimeout(() => document.getElementById("ae-brief-input").focus(), 300);
}

function closeAll() {
  ["ae-brief-ov","ae-load-ov","ae-result-ov"].forEach(id => {
    document.getElementById(id)?.classList.remove("open");
  });
}

// ══════════════════════════════════════════════════════════
//  HIRE HANDLER
// ══════════════════════════════════════════════════════════
window.vnusHireEmployee = function(name, price) {
  closeAll();
  const t = document.getElementById("vnus-toast");
  if (t) {
    t.textContent = `🎉 ${name} hired! Payment coming soon.`;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3500);
  }
};

// ══════════════════════════════════════════════════════════
//  MAIN PROCESS
// ══════════════════════════════════════════════════════════
function processOrder(text, isLoggedIn) {
  if (!text.trim()) return;

  // Not logged in — show auth modal
  if (!isLoggedIn) {
    if (window.openModal) window.openModal("signup");
    return;
  }

  // Not a valid AI employee order
  if (!isValidOrder(text)) {
    const t = document.getElementById("vnus-toast");
    if (t) {
      t.textContent = "🤖 Please describe an AI Employee you want to hire!";
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), 3500);
    }
    return;
  }

  // Valid — open brief popup with prefill
  openBriefPopup(text);
}

// ══════════════════════════════════════════════════════════
//  WIRE EVENTS
// ══════════════════════════════════════════════════════════
function wireEvents() {
  // Popup 1 — close
  document.addEventListener("click", e => {
    if (e.target?.id === "ae-brief-close") closeAll();
    if (e.target?.id === "ae-brief-ov") closeAll();
  });

  // Popup 1 — Architect button
  document.addEventListener("click", e => {
    if (e.target?.id !== "ae-arch-btn") return;
    const brief = document.getElementById("ae-brief-input")?.value.trim();
    if (!brief) {
      document.getElementById("ae-brief-input")?.focus();
      return;
    }

    // Close brief, open loading
    document.getElementById("ae-brief-ov").classList.remove("open");
    document.getElementById("ae-load-ov").classList.add("open");

    // Set brief text
    document.getElementById("ae-load-brief").textContent = `"${brief}"`;

    // Reset steps
    for (let i=1; i<=4; i++) {
      const el = document.getElementById(`ae-step-${i}`);
      if (el) {
        el.className = "ae-step step-pending";
        const ic = el.querySelector(".ae-step-ic");
        if (ic) { ic.style.color = ""; ic.textContent = ["🔍","🎨","✏️","✨"][i-1]; }
      }
    }

    // Run loading animation
    runSteps(() => {
      document.getElementById("ae-load-ov").classList.remove("open");

      // Generate candidates
      const candidates = generateCandidates(brief);
      document.getElementById("ae-candidates").innerHTML = buildCards(candidates, brief);
      document.getElementById("ae-result-ov").classList.add("open");
    });
  });

  // Enter key in textarea
  document.addEventListener("keydown", e => {
    if (e.target?.id === "ae-brief-input" && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.getElementById("ae-arch-btn")?.click();
    }
  });

  // Popup 3 — close & re-brief
  document.addEventListener("click", e => {
    if (e.target?.id === "ae-result-close") closeAll();
    if (e.target?.id === "ae-result-ov")    closeAll();
    if (e.target?.id === "ae-rebrief-btn") {
      document.getElementById("ae-result-ov").classList.remove("open");
      document.getElementById("ae-brief-ov").classList.add("open");
    }
  });

  // Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAll();
  });
}

// ══════════════════════════════════════════════════════════
//  WIRE CHATBOXES (index.html + dashboard.html)
// ══════════════════════════════════════════════════════════
function wireChatboxes() {
  const sendBtn  = document.querySelector(".send-btn");
  const textarea = document.querySelector(".card-textarea");

  if (!sendBtn || !textarea) {
    setTimeout(wireChatboxes, 300);
    return;
  }

  wireEvents();

  function handleSend() {
    const text = textarea.value.trim();
    if (!text) return;

    // Check login status
    let isLoggedIn = false;
    try {
      // Try Firebase
      const { getApps } = window.__firebaseModules__ || {};
      if (getApps && getApps().length) {
        const { getAuth } = window.__firebaseModules__;
        const auth = getAuth(getApps()[0]);
        isLoggedIn = !!auth.currentUser;
      }
    } catch(e) {}

    // Fallback: check if we're on dashboard (always logged in)
    if (window.location.href.includes("dashboard")) isLoggedIn = true;

    processOrder(text, isLoggedIn);
    textarea.value = "";
  }

  sendBtn.addEventListener("click", handleSend);
  textarea.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // Also wire quick pills
  document.querySelectorAll(".quick-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const text = pill.textContent.trim().replace("Beta","").trim();
      textarea.value = text;
      textarea.focus();
    });
  });
}

// Start
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", wireChatboxes);
} else {
  setTimeout(wireChatboxes, 500);
}