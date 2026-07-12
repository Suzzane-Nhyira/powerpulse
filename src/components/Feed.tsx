"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { tierIcon } from "@/lib/tiers";

type Report = {
  id: string;
  region: string;
  town: string;
  note: string | null;
  created_at: string;
  confirmations: { count: number }[];
  restorations: { created_at: string }[];
  profiles: { username: string | null; tier: string } | null;
};

export default function Feed() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    const { data, error } = await supabase
      .from("reports")
      .select("*, confirmations(count), restorations(created_at), profiles(username, tier)")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setReports(data as unknown as Report[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReports();

    const channel = supabase
      .channel("reports-feed")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "reports" }, () => fetchReports())
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "confirmations" }, () => fetchReports())
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "restorations" }, () => fetchReports())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchReports]);

  async function handleConfirm(reportId: string) {
    setBusyId(reportId);
    await supabase.from("confirmations").insert({ report_id: reportId });
    setBusyId(null);
  }

  async function handlePowerBack(reportId: string) {
    setBusyId(reportId);
    await supabase.from("restorations").insert({ report_id: reportId, user_id: user?.id });
    setBusyId(null);
  }

  if (loading) {
    return <p className="text-mute text-sm">Loading reports...</p>;
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-16 w-full rounded-xl border border-dashed border-white/10">
        <p className="text-paper font-display text-lg mb-1">No reports yet</p>
        <p className="text-mute text-sm">Be the first to report an outage in your area.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-3">
      {reports.map((report, i) => {
        const confirmCount = report.confirmations?.[0]?.count ?? 0;
        const isRestored = report.restorations && report.restorations.length > 0;
        const duration = isRestored
          ? formatDuration(report.created_at, report.restorations[0].created_at)
          : null;

        return (
          <div
            key={report.id}
            style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            className="rounded-xl bg-surface border border-white/5 p-4 transition-all duration-200 hover:border-white/10 hover:-translate-y-0.5 animate-fadeIn"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${isRestored ? "bg-success" : "bg-alert animate-pulse motion-reduce:animate-none"}`} />
                <div>
                  <p className="font-display font-semibold text-paper leading-tight">{report.town}</p>
                  <p className="text-xs text-mute mt-0.5">{report.region}</p>
                </div>
              </div>
              <span className="font-mono text-xs text-mute/80 whitespace-nowrap pt-0.5">
                {timeAgo(report.created_at)}
              </span>
            </div>

            {report.note && <p className="text-sm text-paper/75 mt-2.5 leading-relaxed">{report.note}</p>}

            <p className="text-xs text-mute/60 mt-2.5">
              reported by {tierIcon(report.profiles?.tier)} {report.profiles?.username ?? "someone"}
            </p>

            {isRestored ? (
              <div className="flex items-center mt-3.5 pt-3.5 border-t border-white/5">
                <span className="text-xs font-mono text-success">✅ Power restored · {duration}</span>
              </div>
            ) : (
              <div className="flex items-center justify-between mt-3.5 pt-3.5 border-t border-white/5 gap-2">
                <span className="text-xs font-mono text-mute">
                  {confirmCount} {confirmCount === 1 ? "person" : "people"} confirmed
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleConfirm(report.id)}
                    disabled={busyId === report.id}
                    className="text-xs font-mono uppercase tracking-wide text-brand hover:text-brand-dim disabled:opacity-50 transition-colors"
                  >
                    I see this too
                  </button>
                  <button
                    onClick={() => handlePowerBack(report.id)}
                    disabled={busyId === report.id}
                    className="text-xs font-mono uppercase tracking-wide text-success hover:text-success-dim disabled:opacity-50 transition-colors"
                  >
                    Power Back
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function timeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatDuration(start: string, end: string): string {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}