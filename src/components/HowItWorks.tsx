export default function HowItWorks() {
  const steps = [
    {
      icon: "⚡",
      title: "Report an outage",
      body: "Pick your region and town, add a quick note if you like, and hit Power Out. It takes seconds.",
    },
    {
      icon: "🤝",
      title: "Confirm what others see",
      body: "See a report from your area? Tap \"I see this too\" — it helps everyone trust the report is real.",
    },
    {
      icon: "✅",
      title: "Mark power back",
      body: "Once your light is back, tap Power Back on the report. This helps us track how long outages actually last.",
    },
    {
      icon: "🔔",
      title: "Watch your area",
      body: "Subscribe to a region to get notified the moment something's reported or restored there.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {steps.map((step, i) => (
        <div key={i} className="rounded-xl bg-surface border border-white/5 p-4 transition-colors hover:border-white/10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-lg leading-none">{step.icon}</span>
            <p className="font-display font-semibold text-paper text-sm">{step.title}</p>
          </div>
          <p className="text-sm text-mute leading-relaxed">{step.body}</p>
        </div>
      ))}
    </div>
  );
}