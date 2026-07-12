export const TIERS = [
  { name: "Candle Bearer", icon: "🕯️", min: 0 },
  { name: "Torch Carrier", icon: "🔦", min: 30 },
  { name: "Bulb Guardian", icon: "💡", min: 100 },
  { name: "Voltage Warden", icon: "⚡", min: 250 },
  { name: "Grid Sentinel", icon: "🌟", min: 500 },
] as const;

export function tierIcon(tierName: string | null | undefined): string {
  return TIERS.find((t) => t.name === tierName)?.icon ?? "🕯️";
}