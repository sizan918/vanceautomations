import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Bot, Cpu, ExternalLink, Layers } from "lucide-react";
import {
  AGENCY_CONTACT,
  HERO_VISUAL_URL,
  TECH_STACK_ITEMS,
} from "../data/agencyData";
import { DemoPersona } from "../types";

interface HeroSectionProps {
  onExploreCaseStudies: () => void;
  onTryLiveDemo: (persona?: DemoPersona) => void;
}

export function HeroSection({
  onExploreCaseStudies,
  onTryLiveDemo,
}: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/[0.08] pt-12 pb-0 sm:pt-16 lg:pt-20"
    >
      {/* Subtle Cyan & Violet Ambient Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-1/6 h-80 w-80 rounded-full bg-violet-500/12 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Core Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 rounded-md border border-cyan-400/25 bg-cyan-500/[0.07] px-3 py-1.5 text-xs font-medium tracking-wide text-cyan-300">
                <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                Available for Q4 Custom AI Projects
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-zinc-50 [text-wrap:balance]">
              Automate Your Business Operations with Custom AI Agents
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300/90 sm:text-lg">
              We engineer 24/7 AI sales, customer support, and anti-fraud workflow
              systems that cut manual workload by 80% and scale revenue.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onExploreCaseStudies}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-cyan-500 px-5 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_rgba(6,182,212,0.28)] transition-all duration-150 hover:bg-cyan-400 hover:shadow-[0_0_32px_rgba(6,182,212,0.45)] active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Explore Case Studies
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => onTryLiveDemo("agency")}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 text-sm font-medium text-zinc-100 backdrop-blur-md transition-all duration-150 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <Bot className="h-4 w-4 text-violet-400" />
                Try Live Demo Bot
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.08] pt-5 text-xs text-zinc-400">
              <span>Founded by Sizan Mahmud</span>
              <span aria-hidden="true" className="text-zinc-600">
                ·
              </span>
              <span className="font-mono tabular-nums text-zinc-300">
                &lt;5s Median Agent Latency
              </span>
              <span aria-hidden="true" className="text-zinc-600">
                ·
              </span>
              <a
                href={AGENCY_CONTACT.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-300 transition-colors hover:text-cyan-200"
              >
                Live Telegram Demo Bot
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Bespoke Architectural AI Automation Visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <div className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
              <div className="relative aspect-video lg:aspect-auto lg:h-full w-full overflow-hidden bg-zinc-900">
                {!imageError ? (
                  <img
                    src={HERO_VISUAL_URL}
                    alt="Isometric dark glass neural workflow pipelines engineered by Vance Automations"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[260px] w-full flex-col items-center justify-center bg-gradient-to-br from-cyan-950/60 via-zinc-900 to-violet-950/60 p-6 text-center">
                    <Layers className="mb-3 h-10 w-10 text-cyan-400" />
                    <p className="font-display text-sm font-semibold text-zinc-200">
                      Autonomous Multi-Agent Pipeline
                    </p>
                  </div>
                )}

                {/* Subtle Contrast Scrim */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/25 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-xs font-medium text-cyan-300">
                    Autonomous Production Stack
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-zinc-50">
                    Deterministic guardrails meet multimodal Gemini reasoning
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 3-KPI Proof Row below Hero Split */}
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
          <div className="bg-[#0D0D11] px-6 py-4">
            <p className="font-mono text-xl font-semibold tabular-nums text-zinc-50">
              80%
            </p>
            <p className="mt-0.5 text-xs text-zinc-400">
              Reduction in repetitive manual support &amp; data entry
            </p>
          </div>
          <div className="bg-[#0D0D11] px-6 py-4">
            <p className="font-mono text-xl font-semibold tabular-nums text-cyan-300">
              &lt;4.0 sec
            </p>
            <p className="mt-0.5 text-xs text-zinc-400">
              24/7 response speed across Telegram, WhatsApp &amp; Web
            </p>
          </div>
          <div className="bg-[#0D0D11] px-6 py-4">
            <p className="font-mono text-xl font-semibold tabular-nums text-violet-300">
              3-Layer
            </p>
            <p className="mt-0.5 text-xs text-zinc-400">
              AI Vision OCR &amp; ledger anti-fraud screenshot verification
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Tech Stack Marquee Strip */}
      <div className="mt-12 border-t border-white/[0.08] bg-zinc-950/60 py-5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-3">
          <p className="text-xs font-medium text-zinc-400">
            Engineered on battle-tested automation &amp; AI infrastructure
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#09090B] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#09090B] to-transparent"
          />

          <div className="animate-vance-marquee flex items-center gap-6">
            {[...TECH_STACK_ITEMS, ...TECH_STACK_ITEMS, ...TECH_STACK_ITEMS].map(
              (tech, idx) => (
                <div
                  key={`${tech}-${idx}`}
                  className="flex items-center gap-6 whitespace-nowrap shrink-0"
                >
                  <span className="font-display text-sm font-semibold tracking-tight text-zinc-300 transition-colors hover:text-cyan-300 sm:text-base">
                    {tech}
                  </span>
                  <span aria-hidden="true" className="text-zinc-700">
                    /
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
