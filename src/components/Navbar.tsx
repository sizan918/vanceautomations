import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onBookAudit: () => void;
}

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "ROI Calculator", href: "#roi-calculator" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar({ onBookAudit }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#09090B]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Logo with subtle glowing icon */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
        >
          <span
            aria-hidden="true"
            className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 via-zinc-900 to-violet-500/20 shadow-[0_0_18px_rgba(6,182,212,0.28)] transition-shadow duration-200 group-hover:shadow-[0_0_24px_rgba(6,182,212,0.45)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-cyan-300"
            >
              <path
                d="M4 5L12 19L20 5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 5L12 10.5L15 5"
                stroke="#A78BFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-display text-base font-bold tracking-tight text-zinc-50 sm:text-lg">
            Vance Automations
          </span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-sm font-medium text-zinc-400 transition-colors duration-150 hover:text-zinc-50 whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-cyan-400 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookAudit}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-zinc-950 shadow-[0_0_20px_rgba(6,182,212,0.28)] transition-all duration-150 hover:bg-cyan-400 hover:shadow-[0_0_26px_rgba(6,182,212,0.45)] active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Book Free Audit
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/70 text-zinc-200 transition-colors hover:border-white/20 hover:text-white md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/[0.08] bg-[#09090B]/95 backdrop-blur-xl md:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleLinkClick(link.href)}
                className="flex h-11 items-center rounded-lg px-3 text-left text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookAudit();
              }}
              className="mt-2 flex h-11 items-center justify-center rounded-lg bg-cyan-500 px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-cyan-400"
            >
              Book Free Audit
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
