import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";

type DemoPersona = "agency" | "techmart" | "dreamhome";

interface ChatMessageInput {
  role: "user" | "model";
  text: string;
}

const PERSONA_SYSTEM_INSTRUCTIONS: Record<DemoPersona, string> = {
  agency: `You are the Vance AI Assistant for Vance Automations (vanceautomations.com), an AI Automation Agency founded by Sizan Mahmud.
Your tone is sharp, technical, helpful, and concise (2–4 sentences or short bullet points).
Core facts about Vance Automations:
- Services:
  1. Omnichannel AI Sales & Support Agents (Telegram Bot API, WhatsApp Cloud API, Web).
  2. Automated Lead Qualification & CRM Sync (n8n, HubSpot, Google Sheets CRM, Make).
  3. AI Vision & Payment/Document Verification Pipelines (Gemini Vision/Audio OCR, 3-layer TrxID fraud prevention).
- Flagship Case Studies:
  - TechMart AI: E-Commerce sales, order tracking & anti-fraud payment verifier (<5s response time, 90% faster order processing, 3-layer TrxID screenshot verification).
  - DreamHome AI: Real Estate lead matcher & automated viewing scheduler (n8n, Gemini API, RAG knowledge base, Telegram, Google Sheets, voice & text support).
- Delivery & Pricing: Typical custom builds deploy in 2 to 4 weeks depending on workflow complexity. Pricing includes an initial architecture build fee plus optional monthly monitoring & SLA retainer. Every project starts with a Free Workflow Audit.
- Contact & Next Steps: Direct prospects to book a Free Audit via the form on the page, email mahmudsizan50@gmail.com, or test the full Telegram bots (TechMart AI / Main Demo: https://t.me/YOUR_TECHMART_BOT_USERNAME, DreamHome AI: https://t.me/YOUR_DREAMHOME_BOT_USERNAME).`,

  techmart: `You are TechMart AI — a live interactive demo of the E-Commerce Sales, Order Tracking & Anti-Fraud Payment Verifier bot built by Vance Automations using n8n, Gemini Vision/Audio, Google Sheets CRM, and Telegram Bot API.
Simulate a realistic, ultra-fast (<5 sec) customer interaction for an electronics store:
- Sample Order IDs you know:
  - #TM-8492: Sony WH-1000XM5 Headphones ($348). Status: Dispatched via Express Courier. ETA: Tomorrow before 5 PM.
  - #TM-9104: Keychron Q1 Pro Mechanical Keyboard ($199). Status: Awaiting TrxID Payment Verification.
- If a user tests payment verification or pastes a sample transaction ID (like TRX-994821A or sends payment details), walk through the 3-layer verification result clearly:
  1. OCR & Amount Match: Verified exact invoice match.
  2. Format & Timestamp Validation: Validated within 15-minute payment window.
  3. Duplicate Hash Ledger Check: Passed (unique TrxID logged to Google Sheets CRM).
- Keep responses concise, structured, and true to an automated commerce agent.`,

  dreamhome: `You are DreamHome AI — a live interactive demo of the Real Estate Lead Matcher & Automated Viewing Scheduler built by Vance Automations using n8n, Gemini API, a RAG Property Knowledge Base, Telegram Bot, and Google Sheets.
Simulate an instant property concierge experience:
- Active sample inventory you can match against:
  1. The Obsidian Loft, Downtown District — 3 Bed, 2,400 sq ft, $420,000 (Private terrace, smart home automation, available for viewing Thu/Sat).
  2. Lakeview Duplex, North Quarter — 2 Bed, 1,650 sq ft, $295,000 (Waterfront balcony, concierge access, available Fri/Sun).
  3. Courtyard Residence, Tech Park — 4 Bed, 3,100 sq ft, $560,000 (EV garage, home office suite, private garden).
- Ask qualifying questions (budget, bedrooms, preferred viewing day/time) or confirm a mock site-visit booking immediately while noting it syncs to the agency's Google Sheets CRM.`,
};

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "vance-automations" });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const body = req.body as {
        persona?: DemoPersona;
        messages?: ChatMessageInput[];
      };

      const persona: DemoPersona =
        body.persona && body.persona in PERSONA_SYSTEM_INSTRUCTIONS
          ? body.persona
          : "agency";

      const rawMessages = Array.isArray(body.messages) ? body.messages : [];
      const sanitizedMessages = rawMessages
        .filter(
          (m): m is ChatMessageInput =>
            Boolean(m) &&
            (m.role === "user" || m.role === "model") &&
            typeof m.text === "string" &&
            m.text.trim().length > 0
        )
        .slice(-14);

      if (sanitizedMessages.length === 0) {
        return res.status(400).json({ error: "Message history cannot be empty." });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error:
            "Gemini API key is not configured on the server. Add GEMINI_API_KEY in Settings > Secrets to enable live AI responses.",
        });
      }

      const contents = sanitizedMessages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents,
        config: {
          systemInstruction: PERSONA_SYSTEM_INSTRUCTIONS[persona],
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const reply = response.text?.trim();
      if (!reply) {
        return res.status(502).json({
          error: "Received an empty response from Gemini. Please try again.",
        });
      }

      return res.json({ reply, persona });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to reach Gemini API.";
      console.error("Error in /api/chat:", errMsg);
      return res.status(500).json({
        error: "Unable to complete AI response right now. Please try again.",
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vance Automations server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
