"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Lock,
//   AlertCircle,
//   Briefcase,
//   Eye,
//   EyeOff,
//   CheckCircle2,
// } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setHasSession(!!data.session);
      setReady(true);
    })();
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!hasSession) return setError("Open the reset link from your email.");

    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) return setError(error.message);

    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!ready) return null;

  if (!hasSession) {
    return (
      <div className="max-w-md mx-auto p-6">
        <p className="text-sm text-slate-700">
          You can’t reset from here directly. Please open the password reset
          link from your email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleReset} className="max-w-md mx-auto p-6 space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <input
        className="w-full border rounded-xl px-4 py-3"
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="w-full border rounded-xl px-4 py-3"
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      <button
        disabled={loading}
        className="w-full rounded-xl bg-black text-white py-3 disabled:opacity-60"
      >
        {loading ? "Updating..." : "Reset Password"}
      </button>
    </form>
  );
}
