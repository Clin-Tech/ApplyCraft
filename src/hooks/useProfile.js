"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!userId) return;
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, headline, summary, skills")
        .eq("id", userId)
        .maybeSingle();

      if (cancelled) return;

      if (error) setError(error.message);
      setProfile(data || null);
      setLoading(false);
    }
    run();
    return () => (cancelled = true);
  }, [userId]);

  return { profile, loading, error };
}
