import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock, DollarSign, Zap } from "lucide-react";

interface ROICalculatorSectionProps {
  onLockInSavings: (contextText: string) => void;
}

export function ROICalculatorSection({
  onLockInSavings,
}: ROICalculatorSectionProps) {
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(2500);
  const [hourlyCost, setHourlyCost] = useState<number>(18);

  // Calculation model:
  // Average manual handling = 6 minutes (0.10 hr) per customer inquiry.
  // Custom AI agent pipeline automates ~80% of repetitive inquiries end-to-end.
  const metrics = useMemo(() => {
    const manualHoursTotal = monthlyInquiries * 0.1;
    const hoursSaved = Math.round(manualHoursTotal * 0.8);
    const costSavings = Math.round(hoursSaved * hourlyCost);
    const annualSavings = costSavings * 12;

    return {
      hoursSaved,
      costSavings,
      annualSavings,
    };
  }, [monthlyInquiries, hourlyCost]);

  return (
    <section
      id="roi-calculator"
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
            Interactive Savings Estimator
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-4xl [text-wrap:balance]">
            Calculate Your Monthly AI Automation ROI
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            Model your current support volume and hourly team cost to see the
            workload and payroll capacity reclaimed by custom AI agents.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 rounded-2xl border border-white/10 bg-[#111115] p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: Interactive Sliders */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div className="space-y-8">
              {/* Slider 1: Monthly Customer Inquiries */}
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor="roi-inquiries"
                    className="text-sm font-medium text-zinc-200"
                  >
                    Monthly Customer Inquiries
                  </label>
                  <span className="font-mono text-lg font-semibold tabular-nums text-cyan-300">
                    {monthlyInquiries.toLocaleString()}
                  </span>
                </div>
                <input
                  id="roi-inquiries"
                  type="range"
                  min={100}
                  max={10000}
                  step={100}
                  value={monthlyInquiries}
                  onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                  className="vance-slider mt-4"
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] tabular-nums text-zinc-500">
                  <span>100</span>
                  <span>5,000</span>
                  <span>10,000</span>
                </div>
              </div>

              {/* Slider 2: Average Support Cost per Hour */}
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor="roi-hourly-cost"
                    className="text-sm font-medium text-zinc-200"
                  >
                    Average Support Cost per Hour ($)
                  </label>
                  <span className="font-mono text-lg font-semibold tabular-nums text-violet-300">
                    ${hourlyCost}/hr
                  </span>
                </div>
                <input
                  id="roi-hourly-cost"
                  type="range"
                  min={5}
                  max={50}
                  step={1}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  className="vance-slider mt-4"
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] tabular-nums text-zinc-500">
                  <span>$5</span>
                  <span>$25</span>
                  <span>$50</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.08] pt-5">
              <p className="text-xs leading-relaxed text-zinc-400">
                Benchmark assumes 6 minutes average manual handling per inquiry
                and 80% autonomous resolution across Telegram, WhatsApp, and CRM
                sync.
              </p>
              <button
                type="button"
                onClick={() =>
                  onLockInSavings(
                    `ROI Estimate: ${monthlyInquiries.toLocaleString()} monthly inquiries at $${hourlyCost}/hr (~$${metrics.costSavings.toLocaleString()}/mo projected savings)`
                  )
                }
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-zinc-950 transition-colors hover:bg-cyan-400 whitespace-nowrap shrink-0"
              >
                Audit My Workflow for These Savings
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Real-Time Dynamic Output Cards */}
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 xl:grid-cols-3">
            {/* Output Card 1: Hours Saved */}
            <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#16161C] p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-zinc-400">
                  Estimated Hours Saved/Month
                </span>
                <Clock className="h-4 w-4 shrink-0 text-cyan-400" />
              </div>
              <div className="mt-6">
                <p className="font-mono text-3xl font-bold tracking-tight tabular-nums text-zinc-50">
                  {metrics.hoursSaved.toLocaleString()}
                  <span className="ml-1.5 text-sm font-normal text-zinc-400">
                    hrs
                  </span>
                </p>
                <p className="mt-2 text-xs text-zinc-400">
                  Equivalent to{" "}
                  <span className="font-mono tabular-nums text-zinc-200">
                    {(metrics.hoursSaved / 160).toFixed(1)}
                  </span>{" "}
                  full-time reps freed
                </p>
              </div>
            </div>

            {/* Output Card 2: Cost Savings */}
            <div className="flex flex-col justify-between rounded-xl border border-cyan-400/25 bg-gradient-to-b from-cyan-500/[0.08] to-[#16161C] p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-cyan-200">
                  Estimated Cost Savings/Month
                </span>
                <DollarSign className="h-4 w-4 shrink-0 text-cyan-300" />
              </div>
              <div className="mt-6">
                <p className="font-mono text-3xl font-bold tracking-tight tabular-nums text-cyan-300">
                  ${metrics.costSavings.toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-zinc-300">
                  <span className="font-mono tabular-nums text-zinc-100">
                    ${metrics.annualSavings.toLocaleString()}
                  </span>{" "}
                  projected annual savings
                </p>
              </div>
            </div>

            {/* Output Card 3: Response Time Improvement */}
            <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#16161C] p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-zinc-400">
                  Response Time Improvement
                </span>
                <Zap className="h-4 w-4 shrink-0 text-violet-400" />
              </div>
              <div className="mt-6">
                <p className="font-mono text-2xl font-bold tracking-tight tabular-nums text-zinc-50 sm:text-[1.65rem]">
                  2 hrs{" "}
                  <span aria-hidden="true" className="text-violet-400">
                    →
                  </span>{" "}
                  4 sec
                </p>
                <p className="mt-2 text-xs text-zinc-400">
                  Instant 24/7 replies across time zones &amp; weekends
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
