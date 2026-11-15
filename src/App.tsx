/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { CaseStudiesSection } from "./components/CaseStudiesSection";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { ROICalculatorSection } from "./components/ROICalculatorSection";
import { BlogSection } from "./components/BlogSection";
import { BlogReaderModal } from "./components/BlogReaderModal";
import { ProcessAndFaqSection } from "./components/ProcessAndFaqSection";
import { ContactFooterSection } from "./components/ContactFooterSection";
import { VanceAssistantWidget } from "./components/VanceAssistantWidget";
import {
  INITIAL_BLOG_POSTS,
  loadCustomBlogPosts,
  saveCustomBlogPosts,
} from "./data/blogs.js";
import { AuditInquiry, BlogPost, CaseStudy, DemoPersona } from "./types";

const INQUIRIES_STORAGE_KEY = "vance_inquiries_v1";

function loadInquiries(): AuditInquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(
    null
  );
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(
    null
  );

  const [customPosts, setCustomPosts] = useState<BlogPost[]>(() =>
    loadCustomBlogPosts()
  );
  const [inquiries, setInquiries] = useState<AuditInquiry[]>(() =>
    loadInquiries()
  );
  const [prefilledGoal, setPrefilledGoal] = useState<string>("");

  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [assistantPersona, setAssistantPersona] =
    useState<DemoPersona>("agency");

  useEffect(() => {
    saveCustomBlogPosts(customPosts);
  }, [customPosts]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        INQUIRIES_STORAGE_KEY,
        JSON.stringify(inquiries)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [inquiries]);

  const allPosts = useMemo(
    () => [...customPosts, ...INITIAL_BLOG_POSTS],
    [customPosts]
  );

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRequestAudit = (topic?: string) => {
    if (topic) {
      setPrefilledGoal(
        `Interested in implementing: ${topic}. Let's map this to our current channels and CRM.`
      );
    }
    scrollToSection("#contact");
  };

  const handleOpenLiveBot = (persona: DemoPersona = "agency") => {
    setAssistantPersona(persona);
    setAssistantOpen(true);
  };

  const handleAddCustomPost = (post: BlogPost) => {
    setCustomPosts((prev) => [post, ...prev]);
  };

  const handleDeleteCustomPost = (id: string) => {
    setCustomPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmitInquiry = (inquiry: AuditInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#09090B] text-zinc-100">
        <Navbar onBookAudit={() => handleRequestAudit()} />

        <main>
          <HeroSection
            onExploreCaseStudies={() => scrollToSection("#case-studies")}
            onTryLiveDemo={handleOpenLiveBot}
          />

          <ServicesSection />

          <CaseStudiesSection
            onSelectCaseStudy={setSelectedCaseStudy}
            onTryLiveBot={handleOpenLiveBot}
          />

          <ROICalculatorSection
            onLockInSavings={(summary) => handleRequestAudit(summary)}
          />

          <BlogSection
            posts={allPosts}
            onOpenPost={setSelectedBlogPost}
            onAddCustomPost={handleAddCustomPost}
            onDeleteCustomPost={handleDeleteCustomPost}
          />

          <ProcessAndFaqSection />
        </main>

        <ContactFooterSection
          prefilledGoal={prefilledGoal}
          inquiries={inquiries}
          onSubmitInquiry={handleSubmitInquiry}
        />

        {/* Modals & Floating Live Gemini AI Assistant */}
        <CaseStudyModal
          study={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          onTryLiveBot={handleOpenLiveBot}
          onRequestSimilarBuild={(topic) => handleRequestAudit(topic)}
        />

        <BlogReaderModal
          post={selectedBlogPost}
          onClose={() => setSelectedBlogPost(null)}
          onBuildForBusiness={(topic) => handleRequestAudit(topic)}
        />

        <VanceAssistantWidget
          isOpen={assistantOpen}
          activePersona={assistantPersona}
          onToggleOpen={setAssistantOpen}
          onChangePersona={setAssistantPersona}
        />
      </div>
    </MotionConfig>
  );
}
