"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { tierIcon } from "@/lib/tiers";
import { ViewKey } from "@/components/AppShell";

export default function HomeView({ onNavigate }: { onNavigate: (v: ViewKey) => void }) {
  const { profile } = useAuth();
  const [activeCount, setActiveCount] = useState<number | null>(null);

  useEffect(() => {
    async function loadSnapshot() {
      const { data } = await supabase
        .from("reports")
        .select("id, restorations(id)")
        .order("created_at", { ascending: false })
        .limit(200);
      if (data) {
        const active = data.filter((r) => !r.restorations || r.restorations.length === 0).length;
        setActiveCount(active);
      }
    }
    loadSnapshot();
  }, []);

  const cards: { key: ViewKey; title: string; body: string; icon: string; accent: string }[] = [
    {
      key: "report",
      title: "Report an Outage",
      body: "Let your neighbours know your power is out — takes seconds.",
      icon: "⚡",
      accent: "border-alert/30 hover:border-alert/60",
    },
    {
      key: "feed",
      title: "Community Feed",
      body: "See live reports, confirm what's happening near you.",
      icon: "📡",
      accent: "border-brand/30 hover:border-brand/60",
    },
    {
      key: "stats",
      title: "Statistics",
      body: "Most affected areas, restoration times, active outages.",
      icon: "📊",
      accent: "border-success/30 hover:border-success/60",
    },
    {
      key: "learn",
      title: "How It Works",
      body: "New here? Learn how reporting and badges work.",
      icon: "📘",
      accent: "border-white/10 hover:border-white/30",
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm text-mute">Welcome back{profile?.username ? `, ${profile.username}` : ""}</p>
        <h1 className="font-display text-3xl font-bold text-paper mt-1">
          {tierIcon(profile?.tier)} {profile?.tier ?? "Candle Bearer"}
        </h1>
        <p className="text-sm text-mute mt-2">
          {profile?.points ?? 0} points earned so far. Keep reporting to level up.
        </p>
      </div>

      <div className="rounded-xl bg-surface border border-white/5 p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-mute">Live snapshot</p>
          <p className="font-display text-2xl font-bold text-alert mt-1">
            {activeCount === null ? "..." : activeCount}
          </p>
          <p className="text-xs text-mute mt-0.5">active outages right now</p>
        </div>
        <div className="h-2.5 w-2.5 rounded-full bg-alert animate-pulse motion-reduce:animate-none" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <button
            key={card.key}
            onClick={() => onNavigate(card.key)}
            className={`text-left rounded-2xl bg-surface border p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 ${card.accent}`}
          >
            <span className="text-2xl">{card.icon}</span>
            <p className="font-display text-lg font-semibold text-paper mt-3">{card.title}</p>
            <p className="text-sm text-mute mt-1 leading-relaxed">{card.body}</p>
          </button>
        ))}
      </div>
    </div>
  );
}