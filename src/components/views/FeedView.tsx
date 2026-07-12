import Feed from "@/components/Feed";

export default function FeedView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-paper">Community Feed</h1>
        <p className="text-sm text-mute mt-1">Live reports from across Ghana, confirmed by the community.</p>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <Feed />
      </div>
    </div>
  );
}