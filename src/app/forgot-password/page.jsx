"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const sendLink = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);

    const redirectTo = `${window.location.origin}/auth/confirm?next=/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    setLoading(false);
    if (error) return setErr(error.message);
    setMsg("Check your email for the reset link.");
  };

  return (
    <form onSubmit={sendLink} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Forgot password</h1>

      {err && <p className="text-red-600 text-sm">{err}</p>}
      {msg && <p className="text-green-700 text-sm">{msg}</p>}

      <input
        className="w-full border rounded-xl px-4 py-3"
        placeholder="you@example.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        disabled={loading}
        className="w-full rounded-xl bg-black text-white py-3 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}
