"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import CustomLoader from "../../shared/CustomLoader";
import {
  User,
  FileText,
  Code,
  CheckCircle2,
  AlertCircle,
  Save,
  X,
  UserCircle,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/login");
        return;
      }

      setUser(data.user);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle();

      if (error) {
        console.error("Profile fetch error:", error);
      } else if (profile) {
        setFullName(profile.full_name || "");
        setHeadline(profile.headline || "");
        setSummary(profile.summary || "");
        setSkills((profile.skills || []).join(", "));
      }

      setLoading(false);
    }

    init();
  }, [router]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    if (!fullName.trim()) {
      setMessage({ type: "error", text: "Full name is required" });
      setSaving(false);
      return;
    }

    if (fullName.length > 100) {
      setMessage({
        type: "error",
        text: "Name must be under 100 characters",
      });
      setSaving(false);
      return;
    }

    if (!headline.trim()) {
      setMessage({ type: "error", text: "Headline is required" });
      setSaving(false);
      return;
    }

    if (headline.length > 200) {
      setMessage({
        type: "error",
        text: "Headline must be under 200 characters",
      });
      setSaving(false);
      return;
    }

    if (summary.length > 1000) {
      setMessage({
        type: "error",
        text: "Summary must be under 1000 characters",
      });
      setSaving(false);
      return;
    }

    const skillArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (skillArray.length > 30) {
      setMessage({
        type: "error",
        text: "Maximum 30 skills allowed",
      });
      setSaving(false);
      return;
    }

    const payload = {
      id: user.id,
      full_name: fullName,
      headline,
      summary,
      skills: skillArray,
    };

    const { error } = await supabase.from("profiles").upsert(payload);

    setSaving(false);

    if (error) {
      setMessage({
        type: "error",
        text: "Failed to save profile. Please try again.",
      });
      console.error("Save error:", error);
      return;
    }

    setMessage({ type: "success", text: "Profile updated successfully!" });

    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  }

  function clearMessage() {
    setMessage({ type: "", text: "" });
  }

  if (loading) {
    return <CustomLoader message="Loading your profile..." />;
  }

  const skillArray = skills
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <div className="h-13 md:h-16 w-13 md:w-16 p-2 md:p-0 rounded-2xl bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] flex items-center justify-center shadow-lg">
          <User className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Your Profile</h1>
          <p className="text-slate-600 mt-1">
            Complete your profile for personalized AI outreach
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-blue-50 border border-blue-200 p-6">
        <h3 className="font-semibold text-blue-900 mb-2">
          💡 Why complete your profile?
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>✓ AI automatically signs your messages with your real name</li>
          <li>
            ✓ Generates personalized outreach using your skills and experience
          </li>
          <li>✓ Better quality cover letters and LinkedIn DMs</li>
          <li>✓ Save time by not rewriting your background for each job</li>
        </ul>
      </div>

      {message.text && (
        <div
          className={`rounded-2xl border p-4 flex items-start justify-between ${
            message.type === "success"
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-start gap-3">
            {message.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm font-medium ${
                message.type === "success" ? "text-green-900" : "text-red-900"
              }`}
            >
              {message.text}
            </p>
          </div>
          <button
            onClick={clearMessage}
            className="text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <UserCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <label className="block text-lg font-semibold text-slate-900">
                Full Name <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-slate-600">
                Your real name (used to sign all AI-generated messages)
              </p>
            </div>
          </div>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all"
            placeholder="e.g., John Smith"
            maxLength={100}
          />

          <div className="mt-2 flex justify-between items-center text-xs text-slate-500">
            <span className="w-[80%] sm:w-0">
              ✍️ Your name will automatically appear at the end of all outreach
            </span>
            <span>{fullName.length}/100</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <label className="block text-lg font-semibold text-slate-900">
                Professional Headline <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-slate-600">
                Your current role or expertise (e.g., "Senior React Developer")
              </p>
            </div>
          </div>

          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all"
            placeholder="e.g., Frontend Developer | React & Next.js Specialist"
            maxLength={200}
          />

          <div className="mt-2 flex justify-between items-center text-xs text-slate-500">
            <span>This appears in the opening of AI messages</span>
            <span>{headline.length}/200</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <label className="block text-lg font-semibold text-slate-900">
                Professional Summary
              </label>
              <p className="text-sm text-slate-600">
                2-5 sentences about your experience and strengths
              </p>
            </div>
          </div>

          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all resize-none"
            rows={6}
            placeholder="e.g., I'm a frontend developer with 5+ years of experience building React applications. I've led the development of three production apps serving 100k+ users. Passionate about performance optimization and user experience."
            maxLength={1000}
          />

          <div className="mt-2 flex justify-between items-center text-xs text-slate-500">
            <span>Used to personalize cover letters and emails</span>
            <span>{summary.length}/1000</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <div>
              <label className="block text-lg font-semibold text-slate-900">
                Skills & Technologies
              </label>
              <p className="text-sm text-slate-600">
                Comma-separated list of your key skills
              </p>
            </div>
          </div>

          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all"
            placeholder="e.g., React, Next.js, TypeScript, Tailwind CSS, Node.js"
          />

          <div className="mt-4">
            <p className="text-xs text-slate-600 mb-3">
              Your skills ({skillArray.length}/30):
            </p>
            <div className="flex flex-wrap gap-2">
              {skillArray.length > 0 ? (
                skillArray.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full border border-purple-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-400">
                  No skills added yet
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#8a61ee] to-[#6b46cc] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {saving ? (
              <>
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Profile
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex-1 px-6 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-semibold hover:border-[#8a61ee] transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>

      {(fullName || headline) && (
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">
            Preview: How AI will sign your messages
          </h3>
          <div className="space-y-3 text-sm text-slate-700">
            {fullName && (
              <p>
                <strong>Signature:</strong> Best regards, {fullName}
              </p>
            )}
            {headline && (
              <p>
                <strong>Headline:</strong> {headline}
              </p>
            )}
            {summary && (
              <p>
                <strong>Summary:</strong> {summary}
              </p>
            )}
            {skillArray.length > 0 && (
              <p>
                <strong>Skills:</strong> {skillArray.slice(0, 10).join(", ")}
                {skillArray.length > 10 &&
                  ` and ${skillArray.length - 10} more`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
