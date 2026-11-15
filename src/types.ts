export type DemoPersona = "agency" | "techmart" | "dreamhome";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "E-Commerce AI" | "Real Estate" | "Workflow Guides";
  readTime: string;
  publishedAt: string;
  author: string;
  excerpt: string;
  contentMarkdown: string;
  keyTakeaways: string[];
  ctaTopic: string;
  isCustom?: boolean;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ArchitectureStage {
  step: string;
  title: string;
  description: string;
  tools: string[];
}

export interface CaseStudy {
  id: string;
  persona: DemoPersona;
  title: string;
  subtitle: string;
  clientSector: string;
  imageUrl: string;
  imageAlt: string;
  telegramBotUrl: string;
  summary: string;
  stack: string[];
  metrics: CaseStudyMetric[];
  architectureStages: ArchitectureStage[];
  fraudOrLeadHighlights: string[];
}

export interface AuditInquiry {
  id: string;
  name: string;
  contact: string;
  businessType: string;
  automationGoal: string;
  sourceContext?: string;
  submittedAt: string;
}
