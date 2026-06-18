// ═══════════════════════════════════════════════════════════
//  ai-employee.js  —  Vnus AI | 200+ Employee Categories
// ═══════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════
//  KEYWORDS — almost every possible AI employee order
// ══════════════════════════════════════════════════════════
const HIRE_WORDS = [
  // Actions
  "hire","build","create","make","need","want","get","find","setup","set up",
  "assign","deploy","launch","start","automate","automation","i need","i want",
  "can you build","create me","build me","make me","give me","i want an",
  "i need an","looking for","looking to","help me","i want to","generate",
  // Roles
  "agent","employee","worker","bot","assistant","manager","specialist",
  "expert","analyst","researcher","creator","designer","writer","marketer",
  "recruiter","coach","tutor","planner","scheduler","developer","operator",
  "coordinator","consultant","strategist","executor","automator","virtual",
  // Business types
  "dropshipping","drop shipping","ecommerce","e-commerce","shopify","amazon",
  "etsy","ebay","woocommerce","store","shop","product","supplier","fulfillment",
  // Marketing
  "seo","ads","advertising","google ads","meta ads","facebook ads","tiktok ads",
  "email","cold email","newsletter","campaign","funnel","landing page","copywriting",
  "content","blog","article","social media","instagram","tiktok","twitter","linkedin",
  "youtube","facebook","pinterest","snapchat","reddit","quora","medium",
  "influencer","affiliate","ambassador","brand","pr","public relations",
  // Sales
  "sales","outreach","lead","leads","prospect","crm","pipeline","closing",
  "cold call","appointment","demo","proposal","follow up","follow-up","deal",
  "revenue","b2b","b2c","saas","enterprise","smb","startup",
  // Tech
  "code","coding","developer","programming","python","javascript","react",
  "nodejs","api","backend","frontend","fullstack","database","sql","web",
  "app","mobile","ios","android","automation","zapier","make","n8n","webhook",
  "scraper","scraping","data","extraction","crawl","bot","ai","gpt","chatbot",
  // Finance
  "bookkeeping","accounting","invoice","tax","payroll","expense","budget",
  "financial","crypto","bitcoin","nft","trading","investment","forex","stocks",
  // Customer service
  "support","customer","helpdesk","ticket","chat","reply","respond","service",
  "refund","return","complaint","feedback","review","rating",
  // HR
  "recruit","hiring","interview","onboard","hr","human resources","talent",
  "candidate","resume","cv","job description","staffing","team",
  // Operations
  "project","task","workflow","process","document","report","data entry",
  "spreadsheet","excel","google sheets","notion","airtable","trello","asana",
  "meeting","calendar","schedule","appointment","reminder","organize",
  // Real estate
  "real estate","property","realty","mortgage","listing","mls","zillow",
  "rental","landlord","tenant","lease","agent","broker","house","apartment",
  // Health
  "health","medical","doctor","patient","clinic","hospital","wellness",
  "fitness","gym","workout","nutrition","diet","mental health","therapy",
  // Education
  "course","online course","coaching","teaching","tutorial","lesson","class",
  "student","education","learning","training","certification","ebook","udemy",
  // Creative
  "design","graphic","logo","brand","video","editing","podcast","music",
  "art","illustration","animation","photography","creative","visual",
  // Local business
  "restaurant","cafe","salon","spa","clinic","dentist","lawyer","plumber",
  "electrician","contractor","cleaning","local","retail","franchise",
  // Research
  "research","competitor","market research","analysis","report","data",
  "insight","benchmark","survey","trend","forecast","intelligence",
];

const NOT_HIRE = [
  "hello","hi","hey","thanks","thank you","how are you","what is vnus",
  "who are you","good morning","good evening","good afternoon","whats up",
  "what's up","nice","great","ok","okay","sure","yes","no","bye","goodbye",
];

function isValidOrder(text) {
  const low = text.toLowerCase().trim();
  if (low.length < 5) return false;
  if (NOT_HIRE.some(w => low === w || low.startsWith(w + " ") || low.startsWith(w + "!"))) return false;
  return HIRE_WORDS.some(w => low.includes(w));
}

// ══════════════════════════════════════════════════════════
//  200+ CATEGORY DATABASE
// ══════════════════════════════════════════════════════════
const CATEGORIES = [
  // ─── DROPSHIPPING & ECOMMERCE ───────────────────────────
  {
    keys:["dropshipping","drop shipping","aliexpress","cjdropshipping","winning product"],
    emoji1:"📦", emoji2:"🛒", emoji3:"🚀",
    name1:"Jake", name2:"Derek", name3:"Nathan",
    role1:"[Product Scout]", role2:"[Dropshipping Manager]", role3:"[Dropshipping Architect]",
    desc1:"Finds trending winning products on AliExpress & TikTok with good profit margins for your store.",
    desc2:"Manages your store end-to-end — listings, suppliers, orders, and customer queries automatically.",
    desc3:"Runs a fully automated dropshipping empire from product research to fulfillment across multiple stores.",
    skills1:["AliExpress Research","Trend Detection","Margin Analysis","TikTok Spy"],
    skills2:["Shopify","CJDropshipping","Order Processing","Customer Support","Inventory"],
    skills3:["Multi-Store Automation","Supplier Network","Ad Scaling","Profit Optimization","Analytics"],
  },
  {
    keys:["shopify","woocommerce","ecommerce","e-commerce","online store"],
    emoji1:"🏪", emoji2:"🛍️", emoji3:"💹",
    name1:"Kyle", name2:"Brandon", name3:"Connor",
    role1:"[Shopify Assistant]", role2:"[Ecommerce Manager]", role3:"[Ecommerce Growth Architect]",
    desc1:"Sets up and manages your Shopify store — products, descriptions, and basic optimization.",
    desc2:"Runs your full ecommerce operation including inventory, pricing, promotions, and customer service.",
    desc3:"Scales your ecommerce store with automation, ads, CRO, and multi-channel selling strategies.",
    skills1:["Shopify Setup","Product Listings","SEO Descriptions","Basic Apps"],
    skills2:["Inventory Management","Email Marketing","Reviews","Abandoned Cart","Analytics"],
    skills3:["Conversion Optimization","Multi-Channel","Ads Management","Influencer Deals","Revenue Scaling"],
  },
  {
    keys:["amazon","fba","amazon fba","amazon seller","amz"],
    emoji1:"📫", emoji2:"📊", emoji3:"👑",
    name1:"Ethan", name2:"Jason", name3:"Blake",
    role1:"[Amazon Listing Agent]", role2:"[FBA Manager]", role3:"[Amazon Domination Pro]",
    desc1:"Creates and optimizes Amazon listings with keyword-rich titles and descriptions to rank higher.",
    desc2:"Manages your full FBA operation — listings, PPC campaigns, inventory, and review generation.",
    desc3:"Dominates Amazon with advanced PPC, listing optimization, competitor analysis, and brand registry.",
    skills1:["Listing Creation","Keyword Research","Basic SEO","A+ Content"],
    skills2:["PPC Management","Inventory Forecasting","Review Generation","Competitor Analysis","BSR Tracking"],
    skills3:["Brand Registry","Advanced PPC","International Expansion","Wholesale","Private Label"],
  },
  // ─── LEAD GENERATION ────────────────────────────────────
  {
    keys:["lead scraper","lead generation","lead gen","leads","prospect","b2b leads"],
    emoji1:"🔍", emoji2:"📈", emoji3:"🎯",
    name1:"Alex", name2:"Chris", name3:"Michael",
    role1:"[Lead Scout]", role2:"[Prospect Researcher]", role3:"[Lead Extraction Architect]",
    desc1:"Scours LinkedIn and directories to find leads using basic filters and exports clean lists to Google Sheets.",
    desc2:"Extracts verified contact data, firmographic details, tech stack info, and funding stage for precise targeting.",
    desc3:"Builds fully automated custom scrapers to find high-intent prospects based on behavioral signals and intent data.",
    skills1:["LinkedIn Basic","Google Sheets","Data Cleaning","CSV Export"],
    skills2:["Email Verification","BuiltWith","Crunchbase Pro","CRM Syncing","Lead Scoring"],
    skills3:["Custom Scrapers","Intent Data","Clay Workflows","API Integrations","Database Enrichment"],
  },
  // ─── EMAIL & OUTREACH ────────────────────────────────────
  {
    keys:["cold email","email outreach","email campaign","cold outreach","email automation"],
    emoji1:"✉️", emoji2:"🚀", emoji3:"⚡",
    name1:"Tyler", name2:"Austin", name3:"Cameron",
    role1:"[Cold Email Starter]", role2:"[Outreach Specialist]", role3:"[Email Automation Architect]",
    desc1:"Writes and sends basic cold email campaigns with simple personalization and open tracking.",
    desc2:"Runs multi-step email sequences with smart follow-ups, A/B testing, and automatic reply detection.",
    desc3:"Builds fully autonomous outreach systems that personalize at scale, book meetings, and sync your CRM.",
    skills1:["Gmail","Basic Templates","Open Tracking","CSV Lists"],
    skills2:["Instantly.ai","Spintax","A/B Testing","Reply Detection","CRM Sync"],
    skills3:["Clay + Smartlead","AI Personalization","Meeting Booking","Pipeline Management","Revenue Tracking"],
  },
  // ─── YOUTUBE ─────────────────────────────────────────────
  {
    keys:["youtube","yt","youtube automation","faceless","youtube channel","video content"],
    emoji1:"🎬", emoji2:"📹", emoji3:"🏆",
    name1:"Logan", name2:"Hunter", name3:"Cody",
    role1:"[YouTube Content Helper]", role2:"[YouTube Growth Agent]", role3:"[YouTube Automation Architect]",
    desc1:"Researches video ideas, writes basic scripts, and creates SEO descriptions with relevant hashtags.",
    desc2:"Manages full content calendar, optimizes SEO, creates thumbnail briefs, and schedules posts.",
    desc3:"Runs a fully autonomous YouTube channel from trend research to publishing — complete autopilot.",
    skills1:["Script Writing","Basic SEO","Descriptions","Hashtags"],
    skills2:["VidIQ","TubeBuddy","Thumbnail Briefs","Analytics","Scheduling"],
    skills3:["Full Automation","Trend Detection","A/B Thumbnails","Monetization","Channel Analytics"],
  },
  // ─── SOCIAL MEDIA ────────────────────────────────────────
  {
    keys:["social media","instagram","tiktok","twitter","facebook","pinterest","social"],
    emoji1:"📱", emoji2:"🌟", emoji3:"💫",
    name1:"Emma", name2:"Olivia", name3:"Sophia",
    role1:"[Social Media Poster]", role2:"[Social Growth Manager]", role3:"[Social Media Automation Pro]",
    desc1:"Creates and schedules basic social media posts with relevant hashtags and engaging captions.",
    desc2:"Manages your full social presence, grows audience, analyzes performance, and engages with followers.",
    desc3:"Builds a fully automated social media engine creating viral content and driving measurable business results.",
    skills1:["Post Creation","Scheduling","Hashtags","Caption Writing"],
    skills2:["Buffer","Hootsuite","Content Calendar","Engagement","Analytics"],
    skills3:["AI Content Creation","Viral Strategies","Influencer Outreach","Ad Management","ROI Tracking"],
  },
  // ─── SEO ─────────────────────────────────────────────────
  {
    keys:["seo","search engine","google ranking","keyword","backlink","organic traffic","seo writer","seo content","content writer","e-commerce seo","ecommerce seo","seo blog","rank"],
    emoji1:"✍️", emoji2:"🔗", emoji3:"🏅",
    name1:"Marcus", name2:"Jordan", name3:"Tyler",
    role1:"[SEO Content Writer]", role2:"[SEO Growth Strategist]", role3:"[SEO Authority Architect]",
    desc1:"Researches buyer-intent keywords and writes SEO-optimized product pages, blog posts, and category descriptions that rank on Google and drive organic traffic to your e-commerce store.",
    desc2:"Builds a full SEO content strategy — keyword clusters, pillar pages, internal linking, and monthly blog calendars — to grow your store's organic revenue consistently.",
    desc3:"Dominates Google rankings with advanced technical SEO audits, authority backlink campaigns, content silos, and AI-powered content production at scale for your e-commerce brand.",
    skills1:["Keyword Research","Product Page SEO","Blog Writing","Meta Descriptions","Google Search Console"],
    skills2:["Ahrefs","Content Strategy","Pillar Pages","Internal Linking","Competitor Gap Analysis"],
    skills3:["Technical SEO","Authority Link Building","Content at Scale","Core Web Vitals","International SEO"],
  },
  // ─── CONTENT & WRITING ───────────────────────────────────
  {
    keys:["content","blog","article","writing","copywriting","ghostwriting","newsletter"],
    emoji1:"✍️", emoji2:"📝", emoji3:"🖊️",
    name1:"Ashley", name2:"Ryan", name3:"Morgan",
    role1:"[Content Writer]", role2:"[Content Strategist]", role3:"[Content Director]",
    desc1:"Writes engaging SEO blog posts, product articles, and social captions in your exact brand voice — researching topics and publishing consistently every week.",
    desc2:"Builds a full content strategy with editorial calendars, email newsletters, and high-converting landing page copy that turns readers into buyers.",
    desc3:"Runs a fully automated content machine — producing SEO articles, thought leadership pieces, newsletters, and social posts at scale across all your channels.",
    skills1:["Blog Writing","Article Research","Basic SEO","Social Captions"],
    skills2:["Content Strategy","Editorial Calendar","Email Newsletters","Landing Pages","SEO Optimization"],
    skills3:["AI Content at Scale","Multi-Channel Publishing","Brand Voice Training","Thought Leadership","Content Analytics"],
  },
  // ─── ADS & PAID MEDIA ────────────────────────────────────
  {
    keys:["ads","advertising","google ads","facebook ads","meta ads","tiktok ads","paid","ppc","roas"],
    emoji1:"🎯", emoji2:"💰", emoji3:"🚀",
    name1:"Dylan", name2:"Colton", name3:"Wyatt",
    role1:"[Ads Assistant]", role2:"[Ads Campaign Manager]", role3:"[Paid Media Architect]",
    desc1:"Sets up and manages basic ad campaigns on Google or Meta with simple targeting and budgets.",
    desc2:"Runs multi-platform ad campaigns with A/B testing, audience optimization, and ROAS tracking.",
    desc3:"Builds and scales high-performance paid media systems across all platforms for maximum revenue.",
    skills1:["Google Ads Basics","Meta Ads","Ad Copy","Basic Targeting"],
    skills2:["Multi-Platform","A/B Testing","Retargeting","Lookalike Audiences","ROAS Optimization"],
    skills3:["Full Funnel Ads","Creative Testing","Advanced Bidding","Attribution Modeling","Revenue Scaling"],
  },
  // ─── CUSTOMER SUPPORT ────────────────────────────────────
  {
    keys:["customer support","customer service","helpdesk","support agent","ticket","live chat"],
    emoji1:"💬", emoji2:"🎧", emoji3:"🤝",
    name1:"Jessica", name2:"Amanda", name3:"Rachel",
    role1:"[Support Helper]", role2:"[Customer Support Agent]", role3:"[Support Automation Pro]",
    desc1:"Handles basic customer queries via email or chat, resolves common issues, and escalates when needed.",
    desc2:"Manages full customer support across email, chat, and social. Resolves tickets and tracks satisfaction.",
    desc3:"Builds fully automated support systems with AI chatbots, smart routing, and 24/7 zero-wait resolution.",
    skills1:["Email Support","Basic FAQs","Ticket Logging","Escalation"],
    skills2:["Zendesk","Intercom","CSAT Tracking","Return Processing","Multi-Channel"],
    skills3:["AI Chatbots","Smart Routing","24/7 Automation","Sentiment Analysis","Proactive Support"],
  },
  // ─── SALES ───────────────────────────────────────────────
  {
    keys:["sales","sales agent","sales closer","crm","pipeline","deal closing","b2b sales","revenue"],
    emoji1:"💼", emoji2:"📊", emoji3:"💰",
    name1:"Kevin", name2:"Brian", name3:"Scott",
    role1:"[Sales Assistant]", role2:"[Sales Development Rep]", role3:"[Sales Closing Machine]",
    desc1:"Helps manage your CRM, logs interactions, sends follow-ups, and prepares basic sales reports.",
    desc2:"Handles full SDR workflow — finds prospects, sends outreach, books demos, and updates pipeline.",
    desc3:"Closes deals autonomously — qualifies leads, handles objections, sends proposals, and drives revenue.",
    skills1:["CRM Data Entry","Follow-up Emails","Basic Reporting","Contact Management"],
    skills2:["HubSpot","Apollo.io","Demo Booking","Pipeline Management","Deal Tracking"],
    skills3:["AI Objection Handling","Proposal Writing","Contract Management","Revenue Forecasting","Deal Closing"],
  },
  // ─── LINKEDIN ────────────────────────────────────────────
  {
    keys:["linkedin","linkedin outreach","linkedin automation","linkedin lead","connection request"],
    emoji1:"💼", emoji2:"🌐", emoji3:"🚀",
    name1:"Daniel", name2:"Matthew", name3:"Andrew",
    role1:"[LinkedIn Connector]", role2:"[LinkedIn Growth Agent]", role3:"[LinkedIn Automation Pro]",
    desc1:"Sends connection requests and basic messages to your target audience on LinkedIn.",
    desc2:"Runs full LinkedIn campaigns — personalized outreach, follow-ups, content posting, and lead tracking.",
    desc3:"Builds a LinkedIn growth machine with AI personalization, thought leadership content, and pipeline generation.",
    skills1:["Connection Requests","Basic Messaging","Profile Optimization","List Building"],
    skills2:["Sales Navigator","Personalized Sequences","Content Posting","Analytics","Lead Scoring"],
    skills3:["AI Personalization","Thought Leadership","Multichannel Follow-up","Pipeline Automation","Revenue Attribution"],
  },
  // ─── SCHEDULING ──────────────────────────────────────────
  {
    keys:["scheduler","scheduling","calendar","booking","appointment","discovery call","meeting booking"],
    emoji1:"📅", emoji2:"🗓️", emoji3:"⚙️",
    name1:"Grace", name2:"Hannah", name3:"Lily",
    role1:"[Basic Scheduler]", role2:"[Calendar Manager]", role3:"[Scheduling Automation Pro]",
    desc1:"Books appointments, sends reminders, and manages your basic calendar to reduce no-shows.",
    desc2:"Handles complex scheduling across time zones, qualifies leads before booking, and syncs with your CRM.",
    desc3:"Builds a fully automated booking pipeline that qualifies, schedules, follows up, and fills your calendar.",
    skills1:["Calendly","Email Reminders","Basic Booking","Calendar Sync"],
    skills2:["Multi-timezone","Lead Qualification","Zoom Integration","CRM Sync","Follow-ups"],
    skills3:["Full Pipeline Automation","AI Qualification","Payment Integration","No-show Recovery","Revenue Tracking"],
  },
  // ─── CRYPTO & WEB3 ───────────────────────────────────────
  {
    keys:["crypto","bitcoin","nft","web3","blockchain","defi","token","trading","dao","solana","ethereum"],
    emoji1:"🪙", emoji2:"📈", emoji3:"🌐",
    name1:"Zach", name2:"Trevor", name3:"Spencer",
    role1:"[Crypto Researcher]", role2:"[Web3 Community Manager]", role3:"[Crypto Automation Pro]",
    desc1:"Researches crypto projects, analyzes tokenomics, and delivers daily market insights and alerts.",
    desc2:"Manages Discord & Telegram communities, moderates content, runs AMAs, and tracks community growth.",
    desc3:"Builds fully automated crypto operations — trading signals, community growth, and Web3 marketing.",
    skills1:["Project Research","Tokenomics Analysis","Market Monitoring","Price Alerts"],
    skills2:["Discord Management","Telegram Moderation","Community Engagement","AMA Hosting","Analytics"],
    skills3:["Trading Automation","On-Chain Analysis","Multi-Chain Monitoring","NFT Marketing","DAO Management"],
  },
  // ─── REAL ESTATE ─────────────────────────────────────────
  {
    keys:["real estate","property","realty","realtor","mls","zillow","rental","landlord","mortgage","house"],
    emoji1:"🏠", emoji2:"🏡", emoji3:"🏘️",
    name1:"Chad", name2:"Brett", name3:"Lance",
    role1:"[RE Lead Scout]", role2:"[Property Analyst]", role3:"[RE Automation Pro]",
    desc1:"Finds motivated sellers and buyers by scraping Zillow, MLS, and public records for contact info.",
    desc2:"Analyzes property deals, runs comps, estimates ARV, and generates investment-ready deal reports.",
    desc3:"Runs fully automated real estate operations from lead gen to outreach, follow-up, and deal analysis.",
    skills1:["Zillow Scraping","Owner Lookup","Basic Outreach","Lead Lists"],
    skills2:["Comps Analysis","ARV Calculation","Deal Scoring","Investment Reports","Email Sequences"],
    skills3:["Full Automation","Intent Detection","Multi-Channel Outreach","Pipeline Management","Deal Closing"],
  },
  // ─── RECRUITING / HR ─────────────────────────────────────
  {
    keys:["recruit","recruiting","hr","hiring","talent","candidate","job","interview","resume","cv"],
    emoji1:"👥", emoji2:"🎯", emoji3:"🏆",
    name1:"Megan", name2:"Lauren", name3:"Stephanie",
    role1:"[Job Post Writer]", role2:"[AI Recruiter]", role3:"[Talent Acquisition Pro]",
    desc1:"Writes compelling job descriptions and posts them across major job boards to attract candidates.",
    desc2:"Sources candidates on LinkedIn and Indeed, screens resumes, schedules interviews, and ranks applicants.",
    desc3:"Runs a fully automated hiring pipeline from job posting to offer letter with AI screening and ranking.",
    skills1:["JD Writing","Job Board Posting","Basic Screening","Application Tracking"],
    skills2:["LinkedIn Sourcing","Resume Screening","Interview Scheduling","Candidate Ranking","ATS Integration"],
    skills3:["AI Screening","Automated Outreach","Background Checks","Offer Management","Hiring Analytics"],
  },
  // ─── FINANCE & BOOKKEEPING ───────────────────────────────
  {
    keys:["bookkeeping","accounting","invoice","tax","expense","finance","payroll","quickbooks","xero"],
    emoji1:"🧾", emoji2:"💳", emoji3:"💹",
    name1:"Aaron", name2:"Eric", name3:"Gregory",
    role1:"[Bookkeeping Assistant]", role2:"[Finance Manager]", role3:"[Finance Automation Pro]",
    desc1:"Categorizes transactions, tracks expenses, and prepares basic financial summaries monthly.",
    desc2:"Manages full bookkeeping — reconciliations, P&L statements, invoicing, and tax preparation.",
    desc3:"Automates your entire finance operation with real-time reporting, cash flow forecasting, and compliance.",
    skills1:["Expense Tracking","Transaction Categorization","Basic Reports","Invoice Creation"],
    skills2:["QuickBooks","Xero","Bank Reconciliation","P&L Statements","Tax Prep"],
    skills3:["Real-Time Dashboards","Cash Flow AI","Multi-Currency","Audit Trails","CFO-Level Insights"],
  },
  // ─── DEV & TECH ──────────────────────────────────────────
  {
    keys:["developer","coding","code","programming","python","javascript","react","app","web","api","backend","frontend"],
    emoji1:"💻", emoji2:"⚡", emoji3:"🧠",
    name1:"Ryan", name2:"Liam", name3:"Owen",
    role1:"[Code Assistant]", role2:"[Full-Stack Dev Agent]", role3:"[AI Dev Architect]",
    desc1:"Writes basic scripts, fixes bugs, and handles simple coding tasks in Python or JavaScript.",
    desc2:"Builds full features, manages GitHub PRs, writes tests, and deploys code changes autonomously.",
    desc3:"Architectures and builds complete software systems with AI, APIs, databases, and cloud infrastructure.",
    skills1:["Bug Fixing","Script Writing","Basic APIs","Code Review"],
    skills2:["Full-Stack Dev","GitHub Management","CI/CD","Database Design","Testing"],
    skills3:["System Architecture","AI Integration","Cloud Infrastructure","Security","Performance Optimization"],
  },
  // ─── DATA & SCRAPING ─────────────────────────────────────
  {
    keys:["scraper","scraping","data extraction","web scraping","crawl","data mining","extract data"],
    emoji1:"🕷️", emoji2:"📊", emoji3:"🔬",
    name1:"Parker", name2:"Cooper", name3:"Hudson",
    role1:"[Basic Web Scraper]", role2:"[Data Extraction Agent]", role3:"[Scraping Architect]",
    desc1:"Scrapes basic websites for data — prices, contacts, listings — and exports to CSV or Google Sheets.",
    desc2:"Builds robust scrapers that bypass blocks, handle pagination, and deliver clean structured data daily.",
    desc3:"Creates enterprise-grade scraping infrastructure with proxy rotation, anti-bot bypass, and real-time pipelines.",
    skills1:["BeautifulSoup","CSV Export","Basic Selectors","Google Sheets"],
    skills2:["Playwright","Proxy Rotation","Anti-Bot Bypass","Database Storage","Scheduling"],
    skills3:["Distributed Scraping","Real-Time Pipelines","Data Enrichment","API Delivery","Cloud Infrastructure"],
  },
  // ─── AUTOMATION ──────────────────────────────────────────
  {
    keys:["automation","zapier","make.com","n8n","workflow","integrate","connect","webhook","no-code"],
    emoji1:"⚙️", emoji2:"🔄", emoji3:"🤖",
    name1:"Cole", name2:"Tucker", name3:"Preston",
    role1:"[Automation Helper]", role2:"[Workflow Automation Agent]", role3:"[Automation Architect]",
    desc1:"Sets up basic Zapier workflows to connect your apps and automate simple repetitive tasks.",
    desc2:"Builds complex multi-step automations across Make.com, Zapier, and n8n connecting all your tools.",
    desc3:"Designs enterprise-grade automation infrastructure with custom APIs, error handling, and monitoring.",
    skills1:["Zapier","Basic Workflows","App Connections","Task Automation"],
    skills2:["Make.com","n8n","API Connections","Complex Workflows","Error Handling"],
    skills3:["Custom Middleware","Distributed Workflows","Real-Time Processing","System Integration","DevOps"],
  },
  // ─── CHATBOT ─────────────────────────────────────────────
  {
    keys:["chatbot","chat bot","ai chatbot","website chat","whatsapp bot","telegram bot","messenger"],
    emoji1:"🤖", emoji2:"💬", emoji3:"🧠",
    name1:"Evan", name2:"Seth", name3:"Caleb",
    role1:"[Chatbot Builder]", role2:"[AI Chatbot Agent]", role3:"[Chatbot Pro]",
    desc1:"Builds a basic FAQ chatbot for your website that answers common questions 24/7 automatically.",
    desc2:"Creates intelligent AI chatbots that qualify leads, book meetings, and handle complex conversations.",
    desc3:"Builds enterprise AI chat systems across WhatsApp, web, and Telegram with full CRM integration.",
    skills1:["FAQ Bot","Website Widget","Basic Flows","Email Alerts"],
    skills2:["GPT Integration","Lead Qualification","Appointment Booking","Multi-Platform","Analytics"],
    skills3:["Multi-Channel AI","Voice Support","Custom LLM","CRM Integration","Sentiment Analysis"],
  },
  // ─── PR & INFLUENCER ─────────────────────────────────────
  {
    keys:["pr","public relations","press","media","influencer","brand ambassador","press release","journalist"],
    emoji1:"📰", emoji2:"⭐", emoji3:"🌟",
    name1:"Victoria", name2:"Natalie", name3:"Vanessa",
    role1:"[PR Assistant]", role2:"[PR & Influencer Agent]", role3:"[Brand Amplification Pro]",
    desc1:"Writes press releases, finds relevant media contacts, and sends basic pitches to journalists.",
    desc2:"Manages full PR campaigns, finds influencers, negotiates partnerships, and tracks media coverage.",
    desc3:"Builds a brand amplification machine with viral PR campaigns, top-tier influencer deals, and crisis management.",
    skills1:["Press Releases","Media Lists","Basic Pitching","Coverage Tracking"],
    skills2:["Journalist Outreach","Influencer Research","Partnership Negotiations","Media Monitoring","ROI Tracking"],
    skills3:["Viral Campaigns","Top-Tier Media","Crisis Management","Brand Reputation","International PR"],
  },
  // ─── PODCAST ─────────────────────────────────────────────
  {
    keys:["podcast","podcasting","show notes","podcast outreach","podcast guest","audio content"],
    emoji1:"🎙️", emoji2:"🎧", emoji3:"📻",
    name1:"Miles", name2:"Dean", name3:"Carl",
    role1:"[Show Notes Writer]", role2:"[Podcast Growth Agent]", role3:"[Podcast Automation Pro]",
    desc1:"Writes detailed show notes, summaries, and social clips from your podcast episodes automatically.",
    desc2:"Books podcast appearances, preps talking points, and repurposes episodes into blogs and social content.",
    desc3:"Runs your full podcast operation — booking, production notes, distribution, monetization, and sponsorships.",
    skills1:["Show Notes","Transcription","Summary Writing","Social Clips"],
    skills2:["Guest Booking","Content Repurposing","SEO Descriptions","Cross-Publishing","Analytics"],
    skills3:["Full Production Automation","Sponsorship Management","Distribution","Monetization","Community Building"],
  },
  // ─── COURSE CREATOR ──────────────────────────────────────
  {
    keys:["course","online course","udemy","teachable","kajabi","coaching","education","learning","training"],
    emoji1:"📚", emoji2:"🎓", emoji3:"🏫",
    name1:"Claire", name2:"Paige", name3:"Sydney",
    role1:"[Course Content Writer]", role2:"[Course Creation Agent]", role3:"[Education Automation Pro]",
    desc1:"Writes course outlines, lesson scripts, and quiz questions for your online course on any topic.",
    desc2:"Creates complete online courses — curriculum, video scripts, assessments, and workbooks.",
    desc3:"Builds and automates your entire education business — course creation, marketing, student support, and scaling.",
    skills1:["Lesson Writing","Quiz Creation","Outline Building","Workbooks"],
    skills2:["Full Curriculum","Video Scripts","Platform Setup","Student Assessment","Course Marketing"],
    skills3:["Full Automation","Student Journey","Upsell Funnels","Community Management","Revenue Scaling"],
  },
  // ─── LOCAL BUSINESS ──────────────────────────────────────
  {
    keys:["local business","google my business","gmb","local seo","restaurant","salon","clinic","dentist","contractor","plumber"],
    emoji1:"📍", emoji2:"⭐", emoji3:"🗺️",
    name1:"Todd", name2:"Craig", name3:"Barry",
    role1:"[Local SEO Helper]", role2:"[Local Business Manager]", role3:"[Local Domination Pro]",
    desc1:"Optimizes your Google My Business profile, builds local citations, and gets more reviews.",
    desc2:"Manages your full local online presence — GMB, reviews, local ads, and reputation management.",
    desc3:"Dominates your local market with full automation — leads, reviews, ads, and customer retention.",
    skills1:["GMB Optimization","Citation Building","Review Requests","Local Keywords"],
    skills2:["Review Management","Local Ads","Reputation Management","Social Local","Analytics"],
    skills3:["Lead Automation","Multi-Location","Competitor Dominance","Retention Campaigns","Full Local Funnel"],
  },
  // ─── EXECUTIVE ASSISTANT ─────────────────────────────────
  {
    keys:["executive assistant","virtual assistant","personal assistant","inbox","email management","admin"],
    emoji1:"🤵", emoji2:"📋", emoji3:"⚡",
    name1:"Nicole", name2:"Kristin", name3:"Allison",
    role1:"[Virtual Assistant]", role2:"[Executive Assistant]", role3:"[AI Chief of Staff]",
    desc1:"Manages your inbox, schedules meetings, and handles basic administrative tasks daily.",
    desc2:"Runs your full executive operations — inbox zero, vendor management, briefings, and task coordination.",
    desc3:"Acts as your AI Chief of Staff — managing your entire business operations, team, and strategic priorities.",
    skills1:["Inbox Management","Scheduling","Travel Booking","Data Entry"],
    skills2:["Inbox Zero","Vendor Management","Meeting Prep","Project Coordination","Reporting"],
    skills3:["Strategic Planning","Team Management","Board Reports","Business Operations","Decision Support"],
  },
  // ─── MUSIC / CREATIVE ────────────────────────────────────
  {
    keys:["music","artist","musician","spotify","playlist","music marketing","band","release","label"],
    emoji1:"🎵", emoji2:"🎸", emoji3:"🎤",
    name1:"Marcus", name2:"Devon", name3:"Andre",
    role1:"[Music Promotion Helper]", role2:"[Music Marketing Agent]", role3:"[Music Empire Builder]",
    desc1:"Pitches your music to Spotify playlists, music blogs, and basic press contacts.",
    desc2:"Manages full music marketing campaigns — playlist pitching, PR, social content, and fan outreach.",
    desc3:"Builds your music empire — label deals, sync licensing, touring support, and full brand development.",
    skills1:["Playlist Pitching","Blog Outreach","Basic PR","Social Posts"],
    skills2:["Release Campaigns","Fan Outreach","Sync Opportunities","Press Coverage","Streaming Analytics"],
    skills3:["Label Relations","Sync Licensing","International Marketing","Brand Partnerships","Revenue Scaling"],
  },
  // ─── LEGAL ───────────────────────────────────────────────
  {
    keys:["legal","contract","lawyer","attorney","compliance","terms","privacy policy","agreement","nda"],
    emoji1:"⚖️", emoji2:"📜", emoji3:"🏛️",
    name1:"Patrick", name2:"Geoffrey", name3:"Maxwell",
    role1:"[Legal Document Helper]", role2:"[Contract Review Agent]", role3:"[Legal Automation Pro]",
    desc1:"Drafts basic legal documents like NDAs, terms of service, and privacy policies for your business.",
    desc2:"Reviews contracts, flags risky clauses, suggests amendments, and summarizes key terms plainly.",
    desc3:"Automates your entire legal workflow — contract management, compliance monitoring, and risk assessment.",
    skills1:["Document Drafting","NDA Creation","ToS Writing","Privacy Policies"],
    skills2:["Contract Review","Risk Flagging","Clause Analysis","Plain English Summaries","Redlines"],
    skills3:["Contract Management","Compliance Automation","Risk Scoring","Regulatory Monitoring","Legal Analytics"],
  },
  // ─── HEALTH & FITNESS ────────────────────────────────────
  {
    keys:["fitness","gym","workout","nutrition","diet","health","wellness","personal trainer","coach"],
    emoji1:"💪", emoji2:"🏋️", emoji3:"🧘",
    name1:"Taylor", name2:"Bailey", name3:"Skylar",
    role1:"[Fitness Content Creator]", role2:"[Online Fitness Coach]", role3:"[Health Business Automator]",
    desc1:"Creates workout plans, nutrition guides, and fitness content for your clients or social media.",
    desc2:"Manages your online fitness coaching business — programs, check-ins, client communication, and sales.",
    desc3:"Builds a fully automated fitness empire with programs, marketing, client management, and scaling.",
    skills1:["Workout Plans","Nutrition Guides","Social Content","Client Check-ins"],
    skills2:["Program Creation","Client Management","Progress Tracking","Marketing","Upsells"],
    skills3:["Full Business Automation","App Integration","Community Management","Revenue Scaling","Brand Building"],
  },
  // ─── DATA ANALYST ────────────────────────────────────────
  {
    keys:["data analyst","data analysis","analytics","dashboard","report","kpi","metrics","business intelligence"],
    emoji1:"📊", emoji2:"🔬", emoji3:"🧮",
    name1:"Benjamin", name2:"Harrison", name3:"Elliot",
    role1:"[Data Reporter]", role2:"[Data Analyst]", role3:"[Business Intelligence Pro]",
    desc1:"Creates basic weekly reports and dashboards from your existing data sources.",
    desc2:"Analyzes business data, identifies trends, creates interactive dashboards, and delivers actionable insights.",
    desc3:"Builds enterprise BI systems with real-time data pipelines, predictive analytics, and automated reporting.",
    skills1:["Basic Reports","Excel/Sheets","Chart Creation","Weekly Summaries"],
    skills2:["Google Looker","Tableau","SQL","Trend Analysis","KPI Tracking"],
    skills3:["Data Pipelines","Predictive Models","Real-Time BI","Machine Learning","Executive Dashboards"],
  },
  // ─── MARKET RESEARCH ─────────────────────────────────────
  {
    keys:["market research","competitor analysis","competitor","market analysis","industry research","competitor intel"],
    emoji1:"🔭", emoji2:"🥷", emoji3:"🧠",
    name1:"Dominic", name2:"Vincent", name3:"Sebastian",
    role1:"[Market Researcher]", role2:"[Competitor Intelligence Agent]", role3:"[Market Domination Analyst]",
    desc1:"Researches your market, finds competitors, and compiles a basic overview report on the industry.",
    desc2:"Monitors competitors 24/7 — tracks pricing, features, ads, and job postings with weekly briefings.",
    desc3:"Builds a full market intelligence system with predictive insights, TAM analysis, and strategic recommendations.",
    skills1:["Basic Research","Competitor List","Industry Overview","SWOT Analysis"],
    skills2:["Price Monitoring","Feature Tracking","Ad Monitoring","Job Signal Analysis","Weekly Reports"],
    skills3:["TAM Analysis","Predictive Intelligence","Strategic Recommendations","Investment Insights","Board Reports"],
  },
  // ─── GRANT WRITING ───────────────────────────────────────
  {
    keys:["grant","grant writing","nonprofit","funding","proposal","charity","donation","fundraising"],
    emoji1:"🏛️", emoji2:"❤️", emoji3:"🌟",
    name1:"Carolyn", name2:"Patricia", name3:"Barbara",
    role1:"[Grant Researcher]", role2:"[Grant Writer]", role3:"[Fundraising Automation Pro]",
    desc1:"Researches grant opportunities matching your organization and creates basic application materials.",
    desc2:"Writes compelling grant proposals, manages deadlines, and creates impact reports for funders.",
    desc3:"Builds a full fundraising operation with grant automation, donor outreach, and campaign management.",
    skills1:["Grant Research","Basic Applications","Deadline Tracking","Budget Narratives"],
    skills2:["Proposal Writing","Impact Reports","Funder Relations","Compliance","Grant Tracking"],
    skills3:["Full Automation","Donor Management","Campaign Building","Major Gifts","Endowment Strategy"],
  },
  // ─── GENERAL FALLBACK ────────────────────────────────────
  {
    keys:["__default__"],
    emoji1:"🤖", emoji2:"⚡", emoji3:"🧠",
    name1:"James", name2:"William", name3:"Alexander",
    role1:"[Task Assistant]", role2:"[Operations Agent]", role3:"[Automation Architect]",
    desc1:"Handles basic, repetitive tasks for your specific need. Fast, reliable, and easy to deploy.",
    desc2:"Manages complex multi-step workflows with smart decisions, tool integrations, and reporting.",
    desc3:"Builds a fully autonomous AI system tailored to your exact needs — zero restrictions, maximum output.",
    skills1:["Task Automation","Basic Workflows","Reporting","Data Organization"],
    skills2:["Advanced Automation","API Connections","Smart Routing","CRM Integration","Analytics"],
    skills3:["Full Autonomy","Custom AI","Enterprise Integrations","Dedicated Support","Custom Development"],
  },
];

// ══════════════════════════════════════════════════════════
//  FIND BEST CATEGORY MATCH
// ══════════════════════════════════════════════════════════
function getCategory(brief) {
  const low = brief.toLowerCase();
  for (const cat of CATEGORIES) {
    if (cat.keys[0] === "__default__") continue;
    if (cat.keys.some(k => low.includes(k))) return cat;
  }
  return CATEGORIES[CATEGORIES.length - 1]; // default
}

function generateCandidates(brief) {
  const cat = getCategory(brief);
  return [
    { level:"JUNIOR", popular:false, emoji:cat.emoji1, name:cat.name1, role:cat.role1||"", desc:cat.desc1, skills:cat.skills1, price:399 },
    { level:"MID",    popular:true,  emoji:cat.emoji2, name:cat.name2, role:cat.role2||"", desc:cat.desc2, skills:cat.skills2, price:599 },
    { level:"SENIOR", popular:false, emoji:cat.emoji3, name:cat.name3, role:cat.role3||"", desc:cat.desc3, skills:cat.skills3, price:999 },
  ];
}

// ══════════════════════════════════════════════════════════
//  SUGGESTIONS
// ══════════════════════════════════════════════════════════
const SUGGESTIONS = [
  "lead scraper for B2B SaaS founders",
  "cold email outreach for real estate agents",
  "YouTube automation for faceless channels",
  "dropshipping product researcher for TikTok",
  "LinkedIn outreach agent for recruiters",
  "calendar scheduler that books discovery calls",
  "SEO content writer for e-commerce brands",
  "wingman that drafts replies on dating apps",
];

// ══════════════════════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════════════════════
function injectStyles() {
  if (document.getElementById("ae-styles")) return;
  const s = document.createElement("style");
  s.id = "ae-styles";
  s.textContent = `
    .ae-ov {
      display:none; position:fixed; inset:0; z-index:10000;
      background:rgba(0,20,60,0.55);
      backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
      align-items:center; justify-content:center; padding:20px;
    }
    .ae-ov.open { display:flex; animation:aeOvIn .22s ease; }
    @keyframes aeOvIn { from{opacity:0} to{opacity:1} }

    .ae-modal {
      background:#f0f2f5; border-radius:24px; width:100%; max-width:640px;
      box-shadow:0 32px 80px rgba(0,0,0,0.22);
      font-family:'Inter',sans-serif; overflow:hidden;
      animation:aeMdIn .28s cubic-bezier(.22,.68,0,1.2);
    }
    @keyframes aeMdIn {
      from{opacity:0;transform:scale(.93) translateY(16px)}
      to  {opacity:1;transform:scale(1)   translateY(0)}
    }

    /* Popup 1 */
    #ae-brief-modal { padding:28px 28px 24px; }
    .ae-brief-head { display:flex; align-items:center; gap:14px; margin-bottom:24px; position:relative; }
    .ae-brief-icon {
      width:52px; height:52px; border-radius:14px;
      background:linear-gradient(135deg,#ff6b6b,#ee5a24);
      display:flex; align-items:center; justify-content:center;
      font-size:24px; flex-shrink:0;
      box-shadow:0 4px 16px rgba(238,90,36,0.35);
    }
    .ae-brief-head-text h2 { font-size:20px; font-weight:800; color:#111; margin:0 0 3px; }
    .ae-brief-head-text p  { font-size:13px; color:#888; margin:0; }
    .ae-close-x {
      position:absolute; top:0; right:0;
      width:36px; height:36px; border-radius:50%;
      background:white; border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      font-size:16px; color:#666; font-weight:700;
      box-shadow:0 2px 8px rgba(0,0,0,0.10); transition:background .15s;
    }
    .ae-close-x:hover { background:#f5f5f5; }
    .ae-brief-label { font-size:11px; font-weight:700; letter-spacing:1.4px; color:#aaa; text-transform:uppercase; margin-bottom:10px; }
    .ae-brief-textarea {
      width:100%; min-height:100px; background:white; border:none; outline:none;
      border-radius:16px; padding:16px 18px; font-size:15px;
      font-family:'Inter',sans-serif; color:#111; resize:none;
      line-height:1.5; box-sizing:border-box;
      box-shadow:0 2px 12px rgba(0,0,0,0.06);
    }
    .ae-brief-textarea::placeholder { color:#ccc; }
    .ae-ortry { font-size:11px; font-weight:700; letter-spacing:1.4px; color:#aaa; text-transform:uppercase; margin:18px 0 10px; }
    .ae-suggestions { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:22px; }
    .ae-sug-chip {
      background:white; border:none; border-radius:50px;
      padding:8px 14px; font-size:13px; color:#333;
      cursor:pointer; font-family:'Inter',sans-serif;
      box-shadow:0 2px 8px rgba(0,0,0,0.07);
      transition:background .15s, transform .12s;
    }
    .ae-sug-chip:hover { background:#f0f8ff; transform:translateY(-1px); }
    .ae-arch-btn {
      width:100%; padding:16px; background:#1a1a2e; color:white;
      border:none; border-radius:16px; font-size:16px; font-weight:700;
      cursor:pointer; font-family:'Inter',sans-serif;
      display:flex; align-items:center; justify-content:center; gap:10px;
      transition:opacity .15s, transform .12s;
    }
    .ae-arch-btn:hover { opacity:.9; transform:translateY(-1px); }
    .ae-arch-btn:disabled { opacity:.5; cursor:not-allowed; transform:none; }

    /* Popup 2 */
    #ae-load-modal { padding:40px 32px 44px; text-align:center; }
    .ae-brain-wrap {
      width:120px; height:120px; margin:0 auto 28px;
      position:relative; display:flex; align-items:center; justify-content:center;
    }
    .ae-brain-glow {
      position:absolute; inset:-20px; border-radius:50%;
      background:radial-gradient(circle, rgba(255,107,107,0.25) 0%, rgba(238,90,36,0.10) 50%, transparent 70%);
      animation:aeGlow 2s ease-in-out infinite;
    }
    @keyframes aeGlow { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.15);opacity:1} }
    .ae-brain-circle {
      width:90px; height:90px; border-radius:50%;
      background:linear-gradient(135deg,#ff6b6b,#ee5a24,#c0392b);
      display:flex; align-items:center; justify-content:center;
      font-size:38px; position:relative; z-index:1;
      box-shadow:0 8px 32px rgba(238,90,36,0.45);
      animation:aeBrainPulse 2s ease-in-out infinite;
    }
    @keyframes aeBrainPulse {
      0%,100%{transform:scale(1);box-shadow:0 8px 32px rgba(238,90,36,0.45)}
      50%    {transform:scale(1.06);box-shadow:0 12px 40px rgba(238,90,36,0.65)}
    }
    .ae-load-title { font-size:20px; font-weight:800; color:#111; margin-bottom:6px; }
    .ae-load-brief { font-size:13px; color:#aaa; font-style:italic; margin-bottom:28px; }
    .ae-steps { list-style:none; padding:0; margin:0; }
    .ae-step {
      display:flex; align-items:center; gap:14px;
      background:rgba(255,255,255,0.5); border-radius:14px;
      padding:14px 18px; margin-bottom:10px;
      box-shadow:0 2px 8px rgba(0,0,0,0.04);
      transition:all .3s; opacity:0.4;
    }
    .ae-step.step-done   { background:#f0fdf4; opacity:1; }
    .ae-step.step-active { background:white; opacity:1; box-shadow:0 4px 16px rgba(0,0,0,0.10); }
    .ae-step-ic {
      width:34px; height:34px; border-radius:50%; flex-shrink:0;
      display:flex; align-items:center; justify-content:center; font-size:15px;
    }
    .step-done   .ae-step-ic { background:#22c55e; color:white; }
    .step-active .ae-step-ic { background:#1a1a2e; }
    .step-pending .ae-step-ic { background:rgba(0,0,0,0.07); }
    .ae-step-text { font-size:14px; font-weight:600; color:#bbb; font-family:'Inter',sans-serif; }
    .step-done   .ae-step-text { color:#16a34a; }
    .step-active .ae-step-text { color:#111; }

    /* Popup 3 */
    #ae-result-ov { z-index:10001; }
    #ae-result-modal { max-width:900px; background:#f0f2f5; padding:0; }
    .ae-result-head {
      display:flex; align-items:center; justify-content:space-between;
      padding:22px 24px 18px;
    }
    .ae-result-head-left { display:flex; align-items:center; gap:14px; }
    .ae-result-check {
      width:42px; height:42px; border-radius:50%; background:#22c55e;
      display:flex; align-items:center; justify-content:center;
      font-size:20px; color:white; box-shadow:0 4px 14px rgba(34,197,94,0.35);
    }
    .ae-result-title { font-size:20px; font-weight:800; color:#111; margin:0 0 2px; }
    .ae-result-sub   { font-size:13px; color:#888; margin:0; }
    .ae-result-head-right { display:flex; align-items:center; gap:10px; }
    .ae-rebrief-btn {
      background:white; border:none; border-radius:50px;
      padding:9px 16px; font-size:13px; font-weight:600; color:#555;
      cursor:pointer; font-family:'Inter',sans-serif;
      box-shadow:0 2px 8px rgba(0,0,0,0.08);
    }
    .ae-rebrief-btn:hover { background:#f5f5f5; }
    .ae-result-close {
      width:36px; height:36px; border-radius:50%; background:white; border:none;
      cursor:pointer; display:flex; align-items:center; justify-content:center;
      font-size:16px; color:#666; font-weight:700;
      box-shadow:0 2px 8px rgba(0,0,0,0.10);
    }
    .ae-candidates {
      display:grid; grid-template-columns:repeat(3,1fr);
      gap:14px; padding:0 18px 22px;
    }
    @media(max-width:640px){ .ae-candidates { grid-template-columns:1fr; } }
    .ae-cand-card {
      background:white; border-radius:18px; padding:20px 18px;
      display:flex; flex-direction:column; position:relative;
      box-shadow:0 2px 12px rgba(0,0,0,0.07);
    }
    .ae-cand-card.popular-card { border:2px solid #ff6b35; }
    .ae-popular-tag {
      position:absolute; top:-1px; left:50%; transform:translateX(-50%);
      background:linear-gradient(90deg,#ff6b35,#ee5a24); color:white;
      font-size:10px; font-weight:800; padding:3px 14px;
      border-radius:0 0 12px 12px; letter-spacing:.8px;
      text-transform:uppercase; white-space:nowrap;
    }
    .ae-cand-top {
      display:flex; align-items:flex-start;
      justify-content:space-between; margin-bottom:12px; margin-top:8px;
    }
    .ae-cand-avatar {
      width:52px; height:52px; border-radius:14px; background:#f0f2f5;
      display:flex; align-items:center; justify-content:center; font-size:26px;
    }
    .ae-cand-level {
      font-size:10px; font-weight:800; letter-spacing:1px;
      color:#aaa; text-transform:uppercase; background:#f0f2f5;
      padding:4px 10px; border-radius:20px;
    }
    .ae-cand-name  { font-size:16px; font-weight:800; color:#111; margin-bottom:4px; line-height:1.2; }
    .ae-cand-role  { font-size:11px; font-weight:600; color:#38b6f5; margin-bottom:8px; letter-spacing:0.3px; }
    .ae-cand-desc  { font-size:12px; color:#777; line-height:1.5; margin-bottom:12px; flex:1; }
    .ae-cand-skills { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:14px; }
    .ae-skill-tag {
      font-size:11px; color:#38b6f5; background:rgba(56,182,245,0.10);
      border-radius:6px; padding:3px 8px; font-weight:500;
    }
    .ae-cand-divider { height:1px; background:#f0f2f5; margin-bottom:12px; }
    .ae-cand-salary-label {
      font-size:10px; font-weight:700; letter-spacing:1px;
      color:#bbb; text-transform:uppercase; margin-bottom:3px;
    }
    .ae-cand-price { font-size:22px; font-weight:900; color:#111; letter-spacing:-0.5px; margin-bottom:12px; }
    .ae-cand-price span { font-size:13px; font-weight:500; color:#aaa; }
    .ae-hire-btn {
      width:100%; padding:13px; background:#1a1a2e; color:white;
      border:none; border-radius:12px; font-size:14px; font-weight:700;
      cursor:pointer; font-family:'Inter',sans-serif;
      display:flex; align-items:center; justify-content:center; gap:8px;
      transition:opacity .15s, transform .12s;
    }
    .ae-hire-btn:hover { opacity:.88; transform:translateY(-1px); }
  `;
  document.head.appendChild(s);
}

// ══════════════════════════════════════════════════════════
//  HTML
// ══════════════════════════════════════════════════════════
function injectHTML() {
  if (document.getElementById("ae-brief-ov")) return;
  document.body.insertAdjacentHTML("beforeend", `
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
        <button class="ae-arch-btn" id="ae-arch-btn">⚡ Architect 3 candidates →</button>
      </div>
    </div>

    <div class="ae-ov" id="ae-load-ov">
      <div class="ae-modal" id="ae-load-modal">
        <div class="ae-brain-wrap">
          <div class="ae-brain-glow"></div>
          <div class="ae-brain-circle">🧠</div>
        </div>
        <div class="ae-load-title">Architecting your employee</div>
        <div class="ae-load-brief" id="ae-load-brief"></div>
        <ul class="ae-steps">
          <li class="ae-step step-pending" id="ae-s1"><div class="ae-step-ic">🔍</div><span class="ae-step-text">Researching the role</span></li>
          <li class="ae-step step-pending" id="ae-s2"><div class="ae-step-ic">🎨</div><span class="ae-step-text">Designing skill profiles</span></li>
          <li class="ae-step step-pending" id="ae-s3"><div class="ae-step-ic">✏️</div><span class="ae-step-text">Drafting 3 candidates</span></li>
          <li class="ae-step step-pending" id="ae-s4"><div class="ae-step-ic">✨</div><span class="ae-step-text">Polishing presentation</span></li>
        </ul>
      </div>
    </div>

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
//  STEPS ANIMATION
// ══════════════════════════════════════════════════════════
function runSteps(cb) {
  let i = 0;
  const ids   = ["ae-s1","ae-s2","ae-s3","ae-s4"];
  const icons = ["🔍","🎨","✏️","✨"];
  function next() {
    if (i > 0) {
      const prev = document.getElementById(ids[i-1]);
      if (prev) {
        prev.className = "ae-step step-done";
        prev.querySelector(".ae-step-ic").textContent = "✓";
        prev.querySelector(".ae-step-ic").style.color = "white";
      }
    }
    if (i < ids.length) {
      const cur = document.getElementById(ids[i]);
      if (cur) cur.className = "ae-step step-active";
      i++;
      setTimeout(next, 750);
    } else {
      setTimeout(cb, 300);
    }
  }
  next();
}

// ══════════════════════════════════════════════════════════
//  BUILD CARDS
// ══════════════════════════════════════════════════════════
function buildCards(candidates) {
  return candidates.map(c => `
    <div class="ae-cand-card ${c.popular ? 'popular-card' : ''}">
      ${c.popular ? '<div class="ae-popular-tag">POPULAR</div>' : ''}
      <div class="ae-cand-top">
        <div class="ae-cand-avatar">${c.emoji}</div>
        <div class="ae-cand-level">${c.level}</div>
      </div>
      <div class="ae-cand-name">${c.name}</div>
      ${c.role ? `<div class="ae-cand-role">${c.role}</div>` : ''}
      <div class="ae-cand-desc">${c.desc}</div>
      <div class="ae-cand-skills">${c.skills.map(s=>`<span class="ae-skill-tag">${s}</span>`).join("")}</div>
      <div class="ae-cand-divider"></div>
      <div class="ae-cand-salary-label">Salary</div>
      <div class="ae-cand-price">$${c.price}<span>/mo</span></div>
      <button class="ae-hire-btn" onclick="window.vnusHire('${c.name.replace(/'/g,"\\'")}','${c.price}','${c.emoji}','${(c.role||'').replace(/'/g,"\\'")}','${c.level}')">Hire →</button>
    </div>
  `).join("");
}

// ══════════════════════════════════════════════════════════
//  OPEN / CLOSE
// ══════════════════════════════════════════════════════════
function closeAll() {
  ["ae-brief-ov","ae-load-ov","ae-result-ov"].forEach(id =>
    document.getElementById(id)?.classList.remove("open")
  );
}

function openBriefPopup(prefill) {
  injectStyles();
  injectHTML();

  // Suggestions
  const sugDiv = document.getElementById("ae-suggestions");
  sugDiv.innerHTML = SUGGESTIONS.map(s =>
    `<button class="ae-sug-chip">${s}</button>`
  ).join("");
  sugDiv.querySelectorAll(".ae-sug-chip").forEach(btn => {
    btn.onclick = () => { document.getElementById("ae-brief-input").value = btn.textContent; };
  });

  if (prefill) document.getElementById("ae-brief-input").value = prefill;
  document.getElementById("ae-brief-ov").classList.add("open");
  setTimeout(() => document.getElementById("ae-brief-input")?.focus(), 300);
}

// ══════════════════════════════════════════════════════════
//  HIRE
// ══════════════════════════════════════════════════════════
window.vnusHire = function(name, price, emoji, role, level) {
  closeAll();
  // payment.js ka openPayment call karo
  if (window.vnusOpenPayment) {
    window.vnusOpenPayment(name, role || level || "", parseInt(price), emoji || "🤖");
  } else {
    const t = document.getElementById("vnus-toast");
    if (t) {
      t.textContent = "⏳ Payment loading... Please try again.";
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), 2500);
    }
  }
};

// ══════════════════════════════════════════════════════════
//  WIRE EVENTS
// ══════════════════════════════════════════════════════════
function wireEvents() {
  // Close buttons
  document.addEventListener("click", e => {
    if (["ae-brief-close","ae-brief-ov","ae-result-close","ae-result-ov"].includes(e.target?.id)) closeAll();
    if (e.target?.id === "ae-rebrief-btn") {
      document.getElementById("ae-result-ov").classList.remove("open");
      document.getElementById("ae-brief-ov").classList.add("open");
    }
  });

  // Architect button
  document.addEventListener("click", e => {
    if (e.target?.id !== "ae-arch-btn") return;
    const brief = document.getElementById("ae-brief-input")?.value.trim();
    if (!brief) { document.getElementById("ae-brief-input")?.focus(); return; }

    document.getElementById("ae-brief-ov").classList.remove("open");
    document.getElementById("ae-load-ov").classList.add("open");
    document.getElementById("ae-load-brief").textContent = `"${brief}"`;

    // Reset steps
    for (let i=1; i<=4; i++) {
      const el = document.getElementById(`ae-s${i}`);
      if (!el) continue;
      el.className = "ae-step step-pending";
      const ic = el.querySelector(".ae-step-ic");
      if (ic) { ic.style.color = ""; ic.textContent = ["🔍","🎨","✏️","✨"][i-1]; }
    }

    runSteps(() => {
      document.getElementById("ae-load-ov").classList.remove("open");
      const candidates = generateCandidates(brief);
      document.getElementById("ae-candidates").innerHTML = buildCards(candidates);
      document.getElementById("ae-result-ov").classList.add("open");
    });
  });

  // Enter in textarea
  document.addEventListener("keydown", e => {
    if (e.target?.id === "ae-brief-input" && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.getElementById("ae-arch-btn")?.click();
    }
    if (e.key === "Escape") closeAll();
  });
}

// ══════════════════════════════════════════════════════════
//  PROCESS INPUT FROM CHATBOX
// ══════════════════════════════════════════════════════════
function processInput(text, isLoggedIn) {
  if (!text.trim()) return;

  if (!isLoggedIn) {
    if (window.openModal) window.openModal("signup");
    return;
  }

  if (!isValidOrder(text)) {
    const t = document.getElementById("vnus-toast");
    if (t) {
      t.textContent = "🤖 Please describe an AI Employee you want to hire!";
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), 3500);
    }
    return;
  }

  openBriefPopup(text);
}

// ══════════════════════════════════════════════════════════
//  WIRE CHATBOX
// ══════════════════════════════════════════════════════════
function wireChatbox() {
  const sendBtn  = document.querySelector(".send-btn");
  const textarea = document.querySelector(".card-textarea");
  if (!sendBtn || !textarea) { setTimeout(wireChatbox, 300); return; }

  wireEvents();

  function handleSend() {
    const text = textarea.value.trim();
    if (!text) return;
    const onDashboard = window.location.href.includes("dashboard");
    processInput(text, onDashboard);
    textarea.value = "";
  }

  sendBtn.addEventListener("click", handleSend);
  textarea.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });

  // Quick pills
  document.querySelectorAll(".quick-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      textarea.value = pill.textContent.trim().replace("Beta","").trim();
      textarea.focus();
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", wireChatbox);
} else {
  setTimeout(wireChatbox, 500);
}