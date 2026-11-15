import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  ExternalLink,
  MessageSquare,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import { AGENCY_CONTACT } from "../data/agencyData";
import { ChatMessage, DemoPersona } from "../types";

interface VanceAssistantWidgetProps {
  isOpen: boolean;
  activePersona: DemoPersona;
  onToggleOpen: (open: boolean) => void;
  onChangePersona: (persona: DemoPersona) => void;
}

const PERSONA_CONFIG: Record<
  DemoPersona,
  {
    label: string;
    subtitle: string;
    welcome: string;
    quickPrompts: string[];
  }
> = {
  agency: {
    label: "Vance Concierge",
    subtitle: "Ask about services, timelines & custom builds",
    welcome:
      "Hello! I am the Vance AI Assistant. Ask me about our n8n + Gemini architectures, delivery timelines, pricing, or switch tabs above to test TechMart AI and DreamHome AI live.",
    quickPrompts: [
      "How long does a custom AI agent take to launch?",
      "Explain the 3-layer payment fraud verifier",
      "How is pricing structured?",
    ],
  },
  techmart: {
    label: "TechMart AI",
    subtitle: "E-Commerce order tracking & TrxID verifier",
    welcome:
      "TechMart AI online (<5s SLA). Ask to track order #TM-8492 or test our 3-layer TrxID payment verification with a sample transaction ID like TRX-994821A.",
    quickPrompts: [
      "Where is my order #TM-8492?",
      "Verify payment TrxID TRX-994821A for order #TM-9104",
      "Do you accept voice notes for support?",
    ],
  },
  dreamhome: {
    label: "DreamHome AI",
    subtitle: "Real estate lead matcher & viewing scheduler",
    welcome:
      "Welcome to DreamHome AI. Share your target budget, bedroom count, or neighborhood and I will match live listings and schedule a site viewing.",
    quickPrompts: [
      "Looking for a 3-bed home around $420,000",
      "Book a viewing for The Obsidian Loft on Saturday",
      "What 2-bedroom waterfront units are open?",
    ],
  },
};

function makeInitialMessage(persona: DemoPersona): ChatMessage {
  return {
    id: `welcome-${persona}-${Date.now()}`,
    role: "model",
    text: PERSONA_CONFIG[persona].welcome,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export function VanceAssistantWidget({
  isOpen,
  activePersona,
  onToggleOpen,
  onChangePersona,
}: VanceAssistantWidgetProps) {
  const [histories, setHistories] = useState<Record<DemoPersona, ChatMessage[]>>(
    () => ({
      agency: [makeInitialMessage("agency")],
      techmart: [makeInitialMessage("techmart")],
      dreamhome: [makeInitialMessage("dreamhome")],
    })
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const currentMessages = histories[activePersona];
  const currentConfig = PERSONA_CONFIG[activePersona];

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [isOpen, currentMessages, isLoading]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const nextHistory = [...currentMessages, userMsg];
    setHistories((prev) => ({
      ...prev,
      [activePersona]: nextHistory,
    }));
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona: activePersona,
          messages: nextHistory.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        throw new Error(
          data.error || "Unable to reach the Vance AI Assistant right now."
        );
      }

      const botMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setHistories((prev) => ({
        ...prev,
        [activePersona]: [...nextHistory, botMsg],
      }));
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Connection error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleReset = () => {
    setErrorMsg(null);
    setHistories((prev) => ({
      ...prev,
      [activePersona]: [makeInitialMessage(activePersona)],
    }));
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            aria-label="Vance AI Assistant Chat"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex h-[min(560px,78vh)] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0E0E13]/95 shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            {/* Widget Header */}
            <div className="border-b border-white/[0.08] bg-[#121218] px-4 py-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-500/15 text-cyan-300">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-zinc-50">
                      Vance AI Assistant
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      {currentConfig.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    aria-label="Reset conversation"
                    title="Reset conversation"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-zinc-100"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleOpen(false)}
                    aria-label="Minimize chat widget"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-zinc-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Live Persona Switcher Tabs */}
              <div className="mt-3 grid grid-cols-3 gap-1 rounded-lg border border-white/10 bg-[#09090B] p-1">
                {(Object.keys(PERSONA_CONFIG) as DemoPersona[]).map((key) => {
                  const active = activePersona === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setErrorMsg(null);
                        onChangePersona(key);
                      }}
                      className={`rounded-md px-2 py-1.5 text-[11px] font-medium transition-colors truncate ${
                        active
                          ? "bg-cyan-500 text-zinc-950 font-semibold"
                          : "text-zinc-400 hover:text-zinc-100"
                      }`}
                    >
                      {PERSONA_CONFIG[key].label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Messages Thread */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-cyan-500 text-zinc-950 font-medium"
                        : "border border-white/10 bg-[#17171E] text-zinc-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-1 font-mono text-[10px] text-zinc-600">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start">
                  <div className="rounded-xl border border-white/10 bg-[#17171E] px-3.5 py-2.5 text-xs text-zinc-400">
                    Thinking...
                  </div>
                </div>
              )}

              {errorMsg && (
                <div
                  role="alert"
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-200"
                >
                  {errorMsg}
                </div>
              )}

              {/* Quick Prompts */}
              {currentMessages.length <= 2 && !isLoading && (
                <div className="pt-2">
                  <p className="mb-2 text-[11px] font-medium text-zinc-500">
                    Try a sample prompt:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {currentConfig.quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-xs text-zinc-300 transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Composer & Full Telegram Demo Action */}
            <div className="border-t border-white/[0.08] bg-[#121218] p-3">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Message ${currentConfig.label}...`}
                  aria-label="Message Vance AI Assistant"
                  className="h-10 flex-1 rounded-lg border border-white/10 bg-[#09090B] px-3 text-xs text-zinc-100 placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500 text-zinc-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <a
                href={
                  activePersona === "dreamhome"
                    ? AGENCY_CONTACT.dreamhomeBotUrl
                    : AGENCY_CONTACT.telegramUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-cyan-300 transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10"
              >
                Launch Full Telegram Bot Demo
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Floating Toggle Bubble */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onToggleOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={
            isOpen ? "Close Vance AI Assistant" : "Open Vance AI Assistant"
          }
          className="inline-flex h-12 items-center gap-2.5 rounded-full border border-cyan-400/35 bg-[#121218]/95 px-4 text-xs font-semibold text-zinc-50 shadow-[0_10px_35px_rgba(6,182,212,0.25)] backdrop-blur-xl transition-all duration-150 hover:border-cyan-400/60 hover:bg-[#171720] active:scale-[0.98]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-zinc-950">
            {isOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <MessageSquare className="h-4 w-4" />
            )}
          </span>
          <span className="whitespace-nowrap">
            {isOpen ? "Close Chat" : "Vance AI Assistant"}
          </span>
        </button>
      </div>
    </div>
  );
}
