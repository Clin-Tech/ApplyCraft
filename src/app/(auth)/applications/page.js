"use client";
import { useEffect, useState } from "react";
import StatusBadge from "../../../components/StatusBadge";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

import {
  Plus,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import CustomLoader from "../../../shared/CustomLoader";
import NoResults from "./NoResults";

export default function JobsPage() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session?.user) {
        setLoading(false);
        router.replace("/login");
        return;
      }

      setUser(session.user);
    }

    loadUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    async function loadJobs() {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setJobs(data);
      setLoading(false);
    }
    loadJobs();
  }, [user]);

  if (loading) {
    return <CustomLoader message="Loading applications…" />;
  }

  const filteredJobs = jobs.filter((job) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      job.company?.toLowerCase().includes(q) ||
      job.role_title?.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "All Status" ||
      job.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    total: jobs.length,
    saved: jobs.filter((j) => j.status === "saved").length,
    applied: jobs.filter((j) => j.status === "applied").length,
    interviewing: jobs.filter((j) => j.status === "interviewing").length,
    offer: jobs.filter((j) => j.status === "offer").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Applications</h1>
          <p className="text-slate-600 mt-1">
            Track and manage all your job submissions
          </p>
        </div>
        <Link
          href="/applications/new"
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8a61ee] to-[#6b46cc] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          Add Application
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            label: "Total",
            value: statusCounts.total,
            color: "text-slate-900",
          },
          {
            label: "Saved",
            value: statusCounts.saved,
            color: "text-slate-700",
          },
          {
            label: "Applied",
            value: statusCounts.applied,
            color: "text-blue-700",
          },
          {
            label: "Interviewing",
            value: statusCounts.interviewing,
            color: "text-purple-700",
          },
          {
            label: "Offers",
            value: statusCounts.offer,
            color: "text-green-700",
          },
          {
            label: "Rejected",
            value: statusCounts.rejected,
            color: "text-red-700",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition-shadow"
          >
            <p className="text-xs font-medium text-slate-600 mb-1">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by company or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all cursor-pointer"
          >
            <option>All Status</option>
            <option>saved</option>
            <option>applied</option>
            <option>interviewing</option>
            <option>offer</option>
            <option>rejected</option>
          </select>
        </div>
      </div>
      {filteredJobs.length === 0 && (
        <NoResults query={searchQuery} status={statusFilter} />
      )}

      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500">No applications found</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="group rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-xl hover:border-[#8a61ee] transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-[#8a61ee] transition-colors">
                    {job.role_title}
                  </h3>

                  <p className="text-slate-600 font-medium">{job.company}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.location || "Unknown"}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      Added {formatDate(job.created_at)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={job.status} />
                  <Link
                    href={`/applications/${job.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-[#8a61ee] hover:text-white transition-all duration-200"
                  >
                    View Details
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <div className="max-w-md mx-auto">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No applications yet
            </h3>
            <p className="text-slate-600 mb-6">
              Start tracking your job search by adding your first application
            </p>
            <Link
              href="/applications/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8a61ee] to-[#6b46cc] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              Add Your First Application
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
