import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Share2, X } from "lucide-react";
import { BlogPost } from "../types";

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onBuildForBusiness: (topic: string) => void;
}

function renderFormattedMarkdown(markdown: string) {
  const blocks = markdown.split(/\n\n+/);
  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      return (
        <h3
          key={index}
          className="mt-7 mb-3 font-display text-xl font-bold tracking-tight text-zinc-50"
        >
          {trimmed.replace(/^##\s+/, "")}
        </h3>
      );
    }

    const lines = trimmed.split("\n");
    const isBulletList = lines.every(
      (line) => line.trim().startsWith("- ") || line.trim().startsWith("* ")
    );
    const isNumberedList = lines.every((line) => /^\d+\.\s+/.test(line.trim()));

    if (isBulletList || isNumberedList) {
      return (
        <ul key={index} className="my-4 space-y-2.5 pl-4 text-zinc-300">
          {lines.map((line, i) => {
            const clean = line
              .trim()
              .replace(/^[-*]\s+/, "")
              .replace(/^\d+\.\s+/, "");
            return (
              <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400"
                />
                <span>{renderInlineBoldAndCode(clean)}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <p
        key={index}
        className="my-4 text-[15px] leading-[1.75] text-zinc-300 sm:text-base"
      >
        {renderInlineBoldAndCode(trimmed)}
      </p>
    );
  });
}

function renderInlineBoldAndCode(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-zinc-50">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-xs text-cyan-300"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function BlogReaderModal({
  post,
  onClose,
  onBuildForBusiness,
}: BlogReaderModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!post) return;
    setCopied(false);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [post, onClose]);

  const handleShare = async () => {
    if (!post) return;
    const shareUrl = `${window.location.origin}/#blog-${post.slug}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      {post && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-reader-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.article
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0E0E12] p-6 shadow-2xl sm:p-10"
          >
            {/* Top Utility Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                <span className="font-medium text-cyan-300">
                  {post.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{post.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{post.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span>By {post.author}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-zinc-200 transition-colors hover:border-cyan-400/40 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-cyan-400" />
                      Link Copied
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5 text-zinc-400" />
                      Share
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close article reader"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Article Headline & Lead */}
            <header className="mt-6">
              <h2
                id="blog-reader-title"
                className="font-display text-2xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-3xl [text-wrap:balance]"
              >
                {post.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                {post.excerpt}
              </p>
            </header>

            {/* Key Takeaways Box */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold tracking-wide text-cyan-300">
                  Key Engineering Takeaways
                </p>
                <ul className="mt-3 space-y-2">
                  {post.keyTakeaways.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-300 sm:text-sm"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full Article Prose */}
            <div className="mt-6 border-t border-white/[0.08] pt-4">
              {renderFormattedMarkdown(post.contentMarkdown)}
            </div>

            {/* Required "Build This For My Business" CTA Banner */}
            <div className="mt-10 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/[0.12] via-[#13131A] to-violet-500/[0.12] p-6 sm:p-7">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-semibold text-cyan-300">
                    Ready to Deploy This Architecture?
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold text-zinc-50 sm:text-xl">
                    Build This For My Business
                  </h3>
                  <p className="mt-1.5 max-w-md text-xs leading-relaxed text-zinc-300 sm:text-sm">
                    Book a free workflow audit with Vance Automations and we
                    will map this exact stack to your CRM and messaging channels.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const topic = post.ctaTopic || post.title;
                    onClose();
                    onBuildForBusiness(topic);
                  }}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-cyan-400 whitespace-nowrap"
                >
                  Build This For My Business
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}
