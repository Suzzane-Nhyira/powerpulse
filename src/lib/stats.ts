export type ReportForStats = {
  region: string;
  created_at: string;
  restorations: { created_at: string }[];
};

export function computeStats(reports: ReportForStats[], scope: "all" | "week") {
  const cutoff = scope === "week" ? Date.now() - 7 * 24 * 60 * 60 * 1000 : 0;
  const filtered = reports.filter((r) => new Date(r.created_at).getTime() >= cutoff);

  const activeCount = filtered.filter((r) => r.restorations.length === 0).length;
  const restoredCount = filtered.filter((r) => r.restorations.length > 0).length;

  const regionCounts: Record<string, number> = {};
  filtered.forEach((r) => {
    regionCounts[r.region] = (regionCounts[r.region] ?? 0) + 1;
  });
  const byRegion = Object.entries(regionCounts)
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const durations = filtered
    .filter((r) => r.restorations.length > 0)
    .map((r) => new Date(r.restorations[0].created_at).getTime() - new Date(r.created_at).getTime());

  const avgMinutes =
    durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length / 60000) : 0;

  const avgHours = Math.floor(avgMinutes / 60);
  const avgMinsRemainder = avgMinutes % 60;
  const avgDurationLabel =
    durations.length === 0 ? "No data yet" : avgHours > 0 ? `${avgHours}h ${avgMinsRemainder}m` : `${avgMinsRemainder}m`;

  return {
    totalReports: filtered.length,
    activeCount,
    restoredCount,
    byRegion,
    avgDurationLabel,
  };
}