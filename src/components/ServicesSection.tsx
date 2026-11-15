import { motion } from "motion/react";
import { Bot, Database, ScanEye } from "lucide-react";
import { SERVICES_LIST } from "../data/agencyData";

const SERVICE_ICONS = [Bot, Database, ScanEye];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative border-b border-white/[0.08] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium tracking-wide text-cyan-400">
            Core Engineering Capabilities
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-4xl [text-wrap:balance]">
            Custom AI Systems Built Around Your Revenue Operations
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            Every workflow is custom-engineered for deterministic reliability—combining
            Gemini multimodal reasoning with n8n orchestration and your existing CRM.
          </p>
        </motion.div>

        {/* Asymmetric 3-Card Bento Layout */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {SERVICES_LIST.map((service, index) => {
            const Icon = SERVICE_ICONS[index] ?? Bot;
            const spanClass =
              index === 0 ? "lg:col-span-6" : "lg:col-span-3";

            return (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${spanClass} group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111115]/90 p-6 sm:p-7 backdrop-blur-md transition-colors duration-200 hover:border-cyan-400/35`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs font-medium tabular-nums text-zinc-500">
                      {service.number}.
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-cyan-400 transition-colors group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-zinc-50">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-cyan-300/90">
                    {service.channels}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-4">
                  <p className="text-xs font-medium text-zinc-300">
                    {service.outcome}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
