import HowItWorks from "@/components/HowItWorks";
import BadgeGuide from "@/components/BadgeGuide";
import RoadmapCard from "@/components/views/RoadmapCard";

export default function LearnView() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-2xl font-bold text-paper">How It Works</h1>
        <p className="text-sm text-mute mt-1">A quick guide to using PowerPulse.</p>
        <div className="mt-4">
          <HowItWorks />
        </div>
      </div>

      <div className="border-t border-white/5 pt-10">
        <h2 className="font-display text-xl font-bold text-paper">Contributor Tiers</h2>
        <p className="text-sm text-mute mt-1">Earn points and level up by reporting accurately.</p>
        <div className="mt-4 max-w-2xl">
          <BadgeGuide />
        </div>
      </div>

      <div className="border-t border-white/5 pt-10 max-w-2xl">
        <RoadmapCard />
      </div>
    </div>
  );
}