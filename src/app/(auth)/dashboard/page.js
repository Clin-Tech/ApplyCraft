"use client";

import Link from "next/link";
import { Plus, TrendingUp, Search, Filter, Clock } from "lucide-react";
import DashboardStatCard from "../../../components/DashboardStatCard";
import StatusBadge from "../../../components/StatusBadge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import CustomLoader from "../../../shared/CustomLoader";
import EmptyState from "./empty";

export default function DashboardPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const userId = session.user.id;

      const { data: jobs, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", userId);

      if (!error) setJobs(jobs);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return <CustomLoader message="Loading dashboard..." />;
  }

  const total = jobs.length;
  const applied = jobs.filter((j) => j.status === "applied").length;
  const interviewing = jobs.filter((j) => j.status === "interviewing").length;
  const offers = jobs.filter((j) => j.status === "offer").length;

  const recent = jobs.slice(0, 5);

  const stats = [
    {
      label: "Total Applications",
      value: total,
      trend: `${total > 0 ? "+" + total : "0"} total`,
      icon: Clock,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      label: "Applied",
      value: applied,
      trend: `${applied} submitted`,
      icon: TrendingUp,
      color: "bg-gradient-to-br from-[#8a61ee] to-[#6b46cc]",
    },
    {
      label: "Interviewing",
      value: interviewing,
      trend: `${interviewing} active`,
      icon: TrendingUp,
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      label: "Offers",
      value: offers,
      trend: offers > 0 ? "🎉 Congrats!" : "None yet",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
    },
  ];

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Track and manage your job applications.
          </p>
        </div>

        <Link
          href="/applications/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8a61ee] to-[#6b46cc] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-transform"
        >
          <Plus className="h-5 w-5" />
          Add Application
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <DashboardStatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <button className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 hover:border-purple-300 group transition-all text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#8a61ee] to-[#6b46cc] flex items-center justify-center group-hover:scale-110 transition">
              <Search className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-slate-900">Find Jobs</span>
          </div>
          <p className="text-sm text-slate-600">
            Browse and save opportunities.
          </p>
        </button>

        <button className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 hover:border-green-300 group transition-all text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-slate-900">View Analytics</span>
          </div>
          <p className="text-sm text-slate-600">Track your progress.</p>
        </button>

        <button className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 hover:border-amber-300 group transition-all text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center group-hover:scale-110 transition">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-slate-900">Filter Apps</span>
          </div>
          <p className="text-sm text-slate-600">Organize by status or date.</p>
        </button>
      </div>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Applications
          </h2>
          <Link
            href="/applications"
            className="text-sm font-medium text-[#8a61ee] hover:text-[#6b46cc] flex items-center gap-1"
          >
            View All
          </Link>
        </div>

        {recent.length === 0 && (
          <EmptyState
            title="No applications yet"
            subtitle="Add your first job and start tracking outreach, notes, and follow-ups."
            ctaLabel="Add Job"
            onCta={() => router.push("/applications/new")}
          />
        )}

        <div className="space-y-4">
          {recent.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl bg-white border border-slate-200 p-5 hover:shadow-xl hover:border-[#8a61ee] transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {job.role_title}
                  </h3>
                  <p className="text-slate-600 font-medium">{job.company}</p>

                  <div className="flex flex-wrap gap-3 text-sm text-slate-500 mt-3">
                    <span>📍 {job.location || "N/A"}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDate(job.created_at)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={job.status} />
                  <button
                    onClick={() => router.push(`/applications/${job.id}`)}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm hover:bg-[#8a61ee] hover:text-white transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
