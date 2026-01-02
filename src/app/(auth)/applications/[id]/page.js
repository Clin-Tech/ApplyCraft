"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StatusBadge from "../../../../components/StatusBadge";
import AIOutreachPanel from "../../../../components/AIOutreachPanel";
import Link from "next/link";
import { supabase } from "../../../../lib/supabaseClient";

import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Calendar,
  Building2,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import CustomLoader from "../../../../shared/CustomLoader";
import JobNotes from "../../../../components/JobNotes";

export default function JobDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [user, setUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/login");
        return;
      }
      setUser(data.user);
    }
    loadUser();
  }, []);

  async function loadProfile() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return null;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .maybeSingle();

    return data;
  }

  useEffect(() => {
    async function fetchProfile() {
      const p = await loadProfile();
      setProfile(p);
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!user || !id) return;

    async function loadJob() {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Error loading job details.", error);
      } else {
        setJob(data);
        setSelectedStatus(data.status);
      }

      setLoading(false);
    }

    loadJob();
  }, [user, id]);

  async function handleStatusChange(newStatus) {
    setSelectedStatus(newStatus);

    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      toast.error("Update failed:", error);
    }
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          text: newNote,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        },
      ]);
      setNewNote("");
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading) {
    return <CustomLoader message="Loading job details..." />;
  }
  if (!job) {
    return <div className="p-10 text-center text-red-500">Job not found</div>;
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-slate-500">
        <p>Job not found</p>
        <Link
          href="/applications"
          className="mt-4 text-[#8a61ee] hover:text-[#6b46cc] font-medium"
        >
          Back to Applications
        </Link>
      </div>
    );
  }

  const jobContext = {
    id: job.id,
    company: job.company,
    role: job.role_title,
    location: job.location,
    description: job.job_description,
  };

  console.log("Profile in JobDetail:", profile);

  return (
    <div className="space-y-6 pb-20">
      <Link
        href={"/applications"}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-[#8a61ee] transition-colors text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Applications
      </Link>

      <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {job.role_title}
              </h1>

              <div className="flex items-center gap-2 mt-2">
                <Building2 className="h-5 w-5 text-slate-500" />
                <p className="text-xl font-semibold text-slate-700">
                  {job.company}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              {job.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
              )}

              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Added {formatDate(job.created_at)}
              </span>
            </div>

            {job.job_link && (
              <a
                href={job.job_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#8a61ee] hover:text-[#6b46cc] font-medium transition-colors"
              >
                View Job Posting
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Application Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full md:w-48 px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all cursor-pointer font-medium"
            >
              <option value="saved">Saved</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>

            <StatusBadge status={selectedStatus} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Job Description
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                {job.job_description}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900">
              Your Profile Summary
            </h3>
            {profile ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-slate-700 mt-2 font-semibold">
                  {profile.headline}
                </p>

                <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                  {profile.summary}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {profile.skills?.slice(0, 5).map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                href="/settings"
                className="text-purple-600 underline text-sm block mt-4"
              >
                Complete your profile for better AI results
              </Link>
            )}
          </div>

          <AIOutreachPanel
            initialType="dm"
            initialText=""
            jobContext={jobContext}
            profileHeadline={profile?.headline}
            profileSummary={profile?.summary}
            profileSkills={profile?.skills}
            profileName={profile?.full_name}
          />

          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Notes & Timeline
            </h3>

            <div className="space-y-3 mb-4">
              {notes.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">
                  No notes yet. Add your first note below.
                </p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="group p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm text-slate-700">{note.text}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {note.date}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 transition-all"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <JobNotes jobId={job.id} userId={user.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
