"use client";
import { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  RotateCw,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import getTypeDescription from "../utils/helpers/getTypeDescription";
import isPlaceholderText from "../utils/helpers/isPlaceholderText";
import { supabase } from "../lib/supabaseClient";

/**
 * AIOutreachPanel - AI-powered outreach generator using Groq
 *
 * Props:
 * @param {string} initialType - "dm" | "email" | "coverLetter"
 * @param {string} initialText - Starting text (optional)
 * @param {object} jobContext - { id, company, role, location, description }
 * @param {string} profileHeadline - User's profile headline (optional)
 * @param {string} profileSummary - User's profile summary (optional)
 * @param {array} profileSkills - User's skills array (optional)
 */
export default function AIOutreachPanel({
  initialType = "dm",
  initialText = "",
  jobContext = null,
  profileHeadline = null,
  profileSummary = null,
  profileSkills = null,
  profileName = null,
}) {
  const [selectedType, setSelectedType] = useState(initialType);
  const [outreachText, setOutreachText] = useState(initialText);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const [generatedContent, setGeneratedContent] = useState({
    dm: "",
    email: "",
    coverLetter: "",
  });

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);

    if (generatedContent[newType]) {
      setOutreachText(generatedContent[newType]);
    } else if (isPlaceholderText(outreachText)) {
      setOutreachText("");
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const { data: sessionRes } = await supabase.auth.getSession();
      const token = sessionRes?.session?.access_token;

      if (!token) {
        setError("Unauthorized - please log in");
        return;
      }

      const res = await fetch("/api/generate-outreach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: jobContext.id,
          company: jobContext.company,
          roleTitle: jobContext.role,
          jobDescription: jobContext.description,
          profileHeadline,
          profileSummary,
          profileSkills,
          profileName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate outreach");
        return;
      }

      if (res.status === 401) {
        setError("Session expired. Please log in again.");
        return;
      }

      setGeneratedContent({
        dm: data.dm,
        email: data.email,
        coverLetter: data.coverLetter,
      });

      setOutreachText(data[selectedType]);
    } catch (e) {
      setError("Network/server error. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outreachText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log("📋 Copied to clipboard");
    } catch (err) {
      console.error("Copy failed, trying fallback:", err);
      fallbackCopy(outreachText);
    }
  };

  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Fallback copy also failed:", err);
    }

    document.body.removeChild(textarea);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            AI Outreach Generator
          </h3>
          <p className="text-xs text-slate-600">Powered by Groq LLaMA 3 70B</p>
        </div>
      </div>

      {profileHeadline && profileName ? (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-800">
            ✅ Using your profile: <strong>{profileName}</strong> ·{" "}
            {profileHeadline}
          </p>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-800">
            {!profileName && !profileHeadline ? (
              <>
                Profile incomplete. AI will use generic messages and sign as
                "[Your Name]".{" "}
                <a href="/settings" className="underline font-semibold">
                  Complete your profile
                </a>{" "}
                for personalized outreach.
              </>
            ) : !profileName ? (
              <>
                Missing full name. Messages will sign as "[Your Name]".{" "}
                <a href="/settings" className="underline font-semibold">
                  Add your name
                </a>
                .
              </>
            ) : (
              <>
                Missing headline. AI will generate generic messages.{" "}
                <a href="/settings" className="underline font-semibold">
                  Add your headline
                </a>
                .
              </>
            )}
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="outreach-type"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Message Type
          </label>
          <select
            id="outreach-type"
            value={selectedType}
            onChange={handleTypeChange}
            disabled={isGenerating}
            className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="dm">LinkedIn DM</option>
            <option value="email">Email</option>
            <option value="coverLetter">Cover Letter</option>
          </select>
          <p className="mt-1.5 text-xs text-slate-600">
            {getTypeDescription(selectedType)}
          </p>
        </div>

        <div>
          <label
            htmlFor="outreach-content"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Generated Content
          </label>
          <textarea
            id="outreach-content"
            value={outreachText}
            onChange={(e) => setOutreachText(e.target.value)}
            disabled={isGenerating}
            placeholder="Click 'Generate' to create AI-powered outreach..."
            className="w-full h-48 px-4 py-3 bg-white border border-purple-200 rounded-xl text-sm outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20 transition-all resize-none disabled:opacity-50"
          />
          <p className="mt-1.5 text-xs text-slate-600">
            ✏️ Feel free to edit the generated text before copying
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="col-span-2 px-4 py-3 bg-gradient-to-r from-[#8a61ee] to-[#6b46cc] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isGenerating ? (
              <>
                <RotateCw className="h-4 w-4 animate-spin" />
                Generating with AI...
              </>
            ) : generatedContent[selectedType] ? (
              <>
                <RotateCw className="h-4 w-4" />
                Regenerate
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate with AI
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            disabled={
              !outreachText || isGenerating || isPlaceholderText(outreachText)
            }
            className="col-span-2 px-4 py-2.5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-[#8a61ee] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-purple-200">
        <p className="text-xs text-slate-600">
          💡 <strong>Tip:</strong> Generate once to get all three formats (DM,
          Email, Cover Letter), then switch between them using the dropdown.
        </p>
      </div>
    </div>
  );
}
