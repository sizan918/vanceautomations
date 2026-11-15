import { CaseStudy } from "../types";

export const AGENCY_CONTACT = {
  brandName: "Vance Automations",
  founder: "Sizan Mahmud",
  domain: "vanceautomations.com",
  email: "mahmudsizan50@gmail.com",
  telegramUrl: "https://t.me/YOUR_TECHMART_BOT_USERNAME",
  techmartBotUrl: "https://t.me/YOUR_TECHMART_BOT_USERNAME",
  dreamhomeBotUrl: "https://t.me/YOUR_DREAMHOME_BOT_USERNAME",
  linkedinUrl: "https://linkedin.com/company/vance-automations",
};

export const HERO_VISUAL_URL =
  "/src/assets/images/hero_ai_automation_1794761211173.jpg";

export const TECH_STACK_ITEMS = [
  "n8n",
  "Google Gemini",
  "WhatsApp Cloud API",
  "Telegram API",
  "Google Sheets CRM",
  "OpenAI",
  "Make",
];

export const SERVICES_LIST = [
  {
    number: "01",
    title: "Omnichannel AI Sales & Support Agents",
    channels: "Telegram · WhatsApp · Web",
    description:
      "24/7 conversational agents trained on your catalog, pricing rules, and brand voice—handling voice notes, product inquiries, and instant order capture without human bottlenecks.",
    outcome: "Cuts response latency from hours to under 5 seconds",
    featured: true,
  },
  {
    number: "02",
    title: "Automated Lead Qualification & CRM Sync",
    channels: "n8n · HubSpot · Google Sheets",
    description:
      "Structured qualification pipelines that score inbound prospects, enrich contact records, trigger calendar bookings, and push clean zero-duplicate rows directly to your CRM.",
    outcome: "Eliminates manual data entry & overnight lead drop-off",
    featured: false,
  },
  {
    number: "03",
    title: "AI Vision & Payment/Document Verification Pipelines",
    channels: "Gemini Vision · OCR · Anti-Fraud Ledger",
    description:
      "Multimodal inspection workflows that extract invoice IDs, amounts, and TrxIDs from customer screenshots or PDFs and cross-check every claim against your transaction ledger.",
    outcome: "Stops duplicate & manipulated payment slips automatically",
    featured: false,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "techmart-ai",
    persona: "techmart",
    title: "TechMart AI — E-Commerce Sales, Order Tracking & Anti-Fraud Payment Verifier",
    subtitle: "Automated Checkout, Voice Support & 3-Layer Receipt Defense",
    clientSector: "E-Commerce & Social Commerce",
    imageUrl: "/src/assets/images/case_techmart_ai_1794761212784.jpg",
    imageAlt:
      "Automated e-commerce payment verification scanner and dark glass workstation",
    telegramBotUrl: "https://t.me/YOUR_TECHMART_BOT_USERNAME",
    summary:
      "Engineered an autonomous Telegram commerce & support agent capable of parsing voice orders, answering SKU specifications, tracking live courier dispatches, and verifying mobile payment screenshots against fraud.",
    stack: [
      "n8n",
      "Gemini 2.5 Flash Vision/Audio",
      "Google Sheets CRM",
      "Telegram Bot API",
    ],
    metrics: [
      {
        label: "Response Time",
        value: "<5 sec",
        detail: "Median reply latency across text, audio & image uploads",
      },
      {
        label: "Order Processing",
        value: "90% faster",
        detail: "Automated verification replaces 18-minute manual review queue",
      },
      {
        label: "Fraud Defense",
        value: "3-layer",
        detail: "OCR extraction, timestamp match & duplicate TrxID ledger check",
      },
    ],
    architectureStages: [
      {
        step: "01",
        title: "Multimodal Intake Webhook",
        description:
          "Telegram Bot API routes customer text, OGG voice messages, and payment screenshot buffers directly into an isolated n8n execution queue.",
        tools: ["Telegram Bot API", "n8n Webhook"],
      },
      {
        step: "02",
        title: "Gemini Vision & Audio Parsing",
        description:
          "Gemini transcribes voice requests or extracts structured JSON (TrxID, paid amount, sender number, timestamp) from payment receipts.",
        tools: ["Gemini Vision/Audio", "JSON Schema"],
      },
      {
        step: "03",
        title: "3-Layer Anti-Fraud Verification",
        description:
          "Deterministic n8n nodes verify exact invoice total match, active payment window validity, and uniqueness against the historical TrxID ledger.",
        tools: ["n8n Rules Engine", "Google Sheets Ledger"],
      },
      {
        step: "04",
        title: "CRM Sync & Instant Dispatch Notice",
        description:
          "Verified orders update inventory and status in Google Sheets CRM while sending an instant branded receipt & courier tracking number to the buyer.",
        tools: ["Google Sheets CRM", "Telegram Reply"],
      },
    ],
    fraudOrLeadHighlights: [
      "Detects recycled TrxIDs submitted across different customer accounts",
      "Handles voice-note product queries and multi-item cart calculations",
      "Escalates ambiguous or flagged slips to human ops with extracted evidence",
    ],
  },
  {
    id: "dreamhome-ai",
    persona: "dreamhome",
    title: "DreamHome AI — Real Estate Lead Matcher & Automated Viewing Scheduler",
    subtitle: "24/7 RAG Property Concierge & Automated Site-Visit Booking",
    clientSector: "Real Estate & Brokerage",
    imageUrl: "/src/assets/images/case_dreamhome_ai_1794761211833.jpg",
    imageAlt:
      "Modern luxury glass and concrete twilight residence reflecting violet light",
    telegramBotUrl: "https://t.me/YOUR_DREAMHOME_BOT_USERNAME",
    summary:
      "Built an intelligent property matching and appointment scheduling agent that qualifies buyer intent via text or voice, retrieves live listings from a RAG knowledge base, and books agent viewings automatically.",
    stack: [
      "n8n",
      "Gemini API",
      "RAG Knowledge Base",
      "Telegram Bot",
      "Google Sheets",
    ],
    metrics: [
      {
        label: "Property Matching",
        value: "Instant",
        detail: "Semantic budget, bedroom & district filtering via RAG index",
      },
      {
        label: "Input Modality",
        value: "Voice & Text",
        detail: "Natural conversational qualification for mobile buyers",
      },
      {
        label: "Viewing Pipeline",
        value: "Automated",
        detail: "Direct site-visit slot confirmation synced to broker CRM",
      },
    ],
    architectureStages: [
      {
        step: "01",
        title: "24/7 Inquiry Capture",
        description:
          "Prospective buyers message or send voice memos on Telegram asking for neighborhoods, floor plans, or financing terms.",
        tools: ["Telegram Bot", "n8n Listener"],
      },
      {
        step: "02",
        title: "Intent & Budget Extraction",
        description:
          "Gemini parses conversational nuance—extracting budget ceiling, desired bedrooms, commute zones, and move-in urgency.",
        tools: ["Gemini API", "Structured Extraction"],
      },
      {
        step: "03",
        title: "RAG Listing Retrieval",
        description:
          "Queries the synced property knowledge base to surface verified available units without hallucinating prices or amenities.",
        tools: ["RAG Knowledge Base", "Google Sheets Inventory"],
      },
      {
        step: "04",
        title: "Automated Site-Visit Booking",
        description:
          "Locks in preferred viewing dates, logs a scored lead profile in Google Sheets, and notifies the closing agent before the call.",
        tools: ["Google Sheets CRM", "Calendar / Alert Webhook"],
      },
    ],
    fraudOrLeadHighlights: [
      "Eliminates overnight lead leakage when prospects browse after hours",
      "Pre-qualifies buyer budget & timeline before assigning human brokers",
      "Maintains synchronized unit availability from a single Google Sheet",
    ],
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Free Workflow Audit",
    description:
      "We map your current support queues, CRM bottlenecks, and manual verification steps in a focused 30-minute audit—identifying the highest-ROI automation targets.",
  },
  {
    number: "02",
    title: "Custom AI Engineering",
    description:
      "We architect and build your n8n orchestration pipelines, Gemini Vision/Text prompts, RAG knowledge bases, and webhook integrations with deterministic guardrails.",
  },
  {
    number: "03",
    title: "Deployment & Scaling",
    description:
      "Your agents launch live on Telegram, WhatsApp, or Web with real-time monitoring, fallback alerts, and continuous prompt optimization as inquiry volume scales.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How is pricing structured for custom AI automation builds?",
    answer:
      "Every engagement starts with a scoped fixed-price architecture build based on the number of channels, CRM integrations, and verification layers required—typically structured as a 50% kickoff milestone and 50% upon live deployment. Optional monthly monitoring and prompt-tuning retainers are available if you want hands-off SLA coverage.",
  },
  {
    question: "What is the typical delivery timeline from audit to live launch?",
    answer:
      "Focused single-channel agents (such as a Telegram lead qualifier or invoice vision verifier) typically ship in 10 to 14 days. Multi-channel omnichannel deployments with custom RAG knowledge bases, anti-fraud ledgers, and CRM bi-directional sync take 3 to 4 weeks including end-to-end sandbox testing.",
  },
  {
    question: "How do you handle customer data privacy and API security?",
    answer:
      "We deploy workflows using isolated server-side credentials and zero-retention API configurations wherever supported. Sensitive customer payment screenshots, phone numbers, and CRM records flow strictly between your encrypted n8n instance, Gemini enterprise endpoints, and your own Google Sheets or HubSpot workspace—never shared across tenants.",
  },
  {
    question: "Who maintains the workflows after deployment?",
    answer:
      "You retain 100% ownership of every n8n workflow blueprint, prompt template, and connected CRM sheet. We deliver full technical documentation and a team walkthrough at handover, and you can either manage updates in-house or stay on an optional Vance Automations maintenance retainer for 24/7 uptime monitoring and model upgrades.",
  },
];
