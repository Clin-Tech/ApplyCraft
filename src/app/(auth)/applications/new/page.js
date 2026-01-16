"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    jobLink: "",
    location: "",
    status: "Saved",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role title is required";
    }

    if (formData.jobLink && !isValidUrl(formData.jobLink)) {
      newErrors.jobLink = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!validateForm()) return;

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        toast.error("You must be logged in.");
        return;
      }

      const { error } = await supabase.from("applications").insert({
        company: formData.company,
        role_title: formData.role,
        job_link: formData.jobLink,
        location: formData.location,
        status: formData.status.toLowerCase(),
        job_description: formData.description,
        user_id: user.id,
      });

      if (error) {
        console.error(error);
        toast.error("Error saving job.");
        return;
      }

      toast.success("Job saved!");
      router.push("/applications");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      company: "",
      role: "",
      jobLink: "",
      location: "",
      status: "Saved",
      description: "",
    });
    setErrors({});
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <Link
          href="/applications"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-[#8a61ee] transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Link>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 transition-colors text-sm font-medium"
        >
          <X className="h-4 w-4" />
          Clear Form
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Application
          </h1>
          <p className="text-slate-600 mt-2">
            Track a new job opportunity by filling in the details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Google, Meta, Stripe"
              className={`w-full px-4 py-3 bg-white border rounded-xl outline-none transition-all ${
                errors.company
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-200 focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20"
              }`}
            />
            {errors.company && (
              <p className="mt-2 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Role Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., Senior Frontend Engineer"
              className={`w-full px-4 py-3 bg-white border rounded-xl outline-none transition-all ${
                errors.role
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-200 focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20"
              }`}
            />
            {errors.role && (
              <p className="mt-2 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="jobLink"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Job Posting URL
            </label>
            <input
              type="url"
              id="jobLink"
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
              placeholder="https://company.com/careers/job-id"
              className={`w-full px-4 py-3 bg-white border rounded-xl outline-none transition-all ${
                errors.jobLink
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-200 focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20"
              }`}
            />
            {errors.jobLink && (
              <p className="mt-2 text-sm text-red-600">{errors.jobLink}</p>
            )}
            <p className="mt-2 text-xs text-slate-500">
              Optional: Link to the job posting for quick reference
            </p>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Remote, San Francisco, CA"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Application Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all cursor-pointer font-medium"
            >
              <option value="Saved">Saved - Planning to apply</option>
              <option value="Applied">Applied - Submitted application</option>
              <option value="Interviewing">Interviewing - In process</option>
              <option value="Offer">Offer - Received offer</option>
              <option value="Rejected">Rejected - Not moving forward</option>
            </select>
            <p className="mt-2 text-xs text-slate-500">
              You can update this later as your application progresses
            </p>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Paste the full job description here... This will be used by AI to generate personalized outreach."
              rows={8}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all resize-none"
            />
            <p className="mt-2 text-xs text-slate-500">
              💡 Pro tip: Include the full JD for better AI-generated outreach
              messages
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8a61ee] to-[#6b46cc] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Save className="h-5 w-5" />
              {loading ? "Adding Application..." : "Add Application"}
            </button>

            <Link
              href="/applications"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-semibold hover:border-[#8a61ee] transition-all duration-300"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
