"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

type Notification = {
  id: string;
  message: string;
  time: string;
};

export default function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const subscribedRegions = useRef<Set<string>>(new Set());

  const loadSubscribedRegions = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from("subscriptions").select("region").eq("user_id", user.id);
    subscribedRegions.current = new Set((data ?? []).map((s) => s.region));
  }, [user]);

  useEffect(() => {
    loadSubscribedRegions();
  }, [loadSubscribedRegions]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reports" },
        (payload) => {
          const region = payload.new.region as string;
          const town = payload.new.town as string;
          if (subscribedRegions.current.has(region)) {
            setNotifications((prev) => [
              { id: crypto.randomUUID(), message: `New outage reported in ${town}, ${region}`, time: "just now" },
              ...prev,
            ].slice(0, 20));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "restorations" },
        async (payload) => {
          const { data } = await supabase
            .from("reports")
            .select("region, town")
            .eq("id", payload.new.report_id)
            .single();
          if (data && subscribedRegions.current.has(data.region)) {
            setNotifications((prev) => [
              { id: crypto.randomUUID(), message: `Power restored in ${data.town}, ${data.region}`, time: "just now" },
              ...prev,
            ].slice(0, 20));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center h-9 w-9 rounded-lg bg-surface border border-white/10 hover:border-brand/40 transition"
      >
        <BellIcon className="h-4 w-4 text-mute" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-alert text-[10px] flex items-center justify-center text-paper font-mono">
            {notifications.length > 9 ? "9+" : notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-surface border border-white/10 shadow-xl shadow-black/40 p-3 z-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wide text-mute">Notifications</span>
            {notifications.length > 0 && (
              <button
                onClick={() => setNotifications([])}
                className="text-xs text-mute hover:text-paper transition"
              >
                Clear
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <p className="text-sm text-mute py-4 text-center">No new alerts. Watch an area to get notified.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((n) => (
                <p key={n.id} className="text-sm text-paper/90 border-b border-white/5 pb-2">
                  {n.message}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}