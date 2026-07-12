"use client";

import { useState } from "react";
import AuthButton from "@/components/AuthButton";
import NotificationBell from "@/components/NotificationBell";
import Sidebar from "@/components/Sidebar";
import HomeView from "@/components/views/HomeView";
import ReportView from "@/components/views/ReportView";
import FeedView from "@/components/views/FeedView";
import StatsView from "@/components/views/StatsView";
import LearnView from "@/components/views/LearnView";

export type ViewKey = "home" | "report" | "feed" | "stats" | "learn";

export default function AppShell() {
  const [view, setView] = useState<ViewKey>("home");

  return (
    <div className="flex flex-1 min-h-screen">
      <Sidebar active={view} onChange={setView} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-white/5 sticky top-0 bg-ink/80 backdrop-blur-sm z-40">
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 md:hidden">
              <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-surface border border-white/10">
                <BoltMark className="h-3.5 w-3.5 text-brand" />
              </div>
              <span className="font-display font-bold text-paper">PowerPulse</span>
            </div>
            <div className="hidden md:block" />
            <div className="flex items-center gap-3">
              <NotificationBell />
              <AuthButton />
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-10 pb-24 md:pb-10">
          <div className="max-w-5xl mx-auto">
            {view === "home" && <HomeView onNavigate={setView} />}
            {view === "report" && <ReportView />}
            {view === "feed" && <FeedView />}
            {view === "stats" && <StatsView />}
            {view === "learn" && <LearnView />}
          </div>
        </main>
      </div>
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