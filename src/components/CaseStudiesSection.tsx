import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Bot, Cpu, ExternalLink, Layers } from "lucide-react";
import { CASE_STUDIES } from "../data/agencyData";
import { CaseStudy, DemoPersona } from "../types";

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onTryLiveBot: (persona: DemoPersona) => void;
}

export function CaseStudiesSection({
  onSelectCaseStudy,
  onTryLiveBot,
}: CaseStudiesSectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section
      id="case-studies"
      className="relative border-b border-white/[0.08] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-violet-400">
              Verified Production Deployments
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-4xl [text-wrap:balance]">
              Featured Case Studies &amp; Live Architectures
            </h2>
          </div>
          <p className="max-w-sm text-sm text-zinc-400">
            Inspect the underlying n8n + Gemini workflow nodes or test each agent
            directly in our live sandbox.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {CASE_STUDIES.map((study, idx) => {
            const imgFailed = Boolean(failedImages[study.id]);
            return (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111115] transition-colors duration-200 hover:border-white/20"
              >
                {/* 16:9 Media Header with Fallback */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-white/[0.08] bg-zinc-900">
                  {!imgFailed ? (
                    <img
                      src={study.imageUrl}
                      alt={study.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [study.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-[#12121a] to-cyan-950/40 p-6 text-center">
                      <Cpu className="mb-2 h-8 w-8 text-cyan-400" />
                      <span className="font-display text-sm font-medium text-zinc-300">
                        {study.clientSector}
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111115] via-[#111115]/20 to-transparent"
                  />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-cyan-300">
                      {study.clientSector}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-zinc-50 sm:text-2xl">
                      {study.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {study.summary}
                    </p>

                    {/* Clean Unboxed Stack Metadata */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-300">
                      <span className="font-medium text-zinc-500">Stack:</span>
                      {study.stack.map((item, itemIdx) => (
                        <span key={item} className="inline-flex items-center gap-2">
                          <span>{item}</span>
                          {itemIdx < study.stack.length - 1 && (
                            <span aria-hidden="true" className="text-zinc-600">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* 3-Column Tabular Metrics Strip */}
                    <div className="mt-6 grid grid-cols-3 gap-3 border-y border-white/[0.08] py-4">
                      {study.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="font-mono text-base font-semibold tabular-nums text-zinc-50 sm:text-lg">
                            {metric.value}
                          </p>
                          <p className="mt-0.5 text-xs text-zinc-400">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectCaseStudy(study)}
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 text-xs font-semibold text-zinc-100 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-white whitespace-nowrap shrink-0 sm:flex-initial"
                    >
                      <Layers className="h-3.5 w-3.5 text-cyan-400" />
                      View Architecture &amp; Metrics
                    </button>

                    <button
                      type="button"
                      onClick={() => onTryLiveBot(study.persona)}
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-zinc-950 transition-colors hover:bg-cyan-400 whitespace-nowrap shrink-0"
                    >
                      <Bot className="h-3.5 w-3.5" />
                      Try Live Bot
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>

                    <a
                      href={study.telegramBotUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 text-xs font-medium text-cyan-300 transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10 whitespace-nowrap shrink-0"
                    >
                      Telegram
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
