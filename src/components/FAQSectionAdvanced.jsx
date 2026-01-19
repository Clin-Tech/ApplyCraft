import { useState } from "react";
import {
  ChevronDown,
  Sparkles,
  Shield,
  Zap,
  CreditCard,
  Mail,
  FileText,
  TrendingUp,
  Search,
  X,
} from "lucide-react";

export default function FAQSectionAdvanced() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const faqs = [
    {
      icon: Sparkles,
      question: "How does the AI outreach generation work?",
      answer:
        "Our AI analyzes your profile (skills, experience, headline) and the job description to create personalized LinkedIn DMs, emails, and cover letters. It matches your actual qualifications to the role's requirements—no generic templates. Powered by Groq's LLaMA 3.3 70B model for fast, high-quality results in under 3 seconds.",
      category: "AI Features",
      color: "from-purple-500 to-blue-500",
      keywords: ["ai", "groq", "generation", "personalized", "llama"],
    },
    {
      icon: Shield,
      question: "Is my data secure? Who can see my applications?",
      answer:
        "Absolutely secure. Your data is stored in Supabase with Row Level Security (RLS) enabled—only you can see your applications. We never share, sell, or access your personal data. Your job descriptions are sent to Groq's API for AI generation (encrypted in transit), but they don't store or train on your data. You can delete all your data anytime from Settings.",
      category: "Privacy & Security",
      color: "from-green-500 to-emerald-500",
      keywords: ["security", "privacy", "data", "rls", "encryption", "safe"],
    },
    {
      icon: CreditCard,
      question: "Is ApplyCraft really free? Are there hidden costs?",
      answer:
        "Yes, 100% free forever. No credit card required, no trial that expires, no hidden fees. We're currently in beta and focused on building the best product. In the future, we may offer premium features (like analytics or bulk exports), but core tracking and AI outreach will always be free.",
      category: "Pricing",
      color: "from-amber-500 to-orange-500",
      keywords: ["free", "pricing", "cost", "payment", "trial", "beta"],
    },
    {
      icon: Zap,
      question: "Can I edit the AI-generated messages?",
      answer:
        "Yes! The AI generates a starting point, but you have full control. Edit the text directly in the textarea before copying. You can also regenerate multiple times to get different variations. Think of it as a smart assistant that drafts for you, you always have final say.",
      category: "AI Features",
      color: "from-purple-500 to-blue-500",
      keywords: ["edit", "customize", "regenerate", "control", "modify"],
    },
    {
      icon: FileText,
      question: "What if I don't have a complete profile?",
      answer:
        "The AI will still work, but results will be more generic. Without your name, it signs as '[Your Name]'. Without skills/headline, it can't match you to the job's requirements. We highly recommend spending 2 minutes completing your profile in Settings, it dramatically improves outreach quality and personalization.",
      category: "Getting Started",
      color: "from-blue-500 to-cyan-500",
      keywords: ["profile", "setup", "incomplete", "settings", "onboarding"],
    },
    {
      icon: TrendingUp,
      question: "How many applications can I track?",
      answer:
        "Unlimited. Track 10, 100, or 1,000 applications, no limits. You can filter by status (Applied, Interviewing, Offer, Rejected), search by company/role, and export your data anytime. The dashboard shows real-time stats and recent activity to keep you organized.",
      category: "Features",
      color: "from-indigo-500 to-purple-500",
      keywords: [
        "unlimited",
        "tracking",
        "applications",
        "limits",
        "dashboard",
      ],
    },
    {
      icon: Mail,
      question: "Does ApplyCraft automatically send emails or DMs?",
      answer:
        "No. We generate the messages for you, but you copy and send them manually. This gives you control over timing, personalization, and lets you review before sending. We believe job searching is personal—AI should assist, not replace your judgment.",
      category: "AI Features",
      color: "from-purple-500 to-blue-500",
      keywords: ["send", "automatic", "manual", "email", "linkedin", "dm"],
    },
    {
      icon: Shield,
      question: "Can I delete my account and data?",
      answer:
        "Yes, anytime. Go to Settings → Account → Delete Account. This permanently removes all your applications, notes, outreach history, and profile data. No questions asked, no retention period. Your data is yours—we just hold it securely while you use the app.",
      category: "Privacy & Security",
      color: "from-green-500 to-emerald-500",
      keywords: ["delete", "remove", "account", "data", "gdpr"],
    },
    {
      icon: Sparkles,
      question: "What makes ApplyCraft different from spreadsheets?",
      answer:
        "Spreadsheets are great for data, but terrible for job searching. ApplyCraft is purpose-built: AI-powered outreach generation, status tracking with filters, notes per application, and a clean dashboard that shows progress at a glance. Plus, you never lose context switching between tabs, everything's in one place.",
      category: "Features",
      color: "from-indigo-500 to-purple-500",
      keywords: ["spreadsheet", "excel", "comparison", "alternative", "better"],
    },
    {
      icon: Zap,
      question: "How fast is the AI generation?",
      answer:
        "Under 3 seconds on average. We use Groq's ultra-fast LLaMA 3.3 70B model, which is optimized for speed without sacrificing quality. You'll get a DM, email, and cover letter all at once, faster than you can manually write even one.",
      category: "AI Features",
      color: "from-purple-500 to-blue-500",
      keywords: ["speed", "fast", "performance", "quick", "groq"],
    },
  ];

  const categories = ["All", ...new Set(faqs.map((f) => f.category))];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.keywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about ApplyCraft
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions... (e.g., 'free', 'security', 'AI')"
              className="w-full pl-12 pr-12 py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-600 shadow-lg scale-105"
                  : "bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="text-sm text-slate-600">
              Found{" "}
              <span className="font-bold text-purple-600">
                {filteredFAQs.length}
              </span>{" "}
              result
              {filteredFAQs.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          </div>
        )}

        {filteredFAQs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
              <Search className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No results found
            </h3>
            <p className="text-slate-600 mb-6">
              Try different keywords or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => {
              const isOpen = openIndex === index;
              const Icon = faq.icon;

              return (
                <div
                  key={index}
                  className={`rounded-2xl border-2 transition-all duration-300 ${
                    isOpen
                      ? "border-purple-300 bg-white shadow-xl"
                      : "border-slate-200 bg-white hover:border-slate-300 shadow-sm hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-3 md:px-6 py-3 md:py-5 flex items-start gap-4 text-left transition-all"
                    aria-expanded={isOpen}
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${faq.color} flex items-center justify-center shadow-lg transition-transform ${
                        isOpen ? "scale-110" : "scale-100"
                      }`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm md:text-lg font-bold text-slate-900 mb-1">
                        {faq.question}
                      </h3>
                      <span className="text-xs font-medium text-slate-500">
                        {faq.category}
                      </span>
                    </div>

                    <ChevronDown
                      className={`flex-shrink-0 h-6 w-6 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-sm md:text-md text-slate-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 text-center p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Can't find what you're looking for? We're here to help. Reach out
            and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:clinapp3@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Mail className="h-5 w-5" />
              Email Support
            </a>
            <a
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-xl font-bold border-2 border-slate-200 hover:border-purple-300 hover:bg-purple-50 hover:scale-105 transition-all"
            >
              <Sparkles className="h-5 w-5 text-purple-600" />
              Try It Free
            </a>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-purple-600 mb-1">
              Free
            </div>
            <div className="text-sm text-slate-600">Forever Plan</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-purple-600 mb-1">
              &lt;3s
            </div>
            <div className="text-sm text-slate-600">AI Generation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-purple-600 mb-1">
              ∞
            </div>
            <div className="text-sm text-slate-600">Applications</div>
          </div>
        </div>
      </div>
    </section>
  );
}
