"use client";

import { ViewKey } from "@/components/AppShell";

type NavItem = { key: ViewKey; label: string; icon: (className: string) => React.ReactNode };

const NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Home", icon: (c) => <HomeIcon className={c} /> },
  { key: "report", label: "Report", icon: (c) => <BoltIcon className={c} /> },
  { key: "feed", label: "Live Feed", icon: (c) => <PulseIcon className={c} /> },
  { key: "stats", label: "Statistics", icon: (c) => <ChartIcon className={c} /> },
  { key: "learn", label: "Learn", icon: (c) => <BookIcon className={c} /> },
];

export default function Sidebar({ active, onChange }: { active: ViewKey; onChange: (v: ViewKey) => void }) {
  return (
    <>
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-white/5 bg-surface/40">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-surface border border-white/10">
            <span className="absolute inset-0 rounded-xl bg-brand/20 animate-ping motion-reduce:animate-none" />
            <BoltIcon className="relative h-4 w-4 text-brand" />
          </div>
          <span className="font-display text-lg font-bold text-paper tracking-tight">PowerPulse</span>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onChange(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-brand/15 text-brand" : "text-mute hover:text-paper hover:bg-white/5"
                }`}
              >
                {item.icon("h-4 w-4 shrink-0")}
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-6 py-5 border-t border-white/5">
          <p className="text-xs text-mute/60 leading-relaxed">
            Community-powered outage tracking for Ghana.
          </p>
          <span className="inline-block mt-2 text-[10px] font-mono uppercase tracking-widest text-brand/70 bg-brand/10 px-2 py-0.5 rounded">
            v1.0
          </span>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-sm border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onChange(item.key)}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                  isActive ? "text-brand" : "text-mute"
                }`}
              >
                {item.icon("h-5 w-5")}
                <span className="text-[10px] font-mono">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 2L4.5 14h5.6l-1.4 8L19.5 10h-5.6L13 2z" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PulseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M3 12h4l2 8 4-16 2 8h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M4 20V10M12 20V4M20 20v-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}