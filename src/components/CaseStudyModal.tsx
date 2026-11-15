import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";
import { CaseStudy, DemoPersona } from "../types";

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onTryLiveBot: (persona: DemoPersona) => void;
  onRequestSimilarBuild: (topic: string) => void;
}

export function CaseStudyModal({
  study,
  onClose,
  onTryLiveBot,
  onRequestSimilarBuild,
}: CaseStudyModalProps) {
  useEffect(() => {
    if (!study) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [study, onClose]);

  return (
    <AnimatePresence>
      {study && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[#101014] p-6 shadow-2xl sm:p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <p className="text-xs font-medium text-cyan-400">
                  {study.clientSector} · Architecture Blueprint
                </p>
                <h3
                  id="case-study-modal-title"
                  className="mt-1.5 font-display text-xl font-bold text-zinc-50 sm:text-2xl"
                >
                  {study.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close architecture modal"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Verified Metrics Grid */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {study.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
                >
                  <p className="font-mono text-xl font-semibold tabular-nums text-cyan-300">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-zinc-100">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* 4-Stage Pipeline Architecture */}
            <div className="mt-8">
              <h4 className="font-display text-sm font-semibold tracking-wide text-zinc-200">
                4-Stage Production Workflow Pipeline
              </h4>
              <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                {study.architectureStages.map((stage) => (
                  <div
                    key={stage.step}
                    className="rounded-xl border border-white/[0.08] bg-[#16161C] p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold tabular-nums text-cyan-400">
                        Stage {stage.step}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {stage.tools.join(" · ")}
                      </span>
                    </div>
                    <h5 className="mt-2 font-display text-sm font-semibold text-zinc-50">
                      {stage.title}
                    </h5>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Safeguards & Highlights */}
            <div className="mt-7 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h4 className="font-display text-sm font-semibold text-zinc-100">
                Operational Safeguards &amp; Outcomes
              </h4>
              <ul className="mt-3 space-y-2.5">
                {study.fraudOrLeadHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-300 sm:text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const persona = study.persona;
                    onClose();
                    onTryLiveBot(persona);
                  }}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-zinc-950 transition-colors hover:bg-cyan-400 whitespace-nowrap shrink-0"
                >
                  <Bot className="h-4 w-4" />
                  Try This Agent Live
                </button>

                <a
                  href={study.telegramBotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white whitespace-nowrap shrink-0"
                >
                  Open Telegram Demo
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  const title = study.title;
                  onClose();
                  onRequestSimilarBuild(`Build similar to ${title}`);
                }}
                className="inline-flex h-10 items-center gap-1.5 text-xs font-semibold text-violet-300 transition-colors hover:text-violet-200 whitespace-nowrap shrink-0"
              >
                Request Similar Architecture
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
