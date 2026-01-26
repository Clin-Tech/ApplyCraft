"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Target,
  Mail,
  FileText,
  TrendingUp,
  Zap,
  Shield,
  CheckCircle,
  Play,
  Sparkles,
} from "lucide-react";
import DashboardPreviewInteractive from "../shared/DashboardPreviewInteractive";
import FAQSectionAdvanced from "../components/FAQSectionAdvanced";

export default function ImprovedHomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  const getYouTubeId = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const parts = u.pathname.split("/");
      const embedIndex = parts.findIndex((p) => p === "embed");
      if (embedIndex !== -1) return parts[embedIndex + 1];
      return null;
    } catch {
      return null;
    }
  };

  const demoUrl = "https://youtu.be/mq191fViIMg?si=QLmX1JxW4N4VDvbq";
  const videoId = getYouTubeId(demoUrl);
  const embedSrc = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`
    : null;

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => setTestimonials(d.testimonials || []))
      .catch(() => setTestimonials([]));
  }, []);

  const features = [
    {
      icon: Target,
      title: "Track Applications",
      description:
        "Centralize job applications with status tracking and notes.",
      stat: "Save 3hrs/week",
    },
    {
      icon: Mail,
      title: "AI Outreach",
      description: "Generate personalized cold emails and LinkedIn DMs.",
      stat: "2min per message",
    },
    {
      icon: FileText,
      title: "Smart Cover Letters",
      description: "Turn job descriptions into tailored cover letters.",
      stat: "10x faster",
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "Visualize job search progress with clean insights.",
      stat: "Real-time tracking",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-purple-50 to-white">
      <section className="relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300 opacity-20 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold mb-6 border border-purple-200">
              <Sparkles className="h-4 w-4" />
              <span>Powered by AI • Trusted by Job Seekers</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
              Land Your Dream Job
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text mt-2">
                10x Faster
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto mt-6 leading-relaxed">
              Stop losing applications in spreadsheets. Track, generate
              outreach, and land interviews, all in one place.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={loggedIn ? "/dashboard" : "/signup"}
                className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg rounded-2xl font-bold shadow-2xl hover:shadow-purple-500 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </a>

              <button
                onClick={() => setShowDemoModal(true)}
                className="group px-10 py-5 bg-white text-slate-700 rounded-2xl font-bold border-2 border-slate-300 hover:border-purple-600 hover:bg-purple-50 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Play className="h-5 w-5 text-purple-600" />
                Watch Demo (2 min)
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500 mt-8">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-medium">Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Setup in 60 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium">No credit card</span>
              </div>
            </div>
          </div>

          <div className="mt-16 relative">
            <DashboardPreviewInteractive />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-600 mt-4">
              Built by engineers who've been through 100+ job applications
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, i) => (
              <div
                key={i}
                className="group p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl border-2 border-slate-200 hover:border-purple-600 hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1.5 rounded-full">
                  <Zap className="h-3 w-3" />
                  {item.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Loved by Job Seekers
            </h2>
            <p className="text-xl text-slate-600 mt-4">
              Real results from real users
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => {
              const fullName = t?.profiles?.full_name?.trim();
              const headline = t?.profiles?.headline?.trim();

              const displayName = fullName || "Anonymous";
              const displayRole = headline || "ApplyCraft user";
              const initial = (displayName?.[0] || "A").toUpperCase();

              return (
                <div
                  key={t.id}
                  className="p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-lg"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: Number(t.rating || 0) }).map(
                      (_, i) => (
                        <span key={i} className="text-yellow-500">
                          ★
                        </span>
                      ),
                    )}
                  </div>

                  <p className="text-slate-700 text-sm md:text-lg leading-relaxed mb-4">
                    "{t.feedback}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {initial}
                    </div>

                    <div>
                      <div className="font-bold text-slate-900">
                        {displayName}
                      </div>
                      <div className="text-sm text-slate-600">
                        {displayRole}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {t.created_at
                          ? new Date(t.created_at).toLocaleDateString()
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSectionAdvanced />

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 md:p-16 shadow-2xl text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold">
                Ready to Land Your Next Role?
              </h2>
              <p className="text-purple-100 text-xl max-w-xl mt-4">
                Join professionals who've streamlined their job search with
                ApplyCraft.
              </p>
              <a
                href="/signup"
                className="inline-flex items-center gap-3 mt-8 px-12 py-5 bg-white text-purple-600 text-lg rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform"
              >
                Start Free Now
                <ArrowRight className="h-6 w-6" />
              </a>
              <p className="text-purple-200 text-sm mt-4">
                ✓ Free forever plan • ✓ No credit card • ✓ 2-minute setup
              </p>
            </div>
          </div>
        </div>
      </section>

      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full h-[90vh] overflow-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-slate-900">
                  Product Demo
                </h3>
                <button
                  onClick={() => setShowDemoModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-6">
                {embedSrc ? (
                  <iframe
                    className="w-full h-full"
                    src={embedSrc}
                    title="ApplyCraft Product Demo"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/80">
                    Invalid demo link
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-xl">
                  What you'll see:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700">
                      How to add and track applications in seconds
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700">
                      AI outreach generation from job descriptions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700">
                      Dashboard analytics and status tracking
                    </span>
                  </li>
                </ul>
              </div>

              <a
                href="/signup"
                className="mt-8 w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:scale-105 transition-transform"
              >
                Try It Free Now
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
