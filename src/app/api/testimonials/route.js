import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const json = (status, payload) => NextResponse.json(payload, { status });

export async function POST(req) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return json(401, { error: "Unauthorized" });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { global: { headers: { Authorization: `Bearer ${token}` } } },
    );

    const { data: userRes, error: userErr } = await supabase.auth.getUser();
    const user = userRes?.user;
    if (userErr || !user) return json(401, { error: "Invalid session" });

    const { rating, feedback, allowPublic } = await req.json();

    const r = Number(rating);
    const f = String(feedback || "").trim();

    if (!Number.isFinite(r) || r < 1 || r > 5) {
      return json(400, { error: "Invalid rating" });
    }
    if (!f) return json(400, { error: "Feedback is required" });
    if (f.length > 800)
      return json(400, { error: "Feedback too long (max 800)" });

    const { data: existing } = await supabase
      .from("testimonials")
      .select("id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (existing?.id) {
      return json(409, { error: "You already submitted feedback. Thank you!" });
    }

    const { error } = await supabase.from("testimonials").insert({
      user_id: user.id,
      rating: r,
      feedback: f,
      allow_public: !!allowPublic,
      approved: false,
    });

    if (error) return json(500, { error: error.message });

    return json(200, { success: true });
  } catch (err) {
    return json(500, { error: "Failed to save feedback" });
  }
}

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const { data, error } = await supabase
      .from("testimonials")
      .select(
        `
    id,
    rating,
    feedback,
    created_at,
    allow_public,
    profiles!testimonials_user_id_fkey (
      full_name,
      headline
    )
  `,
      )
      .eq("approved", true)
      .eq("allow_public", true)
      .order("created_at", { ascending: false })
      .limit(8);

    if (error) return json(500, { error: error.message });

    return json(200, { testimonials: data || [] });
  } catch {
    return json(500, { error: "Failed to fetch testimonials" });
  }
}
