"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { X, Loader2, Trash2 } from "lucide-react";

export default function JobNotes({ jobId, userId }) {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const canSubmit = useMemo(
    () => content.trim().length > 0 && !adding,
    [content, adding]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadNotes() {
      setLoadingNotes(true);
      setError("");

      const { data, error } = await supabase
        .from("job_notes")
        .select("id, content, created_at")
        .eq("job_id", jobId)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) {
        setError(error.message || "Failed to load notes.");
        setNotes([]);
      } else {
        setNotes(data || []);
      }

      setLoadingNotes(false);
    }

    if (jobId) loadNotes();

    return () => {
      cancelled = true;
    };
  }, [jobId]);

  async function handleAddNote() {
    const trimmed = content.trim();
    if (!trimmed) return;

    setAdding(true);
    setError("");

    const optimistic = {
      id: "optimistic-" + crypto.randomUUID(),
      content: trimmed,
      created_at: new Date().toISOString(),
      _optimistic: true,
    };
    setNotes((prev) => [optimistic, ...prev]);
    setContent("");

    const { data, error } = await supabase
      .from("job_notes")
      .insert({
        job_id: jobId,
        user_id: userId,
        content: trimmed,
      })
      .select("id, content, created_at")
      .single();

    if (error) {
      setNotes((prev) => prev.filter((n) => n.id !== optimistic.id));
      setContent(trimmed);
      setError(error.message || "Failed to add note.");
      setAdding(false);
      return;
    }

    setNotes((prev) => {
      const withoutOptimistic = prev.filter((n) => n.id !== optimistic.id);
      return [data, ...withoutOptimistic];
    });

    setAdding(false);
  }

  async function handleDeleteNote(noteId) {
    setDeletingId(noteId);
    setError("");

    const prev = notes;
    setNotes((n) => n.filter((x) => x.id !== noteId));

    const { error } = await supabase
      .from("job_notes")
      .delete()
      .eq("id", noteId);

    if (error) {
      setNotes(prev);
      setError(error.message || "Failed to delete note.");
    }

    setDeletingId(null);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Notes</h3>

        {error ? (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1 text-xs text-red-700 border border-red-200">
            <X className="h-3.5 w-3.5" />
            {error}
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a note (e.g., recruiter replied, follow up next week...)"
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#8a61ee] focus:ring-2 focus:ring-[#8a61ee]/20"
        />
        <button
          onClick={handleAddNote}
          disabled={!canSubmit}
          className="rounded-xl bg-gradient-to-r from-[#8a61ee] to-[#6b46cc] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {adding ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding
            </span>
          ) : (
            "Add"
          )}
        </button>
      </div>

      <div className="mt-4">
        {loadingNotes ? (
          <NotesSkeleton />
        ) : notes.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            No notes yet. Add quick reminders like follow-ups, interview dates,
            or feedback.
          </div>
        ) : (
          <ul className="space-y-3">
            {notes.map((n) => (
              <li
                key={n.id}
                className="rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-800 whitespace-pre-wrap">
                      {n.content}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      {new Date(n.created_at).toLocaleString()}
                      {n._optimistic ? " • saving..." : ""}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteNote(n.id)}
                    disabled={deletingId === n.id || n._optimistic}
                    className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:text-red-600 hover:border-red-200 disabled:opacity-50"
                    title="Delete note"
                  >
                    {deletingId === n.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function NotesSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl border border-slate-200 p-4">
          <div className="h-3 w-3/4 bg-slate-100 rounded" />
          <div className="mt-2 h-3 w-1/2 bg-slate-100 rounded" />
          <div className="mt-3 h-2 w-1/4 bg-slate-100 rounded" />
        </div>
      ))}
    </div>
  );
}
