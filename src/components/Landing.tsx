"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setSending(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-brand/10 blur-[120px]" />
      </div>

      <div className="relative flex flex-col items-center text-center max-w-lg">
        <div className="relative flex items-center justify-center h-16 w-16 rounded-2xl bg-surface border border-white/10 mb-6">
          <span className="absolute inset-0 rounded-2xl bg-brand/25 animate-ping motion-reduce:animate-none" />
          <BoltMark className="relative h-7 w-7 text-brand" />
        </div>

        <h1 className="font-display text-5xl sm:text-6xl font-bold text-paper tracking-tight leading-none">
          PowerPulse
        </h1>
        <p className="mt-4 text-base sm:text-lg text-mute leading-relaxed">
          Community-powered electricity outage tracking for Ghana.
          Reported by neighbours, confirmed by neighbours.
        </p>

        <div className="w-full max-w-sm mt-10 rounded-xl bg-surface border border-white/10 p-6">
          {sent ? (
            <p className="text-sm text-success font-mono">
              Check your email for a login link.
            </p>
          ) : (
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <label htmlFor="landing-email" className="text-xs font-mono uppercase tracking-widest text-mute text-left">
                Log in to continue
              </label>
              <input
                id="landing-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full rounded-lg bg-surface2 border border-white/10 px-3 py-2.5 text-paper placeholder:text-mute/50 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition"
              />
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-lg bg-brand hover:bg-brand-dim disabled:opacity-60 text-paper font-display font-semibold py-2.5 transition-all active:scale-[0.98]"
              >
                {sending ? "Sending link..." : "Send login link"}
              </button>
              {error && <p className="text-xs text-alert">{error}</p>}
              <p className="text-xs text-mute/70">No password needed — we'll email you a one-tap link.</p>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 w-full">
          <MiniStep icon="⚡" text="Report an outage in seconds" />
          <MiniStep icon="🤝" text="Confirm what your neighbours see" />
          <MiniStep icon="🔔" text="Get notified when power's back" />
        </div>
      </div>
    </div>
  );
}

function MiniStep({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-2xl">{icon}</span>
      <p className="text-xs text-mute leading-snug">{text}</p>
    </div>
  );
}

function BoltMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 2L4.5 14h5.6l-1.4 8L19.5 10h-5.6L13 2z" />
    </svg>
  );
}