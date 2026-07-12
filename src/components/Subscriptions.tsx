"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { GHANA_REGIONS } from "@/lib/regions";

type Subscription = {
  id: string;
  region: string;
  town: string | null;
};

export default function Subscriptions() {
  const { user } = useAuth();
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [region, setRegion] = useState("");
  const [open, setOpen] = useState(false);

  const fetchSubs = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("subscriptions")
      .select("id, region, town")
      .eq("user_id", user.id);
    if (data) setSubs(data);
  }, [user]);

  useEffect(() => {
    fetchSubs();
  }, [fetchSubs]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!region || !user) return;
    await supabase.from("subscriptions").insert({ user_id: user.id, region });
    setRegion("");
    fetchSubs();
  }

  async function handleRemove(id: string) {
    await supabase.from("subscriptions").delete().eq("id", id);
    fetchSubs();
  }

  if (!user) return null;

  return (
    <div className="w-full max-w-md rounded-xl bg-surface border border-white/5 p-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="font-display text-sm font-semibold text-paper">
          Watching {subs.length} {subs.length === 1 ? "area" : "areas"}
        </span>
        <span className="text-mute text-xs">{open ? "Hide" : "Manage"}</span>
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {subs.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between text-sm">
              <span className="text-paper/80">{sub.region}</span>
              <button
                onClick={() => handleRemove(sub.id)}
                className="text-xs text-alert hover:text-alert-dim transition"
              >
                Remove
              </button>
            </div>
          ))}

          <form onSubmit={handleAdd} className="flex items-center gap-2 pt-2 border-t border-white/5">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="flex-1 rounded-lg bg-surface2 border border-white/10 px-3 py-2 text-sm text-paper focus:outline-none focus:ring-2 focus:ring-brand/60"
            >
              <option value="">Add a region...</option>
              {GHANA_REGIONS.filter((r) => !subs.some((s) => s.region === r)).map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={!region}
              className="text-xs font-mono uppercase tracking-wide bg-brand text-paper px-3 py-2 rounded-lg hover:bg-brand-dim disabled:opacity-50 transition"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
}