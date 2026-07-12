import Dashboard from "@/components/Dashboard";

export default function StatsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-paper">Statistics</h1>
        <p className="text-sm text-mute mt-1">Outage trends, most affected regions, restoration times.</p>
      </div>
      <Dashboard />
    </div>
  );
}