// ═══════════════════════════════════════════════════════════
//  ai-employee.js  —  Vnus AI Employee System
// ═══════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════
//  ALL AI EMPLOYEES DATABASE
// ══════════════════════════════════════════════════════════
const AI_EMPLOYEES = {

  // ── BASIC TIER ($399) ────────────────────────────────────
  basic: [
    {
      id: "lead-scraper-basic",
      name: "Lead Scraper",
      emoji: "🔍",
      category: "Sales",
      tier: "basic",
      description: "Scrapes leads from websites, LinkedIn, and directories. Extracts emails, phone numbers, and contact info automatically.",
      tasks: ["Web scraping", "Email extraction", "Contact discovery", "CSV export"],
      credits: 3,
    },
    {
      id: "email-writer-basic",
      name: "Email Writer",
      emoji: "✉️",
      category: "Marketing",
      tier: "basic",
      description: "Writes professional cold emails, follow-ups, and newsletters. Personalizes at scale using your contact list.",
      tasks: ["Cold email writing", "Follow-up sequences", "Newsletter drafts", "Subject line testing"],
      credits: 2,
    },
    {
      id: "scheduler-basic",
      name: "Scheduler",
      emoji: "📅",
      category: "Productivity",
      tier: "basic",
      description: "Manages your calendar, books meetings, sends reminders, and handles scheduling conflicts automatically.",
      tasks: ["Calendar management", "Meeting booking", "Reminder setup", "Conflict resolution"],
      credits: 2,
    },
    {
      id: "data-entry-basic",
      name: "Data Entry Clerk",
      emoji: "📋",
      category: "Admin",
      tier: "basic",
      description: "Fills forms, enters data into spreadsheets, and organizes information from documents automatically.",
      tasks: ["Form filling", "Spreadsheet updates", "Document organization", "Data cleaning"],
      credits: 2,
    },
    {
      id: "social-poster-basic",
      name: "Social Media Poster",
      emoji: "📱",
      category: "Marketing",
      tier: "basic",
      description: "Creates and schedules social media posts for Twitter, LinkedIn, and Instagram with relevant hashtags.",
      tasks: ["Post creation", "Hashtag research", "Scheduling", "Caption writing"],
      credits: 3,
    },
    {
      id: "researcher-basic",
      name: "Web Researcher",
      emoji: "🌐",
      category: "Research",
      tier: "basic",
      description: "Browses the web, gathers information, summarizes articles, and compiles research reports on any topic.",
      tasks: ["Web browsing", "Info gathering", "Article summarizing", "Report writing"],
      credits: 3,
    },
  ],

  // ── PRO TIER ($599) ──────────────────────────────────────
  pro: [
    {
      id: "outreach-agent-pro",
      name: "Outreach Agent",
      emoji: "🤝",
      category: "Sales",
      tier: "pro",
      description: "Full outreach automation — finds prospects, writes personalized messages, follows up, and tracks replies across email and LinkedIn.",
      tasks: ["Prospect finding", "Personalized outreach", "Multi-channel follow-up", "Reply tracking", "CRM sync"],
      credits: 8,
    },
    {
      id: "wingman-pro",
      name: "Wingman",
      emoji: "🕵️",
      category: "Sales",
      tier: "pro",
      description: "Your AI sales assistant that joins calls, takes notes, suggests responses in real-time, and drafts follow-up emails instantly.",
      tasks: ["Call notes", "Real-time suggestions", "Follow-up drafts", "Deal tracking", "CRM updates"],
      credits: 10,
    },
    {
      id: "seo-agent-pro",
      name: "SEO Agent",
      emoji: "📈",
      category: "Marketing",
      tier: "pro",
      description: "Analyzes your website, finds ranking opportunities, writes SEO-optimized content, and builds backlink strategies automatically.",
      tasks: ["Keyword research", "Content writing", "On-page SEO", "Backlink analysis", "Rank tracking"],
      credits: 8,
    },
    {
      id: "customer-support-pro",
      name: "Support Agent",
      emoji: "💬",
      category: "Support",
      tier: "pro",
      description: "Handles customer queries 24/7, resolves tickets, escalates complex issues, and maintains a friendly brand voice.",
      tasks: ["Ticket resolution", "24/7 availability", "FAQ handling", "Escalation management", "CSAT tracking"],
      credits: 6,
    },
    {
      id: "content-creator-pro",
      name: "Content Creator",
      emoji: "✍️",
      category: "Marketing",
      tier: "pro",
      description: "Creates blog posts, video scripts, ad copy, and social content at scale. Matches your brand voice perfectly.",
      tasks: ["Blog writing", "Video scripts", "Ad copywriting", "Brand voice", "Content calendar"],
      credits: 7,
    },
    {
      id: "data-analyst-pro",
      name: "Data Analyst",
      emoji: "📊",
      category: "Analytics",
      tier: "pro",
      description: "Analyzes your business data, identifies trends, generates reports, and gives actionable insights with visualizations.",
      tasks: ["Data analysis", "Trend spotting", "Report generation", "Chart creation", "KPI tracking"],
      credits: 9,
    },
  ],

  // ── ELITE TIER ($999) ────────────────────────────────────
  elite: [
    {
      id: "ceo-assistant-elite",
      name: "Executive Assistant",
      emoji: "👔",
      category: "Executive",
      tier: "elite",
      description: "A fully autonomous AI Chief of Staff — manages your inbox, prioritizes tasks, runs meetings, handles vendors, and keeps your entire business organized.",
      tasks: ["Inbox zero", "Task prioritization", "Meeting management", "Vendor relations", "Board reporting", "Strategic planning"],
      credits: 20,
    },
    {
      id: "growth-hacker-elite",
      name: "Growth Hacker",
      emoji: "🚀",
      category: "Growth",
      tier: "elite",
      description: "Runs full growth experiments — A/B tests, funnel optimization, viral loop design, and paid ad management across all channels.",
      tasks: ["A/B testing", "Funnel optimization", "Viral loops", "Ad management", "Conversion tracking", "ROI analysis"],
      credits: 18,
    },
    {
      id: "sales-closer-elite",
      name: "Sales Closer",
      emoji: "💰",
      category: "Sales",
      tier: "elite",
      description: "End-to-end autonomous sales agent — qualifies leads, books demos, handles objections, sends proposals, and closes deals without human intervention.",
      tasks: ["Lead qualification", "Demo booking", "Objection handling", "Proposal writing", "Deal closing", "Revenue tracking"],
      credits: 25,
    },
    {
      id: "dev-agent-elite",
      name: "Dev Agent",
      emoji: "⚡",
      category: "Engineering",
      tier: "elite",
      description: "Writes, reviews, and deploys code. Fixes bugs, builds features, manages GitHub PRs, and monitors production systems autonomously.",
      tasks: ["Code writing", "Bug fixing", "PR reviews", "Feature building", "Deploy automation", "System monitoring"],
      credits: 22,
    },
    {
      id: "market-intel-elite",
      name: "Market Intelligence",
      emoji: "🔭",
      category: "Strategy",
      tier: "elite",
      description: "Deep market research, competitor analysis, industry trend forecasting, and strategic recommendations — like having McKinsey on demand.",
      tasks: ["Competitor analysis", "Market mapping", "Trend forecasting", "Strategic reports", "Investment insights", "Risk assessment"],
      credits: 20,
    },
    {
      id: "automation-builder-elite",
      name: "Automation Builder",
      emoji: "🤖",
      category: "Automation",
      tier: "elite",
      description: "Designs and deploys complex multi-step automations across all your tools. Connects APIs, builds workflows, and eliminates manual work forever.",
      tasks: ["Workflow design", "API connections", "Tool integration", "Process automation", "Error handling", "Monitoring"],
      credits: 24,
    },
  ],
};

// ══════════════════════════════════════════════════════════
//  KEYWORDS — detect AI employee request
// ══════════════════════════════════════════════════════════
const HIRE_KEYWORDS = [
  "hire","build","create","make","need","want","get","find",
  "setup","set up","assign","deploy","launch","start",
  "lead scraper","outreach","scheduler","email writer","seo",
  "sales","support","research","content","data","analyst",
  "automation","growth","assistant","closer","developer","dev",
  "ai employee","employee","agent","worker","bot","assistant",
];

const NOT_AI_KEYWORDS = [
  "hello","hi","hey","thanks","thank you","how are","what is",
  "who are","tell me about","explain","help me understand",
  "what does","how does","price","pricing","plan","cost",
];

function isAIEmployeeRequest(text) {
  const lower = text.toLowerCase();
  const hasHire = HIRE_KEYWORDS.some(k => lower.includes(k));
  const isChat  = NOT_AI_KEYWORDS.some(k => lower.includes(k));
  return hasHire && !isChat;
}

// ══════════════════════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════════════════════
function injectStyles() {
  if (document.getElementById("ae-css")) return;
  const s = document.createElement("style");
  s.id = "ae-css";
  s.textContent = `
    /* ── Shared overlay ── */
    .ae-overlay {
      display:none; position:fixed; inset:0; z-index:10000;
      background:rgba(10,50,120,0.50);
      backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
      align-items:center; justify-content:center; padding:20px;
    }
    .ae-overlay.open { display:flex; animation:aeFade .25s ease; }
    @keyframes aeFade { from{opacity:0} to{opacity:1} }

    /* ══ POPUP 1 — Brain Loading ══ */
    #ae-loading-box {
      background:rgba(255,255,255,0.10);
      border:1.5px solid rgba(255,255,255,0.20);
      border-radius:28px; padding:48px 40px;
      text-align:center; max-width:380px; width:100%;
      animation:aePop .3s cubic-bezier(.22,.68,0,1.2);
    }
    @keyframes aePop {
      from{opacity:0;transform:scale(.88) translateY(20px)}
      to  {opacity:1;transform:scale(1)   translateY(0)}
    }

    /* Brain animation */
    .ae-brain-wrap {
      width:100px; height:100px; margin:0 auto 28px;
      display:flex; align-items:center; justify-content:center;
      position:relative;
    }
    .ae-brain {
      font-size:58px; line-height:1;
      animation:aeBeat 1.1s ease-in-out infinite;
      filter:drop-shadow(0 0 16px rgba(56,182,245,0.7));
      display:inline-block;
    }
    @keyframes aeBeat {
      0%   { transform:scale(1);    filter:drop-shadow(0 0 12px rgba(56,182,245,0.5)); }
      25%  { transform:scale(1.18); filter:drop-shadow(0 0 24px rgba(56,182,245,0.9)); }
      50%  { transform:scale(1);    filter:drop-shadow(0 0 12px rgba(56,182,245,0.5)); }
      75%  { transform:scale(1.12); filter:drop-shadow(0 0 20px rgba(56,182,245,0.8)); }
      100% { transform:scale(1);    filter:drop-shadow(0 0 12px rgba(56,182,245,0.5)); }
    }

    /* Pulse rings */
    .ae-pulse-ring {
      position:absolute; inset:-8px; border-radius:50%;
      border:2px solid rgba(56,182,245,0.35);
      animation:aeRing 1.1s ease-out infinite;
    }
    .ae-pulse-ring:nth-child(2) {
      inset:-20px;
      border-color:rgba(56,182,245,0.20);
      animation-delay:.3s;
    }
    @keyframes aeRing {
      0%   { transform:scale(0.9); opacity:0.8; }
      100% { transform:scale(1.3); opacity:0; }
    }

    .ae-loading-title {
      font-size:20px; font-weight:800; color:white;
      font-family:'Inter',sans-serif; margin-bottom:8px;
    }
    .ae-loading-sub {
      font-size:13px; color:rgba(255,255,255,0.65);
      font-family:'Inter',sans-serif; margin-bottom:28px;
    }

    /* Steps */
    .ae-steps { list-style:none; padding:0; margin:0; text-align:left; }
    .ae-step {
      display:flex; align-items:center; gap:12px;
      font-size:13px; font-family:'Inter',sans-serif;
      color:rgba(255,255,255,0.40);
      padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.06);
      transition:color .4s, transform .3s;
    }
    .ae-step:last-child { border-bottom:none; }
    .ae-step.active { color:white; transform:translateX(4px); }
    .ae-step.done   { color:rgba(56,182,245,0.90); }
    .ae-step-icon {
      width:26px; height:26px; border-radius:50%;
      background:rgba(255,255,255,0.08);
      display:flex; align-items:center; justify-content:center;
      font-size:13px; flex-shrink:0;
      transition:background .4s;
    }
    .ae-step.active .ae-step-icon { background:rgba(56,182,245,0.25); }
    .ae-step.done   .ae-step-icon { background:rgba(56,182,245,0.20); }

    /* ══ POPUP 2 — Employee Cards ══ */
    #ae-cards-overlay { z-index:10001; }
    #ae-cards-box {
      background:white; border-radius:26px;
      width:100%; max-width:820px; overflow:hidden;
      box-shadow:0 32px 80px rgba(0,60,160,0.22);
      animation:aePop .3s cubic-bezier(.22,.68,0,1.2);
      max-height:90vh; overflow-y:auto;
    }

    .ae-cards-head {
      background:linear-gradient(135deg,#0f0f1a,#1a1a2e);
      padding:28px 28px 24px; position:relative;
    }
    .ae-cards-close {
      position:absolute; top:16px; right:18px;
      width:32px; height:32px; border-radius:50%;
      background:rgba(255,255,255,0.12); border:none;
      font-size:16px; cursor:pointer; color:white;
      display:flex; align-items:center; justify-content:center;
    }
    .ae-cards-close:hover { background:rgba(255,255,255,0.22); }

    .ae-request-chip {
      display:inline-flex; align-items:center; gap:6px;
      background:rgba(56,182,245,0.15); border:1px solid rgba(56,182,245,0.35);
      border-radius:50px; padding:4px 12px;
      font-size:11px; font-weight:700; color:#38b6f5;
      font-family:'Inter',sans-serif; letter-spacing:.8px;
      text-transform:uppercase; margin-bottom:10px;
    }
    .ae-cards-title {
      font-size:22px; font-weight:900; color:white;
      font-family:'Inter',sans-serif; margin-bottom:4px;
    }
    .ae-cards-sub {
      font-size:13px; color:rgba(255,255,255,0.55);
      font-family:'Inter',sans-serif;
    }

    /* Request preview */
    .ae-request-preview {
      display:flex; align-items:center; gap:8px;
      background:rgba(255,255,255,0.07); border-radius:12px;
      padding:10px 14px; margin-top:14px;
      font-size:13px; color:rgba(255,255,255,0.75);
      font-family:'Inter',sans-serif; font-style:italic;
    }
    .ae-request-preview span { color:rgba(255,255,255,0.40); font-style:normal; font-size:11px; }

    /* 3 tier cards */
    .ae-tier-cards {
      display:grid; grid-template-columns:repeat(3,1fr);
      gap:0; padding:0;
    }
    @media(max-width:600px) { .ae-tier-cards { grid-template-columns:1fr; } }

    .ae-tier-card {
      padding:24px 22px 28px;
      border-right:1px solid rgba(0,0,0,0.07);
      display:flex; flex-direction:column;
      position:relative; transition:background .2s;
    }
    .ae-tier-card:last-child { border-right:none; }

    /* Tier colors */
    .ae-tier-card.basic    { background:#fafafa; }
    .ae-tier-card.pro      { background:white; }
    .ae-tier-card.elite    { background:linear-gradient(175deg,#fefce8,#fffbeb); }

    /* Popular tag */
    .ae-tier-tag {
      position:absolute; top:0; left:50%; transform:translateX(-50%);
      font-size:10px; font-weight:800; letter-spacing:.8px;
      text-transform:uppercase; padding:4px 14px;
      border-radius:0 0 12px 12px; white-space:nowrap;
    }
    .ae-tier-tag.pro-tag   { background:linear-gradient(90deg,#38b6f5,#0ea5e9); color:white; }
    .ae-tier-tag.elite-tag { background:linear-gradient(90deg,#f59e0b,#d97706); color:white; }

    .ae-tier-label {
      font-size:10px; font-weight:800; letter-spacing:1.5px;
      text-transform:uppercase; margin-bottom:12px;
    }
    .ae-tier-card.basic .ae-tier-label { color:#aaa; }
    .ae-tier-card.pro   .ae-tier-label { color:#0ea5e9; }
    .ae-tier-card.elite .ae-tier-label { color:#d97706; }

    /* Matched employee */
    .ae-emp-emoji { font-size:36px; margin-bottom:10px; }
    .ae-emp-name  {
      font-size:18px; font-weight:800; color:#111;
      font-family:'Inter',sans-serif; margin-bottom:6px;
    }
    .ae-emp-cat {
      display:inline-flex; align-items:center;
      background:rgba(0,0,0,0.06); border-radius:50px;
      padding:3px 10px; font-size:11px; font-weight:600; color:#777;
      font-family:'Inter',sans-serif; margin-bottom:12px;
    }
    .ae-emp-desc {
      font-size:13px; color:#666; line-height:1.6;
      font-family:'Inter',sans-serif; margin-bottom:16px; flex:1;
    }

    /* Tasks */
    .ae-emp-tasks {
      display:flex; flex-wrap:wrap; gap:5px; margin-bottom:18px;
    }
    .ae-task-tag {
      background:rgba(0,0,0,0.05); border-radius:6px;
      padding:3px 8px; font-size:11px; font-weight:500; color:#666;
      font-family:'Inter',sans-serif;
    }

    /* Credits */
    .ae-credits-row {
      display:flex; align-items:center; gap:6px;
      font-size:12px; color:#aaa; font-family:'Inter',sans-serif;
      margin-bottom:16px;
    }
    .ae-credits-row svg { width:13px; height:13px; }

    /* Price */
    .ae-price-row {
      display:flex; align-items:baseline; gap:4px; margin-bottom:16px;
    }
    .ae-price {
      font-size:26px; font-weight:900; color:#111;
      font-family:'Inter',sans-serif;
    }
    .ae-price-per { font-size:13px; color:#aaa; font-family:'Inter',sans-serif; }

    /* Hire button */
    .ae-hire-btn {
      width:100%; padding:13px; border:none; border-radius:50px;
      font-size:14px; font-weight:800; cursor:pointer;
      font-family:'Inter',sans-serif;
      display:flex; align-items:center; justify-content:center; gap:7px;
      transition:opacity .15s, transform .12s; letter-spacing:.3px;
    }
    .ae-hire-btn:hover { opacity:.88; transform:translateY(-1px); }
    .ae-hire-btn.basic-btn { background:#111; color:white; }
    .ae-hire-btn.pro-btn   { background:linear-gradient(135deg,#38b6f5,#0ea5e9); color:white; }
    .ae-hire-btn.elite-btn { background:linear-gradient(135deg,#f59e0b,#d97706); color:white; }

    /* Bottom note */
    .ae-cards-footer {
      text-align:center; padding:14px 24px 18px;
      border-top:1px solid rgba(0,0,0,0.06);
      font-size:12px; color:#bbb; font-family:'Inter',sans-serif;
    }

    /* Toast already exists in auth.js */
  `;
  document.head.appendChild(s);
}

// ══════════════════════════════════════════════════════════
//  HTML INJECT
// ══════════════════════════════════════════════════════════
function injectHTML() {
  if (document.getElementById("ae-loading-overlay")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <!-- Loading popup -->
    <div class="ae-overlay" id="ae-loading-overlay">
      <div id="ae-loading-box">
        <div class="ae-brain-wrap">
          <div class="ae-pulse-ring"></div>
          <div class="ae-pulse-ring"></div>
          <div class="ae-brain">🧠</div>
        </div>
        <div class="ae-loading-title">Building Your AI Employee</div>
        <div class="ae-loading-sub">Analyzing your request...</div>
        <ul class="ae-steps">
          <li class="ae-step" id="ae-step-1">
            <div class="ae-step-icon">🔍</div>
            Understanding your requirements
          </li>
          <li class="ae-step" id="ae-step-2">
            <div class="ae-step-icon">🧩</div>
            Matching skills & capabilities
          </li>
          <li class="ae-step" id="ae-step-3">
            <div class="ae-step-icon">⚡</div>
            Configuring AI tools & workflows
          </li>
          <li class="ae-step" id="ae-step-4">
            <div class="ae-step-icon">✅</div>
            Employee ready to hire
          </li>
        </ul>
      </div>
    </div>

    <!-- Cards popup -->
    <div class="ae-overlay" id="ae-cards-overlay">
      <div id="ae-cards-box">
        <div class="ae-cards-head">
          <button class="ae-cards-close" id="ae-cards-close">✕</button>
          <div class="ae-request-chip">⚡ AI Employee Match Found</div>
          <div class="ae-cards-title">Choose Your AI Employee</div>
          <div class="ae-cards-sub">Select the tier that fits your needs</div>
          <div class="ae-request-preview">
            <span>Your request:</span>
            <span id="ae-request-text">—</span>
          </div>
        </div>
        <div class="ae-tier-cards" id="ae-tier-cards">
          <!-- filled by JS -->
        </div>
        <div class="ae-cards-footer">
          🔒 Secure payment &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; 7-day money back guarantee
        </div>
      </div>
    </div>
  `);
}

// ══════════════════════════════════════════════════════════
//  FIND BEST MATCHING EMPLOYEES (one per tier)
// ══════════════════════════════════════════════════════════
function findMatches(userText) {
  const lower = userText.toLowerCase();

  function score(emp) {
    let s = 0;
    if (lower.includes(emp.name.toLowerCase())) s += 10;
    emp.tasks.forEach(t => { if (lower.includes(t.toLowerCase())) s += 3; });
    if (lower.includes(emp.category.toLowerCase())) s += 2;
    HIRE_KEYWORDS.forEach(k => { if (lower.includes(k)) s += 1; });
    return s;
  }

  const basicMatch = [...AI_EMPLOYEES.basic].sort((a,b)=>score(b)-score(a))[0];
  const proMatch   = [...AI_EMPLOYEES.pro].sort((a,b)=>score(b)-score(a))[0];
  const eliteMatch = [...AI_EMPLOYEES.elite].sort((a,b)=>score(b)-score(a))[0];

  return { basic: basicMatch, pro: proMatch, elite: eliteMatch };
}

// ══════════════════════════════════════════════════════════
//  BUILD CARD HTML
// ══════════════════════════════════════════════════════════
function buildCard(emp, price, tier) {
  const tierLabels = { basic:"Basic", pro:"Pro", elite:"Elite" };
  const tierTags   = { basic:"", pro:'<div class="ae-tier-tag pro-tag">⭐ Most Popular</div>', elite:'<div class="ae-tier-tag elite-tag">👑 Top Tier</div>' };
  const btnClass   = `${tier}-btn`;
  const btnText    = tier === "basic" ? "Hire Basic" : tier === "pro" ? "Hire Pro" : "Hire Elite";

  return `
    <div class="ae-tier-card ${tier}">
      ${tierTags[tier]}
      <div class="ae-tier-label">${tierLabels[tier]} Plan</div>
      <div class="ae-emp-emoji">${emp.emoji}</div>
      <div class="ae-emp-name">${emp.name}</div>
      <div class="ae-emp-cat">${emp.category}</div>
      <div class="ae-emp-desc">${emp.description}</div>
      <div class="ae-emp-tasks">
        ${emp.tasks.map(t=>`<span class="ae-task-tag">${t}</span>`).join("")}
      </div>
      <div class="ae-credits-row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>
        ${emp.credits} credits per task
      </div>
      <div class="ae-price-row">
        <div class="ae-price">$${price}</div>
        <div class="ae-price-per">/mo</div>
      </div>
      <button class="ae-hire-btn ${btnClass}" onclick="window.handleHire('${emp.id}','${tier}','${price}')">
        ${btnText} →
      </button>
    </div>
  `;
}

// ══════════════════════════════════════════════════════════
//  LOADING ANIMATION STEPS
// ══════════════════════════════════════════════════════════
function runSteps(callback) {
  const steps = ["ae-step-1","ae-step-2","ae-step-3","ae-step-4"];
  let i = 0;

  function nextStep() {
    if (i > 0) {
      document.getElementById(steps[i-1])?.classList.remove("active");
      document.getElementById(steps[i-1])?.classList.add("done");
      document.getElementById(steps[i-1]).querySelector(".ae-step-icon").textContent = "✓";
    }
    if (i < steps.length) {
      document.getElementById(steps[i])?.classList.add("active");
      i++;
      setTimeout(nextStep, 650);
    } else {
      setTimeout(callback, 400);
    }
  }
  nextStep();
}

// ══════════════════════════════════════════════════════════
//  HIRE HANDLER
// ══════════════════════════════════════════════════════════
window.handleHire = function(empId, tier, price) {
  const toast = document.getElementById("vnus-toast");
  if (toast) {
    toast.textContent = `🎉 ${tier.charAt(0).toUpperCase()+tier.slice(1)} AI Employee hired! Payment coming soon.`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
  }
  document.getElementById("ae-cards-overlay")?.classList.remove("open");
};

// ══════════════════════════════════════════════════════════
//  MAIN — process chatbox input
// ══════════════════════════════════════════════════════════
export function processInput(text) {
  if (!text.trim()) return;

  if (!isAIEmployeeRequest(text)) {
    // Not an AI employee request — show friendly message
    const toast = document.getElementById("vnus-toast");
    if (toast) {
      toast.textContent = "👋 I only build AI Employees! Describe what task you need automated.";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 4000);
    }
    return;
  }

  injectStyles();
  injectHTML();

  // Reset steps
  ["ae-step-1","ae-step-2","ae-step-3","ae-step-4"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("active","done");
      const icon = el.querySelector(".ae-step-icon");
      if (icon) icon.textContent = ["🔍","🧩","⚡","✅"][parseInt(id.slice(-1))-1];
    }
  });

  // Show loading popup
  document.getElementById("ae-loading-overlay").classList.add("open");

  // Find matches
  const matches = findMatches(text);

  // Run steps then show cards
  runSteps(() => {
    document.getElementById("ae-loading-overlay").classList.remove("open");

    // Fill cards
    document.getElementById("ae-request-text").textContent = `"${text.length > 60 ? text.slice(0,60)+"…" : text}"`;
    document.getElementById("ae-tier-cards").innerHTML =
      buildCard(matches.basic, "399", "basic") +
      buildCard(matches.pro,   "599", "pro")   +
      buildCard(matches.elite, "999", "elite");

    document.getElementById("ae-cards-overlay").classList.add("open");
  });
}

// ══════════════════════════════════════════════════════════
//  WIRE CHATBOX
// ══════════════════════════════════════════════════════════
function wireChatbox() {
  // Close buttons
  document.addEventListener("click", e => {
    if (e.target?.id === "ae-cards-close" || e.target?.id === "ae-cards-overlay") {
      document.getElementById("ae-cards-overlay")?.classList.remove("open");
    }
    if (e.target?.id === "ae-loading-overlay") {
      document.getElementById("ae-loading-overlay")?.classList.remove("open");
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.getElementById("ae-cards-overlay")?.classList.remove("open");
      document.getElementById("ae-loading-overlay")?.classList.remove("open");
    }
  });

  // Send button
  const sendBtn = document.querySelector(".send-btn");
  const textarea = document.querySelector(".card-textarea");

  if (sendBtn && textarea) {
    sendBtn.addEventListener("click", () => {
      const text = textarea.value.trim();
      if (text) {
        processInput(text);
        textarea.value = "";
      }
    });

    textarea.addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const text = textarea.value.trim();
        if (text) {
          processInput(text);
          textarea.value = "";
        }
      }
    });
  }
}

// Init
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", wireChatbox);
} else {
  wireChatbox();
}
