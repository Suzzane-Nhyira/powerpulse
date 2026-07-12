"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { computeStats, ReportForStats } from "@/lib/stats";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell,
} from "recharts";

export default function Dashboard() {
  const [reports, setReports] = useState<ReportForStats[]>([]);
  const [scope, setScope] = useState<"all" | "week">("week");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const { data, error } = await supabase
      .from("reports")
      .select("region, created_at, restorations(created_at)")
      .order("created_at", { ascending: false })
      .limit(500);

    if (!error && data) {
      setReports(data as unknown as ReportForStats[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("dashboard-stats")
      .on("postgres_changes", { event: "*", schema: "public", table: "reports" }, () => fetchData())
      .on("postgres_changes", { event: "*", schema: "public", table: "restorations" }, () => fetchData())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  if (loading) {
    return <p className="text-mute text-sm">Loading statistics...</p>;
  }

  const stats = computeStats(reports, scope);
  const pieData = [
    { name: "Active", value: stats.activeCount },
    { name: "Restored", value: stats.restoredCount },
  ];
  const PIE_COLORS = ["#F97316", "#FDE68A"];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg font-semibold text-paper">Statistics</h2>
        <div className="flex rounded-lg bg-surface2 border border-white/10 p-1">
          <button
            onClick={() => setScope("week")}
            className={`text-xs font-mono uppercase px-3 py-1.5 rounded-md transition ${
              scope === "week" ? "bg-brand text-paper" : "text-mute hover:text-paper"
            }`}
          >
            This week
          </button>
          <button
            onClick={() => setScope("all")}
            className={`text-xs font-mono uppercase px-3 py-1.5 rounded-md transition ${
              scope === "all" ? "bg-brand text-paper" : "text-mute hover:text-paper"
            }`}
          >
            All time
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <StatCard label="Active outages" value={stats.activeCount.toString()} accent="text-alert" />
        <StatCard label="Total reports" value={stats.totalReports.toString()} accent="text-brand" />
        <StatCard label="Avg restoration" value={stats.avgDurationLabel} accent="text-success" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-surface border border-white/5 p-4">
          <p className="text-xs font-mono uppercase tracking-wide text-mute mb-3">Most affected areas</p>
          {stats.byRegion.length === 0 ? (
            <p className="text-sm text-mute py-8 text-center">No reports yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.byRegion} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="region"
                  width={100}
                  tick={{ fill: "#A89B86", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ background: "#221708", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                  labelStyle={{ color: "#FFF8EC" }}
                  itemStyle={{ color: "#FBBF24" }}
                />
                <Bar dataKey="count" fill="#FBBF24" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-xl bg-surface border border-white/5 p-4">
          <p className="text-xs font-mono uppercase tracking-wide text-mute mb-3">Active vs restored</p>
          {stats.totalReports === 0 ? (
            <p className="text-sm text-mute py-8 text-center">No reports yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#221708", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                  labelStyle={{ color: "#FFF8EC" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl bg-surface border border-white/5 p-4 transition-colors hover:border-white/10">
      <p className="text-xs font-mono uppercase tracking-wide text-mute mb-1.5">{label}</p>
      <p className={`font-display text-2xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}