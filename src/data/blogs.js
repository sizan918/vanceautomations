/**
 * Markdown-ready blog repository for Vance Automations.
 * New posts can be added directly to INITIAL_BLOG_POSTS or created at runtime
 * via the "Admin / Draft New Post" studio (persisted to browser localStorage).
 */

export const BLOG_CATEGORIES = [
  "All",
  "E-Commerce AI",
  "Real Estate",
  "Workflow Guides",
];

export const CUSTOM_BLOGS_STORAGE_KEY = "vance_custom_blogs_v1";

/** @type {import("../types").BlogPost[]} */
export const INITIAL_BLOG_POSTS = [
  {
    id: "ai-vision-fake-payment-screenshots",
    slug: "how-ai-vision-stops-fake-payment-screenshots",
    title: "How AI Vision Stops Fake Payment Screenshots in Social & E-Commerce",
    category: "E-Commerce AI",
    readTime: "4 min read",
    publishedAt: "Oct 28, 2026",
    author: "Sizan Mahmud",
    excerpt:
      "Manual verification of mobile wallet screenshots leaks thousands in uncollected revenue. Here is the 3-layer Gemini Vision + n8n verification architecture we deployed for TechMart AI.",
    keyTakeaways: [
      "Replaces 18-minute manual order confirmation queues with sub-5-second automated extraction.",
      "Cross-checks TrxID uniqueness against an append-only Google Sheets ledger to block recycled receipts.",
      "Flags manipulated font kerning, mismatched timestamps, and rounded-amount tampering before dispatch.",
    ],
    ctaTopic: "AI Vision Payment Verification Pipeline",
    contentMarkdown: `## The Hidden Cost of Manual Receipt Checks

High-velocity social commerce and direct-to-consumer brands in emerging and mobile-first markets process hundreds of daily orders via instant wallet transfers, bank apps, and Telegram or WhatsApp checkout threads. When human support agents manually squint at incoming screenshots, two operational failures happen simultaneously: legitimate buyers wait hours for order confirmation, and manipulated or recycled payment slips quietly slip through during peak sale windows.

## Why Simple OCR Is Not Enough

Basic optical character recognition extracts raw strings, but fraudsters rarely leave text blank—they edit an old confirmation image, swap the amount, or resubmit a legitimate screenshot across two separate orders. Stopping fake screenshots requires multimodal reasoning paired with deterministic ledger rules.

## The 3-Layer Anti-Fraud Architecture

At Vance Automations, our **TechMart AI** pipeline runs every incoming receipt image through three sequential gates inside n8n before an order status flips to Confirmed:

1. **Layer 1 — Multimodal Vision Extraction**: Gemini Vision ingests the raw Telegram or WhatsApp image buffer and returns strict structured JSON: sender wallet, exact currency amount, transaction timestamp, and normalized \`TrxID\`. Blurry or cropped images trigger an instant polite re-upload prompt in under 4 seconds.
2. **Layer 2 — Temporal & Invoice Validation**: n8n compares the extracted amount against the active cart total in Google Sheets CRM and verifies that the transaction timestamp falls within the active checkout window. Any discrepancy routes the ticket to a priority human review channel with the exact delta highlighted.
3. **Layer 3 — Cryptographic & Ledger Deduplication**: The extracted \`TrxID\` is hashed and queried against the master verified ledger. If that transaction ID has ever been claimed on a prior order—even months earlier—the workflow locks fulfillment immediately and notifies the operations lead.

## Measurable Business Impact

Within 14 days of deploying this verification pipeline, TechMart reduced manual order processing time by **90%**, achieved **<5 second** customer acknowledgement round-trips, and eliminated duplicate-screenshot chargebacks without adding a single support hire.`,
  },
  {
    id: "real-estate-agencies-lose-leads-n8n-gemini",
    slug: "why-real-estate-agencies-lose-40-percent-of-leads",
    title:
      "Why Real Estate Agencies Lose 40% of Leads — And How n8n + Gemini Fixes It",
    category: "Real Estate",
    readTime: "5 min read",
    publishedAt: "Oct 19, 2026",
    author: "Sizan Mahmud",
    excerpt:
      "When high-intent property buyers message after business hours, a two-hour reply delay means they have already booked a tour with a competitor. Inside the DreamHome AI workflow.",
    keyTakeaways: [
      "Responding within 60 seconds increases site-visit conversion rates dramatically compared to next-morning callbacks.",
      "RAG retrieval grounds Gemini in live unit pricing, square footage, and neighborhood inventory without hallucinating.",
      "Voice note transcription lets busy buyers describe requirements naturally on Telegram or WhatsApp.",
    ],
    ctaTopic: "Real Estate AI Lead Matcher & Viewing Scheduler",
    contentMarkdown: `## Speed-to-Lead Is the Only Moat Left in Brokerage

Property portals and paid social campaigns generate surges of inquiries outside 9-to-5 office hours. Industry audits consistently show that roughly **40% of inbound real estate leads go cold** simply because no agent picks up within the first 10 minutes. By the next morning, the buyer has already scheduled viewings elsewhere.

## Why Generic Chatbots Fail Property Buyers

Static button-tree chatbots frustrate serious buyers. A prospect looking for a 3-bedroom residence near a transit corridor with a strict budget ceiling does not want to tap through six rigid menus—and they often send a 20-second voice memo while commuting.

## How DreamHome AI Qualifies and Books Automatically

We engineered **DreamHome AI** to operate like a sharp, bilingual property concierge across text and audio:

- **Voice & Text Comprehension**: Incoming Telegram voice notes and text inquiries are processed natively by Gemini, extracting structured search criteria: budget range, bedroom count, preferred district, and move-in timeline.
- **Live RAG Inventory Matching**: Instead of guessing listings, the workflow queries an up-to-date vector/sheet inventory index and returns the top 2 to 3 verified matching units with floor-plan highlights and transparent pricing.
- **Automated Viewing Slot Booking**: Once a prospect expresses interest in a unit, the agent checks available viewing windows, confirms the appointment, writes the qualified lead score to Google Sheets CRM, and alerts the assigned human broker with a clean one-paragraph briefing.

## Result: Zero Cold Leads Overnight

Brokers wake up to a calendar already populated with qualified, budget-verified property tours rather than an inbox full of unanswered "Is this still available?" messages.`,
  },
  {
    id: "telegram-vs-whatsapp-cloud-api-2026",
    slug: "telegram-vs-whatsapp-cloud-api-choosing-ai-channel",
    title:
      "Telegram vs. WhatsApp Cloud API: Choosing the Right AI Agent Channel in 2026",
    category: "Workflow Guides",
    readTime: "3 min read",
    publishedAt: "Nov 04, 2026",
    author: "Sizan Mahmud",
    excerpt:
      "Picking the wrong messaging transport slows deployment and inflates per-conversation fees. A practical engineering comparison for founders building customer-facing AI agents.",
    keyTakeaways: [
      "Telegram Bot API offers zero per-message fees, rich inline keyboards, and rapid webhook iteration.",
      "WhatsApp Cloud API maximizes consumer reach and high-trust business verification for mainstream B2C audiences.",
      "A decoupled n8n orchestration core lets your agency run both channels on a single Gemini + CRM brain.",
    ],
    ctaTopic: "Omnichannel Telegram & WhatsApp AI Agent",
    contentMarkdown: `## Channel Selection Shapes Both UX and Unit Economics

Every AI agent project at Vance Automations starts with the same architectural question: where do your customers already message you, and what interactive controls does the workflow demand?

## Telegram Bot API: Built for Rich Workflows & Zero Friction

For internal operations teams, crypto/SaaS communities, high-frequency commerce bots, and rapid MVP launches, **Telegram Bot API** is unmatched:

- **Zero Meta Approval Wait**: Spin up webhooks, custom inline action buttons, and slash commands in minutes.
- **Zero Per-Conversation Messaging Fees**: High-volume notifications, order status updates, and rich media payloads cost nothing at the transport layer.
- **Seamless File & Voice Buffers**: Images, PDFs, and OGG voice notes stream cleanly into n8n for Gemini multimodal inspection.

## WhatsApp Cloud API: Unbeatable Consumer Ubiquity

For mainstream retail, real estate brokerages, healthcare clinics, and service businesses targeting everyday buyers, **WhatsApp Cloud API** delivers the highest open and reply rates:

- **Native Phone Number Identity**: No separate app download required; prospects message a verified business profile directly.
- **Structured Template Re-engagement**: Approved utility templates let automated workflows send viewing reminders and order dispatch alerts outside the 24-hour customer service window.

## The Smart Pattern: One Brain, Two Transports

You rarely have to lock into one channel forever. By keeping your prompt logic, RAG memory, and CRM sync inside a central **n8n + Gemini** orchestration layer, you can launch on Telegram in days to validate conversion rates and attach WhatsApp Cloud API webhooks to the exact same backend pipeline.`,
  },
];

/**
 * Load custom user-created blog posts from localStorage safely.
 * @returns {import("../types").BlogPost[]}
 */
export function loadCustomBlogPosts() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CUSTOM_BLOGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persist custom blog posts to localStorage safely.
 * @param {import("../types").BlogPost[]} posts
 */
export function saveCustomBlogPosts(posts) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CUSTOM_BLOGS_STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // Ignore storage quota errors silently
  }
}
