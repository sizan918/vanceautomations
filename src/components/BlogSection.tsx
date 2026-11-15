import { FormEvent, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Eye,
  FilePlus2,
  Trash2,
  X,
} from "lucide-react";
import { BLOG_CATEGORIES } from "../data/blogs.js";
import { BlogPost } from "../types";

interface BlogSectionProps {
  posts: BlogPost[];
  onOpenPost: (post: BlogPost) => void;
  onAddCustomPost: (post: BlogPost) => void;
  onDeleteCustomPost: (id: string) => void;
}

export function BlogSection({
  posts,
  onOpenPost,
  onAddCustomPost,
  onDeleteCustomPost,
}: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isComposerOpen, setIsComposerOpen] = useState<boolean>(false);
  const [composerTab, setComposerTab] = useState<"write" | "preview">("write");

  const [draftTitle, setDraftTitle] = useState("");
  const [draftCategory, setDraftCategory] = useState<
    "E-Commerce AI" | "Real Estate" | "Workflow Guides"
  >("Workflow Guides");
  const [draftReadTime, setDraftReadTime] = useState("4 min read");
  const [draftExcerpt, setDraftExcerpt] = useState("");
  const [draftMarkdown, setDraftMarkdown] = useState(
    `## Why This Workflow Matters\n\nDescribe the operational bottleneck and how custom AI agents remove manual steps.\n\n- Automated trigger intake via Telegram or WhatsApp\n- Structured Gemini extraction into Google Sheets CRM`
  );
  const [draftError, setDraftError] = useState("");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  const handlePublishDraft = (e: FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim() || !draftExcerpt.trim() || !draftMarkdown.trim()) {
      setDraftError("Please enter a title, summary excerpt, and article body.");
      return;
    }

    const slug = draftTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newPost: BlogPost = {
      id: `custom-${Date.now()}`,
      slug: slug || `post-${Date.now()}`,
      title: draftTitle.trim(),
      category: draftCategory,
      readTime: draftReadTime.trim() || "4 min read",
      publishedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      author: "Sizan Mahmud",
      excerpt: draftExcerpt.trim(),
      contentMarkdown: draftMarkdown.trim(),
      keyTakeaways: [
        "Published via Vance Automations Studio markdown composer.",
        "Stored cleanly in browser persistence alongside core engineering guides.",
      ],
      ctaTopic: draftTitle.trim(),
      isCustom: true,
    };

    onAddCustomPost(newPost);
    setDraftTitle("");
    setDraftExcerpt("");
    setDraftError("");
    setIsComposerOpen(false);
    setSelectedCategory("All");
  };

  return (
    <section
      id="blog"
      className="relative border-b border-white/[0.08] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header + Admin Draft Toggle */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs font-medium tracking-wide text-violet-400">
              Engineering Briefs &amp; Field Notes
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-4xl [text-wrap:balance]">
              Blog &amp; AI Automation Insights
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-400">
              Deep dives into anti-fraud vision pipelines, real estate lead
              routing, and channel architecture decisions.
            </p>
          </motion.div>

          <button
            type="button"
            onClick={() => setIsComposerOpen((prev) => !prev)}
            className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-zinc-200 transition-colors hover:border-cyan-400/40 hover:text-white whitespace-nowrap shrink-0 md:self-auto"
          >
            {isComposerOpen ? (
              <>
                <X className="h-3.5 w-3.5 text-zinc-400" />
                Close Post Studio
              </>
            ) : (
              <>
                <FilePlus2 className="h-3.5 w-3.5 text-cyan-400" />
                Admin / Draft New Post
              </>
            )}
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter articles by category"
          className="mt-8 inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-zinc-950/80 p-1"
        >
          {BLOG_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? "bg-cyan-500 text-zinc-950 font-semibold"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Admin / Draft New Post Composer Panel */}
        {isComposerOpen && (
          <form
            onSubmit={handlePublishDraft}
            className="mt-8 rounded-2xl border border-cyan-400/25 bg-[#121218] p-6 sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <h3 className="font-display text-base font-semibold text-zinc-50">
                  Markdown Article Composer
                </h3>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Drafts publish immediately to the Insights feed and persist in
                  local storage.
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-950 p-1">
                <button
                  type="button"
                  onClick={() => setComposerTab("write")}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    composerTab === "write"
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Edit Markdown
                </button>
                <button
                  type="button"
                  onClick={() => setComposerTab("preview")}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    composerTab === "preview"
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  Live Preview
                </button>
              </div>
            </div>

            {composerTab === "write" ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="draft-title"
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Article Title
                  </label>
                  <input
                    id="draft-title"
                    type="text"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    placeholder="e.g., Automating Invoice Reconciliation with Gemini Vision"
                    className="mt-1.5 h-10 w-full rounded-lg border border-white/10 bg-[#09090B] px-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:col-span-1">
                  <div>
                    <label
                      htmlFor="draft-category"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Category
                    </label>
                    <select
                      id="draft-category"
                      value={draftCategory}
                      onChange={(e) =>
                        setDraftCategory(
                          e.target.value as
                            | "E-Commerce AI"
                            | "Real Estate"
                            | "Workflow Guides"
                        )
                      }
                      className="mt-1.5 h-10 w-full rounded-lg border border-white/10 bg-[#09090B] px-2.5 text-xs text-zinc-100 focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="E-Commerce AI">E-Commerce AI</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Workflow Guides">Workflow Guides</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="draft-readtime"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Read Time
                    </label>
                    <input
                      id="draft-readtime"
                      type="text"
                      value={draftReadTime}
                      onChange={(e) => setDraftReadTime(e.target.value)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-white/10 bg-[#09090B] px-3 text-xs text-zinc-100 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="draft-excerpt"
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Summary Excerpt
                  </label>
                  <input
                    id="draft-excerpt"
                    type="text"
                    value={draftExcerpt}
                    onChange={(e) => setDraftExcerpt(e.target.value)}
                    placeholder="Concise 1–2 sentence overview shown on the blog card..."
                    className="mt-1.5 h-10 w-full rounded-lg border border-white/10 bg-[#09090B] px-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="draft-markdown"
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Markdown Body (Supports ## Headings and - Bullet Lists)
                  </label>
                  <textarea
                    id="draft-markdown"
                    rows={6}
                    value={draftMarkdown}
                    onChange={(e) => setDraftMarkdown(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#09090B] p-3.5 font-mono text-xs leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-white/10 bg-[#09090B] p-5">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="text-cyan-300">{draftCategory}</span>
                  <span aria-hidden="true">·</span>
                  <span>{draftReadTime}</span>
                </div>
                <h4 className="mt-2 font-display text-xl font-bold text-zinc-50">
                  {draftTitle || "Untitled Draft Article"}
                </h4>
                <p className="mt-2 text-sm text-zinc-400">
                  {draftExcerpt || "Summary excerpt will appear here."}
                </p>
                <div className="mt-4 space-y-2 border-t border-white/[0.08] pt-4 text-sm text-zinc-300 whitespace-pre-wrap">
                  {draftMarkdown}
                </div>
              </div>
            )}

            {draftError && (
              <p className="mt-3 text-xs font-medium text-rose-400">
                {draftError}
              </p>
            )}

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsComposerOpen(false)}
                className="h-9 rounded-lg border border-white/10 px-4 text-xs font-medium text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-9 rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-zinc-950 transition-colors hover:bg-cyan-400"
              >
                Publish to Blog
              </button>
            </div>
          </form>
        )}

        {/* Blog Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111115] p-6 transition-colors duration-200 hover:border-cyan-400/35"
            >
              <div>
                {/* Clean Unboxed Metadata */}
                <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-cyan-300">
                      {post.category}
                    </span>
                    <span aria-hidden="true" className="text-zinc-600">
                      ·
                    </span>
                    <span className="font-mono tabular-nums">{post.readTime}</span>
                  </div>

                  {post.isCustom && (
                    <button
                      type="button"
                      onClick={() => onDeleteCustomPost(post.id)}
                      aria-label={`Delete custom post ${post.title}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight text-zinc-50 group-hover:text-cyan-200 transition-colors">
                  <button
                    type="button"
                    onClick={() => onOpenPost(post)}
                    className="text-left focus-visible:outline-none focus-visible:underline"
                  >
                    {post.title}
                  </button>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
                <span className="text-xs text-zinc-500">{post.publishedAt}</span>
                <button
                  type="button"
                  onClick={() => onOpenPost(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 transition-colors hover:text-cyan-300"
                >
                  <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                  Read Article
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
