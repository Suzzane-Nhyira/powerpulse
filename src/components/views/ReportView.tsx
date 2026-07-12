import ReportForm from "@/components/ReportForm";
import Subscriptions from "@/components/Subscriptions";

export default function ReportView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-paper">Report an Outage</h1>
        <p className="text-sm text-mute mt-1">Accurate reports help everyone — including future AI predictions.</p>
      </div>
      <div className="flex flex-col items-center md:items-start gap-6">
        <ReportForm />
        <Subscriptions />
      </div>
    </div>
  );
}