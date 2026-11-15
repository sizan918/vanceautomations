import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, ExternalLink, Mail, Send } from "lucide-react";
import { AGENCY_CONTACT } from "../data/agencyData";
import { AuditInquiry } from "../types";

interface ContactFooterSectionProps {
  prefilledGoal: string;
  inquiries: AuditInquiry[];
  onSubmitInquiry: (inquiry: AuditInquiry) => void;
}

const BUSINESS_TYPES = [
  "E-Commerce & Social Commerce",
  "Real Estate & Brokerage",
  "B2B SaaS / Agency",
  "Healthcare & Clinics",
  "Logistics & Operations",
  "Other",
];

export function ContactFooterSection({
  prefilledGoal,
  inquiries,
  onSubmitInquiry,
}: ContactFooterSectionProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0]);
  const [automationGoal, setAutomationGoal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedInquiry, setConfirmedInquiry] = useState<AuditInquiry | null>(
    null
  );

  useEffect(() => {
    if (prefilledGoal) {
      setAutomationGoal(prefilledGoal);
      setConfirmedInquiry(null);
    }
  }, [prefilledGoal]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    const trimmedGoal = automationGoal.trim();

    if (trimmedName.length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    const emailOrPhoneLooksValid =
      trimmedContact.includes("@") ||
      /^[+\d][\d\s()-]{6,}$/.test(trimmedContact);
    if (!emailOrPhoneLooksValid) {
      setErrorMsg(
        "Please enter a valid work email address or WhatsApp number."
      );
      return;
    }

    if (trimmedGoal.length < 8) {
      setErrorMsg(
        "Briefly describe the workflow or bottleneck you want to automate."
      );
      return;
    }

    const newInquiry: AuditInquiry = {
      id: `inq-${Date.now()}`,
      name: trimmedName,
      contact: trimmedContact,
      businessType,
      automationGoal: trimmedGoal,
      submittedAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    onSubmitInquiry(newInquiry);
    setConfirmedInquiry(newInquiry);
    setErrorMsg("");
    setName("");
    setContact("");
    setAutomationGoal("");
  };

  return (
    <footer id="contact" className="relative pt-20 pb-12 sm:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Audit Value & Direct Contact Channels */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-cyan-400">
              Book Free Audit
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-4xl [text-wrap:balance]">
              Ready to Automate 80% of Manual Operations?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Share your current inquiry channels and manual bottlenecks. Sizan
              Mahmud and the Vance Automations engineering team will prepare a
              custom architecture roadmap within 24 hours.
            </p>

            <div className="mt-8 space-y-3 border-t border-white/[0.08] pt-6">
              <a
                href={`mailto:${AGENCY_CONTACT.email}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-[#111115] px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-cyan-400/40 hover:text-white"
              >
                <span className="inline-flex items-center gap-3">
                  <Mail className="h-4 w-4 text-cyan-400" />
                  {AGENCY_CONTACT.email}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
              </a>

              <a
                href={AGENCY_CONTACT.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-[#111115] px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-cyan-400/40 hover:text-white"
              >
                <span className="inline-flex items-center gap-3">
                  <Send className="h-4 w-4 text-cyan-400" />
                  Telegram · @YOUR_TECHMART_BOT_USERNAME
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
              </a>

              <a
                href={AGENCY_CONTACT.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-[#111115] px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-violet-400/40 hover:text-white"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-violet-500/20 font-mono text-[10px] font-bold text-violet-300">
                    in
                  </span>
                  LinkedIn · Vance Automations
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#111115] p-6 sm:p-8">
              {confirmedInquiry ? (
                <div className="py-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-zinc-50">
                    Audit Request Confirmed
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    Thank you,{" "}
                    <span className="font-semibold text-white">
                      {confirmedInquiry.name}
                    </span>
                    . Your workflow audit brief for{" "}
                    <span className="text-cyan-300">
                      {confirmedInquiry.businessType}
                    </span>{" "}
                    is logged and saved. We will follow up via{" "}
                    <span className="font-mono text-xs text-zinc-100">
                      {confirmedInquiry.contact}
                    </span>{" "}
                    shortly.
                  </p>

                  <div className="mt-5 rounded-xl border border-white/[0.08] bg-[#09090B] p-4 text-xs text-zinc-400">
                    <p className="font-medium text-zinc-200">
                      Automation Goal Recorded:
                    </p>
                    <p className="mt-1 leading-relaxed">
                      {confirmedInquiry.automationGoal}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setConfirmedInquiry(null)}
                      className="h-10 rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-zinc-950 transition-colors hover:bg-cyan-400"
                    >
                      Submit Another Inquiry
                    </button>
                    <a
                      href={AGENCY_CONTACT.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/15 px-4 text-xs font-medium text-zinc-200 hover:border-white/30 hover:text-white"
                    >
                      Message Directly on Telegram
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="lead-name"
                        className="block text-xs font-medium text-zinc-300"
                      >
                        Your Name
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#09090B] px-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lead-contact"
                        className="block text-xs font-medium text-zinc-300"
                      >
                        Email or WhatsApp Number
                      </label>
                      <input
                        id="lead-contact"
                        type="text"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="alex@company.com or +1 555 234 5678"
                        className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#09090B] px-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lead-business"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Business Type
                    </label>
                    <select
                      id="lead-business"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#09090B] px-3.5 text-sm text-zinc-100 focus:border-cyan-400 focus:outline-none"
                    >
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="lead-goal"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Automation Goal
                    </label>
                    <textarea
                      id="lead-goal"
                      rows={4}
                      required
                      value={automationGoal}
                      onChange={(e) => setAutomationGoal(e.target.value)}
                      placeholder="e.g., Automate WhatsApp customer inquiries, verify mobile wallet payment screenshots, and sync qualified leads into Google Sheets CRM."
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#09090B] p-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  {errorMsg && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-rose-400"
                    >
                      {errorMsg}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-zinc-500">
                      Zero obligation · NDA available upon request
                    </p>
                    <button
                      type="submit"
                      className="inline-flex h-11 items-center justify-center rounded-lg bg-cyan-500 px-6 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_rgba(6,182,212,0.28)] transition-colors hover:bg-cyan-400 whitespace-nowrap shrink-0"
                    >
                      Book Free Workflow Audit
                    </button>
                  </div>
                </form>
              )}

              {inquiries.length > 0 && !confirmedInquiry && (
                <p className="mt-4 border-t border-white/[0.06] pt-3 text-xs text-zinc-500">
                  Saved inquiries on this browser:{" "}
                  <span className="font-mono tabular-nums text-zinc-300">
                    {inquiries.length}
                  </span>{" "}
                  (latest: {inquiries[0].businessType} ·{" "}
                  {inquiries[0].submittedAt})
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quiet Copyright Footer */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-display font-semibold text-zinc-300">
              Vance Automations
            </span>
            <span aria-hidden="true">·</span>
            <span>Founded by {AGENCY_CONTACT.founder}</span>
            <span aria-hidden="true">·</span>
            <span>{AGENCY_CONTACT.domain}</span>
          </div>
          <p>
            © {new Date().getFullYear()} Vance Automations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
