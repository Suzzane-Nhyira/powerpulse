"use client";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { tierIcon } from "@/lib/tiers";

export default function AuthButton() {
  const { user, profile, loading } = useAuth();

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (loading || !user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-xs font-mono text-mute">
        <span>{tierIcon(profile?.tier)}</span>
        <span className="hidden sm:inline">{profile?.username ?? user.email}</span>
        <span className="text-brand">· {profile?.points ?? 0}pts</span>
      </div>
      <button
        onClick={handleLogout}
        className="text-xs font-mono uppercase tracking-wide text-mute hover:text-paper transition"
      >
        Log out
      </button>
    </div>
  );
}