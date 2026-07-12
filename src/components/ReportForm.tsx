"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { GHANA_REGIONS } from "@/lib/regions";
import { useAuth } from "@/lib/auth-context";

export default function ReportForm() {
  const { user } = useAuth();
  const [region, setRegion] = useState("");
  const [town, setTown] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!region || !town.trim()) return;

    setStatus("submitting");
    setErrorMessage("");

    const { error } = await supabase.from("reports").insert({
      user_id: user?.id,
      region,
      town: town.trim(),
      note: note.trim() || null,
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setStatus("success");
    setRegion("");
    setTown("");
    setNote("");

    setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-xl bg-surface border border-white/5 p-6 shadow-lg shadow-black/30 transition-shadow hover:shadow-black/40"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="h-2 w-2 rounded-full bg-alert animate-pulse motion-reduce:animate-none" />
        <h2 className="font-display text-lg font-semibold text-paper">
          Report a power outage
        </h2>
      </div>
      <p className="text-sm text-mute mb-6">
        Tell your neighbours what's happening — accurate reports help predict outages for everyone.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="region" className="block text-xs font-mono uppercase tracking-wide text-mute mb-1.5">
            Region
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            className="w-full rounded-lg bg-surface2 border border-white/10 px-3 py-2.5 text-paper focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition"
          >
            <option value="" disabled>Select your region</option>
            {GHANA_REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="town" className="block text-xs font-mono uppercase tracking-wide text-mute mb-1.5">
            Town / Area
          </label>
          <input
            id="town"
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            placeholder="e.g. East Legon"
            required
            className="w-full rounded-lg bg-surface2 border border-white/10 px-3 py-2.5 text-paper placeholder:text-mute/50 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition"
          />
        </div>

        <div>
          <label htmlFor="note" className="block text-xs font-mono uppercase tracking-wide text-mute mb-1.5">
            Note <span className="normal-case text-mute/60">(optional)</span>
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="No light since 6:45 PM"
            rows={3}
            className="w-full rounded-lg bg-surface2 border border-white/10 px-3 py-2.5 text-paper placeholder:text-mute/50 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-alert hover:bg-alert-dim disabled:opacity-60 text-paper font-display font-semibold py-3 transition-all active:scale-[0.98]"
      >
        <BoltIcon className="h-4 w-4" />
        {status === "submitting" ? "Reporting..." : "Power Out"}
      </button>

      {status === "success" && (
        <p className="mt-3 text-sm text-success text-center">Reported. Thank you for keeping the community informed.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-alert text-center">Couldn't submit: {errorMessage}</p>
      )}
    </form>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 2L4.5 14h5.6l-1.4 8L19.5 10h-5.6L13 2z" />
    </svg>
  );
}