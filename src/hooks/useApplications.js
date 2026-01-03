"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useApplications(userId) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!userId) return;
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("applications")
        .select("id, company, role_title, status, location, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) setError(error.message);
      setApplications(data || []);
      setLoading(false);
    }
    run();
    return () => (cancelled = true);
  }, [userId]);

  return { applications, loading, error, setApplications };
}
