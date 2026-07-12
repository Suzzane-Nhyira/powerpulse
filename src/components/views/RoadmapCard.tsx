export default function RoadmapCard() {
  const items = [
    { label: "AI Risk Prediction", status: "Coming soon", icon: "🤖", desc: "Claude-powered outage risk & restoration estimates per region." },
    { label: "Push Notifications", status: "Planned", icon: "📲", desc: "Real alerts even when the app isn't open." },
    { label: "Badges Gallery", status: "Planned", icon: "🏅", desc: "Special one-off badges beyond the core tiers." },
  ];

  return (
    <div className="rounded-xl bg-surface border border-white/5 p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="font-display font-semibold text-paper">What's next</p>
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand/70 bg-brand/10 px-2 py-0.5 rounded">
          v1.0
        </span>
      </div>
      <p className="text-sm text-mute mb-4">PowerPulse is actively growing. Here's what's on the roadmap.</p>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <span className="text-lg leading-none">{item.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-paper">{item.label}</p>
                <span className="text-[10px] font-mono uppercase tracking-wide text-mute/70 bg-white/5 px-1.5 py-0.5 rounded">
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-mute mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}