"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export default function CompleteProfile() {
  const { user, profile, refreshProfile } = useAuth();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (!user || !profile || profile.username) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = username.trim();
    if (clean.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    setSaving(true);
    setError("");
    const { error } = await supabase
      .from("profiles")
      .update({ username: clean })
      .eq("id", user!.id);
    setSaving(false);
    if (error) {
      setError(error.code === "23505" ? "That username is already taken" : error.message);
      return;
    }
    await refreshProfile();
  }

  return (
    <div className="fixed inset-0 bg-ink/80 backdrop-blur-sm flex items-center justify-center px-6 z-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-surface border border-white/10 p-6">
        <h2 className="font-display text-lg font-semibold text-paper mb-1">Welcome to PowerPulse</h2>
        <p className="text-sm text-mute mb-4">
          Pick a username — this is how you&apos;ll appear on reports and badges.
        </p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. kwame_accra"
          className="w-full rounded-lg bg-surface2 border border-white/10 px-3 py-2.5 text-paper placeholder:text-mute/50 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition"
        />
        {error && <p className="text-xs text-alert mt-2">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="mt-4 w-full rounded-lg bg-brand text-paper font-display font-semibold py-2.5 hover:bg-brand-dim disabled:opacity-60 transition"
        >
          {saving ? "Saving..." : "Continue"}
        </button>
      </form>
    </div>
  );
}