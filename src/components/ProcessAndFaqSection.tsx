import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS, PROCESS_STEPS } from "../data/agencyData";

export function ProcessAndFaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-b border-white/[0.08] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 3-Step Engineering Process */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium tracking-wide text-cyan-400">
            Delivery Methodology
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-4xl [text-wrap:balance]">
            From Workflow Audit to Production Deployment in Weeks
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-white/10 bg-[#111115] p-6"
            >
              <span className="font-mono text-xs font-semibold tabular-nums text-cyan-400">
                Step {step.number}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-zinc-50">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium tracking-wide text-violet-400">
              Frequently Asked Questions
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-50 [text-wrap:balance]">
              Clarity Before We Write a Single Node
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Everything founders ask about pricing structure, delivery speed,
              client data privacy, and post-launch maintenance.
            </p>
          </div>

          <div className="space-y-3 lg:col-span-8">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-xl border border-white/10 bg-[#111115]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="font-display text-sm font-semibold text-zinc-100 sm:text-base">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-cyan-400" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="border-t border-white/[0.06] px-5 py-4 text-sm leading-relaxed text-zinc-400">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
