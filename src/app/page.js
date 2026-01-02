"use client";

import Link from "next/link";
import {
  ArrowRight,
  Target,
  Mail,
  FileText,
  TrendingUp,
  Zap,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });
  }, []);

  const features = [
    {
      icon: Target,
      title: "Track Applications",
      description:
        "Centralize your job applications with status tracking and notes.",
    },
    {
      icon: Mail,
      title: "AI-Powered Outreach",
      description:
        "Generate personalized cold emails and LinkedIn DMs instantly.",
    },
    {
      icon: FileText,
      title: "Smart Cover Letters",
      description:
        "Turn job descriptions into tailored cover letters in seconds.",
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Visualize your job search progress with clean insights.",
    },
  ];

  const benefits = [
    "Never lose track of an application again",
    "Save hours on personalized outreach",
    "Stand out with tailored messaging",
    "Organize your entire job search in one place",
  ];

  return (
    <div className="w-full min-h-screen bg-white mx-8 px-9">
      <section className="relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl hidden md:block" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl hidden md:block" />

        <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>AI-Powered Job Application Assistant</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Land Your Dream Job
            <span className="block bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] text-transparent bg-clip-text mt-2">
              Faster & Smarter
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mt-6">
            Track applications, generate outreach, and organize your entire job
            search in one beautiful dashboard.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={loggedIn ? "/dashboard" : "/signup"}
              className="group px-8 py-4 bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] 
              text-white rounded-xl font-semibold shadow-lg hover:shadow-xl 
              hover:scale-[1.03] transition-transform flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </Link>

            <Link
              href={loggedIn ? "/dashboard" : "/signup"}
              className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold border 
              border-slate-200 hover:border-[#8a61ee] hover:scale-[1.03] transition"
            >
              View Demo
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-slate-500 mt-10">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>No credit card required</span>
            </div>

            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-600" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-slate-600 mt-4">
              Streamline your job search with tools built to help you land more
              interviews.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl border border-slate-200 
                hover:border-[#8a61ee] hover:shadow-xl transition-all"
              >
                <div
                  className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] 
                text-white flex items-center justify-center shadow-lg mb-4"
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] 
          rounded-3xl p-10 md:p-14 shadow-2xl text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Job Seekers Love ApplyCraft
            </h2>

            <p className="text-purple-100 text-lg max-w-xl mt-4">
              Join thousands of professionals who've streamlined their job
              search.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span className="text-white text-sm">{b}</span>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-white 
              text-[#8a61ee] rounded-xl font-semibold shadow-lg hover:scale-[1.03] transition"
            >
              Start Tracking Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Ready to Transform Your Job Search?
          </h2>

          <p className="text-lg text-slate-600 mt-4">
            Start organizing your applications and generating outreach today.
          </p>

          <Link
            href="/dashboard"
            className="mt-10 inline-flex items-center gap-2 px-10 py-5 
            bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] text-white text-lg 
            rounded-xl font-semibold shadow-lg hover:scale-[1.03] transition"
          >
            Get Started Free
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
