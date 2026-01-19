"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";

export default function TestimonialPrompt({ onSubmit, onDismiss }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [allowPublic, setAllowPublic] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;

    if (rating >= 4 && !feedback.trim()) return;

    setSubmitting(true);
    await onSubmit({ rating, feedback, allowPublic });
    setSubmitting(false);
  };

  return (
    <div className="fixed bottom-4 right-4 w-[22rem] bg-white rounded-2xl shadow-2xl border border-purple-200 p-5 z-50">
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <h3 className="text-base font-bold text-slate-900 mb-1">
        Enjoying ApplyCraft?
      </h3>
      <p className="text-sm text-slate-600 mb-3">
        Quick rating helps us improve for job seekers (tech and non-tech).
      </p>

      <div className="flex gap-1.5 mb-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className="hover:scale-110 transition-transform"
            aria-label={`${n} stars`}
          >
            <Star
              className={`h-6 w-6 ${
                n <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-300"
              }`}
            />
          </button>
        ))}
      </div>

      {rating >= 4 && (
        <>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What do you like most?"
            className="w-full p-3 border border-slate-200 rounded-xl text-sm resize-none mb-3"
            rows={3}
          />

          <label className="flex items-center gap-2 text-sm text-slate-700 mb-3">
            <input
              type="checkbox"
              checked={allowPublic}
              onChange={(e) => setAllowPublic(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Allow us to share anonymously</span>
          </label>
        </>
      )}

      <button
        onClick={handleSubmit}
        disabled={
          submitting || rating === 0 || (rating >= 4 && !feedback.trim())
        }
        className="w-full py-2.5 bg-gradient-to-r from-[#8a61ee] to-[#6b46cc] text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
