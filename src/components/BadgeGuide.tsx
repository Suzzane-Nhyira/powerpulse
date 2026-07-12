import { TIERS } from "@/lib/tiers";

const TIER_DESCRIPTIONS: Record<string, string> = {
  "Candle Bearer": "Everyone starts here. Report or confirm an outage to start earning points.",
  "Torch Carrier": "You're becoming a regular — your reports are starting to help the community.",
  "Bulb Guardian": "A steady, trusted contributor. Your reports carry real weight in the feed.",
  "Voltage Warden": "Highly active and highly accurate — you're one of the most reliable voices in your area.",
  "Grid Sentinel": "Top tier. Your track record makes your reports near-verified by the community.",
};

export default function BadgeGuide() {
  return (
    <div className="space-y-3">
      {TIERS.map((tier) => (
        <div
          key={tier.name}
          className="flex items-start gap-4 rounded-xl bg-surface border border-white/5 p-4 transition-colors hover:border-white/10"
        >
          <span className="text-2xl leading-none">{tier.icon}</span>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="font-display font-semibold text-paper">{tier.name}</p>
              <span className="text-xs font-mono text-brand">{tier.min}+ pts</span>
            </div>
            <p className="text-sm text-mute mt-0.5 leading-relaxed">{TIER_DESCRIPTIONS[tier.name]}</p>
          </div>
        </div>
      ))}
      <p className="text-xs text-mute/70 pt-2">
        Earn points by reporting outages (+5), getting confirmed by others (+2 per confirmation), and reporting when power's back (+5).
      </p>
    </div>
  );
}